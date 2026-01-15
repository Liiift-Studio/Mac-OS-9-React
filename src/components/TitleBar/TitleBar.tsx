/*
 * TitleBar Component - TEMPORARILY COMMENTED OUT
 * 
 * Reason: Component is unusable and looks bad, needs visual refinement
 * Date: 2026-01-15
 * 
 * TODO: Uncomment and refine when ready to improve visual design
 */

/*
// TitleBar component - Mac OS 9 style
// Window title bar with controls and title text

import React, { forwardRef } from 'react';
import styles from './TitleBar.module.css';

export interface TitleBarProps {
	title: string;
	active?: boolean;
	showControls?: boolean;
	showClose?: boolean;
	showMinimize?: boolean;
	showMaximize?: boolean;
	onClose?: () => void;
	onMinimize?: () => void;
	onMaximize?: () => void;
	onDoubleClick?: () => void;
	className?: string;
	titleClassName?: string;
	controlsClassName?: string;
	draggable?: boolean;
	onDragStart?: (event: React.MouseEvent<HTMLDivElement>) => void;
	rightContent?: React.ReactNode;
}

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
*/
