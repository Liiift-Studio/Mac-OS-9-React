// Window component - Mac OS 9 style
// Classic window container with optional title bar

import React, { forwardRef, useState, useRef, useEffect, useCallback } from 'react';
import { mergeClasses } from '../../utils/classNames';
import { WindowPosition } from '../../types';
import styles from './Window.module.css';

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
	 * Whether window is active/focused
	 * @default true
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
			active = true,
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
		},
		ref
	) => {
		// Ref to store the window element being dragged
		// This avoids the need for DOM queries during mousemove
		const dragWindowRef = useRef<HTMLElement | null>(null);

		// Drag state management
		const [internalPosition, setInternalPosition] = useState<WindowPosition | null>(
			defaultPosition || null
		);
		const [isDragging, setIsDragging] = useState(false);
		const [hasBeenDragged, setHasBeenDragged] = useState(
			!!(defaultPosition || controlledPosition)
		);
		const dragStartRef = useRef<{ x: number; y: number } | null>(null);

		// Resize state management
		const [internalSize, setInternalSize] = useState<{ width: number | string; height: number | string }>({
			width,
			height,
		});
		const [isResizing, setIsResizing] = useState(false);
		const resizeStartRef = useRef<{ width: number; height: number; mouseX: number; mouseY: number } | null>(null);

		// Use controlled position if provided, otherwise use internal state
		const currentPosition = controlledPosition || internalPosition;

		// Use internal size state for resize tracking
		const currentWidth = isResizing ? internalSize.width : width;
		const currentHeight = isResizing ? internalSize.height : height;

		// Handle mouse down on title bar to start dragging
		const handleTitleBarMouseDown = useCallback(
			(event: React.MouseEvent<HTMLDivElement>) => {
				if (!draggable) return;

				// Don't start drag if clicking on buttons
				if ((event.target as HTMLElement).closest('button')) {
					return;
				}

				event.preventDefault();

				const windowElement = (event.currentTarget as HTMLElement).closest(
					`.${styles.window}`
				) as HTMLElement;

				if (!windowElement) return;

				// Store the window element reference for use during drag
				dragWindowRef.current = windowElement;

				const rect = windowElement.getBoundingClientRect();
				
				// Get the parent container to calculate position relative to it
				const parent = windowElement.offsetParent as HTMLElement;
				const parentRect = parent ? parent.getBoundingClientRect() : { left: 0, top: 0 };

				// Store drag start info - offset from mouse to window position within parent
				// This accounts for the parent's coordinate system
				dragStartRef.current = {
					x: event.clientX - (rect.left - parentRect.left),
					y: event.clientY - (rect.top - parentRect.top),
				};

				setIsDragging(true);
			},
			[draggable]
		);

		// Handle mouse down on resize handle to start resizing
		const handleResizeMouseDown = useCallback(
			(event: React.MouseEvent<HTMLDivElement>) => {
				if (!resizable) return;

				event.preventDefault();
				event.stopPropagation();

				const windowElement = (event.currentTarget as HTMLElement).closest(
					`.${styles.window}`
				) as HTMLElement;

				if (!windowElement) return;

				const rect = windowElement.getBoundingClientRect();

				// Store resize start info
				resizeStartRef.current = {
					width: rect.width,
					height: rect.height,
					mouseX: event.clientX,
					mouseY: event.clientY,
				};

				setIsResizing(true);
			},
			[resizable]
		);

		// Handle mouse move during resize
		useEffect(() => {
			if (!isResizing || !resizeStartRef.current) return;

			const handleMouseMove = (event: MouseEvent) => {
				event.preventDefault();

				if (!resizeStartRef.current) return;

				// Calculate delta
				const deltaX = event.clientX - resizeStartRef.current.mouseX;
				const deltaY = event.clientY - resizeStartRef.current.mouseY;

				// Calculate new size
				let newWidth = resizeStartRef.current.width + deltaX;
				let newHeight = resizeStartRef.current.height + deltaY;

				// Apply constraints
				if (newWidth < minWidth) newWidth = minWidth;
				if (newHeight < minHeight) newHeight = minHeight;
				if (maxWidth && newWidth > maxWidth) newWidth = maxWidth;
				if (maxHeight && newHeight > maxHeight) newHeight = maxHeight;

				// Update size
				setInternalSize({
					width: newWidth,
					height: newHeight,
				});

				// Call callback if provided
				if (onResize) {
					onResize({ width: newWidth, height: newHeight });
				}
			};

			const handleMouseUp = () => {
				setIsResizing(false);
				resizeStartRef.current = null;
			};

			document.addEventListener('mousemove', handleMouseMove);
			document.addEventListener('mouseup', handleMouseUp);

			return () => {
				document.removeEventListener('mousemove', handleMouseMove);
				document.removeEventListener('mouseup', handleMouseUp);
			};
		}, [isResizing, minWidth, minHeight, maxWidth, maxHeight, onResize]);

		// Handle mouse move during drag
		useEffect(() => {
			if (!isDragging || !dragStartRef.current) return;

			const handleMouseMove = (event: MouseEvent) => {
				event.preventDefault();

				if (!dragStartRef.current) return;

				// Use the stored window element reference instead of querying the DOM
				const windowElement = dragWindowRef.current;

				if (!windowElement) return;

				// Get parent container to calculate position relative to it
				const parent = windowElement.offsetParent as HTMLElement;
				const parentRect = parent ? parent.getBoundingClientRect() : { left: 0, top: 0 };

				const newPosition: WindowPosition = {
					x: event.clientX - parentRect.left - dragStartRef.current.x,
					y: event.clientY - parentRect.top - dragStartRef.current.y,
				};

				// Update position
				if (controlledPosition && onPositionChange) {
					onPositionChange(newPosition);
				} else {
					setInternalPosition(newPosition);
				}

				// Mark as dragged
				if (!hasBeenDragged) {
					setHasBeenDragged(true);
				}
			};

			const handleMouseUp = () => {
				setIsDragging(false);
				dragStartRef.current = null;
				dragWindowRef.current = null;
			};

			document.addEventListener('mousemove', handleMouseMove);
			document.addEventListener('mouseup', handleMouseUp);

			return () => {
				document.removeEventListener('mousemove', handleMouseMove);
				document.removeEventListener('mouseup', handleMouseUp);
			};
		}, [isDragging, controlledPosition, onPositionChange, hasBeenDragged]);

		// Class names
		const windowClassNames = mergeClasses(
			styles.window,
			active ? styles['window--active'] : styles['window--inactive'],
			draggable && hasBeenDragged && styles['window--draggable'],
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

		// Apply position if draggable and has been dragged
		if (draggable && hasBeenDragged && currentPosition) {
			windowStyle.position = 'absolute';
			windowStyle.left = `${currentPosition.x}px`;
			windowStyle.top = `${currentPosition.y}px`;
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
						onMouseDown={handleTitleBarMouseDown}
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
						<svg width="132" height="13" viewBox="0 0 132 13" fill="none" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
							<rect width="130.517" height="13" fill="#DDDDDD"/>
							<rect width="1" height="13" fill="#EEEEEE"/>
							<rect x="130" width="1" height="13" fill="#C5C5C5"/>
							<rect y="1" width="131.268" height="1" fill="#999999"/>
							<rect y="5" width="131.268" height="1" fill="#999999"/>
							<rect y="9" width="131.268" height="1" fill="#999999"/>
							<rect y="3" width="131.268" height="1" fill="#999999"/>
							<rect y="7" width="131.268" height="1" fill="#999999"/>
							<rect y="11" width="131.268" height="1" fill="#999999"/>
						</svg>
						<div className={mergeClasses(styles.titleText, classes?.titleText, 'bold')}>{title}</div>
							<svg width="132" height="13" viewBox="0 0 132 13" fill="none" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
								<rect width="130.517" height="13" fill="#DDDDDD"/>
								<rect width="1" height="13" fill="#EEEEEE"/>
								<rect x="130" width="1" height="13" fill="#C5C5C5"/>
								<rect y="1" width="131.268" height="1" fill="#999999"/>
								<rect y="5" width="131.268" height="1" fill="#999999"/>
								<rect y="9" width="131.268" height="1" fill="#999999"/>
								<rect y="3" width="131.268" height="1" fill="#999999"/>
								<rect y="7" width="131.268" height="1" fill="#999999"/>
								<rect y="11" width="131.268" height="1" fill="#999999"/>
							</svg>
						</div>

					</div>
				);
			}

			return null;
		};

		return (
			<div 
				ref={ref} 
				className={windowClassNames} 
				style={windowStyle}
				onMouseEnter={onMouseEnter}
			>
				{renderTitleBar()}
				<div className={contentClassNames}>{children}</div>
				{resizable && (
					<div 
						className={styles.resizeHandle} 
						onMouseDown={handleResizeMouseDown}
						aria-hidden="true"
					/>
				)}
			</div>
		);
	}
);

Window.displayName = 'Window';

export default Window;