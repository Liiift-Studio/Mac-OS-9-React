// Utility for merging CSS class names
// Filters out falsy values and joins valid class names with spaces

/**
 * Merges multiple class names into a single string
 * Filters out undefined, null, false, and empty strings
 * 
 * @param classes - Class names to merge
 * @returns Merged class name string
 * 
 * @example
 * ```ts
 * mergeClasses('base', isActive && 'active', undefined, 'custom')
 * // Returns: "base active custom"
 * ```
 */
export const mergeClasses = (...classes: (string | undefined | false | null)[]): string => {
	return classes.filter(Boolean).join(' ');
};

/**
 * Creates a class name builder function with a base class
 * Useful for component-level class management
 * 
 * @param baseClass - Base class name
 * @returns Function that merges additional classes with base
 * 
 * @example
 * ```ts
 * const cn = createClassBuilder('button');
 * cn('primary', isDisabled && 'disabled')
 * // Returns: "button primary disabled"
 * ```
 */
export const createClassBuilder = (baseClass: string) => {
	return (...additionalClasses: (string | undefined | false | null)[]) => {
		return mergeClasses(baseClass, ...additionalClasses);
	};
};
