---
'@liiift-studio/mac-os9-ui': patch
---

Add draggable and resizable features to Window and FolderList components

**Draggable Windows:**
- Added optional `draggable` prop to enable drag-by-title-bar functionality
- Windows stay in normal document flow until first dragged, then become absolutely positioned
- Supports both controlled (`position`/`onPositionChange`) and uncontrolled (`defaultPosition`) patterns
- Added `WindowPosition` type to common exports
- Title bar shows grab cursor when draggable is enabled
- Window control buttons (close, minimize, maximize) do not trigger drag
- Fixed mouse position offset issue by calculating positions relative to parent container

**Resizable Windows:**
- Implemented fully functional window resizing via resize handle
- Added `onResize` callback to track size changes
- Added `minWidth`, `minHeight`, `maxWidth`, `maxHeight` props for size constraints
- Resize handle in bottom-right corner with nwse-resize cursor
- Default minimum size: 200×100px
- Smooth resize with real-time dimension updates

**Compatibility:**
- Fully backward compatible - both features default to false
- Windows can be both draggable and resizable simultaneously
- FolderList component inherits both features automatically
