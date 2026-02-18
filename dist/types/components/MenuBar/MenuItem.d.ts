import React from 'react';
export interface MenuItemProps {
    /**
     * Menu item label text
     */
    label: string;
    /**
     * Optional keyboard shortcut to display (e.g., "⌘S", "Ctrl+O")
     */
    shortcut?: string;
    /**
     * Whether the menu item is disabled
     * @default false
     */
    disabled?: boolean;
    /**
     * Whether the menu item is selected/active
     * @default false
     */
    selected?: boolean;
    /**
     * Whether the menu item has a separator after it
     * @default false
     */
    separator?: boolean;
    /**
     * Whether the menu item has a checkmark (for toggle items)
     * @default false
     */
    checked?: boolean;
    /**
     * Optional icon to display before the label
     */
    icon?: React.ReactNode;
    /**
     * Callback when menu item is clicked
     */
    onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
    /**
     * Callback when menu item is focused
     */
    onFocus?: (event: React.FocusEvent<HTMLButtonElement>) => void;
    /**
     * Callback when menu item loses focus
     */
    onBlur?: (event: React.FocusEvent<HTMLButtonElement>) => void;
    /**
     * Custom class name for the menu item
     */
    className?: string;
    /**
     * Whether the item has a submenu indicator (arrow)
     * @default false
     */
    hasSubmenu?: boolean;
    /**
     * Submenu items
     */
    items?: React.ReactNode;
}
/**
 * Mac OS 9 style MenuItem component
 *
 * Individual menu item for use within MenuBar or dropdown menus.
 *
 * Features:
 * - Classic Mac OS 9 menu item styling
 * - Disabled state support
 * - Keyboard shortcut display
 * - Checkmark support for toggle items
 * - Separator support
 * - Selected/active state
 * - Icon support
 * - Submenu indicator
 * - Full keyboard and mouse support
 *
 * @example
 * ```tsx
 * // Basic menu item
 * <MenuItem label="Open..." onClick={() => console.log('Open')} />
 *
 * // With keyboard shortcut
 * <MenuItem label="Save" shortcut="⌘S" onClick={() => console.log('Save')} />
 *
 * // Disabled item
 * <MenuItem label="Undo" disabled />
 *
 * // Checked item (toggle)
 * <MenuItem label="Show Grid" checked onClick={() => console.log('Toggle')} />
 *
 * // With separator
 * <MenuItem label="Preferences..." separator onClick={() => console.log('Prefs')} />
 *
 * // With submenu indicator
 * <MenuItem label="Recent Files" hasSubmenu />
 * ```
 */
export declare const MenuItem: React.ForwardRefExoticComponent<MenuItemProps & React.RefAttributes<HTMLButtonElement>>;
export default MenuItem;
