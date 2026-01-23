/**
 * Base component props that all components should extend
 */
export interface BaseComponentProps {
    /** Additional CSS class name */
    className?: string;
    /** Inline styles */
    style?: React.CSSProperties;
    /** Test ID for testing purposes */
    'data-testid'?: string;
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
 * Component ref types
 */
export type ButtonRef = HTMLButtonElement;
export type InputRef = HTMLInputElement;
export type SelectRef = HTMLSelectElement;
export type TextAreaRef = HTMLTextAreaElement;
export type DivRef = HTMLDivElement;
