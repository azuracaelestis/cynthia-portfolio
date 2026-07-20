import { useEffect, useState } from 'react';

// Tunable: how strongly the pupil/head lean toward the cursor.
// pxPerCursorPx/degPerCursorPx scale the raw cursor-to-frame-center distance;
// maxOffsetPx/maxTiltDeg then clamp the result to a flat cap (same cap in
// every mood — not a per-mood/per-lens-geometry radius).
export const EYE_SENSITIVITY = {
  pxPerCursorPx: 0.02,
  maxOffsetPx: 6, // tunable — raised from 4 so gaze travel actually reads
  degPerCursorPx: 0.01,
  maxTiltDeg: 2,
};

// The frame contains the whole body, so its geometric center sits near the
// chest — well below the eyes. Anchoring dx/dy to the frame center instead
// of the eyes means "look down" only triggers below the torso, and hovering
// near the face reads as neutral/up. These anchor the offset calculation to
// the eyes' actual position (upper third, slightly left in this left-facing
// 3/4 view) instead.
const EYE_ANCHOR_X = 0.45;
const EYE_ANCHOR_Y = 0.32;

const clamp = (value, max) => Math.max(-max, Math.min(max, value));

// Subtle pupil-follow + head-tilt toward the mouse cursor, relative to the
// eye anchor within the character frame (not the viewport). Disabled entirely when
// `enabled` is false (reduced motion, or while a mood with closed eyes is
// showing) — returns to the neutral/centered offset in that case.
export function useEyeTracking(frameRef, { enabled = true } = {}) {
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [tiltDeg, setTiltDeg] = useState(0);

  useEffect(() => {
    if (!enabled) {
      setOffset({ x: 0, y: 0 });
      setTiltDeg(0);
      return undefined;
    }

    const handleMove = (event) => {
      const rect = frameRef.current?.getBoundingClientRect();
      if (!rect) return;

      const dx = event.clientX - (rect.left + rect.width * EYE_ANCHOR_X);
      const dy = event.clientY - (rect.top + rect.height * EYE_ANCHOR_Y);

      setOffset({
        x: clamp(dx * EYE_SENSITIVITY.pxPerCursorPx, EYE_SENSITIVITY.maxOffsetPx),
        y: clamp(dy * EYE_SENSITIVITY.pxPerCursorPx, EYE_SENSITIVITY.maxOffsetPx),
      });
      setTiltDeg(clamp(dx * EYE_SENSITIVITY.degPerCursorPx, EYE_SENSITIVITY.maxTiltDeg));
    };

    window.addEventListener('mousemove', handleMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMove);
  }, [enabled, frameRef]);

  return { offset, tiltDeg };
}
