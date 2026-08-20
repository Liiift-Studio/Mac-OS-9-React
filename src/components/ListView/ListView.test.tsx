// ListView Component Tests
//
// Covers the generic row typing, Set-based selection, the Shift+anchor range
// model, empty/loading states and keyboard navigation.

import { describe, it, expect, vi, afterEach } from 'vitest';
import { render, screen, cleanup, fireEvent } from '@testing-library/react';
import { ListView, type ListColumn } from './ListView';

afterEach(cleanup);

interface FileRow {
	id: string;
	name: string;
	size: string;
}

const columns: ListColumn<FileRow>[] = [
	{ key: 'name', label: 'Name' },
	{ key: 'size', label: 'Size' },
];

const items: FileRow[] = [
	{ id: 'a', name: 'Alpha', size: '1 KB' },
	{ id: 'b', name: 'Bravo', size: '2 KB' },
	{ id: 'c', name: 'Charlie', size: '3 KB' },
	{ id: 'd', name: 'Delta', size: '4 KB' },
];

function rows(): HTMLElement[] {
	return screen.getAllByRole('row').filter((r) => r.hasAttribute('data-item-id'));
}

describe('ListView', () => {
	// ========================================
	// Rendering + ARIA
	// ========================================

	it('renders a grid with rows and cells', () => {
		render(<ListView<FileRow> columns={columns} items={items} aria-label="Files" />);
		expect(screen.getByRole('grid', { name: 'Files' })).toBeInTheDocument();
		expect(rows()).toHaveLength(4);
		expect(screen.getByText('Alpha')).toBeInTheDocument();
	});

	it('marks selected rows with aria-selected', () => {
		render(<ListView<FileRow> columns={columns} items={items} selectedIds={['b']} />);
		const [a, b] = rows();
		expect(a).toHaveAttribute('aria-selected', 'false');
		expect(b).toHaveAttribute('aria-selected', 'true');
	});

	it('exposes sort state through aria-sort', () => {
		const onSort = vi.fn();
		render(<ListView<FileRow> columns={columns} items={items} onSort={onSort} />);
		fireEvent.click(screen.getByRole('columnheader', { name: /name/i }));
		expect(onSort).toHaveBeenCalledWith('name', 'asc');
		expect(screen.getByRole('columnheader', { name: /name/i })).toHaveAttribute(
			'aria-sort',
			'ascending'
		);
	});

	// ========================================
	// Empty / loading states (issue #83)
	// ========================================

	it('shows a default empty state when there are no items', () => {
		render(<ListView<FileRow> columns={columns} items={[]} />);
		expect(screen.getByRole('status')).toHaveTextContent('No items');
		expect(rows()).toHaveLength(0);
	});

	it('shows a custom empty state', () => {
		render(<ListView<FileRow> columns={columns} items={[]} emptyState="This folder is empty" />);
		expect(screen.getByRole('status')).toHaveTextContent('This folder is empty');
	});

	it('shows the loading state in preference to the empty state', () => {
		render(<ListView<FileRow> columns={columns} items={[]} loading />);
		expect(screen.getByRole('status')).toHaveTextContent('Loading…');
		expect(screen.getByRole('grid')).toHaveAttribute('aria-busy', 'true');
	});

	// ========================================
	// Selection (issues #52, #83)
	// ========================================

	it('selects a single row on plain click', () => {
		const onSelectionChange = vi.fn();
		render(
			<ListView<FileRow> columns={columns} items={items} onSelectionChange={onSelectionChange} />
		);
		fireEvent.click(screen.getByText('Bravo'));
		expect(onSelectionChange).toHaveBeenCalledWith(['b']);
	});

	it('toggles with Cmd/Ctrl click', () => {
		const onSelectionChange = vi.fn();
		render(
			<ListView<FileRow>
				columns={columns}
				items={items}
				selectedIds={['a']}
				onSelectionChange={onSelectionChange}
			/>
		);
		fireEvent.click(screen.getByText('Bravo'), { metaKey: true });
		expect(onSelectionChange).toHaveBeenCalledWith(['a', 'b']);
	});

	it('extends rather than replaces the selection on Shift+click', () => {
		const onSelectionChange = vi.fn();
		const { rerender } = render(
			<ListView<FileRow>
				columns={columns}
				items={items}
				selectedIds={[]}
				onSelectionChange={onSelectionChange}
			/>
		);

		// Ctrl-click Alpha, then Ctrl-click Charlie: selection {a, c}, anchor c.
		fireEvent.click(screen.getByText('Alpha'), { metaKey: true });
		rerender(
			<ListView<FileRow>
				columns={columns}
				items={items}
				selectedIds={['a']}
				onSelectionChange={onSelectionChange}
			/>
		);
		fireEvent.click(screen.getByText('Charlie'), { metaKey: true });
		rerender(
			<ListView<FileRow>
				columns={columns}
				items={items}
				selectedIds={['a', 'c']}
				onSelectionChange={onSelectionChange}
			/>
		);

		// Shift-click Delta extends c→d and must keep Alpha.
		fireEvent.click(screen.getByText('Delta'), { shiftKey: true });
		const result = onSelectionChange.mock.calls.at(-1)?.[0] as string[];
		expect([...result].sort()).toEqual(['a', 'c', 'd']);
	});

	it('honours multiSelect=false by ignoring modifiers', () => {
		const onSelectionChange = vi.fn();
		render(
			<ListView<FileRow>
				columns={columns}
				items={items}
				selectedIds={['a']}
				multiSelect={false}
				onSelectionChange={onSelectionChange}
			/>
		);
		fireEvent.click(screen.getByText('Bravo'), { metaKey: true });
		expect(onSelectionChange).toHaveBeenCalledWith(['b']);
		expect(screen.getByRole('grid')).toHaveAttribute('aria-multiselectable', 'false');
	});

	// ========================================
	// Keyboard navigation (issue #83)
	// ========================================

	it('gives exactly one row the roving tab stop', () => {
		render(<ListView<FileRow> columns={columns} items={items} />);
		const tabbable = rows().filter((r) => r.getAttribute('tabindex') === '0');
		expect(tabbable).toHaveLength(1);
		expect(tabbable[0]).toHaveAttribute('data-item-id', 'a');
	});

	it('moves selection with ArrowDown / ArrowUp', () => {
		const onSelectionChange = vi.fn();
		render(
			<ListView<FileRow> columns={columns} items={items} onSelectionChange={onSelectionChange} />
		);
		fireEvent.keyDown(rows()[0], { key: 'ArrowDown' });
		expect(onSelectionChange).toHaveBeenLastCalledWith(['b']);
	});

	it('jumps to first and last with Home / End', () => {
		const onSelectionChange = vi.fn();
		render(
			<ListView<FileRow> columns={columns} items={items} onSelectionChange={onSelectionChange} />
		);
		fireEvent.keyDown(rows()[0], { key: 'End' });
		expect(onSelectionChange).toHaveBeenLastCalledWith(['d']);
		fireEvent.keyDown(rows()[0], { key: 'Home' });
		expect(onSelectionChange).toHaveBeenLastCalledWith(['a']);
	});

	it('opens the active item on Enter', () => {
		const onItemOpen = vi.fn();
		render(<ListView<FileRow> columns={columns} items={items} onItemOpen={onItemOpen} />);
		fireEvent.keyDown(rows()[0], { key: 'Enter' });
		expect(onItemOpen).toHaveBeenCalledWith(items[0]);
	});

	it('selects all with Cmd/Ctrl+A', () => {
		const onSelectionChange = vi.fn();
		render(
			<ListView<FileRow> columns={columns} items={items} onSelectionChange={onSelectionChange} />
		);
		fireEvent.keyDown(rows()[0], { key: 'a', metaKey: true });
		expect(onSelectionChange).toHaveBeenCalledWith(['a', 'b', 'c', 'd']);
	});

	// ========================================
	// Delegated events (issue #53)
	// ========================================

	it('opens an item on double click', () => {
		const onItemOpen = vi.fn();
		render(<ListView<FileRow> columns={columns} items={items} onItemOpen={onItemOpen} />);
		fireEvent.doubleClick(screen.getByText('Charlie'));
		expect(onItemOpen).toHaveBeenCalledWith(items[2]);
	});

	it('reports cell clicks with the resolved column', () => {
		const onCellClick = vi.fn();
		render(<ListView<FileRow> columns={columns} items={items} onCellClick={onCellClick} />);
		fireEvent.click(screen.getByText('2 KB'));
		expect(onCellClick).toHaveBeenCalledWith(
			items[1],
			expect.objectContaining({ key: 'size' }),
			expect.anything()
		);
	});

	it('fires row enter/leave once per row crossing', () => {
		const onItemMouseEnter = vi.fn();
		const onItemMouseLeave = vi.fn();
		render(
			<ListView<FileRow>
				columns={columns}
				items={items}
				onItemMouseEnter={onItemMouseEnter}
				onItemMouseLeave={onItemMouseLeave}
			/>
		);
		const [rowA, rowB] = rows();
		fireEvent.mouseOver(rowA, { relatedTarget: null });
		expect(onItemMouseEnter).toHaveBeenCalledWith(items[0]);

		fireEvent.mouseOut(rowA, { relatedTarget: rowB });
		expect(onItemMouseLeave).toHaveBeenCalledWith(items[0]);
	});

	// ========================================
	// Render props
	// ========================================

	it('supports a custom cell renderer with typed values', () => {
		render(
			<ListView<FileRow>
				columns={columns}
				items={items}
				renderCell={(value, item, column) =>
					column.key === 'size' ? `${item.name}: ${value}` : String(value)
				}
			/>
		);
		expect(screen.getByText('Alpha: 1 KB')).toBeInTheDocument();
	});

	it('supports a custom row renderer', () => {
		render(
			<ListView<FileRow>
				columns={columns}
				items={items}
				renderRow={(item, state, defaultProps) => (
					<div {...defaultProps}>
						{item.name}
						{state.isSelected ? ' (selected)' : ''}
					</div>
				)}
				selectedIds={['a']}
			/>
		);
		expect(screen.getByText(/Alpha \(selected\)/)).toBeInTheDocument();
	});
});
