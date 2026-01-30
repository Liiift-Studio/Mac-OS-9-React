/**
 * Central icon registry
 * Maps icon names to their components
 */
export declare const iconRegistry: {
    readonly divider: import("react").FC<{}>;
};
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
export declare function getIcon(name: IconName): import("react").FC<{}>;
/**
 * Check if an icon exists in the registry
 * @param name - The icon name to check
 * @returns True if the icon exists
 */
export declare function hasIcon(name: string): name is IconName;
/**
 * Get all available icon names
 * @returns Array of all icon names
 */
export declare function getAllIconNames(): IconName[];
