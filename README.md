# ReinstateLabs

Frontend for ReinstateLabs — a technology studio building software, AI systems,
cloud infrastructure and automation.

Next.js 15 (App Router) · React 19 · TypeScript · Tailwind CSS v4 · Motion.

## Running it

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # production build
npm start          # serve the production build
npm run typecheck  # tsc --noEmit
```

## Pages

| Route               | Contents                                                            |
| ------------------- | ------------------------------------------------------------------- |
| `/`                 | Hero, capabilities index, position, process, stack, CTA             |
| `/what-we-do`       | Seven capability blocks, architecture diagram, stack, process, CTA  |
| `/book-appointment` | What happens next, full enquiry form                                |
| `/contact`          | Contact channels, short message form                                |
| `/does-not-exist`   | Branded 404                                                          |

`robots.txt`, `sitemap.xml` and the Open Graph image are generated from
`src/app/robots.ts`, `src/app/sitemap.ts` and `src/app/opengraph-image.tsx`.

## Design system

Tokens live in `src/styles/globals.css` under `@theme` — there are no colour or
type values hard-coded in components except inside the SVG diagrams.

- **Ground** `--color-ink` `#08080a`, with `ink-raised` / `ink-sunken` used to
  break the page into movements.
- **Text** `paper` → `paper-dim` → `mute` → `mute-deep`. Every tier clears
  4.5:1 against the ground.
- **Accent** a single ember `#e2552b`, reserved for index numbers, rules,
  active states and one arc in the closing CTA.
- **Type** Archivo (display), Instrument Sans (body), JetBrains Mono (technical
  labels). Display sizes are fluid `clamp()` utilities: `display-xl` … `display-sm`.
- **Utilities** `shell`, `label`, `lede`, `tech-grid`, `noise-layer`, `link-rule`.

## Structure

```
src/
  app/            routes, route handler, metadata, robots, sitemap, OG image
  components/
    animations/   ScrollReveal, AnimatedText, ScrollHighlightText
    hero/         Hero and its generative SVG lattice
    layout/       Section, Footer, GridLines, Loader, PageTransition
    navigation/   Navbar, MobileMenu, Wordmark
    process/      scroll-driven ProcessTimeline
    sections/     composed page sections
    services/     ServiceIndex and the schematic set
    ui/           MagneticButton, TextLink, Field, Marquee, SectionHeading
  lib/            site config, content model, motion presets, inquiry validation
  styles/         globals.css (design tokens)
```

All copy lives in `src/lib/content.ts` and `src/lib/site.ts`, so the homepage
summary and the What We Do deep-dive cannot drift apart.

## Motion

Three tiers, applied deliberately rather than everywhere:

- **Above the fold** runs on CSS (`rl-line-in`, `rl-fade-up`) so the hero paints
  with the stylesheet instead of waiting for hydration.
- **Below the fold** runs on Motion via `ScrollReveal` / `AnimatedText`, which
  tag themselves `data-rl-reveal`; a `<noscript>` rule pins those open so the
  page still reads without JavaScript.
- **Interaction** is CSS transitions, except the two pointer-driven pieces (the
  magnetic button and the cursor-anchored service schematic).

`prefers-reduced-motion: reduce` collapses every animation and transition
globally, and each Motion component checks `useReducedMotion()` so it renders
its resting state directly.

## Forms

`src/lib/inquiry.ts` holds the field shape and the validation rules. Both the
appointment and contact forms and the `POST /api/inquiries` route handler run
the same `validateInquiry`, so the server cannot be bypassed by disabling
client-side checks.

The route handler validates and logs. **Delivery is not wired up** — connect an
email provider or CRM inside `src/app/api/inquiries/route.ts` where the
`console.info` call sits.

## Before going live

- `src/lib/site.ts` carries placeholder contact details and social URLs
  (`hello@reinstatelabs.com`, `+91 98765 43210`, `linkedin.com/company/reinstatelabs`,
  and the matching GitHub and X handles). Replace them with the real ones.
- `site.url` is used for canonical URLs, the sitemap and `robots.txt`.
