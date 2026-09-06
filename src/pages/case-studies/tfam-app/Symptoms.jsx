import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import Section from '../../../components/case-study/Section';
import existingNavDrawer from '../../../assets/case study/case-study-tfam-app/symptoms/existing-nav-drawer.jpg';
import existingExhibitionDetail from '../../../assets/case study/case-study-tfam-app/symptoms/existing-exhibition-detail.jpg';
import existingAudioCodeEntry from '../../../assets/case study/case-study-tfam-app/symptoms/existing-audio-code-entry.jpg';
import existingAudioPlayer from '../../../assets/case study/case-study-tfam-app/symptoms/existing-audio-player.jpg';
import iconVolume from '../../../assets/case study/case-study-tfam-app/symptoms/icon-volume.svg';
import iconFrown from '../../../assets/case study/case-study-tfam-app/symptoms/icon-frown.svg';
import iconTag from '../../../assets/case study/case-study-tfam-app/symptoms/icon-tag.svg';
import iconThumbsDown from '../../../assets/case study/case-study-tfam-app/symptoms/icon-thumbs-down.svg';

const PROBLEMS = [
  {
    icon: iconVolume,
    title: 'Audio guide hard to start',
    body: "The app's whole reason to exist, yet starting it meant turning on Bluetooth or typing in a code. No clear way in.",
  },
  {
    icon: iconFrown,
    title: 'No way to book',
    body: 'Booking a tour or class meant leaving the app for email or a phone call.',
  },
  {
    icon: iconTag,
    title: 'Exhibition info was incomplete',
    body: 'The app only showed exhibitions that had an audio guide. For everything else, you went to the website.',
  },
  {
    icon: iconThumbsDown,
    title: "Buttons don't look tappable",
    body: "The interface was so clean, visitors couldn't tell what to press.",
  },
];

// 2x2 grid of the existing app's screens. Bottom row reordered (audioPlayer
// before audioCodeEntry) so the keyboard/code-entry screen lands bottom-right.
const SCREENS = [
  { key: 'exhibitionDetail', label: 'Homepage', src: existingExhibitionDetail, alt: "The existing TFAM app's exhibition detail screen" },
  { key: 'navDrawer', label: 'Side Bar', src: existingNavDrawer, alt: "The existing TFAM app's navigation drawer" },
  { key: 'audioPlayer', label: 'Audio Guide', src: existingAudioPlayer, alt: "The existing TFAM app's audio guide player screen" },
  { key: 'audioCodeEntry', label: 'Code Input', src: existingAudioCodeEntry, alt: "The existing TFAM app's audio guide code entry screen" },
];

// Numbered heuristic callouts, keyed by screen. Positions are estimated as
// top-left % of each image from the user's reference screenshot — there's
// no live browser here to measure pixel-exact placement, so flag for a
// follow-up nudge once seen live. `anchor: 'left'` (1–3) opens the callout
// below-left of the number; `anchor: 'right'` (4–7) opens it below-right.
const CALLOUTS = {
  exhibitionDetail: [
    {
      id: 1,
      top: '7%',
      left: '2%',
      anchor: 'left',
      title: 'Recognition Rather Than Recall (H6)',
      body: 'Nav hidden inside an unlabeled logo.',
    },
    {
      id: 2,
      top: '44%',
      left: '2%',
      anchor: 'left',
      title: 'Aesthetic & Minimalist Design (H8)',
      body: 'Image dominates, no supporting structure to guide the visitor.',
    },
    {
      id: 3,
      top: '76%',
      left: '2%',
      anchor: 'left',
      title: 'Visibility of System Status (H1)',
      body: 'Unlabeled row of marks at the bottom, purpose unclear.',
    },
  ],
  navDrawer: [
    {
      id: 4,
      top: '26%',
      left: '16%',
      anchor: 'right',
      title: 'Recognition Rather Than Recall (H6)',
      body: 'Six unlabeled icons in the left rail (logo, menu, heart, headphones, person, globe, eye).',
    },
    {
      id: 5,
      top: '68%',
      left: '88%',
      anchor: 'right',
      title: 'Consistency and Standards (H4)',
      body: '"Hours/Tickets" and "Current/Upcoming/Past" use two different visual styles for what could both be interactive.',
    },
    {
      id: 6,
      top: '84%',
      left: '52%',
      anchor: 'right',
      title: 'Consistency and Standards (H4)',
      body: 'Tapping Current, Upcoming, or Past exits the app to the website in a browser, instead of showing exhibitions in the app itself.',
    },
    {
      id: 7,
      top: '94%',
      left: '88%',
      anchor: 'right',
      title: 'Readability (supports H8)',
      body: 'Dotted background reduces text contrast.',
    },
  ],
  audioPlayer: [
    {
      id: 8,
      top: '5%',
      left: '9%',
      anchor: 'left',
      title: 'Consistency and Standards (H4)',
      body: 'The back icon has low, image-dependent contrast and an unconventional shape, unlike a standard chevron.',
    },
    {
      id: 9,
      top: '50%',
      left: '-2%',
      anchor: 'left',
      title: 'Consistency and Standards (H4)',
      body: 'Description text is fully justified, with the first line letter-spaced. On a narrow screen this creates uneven word gaps and hurts reading.',
    },
  ],
  audioCodeEntry: [
    {
      id: 10,
      top: '23%',
      left: '15%',
      anchor: 'right',
      title: 'Match Between System and Real World (H2)',
      body: 'Screen labeled "Keyboard," which names the component, not the task. A visitor expects something like "Enter audio guide number."',
    },
    {
      id: 11,
      top: '28%',
      left: '82%',
      anchor: 'right',
      title: 'Recognition Rather Than Recall (H6)',
      body: 'Manual number entry is the primary and only visible method; the scan option is a tiny icon tucked inside the input field.',
    },
    {
      id: 12,
      top: 'calc(41% - 18px)',
      left: '48%',
      anchor: 'right',
      title: 'Error Prevention (H5)',
      body: "No indication of how many digits the code should be, and no visible sign of what happens if it's wrong.",
    },
    {
      id: 13,
      top: '62%',
      left: '90%',
      anchor: 'right',
      title: 'Match Between System and Real World (H2)',
      body: 'The button says "Send," but this isn\'t a message, it should read "Play" or "Start."',
    },
  ],
};

// Flat, id-ordered list (each entry tagged with its own screen) so "Next"
// can walk 1 → 2 → 3 → ... across screens, not just within one image's set.
const ALL_CALLOUTS = Object.entries(CALLOUTS)
  .flatMap(([screenKey, items]) => items.map((c) => ({ ...c, screenKey })))
  .sort((a, b) => a.id - b.id);

function getNextCallout(id) {
  const index = ALL_CALLOUTS.findIndex((c) => c.id === id);
  return index >= 0 && index < ALL_CALLOUTS.length - 1 ? ALL_CALLOUTS[index + 1] : null;
}

function ChevronRight() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path d="M6 3.5 10.5 8 6 12.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default function Symptoms() {
  const reduceMotion = useReducedMotion();
  const [activeCallout, setActiveCallout] = useState(null);
  const screenRefs = useRef({});
  const calloutRefs = useRef({});

  function handleNext(id) {
    const next = getNextCallout(id);
    if (!next) return;
    setActiveCallout(next.id);
    screenRefs.current[next.screenKey]?.scrollIntoView({
      behavior: reduceMotion ? 'auto' : 'smooth',
      block: 'center',
    });
  }

  // Clicking anywhere outside the currently-open callout (its badge or its
  // popup) closes it. Uses mousedown, which fires before the badge/Next
  // button's own click handler, so clicking within the open callout itself
  // — including "Next" — never gets closed out from under it.
  useEffect(() => {
    if (activeCallout == null) return undefined;
    function handlePointerDown(event) {
      const el = calloutRefs.current[activeCallout];
      if (el && !el.contains(event.target)) {
        setActiveCallout(null);
      }
    }
    document.addEventListener('mousedown', handlePointerDown);
    return () => document.removeEventListener('mousedown', handlePointerDown);
  }, [activeCallout]);

  return (
    <Section
      id="symptoms"
      eyebrow="SYMPTOMS"
      eyebrowColor="text-tfam-gray"
      eyebrowClassName="mb-4"
      title="Built to look like art, not to be used"
      titleClassName="mb-3"
    >
      <p className="font-satoshi text-[16px] text-ink leading-[25px] mb-8">
        The app was not short on features. It had plenty. But it was built to look like the museum first, so the
        features visitors needed most were either hard to reach or missing. Four problems stood out.
      </p>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-[28px] gap-y-[32px]">
        {PROBLEMS.map((problem) => (
          <div
            key={problem.title}
            className="bg-white rounded-2xl shadow-[0px_0px_5px_rgba(0,0,0,0.1)] p-[20px] flex flex-col gap-5"
          >
            <div className="size-[42px] overflow-clip">
              <img src={problem.icon} alt="" className="block size-full" />
            </div>
            <div className="flex flex-col gap-3">
              <p className="font-satoshi font-bold text-[20px] leading-[25px] text-ink">{problem.title}</p>
              <p className="font-satoshi text-[16px] text-ink leading-[25px]">{problem.body}</p>
            </div>
          </div>
        ))}
      </div>

      <p className="font-satoshi text-[16px] text-ink leading-[25px] mt-[54px]">
        These weren&apos;t just my read. For an app this polished, the public reviews were only lukewarm.
      </p>

      <blockquote className="mt-6 bg-white rounded-2xl px-6 py-5 flex items-center gap-6">
        <div className="bg-black w-[3px] h-[85px] shrink-0" />
        <p className="font-satoshi text-[16px] text-ink leading-[30px]">
          &ldquo;A curator&apos;s vanity project, not a useful app for the public.&rdquo;
          <br />
          <span className="font-bold">— TFAM app review, App Store</span>
        </p>
      </blockquote>

      <p className="font-satoshi font-bold text-[20px] text-ink mt-[52px] mb-6">Heuristic Evaluation</p>
      <p className="font-satoshi text-[16px] text-ink leading-[25px]">
        Reviews told me people were frustrated. To find out exactly why, I ran a heuristic evaluation to turn the
        vague complaints into specific, nameable problems I could design against.
      </p>

      {/* 2x2 grid of the existing app's screens, centered in the content
          column. Base gaps (18px column / 53px row) are Figma's own, each
          bumped +42px per request; 16px radius and the 0 0 10px elevation
          are Figma's own too; the desktop grid width is Figma's 444px
          enlarged 20% (444 → 533), and falls back to a fluid 2-up on
          mobile. */}
      <div className="mt-12 grid grid-cols-2 gap-[58px] lg:gap-x-[60px] lg:gap-y-[95px] lg:w-[533px] mx-auto">
        {SCREENS.map((screen) => (
          <div key={screen.key} ref={(el) => (screenRefs.current[screen.key] = el)}>
            <p className="font-satoshi font-bold text-[14px] text-ink mb-2">{screen.label}</p>
            <div className="relative">
              <img
                src={screen.src}
                alt={screen.alt}
                className="w-full h-auto aspect-[213/463] object-cover rounded-2xl shadow-[0px_0px_10px_0px_rgba(0,0,0,0.1)]"
              />
            {(CALLOUTS[screen.key] || []).map((callout) => {
              const isOpen = activeCallout === callout.id;
              return (
                <div
                  key={callout.id}
                  ref={(el) => (calloutRefs.current[callout.id] = el)}
                  className="absolute"
                  style={{ top: callout.top, left: callout.left }}
                >
                  <button
                    type="button"
                    onClick={() => setActiveCallout(isOpen ? null : callout.id)}
                    aria-expanded={isOpen}
                    aria-label={`Heuristic ${callout.id}: ${callout.title}`}
                    className="relative flex items-center justify-center size-6"
                  >
                    {!reduceMotion && <span className="absolute inset-0 rounded-full bg-black animate-ping" />}
                    <span className="relative flex items-center justify-center size-6 rounded-full bg-black text-white font-satoshi font-bold text-[12px] shadow-[0px_2px_6px_rgba(0,0,0,0.3)]">
                      {callout.id}
                    </span>
                  </button>
                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={reduceMotion ? { opacity: 1 } : { opacity: 0, y: -6, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={reduceMotion ? { opacity: 0 } : { opacity: 0, y: -6, scale: 0.95 }}
                        transition={{ duration: reduceMotion ? 0 : 0.2, ease: 'easeOut' }}
                        className={`absolute top-full mt-2 ${callout.anchor === 'right' ? 'left-0' : 'right-0'} w-[200px] bg-tfam-callout rounded-xl shadow-[0px_4px_16px_rgba(0,0,0,0.2)] p-4 z-10`}
                      >
                        <p className="font-satoshi font-bold text-[14px] text-ink mb-1">{callout.title}</p>
                        <p className="font-satoshi text-[14px] text-charcoal leading-[19px]">{callout.body}</p>
                        {getNextCallout(callout.id) && (
                          <button
                            type="button"
                            onClick={() => handleNext(callout.id)}
                            className="mt-4 inline-flex items-center gap-1 font-satoshi font-bold text-[13px] text-ink hover:underline"
                          >
                            Next
                            <ChevronRight />
                          </button>
                        )}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
}
