// Window component - Mac OS 9 style
// Classic window container with optional title bar
//
// Interaction notes (panel review #21-#27, #54, #55, #98):
//  - Drag and resize run on the shared useDraggable / useResizable hooks, so
//    the document-listener lifecycle lives in one place instead of being
//    re-implemented per component (#55)
//  - Pointer moves are coalesced into one requestAnimationFrame callback, so
//    a high-refresh pointer can't drive more than one state update per
//    frame (#21)
//  - Geometry is measured once at gesture start and the gesture then works in
//    pure pointer deltas: no per-frame layout reads (#23), and no dependence
//    on offsetParent, which is wrong under transforms and null inside a
//    position:fixed chain (#22)
//  - A controlled `position` applies the moment it appears rather than only
//    after the first manual drag (#26)
//  - All eight edges and corners expose resize handles, and the cursor turns
//    to not-allowed while pinned against a min/max limit (#27)
//  - The title bar is a focusable toolbar: arrow keys move, Shift+arrow
//    resizes, Alt selects a 1px step, and both announce politely (#25)
//  - The pinstripe title texture is memoized so its 18 <rect> nodes don't
//    reconcile on every drag frame (#54)
//  - z-order and the active flag are coordinated by an optional
//    WindowManagerProvider; `active` now defaults to false (#24, #98)

import React, {
	forwardRef,
	memo,
	useCallback,
	useEffect,
	useId,
	useMemo,
	useRef,
	useState,
} from 'react';
import { mergeClasses } from '../../utils/classNames';
import { WindowPosition } from '../../types';
import { useDraggable } from '../../hooks/useDraggable';
import { useResizable, type ResizeDirection, type ResizeRect } from '../../hooks/useResizable';
import { clamp } from '../../hooks/gestureGeometry';
import { useWindowManager } from '../WindowManager/WindowManager';
import styles from './Window.module.css';

/**
 * The pinstripe texture that flanks the window title.
 *
 * Memoized because it is pure static decoration: nine <rect> nodes per side,
 * eighteen in total, that React would otherwise reconcile on every drag frame
 * as the window's position state changes (issue #54).
 */
const TitleBarTexture = memo(function TitleBarTexture(): React.JSX.Element {
	return (
		<svg
			width="132"
			height="13"
			viewBox="0 0 132 13"
			fill="none"
			preserveAspectRatio="none"
			xmlns="http://www.w3.org/2000/svg"
			aria-hidden="true"
			focusable="false"
		>
			<rect width="130.517" height="13" fill="#DDDDDD" />
			<rect width="1" height="13" fill="#EEEEEE" />
			<rect x="130" width="1" height="13" fill="#C5C5C5" />
			<rect y="1" width="131.268" height="1" fill="#999999" />
			<rect y="5" width="131.268" height="1" fill="#999999" />
			<rect y="9" width="131.268" height="1" fill="#999999" />
			<rect y="3" width="131.268" height="1" fill="#999999" />
			<rect y="7" width="131.268" height="1" fill="#999999" />
			<rect y="11" width="131.268" height="1" fill="#999999" />
		</svg>
	);
});

/** Every edge and corner a resizable window exposes (issue #27). */
const RESIZE_DIRECTIONS: readonly ResizeDirection[] = [
	'n',
	's',
	'e',
	'w',
	'ne',
	'nw',
	'se',
	'sw',
] as const;

/** Pixels a single arrow-key press moves or resizes the window (issue #25). */
const KEYBOARD_STEP = 8;

/** Finer step when Alt is held, for precise placement. */
const KEYBOARD_FINE_STEP = 1;

/**
 * Classes for targeting Window sub-elements
 */
export interface WindowClasses {
	/** Root container */
	root?: string;
	/** Title bar */
	titleBar?: string;
	/** Title text */
	titleText?: string;
	/** Window controls container */
	controls?: string;
	/** Individual control button */
	controlButton?: string;
	/** Content area */
	content?: string;
}

export interface WindowProps {
	/**
	 * Window content
	 */
	children: React.ReactNode;

	/**
	 * Window title (displays in title bar if no titleBar prop provided)
	 */
	title?: string;

	/**
	 * Custom title bar component
	 * If provided, overrides the default title bar
	 */
	titleBar?: React.ReactNode;

	/**
	 * Whether the window is active/focused.
	 *
	 * Inside a `WindowManagerProvider` this is derived from stack order and
	 * only needs setting to override the manager. Outside one it defaults to
	 * `false`, matching every other boolean flag in the library — a window
	 * that should render focused must now say so explicitly.
	 *
	 * @default false (or manager-derived inside a WindowManagerProvider)
	 */
	active?: boolean;

	/**
	 * Width of the window
	 * @default 'auto'
	 */
	width?: number | string;

	/**
	 * Height of the window
	 * @default 'auto'
	 */
	height?: number | string;

	/**
	 * Custom class name for the window container
	 */
	className?: string;

	/**
	 * Custom class name for the content area
	 */
	contentClassName?: string;

	/**
	 * Custom classes for targeting sub-elements
	 */
	classes?: WindowClasses;

	/**
	 * Whether to show window controls (close, minimize, maximize)
	 * @default true
	 */
	showControls?: boolean;

	/**
	 * Callback when close button is clicked
	 */
	onClose?: () => void;

	/**
	 * Callback when minimize button is clicked
	 */
	onMinimize?: () => void;

	/**
	 * Callback when maximize button is clicked
	 */
	onMaximize?: () => void;

	/**
	 * Callback when mouse enters the window
	 */
	onMouseEnter?: (event: React.MouseEvent<HTMLDivElement>) => void;

	/**
	 * Whether the window has a resize handle
	 * @default false
	 */
	resizable?: boolean;

	/**
	 * Minimum width when resizing
	 * @default 200
	 */
	minWidth?: number;

	/**
	 * Minimum height when resizing
	 * @default 100
	 */
	minHeight?: number;

	/**
	 * Maximum width when resizing
	 */
	maxWidth?: number;

	/**
	 * Maximum height when resizing
	 */
	maxHeight?: number;

	/**
	 * Callback when window is resized
	 * Only called when resizable is true
	 */
	onResize?: (size: { width: number; height: number }) => void;

	/**
	 * Whether the window can be dragged by its title bar
	 * Window starts in normal flow and becomes absolutely positioned when dragged
	 * @default false
	 */
	draggable?: boolean;

	/**
	 * Initial position for draggable windows (uncontrolled)
	 * Only used when draggable is true
	 */
	defaultPosition?: WindowPosition;

	/**
	 * Controlled position for draggable windows
	 * Only used when draggable is true
	 */
	position?: WindowPosition;

	/**
	 * Callback when window position changes (during drag)
	 * Only called when draggable is true
	 */
	onPositionChange?: (position: WindowPosition) => void;

	/**
	 * How drag movement is constrained.
	 *
	 * - `'parent'` (default) — at least 24px of the title bar always stays
	 *   inside the parent / offsetParent so the user can't lose the window
	 *   by flinging it off-screen.
	 * - `'none'` — no constraint. Caller is responsible for keeping the
	 *   window reachable.
	 *
	 * @default 'parent'
	 */
	boundary?: 'parent' | 'none';

	/**
	 * Explicit stack order. Overrides the z-index a surrounding
	 * `WindowManagerProvider` would otherwise assign.
	 */
	zIndex?: number;

	/**
	 * Callback when the window is raised to the front, either by a pointer
	 * press or by keyboard focus.
	 */
	onFocus?: () => void;

	/**
	 * Which edges and corners expose a resize handle. Ignored unless
	 * `resizable` is true.
	 * @default all eight edges and corners
	 */
	resizeDirections?: readonly ResizeDirection[];

	/**
	 * Step in pixels for keyboard move/resize from the title bar.
	 * @default 8
	 */
	keyboardStep?: number;
}

/**
 * Mac OS 9 style Window component
 *
 * Classic window container with title bar and content area.
 *
 * Features:
 * - Classic Mac OS 9 window styling with beveled edges
 * - Optional title bar with window controls
 * - Active/inactive states
 * - Composable with custom TitleBar component
 * - Flexible sizing
 * - Draggable windows (optional) - drag by title bar
 *
 * @example
 * ```tsx
 * // Simple window with title
 * <Window title="My Window">
 *   <p>Window content goes here</p>
 * </Window>
 *
 * // Window with custom title bar
 * <Window titleBar={<TitleBar title="Custom" />}>
 *   <p>Content</p>
 * </Window>
 *
 * // Window with controls and callbacks
 * <Window
 *   title="Document"
 *   onClose={() => console.log('Close')}
 *   onMinimize={() => console.log('Minimize')}
 * >
 *   <p>Content</p>
 * </Window>
 *
 * // Draggable window (uncontrolled)
 * <Window title="Draggable" draggable>
 *   <p>Drag me by the title bar!</p>
 * </Window>
 *
 * // Draggable window with initial position
 * <Window
 *   title="Positioned"
 *   draggable
 *   defaultPosition={{ x: 100, y: 100 }}
 * >
 *   <p>Starts at a specific position</p>
 * </Window>
 *
 * // Controlled draggable window
 * const [pos, setPos] = useState({ x: 0, y: 0 });
 * <Window
 *   title="Controlled"
 *   draggable
 *   position={pos}
 *   onPositionChange={setPos}
 * >
 *   <p>Parent controls position</p>
 * </Window>
 * ```
 */
export const Window = forwardRef<HTMLDivElement, WindowProps>(
	(
		{
			children,
			title,
			titleBar,
			active,
			width = 'auto',
			height = 'auto',
			className = '',
			contentClassName = '',
			classes,
			showControls = true,
			onClose,
			onMinimize,
			onMaximize,
			onMouseEnter,
			resizable = false,
			minWidth = 200,
			minHeight = 100,
			maxWidth,
			maxHeight,
			onResize,
			draggable = false,
			defaultPosition,
			position: controlledPosition,
			onPositionChange,
			boundary = 'parent',
			zIndex,
			onFocus,
			resizeDirections = RESIZE_DIRECTIONS,
			keyboardStep = KEYBOARD_STEP,
		},
		ref
	) => {
		// Root element, needed by the gesture hooks to measure geometry and by
		// the manager integration to raise on pointer press.
		const windowRef = useRef<HTMLDivElement | null>(null);
		const setWindowRef = useCallback(
			(node: HTMLDivElement | null) => {
				windowRef.current = node;
				if (typeof ref === 'function') ref(node);
				else if (ref) (ref as React.MutableRefObject<HTMLDivElement | null>).current = node;
			},
			[ref]
		);

		// --- Window manager integration (issue #24) ---------------------------
		// Optional: outside a provider this is null and the window falls back
		// entirely to its own props, preserving the previous behaviour.
		const manager = useWindowManager();
		const windowId = useId();

		useEffect(() => {
			if (!manager) return;
			manager.register(windowId);
			return () => manager.unregister(windowId);
			// `manager` identity changes whenever the stack does; depending on
			// it here would unregister/re-register on every raise.
			// eslint-disable-next-line react-hooks/exhaustive-deps
		}, [windowId]);

		const raiseSelf = useCallback(() => {
			manager?.raise(windowId);
			onFocus?.();
		}, [manager, windowId, onFocus]);

		// Explicit prop wins; then manager stack order; then the `false`
		// default that matches every other boolean flag (issue #98).
		const resolvedActive = active ?? (manager ? manager.activeId === windowId : false);
		const resolvedZIndex = zIndex ?? (manager ? manager.getZIndex(windowId) : undefined);

		// --- Position state ---------------------------------------------------

		const [internalPosition, setInternalPosition] = useState<WindowPosition | null>(
			defaultPosition || null
		);

		// A controlled `position` is honoured the moment it appears, not only
		// after the user has dragged manually (issue #26).
		const isPositioned = !!(controlledPosition || internalPosition);
		const currentPosition = controlledPosition || internalPosition;

		const commitPosition = useCallback(
			(next: WindowPosition) => {
				if (controlledPosition && onPositionChange) onPositionChange(next);
				else setInternalPosition(next);
			},
			[controlledPosition, onPositionChange]
		);

		// --- Size state -------------------------------------------------------
		// `hasBeenResized` latches on first resize; from then on internalSize is
		// canonical so the user's size survives pointerup (issue #10).
		const [internalSize, setInternalSize] = useState<{
			width: number | string;
			height: number | string;
		}>({ width, height });
		const [hasBeenResized, setHasBeenResized] = useState(false);

		const currentWidth = hasBeenResized ? internalSize.width : width;
		const currentHeight = hasBeenResized ? internalSize.height : height;

		// --- Screen-reader announcements for keyboard move/resize (issue #25) --
		const [announcement, setAnnouncement] = useState('');

		// --- Drag -------------------------------------------------------------

		const resolveWindowElement = useCallback(() => windowRef.current, []);

		const { isDragging, handleProps: dragHandleProps } = useDraggable({
			enabled: draggable,
			resolveTarget: resolveWindowElement,
			boundary,
			onDrag: commitPosition,
			onDragStart: raiseSelf,
		});

		// --- Resize -----------------------------------------------------------

		const handleResizeFrame = useCallback(
			(rect: ResizeRect) => {
				setInternalSize({ width: rect.width, height: rect.height });
				setHasBeenResized(true);
				onResize?.({ width: rect.width, height: rect.height });

				// A north/west handle grows the box toward the pointer, so the
				// origin shifts to keep the opposite edge anchored.
				if (rect.dx !== 0 || rect.dy !== 0) {
					const base = currentPosition ?? { x: 0, y: 0 };
					commitPosition({ x: base.x + rect.dx, y: base.y + rect.dy });
				}
			},
			[onResize, commitPosition, currentPosition]
		);

		const { isResizing, isClamped, getHandleProps } = useResizable({
			enabled: resizable,
			resolveTarget: resolveWindowElement,
			minWidth,
			minHeight,
			maxWidth,
			maxHeight,
			onResize: handleResizeFrame,
			onResizeStart: raiseSelf,
		});

		// --- Keyboard move / resize (issue #25, WCAG 2.1.1) -------------------
		// Arrow keys move the window; Shift+Arrow resizes it; Alt selects a
		// 1px fine step. Both are announced politely so screen-reader users
		// get feedback that something moved.
		const handleTitleBarKeyDown = useCallback(
			(event: React.KeyboardEvent<HTMLDivElement>) => {
				const deltas: Record<string, [number, number]> = {
					ArrowLeft: [-1, 0],
					ArrowRight: [1, 0],
					ArrowUp: [0, -1],
					ArrowDown: [0, 1],
				};
				const delta = deltas[event.key];
				if (!delta) return;

				const resizing = event.shiftKey;
				if (resizing && !resizable) return;
				if (!resizing && !draggable) return;

				event.preventDefault();
				const step = event.altKey ? KEYBOARD_FINE_STEP : keyboardStep;
				const [dx, dy] = delta;

				if (resizing) {
					const element = windowRef.current;
					if (!element) return;
					const baseWidth = typeof currentWidth === 'number' ? currentWidth : element.offsetWidth;
					const baseHeight =
						typeof currentHeight === 'number' ? currentHeight : element.offsetHeight;

					const nextWidth = clamp(
						baseWidth + dx * step,
						minWidth,
						maxWidth ?? Number.POSITIVE_INFINITY
					);
					const nextHeight = clamp(
						baseHeight + dy * step,
						minHeight,
						maxHeight ?? Number.POSITIVE_INFINITY
					);

					setInternalSize({ width: nextWidth, height: nextHeight });
					setHasBeenResized(true);
					onResize?.({ width: nextWidth, height: nextHeight });
					setAnnouncement(`Width ${Math.round(nextWidth)}, height ${Math.round(nextHeight)}`);
					return;
				}

				const base = currentPosition ?? {
					x: windowRef.current?.offsetLeft ?? 0,
					y: windowRef.current?.offsetTop ?? 0,
				};
				const next = { x: base.x + dx * step, y: base.y + dy * step };
				commitPosition(next);
				setAnnouncement(`Position ${Math.round(next.x)}, ${Math.round(next.y)}`);
			},
			[
				draggable,
				resizable,
				keyboardStep,
				currentWidth,
				currentHeight,
				minWidth,
				minHeight,
				maxWidth,
				maxHeight,
				onResize,
				currentPosition,
				commitPosition,
			]
		);

		// Class names
		const windowClassNames = mergeClasses(
			styles.window,
			resolvedActive ? styles['window--active'] : styles['window--inactive'],
			draggable && isPositioned && styles['window--draggable'],
			className,
			classes?.root
		);

		const contentClassNames = mergeClasses(styles.content, contentClassName, classes?.content);

		const titleBarClassNames = mergeClasses(
			styles.titleBar,
			draggable && styles['titleBar--draggable'],
			isDragging && styles['titleBar--dragging'],
			classes?.titleBar
		);

		// Window style
		const windowStyle: React.CSSProperties = {};

		// Apply width - use currentWidth during resize, otherwise use prop
		if (currentWidth !== 'auto') {
			windowStyle.width = typeof currentWidth === 'number' ? `${currentWidth}px` : currentWidth;
		}

		// Apply height - use currentHeight during resize, otherwise use prop
		if (currentHeight !== 'auto') {
			windowStyle.height = typeof currentHeight === 'number' ? `${currentHeight}px` : currentHeight;
		}

		// Apply position as soon as one exists, whether it came from
		// defaultPosition, a controlled `position`, or a drag (issue #26).
		if (draggable && currentPosition) {
			windowStyle.position = 'absolute';
			windowStyle.left = `${currentPosition.x}px`;
			windowStyle.top = `${currentPosition.y}px`;
		}

		if (resolvedZIndex !== undefined) {
			windowStyle.zIndex = resolvedZIndex;
		}

		// Render title bar if title provided and no custom titleBar
		const renderTitleBar = () => {
			if (titleBar) {
				return titleBar;
			}

			if (title) {
				return (
					<div
						className={titleBarClassNames}
						data-numControls={[onClose, onMinimize, onMaximize].filter(Boolean).length}
						{...dragHandleProps}
						onKeyDown={handleTitleBarKeyDown}
						// The title bar becomes a real tab stop when it can be
						// moved or resized, so keyboard users can reach the
						// arrow-key affordance at all (issue #25).
						tabIndex={draggable || resizable ? 0 : undefined}
						role={draggable || resizable ? 'toolbar' : undefined}
						aria-label={
							draggable || resizable
								? `${title} window controls. Arrow keys move${
										resizable ? ', Shift plus arrow keys resize' : ''
									}.`
								: undefined
						}
					>
						{showControls && (
							<div className={mergeClasses(styles.controls, classes?.controls)}>
								{onClose && (
									<button
										type="button"
										className={mergeClasses(styles.controlButton, classes?.controlButton)}
										onClick={onClose}
										aria-label="Close"
										title="Close"
									>
										<div className={styles.closeBox} />
									</button>
								)}
								{onMinimize && (
									<button
										type="button"
										className={mergeClasses(styles.controlButton, classes?.controlButton)}
										onClick={onMinimize}
										aria-label="Minimize"
										title="Minimize"
									>
										<div className={styles.minimizeBox} />
									</button>
								)}
								{onMaximize && (
									<button
										type="button"
										className={mergeClasses(styles.controlButton, classes?.controlButton)}
										onClick={onMaximize}
										aria-label="Maximize"
										title="Maximize"
									>
										<div className={styles.maximizeBox} />
									</button>
								)}
							</div>
						)}
						<div className={styles.titleCenter}>
							<TitleBarTexture />
							<div className={mergeClasses(styles.titleText, classes?.titleText, 'bold')}>
								{title}
							</div>
							<TitleBarTexture />
						</div>
					</div>
				);
			}

			return null;
		};

		return (
			<div
				ref={setWindowRef}
				className={windowClassNames}
				style={windowStyle}
				onMouseEnter={onMouseEnter}
				// Raise on press so a partially obscured window comes forward,
				// and on focus so keyboard traversal does the same (issue #24).
				onPointerDownCapture={raiseSelf}
				onFocusCapture={raiseSelf}
			>
				{renderTitleBar()}
				<div className={contentClassNames}>{children}</div>

				{/* Announces keyboard-driven moves and resizes (issue #25). */}
				<div className={styles.visuallyHidden} role="status" aria-live="polite">
					{announcement}
				</div>

				{resizable &&
					resizeDirections.map((direction) => (
						<div
							key={direction}
							{...getHandleProps(direction)}
							className={mergeClasses(
								styles.resizeHandle,
								styles[`resizeHandle--${direction}`],
								isClamped && styles['resizeHandle--clamped']
							)}
							aria-hidden="true"
						/>
					))}
			</div>
		);
	}
);

Window.displayName = 'Window';

export default Window;
