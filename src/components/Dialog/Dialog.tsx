// Dialog component - Mac OS 9 style
// Modal dialog with backdrop and focus trapping

import React, { forwardRef, useEffect, useRef, useCallback } from 'react';
import { Window, type WindowProps } from '../Window/Window';
import styles from './Dialog.module.css';

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
	 * Initial focus element selector or ref
	 */
	initialFocus?: string | React.RefObject<HTMLElement>;
}

/**
 * Mac OS 9 style Dialog component
 * 
 * Modal dialog with backdrop, focus trapping, and keyboard handling.
 * Built on top of the Window component.
 * 
 * Features:
 * - Classic Mac OS 9 dialog styling
 * - Modal backdrop with click-to-close
 * - Escape key to close
 * - Focus trapping within dialog
 * - Centered on screen
 * - Prevents body scroll when open
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
 * >
 *   <p>Are you sure?</p>
 *   <div>
 *     <Button onClick={() => setOpen(false)}>Cancel</Button>
 *     <Button variant="primary">OK</Button>
 *   </div>
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
			children,
			...windowProps
		},
		ref
	) => {
		const dialogRef = useRef<HTMLDivElement>(null);
		const previousActiveElement = useRef<HTMLElement | null>(null);

		// Handle Escape key
		useEffect(() => {
			if (!open || !closeOnEscape) return;

			const handleEscape = (event: KeyboardEvent) => {
				if (event.key === 'Escape') {
					event.preventDefault();
					event.stopPropagation();
					onClose?.();
				}
			};

			document.addEventListener('keydown', handleEscape);
			return () => document.removeEventListener('keydown', handleEscape);
		}, [open, closeOnEscape, onClose]);

		// Store previous active element and restore on close
		useEffect(() => {
			if (open) {
				previousActiveElement.current = document.activeElement as HTMLElement;
			} else if (previousActiveElement.current) {
				previousActiveElement.current.focus();
			}
		}, [open]);

		// Set initial focus
		useEffect(() => {
			if (!open || !initialFocus) return;

			const focusElement = () => {
				if (typeof initialFocus === 'string') {
					const element = dialogRef.current?.querySelector(initialFocus) as HTMLElement;
					element?.focus();
				} else if (initialFocus.current) {
					initialFocus.current.focus();
				}
			};

			// Small delay to ensure dialog is rendered
			setTimeout(focusElement, 10);
		}, [open, initialFocus]);

		// Focus trapping
		useEffect(() => {
			if (!open || !trapFocus) return;

			const handleTabKey = (event: KeyboardEvent) => {
				if (event.key !== 'Tab' || !dialogRef.current) return;

				const focusableElements = dialogRef.current.querySelectorAll(
					'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
				);

				const firstElement = focusableElements[0] as HTMLElement;
				const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement;

				if (event.shiftKey) {
					// Shift + Tab
					if (document.activeElement === firstElement) {
						event.preventDefault();
						lastElement?.focus();
					}
				} else {
					// Tab
					if (document.activeElement === lastElement) {
						event.preventDefault();
						firstElement?.focus();
					}
				}
			};

			document.addEventListener('keydown', handleTabKey);
			return () => document.removeEventListener('keydown', handleTabKey);
		}, [open, trapFocus]);

		// Prevent body scroll when dialog is open
		useEffect(() => {
			if (open) {
				document.body.style.overflow = 'hidden';
			} else {
				document.body.style.overflow = '';
			}

			return () => {
				document.body.style.overflow = '';
			};
		}, [open]);

		// Handle backdrop click
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

		return (
			<div
				className={backdropClassNames}
				onClick={handleBackdropClick}
				role="presentation"
				aria-modal="true"
			>
				<div className={styles.dialogContainer} ref={dialogRef} role="dialog" aria-modal="true">
					<Window {...windowProps} ref={ref} active={true} onClose={onClose}>
						{children}
					</Window>
				</div>
			</div>
		);
	}
);

Dialog.displayName = 'Dialog';

export default Dialog;
