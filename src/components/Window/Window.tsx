// Window component - Mac OS 9 style
// Classic window container with optional title bar

import React, { forwardRef } from 'react';
import styles from './Window.module.css';

export interface WindowProps {
	/**
	 * Window content
	 */
	children: React.ReactNode;

	/**
	 * Window title (displays in title bar if no titleBar prop provided)
	 */
	title?: string;

	/**
	 * Custom title bar component
	 * If provided, overrides the default title bar
	 */
	titleBar?: React.ReactNode;

	/**
	 * Whether window is active/focused
	 * @default true
	 */
	active?: boolean;

	/**
	 * Width of the window
	 * @default 'auto'
	 */
	width?: number | string;

	/**
	 * Height of the window
	 * @default 'auto'
	 */
	height?: number | string;

	/**
	 * Custom class name for the window container
	 */
	className?: string;

	/**
	 * Custom class name for the content area
	 */
	contentClassName?: string;

	/**
	 * Whether to show window controls (close, minimize, maximize)
	 * @default true
	 */
	showControls?: boolean;

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
	 * Whether the window has a resize handle
	 * @default false
	 */
	resizable?: boolean;
}

/**
 * Mac OS 9 style Window component
 * 
 * Classic window container with title bar and content area.
 * 
 * Features:
 * - Classic Mac OS 9 window styling with beveled edges
 * - Optional title bar with window controls
 * - Active/inactive states
 * - Composable with custom TitleBar component
 * - Flexible sizing
 * 
 * @example
 * ```tsx
 * // Simple window with title
 * <Window title="My Window">
 *   <p>Window content goes here</p>
 * </Window>
 * 
 * // Window with custom title bar
 * <Window titleBar={<TitleBar title="Custom" />}>
 *   <p>Content</p>
 * </Window>
 * 
 * // Window with controls and callbacks
 * <Window 
 *   title="Document"
 *   onClose={() => console.log('Close')}
 *   onMinimize={() => console.log('Minimize')}
 * >
 *   <p>Content</p>
 * </Window>
 * ```
 */
export const Window = forwardRef<HTMLDivElement, WindowProps>(
	(
		{
			children,
			title,
			titleBar,
			active = true,
			width = 'auto',
			height = 'auto',
			className = '',
			contentClassName = '',
			showControls = true,
			onClose,
			onMinimize,
			onMaximize,
			resizable = false,
		},
		ref
	) => {
		// Class names
		const windowClassNames = [
			styles.window,
			active ? styles['window--active'] : styles['window--inactive'],
			className,
		]
			.filter(Boolean)
			.join(' ');

		const contentClassNames = [styles.content, contentClassName].filter(Boolean).join(' ');

		// Window style
		const windowStyle: React.CSSProperties = {};
		if (width !== 'auto') {
			windowStyle.width = typeof width === 'number' ? `${width}px` : width;
		}
		if (height !== 'auto') {
			windowStyle.height = typeof height === 'number' ? `${height}px` : height;
		}

		// Render title bar if title provided and no custom titleBar
		const renderTitleBar = () => {
			if (titleBar) {
				return titleBar;
			}

			if (title) {
				return (
					<div className={styles.titleBar} data-numControls={
						[onClose, onMinimize, onMaximize].filter(Boolean).length
					}>
						{showControls && (
							<div className={styles.controls}>
								{onClose && (
								<button
									type="button"
									className={styles.controlButton}
									onClick={onClose}
									aria-label="Close"
									title="Close"
								>
									<div className={styles.closeBox} />
								</button>
								)}
								{onMinimize && (
									<button
										type="button"
										className={styles.controlButton}
										onClick={onMinimize}
										aria-label="Minimize"
										title="Minimize"
									>
										<div className={styles.minimizeBox} />
									</button>
								)}
								{onMaximize && (
									<button
										type="button"
										className={styles.controlButton}
										onClick={onMaximize}
										aria-label="Maximize"
										title="Maximize"
									>
										<div className={styles.maximizeBox} />
									</button>
								)}
							</div>
						)}
						<div className={styles.titleCenter}>
						<svg width="132" height="13" viewBox="0 0 132 13" fill="none" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
							<rect width="130.517" height="13" fill="#DDDDDD"/>
							<rect width="1" height="13" fill="#EEEEEE"/>
							<rect x="130" width="1" height="13" fill="#C5C5C5"/>
							<rect y="1" width="131.268" height="1" fill="#999999"/>
							<rect y="5" width="131.268" height="1" fill="#999999"/>
							<rect y="9" width="131.268" height="1" fill="#999999"/>
							<rect y="3" width="131.268" height="1" fill="#999999"/>
							<rect y="7" width="131.268" height="1" fill="#999999"/>
							<rect y="11" width="131.268" height="1" fill="#999999"/>
						</svg>
						<div className={styles.titleText}>{title}</div>
						<svg width="132" height="13" viewBox="0 0 132 13" fill="none" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
							<rect width="130.517" height="13" fill="#DDDDDD"/>
							<rect width="1" height="13" fill="#EEEEEE"/>
							<rect x="130" width="1" height="13" fill="#C5C5C5"/>
							<rect y="1" width="131.268" height="1" fill="#999999"/>
							<rect y="5" width="131.268" height="1" fill="#999999"/>
							<rect y="9" width="131.268" height="1" fill="#999999"/>
							<rect y="3" width="131.268" height="1" fill="#999999"/>
							<rect y="7" width="131.268" height="1" fill="#999999"/>
							<rect y="11" width="131.268" height="1" fill="#999999"/>
						</svg>
						</div>

					</div>
				);
			}

			return null;
		};

		return (
			<div ref={ref} className={windowClassNames} style={windowStyle}>
				{renderTitleBar()}
				<div className={contentClassNames}>{children}</div>
				{resizable && <div className={styles.resizeHandle} aria-hidden="true" />}
			</div>
		);
	}
);

Window.displayName = 'Window';

export default Window;
