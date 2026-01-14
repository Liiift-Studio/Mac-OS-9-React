// TitleBar component - Mac OS 9 style
// Window title bar with controls and title text

import React, { forwardRef } from 'react';
import styles from './TitleBar.module.css';

export interface TitleBarProps {
	/**
	 * Window title text
	 */
	title: string;

	/**
	 * Whether the window/title bar is active/focused
	 * @default true
	 */
	active?: boolean;

	/**
	 * Whether to show window controls (close, minimize, maximize)
	 * @default true
	 */
	showControls?: boolean;

	/**
	 * Whether to show close button
	 * @default true
	 */
	showClose?: boolean;

	/**
	 * Whether to show minimize button
	 * @default true
	 */
	showMinimize?: boolean;

	/**
	 * Whether to show maximize button
	 * @default true
	 */
	showMaximize?: boolean;

	/**
	 * Callback when close button is clicked
	 */
	onClose?: () => void;

	/**
	 * Callback when minimize button is clicked
	 */
	onMinimize?: () => void;

	/**
	 * Callback when maximize button is clicked
	 */
	onMaximize?: () => void;

	/**
	 * Callback when title bar is double-clicked
	 * Typically used for maximize/restore behavior
	 */
	onDoubleClick?: () => void;

	/**
	 * Custom class name for the title bar container
	 */
	className?: string;

	/**
	 * Custom class name for the title text
	 */
	titleClassName?: string;

	/**
	 * Custom class name for the controls area
	 */
	controlsClassName?: string;

	/**
	 * Whether the title bar is draggable
	 * Note: This only adds styling, actual drag behavior must be implemented by consumer
	 * @default false
	 */
	draggable?: boolean;

	/**
	 * Callback when drag starts (if draggable is true)
	 */
	onDragStart?: (event: React.MouseEvent<HTMLDivElement>) => void;

	/**
	 * Additional content to render on the right side of the title bar
	 */
	rightContent?: React.ReactNode;
}

/**
 * Mac OS 9 style TitleBar component
 * 
 * Classic window title bar with title text and window controls.
 * Can be used standalone or composed within a Window component.
 * 
 * Features:
 * - Classic Mac OS 9 title bar styling with stripes pattern
 * - Window control buttons (close, minimize, maximize)
 * - Active/inactive states
 * - Optional double-click behavior
 * - Optional drag support (styling only, behavior implemented by consumer)
 * - Customizable button visibility
 * 
 * @example
 * ```tsx
 * // Basic title bar
 * <TitleBar title="My Document" />
 * 
 * // With all controls
 * <TitleBar
 *   title="Document.txt"
 *   onClose={() => console.log('Close')}
 *   onMinimize={() => console.log('Minimize')}
 *   onMaximize={() => console.log('Maximize')}
 * />
 * 
 * // Inactive state
 * <TitleBar title="Background Window" active={false} />
 * 
 * // Selective controls
 * <TitleBar
 *   title="Dialog"
 *   showMinimize={false}
 *   showMaximize={false}
 *   onClose={() => console.log('Close')}
 * />
 * 
 * // With double-click to maximize
 * <TitleBar
 *   title="Expandable"
 *   onDoubleClick={() => console.log('Toggle maximize')}
 * />
 * ```
 */
export const TitleBar = forwardRef<HTMLDivElement, TitleBarProps>(
	(
		{
			title,
			active = true,
			showControls = true,
			showClose = true,
			showMinimize = true,
			showMaximize = true,
			onClose,
			onMinimize,
			onMaximize,
			onDoubleClick,
			className = '',
			titleClassName = '',
			controlsClassName = '',
			draggable = false,
			onDragStart,
			rightContent,
		},
		ref
	) => {
		// Class names
		const titleBarClassNames = [
			styles.titleBar,
			active ? styles['titleBar--active'] : styles['titleBar--inactive'],
			draggable ? styles['titleBar--draggable'] : '',
			className,
		]
			.filter(Boolean)
			.join(' ');

		const titleTextClassNames = [styles.titleText, titleClassName].filter(Boolean).join(' ');

		const controlsClassNames = [styles.controls, controlsClassName].filter(Boolean).join(' ');

		// Handle mouse down for drag
		const handleMouseDown = (event: React.MouseEvent<HTMLDivElement>) => {
			if (draggable && onDragStart) {
				onDragStart(event);
			}
		};

		// Render window controls
		const renderControls = () => {
			if (!showControls) return null;

			const hasAnyControl = (showClose && onClose) || (showMinimize && onMinimize) || (showMaximize && onMaximize);
			if (!hasAnyControl) return null;

			return (
				<div className={controlsClassNames}>
					{showClose && onClose && (
						<button
							type="button"
							className={`${styles.controlButton} ${styles['controlButton--close']}`}
							onClick={onClose}
							aria-label="Close"
							title="Close"
						>
							<div className={styles.closeBox} />
						</button>
					)}
					{showMinimize && onMinimize && (
						<button
							type="button"
							className={`${styles.controlButton} ${styles['controlButton--minimize']}`}
							onClick={onMinimize}
							aria-label="Minimize"
							title="Minimize"
						>
							<div className={styles.minimizeBox} />
						</button>
					)}
					{showMaximize && onMaximize && (
						<button
							type="button"
							className={`${styles.controlButton} ${styles['controlButton--maximize']}`}
							onClick={onMaximize}
							aria-label="Maximize"
							title="Maximize"
						>
							<div className={styles.maximizeBox} />
						</button>
					)}
				</div>
			);
		};

		return (
			<div
				ref={ref}
				className={titleBarClassNames}
				onDoubleClick={onDoubleClick}
				onMouseDown={handleMouseDown}
				role="banner"
			>
				{renderControls()}
				<div className={titleTextClassNames}>{title}</div>
				{rightContent && <div className={styles.rightContent}>{rightContent}</div>}
			</div>
		);
	}
);

TitleBar.displayName = 'TitleBar';

export default TitleBar;