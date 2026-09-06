import { useEffect, useRef, useState } from 'react';
import { motion, useInView, useReducedMotion } from 'framer-motion';
import Section from '../../../components/case-study/Section';
import yuChenLinPhoto from '../../../assets/case study/case-study-tfam-app/diagnosis/yu-chen-lin.jpg';
import marcoPhoto from '../../../assets/case study/case-study-tfam-app/diagnosis/marco.jpg';
import arrowRight from '../../../assets/case study/case-study-tfam-app/diagnosis/arrow-right.svg';

const FRICTION = [
  {
    title: 'Plan (Before the Visit)',
    body: 'Exhibition details are hard to find, and booking means an email or a phone call.',
    cx: 108.5,
  },
  {
    title: 'Wander (During Visit)',
    body: 'The audio guide has no clear way in. Visitors lean on staff and signage instead.',
    cx: 350,
  },
  {
    title: 'Remember (After)',
    body: "Nothing carries the visit home. There's no way to keep the pieces you loved.",
    cx: 595,
  },
];

// Dot/halo sizes are Figma's own (r=12.5 / 22) scaled down 28% total
// (20% then another 10%).
const DOT_R = 9;
const BASE_HALO_R = 15.84;
// Stable references so the infinite pulse loop doesn't restart every time
// `activeIndex` changes cx's target — only re-created if these values change.
const PULSE_R = [15.84, 24.48];
const PULSE_OPACITY = [0.25, 0];
const PULSE_TRANSITION = { duration: 2, repeat: Infinity, ease: 'easeOut' };
const FOLLOW_TRANSITION = { type: 'spring', stiffness: 400, damping: 35 };
const INSTANT_TRANSITION = { duration: 0 };
// Beat between each card's entrance — and the halo's jump to match it.
const REVEAL_STAGGER_MS = 450;
const LAST_INDEX = FRICTION.length - 1;

const cardVariants = { hidden: { opacity: 0, y: 8 }, visible: { opacity: 1, y: 0 } };
const cardVariantsReduced = { hidden: { opacity: 0 }, visible: { opacity: 1 } };
const cardTransition = { duration: 0.6, ease: [0, 0, 0.2, 1] };
const cardTransitionReduced = { duration: 0 };

// Same fade+rise shape as the friction cards above, but at the page's
// standard 0.4s (the 0.6s above is specific to the timeline's slower pace).
const revealTransition = { duration: 0.4, ease: [0, 0, 0.2, 1] };
const revealTransitionReduced = { duration: 0 };
const revealViewport = { once: true, margin: '0px 0px -20% 0px' };
const PERSONA_STAGGER = 0.1;

const PERSONAS = [
  {
    name: 'Yu-Chen Lin, 29',
    photo: yuChenLinPhoto,
    tag: 'Marketing manager in Taipei',
    badges: ['Repeat local', 'Mandarin speaker'],
    goal: 'See what’s on and book a tour in a few taps.',
    frustrations: 'Planning means juggling the website, social media, and a phone call.',
    breaks: 'Before she leaves home. Language is never her problem, planning is.',
  },
  {
    name: 'Marco Rossi, 34',
    photo: marcoPhoto,
    tag: 'Architect visiting from Milan',
    badges: ['First-time tourist', 'Non-Mandarin speaker'],
    goal: 'Find his way and understand the art without leaning on staff.',
    frustrations: 'The app and signage assume Mandarin, and the audio codes on the placards mean nothing to him.',
    breaks: 'The moment he walks in. Language is the first wall he hits.',
  },
];

// Monochrome icon set for the persona traits — target/frown/lightbulb,
// matching the reference layout's icon-per-row pattern but in black/white.
const TRAITS = [
  { key: 'goal', label: 'Goal', Icon: TargetIcon },
  { key: 'frustrations', label: 'Frustrations', Icon: FrownIcon },
  { key: 'breaks', label: 'Breaks', Icon: LightbulbIcon },
];

function TargetIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="12" cy="12" r="9" stroke="black" strokeWidth="2" />
      <circle cx="12" cy="12" r="5" stroke="black" strokeWidth="2" />
      <circle cx="12" cy="12" r="1.5" fill="black" />
    </svg>
  );
}

function FrownIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="12" cy="12" r="9" stroke="black" strokeWidth="2" />
      <path d="M8.5 16c.9-1.2 2.1-1.8 3.5-1.8s2.6.6 3.5 1.8" stroke="black" strokeWidth="2" strokeLinecap="round" />
      <circle cx="9" cy="10" r="1" fill="black" />
      <circle cx="15" cy="10" r="1" fill="black" />
    </svg>
  );
}

function LightbulbIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M9 18h6M10 21h4M12 3a6 6 0 0 0-3.5 10.9c.5.4.8 1 .8 1.6V16h5.4v-.5c0-.6.3-1.2.8-1.6A6 6 0 0 0 12 3Z"
        stroke="black"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

const QUESTIONS = [
  'How might we surface the audio guide the moment a visitor arrives?',
  'How might we help first-timers navigate without staff or signage?',
  'How might we help recurring visitors discover current and upcoming exhibitions?',
  'How might we let visitors book in a few taps instead of emailing or calling?',
  'How might we help visitors keep the works they loved?',
];

export default function Diagnosis() {
  const reduceMotion = useReducedMotion();
  const cardsRowRef = useRef(null);
  const isTimelineInView = useInView(cardsRowRef, { once: true, margin: '0px 0px -20% 0px' });
  // Resting state is the LAST card once the reveal has played through (or
  // immediately, under reduced motion) — not back to Plan.
  const [activeIndex, setActiveIndex] = useState(reduceMotion ? LAST_INDEX : 0);
  const hasInteractedRef = useRef(false);
  const timeoutsRef = useRef([]);

  // Halo advances in lockstep with each card's own staggered reveal (same
  // delay values as `cardTransition` below), so the flare only ever appears
  // on a card once that card has actually appeared — never ahead of it.
  // It stops on the last card and pulses there; it doesn't loop back.
  useEffect(() => {
    if (!isTimelineInView || reduceMotion) return undefined;
    FRICTION.forEach((_, index) => {
      if (index === 0) return; // already resting there
      const id = setTimeout(() => {
        if (hasInteractedRef.current) return;
        setActiveIndex(index);
      }, index * REVEAL_STAGGER_MS);
      timeoutsRef.current.push(id);
    });
    return () => {
      timeoutsRef.current.forEach(clearTimeout);
      timeoutsRef.current = [];
    };
  }, [isTimelineInView, reduceMotion]);

  function handleMomentActive(index) {
    hasInteractedRef.current = true;
    timeoutsRef.current.forEach(clearTimeout);
    setActiveIndex(index);
  }

  return (
    <Section
      id="diagnosis"
      eyebrow="DIAGNOSIS"
      eyebrowColor="text-tfam-gray"
      eyebrowClassName="mb-6"
      title="Five visitors, one clear pattern"
      titleClassName="mb-2"
    >
      <p className="font-satoshi text-[16px] text-ink leading-[23px] mb-12">
        I used two research methods. First, five in-depth interviews with real visitors, both locals and tourists.
        Second, a four-lens audit of the live app: App Store reviews, TripAdvisor feedback, a heuristic review, and
        my own walkthrough inside the museum. The interviews showed me the pattern. The audit confirmed it.
      </p>

      {/* Timeline, per Figma (node 258:1090): a rail with a dot above each
          moment — the first ringed — over three cards. The block is capped at
          the design's own 711px so the dots stay centered over their cards;
          the rail is hidden on mobile, where the cards stack. Dot/halo sizes
          are the design's own, scaled down 20%.

          The ringed dot is an active-state indicator, not just decoration:
          as the three cards reveal one by one on scroll-in, the flaring halo
          advances to each card right as it appears, then stops and keeps
          pulsing on the last one (Remember) — it never loops back to Plan.
          Hovering/focusing a card cancels the sequence for good and moves
          the halo there instead — it stays on the last moment looked at. */}
      <div className="mb-[52px] w-full max-w-[711px] mx-auto flex flex-col items-center gap-8">
        <p className="font-satoshi font-bold text-[20px] text-ink w-full">Friction mapped to the visit journey</p>
        <svg viewBox="0 0 700 44" className="hidden lg:block w-[700px] h-[44px]" aria-hidden="true">
          <rect y="19" width="700" height="5" rx="2.5" fill="black" />
          {!reduceMotion && (
            <motion.circle
              cy="22.5"
              fill="black"
              animate={{ cx: FRICTION[activeIndex].cx, r: PULSE_R, fillOpacity: PULSE_OPACITY }}
              transition={{ cx: FOLLOW_TRANSITION, r: PULSE_TRANSITION, fillOpacity: PULSE_TRANSITION }}
            />
          )}
          <motion.circle
            cy="22.5"
            r={BASE_HALO_R}
            fill="black"
            fillOpacity="0.2"
            animate={{ cx: FRICTION[activeIndex].cx }}
            transition={reduceMotion ? INSTANT_TRANSITION : FOLLOW_TRANSITION}
          />
          {FRICTION.map((f) => (
            <circle key={f.title} cx={f.cx} cy="22.5" r={DOT_R} fill="black" />
          ))}
        </svg>
        <div ref={cardsRowRef} className="w-full flex flex-col lg:flex-row lg:items-stretch lg:justify-between gap-6">
          {FRICTION.map((f, i) => (
            <motion.div
              key={f.title}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '0px 0px -20% 0px' }}
              variants={reduceMotion ? cardVariantsReduced : cardVariants}
              transition={{
                ...(reduceMotion ? cardTransitionReduced : cardTransition),
                delay: reduceMotion ? 0 : (i * REVEAL_STAGGER_MS) / 1000,
              }}
              onMouseEnter={() => handleMomentActive(i)}
              onFocus={() => handleMomentActive(i)}
              className="bg-white rounded-2xl shadow-[0px_0px_10px_rgba(0,0,0,0.1)] p-6 lg:w-[221px] flex flex-col gap-3 transition-transform duration-200 ease-out hover:-translate-y-1"
            >
              <p className="font-satoshi font-bold text-[16px] text-ink">{f.title}</p>
              <p className="font-satoshi text-[16px] text-ink">{f.body}</p>
            </motion.div>
          ))}
        </div>
      </div>

      <div className="mb-[52px]">
        <p className="font-satoshi font-bold text-[20px] text-ink mb-6">New User Persona</p>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {PERSONAS.map((p, i) => (
            <motion.div
              key={p.name}
              initial="hidden"
              whileInView="visible"
              viewport={revealViewport}
              variants={reduceMotion ? cardVariantsReduced : cardVariants}
              transition={{ ...(reduceMotion ? revealTransitionReduced : revealTransition), delay: reduceMotion ? 0 : i * PERSONA_STAGGER }}
              className="bg-white rounded-2xl shadow-[0px_0px_10px_rgba(0,0,0,0.1)] overflow-hidden"
            >
              <img
                src={p.photo}
                alt={p.name}
                className="w-full h-[270px] lg:h-[306px] object-cover"
                style={{ objectPosition: 'center calc(50% + 48px)' }}
              />
              <div className="p-8 flex flex-col gap-4">
                <div>
                  <p className="font-satoshi font-bold text-[24px] text-ink">{p.name}</p>
                  <p className="font-satoshi text-[16px] text-charcoal">{p.tag}</p>
                </div>
                <div className="flex flex-wrap gap-2">
                  {p.badges.map((badge) => (
                    <span key={badge} className="rounded-full bg-ink/5 font-satoshi text-[14px] text-ink px-4 py-2">
                      {badge}
                    </span>
                  ))}
                </div>
                <div className="flex flex-col gap-4 mt-6">
                  {TRAITS.map(({ key, label, Icon }) => (
                    <div key={key} className="flex gap-4 items-start">
                      <span className="shrink-0 size-11 rounded-full bg-ink/5 flex items-center justify-center">
                        <Icon />
                      </span>
                      <div>
                        <p className="font-satoshi font-bold text-[16px] text-ink">{label}</p>
                        <p className="font-satoshi text-[16px] text-charcoal leading-[23px]">{p[key]}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <div className="mb-[52px]">
        <p className="font-satoshi font-bold text-[20px] text-ink mb-6">Each frustration turned into a question</p>
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={revealViewport}
          variants={reduceMotion ? cardVariantsReduced : cardVariants}
          transition={reduceMotion ? revealTransitionReduced : revealTransition}
          className="bg-white rounded-2xl shadow-[0px_0px_10px_rgba(0,0,0,0.1)] p-6 flex flex-col gap-[14px]"
        >
          {QUESTIONS.map((q) => (
            <div key={q} className="flex gap-[14px] items-start">
              <img src={arrowRight} alt="" className="shrink-0 size-5" />
              <p className="font-satoshi text-[16px] text-ink">{q}</p>
            </div>
          ))}
        </motion.div>
      </div>

      <div>
        <p className="font-satoshi font-bold text-[20px] text-ink mb-2">The decision this led to</p>
        <p className="font-satoshi text-[16px] text-ink leading-[25px] mb-8">
          The personas pointed to one choice. Instead of redesigning a list of features, I anchored the whole app on
          three moments in a visit: <span className="font-bold">plan, wander, remember</span>. Every feature would
          live inside whichever moment it actually served.
        </p>
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={revealViewport}
          variants={reduceMotion ? cardVariantsReduced : cardVariants}
          transition={reduceMotion ? revealTransitionReduced : revealTransition}
          className="bg-ink/5 rounded-2xl p-6 flex flex-col gap-2"
        >
          <p className="font-satoshi font-bold text-[16px] text-ink">Guiding principle</p>
          <p className="font-satoshi text-[16px] text-ink">
            People take in information best right when they need it, not all at once on a home screen.
          </p>
        </motion.div>
      </div>
    </Section>
  );
}
