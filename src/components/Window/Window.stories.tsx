// Window component stories

import type { Meta, StoryObj } from '@storybook/react';
import { Window } from './Window';
import { Button } from '../Button/Button';
import { TextField } from '../TextField/TextField';
import { Checkbox } from '../Checkbox/Checkbox';

const meta = {
	title: 'Components/Window',
	component: Window,
	parameters: {
		layout: 'centered',
	},
	tags: ['autodocs'],
	argTypes: {
		active: {
			control: 'boolean',
			description: 'Whether window is active/focused',
		},
		width: {
			control: 'text',
			description: 'Window width',
		},
		height: {
			control: 'text',
			description: 'Window height',
		},
		showControls: {
			control: 'boolean',
			description: 'Whether to show window controls',
		},
		resizable: {
			control: 'boolean',
			description: 'Whether window has resize handle',
		},
	},
} satisfies Meta<typeof Window>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Default window with title and content
 */
export const Default: Story = {
	args: {
		title: 'Untitled',
		children: (
			<div>
				<p>This is a classic Mac OS 9 window.</p>
				<p>It contains some content and has a title bar.</p>
			</div>
		),
	},
};

/**
 * Window with close button
 */
export const WithCloseButton: Story = {
	args: {
		title: 'Document',
		onClose: () => alert('Close clicked'),
		children: (
			<div>
				<p>This window has a close button.</p>
				<p>Click the X button to see the callback.</p>
			</div>
		),
	},
};

/**
 * Window with all controls
 */
export const WithAllControls: Story = {
	args: {
		title: 'My Document',
		onClose: () => alert('Close'),
		onMinimize: () => alert('Minimize'),
		onMaximize: () => alert('Maximize'),
		children: (
			<div>
				<p>This window has all three window controls:</p>
				<ul>
					<li>Close (X)</li>
					<li>Minimize (−)</li>
					<li>Maximize (□)</li>
				</ul>
			</div>
		),
	},
};

/**
 * Window without controls
 */
export const NoControls: Story = {
	args: {
		title: 'Alert',
		showControls: false,
		children: (
			<div>
				<p>This window has no controls in the title bar.</p>
				<p>Useful for dialogs or panels.</p>
			</div>
		),
	},
};

/**
 * Inactive window (unfocused)
 */
export const Inactive: Story = {
	args: {
		title: 'Background Window',
		active: false,
		onClose: () => alert('Close'),
		children: (
			<div>
				<p>This window is inactive (slightly dimmed).</p>
				<p>Toggle the 'active' prop to see the difference.</p>
			</div>
		),
	},
};

/**
 * Window with custom size
 */
export const CustomSize: Story = {
	args: {
		title: 'Custom Window',
		width: 500,
		height: 300,
		onClose: () => alert('Close'),
		children: (
			<div>
				<p>This window has custom dimensions:</p>
				<p>Width: 500px</p>
				<p>Height: 300px</p>
			</div>
		),
	},
};

/**
 * Narrow window
 */
export const Narrow: Story = {
	args: {
		title: 'Narrow Window',
		width: 250,
		onClose: () => alert('Close'),
		children: (
			<div>
				<p>This is a narrow window.</p>
				<p>The title truncates if it's too long for the space available.</p>
			</div>
		),
	},
};

/**
 * Wide window
 */
export const Wide: Story = {
	args: {
		title: 'Wide Window',
		width: 800,
		height: 400,
		onClose: () => alert('Close'),
		children: (
			<div>
				<p>This is a wide window with plenty of horizontal space.</p>
				<p>Great for displaying multiple columns or wide content.</p>
			</div>
		),
	},
};

/**
 * Window with form controls
 */
export const WithFormControls: Story = {
	args: {
		title: 'Preferences',
		width: 400,
		onClose: () => alert('Close'),
		children: (
			<div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
				<TextField label="Name" defaultValue="User" />
				<TextField label="Email" defaultValue="user@example.com" />
				<Checkbox label="Enable notifications" defaultChecked />
				<Checkbox label="Auto-save documents" />
				<div style={{ display: 'flex', gap: '8px', marginTop: '16px' }}>
					<Button variant="primary">Save</Button>
					<Button>Cancel</Button>
				</div>
			</div>
		),
	},
};

/**
 * Window with lots of content (scrollable)
 */
export const ScrollableContent: Story = {
	args: {
		title: 'Long Document',
		width: 400,
		height: 300,
		onClose: () => alert('Close'),
		children: (
			<div>
				<h2>Lorem Ipsum</h2>
				<p>
					Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor
					incididunt ut labore et dolore magna aliqua.
				</p>
				<p>
					Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip
					ex ea commodo consequat.
				</p>
				<p>
					Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu
					fugiat nulla pariatur.
				</p>
				<p>
					Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt
					mollit anim id est laborum.
				</p>
				<p>
					Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium
					doloremque laudantium.
				</p>
				<p>
					Totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto
					beatae vitae dicta sunt explicabo.
				</p>
			</div>
		),
	},
};

/**
 * Window with resize handle
 */
export const Resizable: Story = {
	args: {
		title: 'Resizable Window',
		width: 400,
		height: 300,
		resizable: true,
		onClose: () => alert('Close'),
		children: (
			<div>
				<p>This window has a resize handle in the bottom-right corner.</p>
				<p>Look for the diagonal lines in the corner.</p>
				<p>(Note: actual resizing functionality would be implemented by the consumer.)</p>
			</div>
		),
	},
};

/**
 * Simple alert-style window
 */
export const Alert: Story = {
	args: {
		title: 'Alert',
		width: 350,
		showControls: false,
		children: (
			<div style={{ textAlign: 'center' }}>
				<p style={{ marginBottom: '24px' }}>
					Are you sure you want to quit without saving?
				</p>
				<div style={{ display: 'flex', gap: '8px', justifyContent: 'center' }}>
					<Button variant="primary">Don't Save</Button>
					<Button>Cancel</Button>
					<Button>Save</Button>
				</div>
			</div>
		),
	},
};

/**
 * Window without title
 */
export const NoTitle: Story = {
	args: {
		children: (
			<div>
				<p>This window has no title bar.</p>
				<p>Good for custom layouts or embedded panels.</p>
			</div>
		),
	},
};

/**
 * Multiple windows stacked (active vs inactive)
 */
export const MultipleWindows: Story = {
	args: {
		children: <></>,
	},
	render: () => (
		<div style={{ position: 'relative', width: '600px', height: '400px' }}>
			<div style={{ position: 'absolute', top: '50px', left: '50px' }}>
				<Window title="Background Window" width={300} height={200} active={false}>
					<p>This window is in the background.</p>
				</Window>
			</div>
			<div style={{ position: 'absolute', top: '100px', left: '150px' }}>
				<Window
					title="Active Window"
					width={300}
					height={200}
					active={true}
					onClose={() => alert('Close')}
				>
					<p>This window is active and in front.</p>
				</Window>
			</div>
		</div>
	),
};
