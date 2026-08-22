import { useEffect, useRef, useState } from 'react';
import { motion, useInView, useReducedMotion } from 'framer-motion';
import { useTimeOfDay } from '../../hooks/useTimeOfDay';
import { useIsScrolling } from '../../hooks/useIsScrolling';
import { useCharacterMood } from '../../hooks/useCharacterMood';
import { useEyeTracking } from '../../hooks/useEyeTracking';
import { useWakeOnInteraction } from '../../hooks/useWakeOnInteraction';
import { useMediaQuery } from '../../hooks/useMediaQuery';
import { useSeenAtRest } from '../../hooks/useSeenAtRest';
import { useHasPlayedOnce } from '../../hooks/useHasPlayedOnce';
import CharacterStage from './character/CharacterStage';
import ThoughtPostits from './ThoughtPostits';
import Decorations from './Decorations';
import DecorationsMobile from './DecorationsMobile';

const ENTRANCE_STORAGE_KEY = 'portfolio:hero:entrance-played';

// "Hi," / "I'm" / "Cynthia." — deterministic per-word tilt (not random), so
// the crafted entrance looks the same on every load rather than jittering.
const WORD_ROTATIONS = [-8, 6, -4];

const fadeUpVariants = { hidden: { opacity: 0, y: 10 }, visible: { opacity: 1, y: 0 } };

export default function Hero() {
  const sectionRef = useRef(null);
  const frameRef = useRef(null);
  const reduceMotion = useReducedMotion();

  // Lower threshold + longer settle delay so "thinking" holds while the
  // hero is scrolling out of view, instead of cutting off immediately.
  const isHeroInView = useInView(sectionRef, { amount: 0.1 });
  const isNight = useTimeOfDay();
  const isScrolling = useIsScrolling(1800); // keep — thinking hold
  const isScrollingQuick = useIsScrolling(400); // new — for the wake gate
  const hasWokenUp = useWakeOnInteraction();
  const [isHoveringWork, setIsHoveringWork] = useState(false);
  const [isHoveringResume, setIsHoveringResume] = useState(false);

  const isMobileViewport = useMediaQuery('(max-width: 1023px)'); // below lg
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

  const isThinking = isScrolling && isHeroInView && mobileGateOpen;
  const mood = useCharacterMood({
    isNight,
    isHoveringWork,
    isHoveringResume,
    isThinkingScroll: isThinking,
    reduceMotion,
    hasWokenUp: (hasWokenUp && mobileGateOpen) || hasEyeWoken,
  });
  const { offset, tiltDeg } = useEyeTracking(frameRef, { enabled: !reduceMotion });

  return (
    <section
      ref={sectionRef}
      id="home"
      className="relative lg:z-0 mt-[6px] lg:mt-0 mx-auto max-w-7xl px-6 lg:px-10 pt-[250px] lg:pt-[clamp(4.5rem,12vh,9rem)] pb-24 lg:pb-[244px] grid lg:grid-cols-2 gap-x-12 gap-y-[120px] lg:gap-y-12 items-center"
    >
      <Decorations show={mood === 'awake'} entranceReady={entranceSettled} />
      <DecorationsMobile entranceReady={entranceSettled} />

      <div className="relative font-dm">
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
            Product Designer
          </motion.span>
          <br />
          <motion.span
            className="inline-block"
            variants={fadeUpVariants}
            initial="hidden"
            animate={entranceSettled ? 'visible' : 'hidden'}
            transition={entranceDelay(0.04)}
          >
            &amp; Storyteller.
          </motion.span>
        </h1>
        <motion.p
          className="mt-6 text-[16px] md:text-[20px] lg:text-[24px] font-normal leading-[1.42] text-black"
          variants={fadeUpVariants}
          initial="hidden"
          animate={entranceSettled ? 'visible' : 'hidden'}
          transition={entranceDelay(0)}
        >
          Product Designer with a visual design background. Designing and building product experiences that simplify complexity, from brand systems to shipped&nbsp;code.
        </motion.p>
        <div className="mt-[43px] lg:mt-12 flex flex-col gap-4 lg:flex-row lg:flex-wrap lg:gap-6">
          <motion.a
            href="#work"
            onMouseEnter={() => setIsHoveringWork(true)}
            onMouseLeave={() => setIsHoveringWork(false)}
            className="h-12 w-full lg:w-auto flex items-center justify-center rounded-full bg-[#f8ab1c] hover:bg-[#FACC61] active:bg-[#F18F06] transition-colors px-6 py-3 font-bold text-lg lg:text-xl text-ink"
            variants={fadeUpVariants}
            initial="hidden"
            animate={entranceSettled ? 'visible' : 'hidden'}
            transition={entranceDelay(0.12)}
          >
            View Work
          </motion.a>
          <motion.a
            href="/resume.pdf"
            onMouseEnter={() => setIsHoveringResume(true)}
            onMouseLeave={() => setIsHoveringResume(false)}
            className="h-12 w-full lg:w-auto flex items-center justify-center rounded-full border border-black hover:bg-amber-350 active:bg-amber-550 transition-colors px-6 py-3 font-semibold text-lg lg:text-xl text-ink"
            variants={fadeUpVariants}
            initial="hidden"
            animate={entranceSettled ? 'visible' : 'hidden'}
            transition={entranceDelay(0.18)}
          >
            Download Resume
          </motion.a>
        </div>
      </div>

      <div className="relative flex justify-center lg:justify-end lg:translate-y-[180px] lg:-translate-x-[114px]">
        <ThoughtPostits show={isThinking} />
        <CharacterStage ref={frameRef} mood={mood} eyeOffset={offset} tiltDeg={tiltDeg} />
      </div>
    </section>
  );
}
