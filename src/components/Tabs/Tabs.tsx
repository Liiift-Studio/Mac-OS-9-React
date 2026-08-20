// Tabs component - Mac OS 9 style
// Classic tabbed navigation with raised tab appearance
//
// Correctness notes (panel review #39, #49, #50, #85, #116):
//  - forwardRef, matching every other component (#39)
//  - Generic over the tab id, so literal-union ids survive instead of being
//    widened to string (#49)
//  - The children array is derived once per children change rather than
//    reallocated every render, which also restores handleKeyDown's
//    memoization (#50)
//  - The active panel is focusable, so a scrollable panel with no focusable
//    content is still reachable per the APG tabs pattern (#85)
//  - children is ReactNode, so conditionals, fragments and mapped arrays
//    type-check; the runtime filter already handled them (#116)

import React, {
	Children,
	forwardRef,
	isValidElement,
	useCallback,
	useId,
	useMemo,
	useState,
	type ReactElement,
} from 'react';
import styles from './Tabs.module.css';

export interface TabPanelProps<TValue extends string = string> {
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
	 * Value identifier for controlled tabs.
	 *
	 * Generic, so a literal union such as `'general' | 'advanced'` survives
	 * into `onChange` instead of being widened to `string`.
	 */
	value?: TValue;
}

/**
 * TabPanel component - Individual tab content
 * Must be used as a child of Tabs component
 */
export function TabPanel<TValue extends string = string>({
	children,
}: TabPanelProps<TValue>): React.JSX.Element {
	return <>{children}</>;
}

TabPanel.displayName = 'TabPanel';

export interface TabsProps<TValue extends string = string> {
	/**
	 * Tab panels as children.
	 *
	 * Typed as ReactNode rather than a strict TabPanel element union, so
	 * conditional children, fragments and mapped arrays type-check. Non-element
	 * children are filtered out at runtime.
	 */
	children: React.ReactNode;

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
	onChange?: (index: number, value?: TValue) => void;

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
function TabsInner<TValue extends string = string>(
	{
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
	}: TabsProps<TValue>,
	ref: React.ForwardedRef<HTMLDivElement>
): React.JSX.Element {
	// Ids are scoped per instance, so two Tabs on one page don't collide on
	// `tab-0` / `panel-0` and cross-wire their aria-controls.
	const baseId = useId();
	// Controlled vs uncontrolled state
	const [uncontrolledActiveTab, setUncontrolledActiveTab] = useState(defaultActiveTab);
	const isControlled = controlledActiveTab !== undefined;
	const activeTabIndex = isControlled ? controlledActiveTab : uncontrolledActiveTab;

	// Derived once per children change. Previously this reallocated on every
	// render, which made handleKeyDown's useCallback identity-fresh each time
	// and defeated its own memoization (issue #50).
	const tabs = useMemo(
		() =>
			Children.toArray(children).filter((child): child is ReactElement<TabPanelProps<TValue>> =>
				isValidElement(child)
			),
		[children]
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
		<div ref={ref} className={containerClassNames}>
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
							aria-controls={`${baseId}-panel-${index}`}
							id={`${baseId}-tab-${index}`}
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
						id={`${baseId}-panel-${index}`}
						aria-labelledby={`${baseId}-tab-${index}`}
						hidden={!isActive}
						// The APG tabs pattern requires the panel be focusable
						// when its content isn't, so a scrollable panel can be
						// reached and read by keyboard users (issue #85).
						tabIndex={isActive ? 0 : undefined}
						className={panelContainerClassNames}
					>
						{isActive && tab.props.children}
					</div>
				);
			})}
		</div>
	);
}

const TabsWithRef = forwardRef(TabsInner);
TabsWithRef.displayName = 'Tabs';

/**
 * Mac OS 9 style Tabs component.
 *
 * Generic over the tab id, so a literal union survives into `onChange`:
 *
 * ```tsx
 * <Tabs<'general' | 'advanced'> onChange={(index, value) => …}>
 *   <TabPanel label="General" value="general">…</TabPanel>
 *   <TabPanel label="Advanced" value="advanced">…</TabPanel>
 * </Tabs>
 * ```
 */
export const Tabs = TabsWithRef as <TValue extends string = string>(
	props: TabsProps<TValue> & { ref?: React.Ref<HTMLDivElement> }
) => React.JSX.Element;

export default Tabs;
