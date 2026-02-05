# @liiift-studio/mac-os9-ui

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
