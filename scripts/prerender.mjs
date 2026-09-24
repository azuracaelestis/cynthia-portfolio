// Post-build step: bakes each route's title/description/canonical/og tags
// directly into a static index.html under dist/, so link-preview bots and
// crawlers that don't execute JS still see real metadata — react-helmet-async
// only sets these tags client-side, which is invisible to that class of bot.
// Mirrors the Helmet block in each page component; keep both in sync.
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const DIST_DIR = join(__dirname, '../dist');
const SITE_URL = 'https://cynthiatanawi.design';

const ROUTES = [
  {
    path: '/',
    title: 'Cynthia Tanawi — Product & Graphic Designer',
    description:
      "Cynthia Tanawi's design portfolio — product and graphic design work bridging storytelling, collaboration, and fearless problem-solving.",
    ogType: 'website',
    ogImage: '/cynthia-og-image.jpg',
  },
  {
    path: '/work/tfam-app',
    title: 'TFAM App — Cynthia Tanawi',
    description:
      'TFAM built a branding campaign, not a companion. An end-to-end redesign of the Taipei Fine Arts Museum app, focused on surfacing what was already there.',
    ogType: 'article',
    ogImage: '/tfam-app-og-image.jpg',
  },
  {
    path: '/work/classroom-quest',
    title: 'Classroom Quest — Cynthia Tanawi',
    description: 'A gamified experience that taught teachers about myViewBoard 3.0 by turning real classroom problems into play.',
    ogType: 'article',
    ogImage: '/classroom-quest-og-image.jpg',
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

const template = readFileSync(join(DIST_DIR, 'index.html'), 'utf-8');

for (const route of ROUTES) {
  const html = template.replace('</head>', `    ${buildHead(route)}\n  </head>`);
  const outDir = route.path === '/' ? DIST_DIR : join(DIST_DIR, route.path);
  mkdirSync(outDir, { recursive: true });
  writeFileSync(join(outDir, 'index.html'), html);
  console.log(`Prerendered meta for ${route.path}`);
}
