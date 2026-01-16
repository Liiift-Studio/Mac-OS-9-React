// Radio component - Mac OS 9 style
// Classic radio button with label support and full accessibility

import React, { forwardRef, InputHTMLAttributes } from 'react';
import styles from './Radio.module.css';

export interface RadioProps
	extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type' | 'size'> {
	/**
	 * Whether the radio is checked
	 * For controlled component usage
	 */
	checked?: boolean;

	/**
	 * Default checked state
	 * For uncontrolled component usage
	 */
	defaultChecked?: boolean;

	/**
	 * Whether the radio is disabled
	 * @default false
	 */
	disabled?: boolean;

	/**
	 * Label text for the radio
	 */
	label?: React.ReactNode;

	/**
	 * Position of the label relative to the radio
	 * @default 'right'
	 */
	labelPosition?: 'left' | 'right';

	/**
	 * Size of the radio
	 * @default 'md'
	 */
	size?: 'sm' | 'md' | 'lg';

	/**
	 * Error state for form validation
	 * @default false
	 */
	error?: boolean;

	/**
	 * Override aria-label (for radios without visible labels)
	 */
	ariaLabel?: string;

	/**
	 * ID of element that describes this radio
	 */
	ariaDescribedBy?: string;

	/**
	 * Additional CSS class names
	 */
	className?: string;

	/**
	 * Value for the radio button (required for radio groups)
	 */
	value?: string | number;

	/**
	 * Name for the radio group (all radios in a group should share the same name)
	 */
	name?: string;

	/**
	 * Callback when checked state changes
	 */
	onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

/**
 * Mac OS 9 style Radio component
 * 
 * Classic radio button with raised bevel effect and optional label.
 * Radio buttons work in groups - only one can be selected at a time.
 * 
 * Features:
 * - Classic Mac OS 9 circular bevel styling
 * - Radio group support via `name` attribute
 * - Label positioning (left/right)
 * - Controlled and uncontrolled modes
 * - Full accessibility with ARIA support
 * - Keyboard navigation (Arrow keys to navigate group, Space to select)
 * - Form integration
 * 
 * @example
 * ```tsx
 * // Uncontrolled radio group
 * <div>
 *   <Radio name="size" value="small" label="Small" />
 *   <Radio name="size" value="medium" label="Medium" defaultChecked />
 *   <Radio name="size" value="large" label="Large" />
 * </div>
 * 
 * // Controlled radio group
 * <div>
 *   <Radio 
 *     name="color" 
 *     value="red" 
 *     checked={color === 'red'}
 *     onChange={(e) => setColor(e.target.value)}
 *     label="Red"
 *   />
 *   <Radio 
 *     name="color" 
 *     value="blue" 
 *     checked={color === 'blue'}
 *     onChange={(e) => setColor(e.target.value)}
 *     label="Blue"
 *   />
 * </div>
 * ```
 */
export const Radio = forwardRef<HTMLInputElement, RadioProps>(
	(
		{
			checked,
			defaultChecked,
			disabled = false,
			label,
			labelPosition = 'right',
			size = 'md',
			error = false,
			ariaLabel,
			ariaDescribedBy,
			className = '',
			value,
			name,
			onChange,
			id,
			...props
		},
		ref
	) => {
		// Generate ID if not provided (for label association)
		const radioId = id || React.useId();

	// Build class names
	const wrapperClassNames = [
		styles.wrapper,
		styles[`wrapper--${size}`],
		styles[`wrapper--label-${labelPosition}`],
		disabled && styles['wrapper--disabled'],
		error && styles['wrapper--error'],
		className,
	]
		.filter(Boolean)
		.join(' ');

	const radioClassNames = [
		styles.radio,
		styles[`radio--${size}`],
		error && styles['radio--error'],
	]
		.filter(Boolean)
		.join(' ');

	const labelClassNames = [styles.label, styles[`label--${size}`]].filter(Boolean).join(' ');

		// ARIA attributes
		const ariaAttributes = {
			'aria-label': !label ? ariaLabel : undefined,
			'aria-describedby': ariaDescribedBy,
			'aria-invalid': error,
		};

		return (
			<div className={wrapperClassNames}>
				{label && labelPosition === 'left' && (
					<label htmlFor={radioId} className={labelClassNames}>
						{label}
					</label>
				)}

				<input
					ref={ref}
					type="radio"
					id={radioId}
					className={radioClassNames}
					checked={checked}
					defaultChecked={defaultChecked}
					disabled={disabled}
					value={value}
					name={name}
					onChange={onChange}
					{...ariaAttributes}
					{...props}
				/>

				{label && labelPosition === 'right' && (
					<label htmlFor={radioId} className={labelClassNames}>
						{label}
					</label>
				)}
			</div>
		);
	}
);

Radio.displayName = 'Radio';

export default Radio;
