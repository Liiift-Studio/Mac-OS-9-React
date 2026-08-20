// MenuBar component - Mac OS 9 style
// Horizontal menu bar with dropdown menus, logo support, and status area
//
// Accessibility notes (panel review #32, #33, #35, #36, #100):
//  - Triggers carry role="menuitem" and share a single roving tab stop, so
//    Tab reaches the menubar once and Arrow keys move within it (#32)
//  - Menu labels are plain <span>; the <h3> they used to sit in polluted the
//    document outline and the screen-reader heading list (#33)
//  - Each open dropdown is labelled by its trigger via aria-labelledby (#35)
//  - Dismissal runs on capture-phase click rather than mousedown, so items
//    rendered in portals still receive their own click first (#36)
//  - Menu items may be supplied as structured descriptors instead of JSX, so
//    menus can be serialized or driven remotely (#100)

import React, { forwardRef, useCallback, useId, useMemo, useRef, useState } from 'react';
import { sanitizeUrl } from '../../utils/url';
import { useOutsideClick } from '../../hooks/useOutsideClick';
import { MenuItem } from './MenuItem';
import { MenuDropdown } from './MenuDropdown';
import styles from './MenuBar.module.css';

/**
 * Data-only description of a single dropdown entry.
 *
 * Lets a menu be defined as serializable data rather than JSX, which makes
 * remote-driven menus and assertion-by-data in tests straightforward.
 */
export interface MenuItemDescriptor {
	/** Visible label */
	label: string;
	/** Stable key; falls back to the label when omitted */
	id?: string;
	/** Keyboard shortcut to display and expose via aria-keyshortcuts */
	shortcut?: string;
	/** Whether the entry is disabled */
	disabled?: boolean;
	/** Whether the entry shows a checkmark */
	checked?: boolean;
	/** Whether a separator is drawn after this entry */
	separator?: boolean;
	/** Invoked when the entry is activated */
	onSelect?: () => void;
	/** Nested entries, rendered as a submenu */
	items?: readonly MenuItemDescriptor[];
}

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
	 * Menu items (content of the dropdown).
	 * Required when type is 'dropdown'.
	 *
	 * Accepts either arbitrary JSX or an array of {@link MenuItemDescriptor},
	 * which is rendered into MenuItem elements internally.
	 */
	items?: React.ReactNode | readonly MenuItemDescriptor[];

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
/**
 * Distinguish a descriptor array from a JSX array.
 *
 * Both arrive as arrays, so we sample the first entry: descriptors are plain
 * objects with a string `label` and no React element marker.
 */
function isDescriptorList(items: readonly unknown[]): items is readonly MenuItemDescriptor[] {
	const first = items[0];
	if (first === undefined || first === null) return false;
	if (React.isValidElement(first)) return false;
	return typeof first === 'object' && 'label' in (first as Record<string, unknown>);
}

const MenuBarRoot = forwardRef<HTMLDivElement, MenuBarProps>(
	(
		{
			menus,
			openMenuIndex,
			onMenuOpen,
			onMenuClose,
			className = '',
			dropdownClassName = '',
			leftContent,
			rightContent,
		},
		ref
	) => {
		const menuBarRef = useRef<HTMLDivElement | null>(null);
		const triggerRefs = useRef<(HTMLElement | null)[]>([]);
		const baseId = useId();

		// Index holding the roving tab stop. Exactly one trigger is tabbable,
		// so Tab enters the menubar once instead of visiting every menu (#32).
		const [focusedIndex, setFocusedIndex] = useState<number>(0);
		const [internalOpenIndex, setInternalOpenIndex] = useState<number | undefined>(undefined);

		const isControlled = openMenuIndex !== undefined;
		const activeOpenIndex = isControlled ? openMenuIndex : internalOpenIndex;

		const handleMenuOpenInternal = (index: number) => {
			if (!isControlled) {
				setInternalOpenIndex(index);
			}
			onMenuOpen?.(index);
		};

		const handleMenuCloseInternal = () => {
			if (!isControlled) {
				setInternalOpenIndex(undefined);
			}
			onMenuClose?.();
		};

		// Dismissal. Capture-phase click (not mousedown) so a menu item
		// rendered in a portal receives its own click before the menu tears
		// down (issue #36). Escape is handled by the same hook.
		useOutsideClick({
			enabled: activeOpenIndex !== undefined,
			refs: [menuBarRef],
			onOutside: handleMenuCloseInternal,
		});

		/** Move the roving tab stop and DOM focus to a trigger. */
		const focusTrigger = useCallback((index: number) => {
			setFocusedIndex(index);
			triggerRefs.current[index]?.focus();
		}, []);

		// Keyboard navigation per the WAI-ARIA menubar pattern: Arrow keys move
		// the roving tab stop (and DOM focus with it), wrapping at both ends;
		// disabled menus are skipped rather than trapping focus (issue #32).
		const handleKeyDown = useCallback(
			(event: React.KeyboardEvent) => {
				if (menus.length === 0) return;

				/** Next non-disabled index in `step` direction, wrapping. */
				const nextEnabled = (from: number, step: number): number => {
					for (let offset = 1; offset <= menus.length; offset += 1) {
						const candidate = (from + step * offset + menus.length * offset) % menus.length;
						if (!menus[candidate]?.disabled) return candidate;
					}
					return from;
				};

				switch (event.key) {
					case 'ArrowLeft': {
						event.preventDefault();
						const target = nextEnabled(focusedIndex < 0 ? 0 : focusedIndex, -1);
						focusTrigger(target);
						// A menubar with a menu already open switches menus as
						// focus moves, matching the platform behaviour.
						if (activeOpenIndex !== undefined && menus[target]?.type !== 'link') {
							handleMenuOpenInternal(target);
						}
						break;
					}

					case 'ArrowRight': {
						event.preventDefault();
						const target = nextEnabled(focusedIndex < 0 ? 0 : focusedIndex, 1);
						focusTrigger(target);
						if (activeOpenIndex !== undefined && menus[target]?.type !== 'link') {
							handleMenuOpenInternal(target);
						}
						break;
					}

					case 'Home': {
						event.preventDefault();
						focusTrigger(nextEnabled(menus.length - 1, 1));
						break;
					}

					case 'End': {
						event.preventDefault();
						focusTrigger(nextEnabled(0, -1));
						break;
					}

					case 'ArrowDown': {
						event.preventDefault();
						if (activeOpenIndex === undefined && focusedIndex >= 0) {
							const menu = menus[focusedIndex];
							if (!menu?.disabled && menu?.type !== 'link') {
								handleMenuOpenInternal(focusedIndex);
							}
						}
						break;
					}

					case 'Enter':
					case ' ': {
						event.preventDefault();
						if (focusedIndex < 0) break;
						const menu = menus[focusedIndex];
						if (menu?.disabled) break;
						if (menu.type === 'link') {
							menu.onClick?.();
						} else if (activeOpenIndex === focusedIndex) {
							handleMenuCloseInternal();
						} else {
							handleMenuOpenInternal(focusedIndex);
						}
						break;
					}
				}
			},
			[activeOpenIndex, focusedIndex, menus, focusTrigger]
		);

		// Handle menu button click
		const handleMenuClick = (index: number) => {
			const menu = menus[index];
			if (menu?.disabled) return;

			if (menu.type === 'link') {
				// For link-type menus, trigger the onClick handler
				menu.onClick?.();
				return;
			}

			if (activeOpenIndex === index) {
				// Clicking the same menu closes it
				handleMenuCloseInternal();
			} else {
				// Open the clicked menu
				handleMenuOpenInternal(index);
			}
		};

		// Class names
		const menuBarClassNames = [styles.menuBar, className].filter(Boolean).join(' ');

		const dropdownClassNames = [styles.dropdown, dropdownClassName].filter(Boolean).join(' ');

		// Callback ref to handle both internal state and forwarded ref
		const handleRef = useCallback(
			(node: HTMLDivElement | null) => {
				menuBarRef.current = node;
				if (typeof ref === 'function') {
					ref(node);
				} else if (ref) {
					ref.current = node;
				}
			},
			[ref]
		);

		/**
		 * Render a dropdown's contents.
		 *
		 * Descriptor arrays are turned into MenuItem elements here so callers
		 * can keep menus as plain data; JSX is passed through untouched.
		 */
		const renderMenuItems = useCallback((items: Menu['items']): React.ReactNode => {
			if (!Array.isArray(items) || !isDescriptorList(items)) {
				return items as React.ReactNode;
			}
			return items.map((descriptor, index) => (
				<MenuItem
					key={descriptor.id ?? `${descriptor.label}-${index}`}
					label={descriptor.label}
					shortcut={descriptor.shortcut}
					disabled={descriptor.disabled}
					checked={descriptor.checked}
					separator={descriptor.separator}
					onClick={descriptor.onSelect}
					items={descriptor.items ? renderMenuItems(descriptor.items) : undefined}
				/>
			));
		}, []);

		return (
			<div ref={handleRef} className={menuBarClassNames} role="menubar" onKeyDown={handleKeyDown}>
				{/* Left content (logo) */}
				{leftContent && <div className={styles.leftContent}>{leftContent}</div>}

				{/* Menu items */}
				<div className={styles.menusContainer}>
					{menus.map((menu, index) => {
						const isOpen = activeOpenIndex === index;
						const isFocused = focusedIndex === index;
						const isDropdown = menu.type !== 'link';

						const menuButtonClassNames = [
							styles.menuButton,
							isOpen ? styles['menuButton--open'] : '',
							menu.disabled ? styles['menuButton--disabled'] : '',
						]
							.filter(Boolean)
							.join(' ');

						// For link-type menus, render as anchor if href is provided.
						// sanitizeUrl strips javascript:/data:/vbscript: schemes before the
						// href reaches the DOM, preventing stored-XSS when consumers wire
						// menus from CMS or user-supplied data.
						if (menu.type === 'link' && menu.href) {
							const safeHref = sanitizeUrl(menu.href);
							return (
								<div key={index} className={styles.menuContainer}>
									<a
										ref={(node) => {
											triggerRefs.current[index] = node;
										}}
										href={safeHref}
										className={menuButtonClassNames}
										role="menuitem"
										tabIndex={isFocused ? 0 : -1}
										onClick={(e) => {
											if (menu.onClick) {
												e.preventDefault();
												menu.onClick();
											}
										}}
										onFocus={() => setFocusedIndex(index)}
										aria-disabled={menu.disabled}
									>
										{/* A <span>, not an <h3>: headings inside a menubar
										    pollute the document outline and the screen-reader
										    heading list (issue #33). */}
										<span>{menu.label}</span>
									</a>
								</div>
							);
						}

						// Standard dropdown menu or link without href
						const triggerId = `${baseId}-trigger-${index}`;

						return (
							<div key={index} className={styles.menuContainer}>
								<button
									ref={(node) => {
										triggerRefs.current[index] = node;
									}}
									id={triggerId}
									type="button"
									className={menuButtonClassNames}
									role="menuitem"
									tabIndex={isFocused ? 0 : -1}
									onClick={() => handleMenuClick(index)}
									onFocus={() => setFocusedIndex(index)}
									// Mac OS 9 switches menus on hover once one is
									// already open (issue #36).
									onMouseEnter={() => {
										if (activeOpenIndex === undefined || menu.disabled) return;
										if (isDropdown) handleMenuOpenInternal(index);
									}}
									disabled={menu.disabled}
									aria-haspopup={isDropdown ? 'menu' : undefined}
									aria-expanded={isDropdown ? isOpen : undefined}
									aria-disabled={menu.disabled}
								>
									<span>{menu.label}</span>
								</button>

								{isOpen && isDropdown && menu.items && (
									<div
										className={dropdownClassNames}
										role="menu"
										// The menu takes its accessible name from the
										// trigger that opened it (issue #35).
										aria-labelledby={triggerId}
									>
										{renderMenuItems(menu.items)}
									</div>
								)}
							</div>
						);
					})}
				</div>

				{/* Right content (status area) */}
				{rightContent && (
					<div className={styles.rightContent}>
						{Array.isArray(rightContent)
							? rightContent.map((item, index) => (
									<React.Fragment key={index}>{item}</React.Fragment>
								))
							: rightContent}
					</div>
				)}
			</div>
		);
	}
);

MenuBarRoot.displayName = 'MenuBar';

/**
 * Mac OS 9 style MenuBar, with a compound API.
 *
 * The folder has always grouped MenuBar, MenuItem and MenuDropdown as if a
 * compound API existed; `MenuBar.Item` and `MenuBar.Dropdown` make that real
 * (issue #118). The flat exports remain available, so existing call sites
 * keep working.
 *
 * @example
 * ```tsx
 * <MenuBar menus={menus} />
 * <MenuBar.Item label="Save" shortcut="⌘S" onClick={save} />
 * <MenuBar.Dropdown label="Options" items={<MenuBar.Item label="Reset" />} />
 * ```
 */
export const MenuBar = Object.assign(MenuBarRoot, {
	Item: MenuItem,
	Dropdown: MenuDropdown,
});

export default MenuBar;
