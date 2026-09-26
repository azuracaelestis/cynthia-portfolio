import { motion, useReducedMotion } from 'framer-motion';
import Flow from '../../../components/Flow';

// Shared scroll-reveal recipe (matches Section.jsx / Diagnosis / Symptoms /
// Solutions / Testing / Reflection — one fade+rise system across the page).
const revealVariants = { hidden: { opacity: 0, y: 8 }, visible: { opacity: 1, y: 0 } };
const revealVariantsReduced = { hidden: { opacity: 0 }, visible: { opacity: 1 } };
const revealTransition = { duration: 0.4, ease: [0, 0, 0.2, 1] };
const revealTransitionReduced = { duration: 0 };
const revealViewport = { once: true, margin: '0px 0px -20% 0px' };
const ITEM_STAGGER = 0.08;

const IMPACTS = [
  {
    title: 'Task completion',
    body: 'All 5 participants completed 4 out of 4 core tasks during usability testing.',
  },
  {
    title: 'Flow validation',
    body: 'Participants successfully completed key flows across discovery, booking, audio guidance, and navigation.',
  },
  {
    title: 'Issues identified',
    body: 'Testing surfaced 3 usability issues, which informed the final iteration.',
  },
];

function LightbulbIcon({ className = '' }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5" />
      <path d="M9 18h6" />
      <path d="M10 22h4" />
    </svg>
  );
}

// A full-width, centred band that sits ABOVE the side-nav layout rather than
// inside its content column — so it's the first thing read below the hero,
// not something pushed right by the nav's gutter. The container matches the
// hero's (max-w-7xl / px-10) so the band's edges line up with the hero card.
// It carries the hero-clearance padding (see TfamApp.jsx) that the layout's
// first section used to: the top padding is set so the gap between the phone
// mockups' visible bottom and this panel equals the gap between this panel
// and the Context section below it (121px desktop, 97px mobile), measured at
// 1440 and 1728 wide and on a Pixel 7 — one consistent rhythm either side.
// The hero has no scroll-linked motion, so this gap is the same at every
// scroll position — if the phones' size or the hero's bottom offset change,
// re-measure rather than nudging by eye.
export default function Impact() {
  const reduceMotion = useReducedMotion();
  const variants = reduceMotion ? revealVariantsReduced : revealVariants;
  const transition = reduceMotion ? revealTransitionReduced : revealTransition;

  return (
    <div className="bg-paper">
      <div className="mx-auto max-w-7xl px-6 lg:px-10 pt-[177px] lg:pt-[274px]">
        <Flow>
          <section id="impact" className="scroll-mt-28 rounded-3xl bg-ink/5 p-6 lg:p-8">
            <motion.h2
              initial="hidden"
              whileInView="visible"
              viewport={revealViewport}
              variants={variants}
              transition={transition}
              className="flex items-center gap-3 font-satoshi font-bold text-[24px] text-ink leading-tight mb-6 lg:mb-8"
            >
              <LightbulbIcon className="size-6 shrink-0" />
              Validation Overview
            </motion.h2>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 lg:gap-6">
              {IMPACTS.map((item, i) => (
                <motion.div
                  key={item.title}
                  initial="hidden"
                  whileInView="visible"
                  viewport={revealViewport}
                  variants={variants}
                  transition={{ ...transition, delay: reduceMotion ? 0 : i * ITEM_STAGGER }}
                  className="bg-white rounded-2xl p-6 flex flex-col gap-3"
                >
                  <p className="font-satoshi font-bold text-[20px] text-ink">{item.title}</p>
                  <p className="font-satoshi text-[16px] text-ink leading-[23px]">{item.body}</p>
                </motion.div>
              ))}
            </div>
          </section>
        </Flow>
      </div>
    </div>
  );
}
