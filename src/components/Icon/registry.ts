// Icon Registry - Mac OS 9 React UI
// Central registry of all available icons with type-safe names

import { DividerIcon } from './categories/ui';

/**
 * Central icon registry
 * Maps icon names to their components
 */
export const iconRegistry = {
	// UI
	divider: DividerIcon,
} as const;

/**
 * Type-safe icon names
 * Auto-generated from the icon registry
 */
export type IconName = keyof typeof iconRegistry;

/**
 * Get icon component by name
 * @param name - The icon name from the registry
 * @returns The icon component or undefined if not found
 */
export function getIcon(name: IconName) {
	return iconRegistry[name];
}

/**
 * Check if an icon exists in the registry
 * @param name - The icon name to check
 * @returns True if the icon exists
 */
export function hasIcon(name: string): name is IconName {
	return name in iconRegistry;
}

/**
 * Get all available icon names
 * @returns Array of all icon names
 */
export function getAllIconNames(): IconName[] {
	return Object.keys(iconRegistry) as IconName[];
}