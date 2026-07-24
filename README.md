# Faris Abdillah — Portfolio

A premium personal portfolio site inspired by Apple's Liquid Glass / fluid
design language: frosted-glass cards, animated gradients, floating UI, and
smooth micro-interactions — built entirely with hand-written HTML, CSS and
vanilla JavaScript.

**[Live demo →](#)** &nbsp;·&nbsp; **[Report a bug](#)**

---

## ✨ Features

- **Liquid Glass UI** — frosted glassmorphic cards with backdrop blur, soft
  shadows, glass-edge highlights, and a shine-sweep hover reflection
- **Dark mode by default** with a persisted light-theme toggle, powered
  entirely by CSS custom properties
- **Animated gradient background** — three slow-moving blurred color blobs
  plus floating "liquid" shapes in the hero
- **Mouse-glow cursor** that reacts to hovering interactive elements
  (disabled automatically on touch devices)
- **3D tilt effect** on project and skill cards that follows the cursor
- **Scroll-reveal animations** (fade up / left / right / scale) via
  `IntersectionObserver`, with staggered delays per grid
- **Typing effect** hero subtitle cycling through role titles
- **Animated skill progress bars** and **animated GitHub stat counters**
- **Sticky floating navbar** with blur, scroll-aware styling, active-link
  tracking, and a smooth-scroll offset that accounts for its own height
- **Scroll progress bar** and **scroll-to-top** button
- Fully **responsive** — tuned breakpoints for desktop, tablet and mobile
- **Accessible** — semantic landmarks, skip link, visible focus states,
  `aria-label`s on icon-only controls, and full `prefers-reduced-motion`
  support
- **SEO-ready** — descriptive meta tags, Open Graph / Twitter Card data
- **Zero dependencies** — no frameworks, no build step, just three files

## 📸 Screenshots

Project and profile imagery in this build uses CSS/SVG placeholders, so the
site renders beautifully with no external assets. Once you deploy your own
version, capture and drop screenshots here:

| Section  | Suggested file                  |
| -------- | -------------------------------- |
| Hero     | `assets/images/screenshot-hero.jpg`     |
| About    | `assets/images/screenshot-about.jpg`    |
| Skills   | `assets/images/screenshot-skills.jpg`   |
| Projects | `assets/images/screenshot-projects.jpg` |
| Contact  | `assets/images/screenshot-contact.jpg`  |

See `assets/images/README.md` for guidance on swapping placeholders for real
project screenshots.

## 🛠️ Technologies

- **HTML5** — semantic markup, an inline SVG icon sprite (`<symbol>` /
  `<use>`) to keep icons crisp and DRY
- **CSS3** — custom properties for theming, Grid & Flexbox layout,
  `backdrop-filter`, `clamp()` fluid type, and choreographed keyframe
  animations
- **Vanilla JavaScript (ES6+)** — no libraries; `IntersectionObserver`,
  `requestAnimationFrame`-throttled scroll/mouse handlers, and
  `localStorage` for theme persistence
- **[Space Grotesk](https://fonts.google.com/specimen/Space+Grotesk)** +
  **[Inter](https://fonts.google.com/specimen/Inter)** via Google Fonts

No frameworks, no bundlers, no package manager required.

## 🚀 Installation

Clone or download the repository, then open `index.html` directly, or serve
it locally (recommended, so relative paths and fonts behave exactly as in
production):

```bash
# Option 1 — VS Code
# Right-click index.html → "Open with Live Server"

# Option 2 — Python
python3 -m http.server 8000
# then visit http://localhost:8000

# Option 3 — Node
npx serve .
```

## 📁 Folder Structure

```
/
├── index.html
├── css/
│   └── style.css
├── js/
│   └── script.js
├── assets/
│   ├── images/
│   │   └── README.md      # guide for swapping in real screenshots
│   └── icons/
│       └── favicon.svg
├── LICENSE
├── .gitignore
└── README.md
```

## 🎨 Customization

Almost everything visual is driven by CSS custom properties defined once at
the top of `css/style.css`:

```css
:root {
  --color-primary: #4F8CFF;
  --color-secondary: #7B61FF;
  --color-accent: #00E5FF;
  --radius-lg: 32px;
  --section-spacing: 140px;
  /* …and more */
}
```

Change a value once and it propagates through every card, button, and
gradient on the page. Content (name, bio, experience, projects, stats,
contact links) lives directly in `index.html` — search for the relevant
section comment (e.g. `<!-- ============ PROJECTS ============ -->`) to
edit it.

## 🌐 Browser Support

Built on modern, broadly-supported CSS (`backdrop-filter`, custom
properties, Grid) and JavaScript (`IntersectionObserver`,
`requestAnimationFrame`). Verified in current versions of Chrome, Edge,
Firefox and Safari. `backdrop-filter` gracefully falls back to a solid
translucent panel in any browser that doesn't support it.

## 📄 License

Released under the [MIT License](./LICENSE) — free to use, modify, and
build on for personal or commercial projects. Attribution is appreciated
but not required.

## 👤 Author

**Faris Abdillah**
Frontend Engineer & UI/UX Designer, Jakarta, Indonesia

- Email: farisabdillahchanel@gmail.com
- GitHub: 
- LinkedIn: 
- Instagram: farsdlh

---

<p align="center">Designed &amp; built with care in Jakarta, Indonesia.</p>
