'use strict';

var React4 = require('react');
var jsxRuntime = require('react/jsx-runtime');

function _interopDefault (e) { return e && e.__esModule ? e : { default: e }; }

var React4__default = /*#__PURE__*/_interopDefault(React4);

// src/components/Button/Button.module.css
var Button_default = {};
var Button = React4.forwardRef(
  (props, ref) => {
    const {
      variant = "default",
      size = "md",
      disabled = false,
      fullWidth = false,
      loading = false,
      loadingText,
      useCursorLoading = false,
      leftIcon,
      rightIcon,
      iconOnly = false,
      ariaLabel,
      ariaDescribedBy,
      ariaPressed,
      className = "",
      children,
      ...restProps
    } = props;
    const isLink = props.as === "a";
    const classNames = [
      Button_default.button,
      Button_default[`button--${variant}`],
      Button_default[`button--${size}`],
      fullWidth && Button_default["button--full-width"],
      disabled && Button_default["button--disabled"],
      loading && Button_default["button--loading"],
      loading && useCursorLoading && Button_default["button--cursor-loading"],
      iconOnly && Button_default["button--icon-only"],
      (leftIcon || rightIcon) && Button_default["button--with-icon"],
      className
    ].filter(Boolean).join(" ");
    const ariaAttributes = {
      "aria-label": iconOnly ? ariaLabel || (typeof children === "string" ? children : void 0) : ariaLabel,
      "aria-describedby": ariaDescribedBy,
      "aria-pressed": ariaPressed,
      "aria-disabled": disabled || loading,
      "aria-busy": loading
    };
    if (isLink) {
      const { href, target, rel, download, ...linkProps } = restProps;
      let finalRel = rel;
      if (target === "_blank" && !rel) {
        finalRel = "noopener noreferrer";
      }
      const handleClick = (e) => {
        if (disabled || loading) {
          e.preventDefault();
          return;
        }
        linkProps.onClick?.(e);
      };
      return /* @__PURE__ */ jsxRuntime.jsx(
        "a",
        {
          ref,
          href: disabled || loading ? void 0 : href,
          target,
          rel: finalRel,
          download,
          className: classNames,
          ...ariaAttributes,
          ...linkProps,
          onClick: handleClick,
          children: renderButtonContent()
        }
      );
    }
    const {
      type = "button",
      form,
      formAction,
      formMethod,
      formNoValidate,
      formTarget,
      ...buttonProps
    } = restProps;
    return /* @__PURE__ */ jsxRuntime.jsx(
      "button",
      {
        ref,
        type,
        disabled: disabled || loading,
        form,
        formAction,
        formMethod,
        formNoValidate,
        formTarget,
        className: classNames,
        ...ariaAttributes,
        ...buttonProps,
        children: renderButtonContent()
      }
    );
    function renderButtonContent() {
      if (loading) {
        return /* @__PURE__ */ jsxRuntime.jsxs(jsxRuntime.Fragment, { children: [
          !useCursorLoading && /* @__PURE__ */ jsxRuntime.jsx("span", { className: Button_default["button__loading-spinner"], "aria-hidden": "true", children: "\u23F3" }),
          /* @__PURE__ */ jsxRuntime.jsx("span", { className: Button_default["button__text"], children: loadingText || children })
        ] });
      }
      if (iconOnly) {
        return /* @__PURE__ */ jsxRuntime.jsx("span", { className: Button_default["button__icon-only"], children });
      }
      return /* @__PURE__ */ jsxRuntime.jsxs(jsxRuntime.Fragment, { children: [
        leftIcon && /* @__PURE__ */ jsxRuntime.jsx("span", { className: Button_default["button__icon-left"], "aria-hidden": "true", children: leftIcon }),
        /* @__PURE__ */ jsxRuntime.jsx("span", { className: Button_default["button__text"], children }),
        rightIcon && /* @__PURE__ */ jsxRuntime.jsx("span", { className: Button_default["button__icon-right"], "aria-hidden": "true", children: rightIcon })
      ] });
    }
  }
);
Button.displayName = "Button";

// src/components/Icon/Icon.module.css
var Icon_default = {};
var Icon = React4.forwardRef(
  ({ size = "md", children, label, className = "", ...props }, ref) => {
    const classNames = [Icon_default.icon, Icon_default[`icon--${size}`], className].filter(Boolean).join(" ");
    return /* @__PURE__ */ jsxRuntime.jsx(
      "svg",
      {
        ref,
        className: classNames,
        viewBox: "0 0 24 24",
        fill: "currentColor",
        xmlns: "http://www.w3.org/2000/svg",
        "aria-label": label,
        "aria-hidden": !label,
        role: label ? "img" : "presentation",
        ...props,
        children
      }
    );
  }
);
Icon.displayName = "Icon";

// src/components/IconButton/IconButton.module.css
var IconButton_default = {};
var IconButton = React4.forwardRef(
  ({
    icon,
    label,
    labelPosition = "right",
    variant = "default",
    size = "md",
    disabled = false,
    className = "",
    ...props
  }, ref) => {
    const classNames = [
      IconButton_default.iconButton,
      IconButton_default[`iconButton--${variant}`],
      IconButton_default[`iconButton--${size}`],
      label && IconButton_default[`iconButton--with-label`],
      label && IconButton_default[`iconButton--label-${labelPosition}`],
      disabled && IconButton_default["iconButton--disabled"],
      className
    ].filter(Boolean).join(" ");
    return /* @__PURE__ */ jsxRuntime.jsxs(
      "button",
      {
        ref,
        type: "button",
        className: classNames,
        disabled,
        ...props,
        children: [
          label && (labelPosition === "left" || labelPosition === "top") && /* @__PURE__ */ jsxRuntime.jsx("span", { className: IconButton_default.label, children: label }),
          /* @__PURE__ */ jsxRuntime.jsx("span", { className: IconButton_default.icon, children: icon }),
          label && (labelPosition === "right" || labelPosition === "bottom") && /* @__PURE__ */ jsxRuntime.jsx("span", { className: IconButton_default.label, children: label })
        ]
      }
    );
  }
);
IconButton.displayName = "IconButton";

// src/components/Checkbox/Checkbox.module.css
var Checkbox_default = {};
var Checkbox = React4.forwardRef(
  ({
    checked,
    defaultChecked,
    indeterminate = false,
    disabled = false,
    label,
    labelPosition = "right",
    size = "md",
    error = false,
    ariaLabel,
    ariaDescribedBy,
    className = "",
    onChange,
    id,
    ...props
  }, ref) => {
    const inputRef = React4__default.default.useRef(null);
    const combinedRef = ref || inputRef;
    React4__default.default.useEffect(() => {
      if (combinedRef?.current) {
        combinedRef.current.indeterminate = indeterminate;
      }
    }, [indeterminate, combinedRef]);
    const checkboxId = id || React4__default.default.useId();
    const wrapperClassNames = [
      Checkbox_default.wrapper,
      Checkbox_default[`wrapper--${size}`],
      Checkbox_default[`wrapper--label-${labelPosition}`],
      disabled && Checkbox_default["wrapper--disabled"],
      error && Checkbox_default["wrapper--error"],
      className
    ].filter(Boolean).join(" ");
    const checkboxClassNames = [
      Checkbox_default.checkbox,
      Checkbox_default[`checkbox--${size}`],
      indeterminate && Checkbox_default["checkbox--indeterminate"],
      error && Checkbox_default["checkbox--error"]
    ].filter(Boolean).join(" ");
    const labelClassNames = [Checkbox_default.label, Checkbox_default[`label--${size}`]].filter(Boolean).join(" ");
    const ariaAttributes = {
      "aria-label": !label ? ariaLabel : void 0,
      "aria-describedby": ariaDescribedBy,
      "aria-invalid": error,
      "aria-checked": indeterminate ? "mixed" : void 0
    };
    return /* @__PURE__ */ jsxRuntime.jsxs("div", { className: wrapperClassNames, children: [
      label && labelPosition === "left" && /* @__PURE__ */ jsxRuntime.jsx("label", { htmlFor: checkboxId, className: labelClassNames, children: label }),
      /* @__PURE__ */ jsxRuntime.jsx(
        "input",
        {
          ref: combinedRef,
          type: "checkbox",
          id: checkboxId,
          className: checkboxClassNames,
          checked,
          defaultChecked,
          disabled,
          onChange,
          ...ariaAttributes,
          ...props
        }
      ),
      label && labelPosition === "right" && /* @__PURE__ */ jsxRuntime.jsx("label", { htmlFor: checkboxId, className: labelClassNames, children: label })
    ] });
  }
);
Checkbox.displayName = "Checkbox";

// src/components/Radio/Radio.module.css
var Radio_default = {};
var Radio = React4.forwardRef(
  ({
    checked,
    defaultChecked,
    disabled = false,
    label,
    labelPosition = "right",
    size = "md",
    error = false,
    ariaLabel,
    ariaDescribedBy,
    className = "",
    value,
    name,
    onChange,
    id,
    ...props
  }, ref) => {
    const radioId = id || React4__default.default.useId();
    const wrapperClassNames = [
      Radio_default.wrapper,
      Radio_default[`wrapper--${size}`],
      Radio_default[`wrapper--label-${labelPosition}`],
      disabled && Radio_default["wrapper--disabled"],
      error && Radio_default["wrapper--error"],
      className
    ].filter(Boolean).join(" ");
    const radioClassNames = [
      Radio_default.radio,
      Radio_default[`radio--${size}`],
      error && Radio_default["radio--error"]
    ].filter(Boolean).join(" ");
    const labelClassNames = [Radio_default.label, Radio_default[`label--${size}`]].filter(Boolean).join(" ");
    const ariaAttributes = {
      "aria-label": !label ? ariaLabel : void 0,
      "aria-describedby": ariaDescribedBy,
      "aria-invalid": error
    };
    return /* @__PURE__ */ jsxRuntime.jsxs("div", { className: wrapperClassNames, children: [
      label && labelPosition === "left" && /* @__PURE__ */ jsxRuntime.jsx("label", { htmlFor: radioId, className: labelClassNames, children: label }),
      /* @__PURE__ */ jsxRuntime.jsx(
        "input",
        {
          ref,
          type: "radio",
          id: radioId,
          className: radioClassNames,
          checked,
          defaultChecked,
          disabled,
          value,
          name,
          onChange,
          ...ariaAttributes,
          ...props
        }
      ),
      label && labelPosition === "right" && /* @__PURE__ */ jsxRuntime.jsx("label", { htmlFor: radioId, className: labelClassNames, children: label })
    ] });
  }
);
Radio.displayName = "Radio";

// src/components/TextField/TextField.module.css
var TextField_default = {};
var TextField = React4.forwardRef(
  ({
    label,
    labelPosition = "top",
    size = "md",
    fullWidth = false,
    error = false,
    errorMessage,
    helperText,
    leftIcon,
    rightIcon,
    ariaLabel,
    ariaDescribedBy,
    className = "",
    wrapperClassName = "",
    type = "text",
    id,
    disabled,
    ...props
  }, ref) => {
    const inputId = id || React4__default.default.useId();
    const helperId = `${inputId}-helper`;
    const errorId = `${inputId}-error`;
    const describedByIds = [
      helperText && helperId,
      error && errorMessage && errorId,
      ariaDescribedBy
    ].filter(Boolean).join(" ");
    const wrapperClassNames = [
      TextField_default.wrapper,
      TextField_default[`wrapper--${size}`],
      TextField_default[`wrapper--label-${labelPosition}`],
      fullWidth && TextField_default["wrapper--full-width"],
      disabled && TextField_default["wrapper--disabled"],
      wrapperClassName
    ].filter(Boolean).join(" ");
    const inputWrapperClassNames = [
      TextField_default["input-wrapper"],
      (leftIcon || rightIcon) && TextField_default["input-wrapper--with-icon"],
      leftIcon && TextField_default["input-wrapper--with-left-icon"],
      rightIcon && TextField_default["input-wrapper--with-right-icon"]
    ].filter(Boolean).join(" ");
    const inputClassNames = [
      TextField_default.input,
      TextField_default[`input--${size}`],
      error && TextField_default["input--error"],
      fullWidth && TextField_default["input--full-width"],
      className
    ].filter(Boolean).join(" ");
    const labelClassNames = [TextField_default.label, TextField_default[`label--${size}`]].filter(Boolean).join(" ");
    const ariaAttributes = {
      "aria-label": !label ? ariaLabel : void 0,
      "aria-describedby": describedByIds || void 0,
      "aria-invalid": error
    };
    return /* @__PURE__ */ jsxRuntime.jsxs("div", { className: wrapperClassNames, children: [
      label && (labelPosition === "top" || labelPosition === "left") && /* @__PURE__ */ jsxRuntime.jsx("label", { htmlFor: inputId, className: labelClassNames, children: label }),
      /* @__PURE__ */ jsxRuntime.jsxs("div", { className: inputWrapperClassNames, children: [
        leftIcon && /* @__PURE__ */ jsxRuntime.jsx("span", { className: TextField_default["input-icon-left"], "aria-hidden": "true", children: leftIcon }),
        /* @__PURE__ */ jsxRuntime.jsx(
          "input",
          {
            ref,
            type,
            id: inputId,
            className: inputClassNames,
            disabled,
            ...ariaAttributes,
            ...props
          }
        ),
        rightIcon && /* @__PURE__ */ jsxRuntime.jsx("span", { className: TextField_default["input-icon-right"], "aria-hidden": "true", children: rightIcon })
      ] }),
      label && labelPosition === "right" && /* @__PURE__ */ jsxRuntime.jsx("label", { htmlFor: inputId, className: labelClassNames, children: label }),
      helperText && !error && /* @__PURE__ */ jsxRuntime.jsx("p", { id: helperId, className: TextField_default["helper-text"], children: helperText }),
      error && errorMessage && /* @__PURE__ */ jsxRuntime.jsx("p", { id: errorId, className: TextField_default["error-message"], children: errorMessage })
    ] });
  }
);
TextField.displayName = "TextField";

// src/components/Select/Select.module.css
var Select_default = {};
var Select = React4.forwardRef(
  ({
    label,
    labelPosition = "top",
    size = "md",
    fullWidth = false,
    error = false,
    errorMessage,
    helperText,
    options,
    placeholder,
    ariaLabel,
    ariaDescribedBy,
    className = "",
    wrapperClassName = "",
    id,
    disabled,
    children,
    ...props
  }, ref) => {
    const selectId = id || React4__default.default.useId();
    const helperId = `${selectId}-helper`;
    const errorId = `${selectId}-error`;
    const describedByIds = [
      helperText && helperId,
      error && errorMessage && errorId,
      ariaDescribedBy
    ].filter(Boolean).join(" ");
    const wrapperClassNames = [
      Select_default.wrapper,
      Select_default[`wrapper--${size}`],
      Select_default[`wrapper--label-${labelPosition}`],
      fullWidth && Select_default["wrapper--full-width"],
      disabled && Select_default["wrapper--disabled"],
      wrapperClassName
    ].filter(Boolean).join(" ");
    const selectClassNames = [
      Select_default.select,
      Select_default[`select--${size}`],
      error && Select_default["select--error"],
      fullWidth && Select_default["select--full-width"],
      className
    ].filter(Boolean).join(" ");
    const labelClassNames = [Select_default.label, Select_default[`label--${size}`]].filter(Boolean).join(" ");
    const ariaAttributes = {
      "aria-label": !label ? ariaLabel : void 0,
      "aria-describedby": describedByIds || void 0,
      "aria-invalid": error
    };
    const renderOptions = () => {
      if (options) {
        return /* @__PURE__ */ jsxRuntime.jsxs(jsxRuntime.Fragment, { children: [
          placeholder && /* @__PURE__ */ jsxRuntime.jsx("option", { value: "", disabled: true, children: placeholder }),
          options.map((option) => /* @__PURE__ */ jsxRuntime.jsx("option", { value: option.value, disabled: option.disabled, children: option.label }, option.value))
        ] });
      }
      return children;
    };
    return /* @__PURE__ */ jsxRuntime.jsxs("div", { className: wrapperClassNames, children: [
      label && (labelPosition === "top" || labelPosition === "left") && /* @__PURE__ */ jsxRuntime.jsx("label", { htmlFor: selectId, className: labelClassNames, children: label }),
      /* @__PURE__ */ jsxRuntime.jsx(
        "select",
        {
          ref,
          id: selectId,
          className: selectClassNames,
          disabled,
          ...ariaAttributes,
          ...props,
          children: renderOptions()
        }
      ),
      label && labelPosition === "right" && /* @__PURE__ */ jsxRuntime.jsx("label", { htmlFor: selectId, className: labelClassNames, children: label }),
      helperText && !error && /* @__PURE__ */ jsxRuntime.jsx("p", { id: helperId, className: Select_default["helper-text"], children: helperText }),
      error && errorMessage && /* @__PURE__ */ jsxRuntime.jsx("p", { id: errorId, className: Select_default["error-message"], children: errorMessage })
    ] });
  }
);
Select.displayName = "Select";

// src/components/Tabs/Tabs.module.css
var Tabs_default = {};
var TabPanel = ({ children }) => {
  return /* @__PURE__ */ jsxRuntime.jsx(jsxRuntime.Fragment, { children });
};
TabPanel.displayName = "TabPanel";
var Tabs = ({
  children,
  defaultActiveTab = 0,
  activeTab: controlledActiveTab,
  onChange,
  size = "md",
  fullWidth = false,
  className = "",
  tabListClassName = "",
  panelClassName = "",
  ariaLabel = "Tabs"
}) => {
  const [uncontrolledActiveTab, setUncontrolledActiveTab] = React4.useState(defaultActiveTab);
  const isControlled = controlledActiveTab !== void 0;
  const activeTabIndex = isControlled ? controlledActiveTab : uncontrolledActiveTab;
  const tabs = React4.Children.toArray(children).filter(
    (child) => React4.isValidElement(child)
  );
  const handleTabChange = React4.useCallback(
    (index) => {
      const tab = tabs[index];
      if (!tab || tab.props.disabled) return;
      if (!isControlled) {
        setUncontrolledActiveTab(index);
      }
      onChange?.(index, tab.props.value);
    },
    [tabs, isControlled, onChange]
  );
  const handleKeyDown = React4.useCallback(
    (event, currentIndex) => {
      let newIndex = currentIndex;
      switch (event.key) {
        case "ArrowLeft":
        case "ArrowUp":
          event.preventDefault();
          newIndex = currentIndex - 1;
          if (newIndex < 0) newIndex = tabs.length - 1;
          while (tabs[newIndex]?.props.disabled && newIndex !== currentIndex) {
            newIndex--;
            if (newIndex < 0) newIndex = tabs.length - 1;
          }
          break;
        case "ArrowRight":
        case "ArrowDown":
          event.preventDefault();
          newIndex = currentIndex + 1;
          if (newIndex >= tabs.length) newIndex = 0;
          while (tabs[newIndex]?.props.disabled && newIndex !== currentIndex) {
            newIndex++;
            if (newIndex >= tabs.length) newIndex = 0;
          }
          break;
        case "Home":
          event.preventDefault();
          newIndex = 0;
          while (tabs[newIndex]?.props.disabled && newIndex < tabs.length - 1) {
            newIndex++;
          }
          break;
        case "End":
          event.preventDefault();
          newIndex = tabs.length - 1;
          while (tabs[newIndex]?.props.disabled && newIndex > 0) {
            newIndex--;
          }
          break;
        default:
          return;
      }
      handleTabChange(newIndex);
    },
    [tabs, handleTabChange]
  );
  const containerClassNames = [Tabs_default.container, className].filter(Boolean).join(" ");
  const tabListClassNames = [
    Tabs_default.tabList,
    Tabs_default[`tabList--${size}`],
    fullWidth && Tabs_default["tabList--full-width"],
    tabListClassName
  ].filter(Boolean).join(" ");
  const panelContainerClassNames = [
    Tabs_default.panelContainer,
    Tabs_default[`panelContainer--${size}`],
    panelClassName
  ].filter(Boolean).join(" ");
  return /* @__PURE__ */ jsxRuntime.jsxs("div", { className: containerClassNames, children: [
    /* @__PURE__ */ jsxRuntime.jsx("div", { role: "tablist", "aria-label": ariaLabel, className: tabListClassNames, children: tabs.map((tab, index) => {
      const isActive = index === activeTabIndex;
      const isDisabled = tab.props.disabled;
      const tabClassNames = [
        Tabs_default.tab,
        Tabs_default[`tab--${size}`],
        isActive && Tabs_default["tab--active"],
        isDisabled && Tabs_default["tab--disabled"],
        fullWidth && Tabs_default["tab--full-width"]
      ].filter(Boolean).join(" ");
      return /* @__PURE__ */ jsxRuntime.jsxs(
        "button",
        {
          role: "tab",
          type: "button",
          "aria-selected": isActive,
          "aria-controls": `panel-${index}`,
          id: `tab-${index}`,
          tabIndex: isActive ? 0 : -1,
          disabled: isDisabled,
          className: tabClassNames,
          onClick: () => handleTabChange(index),
          onKeyDown: (e) => handleKeyDown(e, index),
          children: [
            tab.props.icon && /* @__PURE__ */ jsxRuntime.jsx("span", { className: Tabs_default.tabIcon, children: tab.props.icon }),
            tab.props.label
          ]
        },
        index
      );
    }) }),
    tabs.map((tab, index) => {
      const isActive = index === activeTabIndex;
      return /* @__PURE__ */ jsxRuntime.jsx(
        "div",
        {
          role: "tabpanel",
          id: `panel-${index}`,
          "aria-labelledby": `tab-${index}`,
          hidden: !isActive,
          className: panelContainerClassNames,
          children: isActive && tab.props.children
        },
        index
      );
    })
  ] });
};
Tabs.displayName = "Tabs";

// src/components/Window/Window.module.css
var Window_default = {};
var Window = React4.forwardRef(
  ({
    children,
    title,
    titleBar,
    active = true,
    width = "auto",
    height = "auto",
    className = "",
    contentClassName = "",
    showControls = true,
    onClose,
    onMinimize,
    onMaximize,
    resizable = false
  }, ref) => {
    const windowClassNames = [
      Window_default.window,
      active ? Window_default["window--active"] : Window_default["window--inactive"],
      className
    ].filter(Boolean).join(" ");
    const contentClassNames = [Window_default.content, contentClassName].filter(Boolean).join(" ");
    const windowStyle = {};
    if (width !== "auto") {
      windowStyle.width = typeof width === "number" ? `${width}px` : width;
    }
    if (height !== "auto") {
      windowStyle.height = typeof height === "number" ? `${height}px` : height;
    }
    const renderTitleBar = () => {
      if (titleBar) {
        return titleBar;
      }
      if (title) {
        return /* @__PURE__ */ jsxRuntime.jsxs("div", { className: Window_default.titleBar, children: [
          showControls && /* @__PURE__ */ jsxRuntime.jsxs("div", { className: Window_default.controls, children: [
            onClose && /* @__PURE__ */ jsxRuntime.jsx(
              "button",
              {
                type: "button",
                className: Window_default.controlButton,
                onClick: onClose,
                "aria-label": "Close",
                title: "Close",
                children: /* @__PURE__ */ jsxRuntime.jsx("div", { className: Window_default.closeBox })
              }
            ),
            onMinimize && /* @__PURE__ */ jsxRuntime.jsx(
              "button",
              {
                type: "button",
                className: Window_default.controlButton,
                onClick: onMinimize,
                "aria-label": "Minimize",
                title: "Minimize",
                children: /* @__PURE__ */ jsxRuntime.jsx("div", { className: Window_default.minimizeBox })
              }
            ),
            onMaximize && /* @__PURE__ */ jsxRuntime.jsx(
              "button",
              {
                type: "button",
                className: Window_default.controlButton,
                onClick: onMaximize,
                "aria-label": "Maximize",
                title: "Maximize",
                children: /* @__PURE__ */ jsxRuntime.jsx("div", { className: Window_default.maximizeBox })
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntime.jsx("div", { className: Window_default.titleText, children: title })
        ] });
      }
      return null;
    };
    return /* @__PURE__ */ jsxRuntime.jsxs("div", { ref, className: windowClassNames, style: windowStyle, children: [
      renderTitleBar(),
      /* @__PURE__ */ jsxRuntime.jsx("div", { className: contentClassNames, children }),
      resizable && /* @__PURE__ */ jsxRuntime.jsx("div", { className: Window_default.resizeHandle, "aria-hidden": "true" })
    ] });
  }
);
Window.displayName = "Window";

// src/components/Dialog/Dialog.module.css
var Dialog_default = {};
var Dialog = React4.forwardRef(
  ({
    open = false,
    onClose,
    closeOnBackdropClick = true,
    closeOnEscape = true,
    backdropClassName = "",
    trapFocus = true,
    initialFocus,
    children,
    ...windowProps
  }, ref) => {
    const dialogRef = React4.useRef(null);
    const previousActiveElement = React4.useRef(null);
    React4.useEffect(() => {
      if (!open || !closeOnEscape) return;
      const handleEscape = (event) => {
        if (event.key === "Escape") {
          event.preventDefault();
          event.stopPropagation();
          onClose?.();
        }
      };
      document.addEventListener("keydown", handleEscape);
      return () => document.removeEventListener("keydown", handleEscape);
    }, [open, closeOnEscape, onClose]);
    React4.useEffect(() => {
      if (open) {
        previousActiveElement.current = document.activeElement;
      } else if (previousActiveElement.current) {
        previousActiveElement.current.focus();
      }
    }, [open]);
    React4.useEffect(() => {
      if (!open || !initialFocus) return;
      const focusElement = () => {
        if (typeof initialFocus === "string") {
          const element = dialogRef.current?.querySelector(initialFocus);
          element?.focus();
        } else if (initialFocus.current) {
          initialFocus.current.focus();
        }
      };
      setTimeout(focusElement, 10);
    }, [open, initialFocus]);
    React4.useEffect(() => {
      if (!open || !trapFocus) return;
      const handleTabKey = (event) => {
        if (event.key !== "Tab" || !dialogRef.current) return;
        const focusableElements = dialogRef.current.querySelectorAll(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];
        if (event.shiftKey) {
          if (document.activeElement === firstElement) {
            event.preventDefault();
            lastElement?.focus();
          }
        } else {
          if (document.activeElement === lastElement) {
            event.preventDefault();
            firstElement?.focus();
          }
        }
      };
      document.addEventListener("keydown", handleTabKey);
      return () => document.removeEventListener("keydown", handleTabKey);
    }, [open, trapFocus]);
    React4.useEffect(() => {
      if (open) {
        document.body.style.overflow = "hidden";
      } else {
        document.body.style.overflow = "";
      }
      return () => {
        document.body.style.overflow = "";
      };
    }, [open]);
    const handleBackdropClick = React4.useCallback(
      (event) => {
        if (closeOnBackdropClick && event.target === event.currentTarget) {
          onClose?.();
        }
      },
      [closeOnBackdropClick, onClose]
    );
    if (!open) return null;
    const backdropClassNames = [Dialog_default.backdrop, backdropClassName].filter(Boolean).join(" ");
    return /* @__PURE__ */ jsxRuntime.jsx(
      "div",
      {
        className: backdropClassNames,
        onClick: handleBackdropClick,
        role: "presentation",
        "aria-modal": "true",
        children: /* @__PURE__ */ jsxRuntime.jsx("div", { className: Dialog_default.dialogContainer, ref: dialogRef, role: "dialog", "aria-modal": "true", children: /* @__PURE__ */ jsxRuntime.jsx(Window, { ...windowProps, ref, active: true, onClose, children }) })
      }
    );
  }
);
Dialog.displayName = "Dialog";

// src/components/TitleBar/TitleBar.module.css
var TitleBar_default = {};
var TitleBar = React4.forwardRef(
  ({
    title,
    active = true,
    showControls = true,
    showClose = true,
    showMinimize = true,
    showMaximize = true,
    onClose,
    onMinimize,
    onMaximize,
    onDoubleClick,
    className = "",
    titleClassName = "",
    controlsClassName = "",
    draggable = false,
    onDragStart,
    rightContent
  }, ref) => {
    const titleBarClassNames = [
      TitleBar_default.titleBar,
      active ? TitleBar_default["titleBar--active"] : TitleBar_default["titleBar--inactive"],
      draggable ? TitleBar_default["titleBar--draggable"] : "",
      className
    ].filter(Boolean).join(" ");
    const titleTextClassNames = [TitleBar_default.titleText, titleClassName].filter(Boolean).join(" ");
    const controlsClassNames = [TitleBar_default.controls, controlsClassName].filter(Boolean).join(" ");
    const handleMouseDown = (event) => {
      if (draggable && onDragStart) {
        onDragStart(event);
      }
    };
    const renderControls = () => {
      if (!showControls) return null;
      const hasAnyControl = showClose && onClose || showMinimize && onMinimize || showMaximize && onMaximize;
      if (!hasAnyControl) return null;
      return /* @__PURE__ */ jsxRuntime.jsxs("div", { className: controlsClassNames, children: [
        showClose && onClose && /* @__PURE__ */ jsxRuntime.jsx(
          "button",
          {
            type: "button",
            className: `${TitleBar_default.controlButton} ${TitleBar_default["controlButton--close"]}`,
            onClick: onClose,
            "aria-label": "Close",
            title: "Close",
            children: /* @__PURE__ */ jsxRuntime.jsx("div", { className: TitleBar_default.closeBox })
          }
        ),
        showMinimize && onMinimize && /* @__PURE__ */ jsxRuntime.jsx(
          "button",
          {
            type: "button",
            className: `${TitleBar_default.controlButton} ${TitleBar_default["controlButton--minimize"]}`,
            onClick: onMinimize,
            "aria-label": "Minimize",
            title: "Minimize",
            children: /* @__PURE__ */ jsxRuntime.jsx("div", { className: TitleBar_default.minimizeBox })
          }
        ),
        showMaximize && onMaximize && /* @__PURE__ */ jsxRuntime.jsx(
          "button",
          {
            type: "button",
            className: `${TitleBar_default.controlButton} ${TitleBar_default["controlButton--maximize"]}`,
            onClick: onMaximize,
            "aria-label": "Maximize",
            title: "Maximize",
            children: /* @__PURE__ */ jsxRuntime.jsx("div", { className: TitleBar_default.maximizeBox })
          }
        )
      ] });
    };
    return /* @__PURE__ */ jsxRuntime.jsxs(
      "div",
      {
        ref,
        className: titleBarClassNames,
        onDoubleClick,
        onMouseDown: handleMouseDown,
        role: "banner",
        children: [
          renderControls(),
          /* @__PURE__ */ jsxRuntime.jsx("div", { className: titleTextClassNames, children: title }),
          rightContent && /* @__PURE__ */ jsxRuntime.jsx("div", { className: TitleBar_default.rightContent, children: rightContent })
        ]
      }
    );
  }
);
TitleBar.displayName = "TitleBar";

// src/components/MenuBar/MenuBar.module.css
var MenuBar_default = {};
var MenuBar = React4.forwardRef(
  ({ menus, openMenuIndex, onMenuOpen, onMenuClose, className = "", dropdownClassName = "" }, ref) => {
    const [menuBarElement, setMenuBarElement] = React4.useState(null);
    const [focusedIndex, setFocusedIndex] = React4.useState(-1);
    React4.useEffect(() => {
      if (openMenuIndex === void 0 || !menuBarElement) return;
      const handleClickOutside = (event) => {
        if (menuBarElement && !menuBarElement.contains(event.target)) {
          onMenuClose?.();
        }
      };
      document.addEventListener("mousedown", handleClickOutside);
      return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [openMenuIndex, onMenuClose, menuBarElement]);
    React4.useEffect(() => {
      if (openMenuIndex === void 0) return;
      const handleEscape = (event) => {
        if (event.key === "Escape") {
          event.preventDefault();
          onMenuClose?.();
        }
      };
      document.addEventListener("keydown", handleEscape);
      return () => document.removeEventListener("keydown", handleEscape);
    }, [openMenuIndex, onMenuClose]);
    const handleKeyDown = React4.useCallback(
      (event) => {
        switch (event.key) {
          case "ArrowLeft":
            event.preventDefault();
            if (openMenuIndex !== void 0) {
              const prevIndex = openMenuIndex > 0 ? openMenuIndex - 1 : menus.length - 1;
              if (!menus[prevIndex]?.disabled) {
                onMenuOpen?.(prevIndex);
              }
            } else if (focusedIndex > 0) {
              setFocusedIndex(focusedIndex - 1);
            }
            break;
          case "ArrowRight":
            event.preventDefault();
            if (openMenuIndex !== void 0) {
              const nextIndex = openMenuIndex < menus.length - 1 ? openMenuIndex + 1 : 0;
              if (!menus[nextIndex]?.disabled) {
                onMenuOpen?.(nextIndex);
              }
            } else if (focusedIndex < menus.length - 1) {
              setFocusedIndex(focusedIndex + 1);
            }
            break;
          case "ArrowDown":
            event.preventDefault();
            if (openMenuIndex === void 0 && focusedIndex >= 0) {
              if (!menus[focusedIndex]?.disabled) {
                onMenuOpen?.(focusedIndex);
              }
            }
            break;
          case "Enter":
          case " ":
            event.preventDefault();
            if (openMenuIndex === void 0 && focusedIndex >= 0) {
              if (!menus[focusedIndex]?.disabled) {
                onMenuOpen?.(focusedIndex);
              }
            }
            break;
        }
      },
      [openMenuIndex, focusedIndex, menus, onMenuOpen, onMenuClose]
    );
    const handleMenuClick = (index) => {
      if (menus[index]?.disabled) return;
      if (openMenuIndex === index) {
        onMenuClose?.();
      } else {
        onMenuOpen?.(index);
      }
    };
    const menuBarClassNames = [MenuBar_default.menuBar, className].filter(Boolean).join(" ");
    const dropdownClassNames = [MenuBar_default.dropdown, dropdownClassName].filter(Boolean).join(" ");
    const handleRef = React4.useCallback(
      (node) => {
        setMenuBarElement(node);
        if (typeof ref === "function") {
          ref(node);
        }
      },
      [ref]
    );
    return /* @__PURE__ */ jsxRuntime.jsx("div", { ref: handleRef, className: menuBarClassNames, role: "menubar", onKeyDown: handleKeyDown, children: menus.map((menu, index) => {
      const isOpen = openMenuIndex === index;
      const menuButtonClassNames = [
        MenuBar_default.menuButton,
        isOpen ? MenuBar_default["menuButton--open"] : "",
        menu.disabled ? MenuBar_default["menuButton--disabled"] : ""
      ].filter(Boolean).join(" ");
      return /* @__PURE__ */ jsxRuntime.jsxs("div", { className: MenuBar_default.menuContainer, children: [
        /* @__PURE__ */ jsxRuntime.jsx(
          "button",
          {
            type: "button",
            className: menuButtonClassNames,
            onClick: () => handleMenuClick(index),
            onFocus: () => setFocusedIndex(index),
            onBlur: () => setFocusedIndex(-1),
            disabled: menu.disabled,
            "aria-haspopup": "true",
            "aria-expanded": isOpen,
            "aria-disabled": menu.disabled,
            children: menu.label
          }
        ),
        isOpen && /* @__PURE__ */ jsxRuntime.jsx("div", { className: dropdownClassNames, role: "menu", children: menu.items })
      ] }, index);
    }) });
  }
);
MenuBar.displayName = "MenuBar";

// src/components/MenuBar/MenuItem.module.css
var MenuItem_default = {};
var MenuItem = React4.forwardRef(
  ({
    label,
    shortcut,
    disabled = false,
    selected = false,
    separator = false,
    checked = false,
    icon,
    onClick,
    onFocus,
    onBlur,
    className = "",
    hasSubmenu = false
  }, ref) => {
    const menuItemClassNames = [
      MenuItem_default.menuItem,
      selected ? MenuItem_default["menuItem--selected"] : "",
      disabled ? MenuItem_default["menuItem--disabled"] : "",
      separator ? MenuItem_default["menuItem--separator"] : "",
      className
    ].filter(Boolean).join(" ");
    const handleClick = (event) => {
      if (disabled) {
        event.preventDefault();
        return;
      }
      onClick?.(event);
    };
    return /* @__PURE__ */ jsxRuntime.jsxs(jsxRuntime.Fragment, { children: [
      /* @__PURE__ */ jsxRuntime.jsxs(
        "button",
        {
          ref,
          type: "button",
          className: menuItemClassNames,
          onClick: handleClick,
          onFocus,
          onBlur,
          disabled,
          role: "menuitem",
          "aria-disabled": disabled,
          "aria-checked": checked ? "true" : void 0,
          children: [
            /* @__PURE__ */ jsxRuntime.jsx("span", { className: MenuItem_default.checkmark, children: checked && "\u2713" }),
            icon && /* @__PURE__ */ jsxRuntime.jsx("span", { className: MenuItem_default.icon, children: icon }),
            /* @__PURE__ */ jsxRuntime.jsx("span", { className: MenuItem_default.label, children: label }),
            shortcut && /* @__PURE__ */ jsxRuntime.jsx("span", { className: MenuItem_default.shortcut, children: shortcut }),
            hasSubmenu && /* @__PURE__ */ jsxRuntime.jsx("span", { className: MenuItem_default.submenuArrow, children: "\u25B6" })
          ]
        }
      ),
      separator && /* @__PURE__ */ jsxRuntime.jsx("div", { className: MenuItem_default.separatorLine, role: "separator" })
    ] });
  }
);
MenuItem.displayName = "MenuItem";

// src/components/Scrollbar/Scrollbar.module.css
var Scrollbar_default = {};
var Scrollbar = React4.forwardRef(
  ({
    orientation = "vertical",
    value = 0,
    viewportRatio = 0.2,
    onChange,
    className = "",
    disabled = false
  }, ref) => {
    const trackRef = React4.useRef(null);
    const [isDragging, setIsDragging] = React4.useState(false);
    const [dragStartPos, setDragStartPos] = React4.useState(0);
    const [dragStartValue, setDragStartValue] = React4.useState(0);
    const isVertical = orientation === "vertical";
    const thumbSize = Math.max(viewportRatio * 100, 10);
    const maxThumbPos = 100 - thumbSize;
    const thumbPos = value * maxThumbPos;
    const classNames = [
      Scrollbar_default.scrollbar,
      Scrollbar_default[`scrollbar--${orientation}`],
      disabled && Scrollbar_default["scrollbar--disabled"],
      className
    ].filter(Boolean).join(" ");
    const handleDecrement = React4.useCallback(() => {
      if (disabled || !onChange) return;
      const newValue = Math.max(0, value - 0.1);
      onChange(newValue);
    }, [disabled, onChange, value]);
    const handleIncrement = React4.useCallback(() => {
      if (disabled || !onChange) return;
      const newValue = Math.min(1, value + 0.1);
      onChange(newValue);
    }, [disabled, onChange, value]);
    const handleTrackClick = React4.useCallback(
      (event) => {
        if (disabled || !onChange || !trackRef.current) return;
        const rect = trackRef.current.getBoundingClientRect();
        const clickPos = isVertical ? event.clientY - rect.top : event.clientX - rect.left;
        const trackSize = isVertical ? rect.height : rect.width;
        const clickRatio = clickPos / trackSize;
        const newValue = Math.max(0, Math.min(1, clickRatio));
        onChange(newValue);
      },
      [disabled, onChange, isVertical]
    );
    const handleThumbMouseDown = React4.useCallback(
      (event) => {
        if (disabled) return;
        event.preventDefault();
        event.stopPropagation();
        setIsDragging(true);
        setDragStartPos(isVertical ? event.clientY : event.clientX);
        setDragStartValue(value);
      },
      [disabled, isVertical, value]
    );
    React4.useEffect(() => {
      if (!isDragging || !onChange || !trackRef.current) return;
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
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
      return () => {
        document.removeEventListener("mousemove", handleMouseMove);
        document.removeEventListener("mouseup", handleMouseUp);
      };
    }, [isDragging, dragStartPos, dragStartValue, onChange, isVertical]);
    return /* @__PURE__ */ jsxRuntime.jsxs("div", { ref, className: classNames, children: [
      /* @__PURE__ */ jsxRuntime.jsx(
        "button",
        {
          type: "button",
          className: `${Scrollbar_default.arrow} ${Scrollbar_default["arrow--start"]}`,
          onClick: handleDecrement,
          disabled,
          "aria-label": isVertical ? "Scroll up" : "Scroll left",
          children: /* @__PURE__ */ jsxRuntime.jsx("div", { className: Scrollbar_default.arrowIcon })
        }
      ),
      /* @__PURE__ */ jsxRuntime.jsx(
        "div",
        {
          ref: trackRef,
          className: Scrollbar_default.track,
          onClick: handleTrackClick,
          role: "scrollbar",
          "aria-valuenow": Math.round(value * 100),
          "aria-valuemin": 0,
          "aria-valuemax": 100,
          "aria-orientation": orientation,
          children: /* @__PURE__ */ jsxRuntime.jsx(
            "div",
            {
              className: Scrollbar_default.thumb,
              style: {
                [isVertical ? "height" : "width"]: `${thumbSize}%`,
                [isVertical ? "top" : "left"]: `${thumbPos}%`
              },
              onMouseDown: handleThumbMouseDown
            }
          )
        }
      ),
      /* @__PURE__ */ jsxRuntime.jsx(
        "button",
        {
          type: "button",
          className: `${Scrollbar_default.arrow} ${Scrollbar_default["arrow--end"]}`,
          onClick: handleIncrement,
          disabled,
          "aria-label": isVertical ? "Scroll down" : "Scroll right",
          children: /* @__PURE__ */ jsxRuntime.jsx("div", { className: Scrollbar_default.arrowIcon })
        }
      )
    ] });
  }
);
Scrollbar.displayName = "Scrollbar";

// src/components/ListView/ListView.module.css
var ListView_default = {};
var ListView = React4.forwardRef(
  ({
    columns,
    items,
    selectedIds = [],
    onSelectionChange,
    onItemOpen,
    onSort,
    className = "",
    height = "auto"
  }, ref) => {
    const [sortColumn, setSortColumn] = React4.useState(null);
    const [sortDirection, setSortDirection] = React4.useState("asc");
    const classNames = [ListView_default.listView, className].filter(Boolean).join(" ");
    const handleColumnClick = React4.useCallback(
      (columnKey, sortable = true) => {
        if (!sortable || !onSort) return;
        const newDirection = sortColumn === columnKey && sortDirection === "asc" ? "desc" : "asc";
        setSortColumn(columnKey);
        setSortDirection(newDirection);
        onSort(columnKey, newDirection);
      },
      [sortColumn, sortDirection, onSort]
    );
    const handleRowClick = React4.useCallback(
      (itemId, event) => {
        if (!onSelectionChange) return;
        if (event.metaKey || event.ctrlKey) {
          if (selectedIds.includes(itemId)) {
            onSelectionChange(selectedIds.filter((id) => id !== itemId));
          } else {
            onSelectionChange([...selectedIds, itemId]);
          }
        } else if (event.shiftKey && selectedIds.length > 0) {
          const lastSelectedId = selectedIds[selectedIds.length - 1];
          const lastIndex = items.findIndex((item) => item.id === lastSelectedId);
          const currentIndex = items.findIndex((item) => item.id === itemId);
          const start = Math.min(lastIndex, currentIndex);
          const end = Math.max(lastIndex, currentIndex);
          const rangeIds = items.slice(start, end + 1).map((item) => item.id);
          onSelectionChange(rangeIds);
        } else {
          onSelectionChange([itemId]);
        }
      },
      [selectedIds, items, onSelectionChange]
    );
    const handleRowDoubleClick = React4.useCallback(
      (item) => {
        if (onItemOpen) {
          onItemOpen(item);
        }
      },
      [onItemOpen]
    );
    const containerStyle = {};
    if (height !== "auto") {
      containerStyle.height = typeof height === "number" ? `${height}px` : height;
    }
    return /* @__PURE__ */ jsxRuntime.jsxs("div", { ref, className: classNames, style: containerStyle, children: [
      /* @__PURE__ */ jsxRuntime.jsx("div", { className: ListView_default.header, children: columns.map((column) => /* @__PURE__ */ jsxRuntime.jsxs(
        "div",
        {
          className: `${ListView_default.headerCell} ${column.sortable !== false ? ListView_default.sortable : ""}`,
          style: {
            width: typeof column.width === "number" ? `${column.width}px` : column.width
          },
          onClick: () => handleColumnClick(column.key, column.sortable),
          children: [
            column.label,
            sortColumn === column.key && /* @__PURE__ */ jsxRuntime.jsx("span", { className: ListView_default.sortIndicator, children: sortDirection === "asc" ? "\u25B2" : "\u25BC" })
          ]
        },
        column.key
      )) }),
      /* @__PURE__ */ jsxRuntime.jsx("div", { className: ListView_default.body, children: items.map((item) => {
        const isSelected = selectedIds.includes(item.id);
        return /* @__PURE__ */ jsxRuntime.jsx(
          "div",
          {
            className: `${ListView_default.row} ${isSelected ? ListView_default.selected : ""}`,
            onClick: (e) => handleRowClick(item.id, e),
            onDoubleClick: () => handleRowDoubleClick(item),
            children: columns.map((column, index) => /* @__PURE__ */ jsxRuntime.jsxs(
              "div",
              {
                className: ListView_default.cell,
                style: {
                  width: typeof column.width === "number" ? `${column.width}px` : column.width
                },
                children: [
                  index === 0 && item.icon && /* @__PURE__ */ jsxRuntime.jsx("span", { className: ListView_default.icon, children: item.icon }),
                  item[column.key]
                ]
              },
              column.key
            ))
          },
          item.id
        );
      }) })
    ] });
  }
);
ListView.displayName = "ListView";

// src/components/FolderList/FolderList.module.css
var FolderList_default = {};
var FolderList = React4.forwardRef(
  ({
    columns = [
      { key: "name", label: "Name", width: "40%" },
      { key: "modified", label: "Date Modified", width: "30%" },
      { key: "size", label: "Size", width: "30%" }
    ],
    items,
    selectedIds,
    onSelectionChange,
    onItemOpen,
    onSort,
    listHeight = 400,
    ...windowProps
  }, ref) => {
    return /* @__PURE__ */ jsxRuntime.jsx(Window, { ref, contentClassName: FolderList_default.folderListContent, ...windowProps, children: /* @__PURE__ */ jsxRuntime.jsx(
      ListView,
      {
        columns,
        items,
        selectedIds,
        onSelectionChange,
        onItemOpen,
        onSort,
        height: listHeight,
        className: FolderList_default.listView
      }
    ) });
  }
);
FolderList.displayName = "FolderList";
var SaveIcon = () => /* @__PURE__ */ jsxRuntime.jsx(Icon, { label: "Save", size: "sm", children: /* @__PURE__ */ jsxRuntime.jsx("path", { d: "M17 3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V7l-4-4zm-5 16c-1.66 0-3-1.34-3-3s1.34-3 3-3 3 1.34 3 3-1.34 3-3 3zm3-10H5V5h10v4z" }) });
var FolderIcon = () => /* @__PURE__ */ jsxRuntime.jsx(Icon, { label: "Folder", size: "sm", children: /* @__PURE__ */ jsxRuntime.jsx("path", { d: "M10 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2h-8l-2-2z" }) });
var CloseIcon = () => /* @__PURE__ */ jsxRuntime.jsx(Icon, { label: "Close", size: "sm", children: /* @__PURE__ */ jsxRuntime.jsx("path", { d: "M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" }) });
var ArrowRightIcon = () => /* @__PURE__ */ jsxRuntime.jsx(Icon, { label: "Arrow Right", size: "sm", children: /* @__PURE__ */ jsxRuntime.jsx("path", { d: "M12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8z" }) });
var ArrowLeftIcon = () => /* @__PURE__ */ jsxRuntime.jsx(Icon, { label: "Arrow Left", size: "sm", children: /* @__PURE__ */ jsxRuntime.jsx("path", { d: "M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z" }) });
var DownloadIcon = () => /* @__PURE__ */ jsxRuntime.jsx(Icon, { label: "Download", size: "sm", children: /* @__PURE__ */ jsxRuntime.jsx("path", { d: "M19 9h-4V3H9v6H5l7 7 7-7zM5 18v2h14v-2H5z" }) });
var LinkIcon = () => /* @__PURE__ */ jsxRuntime.jsx(Icon, { label: "Link", size: "sm", children: /* @__PURE__ */ jsxRuntime.jsx("path", { d: "M3.9 12c0-1.71 1.39-3.1 3.1-3.1h4V7H7c-2.76 0-5 2.24-5 5s2.24 5 5 5h4v-1.9H7c-1.71 0-3.1-1.39-3.1-3.1zM8 13h8v-2H8v2zm9-6h-4v1.9h4c1.71 0 3.1 1.39 3.1 3.1s-1.39 3.1-3.1 3.1h-4V17h4c2.76 0 5-2.24 5-5s-2.24-5-5-5z" }) });
var MailIcon = () => /* @__PURE__ */ jsxRuntime.jsx(Icon, { label: "Mail", size: "sm", children: /* @__PURE__ */ jsxRuntime.jsx("path", { d: "M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" }) });
var PrintIcon = () => /* @__PURE__ */ jsxRuntime.jsx(Icon, { label: "Print", size: "sm", children: /* @__PURE__ */ jsxRuntime.jsx("path", { d: "M19 8H5c-1.66 0-3 1.34-3 3v6h4v4h12v-4h4v-6c0-1.66-1.34-3-3-3zm-3 11H8v-5h8v5zm3-7c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1zm-1-9H6v4h12V3z" }) });
var TrashIcon = () => /* @__PURE__ */ jsxRuntime.jsx(Icon, { label: "Delete", size: "sm", children: /* @__PURE__ */ jsxRuntime.jsx("path", { d: "M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z" }) });
var SearchIcon = () => /* @__PURE__ */ jsxRuntime.jsx(Icon, { label: "Search", size: "sm", children: /* @__PURE__ */ jsxRuntime.jsx("path", { d: "M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z" }) });
var UserIcon = () => /* @__PURE__ */ jsxRuntime.jsx(Icon, { label: "User", size: "sm", children: /* @__PURE__ */ jsxRuntime.jsx("path", { d: "M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" }) });
var LockIcon = () => /* @__PURE__ */ jsxRuntime.jsx(Icon, { label: "Lock", size: "sm", children: /* @__PURE__ */ jsxRuntime.jsx("path", { d: "M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z" }) });
var CalendarIcon = () => /* @__PURE__ */ jsxRuntime.jsx(Icon, { label: "Calendar", size: "sm", children: /* @__PURE__ */ jsxRuntime.jsx("path", { d: "M19 3h-1V1h-2v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V8h14v11zM7 10h5v5H7z" }) });
var DocumentIcon = () => /* @__PURE__ */ jsxRuntime.jsx(Icon, { label: "Document", size: "sm", children: /* @__PURE__ */ jsxRuntime.jsx("path", { d: "M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z" }) });
var FileIcon = () => /* @__PURE__ */ jsxRuntime.jsx(Icon, { label: "File", size: "sm", children: /* @__PURE__ */ jsxRuntime.jsx("path", { d: "M8 16h8v2H8zm0-4h8v2H8zm6-10H6c-1.1 0-2 .9-2 2v16c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm4 18H6V4h7v5h5v11z" }) });
var ImageIcon = () => /* @__PURE__ */ jsxRuntime.jsx(Icon, { label: "Image", size: "sm", children: /* @__PURE__ */ jsxRuntime.jsx("path", { d: "M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z" }) });
var MusicIcon = () => /* @__PURE__ */ jsxRuntime.jsx(Icon, { label: "Music", size: "sm", children: /* @__PURE__ */ jsxRuntime.jsx("path", { d: "M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z" }) });
var VideoIcon = () => /* @__PURE__ */ jsxRuntime.jsx(Icon, { label: "Video", size: "sm", children: /* @__PURE__ */ jsxRuntime.jsx("path", { d: "M18 4l2 4h-3l-2-4h-2l2 4h-3l-2-4H8l2 4H7L5 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V4h-4z" }) });
var SettingsIcon = () => /* @__PURE__ */ jsxRuntime.jsx(Icon, { label: "Settings", size: "sm", children: /* @__PURE__ */ jsxRuntime.jsx("path", { d: "M19.14 12.94c.04-.3.06-.61.06-.94 0-.32-.02-.64-.07-.94l2.03-1.58c.18-.14.23-.41.12-.61l-1.92-3.32c-.12-.22-.37-.29-.59-.22l-2.39.96c-.5-.38-1.03-.7-1.62-.94L14.4 2.81c-.04-.24-.24-.41-.48-.41h-3.84c-.24 0-.43.17-.47.41l-.36 2.54c-.59.24-1.13.57-1.62.94l-2.39-.96c-.22-.08-.47 0-.59.22L2.74 8.87c-.12.21-.08.47.12.61l2.03 1.58c-.05.3-.09.63-.09.94s.02.64.07.94l-2.03 1.58c-.18.14-.23.41-.12.61l1.92 3.32c.12.22.37.29.59.22l2.39-.96c.5.38 1.03.7 1.62.94l.36 2.54c.05.24.24.41.48.41h3.84c.24 0 .44-.17.47-.41l.36-2.54c.59-.24 1.13-.56 1.62-.94l2.39.96c.22.08.47 0 .59-.22l1.92-3.32c.12-.22.07-.47-.12-.61l-2.01-1.58zM12 15.6c-1.98 0-3.6-1.62-3.6-3.6s1.62-3.6 3.6-3.6 3.6 1.62 3.6 3.6-1.62 3.6-3.6 3.6z" }) });
var HomeIcon = () => /* @__PURE__ */ jsxRuntime.jsx(Icon, { label: "Home", size: "sm", children: /* @__PURE__ */ jsxRuntime.jsx("path", { d: "M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" }) });
var StarIcon = () => /* @__PURE__ */ jsxRuntime.jsx(Icon, { label: "Star", size: "sm", children: /* @__PURE__ */ jsxRuntime.jsx("path", { d: "M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" }) });
var HeartIcon = () => /* @__PURE__ */ jsxRuntime.jsx(Icon, { label: "Heart", size: "sm", children: /* @__PURE__ */ jsxRuntime.jsx("path", { d: "M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" }) });
var InfoIcon = () => /* @__PURE__ */ jsxRuntime.jsx(Icon, { label: "Info", size: "sm", children: /* @__PURE__ */ jsxRuntime.jsx("path", { d: "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z" }) });
var WarningIcon = () => /* @__PURE__ */ jsxRuntime.jsx(Icon, { label: "Warning", size: "sm", children: /* @__PURE__ */ jsxRuntime.jsx("path", { d: "M1 21h22L12 2 1 21zm12-3h-2v-2h2v2zm0-4h-2v-4h2v4z" }) });
var ErrorIcon = () => /* @__PURE__ */ jsxRuntime.jsx(Icon, { label: "Error", size: "sm", children: /* @__PURE__ */ jsxRuntime.jsx("path", { d: "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z" }) });
var CheckIcon = () => /* @__PURE__ */ jsxRuntime.jsx(Icon, { label: "Check", size: "sm", children: /* @__PURE__ */ jsxRuntime.jsx("path", { d: "M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" }) });
var PlusIcon = () => /* @__PURE__ */ jsxRuntime.jsx(Icon, { label: "Plus", size: "sm", children: /* @__PURE__ */ jsxRuntime.jsx("path", { d: "M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z" }) });
var MinusIcon = () => /* @__PURE__ */ jsxRuntime.jsx(Icon, { label: "Minus", size: "sm", children: /* @__PURE__ */ jsxRuntime.jsx("path", { d: "M19 13H5v-2h14v2z" }) });
var RefreshIcon = () => /* @__PURE__ */ jsxRuntime.jsx(Icon, { label: "Refresh", size: "sm", children: /* @__PURE__ */ jsxRuntime.jsx("path", { d: "M17.65 6.35C16.2 4.9 14.21 4 12 4c-4.42 0-7.99 3.58-7.99 8s3.57 8 7.99 8c3.73 0 6.84-2.55 7.73-6h-2.08c-.82 2.33-3.04 4-5.65 4-3.31 0-6-2.69-6-6s2.69-6 6-6c1.66 0 3.14.69 4.22 1.78L13 11h7V4l-2.35 2.35z" }) });
var MenuIcon = () => /* @__PURE__ */ jsxRuntime.jsx(Icon, { label: "Menu", size: "sm", children: /* @__PURE__ */ jsxRuntime.jsx("path", { d: "M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z" }) });
var MoreIcon = () => /* @__PURE__ */ jsxRuntime.jsx(Icon, { label: "More", size: "sm", children: /* @__PURE__ */ jsxRuntime.jsx("path", { d: "M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z" }) });
var ChevronUpIcon = () => /* @__PURE__ */ jsxRuntime.jsx(Icon, { label: "Chevron Up", size: "sm", children: /* @__PURE__ */ jsxRuntime.jsx("path", { d: "M12 8l-6 6 1.41 1.41L12 10.83l4.59 4.58L18 14z" }) });
var ChevronDownIcon = () => /* @__PURE__ */ jsxRuntime.jsx(Icon, { label: "Chevron Down", size: "sm", children: /* @__PURE__ */ jsxRuntime.jsx("path", { d: "M16.59 8.59L12 13.17 7.41 8.59 6 10l6 6 6-6z" }) });
var EyeIcon = () => /* @__PURE__ */ jsxRuntime.jsx(Icon, { label: "Eye", size: "sm", children: /* @__PURE__ */ jsxRuntime.jsx("path", { d: "M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z" }) });

// src/tokens/index.ts
var colors = {
  // Grayscale palette (Figma style IDs included for reference)
  gray100: "#FFFFFF",
  // 18:47 - White
  gray200: "#EEEEEE",
  // 19:2507 - Base UI background
  gray300: "#DDDDDD",
  // 18:60 - Inferred mid-tone
  gray400: "#CCCCCC",
  // 18:1970 - Inferred mid-tone
  gray500: "#999999",
  // 20:7306 - Inferred mid-tone
  gray600: "#666666",
  // 18:52 - Inferred dark tone
  gray700: "#4D4D4D",
  // 18:46 - Inferred dark tone
  gray800: "#333333",
  // 45:184845 - Inferred very dark
  gray900: "#262626",
  // 18:48 - Black (strokes, borders, text)
  // Accent colors
  lavender: "#CCCCFF",
  // 60:134029 - Cover background
  azul: "#0066CC",
  // 49:36229 - Accent (inferred)
  linkRed: "#CC0000",
  // 102:398, 102:3935 - Link color (inferred)
  // Semantic mappings
  background: "#EEEEEE",
  // Gray 200
  foreground: "#262626",
  // Gray 900
  border: "#262626",
  // Gray 900
  text: "#262626",
  // Gray 900
  textInverse: "#FFFFFF",
  // Gray 100
  surface: "#EEEEEE",
  // Gray 200
  surfaceInset: "#FFFFFF",
  // Gray 100 (for inset areas)
  // Legacy names for compatibility
  black: "#262626",
  white: "#FFFFFF",
  // Status colors (Mac OS 9 style)
  focus: "#000080",
  error: "#CC0000",
  success: "#008000",
  warning: "#FF8C00"
};
var typography = {
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
    mono: 'Monaco, "Monaco CY", "SF Mono", "Courier New", Courier, monospace'
  },
  fontSize: {
    xs: "9px",
    // Smallest UI text (9pt Chicago/Charcoal)
    sm: "10px",
    // Small labels (10pt)
    md: "12px",
    // Standard UI text - Mac OS 9 default (12pt)
    lg: "13px",
    // Slightly larger UI text
    xl: "14px",
    // Large UI text
    "2xl": "16px",
    // Headings
    "3xl": "18px",
    // Large headings
    "4xl": "20px",
    // Major headings
    "5xl": "24px"
    // Display text
  },
  fontWeight: {
    normal: 700,
    // Charcoal Bold is the Mac OS 9 default
    medium: 700,
    // Medium (same as bold for Charcoal)
    semibold: 700,
    // Semibold (same as bold)
    bold: 700,
    // Bold weight
    light: 400
    // Light weight (regular Charcoal)
  },
  lineHeight: {
    tight: 1.2,
    // Tight leading (Mac OS 9 style)
    snug: 1.3,
    // Snug
    normal: 1.4,
    // Normal (Mac OS 9 used tighter line heights)
    relaxed: 1.5,
    // Relaxed
    loose: 1.6
    // Loose
  },
  letterSpacing: {
    tighter: "-0.02em",
    // Slightly tighter
    tight: "-0.01em",
    // Tight
    normal: "0",
    // Normal - Mac OS 9 default
    wide: "0.01em",
    // Wide
    wider: "0.02em"
    // Wider
  }
};
var spacing = {
  "0": "0",
  px: "1px",
  "0.5": "2px",
  // Minimal spacing
  "1": "4px",
  // Base grid unit
  "1.5": "6px",
  "2": "8px",
  "2.5": "10px",
  "3": "12px",
  "4": "16px",
  "5": "20px",
  "6": "24px",
  "8": "32px",
  "10": "40px",
  "12": "48px",
  "16": "64px",
  // Legacy names
  xs: "2px",
  sm: "4px",
  md: "8px",
  lg: "12px",
  xl: "16px",
  "2xl": "24px",
  "3xl": "32px"
};
var shadows = {
  // Standard raised bevel (default button state)
  bevel: "inset 2px 2px 0 rgba(255, 255, 255, 0.6), inset -2px -2px 0 rgba(38, 38, 38, 0.4), 2px 2px 0 rgba(38, 38, 38, 1)",
  // Inverted bevel for pressed/inset states
  inset: "inset -2px -2px 0 rgba(255, 255, 255, 0.6), inset 2px 2px 0 rgba(38, 38, 38, 0.4), 2px 2px 0 rgba(38, 38, 38, 1)",
  // Individual layers for custom composition
  dropShadow: "2px 2px 0 rgba(38, 38, 38, 1)",
  innerHighlight: "inset 2px 2px 0 rgba(255, 255, 255, 0.6)",
  innerShadow: "inset -2px -2px 0 rgba(38, 38, 38, 0.4)",
  // Legacy format for compatibility
  raised: {
    highlight: "inset 2px 2px 0 rgba(255, 255, 255, 0.6)",
    shadow: "inset -2px -2px 0 rgba(38, 38, 38, 0.4)",
    full: "inset 2px 2px 0 rgba(255, 255, 255, 0.6), inset -2px -2px 0 rgba(38, 38, 38, 0.4), 2px 2px 0 rgba(38, 38, 38, 1)"
  },
  // No shadow (flat)
  none: "none"
};
var borders = {
  width: {
    none: "0",
    thin: "1px",
    medium: "2px",
    thick: "3px"
  },
  style: {
    solid: "solid",
    dashed: "dashed",
    dotted: "dotted",
    none: "none"
  },
  radius: {
    none: "0",
    // Mac OS 9 always used square corners
    sm: "0",
    // Kept for API consistency
    md: "0",
    lg: "0",
    full: "0"
  }
};
var zIndex = {
  base: 0,
  dropdown: 1e3,
  sticky: 1100,
  modal: 1200,
  popover: 1300,
  tooltip: 1400
};
var transitions = {
  duration: {
    instant: "0ms",
    fast: "100ms",
    normal: "200ms",
    slow: "300ms"
  },
  timing: {
    linear: "linear",
    easeIn: "cubic-bezier(0.4, 0, 1, 1)",
    easeOut: "cubic-bezier(0, 0, 0.2, 1)",
    easeInOut: "cubic-bezier(0.4, 0, 0.2, 1)"
  }
};
var tokens = {
  colors,
  typography,
  spacing,
  borders,
  shadows,
  zIndex,
  transitions
};

exports.ArrowLeftIcon = ArrowLeftIcon;
exports.ArrowRightIcon = ArrowRightIcon;
exports.Button = Button;
exports.CalendarIcon = CalendarIcon;
exports.CheckIcon = CheckIcon;
exports.Checkbox = Checkbox;
exports.ChevronDownIcon = ChevronDownIcon;
exports.ChevronUpIcon = ChevronUpIcon;
exports.CloseIcon = CloseIcon;
exports.Dialog = Dialog;
exports.DocumentIcon = DocumentIcon;
exports.DownloadIcon = DownloadIcon;
exports.ErrorIcon = ErrorIcon;
exports.EyeIcon = EyeIcon;
exports.FileIcon = FileIcon;
exports.FolderIcon = FolderIcon;
exports.FolderList = FolderList;
exports.HeartIcon = HeartIcon;
exports.HomeIcon = HomeIcon;
exports.Icon = Icon;
exports.IconButton = IconButton;
exports.ImageIcon = ImageIcon;
exports.InfoIcon = InfoIcon;
exports.LinkIcon = LinkIcon;
exports.ListView = ListView;
exports.LockIcon = LockIcon;
exports.MailIcon = MailIcon;
exports.MenuBar = MenuBar;
exports.MenuIcon = MenuIcon;
exports.MenuItem = MenuItem;
exports.MinusIcon = MinusIcon;
exports.MoreIcon = MoreIcon;
exports.MusicIcon = MusicIcon;
exports.PlusIcon = PlusIcon;
exports.PrintIcon = PrintIcon;
exports.Radio = Radio;
exports.RefreshIcon = RefreshIcon;
exports.SaveIcon = SaveIcon;
exports.Scrollbar = Scrollbar;
exports.SearchIcon = SearchIcon;
exports.Select = Select;
exports.SettingsIcon = SettingsIcon;
exports.StarIcon = StarIcon;
exports.TabPanel = TabPanel;
exports.Tabs = Tabs;
exports.TextField = TextField;
exports.TitleBar = TitleBar;
exports.TrashIcon = TrashIcon;
exports.UserIcon = UserIcon;
exports.VideoIcon = VideoIcon;
exports.WarningIcon = WarningIcon;
exports.Window = Window;
exports.borders = borders;
exports.colors = colors;
exports.shadows = shadows;
exports.spacing = spacing;
exports.tokens = tokens;
exports.transitions = transitions;
exports.typography = typography;
exports.zIndex = zIndex;
//# sourceMappingURL=index.cjs.map
//# sourceMappingURL=index.cjs.map