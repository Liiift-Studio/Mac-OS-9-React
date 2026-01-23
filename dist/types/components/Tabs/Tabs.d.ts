import React, { ReactElement } from 'react';
export interface TabPanelProps {
    /**
     * Label for the tab
     */
    label: string;
    /**
     * Content of the tab panel
     */
    children: React.ReactNode;
    /**
     * Optional icon to display in the tab
     */
    icon?: React.ReactNode;
    /**
     * Whether this tab is disabled
     * @default false
     */
    disabled?: boolean;
    /**
     * Value identifier for controlled tabs
     */
    value?: string;
}
/**
 * TabPanel component - Individual tab content
 * Must be used as a child of Tabs component
 */
export declare const TabPanel: React.FC<TabPanelProps>;
export interface TabsProps {
    /**
     * Tab panels as children
     */
    children: ReactElement<TabPanelProps> | ReactElement<TabPanelProps>[];
    /**
     * Index of the default active tab (uncontrolled)
     * @default 0
     */
    defaultActiveTab?: number;
    /**
     * Index of the active tab (controlled)
     */
    activeTab?: number;
    /**
     * Callback when tab changes
     */
    onChange?: (index: number, value?: string) => void;
    /**
     * Size of the tabs
     * @default 'md'
     */
    size?: 'sm' | 'md' | 'lg';
    /**
     * Whether tabs take full width
     * @default false
     */
    fullWidth?: boolean;
    /**
     * Custom class name for the container
     */
    className?: string;
    /**
     * Custom class name for the tab list
     */
    tabListClassName?: string;
    /**
     * Custom class name for the tab panel container
     */
    panelClassName?: string;
    /**
     * ARIA label for the tab list
     */
    ariaLabel?: string;
}
/**
 * Mac OS 9 style Tabs component
 *
 * Classic tabbed navigation with raised tab appearance and inset panel.
 *
 * Features:
 * - Classic Mac OS 9 tab styling
 * - Controlled and uncontrolled modes
 * - Keyboard navigation (Arrow keys, Home, End)
 * - Full accessibility with ARIA
 * - Optional icons in tabs
 * - Disabled tab states
 *
 * @example
 * ```tsx
 * // Uncontrolled
 * <Tabs>
 *   <TabPanel label="General">
 *     <p>General settings content</p>
 *   </TabPanel>
 *   <TabPanel label="Advanced">
 *     <p>Advanced settings content</p>
 *   </TabPanel>
 * </Tabs>
 *
 * // Controlled
 * <Tabs activeTab={activeIndex} onChange={setActiveIndex}>
 *   <TabPanel label="Tab 1">Content 1</TabPanel>
 *   <TabPanel label="Tab 2">Content 2</TabPanel>
 * </Tabs>
 * ```
 */
export declare const Tabs: React.FC<TabsProps>;
export default Tabs;
