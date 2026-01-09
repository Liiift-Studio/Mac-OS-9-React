# Button Component - Future Enhancements (Low Priority)

This document outlines low-priority enhancements for the Button component that can be implemented in future versions.

## Overview

The Button component has been enhanced with high and medium priority features (polymorphic support, loading states, icons, ARIA, form integration). The following features are planned for future implementation but are not critical for the initial release.

---

## Low Priority Features

### 1. Tooltip Support

**Description**: Add built-in tooltip functionality to buttons.

**Props:**
```typescript
tooltip?: string | React.ReactNode;
tooltipPosition?: 'top' | 'bottom' | 'left' | 'right';
tooltipDelay?: number; // ms before showing tooltip
```

**Example:**
```tsx
<Button tooltip="Click to save your changes">
  Save
</Button>

<Button 
  tooltip="This action cannot be undone" 
  tooltipPosition="top"
  variant="danger"
>
  Delete
</Button>
```

**Implementation Notes:**
- Create separate `Tooltip` component first
- Use CSS positioning for Mac OS 9 style rectangular tooltips
- Respect `prefers-reduced-motion`
- Ensure keyboard accessibility (show on focus)

---

### 2. Badge/Notification Indicators

**Description**: Small notification badges on buttons, similar to iOS notification dots.

**Props:**
```typescript
badge?: string | number | boolean;
badgeVariant?: 'default' | 'primary' | 'danger';
badgePosition?: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left';
```

**Example:**
```tsx
<Button badge={5} leftIcon={<MailIcon />}>
  Messages
</Button>

<Button badge badgeVariant="danger">
  Notifications
</Button>
```

**Implementation Notes:**
- Small circular or square badge in Mac OS 9 style
- Position absolutely relative to button
- Consider accessibility - use `aria-label` to announce count
- Max display (e.g., "99+") for large numbers

---

### 3. Keyboard Shortcut Hints

**Description**: Visual display of keyboard shortcuts on buttons.

**Props:**
```typescript
shortcut?: string | string[]; // e.g., "⌘S" or ["Ctrl", "S"]
showShortcutHint?: boolean; // Show visually vs aria-only
```

**Example:**
```tsx
<Button shortcut="⌘S" leftIcon={<SaveIcon />}>
  Save
</Button>

<Button shortcut={["Ctrl", "P"]}>
  Print
</Button>
```

**Implementation Notes:**
- Display shortcut in lighter text after button label
- Mac OS 9 often showed shortcuts like "Command-S"
- Use monospace font for keyboard keys
- Add to `aria-keyshortcuts` attribute

---

### 4. Button Groups

**Description**: Component for grouping related buttons.

**New Component**: `ButtonGroup`

**Props:**
```typescript
orientation?: 'horizontal' | 'vertical';
spacing?: 'none' | 'sm' | 'md';
attached?: boolean; // Merge borders between buttons
```

**Example:**
```tsx
<ButtonGroup attached>
  <Button>Left</Button>
  <Button>Center</Button>
  <Button>Right</Button>
</ButtonGroup>

<ButtonGroup orientation="vertical">
  <Button>First</Button>
  <Button>Second</Button>
  <Button>Third</Button>
</ButtonGroup>
```

**Implementation Notes:**
- Remove duplicate borders when attached
- First/last buttons might have special styling
- Consider `role="group"` for accessibility
- Mac OS 9 radio button groups as reference

---

### 5. Split Buttons (Dropdown Actions)

**Description**: Button with primary action and dropdown for secondary actions.

**New Component**: `SplitButton`

**Props:**
```typescript
actions: Array<{
  label: string;
  onClick: () => void;
  icon?: React.ReactNode;
}>;
```

**Example:**
```tsx
<SplitButton
  onClick={handlePrimaryAction}
  actions={[
    { label: 'Save as Draft', onClick: handleDraft },
    { label: 'Save and Close', onClick: handleSaveClose },
  ]}
>
  Save
</SplitButton>
```

**Implementation Notes:**
- Separate component that uses Button internally
- Dropdown menu styled like Mac OS 9 menus
- Arrow indicator for dropdown portion
- Keyboard navigation (arrow keys to open/navigate)

---

### 6. Loading Progress Indicator

**Description**: Show determinate progress during loading.

**Props:**
```typescript
loadingProgress?: number; // 0-100
showProgressBar?: boolean;
```

**Example:**
```tsx
<Button loading loadingProgress={45} showProgressBar>
  Uploading...
</Button>
```

**Implementation Notes:**
- Small progress bar below button text
- Mac OS 9 style barber pole effect?
- Or simple filled bar indicator
- Update `aria-valuenow`, `aria-valuemin`, `aria-valuemax`

---

### 7. Haptic Feedback (Mobile)

**Description**: Vibration feedback on button press for mobile devices.

**Props:**
```typescript
haptic?: boolean | 'light' | 'medium' | 'heavy';
```

**Example:**
```tsx
<Button haptic="medium" onClick={handleSubmit}>
  Submit
</Button>
```

**Implementation Notes:**
- Use Vibration API where available
- Gracefully degrade where not supported
- Respect `prefers-reduced-motion`
- Consider accessibility preferences

---

### 8. Sound Effects

**Description**: Mac OS 9 style button click sounds.

**Props:**
```typescript
soundEffect?: boolean | 'click' | 'beep' | 'pop';
soundVolume?: number; // 0-1
```

**Example:**
```tsx
<Button soundEffect="click">
  Classic Click
</Button>
```

**Implementation Notes:**
- Authentic Mac OS 9 system sounds
- Respect user preferences (mute option)
- Use Web Audio API
- Provide sound files or data URIs
- Accessibility: don't rely on sound alone for feedback

---

### 9. Ripple/Press Animation

**Description**: Optional modern touch feedback (non-Mac OS 9).

**Props:**
```typescript
ripple?: boolean;
rippleColor?: string;
```

**Example:**
```tsx
<Button ripple rippleColor="rgba(255,255,255,0.3)">
  Modern Feel
</Button>
```

**Implementation Notes:**
- Material Design style ripple effect
- Opt-in only (not Mac OS 9 authentic)
- CSS-based animation
- Respect `prefers-reduced-motion`

---

### 10. Confirmation Dialog

**Description**: Built-in confirmation before action executes.

**Props:**
```typescript
confirmAction?: boolean | {
  title?: string;
  message?: string;
  confirmText?: string;
  cancelText?: string;
};
```

**Example:**
```tsx
<Button 
  variant="danger"
  confirmAction={{
    title: "Delete File",
    message: "Are you sure? This cannot be undone.",
    confirmText: "Delete",
    cancelText: "Cancel"
  }}
  onClick={handleDelete}
>
  Delete
</Button>
```

**Implementation Notes:**
- Show Mac OS 9 style alert dialog
- preventDefault onClick until confirmed
- Use Dialog component when implemented
- Keyboard support (Enter/Escape)

---

## Implementation Priority

### Phase 1 (Next Release)
1. Tooltip Support
2. Badge/Notification Indicators
3. Keyboard Shortcut Hints

### Phase 2 (Future)
4. Button Groups
5. Split Buttons
6. Loading Progress Indicator

### Phase 3 (Nice to Have)
7. Haptic Feedback
8. Sound Effects
9. Ripple Animation
10. Confirmation Dialog

---

## Notes

- All features should maintain Mac OS 9 aesthetic
- Accessibility must be built-in from the start
- Features should be opt-in (props) not default behavior
- Consider bundle size impact - keep features modular
- Document all features with Storybook examples
- Test keyboard and screen reader support

---

## Contributing

If you'd like to contribute any of these features:
1. Open an issue first to discuss the approach
2. Follow the established component patterns
3. Include comprehensive tests
4. Add Storybook stories
5. Update documentation

---

**Last Updated**: 2026-01-08