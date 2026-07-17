import { useEffect, useState } from 'react';

export function useHasScrolled(threshold = 8) {
  const [hasScrolled, setHasScrolled] = useState(false);

  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        setHasScrolled(window.scrollY > threshold);
        ticking = false;
      });
    };
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [threshold]);

  return hasScrolled;
}
