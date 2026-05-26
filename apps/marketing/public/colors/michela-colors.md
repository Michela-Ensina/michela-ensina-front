# Michela Ensina — Color Tokens

This document translates the official Michela Ensina color palette into semantic design tokens for the front-end project.

Use these colors as the source of truth for `global.css`, component styling, and UI decisions.

## Official Palette

| Name | Hex | RGB | Recommended Use |
|---|---:|---:|---|
| Azul Escuro | `#233695` | `35, 54, 149` | Primary brand color, text emphasis, icons, strong borders |
| Roxo Escuro | `#4D2375` | `77, 35, 117` | Strong backgrounds, CTA sections, brand depth |
| Roxo Médio | `#7E4CA5` | `126, 76, 165` | Secondary accents, hover states, section highlights |
| Lavanda | `#B57EDC` | `181, 126, 220` | Accent color, soft decorative elements |
| Lilás | `#DBB5EE` | `219, 181, 238` | Soft backgrounds, cards, subtle decorative areas |
| Lilás Claro | `#E4CEF4` | `228, 206, 244` | Page backgrounds, light sections, large soft surfaces |
| Branco | `#FFFEFA` | `255, 254, 250` | Main card background, readable content areas, off-white base |

## CSS Variable Naming

Use semantic variables first, and reference raw palette variables only inside the design system layer.

```css
:root {
  /* Raw palette */
  --me-blue-dark: #233695;
  --me-purple-dark: #4d2375;
  --me-purple: #7e4ca5;
  --me-lavender: #b57edc;
  --me-lilac: #dbb5ee;
  --me-lilac-light: #e4cef4;
  --me-white: #fffefa;

  /* Semantic colors */
  --color-background: var(--me-lilac-light);
  --color-surface: var(--me-white);
  --color-surface-soft: var(--me-lilac);
  --color-primary: var(--me-blue-dark);
  --color-secondary: var(--me-purple-dark);
  --color-accent: var(--me-purple);
  --color-accent-soft: var(--me-lavender);
  --color-text: var(--me-blue-dark);
  --color-text-muted: var(--me-purple);
  --color-border: var(--me-purple);
  --color-border-soft: var(--me-lilac);
}
```

## Usage Rules

- Do not hardcode hex values in components.
- Use semantic tokens such as `--color-primary`, `--color-surface`, and `--color-text`.
- Use `#233695` / `--me-blue-dark` for strong contrast, icons, important text, and key visual anchors.
- Use `#FFFEFA` / `--me-white` for readable surfaces and cards.
- Use lilac and lavender tones for large background areas and soft visual identity.
- Use dark purple sparingly for high-emphasis sections, CTAs, and strong brand moments.
- Avoid placing light text over lavender or lilac backgrounds unless contrast is tested.
- Avoid using too many purple tones in the same component. Prefer one strong color and one soft support color.

## Suggested Role Mapping

### Layout
- Page background: `--color-background`
- Section background: `--color-surface-soft`
- Card background: `--color-surface`

### Text
- Main text: `--color-text`
- Muted text: `--color-text-muted`
- Text on dark backgrounds: `--color-surface`

### Buttons
- Primary button background: `--color-secondary`
- Primary button text: `--color-surface`
- Primary button hover: `--color-accent`
- Secondary button background: `--color-surface`
- Secondary button text: `--color-primary`
- Secondary button border: `--color-primary`

### Decorative Elements
- Icons: `--color-primary`
- Stars / sparkles: `--color-accent-soft`
- Soft shapes: `--color-border-soft`
- Strong decorative shapes: `--color-secondary`

## Tailwind Mapping Suggestion

If using Tailwind CSS v4 with CSS variables, map the variables through theme tokens instead of repeating raw hex values.

```css
@theme {
  --color-background: var(--color-background);
  --color-surface: var(--color-surface);
  --color-primary: var(--color-primary);
  --color-secondary: var(--color-secondary);
  --color-accent: var(--color-accent);
  --color-accent-soft: var(--color-accent-soft);
  --color-text: var(--color-text);
  --color-muted: var(--color-text-muted);
  --color-border: var(--color-border);
}
```

## Visual Direction

The color system should feel:

- soft but confident;
- educational but not childish;
- friendly and human;
- purple/lilac-driven, with blue as the stability and contrast anchor.

The design should not become overly saturated. Large areas should usually use the lighter colors, while darker colors should guide hierarchy, CTAs, icons, and emphasis.
