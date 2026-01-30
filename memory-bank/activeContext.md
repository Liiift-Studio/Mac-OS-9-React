# Active Context: Mac OS 9 UI Component Library

## Current Work Focus

### Phase: Core Components Complete - Container Components Next

Foundation and all core form/navigation components are now complete. Moving into container components (Window, TitleBar, Dialog, MenuBar).

#### Just Completed (2026-01-08 17:00)
1. ✅ **Tabs Component** - Simplified square tabs with box shadows
   - Basic square tabs with standard Mac OS 9 box shadows
   - Active/inactive states with proper colors
   - Keyboard navigation (arrows, Home, End)
   - Full accessibility with ARIA
   - **Note**: Trapezoid/stepped edge refinements deferred to Phase 2
2. ✅ **Typography System** - Updated to Charcoal Bold (700 weight) as default
3. ✅ **Pixelated Corners** - Created utility system for authentic Mac OS 9 corners
4. ✅ **Button Enhancement** - Applied pixelated corners to Button component

#### Phase 1 Components - ALL COMPLETE ✅
- ✅ Button (all variants, sizes, states, tests, stories)
- ✅ Checkbox (standard + indeterminate state)
- ✅ Radio (with Radio.Group)
- ✅ TextField (single + multi-line)
- ✅ Select (custom dropdown)
- ✅ Tabs (simplified, refinements deferred)

#### Phase 2 Container Components - COMPLETE ✅
- ✅ Window (complete)
- ✅ Dialog (complete)
- ⏸️ TitleBar (completed but now fully commented out - pending redesign)
- ✅ MenuBar + MenuItem (complete)

#### Just Completed (2026-01-09 14:40)
1. ✅ **MenuBar + MenuItem Components** - Classic Mac OS 9 menu system
   - MenuBar container component with horizontal menu layout
   - MenuItem component with multiple variants (standard, separator, checkmark, submenu indicator)
   - Controlled state management for open/close
   - Click-to-open menu behavior
   - Keyboard navigation (Left/Right arrows, Escape, Enter)
   - Mac OS 9 blue highlight on hover (#0000BB)
   - Disabled menu and item states
   - Full TypeScript types with JSDoc
   - Component exports (MenuBar, MenuItem, types)
   - **Note**: Storybook stories file encountered corruption issues, to be resolved separately

#### Just Completed (2026-01-09 14:30)
1. ✅ **TitleBar Component** - Standalone title bar component
   - Classic Mac OS 9 title bar with window controls
   - Active/inactive states
   - Draggable cursor styling support
   - Customizable button visibility
   - Right content area for additional elements
   - Comprehensive Storybook stories (16 examples)
   - Full TypeScript types and JSDoc
   - **Update 2026-01-15**: Fully commented out pending visual redesign

#### Currently Working On
- Phase 3: Visual refinements in progress
- Applied pixelated corners to Window, Dialog (via Window), and Tabs components
- Improved ListView hover states for better visibility
- Next: Continue visual polish and testing improvements

## Recent Changes

### 2026-01-30 11:47 - Replaced Geneva/Monaco with IBM Plex Sans/Mono (Google Fonts)
- **Change**: Switched from proprietary Geneva/Monaco fonts to open-source IBM Plex Sans and IBM Plex Mono
- **Rationale**: Use freely available, high-quality Google Fonts alternatives to avoid licensing issues
- **Files Modified**:
  - Renamed `src/fonts/geneva/` to `src/fonts/ibm-plex-sans/`
  - Renamed `src/fonts/monaco/` to `src/fonts/ibm-plex-mono/`
  - `src/fonts/fonts.css` - Updated @font-face declarations for both IBM Plex fonts (Regular, Medium, Bold weights)
  - `src/fonts/README.md` - Updated directory structure and font documentation
  - `src/fonts/ibm-plex-sans/.gitkeep` - Created with download instructions
  - `src/fonts/ibm-plex-mono/.gitkeep` - Created with download instructions
  - `src/styles/theme.css` - Updated --font-body and --font-mono CSS variables
- **IBM Plex Sans Details**:
  - Source: [Google Fonts](https://fonts.google.com/specimen/IBM+Plex+Sans)
  - License: SIL Open Font License (OFL) - free and open source
  - Weights: Regular (400), Medium (500), Bold (700)
  - Excellent alternative to Geneva for body text
- **IBM Plex Mono Details**:
  - Source: [Google Fonts](https://fonts.google.com/specimen/IBM+Plex+Mono)
  - License: SIL Open Font License (OFL) - free and open source
  - Weights: Regular (400), Medium (500), Bold (700)
  - Excellent alternative to Monaco for monospace text
- **Impact**: 4 out of 5 fonts now use freely licensed alternatives, only Charcoal remains proprietary
- **Date**: 2026-01-30 11:47

### 2026-01-30 11:44 - Replaced ChiKareGo2 with ChicagoFLF (Public Domain Font)
- **Change**: Switched from ChiKareGo2 (CC BY-SA) to ChicagoFLF (Public Domain) for the Chicago font
- **Rationale**: Public Domain license is simpler and offers more freedom than Creative Commons
- **Files Modified**:
  - `src/fonts/fonts.css` - Updated @font-face declaration to use ChicagoFLF.ttf
  - `src/fonts/chicago/LICENSE` - Updated with Public Domain license text
  - `src/fonts/README.md` - Updated documentation with ChicagoFLF information
  - `src/fonts/chicago/.gitkeep` - Updated with ChicagoFLF file reference
- **ChicagoFLF Details**:
  - Source: [Font Library - ChicagoFLF](https://fontlibrary.org/en/font/chicagoflf)
  - License: Public Domain - completely free to use without restrictions
  - Creator: Fración Libre Foundry (FLF)
  - No attribution required, can be used for any purpose
- **Impact**: Simplifies licensing, provides maximum freedom for users and library distribution
- **Date**: 2026-01-30 11:44

### 2026-01-30 11:41 - Replaced Apple Garamond with EB Garamond (Open Source Alternative)
- **Change**: Switched from proprietary Apple Garamond to open-source EB Garamond font
- **Rationale**: Avoid licensing issues with proprietary Apple fonts by using free, open-source alternative
- **Files Modified**:
  - Renamed `src/fonts/apple-garamond/` to `src/fonts/eb-garamond/`
  - `src/fonts/fonts.css` - Updated @font-face declarations for EB Garamond (Regular, Medium, SemiBold weights)
  - `src/fonts/README.md` - Updated directory structure and font documentation
  - `src/fonts/eb-garamond/.gitkeep` - Updated with EB Garamond file examples and Google Fonts link
  - `src/styles/theme.css` - Updated --font-display CSS variable to use 'EB Garamond'
- **EB Garamond Details**:
  - Source: [Google Fonts](https://fonts.google.com/specimen/EB+Garamond)
  - License: SIL Open Font License (OFL) - free and open source
  - Weights included: Regular (400), Medium (500), SemiBold (600)
  - High-quality Garamond revival, excellent alternative to Apple Garamond
- **Impact**: Display font now uses freely distributable open-source typeface, avoiding licensing complications
- **Date**: 2026-01-30 11:41

### 2026-01-30 11:34 - Added Creative Commons License for Chicago Font
- **Enhancement**: Added proper licensing for the ChiKareGo2 (Chicago variant) font included in the repository
- **Files Added/Modified**:
  - `src/fonts/chicago/LICENSE` - Full Creative Commons CC BY-SA license text with attribution
  - `src/fonts/fonts.css` - Added licensing comments to Chicago @font-face declaration
  - `src/fonts/README.md` - Updated to document Chicago font inclusion and CC BY-SA license
- **Chicago Font Details**:
  - Font Name: ChiKareGo2 (Chicago-style bitmap font)
  - Source: [BitFontMaker2 Gallery](https://www.pentacom.jp/pentacom/bitfontmaker2/gallery/?id=3780)
  - License: Creative Commons Attribution-ShareAlike (CC BY-SA)
  - File: `chicago/ChiKareGo2.ttf` (included in repository)
- **License Terms**: CC BY-SA allows free use, modification, and distribution with attribution and share-alike requirements
- **Impact**: Chicago font is now legally distributable with the library, properly attributed to creator
- **Date**: 2026-01-30 11:34

### 2026-01-30 11:24 - Created Fonts Folder Structure for Mac OS 9 Font Files
- **Enhancement**: Set up organized fonts directory for importing authentic Mac OS 9 font files
- **Structure Created**:
  - `src/fonts/` - Main fonts directory with README and fonts.css
  - `src/fonts/charcoal/` - Primary system UI font directory
  - `src/fonts/geneva/` - Body text font directory
  - `src/fonts/chicago/` - Classic Mac OS menu bar font directory (includes ChiKareGo2.ttf)
  - `src/fonts/monaco/` - Monospace font directory
  - `src/fonts/apple-garamond/` - Display/headline font directory
- **Files Added**:
  - `src/fonts/fonts.css` - @font-face declarations for all Mac OS 9 fonts (woff2, woff, ttf fallbacks)
  - `src/fonts/README.md` - Comprehensive documentation on font usage, licensing, and setup
  - `.gitkeep` files in each font directory to preserve structure
  - `src/types/fonts.d.ts` - TypeScript declarations for font file imports
- **Build Configuration**:
  - Updated `.gitignore` to exclude font files (*.woff, *.woff2, *.ttf, *.otf, *.eot)
  - Git will preserve directory structure via .gitkeep files but not track font files
- **Rationale**: 
  - Mac OS 9 fonts are proprietary Apple fonts that cannot be distributed
  - Users must provide their own licensed copies
  - Library continues to work via fallback fonts in theme.css
  - When font files are added, authentic Mac OS 9 typography is loaded
- **Usage**: 
  - Import `src/fonts/fonts.css` in app entry point
  - Place font files in appropriate directories
  - Fonts automatically available via CSS custom properties (--font-system, --font-body, etc.)
- **Impact**: Infrastructure ready for authentic Mac OS 9 fonts without licensing issues
- **Date**: 2026-01-30 11:24

### 2026-01-23 15:54 - Converted Font Size Variables to rem Units for Responsive Typography
- **Fix**: Converted all font size custom properties from fixed pixel values to rem units
- **Problem**: Window titles and ListView text were not scaling responsively despite responsive typography media queries being in place
- **Root Cause**: Font size CSS variables were defined in pixels (e.g., `--font-size-md: 12px`) which don't scale with viewport
- **Solution**: Converted all 9 font size variables to rem units using 16px as base
  - `--font-size-xs: 0.5625rem` (9px base → scales to 9-11.25px)
  - `--font-size-sm: 0.625rem` (10px base → scales to 10-12.5px)
  - `--font-size-md: 0.75rem` (12px base → scales to 12-15px)
  - `--font-size-lg: 0.8125rem` (13px base → scales to 13-16.25px)
  - `--font-size-xl: 0.875rem` (14px base → scales to 14-17.5px)
  - `--font-size-2xl: 1rem` (16px base → scales to 16-20px)
  - `--font-size-3xl: 1.125rem` (18px base → scales to 18-22.5px)
  - `--font-size-4xl: 1.25rem` (20px base → scales to 20-25px)
  - `--font-size-5xl: 1.5rem` (24px base → scales to 24-30px)
- **Impact**: 
  - All components now scale typography responsively across breakpoints
  - Window titles scale from 12px (mobile) to 15px (XL screens)
  - ListView text scales from 12px (mobile) to 15px (XL screens)
  - Maintains Mac OS 9 aesthetic while improving readability on larger screens
  - No component code changes needed - all components automatically benefit
- **Responsive Scaling Behavior**:
  - Mobile (16px base): 100% of original sizes
  - Tablet (17px base, 768px+): 106.25% scaling
  - Desktop (18px base, 1024px+): 112.5% scaling
  - XL (20px base, 1440px+): 125% scaling
- **Files Modified**:
  - `src/styles/theme.css` - Converted font size variables to rem units
- **Date**: 2026-01-23 15:54

### 2026-01-23 15:39 - Added Responsive Typography Scaling
- **Enhancement**: Added responsive font size scaling based on screen size
- **Implementation**: Media queries adjust the `html` base font-size at different breakpoints
  - Mobile/default: 16px base
  - Tablet (768px+): 17px (+6.25% increase)
  - Desktop (1024px+): 18px (+12.5% increase)
  - Large Desktop/XL (1440px+): 20px (+25% increase)
- **Impact**: 
  - All components using pixel-based font sizes remain consistent
  - Components can optionally use `rem` units to scale with viewport
  - Improves readability on larger screens
  - Maintains Mac OS 9 aesthetic while adapting to modern screen sizes
- **Rationale**: 
  - User requested responsive typography for mobile/tablet/desktop/xl sizes
  - Scaling the root font-size allows flexible typography without changing component code
  - Preserves existing pixel-based sizing while enabling rem-based responsive designs
- **Files Modified**:
  - `src/styles/theme.css` - Added responsive typography media queries
- **Date**: 2026-01-23 15:39

### 2026-01-23 15:37 - Documented Style Import Pattern in README
- **Documentation Update**: Clarified that styles must be imported once in app entry point
- **Problem**: README claimed "Styles are automatically included" but this isn't accurate with current Rollup build
- **Root Cause**: Rollup extracts CSS to separate `dist/index.css` file using `rollup-plugin-postcss` with `extract: 'index.css'`
  - The `import './styles/theme.css'` in `src/index.ts` gets removed from JavaScript bundle during extraction
  - CSS must be explicitly imported by users: `import '@liiift-studio/mac-os9-ui/styles'`
- **Solution**: Updated README.md to document the required pattern
  - Updated "Quick Start" section with proper import example
  - Updated "Styling" section with clear instructions
  - Removed misleading language about automatic inclusion
- **src/index.ts Update**: Updated comment to clarify the CSS import is for internal use only
  - Added note that users must import styles separately
  - CSS import kept for Storybook and development builds
- **Decision Rationale**: 
  - Option 1 (CSS-in-JS): Against project preference for CSS Modules
  - Option 2 (Auto-include wrapper): More complex build configuration
  - Option 3 (Document pattern): Simplest, most reliable, standard pattern for UI libraries
  - Chosen Option 3 as recommended approach
- **Impact**:
  - README now accurately reflects actual usage
  - Users will no longer be confused about missing styles
  - Follows common pattern used by Material-UI, Ant Design, etc.
  - Better performance: CSS cached separately from JavaScript
- **Files Modified**:
  - `README.md` - Updated Quick Start and Styling sections
  - `src/index.ts` - Updated comment to clarify CSS import purpose
- **Date**: 2026-01-23 15:37

### 2026-01-23 15:08 - Added onItemMouseEnter Callback for List Items
- **Enhancement**: Added `onItemMouseEnter` callback prop to ListView and FolderList components for individual item hover detection
- **ListView Changes**:
  - Added `onItemMouseEnter?: (item: ListItem) => void` to ListViewProps interface
  - Created `handleRowMouseEnter` callback handler
  - Wired handler to each row's `onMouseEnter` event
  - Updated JSDoc with usage example
- **FolderList Changes**:
  - Added `onItemMouseEnter?: (item: ListItem) => void` to FolderListProps interface
  - Passes callback through to underlying ListView component
  - Updated JSDoc with usage example showing both window and item mouse enter callbacks
- **Rationale**: User initially requested `onMouseEnter` for FolderList, but clarified they needed callback for individual list item hover, not the window itself
- **Impact**: Developers can now detect when mouse enters individual list items, receiving the full item data in the callback - useful for previews, tooltips, or hover-based actions
- **Files Modified**:
  - `src/components/ListView/ListView.tsx`
  - `src/components/FolderList/FolderList.tsx`
- **Date**: 2026-01-23 15:08

### 2026-01-23 14:45 - Added onMouseEnter Callback Prop to FolderList and Window Components
- **Enhancement**: Added `onMouseEnter` callback prop to both FolderList and Window components
- **FolderList Changes**:
  - Added `onMouseEnter?: (event: React.MouseEvent<HTMLDivElement>) => void` to FolderListProps interface
  - Passes callback through to underlying Window component
  - Updated JSDoc with usage example
- **Window Changes**:
  - Added `onMouseEnter?: (event: React.MouseEvent<HTMLDivElement>) => void` to WindowProps interface
  - Wired handler to root div element
  - Added to component's destructured props
- **Rationale**: User requested mouse hover/enter callback capability for FolderList component
- **Impact**: Developers can now detect when mouse enters a FolderList or Window, useful for focus management, window activation, or hover effects
- **Files Modified**:
  - `src/components/FolderList/FolderList.tsx`
  - `src/components/Window/Window.tsx`
- **Date**: 2026-01-23 14:45

### 2026-01-23 14:08 - Fixed CSS @import Resolution in Rollup Build
- **Problem**: Build was failing in consuming applications with "Module not found: Can't resolve '../../styles/pixelated-corners.css'"
- **Root Cause**: Rollup's PostCSS plugin was not resolving `@import` statements in CSS Module files
  - Three components had unresolved imports: IconButton, Tabs, and Window
  - The bundled `dist/index.css` contained `@import '../../styles/pixelated-corners.css'` statements
  - These relative paths broke when the CSS was flattened into a single file
- **Solution**: Installed and configured `postcss-import` plugin
  - Installed: `npm install --save-dev postcss-import`
  - Updated `rollup.config.js` to add `postcssImport()` to the plugins array
  - Plugin must be first in the array to process imports before other transformations
- **Results Verified**:
  - Build completes successfully
  - No `@import` statements remain in bundled CSS (search returned 0 results)
  - `pixelated-corners.css` content is now inlined into `dist/index.css`
  - Consuming applications can now import the library without module resolution errors
- **Impact**: 
  - Package is now fully functional when consumed via npm
  - CSS build process is more robust
  - Follows best practices for CSS bundling in libraries
- **Date**: 2026-01-23 14:08

### 2026-01-23 14:01 - Removed Unused Plain CSS Files
- **Problem**: Plain `.css` files were leftover artifacts from the CSS Modules migration on 2026-01-16
- **Solution**: Deleted 7 unused plain CSS files that are no longer referenced
- **Files Removed**:
  - `src/components/Button/Button.css`
  - `src/components/Checkbox/Checkbox.css`
  - `src/components/Icon/Icon.css`
  - `src/components/IconButton/IconButton.css`
  - `src/components/Radio/Radio.css`
  - `src/components/TextField/TextField.css`
  - `src/components/Window/Window.css`
- **Rationale**: All components now use CSS Modules (`.module.css`) exclusively
  - Components import: `import styles from './Component.module.css'`
  - Rollup's PostCSS with `autoModules: true` handles CSS Modules properly
  - Plain `.css` files contained old hardcoded class names (e.g., `.mac-os9-button`) that are no longer used
- **Impact**: 
  - Cleaner codebase with no confusing duplicate CSS files
  - Reduces maintenance burden
  - Makes CSS Module migration complete
  - No functional changes - removed files were never bundled
- **Date**: 2026-01-23 14:01

### 2026-01-23 13:45 - Migrated Build System from tsup to Rollup (CRITICAL FIX)
- **Problem**: CSS Modules were not working in published NPM package - components rendered with empty `class=""` attributes
- **Root Cause**: tsup's esbuild `local-css` loader doesn't reliably handle CSS Modules for library distribution
- **Solution**: Migrated from tsup to Rollup with proper CSS Modules support
  - Installed: `rollup`, `@rollup/plugin-node-resolve`, `@rollup/plugin-commonjs`, `@rollup/plugin-typescript`, `rollup-plugin-postcss`, `rollup-plugin-peer-deps-external`, `rollup-plugin-dts`, `postcss`
  - Created `rollup.config.js` with proper CSS Modules configuration
  - PostCSS modules configured with `generateScopedName: '[name]_[local]'` pattern
  - Rollup handles both ESM and CJS outputs with source maps
  - TypeScript declarations generated and bundled via rollup-plugin-dts
- **Results Verified**:
  - JavaScript mappings: `{"window":"Window-module_window","titleBar":"Window-module_titleBar",...}`
  - CSS classes: `.Window-module_window { ... }`, `.Button-module_button { ... }`
  - All components now render with correct scoped class names
  - Build output: ESM (dist/index.js), CJS (dist/index.cjs), CSS (dist/index.css), Types (dist/index.d.ts)
- **Why Rollup**: Industry standard for CSS Modules in NPM libraries (used by React Select, React DatePicker, and many others)
- **Impact**: 
  - Package is now fully functional when installed via npm
  - CSS Modules reliably work in all consuming applications
  - Follows industry best practices for library CSS bundling
  - Build is now production-ready for NPM publishing
- **Technical Details**:
  - Rollup uses `rollup-plugin-postcss` which has mature CSS Modules support
  - PostCSS modules plugin properly generates scoped class names
  - Build script simplified to `rollup -c`
  - tsup.config.ts retained in repo but no longer used (can be removed later)
- **Date**: 2026-01-23 13:30-13:45

### 2026-01-16 16:50 - CSS Modules Build Configuration Fix (ATTEMPTED - INCOMPLETE)
- **Problem**: After downloading the npm package, CSS classes were not appearing in HTML (empty `class=""` attributes)
- **Root Cause**: tsup wasn't properly processing CSS Modules during the build - the CSS Module imports resulted in empty objects in the bundled JavaScript
- **Solution**: Configured tsup to use esbuild's `local-css` loader for CSS Modules
  - Updated `tsup.config.ts` with `loader: { '.css': 'local-css' }`
  - This enables esbuild's built-in CSS Modules support
- **Result**: CSS Modules now properly generate scoped class names and mappings
  - JavaScript output includes proper class mappings: `{ button: "Button_button", "button--sm": "Button_button--sm", ... }`
  - CSS output includes properly scoped classes: `.Button_button { ... }`
  - Components now render with correct class names in consuming applications
- **Package.json Update**: Changed `sideEffects` from `false` to `["*.css", "**/*.css"]` to prevent CSS tree-shaking
- **Verification**: Tested build output - all CSS Module class names properly generated and mapped
- **Impact**: 
  - Package is now usable when installed via npm
  - CSS classes properly applied to components in consumer applications
  - No code changes needed in components themselves - purely build configuration
- **Cleanup**: Removed experimental PostCSS dependencies that didn't work

### 2026-01-16 14:49 - CSS Modules Fix Across All Components
- Fixed critical issue where 7 components were importing plain `.css` files instead of `.module.css`
- Components affected: Button, Checkbox, Icon, IconButton, Radio, TextField, Window
- **Problem**: Components were using hardcoded string class names (e.g., `'mac-os9-button'`) instead of CSS Module references
- **Solution**: Changed imports from `import './Component.css'` to `import styles from './Component.module.css'`
- **Impact**: 
  - All class names now properly scoped via CSS Modules
  - Prevents className collisions in consuming applications
  - Enables proper tree-shaking and optimization
  - Build verified successful (ESM: 60KB, CJS: 63KB, CSS: 41KB)
- Updated all className usages to use `styles.className` and `styles['className--variant']` syntax
- No visual changes - purely architectural improvement for reliability and maintainability

### 2026-01-16 13:02 - README Package Name Update
- Updated all README.md import examples to use scoped package name `@liiift-studio/mac-os9-ui`
- Changed from `mac-os9-ui` to `@liiift-studio/mac-os9-ui` throughout documentation
- Updated installation command: `npm install @liiift-studio/mac-os9-ui`
- Updated all import statements in examples to use `@liiift-studio/mac-os9-ui`
- Updated style import to `@liiift-studio/mac-os9-ui/styles`
- Package.json already had correct scoped name, README now matches
- No other files needed updates (search confirmed)

### 2026-01-15 12:52 - TitleBar Component Fully Commented Out
- Commented out all TitleBar component files (component, styles, stories, exports)
- Files affected:
  - `src/components/TitleBar/TitleBar.tsx` - component implementation commented out
  - `src/components/TitleBar/TitleBar.module.css` - styles removed (restore from git history when needed)
  - `src/components/TitleBar/TitleBar.stories.tsx` - all 16 stories commented out (removed from Storybook)
  - `src/components/TitleBar/index.ts` - exports commented out
- Reason: Component is unusable and looks bad, needs complete visual refinement
- Status: All files preserved with clear header comments indicating temporary status
- Export from `src/index.ts` was already commented out on 2026-01-14
- TitleBar can be restored from git history when ready for redesign
- Component will not appear in Storybook or be available in package exports

### 2026-01-14 15:27 - React 18 and 19 Compatibility
- Updated peerDependencies to support both React 18 and React 19
- Changed from `"react": "^18.0.0"` to `"react": "^18.0.0 || ^19.0.0"`
- Changed from `"react-dom": "^18.0.0"` to `"react-dom": "^18.0.0 || ^19.0.0"`
- Verified build works with updated dependencies (ESM: 60KB, CJS: 63KB, CSS: 37KB)
- Tested with existing test suite - no React version compatibility issues
- Library now compatible with projects using either React 18 or React 19

### 2026-01-14 14:25 - NPM Launch Preparation
- Hidden TitleBar component from library exports (needs visual refinement)
- Updated README.md to remove TitleBar references from examples
- Tested build process - successful (ESM: 60KB, CJS: 63KB, CSS: 37KB)
- Tested package creation - ready for NPM (148.2 KB compressed, 825.1 KB unpacked)
- Package is now ready for NPM publishing

### 2026-01-14 14:15 - ListView Hover State Improvements
- Fixed ListView row hover state visibility issue
- Changed row hover from `var(--color-gray-200)` to `var(--color-gray-300)` (was invisible against background)
- Updated selected row from `var(--color-gray-300)` to `var(--color-gray-400)` for clearer hierarchy
- Added selected row hover state using `var(--color-gray-500)` for improved feedback
- Visual hierarchy now: normal (gray-200) → hover (gray-300) → selected (gray-400) → selected+hover (gray-500)
- Hover state now clearly visible across entire row as intended in Mac OS 9 style

### 2026-01-13 13:00 - Phase 3 Visual Refinements Started
- Applied pixelated corners to Window component (4px stepped corners)
- Dialog component automatically inherits pixelated corners from Window
- Applied pixelated corners to Tabs component (pixelated top corners, flat bottom)
- Improved authentic Mac OS 9 appearance across container and navigation components

### 2026-01-09 14:40 - MenuBar + MenuItem Components Complete
- Implemented MenuBar container component with horizontal layout
- Implemented MenuItem component with multiple variants (standard, separator, checkmark, submenu)
- Added controlled state management (open/close via props)
- Implemented keyboard navigation (Left/Right arrows, Escape, Enter)
- Applied Mac OS 9 blue highlight (#0000BB) on hover
- Added disabled states for both menus and items
- Exported components and types from main index
- **Note**: Storybook stories file had corruption issues during creation, to be addressed separately
- **Phase 2 Container Components now COMPLETE!**

### 2026-01-08 17:00 - Tabs Simplification
- Reverted SVG trapezoid experiments
- Implemented simple square tabs with box shadows
- Active tabs: light background, hidden bottom border
- Inactive tabs: darker background, visible borders
- Deferred pixel-perfect trapezoid shapes to Phase 2

### 2026-01-08 Afternoon - Component Sprint
- Completed Checkbox component with all states
- Completed Radio component with Radio.Group
- Completed TextField (single + multi-line variants)
- Completed Select with custom dropdown styling
- Started and simplified Tabs component

### 2026-01-08 Morning - Typography & Pixelation
- Updated default font weight to Charcoal Bold (700)
- Created `src/styles/pixelated-corners.css` utility system
- Applied pixelated corners to Button component

### 2026-01-08 Initial - Project Foundation
- Complete project scaffolding
- Figma MCP server integration
- Design token extraction
- Button component (reference implementation)

## Design Decisions Made

### 1. Typography: Charcoal Bold as Default
**Decision**: Use Charcoal Bold (700 weight) as the primary font weight  
**Rationale**: More authentic to Mac OS 9 which used bold text extensively in UI  
**Impact**: All components now use `--font-weight-bold` (700) by default  
**Date**: 2026-01-08

### 2. Pixelated Corners System
**Decision**: Create reusable utility classes for pixelated corners  
**Rationale**: Mac OS 9 had characteristic stepped/pixelated corners on many UI elements  
**Implementation**: CSS classes in `src/styles/pixelated-corners.css`  
**Impact**: Can be applied to any component via className  
**Date**: 2026-01-08

### 3. Tabs: Simplified Implementation
**Decision**: Use simple square tabs with box shadows (defer trapezoid shapes)  
**Rationale**: SVG trapezoid approach was complex and not rendering correctly  
**Impact**: Functional tabs now, can enhance visual fidelity in Phase 2  
**Status**: Temporary, marked for future refinement  
**Date**: 2026-01-08 17:00

### 4. CSS Strategy
**Decision**: CSS Modules + Custom Properties  
**Rationale**: Better performance than CSS-in-JS, easier to achieve pixel-perfect Mac OS 9 effects  
**Impact**: Components will use scoped CSS Modules that reference global CSS variables  
**Date**: 2026-01-08 (initial)

### 5. Build Output
**Decision**: Dual ESM/CJS with TypeScript declarations  
**Rationale**: Maximum compatibility with modern bundlers and Next.js  
**Impact**: Library usable in both ESM and CJS contexts  
**Date**: 2026-01-08 (initial)

### 6. Component API
**Decision**: Controlled + Uncontrolled support for form inputs  
**Rationale**: Flexibility for different use cases, follows React best practices  
**Impact**: More code but better developer experience  
**Date**: 2026-01-08 (initial)

### 7. Accessibility First
**Decision**: Build in ARIA and keyboard support from the start  
**Rationale**: Harder to retrofit later, core to project goals  
**Impact**: Every component includes ARIA attributes and keyboard handlers by default  
**Date**: 2026-01-08 (initial)

### 8. TitleBar: Comment Out for Redesign
**Decision**: Fully comment out TitleBar component instead of shipping it  
**Rationale**: Component is unusable and looks bad, better to not ship than ship poor quality  
**Impact**: TitleBar removed from Storybook and package exports, preserved in codebase for future redesign  
**Status**: Temporary, will be redesigned and uncommented when ready  
**Date**: 2026-01-15

## Next Steps

### Immediate (Next Session)
1. **TitleBar Redesign**: Complete visual refinement of TitleBar component
   - Improve visual appearance to match Mac OS 9 authenticity
   - Fix styling issues that made it unusable
   - Uncomment all files when ready
   - Re-enable in Storybook and package exports

### Short-term (This Week)
1. **Visual Polish Pass**: Review all components against Figma
2. **Icon System**: Expand icon library with more Mac OS 9 icons
3. **Testing Improvements**: Increase test coverage

### Medium-term (Phase 2 Enhancements)
1. **Pixelated Corners**: Apply to all remaining components
2. **Tab Shape Refinement**: Implement authentic trapezoid tabs with stepped edges
3. **Visual Polish Pass**: Review all components against Figma
4. **Icon System**: Expand icon library with more Mac OS 9 icons

### Long-term (Before Release)
1. **Accessibility Audit**: Full WCAG 2.1 AA compliance check
2. **Performance Testing**: Verify bundle size goals, render performance
3. **Cross-browser Testing**: Test in all target browsers
4. **Documentation**: README, CONTRIBUTING, THEMING guides
5. **Versioning**: Create initial changeset for 0.1.0 release
6. **Publishing Prep**: Verify npm pack output, test installation

## Active Considerations

### Design Fidelity Questions

#### Resolved
- ~~Font Weight~~: **RESOLVED** - Using Charcoal Bold (700) as default
- ~~Corner Style~~: **RESOLVED** - Created pixelated-corners utility system

#### Open Questions
- **TitleBar Visual Design**: How to improve TitleBar appearance?
  - *Current state*: Fully commented out, needs complete redesign
  - *Status*: Pending redesign
  - *Priority*: Medium - can ship without it, but should be addressed

- **Tab Trapezoid Shape**: How to achieve pixel-perfect trapezoid tabs?
  - *Current state*: Simple squares with box shadows
  - *Deferred to*: Phase 2 refinement
  - *Options*: SVG, CSS clip-path, or image-based approach

- **Window Resize**: Should windows be actually resizable or just styled?
  - *Need to decide*: Based on typical use cases
  - *Leaning toward*: Styled only, consumers can add resize logic if needed

- **MenuBar Behavior**: Should MenuBar handle state or be stateless?
  - *Need to decide*: Before implementation
  - *Leaning toward*: Controlled state, consumers manage open/closed

### Technical Considerations

#### Component Implementation Status
**Completed (6/9 v1 components):**
- Button ✅
- Checkbox ✅
- Radio ✅
- TextField ✅
- Select ✅
- Tabs ✅ (simplified)

**Remaining (3/9):**
- Window + TitleBar
- MenuBar + MenuItem
- Dialog / Modal

#### Testing Strategy
- Unit tests alongside each component
- Focus on behavior over implementation
- Test keyboard navigation for all interactive components
- Verify ARIA attributes

#### Performance Patterns
- Use React.memo for components that render frequently
- Avoid unnecessary re-renders with proper prop comparison
- Keep CSS scoped to avoid cascade issues

## Important Patterns Established

### Component Structure
```typescript
// Standard component pattern:
import React, { forwardRef } from 'react';
import styles from './Component.module.css';

export interface ComponentProps {
	/** JSDoc for every prop */
	children?: React.ReactNode;
	className?: string;
	// ... other props
}

export const Component = forwardRef<HTMLDivElement, ComponentProps>(
	({ children, className, ...props }, ref) => {
		const classNames = [
			styles.root,
			className,
		].filter(Boolean).join(' ');
		
		return (
			<div ref={ref} className={classNames} {...props}>
				{children}
			</div>
		);
	}
);

Component.displayName = 'Component';
export default Component;
```

### Pixelated Corners Usage
```css
/* In component CSS */
@import '../../styles/pixelated-corners.css';

.button {
	/* Apply corner styles */
}

.button--pixelated {
	/* Component-specific overrides */
}
```

### State Management Pattern
```typescript
// Controlled + uncontrolled pattern for form inputs:
const [uncontrolledValue, setUncontrolledValue] = useState(defaultValue);
const isControlled = value !== undefined;
const actualValue = isControlled ? value : uncontrolledValue;

const handleChange = (newValue) => {
	if (!isControlled) {
		setUncontrolledValue(newValue);
	}
	onChange?.(newValue);
};
```

### Keyboard Navigation Pattern
```typescript
const handleKeyDown = (event: React.KeyboardEvent) => {
	switch (event.key) {
		case 'ArrowUp':
		case 'ArrowDown':
			event.preventDefault();
			// Handle navigation
			break;
		case 'Enter':
		case ' ':
			event.preventDefault();
			// Handle selection
			break;
		case 'Escape':
			// Handle close/cancel
			break;
	}
};
```

## Learnings & Insights

### Mac OS 9 Design Language
- **Simplicity**: Clean rectangles, clear bevels, no unnecessary flourishes
- **Consistency**: Same shadow/bevel system across all raised elements
- **Clarity**: High contrast, bold text, clear interaction affordances
- **Efficiency**: Compact layouts, efficient use of space
- **Pixelation**: Characteristic stepped edges on corners and diagonals

### Modern Web Constraints
- Can't perfectly replicate bitmap fonts → use web fonts + bold weight
- CSS limitations for some effects → create utility systems for reuse
- Must add accessibility → ARIA + keyboard beyond original OS
- Balance authenticity with usability → pragmatic visual fidelity

### Development Philosophy
1. **Progress over perfection**: Ship simplified version, refine later
2. **Fidelity where it matters**: Core components pixel-perfect, enhancements in Phase 2
3. **Accessibility non-negotiable**: Build it in from start, no compromises
4. **Documentation as code**: Keep memory-bank synchronized with implementation
5. **Test as you go**: Write tests with components, not after
6. **Quality over completeness**: Better to comment out poor components than ship them

### Component Implementation Insights
- **Button sets the pattern**: First component establishes conventions for all others
- **Composition over configuration**: Small, focused components that compose well
- **Ref forwarding matters**: Consumers need access to underlying DOM nodes
- **TypeScript strictness pays off**: Catches issues early, better DX
- **Visual quality matters**: If a component looks bad, don't ship it - comment it out and fix later

## Blockers & Risks

### Current Blockers
- None (all shipped components are functional)

### Resolved Issues
- ✅ Tab trapezoid shape → Simplified to squares, deferred to Phase 2
- ✅ Typography weight → Resolved with Charcoal Bold default
- ✅ Corner pixelation → Resolved with utility class system
- ✅ ListView hover visibility → Fixed with proper color hierarchy
- ✅ TitleBar visual quality → Commented out pending redesign

### Potential Risks
1. **TitleBar Redesign Complexity**: May require significant effort to get right
   - *Mitigation*: Can ship without it, redesign when resources available
2. **Bundle Size**: Adding more components increases bundle
   - *Mitigation*: Monitor with each component, optimize before release
3. **Browser Compatibility**: Some CSS effects may vary across browsers
   - *Mitigation*: Test early on multiple browsers

## Questions to Resolve

### For TitleBar Component
1. What visual improvements are needed?
   → **Need to investigate**: Review Mac OS 9 screenshots and Figma designs
2. Should we use a different approach for the striped pattern?
   → **Need to experiment**: Try different CSS techniques
3. Are the window controls sized/styled correctly?
   → **Need to verify**: Compare against authentic Mac OS 9

### For Window Component
1. Should windows be draggable or just styled?
   → **Leaning toward**: Styled only, consumers add drag behavior if needed
2. Should windows be resizable?
   → **Leaning toward**: No, just visual styling
3. Should TitleBar be separate component or part of Window?
   → **Leaning toward**: Separate, more flexible composition

### For MenuBar
1. Stateful or stateless?
   → **Leaning toward**: Stateless, consumers manage open/closed state
2. Keyboard navigation pattern?
   → **Decision needed**: Left/Right for menus, Up/Down for items
3. Single vs. multi-select mode?
   → **Leaning toward**: Single only (authentic to Mac OS 9)

## Communication Notes

### For Future Sessions
When resuming work:
1. Review activeContext.md (this file) for current state
2. Check progress.md for completion status
3. Review recent changes section for context
4. Proceed with "Next Steps" section

### For Collaborators
- All components follow established patterns in systemPatterns.md
- Design tokens documented in techContext.md
- Each component has comprehensive JSDoc
- Follow pixelated-corners pattern for authentic Mac OS 9 look
- Accessibility is non-negotiable - include ARIA and keyboard support
- TitleBar component is fully commented out - do not reference or import it

### Memory Bank Synchronization
- **activeContext.md** (this file): Daily updates, current work focus
- **progress.md**: Mark items complete as they finish
- **systemPatterns.md**: Update when new patterns emerge
- **techContext.md**: Update when tooling/setup changes
- **projectbrief.md**, **productContext.md**: Reference only, rarely change
