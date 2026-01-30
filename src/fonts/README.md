# Mac OS 9 Fonts

This directory contains font files for authentic Mac OS 9 typography.

## Directory Structure

```
src/fonts/
├── charcoal/          # Primary system UI font
├── geneva/            # Body text and secondary UI
├── chicago/           # Classic Mac OS menu bar font
├── monaco/            # Monospace font
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

### Geneva (Body Text)
**Directory**: `geneva/`
- `Geneva.ttf` or `Geneva.woff2` (regular)
- Used for: Body text, secondary UI elements

### Chicago (Classic Menu Bar)
**Directory**: `chicago/`
- `ChiKareGo2.ttf` (included - Chicago variant)
- Source: [BitFontMaker2 Gallery](https://www.pentacom.jp/pentacom/bitfontmaker2/gallery/?id=3780)
- License: Creative Commons (CC BY-SA) - see `chicago/LICENSE`
- Used for: Menu bar, classic Mac OS headers

### Monaco (Monospace)
**Directory**: `monaco/`
- `Monaco.ttf` or `Monaco.woff2` (regular)
- Used for: Code, fixed-width text

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

### Chicago Font (Included)

✅ **ChiKareGo2** - A Chicago-style font is included in this repository.

- **License**: Creative Commons Attribution-ShareAlike (CC BY-SA)
- **Source**: [BitFontMaker2 Gallery](https://www.pentacom.jp/pentacom/bitfontmaker2/gallery/?id=3780)
- **File**: `chicago/ChiKareGo2.ttf`
- **License File**: `chicago/LICENSE`
- Free to use, modify, and distribute under CC BY-SA terms

### Other Mac OS 9 Fonts (Not Included)

⚠️ **Important**: Other Mac OS 9 system fonts (Charcoal, Geneva, Monaco, Apple Garamond) are proprietary Apple fonts.

- These fonts are **NOT** included in this repository
- Users must provide their own licensed copies
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
