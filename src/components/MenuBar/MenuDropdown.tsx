// MenuDropdown component - Mac OS 9 style
// Standalone dropdown sharing the MenuBar's styling
//
// Correctness notes (panel review #34, #35, #40):
//  - forwardRef + displayName, matching every sibling component (#40)
//  - Collision-aware placement: the menu flips above its trigger and shifts
//    horizontally rather than being clipped at a viewport edge (#34)
//  - The open menu is labelled by its trigger via aria-labelledby (#35)

import React, { forwardRef, useCallback, useId, useRef, useState } from 'react';
import { useOutsideClick } from '../../hooks/useOutsideClick';
import { useMenuPosition } from '../../hooks/useMenuPosition';
import styles from './MenuBar.module.css';

export interface MenuDropdownProps {
	/**
	 * Menu label (displayed in the menu bar/button)
	 */
	label: React.ReactNode;

	/**
	 * Menu items (content of the dropdown)
	 */
	items: React.ReactNode;

	/**
	 * Whether the menu is disabled
	 * @default false
	 */
	disabled?: boolean;

	/**
	 * Custom class name for the menu container
	 */
	className?: string;

	/**
	 * Custom class name for menu dropdown
	 */
	dropdownClassName?: string;

	/**
	 * Alignment of the dropdown menu
	 * @default 'left'
	 */
	align?: 'left' | 'right';
}

/**
 * Mac OS 9 style MenuDropdown component
 *
 * A standalone dropdown menu that shares the styling of the MenuBar.
 * Useful for placing menus in the status area (rightContent) or other parts of the app.
 */
export const MenuDropdown = forwardRef<HTMLDivElement, MenuDropdownProps>(
	(
		{ label, items, disabled = false, className = '', dropdownClassName = '', align = 'left' },
		ref
	) => {
		const [isOpen, setIsOpen] = useState(false);
		const containerRef = useRef<HTMLDivElement | null>(null);
		const triggerRef = useRef<HTMLButtonElement | null>(null);
		const menuRef = useRef<HTMLDivElement | null>(null);
		const triggerId = useId();

		const setContainerRef = useCallback(
			(node: HTMLDivElement | null) => {
				containerRef.current = node;
				if (typeof ref === 'function') ref(node);
				else if (ref) ref.current = node;
			},
			[ref]
		);

		// Capture-phase click, so an item rendered in a portal still receives
		// its own click before the menu closes (issue #36). Escape included.
		useOutsideClick({
			enabled: isOpen,
			refs: [containerRef, menuRef],
			onOutside: () => setIsOpen(false),
		});

		// Keeps the menu on screen near a viewport edge (issue #34).
		const { style: positionStyle } = useMenuPosition({
			open: isOpen,
			anchorRef: triggerRef,
			menuRef,
			align,
		});

		const handleToggle = () => {
			if (!disabled) setIsOpen((open) => !open);
		};

		const menuContainerClassNames = [styles.menuContainer, className].filter(Boolean).join(' ');

		const menuButtonClassNames = [
			styles.menuButton,
			isOpen ? styles['menuButton--open'] : '',
			disabled ? styles['menuButton--disabled'] : '',
		]
			.filter(Boolean)
			.join(' ');

		const dropdownClassNames = [
			styles.dropdown,
			align === 'right' ? styles['dropdown--right'] : '',
			dropdownClassName,
		]
			.filter(Boolean)
			.join(' ');

		return (
			<div ref={setContainerRef} className={menuContainerClassNames}>
				<button
					ref={triggerRef}
					id={triggerId}
					type="button"
					className={menuButtonClassNames}
					onClick={handleToggle}
					disabled={disabled}
					aria-haspopup="menu"
					aria-expanded={isOpen}
					aria-disabled={disabled}
				>
					{/* A <span>, not an <h3>: headings here pollute the document
					    outline and the screen-reader heading list (issue #33). */}
					{typeof label === 'string' ? <span>{label}</span> : label}
				</button>

				{isOpen && (
					<div
						ref={menuRef}
						className={dropdownClassNames}
						style={positionStyle}
						role="menu"
						aria-labelledby={triggerId}
						onClick={() => setIsOpen(false)}
					>
						{items}
					</div>
				)}
			</div>
		);
	}
);

MenuDropdown.displayName = 'MenuDropdown';

export default MenuDropdown;
