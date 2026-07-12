import { useRef, useState } from 'react';
import { useInView } from 'framer-motion';
import { useTimeOfDay } from '../../hooks/useTimeOfDay';
import { useIsScrolling } from '../../hooks/useIsScrolling';
import Character from './Character';
import ThoughtPostits from './ThoughtPostits';

export default function Hero() {
  const sectionRef = useRef(null);
  const isHeroInView = useInView(sectionRef, { amount: 0.4 });
  const isNight = useTimeOfDay();
  const isScrolling = useIsScrolling();
  const [isHoveringCta, setIsHoveringCta] = useState(false);

  const isThinking = isScrolling && isHeroInView;
  const mood = isThinking ? 'thinking' : isHoveringCta ? 'awake' : isNight ? 'sleeping' : 'awake';

  return (
    <section
      ref={sectionRef}
      id="home"
      className="relative mx-auto max-w-7xl px-6 lg:px-10 pt-36 pb-24 grid lg:grid-cols-2 gap-12 items-center"
    >
      <div>
        <h1 className="font-display font-extrabold text-5xl sm:text-6xl leading-[1.05] tracking-tight text-ink">
          I design product experiences that <em className="font-semibold italic text-sky-600">simplify</em> complexity
        </h1>
        <p className="mt-6 text-lg text-ink/70 max-w-md">
          Bridging graphic design thinking and visual product design for tech.
        </p>
        <div className="mt-9 flex flex-wrap gap-4">
          <a
            href="#work"
            onMouseEnter={() => setIsHoveringCta(true)}
            onMouseLeave={() => setIsHoveringCta(false)}
            className="rounded-full bg-amber-400 hover:bg-amber-600 transition-colors px-7 py-3.5 font-semibold text-ink"
          >
            View Work
          </a>
          <a
            href="/resume.pdf"
            onMouseEnter={() => setIsHoveringCta(true)}
            onMouseLeave={() => setIsHoveringCta(false)}
            className="rounded-full border-2 border-ink/15 hover:border-ink/30 transition-colors px-7 py-3.5 font-semibold text-ink"
          >
            Download Resume
          </a>
        </div>
      </div>

      <div className="relative flex justify-center lg:justify-end">
        <ThoughtPostits show={isThinking} />
        <Character mood={mood} />
      </div>
    </section>
  );
}
