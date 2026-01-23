import React from 'react';
interface TabShapeProps {
    /** Width of the tab content area (excluding 12px edges on each side) */
    width: number;
    /** Height of the tab (22px large, 16px small) */
    height: number;
    /** Fill color */
    fill?: string;
    /** Stroke color */
    stroke?: string;
    /** Additional CSS class */
    className?: string;
}
/**
 * Mac OS 9 trapezoid tab shape with authentic pixelated border
 * Border only - fill color comes from CSS background
 */
export declare const TabShape: React.FC<TabShapeProps>;
export default TabShape;
