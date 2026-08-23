// Alert Component Tests
//
// The reason Alert exists is the arrangement — severity icon, message, and
// buttons bottom-right with the default rightmost. These pin that down, plus
// the alertdialog semantics Dialog alone does not give you.

import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { Alert } from './Alert';
import { checkA11y } from '../../test/axe';
import { nth } from '../../test/nth';

describe('Alert', () => {
	it('is an alertdialog, not a plain dialog', () => {
		render(<Alert open heading="Disk is full" />);
		expect(screen.getByRole('alertdialog')).toBeInTheDocument();
	});

	it('is named by its heading', () => {
		render(<Alert open heading="Disk is full" />);
		expect(screen.getByRole('alertdialog', { name: 'Disk is full' })).toBeInTheDocument();
	});

	it('is described by its message when there is one', () => {
		render(<Alert open heading="Disk is full" message="Delete some files to continue." />);
		const dialog = screen.getByRole('alertdialog');
		const describedBy = dialog.getAttribute('aria-describedby');

		expect(describedBy).toBeTruthy();
		expect(document.getElementById(describedBy!)).toHaveTextContent(
			'Delete some files to continue.'
		);
	});

	it('carries no description when there is no message', () => {
		render(<Alert open heading="Disk is full" />);
		expect(screen.getByRole('alertdialog')).not.toHaveAttribute('aria-describedby');
	});

	describe('actions', () => {
		it('shows only the confirming button by default', () => {
			// A note that needs acknowledging does not need a Cancel.
			render(<Alert open heading="Done" />);
			expect(screen.getAllByRole('button', { name: /OK|Cancel/ })).toHaveLength(1);
		});

		it('puts the default action rightmost', () => {
			render(<Alert open heading="Erase disk?" confirmLabel="Erase" cancelLabel="Cancel" />);
			const buttons = screen
				.getAllByRole('button')
				.filter((b) => ['Erase', 'Cancel'].includes(b.textContent ?? ''));

			expect(nth(buttons, 0)).toHaveTextContent('Cancel');
			expect(nth(buttons, 1)).toHaveTextContent('Erase');
		});

		it('confirms and then closes', () => {
			const onConfirm = vi.fn();
			const onClose = vi.fn();
			render(
				<Alert open heading="Erase disk?" confirmLabel="Erase" onConfirm={onConfirm} onClose={onClose} />
			);

			fireEvent.click(screen.getByRole('button', { name: 'Erase' }));

			expect(onConfirm).toHaveBeenCalled();
			expect(onClose).toHaveBeenCalled();
		});

		it('closes without confirming when cancelled', () => {
			const onConfirm = vi.fn();
			const onClose = vi.fn();
			render(
				<Alert
					open
					heading="Erase disk?"
					cancelLabel="Cancel"
					onConfirm={onConfirm}
					onClose={onClose}
				/>
			);

			fireEvent.click(screen.getByRole('button', { name: 'Cancel' }));

			expect(onClose).toHaveBeenCalled();
			expect(onConfirm).not.toHaveBeenCalled();
		});
	});

	it('renders nothing while closed', () => {
		render(<Alert open={false} heading="Disk is full" />);
		expect(screen.queryByRole('alertdialog')).not.toBeInTheDocument();
	});

	it('has no automatically detectable accessibility violations', async () => {
		const { container } = render(
			<Alert
				open
				severity="caution"
				heading="Are you sure?"
				message="This cannot be undone."
				confirmLabel="Erase"
				cancelLabel="Cancel"
				destructive
			/>
		);
		expect(await checkA11y(container)).toHaveNoViolations();
	});
});
