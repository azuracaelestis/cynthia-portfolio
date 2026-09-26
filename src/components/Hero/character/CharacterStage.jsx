import { forwardRef, useEffect, useRef } from 'react';
import { motion, AnimatePresence, animate, cubicBezier, useMotionValue, useReducedMotion, useTransform } from 'framer-motion';
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

// Awake <-> thinking is a quick opacity crossfade. Sleeping <-> awake can't
// be one: the two heads are different drawings, so any blend long enough to
// read as smooth shows a double head. Instead a single `wake` progress (0
// asleep, 1 awake) plays "lift, swap, blink": the sleeping head lifts about
// the neck, the awake drawing takes over mid-motion at the same pose (a ~60ms
// swap, masked by a small stretch), then settles and opens its eyes; the
// raised arm follows (see [data-hand] in index.css). Falling asleep plays it
// backwards.
const CROSSFADE_MS = 350;
const WAKE_SECONDS = 1.4;
const SLEEP_SECONDS = 0.9;
const SWAP = [0.48, 0.52];

// Sleeping head -> awake head, measured from the closed-eye strokes vs the
// pupils (svg units): rotation in degrees plus the translate that follows it.
const HEAD_ROT = 37.5;
const SLEEP_HEAD_SHIFT = { x: -119.9, y: -8.7 };
const AWAKE_HEAD_SHIFT = { x: 101.7, y: -68.5 };

// How far the head has swung from the sleeping pose (0) to the awake pose (1):
// speeding up into the swap, then easing out with a slight overshoot.
const POSE_STOPS = [0, 0.5, 0.75, 0.9];
const POSE_VALUES = [0, 0.7, 1.05, 1];
const POSE_EASE = [cubicBezier(0.5, 0, 1, 1), cubicBezier(0, 0, 0.3, 1), cubicBezier(0.45, 0, 0.55, 1)];

const ZZZ = [
  { className: 'top-[38%] right-[18%] text-lg', delay: 0 },
  { className: 'top-[24%] right-[10%] text-3xl', delay: 0.6 },
  { className: 'top-[8%] right-[2%] text-5xl', delay: 1.2 },
];

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

  const wake = useMotionValue(isSleeping ? 0 : 1);
  useEffect(() => {
    const target = isSleeping ? 0 : 1;
    if (reduceMotion) {
      wake.set(target);
      return undefined;
    }
    const controls = animate(wake, target, {
      duration: isSleeping ? SLEEP_SECONDS : WAKE_SECONDS,
      ease: 'linear',
    });
    return () => controls.stop();
  }, [isSleeping, reduceMotion, wake]);

  // The awake-side layer that stays fully opaque underneath the wake fade.
  const awakeMood = useRef('awake');
  if (mood !== 'sleeping') awakeMood.current = mood;

  const pose = useTransform(wake, POSE_STOPS, POSE_VALUES, { ease: POSE_EASE });
  const sleepOpacity = useTransform(wake, SWAP, [1, 0]);
  const awakeOpacity = useTransform(wake, SWAP, [0, 1]);
  const eyeOpen = useTransform(wake, [0.55, 0.8], [0.1, 1]);
  const stretch = useTransform(wake, [0.4, 0.5, 0.65], [1, 1.02, 1]);
  const sleepRot = useTransform(pose, (p) => `${HEAD_ROT * p}deg`);
  const sleepX = useTransform(pose, (p) => `${SLEEP_HEAD_SHIFT.x * p}px`);
  const sleepY = useTransform(pose, (p) => `${SLEEP_HEAD_SHIFT.y * p}px`);
  const awakeRot = useTransform(pose, (p) => `${-HEAD_ROT * (1 - p)}deg`);
  const awakeX = useTransform(pose, (p) => `${AWAKE_HEAD_SHIFT.x * (1 - p)}px`);
  const awakeY = useTransform(pose, (p) => `${AWAKE_HEAD_SHIFT.y * (1 - p)}px`);
  const layerMotion = {
    sleeping: { opacity: sleepOpacity, '--wake-rot': sleepRot, '--wake-x': sleepX, '--wake-y': sleepY },
    awake: { opacity: awakeOpacity, '--wake-rot': awakeRot, '--wake-x': awakeX, '--wake-y': awakeY, '--eye-open': eyeOpen },
  };
  layerMotion.thinking = layerMotion.awake;

  return (
    <motion.div
      ref={ref}
      className="relative w-[282px] h-[351px] sm:w-[360px] sm:h-[510px] lg:w-[420px] lg:h-[596px]"
      data-sleeping={isSleeping ? 'true' : 'false'}
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
          <motion.div className="absolute inset-0" style={{ scaleY: stretch, transformOrigin: 'bottom center' }}>
            {Object.entries(ART_BY_MOOD).map(([key, Art]) => (
              <motion.div key={key} className="absolute inset-0" style={{ ...layerMotion[key], pointerEvents: 'none' }}>
                <Art
                  className="absolute inset-0 h-full w-full select-none"
                  style={{
                    opacity: key === 'sleeping' || key === awakeMood.current ? 1 : 0,
                    transitionProperty: 'opacity',
                    transitionDuration: `${reduceMotion ? 0 : CROSSFADE_MS}ms`,
                    transitionTimingFunction: 'ease-in-out',
                  }}
                />
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>

      {/* zzz sleep indicator */}
      <AnimatePresence>
        {mood === 'sleeping' &&
          ZZZ.map((z, i) => (
            <motion.span
              key={i}
              className={`absolute ${z.className} font-satoshi font-bold text-sky-600 pointer-events-none select-none`}
              initial={{ opacity: 0 }}
              exit={{ opacity: 0, transition: { duration: 0.3, delay: 0 } }}
              animate={
                reduceMotion
                  ? { opacity: 1 }
                  : { opacity: [0, 1, 0], y: [0, -14, -24], scale: [0.8, 1.1, 1.1] }
              }
              transition={
                reduceMotion
                  ? { duration: 0 }
                  : { duration: 1.8, delay: z.delay, repeat: Infinity, ease: 'easeInOut' }
              }
            >
              Z
            </motion.span>
          ))}
      </AnimatePresence>
    </motion.div>
  );
});

export default CharacterStage;
