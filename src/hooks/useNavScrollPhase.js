import { useEffect, useRef, useState } from 'react';

// Distance (px) from the viewport top used as the trigger line for both
// sentinels — roughly matches the sticky nav's own resting offset.
const REFERENCE_LINE = 140;
const BUFFER = 8;

// Tracks which of three phases ('before' | 'visible' | 'after') a piece of
// tracked content is in relative to the viewport, based on scroll direction
// and two sentinel elements marking its start/end. A hysteresis buffer keeps
// the phase from flickering when scroll settles near a boundary.
//
// `startLine` is where the START sentinel triggers the reveal, as px from the
// viewport top (or a function returning it, for viewport-relative values).
// Default is REFERENCE_LINE — the nav appears once its section has reached the
// top of the screen. A page can pass a larger line to reveal it earlier, as
// its slot scrolls into view, so the slide-in is actually seen.
export function useNavScrollPhase(startRef, endRef, startLine = REFERENCE_LINE) {
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
      const startAt = typeof startLine === 'function' ? startLine() : startLine;

      setPhase((prev) => {
        if (dir === 'down') {
          if (prev === 'before' && startTop <= startAt - BUFFER) return 'visible';
          if (prev === 'visible' && endTop <= REFERENCE_LINE - BUFFER) return 'after';
          return prev;
        }
        if (prev === 'after' && endTop >= REFERENCE_LINE + BUFFER) return 'visible';
        if (prev === 'visible' && startTop >= startAt + BUFFER) return 'before';
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
  }, [startRef, endRef, startLine]);

  return phase;
}
