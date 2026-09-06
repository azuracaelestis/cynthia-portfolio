import { useEffect, useRef, useState } from 'react';
import { animate, motion, useInView, useReducedMotion } from 'framer-motion';
import Section from '../../../components/case-study/Section';
import ImagePlaceholder from '../../../components/case-study/ImagePlaceholder';
import tryItYourself from '../../../assets/case study/case-study-tfam-app/solutions/try-it-yourself.png';
import qrCode from '../../../assets/case study/case-study-tfam-app/solutions/qr-code.png';
import whatsonMockup from '../../../assets/case study/case-study-tfam-app/solutions/whatson-mockup.mp4';
import activitiesMockup from '../../../assets/case study/case-study-tfam-app/solutions/activities-mockup.mp4';
import audioGuideMockup from '../../../assets/case study/case-study-tfam-app/solutions/audio-guide-mockup.mp4';
import mapSuggestedRouteMockup from '../../../assets/case study/case-study-tfam-app/solutions/map-suggested-route-mockup.mp4';

// IA tree, per Figma (node 258:1227): a root pill fanning out to 5 tabs,
// each tab a vertical chain of screens.
const IA_TABS = [
  { name: 'Home', screens: ['Arrival Screen', 'Audio Guide'] },
  { name: "What's On", screens: ['Exhibition List', 'Exhibition Detail', 'Getting There'] },
  { name: 'Map', screens: ['Floor Map', 'Suggested Route', 'Exhibition Detail'] },
  {
    name: 'Activities',
    screens: ['Activities List', 'Date/Time Picker', 'Slot Picker', 'Confirm Screen', 'Booking Confirm'],
  },
  { name: 'Settings', screens: ['Notification', 'Interest Picker', 'Notification Toggle'] },
];

function DownArrow() {
  return (
    <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true" className="shrink-0 text-ink/30">
      <path d="M8 2v10.5M3.5 9 8 13.5 12.5 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

// Shared scroll-reveal recipe (matches Section.jsx / Diagnosis / Symptoms —
// one fade+rise system across the whole page).
const revealVariants = { hidden: { opacity: 0, y: 8 }, visible: { opacity: 1, y: 0 } };
const revealVariantsReduced = { hidden: { opacity: 0 }, visible: { opacity: 1 } };
const revealTransition = { duration: 0.4, ease: [0, 0, 0.2, 1] };
const revealTransitionReduced = { duration: 0 };
const revealViewport = { once: true, margin: '0px 0px -20% 0px' };
const STAT_STAGGER = 0.1;

// Whole diagram scaled down ~10% (padding/font/gap) from the original
// build, per feedback that it read as too cramped/blocky at full size.
// Reveals as ONE unit (single fade, no per-box stagger) — with ~20 small
// boxes inside, staggering each one would read as slow/busy rather than
// polished, matching how Classroom Quest treats its own large diagram.
function IaDiagram() {
  const reduceMotion = useReducedMotion();
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={revealViewport}
      variants={reduceMotion ? revealVariantsReduced : revealVariants}
      transition={reduceMotion ? revealTransitionReduced : revealTransition}
      className="mb-12"
    >
      {/* Root pill + fan-out connector. The connector is a simplified,
          edge-to-edge version of Figma's center-to-center bar — close enough
          to read as the same tree, much simpler than tracing exact vector
          paths. */}
      <div className="hidden lg:flex flex-col items-center">
        <span className="bg-ink text-white font-satoshi font-bold text-[14px] rounded-full px-[18px] py-[9px]">
          TFAM App
        </span>
        <div className="w-px h-[22px] bg-ink/20" />
        <div className="w-full border-t border-ink/20">
          <div className="grid grid-cols-5">
            {IA_TABS.map((tab) => (
              <div key={tab.name} className="flex justify-center">
                <div className="w-px h-[22px] bg-ink/20" />
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-[14px] lg:gap-[11px]">
        {IA_TABS.map((tab) => (
          <div key={tab.name} className="flex flex-col items-center gap-[7px]">
            <div className="w-full bg-tfam-chip border border-tfam-chip rounded-2xl p-[14px] lg:p-[22px] text-center">
              <p className="font-satoshi font-bold text-[13px] text-ink">{tab.name}</p>
            </div>
            {tab.screens.map((screen) => (
              <div key={screen} className="w-full flex flex-col items-center gap-[7px]">
                <DownArrow />
                <div className="w-full bg-tfam-screen border border-tfam-chip rounded-2xl px-[11px] py-[14px] lg:py-[22px] text-center">
                  <p className="font-satoshi font-bold text-[13px] text-ink">{screen}</p>
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
    </motion.div>
  );
}

// Per Figma (nodes 258:1301 / 258:1315): each moment is its own heading, then
// one or more rows of 2 features, each row a pair of 317x396 screenshot
// placeholders above the matching pair of title/body text. Wander's
// "Notification" feature repeats the Audio Guide's body text verbatim in
// Figma itself — not a PDF-extraction artifact, kept as-is, flagged below.
const MOMENTS = [
  {
    title: 'Plan (Before the Visit)',
    rows: [
      [
        {
          title: "What's On",
          body: 'Current and upcoming exhibitions in one place, so visitors stop hunting across social media, the website, and the front desk.',
          video: whatsonMockup,
          videoScale: 'scale-110',
        },
        {
          title: 'Pre-Book Activities',
          body: 'Reserve in a few taps, right in the app, instead of an email or a phone call. Target: 80%+ of people finish it in under 45 seconds.',
          video: activitiesMockup,
          videoScale: 'scale-110',
        },
      ],
    ],
  },
  {
    title: 'Wander (During the Visit)',
    rows: [
      [
        {
          title: 'Audio Guide',
          body: 'The app opens on a clear "Start audio guide" button. No digging through menus. Target: a 25% lift in audio guide use.',
          video: audioGuideMockup,
          videoScale: 'scale-110',
        },
        {
          title: 'Floor Map & Suggested Route',
          body: 'Works without a connection, so first-timers can find their way without relying on staff or signage.',
          video: mapSuggestedRouteMockup,
          videoScale: 'scale-110',
        },
      ],
      [
        {
          title: 'Notification',
          body: 'The app opens on a clear "Start audio guide" button. No digging through menus. Target: a 25% lift in audio guide use.',
        },
        {
          title: 'Language',
          body: 'The whole app works in English as well as Mandarin. The audio codes on the placards now map to something a tourist can actually read and start.',
        },
      ],
    ],
  },
];

// Per Figma (node 258:1340): 3 stacked full-width rows, not a 3-col grid —
// a number on the left, a bold label + body pair on the right. `value` is
// numeric (not the display string) so it can be counted up on scroll-in.
const STATS = [
  {
    prefix: '+',
    value: 25,
    suffix: '%',
    label: 'Feature discovery',
    body: 'Aimed lift in audio guide use, by surfacing it on arrival.',
  },
  {
    prefix: '',
    value: 80,
    suffix: '%',
    label: 'Self-service booking',
    body: 'Booking completion in-app, replacing email and phone less than 45 sec.',
  },
  {
    prefix: '',
    value: 4,
    suffix: '/5',
    label: 'Visitor confidence',
    body: 'Target confidence score in post-visit surveys.',
  },
];

// Counts up from 0 the first time it scrolls into view; reduced motion skips
// straight to the final value.
function CountUpStat({ prefix, value, suffix }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '0px 0px -20% 0px' });
  const reduceMotion = useReducedMotion();
  const [display, setDisplay] = useState(reduceMotion ? value : 0);

  useEffect(() => {
    if (!isInView) return undefined;
    if (reduceMotion) {
      setDisplay(value);
      return undefined;
    }
    const controls = animate(0, value, {
      duration: 1.2,
      ease: 'easeOut',
      onUpdate: (v) => setDisplay(Math.round(v)),
    });
    return () => controls.stop();
  }, [isInView, reduceMotion, value]);

  return (
    <p ref={ref} className="font-satoshi font-medium text-[36px] text-ink shrink-0 w-[80px] lg:w-[106px]">
      {prefix}
      {display}
      {suffix}
    </p>
  );
}

function PlayIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
      <path d="M6 4.5v11l9-5.5-9-5.5z" />
    </svg>
  );
}

function PauseIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
      <rect x="5" y="4" width="3.5" height="12" rx="1" />
      <rect x="11.5" y="4" width="3.5" height="12" rx="1" />
    </svg>
  );
}

// Same circular play/pause button as Classroom Quest's Design.jsx (sized
// 30% smaller and resting at 30% opacity here, revealing fully on hover) —
// no native controls, play state driven by the video's own onPlay/onPause
// so it stays correct regardless of what triggered the change (the
// button, or the scroll-triggered `active` handoff below).
function MockupVideo({ src, scaleClassName, active, isLast, onEnded }) {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const hasHandedOffRef = useRef(false);

  // Starts playing once `active` turns true (the scroll-into-view trigger,
  // or this video's turn in the What's On → Pre-Book Activities handoff) —
  // doesn't attempt to pause on active:false, so a manual play via the
  // button is never fought.
  useEffect(() => {
    if (active) videoRef.current?.play().catch(() => {});
  }, [active]);

  // Every video ends up looping forever — but a non-last video needs its
  // FIRST end to fire the handoff to the next one, and native `loop` never
  // fires `ended` at all. So only the last video uses native `loop`; the
  // others play with `loop=false`, fire the handoff callback once on their
  // real `ended` event, then this handler restarts them manually — a
  // hand-rolled loop for exactly as long as it takes to have already
  // signaled the handoff.
  function handleEnded() {
    if (!hasHandedOffRef.current) {
      hasHandedOffRef.current = true;
      onEnded?.();
    }
    if (!isLast) videoRef.current?.play().catch(() => {});
  }

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
        className={`w-full aspect-[317/396] object-cover rounded-2xl ${scaleClassName ?? ''}`}
        loop={isLast}
        muted
        playsInline
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
        onEnded={handleEnded}
      />
      <button
        type="button"
        onClick={togglePlay}
        aria-label={isPlaying ? 'Pause video' : 'Play video'}
        className="absolute left-4 bottom-4 w-10 h-10 rounded-full bg-ink/60 backdrop-blur-sm ring-2 ring-white/70 flex items-center justify-center text-white opacity-30 hover:opacity-100 transition-[opacity,transform] hover:scale-105"
      >
        {isPlaying ? <PauseIcon /> : <PlayIcon />}
      </button>
    </div>
  );
}

// Starts the row's videos in order once it scrolls into view — What's On
// plays first; when it finishes once, Pre-Book Activities starts, and both
// keep looping continuously from then on.
function MockupRow({ features }) {
  const rowRef = useRef(null);
  const isInView = useInView(rowRef, { once: true, margin: '0px 0px -20% 0px' });
  const videoIndices = features.map((f, i) => (f.video ? i : null)).filter((i) => i !== null);
  const [activeIndex, setActiveIndex] = useState(null);

  useEffect(() => {
    if (isInView && videoIndices.length > 0) setActiveIndex(videoIndices[0]);
    // videoIndices is derived fresh from `features` every render — safe to
    // omit from deps since `features` (and thus its content) doesn't change
    // after mount for a given row.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isInView]);

  function handleEnded(i) {
    const position = videoIndices.indexOf(i);
    if (position !== -1 && position < videoIndices.length - 1) {
      setActiveIndex(videoIndices[position + 1]);
    }
  }

  return (
    <div ref={rowRef} className="grid grid-cols-1 lg:grid-cols-2 gap-[52px]">
      {features.map((f, i) =>
        f.video ? (
          <MockupVideo
            key={f.title}
            src={f.video}
            scaleClassName={f.videoScale}
            active={activeIndex === i}
            isLast={i === videoIndices[videoIndices.length - 1]}
            onEnded={() => handleEnded(i)}
          />
        ) : (
          <ImagePlaceholder key={f.title} label="Screenshot" className="w-full aspect-[317/396]" />
        ),
      )}
    </div>
  );
}

export default function Solutions() {
  const reduceMotion = useReducedMotion();
  return (
    <Section id="solutions" eyebrow="SOLUTION" eyebrowColor="text-tfam-gray" title="One companion, three moments of the visit">
      <p className="font-satoshi font-bold text-[20px] text-ink mb-4">From three moments to a five-tab app</p>
      <p className="font-satoshi text-[16px] text-ink leading-[23px] mb-[57px]">
        The three moments became five tabs: Home, What&apos;s On, Map, Classes, and Settings. Every feature that was
        buried in the old app now sits in the tab where a visitor would go looking for it. The audio guide, the old
        app&apos;s weakest point, is now reachable from Home, What&apos;s On, and the Map, so it&apos;s never more
        than one tap away.
      </p>

      <IaDiagram />

      {/* Figma (node 258:1301 vs 258:1227) measures a 146px gap here — much
          wider than the 87px between individual moments — reproduced as-is
          rather than rounded down to match the smaller rhythm. */}
      <div className="flex flex-col gap-[87px] mt-[98px]">
        {MOMENTS.map((m) => (
          <div key={m.title} className="flex flex-col gap-[42px]">
            <p className="font-satoshi font-bold text-[20px] text-ink">{m.title}</p>
            {m.rows.map((row, rowIndex) => (
              <div key={rowIndex} className="flex flex-col gap-6">
                <MockupRow features={row} />
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-[32px]">
                  {row.map((f) => (
                    <div key={f.title} className="flex flex-col gap-4">
                      <p className="font-satoshi font-bold text-[16px] text-ink">{f.title}</p>
                      <p className="font-satoshi text-[16px] text-ink leading-[25px]">{f.body}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>

      <div className="mt-[56px] mb-[80px]">
        <p className="font-satoshi font-bold text-[20px] text-ink mb-[21px]">Remember (After the Visit)</p>
        <p className="font-satoshi text-[16px] text-ink leading-[25px]">
          Save the pieces you loved during the visit. This was the lowest-friction moment of the three, so it was
          the right one to cut from this build while booking and wayfinding came first.
        </p>
      </div>

      <div className="bg-ink/5 rounded-2xl p-6 mb-[49px] flex flex-col gap-2">
        <p className="font-satoshi font-bold text-[14px] text-ink">Note on the numbers below</p>
        <p className="font-satoshi text-[14px] text-ink leading-[21px]">
          This is a self-initiated passion project, so these are design targets I&apos;d measure against, not results
          from real usage. I&apos;m labelling them that way on purpose. Validating them against real visitor data is
          the natural next step once the museum&apos;s booking system exists.
        </p>
      </div>

      {/* Per Figma (node 258:1340): a vertical stack of full-width rows, not
          a 3-col grid of centered cards. */}
      <div className="flex flex-col gap-3 mb-[119px]">
        {STATS.map((s, i) => (
          <motion.div
            key={s.label}
            initial="hidden"
            whileInView="visible"
            viewport={revealViewport}
            variants={reduceMotion ? revealVariantsReduced : revealVariants}
            transition={{ ...(reduceMotion ? revealTransitionReduced : revealTransition), delay: reduceMotion ? 0 : i * STAT_STAGGER }}
            className="bg-white rounded-2xl shadow-[0px_0px_5px_rgba(0,0,0,0.1)] p-6 flex items-start"
          >
            <CountUpStat prefix={s.prefix} value={s.value} suffix={s.suffix} />
            <div className="flex flex-col gap-[9px] pl-6">
              <p className="font-satoshi font-bold text-[16px] text-ink">{s.label}</p>
              <p className="font-satoshi text-[16px] text-ink">{s.body}</p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Per Figma (node 258:1459), updated design: a real phone-mockup
          screenshot beside a QR code + copy, not a dark CTA card. No
          "Launch the Prototype" button — a QR code is meant to be scanned
          with the visitor's own phone, so a button here would be redundant
          on desktop. A mobile-specific button (scanning isn't useful there)
          is a possible follow-up, not built yet. */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={revealViewport}
        variants={reduceMotion ? revealVariantsReduced : revealVariants}
        transition={reduceMotion ? revealTransitionReduced : revealTransition}
        className="flex flex-col lg:flex-row gap-8 lg:gap-[42px] items-center justify-center"
      >
        <img
          src={tryItYourself}
          alt="TFAM app arrival screen, showing a welcome message, a Start audio guide button, and Today at the Museum and Explore the Museum sections"
          className="w-full max-w-[259px] h-auto rounded-2xl shrink-0"
        />
        <div className="flex flex-col gap-3 items-center text-center lg:w-[292px]">
          <img src={qrCode} alt="QR code linking to the TFAM app prototype" className="size-[103px]" />
          <p className="font-satoshi font-bold text-[20px] text-ink">Try it yourself</p>
          <p className="font-satoshi text-[14px] text-ink leading-[21px]">
            This is a real, working prototype. Walk through the arrival screen, start the audio guide, and book a
            class, just like a visitor would. Please access it by using your phone.
          </p>
        </div>
      </motion.div>
    </Section>
  );
}
