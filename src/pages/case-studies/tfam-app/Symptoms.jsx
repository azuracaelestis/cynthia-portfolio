import { motion, useReducedMotion } from 'framer-motion';
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

const DEFAULT_NOTE_TEXT_WIDTH = 123;

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

// One screen + its always-visible leader-line notes, mirrorable to either
// side. Both the image column and the notes column are `flex flex-col` with
// an identical-height label at the top (the notes column's copy is
// `invisible`, just reserving the same space) so their "content areas" line
// up exactly — the notes column's content area is `flex-1`, stretching to
// match the image's real height, which is what lets each note's `top`
// percentage land at the same spot as its dot on the image.
// Per Figma (node 289:xxxx): a small numbered badge sits directly above each
// note's own text (not on the image), text is 12px with a 4px title→body
// gap and no card background, and the line ending in a small dot is what
// actually points into the image.
function NoteBadge({ id }) {
  return (
    <span className="shrink-0 size-6 rounded-full bg-black flex items-center justify-center text-white font-satoshi font-bold text-[12px]">
      {id}
    </span>
  );
}

function AnnotatedScreen({ screen }) {
  const notes = CALLOUTS[screen.key];

  const imageColumn = (
    <div className="flex flex-col w-[221px] shrink-0">
      <p className="font-satoshi font-bold text-[14px] text-ink mb-2">{screen.label}</p>
      {/* Dots (and their in-image connector segment) live OUTSIDE the
          rounded/overflow-hidden clip (which only wraps the img now) — some
          sit at or past the image's own edge, so if they shared that
          overflow-hidden box they'd get clipped.

          Dot position is each note's own stored {top, left} — pointing at
          the actual UI detail the finding is about (e.g. #4's logo, well
          inside the image), not just a generic edge anchor. When a dot
          sits inside the image rather than right at its edge, a short
          connector segment runs from the dot to whichever edge faces the
          notes column, so the leader line reads as one continuous path
          instead of stopping short of the real target. */}
      <div className="relative w-full aspect-[213/463]">
        <div className="absolute inset-0 rounded-2xl overflow-hidden shadow-[0px_0px_10px_0px_rgba(0,0,0,0.1)]">
          <img src={screen.src} alt={screen.alt} className="absolute inset-0 w-full h-full object-cover" />
        </div>
        {notes.map((note) => (
          <div key={note.id}>
            <div
              className="absolute h-px bg-ink/30 -translate-y-1/2"
              style={
                screen.notesOnLeft
                  ? { top: note.top, left: 0, right: `calc(100% - ${note.left})` }
                  : { top: note.top, left: note.left, right: 0 }
              }
            />
            <span
              className="absolute size-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-black"
              style={{ top: note.top, left: note.left }}
            />
          </div>
        ))}
      </div>
    </div>
  );

  const notesColumn = (
    <div className="flex flex-col flex-1 max-w-[380px]">
      <p aria-hidden="true" className="invisible font-satoshi font-bold text-[14px] mb-2">
        {screen.label}
      </p>
      <div className="relative flex-1">
        {/* Per Figma: the line's y matches the BADGE's own vertical center,
            not the note block as a whole — so the badge+line sit in their
            own fixed-height row (still centered on `top` via
            -translate-y-1/2, but now against the badge's real 24px height,
            not whatever height the body text wraps to), and the caption
            text is a separate block positioned just below that row. */}
        {notes.map((note) => (
          <div key={note.id}>
            <div className="absolute left-0 right-0 flex items-center gap-3 -translate-y-1/2" style={{ top: note.top }}>
              {screen.notesOnLeft ? (
                <>
                  <NoteBadge id={note.id} />
                  <div className="flex-1 min-w-4 h-px bg-ink/30" />
                </>
              ) : (
                <>
                  <div className="flex-1 min-w-4 h-px bg-ink/30" />
                  <NoteBadge id={note.id} />
                </>
              )}
            </div>
            <div
              className={`absolute ${screen.notesOnLeft ? 'left-0' : 'right-0'}`}
              style={{ top: `calc(${note.top} + 16px)`, width: screen.noteTextWidth ?? DEFAULT_NOTE_TEXT_WIDTH }}
            >
              <p className="font-satoshi text-[12px] text-ink leading-[16px]">
                <span className="font-bold block">{note.title}.</span>
                {note.body}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  return screen.notesOnLeft ? (
    <>
      {notesColumn}
      {imageColumn}
    </>
  ) : (
    <>
      {imageColumn}
      {notesColumn}
    </>
  );
}

export default function Symptoms() {
  const reduceMotion = useReducedMotion();

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

      {/* Findings as always-visible notes with a leader line, in 2 pairs:
          Homepage+Side Bar, then Audio Guide+Code Input. Each pair's two
          images sit next to each other in the middle (a plain spacer div
          between them, no notes there), with each screen's own notes column
          flanking the outside. */}
      <div className="mt-8 flex justify-center">
        <AnnotatedScreen screen={ANNOTATED_SCREENS[0]} />
        <div className="w-6 shrink-0" />
        <AnnotatedScreen screen={ANNOTATED_SCREENS[1]} />
      </div>

      <div className="mt-12 flex justify-center">
        <AnnotatedScreen screen={ANNOTATED_SCREENS[2]} />
        <div className="w-6 shrink-0" />
        <AnnotatedScreen screen={ANNOTATED_SCREENS[3]} />
      </div>
    </Section>
  );
}
