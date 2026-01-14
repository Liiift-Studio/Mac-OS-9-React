// MenuBar component - Mac OS 9 style
// Horizontal menu bar with dropdown menus

import React, { forwardRef, useRef, useState, useEffect, useCallback } from 'react';
import styles from './MenuBar.module.css';

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
export const MenuBar = forwardRef<HTMLDivElement, MenuBarProps>(
	({ menus, openMenuIndex, onMenuOpen, onMenuClose, className = '', dropdownClassName = '' }, ref) => {
		const [menuBarElement, setMenuBarElement] = useState<HTMLDivElement | null>(null);
		const [focusedIndex, setFocusedIndex] = useState<number>(-1);

		// Handle click outside to close menu
		useEffect(() => {
			if (openMenuIndex === undefined || !menuBarElement) return;

			const handleClickOutside = (event: MouseEvent) => {
				if (menuBarElement && !menuBarElement.contains(event.target as Node)) {
					onMenuClose?.();
				}
			};

			document.addEventListener('mousedown', handleClickOutside);
			return () => document.removeEventListener('mousedown', handleClickOutside);
		}, [openMenuIndex, onMenuClose, menuBarElement]);

		// Handle Escape key to close menu
		useEffect(() => {
			if (openMenuIndex === undefined) return;

			const handleEscape = (event: KeyboardEvent) => {
				if (event.key === 'Escape') {
					event.preventDefault();
					onMenuClose?.();
				}
			};

			document.addEventListener('keydown', handleEscape);
			return () => document.removeEventListener('keydown', handleEscape);
		}, [openMenuIndex, onMenuClose]);

		// Handle keyboard navigation
		const handleKeyDown = useCallback(
			(event: React.KeyboardEvent) => {
				switch (event.key) {
					case 'ArrowLeft':
						event.preventDefault();
						if (openMenuIndex !== undefined) {
							// Move to previous menu
							const prevIndex = openMenuIndex > 0 ? openMenuIndex - 1 : menus.length - 1;
							if (!menus[prevIndex]?.disabled) {
								onMenuOpen?.(prevIndex);
							}
						} else if (focusedIndex > 0) {
							setFocusedIndex(focusedIndex - 1);
						}
						break;

					case 'ArrowRight':
						event.preventDefault();
						if (openMenuIndex !== undefined) {
							// Move to next menu
							const nextIndex = openMenuIndex < menus.length - 1 ? openMenuIndex + 1 : 0;
							if (!menus[nextIndex]?.disabled) {
								onMenuOpen?.(nextIndex);
							}
						} else if (focusedIndex < menus.length - 1) {
							setFocusedIndex(focusedIndex + 1);
						}
						break;

					case 'ArrowDown':
						event.preventDefault();
						if (openMenuIndex === undefined && focusedIndex >= 0) {
							// Open the focused menu
							if (!menus[focusedIndex]?.disabled) {
								onMenuOpen?.(focusedIndex);
							}
						}
						break;

					case 'Enter':
					case ' ':
						event.preventDefault();
						if (openMenuIndex === undefined && focusedIndex >= 0) {
							// Open the focused menu
							if (!menus[focusedIndex]?.disabled) {
								onMenuOpen?.(focusedIndex);
							}
						}
						break;
				}
			},
			[openMenuIndex, focusedIndex, menus, onMenuOpen, onMenuClose]
		);

		// Handle menu button click
		const handleMenuClick = (index: number) => {
			if (menus[index]?.disabled) return;

			if (openMenuIndex === index) {
				// Clicking the same menu closes it
				onMenuClose?.();
			} else {
				// Open the clicked menu
				onMenuOpen?.(index);
			}
		};

		// Class names
		const menuBarClassNames = [styles.menuBar, className].filter(Boolean).join(' ');

		const dropdownClassNames = [styles.dropdown, dropdownClassName].filter(Boolean).join(' ');

	// Callback ref to handle both internal state and forwarded ref
	const handleRef = useCallback(
		(node: HTMLDivElement | null) => {
			setMenuBarElement(node);
			if (typeof ref === 'function') {
				ref(node);
			}
		},
		[ref]
	);

	return (
		<div ref={handleRef} className={menuBarClassNames} role="menubar" onKeyDown={handleKeyDown}>
				{menus.map((menu, index) => {
					const isOpen = openMenuIndex === index;
					const isFocused = focusedIndex === index;

					const menuButtonClassNames = [
						styles.menuButton,
						isOpen ? styles['menuButton--open'] : '',
						menu.disabled ? styles['menuButton--disabled'] : '',
					]
						.filter(Boolean)
						.join(' ');

					return (
						<div key={index} className={styles.menuContainer}>
							<button
								type="button"
								className={menuButtonClassNames}
								onClick={() => handleMenuClick(index)}
								onFocus={() => setFocusedIndex(index)}
								onBlur={() => setFocusedIndex(-1)}
								disabled={menu.disabled}
								aria-haspopup="true"
								aria-expanded={isOpen}
								aria-disabled={menu.disabled}
							>
								{menu.label}
							</button>

							{isOpen && (
								<div className={dropdownClassNames} role="menu">
									{menu.items}
								</div>
							)}
						</div>
					);
				})}
			</div>
		);
	}
);

MenuBar.displayName = 'MenuBar';

export default MenuBar;
