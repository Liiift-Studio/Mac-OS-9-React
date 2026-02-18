/**
 * Generic classes object for targeting sub-elements within components
 * Components extend this with specific element keys
 */
export interface ComponentClasses {
    root?: string;
    [key: string]: string | undefined;
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
 * Common variant types for Mac OS 9 components
 */
export type Variant = 'default' | 'primary' | 'secondary';
/**
 * Common size types
 */
export type Size = 'small' | 'medium' | 'large';
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
export type SelectRef = HTMLSelectElement;
export type TextAreaRef = HTMLTextAreaElement;
export type DivRef = HTMLDivElement;
