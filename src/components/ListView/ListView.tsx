// ListView component - Mac OS 9 style multi-column list
// List view with sortable columns, row selection and keyboard navigation
//
// Correctness notes (panel review #48, #51, #52, #53, #83, #94):
//  - Generic over the row type, so cell values, sorting and callbacks keep
//    the consumer's own types instead of collapsing to `any` (#48)
//  - Hover is pure CSS; the parent no longer stores hovered row/cell state
//    and re-renders every row on each pointer crossing (#51)
//  - Selection membership is a Set lookup, not an O(n) array scan per row,
//    so selection cost is O(N) rather than O(N*S) (#52)
//  - Rows are memoized and carry no per-row closures: pointer and click
//    handling is delegated from the body container via data attributes (#53)
//  - Empty and loading states, a standard Shift+anchor range model, and full
//    keyboard navigation with roving tabindex (#83)
//  - Public input arrays are readonly (#94)

'use client';

import React, { forwardRef, memo, useCallback, useMemo, useRef, useState } from 'react';
import { mergeClasses } from '../../utils/classNames';
import styles from './ListView.module.css';

/** Minimum shape every ListView row must satisfy. */
export interface ListItemBase {
	/** Unique item ID */
	id: string;
	/** Optional icon rendered in the first column */
	icon?: React.ReactNode;
}

/**
 * Default row type: any object with an `id`.
 *
 * Prefer supplying your own interface — `ListView<MyRow>` — so cell values
 * and callbacks stay typed. This alias keeps untyped usage working.
 */
export type ListItem = ListItemBase & Record<string, unknown>;

/** String keys of `TItem` — the only ones usable as a column key. */
export type ColumnKey<TItem> = Extract<keyof TItem, string>;

export interface ListColumn<TItem extends ListItemBase = ListItem> {
	/** Column key — must name a property of the row type */
	key: ColumnKey<TItem>;

	/** Column header label */
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

/**
 * Classes for targeting ListView sub-elements
 */
export interface ListViewClasses {
	/** Root container */
	root?: string;
	/** Header row container */
	header?: string;
	/** Individual header cell */
	headerCell?: string;
	/** Body container (scrollable area) */
	body?: string;
	/** Individual row */
	row?: string;
	/** Individual cell */
	cell?: string;
	/** Empty / loading placeholder */
	placeholder?: string;
}

/**
 * Row render prop state.
 *
 * `isHovered` was removed in 1.0.0: hover is styled with CSS `:hover`, so the
 * component no longer tracks it and no longer re-renders the whole list when
 * the pointer crosses a row.
 */
export interface RowRenderState {
	/** Whether this row is selected */
	isSelected: boolean;
	/** Whether this row holds the roving tab stop */
	isActive: boolean;
	/** Row index in the list */
	index: number;
}

/**
 * Row render prop default props
 * Spread these on your custom element for accessibility and behavior
 */
export interface RowDefaultProps {
	key: string;
	className: string;
	role: 'row';
	tabIndex: number;
	'aria-selected': boolean;
	'aria-rowindex': number;
	'data-selected': boolean;
	'data-index': number;
	'data-item-id': string;
}

/**
 * Cell render prop state
 */
export interface CellRenderState {
	/** Whether the row containing this cell is selected */
	isRowSelected: boolean;
	/** Column index */
	columnIndex: number;
	/** Row index */
	rowIndex: number;
}

/**
 * Header cell render prop state
 */
export interface HeaderCellRenderState {
	/** Whether this column is currently sorted */
	isSorted: boolean;
	/** Current sort direction if sorted */
	sortDirection?: 'asc' | 'desc';
}

/**
 * Header cell render prop default props
 */
export interface HeaderCellDefaultProps {
	key: string;
	className: string;
	style: React.CSSProperties;
	role: 'columnheader';
	onClick: () => void;
	'aria-sort'?: 'ascending' | 'descending';
	'data-column': string;
	'data-sortable': boolean;
	'data-sorted'?: boolean;
	'data-sort-direction'?: 'asc' | 'desc';
}

export interface ListViewProps<TItem extends ListItemBase = ListItem> {
	/** Column definitions */
	columns: readonly ListColumn<TItem>[];

	/** List items */
	items: readonly TItem[];

	/** Selected item IDs */
	selectedIds?: readonly string[];

	/** Callback when selection changes */
	onSelectionChange?: (selectedIds: string[]) => void;

	/** Callback when an item is double-clicked or activated with Enter */
	onItemOpen?: (item: TItem) => void;

	/** Callback when the pointer enters an item (row-level) */
	onItemMouseEnter?: (item: TItem) => void;

	/** Callback when the pointer leaves an item (row-level) */
	onItemMouseLeave?: (item: TItem) => void;

	/** Callback when a column is clicked for sorting */
	onSort?: (columnKey: ColumnKey<TItem>, direction: 'asc' | 'desc') => void;

	/** Additional CSS class names */
	className?: string;

	/** Height of the list view */
	height?: number | string;

	/** Accessible name for the grid */
	'aria-label'?: string;

	/** Custom classes for targeting sub-elements */
	classes?: ListViewClasses;

	/**
	 * Whether more than one row may be selected at a time.
	 * @default true
	 */
	multiSelect?: boolean;

	/**
	 * Whether the list is loading. Takes precedence over the empty state.
	 * @default false
	 */
	loading?: boolean;

	/**
	 * Shown while `loading` is true.
	 * @default 'Loading…'
	 */
	loadingState?: React.ReactNode;

	/**
	 * Shown when there are no items and the list is not loading.
	 * @default 'No items'
	 */
	emptyState?: React.ReactNode;

	/**
	 * Override row rendering
	 * @param item - The list item
	 * @param state - Row state (selected, active, index)
	 * @param defaultProps - Props to spread on custom element for accessibility
	 */
	renderRow?: (
		item: TItem,
		state: RowRenderState,
		defaultProps: RowDefaultProps
	) => React.ReactNode;

	/**
	 * Override cell rendering
	 * @param value - Cell value (item[column.key])
	 * @param item - Full item object
	 * @param column - Column definition
	 * @param state - Cell state (selected row, indices)
	 */
	renderCell?: (
		value: TItem[ColumnKey<TItem>],
		item: TItem,
		column: ListColumn<TItem>,
		state: CellRenderState
	) => React.ReactNode;

	/**
	 * Override header cell rendering
	 */
	renderHeaderCell?: (
		column: ListColumn<TItem>,
		state: HeaderCellRenderState,
		defaultProps: HeaderCellDefaultProps
	) => React.ReactNode;

	/** Callback when a cell is clicked */
	onCellClick?: (item: TItem, column: ListColumn<TItem>, event: React.MouseEvent) => void;

	/** Callback when the pointer enters a cell */
	onCellMouseEnter?: (item: TItem, column: ListColumn<TItem>) => void;

	/** Callback when the pointer leaves a cell */
	onCellMouseLeave?: (item: TItem, column: ListColumn<TItem>) => void;
}

// --- Row -------------------------------------------------------------------

interface ListViewRowProps<TItem extends ListItemBase> {
	item: TItem;
	columns: readonly ListColumn<TItem>[];
	columnStyles: readonly React.CSSProperties[];
	isSelected: boolean;
	isActive: boolean;
	rowIndex: number;
	rowClassName?: string;
	cellClassName?: string;
	renderCell?: ListViewProps<TItem>['renderCell'];
}

/**
 * A single list row.
 *
 * Memoized and deliberately handler-free: every pointer and click event is
 * delegated from the body container, so nothing here changes identity between
 * renders and React can skip untouched rows entirely (issues #51, #53).
 */
function ListViewRowInner<TItem extends ListItemBase>({
	item,
	columns,
	columnStyles,
	isSelected,
	isActive,
	rowIndex,
	rowClassName,
	cellClassName,
	renderCell,
}: ListViewRowProps<TItem>): React.JSX.Element {
	return (
		<div
			className={mergeClasses(styles.row, isSelected && styles.selected, rowClassName)}
			role="row"
			// Roving tabindex: exactly one row is in the tab order at a time.
			tabIndex={isActive ? 0 : -1}
			aria-selected={isSelected}
			aria-rowindex={rowIndex + 1}
			data-selected={isSelected}
			data-index={rowIndex}
			data-item-id={item.id}
		>
			{columns.map((column, columnIndex) => {
				const value = item[column.key];
				return (
					<div
						key={column.key}
						className={mergeClasses(styles.cell, cellClassName)}
						style={columnStyles[columnIndex]}
						role="gridcell"
						data-column={column.key}
					>
						{renderCell ? (
							renderCell(value, item, column, {
								isRowSelected: isSelected,
								columnIndex,
								rowIndex,
							})
						) : (
							<>
								{columnIndex === 0 && item.icon && <span className={styles.icon}>{item.icon}</span>}
								{value as React.ReactNode}
							</>
						)}
					</div>
				);
			})}
		</div>
	);
}

const ListViewRow = memo(ListViewRowInner) as typeof ListViewRowInner;

// --- ListView --------------------------------------------------------------

function ListViewInner<TItem extends ListItemBase>(
	{
		columns,
		items,
		selectedIds = [],
		onSelectionChange,
		onItemOpen,
		onItemMouseEnter,
		onItemMouseLeave,
		onSort,
		className = '',
		height = 'auto',
		classes,
		multiSelect = true,
		loading = false,
		loadingState = 'Loading…',
		emptyState = 'No items',
		renderRow,
		renderCell,
		renderHeaderCell,
		onCellClick,
		onCellMouseEnter,
		onCellMouseLeave,
		'aria-label': ariaLabel,
	}: ListViewProps<TItem>,
	ref: React.ForwardedRef<HTMLDivElement>
): React.JSX.Element {
	const [sortColumn, setSortColumn] = useState<ColumnKey<TItem> | null>(null);
	const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');

	// Index of the row holding the roving tab stop.
	const [activeIndex, setActiveIndex] = useState(0);

	const bodyRef = useRef<HTMLDivElement>(null);

	// Anchor for Shift+range selection, plus the selection that existed when
	// the anchor was set. Shift+click unions the two, so extending a range
	// no longer discards everything selected beforehand (issue #83).
	const anchorRef = useRef<string | null>(null);
	const anchorBaseRef = useRef<readonly string[]>([]);

	// O(1) membership instead of an array scan per row (issue #52).
	const selectedSet = useMemo(() => new Set(selectedIds), [selectedIds]);

	// Stable per-column style objects, so cells don't get a fresh inline
	// style object on every render (issue #53).
	const columnStyles = useMemo(
		() =>
			columns.map((column) => ({
				width: typeof column.width === 'number' ? `${column.width}px` : column.width,
			})),
		[columns]
	);

	const indexById = useMemo(() => {
		const map = new Map<string, number>();
		items.forEach((item, index) => map.set(item.id, index));
		return map;
	}, [items]);

	// Latest values for the delegated handlers, which are bound once.
	const latestRef = useRef({
		items,
		columns,
		selectedIds,
		selectedSet,
		indexById,
		multiSelect,
		onSelectionChange,
		onItemOpen,
		onItemMouseEnter,
		onItemMouseLeave,
		onCellClick,
		onCellMouseEnter,
		onCellMouseLeave,
	});
	latestRef.current = {
		items,
		columns,
		selectedIds,
		selectedSet,
		indexById,
		multiSelect,
		onSelectionChange,
		onItemOpen,
		onItemMouseEnter,
		onItemMouseLeave,
		onCellClick,
		onCellMouseEnter,
		onCellMouseLeave,
	};

	const classNames = mergeClasses(styles.listView, className, classes?.root);

	// --- Sorting -----------------------------------------------------------

	const handleColumnClick = useCallback(
		(columnKey: ColumnKey<TItem>, sortable: boolean = true) => {
			if (!sortable || !onSort) return;
			const newDirection = sortColumn === columnKey && sortDirection === 'asc' ? 'desc' : 'asc';
			setSortColumn(columnKey);
			setSortDirection(newDirection);
			onSort(columnKey, newDirection);
		},
		[sortColumn, sortDirection, onSort]
	);

	// --- Selection ---------------------------------------------------------

	/** Apply the standard click-selection model for a row. */
	const selectRow = useCallback((itemId: string, modifiers: { meta: boolean; shift: boolean }) => {
		const {
			items: liveItems,
			selectedIds: liveSelected,
			selectedSet: liveSet,
			indexById: liveIndex,
			multiSelect: liveMulti,
			onSelectionChange: liveOnChange,
		} = latestRef.current;
		if (!liveOnChange) return;

		if (!liveMulti) {
			anchorRef.current = itemId;
			anchorBaseRef.current = [];
			liveOnChange([itemId]);
			return;
		}

		if (modifiers.shift && anchorRef.current !== null) {
			const anchorIndex = liveIndex.get(anchorRef.current);
			const targetIndex = liveIndex.get(itemId);
			if (anchorIndex === undefined || targetIndex === undefined) return;

			const start = Math.min(anchorIndex, targetIndex);
			const end = Math.max(anchorIndex, targetIndex);
			const range = liveItems.slice(start, end + 1).map((item) => item.id);

			// Union with whatever was selected when the anchor was placed,
			// so earlier selections survive the range extension.
			const merged = new Set(anchorBaseRef.current);
			range.forEach((id) => merged.add(id));
			liveOnChange(Array.from(merged));
			return;
		}

		if (modifiers.meta) {
			const next = liveSet.has(itemId)
				? liveSelected.filter((id) => id !== itemId)
				: [...liveSelected, itemId];
			anchorRef.current = itemId;
			anchorBaseRef.current = next;
			liveOnChange(next);
			return;
		}

		anchorRef.current = itemId;
		anchorBaseRef.current = [itemId];
		liveOnChange([itemId]);
	}, []);

	// --- Delegated pointer / click handling (issue #53) --------------------
	// One handler per event type on the body, rather than four closures per
	// row plus three per cell.

	/** Resolve the row and column a DOM event landed in. */
	const resolveTarget = useCallback((target: EventTarget | null) => {
		const element = target instanceof Element ? target : null;
		const rowEl = element?.closest<HTMLElement>('[data-item-id]');
		if (!rowEl) return null;

		const itemId = rowEl.dataset.itemId;
		if (!itemId) return null;

		const { items: liveItems, columns: liveColumns } = latestRef.current;
		const item = liveItems.find((candidate) => candidate.id === itemId);
		if (!item) return null;

		const cellEl = element?.closest<HTMLElement>('[data-column]');
		const columnKey = cellEl?.dataset.column;
		const column = columnKey
			? liveColumns.find((candidate) => candidate.key === columnKey)
			: undefined;

		return { item, column, rowEl };
	}, []);

	const handleBodyClick = useCallback(
		(event: React.MouseEvent<HTMLDivElement>) => {
			const hit = resolveTarget(event.target);
			if (!hit) return;

			const index = latestRef.current.indexById.get(hit.item.id);
			if (index !== undefined) setActiveIndex(index);

			selectRow(hit.item.id, {
				meta: event.metaKey || event.ctrlKey,
				shift: event.shiftKey,
			});

			if (hit.column) latestRef.current.onCellClick?.(hit.item, hit.column, event);
		},
		[resolveTarget, selectRow]
	);

	const handleBodyDoubleClick = useCallback(
		(event: React.MouseEvent<HTMLDivElement>) => {
			const hit = resolveTarget(event.target);
			if (hit) latestRef.current.onItemOpen?.(hit.item);
		},
		[resolveTarget]
	);

	// mouseover/mouseout (not enter/leave) so a single listener on the body
	// sees every row and cell crossing through bubbling.
	const handleBodyMouseOver = useCallback(
		(event: React.MouseEvent<HTMLDivElement>) => {
			const hit = resolveTarget(event.target);
			if (!hit) return;
			const from = event.relatedTarget instanceof Element ? event.relatedTarget : null;

			if (!from || !hit.rowEl.contains(from)) {
				latestRef.current.onItemMouseEnter?.(hit.item);
			}
			if (hit.column) latestRef.current.onCellMouseEnter?.(hit.item, hit.column);
		},
		[resolveTarget]
	);

	const handleBodyMouseOut = useCallback(
		(event: React.MouseEvent<HTMLDivElement>) => {
			const hit = resolveTarget(event.target);
			if (!hit) return;
			const to = event.relatedTarget instanceof Element ? event.relatedTarget : null;

			if (!to || !hit.rowEl.contains(to)) {
				latestRef.current.onItemMouseLeave?.(hit.item);
			}
			if (hit.column) latestRef.current.onCellMouseLeave?.(hit.item, hit.column);
		},
		[resolveTarget]
	);

	// --- Keyboard navigation (issue #83) -----------------------------------

	/** Move the roving tab stop and move DOM focus with it. */
	const focusRow = useCallback((index: number) => {
		setActiveIndex(index);
		const rows = bodyRef.current?.querySelectorAll<HTMLElement>('[data-item-id]');
		rows?.[index]?.focus();
	}, []);

	const handleKeyDown = useCallback(
		(event: React.KeyboardEvent<HTMLDivElement>) => {
			const {
				items: liveItems,
				multiSelect: liveMulti,
				onSelectionChange: liveOnChange,
			} = latestRef.current;
			if (liveItems.length === 0) return;

			const lastIndex = liveItems.length - 1;
			let nextIndex: number | null = null;

			switch (event.key) {
				case 'ArrowDown':
					nextIndex = Math.min(lastIndex, activeIndex + 1);
					break;
				case 'ArrowUp':
					nextIndex = Math.max(0, activeIndex - 1);
					break;
				case 'Home':
					nextIndex = 0;
					break;
				case 'End':
					nextIndex = lastIndex;
					break;
				case 'Enter': {
					event.preventDefault();
					const item = liveItems[activeIndex];
					if (item) latestRef.current.onItemOpen?.(item);
					return;
				}
				case ' ': {
					event.preventDefault();
					const item = liveItems[activeIndex];
					if (item) selectRow(item.id, { meta: true, shift: false });
					return;
				}
				case 'a':
				case 'A': {
					if (!(event.metaKey || event.ctrlKey) || !liveMulti) return;
					event.preventDefault();
					liveOnChange?.(liveItems.map((item) => item.id));
					return;
				}
				default:
					return;
			}

			event.preventDefault();
			focusRow(nextIndex);

			const item = liveItems[nextIndex];
			if (!item) return;

			// Ctrl/Cmd moves focus without changing the selection, matching
			// the platform convention; otherwise the selection follows focus.
			if (event.metaKey || event.ctrlKey) return;
			selectRow(item.id, { meta: false, shift: event.shiftKey });
		},
		[activeIndex, focusRow, selectRow]
	);

	// --- Render ------------------------------------------------------------

	const containerStyle: React.CSSProperties = {};
	if (height !== 'auto') {
		containerStyle.height = typeof height === 'number' ? `${height}px` : height;
	}

	const placeholder = loading ? loadingState : items.length === 0 ? emptyState : null;

	return (
		<div
			ref={ref}
			className={classNames}
			style={containerStyle}
			role="grid"
			aria-label={ariaLabel}
			aria-multiselectable={multiSelect}
			aria-busy={loading || undefined}
			aria-rowcount={items.length}
		>
			{/* Column headers */}
			<div className={mergeClasses(styles.header, classes?.header)} role="row">
				{columns.map((column) => {
					const isSorted = sortColumn === column.key;
					const headerState: HeaderCellRenderState = {
						isSorted,
						sortDirection: isSorted ? sortDirection : undefined,
					};

					const headerDefaultProps: HeaderCellDefaultProps = {
						key: column.key,
						className: mergeClasses(
							styles.headerCell,
							column.sortable !== false && styles.sortable,
							classes?.headerCell
						),
						style: {
							width: typeof column.width === 'number' ? `${column.width}px` : column.width,
						},
						role: 'columnheader',
						onClick: () => handleColumnClick(column.key, column.sortable),
						...(isSorted && {
							'aria-sort': (sortDirection === 'asc' ? 'ascending' : 'descending') as
								| 'ascending'
								| 'descending',
						}),
						'data-column': column.key,
						'data-sortable': column.sortable !== false,
						...(isSorted && {
							'data-sorted': true,
							'data-sort-direction': sortDirection,
						}),
					};

					if (renderHeaderCell) {
						return renderHeaderCell(column, headerState, headerDefaultProps);
					}

					return (
						<div {...headerDefaultProps}>
							{column.label}
							{isSorted && (
								<span className={styles.sortIndicator} aria-hidden="true">
									{sortDirection === 'asc' ? '▲' : '▼'}
								</span>
							)}
						</div>
					);
				})}
			</div>

			{/* List items */}
			<div
				ref={bodyRef}
				className={mergeClasses(styles.body, classes?.body)}
				onClick={handleBodyClick}
				onDoubleClick={handleBodyDoubleClick}
				onMouseOver={handleBodyMouseOver}
				onMouseOut={handleBodyMouseOut}
				onKeyDown={handleKeyDown}
			>
				{placeholder !== null ? (
					<div className={mergeClasses(styles.placeholder, classes?.placeholder)} role="status">
						{placeholder}
					</div>
				) : (
					items.map((item, rowIndex) => {
						const isSelected = selectedSet.has(item.id);
						const isActive = rowIndex === activeIndex;

						if (renderRow) {
							return renderRow(
								item,
								{ isSelected, isActive, index: rowIndex },
								{
									key: item.id,
									className: mergeClasses(styles.row, isSelected && styles.selected, classes?.row),
									role: 'row',
									tabIndex: isActive ? 0 : -1,
									'aria-selected': isSelected,
									'aria-rowindex': rowIndex + 1,
									'data-selected': isSelected,
									'data-index': rowIndex,
									'data-item-id': item.id,
								}
							);
						}

						return (
							<ListViewRow
								key={item.id}
								item={item}
								columns={columns}
								columnStyles={columnStyles}
								isSelected={isSelected}
								isActive={isActive}
								rowIndex={rowIndex}
								rowClassName={classes?.row}
								cellClassName={classes?.cell}
								renderCell={renderCell}
							/>
						);
					})
				)}
			</div>
		</div>
	);
}

const ListViewWithRef = forwardRef(ListViewInner);
ListViewWithRef.displayName = 'ListView';

/**
 * Mac OS 9 style ListView component
 *
 * Multi-column list with sortable headers, row selection and keyboard
 * navigation. Similar to Finder list view.
 *
 * Generic over the row type: supply your own interface to keep cell values,
 * sorting and callbacks fully typed.
 *
 * @example
 * ```tsx
 * interface FileRow {
 *   id: string;
 *   name: string;
 *   modified: string;
 *   size: string;
 * }
 *
 * <ListView<FileRow>
 *   columns={[
 *     { key: 'name', label: 'Name' },
 *     { key: 'modified', label: 'Date Modified' },
 *     { key: 'size', label: 'Size' },
 *   ]}
 *   items={files}
 *   selectedIds={selected}
 *   onSelectionChange={setSelected}
 *   emptyState="This folder is empty"
 *   aria-label="Files"
 * />
 * ```
 */
export const ListView = ListViewWithRef as <TItem extends ListItemBase = ListItem>(
	props: ListViewProps<TItem> & { ref?: React.Ref<HTMLDivElement> }
) => React.JSX.Element;

export default ListView;
