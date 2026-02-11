---
'@liiift-studio/mac-os9-ui': patch
---

Add draggable feature to Window and FolderList components

- Added optional `draggable` prop to enable drag-by-title-bar functionality
- Windows stay in normal document flow until first dragged, then become absolutely positioned
- Supports both controlled (`position`/`onPositionChange`) and uncontrolled (`defaultPosition`) patterns
- Added `WindowPosition` type to common exports
- Title bar shows grab cursor when draggable is enabled
- Window control buttons (close, minimize, maximize) do not trigger drag
- Fully backward compatible - draggable defaults to false
