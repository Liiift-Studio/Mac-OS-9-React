import React, { InputHTMLAttributes } from 'react';
export interface RadioProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type' | 'size'> {
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
export declare const Radio: React.ForwardRefExoticComponent<RadioProps & React.RefAttributes<HTMLInputElement>>;
export default Radio;
