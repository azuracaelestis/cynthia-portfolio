// Shared entrance for the hero's floating stickers: they appear one at a time,
// each growing and rising into place with a small overshoot (the same recipe as
// the Visual Design page's hero extras), then their own float loop takes over.
// Two triggers (see Hero.jsx): the visitor's first entrance to the site, and
// the character waking from sleep. `first` starts soon after the page settles;
// `wake` waits for the slow crossfade / arm rise so the stickers land once she
// is mostly awake.
export const stickerVariants = {
  hidden: { opacity: 0, scale: 0.6, y: 24 },
  visible: { opacity: 1, scale: 1, y: 0 },
};

const STAGGER_S = 0.3;
const START_S = { first: 0.35, wake: 0.9 };

export function stickerTransition({ index, kind, reduceMotion }) {
  if (reduceMotion) return { duration: 0 };
  return { duration: 0.7, delay: START_S[kind] + index * STAGGER_S, ease: [0.34, 1.56, 0.64, 1] };
}
