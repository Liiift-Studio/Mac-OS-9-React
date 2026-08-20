// Window Component Tests
//
// Focused on the drag/resize correctness and accessibility guarantees added
// for the panel review: controlled position, z-order, keyboard move/resize,
// and the directional resize handles.

import { describe, it, expect, vi, afterEach } from 'vitest';
import { render, screen, cleanup, fireEvent } from '@testing-library/react';
import { useState } from 'react';
import { Window } from './Window';
import { WindowManagerProvider } from '../WindowManager';

afterEach(cleanup);

/** Focus the title bar toolbar, the keyboard entry point for move/resize. */
function getTitleBar(): HTMLElement {
	return screen.getByRole('toolbar');
}

describe('Window', () => {
	// ========================================
	// Controlled position (issue #26)
	// ========================================

	it('honours a controlled position immediately, without requiring a drag first', () => {
		const { container } = render(
			<Window title="Snap" draggable position={{ x: 120, y: 80 }}>
				<p>content</p>
			</Window>
		);
		const win = container.firstElementChild as HTMLElement;
		expect(win.style.position).toBe('absolute');
		expect(win.style.left).toBe('120px');
		expect(win.style.top).toBe('80px');
	});

	it('follows an asynchronous controlled position update', () => {
		function Harness() {
			const [pos, setPos] = useState({ x: 0, y: 0 });
			return (
				<>
					<button type="button" onClick={() => setPos({ x: 250, y: 175 })}>
						snap
					</button>
					<Window title="Snap" draggable position={pos} onPositionChange={setPos}>
						<p>content</p>
					</Window>
				</>
			);
		}
		const { container } = render(<Harness />);
		fireEvent.click(screen.getByRole('button', { name: 'snap' }));

		const win = container.querySelector('[role="toolbar"]')?.parentElement as HTMLElement;
		expect(win.style.left).toBe('250px');
		expect(win.style.top).toBe('175px');
	});

	// ========================================
	// active default (issue #98)
	// ========================================

	it('defaults to inactive rather than active', () => {
		const { container } = render(
			<Window title="Plain">
				<p>content</p>
			</Window>
		);
		const win = container.firstElementChild as HTMLElement;
		expect(win.className).toContain('window--inactive');
		expect(win.className).not.toContain('window--active');
	});

	it('still honours an explicit active prop', () => {
		const { container } = render(
			<Window title="Focused" active>
				<p>content</p>
			</Window>
		);
		expect((container.firstElementChild as HTMLElement).className).toContain('window--active');
	});

	// ========================================
	// Window manager z-order (issue #24)
	// ========================================

	it('assigns ascending z-index by stack order inside a manager', () => {
		const { container } = render(
			<WindowManagerProvider>
				<Window title="Back">
					<p>back</p>
				</Window>
				<Window title="Front">
					<p>front</p>
				</Window>
			</WindowManagerProvider>
		);
		const wins = Array.from(container.querySelectorAll('[class*="window"]')).filter(
			(el) => (el as HTMLElement).style.zIndex
		) as HTMLElement[];

		expect(wins).toHaveLength(2);
		expect(Number(wins[1].style.zIndex)).toBeGreaterThan(Number(wins[0].style.zIndex));
	});

	it('raises a window to the front when it is pressed', () => {
		const { container } = render(
			<WindowManagerProvider>
				<Window title="Back">
					<p>back</p>
				</Window>
				<Window title="Front">
					<p>front</p>
				</Window>
			</WindowManagerProvider>
		);
		const wins = Array.from(container.querySelectorAll('[class*="window"]')).filter(
			(el) => (el as HTMLElement).style.zIndex
		) as HTMLElement[];

		const [back, front] = wins;
		expect(Number(back.style.zIndex)).toBeLessThan(Number(front.style.zIndex));

		fireEvent.pointerDown(back);

		// The pressed window is now on top and marked active.
		expect(Number(back.style.zIndex)).toBeGreaterThan(Number(front.style.zIndex));
		expect(back.className).toContain('window--active');
		expect(front.className).toContain('window--inactive');
	});

	it('leaves z-index unset when there is no manager and no zIndex prop', () => {
		const { container } = render(
			<Window title="Solo">
				<p>content</p>
			</Window>
		);
		expect((container.firstElementChild as HTMLElement).style.zIndex).toBe('');
	});

	it('lets an explicit zIndex prop override the manager', () => {
		const { container } = render(
			<WindowManagerProvider>
				<Window title="Pinned" zIndex={9999}>
					<p>content</p>
				</Window>
			</WindowManagerProvider>
		);
		expect((container.firstElementChild as HTMLElement).style.zIndex).toBe('9999');
	});

	// ========================================
	// Keyboard move / resize (issue #25)
	// ========================================

	it('exposes the title bar as a keyboard-reachable toolbar when draggable', () => {
		render(
			<Window title="Movable" draggable>
				<p>content</p>
			</Window>
		);
		const titleBar = getTitleBar();
		expect(titleBar).toHaveAttribute('tabindex', '0');
		expect(titleBar.getAttribute('aria-label')).toMatch(/arrow keys move/i);
	});

	it('is not a tab stop when neither draggable nor resizable', () => {
		render(
			<Window title="Static">
				<p>content</p>
			</Window>
		);
		expect(screen.queryByRole('toolbar')).toBeNull();
	});

	it('moves the window with arrow keys', () => {
		const onPositionChange = vi.fn();
		render(
			<Window
				title="Movable"
				draggable
				position={{ x: 100, y: 100 }}
				onPositionChange={onPositionChange}
			>
				<p>content</p>
			</Window>
		);

		fireEvent.keyDown(getTitleBar(), { key: 'ArrowRight' });
		expect(onPositionChange).toHaveBeenCalledWith({ x: 108, y: 100 });

		fireEvent.keyDown(getTitleBar(), { key: 'ArrowUp' });
		expect(onPositionChange).toHaveBeenLastCalledWith({ x: 100, y: 92 });
	});

	it('uses a 1px fine step when Alt is held', () => {
		const onPositionChange = vi.fn();
		render(
			<Window
				title="Movable"
				draggable
				position={{ x: 100, y: 100 }}
				onPositionChange={onPositionChange}
			>
				<p>content</p>
			</Window>
		);
		fireEvent.keyDown(getTitleBar(), { key: 'ArrowRight', altKey: true });
		expect(onPositionChange).toHaveBeenCalledWith({ x: 101, y: 100 });
	});

	it('resizes with Shift+Arrow and clamps to minWidth', () => {
		const onResize = vi.fn();
		render(
			<Window title="Sizable" resizable width={300} height={200} minWidth={290} onResize={onResize}>
				<p>content</p>
			</Window>
		);

		fireEvent.keyDown(getTitleBar(), { key: 'ArrowRight', shiftKey: true });
		expect(onResize).toHaveBeenCalledWith({ width: 308, height: 200 });

		// Two steps left would reach 292, a third would breach the 290 floor.
		fireEvent.keyDown(getTitleBar(), { key: 'ArrowLeft', shiftKey: true });
		fireEvent.keyDown(getTitleBar(), { key: 'ArrowLeft', shiftKey: true });
		fireEvent.keyDown(getTitleBar(), { key: 'ArrowLeft', shiftKey: true });
		expect(onResize).toHaveBeenLastCalledWith({ width: 290, height: 200 });
	});

	it('announces keyboard moves in a polite live region', () => {
		render(
			<Window title="Movable" draggable defaultPosition={{ x: 0, y: 0 }}>
				<p>content</p>
			</Window>
		);
		fireEvent.keyDown(getTitleBar(), { key: 'ArrowDown' });

		const status = screen.getByRole('status');
		expect(status).toHaveAttribute('aria-live', 'polite');
		expect(status).toHaveTextContent('Position 0, 8');
	});

	it('ignores arrow keys when the window is neither draggable nor resizable', () => {
		const onPositionChange = vi.fn();
		const { container } = render(
			<Window title="Static" position={{ x: 0, y: 0 }} onPositionChange={onPositionChange}>
				<p>content</p>
			</Window>
		);
		const titleBar = container.querySelector('[data-numControls]') as HTMLElement;
		fireEvent.keyDown(titleBar, { key: 'ArrowRight' });
		expect(onPositionChange).not.toHaveBeenCalled();
	});

	// ========================================
	// Directional resize handles (issue #27)
	// ========================================

	it('renders all eight resize handles when resizable', () => {
		const { container } = render(
			<Window title="Sizable" resizable>
				<p>content</p>
			</Window>
		);
		const handles = container.querySelectorAll('[data-direction]');
		expect(handles).toHaveLength(8);
		expect(
			Array.from(handles)
				.map((h) => h.getAttribute('data-direction'))
				.sort()
		).toEqual(['e', 'n', 'ne', 'nw', 's', 'se', 'sw', 'w']);
	});

	it('renders no resize handles when not resizable', () => {
		const { container } = render(
			<Window title="Fixed">
				<p>content</p>
			</Window>
		);
		expect(container.querySelectorAll('[data-direction]')).toHaveLength(0);
	});

	it('honours a restricted resizeDirections list', () => {
		const { container } = render(
			<Window title="Sizable" resizable resizeDirections={['se']}>
				<p>content</p>
			</Window>
		);
		const handles = container.querySelectorAll('[data-direction]');
		expect(handles).toHaveLength(1);
		expect(handles[0]).toHaveAttribute('data-direction', 'se');
	});
});
