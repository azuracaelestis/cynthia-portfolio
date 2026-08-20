import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

// React Router doesn't scroll to a URL hash on client-side navigation the
// way a real page load does. Use this once in any page that has section
// ids meant to be linked to (e.g. Home, which Header's nav links target
// from other pages via "/#work" etc).
export function useScrollToHash() {
  const { hash } = useLocation();

  useEffect(() => {
    if (!hash) return;
    // Wait a tick so the page's own content has mounted before we look
    // for the target element.
    const id = hash.slice(1);
    const timeoutId = setTimeout(() => {
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 0);
    return () => clearTimeout(timeoutId);
  }, [hash]);
}
