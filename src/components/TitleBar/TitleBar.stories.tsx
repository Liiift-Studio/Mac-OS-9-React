/*
 * TitleBar Stories - TEMPORARILY COMMENTED OUT
 * 
 * Reason: Component is unusable and looks bad, needs visual refinement
 * Date: 2026-01-15
 * 
 * TODO: Uncomment and refine when ready to improve visual design
 */

/*
// TitleBar component stories

import type { Meta, StoryObj } from '@storybook/react';
import { TitleBar } from './TitleBar';
import { Button } from '../Button/Button';

const meta = {
	title: 'Components/TitleBar',
	component: TitleBar,
	parameters: {
		layout: 'centered',
	},
	tags: ['autodocs'],
	argTypes: {
		title: {
			control: 'text',
			description: 'Window title text',
		},
		active: {
			control: 'boolean',
			description: 'Whether the title bar is active/focused',
		},
		showControls: {
			control: 'boolean',
			description: 'Whether to show window controls',
		},
		showClose: {
			control: 'boolean',
			description: 'Whether to show close button',
		},
		showMinimize: {
			control: 'boolean',
			description: 'Whether to show minimize button',
		},
		showMaximize: {
			control: 'boolean',
			description: 'Whether to show maximize button',
		},
		draggable: {
			control: 'boolean',
			description: 'Whether the title bar is draggable',
		},
	},
} satisfies Meta<typeof TitleBar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {
		title: 'Untitled',
	},
};

export const WithCloseButton: Story = {
	args: {
		title: 'Document',
		onClose: () => alert('Close clicked'),
	},
};

export const WithAllControls: Story = {
	args: {
		title: 'My Document',
		onClose: () => alert('Close'),
		onMinimize: () => alert('Minimize'),
		onMaximize: () => alert('Maximize'),
	},
};

export const NoControls: Story = {
	args: {
		title: 'Alert',
		showControls: false,
	},
};

export const Inactive: Story = {
	args: {
		title: 'Background Window',
		active: false,
		onClose: () => alert('Close'),
	},
};

export const ActiveVsInactive: Story = {
	args: {
		title: 'Window Title',
	},
	render: () => (
		<div style={{ display: 'flex', flexDirection: 'column', gap: '16px', width: '400px' }}>
			<div>
				<p style={{ marginBottom: '8px', fontSize: '12px', fontWeight: 'bold' }}>Active:</p>
				<TitleBar title="Active Window" active={true} onClose={() => alert('Close')} />
			</div>
			<div>
				<p style={{ marginBottom: '8px', fontSize: '12px', fontWeight: 'bold' }}>Inactive:</p>
				<TitleBar title="Inactive Window" active={false} onClose={() => alert('Close')} />
			</div>
		</div>
	),
};

export const OnlyCloseButton: Story = {
	args: {
		title: 'Alert Dialog',
		showMinimize: false,
		showMaximize: false,
		onClose: () => alert('Close'),
	},
};

export const CloseAndMinimize: Story = {
	args: {
		title: 'Utility Window',
		showMaximize: false,
		onClose: () => alert('Close'),
		onMinimize: () => alert('Minimize'),
	},
};

export const Draggable: Story = {
	args: {
		title: 'Draggable Window',
		draggable: true,
		onClose: () => alert('Close'),
		onDragStart: (e) => console.log('Drag started at:', e.clientX, e.clientY),
	},
};

export const WithDoubleClick: Story = {
	args: {
		title: 'Double-click to maximize',
		onClose: () => alert('Close'),
		onDoubleClick: () => alert('Double-clicked! (Toggle maximize)'),
	},
};

export const LongTitle: Story = {
	args: {
		title: 'This is a very long window title that will be truncated with an ellipsis',
		onClose: () => alert('Close'),
	},
	decorators: [
		(Story) => (
			<div style={{ width: '300px' }}>
				<Story />
			</div>
		),
	],
};

export const ShortTitle: Story = {
	args: {
		title: 'Hi',
		onClose: () => alert('Close'),
	},
	decorators: [
		(Story) => (
			<div style={{ width: '300px' }}>
				<Story />
			</div>
		),
	],
};

export const WithRightContent: Story = {
	args: {
		title: 'Document',
		onClose: () => alert('Close'),
		rightContent: (
			<div style={{ display: 'flex', gap: '4px', alignItems: 'center' }}>
				<Button size="sm">Save</Button>
				<span style={{ fontSize: '11px', color: '#666' }}>Modified</span>
			</div>
		),
	},
	decorators: [
		(Story) => (
			<div style={{ width: '500px' }}>
				<Story />
			</div>
		),
	],
};

export const Narrow: Story = {
	args: {
		title: 'Palette',
		onClose: () => alert('Close'),
	},
	decorators: [
		(Story) => (
			<div style={{ width: '200px' }}>
				<Story />
			</div>
		),
	],
};

export const Wide: Story = {
	args: {
		title: 'Main Application Window',
		onClose: () => alert('Close'),
		onMinimize: () => alert('Minimize'),
		onMaximize: () => alert('Maximize'),
	},
	decorators: [
		(Story) => (
			<div style={{ width: '800px' }}>
				<Story />
			</div>
		),
	],
};

export const Variations: Story = {
	args: {
		title: 'Window',
	},
	render: () => (
		<div style={{ display: 'flex', flexDirection: 'column', gap: '12px', width: '400px' }}>
			<div>
				<p style={{ marginBottom: '4px', fontSize: '11px', color: '#666' }}>
					Default (no controls):
				</p>
				<TitleBar title="Window Title" />
			</div>
			<div>
				<p style={{ marginBottom: '4px', fontSize: '11px', color: '#666' }}>With close only:</p>
				<TitleBar
					title="Window Title"
					showMinimize={false}
					showMaximize={false}
					onClose={() => alert('Close')}
				/>
			</div>
			<div>
				<p style={{ marginBottom: '4px', fontSize: '11px', color: '#666' }}>
					With all controls:
				</p>
				<TitleBar
					title="Window Title"
					onClose={() => alert('Close')}
					onMinimize={() => alert('Minimize')}
					onMaximize={() => alert('Maximize')}
				/>
			</div>
			<div>
				<p style={{ marginBottom: '4px', fontSize: '11px', color: '#666' }}>Inactive:</p>
				<TitleBar
					title="Window Title"
					active={false}
					onClose={() => alert('Close')}
					onMinimize={() => alert('Minimize')}
				/>
			</div>
			<div>
				<p style={{ marginBottom: '4px', fontSize: '11px', color: '#666' }}>Draggable:</p>
				<TitleBar
					title="Window Title"
					draggable
					onClose={() => alert('Close')}
					onDragStart={(e) => console.log('Drag started')}
				/>
			</div>
		</div>
	),
};

export const AsStandaloneHeader: Story = {
	args: {
		title: 'Application',
		onClose: () => alert('Close'),
		onMinimize: () => alert('Minimize'),
		onMaximize: () => alert('Maximize'),
	},
	render: (args) => (
		<div style={{ width: '600px', border: '1px solid #000', backgroundColor: '#DDDDDD' }}>
			<TitleBar {...args} />
			<div style={{ padding: '16px' }}>
				<h2>Content Area</h2>
				<p>The TitleBar component can be used standalone as a header.</p>
				<p>It doesn't need to be inside a Window component.</p>
			</div>
		</div>
	),
};

export const CustomStyling: Story = {
	args: {
		title: 'Custom Styled',
		onClose: () => alert('Close'),
		className: 'custom-title-bar',
		titleClassName: 'custom-title',
		controlsClassName: 'custom-controls',
	},
	decorators: [
		(Story) => (
			<div style={{ width: '400px' }}>
				<style>{`
					.custom-title-bar {
						border: 2px solid #000 !important;
					}
					.custom-title {
						color: #0000FF !important;
					}
					.custom-controls {
						opacity: 0.8;
					}
				`}</style>
				<Story />
			</div>
		),
	],
};
*/
