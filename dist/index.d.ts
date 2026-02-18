import * as React$1 from 'react';
import React__default, { ButtonHTMLAttributes, AnchorHTMLAttributes, SVGAttributes, InputHTMLAttributes, SelectHTMLAttributes, ReactElement } from 'react';

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
    leftIcon?: React__default.ReactNode;
    /**
     * Icon to display after the button text
     */
    rightIcon?: React__default.ReactNode;
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
    children: React__default.ReactNode;
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
type ButtonProps = ButtonAsButton | ButtonAsLink;
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
declare const Button: React__default.ForwardRefExoticComponent<ButtonProps & React__default.RefAttributes<HTMLButtonElement | HTMLAnchorElement>>;

interface IconProps extends SVGAttributes<SVGElement> {
    /**
     * Icon size
     * @default 'md'
     */
    size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
    /**
     * Icon content (SVG path or element)
     */
    children: React__default.ReactNode;
    /**
     * Optional label for accessibility
     */
    label?: string;
    /**
     * Additional CSS class names
     */
    className?: string;
}
/**
 * Icon component for Mac OS 9 UI
 *
 * Wraps SVG content with consistent sizing and styling.
 * Use for inline icons in buttons, labels, etc.
 *
 * @example
 * ```tsx
 * <Icon size="sm">
 *   <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/>
 * </Icon>
 *
 * <Icon label="Close" size="md">
 *   <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
 * </Icon>
 * ```
 */
declare const Icon: React__default.ForwardRefExoticComponent<IconProps & React__default.RefAttributes<SVGSVGElement>>;

/**
 * Central icon registry
 * Maps icon names to their components
 */
declare const iconRegistry: {
    readonly divider: React$1.FC<{}>;
};
/**
 * Type-safe icon names
 * Auto-generated from the icon registry
 */
type IconName = keyof typeof iconRegistry;

interface IconLibraryProps extends Omit<IconProps, 'children' | 'label'> {
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
declare const IconLibrary: React__default.FC<IconLibraryProps>;

/**
 * Divider icon
 * Vertical divider for menu bars and toolbars
 * Note: Uses a 10x32 viewBox instead of standard 24x24
 */
declare const DividerIcon: React__default.FC;

interface IconButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    /**
     * Icon element to display
     */
    icon: React__default.ReactNode;
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
declare const IconButton: React__default.ForwardRefExoticComponent<IconButtonProps & React__default.RefAttributes<HTMLButtonElement>>;

interface CheckboxProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type' | 'size'> {
    /**
     * Whether the checkbox is checked
     * For controlled component usage
     */
    checked?: boolean;
    /**
     * Default checked state
     * For uncontrolled component usage
     */
    defaultChecked?: boolean;
    /**
     * Whether the checkbox is in an indeterminate state
     * (neither checked nor unchecked, typically for "select all" scenarios)
     * @default false
     */
    indeterminate?: boolean;
    /**
     * Whether the checkbox is disabled
     * @default false
     */
    disabled?: boolean;
    /**
     * Label text for the checkbox
     */
    label?: React__default.ReactNode;
    /**
     * Position of the label relative to the checkbox
     * @default 'right'
     */
    labelPosition?: 'left' | 'right';
    /**
     * Size of the checkbox
     * @default 'md'
     */
    size?: 'sm' | 'md' | 'lg';
    /**
     * Error state for form validation
     * @default false
     */
    error?: boolean;
    /**
     * Override aria-label (for checkboxes without visible labels)
     */
    ariaLabel?: string;
    /**
     * ID of element that describes this checkbox
     */
    ariaDescribedBy?: string;
    /**
     * Additional CSS class names
     */
    className?: string;
    /**
     * Callback when checked state changes
     */
    onChange?: (event: React__default.ChangeEvent<HTMLInputElement>) => void;
}
/**
 * Mac OS 9 style Checkbox component
 *
 * Classic checkbox with raised bevel effect and optional label.
 * Supports checked, unchecked, indeterminate, and disabled states.
 *
 * Features:
 * - Classic Mac OS 9 bevel styling
 * - Indeterminate state support
 * - Label positioning (left/right)
 * - Controlled and uncontrolled modes
 * - Full accessibility with ARIA support
 * - Keyboard navigation (Space to toggle)
 * - Form integration
 *
 * @example
 * ```tsx
 * // Uncontrolled
 * <Checkbox label="Accept terms" />
 *
 * // Controlled
 * <Checkbox
 *   checked={isChecked}
 *   onChange={(e) => setIsChecked(e.target.checked)}
 *   label="Subscribe to newsletter"
 * />
 *
 * // Indeterminate (for "select all")
 * <Checkbox
 *   indeterminate={someSelected && !allSelected}
 *   checked={allSelected}
 *   onChange={handleSelectAll}
 *   label="Select all items"
 * />
 * ```
 */
declare const Checkbox: React__default.ForwardRefExoticComponent<CheckboxProps & React__default.RefAttributes<HTMLInputElement>>;

interface RadioProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type' | 'size'> {
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
    label?: React__default.ReactNode;
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
    onChange?: (event: React__default.ChangeEvent<HTMLInputElement>) => void;
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
declare const Radio: React__default.ForwardRefExoticComponent<RadioProps & React__default.RefAttributes<HTMLInputElement>>;

interface TextFieldProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> {
    /**
     * Label text for the text field
     */
    label?: React__default.ReactNode;
    /**
     * Position of the label relative to the text field
     * @default 'top'
     */
    labelPosition?: 'top' | 'left' | 'right';
    /**
     * Size of the text field
     * @default 'md'
     */
    size?: 'sm' | 'md' | 'lg';
    /**
     * Whether the text field takes full width of its container
     * @default false
     */
    fullWidth?: boolean;
    /**
     * Error state for form validation
     * @default false
     */
    error?: boolean;
    /**
     * Error message to display below the field
     */
    errorMessage?: string;
    /**
     * Helper text to display below the field
     */
    helperText?: string;
    /**
     * Icon to display before the input (left side)
     */
    leftIcon?: React__default.ReactNode;
    /**
     * Icon to display after the input (right side)
     */
    rightIcon?: React__default.ReactNode;
    /**
     * Override aria-label
     */
    ariaLabel?: string;
    /**
     * ID of element that describes this text field
     */
    ariaDescribedBy?: string;
    /**
     * Additional CSS class names
     */
    className?: string;
    /**
     * Custom wrapper class name
     */
    wrapperClassName?: string;
}
/**
 * Mac OS 9 style TextField component
 *
 * Classic text input with inset bevel effect and optional label.
 *
 * Features:
 * - Classic Mac OS 9 inset bevel styling
 * - Label positioning (top/left/right)
 * - Size variants (sm/md/lg)
 * - Error states with messages
 * - Helper text support
 * - Icon support (left/right)
 * - Full accessibility with ARIA support
 * - Keyboard navigation
 * - Form integration
 *
 * @example
 * ```tsx
 * // Basic text field
 * <TextField placeholder="Enter text..." />
 *
 * // With label
 * <TextField label="Username" placeholder="Enter username" />
 *
 * // With error
 * <TextField
 *   label="Email"
 *   error
 *   errorMessage="Invalid email address"
 *   value={email}
 *   onChange={(e) => setEmail(e.target.value)}
 * />
 *
 * // With icons
 * <TextField
 *   leftIcon={<SearchIcon />}
 *   placeholder="Search..."
 * />
 * ```
 */
declare const TextField: React__default.ForwardRefExoticComponent<TextFieldProps & React__default.RefAttributes<HTMLInputElement>>;

interface SelectOption {
    value: string | number;
    label: string;
    disabled?: boolean;
}
interface SelectProps extends Omit<SelectHTMLAttributes<HTMLSelectElement>, 'size'> {
    /**
     * Label text for the select
     */
    label?: React__default.ReactNode;
    /**
     * Position of the label relative to the select
     * @default 'top'
     */
    labelPosition?: 'top' | 'left' | 'right';
    /**
     * Size of the select
     * @default 'md'
     */
    size?: 'sm' | 'md' | 'lg';
    /**
     * Whether the select takes full width of its container
     * @default false
     */
    fullWidth?: boolean;
    /**
     * Error state for form validation
     * @default false
     */
    error?: boolean;
    /**
     * Error message to display below the field
     */
    errorMessage?: string;
    /**
     * Helper text to display below the field
     */
    helperText?: string;
    /**
     * Options for the select dropdown
     * Alternative to providing option elements as children
     */
    options?: SelectOption[];
    /**
     * Placeholder text (creates a disabled first option)
     */
    placeholder?: string;
    /**
     * Override aria-label
     */
    ariaLabel?: string;
    /**
     * ID of element that describes this select
     */
    ariaDescribedBy?: string;
    /**
     * Additional CSS class names
     */
    className?: string;
    /**
     * Custom wrapper class name
     */
    wrapperClassName?: string;
}
/**
 * Mac OS 9 style Select component
 *
 * Classic dropdown select with raised bevel effect and optional label.
 *
 * Features:
 * - Classic Mac OS 9 popup menu styling
 * - Label positioning (top/left/right)
 * - Size variants (sm/md/lg)
 * - Error states with messages
 * - Helper text support
 * - Option groups support
 * - Full accessibility with ARIA support
 * - Keyboard navigation
 * - Form integration
 *
 * @example
 * ```tsx
 * // With options prop
 * <Select
 *   label="Choose a color"
 *   options={[
 *     { value: 'red', label: 'Red' },
 *     { value: 'blue', label: 'Blue' },
 *     { value: 'green', label: 'Green' }
 *   ]}
 *   placeholder="Select a color..."
 * />
 *
 * // With children
 * <Select label="Country">
 *   <option value="us">United States</option>
 *   <option value="ca">Canada</option>
 *   <option value="mx">Mexico</option>
 * </Select>
 * ```
 */
declare const Select: React__default.ForwardRefExoticComponent<SelectProps & React__default.RefAttributes<HTMLSelectElement>>;

interface TabPanelProps {
    /**
     * Label for the tab
     */
    label: string;
    /**
     * Content of the tab panel
     */
    children: React__default.ReactNode;
    /**
     * Optional icon to display in the tab
     */
    icon?: React__default.ReactNode;
    /**
     * Whether this tab is disabled
     * @default false
     */
    disabled?: boolean;
    /**
     * Value identifier for controlled tabs
     */
    value?: string;
}
/**
 * TabPanel component - Individual tab content
 * Must be used as a child of Tabs component
 */
declare const TabPanel: React__default.FC<TabPanelProps>;
interface TabsProps {
    /**
     * Tab panels as children
     */
    children: ReactElement<TabPanelProps> | ReactElement<TabPanelProps>[];
    /**
     * Index of the default active tab (uncontrolled)
     * @default 0
     */
    defaultActiveTab?: number;
    /**
     * Index of the active tab (controlled)
     */
    activeTab?: number;
    /**
     * Callback when tab changes
     */
    onChange?: (index: number, value?: string) => void;
    /**
     * Size of the tabs
     * @default 'md'
     */
    size?: 'sm' | 'md' | 'lg';
    /**
     * Whether tabs take full width
     * @default false
     */
    fullWidth?: boolean;
    /**
     * Custom class name for the container
     */
    className?: string;
    /**
     * Custom class name for the tab list
     */
    tabListClassName?: string;
    /**
     * Custom class name for the tab panel container
     */
    panelClassName?: string;
    /**
     * ARIA label for the tab list
     */
    ariaLabel?: string;
}
/**
 * Mac OS 9 style Tabs component
 *
 * Classic tabbed navigation with raised tab appearance and inset panel.
 *
 * Features:
 * - Classic Mac OS 9 tab styling
 * - Controlled and uncontrolled modes
 * - Keyboard navigation (Arrow keys, Home, End)
 * - Full accessibility with ARIA
 * - Optional icons in tabs
 * - Disabled tab states
 *
 * @example
 * ```tsx
 * // Uncontrolled
 * <Tabs>
 *   <TabPanel label="General">
 *     <p>General settings content</p>
 *   </TabPanel>
 *   <TabPanel label="Advanced">
 *     <p>Advanced settings content</p>
 *   </TabPanel>
 * </Tabs>
 *
 * // Controlled
 * <Tabs activeTab={activeIndex} onChange={setActiveIndex}>
 *   <TabPanel label="Tab 1">Content 1</TabPanel>
 *   <TabPanel label="Tab 2">Content 2</TabPanel>
 * </Tabs>
 * ```
 */
declare const Tabs: React__default.FC<TabsProps>;

/**
 * Generic classes object for targeting sub-elements within components
 * Components extend this with specific element keys
 */
interface ComponentClasses {
    root?: string;
    [key: string]: string | undefined;
}
/**
 * Base component props that all components should extend
 * @template TClasses - Specific classes type for the component
 */
interface BaseComponentProps<TClasses extends ComponentClasses = ComponentClasses> {
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
interface RenderState {
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
type Variant = 'default' | 'primary' | 'secondary';
/**
 * Common size types
 */
type Size = 'small' | 'medium' | 'large';
/**
 * Common state types
 */
type State = 'default' | 'hover' | 'active' | 'disabled' | 'focused';
/**
 * Window position for draggable windows
 */
interface WindowPosition {
    x: number;
    y: number;
}
/**
 * Component ref types
 */
type ButtonRef = HTMLButtonElement;
type InputRef = HTMLInputElement;
type SelectRef = HTMLSelectElement;
type TextAreaRef = HTMLTextAreaElement;
type DivRef = HTMLDivElement;

/**
 * Classes for targeting Window sub-elements
 */
interface WindowClasses {
    /** Root container */
    root?: string;
    /** Title bar */
    titleBar?: string;
    /** Title text */
    titleText?: string;
    /** Window controls container */
    controls?: string;
    /** Individual control button */
    controlButton?: string;
    /** Content area */
    content?: string;
}
interface WindowProps {
    /**
     * Window content
     */
    children: React__default.ReactNode;
    /**
     * Window title (displays in title bar if no titleBar prop provided)
     */
    title?: string;
    /**
     * Custom title bar component
     * If provided, overrides the default title bar
     */
    titleBar?: React__default.ReactNode;
    /**
     * Whether window is active/focused
     * @default true
     */
    active?: boolean;
    /**
     * Width of the window
     * @default 'auto'
     */
    width?: number | string;
    /**
     * Height of the window
     * @default 'auto'
     */
    height?: number | string;
    /**
     * Custom class name for the window container
     */
    className?: string;
    /**
     * Custom class name for the content area
     */
    contentClassName?: string;
    /**
     * Custom classes for targeting sub-elements
     */
    classes?: WindowClasses;
    /**
     * Whether to show window controls (close, minimize, maximize)
     * @default true
     */
    showControls?: boolean;
    /**
     * Callback when close button is clicked
     */
    onClose?: () => void;
    /**
     * Callback when minimize button is clicked
     */
    onMinimize?: () => void;
    /**
     * Callback when maximize button is clicked
     */
    onMaximize?: () => void;
    /**
     * Callback when mouse enters the window
     */
    onMouseEnter?: (event: React__default.MouseEvent<HTMLDivElement>) => void;
    /**
     * Whether the window has a resize handle
     * @default false
     */
    resizable?: boolean;
    /**
     * Minimum width when resizing
     * @default 200
     */
    minWidth?: number;
    /**
     * Minimum height when resizing
     * @default 100
     */
    minHeight?: number;
    /**
     * Maximum width when resizing
     */
    maxWidth?: number;
    /**
     * Maximum height when resizing
     */
    maxHeight?: number;
    /**
     * Callback when window is resized
     * Only called when resizable is true
     */
    onResize?: (size: {
        width: number;
        height: number;
    }) => void;
    /**
     * Whether the window can be dragged by its title bar
     * Window starts in normal flow and becomes absolutely positioned when dragged
     * @default false
     */
    draggable?: boolean;
    /**
     * Initial position for draggable windows (uncontrolled)
     * Only used when draggable is true
     */
    defaultPosition?: WindowPosition;
    /**
     * Controlled position for draggable windows
     * Only used when draggable is true
     */
    position?: WindowPosition;
    /**
     * Callback when window position changes (during drag)
     * Only called when draggable is true
     */
    onPositionChange?: (position: WindowPosition) => void;
}
/**
 * Mac OS 9 style Window component
 *
 * Classic window container with title bar and content area.
 *
 * Features:
 * - Classic Mac OS 9 window styling with beveled edges
 * - Optional title bar with window controls
 * - Active/inactive states
 * - Composable with custom TitleBar component
 * - Flexible sizing
 * - Draggable windows (optional) - drag by title bar
 *
 * @example
 * ```tsx
 * // Simple window with title
 * <Window title="My Window">
 *   <p>Window content goes here</p>
 * </Window>
 *
 * // Window with custom title bar
 * <Window titleBar={<TitleBar title="Custom" />}>
 *   <p>Content</p>
 * </Window>
 *
 * // Window with controls and callbacks
 * <Window
 *   title="Document"
 *   onClose={() => console.log('Close')}
 *   onMinimize={() => console.log('Minimize')}
 * >
 *   <p>Content</p>
 * </Window>
 *
 * // Draggable window (uncontrolled)
 * <Window title="Draggable" draggable>
 *   <p>Drag me by the title bar!</p>
 * </Window>
 *
 * // Draggable window with initial position
 * <Window
 *   title="Positioned"
 *   draggable
 *   defaultPosition={{ x: 100, y: 100 }}
 * >
 *   <p>Starts at a specific position</p>
 * </Window>
 *
 * // Controlled draggable window
 * const [pos, setPos] = useState({ x: 0, y: 0 });
 * <Window
 *   title="Controlled"
 *   draggable
 *   position={pos}
 *   onPositionChange={setPos}
 * >
 *   <p>Parent controls position</p>
 * </Window>
 * ```
 */
declare const Window: React__default.ForwardRefExoticComponent<WindowProps & React__default.RefAttributes<HTMLDivElement>>;

interface DialogProps extends Omit<WindowProps, 'active'> {
    /**
     * Whether the dialog is open
     * @default false
     */
    open?: boolean;
    /**
     * Callback when dialog should close
     * Called when backdrop is clicked or Escape is pressed
     */
    onClose?: () => void;
    /**
     * Whether clicking the backdrop closes the dialog
     * @default true
     */
    closeOnBackdropClick?: boolean;
    /**
     * Whether pressing Escape closes the dialog
     * @default true
     */
    closeOnEscape?: boolean;
    /**
     * Custom backdrop className
     */
    backdropClassName?: string;
    /**
     * Whether to trap focus within the dialog
     * @default true
     */
    trapFocus?: boolean;
    /**
     * Initial focus element selector or ref
     */
    initialFocus?: string | React__default.RefObject<HTMLElement>;
}
/**
 * Mac OS 9 style Dialog component
 *
 * Modal dialog with backdrop, focus trapping, and keyboard handling.
 * Built on top of the Window component.
 *
 * Features:
 * - Classic Mac OS 9 dialog styling
 * - Modal backdrop with click-to-close
 * - Escape key to close
 * - Focus trapping within dialog
 * - Centered on screen
 * - Prevents body scroll when open
 *
 * @example
 * ```tsx
 * const [open, setOpen] = useState(false);
 *
 * <Dialog
 *   open={open}
 *   onClose={() => setOpen(false)}
 *   title="Confirm"
 *   width={350}
 * >
 *   <p>Are you sure?</p>
 *   <div>
 *     <Button onClick={() => setOpen(false)}>Cancel</Button>
 *     <Button variant="primary">OK</Button>
 *   </div>
 * </Dialog>
 * ```
 */
declare const Dialog: React__default.ForwardRefExoticComponent<DialogProps & React__default.RefAttributes<HTMLDivElement>>;

interface Menu {
    /**
     * Menu label (displayed in the menu bar)
     */
    label: string;
    /**
     * Menu type - determines behavior
     * @default 'dropdown'
     */
    type?: 'dropdown' | 'link';
    /**
     * Menu items (content of the dropdown)
     * Required when type is 'dropdown'
     */
    items?: React__default.ReactNode;
    /**
     * Link href (for link-type menus)
     * Used when type is 'link'
     */
    href?: string;
    /**
     * Click handler (for link-type menus)
     * Used when type is 'link'
     */
    onClick?: () => void;
    /**
     * Whether the menu is disabled
     * @default false
     */
    disabled?: boolean;
}
interface MenuBarProps {
    /**
     * Array of menus to display
     */
    menus: Menu[];
    /**
     * Index of the currently open menu (controlled)
     */
    openMenuIndex?: number;
    /**
     * Callback when a menu is opened
     */
    onMenuOpen?: (index: number) => void;
    /**
     * Callback when menus are closed
     */
    onMenuClose?: () => void;
    /**
     * Custom class name for the menu bar
     */
    className?: string;
    /**
     * Custom class name for menu dropdowns
     */
    dropdownClassName?: string;
    /**
     * Content to display on the left side (typically a logo)
     */
    leftContent?: React__default.ReactNode;
    /**
     * Content to display on the right side (status items, clock, etc.)
     * Can be a single element or array of elements
     */
    rightContent?: React__default.ReactNode | React__default.ReactNode[];
}
/**
 * Mac OS 9 style MenuBar component
 *
 * Horizontal menu bar with dropdown menus, logo support, and status area.
 *
 * Features:
 * - Classic Mac OS 9 menu bar styling
 * - Horizontal menu layout
 * - Dropdown menus on click
 * - Link-type menu items for navigation
 * - Logo/icon support on the left
 * - Status area on the right (clock, system indicators, etc.)
 * - Keyboard navigation (Left/Right for menus, Up/Down for items)
 * - Click outside to close
 * - Escape key to close
 * - Controlled state (consumers manage open/closed)
 * - Disabled menu support
 *
 * @example
 * ```tsx
 * const [openMenu, setOpenMenu] = useState<number | undefined>();
 *
 * <MenuBar
 *   leftContent={<img src="/logo.png" alt="Logo" width={16} height={16} />}
 *   openMenuIndex={openMenu}
 *   onMenuOpen={setOpenMenu}
 *   onMenuClose={() => setOpenMenu(undefined)}
 *   menus={[
 *     {
 *       label: 'File',
 *       type: 'dropdown',
 *       items: (
 *         <>
 *           <MenuItem label="Open..." shortcut="⌘O" onClick={() => {}} />
 *           <MenuItem label="Save" shortcut="⌘S" onClick={() => {}} />
 *         </>
 *       ),
 *     },
 *     {
 *       label: 'Home',
 *       type: 'link',
 *       href: '/',
 *     },
 *   ]}
 *   rightContent={[
 *     <Clock key="clock" />,
 *     <div key="divider" className={styles.divider} />,
 *     <SystemIndicator key="indicator" />,
 *   ]}
 * />
 * ```
 */
declare const MenuBar: React__default.ForwardRefExoticComponent<MenuBarProps & React__default.RefAttributes<HTMLDivElement>>;

interface MenuItemProps {
    /**
     * Menu item label text
     */
    label: string;
    /**
     * Optional keyboard shortcut to display (e.g., "⌘S", "Ctrl+O")
     */
    shortcut?: string;
    /**
     * Whether the menu item is disabled
     * @default false
     */
    disabled?: boolean;
    /**
     * Whether the menu item is selected/active
     * @default false
     */
    selected?: boolean;
    /**
     * Whether the menu item has a separator after it
     * @default false
     */
    separator?: boolean;
    /**
     * Whether the menu item has a checkmark (for toggle items)
     * @default false
     */
    checked?: boolean;
    /**
     * Optional icon to display before the label
     */
    icon?: React__default.ReactNode;
    /**
     * Callback when menu item is clicked
     */
    onClick?: (event: React__default.MouseEvent<HTMLButtonElement>) => void;
    /**
     * Callback when menu item is focused
     */
    onFocus?: (event: React__default.FocusEvent<HTMLButtonElement>) => void;
    /**
     * Callback when menu item loses focus
     */
    onBlur?: (event: React__default.FocusEvent<HTMLButtonElement>) => void;
    /**
     * Custom class name for the menu item
     */
    className?: string;
    /**
     * Whether the item has a submenu indicator (arrow)
     * @default false
     */
    hasSubmenu?: boolean;
    /**
     * Submenu items
     */
    items?: React__default.ReactNode;
}
/**
 * Mac OS 9 style MenuItem component
 *
 * Individual menu item for use within MenuBar or dropdown menus.
 *
 * Features:
 * - Classic Mac OS 9 menu item styling
 * - Disabled state support
 * - Keyboard shortcut display
 * - Checkmark support for toggle items
 * - Separator support
 * - Selected/active state
 * - Icon support
 * - Submenu indicator
 * - Full keyboard and mouse support
 *
 * @example
 * ```tsx
 * // Basic menu item
 * <MenuItem label="Open..." onClick={() => console.log('Open')} />
 *
 * // With keyboard shortcut
 * <MenuItem label="Save" shortcut="⌘S" onClick={() => console.log('Save')} />
 *
 * // Disabled item
 * <MenuItem label="Undo" disabled />
 *
 * // Checked item (toggle)
 * <MenuItem label="Show Grid" checked onClick={() => console.log('Toggle')} />
 *
 * // With separator
 * <MenuItem label="Preferences..." separator onClick={() => console.log('Prefs')} />
 *
 * // With submenu indicator
 * <MenuItem label="Recent Files" hasSubmenu />
 * ```
 */
declare const MenuItem: React__default.ForwardRefExoticComponent<MenuItemProps & React__default.RefAttributes<HTMLButtonElement>>;

interface MenuDropdownProps {
    /**
     * Menu label (displayed in the menu bar/button)
     */
    label: React__default.ReactNode;
    /**
     * Menu items (content of the dropdown)
     */
    items: React__default.ReactNode;
    /**
     * Whether the menu is disabled
     * @default false
     */
    disabled?: boolean;
    /**
     * Custom class name for the menu container
     */
    className?: string;
    /**
     * Custom class name for menu dropdown
     */
    dropdownClassName?: string;
    /**
     * Alignment of the dropdown menu
     * @default 'left'
     */
    align?: 'left' | 'right';
}
/**
 * Mac OS 9 style MenuDropdown component
 *
 * A standalone dropdown menu that shares the styling of the MenuBar.
 * Useful for placing menus in the status area (rightContent) or other parts of the app.
 */
declare const MenuDropdown: React__default.FC<MenuDropdownProps>;

interface ScrollbarProps {
    /**
     * Scrollbar orientation
     * @default 'vertical'
     */
    orientation?: 'vertical' | 'horizontal';
    /**
     * Current scroll position (0-1)
     */
    value?: number;
    /**
     * Viewport size relative to content size (0-1)
     * Used to calculate thumb size
     */
    viewportRatio?: number;
    /**
     * Callback when scroll position changes
     */
    onChange?: (value: number) => void;
    /**
     * Additional CSS class names
     */
    className?: string;
    /**
     * Whether scrollbar is disabled
     * @default false
     */
    disabled?: boolean;
}
/**
 * Mac OS 9 style Scrollbar component
 *
 * Classic scrollbar with arrow buttons and draggable thumb.
 * Can be used standalone or integrated with scrollable content.
 *
 * @example
 * ```tsx
 * <Scrollbar
 *   orientation="vertical"
 *   value={0.5}
 *   viewportRatio={0.3}
 *   onChange={(value) => console.log('Scroll position:', value)}
 * />
 * ```
 */
declare const Scrollbar: React__default.ForwardRefExoticComponent<ScrollbarProps & React__default.RefAttributes<HTMLDivElement>>;

interface ListColumn {
    /**
     * Column key/identifier
     */
    key: string;
    /**
     * Column header label
     */
    label: string;
    /**
     * Column width (px or percentage)
     * @default 'auto'
     */
    width?: number | string;
    /**
     * Whether column is sortable
     * @default true
     */
    sortable?: boolean;
}
interface ListItem {
    /**
     * Unique item ID
     */
    id: string;
    /**
     * Item data - keys should match column keys
     */
    [key: string]: any;
    /**
     * Optional icon to display
     */
    icon?: React__default.ReactNode;
}
/**
 * Classes for targeting ListView sub-elements
 */
interface ListViewClasses {
    /** Root container */
    root?: string;
    /** Header row container */
    header?: string;
    /** Individual header cell */
    headerCell?: string;
    /** Body container (scrollable area) */
    body?: string;
    /** Individual row */
    row?: string;
    /** Individual cell */
    cell?: string;
}
/**
 * Row render prop state
 */
interface RowRenderState {
    /** Whether this row is selected */
    isSelected: boolean;
    /** Whether this row is being hovered */
    isHovered: boolean;
    /** Row index in the list */
    index: number;
}
/**
 * Row render prop default props
 * Spread these on your custom element for accessibility and behavior
 */
interface RowDefaultProps {
    key: string;
    className: string;
    onClick: (e: React__default.MouseEvent) => void;
    onDoubleClick: () => void;
    onMouseEnter: () => void;
    onMouseLeave: () => void;
    'data-selected': boolean;
    'data-index': number;
    'data-item-id': string;
}
/**
 * Cell render prop state
 */
interface CellRenderState {
    /** Whether this cell is being hovered */
    isHovered: boolean;
    /** Whether the row containing this cell is selected */
    isRowSelected: boolean;
    /** Column index */
    columnIndex: number;
    /** Row index */
    rowIndex: number;
}
/**
 * Header cell render prop state
 */
interface HeaderCellRenderState {
    /** Whether this column is currently sorted */
    isSorted: boolean;
    /** Current sort direction if sorted */
    sortDirection?: 'asc' | 'desc';
}
/**
 * Header cell render prop default props
 */
interface HeaderCellDefaultProps {
    key: string;
    className: string;
    style: React__default.CSSProperties;
    onClick: () => void;
    'data-column': string;
    'data-sortable': boolean;
    'data-sorted'?: boolean;
    'data-sort-direction'?: 'asc' | 'desc';
}
interface ListViewProps {
    /**
     * Column definitions
     */
    columns: ListColumn[];
    /**
     * List items
     */
    items: ListItem[];
    /**
     * Selected item IDs
     */
    selectedIds?: string[];
    /**
     * Callback when selection changes
     */
    onSelectionChange?: (selectedIds: string[]) => void;
    /**
     * Callback when item is double-clicked
     */
    onItemOpen?: (item: ListItem) => void;
    /**
     * Callback when mouse enters an item (row-level)
     */
    onItemMouseEnter?: (item: ListItem) => void;
    /**
     * Callback when mouse leaves an item (row-level)
     */
    onItemMouseLeave?: (item: ListItem) => void;
    /**
     * Callback when column is clicked for sorting
     */
    onSort?: (columnKey: string, direction: 'asc' | 'desc') => void;
    /**
     * Additional CSS class names
     */
    className?: string;
    /**
     * Height of the list view
     */
    height?: number | string;
    /**
     * Custom classes for targeting sub-elements
     */
    classes?: ListViewClasses;
    /**
     * Override row rendering
     * @param item - The list item
     * @param state - Row state (selected, hovered, index)
     * @param defaultProps - Props to spread on custom element for accessibility
     * @returns Custom row element (fully replaces default)
     */
    renderRow?: (item: ListItem, state: RowRenderState, defaultProps: RowDefaultProps) => React__default.ReactNode;
    /**
     * Override cell rendering
     * @param value - Cell value (item[columnKey])
     * @param item - Full item object
     * @param column - Column definition
     * @param state - Cell state (hovered, selected row, indices)
     * @returns Custom cell content (fully replaces default)
     */
    renderCell?: (value: any, item: ListItem, column: ListColumn, state: CellRenderState) => React__default.ReactNode;
    /**
     * Override header cell rendering
     * @param column - Column definition
     * @param state - Header state (sorted, direction)
     * @param defaultProps - Props to spread on custom element
     * @returns Custom header cell element (fully replaces default)
     */
    renderHeaderCell?: (column: ListColumn, state: HeaderCellRenderState, defaultProps: HeaderCellDefaultProps) => React__default.ReactNode;
    /**
     * Callback when a cell is clicked
     */
    onCellClick?: (item: ListItem, column: ListColumn, event: React__default.MouseEvent) => void;
    /**
     * Callback when mouse enters a cell
     */
    onCellMouseEnter?: (item: ListItem, column: ListColumn) => void;
    /**
     * Callback when mouse leaves a cell
     */
    onCellMouseLeave?: (item: ListItem, column: ListColumn) => void;
}
/**
 * Mac OS 9 style ListView component
 *
 * Multi-column list with sortable headers and row selection.
 * Similar to Finder list view.
 *
 * @example
 * ```tsx
 * <ListView
 *   columns={[
 *     { key: 'name', label: 'Name' },
 *     { key: 'modified', label: 'Date Modified' },
 *     { key: 'size', label: 'Size' }
 *   ]}
 *   items={[
 *     { id: '1', name: 'Document.txt', modified: 'Today', size: '2 KB' },
 *     { id: '2', name: 'Images', modified: 'Yesterday', size: '--' }
 *   ]}
 *   selectedIds={['1']}
 *   onSelectionChange={(ids) => console.log('Selected:', ids)}
 *   onItemMouseEnter={(item) => console.log('Hovering:', item.name)}
 * />
 * ```
 */
declare const ListView: React__default.ForwardRefExoticComponent<ListViewProps & React__default.RefAttributes<HTMLDivElement>>;

/**
 * Classes for targeting FolderList sub-elements
 */
interface FolderListClasses {
    /** Root window container */
    root?: string;
    /** Window component */
    window?: string;
    /** Title bar */
    titleBar?: string;
    /** ListView container */
    listView?: string;
    /** ListView header */
    header?: string;
    /** ListView header cell */
    headerCell?: string;
    /** ListView body */
    body?: string;
    /** ListView row */
    row?: string;
    /** ListView cell */
    cell?: string;
}
interface FolderListProps extends Omit<WindowProps, 'children' | 'classes'> {
    /**
     * Column definitions for the list
     * @default [{ key: 'name', label: 'Name' }, { key: 'modified', label: 'Date Modified' }, { key: 'size', label: 'Size' }]
     */
    columns?: ListColumn[];
    /**
     * Whether the folder list window can be dragged by its title bar
     * Window starts in normal flow and becomes absolutely positioned when dragged
     * @default false
     */
    draggable?: boolean;
    /**
     * Initial position for draggable folder lists (uncontrolled)
     * Only used when draggable is true
     */
    defaultPosition?: WindowPosition;
    /**
     * Controlled position for draggable folder lists
     * Only used when draggable is true
     */
    position?: WindowPosition;
    /**
     * Callback when folder list position changes (during drag)
     * Only called when draggable is true
     */
    onPositionChange?: (position: WindowPosition) => void;
    /**
     * Items to display in the list
     */
    items: ListItem[];
    /**
     * Selected item IDs
     */
    selectedIds?: string[];
    /**
     * Callback when selection changes
     */
    onSelectionChange?: (selectedIds: string[]) => void;
    /**
     * Callback when item is double-clicked (opened)
     */
    onItemOpen?: (item: ListItem) => void;
    /**
     * Callback when mouse enters an item (row-level)
     */
    onItemMouseEnter?: (item: ListItem) => void;
    /**
     * Callback when mouse leaves an item (row-level)
     */
    onItemMouseLeave?: (item: ListItem) => void;
    /**
     * Callback when column header is clicked for sorting
     */
    onSort?: (columnKey: string, direction: 'asc' | 'desc') => void;
    /**
     * Callback when mouse enters the folder list window
     */
    onMouseEnter?: (event: React__default.MouseEvent<HTMLDivElement>) => void;
    /**
     * Height of the list view area
     * @default 400
     */
    listHeight?: number | string;
    /**
     * Custom classes for targeting sub-elements
     */
    classes?: FolderListClasses;
    /**
     * Override row rendering
     * @param item - The list item
     * @param state - Row state (selected, hovered, index)
     * @param defaultProps - Props to spread on custom element for accessibility
     * @returns Custom row element (fully replaces default)
     */
    renderRow?: (item: ListItem, state: RowRenderState, defaultProps: RowDefaultProps) => React__default.ReactNode;
    /**
     * Override cell rendering
     * @param value - Cell value (item[columnKey])
     * @param item - Full item object
     * @param column - Column definition
     * @param state - Cell state (hovered, selected row, indices)
     * @returns Custom cell content (fully replaces default)
     */
    renderCell?: (value: any, item: ListItem, column: ListColumn, state: CellRenderState) => React__default.ReactNode;
    /**
     * Override header cell rendering
     * @param column - Column definition
     * @param state - Header state (sorted, direction)
     * @param defaultProps - Props to spread on custom element
     * @returns Custom header cell element (fully replaces default)
     */
    renderHeaderCell?: (column: ListColumn, state: HeaderCellRenderState, defaultProps: HeaderCellDefaultProps) => React__default.ReactNode;
    /**
     * Callback when a cell is clicked
     */
    onCellClick?: (item: ListItem, column: ListColumn, event: React__default.MouseEvent) => void;
    /**
     * Callback when mouse enters a cell
     */
    onCellMouseEnter?: (item: ListItem, column: ListColumn) => void;
    /**
     * Callback when mouse leaves a cell
     */
    onCellMouseLeave?: (item: ListItem, column: ListColumn) => void;
}
/**
 * Mac OS 9 style FolderList component
 *
 * Window with integrated ListView for browsing files and folders.
 * Similar to Finder list view in Mac OS 9.
 *
 * @example
 * ```tsx
 * // Basic folder list
 * <FolderList
 *   title="My Documents"
 *   items={[
 *     { id: '1', name: 'Document.txt', modified: 'Today', size: '2 KB', icon: <FileIcon /> },
 *     { id: '2', name: 'Images', modified: 'Yesterday', size: '--', icon: <FolderIcon /> }
 *   ]}
 *   selectedIds={['1']}
 *   onSelectionChange={(ids) => console.log('Selected:', ids)}
 *   onItemOpen={(item) => console.log('Open:', item.name)}
 * />
 *
 * // Draggable folder list
 * <FolderList
 *   title="My Documents"
 *   items={items}
 *   draggable
 *   defaultPosition={{ x: 100, y: 100 }}
 * />
 * ```
 */
declare const FolderList: React__default.ForwardRefExoticComponent<FolderListProps & React__default.RefAttributes<HTMLDivElement>>;

/**
 * Color tokens based on Mac OS 9 grayscale palette
 * Extracted from Figma styles and component analysis
 */
declare const colors: {
    readonly gray100: "#FFFFFF";
    readonly gray200: "#EEEEEE";
    readonly gray300: "#DDDDDD";
    readonly gray400: "#CCCCCC";
    readonly gray500: "#999999";
    readonly gray600: "#666666";
    readonly gray700: "#4D4D4D";
    readonly gray800: "#333333";
    readonly gray900: "#262626";
    readonly lavender: "#CCCCFF";
    readonly azul: "#0066CC";
    readonly linkRed: "#CC0000";
    readonly background: "#EEEEEE";
    readonly foreground: "#262626";
    readonly border: "#262626";
    readonly text: "#262626";
    readonly textInverse: "#FFFFFF";
    readonly surface: "#EEEEEE";
    readonly surfaceInset: "#FFFFFF";
    readonly black: "#262626";
    readonly white: "#FFFFFF";
    readonly focus: "#000080";
    readonly error: "#CC0000";
    readonly success: "#008000";
    readonly warning: "#FF8C00";
};
/**
 * Typography tokens
 * Based on Figma text styles and authentic Mac OS 9 system fonts
 *
 * Mac OS 9 Typography:
 * - Charcoal: Primary system UI font (menus, buttons, dialogs)
 * - Geneva: Body text and secondary UI elements
 * - Chicago: Classic Mac system font (menu bar, earlier versions)
 * - Apple Garamond: Headlines and editorial content
 */
declare const typography: {
    readonly fontFamily: {
        readonly system: "Charcoal, \"Charcoal CY\", Chicago, \"Chicago Classic\", -apple-system, BlinkMacSystemFont, \"Segoe UI\", Helvetica, Arial, sans-serif";
        readonly body: "Geneva, \"Geneva CY\", \"Lucida Grande\", \"Lucida Sans Unicode\", sans-serif";
        readonly display: "\"Apple Garamond Light\", \"Apple Garamond\", Garamond, Georgia, serif";
        readonly chicago: "Chicago, \"Chicago Classic\", \"Charcoal CY\", Charcoal, monospace";
        readonly mono: "Monaco, \"Monaco CY\", \"SF Mono\", \"Courier New\", Courier, monospace";
    };
    readonly fontSize: {
        readonly xs: "9px";
        readonly sm: "10px";
        readonly md: "12px";
        readonly lg: "13px";
        readonly xl: "14px";
        readonly '2xl': "16px";
        readonly '3xl': "18px";
        readonly '4xl': "20px";
        readonly '5xl': "24px";
    };
    readonly fontWeight: {
        readonly normal: 700;
        readonly medium: 700;
        readonly semibold: 700;
        readonly bold: 700;
        readonly light: 400;
    };
    readonly lineHeight: {
        readonly tight: 1.2;
        readonly snug: 1.3;
        readonly normal: 1.4;
        readonly relaxed: 1.5;
        readonly loose: 1.6;
    };
    readonly letterSpacing: {
        readonly tighter: "-0.02em";
        readonly tight: "-0.01em";
        readonly normal: "0";
        readonly wide: "0.01em";
        readonly wider: "0.02em";
    };
};
/**
 * Spacing tokens based on Mac OS 9 measurements
 * Mac OS 9 used tight spacing; using 2px as base unit
 */
declare const spacing: {
    readonly '0': "0";
    readonly px: "1px";
    readonly '0.5': "2px";
    readonly '1': "4px";
    readonly '1.5': "6px";
    readonly '2': "8px";
    readonly '2.5': "10px";
    readonly '3': "12px";
    readonly '4': "16px";
    readonly '5': "20px";
    readonly '6': "24px";
    readonly '8': "32px";
    readonly '10': "40px";
    readonly '12': "48px";
    readonly '16': "64px";
    readonly xs: "2px";
    readonly sm: "4px";
    readonly md: "8px";
    readonly lg: "12px";
    readonly xl: "16px";
    readonly '2xl': "24px";
    readonly '3xl': "32px";
};
/**
 * Shadow tokens for Mac OS 9 bevel effects
 * Exact values from Figma Window Shadow effect (67:95038)
 *
 * Classic 3-layer bevel:
 * 1. Hard drop shadow (2px, 2px, 0 blur) - creates depth
 * 2. Top-left highlight (light inner shadow)
 * 3. Bottom-right shadow (dark inner shadow)
 */
declare const shadows: {
    readonly bevel: "inset 2px 2px 0 rgba(255, 255, 255, 0.6), inset -2px -2px 0 rgba(38, 38, 38, 0.4), 2px 2px 0 rgba(38, 38, 38, 1)";
    readonly inset: "inset -2px -2px 0 rgba(255, 255, 255, 0.6), inset 2px 2px 0 rgba(38, 38, 38, 0.4), 2px 2px 0 rgba(38, 38, 38, 1)";
    readonly dropShadow: "2px 2px 0 rgba(38, 38, 38, 1)";
    readonly innerHighlight: "inset 2px 2px 0 rgba(255, 255, 255, 0.6)";
    readonly innerShadow: "inset -2px -2px 0 rgba(38, 38, 38, 0.4)";
    readonly raised: {
        readonly highlight: "inset 2px 2px 0 rgba(255, 255, 255, 0.6)";
        readonly shadow: "inset -2px -2px 0 rgba(38, 38, 38, 0.4)";
        readonly full: "inset 2px 2px 0 rgba(255, 255, 255, 0.6), inset -2px -2px 0 rgba(38, 38, 38, 0.4), 2px 2px 0 rgba(38, 38, 38, 1)";
    };
    readonly none: "none";
};
/**
 * Border tokens
 * Mac OS 9 used consistent 1px borders with sharp corners
 */
declare const borders: {
    readonly width: {
        readonly none: "0";
        readonly thin: "1px";
        readonly medium: "2px";
        readonly thick: "3px";
    };
    readonly style: {
        readonly solid: "solid";
        readonly dashed: "dashed";
        readonly dotted: "dotted";
        readonly none: "none";
    };
    readonly radius: {
        readonly none: "0";
        readonly sm: "0";
        readonly md: "0";
        readonly lg: "0";
        readonly full: "0";
    };
};
/**
 * Z-index scale for layering
 */
declare const zIndex: {
    readonly base: 0;
    readonly dropdown: 1000;
    readonly sticky: 1100;
    readonly modal: 1200;
    readonly popover: 1300;
    readonly tooltip: 1400;
};
/**
 * Transition/Animation tokens
 * Mac OS 9 had minimal animations, but we add subtle ones for modern feel
 */
declare const transitions: {
    readonly duration: {
        readonly instant: "0ms";
        readonly fast: "100ms";
        readonly normal: "200ms";
        readonly slow: "300ms";
    };
    readonly timing: {
        readonly linear: "linear";
        readonly easeIn: "cubic-bezier(0.4, 0, 1, 1)";
        readonly easeOut: "cubic-bezier(0, 0, 0.2, 1)";
        readonly easeInOut: "cubic-bezier(0.4, 0, 0.2, 1)";
    };
};
declare const tokens: {
    readonly colors: {
        readonly gray100: "#FFFFFF";
        readonly gray200: "#EEEEEE";
        readonly gray300: "#DDDDDD";
        readonly gray400: "#CCCCCC";
        readonly gray500: "#999999";
        readonly gray600: "#666666";
        readonly gray700: "#4D4D4D";
        readonly gray800: "#333333";
        readonly gray900: "#262626";
        readonly lavender: "#CCCCFF";
        readonly azul: "#0066CC";
        readonly linkRed: "#CC0000";
        readonly background: "#EEEEEE";
        readonly foreground: "#262626";
        readonly border: "#262626";
        readonly text: "#262626";
        readonly textInverse: "#FFFFFF";
        readonly surface: "#EEEEEE";
        readonly surfaceInset: "#FFFFFF";
        readonly black: "#262626";
        readonly white: "#FFFFFF";
        readonly focus: "#000080";
        readonly error: "#CC0000";
        readonly success: "#008000";
        readonly warning: "#FF8C00";
    };
    readonly typography: {
        readonly fontFamily: {
            readonly system: "Charcoal, \"Charcoal CY\", Chicago, \"Chicago Classic\", -apple-system, BlinkMacSystemFont, \"Segoe UI\", Helvetica, Arial, sans-serif";
            readonly body: "Geneva, \"Geneva CY\", \"Lucida Grande\", \"Lucida Sans Unicode\", sans-serif";
            readonly display: "\"Apple Garamond Light\", \"Apple Garamond\", Garamond, Georgia, serif";
            readonly chicago: "Chicago, \"Chicago Classic\", \"Charcoal CY\", Charcoal, monospace";
            readonly mono: "Monaco, \"Monaco CY\", \"SF Mono\", \"Courier New\", Courier, monospace";
        };
        readonly fontSize: {
            readonly xs: "9px";
            readonly sm: "10px";
            readonly md: "12px";
            readonly lg: "13px";
            readonly xl: "14px";
            readonly '2xl': "16px";
            readonly '3xl': "18px";
            readonly '4xl': "20px";
            readonly '5xl': "24px";
        };
        readonly fontWeight: {
            readonly normal: 700;
            readonly medium: 700;
            readonly semibold: 700;
            readonly bold: 700;
            readonly light: 400;
        };
        readonly lineHeight: {
            readonly tight: 1.2;
            readonly snug: 1.3;
            readonly normal: 1.4;
            readonly relaxed: 1.5;
            readonly loose: 1.6;
        };
        readonly letterSpacing: {
            readonly tighter: "-0.02em";
            readonly tight: "-0.01em";
            readonly normal: "0";
            readonly wide: "0.01em";
            readonly wider: "0.02em";
        };
    };
    readonly spacing: {
        readonly '0': "0";
        readonly px: "1px";
        readonly '0.5': "2px";
        readonly '1': "4px";
        readonly '1.5': "6px";
        readonly '2': "8px";
        readonly '2.5': "10px";
        readonly '3': "12px";
        readonly '4': "16px";
        readonly '5': "20px";
        readonly '6': "24px";
        readonly '8': "32px";
        readonly '10': "40px";
        readonly '12': "48px";
        readonly '16': "64px";
        readonly xs: "2px";
        readonly sm: "4px";
        readonly md: "8px";
        readonly lg: "12px";
        readonly xl: "16px";
        readonly '2xl': "24px";
        readonly '3xl': "32px";
    };
    readonly borders: {
        readonly width: {
            readonly none: "0";
            readonly thin: "1px";
            readonly medium: "2px";
            readonly thick: "3px";
        };
        readonly style: {
            readonly solid: "solid";
            readonly dashed: "dashed";
            readonly dotted: "dotted";
            readonly none: "none";
        };
        readonly radius: {
            readonly none: "0";
            readonly sm: "0";
            readonly md: "0";
            readonly lg: "0";
            readonly full: "0";
        };
    };
    readonly shadows: {
        readonly bevel: "inset 2px 2px 0 rgba(255, 255, 255, 0.6), inset -2px -2px 0 rgba(38, 38, 38, 0.4), 2px 2px 0 rgba(38, 38, 38, 1)";
        readonly inset: "inset -2px -2px 0 rgba(255, 255, 255, 0.6), inset 2px 2px 0 rgba(38, 38, 38, 0.4), 2px 2px 0 rgba(38, 38, 38, 1)";
        readonly dropShadow: "2px 2px 0 rgba(38, 38, 38, 1)";
        readonly innerHighlight: "inset 2px 2px 0 rgba(255, 255, 255, 0.6)";
        readonly innerShadow: "inset -2px -2px 0 rgba(38, 38, 38, 0.4)";
        readonly raised: {
            readonly highlight: "inset 2px 2px 0 rgba(255, 255, 255, 0.6)";
            readonly shadow: "inset -2px -2px 0 rgba(38, 38, 38, 0.4)";
            readonly full: "inset 2px 2px 0 rgba(255, 255, 255, 0.6), inset -2px -2px 0 rgba(38, 38, 38, 0.4), 2px 2px 0 rgba(38, 38, 38, 1)";
        };
        readonly none: "none";
    };
    readonly zIndex: {
        readonly base: 0;
        readonly dropdown: 1000;
        readonly sticky: 1100;
        readonly modal: 1200;
        readonly popover: 1300;
        readonly tooltip: 1400;
    };
    readonly transitions: {
        readonly duration: {
            readonly instant: "0ms";
            readonly fast: "100ms";
            readonly normal: "200ms";
            readonly slow: "300ms";
        };
        readonly timing: {
            readonly linear: "linear";
            readonly easeIn: "cubic-bezier(0.4, 0, 1, 1)";
            readonly easeOut: "cubic-bezier(0, 0, 0.2, 1)";
            readonly easeInOut: "cubic-bezier(0.4, 0, 0.2, 1)";
        };
    };
};

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
declare const mergeClasses: (...classes: (string | undefined | false | null)[]) => string;
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
declare const createClassBuilder: (baseClass: string) => (...additionalClasses: (string | undefined | false | null)[]) => string;

export { Button, Checkbox, Dialog, DividerIcon, FolderList, Icon, IconButton, IconLibrary, ListView, MenuBar, MenuDropdown, MenuItem, Radio, Scrollbar, Select, TabPanel, Tabs, TextField, Window, borders, colors, createClassBuilder, mergeClasses, shadows, spacing, tokens, transitions, typography, zIndex };
export type { BaseComponentProps, ButtonProps, ButtonRef, CellRenderState, CheckboxProps, ComponentClasses, DialogProps, DivRef, FolderListClasses, FolderListProps, HeaderCellDefaultProps, HeaderCellRenderState, IconButtonProps, IconLibraryProps, IconName, IconProps, InputRef, ListColumn, ListItem, ListViewClasses, ListViewProps, Menu, MenuBarProps, MenuDropdownProps, MenuItemProps, RadioProps, RenderState, RowDefaultProps, RowRenderState, ScrollbarProps, SelectOption, SelectProps, SelectRef, Size, State, TabPanelProps, TabsProps, TextAreaRef, TextFieldProps, Variant, WindowClasses, WindowPosition, WindowProps };
