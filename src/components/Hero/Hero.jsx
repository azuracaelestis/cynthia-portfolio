import { useRef, useState } from 'react';
import { useInView, useReducedMotion } from 'framer-motion';
import { useTimeOfDay } from '../../hooks/useTimeOfDay';
import { useIsScrolling } from '../../hooks/useIsScrolling';
import { useCharacterMood } from '../../hooks/useCharacterMood';
import { useEyeTracking } from '../../hooks/useEyeTracking';
import CharacterStage from './character/CharacterStage';
import ThoughtPostits from './ThoughtPostits';
import Decorations from './Decorations';

export default function Hero() {
  const sectionRef = useRef(null);
  const frameRef = useRef(null);
  const reduceMotion = useReducedMotion();

  // Lower threshold + longer settle delay so "thinking" holds while the
  // hero is scrolling out of view, instead of cutting off immediately.
  const isHeroInView = useInView(sectionRef, { amount: 0.1 });
  const isNight = useTimeOfDay();
  const isScrolling = useIsScrolling(1800);
  const [isHoveringWork, setIsHoveringWork] = useState(false);
  const [isHoveringResume, setIsHoveringResume] = useState(false);

  const isThinking = isScrolling && isHeroInView;
  const mood = useCharacterMood({
    isNight,
    isHoveringWork,
    isHoveringResume,
    isThinkingScroll: isThinking,
    reduceMotion,
  });
  const { offset, tiltDeg } = useEyeTracking(frameRef, { enabled: !reduceMotion });

  return (
    <section
      ref={sectionRef}
      id="home"
      className="relative lg:z-0 mx-auto max-w-7xl px-6 lg:px-10 pt-36 pb-24 lg:pb-[244px] grid lg:grid-cols-2 gap-12 items-center"
    >
      <Decorations show={mood === 'awake'} />

      <div className="relative font-dm">
        <h1 className="font-bold text-4xl sm:text-5xl lg:text-[64px] leading-[1.17] text-ink">
          I design product experiences that <em className="font-extrabold italic text-black">simplify</em> complexity
        </h1>
        <p className="mt-6 text-lg lg:text-2xl font-light leading-[1.42] text-black max-w-md">
          Bridging graphic design thinking and visual product design for tech.
        </p>
        <div className="mt-12 flex flex-wrap gap-6">
          <a
            href="#work"
            onMouseEnter={() => setIsHoveringWork(true)}
            onMouseLeave={() => setIsHoveringWork(false)}
            className="rounded-full bg-[#f8ab1c] hover:bg-[#FACC61] active:bg-[#F18F06] transition-colors px-8 py-4 font-bold text-lg lg:text-xl text-ink"
          >
            View Work
          </a>
          <a
            href="/resume.pdf"
            onMouseEnter={() => setIsHoveringResume(true)}
            onMouseLeave={() => setIsHoveringResume(false)}
            className="rounded-full border-[1.5px] border-black hover:bg-black/5 transition-colors px-8 py-4 font-semibold text-lg lg:text-xl text-ink"
          >
            Download Resume
          </a>
        </div>
      </div>

      <div className="relative flex justify-center lg:justify-end lg:translate-y-[180px] lg:-translate-x-[164px]">
        <ThoughtPostits show={isThinking} />
        <CharacterStage ref={frameRef} mood={mood} eyeOffset={offset} tiltDeg={tiltDeg} />
      </div>
    </section>
  );
}
