import { useEffect, useRef, useState } from 'react';
import { useInView } from 'framer-motion';

// Becomes true `delayMs` after `ref` first enters view, then stays true
// forever — holds a resting state on screen for a beat before a livelier
// state is allowed to take over.
export function useVisibleAfterDelay(ref, delayMs, options) {
  const isInView = useInView(ref, options);
  const [isReady, setIsReady] = useState(false);
  const hasStartedRef = useRef(false);

  useEffect(() => {
    if (hasStartedRef.current || !isInView) return undefined;
    hasStartedRef.current = true;
    const timeoutId = setTimeout(() => setIsReady(true), delayMs);
    return () => clearTimeout(timeoutId);
  }, [isInView, delayMs]);

  return isReady;
}
