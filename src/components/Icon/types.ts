// TypeScript types for Icon Library - Mac OS 9 React UI

import React from 'react';

/**
 * Icon component type
 * All icon components should match this signature
 */
export type IconComponent = React.FC;

/**
 * Icon category types
 * Used to organize icons into logical groups
 */
export type IconCategory =
	| 'actions'
	| 'files'
	| 'navigation'
	| 'media'
	| 'status'
	| 'ui';

/**
 * Icon metadata for documentation and discovery
 */
export interface IconMetadata {
	/**
	 * The icon component
	 */
	component: IconComponent;

	/**
	 * Category the icon belongs to
	 */
	category: IconCategory;

	/**
	 * Keywords for search/discovery
	 */
	keywords?: string[];

	/**
	 * Optional description
	 */
	description?: string;
}