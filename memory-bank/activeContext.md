# Active Context

## Current Focus
Maintaining and improving the Mac OS 9 UI component library, including GitHub Actions workflows and developer experience.

## Recent Changes

### Font Bundling Fix for npm Package (2026-02-04)
- Fixed Pixel fonts not resolving when library consumed from npm
- **Build Configuration:** Updated `rollup.config.js` to copy `src/fonts/Pixel/` to `dist/fonts/`
- **Package Exports:** Added `"./fonts/*": "./dist/fonts/*"` export to package.json for proper module resolution
- **Font Paths:** Changed all @font-face paths in `src/styles/theme.css` to use `~@liiift-studio/mac-os9-ui/fonts/...`
- **Why:** Webpack/Next.js tilde syntax resolves fonts from node_modules, enabling proper bundling in consuming projects
- **Result:** All Pixel font variants (normal, bold, italic, small) now load correctly in npm-installed package
- Resolves "Module not found: Can't resolve './fonts/Pixel/...'" webpack build errors

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