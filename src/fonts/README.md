# Mac OS 9 Fonts

This directory contains font files for authentic Mac OS 9 typography.

## Directory Structure

```
src/fonts/
├── charcoal/          # Primary system UI font
├── ibm-plex-sans/     # Body text and secondary UI (IBM Plex Sans)
├── chicago/           # Classic Mac OS menu bar font
├── ibm-plex-mono/     # Monospace font (IBM Plex Mono)
├── eb-garamond/       # Display/headline font (EB Garamond)
├── fonts.css          # @font-face declarations
└── README.md          # This file
```

## Required Font Files

To achieve authentic Mac OS 9 typography, place the following font files in their respective directories:

### Charcoal (Primary System Font)
**Directory**: `charcoal/`
- `Charcoal.ttf` or `Charcoal.woff2` (regular/bold)
- Used for: Buttons, menus, dialogs, primary UI elements

### IBM Plex Sans (Body Text)
**Directory**: `ibm-plex-sans/`
- `IBMPlexSans-Regular.ttf/woff2` (regular weight)
- `IBMPlexSans-Medium.ttf/woff2` (medium weight)
- `IBMPlexSans-Bold.ttf/woff2` (bold weight)
- Source: [Google Fonts - IBM Plex Sans](https://fonts.google.com/specimen/IBM+Plex+Sans)
- License: SIL Open Font License (OFL) - free and open source
- Used for: Body text, secondary UI elements
- Free alternative to Geneva

### Chicago (Classic Menu Bar)
**Directory**: `chicago/`
- `ChicagoFLF.ttf` (included - Chicago variant)
- Source: [Font Library - ChicagoFLF](https://fontlibrary.org/en/font/chicagoflf)
- License: Public Domain (completely free to use) - see `chicago/LICENSE`
- Used for: Menu bar, classic Mac OS headers

### IBM Plex Mono (Monospace)
**Directory**: `ibm-plex-mono/`
- `IBMPlexMono-Regular.ttf/woff2` (regular weight)
- `IBMPlexMono-Medium.ttf/woff2` (medium weight)
- `IBMPlexMono-Bold.ttf/woff2` (bold weight)
- Source: [Google Fonts - IBM Plex Mono](https://fonts.google.com/specimen/IBM+Plex+Mono)
- License: SIL Open Font License (OFL) - free and open source
- Used for: Code, fixed-width text
- Free alternative to Monaco

### EB Garamond (Display)
**Directory**: `eb-garamond/`
- `EBGaramond-Regular.ttf/woff2` (regular weight)
- `EBGaramond-Medium.ttf/woff2` (medium weight)
- `EBGaramond-SemiBold.ttf/woff2` (semi-bold weight)
- Source: [Google Fonts](https://fonts.google.com/specimen/EB+Garamond)
- License: SIL Open Font License (OFL) - free and open source
- Used for: Headlines, editorial content
- Free alternative to Apple Garamond

## Font Format Recommendations

1. **WOFF2** (preferred): Best compression, modern browser support
2. **WOFF**: Good fallback for older browsers
3. **TTF**: Universal support but larger file size

## Usage

### In Components

Fonts are automatically available via CSS custom properties defined in `theme.css`:

```tsx
import '../styles/fonts.css'; // Import in your app root

// Use in CSS
.my-element {
	font-family: var(--font-system);  /* Charcoal */
	font-family: var(--font-body);    /* Geneva */
	font-family: var(--font-chicago); /* Chicago */
	font-family: var(--font-mono);    /* Monaco */
	font-family: var(--font-display); /* Apple Garamond */
}
```

### In Storybook

Import fonts in `.storybook/preview.js`:

```js
import '../src/styles/fonts.css';
```

## License Considerations

### Freely Licensed Fonts (Included/Recommended)

✅ **ChicagoFLF** - Public Domain
- **License**: Public Domain (completely free)
- **Source**: [Font Library - ChicagoFLF](https://fontlibrary.org/en/font/chicagoflf)
- **File**: `chicago/ChicagoFLF.ttf`
- **License File**: `chicago/LICENSE`

✅ **IBM Plex Sans** - SIL Open Font License (OFL)
- **License**: Free and open source
- **Source**: [Google Fonts](https://fonts.google.com/specimen/IBM+Plex+Sans)
- **Directory**: `ibm-plex-sans/`
- Free alternative to Geneva

✅ **IBM Plex Mono** - SIL Open Font License (OFL)
- **License**: Free and open source
- **Source**: [Google Fonts](https://fonts.google.com/specimen/IBM+Plex+Mono)
- **Directory**: `ibm-plex-mono/`
- Free alternative to Monaco

✅ **EB Garamond** - SIL Open Font License (OFL)
- **License**: Free and open source
- **Source**: [Google Fonts](https://fonts.google.com/specimen/EB+Garamond)
- **Directory**: `eb-garamond/`
- Free alternative to Apple Garamond

### Proprietary Mac OS 9 Font (Not Included)

⚠️ **Charcoal** - Proprietary Apple font

- This font is **NOT** included in this repository
- Users must provide their own licensed copy
- Common sources:
  - Original Mac OS 9 installation
  - Licensed font archives
  - Modern recreations with appropriate licenses

## Alternative: Web-Safe Fallbacks

The library works without font files by using system fallbacks defined in `theme.css`:

```css
--font-system: Charcoal, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
```

This provides reasonable visual approximation on systems without Mac OS 9 fonts.

## Testing Font Loading

To verify fonts are loading correctly:

1. Open browser DevTools
2. Go to Network tab
3. Filter by "Font"
4. Reload page
5. Confirm font files are downloaded successfully

Or check in DevTools > Elements > Computed:

```
font-family: Charcoal, ... (computed)
```

Should show "Charcoal" if loaded successfully.
