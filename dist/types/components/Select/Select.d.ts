import React, { SelectHTMLAttributes } from 'react';
export interface SelectOption {
    value: string | number;
    label: string;
    disabled?: boolean;
}
export interface SelectProps extends Omit<SelectHTMLAttributes<HTMLSelectElement>, 'size'> {
    /**
     * Label text for the select
     */
    label?: React.ReactNode;
    /**
     * Position of the label relative to the select
     * @default 'top'
     */
    labelPosition?: 'top' | 'left' | 'right';
    /**
     * Size of the select
     * @default 'md'
     */
    size?: 'sm' | 'md' | 'lg';
    /**
     * Whether the select takes full width of its container
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
     * Options for the select dropdown
     * Alternative to providing option elements as children
     */
    options?: SelectOption[];
    /**
     * Placeholder text (creates a disabled first option)
     */
    placeholder?: string;
    /**
     * Override aria-label
     */
    ariaLabel?: string;
    /**
     * ID of element that describes this select
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
 * Mac OS 9 style Select component
 *
 * Classic dropdown select with raised bevel effect and optional label.
 *
 * Features:
 * - Classic Mac OS 9 popup menu styling
 * - Label positioning (top/left/right)
 * - Size variants (sm/md/lg)
 * - Error states with messages
 * - Helper text support
 * - Option groups support
 * - Full accessibility with ARIA support
 * - Keyboard navigation
 * - Form integration
 *
 * @example
 * ```tsx
 * // With options prop
 * <Select
 *   label="Choose a color"
 *   options={[
 *     { value: 'red', label: 'Red' },
 *     { value: 'blue', label: 'Blue' },
 *     { value: 'green', label: 'Green' }
 *   ]}
 *   placeholder="Select a color..."
 * />
 *
 * // With children
 * <Select label="Country">
 *   <option value="us">United States</option>
 *   <option value="ca">Canada</option>
 *   <option value="mx">Mexico</option>
 * </Select>
 * ```
 */
export declare const Select: React.ForwardRefExoticComponent<SelectProps & React.RefAttributes<HTMLSelectElement>>;
export default Select;
