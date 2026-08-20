// Button 1.0 API tests
//
// Covers the taxonomy and polymorphism changes: standard aria-* props with
// deprecated aliases, spread-order safety, asChild, and iconOnly naming.

import { describe, it, expect, vi, afterEach, beforeEach } from 'vitest';
import { render, screen, cleanup } from '@testing-library/react';
import { Button } from './Button';
import { IconButton } from '../IconButton/IconButton';
import { resetDeprecationWarnings } from '../../utils/deprecation';

beforeEach(() => resetDeprecationWarnings());
afterEach(cleanup);

describe('Button 1.0 API', () => {
	// ========================================
	// Standard ARIA props (issue #41)
	// ========================================

	it('accepts a standard aria-label', () => {
		render(<Button aria-label="Close window">x</Button>);
		expect(screen.getByRole('button', { name: 'Close window' })).toBeInTheDocument();
	});

	it('still accepts the deprecated ariaLabel and warns once', () => {
		const warn = vi.spyOn(console, 'warn').mockImplementation(() => {});
		render(<Button ariaLabel="Legacy name">x</Button>);

		expect(screen.getByRole('button', { name: 'Legacy name' })).toBeInTheDocument();
		expect(warn).toHaveBeenCalledTimes(1);
		expect(warn.mock.calls[0][0]).toContain('ariaLabel');
		warn.mockRestore();
	});

	it('prefers the hyphenated prop when both are given', () => {
		vi.spyOn(console, 'warn').mockImplementation(() => {});
		render(
			<Button ariaLabel="old" aria-label="new">
				x
			</Button>
		);
		expect(screen.getByRole('button', { name: 'new' })).toBeInTheDocument();
	});

	// ========================================
	// Spread order (issue #91)
	// ========================================

	it('does not let caller props clobber aria-disabled or aria-busy', () => {
		render(
			<Button loading {...({ 'aria-disabled': false, 'aria-busy': false } as never)}>
				Save
			</Button>
		);
		const button = screen.getByRole('button');
		expect(button).toHaveAttribute('aria-disabled', 'true');
		expect(button).toHaveAttribute('aria-busy', 'true');
	});

	it('does not let a spread href resurrect a disabled link', () => {
		render(
			<Button as="a" href="/real" disabled {...({ href: '/sneaky' } as never)}>
				Link
			</Button>
		);
		expect(screen.getByText('Link').closest('a')).not.toHaveAttribute('href');
	});

	// ========================================
	// iconOnly naming (issue #123)
	// ========================================

	it('uses string children as the accessible name when iconOnly', () => {
		render(<Button iconOnly>Close</Button>);
		expect(screen.getByRole('button', { name: 'Close' })).toBeInTheDocument();
	});

	it('warns when iconOnly has non-string children and no label', () => {
		const warn = vi.spyOn(console, 'warn').mockImplementation(() => {});
		render(
			<Button iconOnly>
				<svg />
			</Button>
		);
		expect(warn).toHaveBeenCalledTimes(1);
		expect(warn.mock.calls[0][0]).toContain('accessible name');
		warn.mockRestore();
	});

	it('does not warn when iconOnly has an explicit aria-label', () => {
		const warn = vi.spyOn(console, 'warn').mockImplementation(() => {});
		render(
			<Button iconOnly aria-label="Close">
				<svg />
			</Button>
		);
		expect(warn).not.toHaveBeenCalled();
		warn.mockRestore();
	});

	// ========================================
	// asChild (issue #99)
	// ========================================

	it('renders the child element and merges classes with asChild', () => {
		render(
			<Button asChild variant="primary">
				<a href="/dashboard" className="custom">
					Dashboard
				</a>
			</Button>
		);
		const link = screen.getByRole('link', { name: 'Dashboard' });
		expect(link).toHaveAttribute('href', '/dashboard');
		expect(link.className).toContain('custom');
		expect(link.className).toMatch(/button/);
	});

	it('warns and renders nothing when asChild has no element child', () => {
		const warn = vi.spyOn(console, 'warn').mockImplementation(() => {});
		const { container } = render(<Button asChild>plain text</Button>);
		expect(container).toBeEmptyDOMElement();
		expect(warn).toHaveBeenCalled();
		warn.mockRestore();
	});

	// ========================================
	// Taxonomy (issues #42, #43)
	// ========================================

	it.each(['default', 'primary', 'secondary', 'danger'] as const)(
		'accepts the %s variant',
		(variant) => {
			const { container } = render(<Button variant={variant}>x</Button>);
			expect(container.firstElementChild?.className).toContain(`button--${variant}`);
		}
	);

	it.each(['sm', 'md', 'lg'] as const)('accepts the %s size', (size) => {
		const { container } = render(<Button size={size}>x</Button>);
		expect(container.firstElementChild?.className).toContain(`button--${size}`);
	});
});

describe('IconButton', () => {
	// ========================================
	// Delegation to Button (issue #88)
	// ========================================

	it('renders a button carrying Button classes', () => {
		const { container } = render(<IconButton icon={<svg />} aria-label="Save" />);
		const button = screen.getByRole('button', { name: 'Save' });
		expect(button.tagName).toBe('BUTTON');
		expect(button.className).toMatch(/button/);
		expect(container.querySelector('[class*="iconButton"]')).toBeInTheDocument();
	});

	it('uses the label as the accessible name when present', () => {
		render(<IconButton icon={<svg />} label="New Folder" />);
		expect(screen.getByRole('button', { name: 'New Folder' })).toBeInTheDocument();
	});

	it('supports every label position', () => {
		for (const position of ['left', 'right', 'top', 'bottom'] as const) {
			const { container, unmount } = render(
				<IconButton icon={<svg />} label="x" labelPosition={position} />
			);
			expect(
				container.querySelector(`[class*="iconButton--label-${position}"]`)
			).toBeInTheDocument();
			unmount();
		}
	});
});
