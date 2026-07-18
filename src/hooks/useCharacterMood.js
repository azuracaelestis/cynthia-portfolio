// Tunable: the character's possible moods, in priority order used below.
export const CHARACTER_MOODS = ['sleeping', 'awake', 'thinking'];

// Resolves which mood the character should show right now. Pure derivation
// (no internal state/effects) over already-live values from the individual
// channels — kept as a plain function so each channel (time-of-day, hover
// expression, scroll-thinking) stays independently testable/tunable.
//
// Priority: reduced-motion > scroll-thinking > hover > (night AND not-yet-woken) sleep > awake.
export function useCharacterMood({ isNight, isHoveringWork, isHoveringResume, isThinkingScroll, reduceMotion, hasWokenUp }) {
  if (reduceMotion) return (isNight && !hasWokenUp) ? 'sleeping' : 'awake';
  if (isThinkingScroll) return 'thinking';
  if (isHoveringWork || isHoveringResume) return 'awake'; // both CTAs → 'awake' art; no distinct 3rd asset yet
  return (isNight && !hasWokenUp) ? 'sleeping' : 'awake';
}
