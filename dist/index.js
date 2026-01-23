"use client";
import { jsx, jsxs, Fragment } from 'react/jsx-runtime';
import React, { forwardRef, useState, Children, isValidElement, useCallback, useRef, useEffect } from 'react';

var styles$e = {"button":"Button-module_button","button--sm":"Button-module_button--sm","button--md":"Button-module_button--md","button--lg":"Button-module_button--lg","button--default":"Button-module_button--default","button--primary":"Button-module_button--primary","button--danger":"Button-module_button--danger","button--disabled":"Button-module_button--disabled","button--full-width":"Button-module_button--full-width","button--loading":"Button-module_button--loading","button--cursor-loading":"Button-module_button--cursor-loading","button__loading-spinner":"Button-module_button__loading-spinner","button__text":"Button-module_button__text","button__icon-left":"Button-module_button__icon-left","button__icon-right":"Button-module_button__icon-right","button__icon-only":"Button-module_button__icon-only","button--icon-only":"Button-module_button--icon-only"};

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
const Button = forwardRef((props, ref) => {
    const { variant = 'default', size = 'md', disabled = false, fullWidth = false, loading = false, loadingText, useCursorLoading = false, leftIcon, rightIcon, iconOnly = false, ariaLabel, ariaDescribedBy, ariaPressed, className = '', children, ...restProps } = props;
    // Determine if rendering as link
    const isLink = props.as === 'a';
    // Build class names
    const classNames = [
        styles$e.button,
        styles$e[`button--${variant}`],
        styles$e[`button--${size}`],
        fullWidth && styles$e['button--full-width'],
        disabled && styles$e['button--disabled'],
        loading && styles$e['button--loading'],
        loading && useCursorLoading && styles$e['button--cursor-loading'],
        iconOnly && styles$e['button--icon-only'],
        (leftIcon || rightIcon) && styles$e['button--with-icon'],
        className,
    ]
        .filter(Boolean)
        .join(' ');
    // Prepare ARIA attributes
    const ariaAttributes = {
        'aria-label': iconOnly ? (ariaLabel || (typeof children === 'string' ? children : undefined)) : ariaLabel,
        'aria-describedby': ariaDescribedBy,
        'aria-pressed': ariaPressed,
        'aria-disabled': disabled || loading,
        'aria-busy': loading,
    };
    // Handle link-specific props
    if (isLink) {
        const { href, target, rel, download, ...linkProps } = restProps;
        // Auto-add security rel for external links
        let finalRel = rel;
        if (target === '_blank' && !rel) {
            finalRel = 'noopener noreferrer';
        }
        // Links can't be truly disabled, so prevent default
        const handleClick = (e) => {
            if (disabled || loading) {
                e.preventDefault();
                return;
            }
            linkProps.onClick?.(e);
        };
        return (jsx("a", { ref: ref, href: disabled || loading ? undefined : href, target: target, rel: finalRel, download: download, className: classNames, ...ariaAttributes, ...linkProps, onClick: handleClick, children: renderButtonContent() }));
    }
    // Handle button-specific props
    const { type = 'button', form, formAction, formMethod, formNoValidate, formTarget, ...buttonProps } = restProps;
    return (jsx("button", { ref: ref, type: type, disabled: disabled || loading, form: form, formAction: formAction, formMethod: formMethod, formNoValidate: formNoValidate, formTarget: formTarget, className: classNames, ...ariaAttributes, ...buttonProps, children: renderButtonContent() }));
    // Render button content with icons and loading state
    function renderButtonContent() {
        // Show loading state
        if (loading) {
            return (jsxs(Fragment, { children: [!useCursorLoading && (jsx("span", { className: styles$e['button__loading-spinner'], "aria-hidden": "true", children: "\u23F3" })), jsx("span", { className: styles$e['button__text'], children: loadingText || children })] }));
        }
        // Icon-only button
        if (iconOnly) {
            return jsx("span", { className: styles$e['button__icon-only'], children: children });
        }
        // Button with icons
        return (jsxs(Fragment, { children: [leftIcon && (jsx("span", { className: styles$e['button__icon-left'], "aria-hidden": "true", children: leftIcon })), jsx("span", { className: styles$e['button__text'], children: children }), rightIcon && (jsx("span", { className: styles$e['button__icon-right'], "aria-hidden": "true", children: rightIcon }))] }));
    }
});
Button.displayName = 'Button';

var styles$d = {"icon":"Icon-module_icon","icon--xs":"Icon-module_icon--xs","icon--sm":"Icon-module_icon--sm","icon--md":"Icon-module_icon--md","icon--lg":"Icon-module_icon--lg","icon--xl":"Icon-module_icon--xl"};

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
const Icon = forwardRef(({ size = 'md', children, label, className = '', ...props }, ref) => {
    const classNames = [styles$d.icon, styles$d[`icon--${size}`], className]
        .filter(Boolean)
        .join(' ');
    return (jsx("svg", { ref: ref, className: classNames, viewBox: "0 0 24 24", fill: "currentColor", xmlns: "http://www.w3.org/2000/svg", "aria-label": label, "aria-hidden": !label, role: label ? 'img' : 'presentation', ...props, children: children }));
});
Icon.displayName = 'Icon';

var styles$c = {"pixelated-corner-sm":"IconButton-module_pixelated-corner-sm","pixelated-corner-md":"IconButton-module_pixelated-corner-md","pixelated-corner-pseudo":"IconButton-module_pixelated-corner-pseudo","mac-corner":"IconButton-module_mac-corner","chamfered-sm":"IconButton-module_chamfered-sm","chamfered-md":"IconButton-module_chamfered-md","tab-corner":"IconButton-module_tab-corner","button-corner":"IconButton-module_button-corner","window-corner":"IconButton-module_window-corner","iconButton":"IconButton-module_iconButton","icon":"IconButton-module_icon","label":"IconButton-module_label","iconButton--label-top":"IconButton-module_iconButton--label-top","iconButton--label-bottom":"IconButton-module_iconButton--label-bottom","iconButton--label-left":"IconButton-module_iconButton--label-left","iconButton--label-right":"IconButton-module_iconButton--label-right","iconButton--sm":"IconButton-module_iconButton--sm","iconButton--with-label":"IconButton-module_iconButton--with-label","iconButton--md":"IconButton-module_iconButton--md","iconButton--lg":"IconButton-module_iconButton--lg","iconButton--default":"IconButton-module_iconButton--default","iconButton--primary":"IconButton-module_iconButton--primary","iconButton--danger":"IconButton-module_iconButton--danger","iconButton--disabled":"IconButton-module_iconButton--disabled"};

// IconButton component - Mac OS 9 style button with icon
// Button variant that includes an icon, with optional label
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
const IconButton = forwardRef(({ icon, label, labelPosition = 'right', variant = 'default', size = 'md', disabled = false, className = '', ...props }, ref) => {
    // Build class names
    const classNames = [
        styles$c.iconButton,
        styles$c[`iconButton--${variant}`],
        styles$c[`iconButton--${size}`],
        label && styles$c['iconButton--with-label'],
        label && styles$c[`iconButton--label-${labelPosition}`],
        disabled && styles$c['iconButton--disabled'],
        className,
    ]
        .filter(Boolean)
        .join(' ');
    return (jsxs("button", { ref: ref, type: "button", className: classNames, disabled: disabled, ...props, children: [label && (labelPosition === 'left' || labelPosition === 'top') && (jsx("span", { className: styles$c.label, children: label })), jsx("span", { className: styles$c.icon, children: icon }), label && (labelPosition === 'right' || labelPosition === 'bottom') && (jsx("span", { className: styles$c.label, children: label }))] }));
});
IconButton.displayName = 'IconButton';

var styles$b = {"wrapper":"Checkbox-module_wrapper","wrapper--disabled":"Checkbox-module_wrapper--disabled","wrapper--error":"Checkbox-module_wrapper--error","wrapper--label-left":"Checkbox-module_wrapper--label-left","wrapper--label-right":"Checkbox-module_wrapper--label-right","checkbox":"Checkbox-module_checkbox","checkbox--sm":"Checkbox-module_checkbox--sm","checkbox--md":"Checkbox-module_checkbox--md","checkbox--lg":"Checkbox-module_checkbox--lg","checkbox--indeterminate":"Checkbox-module_checkbox--indeterminate","checkbox--error":"Checkbox-module_checkbox--error","label":"Checkbox-module_label","label--sm":"Checkbox-module_label--sm","label--md":"Checkbox-module_label--md","label--lg":"Checkbox-module_label--lg","wrapper--sm":"Checkbox-module_wrapper--sm","wrapper--md":"Checkbox-module_wrapper--md","wrapper--lg":"Checkbox-module_wrapper--lg"};

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
const Checkbox = forwardRef(({ checked, defaultChecked, indeterminate = false, disabled = false, label, labelPosition = 'right', size = 'md', error = false, ariaLabel, ariaDescribedBy, className = '', onChange, id, ...props }, ref) => {
    const inputRef = React.useRef(null);
    const combinedRef = ref || inputRef;
    // Set indeterminate property via ref (can't be set via HTML attribute)
    React.useEffect(() => {
        if (combinedRef?.current) {
            combinedRef.current.indeterminate = indeterminate;
        }
    }, [indeterminate, combinedRef]);
    // Generate ID if not provided (for label association)
    const checkboxId = id || React.useId();
    // Build class names
    const wrapperClassNames = [
        styles$b.wrapper,
        styles$b[`wrapper--${size}`],
        styles$b[`wrapper--label-${labelPosition}`],
        disabled && styles$b['wrapper--disabled'],
        error && styles$b['wrapper--error'],
        className,
    ]
        .filter(Boolean)
        .join(' ');
    const checkboxClassNames = [
        styles$b.checkbox,
        styles$b[`checkbox--${size}`],
        indeterminate && styles$b['checkbox--indeterminate'],
        error && styles$b['checkbox--error'],
    ]
        .filter(Boolean)
        .join(' ');
    const labelClassNames = [styles$b.label, styles$b[`label--${size}`]].filter(Boolean).join(' ');
    // ARIA attributes
    const ariaAttributes = {
        'aria-label': !label ? ariaLabel : undefined,
        'aria-describedby': ariaDescribedBy,
        'aria-invalid': error,
        'aria-checked': indeterminate ? 'mixed' : undefined,
    };
    return (jsxs("div", { className: wrapperClassNames, children: [label && labelPosition === 'left' && (jsx("label", { htmlFor: checkboxId, className: labelClassNames, children: label })), jsx("input", { ref: combinedRef, type: "checkbox", id: checkboxId, className: checkboxClassNames, checked: checked, defaultChecked: defaultChecked, disabled: disabled, onChange: onChange, ...ariaAttributes, ...props }), label && labelPosition === 'right' && (jsx("label", { htmlFor: checkboxId, className: labelClassNames, children: label }))] }));
});
Checkbox.displayName = 'Checkbox';

var styles$a = {"wrapper":"Radio-module_wrapper","wrapper--disabled":"Radio-module_wrapper--disabled","wrapper--error":"Radio-module_wrapper--error","wrapper--label-left":"Radio-module_wrapper--label-left","wrapper--label-right":"Radio-module_wrapper--label-right","radio":"Radio-module_radio","radio--sm":"Radio-module_radio--sm","radio--md":"Radio-module_radio--md","radio--lg":"Radio-module_radio--lg","radio--error":"Radio-module_radio--error","label":"Radio-module_label","label--sm":"Radio-module_label--sm","label--md":"Radio-module_label--md","label--lg":"Radio-module_label--lg","wrapper--sm":"Radio-module_wrapper--sm","wrapper--md":"Radio-module_wrapper--md","wrapper--lg":"Radio-module_wrapper--lg"};

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
const Radio = forwardRef(({ checked, defaultChecked, disabled = false, label, labelPosition = 'right', size = 'md', error = false, ariaLabel, ariaDescribedBy, className = '', value, name, onChange, id, ...props }, ref) => {
    // Generate ID if not provided (for label association)
    const radioId = id || React.useId();
    // Build class names
    const wrapperClassNames = [
        styles$a.wrapper,
        styles$a[`wrapper--${size}`],
        styles$a[`wrapper--label-${labelPosition}`],
        disabled && styles$a['wrapper--disabled'],
        error && styles$a['wrapper--error'],
        className,
    ]
        .filter(Boolean)
        .join(' ');
    const radioClassNames = [
        styles$a.radio,
        styles$a[`radio--${size}`],
        error && styles$a['radio--error'],
    ]
        .filter(Boolean)
        .join(' ');
    const labelClassNames = [styles$a.label, styles$a[`label--${size}`]].filter(Boolean).join(' ');
    // ARIA attributes
    const ariaAttributes = {
        'aria-label': !label ? ariaLabel : undefined,
        'aria-describedby': ariaDescribedBy,
        'aria-invalid': error,
    };
    return (jsxs("div", { className: wrapperClassNames, children: [label && labelPosition === 'left' && (jsx("label", { htmlFor: radioId, className: labelClassNames, children: label })), jsx("input", { ref: ref, type: "radio", id: radioId, className: radioClassNames, checked: checked, defaultChecked: defaultChecked, disabled: disabled, value: value, name: name, onChange: onChange, ...ariaAttributes, ...props }), label && labelPosition === 'right' && (jsx("label", { htmlFor: radioId, className: labelClassNames, children: label }))] }));
});
Radio.displayName = 'Radio';

var styles$9 = {"wrapper":"TextField-module_wrapper","wrapper--full-width":"TextField-module_wrapper--full-width","wrapper--disabled":"TextField-module_wrapper--disabled","wrapper--label-top":"TextField-module_wrapper--label-top","wrapper--label-left":"TextField-module_wrapper--label-left","wrapper--label-right":"TextField-module_wrapper--label-right","label":"TextField-module_label","label--sm":"TextField-module_label--sm","label--md":"TextField-module_label--md","label--lg":"TextField-module_label--lg","input-wrapper":"TextField-module_input-wrapper","input":"TextField-module_input","input--sm":"TextField-module_input--sm","input--md":"TextField-module_input--md","input--lg":"TextField-module_input--lg","input--full-width":"TextField-module_input--full-width","input-icon-left":"TextField-module_input-icon-left","input-icon-right":"TextField-module_input-icon-right","input-wrapper--with-left-icon":"TextField-module_input-wrapper--with-left-icon","input-wrapper--with-right-icon":"TextField-module_input-wrapper--with-right-icon","input--error":"TextField-module_input--error","helper-text":"TextField-module_helper-text","error-message":"TextField-module_error-message","wrapper--sm":"TextField-module_wrapper--sm","wrapper--md":"TextField-module_wrapper--md","wrapper--lg":"TextField-module_wrapper--lg"};

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
const TextField = forwardRef(({ label, labelPosition = 'top', size = 'md', fullWidth = false, error = false, errorMessage, helperText, leftIcon, rightIcon, ariaLabel, ariaDescribedBy, className = '', wrapperClassName = '', type = 'text', id, disabled, ...props }, ref) => {
    // Generate ID if not provided (for label association)
    const inputId = id || React.useId();
    // Generate helper/error text ID for aria-describedby
    const helperId = `${inputId}-helper`;
    const errorId = `${inputId}-error`;
    // Combine aria-describedby
    const describedByIds = [
        helperText && helperId,
        error && errorMessage && errorId,
        ariaDescribedBy,
    ]
        .filter(Boolean)
        .join(' ');
    // Build class names
    const wrapperClassNames = [
        styles$9.wrapper,
        styles$9[`wrapper--${size}`],
        styles$9[`wrapper--label-${labelPosition}`],
        fullWidth && styles$9['wrapper--full-width'],
        disabled && styles$9['wrapper--disabled'],
        wrapperClassName,
    ]
        .filter(Boolean)
        .join(' ');
    const inputWrapperClassNames = [
        styles$9['input-wrapper'],
        (leftIcon || rightIcon) && styles$9['input-wrapper--with-icon'],
        leftIcon && styles$9['input-wrapper--with-left-icon'],
        rightIcon && styles$9['input-wrapper--with-right-icon'],
    ]
        .filter(Boolean)
        .join(' ');
    const inputClassNames = [
        styles$9.input,
        styles$9[`input--${size}`],
        error && styles$9['input--error'],
        fullWidth && styles$9['input--full-width'],
        className,
    ]
        .filter(Boolean)
        .join(' ');
    const labelClassNames = [styles$9.label, styles$9[`label--${size}`]].filter(Boolean).join(' ');
    // ARIA attributes
    const ariaAttributes = {
        'aria-label': !label ? ariaLabel : undefined,
        'aria-describedby': describedByIds || undefined,
        'aria-invalid': error,
    };
    return (jsxs("div", { className: wrapperClassNames, children: [label && (labelPosition === 'top' || labelPosition === 'left') && (jsx("label", { htmlFor: inputId, className: labelClassNames, children: label })), jsxs("div", { className: inputWrapperClassNames, children: [leftIcon && (jsx("span", { className: styles$9['input-icon-left'], "aria-hidden": "true", children: leftIcon })), jsx("input", { ref: ref, type: type, id: inputId, className: inputClassNames, disabled: disabled, ...ariaAttributes, ...props }), rightIcon && (jsx("span", { className: styles$9['input-icon-right'], "aria-hidden": "true", children: rightIcon }))] }), label && labelPosition === 'right' && (jsx("label", { htmlFor: inputId, className: labelClassNames, children: label })), helperText && !error && (jsx("p", { id: helperId, className: styles$9['helper-text'], children: helperText })), error && errorMessage && (jsx("p", { id: errorId, className: styles$9['error-message'], children: errorMessage }))] }));
});
TextField.displayName = 'TextField';

var styles$8 = {"wrapper":"Select-module_wrapper","wrapper--full-width":"Select-module_wrapper--full-width","wrapper--disabled":"Select-module_wrapper--disabled","wrapper--label-top":"Select-module_wrapper--label-top","wrapper--label-left":"Select-module_wrapper--label-left","wrapper--label-right":"Select-module_wrapper--label-right","label":"Select-module_label","label--sm":"Select-module_label--sm","label--md":"Select-module_label--md","label--lg":"Select-module_label--lg","select":"Select-module_select","select--sm":"Select-module_select--sm","select--md":"Select-module_select--md","select--lg":"Select-module_select--lg","select--full-width":"Select-module_select--full-width","select--error":"Select-module_select--error","helper-text":"Select-module_helper-text","error-message":"Select-module_error-message","wrapper--sm":"Select-module_wrapper--sm","wrapper--md":"Select-module_wrapper--md","wrapper--lg":"Select-module_wrapper--lg"};

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
const Select = forwardRef(({ label, labelPosition = 'top', size = 'md', fullWidth = false, error = false, errorMessage, helperText, options, placeholder, ariaLabel, ariaDescribedBy, className = '', wrapperClassName = '', id, disabled, children, ...props }, ref) => {
    // Generate ID if not provided (for label association)
    const selectId = id || React.useId();
    // Generate helper/error text ID for aria-describedby
    const helperId = `${selectId}-helper`;
    const errorId = `${selectId}-error`;
    // Combine aria-describedby
    const describedByIds = [
        helperText && helperId,
        error && errorMessage && errorId,
        ariaDescribedBy,
    ]
        .filter(Boolean)
        .join(' ');
    // Build class names
    const wrapperClassNames = [
        styles$8.wrapper,
        styles$8[`wrapper--${size}`],
        styles$8[`wrapper--label-${labelPosition}`],
        fullWidth && styles$8['wrapper--full-width'],
        disabled && styles$8['wrapper--disabled'],
        wrapperClassName,
    ]
        .filter(Boolean)
        .join(' ');
    const selectClassNames = [
        styles$8.select,
        styles$8[`select--${size}`],
        error && styles$8['select--error'],
        fullWidth && styles$8['select--full-width'],
        className,
    ]
        .filter(Boolean)
        .join(' ');
    const labelClassNames = [styles$8.label, styles$8[`label--${size}`]].filter(Boolean).join(' ');
    // ARIA attributes
    const ariaAttributes = {
        'aria-label': !label ? ariaLabel : undefined,
        'aria-describedby': describedByIds || undefined,
        'aria-invalid': error,
    };
    // Render options from options prop
    const renderOptions = () => {
        if (options) {
            return (jsxs(Fragment, { children: [placeholder && (jsx("option", { value: "", disabled: true, children: placeholder })), options.map((option) => (jsx("option", { value: option.value, disabled: option.disabled, children: option.label }, option.value)))] }));
        }
        return children;
    };
    return (jsxs("div", { className: wrapperClassNames, children: [label && (labelPosition === 'top' || labelPosition === 'left') && (jsx("label", { htmlFor: selectId, className: labelClassNames, children: label })), jsx("select", { ref: ref, id: selectId, className: selectClassNames, disabled: disabled, ...ariaAttributes, ...props, children: renderOptions() }), label && labelPosition === 'right' && (jsx("label", { htmlFor: selectId, className: labelClassNames, children: label })), helperText && !error && (jsx("p", { id: helperId, className: styles$8['helper-text'], children: helperText })), error && errorMessage && (jsx("p", { id: errorId, className: styles$8['error-message'], children: errorMessage }))] }));
});
Select.displayName = 'Select';

var styles$7 = {"pixelated-corner-sm":"Tabs-module_pixelated-corner-sm","pixelated-corner-md":"Tabs-module_pixelated-corner-md","pixelated-corner-pseudo":"Tabs-module_pixelated-corner-pseudo","mac-corner":"Tabs-module_mac-corner","chamfered-sm":"Tabs-module_chamfered-sm","chamfered-md":"Tabs-module_chamfered-md","tab-corner":"Tabs-module_tab-corner","button-corner":"Tabs-module_button-corner","window-corner":"Tabs-module_window-corner","container":"Tabs-module_container","tabList":"Tabs-module_tabList","tabList--full-width":"Tabs-module_tabList--full-width","tab":"Tabs-module_tab","tab--active":"Tabs-module_tab--active","tab--disabled":"Tabs-module_tab--disabled","tab--sm":"Tabs-module_tab--sm","tab--md":"Tabs-module_tab--md","tab--lg":"Tabs-module_tab--lg","tab--full-width":"Tabs-module_tab--full-width","tabIcon":"Tabs-module_tabIcon","panelContainer":"Tabs-module_panelContainer","panelContainer--sm":"Tabs-module_panelContainer--sm","panelContainer--md":"Tabs-module_panelContainer--md","panelContainer--lg":"Tabs-module_panelContainer--lg"};

/**
 * TabPanel component - Individual tab content
 * Must be used as a child of Tabs component
 */
const TabPanel = ({ children }) => {
    return jsx(Fragment, { children: children });
};
TabPanel.displayName = 'TabPanel';
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
const Tabs = ({ children, defaultActiveTab = 0, activeTab: controlledActiveTab, onChange, size = 'md', fullWidth = false, className = '', tabListClassName = '', panelClassName = '', ariaLabel = 'Tabs', }) => {
    // Controlled vs uncontrolled state
    const [uncontrolledActiveTab, setUncontrolledActiveTab] = useState(defaultActiveTab);
    const isControlled = controlledActiveTab !== undefined;
    const activeTabIndex = isControlled ? controlledActiveTab : uncontrolledActiveTab;
    // Extract tab information from children
    const tabs = Children.toArray(children).filter((child) => isValidElement(child));
    // Handle tab change
    const handleTabChange = useCallback((index) => {
        const tab = tabs[index];
        if (!tab || tab.props.disabled)
            return;
        if (!isControlled) {
            setUncontrolledActiveTab(index);
        }
        onChange?.(index, tab.props.value);
    }, [tabs, isControlled, onChange]);
    // Keyboard navigation
    const handleKeyDown = useCallback((event, currentIndex) => {
        let newIndex = currentIndex;
        switch (event.key) {
            case 'ArrowLeft':
            case 'ArrowUp':
                event.preventDefault();
                newIndex = currentIndex - 1;
                if (newIndex < 0)
                    newIndex = tabs.length - 1;
                // Skip disabled tabs
                while (tabs[newIndex]?.props.disabled && newIndex !== currentIndex) {
                    newIndex--;
                    if (newIndex < 0)
                        newIndex = tabs.length - 1;
                }
                break;
            case 'ArrowRight':
            case 'ArrowDown':
                event.preventDefault();
                newIndex = currentIndex + 1;
                if (newIndex >= tabs.length)
                    newIndex = 0;
                // Skip disabled tabs
                while (tabs[newIndex]?.props.disabled && newIndex !== currentIndex) {
                    newIndex++;
                    if (newIndex >= tabs.length)
                        newIndex = 0;
                }
                break;
            case 'Home':
                event.preventDefault();
                newIndex = 0;
                // Skip disabled tabs
                while (tabs[newIndex]?.props.disabled && newIndex < tabs.length - 1) {
                    newIndex++;
                }
                break;
            case 'End':
                event.preventDefault();
                newIndex = tabs.length - 1;
                // Skip disabled tabs
                while (tabs[newIndex]?.props.disabled && newIndex > 0) {
                    newIndex--;
                }
                break;
            default:
                return;
        }
        handleTabChange(newIndex);
    }, [tabs, handleTabChange]);
    // Class names
    const containerClassNames = [styles$7.container, className].filter(Boolean).join(' ');
    const tabListClassNames = [
        styles$7.tabList,
        styles$7[`tabList--${size}`],
        fullWidth && styles$7['tabList--full-width'],
        tabListClassName,
    ]
        .filter(Boolean)
        .join(' ');
    const panelContainerClassNames = [
        styles$7.panelContainer,
        styles$7[`panelContainer--${size}`],
        panelClassName,
    ]
        .filter(Boolean)
        .join(' ');
    return (jsxs("div", { className: containerClassNames, children: [jsx("div", { role: "tablist", "aria-label": ariaLabel, className: tabListClassNames, children: tabs.map((tab, index) => {
                    const isActive = index === activeTabIndex;
                    const isDisabled = tab.props.disabled;
                    const tabClassNames = [
                        styles$7.tab,
                        styles$7[`tab--${size}`],
                        isActive && styles$7['tab--active'],
                        isDisabled && styles$7['tab--disabled'],
                        fullWidth && styles$7['tab--full-width'],
                    ]
                        .filter(Boolean)
                        .join(' ');
                    return (jsxs("button", { role: "tab", type: "button", "aria-selected": isActive, "aria-controls": `panel-${index}`, id: `tab-${index}`, tabIndex: isActive ? 0 : -1, disabled: isDisabled, className: tabClassNames, onClick: () => handleTabChange(index), onKeyDown: (e) => handleKeyDown(e, index), children: [tab.props.icon && jsx("span", { className: styles$7.tabIcon, children: tab.props.icon }), tab.props.label] }, index));
                }) }), tabs.map((tab, index) => {
                const isActive = index === activeTabIndex;
                return (jsx("div", { role: "tabpanel", id: `panel-${index}`, "aria-labelledby": `tab-${index}`, hidden: !isActive, className: panelContainerClassNames, children: isActive && tab.props.children }, index));
            })] }));
};
Tabs.displayName = 'Tabs';

var styles$6 = {"window":"Window-module_window","window--active":"Window-module_window--active","window--inactive":"Window-module_window--inactive","titleBar":"Window-module_titleBar","titleCenter":"Window-module_titleCenter","controls":"Window-module_controls","controlButton":"Window-module_controlButton","closeBox":"Window-module_closeBox","minimizeBox":"Window-module_minimizeBox","maximizeBox":"Window-module_maximizeBox","titleText":"Window-module_titleText","content":"Window-module_content","resizeHandle":"Window-module_resizeHandle"};

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
 * ```
 */
const Window = forwardRef(({ children, title, titleBar, active = true, width = 'auto', height = 'auto', className = '', contentClassName = '', showControls = true, onClose, onMinimize, onMaximize, resizable = false, }, ref) => {
    // Class names
    const windowClassNames = [
        styles$6.window,
        active ? styles$6['window--active'] : styles$6['window--inactive'],
        className,
    ]
        .filter(Boolean)
        .join(' ');
    const contentClassNames = [styles$6.content, contentClassName].filter(Boolean).join(' ');
    // Window style
    const windowStyle = {};
    if (width !== 'auto') {
        windowStyle.width = typeof width === 'number' ? `${width}px` : width;
    }
    if (height !== 'auto') {
        windowStyle.height = typeof height === 'number' ? `${height}px` : height;
    }
    // Render title bar if title provided and no custom titleBar
    const renderTitleBar = () => {
        if (titleBar) {
            return titleBar;
        }
        if (title) {
            return (jsxs("div", { className: styles$6.titleBar, "data-numControls": [onClose, onMinimize, onMaximize].filter(Boolean).length, children: [showControls && (jsxs("div", { className: styles$6.controls, children: [onClose && (jsx("button", { type: "button", className: styles$6.controlButton, onClick: onClose, "aria-label": "Close", title: "Close", children: jsx("div", { className: styles$6.closeBox }) })), onMinimize && (jsx("button", { type: "button", className: styles$6.controlButton, onClick: onMinimize, "aria-label": "Minimize", title: "Minimize", children: jsx("div", { className: styles$6.minimizeBox }) })), onMaximize && (jsx("button", { type: "button", className: styles$6.controlButton, onClick: onMaximize, "aria-label": "Maximize", title: "Maximize", children: jsx("div", { className: styles$6.maximizeBox }) }))] })), jsxs("div", { className: styles$6.titleCenter, children: [jsxs("svg", { width: "132", height: "13", viewBox: "0 0 132 13", fill: "none", preserveAspectRatio: "none", xmlns: "http://www.w3.org/2000/svg", children: [jsx("rect", { width: "130.517", height: "13", fill: "#DDDDDD" }), jsx("rect", { width: "1", height: "13", fill: "#EEEEEE" }), jsx("rect", { x: "130", width: "1", height: "13", fill: "#C5C5C5" }), jsx("rect", { y: "1", width: "131.268", height: "1", fill: "#999999" }), jsx("rect", { y: "5", width: "131.268", height: "1", fill: "#999999" }), jsx("rect", { y: "9", width: "131.268", height: "1", fill: "#999999" }), jsx("rect", { y: "3", width: "131.268", height: "1", fill: "#999999" }), jsx("rect", { y: "7", width: "131.268", height: "1", fill: "#999999" }), jsx("rect", { y: "11", width: "131.268", height: "1", fill: "#999999" })] }), jsx("div", { className: styles$6.titleText, children: title }), jsxs("svg", { width: "132", height: "13", viewBox: "0 0 132 13", fill: "none", preserveAspectRatio: "none", xmlns: "http://www.w3.org/2000/svg", children: [jsx("rect", { width: "130.517", height: "13", fill: "#DDDDDD" }), jsx("rect", { width: "1", height: "13", fill: "#EEEEEE" }), jsx("rect", { x: "130", width: "1", height: "13", fill: "#C5C5C5" }), jsx("rect", { y: "1", width: "131.268", height: "1", fill: "#999999" }), jsx("rect", { y: "5", width: "131.268", height: "1", fill: "#999999" }), jsx("rect", { y: "9", width: "131.268", height: "1", fill: "#999999" }), jsx("rect", { y: "3", width: "131.268", height: "1", fill: "#999999" }), jsx("rect", { y: "7", width: "131.268", height: "1", fill: "#999999" }), jsx("rect", { y: "11", width: "131.268", height: "1", fill: "#999999" })] })] })] }));
        }
        return null;
    };
    return (jsxs("div", { ref: ref, className: windowClassNames, style: windowStyle, children: [renderTitleBar(), jsx("div", { className: contentClassNames, children: children }), resizable && jsx("div", { className: styles$6.resizeHandle, "aria-hidden": "true" })] }));
});
Window.displayName = 'Window';

var styles$5 = {"backdrop":"Dialog-module_backdrop","dialogContainer":"Dialog-module_dialogContainer"};

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
const Dialog = forwardRef(({ open = false, onClose, closeOnBackdropClick = true, closeOnEscape = true, backdropClassName = '', trapFocus = true, initialFocus, children, ...windowProps }, ref) => {
    const dialogRef = useRef(null);
    const previousActiveElement = useRef(null);
    // Handle Escape key
    useEffect(() => {
        if (!open || !closeOnEscape)
            return;
        const handleEscape = (event) => {
            if (event.key === 'Escape') {
                event.preventDefault();
                event.stopPropagation();
                onClose?.();
            }
        };
        document.addEventListener('keydown', handleEscape);
        return () => document.removeEventListener('keydown', handleEscape);
    }, [open, closeOnEscape, onClose]);
    // Store previous active element and restore on close
    useEffect(() => {
        if (open) {
            previousActiveElement.current = document.activeElement;
        }
        else if (previousActiveElement.current) {
            previousActiveElement.current.focus();
        }
    }, [open]);
    // Set initial focus
    useEffect(() => {
        if (!open || !initialFocus)
            return;
        const focusElement = () => {
            if (typeof initialFocus === 'string') {
                const element = dialogRef.current?.querySelector(initialFocus);
                element?.focus();
            }
            else if (initialFocus.current) {
                initialFocus.current.focus();
            }
        };
        // Small delay to ensure dialog is rendered
        setTimeout(focusElement, 10);
    }, [open, initialFocus]);
    // Focus trapping
    useEffect(() => {
        if (!open || !trapFocus)
            return;
        const handleTabKey = (event) => {
            if (event.key !== 'Tab' || !dialogRef.current)
                return;
            const focusableElements = dialogRef.current.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
            const firstElement = focusableElements[0];
            const lastElement = focusableElements[focusableElements.length - 1];
            if (event.shiftKey) {
                // Shift + Tab
                if (document.activeElement === firstElement) {
                    event.preventDefault();
                    lastElement?.focus();
                }
            }
            else {
                // Tab
                if (document.activeElement === lastElement) {
                    event.preventDefault();
                    firstElement?.focus();
                }
            }
        };
        document.addEventListener('keydown', handleTabKey);
        return () => document.removeEventListener('keydown', handleTabKey);
    }, [open, trapFocus]);
    // Prevent body scroll when dialog is open
    useEffect(() => {
        if (open) {
            document.body.style.overflow = 'hidden';
        }
        else {
            document.body.style.overflow = '';
        }
        return () => {
            document.body.style.overflow = '';
        };
    }, [open]);
    // Handle backdrop click
    const handleBackdropClick = useCallback((event) => {
        if (closeOnBackdropClick && event.target === event.currentTarget) {
            onClose?.();
        }
    }, [closeOnBackdropClick, onClose]);
    if (!open)
        return null;
    const backdropClassNames = [styles$5.backdrop, backdropClassName].filter(Boolean).join(' ');
    return (jsx("div", { className: backdropClassNames, onClick: handleBackdropClick, role: "presentation", "aria-modal": "true", children: jsx("div", { className: styles$5.dialogContainer, ref: dialogRef, role: "dialog", "aria-modal": "true", children: jsx(Window, { ...windowProps, ref: ref, active: true, onClose: onClose, children: children }) }) }));
});
Dialog.displayName = 'Dialog';

var styles$4 = {"menuBar":"MenuBar-module_menuBar","menuContainer":"MenuBar-module_menuContainer","menuButton":"MenuBar-module_menuButton","menuButton--disabled":"MenuBar-module_menuButton--disabled","menuButton--open":"MenuBar-module_menuButton--open","dropdown":"MenuBar-module_dropdown"};

/**
 * Mac OS 9 style MenuBar component
 *
 * Horizontal menu bar with dropdown menus.
 *
 * Features:
 * - Classic Mac OS 9 menu bar styling
 * - Horizontal menu layout
 * - Dropdown menus on click
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
 *   openMenuIndex={openMenu}
 *   onMenuOpen={setOpenMenu}
 *   onMenuClose={() => setOpenMenu(undefined)}
 *   menus={[
 *     {
 *       label: 'File',
 *       items: (
 *         <>
 *           <MenuItem label="Open..." shortcut="⌘O" onClick={() => {}} />
 *           <MenuItem label="Save" shortcut="⌘S" onClick={() => {}} />
 *         </>
 *       ),
 *     },
 *     {
 *       label: 'Edit',
 *       items: (
 *         <>
 *           <MenuItem label="Undo" shortcut="⌘Z" onClick={() => {}} />
 *           <MenuItem label="Redo" shortcut="⇧⌘Z" onClick={() => {}} />
 *         </>
 *       ),
 *     },
 *   ]}
 * />
 * ```
 */
const MenuBar = forwardRef(({ menus, openMenuIndex, onMenuOpen, onMenuClose, className = '', dropdownClassName = '' }, ref) => {
    const [menuBarElement, setMenuBarElement] = useState(null);
    const [focusedIndex, setFocusedIndex] = useState(-1);
    // Handle click outside to close menu
    useEffect(() => {
        if (openMenuIndex === undefined || !menuBarElement)
            return;
        const handleClickOutside = (event) => {
            if (menuBarElement && !menuBarElement.contains(event.target)) {
                onMenuClose?.();
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [openMenuIndex, onMenuClose, menuBarElement]);
    // Handle Escape key to close menu
    useEffect(() => {
        if (openMenuIndex === undefined)
            return;
        const handleEscape = (event) => {
            if (event.key === 'Escape') {
                event.preventDefault();
                onMenuClose?.();
            }
        };
        document.addEventListener('keydown', handleEscape);
        return () => document.removeEventListener('keydown', handleEscape);
    }, [openMenuIndex, onMenuClose]);
    // Handle keyboard navigation
    const handleKeyDown = useCallback((event) => {
        switch (event.key) {
            case 'ArrowLeft':
                event.preventDefault();
                if (openMenuIndex !== undefined) {
                    // Move to previous menu
                    const prevIndex = openMenuIndex > 0 ? openMenuIndex - 1 : menus.length - 1;
                    if (!menus[prevIndex]?.disabled) {
                        onMenuOpen?.(prevIndex);
                    }
                }
                else if (focusedIndex > 0) {
                    setFocusedIndex(focusedIndex - 1);
                }
                break;
            case 'ArrowRight':
                event.preventDefault();
                if (openMenuIndex !== undefined) {
                    // Move to next menu
                    const nextIndex = openMenuIndex < menus.length - 1 ? openMenuIndex + 1 : 0;
                    if (!menus[nextIndex]?.disabled) {
                        onMenuOpen?.(nextIndex);
                    }
                }
                else if (focusedIndex < menus.length - 1) {
                    setFocusedIndex(focusedIndex + 1);
                }
                break;
            case 'ArrowDown':
                event.preventDefault();
                if (openMenuIndex === undefined && focusedIndex >= 0) {
                    // Open the focused menu
                    if (!menus[focusedIndex]?.disabled) {
                        onMenuOpen?.(focusedIndex);
                    }
                }
                break;
            case 'Enter':
            case ' ':
                event.preventDefault();
                if (openMenuIndex === undefined && focusedIndex >= 0) {
                    // Open the focused menu
                    if (!menus[focusedIndex]?.disabled) {
                        onMenuOpen?.(focusedIndex);
                    }
                }
                break;
        }
    }, [openMenuIndex, focusedIndex, menus, onMenuOpen, onMenuClose]);
    // Handle menu button click
    const handleMenuClick = (index) => {
        if (menus[index]?.disabled)
            return;
        if (openMenuIndex === index) {
            // Clicking the same menu closes it
            onMenuClose?.();
        }
        else {
            // Open the clicked menu
            onMenuOpen?.(index);
        }
    };
    // Class names
    const menuBarClassNames = [styles$4.menuBar, className].filter(Boolean).join(' ');
    const dropdownClassNames = [styles$4.dropdown, dropdownClassName].filter(Boolean).join(' ');
    // Callback ref to handle both internal state and forwarded ref
    const handleRef = useCallback((node) => {
        setMenuBarElement(node);
        if (typeof ref === 'function') {
            ref(node);
        }
    }, [ref]);
    return (jsx("div", { ref: handleRef, className: menuBarClassNames, role: "menubar", onKeyDown: handleKeyDown, children: menus.map((menu, index) => {
            const isOpen = openMenuIndex === index;
            const menuButtonClassNames = [
                styles$4.menuButton,
                isOpen ? styles$4['menuButton--open'] : '',
                menu.disabled ? styles$4['menuButton--disabled'] : '',
            ]
                .filter(Boolean)
                .join(' ');
            return (jsxs("div", { className: styles$4.menuContainer, children: [jsx("button", { type: "button", className: menuButtonClassNames, onClick: () => handleMenuClick(index), onFocus: () => setFocusedIndex(index), onBlur: () => setFocusedIndex(-1), disabled: menu.disabled, "aria-haspopup": "true", "aria-expanded": isOpen, "aria-disabled": menu.disabled, children: menu.label }), isOpen && (jsx("div", { className: dropdownClassNames, role: "menu", children: menu.items }))] }, index));
        }) }));
});
MenuBar.displayName = 'MenuBar';

var styles$3 = {"menuItem":"MenuItem-module_menuItem","menuItem--disabled":"MenuItem-module_menuItem--disabled","menuItem--selected":"MenuItem-module_menuItem--selected","menuItem--separator":"MenuItem-module_menuItem--separator","checkmark":"MenuItem-module_checkmark","icon":"MenuItem-module_icon","label":"MenuItem-module_label","shortcut":"MenuItem-module_shortcut","submenuArrow":"MenuItem-module_submenuArrow","separatorLine":"MenuItem-module_separatorLine"};

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
const MenuItem = forwardRef(({ label, shortcut, disabled = false, selected = false, separator = false, checked = false, icon, onClick, onFocus, onBlur, className = '', hasSubmenu = false, }, ref) => {
    // Class names
    const menuItemClassNames = [
        styles$3.menuItem,
        selected ? styles$3['menuItem--selected'] : '',
        disabled ? styles$3['menuItem--disabled'] : '',
        separator ? styles$3['menuItem--separator'] : '',
        className,
    ]
        .filter(Boolean)
        .join(' ');
    // Handle click
    const handleClick = (event) => {
        if (disabled) {
            event.preventDefault();
            return;
        }
        onClick?.(event);
    };
    return (jsxs(Fragment, { children: [jsxs("button", { ref: ref, type: "button", className: menuItemClassNames, onClick: handleClick, onFocus: onFocus, onBlur: onBlur, disabled: disabled, role: "menuitem", "aria-disabled": disabled, "aria-checked": checked ? 'true' : undefined, children: [jsx("span", { className: styles$3.checkmark, children: checked && '✓' }), icon && jsx("span", { className: styles$3.icon, children: icon }), jsx("span", { className: styles$3.label, children: label }), shortcut && jsx("span", { className: styles$3.shortcut, children: shortcut }), hasSubmenu && jsx("span", { className: styles$3.submenuArrow, children: "\u25B6" })] }), separator && jsx("div", { className: styles$3.separatorLine, role: "separator" })] }));
});
MenuItem.displayName = 'MenuItem';

var styles$2 = {"scrollbar":"Scrollbar-module_scrollbar","scrollbar--vertical":"Scrollbar-module_scrollbar--vertical","scrollbar--horizontal":"Scrollbar-module_scrollbar--horizontal","scrollbar--disabled":"Scrollbar-module_scrollbar--disabled","arrow":"Scrollbar-module_arrow","arrowIcon":"Scrollbar-module_arrowIcon","arrow--start":"Scrollbar-module_arrow--start","arrow--end":"Scrollbar-module_arrow--end","track":"Scrollbar-module_track","thumb":"Scrollbar-module_thumb"};

// Scrollbar component - Mac OS 9 style
// Classic scrollbar with arrows and draggable thumb
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
const Scrollbar = forwardRef(({ orientation = 'vertical', value = 0, viewportRatio = 0.2, onChange, className = '', disabled = false, }, ref) => {
    const trackRef = useRef(null);
    const [isDragging, setIsDragging] = useState(false);
    const [dragStartPos, setDragStartPos] = useState(0);
    const [dragStartValue, setDragStartValue] = useState(0);
    const isVertical = orientation === 'vertical';
    // Calculate thumb size based on viewport ratio
    const thumbSize = Math.max(viewportRatio * 100, 10); // Minimum 10% size
    // Calculate thumb position
    const maxThumbPos = 100 - thumbSize;
    const thumbPos = value * maxThumbPos;
    // Class names
    const classNames = [
        styles$2.scrollbar,
        styles$2[`scrollbar--${orientation}`],
        disabled && styles$2['scrollbar--disabled'],
        className,
    ]
        .filter(Boolean)
        .join(' ');
    // Handle arrow clicks
    const handleDecrement = useCallback(() => {
        if (disabled || !onChange)
            return;
        const newValue = Math.max(0, value - 0.1);
        onChange(newValue);
    }, [disabled, onChange, value]);
    const handleIncrement = useCallback(() => {
        if (disabled || !onChange)
            return;
        const newValue = Math.min(1, value + 0.1);
        onChange(newValue);
    }, [disabled, onChange, value]);
    // Handle track clicks
    const handleTrackClick = useCallback((event) => {
        if (disabled || !onChange || !trackRef.current)
            return;
        const rect = trackRef.current.getBoundingClientRect();
        const clickPos = isVertical
            ? event.clientY - rect.top
            : event.clientX - rect.left;
        const trackSize = isVertical ? rect.height : rect.width;
        // Convert click position to scroll value (0-1)
        const clickRatio = clickPos / trackSize;
        const newValue = Math.max(0, Math.min(1, clickRatio));
        onChange(newValue);
    }, [disabled, onChange, isVertical]);
    // Handle thumb drag start
    const handleThumbMouseDown = useCallback((event) => {
        if (disabled)
            return;
        event.preventDefault();
        event.stopPropagation();
        setIsDragging(true);
        setDragStartPos(isVertical ? event.clientY : event.clientX);
        setDragStartValue(value);
    }, [disabled, isVertical, value]);
    // Handle drag move
    useEffect(() => {
        if (!isDragging || !onChange || !trackRef.current)
            return;
        const handleMouseMove = (event) => {
            const currentPos = isVertical ? event.clientY : event.clientX;
            const delta = currentPos - dragStartPos;
            const rect = trackRef.current.getBoundingClientRect();
            const trackSize = isVertical ? rect.height : rect.width;
            const deltaRatio = delta / trackSize;
            const newValue = Math.max(0, Math.min(1, dragStartValue + deltaRatio));
            onChange(newValue);
        };
        const handleMouseUp = () => {
            setIsDragging(false);
        };
        document.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('mouseup', handleMouseUp);
        return () => {
            document.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('mouseup', handleMouseUp);
        };
    }, [isDragging, dragStartPos, dragStartValue, onChange, isVertical]);
    return (jsxs("div", { ref: ref, className: classNames, children: [jsx("button", { type: "button", className: `${styles$2.arrow} ${styles$2['arrow--start']}`, onClick: handleDecrement, disabled: disabled, "aria-label": isVertical ? 'Scroll up' : 'Scroll left', children: jsx("div", { className: styles$2.arrowIcon }) }), jsx("div", { ref: trackRef, className: styles$2.track, onClick: handleTrackClick, role: "scrollbar", "aria-valuenow": Math.round(value * 100), "aria-valuemin": 0, "aria-valuemax": 100, "aria-orientation": orientation, children: jsx("div", { className: styles$2.thumb, style: {
                        [isVertical ? 'height' : 'width']: `${thumbSize}%`,
                        [isVertical ? 'top' : 'left']: `${thumbPos}%`,
                    }, onMouseDown: handleThumbMouseDown }) }), jsx("button", { type: "button", className: `${styles$2.arrow} ${styles$2['arrow--end']}`, onClick: handleIncrement, disabled: disabled, "aria-label": isVertical ? 'Scroll down' : 'Scroll right', children: jsx("div", { className: styles$2.arrowIcon }) })] }));
});
Scrollbar.displayName = 'Scrollbar';

var styles$1 = {"listView":"ListView-module_listView","header":"ListView-module_header","headerCell":"ListView-module_headerCell","sortable":"ListView-module_sortable","sortIndicator":"ListView-module_sortIndicator","body":"ListView-module_body","row":"ListView-module_row","selected":"ListView-module_selected","cell":"ListView-module_cell","icon":"ListView-module_icon"};

// ListView component - Mac OS 9 style multi-column list
// List view with sortable columns and row selection
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
 * />
 * ```
 */
const ListView = forwardRef(({ columns, items, selectedIds = [], onSelectionChange, onItemOpen, onSort, className = '', height = 'auto', }, ref) => {
    const [sortColumn, setSortColumn] = useState(null);
    const [sortDirection, setSortDirection] = useState('asc');
    // Class names
    const classNames = [styles$1.listView, className].filter(Boolean).join(' ');
    // Handle column header click
    const handleColumnClick = useCallback((columnKey, sortable = true) => {
        if (!sortable || !onSort)
            return;
        const newDirection = sortColumn === columnKey && sortDirection === 'asc' ? 'desc' : 'asc';
        setSortColumn(columnKey);
        setSortDirection(newDirection);
        onSort(columnKey, newDirection);
    }, [sortColumn, sortDirection, onSort]);
    // Handle row click
    const handleRowClick = useCallback((itemId, event) => {
        if (!onSelectionChange)
            return;
        if (event.metaKey || event.ctrlKey) {
            // Multi-select with Cmd/Ctrl
            if (selectedIds.includes(itemId)) {
                onSelectionChange(selectedIds.filter((id) => id !== itemId));
            }
            else {
                onSelectionChange([...selectedIds, itemId]);
            }
        }
        else if (event.shiftKey && selectedIds.length > 0) {
            // Range select with Shift
            const lastSelectedId = selectedIds[selectedIds.length - 1];
            const lastIndex = items.findIndex((item) => item.id === lastSelectedId);
            const currentIndex = items.findIndex((item) => item.id === itemId);
            const start = Math.min(lastIndex, currentIndex);
            const end = Math.max(lastIndex, currentIndex);
            const rangeIds = items.slice(start, end + 1).map((item) => item.id);
            onSelectionChange(rangeIds);
        }
        else {
            // Single select
            onSelectionChange([itemId]);
        }
    }, [selectedIds, items, onSelectionChange]);
    // Handle row double-click
    const handleRowDoubleClick = useCallback((item) => {
        if (onItemOpen) {
            onItemOpen(item);
        }
    }, [onItemOpen]);
    // Container style
    const containerStyle = {};
    if (height !== 'auto') {
        containerStyle.height = typeof height === 'number' ? `${height}px` : height;
    }
    return (jsxs("div", { ref: ref, className: classNames, style: containerStyle, children: [jsx("div", { className: styles$1.header, children: columns.map((column) => (jsxs("div", { className: `${styles$1.headerCell} ${column.sortable !== false ? styles$1.sortable : ''}`, style: {
                        width: typeof column.width === 'number'
                            ? `${column.width}px`
                            : column.width,
                    }, onClick: () => handleColumnClick(column.key, column.sortable), children: [column.label, sortColumn === column.key && (jsx("span", { className: styles$1.sortIndicator, children: sortDirection === 'asc' ? '▲' : '▼' }))] }, column.key))) }), jsx("div", { className: styles$1.body, children: items.map((item) => {
                    const isSelected = selectedIds.includes(item.id);
                    return (jsx("div", { className: `${styles$1.row} ${isSelected ? styles$1.selected : ''}`, onClick: (e) => handleRowClick(item.id, e), onDoubleClick: () => handleRowDoubleClick(item), children: columns.map((column, index) => (jsxs("div", { className: styles$1.cell, style: {
                                width: typeof column.width === 'number'
                                    ? `${column.width}px`
                                    : column.width,
                            }, children: [index === 0 && item.icon && (jsx("span", { className: styles$1.icon, children: item.icon })), item[column.key]] }, column.key))) }, item.id));
                }) })] }));
});
ListView.displayName = 'ListView';

var styles = {"folderListContent":"FolderList-module_folderListContent","listView":"FolderList-module_listView"};

// FolderList component - Mac OS 9 style folder/file list window
// Window component with integrated ListView for file browsing
/**
 * Mac OS 9 style FolderList component
 *
 * Window with integrated ListView for browsing files and folders.
 * Similar to Finder list view in Mac OS 9.
 *
 * @example
 * ```tsx
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
 * ```
 */
const FolderList = forwardRef(({ columns = [
    { key: 'name', label: 'Name', width: '40%' },
    { key: 'modified', label: 'Date Modified', width: '30%' },
    { key: 'size', label: 'Size', width: '30%' },
], items, selectedIds, onSelectionChange, onItemOpen, onSort, listHeight = 400, ...windowProps }, ref) => {
    // Window content with ListView
    return (jsx(Window, { ref: ref, contentClassName: styles.folderListContent, ...windowProps, children: jsx(ListView, { columns: columns, items: items, selectedIds: selectedIds, onSelectionChange: onSelectionChange, onItemOpen: onItemOpen, onSort: onSort, height: listHeight, className: styles.listView }) }));
});
FolderList.displayName = 'FolderList';

const SaveIcon = () => (jsx(Icon, { label: "Save", size: "sm", children: jsx("path", { d: "M17 3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V7l-4-4zm-5 16c-1.66 0-3-1.34-3-3s1.34-3 3-3 3 1.34 3 3-1.34 3-3 3zm3-10H5V5h10v4z" }) }));
const FolderIcon = () => (jsx(Icon, { label: "Folder", size: "sm", children: jsx("path", { d: "M10 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2h-8l-2-2z" }) }));
const CloseIcon = () => (jsx(Icon, { label: "Close", size: "sm", children: jsx("path", { d: "M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" }) }));
const ArrowRightIcon = () => (jsx(Icon, { label: "Arrow Right", size: "sm", children: jsx("path", { d: "M12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8z" }) }));
const ArrowLeftIcon = () => (jsx(Icon, { label: "Arrow Left", size: "sm", children: jsx("path", { d: "M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z" }) }));
const DownloadIcon = () => (jsx(Icon, { label: "Download", size: "sm", children: jsx("path", { d: "M19 9h-4V3H9v6H5l7 7 7-7zM5 18v2h14v-2H5z" }) }));
const LinkIcon = () => (jsx(Icon, { label: "Link", size: "sm", children: jsx("path", { d: "M3.9 12c0-1.71 1.39-3.1 3.1-3.1h4V7H7c-2.76 0-5 2.24-5 5s2.24 5 5 5h4v-1.9H7c-1.71 0-3.1-1.39-3.1-3.1zM8 13h8v-2H8v2zm9-6h-4v1.9h4c1.71 0 3.1 1.39 3.1 3.1s-1.39 3.1-3.1 3.1h-4V17h4c2.76 0 5-2.24 5-5s-2.24-5-5-5z" }) }));
const MailIcon = () => (jsx(Icon, { label: "Mail", size: "sm", children: jsx("path", { d: "M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" }) }));
const PrintIcon = () => (jsx(Icon, { label: "Print", size: "sm", children: jsx("path", { d: "M19 8H5c-1.66 0-3 1.34-3 3v6h4v4h12v-4h4v-6c0-1.66-1.34-3-3-3zm-3 11H8v-5h8v5zm3-7c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1zm-1-9H6v4h12V3z" }) }));
const TrashIcon = () => (jsx(Icon, { label: "Delete", size: "sm", children: jsx("path", { d: "M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z" }) }));
const SearchIcon = () => (jsx(Icon, { label: "Search", size: "sm", children: jsx("path", { d: "M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z" }) }));
const UserIcon = () => (jsx(Icon, { label: "User", size: "sm", children: jsx("path", { d: "M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" }) }));
const LockIcon = () => (jsx(Icon, { label: "Lock", size: "sm", children: jsx("path", { d: "M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z" }) }));
const CalendarIcon = () => (jsx(Icon, { label: "Calendar", size: "sm", children: jsx("path", { d: "M19 3h-1V1h-2v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V8h14v11zM7 10h5v5H7z" }) }));
const DocumentIcon = () => (jsx(Icon, { label: "Document", size: "sm", children: jsx("path", { d: "M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z" }) }));
const FileIcon = () => (jsx(Icon, { label: "File", size: "sm", children: jsx("path", { d: "M8 16h8v2H8zm0-4h8v2H8zm6-10H6c-1.1 0-2 .9-2 2v16c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm4 18H6V4h7v5h5v11z" }) }));
const ImageIcon = () => (jsx(Icon, { label: "Image", size: "sm", children: jsx("path", { d: "M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z" }) }));
const MusicIcon = () => (jsx(Icon, { label: "Music", size: "sm", children: jsx("path", { d: "M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z" }) }));
const VideoIcon = () => (jsx(Icon, { label: "Video", size: "sm", children: jsx("path", { d: "M18 4l2 4h-3l-2-4h-2l2 4h-3l-2-4H8l2 4H7L5 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V4h-4z" }) }));
const SettingsIcon = () => (jsx(Icon, { label: "Settings", size: "sm", children: jsx("path", { d: "M19.14 12.94c.04-.3.06-.61.06-.94 0-.32-.02-.64-.07-.94l2.03-1.58c.18-.14.23-.41.12-.61l-1.92-3.32c-.12-.22-.37-.29-.59-.22l-2.39.96c-.5-.38-1.03-.7-1.62-.94L14.4 2.81c-.04-.24-.24-.41-.48-.41h-3.84c-.24 0-.43.17-.47.41l-.36 2.54c-.59.24-1.13.57-1.62.94l-2.39-.96c-.22-.08-.47 0-.59.22L2.74 8.87c-.12.21-.08.47.12.61l2.03 1.58c-.05.3-.09.63-.09.94s.02.64.07.94l-2.03 1.58c-.18.14-.23.41-.12.61l1.92 3.32c.12.22.37.29.59.22l2.39-.96c.5.38 1.03.7 1.62.94l.36 2.54c.05.24.24.41.48.41h3.84c.24 0 .44-.17.47-.41l.36-2.54c.59-.24 1.13-.56 1.62-.94l2.39.96c.22.08.47 0 .59-.22l1.92-3.32c.12-.22.07-.47-.12-.61l-2.01-1.58zM12 15.6c-1.98 0-3.6-1.62-3.6-3.6s1.62-3.6 3.6-3.6 3.6 1.62 3.6 3.6-1.62 3.6-3.6 3.6z" }) }));
const HomeIcon = () => (jsx(Icon, { label: "Home", size: "sm", children: jsx("path", { d: "M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" }) }));
const StarIcon = () => (jsx(Icon, { label: "Star", size: "sm", children: jsx("path", { d: "M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" }) }));
const HeartIcon = () => (jsx(Icon, { label: "Heart", size: "sm", children: jsx("path", { d: "M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" }) }));
const InfoIcon = () => (jsx(Icon, { label: "Info", size: "sm", children: jsx("path", { d: "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z" }) }));
const WarningIcon = () => (jsx(Icon, { label: "Warning", size: "sm", children: jsx("path", { d: "M1 21h22L12 2 1 21zm12-3h-2v-2h2v2zm0-4h-2v-4h2v4z" }) }));
const ErrorIcon = () => (jsx(Icon, { label: "Error", size: "sm", children: jsx("path", { d: "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z" }) }));
const CheckIcon = () => (jsx(Icon, { label: "Check", size: "sm", children: jsx("path", { d: "M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" }) }));
const PlusIcon = () => (jsx(Icon, { label: "Plus", size: "sm", children: jsx("path", { d: "M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z" }) }));
const MinusIcon = () => (jsx(Icon, { label: "Minus", size: "sm", children: jsx("path", { d: "M19 13H5v-2h14v2z" }) }));
const RefreshIcon = () => (jsx(Icon, { label: "Refresh", size: "sm", children: jsx("path", { d: "M17.65 6.35C16.2 4.9 14.21 4 12 4c-4.42 0-7.99 3.58-7.99 8s3.57 8 7.99 8c3.73 0 6.84-2.55 7.73-6h-2.08c-.82 2.33-3.04 4-5.65 4-3.31 0-6-2.69-6-6s2.69-6 6-6c1.66 0 3.14.69 4.22 1.78L13 11h7V4l-2.35 2.35z" }) }));
const MenuIcon = () => (jsx(Icon, { label: "Menu", size: "sm", children: jsx("path", { d: "M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z" }) }));
const MoreIcon = () => (jsx(Icon, { label: "More", size: "sm", children: jsx("path", { d: "M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z" }) }));
const ChevronUpIcon = () => (jsx(Icon, { label: "Chevron Up", size: "sm", children: jsx("path", { d: "M12 8l-6 6 1.41 1.41L12 10.83l4.59 4.58L18 14z" }) }));
const ChevronDownIcon = () => (jsx(Icon, { label: "Chevron Down", size: "sm", children: jsx("path", { d: "M16.59 8.59L12 13.17 7.41 8.59 6 10l6 6 6-6z" }) }));
const EyeIcon = () => (jsx(Icon, { label: "Eye", size: "sm", children: jsx("path", { d: "M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z" }) }));

// Mac OS 9 Design Tokens
// Extracted from Figma file: vy2T5MCXFz7QWf4Ba86eqN
// Reference: docs/figma-map.md
/**
 * Color tokens based on Mac OS 9 grayscale palette
 * Extracted from Figma styles and component analysis
 */
const colors = {
    // Grayscale palette (Figma style IDs included for reference)
    gray100: '#FFFFFF', // 18:47 - White
    gray200: '#EEEEEE', // 19:2507 - Base UI background
    gray300: '#DDDDDD', // 18:60 - Inferred mid-tone
    gray400: '#CCCCCC', // 18:1970 - Inferred mid-tone
    gray500: '#999999', // 20:7306 - Inferred mid-tone
    gray600: '#666666', // 18:52 - Inferred dark tone
    gray700: '#4D4D4D', // 18:46 - Inferred dark tone
    gray800: '#333333', // 45:184845 - Inferred very dark
    gray900: '#262626', // 18:48 - Black (strokes, borders, text)
    // Accent colors
    lavender: '#CCCCFF', // 60:134029 - Cover background
    azul: '#0066CC', // 49:36229 - Accent (inferred)
    linkRed: '#CC0000', // 102:398, 102:3935 - Link color (inferred)
    // Semantic mappings
    background: '#EEEEEE', // Gray 200
    foreground: '#262626', // Gray 900
    border: '#262626', // Gray 900
    text: '#262626', // Gray 900
    textInverse: '#FFFFFF', // Gray 100
    surface: '#EEEEEE', // Gray 200
    surfaceInset: '#FFFFFF', // Gray 100 (for inset areas)
    // Legacy names for compatibility
    black: '#262626',
    white: '#FFFFFF',
    // Status colors (Mac OS 9 style)
    focus: '#000080',
    error: '#CC0000',
    success: '#008000',
    warning: '#FF8C00',
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
const typography = {
    fontFamily: {
        // Charcoal - Primary system UI font used throughout Mac OS 9
        // Fallback chain: Try Charcoal variants, then Chicago, then modern system fonts
        system: 'Charcoal, "Charcoal CY", Chicago, "Chicago Classic", -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif',
        // Geneva - Used for dialog text and body content in Mac OS 9
        // More readable for longer text than Charcoal
        body: 'Geneva, "Geneva CY", "Lucida Grande", "Lucida Sans Unicode", sans-serif',
        // Apple Garamond Light - Used for headlines in Figma
        display: '"Apple Garamond Light", "Apple Garamond", Garamond, Georgia, serif',
        // Chicago - Classic Mac OS system font (menu bar, classic UI)
        chicago: 'Chicago, "Chicago Classic", "Charcoal CY", Charcoal, monospace',
        // Monaco - Mac OS 9 monospace font
        mono: 'Monaco, "Monaco CY", "SF Mono", "Courier New", Courier, monospace',
    },
    fontSize: {
        xs: '9px', // Smallest UI text (9pt Chicago/Charcoal)
        sm: '10px', // Small labels (10pt)
        md: '12px', // Standard UI text - Mac OS 9 default (12pt)
        lg: '13px', // Slightly larger UI text
        xl: '14px', // Large UI text
        '2xl': '16px', // Headings
        '3xl': '18px', // Large headings
        '4xl': '20px', // Major headings
        '5xl': '24px', // Display text
    },
    fontWeight: {
        normal: 700, // Charcoal Bold is the Mac OS 9 default
        medium: 700, // Medium (same as bold for Charcoal)
        semibold: 700, // Semibold (same as bold)
        bold: 700, // Bold weight
        light: 400, // Light weight (regular Charcoal)
    },
    lineHeight: {
        tight: 1.2, // Tight leading (Mac OS 9 style)
        snug: 1.3, // Snug
        normal: 1.4, // Normal (Mac OS 9 used tighter line heights)
        relaxed: 1.5, // Relaxed
        loose: 1.6, // Loose
    },
    letterSpacing: {
        tighter: '-0.02em', // Slightly tighter
        tight: '-0.01em', // Tight
        normal: '0', // Normal - Mac OS 9 default
        wide: '0.01em', // Wide
        wider: '0.02em', // Wider
    },
};
/**
 * Spacing tokens based on Mac OS 9 measurements
 * Mac OS 9 used tight spacing; using 2px as base unit
 */
const spacing = {
    '0': '0',
    px: '1px',
    '0.5': '2px', // Minimal spacing
    '1': '4px', // Base grid unit
    '1.5': '6px',
    '2': '8px',
    '2.5': '10px',
    '3': '12px',
    '4': '16px',
    '5': '20px',
    '6': '24px',
    '8': '32px',
    '10': '40px',
    '12': '48px',
    '16': '64px',
    // Legacy names
    xs: '2px',
    sm: '4px',
    md: '8px',
    lg: '12px',
    xl: '16px',
    '2xl': '24px',
    '3xl': '32px',
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
const shadows = {
    // Standard raised bevel (default button state)
    bevel: 'inset 2px 2px 0 rgba(255, 255, 255, 0.6), inset -2px -2px 0 rgba(38, 38, 38, 0.4), 2px 2px 0 rgba(38, 38, 38, 1)',
    // Inverted bevel for pressed/inset states
    inset: 'inset -2px -2px 0 rgba(255, 255, 255, 0.6), inset 2px 2px 0 rgba(38, 38, 38, 0.4), 2px 2px 0 rgba(38, 38, 38, 1)',
    // Individual layers for custom composition
    dropShadow: '2px 2px 0 rgba(38, 38, 38, 1)',
    innerHighlight: 'inset 2px 2px 0 rgba(255, 255, 255, 0.6)',
    innerShadow: 'inset -2px -2px 0 rgba(38, 38, 38, 0.4)',
    // Legacy format for compatibility
    raised: {
        highlight: 'inset 2px 2px 0 rgba(255, 255, 255, 0.6)',
        shadow: 'inset -2px -2px 0 rgba(38, 38, 38, 0.4)',
        full: 'inset 2px 2px 0 rgba(255, 255, 255, 0.6), inset -2px -2px 0 rgba(38, 38, 38, 0.4), 2px 2px 0 rgba(38, 38, 38, 1)',
    },
    // No shadow (flat)
    none: 'none',
};
/**
 * Border tokens
 * Mac OS 9 used consistent 1px borders with sharp corners
 */
const borders = {
    width: {
        none: '0',
        thin: '1px',
        medium: '2px',
        thick: '3px',
    },
    style: {
        solid: 'solid',
        dashed: 'dashed',
        dotted: 'dotted',
        none: 'none',
    },
    radius: {
        none: '0', // Mac OS 9 always used square corners
        sm: '0', // Kept for API consistency
        md: '0',
        lg: '0',
        full: '0',
    },
};
/**
 * Z-index scale for layering
 */
const zIndex = {
    base: 0,
    dropdown: 1000,
    sticky: 1100,
    modal: 1200,
    popover: 1300,
    tooltip: 1400,
};
/**
 * Transition/Animation tokens
 * Mac OS 9 had minimal animations, but we add subtle ones for modern feel
 */
const transitions = {
    duration: {
        instant: '0ms',
        fast: '100ms',
        normal: '200ms',
        slow: '300ms',
    },
    timing: {
        linear: 'linear',
        easeIn: 'cubic-bezier(0.4, 0, 1, 1)',
        easeOut: 'cubic-bezier(0, 0, 0.2, 1)',
        easeInOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
    },
};
// Export all tokens as a single object
const tokens = {
    colors,
    typography,
    spacing,
    borders,
    shadows,
    zIndex,
    transitions,
};

export { ArrowLeftIcon, ArrowRightIcon, Button, CalendarIcon, CheckIcon, Checkbox, ChevronDownIcon, ChevronUpIcon, CloseIcon, Dialog, DocumentIcon, DownloadIcon, ErrorIcon, EyeIcon, FileIcon, FolderIcon, FolderList, HeartIcon, HomeIcon, Icon, IconButton, ImageIcon, InfoIcon, LinkIcon, ListView, LockIcon, MailIcon, MenuBar, MenuIcon, MenuItem, MinusIcon, MoreIcon, MusicIcon, PlusIcon, PrintIcon, Radio, RefreshIcon, SaveIcon, Scrollbar, SearchIcon, Select, SettingsIcon, StarIcon, TabPanel, Tabs, TextField, TrashIcon, UserIcon, VideoIcon, WarningIcon, Window, borders, colors, shadows, spacing, tokens, transitions, typography, zIndex };
//# sourceMappingURL=index.js.map
