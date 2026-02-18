import type { Preview } from '@storybook/react';
import '../src/styles/theme.css';
import '../src/styles/base.css';

const preview: Preview = {
	parameters: {
		controls: {
			matchers: {
				color: /(background|color)$/i,
				date: /Date$/i,
			},
		},
		backgrounds: {
			default: 'mac-os-9',
			values: [
				{
					name: 'mac-os-9',
					value: '#c0c0c0',
				},
				{
					name: 'white',
					value: '#ffffff',
				},
				{
					name: 'dark',
					value: '#333333',
				},
			],
		},
	},
};

export default preview;