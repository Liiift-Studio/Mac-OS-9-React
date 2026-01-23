// FolderList component - Mac OS 9 style folder/file list window
// Window component with integrated ListView for file browsing

'use client';

import React, { forwardRef, useState } from 'react';
import { Window, WindowProps } from '../Window/Window';
import { ListView, ListColumn, ListItem } from '../ListView/ListView';
import styles from './FolderList.module.css';

export interface FolderListProps extends Omit<WindowProps, 'children'> {
	/**
	 * Column definitions for the list
	 * @default [{ key: 'name', label: 'Name' }, { key: 'modified', label: 'Date Modified' }, { key: 'size', label: 'Size' }]
	 */
	columns?: ListColumn[];

	/**
	 * Items to display in the list
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
	 * Callback when item is double-clicked (opened)
	 */
	onItemOpen?: (item: ListItem) => void;

	/**
	 * Callback when column header is clicked for sorting
	 */
	onSort?: (columnKey: string, direction: 'asc' | 'desc') => void;

	/**
	 * Callback when mouse enters the folder list window
	 */
	onMouseEnter?: (event: React.MouseEvent<HTMLDivElement>) => void;

	/**
	 * Height of the list view area
	 * @default 400
	 */
	listHeight?: number | string;
}

/**
 * Mac OS 9 style FolderList component
 * 
 * Window with integrated ListView for browsing files and folders.
 * Similar to Finder list view in Mac OS 9.
 * 
 * @example
 * ```tsx
 * <FolderList
 *   title="My Documents"
 *   items={[
 *     { id: '1', name: 'Document.txt', modified: 'Today', size: '2 KB', icon: <FileIcon /> },
 *     { id: '2', name: 'Images', modified: 'Yesterday', size: '--', icon: <FolderIcon /> }
 *   ]}
 *   selectedIds={['1']}
 *   onSelectionChange={(ids) => console.log('Selected:', ids)}
 *   onItemOpen={(item) => console.log('Open:', item.name)}
 *   onMouseEnter={(e) => console.log('Mouse entered folder list')}
 * />
 * ```
 */
export const FolderList = forwardRef<HTMLDivElement, FolderListProps>(
	(
		{
			columns = [
				{ key: 'name', label: 'Name', width: '40%' },
				{ key: 'modified', label: 'Date Modified', width: '30%' },
				{ key: 'size', label: 'Size', width: '30%' },
			],
			items,
			selectedIds,
			onSelectionChange,
			onItemOpen,
			onSort,
			onMouseEnter,
			listHeight = 400,
			...windowProps
		},
		ref
	) => {
		// Window content with ListView
		return (
			<Window 
				ref={ref} 
				contentClassName={styles.folderListContent} 
				onMouseEnter={onMouseEnter}
				{...windowProps}
			>
				<ListView
					columns={columns}
					items={items}
					selectedIds={selectedIds}
					onSelectionChange={onSelectionChange}
					onItemOpen={onItemOpen}
					onSort={onSort}
					height={listHeight}
					className={styles.listView}
				/>
			</Window>
		);
	}
);

FolderList.displayName = 'FolderList';

export default FolderList;
