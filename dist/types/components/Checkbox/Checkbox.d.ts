import React, { InputHTMLAttributes } from 'react';
export interface CheckboxProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type' | 'size'> {
    /**
     * Whether the checkbox is checked
     * For controlled component usage
     */
    checked?: boolean;
    /**
     * Default checked state
     * For uncontrolled component usage
     */
    defaultChecked?: boolean;
    /**
     * Whether the checkbox is in an indeterminate state
     * (neither checked nor unchecked, typically for "select all" scenarios)
     * @default false
     */
    indeterminate?: boolean;
    /**
     * Whether the checkbox is disabled
     * @default false
     */
    disabled?: boolean;
    /**
     * Label text for the checkbox
     */
    label?: React.ReactNode;
    /**
     * Position of the label relative to the checkbox
     * @default 'right'
     */
    labelPosition?: 'left' | 'right';
    /**
     * Size of the checkbox
     * @default 'md'
     */
    size?: 'sm' | 'md' | 'lg';
    /**
     * Error state for form validation
     * @default false
     */
    error?: boolean;
    /**
     * Override aria-label (for checkboxes without visible labels)
     */
    ariaLabel?: string;
    /**
     * ID of element that describes this checkbox
     */
    ariaDescribedBy?: string;
    /**
     * Additional CSS class names
     */
    className?: string;
    /**
     * Callback when checked state changes
     */
    onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}
/**
 * Mac OS 9 style Checkbox component
 *
 * Classic checkbox with raised bevel effect and optional label.
 * Supports checked, unchecked, indeterminate, and disabled states.
 *
 * Features:
 * - Classic Mac OS 9 bevel styling
 * - Indeterminate state support
 * - Label positioning (left/right)
 * - Controlled and uncontrolled modes
 * - Full accessibility with ARIA support
 * - Keyboard navigation (Space to toggle)
 * - Form integration
 *
 * @example
 * ```tsx
 * // Uncontrolled
 * <Checkbox label="Accept terms" />
 *
 * // Controlled
 * <Checkbox
 *   checked={isChecked}
 *   onChange={(e) => setIsChecked(e.target.checked)}
 *   label="Subscribe to newsletter"
 * />
 *
 * // Indeterminate (for "select all")
 * <Checkbox
 *   indeterminate={someSelected && !allSelected}
 *   checked={allSelected}
 *   onChange={handleSelectAll}
 *   label="Select all items"
 * />
 * ```
 */
export declare const Checkbox: React.ForwardRefExoticComponent<CheckboxProps & React.RefAttributes<HTMLInputElement>>;
export default Checkbox;
