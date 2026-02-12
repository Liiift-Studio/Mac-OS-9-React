# Active Context

## Current Focus
Expanding component interactivity with draggable windows feature for authentic Mac OS 9 desktop experience.

## Recent Changes

### Draggable and Resizable Windows Feature (2026-02-11)
- **Feature:** Added optional drag and resize functionality to Window and FolderList components
- **Drag Implementation:**
  - Added `draggable` boolean prop to enable/disable drag by title bar
  - Window stays in normal document flow until first dragged, then becomes absolutely positioned
  - Supports both controlled and uncontrolled position management
  - Added `defaultPosition` prop for initial positioning (uncontrolled)
  - Added `position` and `onPositionChange` props for controlled positioning
  - Internal drag state managed with React hooks (useState, useRef, useEffect)
  - Mouse event handlers attached to title bar for drag initiation
  - Document-level event listeners for drag tracking with proper cleanup
  - Added WindowPosition type to common types exports
- **Resize Implementation:**
  - Fully functional window resizing via resize handle in bottom-right corner
  - Added `onResize` callback to track size changes during resize
  - Added `minWidth`, `minHeight`, `maxWidth`, `maxHeight` props for size constraints
  - Default minimum size: 200×100px (can be customized)
  - Internal resize state managed with React hooks
  - Mouse event handlers on resize handle for resize initiation
  - Document-level event listeners during resize with proper cleanup
  - Real-time dimension updates during resize operation
- **User Experience:**
  - Drag: Title bar shows grab cursor when hovering (draggable enabled)
  - Drag: Cursor changes to grabbing during active drag
  - Drag: Clicking window control buttons doesn't initiate drag
  - Drag: Window follows cursor precisely at click point (no offset)
  - Resize: Resize handle shows nwse-resize cursor
  - Resize: Smooth visual feedback during resize
  - Resize: Respects min/max size constraints
  - Both features can be enabled simultaneously
- **CSS Changes:**
  - Added `.window--draggable` class for dragged windows
  - Added `.titleBar--draggable` class for grab cursor
  - Added `.titleBar--dragging` class for grabbing cursor during drag
  - Resize handle already had `.resizeHandle` class with proper cursor
- **Documentation:**
  - Created 7 Storybook stories total (4 drag, 3 resize, 1 combined)
  - Updated Window component JSDoc with draggable and resizable examples
  - FolderList automatically inherits both draggable and resizable functionality
  - Updated changeset with comprehensive feature descriptions
- **Architecture:**
  - Both features are opt-in (default to false)
  - No breaking changes to existing components
  - Follows controlled/uncontrolled pattern consistent with React best practices
  - State can be managed by parent or internally for both features
  - Can use windows with drag only, resize only, or both simultaneously
- **Bug Fixes:**
  - Fixed ~30px mouse position offset issue by calculating positions relative to parent container's coordinate system
  - Uses `offsetParent` to properly account for container positioning and CSS filter effects
  - Both `handleTitleBarMouseDown` and `handleMouseMove` now calculate relative to parent bounds
  - Resize handle properly prevents event propagation to avoid conflicts with drag
- **Future Enhancements (Not Implemented):**
  - Drag boundary constraints (prevent dragging outside viewport/container)
  - Z-index management (bringing windows to front on click)
  - Snap-to-grid or snap-to-edge behaviors
  - Aspect ratio locking during resize

### Custom Classes and Element Targeting System (2026-02-06)
- **Feature:** Comprehensive system for customizing and targeting sub-elements in components
- **Implementation:**
  - Added `classes` prop to ListView, FolderList, and Window components
  - Implemented render props (renderRow, renderCell, renderHeaderCell) for complete rendering control
  - Added cell-level interaction callbacks (onCellClick, onCellMouseEnter, onCellMouseLeave)
  - Components now track internal hover state for rows and cells
  - Automatic data attributes for CSS-only targeting
  - Created `mergeClasses` utility for class name management
- **Architecture:**
  - Three complementary approaches: classes prop (simple), render props (advanced), data attributes (CSS-only)
  - Fully backwards compatible - all new features are opt-in
  - Conventional patterns: components manage hover state, callbacks notify parents, render props override completely
  - Type-safe with comprehensive TypeScript interfaces
- **Documentation:**
  - Created comprehensive styling guide (`docs/custom-styling-guide.md`)
  - Added 9 Storybook stories demonstrating all features
  - Exported all new types and utilities from main index
- **Benefits:**
  - Enables targeting specific elements (header cells, rows, cells, title bars)
  - Supports hover state control and cell-level actions
  - Scalable pattern applicable to all future components
  - Maintains Mac OS 9 aesthetic while allowing customization

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