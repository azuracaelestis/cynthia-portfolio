import { useLayoutEffect } from 'react';
import { useLocation } from 'react-router-dom';

// React Router doesn't reset scroll position on client-side navigation the
// way a real page load does, so navigating to a new route can land the
// visitor wherever their scrollY happened to be on the previous page.
// Resets to the top on every pathname change, unless the URL has a hash —
// hash navigation is handled separately by useScrollToHash.
//
// Uses useLayoutEffect (not useEffect) so the reset happens synchronously
// before the browser paints the new route — otherwise there's a visible
// flash of the old scroll position first. `behavior: 'instant'` overrides
// the global `html { scroll-behavior: smooth }` (index.css) for this one
// call, so the reset is an instant jump rather than a visible smooth-scroll
// animation traveling from the old position back up to the top.
export function useScrollToTopOnNavigate() {
  const { pathname, hash } = useLocation();

  useLayoutEffect(() => {
    if (hash) return;
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, [pathname, hash]);
}
