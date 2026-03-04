# March Celebration Hub

March Celebration Hub is a Bun + Elysia + HTMX web application built for **CISY 7203 GLO #1**.
It presents March holidays, personal planning tools, safety tips, and profile customization in a single themed product.

Repository: https://github.com/Mystery2099/Web-Programming-2-GLO-1

## Stack

- TypeScript
- Bun
- Elysia
- SQLite (`bun:sqlite`)
- HTMX
- Lucide icons
- localForage (client preference persistence)

## Architecture (How It Works)

Core request flow:

`route -> controller -> use-case -> repository -> template`

Responsibilities:

- `routes/`: HTTP endpoints, query/body extraction, redirect decisions.
- `controllers/`: transport orchestration (full page vs partial fragment).
- `use-cases/`: business rules, validation coordination, domain decisions.
- `repositories/`: parameterized SQL data access.
- `templates/`: server-rendered JSX UI output.

## Why Key Decisions Were Made

- **URL-based toasts for redirect flows** (Holidays/Profile): keeps success/error state shareable and refresh-safe.
- **HTMX OOB toasts for in-place plans actions**: updates list and feedback area in one response without full reload.
- **localForage + cookie bootstrapping**: cookie sets initial paint theme/sidebar, localForage stores longer-term preferences.
- **Page-specific JS modules** (`src/static/js/pages/*`): keeps templates declarative and reduces large inline scripts.

## Current Features

### Home
- Hero section with spring wallpaper
- Intro cards and navigation to all sections

### Holidays
- Data-backed holidays table (seeded with 12 records)
- Search + type filtering
- Pagination with URL sync (`hx-push-url`)
- Adjustable `itemsPerPage`
- Add holiday with validation
- Delete holiday with confirmation + URL success toast

### My Journey (Profile)
- Profile display and dedicated edit page (`/profile/edit`)
- URL-based success/error messaging
- Server-side validation and persistence

### My Plans
- Add, delete, complete/incomplete, pin/unpin
- Live "Plan Snapshot" panel (total/completed/pinned/rate)
- Success/error feedback via toasts

### Tips
- Data-backed tip cards (seeded with 10 records)
- Search interactions and focus panel

### Settings
- Theme toggle (light/dark)
- Text size slider (applies on release)
- Animation toggle
- Reset preferences

## Screenshots

![Home (Light)](./screenshots/home-light.png)
![Holidays (URL Sync)](./screenshots/holidays-url-sync.png)
![Add Holiday (Validation)](./screenshots/add-holiday-validation.png)
![Plans (Snapshot)](./screenshots/plans-snapshot.png)
![Plans (Error Toast)](./screenshots/plans-error-toast.png)
![Profile Display](./screenshots/profile-display.png)
![Profile Edit](./screenshots/profile-edit.png)
![Tips](./screenshots/tips.png)
![Settings](./screenshots/settings.png)

## CISY Requirement Mapping

### 1) Site structure, CSS, JavaScript interaction
- Multi-page structure + navigation + index entry:
  - `src/templates/layout.tsx`
  - `src/templates/header.tsx`
  - `src/routes/index.ts`
- HTML structural elements (tables/headings/forms/images):
  - `src/templates/pages/holidays.tsx`
  - `src/templates/pages/home.tsx`
  - `src/templates/pages/profile-edit.tsx`
- CSS requirements (inline/internal/external, backgrounds/margins/floats/borders/fonts):
  - External: `src/static/css/main.css` (+ modular files)
  - Internal: `src/templates/pages/home.tsx` (embedded style section)
  - Inline: `src/templates/pages/plans.tsx` (`style=width:...` progress)
  - Float example: `src/static/css/components/table.css`
- JavaScript interactivity (validation/input handling/formatting changes):
  - `src/static/js/client.js`
  - `src/static/js/pages/add-holiday-page.js`
  - `src/static/js/pages/settings-page.js`
  - `src/static/js/pages/plans-page.js`

### 2) Data binding for profile/holidays/plans/tips (10+ records)
- Schema + seed data:
  - `src/db/schema.ts`
  - `src/db/seeds.ts`
- Data-backed pages:
  - `src/controllers/*.ts`
  - `src/repositories/*.ts`
  - `src/templates/pages/*.tsx`
- Seed counts:
  - holidays: 12
  - tips: 10
  - plans: 12
  - profile: 1

### 3) Design/accessibility/mobile
- Responsive layout and page modules:
  - `src/static/css/layout/*.css`
  - `src/static/css/pages/*.css`
- Accessibility helpers and semantic labels:
  - `src/static/css/base/accessibility.css`
  - `src/templates/pages/*.tsx` (labels, ARIA attributes)

## Project Structure

```text
src/
  config/
  controllers/
  db/
  domain/ports/
  repositories/
  routes/
  schemas/
  server/
  services/
  static/
    css/
    js/
      client.js
      pages/
        add-holiday-page.js
        holidays-page.js
        plans-page.js
        settings-page.js
  templates/
    components/
    pages/
  types/
  use-cases/
  utils/
```

## Scripts

```bash
bun run dev       # run server
bun run check     # typecheck + lint
bun run typecheck
bun run lint
bun run lint:fix
bun run format
bun run docs      # generate markdown API docs into ./docs/api
bun run docs:serve
```

## Documentation

- API docs are generated in Markdown using TypeDoc + `typedoc-plugin-markdown`.
- Config: `typedoc.json`
- Output: `docs/api/`

## Notes for Contributors

- Keep template files mostly declarative; page behavior should live in `src/static/js/pages/`.
- Keep page styles in `src/static/css/pages/` and import through `src/static/css/main.css`.
- Prefer URL state for filters/pagination where it improves shareability and consistency.
