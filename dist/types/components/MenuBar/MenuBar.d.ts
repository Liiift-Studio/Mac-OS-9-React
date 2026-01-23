import React from 'react';
export interface Menu {
    /**
     * Menu label (displayed in the menu bar)
     */
    label: string;
    /**
     * Menu items (content of the dropdown)
     */
    items: React.ReactNode;
    /**
     * Whether the menu is disabled
     * @default false
     */
    disabled?: boolean;
}
export interface MenuBarProps {
    /**
     * Array of menus to display
     */
    menus: Menu[];
    /**
     * Index of the currently open menu (controlled)
     */
    openMenuIndex?: number;
    /**
     * Callback when a menu is opened
     */
    onMenuOpen?: (index: number) => void;
    /**
     * Callback when menus are closed
     */
    onMenuClose?: () => void;
    /**
     * Custom class name for the menu bar
     */
    className?: string;
    /**
     * Custom class name for menu dropdowns
     */
    dropdownClassName?: string;
}
/**
 * Mac OS 9 style MenuBar component
 *
 * Horizontal menu bar with dropdown menus.
 *
 * Features:
 * - Classic Mac OS 9 menu bar styling
 * - Horizontal menu layout
 * - Dropdown menus on click
 * - Keyboard navigation (Left/Right for menus, Up/Down for items)
 * - Click outside to close
 * - Escape key to close
 * - Controlled state (consumers manage open/closed)
 * - Disabled menu support
 *
 * @example
 * ```tsx
 * const [openMenu, setOpenMenu] = useState<number | undefined>();
 *
 * <MenuBar
 *   openMenuIndex={openMenu}
 *   onMenuOpen={setOpenMenu}
 *   onMenuClose={() => setOpenMenu(undefined)}
 *   menus={[
 *     {
 *       label: 'File',
 *       items: (
 *         <>
 *           <MenuItem label="Open..." shortcut="⌘O" onClick={() => {}} />
 *           <MenuItem label="Save" shortcut="⌘S" onClick={() => {}} />
 *         </>
 *       ),
 *     },
 *     {
 *       label: 'Edit',
 *       items: (
 *         <>
 *           <MenuItem label="Undo" shortcut="⌘Z" onClick={() => {}} />
 *           <MenuItem label="Redo" shortcut="⇧⌘Z" onClick={() => {}} />
 *         </>
 *       ),
 *     },
 *   ]}
 * />
 * ```
 */
export declare const MenuBar: React.ForwardRefExoticComponent<MenuBarProps & React.RefAttributes<HTMLDivElement>>;
export default MenuBar;
