# CLAUDE.md

## Project Overview
Cynthia's design portfolio — a personal site for a product/graphic designer.
The signature feature is an animated hero character that changes mood
(sleeping / awake / thinking) based on time of day, whether the visitor is
scrolling, and hover state. Feel: playful but polished. Desktop and mobile both
matter; the layout is responsive.

**Current state vs. direction:** the site is planned to be MULTI-PAGE — a
landing page plus dedicated sub-pages for individual case studies / projects.
Right now only the landing page is being built, so the code is currently a
single page with no router yet. Expect routing and sub-pages to be added; build
in a way that leaves room for that.

## Tech Stack
- **Vite** — build tool and dev server.
- **React 19** — UI library.
- **JavaScript (JSX), NOT TypeScript** — this project is intentionally plain JS.
  Do not introduce TypeScript or `.ts` files without asking.
- **Tailwind CSS v4** — styling, via the `@tailwindcss/vite` plugin. Theme
  tokens (colors, fonts, animations) are defined in `src/index.css` under
  `@theme`.
- **framer-motion** — all animation.
- **oxlint** — the linter (config in `.oxlintrc.json`).
- **Package manager: npm** (there is a package-lock.json). Do not switch.

## Commands
- Install:    `npm install`
- Dev server: `npm run dev`      (http://localhost:5173)
- Lint:       `npm run lint`
- Build:      `npm run build`
- Preview:    `npm run preview`  (previews the production build locally)

## Validation — Definition of Done
There are no automated tests yet, and no TypeScript type-checking. Until there
are, a task is complete ONLY when:
- [ ] `npm run lint` passes with no errors
- [ ] `npm run build` succeeds
- [ ] The affected section has been checked in the browser (`npm run dev`),
      including a check that animations still respect reduced-motion

> Next step to strengthen this: the pure logic hooks (especially
> `useCharacterMood`) are written to be testable. Adding a test runner and a
> few tests for them would be the highest-value validation upgrade.

## Project Structure
- `src/main.jsx`       — entry point. Don't add logic here.
- `src/App.jsx`        — composes the page from section components, in order.
- `src/components/`     — one file per page section (`Header`, `Hero`,
                          `DesignPractice`, `CaseStudies`, `AboutMe`, `Footer`).
                          A section that grows complex gets its OWN folder with
                          sub-components (see `Hero/`, which has `character/`).
- `src/hooks/`         — reusable hooks, one concern each (time of day, scrolling,
                          eye tracking, mood). Keep them single-purpose.
- `src/assets/`        — SVGs and images, grouped by feature.
- `src/index.css`      — global styles AND the `@theme` design tokens.
- `scripts/`           — one-off maintenance scripts (e.g. SVG normalization).
                          Not part of the app build.

## Conventions
- **Style with theme tokens, not raw values.** Use `bg-paper`, `text-ink`,
  `text-sky-600`, etc. Avoid hardcoded arbitrary values like `bg-[#f8ab1c]` —
  if a color is needed and missing, ADD it as a token in `index.css` first.
- **Keep decision logic in pure hooks.** Hooks like `useCharacterMood` derive a
  result from inputs with no side effects, so behavior stays predictable and
  testable. Follow this pattern for new behavior.
- **Always respect reduced motion.** Read `useReducedMotion()` and provide a
  still fallback for any new animation. This is a hard rule, not a nicety.
- **One page section = one component** in `src/components/`. Compose them in
  `App.jsx`.
- Use relative imports as the existing files do.
- **Give every new page SEO tags** (title + description via `react-helmet-async`)
  as part of building it — see the SEO section.

## SEO
This is a public portfolio, so it needs to be findable on Google and to
preview nicely when the link is shared. SEO tags are managed with
`react-helmet-async`.
- **Every page must set its own `<title>` and meta description** via a Helmet
  block. A new page without these is incomplete.
- The site has a sensible DEFAULT title / description / social-preview
  (Open Graph) image set once at the app level; pages override the title and
  description for their own content.
- Do not put SEO text in raw `index.html` for per-page content — use Helmet so
  each page controls its own.
- Deploy-time SEO files (`robots.txt`, `sitemap.xml`, final preview image) are
  handled near launch, not per-page — but keep the sitemap in mind when adding
  new routes.

## Patterns to AVOID
- Do NOT add TypeScript or a state-management library — this project is
  intentionally plain JS and small enough not to need one. (A router IS
  expected later, once sub-pages begin — see Overview.)
- Do NOT hardcode colors as arbitrary Tailwind values; use / add theme tokens.
- Do NOT create new asset folders that duplicate existing ones. Assets live
  under `src/assets/<feature>/`. (Note: `decoration/` and `decorations/`
  currently overlap — consolidate rather than adding a third.)
- Do NOT put logic in `main.jsx` or bloat `App.jsx`.

## Constraints / Guardrails
- Never commit secrets or API keys.
- Treat `package-lock.json` as npm-managed — don't hand-edit it.
- Don't change `vite.config.js` or `.oxlintrc.json` without explaining why.
