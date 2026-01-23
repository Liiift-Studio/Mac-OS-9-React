import React, { ButtonHTMLAttributes, AnchorHTMLAttributes } from 'react';
interface BaseButtonProps {
    /**
     * Button variant
     * @default 'default'
     */
    variant?: 'default' | 'primary' | 'danger';
    /**
     * Button size
     * @default 'md'
     */
    size?: 'sm' | 'md' | 'lg';
    /**
     * Whether the button is disabled
     * @default false
     */
    disabled?: boolean;
    /**
     * Whether the button should take full width
     * @default false
     */
    fullWidth?: boolean;
    /**
     * Loading state - shows loading indicator and disables interaction
     * @default false
     */
    loading?: boolean;
    /**
     * Text to show when loading (replaces children)
     */
    loadingText?: string;
    /**
     * Use Mac OS 9 style watch cursor during loading
     * @default false
     */
    useCursorLoading?: boolean;
    /**
     * Icon to display before the button text
     */
    leftIcon?: React.ReactNode;
    /**
     * Icon to display after the button text
     */
    rightIcon?: React.ReactNode;
    /**
     * If true, only displays icon (children used as aria-label)
     */
    iconOnly?: boolean;
    /**
     * Override aria-label
     */
    ariaLabel?: string;
    /**
     * ID of element that describes this button
     */
    ariaDescribedBy?: string;
    /**
     * For toggle buttons - indicates pressed state
     */
    ariaPressed?: boolean;
    /**
     * Additional CSS class names
     */
    className?: string;
    /**
     * Button content
     */
    children: React.ReactNode;
}
interface ButtonAsButton extends BaseButtonProps, Omit<ButtonHTMLAttributes<HTMLButtonElement>, keyof BaseButtonProps | 'aria-label' | 'aria-describedby' | 'aria-pressed'> {
    /**
     * Render as button element
     * @default 'button'
     */
    as?: 'button';
    /**
     * Associate button with a form by ID
     */
    form?: string;
    /**
     * Override form action URL
     */
    formAction?: string;
    /**
     * Override form method
     */
    formMethod?: 'get' | 'post';
    /**
     * Skip form validation
     */
    formNoValidate?: boolean;
    /**
     * Where to display form response
     */
    formTarget?: string;
}
interface ButtonAsLink extends BaseButtonProps, Omit<AnchorHTMLAttributes<HTMLAnchorElement>, keyof BaseButtonProps | 'aria-label' | 'aria-describedby' | 'aria-pressed'> {
    /**
     * Render as anchor element
     */
    as: 'a';
    /**
     * URL for the link
     */
    href: string;
    /**
     * Where to open the link
     */
    target?: '_blank' | '_self' | '_parent' | '_top';
    /**
     * Relationship of linked resource
     * Auto-fills "noopener noreferrer" for external links if not provided
     */
    rel?: string;
    /**
     * Prompt to download the linked resource
     */
    download?: boolean | string;
}
export type ButtonProps = ButtonAsButton | ButtonAsLink;
/**
 * Mac OS 9 style Button component
 *
 * Polymorphic component that can render as button or link with consistent styling.
 *
 * Features:
 * - Classic 3-layer bevel effect (highlight, shadow, drop shadow)
 * - Polymorphic - renders as <button> or <a> based on `as` prop
 * - Loading states with optional Mac OS 9 watch cursor
 * - Icon support (left, right, or icon-only)
 * - Full accessibility with ARIA support
 * - Form integration props
 * - Auto-security for external links
 *
 * @example
 * ```tsx
 * // Button
 * <Button onClick={handleClick}>Click Me</Button>
 * <Button variant="primary" size="lg">Primary Action</Button>
 * <Button loading loadingText="Saving...">Save</Button>
 *
 * // Link styled as button
 * <Button as="a" href="/dashboard">Go to Dashboard</Button>
 * <Button as="a" href="https://example.com" target="_blank">
 *   External Link
 * </Button>
 *
 * // With icons
 * <Button leftIcon={<FolderIcon />}>Open</Button>
 * <Button iconOnly aria-label="Close">
 *   <CloseIcon />
 * </Button>
 * ```
 */
export declare const Button: React.ForwardRefExoticComponent<ButtonProps & React.RefAttributes<HTMLButtonElement | HTMLAnchorElement>>;
export default Button;
