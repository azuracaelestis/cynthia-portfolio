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

// The nav's phase relative to the tracked content: 'before' (left, hidden),
// 'visible' (in place), 'after' (right, hidden). Transitioning INTO 'visible'
// is always the entrance (ease-out); transitioning OUT of it, in either
// direction, is always the exit (ease-in) — matching how the motion reads to
// the reader as one system running forward or in reverse. Both hidden states
// sit on the LEFT-TO-RIGHT side of resting (before to the left, after to the
// right of it) so the whole sweep — entering as the reader scrolls down into
// the content, then exiting past the end — reads as one continuous
// left-to-right motion, never reversing direction mid-scroll.
const navVariants = {
  before: {
    x: REST_X - 40,
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
    x: REST_X + 40,
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
// sidebarVariant: 'blue' (Classroom Quest's original blue-accent look) or
// 'mono' (TFAM's black/gray restyle, per Figma node 258:1201) — everything
// else about the sidebar (shadow, card shape, spacing) is shared.
export default function CaseStudyLayout({
  sections,
  children,
  background = 'bg-case-study-cream',
  paddingTop = 'pt-12 lg:pt-16',
  sidebarVariant = 'blue',
  sidebarGridClassName = 'lg:grid-cols-[250px_1fr] lg:gap-[34px]',
}) {
  const ids = sections.map((s) => s.id);
  const activeId = useActiveSection(ids);
  const reduceMotion = useReducedMotion();
  const startSentinelRef = useRef(null);
  const endSentinelRef = useRef(null);
  const navPhase = useNavScrollPhase(startSentinelRef, endSentinelRef);
  const isMono = sidebarVariant === 'mono';

  return (
    <div className={background}>
      <div className={`mx-auto max-w-6xl px-6 lg:px-10 ${paddingTop} pb-28`}>
        <div ref={startSentinelRef} aria-hidden="true" className="h-px" />

        <div className={`lg:grid ${sidebarGridClassName}`}>
          {/* Desktop: sticky sidebar */}
          <nav aria-label="On this page" className="hidden lg:block">
            <motion.div
              className="sticky top-32 origin-top-left bg-white rounded-2xl shadow-[0px_0px_12.5px_rgba(0,0,0,0.1)] p-6 flex flex-col gap-4"
              initial="before"
              animate={navPhase}
              variants={reduceMotion ? navVariantsReduced : navVariants}
            >
              <p
                className={
                  isMono ? 'font-satoshi font-bold text-[15px] text-black' : 'font-satoshi font-bold text-[14px] text-case-study-blue'
                }
              >
                ON THIS PAGE
              </p>
              <ul className="flex flex-col gap-[10px]">
                {sections.map((s) => {
                  const isActive = activeId === s.id;
                  const activeDot = isMono ? 'bg-black' : 'bg-case-study-blue';
                  const hoverDot = isMono ? 'group-hover:bg-black' : 'group-hover:bg-case-study-blue';
                  const activeBg = isMono ? 'bg-tfam-nav-active' : 'bg-case-study-highlight';
                  const radius = isMono ? (isActive ? 'rounded-lg' : 'rounded-2xl') : 'rounded-lg';
                  const itemFont = isMono ? 'font-satoshi' : 'font-satoshi';
                  return (
                    <li key={s.id}>
                      <a
                        href={`#${s.id}`}
                        className={`group flex items-center gap-4 ${radius} px-3 py-1 ${itemFont} font-bold text-[16px] text-black transition-colors ${
                          isActive ? activeBg : ''
                        }`}
                      >
                        <span
                          className={`shrink-0 size-1.5 rounded-full transition-colors ${
                            isActive ? activeDot : `bg-case-study-cream ${hoverDot}`
                          }`}
                        />
                        {s.label}
                      </a>
                    </li>
                  );
                })}
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
