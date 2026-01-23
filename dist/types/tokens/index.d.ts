/**
 * Color tokens based on Mac OS 9 grayscale palette
 * Extracted from Figma styles and component analysis
 */
export declare const colors: {
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
export declare const typography: {
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
export declare const spacing: {
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
export declare const shadows: {
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
export declare const borders: {
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
export declare const zIndex: {
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
export declare const transitions: {
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
export declare const tokens: {
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
export default tokens;
