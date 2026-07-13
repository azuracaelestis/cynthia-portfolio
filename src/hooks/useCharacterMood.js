// Tunable: the character's possible moods, in priority order used below.
export const CHARACTER_MOODS = ['sleeping', 'awake', 'thinking'];

// Resolves which mood the character should show right now. Pure derivation
// (no internal state/effects) over already-live values from the individual
// channels — kept as a plain function so each channel (time-of-day, hover
// expression, scroll-thinking) stays independently testable/tunable.
//
// Priority: reduced-motion (fully static) > scroll-thinking > hover-expression > time-of-day default.
export function useCharacterMood({ isNight, isHoveringWork, isHoveringResume, isThinkingScroll, reduceMotion }) {
  if (reduceMotion) return isNight ? 'sleeping' : 'awake';
  if (isThinkingScroll) return 'thinking';
  if (isHoveringWork || isHoveringResume) return 'awake'; // both CTAs → 'awake' art; no distinct 3rd asset yet
  return isNight ? 'sleeping' : 'awake';
}
