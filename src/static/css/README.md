# CSS Architecture

This project uses a modular CSS architecture based on BEM naming conventions and organized by concern.

## Directory Structure

```
css/
├── variables.css        # CSS custom properties (colors, spacing, etc.)
├── main.css            # Main entry point - imports all modules
├── glightbox.css       # Third-party library (keep as-is)
│
├── base/               # Foundation styles
│   ├── base.css        # Base element defaults and shared layout primitives
│   ├── typography.css  # Headings, paragraphs, text styles
│   ├── accessibility.css # A11y helpers, skip links, focus states
│   └── animations.css  # Keyframes and animation utilities
│
├── layout/             # Structural components
│   ├── app.css         # Main app container, page structure
│   ├── sidebar.css     # Navigation sidebar
│   └── footer.css      # Site footer
│
├── components/         # Reusable UI components
│   ├── button.css      # Buttons and variants
│   ├── card.css        # Card components
│   ├── form.css        # Form inputs, labels, groups
│   ├── modal.css       # Modal dialogs
│   ├── table.css       # Data tables
│   ├── search.css      # Search inputs and filters
│   ├── toggle.css      # Toggle switches
│   ├── range-slider.css # Range input sliders
│   ├── toast.css       # Toast notifications
│   ├── stats.css       # Statistics cards
│   ├── empty-state.css # Empty state placeholders
│   ├── dark-mode-toggle.css # Theme toggle button
│   └── images.css      # Image components (avatars, etc.)
│
├── pages/              # Page-specific styles
│   ├── home.css        # Home page sections
│   ├── holidays.css    # Holidays page layout and toolbar
│   ├── add-holiday.css # Add Holiday form page
│   ├── plans.css       # Plans page + snapshot panel
│   ├── profile.css     # Profile page
│   ├── settings.css    # Settings page
│   ├── tips.css        # Tips page
│   └── error.css       # Error pages
│
```

## Naming Convention (BEM)

We use BEM (Block Element Modifier) naming:

```css
.block { }           /* Component name */
.block__element { }  /* Part of component */
.block--modifier { } /* Variant of component */
```

### Examples

```css
/* Block */
.card { }

/* Element */
.card__header { }
.card__title { }
.card__content { }

/* Modifier */
.card--elevated { }
.card--flat { }
```

## CSS Variables

All design tokens are defined in `variables.css`:

```css
:root {
  --primary: #A95A38;
  --secondary: #8B4513;
  --accent: #D9A753;
  --bg: #F5F1ED;
  --text: #2D2D2D;
  --surface: #FFFFFF;
  --border: rgba(169, 90, 56, 0.2);
  --shadow-md: 0 4px 16px rgba(169, 90, 56, 0.12);
}
```

## Import Order

Files are imported in this order in `main.css`:

1. **Base** - Normalize, base, typography, accessibility, animations
2. **Layout** - App structure, navigation, footer
3. **Components** - Reusable UI elements
4. **Pages** - Page-specific overrides

## Current Direction

- Keep page-specific styling out of inline `<style>` blocks in templates.
- Add or update page styles under `pages/*.css` and import in `main.css`.
- Keep reusable styles in `components/*.css` to avoid duplication.
- Utility helpers are intentionally omitted unless they provide clear reuse value.

## Adding New Styles

### New Component
1. Create `src/static/css/components/my-component.css`
2. Use BEM naming
3. Import in `main.css` under components section

### New Page
1. Create `src/static/css/pages/my-page.css`
2. Import in `main.css` under pages section

### New Variable
1. Add to `variables.css` under appropriate category
2. Use semantic naming: `--color-primary` not `--color-brown`

## Best Practices

1. **Specificity**: Keep selectors flat. Avoid deep nesting.
2. **Variables**: Use CSS variables for repeated values.
3. **Responsive**: Mobile-first media queries in component files.
4. **Dark Mode**: Use `body.dark` class selector for overrides.
5. **No `!important`**: Unless absolutely necessary for utilities.

## File Size Reference

| File | Lines | Purpose |
|------|-------|---------|
| variables.css | ~170 | Design tokens |
| main.css | ~50 | Imports only |
| base/*.css | foundation | Typography, motion, accessibility |
| layout/*.css | structure | App shell, sidebar, footer |
| components/*.css | shared UI | Buttons, forms, tables, toasts, etc. |
| pages/*.css | page-specific | Home, holidays, plans, profile, tips, settings, errors |
