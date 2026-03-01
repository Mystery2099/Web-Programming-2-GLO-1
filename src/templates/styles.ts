export const escapeHtml = (str: string | null | undefined): string =>
	str?.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;') ?? '';

export const styles = `
  /* ========================================
     MARCH CELEBRATION - DESIGN SYSTEM
     ========================================
     
     Overview:
     - Celebratory, warm aesthetic with March theme
     - Supports both light and dark modes
     - WCAG 2.1 AA compliant for accessibility
     - Uses CSS custom properties (variables) for theming
     
     Color Philosophy:
     - Warm earth tones (terracotta, sage, gold)
     - Soft cream backgrounds in light mode
     - Deep navy backgrounds in dark mode
     - High contrast for readability
     
     Typography:
     - Playfair Display (serif) for headings
     - DM Sans (sans-serif) for body text
     
     ======================================== */

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  .sr-only {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    white-space: nowrap;
    border-width: 0;
  }

  .htmx-indicator-block {
    display: block;
    padding: 2rem;
  }

  /* ========================================
     COLOR PALETTE - CSS CUSTOM PROPERTIES
     ======================================== */

  :root {
    /* Brand Colors - Core identity */
    --primary: #A95A38;           /* Terracotta - Main brand color */
    --primary-dark: #995028;       /* Darker terracotta - Gradients */
    --secondary: #5B7E68;          /* Sage green - Accent */
    --secondary-dark: #4B7E5B;     /* Darker sage - Gradients */
    --accent: #945A2A;            /* Light terracotta - Secondary accent */
    --gold: #FFD700;              /* Gold - Highlights (light mode only) */
    --gold-dark: #7E5100;         /* Dark gold - Gold text/btns (light mode) */

    /* Neutral Colors - Backgrounds & Text */
    --bg: #FAF7F2;                /* Cream - Main background */
    --bg-cream: #FFF8F6;          /* Light cream - Card tint */
    --bg-tan: #F0EBE3;           /* Light tan - Row tint */
    --text: #1A3A4D;              /* Deep navy - Primary text */
    --text-muted: #5A5A5A;        /* Dark gray - Secondary text */

    /* Card Colors */
    --card-bg: #ffffff;            /* White - Card background */
    --card-border: #5C4033;       /* Brown - Card border */
    --card-date: var(--text-muted); /* Dark gray - Date labels */

    /* Navigation Colors */
    --nav-bg: #1A3A4D;           /* Deep navy - Nav background */
    --nav-text: #FAF7F2;          /* Cream - Nav text */
    --nav-active: #C97A58;        /* Terracotta - Active nav item */
    --nav-hover: #2A4A5D;         /* Medium navy - Nav hover */

    /* UI Element Colors */
    --border: #6A6660;            /* Dark gray - Input borders */
    --toggle-off: #6A6660;        /* Dark gray - Toggle switch off */
    --danger: #A80F1A;            /* Dark red - Danger state */
    --danger-dark: #900D16;        /* Darker red - Danger gradients */

    /* Shadow & Glow Colors */
    --shadow-sm: rgba(0, 0, 0, 0.06);   /* Small shadows */
    --shadow-md: rgba(0, 0, 0, 0.1);    /* Medium shadows */
    --shadow-lg: rgba(0, 0, 0, 0.15);   /* Large shadows */
    --shadow-overlay: rgba(0, 0, 0, 0.5); /* Overlay */
    --shadow-nav: rgba(0, 0, 0, 0.3);   /* Navigation shadow */
    --shadow-text: rgba(0, 0, 0, 0.3);   /* Text shadow */

    /* Brand Glow - Semi-transparent brand colors */
    --brand-glow: rgba(201, 122, 88, 0.3);      /* Primary glow */
    --brand-glow-hover: rgba(201, 122, 88, 0.4); /* Hover glow */
    --brand-focus: rgba(201, 122, 88, 0.2);     /* Focus ring */

    /* Hero Overlay Colors */
    --hero-overlay-start: rgba(201, 122, 88, 0.85);  /* Top of hero */
    --hero-overlay-end: rgba(212, 154, 106, 0.75);    /* Bottom of hero */

    /* Pin/Highlight Colors */
    --pin-glow-light: rgba(126, 81, 0, 0.3);    /* Light mode pin */
    --pin-glow: rgba(126, 81, 0, 0.5);          /* Light mode pin hover */
    --pin-highlight-start: rgba(126, 81, 0, 0.2); /* Table highlight start */
    --pin-highlight-end: rgba(110, 71, 0, 0.15);    /* Table highlight end */
    --pin-pulse-light: rgba(126, 81, 0, 0.3);   /* Light mode pulse mid */
    --pin-pulse-light-end: rgba(110, 71, 0, 0.25); /* Light mode pulse end */

    /* Secondary Button Shadows */
    --secondary-glow: rgba(123, 158, 135, 0.3); /* Secondary button hover */

    /* Danger Button Shadows */
    --danger-glow: rgba(230, 57, 70, 0.4);    /* Danger button hover */

    /* March Goals Shadows */
    --goals-shadow: rgba(201, 122, 88, 0.1);   /* March goals shadow */

    /* March Goals Colors */
    --goals-bg-start: #FFF5F0;                 /* March goals gradient start */
    --goals-bg-end: #FFE8E0;                   /* March goals gradient end */
    --goals-border: rgba(201, 122, 88, 0.2);   /* March goals border */

    /* Gold Glow Effects */
    --gold-glow: rgba(255, 215, 0, 0.3);       /* Gold button glow */
    --gold-hover-light: #8E5B00;              /* Gold hover (light end) */
    --gold-hover-dark: #D8A250;                /* Gold hover (dark mode) */

    /* Border Subtles */
    --border-subtle: rgba(0, 0, 0, 0.05);      /* Subtle borders */

    /* White Overlay for Tables */
    --table-header-hover: rgba(255, 255, 255, 0.1); /* Table header hover */

    /* Functional Variables */
    --text-size: 16px;            /* Base font size */
    --card-delay: 0s;             /* Animation delay for cards */

    /* Color Aliases for Common Use */
    --white: #ffffff;
    --black: #000000;
  }

  /* ========================================
     DARK MODE THEME OVERRIDES
     ========================================
     
     Dark mode uses deeper, richer colors
     with lighter text for contrast.
     All brand colors adjusted for readability.
  */

  body.dark {
    /* Neutral Colors - Darker backgrounds, lighter text */
    --bg: #0D1B2A;                /* Very dark navy - Main background */
    --bg-cream: #151210;           /* Very dark - Card tint */
    --bg-tan: #1C2A38;            /* Dark navy - Row tint */
    --text: #E8E8E8;              /* Off-white - Primary text */
    --text-muted: #BBBBBB;         /* Light gray - Secondary text */

    /* Card Colors - Adjusted for dark mode */
    --card-bg: #1A2633;           /* Dark navy - Card background */
    --card-border: #D8B4A5;       /* Light pink - Card border */
    --card-date: #9B9B9B;         /* Light gray - Date labels */

    /* Navigation Colors */
    --nav-bg: #08151D;            /* Very dark navy - Nav background */

    /* Brand Colors - Lighter for dark backgrounds */
    --primary: #D98068;           /* Lighter terracotta */
    --primary-dark: #C97058;       /* Gradient end */
    --gold-dark: #C89240;          /* Lighter gold - Dark mode gold */
    --danger: #F86F78;             /* Lighter red - Dark mode danger */
    --danger-dark: #E84F58;        /* Lighter red - Gradient end */

    /* UI Element Colors - Lighter for contrast */
    --border: #A0A0A0;            /* Light gray - Input borders */
    --toggle-off: #A0A0A0;        /* Light gray - Toggle switch off */

    /* Shadow & Glow Colors - Adjusted for dark mode */
    --brand-glow: rgba(232, 196, 181, 0.4);     /* Warmer glow */
    --brand-glow-hover: rgba(232, 196, 181, 0.5); /* Hover glow */
    --shadow-sm: rgba(0, 0, 0, 0.1);            /* Darker small shadows */
    --shadow-md: rgba(0, 0, 0, 0.2);           /* Darker medium shadows */

    /* Hero Overlay - Dark mode adjustment */
    --hero-overlay-start: rgba(217, 128, 104, 0.85);
    --hero-overlay-end: rgba(232, 196, 181, 0.75);

    /* Pin/Highlight Colors - Dark mode */
    --pin-glow-light: rgba(200, 146, 64, 0.3);  /* Dark mode pin */
    --pin-glow: rgba(200, 146, 64, 0.5);        /* Dark mode pin hover */
    --pin-highlight-start: rgba(200, 146, 64, 0.2); /* Table highlight start */
    --pin-highlight-end: rgba(180, 126, 44, 0.15);    /* Table highlight end */
    --pin-pulse-light: rgba(200, 146, 64, 0.3);   /* Dark mode pulse mid */
    --pin-pulse-light-end: rgba(180, 126, 44, 0.25); /* Dark mode pulse end */
  }

  /* ========================================
     FONTS
     ======================================== */

  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600;700&family=DM+Sans:wght@400;500;600;700&display=swap');

  body {
    font-family: 'DM Sans', 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    background: var(--bg);
    color: var(--text);
    line-height: 1.7;
    transition: all 0.3s ease;
  }

  /* ========================================
     LAYOUT - SIDEBAR & NAVIGATION
     ======================================== */

  .app-container {
    display: flex;
    min-height: 100vh;
  }

  .sidebar {
    width: 280px;
    background: var(--nav-bg);
    color: var(--nav-text);
    padding: 2rem 1.5rem;
    position: fixed;
    left: 0;
    top: 0;
    height: 100vh;
    overflow-y: auto;
    transition: transform 0.3s ease;
    z-index: 100;
  }

  .sidebar-logo {
    font-family: 'Playfair Display', serif;
    font-size: 1.8rem;
    font-weight: 700;
    margin-bottom: 3rem;
    display: flex;
    align-items: center;
    gap: 0.75rem;
    color: var(--gold-dark);
  }

  .sidebar-logo i {
    font-size: 1.5rem;
    transition: transform 0.3s ease;
  }

  .sidebar-logo:hover i {
    transform: rotate(10deg) scale(1.1);
  }

  .nav-links {
    list-style: none;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }

  .nav-link {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    color: var(--nav-text);
    text-decoration: none;
    padding: 0.875rem 1rem;
    border-radius: 12px;
    transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
    font-weight: 500;
    position: relative;
    overflow: hidden;
  }

  .nav-link:focus-visible {
    outline: 3px solid var(--nav-active);
    outline-offset: 2px;
  }

  .nav-link::before {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    width: 4px;
    background: var(--nav-active);
    transform: scaleY(0);
    transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1);
  }

  .nav-link:hover {
    background: var(--nav-hover);
    transform: translateX(6px);
  }

  .nav-link:active {
    transform: translateX(4px);
  }

  .nav-link.active {
    background: var(--nav-active);
    color: var(--white);
    font-weight: 600;
  }

  .nav-link.active::before {
    transform: scaleY(1);
  }

  .nav-link i {
    width: 20px;
    height: 20px;
  }

  .main-content {
    flex: 1;
    margin-left: 280px;
    padding: 2rem 3rem;
    min-height: 100vh;
  }

  .mobile-nav-toggle {
    display: none;
    position: fixed;
    top: 1rem;
    right: 1rem;
    z-index: 101;
    background: var(--nav-bg);
    color: var(--white);
    border: none;
    padding: 0.75rem;
    border-radius: 8px;
    cursor: pointer;
    transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
  }

  .mobile-nav-toggle:hover {
    transform: scale(1.1);
    box-shadow: 0 4px 12px var(--shadow-nav);
  }

  .mobile-nav-toggle i {
    transition: transform 0.3s ease;
  }

  .mobile-nav-toggle.open i {
    transform: rotate(90deg);
  }

  .sidebar-overlay {
    display: none;
    position: fixed;
    inset: 0;
    background: var(--shadow-overlay);
    z-index: 99;
  }

  /* ========================================
     PAGE TRANSITIONS
     ======================================== */

  .page {
    animation: pageEnter 0.6s cubic-bezier(0.16, 1, 0.3, 1);
  }

  @keyframes pageEnter {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  /* ========================================
     TYPOGRAPHY
     ======================================== */

  h1, h2, h3 {
    font-family: 'Playfair Display', serif;
    color: var(--text);
    margin-bottom: 1rem;
    line-height: 1.3;
  }

  h1 {
    font-size: 3rem;
    font-weight: 600;
    letter-spacing: -0.02em;
  }

  h2 {
    font-size: 2rem;
    font-weight: 500;
  }

  p {
    margin-bottom: 1rem;
    font-size: var(--text-size, 16px);
  }

  /* ========================================
     HERO SECTION
     ======================================== */

  .hero-parallax {
    position: relative;
    height: 60vh;
    min-height: 400px;
    overflow: hidden;
    border-radius: 20px;
    margin-bottom: 2rem;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .hero-parallax::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(135deg, var(--hero-overlay-start), var(--hero-overlay-end));
    z-index: 1;
  }

  .hero-parallax-bg {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-image: url('/static/images/daffodils_wallpaper_gpt.png');
    background-size: cover;
    background-position: center;
    background-attachment: fixed;
    transform: scale(1.1);
  }

  .hero-content {
    position: relative;
    z-index: 2;
    text-align: center;
    color: var(--white);
    padding: 0 2rem;
    max-width: 800px;
  }

  .hero-content h1 {
    font-size: 3.5rem;
    margin-bottom: 1.5rem;
    text-shadow: 2px 2px 8px var(--shadow-text);
    font-family: 'Playfair Display', serif;
  }

  .hero-content p {
    font-size: 1.25rem;
    text-shadow: 1px 1px 4px var(--shadow-text);
    opacity: 0.95;
  }

  /* ========================================
     CARDS GRID
     ======================================== */

  .cards-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
    gap: 1.5rem;
    margin: 1.5rem 0;
  }

  /* ========================================
     CARD COMPONENT
     ======================================== */

  .card {
    border-radius: 16px;
    padding: 1.75rem;
    box-shadow: 0 4px 20px var(--brand-glow);
    transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
    border: 1px solid var(--card-border);
    position: relative;
    animation: cardEnter 0.5s cubic-bezier(0.16, 1, 0.3, 1) backwards;
    background: linear-gradient(to bottom, var(--card-bg), var(--bg-cream));
  }

  @keyframes cardEnter {
    from {
      opacity: 0;
      transform: translateY(30px) scale(0.95);
    }
    to {
      opacity: 1;
      transform: translateY(0) scale(1);
    }
  }

  @keyframes fadeInUp {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @keyframes fadeInLeft {
    from {
      opacity: 0;
      transform: translateX(-20px);
    }
    to {
      opacity: 1;
      transform: translateX(0);
    }
  }

  @keyframes glow {
    0%, 100% { box-shadow: 0 4px 20px var(--brand-glow); }
    50% { box-shadow: 0 8px 30px var(--brand-glow), 0 0 20px var(--brand-glow); }
  }

  .card::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 4px;
    background: linear-gradient(90deg, var(--primary), var(--accent));
    transform: scaleX(0);
    transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1);
  }

  .card:hover {
    transform: translateY(-4px) rotate(0.5deg) scale(1.02);
    box-shadow: 0 12px 40px var(--brand-glow-hover);
    border-width: 2px;
    border-color: var(--primary);
  }

  .card:hover::before {
    transform: scaleX(1);
  }

  .card.completed {
    opacity: 0.5;
    transform: scale(0.98);
    filter: grayscale(0.3);
  }

  .card.completed:hover {
    transform: scale(1);
    filter: grayscale(0);
  }

  .card .date {
    color: var(--card-date);
    font-size: 0.875rem;
    font-weight: 600;
    margin-bottom: 0.75rem;
    letter-spacing: 0.5px;
    text-transform: uppercase;
    transition: color 0.3s ease;
  }

  .card.completed .date {
    color: var(--primary);
    text-decoration: line-through;
  }

  .card h3 {
    transition: color 0.3s ease;
  }

  .card.completed h3 {
    text-decoration: line-through;
    opacity: 0.6;
  }

  .card-actions {
    display: flex;
    gap: 0.75rem;
    margin-top: 1rem;
  }

  .card-delete {
    position: absolute;
    top: 1rem;
    right: 1rem;
    background: linear-gradient(135deg, var(--danger), var(--danger-dark));
    color: var(--white);
    border: none;
    padding: 0.5rem;
    border-radius: 8px;
    cursor: pointer;
    transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1);
    opacity: 0.7;
  }

  .card-delete:hover {
    opacity: 1;
    transform: scale(1.1) rotate(90deg);
    box-shadow: 0 4px 12px var(--danger-glow);
    animation: deleteWiggle 0.3s ease-in-out;
  }

  @keyframes deleteWiggle {
    0%, 100% { transform: scale(1.1) rotate(90deg); }
    25% { transform: scale(1.15) rotate(85deg); }
    75% { transform: scale(1.15) rotate(95deg); }
  }

  .card:active .card-delete {
    transform: scale(0.95);
  }

  .btn-pin {
    background: linear-gradient(135deg, var(--secondary), var(--secondary-dark));
    color: var(--white);
    border: none;
    padding: 0.625rem;
    border-radius: 8px;
    cursor: pointer;
    transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1);
  }

  .btn-pin:hover {
    transform: translateY(-2px) rotate(-10deg);
    box-shadow: 0 6px 20px var(--secondary-glow);
  }

  .btn-pin i {
    transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1);
  }

  /* ========================================
     PINNED CARD BUTTON - Gold Highlight
     ======================================== */

  .btn-pinned {
    background: linear-gradient(135deg, var(--gold-dark), var(--primary-dark));
    color: var(--white);
    border: none;
    padding: 0.625rem;
    border-radius: 8px;
    cursor: pointer;
    transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1);
    animation: pinGlow 2s ease-in-out infinite;
    position: relative;
    overflow: hidden;
  }

  .btn-pinned::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: radial-gradient(circle, var(--gold-glow) 0%, transparent 70%);
    opacity: 0;
    transition: opacity 0.3s ease;
  }

  .btn-pinned:hover::before {
    opacity: 1;
  }

  .btn-pinned:active::before {
    opacity: 0.8;
  }

  .btn-pinned:hover {
    transform: translateY(-2px) rotate(10deg) scale(1.05);
    background: linear-gradient(135deg, var(--gold-hover-light), var(--gold-dark));
  }

  body.dark .btn-pinned:hover {
    background: linear-gradient(135deg, var(--gold-hover-dark), var(--gold-dark));
  }

  @keyframes pinGlow {
    0%, 100% { box-shadow: 0 0 0 0 var(--pin-glow); }
    50% { box-shadow: 0 0 0 4px var(--pin-glow-light); }
  }

  body.dark {
    --pin-glow: rgba(200, 146, 64, 0.5);
    --pin-glow-light: rgba(200, 146, 64, 0.3);
  }

  body:not(.dark) {
    --pin-glow: rgba(126, 81, 0, 0.5);
    --pin-glow-light: rgba(126, 81, 0, 0.3);
  }

  body.dark .btn-pinned:hover {
    box-shadow: 0 6px 20px var(--pin-glow);
  }

  .card.pinned {
    animation: pinPulse 1s ease-in-out, pinGlow 2s ease-in-out infinite;
    border-color: var(--pin-glow-light);
    box-shadow: 0 0 20px var(--pin-glow-light);
  }

  body.dark .card.pinned {
    border-color: var(--pin-glow-light);
    box-shadow: 0 0 20px var(--pin-glow-light);
  }

  @keyframes pinPulse {
    0%, 100% { transform: scale(1); }
    50% { transform: scale(1.05); }
  }

  /* ========================================
     SECONDARY BUTTON
     ======================================== */

  .btn-secondary {
    background: linear-gradient(135deg, var(--secondary), var(--secondary-dark));
    color: var(--white);
  }

  .btn-secondary:hover {
    box-shadow: 0 6px 20px var(--secondary-glow);
  }

  /* ========================================
     DATA TABLE
     ======================================== */

  .data-table-container {
    background: var(--card-bg);
    border-radius: 16px;
    padding: 2rem;
    box-shadow: 0 4px 20px var(--brand-glow);
    border: 1px solid var(--card-border);
    overflow-x: auto;
  }

  .data-table {
    width: 100%;
    border-collapse: separate;
    border-spacing: 0;
    font-size: 0.95rem;
  }

  .data-table thead {
    background: linear-gradient(135deg, var(--primary), var(--primary-dark));
    color: var(--white);
  }

  .data-table th {
    padding: 1.125rem 1.5rem;
    text-align: left;
    cursor: pointer;
    user-select: none;
    font-weight: 700;
    font-size: 0.875rem;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    transition: background 0.2s ease;
  }

  .data-table th:hover {
    background: var(--table-header-hover);
  }

  .data-table td {
    padding: 1rem 1.5rem;
    border-bottom: 1px solid var(--border);
    transition: background 0.2s ease;
  }

  .data-table tbody tr {
    transition: all 0.2s ease;
  }

  .data-table tbody tr:hover {
    background: var(--bg-tan);
    transform: scale(1.01);
  }

  .data-table tbody tr.highlighted {
    background: linear-gradient(135deg, var(--pin-highlight-start), var(--pin-highlight-end));
    animation: goldPulse 2s ease-in-out infinite;
  }

  body.dark .data-table tbody tr.highlighted {
    background: linear-gradient(135deg, var(--pin-highlight-start), var(--pin-highlight-end));
    animation: goldPulseDark 2s ease-in-out infinite;
  }

  @keyframes goldPulse {
    0%, 100% { background: linear-gradient(135deg, var(--pin-highlight-start), var(--pin-highlight-end)); }
    50% { background: linear-gradient(135deg, var(--pin-pulse-light), var(--pin-pulse-light-end)); }
  }

  @keyframes goldPulseDark {
    0%, 100% { background: linear-gradient(135deg, var(--pin-highlight-start), var(--pin-highlight-end)); }
    50% { background: linear-gradient(135deg, var(--pin-pulse-light), var(--pin-pulse-light-end)); }
  }

  /* Responsive Table */
  @media (max-width: 768px) {
    .data-table tbody tr.highlighted {
      background: linear-gradient(135deg, var(--pin-highlight-start), var(--pin-highlight-end));
      border: 2px solid var(--secondary);
      border-left: 5px solid var(--secondary);
      box-shadow: 0 4px 20px var(--pin-glow-light);
      animation: goldPulse 2s ease-in-out infinite;
    }

    body.dark .data-table tbody tr.highlighted {
      background: linear-gradient(135deg, var(--pin-highlight-start), var(--pin-highlight-end));
      box-shadow: 0 4px 20px var(--pin-glow-light);
      animation: goldPulseDark 2s ease-in-out infinite;
    }
  }

  /* ========================================
     SEARCH & FILTER COMPONENTS
     ======================================== */

  .search-container, .filter-container {
    margin-bottom: 2rem;
    display: flex;
    gap: 1rem;
    flex-wrap: wrap;
  }

  .search-input, .filter-select {
    padding: 0.875rem 1.25rem;
    border: 2px solid var(--border);
    border-radius: 10px;
    font-size: 1rem;
    background: var(--card-bg);
    color: var(--text);
    font-family: inherit;
    transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
  }

  .search-input {
    flex: 1;
    min-width: 200px;
  }

  .search-input::placeholder {
    color: var(--text-muted);
  }

  .search-input:focus, .filter-select:focus {
    outline: none;
    border-color: var(--primary);
    box-shadow: 0 0 0 3px var(--brand-focus);
    transform: scale(1.01);
  }

  .search-input:focus-visible, .filter-select:focus-visible {
    outline: 3px solid var(--primary);
    outline-offset: 2px;
  }

  .search-input:hover, .filter-select:hover {
    border-color: var(--secondary);
    transform: scale(1.005);
  }

  .filter-select {
    min-width: 150px;
    cursor: pointer;
  }

  /* ========================================
     BUTTON COMPONENT
     ======================================== */

  .btn {
    padding: 0.875rem 2rem;
    border: none;
    border-radius: 10px;
    font-size: 1rem;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);
    font-family: inherit;
  }

  .btn:focus-visible {
    outline: 3px solid var(--primary);
    outline-offset: 2px;
  }

  .btn-primary {
    background: linear-gradient(135deg, var(--primary), var(--primary-dark));
    color: var(--white);
    position: relative;
    overflow: hidden;
  }

  .btn-primary:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 30px var(--brand-glow-hover);
  }

  .btn-primary:active {
    transform: translateY(-1px);
    box-shadow: 0 4px 15px var(--brand-glow);
  }

  .btn-danger {
    background: linear-gradient(135deg, var(--danger), var(--danger-dark));
    color: var(--white);
    padding: 0.625rem;
    border-radius: 8px;
  }

  .btn-secondary:hover, .btn-danger:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 20px var(--danger-glow);
  }

  /* ========================================
     TOGGLE SWITCH COMPONENT
     ======================================== */

  .toggle {
    position: relative;
    width: 50px;
    height: 28px;
  }

  .toggle input {
    opacity: 0;
    width: 0;
    height: 0;
  }

  .toggle-slider {
    position: absolute;
    cursor: pointer;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: var(--toggle-off);
    transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
    border-radius: 28px;
  }

  .toggle-slider::before {
    position: absolute;
    content: '';
    height: 20px;
    width: 20px;
    left: 4px;
    bottom: 4px;
    background-color: var(--white);
    transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
    border-radius: 50%;
  }

  .toggle input:checked + .toggle-slider {
    background: linear-gradient(135deg, var(--primary), var(--primary-dark));
  }

  .toggle input:checked + .toggle-slider::before {
    transform: translateX(22px);
  }

  .toggle:focus-visible .toggle-slider {
    outline: 3px solid var(--primary);
    outline-offset: 2px;
  }

  /* ========================================
     FORM COMPONENTS
     ======================================== */

  .form {
    background: var(--card-bg);
    border-radius: 16px;
    padding: 2rem;
    box-shadow: 0 4px 20px var(--shadow-sm);
    border: 1px solid var(--border-subtle);
    max-width: 600px;
  }

  .form-group {
    margin-bottom: 1.5rem;
  }

  .form-group label {
    display: block;
    margin-bottom: 0.5rem;
    font-weight: 600;
    font-size: 0.9rem;
    color: var(--text);
  }

  .form-group input,
  .form-group textarea {
    width: 100%;
    padding: 0.875rem 1rem;
    border: 2px solid var(--border);
    border-radius: 10px;
    font-size: 1rem;
    background: var(--card-bg);
    color: var(--text);
    font-family: inherit;
    transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
  }

  .form-group input:focus,
  .form-group textarea:focus {
    outline: none;
    border-color: var(--primary);
    box-shadow: 0 0 0 3px var(--brand-focus);
    transform: scale(1.01);
  }

  .form-group input:focus-visible,
  .form-group textarea:focus-visible {
    outline: 3px solid var(--primary);
    outline-offset: 2px;
  }

  .form-group textarea {
    resize: vertical;
    min-height: 120px;
  }

  .form-group small {
    display: block;
    margin-top: 0.5rem;
    color: var(--text-muted);
    font-size: 0.85rem;
  }

  .error-message {
    color: var(--danger);
    font-size: 0.85rem;
    margin-top: 0.5rem;
  }

  /* ========================================
     MODAL COMPONENT
     ======================================== */

  .modal-overlay {
    position: fixed;
    inset: 0;
    background: var(--shadow-overlay);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1000;
    animation: modalFadeIn 0.2s ease-out;
  }

  @keyframes modalFadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }

  .modal {
    background: var(--card-bg);
    border-radius: 16px;
    padding: 2rem;
    max-width: 600px;
    width: 90%;
    max-height: 80vh;
    overflow-y: auto;
    box-shadow: 0 8px 30px var(--shadow-lg);
    border: 1px solid var(--card-border);
    animation: modalSlideIn 0.3s cubic-bezier(0.16, 1, 0.3, 1);
  }

  @keyframes modalSlideIn {
    from {
      opacity: 0;
      transform: translateY(-20px) scale(0.95);
    }
    to {
      opacity: 1;
      transform: translateY(0) scale(1);
    }
  }

  .modal-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1.5rem;
  }

  .modal-close {
    background: none;
    border: none;
    font-size: 1.5rem;
    cursor: pointer;
    color: var(--text-muted);
    padding: 0.5rem;
    border-radius: 8px;
    transition: all 0.2s ease;
  }

  .modal-close:hover {
    background: var(--bg-tan);
    color: var(--danger);
    transform: rotate(90deg);
  }

  .modal-body {
    margin-bottom: 2rem;
  }

  .modal-footer {
    display: flex;
    gap: 1rem;
    justify-content: flex-end;
  }

  /* ========================================
     RANGE SLIDER COMPONENT
     ======================================== */

  .range-wrapper {
    display: flex;
    align-items: center;
    gap: 1rem;
    margin: 1rem 0;
  }

  .range-wrapper input[type="range"] {
    flex: 1;
    width: 150px;
    height: 8px;
    border-radius: 4px;
    background: var(--border);
    outline: none;
    -webkit-appearance: none;
  }

  .range-wrapper input[type="range"]::-webkit-slider-thumb {
    -webkit-appearance: none;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background: var(--primary);
    cursor: pointer;
    transition: all 0.2s ease;
  }

  .range-wrapper input[type="range"]::-webkit-slider-thumb:hover {
    transform: scale(1.2);
    box-shadow: 0 0 0 4px var(--brand-focus);
  }

  .range-wrapper input[type="range"]::-moz-range-thumb {
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background: var(--primary);
    cursor: pointer;
    border: none;
    transition: all 0.2s ease;
  }

  /* ========================================
     SETTINGS COMPONENT
     ======================================== */

  .settings-section {
    background: var(--card-bg);
    border-radius: 16px;
    padding: 2rem;
    margin-bottom: 1.5rem;
    box-shadow: 0 4px 20px var(--shadow-sm);
    border: 1px solid var(--border-subtle);
  }

  .settings-section h3 {
    margin-bottom: 1.5rem;
    font-size: 1.25rem;
    color: var(--text);
  }

  .setting-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem 0;
    border-bottom: 1px solid var(--border);
  }

  .setting-item:last-child {
    border-bottom: none;
  }

  .setting-label {
    flex: 1;
    margin-right: 2rem;
  }

  .setting-label h4 {
    font-size: 1rem;
    font-weight: 600;
    margin-bottom: 0.25rem;
    color: var(--text);
  }

  .setting-description {
    font-size: 0.875rem;
    color: var(--text-muted);
    margin-top: 0.25rem;
  }

  .setting-control {
    display: flex;
    align-items: center;
    gap: 1rem;
  }

  .setting-select {
    padding: 0.75rem 1rem;
    border: 2px solid var(--border);
    border-radius: 10px;
    font-size: 0.95rem;
    background: var(--card-bg);
    color: var(--text);
    font-family: inherit;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.2s ease;
    min-width: 140px;
  }

  .setting-select:hover {
    border-color: var(--secondary);
    transform: scale(1.02);
  }

  .setting-select:focus-visible {
    outline: 3px solid var(--primary);
    outline-offset: 2px;
  }

  /* ========================================
     STATISTICS CARDS
     ======================================== */

  .stats-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 1.5rem;
    margin: 2rem 0;
  }

  .stat-card {
    background: linear-gradient(135deg, var(--primary), var(--primary-dark));
    color: var(--white);
    border-radius: 16px;
    padding: 2rem;
    text-align: center;
    box-shadow: 0 8px 30px var(--shadow-md);
    border: 1px solid var(--card-border);
    transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
  }

  .stat-card:hover {
    transform: translateY(-4px);
    box-shadow:
      0 8px 30px var(--shadow-md),
      0 12px 40px var(--brand-glow-hover),
      0 0 40px var(--brand-glow);
  }

  .stat-value {
    font-size: 3rem;
    font-weight: 700;
    font-family: 'Playfair Display', serif;
    margin-bottom: 0.5rem;
    line-height: 1;
  }

  .stat-label {
    font-size: 1rem;
    font-weight: 500;
    opacity: 0.9;
    text-transform: uppercase;
    letter-spacing: 1px;
  }

  /* ========================================
     EMPTY STATE
     ======================================== */

  .empty-state {
    text-align: center;
    padding: 4rem 2rem;
    background: var(--card-bg);
    border-radius: 16px;
    box-shadow: 0 4px 20px var(--shadow-sm);
    border: 1px solid var(--card-border);
  }

  .empty-state-icon {
    font-size: 4rem;
    margin-bottom: 1.5rem;
    opacity: 0.3;
    color: var(--text-muted);
  }

  .empty-state h3 {
    font-size: 1.5rem;
    margin-bottom: 1rem;
    color: var(--text);
  }

  .empty-state p {
    font-size: 1rem;
    color: var(--text-muted);
    max-width: 400px;
    margin: 0 auto 2rem;
  }

  /* ========================================
     MARCH GOALS SECTION
     ======================================== */

  .march-goals {
    background: linear-gradient(135deg, var(--goals-bg-start), var(--goals-bg-end));
    border-radius: 16px;
    padding: 2rem;
    margin: 2rem 0;
    box-shadow:
      0 4px 20px var(--shadow-sm),
      0 6px 25px var(--goals-shadow),
      0 12px 40px var(--shadow-md),
      0 20px 60px var(--brand-glow);
  }

  .march-goals h3 {
    font-size: 2rem;
    margin-bottom: 1.5rem;
    color: var(--primary);
  }

  .march-goals ul {
    list-style: none;
    max-width: 600px;
  }

  .march-goals li {
    display: flex;
    align-items: center;
    gap: 1rem;
    padding: 1rem 0;
    font-size: 1.1rem;
    border-bottom: 1px solid var(--goals-border);
  }

  .march-goals li:last-child {
    border-bottom: none;
  }

  .march-goals li i {
    color: var(--gold-dark);
    flex-shrink: 0;
  }

  /* ========================================
     BUTTON VARIANTS
     ======================================== */

  .btn-block {
    width: 100%;
    display: block;
  }

  .btn-lg {
    padding: 1rem 2.5rem;
    font-size: 1.1rem;
  }

  .btn-sm {
    padding: 0.5rem 1rem;
    font-size: 0.875rem;
  }

  /* ========================================
     DARK MODE TOGGLE
     ======================================== */

  .dark-mode-toggle {
    position: fixed;
    top: 1rem;
    right: 1rem;
    z-index: 100;
    background: linear-gradient(135deg, var(--nav-bg), var(--bg));
    color: var(--white);
    border: none;
    padding: 0.75rem;
    border-radius: 10px;
    cursor: pointer;
    box-shadow: 0 8px 30px var(--shadow-lg);
    transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }

  .dark-mode-toggle:hover {
    transform: scale(1.1) rotate(10deg);
    box-shadow: 0 8px 30px var(--shadow-lg), 0 0 20px var(--brand-glow);
  }

  .dark-mode-toggle:active {
    transform: scale(0.95);
  }

  /* ========================================
     RESPONSIVE DESIGN
     ======================================== */

  @media (max-width: 1024px) {
    .main-content {
      padding: 1.5rem 2rem;
    }

    h1 { font-size: 2.5rem; }
    h2 { font-size: 1.75rem; }

    .cards-grid {
      grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
    }
  }

  @media (max-width: 768px) {
    .sidebar {
      transform: translateX(-100%);
    }

    .sidebar.open {
      transform: translateX(0);
    }

    .sidebar-overlay {
      display: block;
      opacity: 0;
      visibility: hidden;
      transition: all 0.3s ease;
    }

    .sidebar-overlay.open {
      opacity: 1;
      visibility: visible;
    }

    .main-content {
      margin-left: 0;
      padding: 1rem;
    }

    .mobile-nav-toggle {
      display: block;
    }

    h1 { font-size: 2rem; }
    h2 { font-size: 1.5rem; }

    .hero-parallax {
      height: 50vh;
      min-height: 300px;
    }

    .hero-content h1 {
      font-size: 2.5rem;
    }

    .hero-content p {
      font-size: 1rem;
    }

    .cards-grid {
      grid-template-columns: 1fr;
      gap: 1rem;
    }

    .card {
      padding: 1.5rem;
    }

    .stats-grid {
      grid-template-columns: 1fr;
    }

    .data-table-container {
      padding: 1rem;
    }

    .form {
      padding: 1.5rem;
    }

    .search-container,
    .filter-container {
      flex-direction: column;
    }

    .search-input,
    .filter-select {
      width: 100%;
    }
  }

  @media (max-width: 480px) {
    h1 { font-size: 1.75rem; }
    h2 { font-size: 1.25rem; }

    .hero-content h1 {
      font-size: 2rem;
    }

    .card {
      padding: 1.25rem;
    }

    .modal {
      padding: 1.5rem;
      width: 95%;
    }

    .btn {
      padding: 0.75rem 1.5rem;
    }
  }

  /* ========================================
     UTILITY CLASSES
     ======================================== */

  .text-center { text-align: center; }
  .text-left { text-align: left; }
  .text-right { text-align: right; }
  .mb-1 { margin-bottom: 1rem; }
  .mb-2 { margin-bottom: 2rem; }
  .mt-1 { margin-top: 1rem; }
  .mt-2 { margin-top: 2rem; }
  .flex { display: flex; }
  .flex-center { display: flex; align-items: center; justify-content: center; }
  .flex-between { display: flex; align-items: center; justify-content: space-between; }
  .hidden { display: none; }
  .visible { visibility: visible; }
  .invisible { visibility: hidden; }

  /* ========================================
     ACCESSIBILITY ENHANCEMENTS
     ======================================== */

  /* Skip to content link for keyboard users */
  .skip-link {
    position: absolute;
    top: -40px;
    left: 0;
    background: var(--primary);
    color: var(--white);
    padding: 8px;
    z-index: 10000;
    transition: top 0.3s;
  }

  .skip-link:focus {
    top: 0;
  }

  /* Reduced motion preference */
  @media (prefers-reduced-motion: reduce) {
    *,
    *::before,
    *::after {
      animation-duration: 0.01ms !important;
      animation-iteration-count: 1 !important;
      transition-duration: 0.01ms !important;
    }
  }

  /* High contrast mode support */
  @media (prefers-contrast: more) {
    .card {
      border-width: 2px;
    }

    .btn {
      border-width: 2px;
    }
  }

  /* Print styles */
  @media print {
    .sidebar,
    .mobile-nav-toggle,
    .dark-mode-toggle {
      display: none !important;
    }

    .main-content {
      margin-left: 0;
    }

    .card {
      break-inside: avoid;
      box-shadow: none;
      border: 1px solid var(--text);
    }
  }

  /* ========================================
     ADDITIONAL COMPONENT STYLES
     ======================================== */

  .footer-title {
    font-family: 'Playfair Display', serif;
    font-size: 1.1rem;
    font-weight: 600;
  }

  .footer-credits {
    opacity: 0.85;
    font-size: 0.9rem;
  }

  .settings-icon {
    display: inline-block;
    vertical-align: middle;
    margin-right: 0.75rem;
  }

  .settings-btn-icon {
    display: inline-block;
    vertical-align: middle;
    margin-right: 0.5rem;
  }
`;
