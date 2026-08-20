import { useEffect, useRef, useState } from 'react';

// Distance (px) from the viewport top used as the trigger line for both
// sentinels — roughly matches the sticky nav's own resting offset.
const REFERENCE_LINE = 140;
const BUFFER = 8;

// Tracks which of three phases ('before' | 'visible' | 'after') a piece of
// tracked content is in relative to the viewport, based on scroll direction
// and two sentinel elements marking its start/end. A hysteresis buffer keeps
// the phase from flickering when scroll settles near a boundary.
export function useNavScrollPhase(startRef, endRef) {
  const [phase, setPhase] = useState('before');
  const lastScrollY = useRef(typeof window === 'undefined' ? 0 : window.scrollY);
  const lastDir = useRef('down');
  const frameRef = useRef(null);

  useEffect(() => {
    function measure() {
      frameRef.current = null;
      const currentY = window.scrollY;
      const dir = currentY > lastScrollY.current ? 'down' : currentY < lastScrollY.current ? 'up' : lastDir.current;
      lastScrollY.current = currentY;
      lastDir.current = dir;

      const startTop = startRef.current?.getBoundingClientRect().top;
      const endTop = endRef.current?.getBoundingClientRect().top;
      if (startTop == null || endTop == null) return;

      setPhase((prev) => {
        if (dir === 'down') {
          if (prev === 'before' && startTop <= REFERENCE_LINE - BUFFER) return 'visible';
          if (prev === 'visible' && endTop <= REFERENCE_LINE - BUFFER) return 'after';
          return prev;
        }
        if (prev === 'after' && endTop >= REFERENCE_LINE + BUFFER) return 'visible';
        if (prev === 'visible' && startTop >= REFERENCE_LINE + BUFFER) return 'before';
        return prev;
      });
    }

    function handleScroll() {
      if (frameRef.current) return;
      frameRef.current = requestAnimationFrame(measure);
    }

    measure();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (frameRef.current) cancelAnimationFrame(frameRef.current);
    };
  }, [startRef, endRef]);

  return phase;
}
