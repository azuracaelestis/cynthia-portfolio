import { useEffect, useRef, useState } from 'react';
import { motion, useInView, useReducedMotion } from 'framer-motion';
import { useTimeOfDay } from '../../hooks/useTimeOfDay';
import { useIsScrolling } from '../../hooks/useIsScrolling';
import { useIsScrollingDown } from '../../hooks/useIsScrollingDown';
import { useCharacterMood } from '../../hooks/useCharacterMood';
import { useEyeTracking } from '../../hooks/useEyeTracking';
import { useDelayedTrue } from '../../hooks/useDelayedTrue';
import { useIsIdle } from '../../hooks/useIsIdle';
import { useWakeOnInteraction } from '../../hooks/useWakeOnInteraction';
import { useMediaQuery } from '../../hooks/useMediaQuery';
import { useSeenAtRest } from '../../hooks/useSeenAtRest';
import { useHasPlayedOnce } from '../../hooks/useHasPlayedOnce';
import CharacterStage from './character/CharacterStage';
import ThoughtPostits from './ThoughtPostits';
import Decorations from './Decorations';
import DecorationsMobile from './DecorationsMobile';
import DecorationsMobileCharacter from './DecorationsMobileCharacter';

// How long the sleeping character stays asleep after the visitor first stirs.
const WAKE_DELAY_MS = 1000;
// With no mouse movement, scrolling, touch or key press for this long she dozes off again.
const IDLE_SLEEP_MS = 60000;

const ENTRANCE_STORAGE_KEY = 'portfolio:hero:entrance-played';

// "Hi," / "I'm" / "Cynthia." — deterministic per-word tilt (not random), so
// the crafted entrance looks the same on every load rather than jittering.
const WORD_ROTATIONS = [-8, 6, -4];

const fadeUpVariants = { hidden: { opacity: 0, y: 10 }, visible: { opacity: 1, y: 0 } };

function ChevronIcon({ className = '' }) {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className={className} aria-hidden="true">
      <path d="M6 3.5l5 4.5-5 4.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

// CTA chevron micro-interaction. On hover the trailing chevron accelerates
// out past the pill's right edge while a second one arrives from the left
// slightly later and settles, and the label glides right to make room —
// mirrored on hover-out.
//
// Measured off the reference capture, which is what the numbers below encode:
// the pill never reflows (only transforms move), the chevrons don't fade —
// they slide out and are CLIPPED at the pill edge, which is what makes the
// motion read as physical — and the two chevrons are staggered rather than
// crossfading, the leaving one fast and accelerating, the arriving one
// delayed and decelerating into place.
//
// Geometry is derived from the button's own px-6 padding, so it stays
// self-consistent: the chevron is 16px and the gap 12px, so the label shifts
// by exactly 28px, and the chevrons travel 24 + 16 = 40px — precisely far
// enough to clear the pill edge.
//
// The clip region is CtaLabel's own runway (below), sized independently of
// the button — this must stay strictly SMALLER than CHEVRON_TRAVEL, not
// equal to it. Equal was the actual bug: a chevron animating to `x: -TRAVEL`
// from a wrapper inset by `RUNWAY` lands at `RUNWAY - TRAVEL` from the clip
// edge — at RUNWAY === TRAVEL (both were 40) that's exactly 0, i.e. flush
// with the boundary, not past it, so it was never really clipped. On desktop
// (`lg:w-auto`) this was invisibly papered over by the *button's own* tight
// overflow-hidden edge sitting closer in than the runway's; on mobile
// (`w-full`) that outer edge is far away, exposing both chevrons at rest.
const LABEL_SHIFT = 28;
const CHEVRON_TRAVEL = 40;
const RUNWAY = 24;

function CtaLabel({ children, hovered, reduceMotion }) {
  const d = reduceMotion ? 0 : 1;
  const exit = { duration: 0.25 * d, ease: [0.5, 0, 0.75, 0] };
  const enter = { duration: 0.35 * d, delay: 0.15 * d, ease: [0.16, 1, 0.3, 1] };
  const state = hovered ? 'hover' : 'rest';

  return (
    // The negative margins cancel the padding, so this adds a RUNWAY-px
    // horizontal bleed for `overflow-hidden` to clip against, without
    // changing the row's own footprint.
    <span
      className="relative flex items-center gap-3 overflow-hidden -my-2 py-2"
      style={{ marginLeft: -RUNWAY, marginRight: -RUNWAY, paddingLeft: RUNWAY, paddingRight: RUNWAY }}
    >
      <motion.span
        initial={false}
        animate={state}
        variants={{ rest: { x: 0 }, hover: { x: LABEL_SHIFT } }}
        transition={{ duration: 0.45 * d, ease: [0.65, 0, 0.35, 1] }}
      >
        {children}
      </motion.span>
      {/* Holds the chevron's width so the pill's own width never changes. */}
      <span className="w-4 shrink-0" aria-hidden="true" />

      {/* Both chevrons sit out of flow. They're centred by these wrappers, not
          by a -translate-y-1/2 class, which Framer would overwrite when it
          takes over the transform to animate x.
          The inset matches the RUNWAY padding above: absolute offsets
          resolve against the padding box, so left:0 would park them
          RUNWAY-px outside the content edge — permanently clipped out of
          sight (this is a different bug from the one described above it:
          this one is about which box `left`/`right` resolve against, not
          about how far CHEVRON_TRAVEL needs to exceed RUNWAY). */}
      <span className="absolute inset-y-0 flex items-center" style={{ left: RUNWAY }} aria-hidden="true">
        <motion.span
          initial={false}
          animate={state}
          variants={{
            rest: { x: -CHEVRON_TRAVEL, transition: exit },
            hover: { x: 0, transition: enter },
          }}
        >
          <ChevronIcon />
        </motion.span>
      </span>
      <span className="absolute inset-y-0 flex items-center" style={{ right: RUNWAY }} aria-hidden="true">
        <motion.span
          initial={false}
          animate={state}
          variants={{
            rest: { x: 0, transition: enter },
            hover: { x: CHEVRON_TRAVEL, transition: exit },
          }}
        >
          <ChevronIcon />
        </motion.span>
      </span>
    </span>
  );
}

export default function Hero() {
  const sectionRef = useRef(null);
  const frameRef = useRef(null);
  const reduceMotion = useReducedMotion();

  // Lower threshold + longer settle delay so "thinking" holds while the
  // hero is scrolling out of view, instead of cutting off immediately.
  const isHeroInView = useInView(sectionRef, { amount: 0.1 });
  const isNight = useTimeOfDay();
  const isScrollingDown = useIsScrollingDown(1800); // thinking trigger + hold: scrolling DOWN out of the hero only
  const isScrollingQuick = useIsScrolling(400); // new — for the wake gate
  const hasWokenUp = useWakeOnInteraction();
  const [isHoveringWork, setIsHoveringWork] = useState(false);
  const [isHoveringResume, setIsHoveringResume] = useState(false);

  const isMobileViewport = useMediaQuery('(max-width: 1023px)'); // below lg
  // Touch browsers fire a synthetic mouseenter on tap with no matching
  // mouseleave, so gating on real mouse events alone left the CTA chevron
  // swap (and the character's hover-driven mood) permanently stuck "hovered"
  // after the first tap. Gate the state itself, not just the animation, so
  // both are fixed at the source.
  const canHover = useMediaQuery('(hover: hover)');
  const isCharacterRevealed = useSeenAtRest(frameRef, isScrollingQuick, { amount: 0.6 });
  const mobileGateOpen = !isMobileViewport || isCharacterRevealed;

  // Cascade wake — one-time page-load entrance. `hasEyeWoken` flips true the
  // instant the headline's word cascade settles (or immediately, under
  // reduced motion / a same-session replay), and is OR'd into the mood
  // system's existing wake input below — bypassing mobileGateOpen, since
  // this is the deliberate always-above-the-fold first paint, not an
  // incidental scroll wake.
  const [hasPlayedEntrance, markEntrancePlayed] = useHasPlayedOnce(ENTRANCE_STORAGE_KEY);
  const [hasEyeWoken, setHasEyeWoken] = useState(false);
  const skipEntrance = hasPlayedEntrance;
  const entranceSettled = hasEyeWoken || skipEntrance;
  const hasTriggeredRef = useRef(false);

  useEffect(() => {
    if (hasTriggeredRef.current || skipEntrance || !reduceMotion) return;
    hasTriggeredRef.current = true;
    setHasEyeWoken(true);
    markEntrancePlayed();
    // else (not reduced motion): real trigger is handleSettled, fired by the last headline word.
  }, [skipEntrance, reduceMotion, markEntrancePlayed]);

  function handleSettled() {
    if (hasEyeWoken) return;
    setHasEyeWoken(true);
    markEntrancePlayed();
  }

  const wordTransition = (i) =>
    skipEntrance || reduceMotion
      ? { duration: 0 }
      : {
          opacity: { duration: 0.38, delay: i * 0.14, ease: [0.34, 1.2, 0.64, 1] },
          y: { duration: 0.38, delay: i * 0.14, ease: [0.34, 1.2, 0.64, 1] },
          rotate: { duration: 0.32, delay: 0.6, ease: 'easeOut' },
        };
  const entranceDelay = (s) => (reduceMotion ? { duration: 0 } : { duration: 0.35, delay: s, ease: 'easeOut' });

  // Waking from sleep is a two-step: any stir (moving the cursor, scrolling, a
  // key press, hovering a CTA) only ASKS to wake; the character keeps sleeping
  // for WAKE_DELAY_MS more, then wakes slowly (CharacterStage lengthens the
  // crossfade, and the arm rises last). The load-time cascade wake below is
  // deliberate and immediate, as is everything under reduced motion.
  const stirred = (hasWokenUp && mobileGateOpen) || isHoveringWork || isHoveringResume;
  const wakeReady = useDelayedTrue(stirred, reduceMotion ? 0 : WAKE_DELAY_MS);
  const isAwakened = wakeReady || hasEyeWoken;

  // Dozing off again: after IDLE_SLEEP_MS of no activity she goes back to sleep
  // (night only: 8pm-6am, like the sleeping she starts the day with). Any activity starts the same two-step wake: the
  // character stays asleep for WAKE_DELAY_MS, then wakes slowly. `activeDelayed`
  // is "has been active for a second"; `hasIdled` latches so this never
  // applies before the first idle spell.
  const isIdle = useIsIdle(IDLE_SLEEP_MS);
  const [hasIdled, setHasIdled] = useState(false);
  useEffect(() => {
    if (isIdle) setHasIdled(true);
  }, [isIdle]);
  const activeDelayed = useDelayedTrue(!isIdle, reduceMotion ? 0 : WAKE_DELAY_MS);
  const napping = isNight && hasIdled && !activeDelayed;

  const stillAsleep = (isNight && !isAwakened) || napping;
  // Scrolling would normally jump straight to 'thinking'; while still in bed it waits too.
  const isThinking = isScrollingDown && isHeroInView && mobileGateOpen && !stillAsleep;
  const mood = useCharacterMood({
    isNight: isNight || napping,
    isHoveringWork: false, // CTA hover is folded into `stirred` above
    isHoveringResume: false,
    isThinkingScroll: isThinking,
    reduceMotion,
    hasWokenUp: isAwakened && !napping,
  });
  const { offset, tiltDeg } = useEyeTracking(frameRef, { enabled: !reduceMotion });

  // The stickers around her pop in one by one every time the home page mounts
  // — a fresh load, a reload, or coming back from another page — and again
  // each time she wakes from sleep, but not on the wake that coincides with
  // that entrance (it is the same moment), nor on awake <-> thinking. (The
  // headline's word cascade, by contrast, still plays once per session.)
  const playFirstEntrance = true;
  const [wakeCount, setWakeCount] = useState(0);
  const previousMood = useRef(mood);
  const decorationsPlayed = useRef(false);
  useEffect(() => {
    const wokeFromSleep = previousMood.current === 'sleeping' && mood !== 'sleeping';
    if (wokeFromSleep && decorationsPlayed.current) setWakeCount((count) => count + 1);
    if (entranceSettled && mood !== 'sleeping') decorationsPlayed.current = true;
    previousMood.current = mood;
  }, [mood, entranceSettled]);

  return (
    <section
      ref={sectionRef}
      id="home"
      className="relative lg:z-0 mt-[6px] lg:mt-0 mx-auto max-w-7xl px-6 lg:px-10 pt-[250px] lg:pt-[clamp(4.5rem,12vh,9rem)] pb-24 lg:pb-[244px] grid lg:grid-cols-2 gap-x-12 gap-y-[120px] lg:gap-y-12 items-center"
    >
      <Decorations show={mood === 'awake'} entranceReady={entranceSettled} playFirst={playFirstEntrance} wakeCount={wakeCount} />
      <DecorationsMobile entranceReady={entranceSettled} playFirst={playFirstEntrance} wakeCount={wakeCount} />

      <div className="relative font-satoshi">
        <h1 className="font-bold text-[40px] md:text-[48px] lg:text-[64px] leading-[1.17] text-ink">
          <motion.span
            className="inline-block"
            initial={{ opacity: 0, y: -34, rotate: WORD_ROTATIONS[0] }}
            animate={{ opacity: 1, y: 0, rotate: 0 }}
            transition={wordTransition(0)}
          >
            Hi,
          </motion.span>{' '}
          <motion.span
            className="inline-block"
            initial={{ opacity: 0, y: -34, rotate: WORD_ROTATIONS[1] }}
            animate={{ opacity: 1, y: 0, rotate: 0 }}
            transition={wordTransition(1)}
          >
            I'm
          </motion.span>{' '}
          <motion.span
            className="inline-block"
            initial={{ opacity: 0, y: -34, rotate: WORD_ROTATIONS[2] }}
            animate={{ opacity: 1, y: 0, rotate: 0 }}
            transition={wordTransition(2)}
            onAnimationComplete={handleSettled}
          >
            Cynthia.
          </motion.span>
          <br />
          <motion.span
            className="inline-block"
            variants={fadeUpVariants}
            initial="hidden"
            animate={entranceSettled ? 'visible' : 'hidden'}
            transition={entranceDelay(0)}
          >
            I design how
          </motion.span>
          <br />
          <motion.span
            className="inline-block"
            variants={fadeUpVariants}
            initial="hidden"
            animate={entranceSettled ? 'visible' : 'hidden'}
            transition={entranceDelay(0.04)}
          >
            people learn.
          </motion.span>
        </h1>
        <motion.p
          className="mt-6 text-[16px] md:text-[20px] lg:text-[24px] font-normal leading-[1.42] text-black"
          variants={fadeUpVariants}
          initial="hidden"
          animate={entranceSettled ? 'visible' : 'hidden'}
          transition={entranceDelay(0)}
        >
          Product designer with a visual design background, from brand systems to shipped&nbsp;code.
        </motion.p>
        <div className="mt-[43px] lg:mt-12 flex flex-col gap-4 lg:flex-row lg:flex-wrap lg:gap-6">
          <motion.a
            href="#work"
            onMouseEnter={() => canHover && setIsHoveringWork(true)}
            onMouseLeave={() => canHover && setIsHoveringWork(false)}
            className="h-12 w-full lg:w-auto flex items-center justify-center overflow-hidden rounded-full bg-ink active:bg-charcoal transition-colors px-6 py-3 font-bold text-lg lg:text-xl text-white"
            variants={fadeUpVariants}
            initial="hidden"
            animate={entranceSettled ? 'visible' : 'hidden'}
            transition={entranceDelay(0.12)}
          >
            <CtaLabel hovered={isHoveringWork} reduceMotion={reduceMotion}>
              View Work
            </CtaLabel>
          </motion.a>
          <motion.a
            href="https://drive.google.com/file/d/1V_B6y68jByI4LLJNXn_PNNCMN525ZXL2/view?usp=sharing"
            target="_blank"
            rel="noreferrer"
            onMouseEnter={() => canHover && setIsHoveringResume(true)}
            onMouseLeave={() => canHover && setIsHoveringResume(false)}
            className="h-12 w-full lg:w-auto flex items-center justify-center overflow-hidden rounded-full border border-black active:bg-amber-550 transition-colors px-6 py-3 font-semibold text-lg lg:text-xl text-ink"
            variants={fadeUpVariants}
            initial="hidden"
            animate={entranceSettled ? 'visible' : 'hidden'}
            transition={entranceDelay(0.18)}
          >
            <CtaLabel hovered={isHoveringResume} reduceMotion={reduceMotion}>
              Download Resume
            </CtaLabel>
          </motion.a>
        </div>
      </div>

      <div className="relative flex justify-center lg:justify-end lg:translate-y-[180px] lg:-translate-x-[114px]">
        <ThoughtPostits show={isThinking} />
        <DecorationsMobileCharacter
          show={mood === 'awake'}
          entranceReady={entranceSettled && isCharacterRevealed}
          playFirst={playFirstEntrance}
          wakeCount={wakeCount}
        />
        <CharacterStage ref={frameRef} mood={mood} eyeOffset={offset} tiltDeg={tiltDeg} />
      </div>
    </section>
  );
}
