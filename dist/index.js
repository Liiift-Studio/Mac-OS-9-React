import { forwardRef } from 'react';
import { jsx } from 'react/jsx-runtime';

// src/components/Button/Button.module.css
var Button_default = {};
var Button = forwardRef(
  ({
    variant = "default",
    size = "md",
    disabled = false,
    fullWidth = false,
    className = "",
    children,
    type = "button",
    ...props
  }, ref) => {
    const classNames = [
      Button_default.button,
      Button_default[`button--${variant}`],
      Button_default[`button--${size}`],
      fullWidth && Button_default["button--full-width"],
      disabled && Button_default["button--disabled"],
      className
    ].filter(Boolean).join(" ");
    return /* @__PURE__ */ jsx(
      "button",
      {
        ref,
        type,
        className: classNames,
        disabled,
        "aria-disabled": disabled,
        ...props,
        children
      }
    );
  }
);
Button.displayName = "Button";

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
    // Mac OS 9 used Chicago for system UI, but we'll use modern equivalents
    system: '-apple-system, BlinkMacSystemFont, "Segoe UI", "Helvetica Neue", Arial, sans-serif',
    // Apple Garamond Light used for headlines in Figma
    display: 'Garamond, "Apple Garamond", Georgia, serif',
    // Classic Mac monospace
    mono: '"SF Mono", Monaco, "Courier New", monospace',
    // Fallbacks for classic Mac fonts
    chicago: 'Chicago, "Chicago Classic", monospace',
    geneva: "Geneva, sans-serif"
  },
  fontSize: {
    xs: "10px",
    // Small labels
    sm: "11px",
    // Body small
    md: "12px",
    // Standard UI text (Mac OS 9 used smaller text)
    lg: "13px",
    // Slightly larger
    xl: "14px",
    // Headings
    "2xl": "16px",
    // Large headings
    "3xl": "18px",
    // Section headers
    "4xl": "20px"
    // Major headings
  },
  fontWeight: {
    normal: 400,
    medium: 500,
    semibold: 600,
    bold: 700
  },
  lineHeight: {
    tight: 1.2,
    snug: 1.375,
    normal: 1.5,
    relaxed: 1.625,
    loose: 2
  },
  letterSpacing: {
    tighter: "-0.05em",
    tight: "-0.025em",
    normal: "0",
    wide: "0.025em",
    wider: "0.05em"
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

export { Button, borders, colors, shadows, spacing, tokens, transitions, typography, zIndex };
//# sourceMappingURL=index.js.map
//# sourceMappingURL=index.js.map