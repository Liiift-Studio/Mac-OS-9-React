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

#### Phase 2 Container Components - COMPLETE ✅
- ✅ Window (complete)
- ✅ Dialog (complete)
- ⏸️ TitleBar (completed but now fully commented out - pending redesign)
- ✅ MenuBar + MenuItem (complete)

#### Just Completed (2026-01-09 14:40)
1. ✅ **MenuBar + MenuItem Components** - Classic Mac OS 9 menu system
   - MenuBar container component with horizontal menu layout
   - MenuItem component with multiple variants (standard, separator, checkmark, submenu indicator)
   - Controlled state management for open/close
   - Click-to-open menu behavior
   - Keyboard navigation (Left/Right arrows, Escape, Enter)
   - Mac OS 9 blue highlight on hover (#0000BB)
   - Disabled menu and item states
   - Full TypeScript types with JSDoc
   - Component exports (MenuBar, MenuItem, types)
   - **Note**: Storybook stories file encountered corruption issues, to be resolved separately

#### Just Completed (2026-01-09 14:30)
1. ✅ **TitleBar Component** - Standalone title bar component
   - Classic Mac OS 9 title bar with window controls
   - Active/inactive states
   - Draggable cursor styling support
   - Customizable button visibility
   - Right content area for additional elements
   - Comprehensive Storybook stories (16 examples)
   - Full TypeScript types and JSDoc
   - **Update 2026-01-15**: Fully commented out pending visual redesign

#### Currently Working On
- Phase 3: Visual refinements in progress
- Applied pixelated corners to Window, Dialog (via Window), and Tabs components
- Improved ListView hover states for better visibility
- Next: Continue visual polish and testing improvements

## Recent Changes

### 2026-01-16 13:02 - README Package Name Update
- Updated all README.md import examples to use scoped package name `@liiift-studio/mac-os9-ui`
- Changed from `mac-os9-ui` to `@liiift-studio/mac-os9-ui` throughout documentation
- Updated installation command: `npm install @liiift-studio/mac-os9-ui`
- Updated all import statements in examples to use `@liiift-studio/mac-os9-ui`
- Updated style import to `@liiift-studio/mac-os9-ui/styles`
- Package.json already had correct scoped name, README now matches
- No other files needed updates (search confirmed)

### 2026-01-15 12:52 - TitleBar Component Fully Commented Out
- Commented out all TitleBar component files (component, styles, stories, exports)
- Files affected:
  - `src/components/TitleBar/TitleBar.tsx` - component implementation commented out
  - `src/components/TitleBar/TitleBar.module.css` - styles removed (restore from git history when needed)
  - `src/components/TitleBar/TitleBar.stories.tsx` - all 16 stories commented out (removed from Storybook)
  - `src/components/TitleBar/index.ts` - exports commented out
- Reason: Component is unusable and looks bad, needs complete visual refinement
- Status: All files preserved with clear header comments indicating temporary status
- Export from `src/index.ts` was already commented out on 2026-01-14
- TitleBar can be restored from git history when ready for redesign
- Component will not appear in Storybook or be available in package exports

### 2026-01-14 15:27 - React 18 and 19 Compatibility
- Updated peerDependencies to support both React 18 and React 19
- Changed from `"react": "^18.0.0"` to `"react": "^18.0.0 || ^19.0.0"`
- Changed from `"react-dom": "^18.0.0"` to `"react-dom": "^18.0.0 || ^19.0.0"`
- Verified build works with updated dependencies (ESM: 60KB, CJS: 63KB, CSS: 37KB)
- Tested with existing test suite - no React version compatibility issues
- Library now compatible with projects using either React 18 or React 19

### 2026-01-14 14:25 - NPM Launch Preparation
- Hidden TitleBar component from library exports (needs visual refinement)
- Updated README.md to remove TitleBar references from examples
- Tested build process - successful (ESM: 60KB, CJS: 63KB, CSS: 37KB)
- Tested package creation - ready for NPM (148.2 KB compressed, 825.1 KB unpacked)
- Package is now ready for NPM publishing

### 2026-01-14 14:15 - ListView Hover State Improvements
- Fixed ListView row hover state visibility issue
- Changed row hover from `var(--color-gray-200)` to `var(--color-gray-300)` (was invisible against background)
- Updated selected row from `var(--color-gray-300)` to `var(--color-gray-400)` for clearer hierarchy
- Added selected row hover state using `var(--color-gray-500)` for improved feedback
- Visual hierarchy now: normal (gray-200) → hover (gray-300) → selected (gray-400) → selected+hover (gray-500)
- Hover state now clearly visible across entire row as intended in Mac OS 9 style

### 2026-01-13 13:00 - Phase 3 Visual Refinements Started
- Applied pixelated corners to Window component (4px stepped corners)
- Dialog component automatically inherits pixelated corners from Window
- Applied pixelated corners to Tabs component (pixelated top corners, flat bottom)
- Improved authentic Mac OS 9 appearance across container and navigation components

### 2026-01-09 14:40 - MenuBar + MenuItem Components Complete
- Implemented MenuBar container component with horizontal layout
- Implemented MenuItem component with multiple variants (standard, separator, checkmark, submenu)
- Added controlled state management (open/close via props)
- Implemented keyboard navigation (Left/Right arrows, Escape, Enter)
- Applied Mac OS 9 blue highlight (#0000BB) on hover
- Added disabled states for both menus and items
- Exported components and types from main index
- **Note**: Storybook stories file had corruption issues during creation, to be addressed separately
- **Phase 2 Container Components now COMPLETE!**

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

### 8. TitleBar: Comment Out for Redesign
**Decision**: Fully comment out TitleBar component instead of shipping it  
**Rationale**: Component is unusable and looks bad, better to not ship than ship poor quality  
**Impact**: TitleBar removed from Storybook and package exports, preserved in codebase for future redesign  
**Status**: Temporary, will be redesigned and uncommented when ready  
**Date**: 2026-01-15

## Next Steps

### Immediate (Next Session)
1. **TitleBar Redesign**: Complete visual refinement of TitleBar component
   - Improve visual appearance to match Mac OS 9 authenticity
   - Fix styling issues that made it unusable
   - Uncomment all files when ready
   - Re-enable in Storybook and package exports

### Short-term (This Week)
1. **Visual Polish Pass**: Review all components against Figma
2. **Icon System**: Expand icon library with more Mac OS 9 icons
3. **Testing Improvements**: Increase test coverage

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
- **TitleBar Visual Design**: How to improve TitleBar appearance?
  - *Current state*: Fully commented out, needs complete redesign
  - *Status*: Pending redesign
  - *Priority*: Medium - can ship without it, but should be addressed

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
6. **Quality over completeness**: Better to comment out poor components than ship them

### Component Implementation Insights
- **Button sets the pattern**: First component establishes conventions for all others
- **Composition over configuration**: Small, focused components that compose well
- **Ref forwarding matters**: Consumers need access to underlying DOM nodes
- **TypeScript strictness pays off**: Catches issues early, better DX
- **Visual quality matters**: If a component looks bad, don't ship it - comment it out and fix later

## Blockers & Risks

### Current Blockers
- None (all shipped components are functional)

### Resolved Issues
- ✅ Tab trapezoid shape → Simplified to squares, deferred to Phase 2
- ✅ Typography weight → Resolved with Charcoal Bold default
- ✅ Corner pixelation → Resolved with utility class system
- ✅ ListView hover visibility → Fixed with proper color hierarchy
- ✅ TitleBar visual quality → Commented out pending redesign

### Potential Risks
1. **TitleBar Redesign Complexity**: May require significant effort to get right
   - *Mitigation*: Can ship without it, redesign when resources available
2. **Bundle Size**: Adding more components increases bundle
   - *Mitigation*: Monitor with each component, optimize before release
3. **Browser Compatibility**: Some CSS effects may vary across browsers
   - *Mitigation*: Test early on multiple browsers

## Questions to Resolve

### For TitleBar Component
1. What visual improvements are needed?
   → **Need to investigate**: Review Mac OS 9 screenshots and Figma designs
2. Should we use a different approach for the striped pattern?
   → **Need to experiment**: Try different CSS techniques
3. Are the window controls sized/styled correctly?
   → **Need to verify**: Compare against authentic Mac OS 9

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
- TitleBar component is fully commented out - do not reference or import it

### Memory Bank Synchronization
- **activeContext.md** (this file): Daily updates, current work focus
- **progress.md**: Mark items complete as they finish
- **systemPatterns.md**: Update when new patterns emerge
- **techContext.md**: Update when tooling/setup changes
- **projectbrief.md**, **productContext.md**: Reference only, rarely change
