// Mac OS 9 Design Tokens
// These will be populated from Figma design file

/**
 * Color tokens for Mac OS 9 UI
 */
export const colors = {
	// Base grays (to be extracted from Figma)
	gray100: '#ffffff',
	gray200: '#f0f0f0',
	gray300: '#e0e0e0',
	gray400: '#d0d0d0',
	gray500: '#c0c0c0', // Classic Mac OS 9 gray
	gray600: '#a0a0a0',
	gray700: '#808080',
	gray800: '#606060',
	gray900: '#000000',

	// Accent colors (to be extracted from Figma)
	black: '#000000',
	white: '#ffffff',

	// Status colors
	focus: '#000080', // Classic Windows blue focus
	error: '#ff0000',
	success: '#008000',
	warning: '#ff8c00',
} as const;

/**
 * Typography tokens
 */
export const typography = {
	fontFamily: {
		system: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
		chicago: 'Chicago, "Chicago Classic", monospace',
		geneva: 'Geneva, sans-serif',
	},
	fontSize: {
		xs: '10px',
		sm: '11px',
		md: '12px',
		lg: '13px',
		xl: '14px',
	},
	fontWeight: {
		normal: 400,
		bold: 700,
	},
	lineHeight: {
		tight: 1.2,
		normal: 1.5,
		relaxed: 1.75,
	},
} as const;

/**
 * Spacing tokens (to be refined from Figma)
 */
export const spacing = {
	xs: '2px',
	sm: '4px',
	md: '8px',
	lg: '12px',
	xl: '16px',
	'2xl': '24px',
	'3xl': '32px',
} as const;

/**
 * Border tokens
 */
export const borders = {
	width: {
		thin: '1px',
		medium: '2px',
		thick: '3px',
	},
	radius: {
		none: '0',
		sm: '2px',
		md: '4px',
	},
} as const;

/**
 * Shadow tokens for Mac OS 9 bevel effects
 */
export const shadows = {
	// Raised bevel (light top-left, dark bottom-right)
	raised: {
		highlight: 'inset 1px 1px 0 rgba(255, 255, 255, 0.9)',
		shadow: 'inset -1px -1px 0 rgba(0, 0, 0, 0.3)',
		full: 'inset 1px 1px 0 rgba(255, 255, 255, 0.9), inset -1px -1px 0 rgba(0, 0, 0, 0.3)',
	},
	// Pressed/inset bevel (dark top-left, light bottom-right)
	inset: {
		shadow: 'inset 1px 1px 0 rgba(0, 0, 0, 0.3)',
		highlight: 'inset -1px -1px 0 rgba(255, 255, 255, 0.9)',
		full: 'inset 1px 1px 0 rgba(0, 0, 0, 0.3), inset -1px -1px 0 rgba(255, 255, 255, 0.9)',
	},
} as const;

/**
 * Z-index tokens for layering
 */
export const zIndex = {
	base: 0,
	dropdown: 1000,
	sticky: 1100,
	modal: 1200,
	popover: 1300,
	tooltip: 1400,
} as const;

// Export all tokens as a single object
export const tokens = {
	colors,
	typography,
	spacing,
	borders,
	shadows,
	zIndex,
} as const;

export default tokens;