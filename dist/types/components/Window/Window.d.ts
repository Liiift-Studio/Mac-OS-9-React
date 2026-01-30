import React from 'react';
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
 * ```
 */
export declare const Window: React.ForwardRefExoticComponent<WindowProps & React.RefAttributes<HTMLDivElement>>;
export default Window;
