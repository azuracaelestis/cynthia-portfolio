import { useEffect, useState } from 'react';

// Follows `value`, but only reports true once it has been continuously true
// for `delayMs`; reports false again immediately. Used to hold the sleeping
// character in bed for a beat after the visitor first stirs. `delayMs <= 0`
// is a straight passthrough (the reduced-motion path).
export function useDelayedTrue(value, delayMs) {
  const [delayed, setDelayed] = useState(false);

  useEffect(() => {
    if (!value) {
      setDelayed(false);
      return undefined;
    }
    if (delayMs <= 0) {
      setDelayed(true);
      return undefined;
    }
    const id = setTimeout(() => setDelayed(true), delayMs);
    return () => clearTimeout(id);
  }, [value, delayMs]);

  return delayMs <= 0 ? value : delayed;
}
