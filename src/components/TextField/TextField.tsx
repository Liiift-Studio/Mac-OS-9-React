// TextField component - Mac OS 9 style
// Classic text input with label support and full accessibility

import React, {
	forwardRef,
	useId,
	type InputHTMLAttributes,
	type TextareaHTMLAttributes,
} from 'react';
import styles from './TextField.module.css';

export interface TextFieldProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> {
	/**
	 * Label text for the text field
	 */
	label?: React.ReactNode;

	/**
	 * Position of the label relative to the text field
	 * @default 'top'
	 */
	labelPosition?: 'top' | 'left' | 'right';

	/**
	 * Size of the text field
	 * @default 'md'
	 */
	size?: 'sm' | 'md' | 'lg';

	/**
	 * Whether the text field takes full width of its container
	 * @default false
	 */
	fullWidth?: boolean;

	/**
	 * Error state for form validation
	 * @default false
	 */
	error?: boolean;

	/**
	 * Error message to display below the field
	 */
	errorMessage?: string;

	/**
	 * Render a multi-line textarea instead of a single-line input.
	 *
	 * The docs implied multiline support that did not exist (issue #84).
	 * @default false
	 */
	multiline?: boolean;

	/**
	 * Visible rows when `multiline` is set.
	 * @default 3
	 */
	rows?: number;

	/**
	 * Show a live character counter. Requires `maxLength`.
	 * @default false
	 */
	showCount?: boolean;

	/**
	 * Helper text to display below the field
	 */
	helperText?: string;

	/**
	 * Icon to display before the input (left side)
	 */
	leftIcon?: React.ReactNode;

	/**
	 * Icon to display after the input (right side)
	 */
	rightIcon?: React.ReactNode;

	/**
	 * Override aria-label
	 */
	ariaLabel?: string;

	/**
	 * ID of element that describes this text field
	 */
	ariaDescribedBy?: string;

	/**
	 * Additional CSS class names
	 */
	className?: string;

	/**
	 * Custom wrapper class name
	 */
	wrapperClassName?: string;
}

/**
 * Mac OS 9 style TextField component
 *
 * Classic text input with inset bevel effect and optional label.
 *
 * Features:
 * - Classic Mac OS 9 inset bevel styling
 * - Label positioning (top/left/right)
 * - Size variants (sm/md/lg)
 * - Error states with messages
 * - Helper text support
 * - Icon support (left/right)
 * - Full accessibility with ARIA support
 * - Keyboard navigation
 * - Form integration
 *
 * @example
 * ```tsx
 * // Basic text field
 * <TextField placeholder="Enter text..." />
 *
 * // With label
 * <TextField label="Username" placeholder="Enter username" />
 *
 * // With error
 * <TextField
 *   label="Email"
 *   error
 *   errorMessage="Invalid email address"
 *   value={email}
 *   onChange={(e) => setEmail(e.target.value)}
 * />
 *
 * // With icons
 * <TextField
 *   leftIcon={<SearchIcon />}
 *   placeholder="Search..."
 * />
 * ```
 */
export const TextField = forwardRef<HTMLInputElement, TextFieldProps>(
	(
		{
			label,
			labelPosition = 'top',
			size = 'md',
			fullWidth = false,
			error = false,
			errorMessage,
			multiline = false,
			rows = 3,
			showCount = false,
			helperText,
			leftIcon,
			rightIcon,
			ariaLabel,
			ariaDescribedBy,
			className = '',
			wrapperClassName = '',
			type = 'text',
			id,
			disabled,
			...props
		},
		ref
	) => {
		// Generate ID if not provided (for label association)
		// useId is called unconditionally (hooks must be), but its result is
		// only used when the consumer didn't supply an id (issue #96).
		const generatedId = useId();
		const inputId = id ?? generatedId;

		// Generate helper/error text ID for aria-describedby
		const helperId = `${inputId}-helper`;
		const errorId = `${inputId}-error`;

		// Combine aria-describedby
		const describedByIds = [
			helperText && helperId,
			error && errorMessage && errorId,
			ariaDescribedBy,
		]
			.filter(Boolean)
			.join(' ');

		// Build class names
		const wrapperClassNames = [
			styles.wrapper,
			styles[`wrapper--${size}`],
			styles[`wrapper--label-${labelPosition}`],
			fullWidth && styles['wrapper--full-width'],
			disabled && styles['wrapper--disabled'],
			wrapperClassName,
		]
			.filter(Boolean)
			.join(' ');

		const inputWrapperClassNames = [
			styles['input-wrapper'],
			(leftIcon || rightIcon) && styles['input-wrapper--with-icon'],
			leftIcon && styles['input-wrapper--with-left-icon'],
			rightIcon && styles['input-wrapper--with-right-icon'],
		]
			.filter(Boolean)
			.join(' ');

		const inputClassNames = [
			styles.input,
			styles[`input--${size}`],
			error && styles['input--error'],
			fullWidth && styles['input--full-width'],
			className,
		]
			.filter(Boolean)
			.join(' ');

		const labelClassNames = [styles.label, styles[`label--${size}`]].filter(Boolean).join(' ');

		// ARIA attributes
		const ariaAttributes = {
			'aria-label': !label ? ariaLabel : undefined,
			'aria-describedby': describedByIds || undefined,
			'aria-invalid': error,
		};

		return (
			<div className={wrapperClassNames}>
				{label && (labelPosition === 'top' || labelPosition === 'left') && (
					<label htmlFor={inputId} className={labelClassNames}>
						{label}
					</label>
				)}

				<div className={inputWrapperClassNames}>
					{leftIcon && (
						<span className={styles['input-icon-left']} aria-hidden="true">
							{leftIcon}
						</span>
					)}

					{multiline ? (
						<textarea
							ref={ref as unknown as React.Ref<HTMLTextAreaElement>}
							id={inputId}
							rows={rows}
							className={inputClassNames}
							disabled={disabled}
							{...ariaAttributes}
							{...(props as unknown as TextareaHTMLAttributes<HTMLTextAreaElement>)}
						/>
					) : (
						<input
							ref={ref}
							type={type}
							id={inputId}
							className={inputClassNames}
							disabled={disabled}
							{...ariaAttributes}
							{...props}
						/>
					)}

					{rightIcon && (
						<span className={styles['input-icon-right']} aria-hidden="true">
							{rightIcon}
						</span>
					)}
				</div>

				{label && labelPosition === 'right' && (
					<label htmlFor={inputId} className={labelClassNames}>
						{label}
					</label>
				)}

				{helperText && !error && (
					<p id={helperId} className={styles['helper-text']}>
						{helperText}
					</p>
				)}

				{/* Character counter, announced politely so it doesn't interrupt
		    typing the way an assertive region would (issue #84). */}
				{showCount && props.maxLength !== undefined && (
					<p className={styles['helper-text']} aria-live="polite">
						{String(props.value ?? props.defaultValue ?? '').length} / {props.maxLength}
					</p>
				)}

				{/* role="alert" so a validation message that appears after render is
		    announced; a plain <p> was silently missed by screen readers
		    (issue #84). */}
				{error && errorMessage && (
					<p id={errorId} className={styles['error-message']} role="alert">
						{errorMessage}
					</p>
				)}
			</div>
		);
	}
);

TextField.displayName = 'TextField';

export default TextField;
