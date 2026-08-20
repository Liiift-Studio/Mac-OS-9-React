// MenuBar Component Tests
//
// Covers the WAI-ARIA menubar semantics, roving tabindex, trigger-labelled
// dropdowns, descriptor-driven items and shortcut exposure.

import { describe, it, expect, vi, afterEach } from 'vitest';
import { render, screen, cleanup, fireEvent } from '@testing-library/react';
import { MenuBar, type Menu, type MenuItemDescriptor } from './MenuBar';
import { toAriaKeyShortcuts } from './MenuItem';

afterEach(cleanup);

const menus: Menu[] = [
	{ label: 'File', type: 'dropdown', items: <div>file items</div> },
	{ label: 'Edit', type: 'dropdown', items: <div>edit items</div> },
	{ label: 'Help', type: 'dropdown', items: <div>help items</div> },
];

describe('MenuBar', () => {
	// ========================================
	// Menubar semantics (issue #32, #33)
	// ========================================

	it('gives every trigger role="menuitem"', () => {
		render(<MenuBar menus={menus} />);
		expect(screen.getAllByRole('menuitem')).toHaveLength(3);
	});

	it('renders no headings inside the menubar', () => {
		const { container } = render(<MenuBar menus={menus} />);
		expect(container.querySelectorAll('h1,h2,h3,h4,h5,h6')).toHaveLength(0);
	});

	it('keeps exactly one trigger in the tab order', () => {
		render(<MenuBar menus={menus} />);
		const tabbable = screen.getAllByRole('menuitem').filter((el) => el.tabIndex === 0);
		expect(tabbable).toHaveLength(1);
		expect(tabbable[0]).toHaveTextContent('File');
	});

	it('moves the roving tab stop with ArrowRight and wraps', () => {
		render(<MenuBar menus={menus} />);
		const bar = screen.getByRole('menubar');

		fireEvent.keyDown(bar, { key: 'ArrowRight' });
		expect(document.activeElement).toHaveTextContent('Edit');

		fireEvent.keyDown(bar, { key: 'ArrowRight' });
		expect(document.activeElement).toHaveTextContent('Help');

		fireEvent.keyDown(bar, { key: 'ArrowRight' });
		expect(document.activeElement).toHaveTextContent('File');
	});

	it('supports Home and End', () => {
		render(<MenuBar menus={menus} />);
		const bar = screen.getByRole('menubar');
		fireEvent.keyDown(bar, { key: 'End' });
		expect(document.activeElement).toHaveTextContent('Help');
		fireEvent.keyDown(bar, { key: 'Home' });
		expect(document.activeElement).toHaveTextContent('File');
	});

	it('skips disabled menus when moving focus', () => {
		render(
			<MenuBar
				menus={[
					{ label: 'File', type: 'dropdown', items: <div /> },
					{ label: 'Edit', type: 'dropdown', items: <div />, disabled: true },
					{ label: 'Help', type: 'dropdown', items: <div /> },
				]}
			/>
		);
		fireEvent.keyDown(screen.getByRole('menubar'), { key: 'ArrowRight' });
		expect(document.activeElement).toHaveTextContent('Help');
	});

	// ========================================
	// Dropdown labelling (issue #35)
	// ========================================

	it('labels an open dropdown by its trigger', () => {
		render(<MenuBar menus={menus} />);
		fireEvent.click(screen.getByRole('menuitem', { name: 'File' }));

		const menu = screen.getByRole('menu');
		const trigger = screen.getByRole('menuitem', { name: 'File' });
		expect(menu).toHaveAttribute('aria-labelledby', trigger.id);
		expect(menu).toHaveAccessibleName('File');
	});

	it('reflects open state through aria-expanded', () => {
		render(<MenuBar menus={menus} />);
		const trigger = screen.getByRole('menuitem', { name: 'File' });
		expect(trigger).toHaveAttribute('aria-expanded', 'false');
		fireEvent.click(trigger);
		expect(trigger).toHaveAttribute('aria-expanded', 'true');
	});

	it('switches menus on hover once one is open', () => {
		render(<MenuBar menus={menus} />);
		fireEvent.click(screen.getByRole('menuitem', { name: 'File' }));
		fireEvent.mouseEnter(screen.getByRole('menuitem', { name: 'Edit' }));
		expect(screen.getByRole('menuitem', { name: 'Edit' })).toHaveAttribute('aria-expanded', 'true');
	});

	it('does not open on hover when no menu is open', () => {
		render(<MenuBar menus={menus} />);
		fireEvent.mouseEnter(screen.getByRole('menuitem', { name: 'Edit' }));
		expect(screen.queryByRole('menu')).toBeNull();
	});

	// ========================================
	// Dismissal (issue #36)
	// ========================================

	it('closes on Escape', () => {
		render(<MenuBar menus={menus} />);
		fireEvent.click(screen.getByRole('menuitem', { name: 'File' }));
		expect(screen.getByRole('menu')).toBeInTheDocument();

		fireEvent.keyDown(document, { key: 'Escape' });
		expect(screen.queryByRole('menu')).toBeNull();
	});

	it('does not dismiss before an outside click handler runs', () => {
		const onOutsideClick = vi.fn();
		render(
			<>
				<MenuBar menus={menus} />
				<button type="button" onClick={onOutsideClick}>
					outside
				</button>
			</>
		);
		fireEvent.click(screen.getByRole('menuitem', { name: 'File' }));

		// A full press-and-click on the outside control: its own handler must
		// still fire, which mousedown-based dismissal used to prevent.
		const outside = screen.getByRole('button', { name: 'outside' });
		fireEvent.pointerDown(outside);
		fireEvent.click(outside);

		expect(onOutsideClick).toHaveBeenCalledTimes(1);
	});

	// ========================================
	// Descriptor-driven items (issue #100)
	// ========================================

	it('renders structured item descriptors', () => {
		const onSelect = vi.fn();
		const items: MenuItemDescriptor[] = [
			{ label: 'New', shortcut: '⌘N', onSelect },
			{ label: 'Open', shortcut: '⌘O' },
			{ label: 'Quit', disabled: true },
		];
		render(<MenuBar menus={[{ label: 'File', type: 'dropdown', items }]} />);
		fireEvent.click(screen.getByRole('menuitem', { name: 'File' }));

		expect(screen.getByRole('menuitem', { name: /New/ })).toBeInTheDocument();
		expect(screen.getByRole('menuitem', { name: /Quit/ })).toBeDisabled();

		fireEvent.click(screen.getByRole('menuitem', { name: /New/ }));
		expect(onSelect).toHaveBeenCalledTimes(1);
	});

	it('still accepts JSX items', () => {
		render(<MenuBar menus={menus} />);
		fireEvent.click(screen.getByRole('menuitem', { name: 'File' }));
		expect(screen.getByText('file items')).toBeInTheDocument();
	});

	// ========================================
	// Compound API (issue #118)
	// ========================================

	it('exposes MenuBar.Item and MenuBar.Dropdown', () => {
		expect(MenuBar.Item).toBeDefined();
		expect(MenuBar.Dropdown).toBeDefined();
	});
});

describe('toAriaKeyShortcuts', () => {
	// ========================================
	// Shortcut exposure (issue #37)
	// ========================================

	it.each([
		['⌘S', 'Meta+S'],
		['⌥⌘I', 'Alt+Meta+I'],
		['⇧⌘Z', 'Shift+Meta+Z'],
		['⌃C', 'Control+C'],
		['Ctrl+O', 'Control+O'],
		['Ctrl+Shift+P', 'Control+Shift+P'],
		['F5', 'F5'],
	])('maps %s to %s', (input, expected) => {
		expect(toAriaKeyShortcuts(input)).toBe(expected);
	});

	it('is applied to rendered menu items', () => {
		render(
			<MenuBar
				menus={[
					{
						label: 'File',
						type: 'dropdown',
						items: [{ label: 'Save', shortcut: '⌘S' }],
					},
				]}
			/>
		);
		fireEvent.click(screen.getByRole('menuitem', { name: 'File' }));
		expect(screen.getByRole('menuitem', { name: /Save/ })).toHaveAttribute(
			'aria-keyshortcuts',
			'Meta+S'
		);
	});
});
