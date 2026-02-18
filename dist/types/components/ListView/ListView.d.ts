import React from 'react';
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
}
/**
 * Row render prop state
 */
export interface RowRenderState {
    /** Whether this row is selected */
    isSelected: boolean;
    /** Whether this row is being hovered */
    isHovered: boolean;
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
    onClick: (e: React.MouseEvent) => void;
    onDoubleClick: () => void;
    onMouseEnter: () => void;
    onMouseLeave: () => void;
    'data-selected': boolean;
    'data-index': number;
    'data-item-id': string;
}
/**
 * Cell render prop state
 */
export interface CellRenderState {
    /** Whether this cell is being hovered */
    isHovered: boolean;
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
    onClick: () => void;
    'data-column': string;
    'data-sortable': boolean;
    'data-sorted'?: boolean;
    'data-sort-direction'?: 'asc' | 'desc';
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
     * Callback when mouse enters an item (row-level)
     */
    onItemMouseEnter?: (item: ListItem) => void;
    /**
     * Callback when mouse leaves an item (row-level)
     */
    onItemMouseLeave?: (item: ListItem) => void;
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
    /**
     * Custom classes for targeting sub-elements
     */
    classes?: ListViewClasses;
    /**
     * Override row rendering
     * @param item - The list item
     * @param state - Row state (selected, hovered, index)
     * @param defaultProps - Props to spread on custom element for accessibility
     * @returns Custom row element (fully replaces default)
     */
    renderRow?: (item: ListItem, state: RowRenderState, defaultProps: RowDefaultProps) => React.ReactNode;
    /**
     * Override cell rendering
     * @param value - Cell value (item[columnKey])
     * @param item - Full item object
     * @param column - Column definition
     * @param state - Cell state (hovered, selected row, indices)
     * @returns Custom cell content (fully replaces default)
     */
    renderCell?: (value: any, item: ListItem, column: ListColumn, state: CellRenderState) => React.ReactNode;
    /**
     * Override header cell rendering
     * @param column - Column definition
     * @param state - Header state (sorted, direction)
     * @param defaultProps - Props to spread on custom element
     * @returns Custom header cell element (fully replaces default)
     */
    renderHeaderCell?: (column: ListColumn, state: HeaderCellRenderState, defaultProps: HeaderCellDefaultProps) => React.ReactNode;
    /**
     * Callback when a cell is clicked
     */
    onCellClick?: (item: ListItem, column: ListColumn, event: React.MouseEvent) => void;
    /**
     * Callback when mouse enters a cell
     */
    onCellMouseEnter?: (item: ListItem, column: ListColumn) => void;
    /**
     * Callback when mouse leaves a cell
     */
    onCellMouseLeave?: (item: ListItem, column: ListColumn) => void;
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
 *   onItemMouseEnter={(item) => console.log('Hovering:', item.name)}
 * />
 * ```
 */
export declare const ListView: React.ForwardRefExoticComponent<ListViewProps & React.RefAttributes<HTMLDivElement>>;
export default ListView;
