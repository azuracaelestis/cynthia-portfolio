import { useEffect, useState } from 'react';

// Single concern: has the visitor interacted yet? Fires once on the first of
// several signals, then detaches everything — no mood logic lives here.
export function useWakeOnInteraction() {
  const [hasWokenUp, setHasWokenUp] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return undefined;

    const detach = () => {
      window.removeEventListener('mousemove', handleInteraction);
      window.removeEventListener('scroll', handleInteraction);
      window.removeEventListener('touchstart', handleInteraction);
      window.removeEventListener('keydown', handleInteraction);
      document.documentElement.removeEventListener('pointerenter', handleInteraction);
    };

    function handleInteraction() {
      setHasWokenUp(true);
      detach();
    }

    window.addEventListener('mousemove', handleInteraction, { passive: true });
    window.addEventListener('scroll', handleInteraction, { passive: true });
    window.addEventListener('touchstart', handleInteraction, { passive: true });
    window.addEventListener('keydown', handleInteraction);
    document.documentElement.addEventListener('pointerenter', handleInteraction, { passive: true });

    return detach;
  }, []);

  return hasWokenUp;
}
