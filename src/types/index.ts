// Common types used across the Mac OS 9 UI library

/**
 * Generic classes object for targeting sub-elements within components
 * Components extend this with specific element keys
 */
export interface ComponentClasses {
	root?: string;
}

/**
 * Base component props that all components should extend
 * @template TClasses - Specific classes type for the component
 */
export interface BaseComponentProps<TClasses extends ComponentClasses = ComponentClasses> {
	/** Additional CSS class name for root element */
	className?: string;
	/** Inline styles */
	style?: React.CSSProperties;
	/** Custom classes for targeting sub-elements */
	classes?: TClasses;
	/** Test ID for testing purposes */
	'data-testid'?: string;
}

/**
 * Common render state interface for render prop patterns
 * Provides information about element state for conditional rendering
 */
export interface RenderState {
	/** Whether the element is being hovered */
	isHovered?: boolean;
	/** Whether the element is selected */
	isSelected?: boolean;
	/** Whether the element is in active state (e.g., pressed) */
	isActive?: boolean;
	/** Whether the element has keyboard focus */
	isFocused?: boolean;
	/** Whether the element is disabled */
	isDisabled?: boolean;
}

/**
 * Common variant types for Mac OS 9 components.
 *
 * The shared type previously listed `default | primary | secondary` while
 * every component actually implemented `default | primary | danger`, so it
 * described no component in the library (issue #43). It is now the union of
 * all four, and every component accepts all four.
 */
export type Variant = 'default' | 'primary' | 'secondary' | 'danger';

/**
 * Common size types.
 *
 * Was `small | medium | large` while every component used `sm | md | lg`,
 * leaving the shared type unused and misleading (issue #42). Aligned on the
 * abbreviated form, which is what the components already shipped.
 */
export type Size = 'sm' | 'md' | 'lg';

/**
 * Common state types
 */
export type State = 'default' | 'hover' | 'active' | 'disabled' | 'focused';

/**
 * Window position for draggable windows
 */
export interface WindowPosition {
	x: number;
	y: number;
}

/**
 * Component ref types
 */
export type ButtonRef = HTMLButtonElement;
export type InputRef = HTMLInputElement;
export type SelectRef = HTMLButtonElement;
export type TextAreaRef = HTMLTextAreaElement;
export type DivRef = HTMLDivElement;

/**
 * Standard ARIA props every interactive component accepts.
 *
 * Components previously exposed camelCase `ariaLabel` / `ariaDescribedBy` /
 * `ariaPressed`, which broke `eslint-plugin-jsx-a11y`, testing-library
 * queries and general ecosystem expectations (issue #41). The hyphenated
 * React/HTML idiom is canonical now.
 */
export interface AriaProps {
	'aria-label'?: string;
	'aria-labelledby'?: string;
	'aria-describedby'?: string;
	'aria-pressed'?: boolean;
	'aria-disabled'?: boolean;
	'aria-busy'?: boolean;
}

/**
 * Deprecated camelCase ARIA aliases, kept for one major version so 0.x code
 * keeps compiling. Each logs a development-only warning when used and is
 * ignored if the hyphenated form is also supplied.
 *
 * @deprecated Use the hyphenated `aria-*` props instead. Removed in 2.0.
 */
export interface LegacyAriaProps {
	/** @deprecated Use `aria-label`. */
	ariaLabel?: string;
	/** @deprecated Use `aria-describedby`. */
	ariaDescribedBy?: string;
	/** @deprecated Use `aria-pressed`. */
	ariaPressed?: boolean;
}
