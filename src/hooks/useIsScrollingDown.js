import { useEffect, useState } from 'react';

// True while the visitor is scrolling DOWN, and for `settleDelay` ms after the
// last downward scroll event. Any upward scroll turns it off immediately. It is
// the "thinking" trigger: she only starts thinking as the visitor scrolls down
// from the hero toward the content, never on the way back up.
export function useIsScrollingDown(settleDelay = 1800) {
  const [isScrollingDown, setIsScrollingDown] = useState(false);

  useEffect(() => {
    let lastY = window.scrollY;
    let timeoutId;

    const handleScroll = () => {
      const y = window.scrollY;
      if (y > lastY) {
        setIsScrollingDown(true);
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => setIsScrollingDown(false), settleDelay);
      } else if (y < lastY) {
        clearTimeout(timeoutId);
        setIsScrollingDown(false);
      }
      lastY = y;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(timeoutId);
    };
  }, [settleDelay]);

  return isScrollingDown;
}
