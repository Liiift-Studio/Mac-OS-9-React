import React, { InputHTMLAttributes } from 'react';
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
export declare const TextField: React.ForwardRefExoticComponent<TextFieldProps & React.RefAttributes<HTMLInputElement>>;
export default TextField;
