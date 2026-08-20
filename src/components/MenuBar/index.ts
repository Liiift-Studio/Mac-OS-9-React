// MenuBar component exports
//
// MenuBar is also a compound namespace: MenuBar.Item and MenuBar.Dropdown
// mirror the flat exports, so the folder's grouping now matches a real API
// rather than only implying one (issue #118).

export { MenuBar } from './MenuBar';
export type { MenuBarProps, Menu, MenuItemDescriptor } from './MenuBar';

export { MenuItem, toAriaKeyShortcuts } from './MenuItem';
export type { MenuItemProps } from './MenuItem';

export { MenuDropdown } from './MenuDropdown';
export type { MenuDropdownProps } from './MenuDropdown';

export { MenuBar as default } from './MenuBar';
