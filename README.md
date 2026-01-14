# Mac OS 9 UI Component Library

A pixel-perfect Mac OS 9 UI component library for React and TypeScript. Bring authentic retro Mac OS 9 styling to your web applications with accessible, well-typed components.

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)

## Features

- 🎨 **Pixel-Perfect Design** - Faithful recreation of Mac OS 9 UI elements based on the original design system
- 📦 **TypeScript First** - Full TypeScript support with complete type definitions
- ♿ **Accessible** - WCAG 2.1 AA compliant components with proper ARIA attributes
- 🎭 **Dual Module Support** - ESM and CommonJS builds included
- 📖 **Storybook Docs** - Interactive component documentation and examples
- 🧪 **Fully Tested** - Comprehensive test coverage with Vitest

## Installation

```bash
npm install mac-os9-ui
```

## Quick Start

```tsx
import { Button, Window } from 'mac-os9-ui';
import 'mac-os9-ui/styles';

function App() {
	return (
		<Window title="My Application">
			<div style={{ padding: '16px' }}>
				<Button variant="primary">Click Me</Button>
			</div>
		</Window>
	);
}
```

## Components

### Form Controls
- **Button** - Classic Mac OS 9 buttons with variants (primary, default, cancel)
- **Checkbox** - Mac OS 9 style checkboxes
- **Radio** - Radio button groups
- **TextField** - Text input fields
- **Select** - Dropdown select menus

### Layout & Chrome
- **Window** - Classic Mac OS 9 window container
- **MenuBar** - Application menu bar with dropdown menus
- **Tabs** - Tabbed navigation component
- **Dialog** - Modal dialog windows

### Lists & Navigation
- **ListView** - List view with Mac OS 9 styling
- **FolderList** - Hierarchical folder/file list view
- **Scrollbar** - Custom Mac OS 9 styled scrollbars

### Utilities
- **Icon** - System icons (folder, document, trash, etc.)
- **IconButton** - Icon-only button variant

## Usage Examples

### Creating a Window with Menu Bar

```tsx
import { Window, MenuBar } from 'mac-os9-ui';
import 'mac-os9-ui/styles';

function MyApp() {
	const menuItems = [
		{
			label: 'File',
			items: [
				{ label: 'New', onClick: () => console.log('New') },
				{ label: 'Open...', onClick: () => console.log('Open') },
				{ type: 'separator' },
				{ label: 'Quit', onClick: () => console.log('Quit') },
			],
		},
		{
			label: 'Edit',
			items: [
				{ label: 'Cut', onClick: () => console.log('Cut') },
				{ label: 'Copy', onClick: () => console.log('Copy') },
				{ label: 'Paste', onClick: () => console.log('Paste') },
			],
		},
	];

	return (
		<Window title="My Application">
			<MenuBar items={menuItems} />
			{/* Your content here */}
		</Window>
	);
}
```

### Using Form Controls

```tsx
import { Button, Checkbox, TextField, Select } from 'mac-os9-ui';
import { useState } from 'react';

function MyForm() {
	const [checked, setChecked] = useState(false);
	const [text, setText] = useState('');
	const [selected, setSelected] = useState('');

	return (
		<div>
			<TextField
				label="Name"
				value={text}
				onChange={(e) => setText(e.target.value)}
			/>
			
			<Checkbox
				label="I agree to the terms"
				checked={checked}
				onChange={(e) => setChecked(e.target.checked)}
			/>
			
			<Select
				label="Choose an option"
				value={selected}
				onChange={(e) => setSelected(e.target.value)}
				options={[
					{ value: 'option1', label: 'Option 1' },
					{ value: 'option2', label: 'Option 2' },
					{ value: 'option3', label: 'Option 3' },
				]}
			/>
			
			<Button variant="primary" onClick={() => console.log('Submit')}>
				Submit
			</Button>
		</div>
	);
}
```

### Creating a Dialog

```tsx
import { Dialog, Button } from 'mac-os9-ui';
import { useState } from 'react';

function MyComponent() {
	const [open, setOpen] = useState(false);

	return (
		<>
			<Button onClick={() => setOpen(true)}>Open Dialog</Button>
			
			<Dialog
				open={open}
				onClose={() => setOpen(false)}
				title="Confirm Action"
			>
				<p>Are you sure you want to proceed?</p>
				<div style={{ display: 'flex', gap: '8px', marginTop: '16px' }}>
					<Button variant="primary" onClick={() => setOpen(false)}>
						OK
					</Button>
					<Button onClick={() => setOpen(false)}>Cancel</Button>
				</div>
			</Dialog>
		</>
	);
}
```

## Styling

The library includes CSS files that need to be imported in your application:

```tsx
import 'mac-os9-ui/styles';
```

This imports the theme variables and base styles. All components use CSS Modules internally, so styles are scoped and won't conflict with your application's CSS.

## TypeScript Support

All components are written in TypeScript and include full type definitions. Import types as needed:

```tsx
import type { ButtonProps, WindowProps } from 'mac-os9-ui';
```

## Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)

## Development

```bash
# Install dependencies
npm install

# Run Storybook for development
npm run dev

# Build the library
npm run build

# Run tests
npm test

# Run linting
npm run lint
```

## Attribution

This component library is based on the **Mac OS 9 UI Kit** created by [Michael Feeney](https://swallowmygraphicdesign.com/project/macostalgia).

Original Figma design: [Mac OS 9 UI Kit](https://www.figma.com/design/vy2T5MCXFz7QWf4Ba86eqN/Mac-OS-9--UI-Kit--Community-)

Design licensed under [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/)

## License

MIT License - see [LICENSE](./LICENSE) file for details.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## Links

- [GitHub Repository](https://github.com/Liiift-Studio/Mac-OS-9-React)
- [Report Issues](https://github.com/Liiift-Studio/Mac-OS-9-React/issues)
- [Changelog](./CHANGELOG.md)

---

Made with 💾 by [Liiift Studio](https://github.com/Liiift-Studio)
