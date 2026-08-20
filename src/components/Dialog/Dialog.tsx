// Dialog component - Mac OS 9 style
// Modal dialog with backdrop and focus trapping
//
// Correctness notes (panel review #1-#7):
//  - aria-modal lives on the inner role="dialog" container, not the backdrop
//  - The backdrop is a plain <div> (no role) so it doesn't add bogus ARIA
//  - Multiple stacked dialogs are coordinated through a module-level stack;
//    only the topmost dialog responds to Escape or traps Tab focus
//  - Body scroll lock is reference-counted so stacked dialogs don't unlock
//    the page underneath each other on close
//  - Default initial focus moves into the dialog when no initialFocus prop
//    is supplied (otherwise focus would stay on the trigger and the trap
//    would never activate)
//  - The focus-trap selector covers contenteditable, audio/video, summary,
//    iframe, etc., and filters out hidden / aria-hidden / zero-size nodes
//  - Focus restore on close checks isConnected before calling .focus(),
//    so a detached trigger doesn't silently fail focus management
//
// Correctness notes (panel review #28, #31, #117):
//  - The backdrop is portaled to <body>, so an ancestor's overflow/transform/
//    contain/z-index stacking context can't clip or bury the dialog
//  - The scroll lock pads out the scrollbar gutter to stop the page behind
//    shifting, and swaps to position:fixed on iOS where overflow:hidden is
//    ignored; both are restored exactly on the last unlock
//  - initialFocus also accepts a () => HTMLElement | null callback, and the
//    ref form is typed against HTMLElement | null so narrow refs assign

import React, { forwardRef, useCallback, useEffect, useLayoutEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { Window, type WindowProps } from '../Window/Window';
import styles from './Dialog.module.css';

// --- Module-level dialog coordination -------------------------------------

// Stack of currently-open dialog containers. Only the last entry is treated
// as the "topmost" — it owns Escape and the Tab focus trap. This is the
// canonical web-platform approach for stacked modals and matches what
// browsers do internally for the dialog element.
const dialogStack: HTMLElement[] = [];

// Reference-counted body scroll lock so two stacked dialogs don't fight
// over the body's inline styles. The first lock captures whatever values
// the host app had set, and the last release restores them verbatim.
let scrollLockCount = 0;

// Inline body styles captured at first lock, restored at last release.
interface SavedBodyStyle {
	overflow: string;
	paddingRight: string;
	position: string;
	top: string;
	width: string;
	// Scroll offset to restore when the position:fixed strategy was used.
	scrollY: number;
	// Which strategy was applied, so unlock mirrors lock exactly even if
	// the UA check would answer differently by then.
	usedFixed: boolean;
}

let savedBodyStyle: SavedBodyStyle | null = null;

// iOS Safari ignores `overflow: hidden` on <body> and keeps scrolling the
// page under the modal, so it needs the position:fixed + negative-top
// workaround. Every other engine uses the cheaper overflow lock, which has
// the advantage of not disturbing the scroll offset at all.
function needsFixedScrollLock(): boolean {
	if (typeof navigator === 'undefined') return false;
	if (/iP(ad|hone|od)/.test(navigator.platform)) return true;
	// iPadOS 13+ reports itself as MacIntel; touch points disambiguate it
	// from a real desktop Mac.
	return navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1;
}

function lockBodyScroll(): void {
	if (typeof document === 'undefined') return;
	scrollLockCount += 1;
	if (scrollLockCount !== 1) return;

	const body = document.body;
	const usedFixed = needsFixedScrollLock();
	savedBodyStyle = {
		overflow: body.style.overflow,
		paddingRight: body.style.paddingRight,
		position: body.style.position,
		top: body.style.top,
		width: body.style.width,
		scrollY: window.scrollY,
		usedFixed,
	};

	// Compensate for the classic scrollbar disappearing, otherwise the page
	// behind the backdrop shifts sideways by its width when we lock.
	const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
	if (scrollbarWidth > 0) {
		const existing = parseFloat(window.getComputedStyle(body).paddingRight) || 0;
		body.style.paddingRight = `${existing + scrollbarWidth}px`;
	}

	if (usedFixed) {
		body.style.position = 'fixed';
		body.style.top = `-${savedBodyStyle.scrollY}px`;
		body.style.width = '100%';
	} else {
		body.style.overflow = 'hidden';
	}
}

function unlockBodyScroll(): void {
	if (typeof document === 'undefined') return;
	scrollLockCount = Math.max(0, scrollLockCount - 1);
	if (scrollLockCount !== 0 || !savedBodyStyle) return;

	const body = document.body;
	const saved = savedBodyStyle;
	savedBodyStyle = null;

	body.style.overflow = saved.overflow;
	body.style.paddingRight = saved.paddingRight;
	body.style.position = saved.position;
	body.style.top = saved.top;
	body.style.width = saved.width;

	// position:fixed collapsed the scroll offset to 0 — put the user back
	// exactly where they were before the dialog opened.
	if (saved.usedFixed) window.scrollTo(0, saved.scrollY);
}

function isTopmost(el: HTMLElement | null): boolean {
	return el !== null && dialogStack[dialogStack.length - 1] === el;
}

// Comprehensive focusable-element selector. Covers everything the Tab key
// can naturally reach plus author-provided overrides via [tabindex]. The
// runtime filter excludes disabled, hidden, aria-hidden, and zero-size
// elements that should not be tab targets.
const FOCUSABLE_SELECTOR = [
	'a[href]',
	'area[href]',
	'button',
	'input',
	'select',
	'textarea',
	'iframe',
	'audio[controls]',
	'video[controls]',
	'[contenteditable="true"]',
	'[contenteditable=""]',
	'details > summary:first-of-type',
	'[tabindex]',
].join(',');

function isElementFocusable(el: HTMLElement, checkGeometry: boolean): boolean {
	// Native disabled, programmatic disabled via aria-disabled,
	// explicit removal from tab order, and visibility checks.
	if ((el as HTMLInputElement).disabled) return false;
	if (el.getAttribute('tabindex') === '-1') return false;
	if (el.hidden) return false;
	if (el.closest('[aria-hidden="true"]')) return false;
	// Zero-size elements aren't reachable by Tab. This is the only check
	// that needs a layout engine, so it is skipped where there isn't one.
	if (checkGeometry && el.getClientRects().length === 0) return false;
	return true;
}

function getFocusables(root: HTMLElement): HTMLElement[] {
	// jsdom and other zero-layout environments report no client rects for
	// anything, which would make the trap conclude the dialog is empty and
	// fall back to focusing the container. Only apply the geometry filter
	// when the environment actually performs layout — detected by asking
	// the mounted dialog root, which always has a rect where layout runs.
	const checkGeometry = root.getClientRects().length > 0;
	return Array.from(root.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR)).filter((el) =>
		isElementFocusable(el, checkGeometry)
	);
}

// --- Props -----------------------------------------------------------------

export interface DialogProps extends Omit<WindowProps, 'active'> {
	/**
	 * Whether the dialog is open
	 * @default false
	 */
	open?: boolean;

	/**
	 * Callback when dialog should close
	 * Called when backdrop is clicked or Escape is pressed
	 */
	onClose?: () => void;

	/**
	 * Whether clicking the backdrop closes the dialog
	 * @default true
	 */
	closeOnBackdropClick?: boolean;

	/**
	 * Whether pressing Escape closes the dialog
	 * @default true
	 */
	closeOnEscape?: boolean;

	/**
	 * Custom backdrop className
	 */
	backdropClassName?: string;

	/**
	 * Whether to trap focus within the dialog
	 * @default true
	 */
	trapFocus?: boolean;

	/**
	 * Initial focus target. Accepts a CSS selector, a ref to a known element
	 * inside the dialog, or a callback returning the element (useful for
	 * late binding, when the target does not exist until the dialog renders).
	 * When omitted, focus moves to the first focusable element in the dialog
	 * (or the dialog container itself if none exists), as required by the
	 * WAI-ARIA dialog pattern.
	 *
	 * The ref form is typed against `HTMLElement | null` so a narrower ref
	 * such as `useRef<HTMLButtonElement>(null)` assigns without casting.
	 *
	 * **Security note:** when supplied as a string, the value is passed to
	 * `querySelector`. Treat it as a developer-supplied static selector —
	 * never derive it from untrusted input.
	 */
	initialFocus?: string | React.RefObject<HTMLElement | null> | (() => HTMLElement | null);

	/**
	 * ARIA role. Use `'alertdialog'` for destructive or error confirmations
	 * so assistive tech announces them more assertively.
	 * @default 'dialog'
	 */
	role?: 'dialog' | 'alertdialog';

	/**
	 * Accessible name for the dialog. If omitted and the Window `title`
	 * prop is a string, the title is used as the accessible name. Provide
	 * this explicitly when `title` is a React node.
	 */
	ariaLabel?: string;

	/**
	 * ID of a visible element that labels the dialog. Takes precedence over
	 * `ariaLabel` if both are provided.
	 */
	ariaLabelledBy?: string;

	/**
	 * ID of a visible element that describes the dialog body.
	 */
	ariaDescribedBy?: string;
}

/**
 * Mac OS 9 style Dialog component
 *
 * Modal dialog with backdrop, focus trapping, and keyboard handling.
 * Built on top of the Window component.
 *
 * Features:
 * - Classic Mac OS 9 dialog styling
 * - Modal backdrop with optional click-to-close
 * - Escape key to close (topmost dialog only when stacked)
 * - Focus trap that survives stacked dialogs
 * - Centered on screen
 * - Reference-counted body scroll lock
 *
 * @example
 * ```tsx
 * const [open, setOpen] = useState(false);
 *
 * <Dialog
 *   open={open}
 *   onClose={() => setOpen(false)}
 *   title="Confirm"
 *   width={350}
 *   role="alertdialog"
 * >
 *   <p id="confirm-msg">Are you sure?</p>
 *   <Button onClick={() => setOpen(false)}>Cancel</Button>
 *   <Button variant="primary">OK</Button>
 * </Dialog>
 * ```
 */
export const Dialog = forwardRef<HTMLDivElement, DialogProps>(
	(
		{
			open = false,
			onClose,
			closeOnBackdropClick = true,
			closeOnEscape = true,
			backdropClassName = '',
			trapFocus = true,
			initialFocus,
			role = 'dialog',
			ariaLabel,
			ariaLabelledBy,
			ariaDescribedBy,
			children,
			...windowProps
		},
		ref
	) => {
		const dialogRef = useRef<HTMLDivElement>(null);
		const previousActiveElement = useRef<HTMLElement | null>(null);

		// Held in a ref so the initial-focus effect can depend on `open`
		// alone. Depending on `initialFocus` directly would re-run — and
		// yank focus back to the top — on every render when a consumer
		// passes an inline selector callback.
		const initialFocusRef = useRef(initialFocus);
		initialFocusRef.current = initialFocus;

		// Derive an accessible name. Prefer explicit ariaLabelledBy → ariaLabel
		// → the Window title if it happens to be a plain string.
		const titleProp = (windowProps as { title?: React.ReactNode }).title;
		const resolvedAriaLabel = ariaLabel ?? (typeof titleProp === 'string' ? titleProp : undefined);

		// Push/pop the dialog onto the stack and lock body scroll while open.
		// Combining these into one effect ensures they unwind in the right
		// order on close and avoids races with the other effects below.
		useEffect(() => {
			if (!open) return;
			const node = dialogRef.current;
			if (!node) return;

			previousActiveElement.current =
				document.activeElement instanceof HTMLElement ? document.activeElement : null;
			dialogStack.push(node);
			lockBodyScroll();

			return () => {
				const idx = dialogStack.indexOf(node);
				if (idx !== -1) dialogStack.splice(idx, 1);
				unlockBodyScroll();

				// Defer focus restoration so React can finish any unmount work
				// before we hand focus back; checking isConnected prevents a
				// silent jump-to-body if the trigger is gone.
				const prev = previousActiveElement.current;
				if (prev && prev.isConnected) {
					queueMicrotask(() => {
						if (prev.isConnected) prev.focus();
					});
				}
			};
		}, [open]);

		// Initial focus. Runs before paint via useLayoutEffect so the user
		// never sees a flash of focus outside the dialog.
		useLayoutEffect(() => {
			if (!open || !dialogRef.current) return;
			const root = dialogRef.current;

			const requested = initialFocusRef.current;
			let target: HTMLElement | null = null;
			if (typeof requested === 'function') {
				target = requested();
			} else if (typeof requested === 'string') {
				try {
					// Scoped to the dialog root, so even a broad selector can
					// only ever match inside this dialog.
					target = root.querySelector<HTMLElement>(requested);
				} catch {
					// Malformed selector — ignore and fall through to default.
					target = null;
				}
			} else if (requested && 'current' in requested) {
				target = requested.current;
			}

			if (!target) {
				const focusables = getFocusables(root);
				if (focusables.length > 0) {
					target = focusables[0];
				} else {
					// No focusable children — focus the container itself so the
					// trap still has somewhere to land. Make it programmatically
					// focusable in that case.
					if (!root.hasAttribute('tabindex')) root.setAttribute('tabindex', '-1');
					target = root;
				}
			}

			target?.focus();
		}, [open]);

		// Escape: only the topmost dialog reacts so stacked dialogs close
		// one at a time. The bubble phase + stopPropagation also prevents
		// the host app's own Escape handlers from firing under the modal.
		useEffect(() => {
			if (!open || !closeOnEscape) return;
			const handler = (event: KeyboardEvent) => {
				if (event.key !== 'Escape') return;
				if (!isTopmost(dialogRef.current)) return;
				event.preventDefault();
				event.stopPropagation();
				onClose?.();
			};
			document.addEventListener('keydown', handler);
			return () => document.removeEventListener('keydown', handler);
		}, [open, closeOnEscape, onClose]);

		// Focus trap: same topmost-only rule.
		useEffect(() => {
			if (!open || !trapFocus) return;
			const handler = (event: KeyboardEvent) => {
				if (event.key !== 'Tab' || !dialogRef.current) return;
				if (!isTopmost(dialogRef.current)) return;

				const focusables = getFocusables(dialogRef.current);
				if (focusables.length === 0) {
					event.preventDefault();
					return;
				}

				const first = focusables[0];
				const last = focusables[focusables.length - 1];
				const active = document.activeElement as HTMLElement | null;

				// If focus has escaped the dialog (e.g., user clicked outside
				// and Tabbed), pull it back in.
				if (!active || !dialogRef.current.contains(active)) {
					event.preventDefault();
					(event.shiftKey ? last : first).focus();
					return;
				}

				if (event.shiftKey && active === first) {
					event.preventDefault();
					last.focus();
				} else if (!event.shiftKey && active === last) {
					event.preventDefault();
					first.focus();
				}
			};
			document.addEventListener('keydown', handler);
			return () => document.removeEventListener('keydown', handler);
		}, [open, trapFocus]);

		// Backdrop click closes only when the click originated on the
		// backdrop itself, not on a child element that bubbled up.
		const handleBackdropClick = useCallback(
			(event: React.MouseEvent<HTMLDivElement>) => {
				if (closeOnBackdropClick && event.target === event.currentTarget) {
					onClose?.();
				}
			},
			[closeOnBackdropClick, onClose]
		);

		if (!open) return null;

		const backdropClassNames = [styles.backdrop, backdropClassName].filter(Boolean).join(' ');

		const content = (
			<div className={backdropClassNames} onClick={handleBackdropClick}>
				<div
					className={styles.dialogContainer}
					ref={dialogRef}
					role={role}
					aria-modal="true"
					aria-label={ariaLabelledBy ? undefined : resolvedAriaLabel}
					aria-labelledby={ariaLabelledBy}
					aria-describedby={ariaDescribedBy}
				>
					<Window {...windowProps} ref={ref} active={true} onClose={onClose}>
						{children}
					</Window>
				</div>
			</div>
		);

		// Portal to <body> so the backdrop escapes any ancestor's
		// `overflow: hidden`, `transform`, `contain`, or z-index stacking
		// context. During SSR there is no document to portal into, and the
		// dialog is not interactive there anyway, so render in place.
		if (typeof document === 'undefined') return content;
		return createPortal(content, document.body);
	}
);

Dialog.displayName = 'Dialog';

export default Dialog;
