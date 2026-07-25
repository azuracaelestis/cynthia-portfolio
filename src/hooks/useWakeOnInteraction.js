import { useEffect, useRef, useState } from 'react';

// Tracks whether the visitor has been active within the last `idleTimeoutMs`
// (mousemove, scroll, touchstart, keydown, or documentElement pointerenter).
// Flips true on the first activity, stays true while active, and flips back
// to false after idleTimeoutMs of no activity — a "recently active" flag,
// not a one-time latch.
export function useWakeOnInteraction(idleTimeoutMs = 60000) {
  const [isActive, setIsActive] = useState(false);
  const isActiveRef = useRef(false);
  const timeoutRef = useRef(null);

  useEffect(() => {
    if (typeof window === 'undefined') return undefined;

    function handleInteraction() {
      if (!isActiveRef.current) {
        isActiveRef.current = true;
        setIsActive(true);
      }
      clearTimeout(timeoutRef.current);
      timeoutRef.current = setTimeout(() => {
        isActiveRef.current = false;
        setIsActive(false);
      }, idleTimeoutMs);
    }

    window.addEventListener('mousemove', handleInteraction, { passive: true });
    window.addEventListener('scroll', handleInteraction, { passive: true });
    window.addEventListener('touchstart', handleInteraction, { passive: true });
    window.addEventListener('keydown', handleInteraction);
    document.documentElement.addEventListener('pointerenter', handleInteraction, { passive: true });

    return () => {
      clearTimeout(timeoutRef.current);
      window.removeEventListener('mousemove', handleInteraction);
      window.removeEventListener('scroll', handleInteraction);
      window.removeEventListener('touchstart', handleInteraction);
      window.removeEventListener('keydown', handleInteraction);
      document.documentElement.removeEventListener('pointerenter', handleInteraction);
    };
  }, [idleTimeoutMs]);

  return isActive;
}
