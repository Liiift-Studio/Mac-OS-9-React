// Dialog Component Tests
//
// Focused on the modal-correctness guarantees the component promises:
// portaling, body scroll lock accounting, and initial-focus resolution.

import { describe, it, expect, vi, afterEach } from 'vitest';
import { render, screen, cleanup } from '@testing-library/react';
import { createRef, useRef } from 'react';
import { Dialog } from './Dialog';

afterEach(() => {
	cleanup();
	// Every test must leave the body exactly as it found it; a leak here
	// means the reference-counted lock is unbalanced.
	document.body.style.overflow = '';
	document.body.style.paddingRight = '';
});

describe('Dialog', () => {
	// ========================================
	// Portaling (issue #28)
	// ========================================

	it('portals its backdrop to document.body rather than the mount point', () => {
		const { container } = render(
			<div style={{ overflow: 'hidden' }}>
				<Dialog open title="Portaled">
					<p>body</p>
				</Dialog>
			</div>
		);

		// Nothing is left behind at the mount point...
		expect(container.querySelector('[role="dialog"]')).toBeNull();
		// ...and the dialog is a descendant of <body> instead.
		const dialog = screen.getByRole('dialog');
		expect(dialog).toBeInTheDocument();
		expect(container.contains(dialog)).toBe(false);
	});

	it('renders nothing when closed', () => {
		render(<Dialog title="Closed">content</Dialog>);
		expect(screen.queryByRole('dialog')).toBeNull();
	});

	// ========================================
	// ARIA (issue #2, #30)
	// ========================================

	it('puts aria-modal on the dialog container, not the backdrop', () => {
		render(
			<Dialog open title="Named">
				<p>body</p>
			</Dialog>
		);
		const dialog = screen.getByRole('dialog');
		expect(dialog).toHaveAttribute('aria-modal', 'true');
		// The backdrop is the parent and must carry no ARIA role of its own.
		expect(dialog.parentElement).not.toHaveAttribute('role');
		expect(dialog.parentElement).not.toHaveAttribute('aria-modal');
	});

	it('supports the alertdialog role for destructive confirmations', () => {
		render(
			<Dialog open role="alertdialog" title="Delete?">
				<p>body</p>
			</Dialog>
		);
		expect(screen.getByRole('alertdialog')).toBeInTheDocument();
	});

	it('derives its accessible name from a string title', () => {
		render(
			<Dialog open title="Confirm Delete">
				<p>body</p>
			</Dialog>
		);
		expect(screen.getByRole('dialog')).toHaveAccessibleName('Confirm Delete');
	});

	// ========================================
	// Body scroll lock (issue #31)
	// ========================================

	it('locks body scroll while open and restores the prior inline value', () => {
		document.body.style.overflow = 'scroll';

		const { rerender } = render(
			<Dialog open title="Lock">
				<p>body</p>
			</Dialog>
		);
		expect(document.body.style.overflow).toBe('hidden');

		rerender(
			<Dialog open={false} title="Lock">
				<p>body</p>
			</Dialog>
		);
		// Restored to what the host app had set, not blanked to ''.
		expect(document.body.style.overflow).toBe('scroll');
	});

	it('keeps the page locked until the last stacked dialog closes', () => {
		const { rerender } = render(
			<>
				<Dialog open title="First">
					<p>one</p>
				</Dialog>
				<Dialog open title="Second">
					<p>two</p>
				</Dialog>
			</>
		);
		expect(document.body.style.overflow).toBe('hidden');

		// Closing only the topmost must not release the lock.
		rerender(
			<>
				<Dialog open title="First">
					<p>one</p>
				</Dialog>
				<Dialog open={false} title="Second">
					<p>two</p>
				</Dialog>
			</>
		);
		expect(document.body.style.overflow).toBe('hidden');

		rerender(
			<>
				<Dialog open={false} title="First">
					<p>one</p>
				</Dialog>
				<Dialog open={false} title="Second">
					<p>two</p>
				</Dialog>
			</>
		);
		expect(document.body.style.overflow).toBe('');
	});

	// ========================================
	// Initial focus (issues #3, #7, #117)
	// ========================================

	it('focuses the first focusable child when initialFocus is omitted', () => {
		render(
			<Dialog open title="Autofocus">
				<button type="button">First</button>
				<button type="button">Second</button>
			</Dialog>
		);
		expect(document.activeElement).toBe(screen.getByRole('button', { name: 'First' }));
	});

	it('accepts a selector string, scoped to the dialog', () => {
		render(
			<Dialog open title="Selector" initialFocus='[data-testid="target"]'>
				<button type="button">First</button>
				<button type="button" data-testid="target">
					Target
				</button>
			</Dialog>
		);
		expect(document.activeElement).toBe(screen.getByTestId('target'));
	});

	it('ignores a malformed selector instead of throwing', () => {
		expect(() =>
			render(
				<Dialog open title="Bad selector" initialFocus=":::not-a-selector">
					<button type="button">First</button>
				</Dialog>
			)
		).not.toThrow();
		// Falls back to the default first-focusable behaviour.
		expect(document.activeElement).toBe(screen.getByRole('button', { name: 'First' }));
	});

	it('accepts a callback returning the element (late binding)', () => {
		function WithCallback() {
			const ref = useRef<HTMLButtonElement>(null);
			return (
				<Dialog open title="Callback" initialFocus={() => ref.current}>
					<button type="button">First</button>
					<button type="button" ref={ref}>
						Late
					</button>
				</Dialog>
			);
		}
		render(<WithCallback />);
		expect(document.activeElement).toBe(screen.getByRole('button', { name: 'Late' }));
	});

	it('accepts a narrow ref without casting', () => {
		const ref = createRef<HTMLButtonElement>();
		render(
			<Dialog open title="Ref" initialFocus={ref}>
				<button type="button">First</button>
				<button type="button" ref={ref}>
					Second
				</button>
			</Dialog>
		);
		expect(document.activeElement).toBe(screen.getByRole('button', { name: 'Second' }));
	});

	// ========================================
	// Escape handling (issue #6)
	// ========================================

	it('closes only the topmost dialog on Escape', () => {
		const onCloseOuter = vi.fn();
		const onCloseInner = vi.fn();
		render(
			<>
				<Dialog open title="Outer" onClose={onCloseOuter}>
					<p>outer</p>
				</Dialog>
				<Dialog open title="Inner" onClose={onCloseInner}>
					<p>inner</p>
				</Dialog>
			</>
		);

		document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true }));

		expect(onCloseInner).toHaveBeenCalledTimes(1);
		expect(onCloseOuter).not.toHaveBeenCalled();
	});
});
