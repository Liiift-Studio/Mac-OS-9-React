// Tabs component - Mac OS 9 style
// Classic tabbed navigation with raised tab appearance

import React, { useState, useCallback, Children, isValidElement, ReactElement } from 'react';
import styles from './Tabs.module.css';

export interface TabPanelProps {
	/**
	 * Label for the tab
	 */
	label: string;

	/**
	 * Content of the tab panel
	 */
	children: React.ReactNode;

	/**
	 * Optional icon to display in the tab
	 */
	icon?: React.ReactNode;

	/**
	 * Whether this tab is disabled
	 * @default false
	 */
	disabled?: boolean;

	/**
	 * Value identifier for controlled tabs
	 */
	value?: string;
}

/**
 * TabPanel component - Individual tab content
 * Must be used as a child of Tabs component
 */
export const TabPanel: React.FC<TabPanelProps> = ({ children }) => {
	return <>{children}</>;
};

TabPanel.displayName = 'TabPanel';

export interface TabsProps {
	/**
	 * Tab panels as children
	 */
	children: ReactElement<TabPanelProps> | ReactElement<TabPanelProps>[];

	/**
	 * Index of the default active tab (uncontrolled)
	 * @default 0
	 */
	defaultActiveTab?: number;

	/**
	 * Index of the active tab (controlled)
	 */
	activeTab?: number;

	/**
	 * Callback when tab changes
	 */
	onChange?: (index: number, value?: string) => void;

	/**
	 * Size of the tabs
	 * @default 'md'
	 */
	size?: 'sm' | 'md' | 'lg';

	/**
	 * Whether tabs take full width
	 * @default false
	 */
	fullWidth?: boolean;

	/**
	 * Custom class name for the container
	 */
	className?: string;

	/**
	 * Custom class name for the tab list
	 */
	tabListClassName?: string;

	/**
	 * Custom class name for the tab panel container
	 */
	panelClassName?: string;

	/**
	 * ARIA label for the tab list
	 */
	ariaLabel?: string;
}

/**
 * Mac OS 9 style Tabs component
 * 
 * Classic tabbed navigation with raised tab appearance and inset panel.
 * 
 * Features:
 * - Classic Mac OS 9 tab styling
 * - Controlled and uncontrolled modes
 * - Keyboard navigation (Arrow keys, Home, End)
 * - Full accessibility with ARIA
 * - Optional icons in tabs
 * - Disabled tab states
 * 
 * @example
 * ```tsx
 * // Uncontrolled
 * <Tabs>
 *   <TabPanel label="General">
 *     <p>General settings content</p>
 *   </TabPanel>
 *   <TabPanel label="Advanced">
 *     <p>Advanced settings content</p>
 *   </TabPanel>
 * </Tabs>
 * 
 * // Controlled
 * <Tabs activeTab={activeIndex} onChange={setActiveIndex}>
 *   <TabPanel label="Tab 1">Content 1</TabPanel>
 *   <TabPanel label="Tab 2">Content 2</TabPanel>
 * </Tabs>
 * ```
 */
export const Tabs: React.FC<TabsProps> = ({
	children,
	defaultActiveTab = 0,
	activeTab: controlledActiveTab,
	onChange,
	size = 'md',
	fullWidth = false,
	className = '',
	tabListClassName = '',
	panelClassName = '',
	ariaLabel = 'Tabs',
}) => {
	// Controlled vs uncontrolled state
	const [uncontrolledActiveTab, setUncontrolledActiveTab] = useState(defaultActiveTab);
	const isControlled = controlledActiveTab !== undefined;
	const activeTabIndex = isControlled ? controlledActiveTab : uncontrolledActiveTab;

	// Extract tab information from children
	const tabs = Children.toArray(children).filter(
		(child): child is ReactElement<TabPanelProps> => isValidElement(child)
	);

	// Handle tab change
	const handleTabChange = useCallback(
		(index: number) => {
			const tab = tabs[index];
			if (!tab || tab.props.disabled) return;

			if (!isControlled) {
				setUncontrolledActiveTab(index);
			}
			onChange?.(index, tab.props.value);
		},
		[tabs, isControlled, onChange]
	);

	// Keyboard navigation
	const handleKeyDown = useCallback(
		(event: React.KeyboardEvent, currentIndex: number) => {
			let newIndex = currentIndex;

			switch (event.key) {
				case 'ArrowLeft':
				case 'ArrowUp':
					event.preventDefault();
					newIndex = currentIndex - 1;
					if (newIndex < 0) newIndex = tabs.length - 1;
					// Skip disabled tabs
					while (tabs[newIndex]?.props.disabled && newIndex !== currentIndex) {
						newIndex--;
						if (newIndex < 0) newIndex = tabs.length - 1;
					}
					break;
				case 'ArrowRight':
				case 'ArrowDown':
					event.preventDefault();
					newIndex = currentIndex + 1;
					if (newIndex >= tabs.length) newIndex = 0;
					// Skip disabled tabs
					while (tabs[newIndex]?.props.disabled && newIndex !== currentIndex) {
						newIndex++;
						if (newIndex >= tabs.length) newIndex = 0;
					}
					break;
				case 'Home':
					event.preventDefault();
					newIndex = 0;
					// Skip disabled tabs
					while (tabs[newIndex]?.props.disabled && newIndex < tabs.length - 1) {
						newIndex++;
					}
					break;
				case 'End':
					event.preventDefault();
					newIndex = tabs.length - 1;
					// Skip disabled tabs
					while (tabs[newIndex]?.props.disabled && newIndex > 0) {
						newIndex--;
					}
					break;
				default:
					return;
			}

			handleTabChange(newIndex);
		},
		[tabs, handleTabChange]
	);

	// Class names
	const containerClassNames = [styles.container, className].filter(Boolean).join(' ');

	const tabListClassNames = [
		styles.tabList,
		styles[`tabList--${size}`],
		fullWidth && styles['tabList--full-width'],
		tabListClassName,
	]
		.filter(Boolean)
		.join(' ');

	const panelContainerClassNames = [
		styles.panelContainer,
		styles[`panelContainer--${size}`],
		panelClassName,
	]
		.filter(Boolean)
		.join(' ');

	return (
		<div className={containerClassNames}>
			<div role="tablist" aria-label={ariaLabel} className={tabListClassNames}>
				{tabs.map((tab, index) => {
					const isActive = index === activeTabIndex;
					const isDisabled = tab.props.disabled;

					const tabClassNames = [
						styles.tab,
						styles[`tab--${size}`],
						isActive && styles['tab--active'],
						isDisabled && styles['tab--disabled'],
						fullWidth && styles['tab--full-width'],
					]
						.filter(Boolean)
						.join(' ');

					return (
						<button
							key={index}
							role="tab"
							type="button"
							aria-selected={isActive}
							aria-controls={`panel-${index}`}
							id={`tab-${index}`}
							tabIndex={isActive ? 0 : -1}
							disabled={isDisabled}
							className={tabClassNames}
							onClick={() => handleTabChange(index)}
							onKeyDown={(e) => handleKeyDown(e, index)}
						>
							{tab.props.icon && <span className={styles.tabIcon}>{tab.props.icon}</span>}
							{tab.props.label}
						</button>
					);
				})}
			</div>

			{tabs.map((tab, index) => {
				const isActive = index === activeTabIndex;
				return (
					<div
						key={index}
						role="tabpanel"
						id={`panel-${index}`}
						aria-labelledby={`tab-${index}`}
						hidden={!isActive}
						className={panelContainerClassNames}
					>
						{isActive && tab.props.children}
					</div>
				);
			})}
		</div>
	);
};

Tabs.displayName = 'Tabs';

export default Tabs;