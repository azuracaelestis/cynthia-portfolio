import { useEffect, useRef, useState } from 'react';
import { useReducedMotion } from 'framer-motion';
import landingPageDesign from '../../../assets/case study/case-study-classroom-quest/design/landing-page-design.png';
import chooseCompanion from '../../../assets/case study/case-study-classroom-quest/design/choose-companion.mp4';
import missionScenarioDesign from '../../../assets/case study/case-study-classroom-quest/design/mission-scenario-design.mp4';
import resultPageDesign from '../../../assets/case study/case-study-classroom-quest/design/result-page.mp4';
import Section from '../../../components/case-study/Section';

function PlayIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
      <path d="M6 4.5v11l9-5.5-9-5.5z" />
    </svg>
  );
}

function PauseIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
      <rect x="5" y="4" width="3.5" height="12" rx="1" />
      <rect x="11.5" y="4" width="3.5" height="12" rx="1" />
    </svg>
  );
}

function AutoplayVideo({ src, ariaLabel }) {
  const reduceMotion = useReducedMotion();
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    if (reduceMotion) return undefined;
    const el = videoRef.current;
    if (!el) return undefined;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.play().catch(() => {});
        } else {
          el.pause();
        }
      },
      { threshold: 0.5 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [reduceMotion]);

  function togglePlay() {
    const el = videoRef.current;
    if (!el) return;
    if (el.paused) el.play().catch(() => {});
    else el.pause();
  }

  return (
    <div className="relative">
      <video
        ref={videoRef}
        src={src}
        aria-label={ariaLabel}
        className="w-full h-auto rounded-2xl"
        muted
        loop
        playsInline
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
      />
      <button
        type="button"
        onClick={togglePlay}
        aria-label={isPlaying ? 'Pause video' : 'Play video'}
        className="absolute left-4 bottom-4 w-[45px] h-[45px] rounded-full bg-ink/60 backdrop-blur-sm ring-2 ring-white/70 flex items-center justify-center text-white transition-transform hover:scale-105"
      >
        {isPlaying ? <PauseIcon /> : <PlayIcon />}
      </button>
    </div>
  );
}

export default function Design() {
  return (
    <Section id="design" eyebrow="DESIGN" eyebrowClassName="mb-4">
      <div className="flex flex-col gap-12 lg:gap-[90px]">
        <div>
          <p className="font-dm font-bold text-[20px] text-black mb-8 lg:mb-4">Landing Page</p>
          <img
            src={landingPageDesign}
            alt="Landing Page, desktop and mobile: 'Welcome to the Classroom Quest' hero banner with an 'Embark on Your Quest' CTA, illustrated classroom-hero characters, and intro copy."
            className="w-full h-auto rounded-2xl"
          />
        </div>
        <div>
          <p className="font-dm font-bold text-[20px] text-black mb-8 lg:mb-4">Choose Your Companion</p>
          <AutoplayVideo
            src={chooseCompanion}
            ariaLabel="Choose Your Companion, desktop and mobile: a walkthrough of the 'Choose Your Avatar for Today's Quest' screen with four character cards and an 'I'm Ready' CTA on the selected card."
          />
        </div>
        <div>
          <p className="font-dm font-bold text-[20px] text-black mb-8 lg:mb-4">Mission Scenario</p>
          <AutoplayVideo
            src={missionScenarioDesign}
            ariaLabel="Mission Scenario, desktop and mobile: a walkthrough of the chat-style story sequence ending in a highlighted choice."
          />
        </div>
        <div>
          <p className="font-dm font-bold text-[20px] text-black mb-8 lg:mb-4">Result Page</p>
          <AutoplayVideo
            src={resultPageDesign}
            ariaLabel="Result Page, desktop and mobile: a walkthrough of 'The Day Nothing Caught Fire' story recap, the 'Igniter of Curiosity' character result, and the 'You've Leveled Up!' attributes panel."
          />
        </div>
      </div>
    </Section>
  );
}
