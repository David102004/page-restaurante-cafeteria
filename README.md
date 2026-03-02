<p align="center">
  <img src="https://img.shields.io/badge/STATUS-LIVE-44ff88?style=for-the-badge&labelColor=0a0a0a" alt="Status">
  <img src="https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white" alt="HTML5">
  <img src="https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white" alt="CSS3">
  <img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=0a0a0a" alt="JavaScript">
  <img src="https://img.shields.io/badge/GSAP-88CE02?style=for-the-badge&logo=greensock&logoColor=0a0a0a" alt="GSAP">
</p>

<h1 align="center">☕ KLASSY — Artisan Café & Bakery</h1>

<p align="center">
  <strong>A brutalist-minimalist website crafted with obsession.</strong><br>
  Modern web technologies, zero frameworks, pure performance.
</p>

<p align="center">
  <a href="#-features">Features</a> •
  <a href="#-tech-stack">Tech Stack</a> •
  <a href="#-getting-started">Getting Started</a> •
  <a href="#-architecture">Architecture</a> •
  <a href="#-screenshots">Screenshots</a> •
  <a href="#-license">License</a>
</p>

---

## ✨ Features

| Feature | Description |
|---|---|
| 🎨 **Brutalist Dark Design** | Hand-crafted design system with 100+ CSS custom properties, curated color palette, and premium typography |
| 🚀 **GSAP Animations** | Cinematic hero timeline, parallax scrolling, and staggered reveal animations |
| 🧈 **Lenis Smooth Scroll** | Buttery-smooth scrolling experience integrated with GSAP ScrollTrigger |
| 🖱️ **Custom Cursor** | Hardware-accelerated custom cursor with hover states and blend-mode effects |
| 📱 **Fully Responsive** | Mobile-first design with fluid typography, adaptive grid layouts, and touch-optimized interactions |
| 🍔 **Animated Mobile Menu** | Full-screen overlay with staggered link animations |
| 🗂️ **Menu Tab System** | Animated category filtering with GSAP transitions |
| 🖼️ **Masonry Gallery** | CSS Grid gallery with hover zoom effects and overlay transitions |
| 📝 **Smart Contact Form** | Floating labels, focus states, and visual submit feedback |
| 🎬 **Scroll-triggered Reveals** | IntersectionObserver-powered entrance animations |
| 🔊 **Noise Texture Overlay** | Subtle SVG noise filter for authentic brutalist grain |
| 🏷️ **Marquee Banner** | Infinite horizontal scroll with scroll-speed interaction |
| ♿ **Accessible** | ARIA labels, semantic HTML5, keyboard-navigable, print styles |

## 🛠 Tech Stack

```
Frontend
├── HTML5          → Semantic structure, SEO-optimized meta tags
├── CSS3           → Custom Properties, Grid, Flexbox, Glassmorphism
├── JavaScript     → Vanilla ES6+, zero dependencies in bundle
│
Libraries (CDN)
├── GSAP 3.12      → Timeline animations, ScrollTrigger
└── Lenis 1.1      → Smooth scroll engine
│
Typography
├── Space Grotesk  → Display & UI headings
├── Inter          → Body text
└── Playfair Display → Accent serif touches
```

## 🚀 Getting Started

### Prerequisites

No build tools required. Just a browser.

### Run Locally

```bash
# Clone the repository
git clone https://github.com/YOUR_USERNAME/klassy-cafe.git

# Navigate to the project
cd klassy-cafe/klassy_cafe

# Open in your browser
# Option 1: Simply open index.html
start index.html

# Option 2: Use a local server (recommended for best experience)
npx serve .
```

> **Note:** A local server is recommended to avoid CORS issues with some browser features. Any static server works — `live-server`, `http-server`, Python's `http.server`, VS Code Live Server, etc.

## 📐 Architecture

```
klassy_cafe/
├── index.html                  # Single-page application entry
├── README.md                   # This file
├── assets/
│   ├── css/
│   │   └── styles.css          # Complete design system (~900 lines)
│   │       ├── Design Tokens   # Colors, typography, spacing, effects
│   │       ├── Reset & Base    # Modern CSS reset
│   │       ├── Components      # Navbar, buttons, cards, forms
│   │       ├── Sections        # Hero, about, menu, team, gallery, contact
│   │       ├── Animations      # Keyframes & scroll-reveal states
│   │       └── Responsive      # Breakpoints: 1024px, 768px, 480px
│   ├── js/
│   │   └── app.js              # Application engine (~280 lines)
│   │       ├── Loader          # Entrance animation sequence
│   │       ├── Lenis           # Smooth scroll initialization
│   │       ├── Custom Cursor   # Lerped cursor with hover states
│   │       ├── GSAP Timeline   # Hero & parallax animations
│   │       ├── Menu Tabs       # Category filtering system
│   │       ├── Scroll Reveals  # IntersectionObserver engine
│   │       ├── Drag Scroll     # Featured section horizontal drag
│   │       └── Form Handler    # Submit feedback & validation
│   ├── images/                 # Optimized image assets
│   └── fonts/                  # Legacy font files (unused)
```

## 🎨 Design System

### Color Palette

| Token | Value | Usage |
|---|---|---|
| `--bg` | `#0a0a0a` | Page background |
| `--bg-card` | `#161616` | Card surfaces |
| `--accent` | `#c8a97e` | Gold accent — CTAs, highlights |
| `--text` | `#f0f0f0` | Primary text |
| `--text-muted` | `#888888` | Secondary text |
| `--border` | `#222222` | Dividers & card borders |

### Typography Scale

```css
--text-hero: clamp(3.5rem, 10vw, 9rem);  /* Hero title */
--text-6xl:  4.5rem;                       /* Section titles */
--text-base: 1rem;                         /* Body text */
--text-xs:   0.75rem;                      /* Labels & tags */
```

## 📸 Screenshots

> Add your screenshots here after deployment.

| Hero | Menu | Gallery |
|---|---|---|
| *Coming soon* | *Coming soon* | *Coming soon* |

## ⚡ Performance

- **Zero build step** — No bundlers, no transpilers, no node_modules
- **CDN-delivered libraries** — GSAP & Lenis loaded from global CDNs with `defer`
- **Lazy-loaded images** — All below-fold images use `loading="lazy"`
- **GPU-accelerated animations** — `transform` and `opacity` only
- **Minimal repaints** — `will-change` and `transform3d` for smooth 60fps
- **~30KB CSS** — Complete design system in a single file
- **~8KB JS** — Full interactivity engine, no bloat

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

<p align="center">
  <strong>Designed with obsession ☕</strong><br>
  <sub>KLASSY — Where brutalist design meets artisan craft</sub>
</p>
