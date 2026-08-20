import { useRef } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { useActiveSection } from '../../hooks/useActiveSection';
import { useNavScrollPhase } from '../../hooks/useNavScrollPhase';

const EASE_OUT = [0, 0, 0.2, 1];
const EASE_IN = [0.4, 0, 1, 1];

// Resting x-position once in view (shifted 15px left of the column edge for
// extra breathing room from the content), with the same ±40px slide distance
// preserved on either side of it.
const REST_X = -15;

// The nav's phase relative to the tracked content: 'before' (right, hidden),
// 'visible' (in place), 'after' (left, hidden). Transitioning INTO 'visible'
// is always the entrance (ease-out); transitioning OUT of it, in either
// direction, is always the exit (ease-in) — matching how the motion reads to
// the reader as one system running forward or in reverse.
const navVariants = {
  before: {
    x: REST_X + 40,
    opacity: 0,
    transition: { duration: 0.35, ease: EASE_IN },
    transitionEnd: { visibility: 'hidden', pointerEvents: 'none' },
  },
  visible: {
    x: REST_X,
    opacity: 1,
    visibility: 'visible',
    pointerEvents: 'auto',
    transition: { duration: 0.35, ease: EASE_OUT },
  },
  after: {
    x: REST_X - 40,
    opacity: 0,
    transition: { duration: 0.35, ease: EASE_IN },
    transitionEnd: { visibility: 'hidden', pointerEvents: 'none' },
  },
};

const navVariantsReduced = {
  before: { opacity: 0, transition: { duration: 0.15 }, transitionEnd: { visibility: 'hidden', pointerEvents: 'none' } },
  visible: { opacity: 1, visibility: 'visible', pointerEvents: 'auto', transition: { duration: 0.15 } },
  after: { opacity: 0, transition: { duration: 0.15 }, transitionEnd: { visibility: 'hidden', pointerEvents: 'none' } },
};

// sections: [{ id: 'overview', label: 'Overview' }, ...]
export default function CaseStudyLayout({ sections, children }) {
  const ids = sections.map((s) => s.id);
  const activeId = useActiveSection(ids);
  const reduceMotion = useReducedMotion();
  const startSentinelRef = useRef(null);
  const endSentinelRef = useRef(null);
  const navPhase = useNavScrollPhase(startSentinelRef, endSentinelRef);

  return (
    <div className="bg-case-study-cream">
      <div className="mx-auto max-w-6xl px-6 lg:px-10 pt-12 lg:pt-16 pb-28">
        {/* Mobile: horizontal jump-to row */}
        <nav aria-label="On this page" className="lg:hidden -mx-6 px-6 mb-8 flex gap-2 overflow-x-auto pb-2">
          {sections.map((s) => (
            <a
              key={s.id}
              href={`#${s.id}`}
              className={`shrink-0 whitespace-nowrap rounded-full px-4 py-2 font-dm text-sm font-semibold transition-colors ${
                activeId === s.id ? 'bg-[#1A87D5] text-white' : 'bg-sky-50 text-ink'
              }`}
            >
              {s.label}
            </a>
          ))}
        </nav>

        <div ref={startSentinelRef} aria-hidden="true" className="h-px" />

        <div className="lg:grid lg:grid-cols-[250px_1fr] lg:gap-[34px]">
          {/* Desktop: sticky sidebar */}
          <nav aria-label="On this page" className="hidden lg:block">
            <motion.div
              className="sticky top-32 origin-top-left bg-white rounded-2xl shadow-[0px_0px_12.5px_rgba(0,0,0,0.1)] p-6 flex flex-col gap-4"
              initial="before"
              animate={navPhase}
              variants={reduceMotion ? navVariantsReduced : navVariants}
            >
              <p className="font-dm font-bold text-[14px] text-case-study-blue">ON THIS PAGE</p>
              <ul className="flex flex-col gap-[10px]">
                {sections.map((s) => (
                  <li key={s.id}>
                    <a
                      href={`#${s.id}`}
                      className={`group flex items-center gap-4 rounded-lg px-3 py-1 font-dm font-bold text-[16px] text-black transition-colors ${
                        activeId === s.id ? 'bg-case-study-highlight' : ''
                      }`}
                    >
                      <span
                        className={`shrink-0 size-1.5 rounded-full transition-colors ${
                          activeId === s.id ? 'bg-case-study-blue' : 'bg-case-study-cream group-hover:bg-case-study-blue'
                        }`}
                      />
                      {s.label}
                    </a>
                  </li>
                ))}
              </ul>
            </motion.div>
          </nav>

          <div className="min-w-0">
            {children}
            <div ref={endSentinelRef} aria-hidden="true" className="h-px" />
          </div>
        </div>
      </div>
    </div>
  );
}
