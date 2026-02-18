import React from 'react';
import { WindowPosition } from '../../types';
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
    onResize?: (size: {
        width: number;
        height: number;
    }) => void;
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
export declare const Window: React.ForwardRefExoticComponent<WindowProps & React.RefAttributes<HTMLDivElement>>;
export default Window;
