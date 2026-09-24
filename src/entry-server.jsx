import { prerenderToNodeStream } from 'react-dom/static';
import { StaticRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { AppLayout } from './App.jsx';

// Build-time only (see scripts/prerender-meta.mjs) — never shipped to the
// browser. Renders a route to plain HTML so crawlers and AI fetchers, which
// read the raw response without running JavaScript, get the real page content
// instead of an empty <div id="root">. `prerender` (not renderToString) is
// used because it waits for the lazy-loaded case-study pages to resolve.
export async function renderRoute(url) {
  const { prelude } = await prerenderToNodeStream(
    <HelmetProvider context={{}}>
      <StaticRouter location={url}>
        <AppLayout />
      </StaticRouter>
    </HelmetProvider>,
  );

  const chunks = [];
  for await (const chunk of prelude) chunks.push(chunk);
  return Buffer.concat(chunks).toString('utf-8');
}
