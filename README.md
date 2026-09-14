# LiVe GbR — One-Page Website

Italian women's fashion boutique, Erding, Bavaria.

---

## What it is

A single-page brochure site for **LiVe GbR**, a boutique carrying Italian women's clothing, leather bags, and accessories at Landshuterstr. 12, 85435 Erding.

Sections: lookbook hero rotator · categorised collection highlights · about the boutique · Instagram call-out · visit/contact with CSS map indicator · sticky mobile CTA bar (Call + Directions).

---

## Stack decision

Static HTML + CSS + Vanilla JS. No framework, no build step. The site is a brochure with no client state, searchable content, or multi-step forms. It opens from the file system or any static host without configuration.

---

## Local development

```bash
# Option 1 — any static server
npx serve .

# Option 2 — Python
python3 -m http.server 8080

# Option 3 — VS Code Live Server extension
# Right-click index.html → "Open with Live Server"
```

No installation required.

---

## Deployment

Drop the entire repository into any static host:

- **Netlify** — drag the folder into the Netlify dashboard, or connect the Git repo.
- **Vercel** — `vercel` in the project root; framework preset: Other.
- **GitHub Pages** — push to a repo, enable Pages from the `main` branch root.
- **Any web server** — upload all files preserving the `src/` directory structure.

No build command. Publish directory: `/` (root).

---

## Design decisions

### Palette
Derived directly from `brand.colors`:

| Token | Hex | Use |
|---|---|---|
| `--color-black` | `#000000` | Primary text, header bg, hero, footer |
| `--color-white` | `#FFFFFF` | Surfaces, card backgrounds |
| `--color-gold` | `#C8A97E` | Accent: dots, underlines, pin, highlights |
| `--color-gold-light` | `#E2C9A3` | Hero italic text, accessory shape |
| `--color-gold-dark` | `#A8845A` | Hover states, section labels, CTA bar |
| `--color-surface` | `#F7F4F0` | Warm off-white for alternating sections |
| `--color-surface-2` | `#EFEBE5` | Card visual backgrounds |

Black and white create the editorial frame. Gold is the single accent — used sparingly so it reads as a material reference (leather, gilt) rather than decoration.

### Typography
- **Headings:** Cormorant Garamond (serif, light/italic weight) — Italian provenance, editorial character, economical at large sizes.
- **Body / UI:** Inter (sans-serif, 300–500 weight) — neutral, highly legible at small sizes, pairs with the serif without competing.
- All type is fluid via `clamp()`. No fixed sizes.

### Layout direction
Deliberately asymmetric. The hero is left-aligned, not centred. The about section uses an off-set accent column. Collections use an uneven three-column grid (2fr · 1.4fr · 1.4fr) at desktop width. This avoids the symmetric three-card brochure cliché.

### Images
No image files were present in the input. Every visual placeholder is resolved through CSS drawing:
- **Hero slides** — geometric stripe patterns and gradient compositions in black and gold, each slide visually distinct.
- **Collection cards** — minimal line-art silhouettes (coat, bag, accessory) using CSS `clip-path`, borders, and pseudo-elements.
- **Map** — CSS grid lines with a rotated gold pin marker.

If photography becomes available, replace the `.hero__slide-bg` backgrounds and `.collection-card__visual` contents with `<img>` elements carrying descriptive `alt` attributes.

### Mobile-first specifics
- Sticky CTA bar (Call + Directions) appears after the hero scrolls out of view, on screens below 768 px only.
- Navigation collapses to a burger at mobile width with full keyboard and ARIA support.
- Footer gets bottom padding on mobile to prevent the sticky bar from obscuring content.

---

## Accessibility notes
- One `<h1>` per page view (inside the active hero slide; all three share the tag but only one is visible at a time).
- All interactive elements have visible `:focus-visible` outlines.
- `prefers-reduced-motion` disables slide autoplay and scroll-reveal animations.
- Contrast ratios: white text on black backgrounds exceeds WCAG AA. Gold (`#C8A97E`) on white is used only for decorative elements, never for body copy.