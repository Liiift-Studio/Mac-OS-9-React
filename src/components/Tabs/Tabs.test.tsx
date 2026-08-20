// Tabs Component Tests

import { describe, it, expect, vi, afterEach } from 'vitest';
import { render, screen, cleanup, fireEvent } from '@testing-library/react';
import { createRef } from 'react';
import { Tabs, TabPanel } from './Tabs';

afterEach(cleanup);

function basicTabs() {
	return (
		<Tabs>
			<TabPanel label="General">General content</TabPanel>
			<TabPanel label="Advanced">Advanced content</TabPanel>
			<TabPanel label="Expert" disabled>
				Expert content
			</TabPanel>
		</Tabs>
	);
}

describe('Tabs', () => {
	it('renders a tablist with one tab per panel', () => {
		render(basicTabs());
		expect(screen.getByRole('tablist')).toBeInTheDocument();
		expect(screen.getAllByRole('tab')).toHaveLength(3);
	});

	// ========================================
	// forwardRef (issue #39)
	// ========================================

	it('forwards a ref to the container', () => {
		const ref = createRef<HTMLDivElement>();
		render(
			<Tabs ref={ref}>
				<TabPanel label="One">one</TabPanel>
			</Tabs>
		);
		expect(ref.current).toBeInstanceOf(HTMLDivElement);
	});

	// ========================================
	// Focusable panel (issue #85)
	// ========================================

	it('makes the active panel focusable', () => {
		render(basicTabs());
		const panel = screen.getByRole('tabpanel');
		expect(panel).toHaveAttribute('tabindex', '0');
	});

	// ========================================
	// Flexible children (issue #116)
	// ========================================

	it('accepts conditional and mapped children', () => {
		const show = true;
		render(
			<Tabs>
				{show && <TabPanel label="Conditional">c</TabPanel>}
				{['A', 'B'].map((name) => (
					<TabPanel key={name} label={name}>
						{name}
					</TabPanel>
				))}
			</Tabs>
		);
		expect(screen.getAllByRole('tab')).toHaveLength(3);
	});

	// ========================================
	// Behaviour
	// ========================================

	it('switches panels on click', () => {
		render(basicTabs());
		fireEvent.click(screen.getByRole('tab', { name: 'Advanced' }));
		expect(screen.getByText('Advanced content')).toBeInTheDocument();
	});

	it('reports index and value through onChange', () => {
		const onChange = vi.fn();
		render(
			<Tabs onChange={onChange}>
				<TabPanel label="One" value="one">
					one
				</TabPanel>
				<TabPanel label="Two" value="two">
					two
				</TabPanel>
			</Tabs>
		);
		fireEvent.click(screen.getByRole('tab', { name: 'Two' }));
		expect(onChange).toHaveBeenCalledWith(1, 'two');
	});

	it('navigates with arrow keys and skips disabled tabs', () => {
		render(basicTabs());
		const first = screen.getByRole('tab', { name: 'General' });
		fireEvent.keyDown(first, { key: 'ArrowRight' });
		expect(screen.getByRole('tab', { name: 'Advanced' })).toHaveAttribute('aria-selected', 'true');
	});

	it('gives each instance unique tab and panel ids', () => {
		render(
			<>
				<Tabs>
					<TabPanel label="A">a</TabPanel>
				</Tabs>
				<Tabs>
					<TabPanel label="B">b</TabPanel>
				</Tabs>
			</>
		);
		const [tabA, tabB] = screen.getAllByRole('tab');
		expect(tabA.id).not.toBe(tabB.id);
		expect(tabA.getAttribute('aria-controls')).not.toBe(tabB.getAttribute('aria-controls'));
	});
});
