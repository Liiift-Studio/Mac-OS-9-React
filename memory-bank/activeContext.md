# Active Context: Mac OS 9 UI Component Library

## Current Work Focus

### Phase: Foundation Complete - Component Implementation (In Progress)

Foundation is complete with pixel-accurate design tokens extracted from Figma. Button component is fully implemented and serves as the reference for all future components.

#### Just Completed
1. ✅ Full project infrastructure (package.json, TypeScript, build tools, testing, Storybook)
2. ✅ **Custom Figma MCP server** - Built and integrated for direct Figma API access
3. ✅ **Figma design token extraction** - Extracted all tokens from file `vy2T5MCXFz7QWf4Ba86eqN`
4. ✅ **Complete component inventory** - Documented 26 components in `docs/figma-map.md`
5. ✅ **Pixel-accurate design tokens** - Colors, typography, spacing, shadows all from Figma
6. ✅ **Mac OS 9 bevel system** - Exact 3-layer shadow implementation
7. ✅ **Button component (complete)** - All variants, sizes, states, stories, and tests
8. ✅ **Storybook running** - Successfully started at http://localhost:6006/
9. ✅ **CSS Modules type declarations** - Added to fix TypeScript errors
10. ✅ **Theme system** - 200+ CSS custom properties ready for use

#### Currently Working On
- Updating memory-bank documentation to reflect current state
- Planning next component implementations (Checkbox, Radio, TextField)

## Recent Changes

### 2026-01-08 - Initial Project Scaffolding
- Created complete project structure from scratch
- Established all configuration files (TypeScript, ESLint, Prettier, Vitest, Storybook, Changesets)
- Set up memory-bank documentation following custom instructions
- Created placeholder design tokens based on Mac OS 9 conventions
- Defined base TypeScript types for components
- Established CSS architecture with custom properties

### Design Decisions Made

#### 1. CSS Strategy
**Decision**: CSS Modules + Custom Properties
**Rationale**: Better performance than CSS-in-JS, easier to achieve pixel-perfect Mac OS 9 effects, smaller bundle size
**Impact**: Components will use scoped CSS Modules that reference global CSS variables

#### 2. Build Output
**Decision**: Dual ESM/CJS with "use client" directive
**Rationale**: Maximum compatibility with modern bundlers and Next.js App Router
**Impact**: Library usable in both ESM and CJS contexts, explicit client-side marking

#### 3. Component API
**Decision**: Controlled + Uncontrolled support for form inputs
**Rationale**: Flexibility for different use cases, follows React best practices
**Impact**: More code but better developer experience

#### 4. Accessibility First
**Decision**: Build in ARIA and keyboard support from the start
**Rationale**: Harder to retrofit later, core to project goals
**Impact**: Every component includes ARIA attributes and keyboard handlers by default

## Next Steps

### Immediate (Now)
1. **Install Dependencies**: Run `npm install` to install all packages
2. **Connect to Figma**: Use Figma MCP server to access design file
3. **Extract Design Tokens**: Pull accurate values from Figma (colors, spacing, typography, effects)
4. **Document Component Variants**: Create `docs/figma-map.md` mapping Figma components to React components

### Short-term (Next Session)
1. **Refine Design Tokens**: Update `src/tokens/index.ts` with actual Figma values
2. **Update Theme CSS**: Sync CSS variables with refined tokens
3. **Implement Button Component**: Start with foundation component
   - All variants (default, primary, secondary)
   - All states (default, hover, active, disabled, focus)
   - Full accessibility (keyboard, ARIA, focus management)
   - Comprehensive Storybook stories
   - Unit and integration tests

### Medium-term (This Week)
1. **Implement Form Components**: Checkbox, Radio, TextField, Select
2. **Implement Container Components**: Window, TitleBar, Dialog
3. **Implement Navigation**: MenuBar, MenuItem, Tabs
4. **Create Showcase Story**: Comprehensive example combining all components
5. **Visual Verification**: Compare all components against Figma, document deltas

### Long-term (Before Release)
1. **Accessibility Audit**: Full WCAG 2.1 AA compliance check
2. **Performance Testing**: Verify bundle size goals, render performance
3. **Cross-browser Testing**: Test in all target browsers
4. **Documentation**: README, CONTRIBUTING, THEMING guides
5. **Versioning**: Create initial changeset for 0.1.0 release
6. **Publishing Prep**: Verify npm pack output, test installation

## Active Considerations

### Design Fidelity Questions
- **Font Availability**: Mac OS 9 used Chicago and Geneva fonts - how to handle if unavailable?
  - *Current approach*: System font stack fallback
  - *May need*: Web font versions or pixel-perfect alternatives

- **Bevel Rendering**: CSS box-shadow vs. border-image for bevels?
  - *Current approach*: Dual inset box-shadows
  - *To verify*: Check fidelity against Figma at different sizes

- **Disabled State**: Mac OS 9 used dithering for disabled elements
  - *Current approach*: Reduced opacity
  - *May need*: CSS pattern for authentic dithering effect

### Technical Considerations

#### MCP Figma Integration
- Need to establish connection to Figma MCP server
- Extract all component variants and properties systematically
- Document any discrepancies or missing information
- Create comprehensive component inventory in `docs/figma-map.md`

#### Component Implementation Order
Following the "foundation first" principle:
1. **Button** (establishes patterns)
2. **Form inputs** (build on Button patterns)
3. **Containers** (composition patterns)
4. **Navigation** (complex state management)

#### Testing Strategy
- Write tests alongside components (not after)
- Focus on behavior over implementation
- Test keyboard navigation for every interactive component
- Verify ARIA attributes are correct

## Important Patterns Established

### Component Structure
```typescript
// Every component follows this pattern:
export interface ComponentProps extends BaseComponentProps {
  // Component-specific props with JSDoc
}

export const Component = forwardRef<RefType, ComponentProps>(
  (props, ref) => {
    // Implementation
  }
);

Component.displayName = 'Component';
```

### CSS Module Pattern
```css
/* Component.module.css */
.root {
  /* Use CSS custom properties from theme */
  background-color: var(--mac-os9-gray-500);
  box-shadow: var(--mac-os9-shadow-raised-full);
}
```

### Story Pattern
```typescript
// Component.stories.tsx
export default {
  title: 'Components/Component',
  component: Component,
} satisfies Meta<typeof Component>;

export const Default: Story = {
  args: {
    // Default props
  },
};
```

### Test Pattern
```typescript
// Component.test.tsx
describe('Component', () => {
  it('renders correctly', () => {
    // Test implementation
  });

  it('handles keyboard interaction', () => {
    // Accessibility test
  });
});
```

## Learnings & Insights

### Mac OS 9 Design Language
- **Simplicity**: No gradients, simple bevels, clear hierarchy
- **Consistency**: Same bevel effect across all raised elements
- **Clarity**: High contrast, readable text, clear interaction states
- **Efficiency**: Compact layouts, efficient use of space

### Modern Web Constraints
- Can't perfectly replicate bitmap fonts (use closest web fonts)
- CSS limitations for some effects (dithering, pixel-perfect bevels)
- Must add accessibility features not present in original OS
- Balance authenticity with usability on modern displays

### Development Philosophy
1. **Fidelity over speed**: Take time to get visuals right
2. **Accessibility non-negotiable**: Build it in from start
3. **Documentation as code**: Keep memory-bank and code in sync
4. **Test as you go**: Don't accumulate testing debt

## Blockers & Risks

### Current Blockers
- None (all tooling configured, ready to proceed)

### Potential Risks
1. **Figma Access**: If Figma MCP fails, may need manual token extraction
   - *Mitigation*: Have manual extraction process ready
2. **Font Availability**: May not find web versions of Mac OS 9 fonts
   - *Mitigation*: Document closest alternatives, consider custom web fonts
3. **Browser Compatibility**: Some CSS effects may not render identically across browsers
   - *Mitigation*: Test early, document known differences
4. **Bundle Size**: Component library could grow beyond 50KB target
   - *Mitigation*: Monitor bundle size during development, optimize before release

## Questions to Resolve

1. **Dithering Effect**: Should disabled states use authentic dithering or modern opacity?
   - *Leaning toward*: Opacity for simplicity, with dithering as optional enhancement
2. **Animation**: Should buttons have press animation or instant state change?
   - *Mac OS 9 behavior*: Instant, no animation
   - *Modern expectation*: May want subtle transition
3. **Theming**: How extensible should theming be?
   - *Current plan*: CSS variables can be overridden, but maintain Mac OS 9 character
4. **Font Loading**: Should we include web fonts or rely on system fonts?
   - *Need to decide*: After evaluating available web font options

## Communication Notes

### For Future Sessions
When resuming work, prioritize:
1. Review activeContext.md and progress.md
2. Check task_progress for current status
3. Complete any in-progress steps before starting new work
4. Update documentation as patterns evolve

### For Collaborators
- All design decisions documented in `memory-bank/`
- Component patterns established in `memory-bank/systemPatterns.md`
- Technical setup in `memory-bank/techContext.md`
- Follow established patterns for consistency
- Update memory-bank when making significant decisions- Technical setup in `memory-bank/techContext.md`
