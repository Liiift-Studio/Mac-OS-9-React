// MenuItem component - Mac OS 9 style
// Individual menu item for use within MenuBar

import React, { forwardRef, useCallback, useRef, useState } from 'react';
import styles from './MenuItem.module.css';

/**
 * Map a displayed shortcut to the `aria-keyshortcuts` token format.
 *
 * The visual form uses Mac glyphs (⌘⌥⌃⇧), which screen readers announce
 * inconsistently — VoiceOver says "command", NVDA may say "place of interest
 * sign", JAWS may skip it entirely. `aria-keyshortcuts` wants named modifiers
 * joined by "+", so shortcuts become programmatically discoverable regardless
 * of how the glyph itself is spoken (issue #37).
 *
 * @param shortcut - Display string, e.g. "⌘S", "Ctrl+O", "⇧⌘Z"
 * @returns ARIA token string, e.g. "Meta+S", "Control+O", "Shift+Meta+Z"
 */
export function toAriaKeyShortcuts(shortcut: string): string {
	const modifiers: string[] = [];
	let rest = shortcut;

	// Glyph forms, in the order ARIA expects them to be listed.
	const glyphs: ReadonlyArray<[string, string]> = [
		['⌃', 'Control'],
		['⌥', 'Alt'],
		['⇧', 'Shift'],
		['⌘', 'Meta'],
	];
	for (const [glyph, name] of glyphs) {
		if (rest.includes(glyph)) {
			modifiers.push(name);
			rest = rest.split(glyph).join('');
		}
	}

	// Written forms, e.g. "Ctrl+Shift+O".
	const words = rest
		.split('+')
		.map((part) => part.trim())
		.filter(Boolean);
	const keyParts: string[] = [];
	for (const word of words) {
		const lower = word.toLowerCase();
		if (lower === 'ctrl' || lower === 'control') modifiers.push('Control');
		else if (lower === 'alt' || lower === 'option') modifiers.push('Alt');
		else if (lower === 'shift') modifiers.push('Shift');
		else if (lower === 'cmd' || lower === 'command' || lower === 'meta') modifiers.push('Meta');
		else keyParts.push(word);
	}

	// De-duplicate while preserving order, in case a shortcut mixed forms.
	const ordered = ['Control', 'Alt', 'Shift', 'Meta'].filter((name) => modifiers.includes(name));
	const key = keyParts.join('+');
	return [...ordered, key].filter(Boolean).join('+');
}

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
export const MenuItem = forwardRef<HTMLButtonElement, MenuItemProps>(
	(
		{
			label,
			shortcut,
			disabled = false,
			selected = false,
			separator = false,
			checked = false,
			icon,
			onClick,
			onFocus,
			onBlur,
			className = '',
			hasSubmenu = false,
			items,
		},
		ref
	) => {
		const [isSubmenuOpen, setIsSubmenuOpen] = useState(false);
		const effectiveHasSubmenu = hasSubmenu || !!items;

		// Internal refs to the trigger button and submenu container, used by the
		// keyboard handler to move focus into / out of the submenu. The trigger
		// ref is fanned out so the consumer's forwardRef still receives the node.
		const buttonRef = useRef<HTMLButtonElement | null>(null);
		const submenuRef = useRef<HTMLDivElement | null>(null);

		const setButtonRef = useCallback(
			(node: HTMLButtonElement | null) => {
				buttonRef.current = node;
				if (typeof ref === 'function') ref(node);
				else if (ref) (ref as React.MutableRefObject<HTMLButtonElement | null>).current = node;
			},
			[ref]
		);

		// Class names
		const menuItemClassNames = [
			styles.menuItem,
			selected ? styles['menuItem--selected'] : '',
			disabled ? styles['menuItem--disabled'] : '',
			separator ? styles['menuItem--separator'] : '',
			className,
		]
			.filter(Boolean)
			.join(' ');

		// Handle click
		const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
			if (disabled) {
				event.preventDefault();
				return;
			}
			onClick?.(event);
		};

		// WAI-ARIA menu pattern: ArrowRight opens the submenu and moves focus
		// to its first item; ArrowLeft closes the submenu and returns focus
		// to the parent. Hover behavior (mouse enter/leave) is unchanged.
		const handleKeyDown = (event: React.KeyboardEvent<HTMLButtonElement>) => {
			if (!effectiveHasSubmenu || disabled) return;
			if (event.key === 'ArrowRight') {
				event.preventDefault();
				setIsSubmenuOpen(true);
				// Defer focus until after the submenu renders.
				queueMicrotask(() => {
					const firstItem = submenuRef.current?.querySelector<HTMLElement>('[role="menuitem"]');
					firstItem?.focus();
				});
			} else if (event.key === 'ArrowLeft' && isSubmenuOpen) {
				event.preventDefault();
				setIsSubmenuOpen(false);
				buttonRef.current?.focus();
			}
		};

		return (
			<div
				className={styles.menuItemContainer}
				onMouseEnter={() => setIsSubmenuOpen(true)}
				onMouseLeave={() => setIsSubmenuOpen(false)}
				style={{ position: 'relative', width: '100%' }}
			>
				<button
					ref={setButtonRef}
					type="button"
					className={menuItemClassNames}
					onClick={handleClick}
					onKeyDown={handleKeyDown}
					onFocus={onFocus}
					onBlur={onBlur}
					disabled={disabled}
					role="menuitem"
					aria-disabled={disabled}
					aria-checked={checked ? 'true' : undefined}
					aria-haspopup={effectiveHasSubmenu ? 'menu' : undefined}
					aria-expanded={effectiveHasSubmenu ? isSubmenuOpen : undefined}
					aria-keyshortcuts={shortcut ? toAriaKeyShortcuts(shortcut) : undefined}
				>
					{/* Checkmark area */}
					<span className={styles.checkmark}>{checked && '✓'}</span>

					{/* Icon area */}
					{icon && <span className={styles.icon}>{icon}</span>}

					{/* Label */}
					<span className={styles.label}>{label}</span>

					{/* Shortcut */}
					{/* Hidden from AT: the glyphs read inconsistently, and
					    aria-keyshortcuts above carries the same information in a
					    form screen readers agree on (issue #37). */}
					{shortcut && (
						<span className={styles.shortcut} aria-hidden="true">
							{shortcut}
						</span>
					)}

					{/* Submenu indicator */}
					{effectiveHasSubmenu && <span className={styles.submenuArrow}>▶</span>}
				</button>

				{/* Submenu */}
				{items && isSubmenuOpen && (
					<div ref={submenuRef} className={styles.submenu} role="menu">
						{items}
					</div>
				)}

				{/* Separator line if needed */}
				{separator && <div className={styles.separatorLine} role="separator" />}
			</div>
		);
	}
);

MenuItem.displayName = 'MenuItem';

export default MenuItem;
