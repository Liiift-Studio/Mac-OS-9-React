import React from 'react';
import { IconName } from './registry';
import { IconProps } from './Icon';
export interface IconLibraryProps extends Omit<IconProps, 'children' | 'label'> {
    /**
     * Icon name from the registry
     */
    icon: IconName;
    /**
     * Optional custom label for accessibility
     * If not provided, uses the icon name
     */
    label?: string;
}
/**
 * IconLibrary component for Mac OS 9 UI
 *
 * Provides a convenient way to use icons by name rather than importing each one individually.
 * All icons are registered in the icon registry and can be accessed by their string names.
 *
 * @example
 * ```tsx
 * <IconLibrary icon="save" size="md" />
 * <IconLibrary icon="folder" size="lg" />
 * <IconLibrary icon="arrow-right" size="sm" />
 * ```
 */
export declare const IconLibrary: React.FC<IconLibraryProps>;
export default IconLibrary;
