// Mac OS 9 UI Component Library
// Main export file for all components and utilities

// Note: Users must import '@liiift-studio/mac-os9-ui/styles' in their app entry point
// This import is for internal use during development/build only
import './styles/theme.css';

// Export components
export { Button, type ButtonProps } from './components/Button';
export { Icon, IconLibrary, type IconProps, type IconLibraryProps, type IconName } from './components/Icon';
export { IconButton, type IconButtonProps } from './components/IconButton';
export { Checkbox, type CheckboxProps } from './components/Checkbox';
export { Radio, type RadioProps } from './components/Radio';
export { TextField, type TextFieldProps } from './components/TextField';
export { Select, type SelectProps, type SelectOption } from './components/Select';
export { Tabs, TabPanel, type TabsProps, type TabPanelProps } from './components/Tabs';
export { Window, type WindowProps } from './components/Window';
export { Dialog, type DialogProps } from './components/Dialog';
// export { TitleBar, type TitleBarProps } from './components/TitleBar'; // Hidden - needs visual refinement
export { MenuBar, MenuItem, type MenuBarProps, type MenuItemProps, type Menu } from './components/MenuBar';
export { Scrollbar, type ScrollbarProps } from './components/Scrollbar';
export { ListView, type ListViewProps, type ListColumn, type ListItem } from './components/ListView';
export { FolderList, type FolderListProps } from './components/FolderList';

// Export all icon components from Icon library
export * from './components/Icon/categories';

// Export design tokens
export * from './tokens';

// Export types
export type * from './types';
