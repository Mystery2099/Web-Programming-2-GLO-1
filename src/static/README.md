Static Assets

This directory contains all static assets for the March Celebration Hub.

Directory Structure
==================

css/
  Main stylesheet and CSS modules
  - main.css       - Main entry point, imports other CSS files
  - variables.css  - CSS custom properties (light/dark themes)
  - glightbox.css  - Lightbox library styles

js/
  Client-side JavaScript
  - client.js          - Shared app bootstrap (theme, sidebar, toast lifecycle, preferences)
  - pages/             - Page-specific behavior modules
    - add-holiday-page.js
    - holidays-page.js
    - plans-page.js
    - settings-page.js
  - glightbox.min.js   - Lightbox library (minified)

images/
  Organized image assets by purpose
  - favicon/    - Site favicon and source files
  - spring/     - Spring-themed profile portraits
  - wallpapers/  - Hero section wallpapers

Naming Conventions
=================

CSS Files
- Use kebab-case: main.css, variables.css
- Name files by purpose, not by technology

JavaScript Files
- Use kebab-case: client.js
- Put page-specific behavior in js/pages/
- Keep client.js focused on shared app initialization
- Keep minified libraries separate

Images
- Organize by use case (not by file type)
- Use descriptive, purpose-based names
- Keep source files alongside compiled assets

Adding New Assets
=================

1. CSS files → css/
2. JavaScript files → js/
   - Page-only behavior → js/pages/
3. Images → images/[category]/
   - Create new category if needed
   - Use existing categories when appropriate

Updating References
==================

When adding or moving static assets, update:
- Template files (src/templates/**/*.tsx)
- Main CSS file (src/static/css/main.css)
- Head component (src/templates/head.tsx)
- Layout script includes (src/templates/layout.tsx)

Performance Notes
================

- Images are served via Elysia static plugin
- CSS is loaded once and cached by browser
- Page JS modules are loaded once and initialized by client.js
- Use appropriate image formats (WebP for photos, PNG for graphics)
