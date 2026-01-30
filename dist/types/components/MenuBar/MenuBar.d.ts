import React from 'react';
export interface Menu {
    /**
     * Menu label (displayed in the menu bar)
     */
    label: string;
    /**
     * Menu type - determines behavior
     * @default 'dropdown'
     */
    type?: 'dropdown' | 'link';
    /**
     * Menu items (content of the dropdown)
     * Required when type is 'dropdown'
     */
    items?: React.ReactNode;
    /**
     * Link href (for link-type menus)
     * Used when type is 'link'
     */
    href?: string;
    /**
     * Click handler (for link-type menus)
     * Used when type is 'link'
     */
    onClick?: () => void;
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
    /**
     * Content to display on the left side (typically a logo)
     */
    leftContent?: React.ReactNode;
    /**
     * Content to display on the right side (status items, clock, etc.)
     * Can be a single element or array of elements
     */
    rightContent?: React.ReactNode | React.ReactNode[];
}
/**
 * Mac OS 9 style MenuBar component
 *
 * Horizontal menu bar with dropdown menus, logo support, and status area.
 *
 * Features:
 * - Classic Mac OS 9 menu bar styling
 * - Horizontal menu layout
 * - Dropdown menus on click
 * - Link-type menu items for navigation
 * - Logo/icon support on the left
 * - Status area on the right (clock, system indicators, etc.)
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
 *   leftContent={<img src="/logo.png" alt="Logo" width={16} height={16} />}
 *   openMenuIndex={openMenu}
 *   onMenuOpen={setOpenMenu}
 *   onMenuClose={() => setOpenMenu(undefined)}
 *   menus={[
 *     {
 *       label: 'File',
 *       type: 'dropdown',
 *       items: (
 *         <>
 *           <MenuItem label="Open..." shortcut="⌘O" onClick={() => {}} />
 *           <MenuItem label="Save" shortcut="⌘S" onClick={() => {}} />
 *         </>
 *       ),
 *     },
 *     {
 *       label: 'Home',
 *       type: 'link',
 *       href: '/',
 *     },
 *   ]}
 *   rightContent={[
 *     <Clock key="clock" />,
 *     <div key="divider" className={styles.divider} />,
 *     <SystemIndicator key="indicator" />,
 *   ]}
 * />
 * ```
 */
export declare const MenuBar: React.ForwardRefExoticComponent<MenuBarProps & React.RefAttributes<HTMLDivElement>>;
export default MenuBar;
