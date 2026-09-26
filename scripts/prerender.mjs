// Post-build step. This is a client-rendered SPA, so the HTML the server sends
// is an empty <div id="root"> — and crawlers, link-preview bots and AI
// fetchers (which read the raw response and don't run JavaScript) see nothing.
// For each route this bakes two things into its own static index.html under
// dist/:
//   1. title / description / canonical / og tags — react-helmet-async only
//      sets these client-side. Mirrors the Helmet block in each page
//      component; keep both in sync.
//   2. the page's real content, rendered by the actual React components (so it
//      can't drift from the site), in a hidden #prerender block. Browsers never
//      show it — the SPA renders as normal into #root — but anything reading
//      the raw HTML gets the full text. See toReadableHtml() below.
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import { createServer } from 'vite';

process.env.NODE_ENV = 'production';

const __dirname = dirname(fileURLToPath(import.meta.url));
const PROJECT_ROOT = join(__dirname, '..');
const DIST_DIR = join(__dirname, '../dist');
const SITE_URL = 'https://cynthiatanawi.design';

const ROUTES = [
  {
    path: '/',
    title: 'Cynthia Tanawi — Product Designer',
    description:
      "Cynthia Tanawi's design portfolio — product and graphic design work bridging storytelling, collaboration, and fearless problem-solving.",
    ogType: 'website',
    ogImage: '/cynthia-og-image.jpg',
  },
  {
    path: '/work/tfam-app',
    title: 'TFAM App — Cynthia Tanawi',
    description:
      'I redesigned the Taipei Fine Arts Museum app around three moments in the museum journey: plan, wander, and remember.',
    ogType: 'article',
    ogImage: '/tfam-app-og-image.jpg',
  },
  {
    path: '/work/classroom-quest',
    title: 'Classroom Quest — Cynthia Tanawi',
    description: 'A gamified experience that helped teachers discover myViewBoard 3.0 through familiar classroom challenges.',
    ogType: 'article',
    ogImage: '/classroom-quest-og-image.jpg',
  },
  {
    path: '/visual-design/education-brochure-2026',
    title: 'Education Brochure 2026 — Cynthia Tanawi',
    description: 'A modular brochure system that makes the ViewSonic education ecosystem clearer across global markets.',
    ogType: 'article',
    ogImage: '/cynthia-og-image.jpg',
  },
];

function escapeHtml(str) {
  return str.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

function buildHead(route) {
  const url = `${SITE_URL}${route.path}`;
  const title = escapeHtml(route.title);
  const description = escapeHtml(route.description);
  const image = `${SITE_URL}${route.ogImage}`;

  return [
    `<title>${title}</title>`,
    `<link rel="canonical" href="${url}" />`,
    `<meta name="description" content="${description}" />`,
    `<meta property="og:type" content="${route.ogType}" />`,
    `<meta property="og:title" content="${title}" />`,
    `<meta property="og:description" content="${description}" />`,
    `<meta property="og:image" content="${image}" />`,
    `<meta name="twitter:card" content="summary_large_image" />`,
    `<meta name="twitter:title" content="${title}" />`,
    `<meta name="twitter:description" content="${description}" />`,
    `<meta name="twitter:image" content="${image}" />`,
  ].join('\n    ');
}

// The page sits under a <Suspense> (for the lazy-loaded case-study routes), so
// React streams its content as a hidden late segment — <div hidden id="S:0">
// at the end of the output, plus a script that swaps it into place in a
// browser. There's no browser here, so splice each segment back into the
// placeholder it belongs to.
function spliceStreamedSegments(html) {
  let out = html;
  let match;
  while ((match = /<div hidden id="S:(\d+)">/.exec(out))) {
    const id = match[1];
    const contentStart = match.index + match[0].length;
    // The segment closes immediately before the swap script.
    const contentEnd = out.indexOf('</div><script', contentStart);
    if (contentEnd === -1) throw new Error(`Streamed segment S:${id} has no closing tag`);
    const content = out.slice(contentStart, contentEnd);
    out = out.slice(0, match.index) + out.slice(contentEnd + '</div>'.length);

    const placeholder = new RegExp(`<!--\\$\\?--><template id="B:${id}"></template>[\\s\\S]*?<!--/\\$-->`);
    if (!placeholder.test(out)) throw new Error(`No placeholder found for streamed segment S:${id}`);
    out = out.replace(placeholder, () => content);
  }
  return out;
}

// Reduces rendered markup to what a reader needs: headings, paragraphs,
// lists, links and image alt text. Drops classes/inline styles/ids (thousands
// of Tailwind + framer-motion attributes an LLM would otherwise burn context
// on, and ids that would collide with the live page's), and everything that
// carries no text (svg, video, scripts). Regex-based, which is safe here
// because React's serializer output is always well-formed and escapes `<`,
// `>` and quotes inside attribute values.
function toReadableHtml(html) {
  let out = html
    .replace(/<!--[\s\S]*?-->/g, '')
    .replace(/<(script|style|svg|video|canvas|template|noscript|title)\b[\s\S]*?<\/\1>/g, '')
    .replace(/<(link|meta|source)\b[^>]*>/g, '')
    .replace(/<img\b[^>]*?\balt="([^"]+)"[^>]*>/g, (_, alt) => `[Image: ${alt}]`)
    .replace(/<img\b[^>]*>/g, '')
    .replace(/<\/?span\b[^>]*>/g, '')
    .replace(/<([a-z][a-z0-9]*)\b([^>]*)>/gi, (_, tag, attrs) => {
      const href = tag.toLowerCase() === 'a' ? /\bhref="([^"]*)"/.exec(attrs) : null;
      return href ? `<a href="${href[1]}">` : `<${tag}>`;
    });

  // Wrapper elements emptied by the removals above.
  const emptyElement = /<([a-z][a-z0-9]*)\b[^>]*>\s*<\/\1>/gi;
  let previous;
  do {
    previous = out;
    out = out.replace(emptyElement, '');
  } while (out !== previous);

  return out
    .replace(/<\/(div|p|li|ul|ol|h[1-6]|section|header|footer|main|nav|article|button)>/g, '$&\n')
    .replace(/<br\s*\/?>/g, '$&\n')
    .trim();
}

// The build's own vite config renders the real components; no HTTP server is
// started (middleware mode) and HMR/watching are off so the process exits.
const vite = await createServer({
  root: PROJECT_ROOT,
  mode: 'production',
  appType: 'custom',
  logLevel: 'error',
  server: { middlewareMode: true, hmr: false, watch: null },
  optimizeDeps: { noDiscovery: true, include: [] },
});

try {
  const { renderRoute } = await vite.ssrLoadModule('/src/entry-server.jsx');
  const template = readFileSync(join(DIST_DIR, 'index.html'), 'utf-8');

  for (const route of ROUTES) {
    const content = toReadableHtml(spliceStreamedSegments(await renderRoute(route.path)));
    if (content.length < 500) throw new Error(`Suspiciously little content prerendered for ${route.path}`);

    // Function replacers throughout: a string replacement would interpret `$`
    // sequences that can legitimately appear in page text.
    const html = template
      .replace(
        '</head>',
        () =>
          `    ${buildHead(route)}\n` +
          '    <style>[data-prerender]{display:none}</style>\n' +
          '    <noscript><style>[data-prerender]{display:block}</style></noscript>\n' +
          '  </head>',
      )
      // Outside #root on purpose: React clears #root on mount, and this is
      // only for readers that never run the app.
      .replace('</body>', () => `    <div id="prerender" data-prerender>\n${content}\n    </div>\n  </body>`);

    const outDir = route.path === '/' ? DIST_DIR : join(DIST_DIR, route.path);
    mkdirSync(outDir, { recursive: true });
    writeFileSync(join(outDir, 'index.html'), html);
    console.log(`Prerendered ${route.path} (${Math.round(content.length / 1024)} KB of content)`);
  }
} finally {
  await vite.close();
}
