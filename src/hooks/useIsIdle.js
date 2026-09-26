import { useEffect, useState } from 'react';

// True once the visitor has done nothing (no mouse movement, scroll, touch or
// key press) for `timeoutMs`, counted from mount if they never do anything;
// false again the moment they do something. The "go back to sleep" trigger.
export function useIsIdle(timeoutMs = 60000) {
  const [isIdle, setIsIdle] = useState(false);

  useEffect(() => {
    let timeoutId;

    const startTimer = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => setIsIdle(true), timeoutMs);
    };
    const handleActivity = () => {
      setIsIdle(false);
      startTimer();
    };

    startTimer();
    const events = ['mousemove', 'scroll', 'touchstart', 'keydown', 'pointerdown'];
    events.forEach((name) => window.addEventListener(name, handleActivity, { passive: true }));
    return () => {
      clearTimeout(timeoutId);
      events.forEach((name) => window.removeEventListener(name, handleActivity));
    };
  }, [timeoutMs]);

  return isIdle;
}
