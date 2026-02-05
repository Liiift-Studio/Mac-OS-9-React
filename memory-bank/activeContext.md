# Active Context

## Current Focus
Maintaining and improving the Mac OS 9 UI component library, including GitHub Actions workflows and developer experience.

## Recent Changes

### Font Bundling Fix for npm Package - Base64 Inline Solution (2026-02-04)
- **Problem:** Pixel fonts failed to load in consuming projects due to webpack module resolution issues
- **Root Cause:** pixelOperator fonts never had issues because they were never referenced in CSS; Pixel fonts ARE referenced via @font-face, causing webpack's css-loader to try resolving them as modules
- **Solution:** Inline all fonts as base64 data URLs in the CSS file
- **Implementation:**
  - Installed `postcss-url` plugin for reliable base64 encoding
  - Configured `postcssUrl({url: 'inline'})` in rollup postcss plugins
  - Changed font paths back to relative `../fonts/Pixel/...` for build-time resolution
  - Result: All 6 Pixel font variants (normal, bold, italic + small variants) now embedded in CSS as base64
- **Trade-offs:** CSS file size increased from 93KB to 237KB (+144KB), but eliminates ALL path resolution issues
- **Benefits:** Zero configuration for consumers, works in any bundler (webpack, vite, parcel), no external font file dependencies
- Resolves "Module not found: Can't resolve..." errors permanently

### GitHub Actions Workflow Enhancement (2026-01-30)
- Added manual trigger (`workflow_dispatch`) to the npm publishing workflow
- Workflow can now be triggered both automatically (on version changes) and manually from the GitHub Actions UI
- File modified: `.github/workflows/publish-npm.yml`

### Icon System Implementation
- Created comprehensive icon registry system with categorized icons
- Organized icons into logical categories: actions, files, navigation, media, status, ui
- Implemented IconLibrary component for browsing and testing all available icons
- Added documentation for icon usage and registration patterns

## Active Decisions

### Publishing Strategy
- Automated npm publishing triggers on version changes in package.json with specific commit message keywords
- Manual publishing now available via GitHub Actions UI for on-demand releases
- Publishing workflow includes full test suite and build verification before deployment

### Icon Architecture
- Using registry pattern for centralized icon management
- Category-based organization for better discoverability
- Type-safe icon references using registry keys
- Support for both direct icon imports and registry-based lookups

## Next Steps
- Test manual workflow trigger from GitHub Actions UI
- Continue expanding icon library with additional Mac OS 9 icons
- Consider adding workflow inputs for manual triggers (e.g., version bump type)
- Document the manual trigger workflow in project README or contributing guide