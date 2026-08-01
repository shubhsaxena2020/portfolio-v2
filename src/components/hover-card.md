# Hover Micro-Interactions Spec

Recommended Tailwind utility classes for interactive elements using existing design tokens (`text-accent`, `border-accent`, `border-border`, `bg-background`).

## 1. Case-Study `<article>` Elements
Apply to each project `<article>` or wrapper card element for a tasteful lift, shadow, and accent border highlight:

```text
transition-all duration-300 ease-out hover:-translate-y-1 hover:border-accent/40 hover:shadow-lg hover:shadow-accent/5
```

If the card has an internal title or arrow icon, wrap the `<article>` with `group` and style child elements:
- Title / Headline: `group-hover:text-accent transition-colors duration-200`
- Icon / Arrow: `group-hover:translate-x-1 transition-transform duration-200`

## 2. Contact `<a>` Links
Apply to contact links or social icons for subtle color shifts and smooth animated underline/indicators:

```text
inline-flex items-center gap-2 text-foreground hover:text-accent underline underline-offset-4 decoration-border hover:decoration-accent transition-colors duration-200
```

For card-style contact links using `group`:
- Link container: `group border border-border hover:border-accent/50 p-4 rounded-lg transition-all duration-200 hover:-translate-y-0.5`
- Icon / Label: `group-hover:text-accent transition-colors duration-200`
