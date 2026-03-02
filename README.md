# 🌷 March Celebration - Web Programming 2 GLO #1

<div align="center">

[![TypeScript](https://img.shields.io/badge/TypeScript-5.9.3-3178C6?style=flat-square&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Bun](https://img.shields.io/badge/Bun-1.3.10-000000?style=flat-square&logo=bun&logoColor=white)](https://bun.sh/)
[![ElysiaJS](https://img.shields.io/badge/ElysiaJS-1.4.27-FF6B6B?style=flat-square)](https://elysiajs.com/)
[![License](https://img.shields.io/badge/License-MIT-blue?style=flat-square)](https://choosealicense.com/licenses/mit/)

**A modern web application celebrating the joys of March with holidays, activities, and safety tips.**

[Features](#-features) • [Screenshots](#-screenshots) • [Installation](#-installation) • [Usage](#-usage) • [Architecture](#-architecture)

</div>

---

## 📖 Overview

This project is a **March Celebration Website** developed as part of **CISY 7203 - Graded Learning Opportunity #1**. It showcases modern web development practices with server-side rendering, type-safe TypeScript, and interactive hypermedia-driven UI.

The application provides a comprehensive platform to explore March holidays, plan activities, discover safety tips, and personalize your March celebration experience.

### 🎯 Assignment Requirements Fulfilled

| Requirement | Implementation |
|-------------|----------------|
| ✅ Website Structure | Multiple pages with navigation, images, text, tables, headings |
| ✅ CSS Formatting | Inline, internal, external styles; backgrounds, margins, floats, borders, fonts |
| ✅ JavaScript Interactivity | Form validation, dynamic updates, input management |
| ✅ Data Binding (Profile) | SQLite database with profile table and form interface |
| ✅ Data Binding (Holidays) | 12+ March holidays with full CRUD operations |
| ✅ Data Binding (Tips) | 10 safety tips categorized by type |
| ✅ Mobile Accessibility | Responsive design, mobile-friendly navigation |
| ✅ 10+ Data Records | 42 total records across all tables |

---

## ✨ Features

### 🏠 Home Page
- Beautiful hero section with parallax background
- Introduction to March celebrations
- Image gallery with GLightbox integration

### 📅 Holidays Management
- View all March holidays and events
- Add, edit, and delete holidays
- Filter by holiday type (Cultural, Global, Fun, Religious, etc.)
- Pin important holidays to top

### 🗺️ My Journey (Profile)
- Personalize your March celebration preferences
- Set your favorite activities, traditions, and mood
- Track your spring celebration level
- Form validation with real-time feedback

### 📋 My Plans
- Create and manage March activity plans
- Mark activities as completed
- Pin important plans with gold highlight
- Track progress through the month

### 💡 Safety Tips
- Categorized tips (Weather, Health, Outdoor, Safety)
- Guidance for safe March celebrations
- Mobile-friendly tip cards

### ⚙️ Settings
- Dark/Light mode toggle
- Customizable preferences
- Accessible design options

---

## 📸 Screenshots

### Home Page
![Home Page](./screenshots/homepage.png)
*The welcoming home page featuring a hero section with spring daffodils and navigation to all features.*

### Holidays Page
![Holidays Page](./screenshots/holidays.png)
*Browse and manage March holidays with filtering and sorting capabilities.*

### My Journey (Profile)
![Profile Page](./screenshots/profile.png)
*Personalize your March celebration experience with custom preferences.*

### My Plans
![Plans Page](./screenshots/plans.png)
*Track your March activities with completion status and pinning features.*

### Dark Mode
![Dark Mode](./screenshots/dark-mode.png)
*Full dark mode support with carefully crafted color scheme for optimal readability.*

---

## 🛠️ Technology Stack

### Core Technologies

| Technology | Version | Purpose |
|------------|---------|---------|
| [TypeScript](https://www.typescriptlang.org/) | 5.9.3 | Type-safe JavaScript development |
| [Bun](https://bun.sh/) | 1.3.10 | JavaScript runtime & package manager |
| [ElysiaJS](https://elysiajs.com/) | 1.4.27 | High-performance web framework |
| [SQLite](https://www.sqlite.org/) | Built-in | Lightweight database (via Bun) |

### Frontend

| Library | Version | Purpose |
|---------|---------|---------|
| [HTMX](https://htmx.org/) | 2.0.8 | Hypermedia-driven dynamic UI |
| [GLightbox](https://biati-digital.github.io/glightbox/) | 3.3.1 | Image lightbox gallery |
| [Lucide](https://lucide.dev/) | 0.575.0 | Beautiful icon library |

### Development Tools

| Tool | Version | Purpose |
|------|---------|---------|
| [ESLint](https://eslint.org/) | 10.0.2 | Code linting |
| [Prettier](https://prettier.io/) | Latest | Code formatting |
| [TypeDoc](https://typedoc.org/) | Latest | API documentation generation |
| [Vite](https://vitejs.dev/) | 5.4.21 | Build tooling |

---

## 📦 Installation

### Prerequisites

- [Bun](https://bun.sh/) >= 1.0.0
- Git

### Quick Start

```bash
# Clone the repository
git clone https://github.com/Mystery2099/Web-Programming-2-GLO-1.git
cd Web-Programming-2-GLO-1

# Install dependencies
bun install

# Start the development server
bun run dev
```

The application will be available at `http://localhost:3000` (or the configured port).

---

## 🚀 Usage

### Available Scripts

```bash
# Start development server
bun run dev

# Run ESLint
bun run lint

# Fix ESLint issues
bun run lint:fix

# Format code with Prettier
bun run format

# Generate TypeDoc documentation
bun run docs

# Serve TypeDoc documentation
bun run docs:serve
```

### Database

The application uses SQLite with automatic schema creation and seeding. On first run:

1. Database tables are created automatically
2. Seed data is inserted (holidays, tips, profile, plans)

**Database Tables:**

| Table | Records | Description |
|-------|---------|-------------|
| `holidays` | 12 | March holidays and events |
| `plans` | 12 | Pre-defined March activities |
| `tips` | 10 | Safety and celebration tips |
| `profile` | 1 | User preferences |

---

## 🏗️ Architecture

This project follows **Clean Architecture** principles with clear separation of concerns:

```
src/
├── config/              # Configuration & DI Container
│   ├── constants.ts     # Application constants
│   └── di-container.ts  # Dependency injection setup
├── controllers/         # HTTP request handlers
│   ├── holiday-controller.ts
│   ├── plan-controller.ts
│   ├── profile-controller.ts
│   └── tip-controller.ts
├── db/                  # Database layer
│   ├── index.ts         # Database connection
│   ├── schema.ts        # Table definitions
│   └── seeds.ts         # Initial data
├── domain/ports/        # Repository interfaces
│   ├── holiday-repository.ts
│   ├── plan-repository.ts
│   ├── profile-repository.ts
│   └── tip-repository.ts
├── repositories/        # Data access implementations
│   ├── holiday.ts
│   ├── plan.ts
│   ├── profile.ts
│   └── tip.ts
├── routes/              # API route definitions
│   ├── holidays-routes.ts
│   ├── plans-routes.ts
│   ├── profile-routes.ts
│   └── tips-routes.ts
├── server/              # Server entry point
│   └── index.ts
├── services/            # Business services
│   └── validation.ts
├── static/              # Static assets
│   ├── client.js        # Client-side JavaScript
│   ├── glightbox.css
│   └── images/          # Image assets
├── templates/           # JSX templates
│   ├── header.tsx
│   ├── footer.tsx
│   ├── layout.tsx
│   ├── styles.ts        # CSS design system
│   └── pages/           # Page templates
├── types/               # TypeScript definitions
│   ├── controller.ts
│   ├── database.ts
│   ├── server.ts
│   └── templates.ts
├── use-cases/           # Business logic
│   ├── holiday-use-cases.ts
│   ├── plan-use-cases.ts
│   ├── profile-use-cases.ts
│   └── tip-use-cases.ts
└── utils/               # Utility functions
    ├── http-helpers.ts
    └── validation.ts
```

### Design Patterns Used

- **Repository Pattern**: Data access abstraction
- **Dependency Injection**: Loose coupling between components
- **MVC Architecture**: Clear separation of concerns
- **Server-Side Rendering**: JSX templates rendered on the server
- **Hypermedia-Driven UI**: HTMX for dynamic interactions

---

## 🎨 Design System

### Color Palette

#### Light Mode
| Color | Hex | Usage |
|-------|-----|-------|
| Primary (Terracotta) | `#A95A38` | Buttons, accents |
| Secondary (Sage) | `#5B7E68` | Secondary buttons |
| Background | `#FAF7F2` | Page background |
| Nav Background | `#1A3A4D` | Sidebar |
| Gold | `#FFD700` | Highlights |

#### Dark Mode
| Color | Hex | Usage |
|-------|-----|-------|
| Primary | `#D98068` | Buttons, accents |
| Background | `#0D1B2A` | Page background |
| Nav Background | `#08151D` | Sidebar |
| Card Background | `#1A2633` | Cards |

### Typography

- **Headings**: Playfair Display (serif)
- **Body**: DM Sans (sans-serif)
- **Code**: DejaVu Sans Mono

---

## 🌐 API Endpoints

### Holidays

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/holidays` | List all holidays |
| POST | `/holidays` | Create new holiday |
| PUT | `/holidays/:id` | Update holiday |
| DELETE | `/holidays/:id` | Delete holiday |

### Plans

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/plans` | List all plans |
| POST | `/plans` | Create new plan |
| PUT | `/plans/:id/toggle` | Toggle completion |
| DELETE | `/plans/:id` | Delete plan |

### Profile

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/profile` | Get user profile |
| PUT | `/profile` | Update profile |

### Tips

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/tips` | List all tips |

---

## 🔒 Accessibility

This application follows **WCAG 2.1 AA** guidelines:

- ✅ Semantic HTML structure
- ✅ ARIA labels for interactive elements
- ✅ Keyboard navigation support
- ✅ High contrast color ratios
- ✅ Screen reader compatible
- ✅ Responsive design for all devices
- ✅ Focus indicators for all interactive elements

---

## 📝 Data Seeded

### March Holidays (12 records)

| Holiday | Date | Type |
|---------|------|------|
| St. David's Day | March 1 | Cultural |
| International Women's Day | March 8 | Global |
| Pi Day | March 14 | Fun |
| St. Patrick's Day | March 17 | Cultural |
| First Day of Spring | March 19 | Astronomical |
| World Forestry Day | March 21 | Environmental |
| World Water Day | March 22 | Environmental |
| International Day for Elimination of Racial Discrimination | March 21 | Global |
| National Cookie Day | March 24 | Fun |
| National Single Parent Day | March 26 | Awareness |
| World Theatre Day | March 27 | Cultural |
| Easter Sunday | March 31 | Religious |

### Safety Tips (10 records)

Categories: Weather, Health, Outdoor, Safety

---

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

Copyright (c) 2026 Mathew Kennedy-Brewer

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

---

## 👤 Author

**Mathew Kennedy-Brewer** ([@Mystery2099](https://github.com/Mystery2099))

---

<div align="center">

**Made with ❤️ for CISY 7203 - Web Programming 2**

</div>
