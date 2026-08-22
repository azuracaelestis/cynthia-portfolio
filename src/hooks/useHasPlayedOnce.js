import { useState } from 'react';

// A one-time, cross-render, cross-navigation-within-session latch backed by
// sessionStorage — unlike useWakeOnInteraction's idle-decaying flag, this
// never resets once set. Read synchronously via useState's lazy initializer
// so the very first render already knows the answer (no flash before a
// same-session skip kicks in). Falls back to `false` if storage is
// unavailable (private mode etc.) — the safe default just replays.
export function useHasPlayedOnce(key) {
  const [hasPlayed, setHasPlayed] = useState(() => {
    try {
      return sessionStorage.getItem(key) === '1';
    } catch {
      return false;
    }
  });

  const markPlayed = () => {
    setHasPlayed(true);
    try {
      sessionStorage.setItem(key, '1');
    } catch {
      // ignore — storage unavailable
    }
  };

  return [hasPlayed, markPlayed];
}
