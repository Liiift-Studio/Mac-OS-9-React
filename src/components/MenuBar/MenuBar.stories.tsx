// MenuBar component stories

import type { Meta, StoryObj } from '@storybook/react';
import React, { useState, useEffect } from 'react';
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

// Simple logo component for examples
const Logo = () => (
	<div style={{ 
		width: '16px', 
		height: '16px', 
		backgroundColor: '#000', 
		borderRadius: '2px',
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
		color: '#fff',
		fontSize: '10px',
		fontWeight: 'bold'
	}}>
		
	</div>
);

// Simple divider component for examples
const Divider = () => (
	<div style={{ 
		width: '1px', 
		height: '16px', 
		backgroundColor: '#999',
		alignSelf: 'center'
	}} />
);

// Simple clock component for examples
const Clock = () => {
	const [time, setTime] = useState(new Date().toLocaleTimeString('en-US', { 
		hour: 'numeric', 
		minute: '2-digit' 
	}));

	useEffect(() => {
		const timer = setInterval(() => {
			setTime(new Date().toLocaleTimeString('en-US', { 
				hour: 'numeric', 
				minute: '2-digit' 
			}));
		}, 1000);
		return () => clearInterval(timer);
	}, []);

	return <div style={{ fontSize: '12px', fontWeight: 'bold' }}>{time}</div>;
};

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
 * Menu with logo (left content)
 */
export const WithLogo: Story = {
	render: () => {
		const [openMenu, setOpenMenu] = useState<number | undefined>();

		return (
			<MenuBar
				leftContent={<Logo />}
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
 * Menu with right content (status area)
 */
export const WithStatusArea: Story = {
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
			]}
			rightContent={[
				<Clock key="clock" />,
				<Divider key="divider" />,
				<div key="finder" style={{ fontSize: '12px', fontWeight: 'bold' }}>Finder</div>,
			]}
			/>
		);
	},
};

/**
 * Menu with link-type items
 */
export const WithLinkItems: Story = {
	render: () => {
		const [openMenu, setOpenMenu] = useState<number | undefined>();

		return (
			<MenuBar
				openMenuIndex={openMenu}
				onMenuOpen={setOpenMenu}
				onMenuClose={() => setOpenMenu(undefined)}
				menus={[
					{
						label: 'Home',
						type: 'link',
						href: '#home',
						onClick: () => console.log('Navigate to Home'),
					},
					{
						label: 'About',
						type: 'link',
						href: '#about',
						onClick: () => console.log('Navigate to About'),
					},
					{
						label: 'File',
						type: 'dropdown',
						items: (
							<>
								<MenuItem label="New" onClick={() => console.log('New')} />
								<MenuItem label="Open..." onClick={() => console.log('Open')} />
								<MenuItem label="Save" onClick={() => console.log('Save')} />
							</>
						),
					},
					{
						label: 'Contact',
						type: 'link',
						href: '#contact',
						onClick: () => console.log('Navigate to Contact'),
					},
				]}
			/>
		);
	},
};

/**
 * Complete Mac OS 9 style menu with all features
 */
export const MacOS9Style: Story = {
	render: () => {
		const [openMenu, setOpenMenu] = useState<number | undefined>();

		return (
			<MenuBar
				leftContent={<Logo />}
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
			rightContent={[
				<Clock key="clock" />,
				<Divider key="divider" />,
				<div key="finder" style={{ fontSize: '12px', fontWeight: 'bold' }}>Finder</div>,
			]}
			/>
		);
	},
};
