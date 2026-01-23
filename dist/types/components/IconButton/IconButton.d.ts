import React, { ButtonHTMLAttributes } from 'react';
export interface IconButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    /**
     * Icon element to display
     */
    icon: React.ReactNode;
    /**
     * Optional text label to display alongside icon
     */
    label?: string;
    /**
     * Label position relative to icon
     * @default 'right'
     */
    labelPosition?: 'left' | 'right' | 'top' | 'bottom';
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
     * Whether button is disabled
     * @default false
     */
    disabled?: boolean;
    /**
     * Additional CSS class names
     */
    className?: string;
}
/**
 * IconButton component for Mac OS 9 UI
 *
 * Button with an icon, optionally with a text label.
 * Supports all button variants and sizes.
 *
 * @example
 * ```tsx
 * // Icon-only button
 * <IconButton icon={<SaveIcon />} />
 *
 * // Icon with label
 * <IconButton
 *   icon={<FolderIcon />}
 *   label="New Folder"
 *   variant="primary"
 * />
 *
 * // Icon with label on different sides
 * <IconButton
 *   icon={<SearchIcon />}
 *   label="Search"
 *   labelPosition="right"
 * />
 * ```
 */
export declare const IconButton: React.ForwardRefExoticComponent<IconButtonProps & React.RefAttributes<HTMLButtonElement>>;
export default IconButton;
