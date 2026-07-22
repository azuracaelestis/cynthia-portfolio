# Cynthia Tanawi — Portfolio

Personal design portfolio, live at **[cynthiatanawi.design](https://cynthiatanawi.design)**.

The signature feature is an animated hero character whose mood shifts between
**sleeping**, **awake**, and **thinking** based on time of day, scroll
behavior, and hover state — a small piece of craft meant to make the site
itself feel like a designed product, not just a page listing one.

## Tech stack

- **[Vite](https://vite.dev)** — build tool and dev server
- **[React 19](https://react.dev)** — UI library
- **JavaScript (JSX)** — intentionally plain JS, no TypeScript
- **[Tailwind CSS v4](https://tailwindcss.com)** — styling, via `@tailwindcss/vite`; design tokens (colors, fonts, animation) live in `src/index.css` under `@theme`
- **[Framer Motion](https://motion.dev)** — all animation and scroll-driven interaction
- **[oxlint](https://oxc.rs)** — linting
- **npm** — package manager

## Getting started

\`\`\`bash
npm install
npm run dev       # http://localhost:5173
\`\`\`

Other scripts:

\`\`\`bash
npm run build     # production build
npm run preview   # preview the production build locally
npm run lint       # oxlint
\`\`\`

## Project structure

\`\`\`
src/
├── main.jsx           # entry point
├── App.jsx            # composes the page from section components, in order
├── components/        # one file per page section (Header, Hero, DesignPractice,
│                       # CaseStudies, AboutMe, Footer). A section that grows
│                       # complex gets its own folder — see Hero/, which has
│                       # its own character/ sub-directory.
├── hooks/              # single-purpose hooks (time of day, scroll state,
│                       # eye tracking, character mood, media queries, etc.)
├── assets/             # SVGs and images, grouped by feature/section
└── index.css           # global styles + @theme design tokens
\`\`\`

## Responsive approach

Mobile and desktop are treated as **separate experiences for the same
content**, not one layout scaled down. In practice that means:

- Interactions are re-evaluated per breakpoint rather than ported as-is —
  hover-driven effects don't survive onto touch, and scroll-heavy effects
  (like sticky card stacking) are reserved for sections with room to spare,
  swapped for something calmer wherever a primary action (like a case
  study's "View" button) needs to stay reachable.
- Mobile gets its own decoration and character-reveal logic (see
  \`DecorationsMobile.jsx\`, \`useSeenAtRest\`), gated so a visitor actually
  *sees* a resting state before the site asks anything of them.
- Most components branch mobile vs. desktop behavior with Tailwind's \`lg:\`
  breakpoint and small \`useMediaQuery\` checks — kept inside the existing
  hooks-based architecture rather than duplicated components.

## Conventions

- **Style with theme tokens, not raw values** (\`bg-paper\`, \`text-ink\`,
  \`text-sky-600\`, etc.) — add a token to \`index.css\` if one is missing rather
  than hardcoding an arbitrary value.
- **Decision logic lives in pure hooks.** \`useCharacterMood\` and friends
  derive a result from inputs with no side effects, so behavior stays
  predictable and (eventually) testable.
- **Always respect reduced motion.** Every animation reads
  \`useReducedMotion()\` and provides a still fallback — this is a hard rule.
- **One page section = one component**, composed in \`App.jsx\`.

See \`CLAUDE.md\` for the fuller set of working conventions, current
direction (a router + per-case-study sub-pages is planned), and the
definition of done for a change.

## Deployment

Deployed on [Vercel](https://vercel.com), connected to this repo's \`main\`
branch. Custom domain configured via Namecheap DNS pointing at Vercel.
