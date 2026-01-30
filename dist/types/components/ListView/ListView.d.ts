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
     * Callback when mouse enters an item
     */
    onItemMouseEnter?: (item: ListItem) => void;
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
 *   onItemMouseEnter={(item) => console.log('Hovering:', item.name)}
 * />
 * ```
 */
export declare const ListView: React.ForwardRefExoticComponent<ListViewProps & React.RefAttributes<HTMLDivElement>>;
export default ListView;
