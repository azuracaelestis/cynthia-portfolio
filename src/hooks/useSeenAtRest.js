import { useEffect, useState } from 'react';
import { useInView } from 'framer-motion';

// Latches true the first time `ref` is in view AND scrolling has settled —
// i.e. the element has actually been SEEN AT REST, not merely scrolled past.
// Stays true forever after. Unlike a wall-clock delay, this waits for the
// reveal scroll to stop, so a resting state holds until the user pauses on
// the element, and only a subsequent scroll unlocks the livelier state.
export function useSeenAtRest(ref, isScrolling, options) {
  const isInView = useInView(ref, options);
  const [seen, setSeen] = useState(false);

  useEffect(() => {
    if (seen) return;
    if (isInView && !isScrolling) setSeen(true);
  }, [isInView, isScrolling, seen]);

  return seen;
}
