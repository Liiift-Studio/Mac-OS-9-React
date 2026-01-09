# Active Context: Mac OS 9 UI Component Library

## Current Work Focus

### Phase: Core Components Complete - Container Components Next

Foundation and all core form/navigation components are now complete. Moving into container components (Window, TitleBar, Dialog, MenuBar).

#### Just Completed (2026-01-08 17:00)
1. ✅ **Tabs Component** - Simplified square tabs with box shadows
   - Basic square tabs with standard Mac OS 9 box shadows
   - Active/inactive states with proper colors
   - Keyboard navigation (arrows, Home, End)
   - Full accessibility with ARIA
   - **Note**: Trapezoid/stepped edge refinements deferred to Phase 2
2. ✅ **Typography System** - Updated to Charcoal Bold (700 weight) as default
3. ✅ **Pixelated Corners** - Created utility system for authentic Mac OS 9 corners
4. ✅ **Button Enhancement** - Applied pixelated corners to Button component

#### Phase 1 Components - ALL COMPLETE ✅
- ✅ Button (all variants, sizes, states, tests, stories)
- ✅ Checkbox (standard + indeterminate state)
- ✅ Radio (with Radio.Group)
- ✅ TextField (single + multi-line)
- ✅ Select (custom dropdown)
- ✅ Tabs (simplified, refinements deferred)

#### Currently Working On
- Updating memory-bank documentation to reflect current state
- Planning Phase 2: Container components (Window, TitleBar, Dialog, MenuBar)

## Recent Changes

### 2026-01-08 17:00 - Tabs Simplification
- Reverted SVG trapezoid experiments
- Implemented simple square tabs with box shadows
- Active tabs: light background, hidden bottom border
- Inactive tabs: darker background, visible borders
- Deferred pixel-perfect trapezoid shapes to Phase 2

### 2026-01-08 Afternoon - Component Sprint
- Completed Checkbox component with all states
- Completed Radio component with Radio.Group
- Completed TextField (single + multi-line variants)
- Completed Select with custom dropdown styling
- Started and simplified Tabs component

### 2026-01-08 Morning - Typography & Pixelation
- Updated default font weight to Charcoal Bold (700)
- Created `src/styles/pixelated-corners.css` utility system
- Applied pixelated corners to Button component

### 2026-01-08 Initial - Project Foundation
- Complete project scaffolding
- Figma MCP server integration
- Design token extraction
- Button component (reference implementation)

## Design Decisions Made

### 1. Typography: Charcoal Bold as Default
**Decision**: Use Charcoal Bold (700 weight) as the primary font weight  
**Rationale**: More authentic to Mac OS 9 which used bold text extensively in UI  
**Impact**: All components now use `--font-weight-bold` (700) by default  
**Date**: 2026-01-08

### 2. Pixelated Corners System
**Decision**: Create reusable utility classes for pixelated corners  
**Rationale**: Mac OS 9 had characteristic stepped/pixelated corners on many UI elements  
**Implementation**: CSS classes in `src/styles/pixelated-corners.css`  
**Impact**: Can be applied to any component via className  
**Date**: 2026-01-08

### 3. Tabs: Simplified Implementation
**Decision**: Use simple square tabs with box shadows (defer trapezoid shapes)  
**Rationale**: SVG trapezoid approach was complex and not rendering correctly  
**Impact**: Functional tabs now, can enhance visual fidelity in Phase 2  
**Status**: Temporary, marked for future refinement  
**Date**: 2026-01-08 17:00

### 4. CSS Strategy
**Decision**: CSS Modules + Custom Properties  
**Rationale**: Better performance than CSS-in-JS, easier to achieve pixel-perfect Mac OS 9 effects  
**Impact**: Components will use scoped CSS Modules that reference global CSS variables  
**Date**: 2026-01-08 (initial)

### 5. Build Output
**Decision**: Dual ESM/CJS with TypeScript declarations  
**Rationale**: Maximum compatibility with modern bundlers and Next.js  
**Impact**: Library usable in both ESM and CJS contexts  
**Date**: 2026-01-08 (initial)

### 6. Component API
**Decision**: Controlled + Uncontrolled support for form inputs  
**Rationale**: Flexibility for different use cases, follows React best practices  
**Impact**: More code but better developer experience  
**Date**: 2026-01-08 (initial)

### 7. Accessibility First
**Decision**: Build in ARIA and keyboard support from the start  
**Rationale**: Harder to retrofit later, core to project goals  
**Impact**: Every component includes ARIA attributes and keyboard handlers by default  
**Date**: 2026-01-08 (initial)

## Next Steps

### Immediate (Next Session)
1. **Window Component**: Classic Mac OS 9 window container
   - Titlebar with controls (close, minimize, maximize)
   - Resizable borders
   - Content area
   - Proper z-index layering
2. **TitleBar Component**: Standalone titlebar for windows
   - Window title text
   - Close/minimize/maximize buttons
   - Drag handle behavior (optional)

### Short-term (This Week)
1. **Dialog/Modal Component**: Modal dialogs
   - Centered window-style dialog
   - Backdrop/overlay
   - Focus trapping
   - Escape key to close
2. **MenuBar Component**: Top menu bar
   - Horizontal menu layout
   - MenuItem components
   - Keyboard navigation
   - Click-to-open behavior

### Medium-term (Phase 2 Enhancements)
1. **Pixelated Corners**: Apply to all remaining components
2. **Tab Shape Refinement**: Implement authentic trapezoid tabs with stepped edges
3. **Visual Polish Pass**: Review all components against Figma
4. **Icon System**: Expand icon library with more Mac OS 9 icons

### Long-term (Before Release)
1. **Accessibility Audit**: Full WCAG 2.1 AA compliance check
2. **Performance Testing**: Verify bundle size goals, render performance
3. **Cross-browser Testing**: Test in all target browsers
4. **Documentation**: README, CONTRIBUTING, THEMING guides
5. **Versioning**: Create initial changeset for 0.1.0 release
6. **Publishing Prep**: Verify npm pack output, test installation

## Active Considerations

### Design Fidelity Questions

#### Resolved
- ~~Font Weight~~: **RESOLVED** - Using Charcoal Bold (700) as default
- ~~Corner Style~~: **RESOLVED** - Created pixelated-corners utility system

#### Open Questions
- **Tab Trapezoid Shape**: How to achieve pixel-perfect trapezoid tabs?
  - *Current state*: Simple squares with box shadows
  - *Deferred to*: Phase 2 refinement
  - *Options*: SVG, CSS clip-path, or image-based approach

- **Window Resize**: Should windows be actually resizable or just styled?
  - *Need to decide*: Based on typical use cases
  - *Leaning toward*: Styled only, consumers can add resize logic if needed

- **MenuBar Behavior**: Should MenuBar handle state or be stateless?
  - *Need to decide*: Before implementation
  - *Leaning toward*: Controlled state, consumers manage open/closed

### Technical Considerations

#### Component Implementation Status
**Completed (6/9 v1 components):**
- Button ✅
- Checkbox ✅
- Radio ✅
- TextField ✅
- Select ✅
- Tabs ✅ (simplified)

**Remaining (3/9):**
- Window + TitleBar
- MenuBar + MenuItem
- Dialog / Modal

#### Testing Strategy
- Unit tests alongside each component
- Focus on behavior over implementation
- Test keyboard navigation for all interactive components
- Verify ARIA attributes

#### Performance Patterns
- Use React.memo for components that render frequently
- Avoid unnecessary re-renders with proper prop comparison
- Keep CSS scoped to avoid cascade issues

## Important Patterns Established

### Component Structure
```typescript
// Standard component pattern:
import React, { forwardRef } from 'react';
import styles from './Component.module.css';

export interface ComponentProps {
	/** JSDoc for every prop */
	children?: React.ReactNode;
	className?: string;
	// ... other props
}

export const Component = forwardRef<HTMLDivElement, ComponentProps>(
	({ children, className, ...props }, ref) => {
		const classNames = [
			styles.root,
			className,
		].filter(Boolean).join(' ');
		
		return (
			<div ref={ref} className={classNames} {...props}>
				{children}
			</div>
		);
	}
);

Component.displayName = 'Component';
export default Component;
```

### Pixelated Corners Usage
```css
/* In component CSS */
@import '../../styles/pixelated-corners.css';

.button {
	/* Apply corner styles */
}

.button--pixelated {
	/* Component-specific overrides */
}
```

### State Management Pattern
```typescript
// Controlled + uncontrolled pattern for form inputs:
const [uncontrolledValue, setUncontrolledValue] = useState(defaultValue);
const isControlled = value !== undefined;
const actualValue = isControlled ? value : uncontrolledValue;

const handleChange = (newValue) => {
	if (!isControlled) {
		setUncontrolledValue(newValue);
	}
	onChange?.(newValue);
};
```

### Keyboard Navigation Pattern
```typescript
const handleKeyDown = (event: React.KeyboardEvent) => {
	switch (event.key) {
		case 'ArrowUp':
		case 'ArrowDown':
			event.preventDefault();
			// Handle navigation
			break;
		case 'Enter':
		case ' ':
			event.preventDefault();
			// Handle selection
			break;
		case 'Escape':
			// Handle close/cancel
			break;
	}
};
```

## Learnings & Insights

### Mac OS 9 Design Language
- **Simplicity**: Clean rectangles, clear bevels, no unnecessary flourishes
- **Consistency**: Same shadow/bevel system across all raised elements
- **Clarity**: High contrast, bold text, clear interaction affordances
- **Efficiency**: Compact layouts, efficient use of space
- **Pixelation**: Characteristic stepped edges on corners and diagonals

### Modern Web Constraints
- Can't perfectly replicate bitmap fonts → use web fonts + bold weight
- CSS limitations for some effects → create utility systems for reuse
- Must add accessibility → ARIA + keyboard beyond original OS
- Balance authenticity with usability → pragmatic visual fidelity

### Development Philosophy
1. **Progress over perfection**: Ship simplified version, refine later
2. **Fidelity where it matters**: Core components pixel-perfect, enhancements in Phase 2
3. **Accessibility non-negotiable**: Build it in from start, no compromises
4. **Documentation as code**: Keep memory-bank synchronized with implementation
5. **Test as you go**: Write tests with components, not after

### Component Implementation Insights
- **Button sets the pattern**: First component establishes conventions for all others
- **Composition over configuration**: Small, focused components that compose well
- **Ref forwarding matters**: Consumers need access to underlying DOM nodes
- **TypeScript strictness pays off**: Catches issues early, better DX

## Blockers & Risks

### Current Blockers
- None (all core components implemented)

### Resolved Issues
- ✅ Tab trapezoid shape → Simplified to squares, deferred to Phase 2
- ✅ Typography weight → Resolved with Charcoal Bold default
- ✅ Corner pixelation → Resolved with utility class system

### Potential Risks
1. **Window Component Complexity**: May be most complex component yet
   - *Mitigation*: Start simple, add features iteratively
2. **MenuBar State Management**: Complex hover/click interactions
   - *Mitigation*: Use controlled component pattern, let consumers manage state
3. **Bundle Size**: Adding more components increases bundle
   - *Mitigation*: Monitor with each component, optimize before release
4. **Browser Compatibility**: Some CSS effects may vary across browsers
   - *Mitigation*: Test early on multiple browsers

## Questions to Resolve

### For Window Component
1. Should windows be draggable or just styled?
   → **Leaning toward**: Styled only, consumers add drag behavior if needed
2. Should windows be resizable?
   → **Leaning toward**: No, just visual styling
3. Should TitleBar be separate component or part of Window?
   → **Leaning toward**: Separate, more flexible composition

### For MenuBar
1. Stateful or stateless?
   → **Leaning toward**: Stateless, consumers manage open/closed state
2. Keyboard navigation pattern?
   → **Decision needed**: Left/Right for menus, Up/Down for items
3. Single vs. multi-select mode?
   → **Leaning toward**: Single only (authentic to Mac OS 9)

## Communication Notes

### For Future Sessions
When resuming work:
1. Review activeContext.md (this file) for current state
2. Check progress.md for completion status
3. Review recent changes section for context
4. Proceed with "Next Steps" section

### For Collaborators
- All components follow established patterns in systemPatterns.md
- Design tokens documented in techContext.md
- Each component has comprehensive JSDoc
- Follow pixelated-corners pattern for authentic Mac OS 9 look
- Accessibility is non-negotiable - include ARIA and keyboard support

### Memory Bank Synchronization
- **activeContext.md** (this file): Daily updates, current work focus
- **progress.md**: Mark items complete as they finish
- **systemPatterns.md**: Update when new patterns emerge
- **techContext.md**: Update when tooling/setup changes
- **projectbrief.md**, **productContext.md**: Reference only, rarely change
