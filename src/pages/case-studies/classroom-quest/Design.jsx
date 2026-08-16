import { useEffect, useRef, useState } from 'react';
import { useReducedMotion } from 'framer-motion';
import landingPageDesign from '../../../assets/case study/case-study-classroom-quest/design/landing-page-design.png';
import chooseYourCompanionDesign from '../../../assets/case study/case-study-classroom-quest/design/choose-your-companion-design.png';
import missionScenarioDesign from '../../../assets/case study/case-study-classroom-quest/design/mission-scenario-design.mp4';
import ImagePlaceholder from '../../../components/case-study/ImagePlaceholder';
import Section from '../../../components/case-study/Section';

function PlayIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
      <path d="M6 4.5v11l9-5.5-9-5.5z" />
    </svg>
  );
}

function PauseIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
      <rect x="5" y="4" width="3.5" height="12" rx="1" />
      <rect x="11.5" y="4" width="3.5" height="12" rx="1" />
    </svg>
  );
}

export default function Design() {
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
    <Section id="design" eyebrow="DESIGN" title="Here's what teachers actually played.">
      <div className="flex flex-col gap-6">
        <img
          src={landingPageDesign}
          alt="Landing Page, desktop and mobile: 'Welcome to the Classroom Quest' hero banner with an 'Embark on Your Quest' CTA, illustrated classroom-hero characters, and intro copy."
          className="w-full h-auto rounded-2xl"
        />
        <img
          src={chooseYourCompanionDesign}
          alt="Choose Your Companion, desktop and mobile: a 'Choose Your Avatar for Today's Quest' screen with four character cards and an 'I'm Ready' CTA on the selected card."
          className="w-full h-auto rounded-2xl"
        />
        <div className="relative">
          <video
            ref={videoRef}
            src={missionScenarioDesign}
            aria-label="Mission Scenario, desktop and mobile: a walkthrough of the chat-style story sequence ending in a highlighted choice."
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
            className="absolute left-4 bottom-4 w-14 h-14 rounded-full bg-ink/60 backdrop-blur-sm ring-2 ring-white/70 flex items-center justify-center text-white transition-transform hover:scale-105"
          >
            {isPlaying ? <PauseIcon /> : <PlayIcon />}
          </button>
        </div>
        <ImagePlaceholder className="h-64 lg:h-96" />
      </div>
    </Section>
  );
}
