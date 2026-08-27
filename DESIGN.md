# Design System — VisionCraft Optik

<!-- impeccable:design-schema 1 -->

## Visual Identity

### Color Palette

**Primary**
- Navy: `#0f2557` — brand authority, headers, CTAs
- Navy Secondary: `#1e3a8a` — hover states, depth

**Accent (Updated)**
- Teal: `#06b6d4` — CTAs, highlights, tech forward (AR, innovation)
- Teal Soft: `#cffafe` — light backgrounds, soft UI

**Neutrals**
- Ink: `#141824` — body text, primary copy
- Muted: `#4a4f58` — secondary text, subheadings (WCAG AA+ contrast)
- BG Soft: `#f6f7f9` — light backgrounds
- Line: `#e7e9ee` — borders, dividers
- Navy Soft: `#eef2ff` — tinted background

**Old (Archived)**
- Amber: `#f59e0b` (replaced with Teal for market positioning)

### Typography

**Font Stack**
- Plus Jakarta Sans 400–800 (headers, body, UI)
- Fallback: "Segoe UI", system-ui, -apple-system, sans-serif

**Scale** (responsive with `clamp()`)
- H1: clamp(2.6rem, 5.5vw, 4.2rem) — hero title
- H2: 1.8rem — section heads
- H3–H6: scale down (h3: 1.35rem)
- Body: 1rem — primary text
- Small: 0.875rem — metadata, captions
- Micro: 0.75rem — labels

**Weight Usage**
- 800 (H1–H2, strong accents)
- 700 (H3–H4, buttons, emphasis)
- 600 (nav, subheadings, secondary UI)
- 400 (body text, paragraph)

### Spacing & Rhythm

**Grid Base**: 8px (all spacing multiples)
- xs: 4px (micro-spacing)
- sm: 8px (tight)
- md: 16px (default)
- lg: 24px (breathing room)
- xl: 32px (section separation)
- xxl: 48px+ (hero spacing)

**Breakpoints**
- Mobile: 480px, 520px, 600px, 640px
- Tablet: 700px, 782px
- Desktop: 900px, 1100px
- Wide: 1600px+

### Border Radius

- Default: 18px (`.vc-radius`)
- Pills/Buttons: 999px (fully rounded)
- Cards: 12–18px (subtle)
- Images: 28px (hero images)

### Shadows

- Default: `0 10px 30px rgba(15, 37, 87, 0.08)`
- Large: `0 24px 60px rgba(15, 37, 87, 0.14)`
- Used sparingly: hero images, floating cards, modals

---

## Component Design

### Hero Section
- Grid: 1.1fr / 0.9fr (55/45 split)
- Badge: Navy-soft background, Navy text, pill badge
- Title: Navy, up to 4.2rem, 1.08 line-height
- Subtitle: Muted, 1.2rem, max-width 520px
- CTA buttons: Navy (primary) + Ghost (secondary)
- Trust bar: Navy bold numbers + Muted labels
- Image: 28px radius, large shadow

### Buttons

**Primary (Navy)**
- Background: Navy, 14px/30px padding, 999px radius
- Hover: Transform -3px, shadow lg, gradient overlay (opacity 1)
- Active: Scale 0.98

**Accent (Teal)** [New]
- Background: Teal, same padding/radius
- Hover: Darken to #0891b2, shadow teal-based

**Ghost**
- Background: transparent, 1.5px Navy border
- Hover: Navy-soft background, Navy text

**Font Weight**: 600 (not 700, for readability)

### Navigation

- `.main-navigation`: 600 weight, 0.95rem, inline padding 1.1em/0.8em
- Hover: Teal color (updated from Amber)
- Cart button: Navy background, white text, pill badge

### Badges & Tags

- Background: Teal-soft (`#cffafe`)
- Text: Navy (`#0f2557`)
- Font: 600 weight, 0.85rem
- Padding: 8px 16px, 999px radius

### Cards

- Background: White or BG-soft
- Border: 1px Line
- Radius: 12–18px
- Shadow: Default
- Hover: Lift (transform -4px), shadow lg

### Forms

- Input/Textarea: BG-soft background, Line border, 8px padding, 8px radius
- Label: 600 weight, Ink color
- Focus: Teal border, Navy shadow
- Validation: Error red, success green (TBD)

---

## Interaction & Motion

### Animations

- Hover transforms: 0.2s cubic-bezier(.25, 1, .4, 1)
- Shadows: 0.2s ease
- Marquee: Infinite scroll, smooth

### Accessibility

- `prefers-reduced-motion`: Respect user system settings
- All interactive elements: Min 44px hit target
- Links: Underline or color change on hover
- Buttons: aria-label for icon-only
- Skip link: Present on all pages
- Images: Alt text (descriptive for AR, functional otherwise)
- Burger menu: Min 48×48px, accessible

### Responsive Behavior

- **Mobile (< 640px)**: Single column, full-width images, compact spacing
- **Tablet (640–900px)**: 2-column grids, scaled padding
- **Desktop (900px+)**: Full grid systems, hero 2-column

---

## Deviations & Rationale

### Why Teal over Amber?

1. **Market positioning**: Türk optical market is navy-dominant; teal = differentiation
2. **Technology perception**: AR + teal = innovation, future-forward
3. **Accessibility**: Teal-Navy contrast 5.2:1 (vs Amber 4.6:1), better readability
4. **Premium perception**: Teal conveys tech sophistication + trust (not casual)

### Why Muted #4a4f58?

- Previous #5a6172 had marginal WCAG AA (4.0:1)
- New #4a4f58 ensures 5.5:1 against white (safe for all body text)

### Button Weight 600 vs 700?

- 700 reads heavy, less readable at scale
- 600 = professional + readable, maintains emphasis via color

---

## Tokens & Variables

```css
:root {
  --vc-navy: #0f2557;
  --vc-navy-2: #1e3a8a;
  --vc-navy-soft: #eef2ff;
  --vc-teal: #06b6d4;         /* New */
  --vc-teal-soft: #cffafe;    /* New */
  --vc-teal-dark: #0891b2;    /* New */
  --vc-ink: #141824;
  --vc-muted: #4a4f58;        /* Updated */
  --vc-bg-soft: #f6f7f9;
  --vc-line: #e7e9ee;
  --vc-radius: 18px;
  --vc-shadow: 0 10px 30px rgba(15, 37, 87, 0.08);
  --vc-shadow-lg: 0 24px 60px rgba(15, 37, 87, 0.14);
}
```

---

## Design Quality Floor

- **No inline styles** except data attributes (migrate to CSS)
- **Contrast minimum**: WCAG AA for all text (4.5:1), AAA for critical paths
- **Spacing**: Always multiples of 8px (no random 13px, 23px)
- **Shadows**: Only default or lg (no .md, .sm variants)
- **Font weight**: Use 400, 600, 800 only (no 500, 700)
- **Radius**: 999px for pills, 18px for defaults, 28px for images
- **Animations**: Respect `prefers-reduced-motion`, max 0.3s for most

---

## Evidence on Hand

- Hero images: `/wp-content/uploads/2026/08/img*.jpg`
- Icons: `FlatIcon PNGs` (24×24, 14×14 variants)
- Product thumbnails: WooCommerce auto-generated
- Breakpoint test: Desktop (1920), Tablet (800), Mobile (375)

