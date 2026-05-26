# Michela Ensina — Typography System

This document defines the typography system for the Michela Ensina project, based on the provided brand assets.

The goal is to create a clean, scalable, and consistent type system using semantic tokens.

---

## Font Families

### Primary Display (Headings)
- **Font:** Cherry Swash
- **Usage:** Titles, hero sections, branding highlights
- **Style:** Decorative, friendly, expressive

### Primary Text (Body)
- **Font:** Mulish
- **Usage:** Paragraphs, UI text, buttons, forms
- **Style:** Clean, modern, highly readable

---

## Font Setup (CSS)

```css
:root {
  --font-heading: "Cherry Swash", serif;
  --font-body: "Mulish", sans-serif;
}
```

---

## Typography Scale

Use a consistent scale to maintain hierarchy.

```css
:root {
  --text-xs: 0.75rem;   /* 12px */
  --text-sm: 0.875rem;  /* 14px */
  --text-base: 1rem;    /* 16px */
  --text-lg: 1.125rem;  /* 18px */
  --text-xl: 1.25rem;   /* 20px */
  --text-2xl: 1.5rem;   /* 24px */
  --text-3xl: 1.875rem; /* 30px */
  --text-4xl: 2.25rem;  /* 36px */
  --text-5xl: 3rem;     /* 48px */
}
```

---

## Font Weights

Mulish supports multiple weights. Recommended:

```css
:root {
  --font-light: 300;
  --font-regular: 400;
  --font-medium: 500;
  --font-semibold: 600;
  --font-bold: 700;
}
```

Cherry Swash is typically used in:
- 400 (normal)
- 700 (bold, if available)

---

## Line Heights

```css
:root {
  --leading-tight: 1.2;
  --leading-normal: 1.5;
  --leading-relaxed: 1.7;
}
```

---

## Letter Spacing

```css
:root {
  --tracking-tight: -0.02em;
  --tracking-normal: 0;
  --tracking-wide: 0.02em;
}
```

---

## Semantic Typography Tokens

```css
:root {
  --heading-font: var(--font-heading);
  --body-font: var(--font-body);

  --heading-weight: var(--font-bold);
  --body-weight: var(--font-regular);

  --heading-line-height: var(--leading-tight);
  --body-line-height: var(--leading-normal);
}
```

---

## Usage Rules

### Headings
- Always use **Cherry Swash**
- Use larger sizes (2xl → 5xl)
- Keep line-height tighter
- Avoid long paragraphs

### Body Text
- Always use **Mulish**
- Use `text-base` or `text-lg`
- Prioritize readability

### Buttons & UI
- Use **Mulish**
- Weight: `500` or `600`
- Slight letter spacing can be applied

### Contrast Rule
- Never use decorative font (Cherry Swash) for long text
- Never mix both fonts in the same sentence

---

## Example Usage

```css
h1, h2, h3 {
  font-family: var(--heading-font);
  font-weight: var(--heading-weight);
  line-height: var(--heading-line-height);
}

body, p, span, button {
  font-family: var(--body-font);
  font-weight: var(--body-weight);
  line-height: var(--body-line-height);
}
```

---

## Visual Direction

Typography should feel:

- welcoming and human
- educational but not rigid
- expressive in headings
- extremely readable in body text

The contrast between Cherry Swash and Mulish is key to the identity:
- Cherry = personality
- Mulish = usability

Balance both carefully.
