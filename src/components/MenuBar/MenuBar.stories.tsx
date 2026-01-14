// MenuBar component stories

import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { MenuBar } from './MenuBar';
import { MenuItem } from './MenuItem';

const meta: Meta<typeof MenuBar> = {
	title: 'Components/MenuBar',
	component: MenuBar,
	parameters: {
		layout: 'fullscreen',
	},
	tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Basic menu bar with simple menus
 */
export const Default: Story = {
	render: () => {
		const [openMenu, setOpenMenu] = useState<number | undefined>();

		return (
			<MenuBar
				openMenuIndex={openMenu}
				onMenuOpen={setOpenMenu}
				onMenuClose={() => setOpenMenu(undefined)}
				menus={[
					{
						label: 'File',
						items: (
							<>
								<MenuItem label="New" onClick={() => console.log('New')} />
								<MenuItem label="Open..." onClick={() => console.log('Open')} />
								<MenuItem label="Save" onClick={() => console.log('Save')} />
							</>
						),
					},
					{
						label: 'Edit',
						items: (
							<>
								<MenuItem label="Undo" onClick={() => console.log('Undo')} />
								<MenuItem label="Redo" onClick={() => console.log('Redo')} />
							</>
						),
					},
				]}
			/>
		);
	},
};

/**
 * Menu with keyboard shortcuts
 */
export const WithShortcuts: Story = {
	render: () => {
		const [openMenu, setOpenMenu] = useState<number | undefined>();

		return (
			<MenuBar
				openMenuIndex={openMenu}
				onMenuOpen={setOpenMenu}
				onMenuClose={() => setOpenMenu(undefined)}
				menus={[
					{
						label: 'File',
						items: (
							<>
								<MenuItem label="New" shortcut="⌘N" onClick={() => console.log('New')} />
								<MenuItem label="Open..." shortcut="⌘O" onClick={() => console.log('Open')} />
								<MenuItem label="Save" shortcut="⌘S" onClick={() => console.log('Save')} />
							</>
						),
					},
					{
						label: 'Edit',
						items: (
							<>
								<MenuItem label="Undo" shortcut="⌘Z" onClick={() => console.log('Undo')} />
								<MenuItem label="Redo" shortcut="⇧⌘Z" onClick={() => console.log('Redo')} />
							</>
						),
					},
				]}
			/>
		);
	},
};

/**
 * Menu with checkmarks
 */
export const WithCheckmarks: Story = {
	render: () => {
		const [openMenu, setOpenMenu] = useState<number | undefined>();
		const [showGrid, setShowGrid] = useState(true);
		const [showRulers, setShowRulers] = useState(false);

		return (
			<MenuBar
				openMenuIndex={openMenu}
				onMenuOpen={setOpenMenu}
				onMenuClose={() => setOpenMenu(undefined)}
				menus={[
					{
						label: 'View',
						items: (
							<>
								<MenuItem
									label="Show Grid"
									checked={showGrid}
									onClick={() => setShowGrid(!showGrid)}
								/>
								<MenuItem
									label="Show Rulers"
									checked={showRulers}
									onClick={() => setShowRulers(!showRulers)}
								/>
							</>
						),
					},
				]}
			/>
		);
	},
};

/**
 * Menu with separators
 */
export const WithSeparators: Story = {
	render: () => {
		const [openMenu, setOpenMenu] = useState<number | undefined>();

		return (
			<MenuBar
				openMenuIndex={openMenu}
				onMenuOpen={setOpenMenu}
				onMenuClose={() => setOpenMenu(undefined)}
				menus={[
					{
						label: 'File',
						items: (
							<>
								<MenuItem label="New" onClick={() => console.log('New')} />
								<MenuItem label="Open..." onClick={() => console.log('Open')} />
								<MenuItem separator label="Save" onClick={() => console.log('Save')} />
								<MenuItem label="Save As..." onClick={() => console.log('Save As')} />
								<MenuItem separator label="Quit" onClick={() => console.log('Quit')} />
							</>
						),
					},
				]}
			/>
		);
	},
};

/**
 * Menu with disabled items
 */
export const WithDisabledItems: Story = {
	render: () => {
		const [openMenu, setOpenMenu] = useState<number | undefined>();

		return (
			<MenuBar
				openMenuIndex={openMenu}
				onMenuOpen={setOpenMenu}
				onMenuClose={() => setOpenMenu(undefined)}
				menus={[
					{
						label: 'Edit',
						items: (
							<>
								<MenuItem label="Undo" disabled shortcut="⌘Z" />
								<MenuItem label="Redo" disabled shortcut="⇧⌘Z" />
								<MenuItem separator label="Cut" shortcut="⌘X" onClick={() => console.log('Cut')} />
								<MenuItem label="Copy" shortcut="⌘C" onClick={() => console.log('Copy')} />
								<MenuItem label="Paste" disabled shortcut="⌘V" />
							</>
						),
					},
				]}
			/>
		);
	},
};

/**
 * Menu with submenu indicators
 */
export const WithSubmenus: Story = {
	render: () => {
		const [openMenu, setOpenMenu] = useState<number | undefined>();

		return (
			<MenuBar
				openMenuIndex={openMenu}
				onMenuOpen={setOpenMenu}
				onMenuClose={() => setOpenMenu(undefined)}
				menus={[
					{
						label: 'File',
						items: (
							<>
								<MenuItem label="New" hasSubmenu />
								<MenuItem label="Open Recent" hasSubmenu />
								<MenuItem separator label="Save" onClick={() => console.log('Save')} />
								<MenuItem label="Export" hasSubmenu />
							</>
						),
					},
				]}
			/>
		);
	},
};

/**
 * Complete Mac OS 9 style menu
 */
export const MacOS9Style: Story = {
	render: () => {
		const [openMenu, setOpenMenu] = useState<number | undefined>();

		return (
			<MenuBar
				openMenuIndex={openMenu}
				onMenuOpen={setOpenMenu}
				onMenuClose={() => setOpenMenu(undefined)}
				menus={[
					{
						label: 'File',
						items: (
							<>
								<MenuItem label="New" shortcut="⌘N" onClick={() => alert('New')} />
								<MenuItem label="Open..." shortcut="⌘O" onClick={() => alert('Open')} />
								<MenuItem separator label="Save" shortcut="⌘S" onClick={() => alert('Save')} />
								<MenuItem label="Save As..." shortcut="⇧⌘S" onClick={() => alert('Save As')} />
								<MenuItem separator label="Quit" shortcut="⌘Q" onClick={() => alert('Quit')} />
							</>
						),
					},
					{
						label: 'Edit',
						items: (
							<>
								<MenuItem label="Undo" disabled shortcut="⌘Z" />
								<MenuItem label="Redo" disabled shortcut="⇧⌘Z" />
								<MenuItem separator label="Cut" shortcut="⌘X" onClick={() => {}} />
								<MenuItem label="Copy" shortcut="⌘C" onClick={() => {}} />
								<MenuItem label="Paste" shortcut="⌘V" onClick={() => {}} />
							</>
						),
					},
					{
						label: 'View',
						items: (
							<>
								<MenuItem label="Zoom In" shortcut="⌘+" onClick={() => {}} />
								<MenuItem label="Zoom Out" shortcut="⌘-" onClick={() => {}} />
								<MenuItem label="Actual Size" shortcut="⌘0" onClick={() => {}} />
							</>
						),
					},
				]}
			/>
		);
	},
};