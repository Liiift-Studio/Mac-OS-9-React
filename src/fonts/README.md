# Mac OS 9 Fonts

This directory contains font files and Google Fonts imports for authentic Mac OS 9 typography.

## Font Loading Strategy

This library uses a hybrid approach:
- **Google Fonts**: IBM Plex Sans, IBM Plex Mono, and EB Garamond (loaded via CSS `@import`)
- **Local Font**: Chicago (ChicagoFLF.ttf - included in repository)
- **Optional Local Font**: Charcoal (user-provided)

## Directory Structure

```
src/fonts/
├── chicago/           # Classic Mac OS menu bar font (INCLUDED)
│   ├── ChicagoFLF.ttf
│   └── LICENSE
├── charcoal/          # Optional: Primary system UI font (user-provided)
├── fonts.css          # Font imports and @font-face declarations
└── README.md          # This file
```

## Font Details

### Chicago (Included) ✅
**Directory**: `chicago/`
- **File**: `ChicagoFLF.ttf` (included in repository)
- **Source**: [Font Library - ChicagoFLF](https://fontlibrary.org/en/font/chicagoflf)
- **License**: Public Domain (completely free to use)
- **Usage**: Menu bar, classic Mac OS headers
- **Status**: ✅ Ready to use

### IBM Plex Sans (Google Fonts) ✅
- **Source**: Google Fonts (loaded via CSS `@import`)
- **License**: SIL Open Font License (OFL) - free and open source
- **Usage**: Body text, secondary UI elements
- **Alternative to**: Geneva
- **Status**: ✅ Automatically loaded

### IBM Plex Mono (Google Fonts) ✅
- **Source**: Google Fonts (loaded via CSS `@import`)
- **License**: SIL Open Font License (OFL) - free and open source
- **Usage**: Code, fixed-width text
- **Alternative to**: Monaco
- **Status**: ✅ Automatically loaded

### EB Garamond (Google Fonts) ✅
- **Source**: Google Fonts (loaded via CSS `@import`)
- **License**: SIL Open Font License (OFL) - free and open source
- **Usage**: Headlines, editorial content
- **Alternative to**: Apple Garamond
- **Status**: ✅ Automatically loaded

### Charcoal (Optional - User Provided) ⚠️
**Directory**: `charcoal/`
- **Status**: NOT included in repository
- **Usage**: Primary system UI font (menus, buttons, dialogs)
- **How to add**:
  1. Obtain a licensed copy of Charcoal font
  2. Convert to web formats (WOFF2, WOFF, TTF recommended)
  3. Place files in `src/fonts/charcoal/` directory
  4. Update `src/fonts/fonts.css` to add appropriate `@font-face` declarations

**Note**: Without Charcoal, the library will fall back to system fonts defined in `theme.css`.

## Usage

### In Your Application

Fonts are automatically loaded when you import the library styles:

```tsx
// Import the component library (includes fonts)
import '@liiift-studio/mac-os9-ui/styles';

// Or import fonts separately if needed
import '../fonts/fonts.css';
```

### CSS Custom Properties

Use these CSS variables defined in `theme.css`:

```css
.my-element {
	font-family: var(--font-system);  /* Charcoal (with fallbacks) */
	font-family: var(--font-body);    /* IBM Plex Sans */
	font-family: var(--font-chicago); /* Chicago */
	font-family: var(--font-mono);    /* IBM Plex Mono */
	font-family: var(--font-display); /* EB Garamond */
}
```

### In Storybook

Fonts are automatically loaded via the Storybook preview configuration.

## Testing Font Loading

To verify fonts are loading correctly:

### Browser DevTools - Network Tab
1. Open browser DevTools (F12)
2. Go to **Network** tab
3. Filter by "Font" or "CSS"
4. Reload page
5. Confirm you see:
   - Google Fonts CSS file loading
   - `ChicagoFLF.ttf` loading from local assets

### Browser DevTools - Computed Styles
1. Open browser DevTools (F12)
2. Go to **Elements** tab
3. Select an element with text
4. Go to **Computed** tab
5. Check `font-family` - should show:
   - "IBM Plex Sans" for body text
   - "Chicago" for menu bar elements
   - "IBM Plex Mono" for code/monospace
   - "EB Garamond" for display text

### Browser DevTools - Console
If fonts fail to load, check the Console tab for errors like:
- CORS errors (Google Fonts should not have this)
- 404 errors (missing font files)
- Failed to decode font errors (corrupted files)

## Fallback Behavior

All font stacks include system fallbacks:

```css
--font-system: 'Charcoal', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
--font-body: 'IBM Plex Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
--font-chicago: 'Chicago', 'Chicago Classic', 'Charcoal CY', Charcoal, monospace;
--font-mono: 'IBM Plex Mono', Monaco, 'Courier New', monospace;
--font-display: 'EB Garamond', Garamond, Georgia, serif;
```

This ensures text remains readable even if fonts fail to load.

## License Summary

| Font | License | Included | Cost |
|------|---------|----------|------|
| ChicagoFLF | Public Domain | ✅ Yes | Free |
| IBM Plex Sans | SIL OFL | ✅ Via CDN | Free |
| IBM Plex Mono | SIL OFL | ✅ Via CDN | Free |
| EB Garamond | SIL OFL | ✅ Via CDN | Free |
| Charcoal | Proprietary Apple | ❌ No | User-provided |

## Troubleshooting

### Fonts appear as Times New Roman or monospace
- **Cause**: Fonts not loading properly
- **Solution**: Check browser Network tab for failed font loads
- **Check**: Ensure `fonts.css` is imported in your application

### Google Fonts blocked by Content Security Policy
- **Cause**: Strict CSP headers blocking external fonts
- **Solution**: Add to CSP header:
  ```
  font-src 'self' https://fonts.gstatic.com;
  style-src 'self' https://fonts.googleapis.com;
  ```

### ChicagoFLF.ttf 404 error
- **Cause**: Font file not found or incorrect path
- **Solution**: Verify `src/fonts/chicago/ChicagoFLF.ttf` exists
- **Check**: Ensure build process includes font files in output

### Performance concerns with Google Fonts
- **Solution**: Consider downloading fonts and self-hosting
- **Steps**:
  1. Download fonts from Google Fonts
  2. Place in respective directories (ibm-plex-sans, ibm-plex-mono, eb-garamond)
  3. Replace `@import` in fonts.css with `@font-face` declarations
  4. Update paths to local font files