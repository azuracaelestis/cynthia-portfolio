import { useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { useActiveSection } from '../../../hooks/useActiveSection';
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

// All 4 existing-app screens, in 2 side-by-side pairs, each using the
// always-visible leader-line layout: the first screen in a pair has its
// notes on the LEFT, the second has them on the RIGHT — the two images in
// a pair sit next to each other in the middle, notes flanking the outside.
const ANNOTATED_SCREENS = [
  {
    key: 'exhibitionDetail',
    label: 'Homepage',
    src: existingExhibitionDetail,
    alt: "The existing TFAM app's exhibition detail screen",
    notesOnLeft: true,
  },
  {
    key: 'navDrawer',
    label: 'Side Bar',
    src: existingNavDrawer,
    alt: "The existing TFAM app's navigation drawer",
    notesOnLeft: false,
  },
  {
    key: 'audioPlayer',
    label: 'Audio Guide',
    src: existingAudioPlayer,
    alt: "The existing TFAM app's audio guide player screen",
    notesOnLeft: true,
    noteTextWidth: 135,
  },
  {
    key: 'audioCodeEntry',
    label: 'Code Input',
    src: existingAudioCodeEntry,
    alt: "The existing TFAM app's audio guide code entry screen",
    notesOnLeft: false,
    noteTextWidth: 135,
  },
];

// Shared scroll-reveal recipe (matches Section.jsx's eyebrow/title reveal and
// Diagnosis's friction cards) — one fade+rise system for the whole page.
const revealVariants = { hidden: { opacity: 0, y: 8 }, visible: { opacity: 1, y: 0 } };
const revealVariantsReduced = { hidden: { opacity: 0 }, visible: { opacity: 1 } };
const revealTransition = { duration: 0.4, ease: [0, 0, 0.2, 1] };
const revealTransitionReduced = { duration: 0 };
const revealViewport = { once: true, margin: '0px 0px -20% 0px' };
const CARD_STAGGER = 0.08;

// Numbered heuristic callouts, keyed by screen. Positions are estimated as
// top-left % of each image from the user's reference screenshot — there's
// no live browser here to measure pixel-exact placement, so flag for a
// follow-up nudge once seen live. The popup always opens bottom-center under
// the number (see the callout's className below).
const CALLOUTS = {
  exhibitionDetail: [
    {
      id: 1,
      top: '7%',
      left: '2%',
      title: 'Recognition Rather Than Recall (H6)',
      body: 'Nav hidden inside an unlabeled logo.',
    },
    {
      id: 2,
      top: '44%',
      left: '2%',
      title: 'Aesthetic & Minimalist Design (H8)',
      body: 'Image dominates, no supporting structure to guide the visitor.',
    },
    {
      id: 3,
      top: '76%',
      left: '2%',
      title: 'Visibility of System Status (H1)',
      body: 'Unlabeled row of marks at the bottom, purpose unclear.',
    },
  ],
  navDrawer: [
    {
      id: 4,
      top: '5%',
      left: '10%',
      title: 'Recognition Rather Than Recall (H6)',
      body: 'Six unlabeled icons in the left rail (logo, menu, heart, headphones, person, globe, eye).',
    },
    {
      id: 5,
      top: 'calc(68% - 48px)',
      left: '88%',
      title: 'Consistency and Standards (H4)',
      body: '"Hours/Tickets" and "Current/Upcoming/Past" use two different visual styles for what could both be interactive.',
    },
    {
      id: 6,
      top: '90%',
      left: '52%',
      title: 'Consistency and Standards (H4)',
      body: 'Tapping Current, Upcoming, or Past exits the app to the website in a browser, instead of showing exhibitions in the app itself.',
    },
  ],
  audioPlayer: [
    {
      id: 8,
      top: '5%',
      left: '9%',
      title: 'Consistency and Standards (H4)',
      body: 'The back icon has low, image-dependent contrast and an unconventional shape, unlike a standard chevron.',
    },
    {
      id: 9,
      top: '50%',
      left: '-2%',
      title: 'Consistency and Standards (H4)',
      body: 'Description text is fully justified, with the first line letter-spaced. On a narrow screen this creates uneven word gaps and hurts reading.',
    },
  ],
  audioCodeEntry: [
    {
      id: 10,
      top: '2%',
      left: '15%',
      title: 'Match Between System and Real World (H2)',
      body: 'Screen labeled "Keyboard," which names the component, not the task. A visitor expects something like "Enter audio guide number."',
    },
    {
      id: 11,
      top: '70%',
      left: '90%',
      title: 'Match Between System and Real World (H2)',
      body: 'The button says "Send," but this isn\'t a message, it should read "Play" or "Start."',
    },
  ],
};

// DOM ids the scroll-spy watches — one per screen block in the left column.
const HEURISTIC_IDS = ANNOTATED_SCREENS.map((screen) => `heuristic-${screen.key}`);

// Scroll distance (desktop only) the reader spends "inside" one screen
// before the pin releases into the next — one viewport height per screen,
// so the whole 4-screen block holds the page for ~4 viewports of scroll
// before continuing into the next section.
const HEURISTIC_PIN_STEP = '100vh';

function NoteBadge({ id }) {
  return (
    <span className="shrink-0 size-6 rounded-full bg-black flex items-center justify-center text-white font-satoshi font-bold text-[12px]">
      {id}
    </span>
  );
}

// Numbered badges for one screen's findings, shared by both the mobile
// inline image and the desktop sticky panel — sits half outside the image's
// own edge, same as the original leader-line design. Every badge shows at
// equal weight by default (matching the reference "first look": all of a
// screen's numbers visible together, none dimmed); `hoveredId` only grows
// the one the reader is currently pointing at on a finding row, it doesn't
// fade the rest.
function ScreenDots({ notes, hoveredId, reduceMotion }) {
  return notes.map((note) => {
    const emphasized = note.id === hoveredId;
    return (
      <span
        key={note.id}
        className="absolute size-6 -translate-x-1/2 -translate-y-1/2 rounded-full bg-black flex items-center justify-center text-white font-satoshi font-bold text-[12px]"
        style={{
          top: note.top,
          left: note.left,
          transform: `translate(-50%, -50%) scale(${emphasized ? 1.15 : 1})`,
          transitionProperty: 'transform',
          transitionDuration: reduceMotion ? '0ms' : '200ms',
        }}
      >
        {note.id}
      </span>
    );
  });
}

// One screen's image + its dots, framed the same way at every use site.
function ScreenImage({ screen, notes, hoveredId, reduceMotion, className = '' }) {
  return (
    <div className={`relative w-full aspect-[213/463] ${className}`}>
      <div className="absolute inset-0 rounded-2xl overflow-hidden shadow-[0px_0px_10px_0px_rgba(0,0,0,0.1)]">
        <img src={screen.src} alt={screen.alt} className="absolute inset-0 w-full h-full object-cover" />
      </div>
      <ScreenDots notes={notes} hoveredId={hoveredId} reduceMotion={reduceMotion} />
    </div>
  );
}

// One screen's findings as title+body rows, shared by the desktop accordion
// and the mobile fallback.
function FindingsList({ screen, notes, onHoverFinding }) {
  return (
    <div className="flex flex-col gap-5">
      {notes.map((note) => (
        <div key={note.id} onMouseEnter={() => onHoverFinding(screen.key, note.id)} className="flex gap-3 items-start">
          <NoteBadge id={note.id} />
          <p className="font-satoshi text-[14px] leading-[20px] text-ink max-w-[380px]">
            <span className="font-bold block">{note.title}.</span>
            {note.body}
          </p>
        </div>
      ))}
    </div>
  );
}

// Desktop-only: one screen's accordion row, presentational only (no DOM id
// — the pin's actual scroll-spy anchors are separate invisible spacers, see
// `HEURISTIC_PIN_STEP`). Its sub-heading (Homepage, Side Bar, Audio Guide,
// Code Input) always shows, stacked with the other 3; only the currently
// active screen expands its findings below its own sub-heading.
function HeuristicBlock({ screen, isActive, onHoverFinding, reduceMotion }) {
  const notes = CALLOUTS[screen.key];
  return (
    <div className="py-5">
      <p className="font-satoshi font-bold text-[16px] text-ink">{screen.label}</p>
      <div
        className="grid transition-[grid-template-rows]"
        style={{ gridTemplateRows: isActive ? '1fr' : '0fr', transitionDuration: reduceMotion ? '0ms' : '350ms' }}
      >
        <div className="overflow-hidden">
          <div className="pt-4">
            <FindingsList screen={screen} notes={notes} onHoverFinding={onHoverFinding} />
          </div>
        </div>
      </div>
    </div>
  );
}

// Mobile/tablet fallback (below `lg:`): no pin at this width, so every
// screen renders in normal flow, always expanded, with its own image inline.
function HeuristicMobileBlock({ screen, hoveredId, onHoverFinding, reduceMotion }) {
  const notes = CALLOUTS[screen.key];
  return (
    <div className="py-8 first:pt-0">
      <p className="font-satoshi font-bold text-[16px] text-ink mb-4">{screen.label}</p>
      <FindingsList screen={screen} notes={notes} onHoverFinding={onHoverFinding} />
      <ScreenImage screen={screen} notes={notes} hoveredId={hoveredId} reduceMotion={reduceMotion} className="mt-5 max-w-[221px]" />
    </div>
  );
}

// Desktop-only right panel: all 4 screen images stacked absolutely,
// crossfaded via opacity (CharacterStage.jsx's always-mounted pattern) so the
// active screen's image is always what's on screen. Presentational only —
// the parent pin wrapper (not this component) owns the sticky positioning.
function HeuristicRightPanel({ activeKey, hoveredByScreen, reduceMotion }) {
  return (
    <div className="relative w-full max-w-[280px] mx-auto">
      {ANNOTATED_SCREENS.map((screen) => (
        <div
          key={screen.key}
          className="absolute inset-0"
          style={{
            opacity: screen.key === activeKey ? 1 : 0,
            pointerEvents: screen.key === activeKey ? 'auto' : 'none',
            transitionProperty: 'opacity',
            transitionDuration: reduceMotion ? '0ms' : '350ms',
          }}
        >
          <ScreenImage screen={screen} notes={CALLOUTS[screen.key]} hoveredId={hoveredByScreen[screen.key]} reduceMotion={reduceMotion} />
        </div>
      ))}
      {/* Reserves layout height matching the stacked images above, since
          every image in the stack is `absolute` and contributes none. */}
      <div className="w-full aspect-[213/463] invisible" aria-hidden="true" />
    </div>
  );
}

export default function Symptoms() {
  const reduceMotion = useReducedMotion();
  const activeHeuristicId = useActiveSection(HEURISTIC_IDS, { rootMargin: '-20% 0px -60% 0px' });
  const activeScreenKey = activeHeuristicId.replace('heuristic-', '');
  const [hoveredByScreen, setHoveredByScreen] = useState(() =>
    Object.fromEntries(ANNOTATED_SCREENS.map((screen) => [screen.key, null]))
  );

  function handleHoverFinding(screenKey, findingId) {
    setHoveredByScreen((prev) => ({ ...prev, [screenKey]: findingId }));
  }

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
        {PROBLEMS.map((problem, i) => (
          <motion.div
            key={problem.title}
            initial="hidden"
            whileInView="visible"
            viewport={revealViewport}
            variants={reduceMotion ? revealVariantsReduced : revealVariants}
            transition={{ ...(reduceMotion ? revealTransitionReduced : revealTransition), delay: reduceMotion ? 0 : i * CARD_STAGGER }}
            className="bg-white rounded-2xl shadow-[0px_0px_5px_rgba(0,0,0,0.1)] p-[20px] flex flex-col gap-5 transition-transform duration-200 ease-out hover:-translate-y-2 hover:shadow-[0px_12px_24px_rgba(0,0,0,0.15)]"
          >
            <div className="size-[42px] overflow-clip">
              <img src={problem.icon} alt="" className="block size-full" />
            </div>
            <div className="flex flex-col gap-3">
              <p className="font-satoshi font-bold text-[20px] leading-[25px] text-ink">{problem.title}</p>
              <p className="font-satoshi text-[16px] text-ink leading-[25px]">{problem.body}</p>
            </div>
          </motion.div>
        ))}
      </div>

      <p className="font-satoshi text-[16px] text-ink leading-[25px] mt-[54px]">
        These weren&apos;t just my read. For an app this polished, the public reviews were only lukewarm.
      </p>

      <motion.blockquote
        initial="hidden"
        whileInView="visible"
        viewport={revealViewport}
        variants={reduceMotion ? revealVariantsReduced : revealVariants}
        transition={reduceMotion ? revealTransitionReduced : revealTransition}
        className="mt-6 bg-white rounded-2xl px-6 py-5 flex items-center gap-6"
      >
        <div className="bg-black w-[3px] h-[85px] shrink-0" />
        <p className="font-satoshi text-[16px] text-ink leading-[30px]">
          &ldquo;A curator&apos;s vanity project, not a useful app for the public.&rdquo;
          <br />
          <span className="font-bold">— TFAM app review, App Store</span>
        </p>
      </motion.blockquote>

      <p className="font-satoshi font-bold text-[20px] text-ink mt-[52px] mb-6">Heuristic Evaluation</p>
      <p className="font-satoshi text-[16px] text-ink leading-[25px]">
        Reviews told me people were frustrated. To find out exactly why, I ran a heuristic evaluation to turn the
        vague complaints into specific, nameable problems I could design against.
      </p>

      {/* Pinned scrollytelling layout (desktop only): the whole two-column
          block sticks in place while the reader scrolls through 4 invisible
          anchors (one per screen, `HEURISTIC_PIN_STEP` tall each) — the page
          only continues past this block once they've scrolled through all 4
          (Homepage → Side Bar → Audio Guide → Code Input). Below `lg:` there's
          no room/need for a pin, so every screen just renders in normal flow. */}
      <div className="relative mt-8">
        <div className="hidden lg:block" aria-hidden="true">
          {ANNOTATED_SCREENS.map((screen) => (
            <div key={screen.key} id={`heuristic-${screen.key}`} style={{ height: HEURISTIC_PIN_STEP }} />
          ))}
        </div>

        <div className="hidden lg:block absolute inset-0">
          <div className="sticky top-32 grid grid-cols-[1fr_280px] gap-x-16">
            <div className="flex flex-col divide-y divide-ink/10">
              {ANNOTATED_SCREENS.map((screen) => (
                <HeuristicBlock
                  key={screen.key}
                  screen={screen}
                  isActive={activeScreenKey === screen.key}
                  onHoverFinding={handleHoverFinding}
                  reduceMotion={reduceMotion}
                />
              ))}
            </div>
            <HeuristicRightPanel activeKey={activeScreenKey} hoveredByScreen={hoveredByScreen} reduceMotion={reduceMotion} />
          </div>
        </div>

        <div className="lg:hidden flex flex-col divide-y divide-ink/10">
          {ANNOTATED_SCREENS.map((screen) => (
            <HeuristicMobileBlock
              key={screen.key}
              screen={screen}
              hoveredId={hoveredByScreen[screen.key]}
              onHoverFinding={handleHoverFinding}
              reduceMotion={reduceMotion}
            />
          ))}
        </div>
      </div>
    </Section>
  );
}
