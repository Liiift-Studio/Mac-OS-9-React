# @liiift-studio/mac-os9-ui

## Unreleased

### Minor Changes

- Add comprehensive custom styling and element targeting system
  - **New `classes` prop** on ListView, FolderList, and Window components for targeting sub-elements
  - **Render props** (renderRow, renderCell, renderHeaderCell) for complete rendering control
  - **Cell-level interactions** with onCellClick, onCellMouseEnter, and onCellMouseLeave callbacks
  - **Automatic data attributes** for CSS-only targeting without JavaScript
  - **Internal hover state tracking** for rows and cells
  - All features are fully backwards compatible and opt-in

### Patch Changes

- Add `mergeClasses` and `createClassBuilder` utility functions for class name management
- Export new TypeScript interfaces: ListViewClasses, FolderListClasses, WindowClasses, RowRenderState, RowDefaultProps, CellRenderState, HeaderCellRenderState, HeaderCellDefaultProps
- Add comprehensive Storybook documentation with 9 new stories demonstrating all customization approaches
- Add detailed styling guide documentation in `docs/custom-styling-guide.md`
- Improve responsive typography with mobile-first approach
  - Mobile base: 14px (optimal for small screens)
  - Small mobile (480px+): 15px
  - Tablet (768px+): 16px
  - Desktop (1024px+): 16px
  - Large desktop (1440px+): 18px

## 0.2.22

### Patch Changes

- Add submenu functionality to MenuItem component with hover-to-show support
- Add new submenu-focused Storybook examples demonstrating the items prop
- Rename WithSubmenus story to WithSubmenuIndicators for clarity
- Add comprehensive WithSubmenus story showcasing functional nested menus

## 0.2.21

### Patch Changes

- Fix build configuration where fonts were being copied to a nested `dist/fonts` folder instead of the root `fonts` folder in the distribution.

## 0.2.20

### Patch Changes

- Fix build configuration where fonts were being copied to a nested `dist/fonts` folder instead of the root `fonts` folder in the distribution.
- Updated dependencies
  - @liiift-studio/mac-os9-ui@0.2.20

## 0.2.19

### Patch Changes

- Fix NPM publication issue where font files were excluded by gitignore. Added .npmignore to ensure fonts are included in the package.

## 0.2.18

### Patch Changes

- Fix regression where font paths in CSS were incorrect (referencing dist/fonts instead of fonts).

## 0.2.17

### Patch Changes

- Fix font loading issue by bundling fonts in distribution and correcting import paths.

## 0.1.1

### Patch Changes

- Add React 19 compatibility to peer dependencies

## 0.1.0

### Minor Changes

- Initial release of Mac OS 9 UI Component Library

This is the first public release of the @liiift-studio/mac-os9-ui component library, featuring pixel-perfect Mac OS 9 styled React components.

#### Components Included

- **Form Controls**: Button, Checkbox, Radio, TextField, Select
- **Layout & Chrome**: Window, TitleBar, MenuBar, Tabs, Dialog
- **Lists & Navigation**: ListView, FolderList, Scrollbar
- **Utilities**: Icon, IconButton

#### Features

- Full TypeScript support with type definitions
- Dual ESM/CJS module exports
- Accessible components (WCAG 2.1 AA)
- CSS Modules for scoped styling
- Comprehensive Storybook documentation
- Pixel-perfect Mac OS 9 design fidelity
