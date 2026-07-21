import { useRef, useState } from 'react';
import { useInView, useReducedMotion } from 'framer-motion';
import { useTimeOfDay } from '../../hooks/useTimeOfDay';
import { useIsScrolling } from '../../hooks/useIsScrolling';
import { useCharacterMood } from '../../hooks/useCharacterMood';
import { useEyeTracking } from '../../hooks/useEyeTracking';
import { useWakeOnInteraction } from '../../hooks/useWakeOnInteraction';
import { useMediaQuery } from '../../hooks/useMediaQuery';
import { useVisibleAfterDelay } from '../../hooks/useVisibleAfterDelay';
import CharacterStage from './character/CharacterStage';
import ThoughtPostits from './ThoughtPostits';
import Decorations from './Decorations';
import DecorationsMobile from './DecorationsMobile';

export default function Hero() {
  const sectionRef = useRef(null);
  const frameRef = useRef(null);
  const reduceMotion = useReducedMotion();

  // Lower threshold + longer settle delay so "thinking" holds while the
  // hero is scrolling out of view, instead of cutting off immediately.
  const isHeroInView = useInView(sectionRef, { amount: 0.1 });
  const isNight = useTimeOfDay();
  const isScrolling = useIsScrolling(1800);
  const hasWokenUp = useWakeOnInteraction();
  const [isHoveringWork, setIsHoveringWork] = useState(false);
  const [isHoveringResume, setIsHoveringResume] = useState(false);

  const isMobileViewport = useMediaQuery('(max-width: 1023px)'); // below lg
  const isCharacterRevealed = useVisibleAfterDelay(frameRef, 1200, { amount: 0.3, once: true });
  const mobileGateOpen = !isMobileViewport || isCharacterRevealed;

  const isThinking = isScrolling && isHeroInView && mobileGateOpen;
  const mood = useCharacterMood({
    isNight,
    isHoveringWork,
    isHoveringResume,
    isThinkingScroll: isThinking,
    reduceMotion,
    hasWokenUp: hasWokenUp && mobileGateOpen,
  });
  const { offset, tiltDeg } = useEyeTracking(frameRef, { enabled: !reduceMotion });

  return (
    <section
      ref={sectionRef}
      id="home"
      className="relative lg:z-0 mt-[6px] lg:mt-0 mx-auto max-w-7xl px-6 lg:px-10 pt-[170px] lg:pt-36 pb-24 lg:pb-[244px] grid lg:grid-cols-2 gap-x-12 gap-y-[120px] lg:gap-y-12 items-center"
    >
      <Decorations show={mood === 'awake'} />
      <DecorationsMobile />

      <div className="relative font-dm">
        <h1 className="font-bold text-[36px] md:text-[48px] lg:text-[64px] leading-[1.17] text-ink">
          Hi, I'm Cynthia.
          <br />
          Product Designer
          <br />
          &amp; Storyteller.
        </h1>
        <div className="mt-6 flex flex-col gap-2">
          <p className="text-[16px] md:text-[20px] lg:text-[24px] font-normal leading-[1.42] text-black">
            Product Designer with a visual design background.
          </p>
          <p className="text-[16px] md:text-[20px] lg:text-[24px] font-normal leading-[1.42] text-black">
            Designing and building product experiences that simplify complexity, from brand systems to shipped&nbsp;code.
          </p>
        </div>
        <div className="mt-[43px] lg:mt-12 flex flex-col gap-4 lg:flex-row lg:flex-wrap lg:gap-6">
          <a
            href="#work"
            onMouseEnter={() => setIsHoveringWork(true)}
            onMouseLeave={() => setIsHoveringWork(false)}
            className="h-12 w-full lg:w-auto flex items-center justify-center rounded-full bg-[#f8ab1c] hover:bg-[#FACC61] active:bg-[#F18F06] transition-colors px-6 py-3 font-bold text-lg lg:text-xl text-ink"
          >
            View Work
          </a>
          <a
            href="/resume.pdf"
            onMouseEnter={() => setIsHoveringResume(true)}
            onMouseLeave={() => setIsHoveringResume(false)}
            className="h-12 w-full lg:w-auto flex items-center justify-center rounded-full border border-black hover:bg-amber-350 active:bg-amber-550 transition-colors px-6 py-3 font-semibold text-lg lg:text-xl text-ink"
          >
            Download Resume
          </a>
        </div>
      </div>

      <div className="relative flex justify-center lg:justify-end lg:translate-y-[180px] lg:-translate-x-[194px]">
        <ThoughtPostits show={isThinking} />
        <CharacterStage ref={frameRef} mood={mood} eyeOffset={offset} tiltDeg={tiltDeg} />
      </div>
    </section>
  );
}
