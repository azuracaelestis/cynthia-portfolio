import { useEffect, useState } from 'react';

export function useIsScrolling(settleDelay = 700) {
  const [isScrolling, setIsScrolling] = useState(false);

  useEffect(() => {
    let timeoutId;
    const handleScroll = () => {
      setIsScrolling(true);
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => setIsScrolling(false), settleDelay);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(timeoutId);
    };
  }, [settleDelay]);

  return isScrolling;
}
