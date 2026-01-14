// ListView component - Mac OS 9 style multi-column list
// List view with sortable columns and row selection

'use client';

import React, { forwardRef, useState, useCallback } from 'react';
import styles from './ListView.module.css';

export interface ListColumn {
	/**
	 * Column key/identifier
	 */
	key: string;

	/**
	 * Column header label
	 */
	label: string;

	/**
	 * Column width (px or percentage)
	 * @default 'auto'
	 */
	width?: number | string;

	/**
	 * Whether column is sortable
	 * @default true
	 */
	sortable?: boolean;
}

export interface ListItem {
	/**
	 * Unique item ID
	 */
	id: string;

	/**
	 * Item data - keys should match column keys
	 */
	[key: string]: any;

	/**
	 * Optional icon to display
	 */
	icon?: React.ReactNode;
}

export interface ListViewProps {
	/**
	 * Column definitions
	 */
	columns: ListColumn[];

	/**
	 * List items
	 */
	items: ListItem[];

	/**
	 * Selected item IDs
	 */
	selectedIds?: string[];

	/**
	 * Callback when selection changes
	 */
	onSelectionChange?: (selectedIds: string[]) => void;

	/**
	 * Callback when item is double-clicked
	 */
	onItemOpen?: (item: ListItem) => void;

	/**
	 * Callback when column is clicked for sorting
	 */
	onSort?: (columnKey: string, direction: 'asc' | 'desc') => void;

	/**
	 * Additional CSS class names
	 */
	className?: string;

	/**
	 * Height of the list view
	 */
	height?: number | string;
}

/**
 * Mac OS 9 style ListView component
 * 
 * Multi-column list with sortable headers and row selection.
 * Similar to Finder list view.
 * 
 * @example
 * ```tsx
 * <ListView
 *   columns={[
 *     { key: 'name', label: 'Name' },
 *     { key: 'modified', label: 'Date Modified' },
 *     { key: 'size', label: 'Size' }
 *   ]}
 *   items={[
 *     { id: '1', name: 'Document.txt', modified: 'Today', size: '2 KB' },
 *     { id: '2', name: 'Images', modified: 'Yesterday', size: '--' }
 *   ]}
 *   selectedIds={['1']}
 *   onSelectionChange={(ids) => console.log('Selected:', ids)}
 * />
 * ```
 */
export const ListView = forwardRef<HTMLDivElement, ListViewProps>(
	(
		{
			columns,
			items,
			selectedIds = [],
			onSelectionChange,
			onItemOpen,
			onSort,
			className = '',
			height = 'auto',
		},
		ref
	) => {
		const [sortColumn, setSortColumn] = useState<string | null>(null);
		const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');

		// Class names
		const classNames = [styles.listView, className].filter(Boolean).join(' ');

		// Handle column header click
		const handleColumnClick = useCallback(
			(columnKey: string, sortable: boolean = true) => {
				if (!sortable || !onSort) return;

				const newDirection =
					sortColumn === columnKey && sortDirection === 'asc' ? 'desc' : 'asc';
				setSortColumn(columnKey);
				setSortDirection(newDirection);
				onSort(columnKey, newDirection);
			},
			[sortColumn, sortDirection, onSort]
		);

		// Handle row click
		const handleRowClick = useCallback(
			(itemId: string, event: React.MouseEvent) => {
				if (!onSelectionChange) return;

				if (event.metaKey || event.ctrlKey) {
					// Multi-select with Cmd/Ctrl
					if (selectedIds.includes(itemId)) {
						onSelectionChange(selectedIds.filter((id) => id !== itemId));
					} else {
						onSelectionChange([...selectedIds, itemId]);
					}
				} else if (event.shiftKey && selectedIds.length > 0) {
					// Range select with Shift
					const lastSelectedId = selectedIds[selectedIds.length - 1];
					const lastIndex = items.findIndex((item) => item.id === lastSelectedId);
					const currentIndex = items.findIndex((item) => item.id === itemId);

					const start = Math.min(lastIndex, currentIndex);
					const end = Math.max(lastIndex, currentIndex);
					const rangeIds = items.slice(start, end + 1).map((item) => item.id);

					onSelectionChange(rangeIds);
				} else {
					// Single select
					onSelectionChange([itemId]);
				}
			},
			[selectedIds, items, onSelectionChange]
		);

		// Handle row double-click
		const handleRowDoubleClick = useCallback(
			(item: ListItem) => {
				if (onItemOpen) {
					onItemOpen(item);
				}
			},
			[onItemOpen]
		);

		// Container style
		const containerStyle: React.CSSProperties = {};
		if (height !== 'auto') {
			containerStyle.height = typeof height === 'number' ? `${height}px` : height;
		}

		return (
			<div ref={ref} className={classNames} style={containerStyle}>
				{/* Column headers */}
				<div className={styles.header}>
					{columns.map((column) => (
						<div
							key={column.key}
							className={`${styles.headerCell} ${
								column.sortable !== false ? styles.sortable : ''
							}`}
							style={{
								width:
									typeof column.width === 'number'
										? `${column.width}px`
										: column.width,
							}}
							onClick={() => handleColumnClick(column.key, column.sortable)}
						>
							{column.label}
							{sortColumn === column.key && (
								<span className={styles.sortIndicator}>
									{sortDirection === 'asc' ? '▲' : '▼'}
								</span>
							)}
						</div>
					))}
				</div>

				{/* List items */}
				<div className={styles.body}>
					{items.map((item) => {
						const isSelected = selectedIds.includes(item.id);

						return (
							<div
								key={item.id}
								className={`${styles.row} ${isSelected ? styles.selected : ''}`}
								onClick={(e) => handleRowClick(item.id, e)}
								onDoubleClick={() => handleRowDoubleClick(item)}
							>
								{columns.map((column, index) => (
									<div
										key={column.key}
										className={styles.cell}
										style={{
											width:
												typeof column.width === 'number'
													? `${column.width}px`
													: column.width,
										}}
									>
										{index === 0 && item.icon && (
											<span className={styles.icon}>{item.icon}</span>
										)}
										{item[column.key]}
									</div>
								))}
							</div>
						);
					})}
				</div>
			</div>
		);
	}
);

ListView.displayName = 'ListView';

export default ListView;
