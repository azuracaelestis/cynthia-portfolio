import { forwardRef } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import AwakeArt from './AwakeArt';
import SleepingArt from './SleepingArt';
import ThinkingArt from './ThinkingArt';

const ART_BY_MOOD = {
  awake: AwakeArt,
  sleeping: SleepingArt,
  thinking: ThinkingArt,
};

// Tunable: uniform character scale-up. Applied to a wrapper *inside* the
// fixed frame (never to the frame itself), so it scales all 3 moods
// identically without reopening the frame-consistency fix.
const CHARACTER_SCALE = 1.08;

// Fixed frame — identical across every mood, never resizes. Height matches
// the shared viewBox's aspect ratio (821/579 ≈ 1.418) so the inline SVGs
// (preserveAspectRatio="xMidYMid meet") fill the frame with no dead padding
// above/below — this keeps the bottom-center scale pivot at the actual
// visible hem instead of in empty space below it. Each mood's art is a
// stacked, always-mounted SVG layer crossfaded via opacity/visibility only;
// nothing is ever added to or removed from layout.
// Exception: the base/mobile tier (below `sm:`) is pinned to a fixed
// 282x351 spec that doesn't match this ratio, so the art letterboxes
// slightly (empty space on the sides) at that one tier only — deliberate,
// not a bug.
const CharacterStage = forwardRef(function CharacterStage({ mood, eyeOffset, tiltDeg }, ref) {
  const reduceMotion = useReducedMotion();

  const isSleeping = mood === 'sleeping';
  const snoring = isSleeping && !reduceMotion;

  return (
    <motion.div
      ref={ref}
      className="relative w-[282px] h-[351px] sm:w-[360px] sm:h-[510px] lg:w-[420px] lg:h-[596px]"
      style={{
        '--eye-x': `${eyeOffset?.x ?? 0}px`,
        '--eye-y': `${eyeOffset?.y ?? 0}px`,
        ...(snoring ? {} : { '--head-tilt': `${tiltDeg ?? 0}deg` }),
      }}
      animate={snoring ? { '--head-tilt': ['-1deg', '1deg', '-1deg'] } : undefined}
      transition={snoring ? { duration: 4.5, repeat: Infinity, ease: 'easeInOut' } : undefined}
    >
      <div className="absolute inset-0" style={{ transform: `scale(${CHARACTER_SCALE})`, transformOrigin: 'bottom center' }}>
        <motion.div
          className="absolute inset-0"
          animate={reduceMotion ? undefined : { y: [0, -8, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
        >
          {Object.entries(ART_BY_MOOD).map(([key, Art]) => (
            <Art
              key={key}
              className="absolute inset-0 h-full w-full select-none"
              style={{
                opacity: mood === key ? 1 : 0,
                pointerEvents: 'none',
                transitionProperty: 'opacity',
                transitionDuration: reduceMotion ? '0ms' : '350ms',
                transitionTimingFunction: 'ease-in-out',
              }}
            />
          ))}
        </motion.div>
      </div>

      {/* zzz sleep indicator */}
      <AnimatePresence>
        {mood === 'sleeping' && (
          <motion.div
            className="absolute top-6 right-6 font-display font-bold text-sky-600 pointer-events-none"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: -6 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6 }}
          >
            <motion.span
              className="block text-2xl"
              animate={reduceMotion ? undefined : { y: [-4, -14, -4], opacity: [0.4, 1, 0.4] }}
              transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
            >
              Z z z
            </motion.span>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
});

export default CharacterStage;
