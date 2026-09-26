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
    title: 'Shipped live',
    body: 'Designed, built, and launched as a live experience on ViewSonic Education.',
  },
  {
    title: '4-week delivery',
    body: 'Delivered from concept to production with product, engineering, research, content, and growth teams.',
  },
  {
    title: 'Localized across 7 markets',
    body: 'Designed to work across seven languages, including languages that read from right to left.',
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

// A full-width, centred band that sits ABOVE the side-nav layout (same
// pattern as the TFAM case study's Validation Overview), so it's the first
// thing read below the hero. The container matches the hero's
// (max-w-7xl / px-10) so the band's edges line up with the hero. Its top padding is set so the visible gap above the panel equals the visible gap between the panel and the Context heading below it (109px desktop, 97px mobile) — re-measure if either section's padding changes.
export default function Impact() {
  const reduceMotion = useReducedMotion();
  const variants = reduceMotion ? revealVariantsReduced : revealVariants;
  const transition = reduceMotion ? revealTransitionReduced : revealTransition;

  return (
    <div className="bg-case-study-cream">
      <div className="mx-auto max-w-7xl px-6 lg:px-10 pt-[97px] lg:pt-[109px]">
        <Flow>
          <section id="impact" className="scroll-mt-28 rounded-3xl bg-[#E7F5FD] p-6 lg:p-8">
            <motion.h2
              initial="hidden"
              whileInView="visible"
              viewport={revealViewport}
              variants={variants}
              transition={transition}
              className="flex items-center gap-3 font-satoshi font-bold text-[24px] text-ink leading-tight mb-6 lg:mb-8"
            >
              <LightbulbIcon className="size-6 shrink-0" />
              Project Outcome
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
