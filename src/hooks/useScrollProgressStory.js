// Stub — not wired up to anything yet. Reserved as a clean plug-in point for
// a future scroll-progress-driven sticky-note sequence (distinct from the
// existing scroll-triggered "thinking" mood in useCharacterMood, which is
// unrelated and already implemented/tuned).
//
// Intended future signature:
//   useScrollProgressStory(sectionRef) -> { progress: number, activeNoteIndex: number | null }
// where `progress` is 0-1 scroll progress through the section and
// `activeNoteIndex` selects which sticky note (if any) should be shown.
export function useScrollProgressStory() {
  return { progress: 0, activeNoteIndex: null };
}
