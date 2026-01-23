import React from 'react';
export interface ScrollbarProps {
    /**
     * Scrollbar orientation
     * @default 'vertical'
     */
    orientation?: 'vertical' | 'horizontal';
    /**
     * Current scroll position (0-1)
     */
    value?: number;
    /**
     * Viewport size relative to content size (0-1)
     * Used to calculate thumb size
     */
    viewportRatio?: number;
    /**
     * Callback when scroll position changes
     */
    onChange?: (value: number) => void;
    /**
     * Additional CSS class names
     */
    className?: string;
    /**
     * Whether scrollbar is disabled
     * @default false
     */
    disabled?: boolean;
}
/**
 * Mac OS 9 style Scrollbar component
 *
 * Classic scrollbar with arrow buttons and draggable thumb.
 * Can be used standalone or integrated with scrollable content.
 *
 * @example
 * ```tsx
 * <Scrollbar
 *   orientation="vertical"
 *   value={0.5}
 *   viewportRatio={0.3}
 *   onChange={(value) => console.log('Scroll position:', value)}
 * />
 * ```
 */
export declare const Scrollbar: React.ForwardRefExoticComponent<ScrollbarProps & React.RefAttributes<HTMLDivElement>>;
export default Scrollbar;
