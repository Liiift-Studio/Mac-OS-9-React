// IconButton component - Mac OS 9 style button with icon
//
// A thin preset over Button rather than a parallel implementation.
//
// IconButton and Button were wholly independent: both defined variant, size
// and disabled, both had their own CSS module, and Button already supported
// iconOnly / leftIcon / rightIcon. The only thing IconButton actually added
// was `labelPosition`, including the vertical placements Button's inline
// icon slots can't express (issue #88). So that is all this adds now — every
// other prop, and all the behaviour, comes from Button.

import React, { forwardRef } from 'react';
import { Button } from '../Button/Button';
import { mergeClasses } from '../../utils/classNames';
import type { Size, Variant } from '../../types';
import styles from './IconButton.module.css';

export interface IconButtonProps extends Omit<
	React.ButtonHTMLAttributes<HTMLButtonElement>,
	// `children` is composed from icon + label here; the aria props and
	// the form-method narrowing are re-declared by Button itself.
	'children' | 'aria-label' | 'aria-describedby' | 'formMethod'
> {
	/** Icon to display */
	icon: React.ReactNode;

	/** Optional text label to display alongside the icon */
	label?: string;

	/**
	 * Label position relative to the icon
	 * @default 'right'
	 */
	labelPosition?: 'left' | 'right' | 'top' | 'bottom';

	/**
	 * Button variant
	 * @default 'default'
	 */
	variant?: Variant;

	/**
	 * Button size
	 * @default 'md'
	 */
	size?: Size;

	/** Whether the button is disabled */
	disabled?: boolean;

	/**
	 * Accessible name.
	 *
	 * Required when there is no `label`, since an icon alone gives assistive
	 * technology nothing to announce.
	 */
	'aria-label'?: string;

	/** ID of element that describes this button */
	'aria-describedby'?: string;

	/** Additional CSS class names */
	className?: string;
}

/**
 * Mac OS 9 style IconButton.
 *
 * Button with an icon and an optional label that can sit on any side.
 *
 * @example
 * ```tsx
 * <IconButton icon={<SaveIcon />} aria-label="Save" />
 * <IconButton icon={<FolderIcon />} label="New Folder" />
 * <IconButton icon={<SearchIcon />} label="Search" labelPosition="bottom" />
 * ```
 */
export const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(
	(
		{
			icon,
			label,
			labelPosition = 'right',
			variant = 'default',
			size = 'md',
			disabled = false,
			className = '',
			'aria-label': ariaLabel,
			'aria-describedby': ariaDescribedBy,
			...rest
		},
		ref
	) => {
		// Vertical stacking is the one layout Button's inline icon slots
		// can't express, so it stays here as a modifier class.
		const classNames = mergeClasses(
			styles.iconButton,
			styles[`iconButton--${size}`],
			styles[`iconButton--${variant}`],
			styles[`iconButton--label-${labelPosition}`],
			label && styles['iconButton--with-label'],
			className
		);

		return (
			<Button
				{...rest}
				ref={ref}
				variant={variant}
				size={size}
				disabled={disabled}
				className={classNames}
				iconOnly={!label}
				aria-label={ariaLabel ?? label}
				aria-describedby={ariaDescribedBy}
			>
				<span className={styles.icon} aria-hidden="true">
					{icon}
				</span>
				{label && <span className={styles.label}>{label}</span>}
			</Button>
		);
	}
);

IconButton.displayName = 'IconButton';

export default IconButton;
