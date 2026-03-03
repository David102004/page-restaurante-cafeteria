<p align="center">
  <img src="https://img.shields.io/badge/STATUS-LIVE-44ff88?style=for-the-badge&labelColor=0a0a0a" alt="Status">
  <img src="https://img.shields.io/badge/IDIOMA-ESPAÑOL-c8a97e?style=for-the-badge&labelColor=0a0a0a" alt="Idioma">
  <img src="https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white" alt="HTML5">
  <img src="https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white" alt="CSS3">
  <img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=0a0a0a" alt="JavaScript">
  <img src="https://img.shields.io/badge/GSAP-88CE02?style=for-the-badge&logo=greensock&logoColor=0a0a0a" alt="GSAP">
</p>

<h1 align="center">☕ KLASSY — Café Artesanal & Panadería</h1>

<p align="center">
  <strong>Sitio web brutalista-minimalista diseñado con obsesión.</strong><br>
  Tecnologías web modernas, cero frameworks, rendimiento puro.
</p>

<p align="center">
  <a href="#-características">Características</a> •
  <a href="#-tech-stack">Tech Stack</a> •
  <a href="#-inicio-rápido">Inicio Rápido</a> •
  <a href="#-arquitectura">Arquitectura</a> •
  <a href="#-sistema-de-diseño">Diseño</a> •
  <a href="#-licencia">Licencia</a>
</p>

---

## ✨ Características

| Característica | Descripción |
|---|---|
| 🎨 **Diseño Brutalista Oscuro** | Sistema de diseño artesanal con 100+ custom properties CSS, paleta de colores curada y tipografía premium |
| 🇪🇸 **Sitio Completo en Español** | Toda la interfaz localizada al español: navegación, secciones, formularios, metadatos y footer |
| 🎠 **Carrusel de Productos** | 10 creaciones exclusivas con navegación por flechas, drag/swipe, barra de progreso, contador y soporte de teclado |
| 🔍 **Productos Expandibles** | Click en cualquier producto del carrusel despliega descripción, tags e ingredientes con animaciones suaves |
| 🚀 **Animaciones GSAP** | Timeline cinemática en hero, parallax scrolling y animaciones de revelación escalonadas |
| 🧈 **Scroll Suave Lenis** | Experiencia de scroll ultrasuave integrado con GSAP ScrollTrigger |
| 🖱️ **Cursor Personalizado** | Cursor acelerado por hardware con estados hover y efectos blend-mode |
| 📱 **Totalmente Responsivo** | Diseño mobile-first con tipografía fluida, grids adaptativos e interacciones táctiles |
| 🍔 **Menú Móvil Animado** | Overlay pantalla completa con animaciones escalonadas en enlaces |
| 🗂️ **Sistema de Pestañas** | Filtrado animado por categorías (Desayuno, Almuerzo, Cena, Bebidas) con transiciones GSAP |
| 🖼️ **Galería Masonry** | Grid CSS optimizado con efectos zoom hover y transiciones de overlay |
| 📝 **Formulario de Reservación** | Labels flotantes, estados focus, selector de invitados/horario y feedback visual de envío |
| 🎬 **Revelación por Scroll** | Animaciones de entrada con IntersectionObserver |
| 🔊 **Textura de Ruido** | Filtro SVG sutil para grano brutalista auténtico |
| 🏷️ **Banner Marquesina** | Scroll horizontal infinito con interacción de velocidad |
| ♿ **Accesible** | ARIA labels, HTML5 semántico, navegable por teclado, estilos de impresión |

## 🛠 Tech Stack

```
Frontend
├── HTML5          → Estructura semántica, meta tags SEO (lang="es")
├── CSS3           → Custom Properties, Grid, Flexbox, Glassmorphism
├── JavaScript     → Vanilla ES6+, cero dependencias en bundle
│
Bibliotecas (CDN)
├── GSAP 3.12      → Animaciones timeline, ScrollTrigger
└── Lenis 1.1      → Motor de scroll suave
│
Tipografía
├── Space Grotesk  → Display & encabezados UI
├── Inter          → Texto de cuerpo
└── Playfair Display → Acentos serif
```

## 🚀 Inicio Rápido

### Prerrequisitos

No se requieren herramientas de compilación. Solo un navegador.

### Ejecutar Localmente

```bash
# Clonar el repositorio
git clone https://github.com/David102004/page-restaurante-cafeteria.git

# Navegar al proyecto
cd page-restaurante-cafeteria

# Abrir en tu navegador
# Opción 1: Simplemente abrir index.html
start index.html

# Opción 2: Usar un servidor local (recomendado)
npx serve .
```

> **Nota:** Se recomienda un servidor local para evitar problemas CORS con algunas funciones del navegador. Cualquier servidor estático funciona — `live-server`, `http-server`, `python -m http.server`, VS Code Live Server, etc.

## 📐 Arquitectura

```
page-restaurante-cafeteria/
├── index.html                  # SPA — punto de entrada (~1190 líneas)
├── README.md                   # Este archivo
├── assets/
│   ├── css/
│   │   └── styles.css          # Sistema de diseño completo (~1960 líneas)
│   │       ├── Design Tokens   # Colores, tipografía, espaciado, efectos
│   │       ├── Reset & Base    # CSS reset moderno
│   │       ├── Componentes     # Navbar, botones, cards, formularios
│   │       ├── Carrusel        # Carousel con expandibles y progreso
│   │       ├── Secciones       # Hero, about, menú, equipo, galería, contacto
│   │       ├── Animaciones     # Keyframes & estados scroll-reveal
│   │       └── Responsivo      # Breakpoints: 1024px, 768px, 480px
│   ├── js/
│   │   └── app.js              # Motor de aplicación (~500 líneas)
│   │       ├── Loader          # Secuencia de animación de entrada
│   │       ├── Lenis           # Inicialización scroll suave
│   │       ├── Cursor Custom   # Cursor lerped con estados hover
│   │       ├── GSAP Timeline   # Animaciones hero & parallax
│   │       ├── Pestañas Menú   # Sistema de filtrado por categoría
│   │       ├── Scroll Reveals  # Motor IntersectionObserver
│   │       ├── Carrusel        # Navegación, drag/swipe, expand, progreso
│   │       └── Formulario      # Feedback de envío & validación
│   └── images/                 # Assets de imagen optimizados
│       ├── menu-item-*.jpg     # Fotos de productos principales
│       ├── tab-item-*.png      # Fotos de productos adicionales
│       ├── slide-*.jpg         # Imágenes de galería & hero
│       ├── chefs-*.jpg         # Fotos del equipo
│       └── ...                 # Logos, iconos, fondos
```

## 🎠 Carrusel de Productos

El componente estrella del sitio. Cada producto es interactivo:

```
┌─────────────────────────────────────────────────────────────────┐
│  Creaciones Exclusivas                    ◀  01/10  ▶          │
│                                                                 │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐       │
│  │  🖼️      │  │  🖼️      │  │  🖼️      │  │  🖼️      │       │
│  │          │  │          │  │  [Badge]  │  │          │       │
│  │      [+] │  │      [+] │  │      [+] │  │      [+] │       │
│  ├──────────┤  ├──────────┤  ├──────────┤  ├──────────┤       │
│  │ Nombre $X│  │ Nombre $X│  │ Nombre $X│  │ Nombre $X│       │
│  ├──────────┤  └──────────┘  └──────────┘  └──────────┘       │
│  │ Desc...  │  ← Click expande detalles                       │
│  │ 🔥 🍫   │                                                   │
│  │ [ing][re]│                                                   │
│  └──────────┘                                                   │
│  ███████░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░ Progreso            │
└─────────────────────────────────────────────────────────────────┘
```

**Controles:**
- `◀ ▶` Flechas de navegación
- `Drag / Swipe` Arrastrar para navegar
- `← →` Teclas de teclado
- `Click [+]` Expandir detalles del producto

**10 Productos:**
Pastel de Chocolate · Panqueque Klassy · Pan Artesanal · Cheesecake de Arándanos · Cupcake Clásico · Ensalada Mediterránea · Bowl Tropical · Croissant Relleno · Limonada de la Casa · Tarta de Manzana

## 🎨 Sistema de Diseño

### Paleta de Colores

| Token | Valor | Uso |
|---|---|---|
| `--bg` | `#0a0a0a` | Fondo de página |
| `--bg-card` | `#161616` | Superficies de tarjetas |
| `--accent` | `#c8a97e` | Acento dorado — CTAs, resaltados |
| `--text` | `#f0f0f0` | Texto principal |
| `--text-muted` | `#888888` | Texto secundario |
| `--border` | `#222222` | Divisores & bordes de tarjetas |

### Escala Tipográfica

```css
--text-hero: clamp(3.5rem, 10vw, 9rem);  /* Título hero */
--text-6xl:  4.5rem;                       /* Títulos de sección */
--text-base: 1rem;                         /* Texto de cuerpo */
--text-xs:   0.75rem;                      /* Etiquetas & tags */
```

### Filosofía Brutalista

- **Sin border-radius** en el carrusel — bordes afilados, intencionales
- **Glow dorado** (`box-shadow` con `--accent-glow`) en hover
- **Escala de grises** sutil en imágenes que desaparece al hover
- **Tipografía uppercase** en badges e ingredientes con tracking amplio
- **Textura noise** para esa sensación de grano crudo

## ⚡ Rendimiento

- **Zero build step** — Sin bundlers, sin transpilers, sin node_modules
- **CDN libraries** — GSAP & Lenis cargados desde CDN globales con `defer`
- **Lazy-loaded images** — Todas las imágenes below-fold usan `loading="lazy"`
- **Animaciones GPU** — Solo `transform` y `opacity`
- **Minimal repaints** — `will-change` y `transform3d` para 60fps suaves
- **~40KB CSS** — Sistema de diseño completo en un solo archivo
- **~12KB JS** — Motor de interactividad completo, sin bloat

## 🌍 Localización

El sitio está completamente traducido al español, incluyendo:

- Metadatos HTML (`<title>`, `<meta description>`, `<meta keywords>`, OpenGraph)
- Navegación (desktop & menú móvil)
- Todas las secciones de contenido (Hero, Nosotros, Menú, Equipo, Galería, Contacto)
- Formulario de reservación (labels, placeholders, opciones de select, mensaje de éxito)
- Footer (navegación, horario, copyright)
- Atributos `alt` de imágenes

## 📄 Licencia

Este proyecto es open source y está disponible bajo la [Licencia MIT](LICENSE).

---

<p align="center">
  <strong>Diseñado con obsesión ☕</strong><br>
  <sub>KLASSY — Donde el diseño brutalista se encuentra con el arte artesanal</sub>
</p>
