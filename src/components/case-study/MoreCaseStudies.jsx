import { useState } from 'react';
import { Link } from 'react-router-dom';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { CASE_STUDIES } from '../../data/caseStudies';

function ArrowIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <path d="M4.16667 10H15.8333" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path
        d="M10 4.16667L15.8333 10L10 15.8333"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function MoreCaseStudies({ currentId }) {
  const pool = CASE_STUDIES.filter((study) => study.id !== currentId);
  const [index, setIndex] = useState(0);
  const reduceMotion = useReducedMotion();

  if (pool.length === 0) return null;
  const study = pool[index % pool.length];
  const stackPeeks = pool.filter((s) => s.id !== study.id).slice(0, 2);

  return (
    <section className="bg-case-study-cream px-6 lg:px-10 pt-20 pb-24">
      <div className="mx-auto max-w-2xl">
        <h2 className="font-dm font-extrabold text-[32px] lg:text-[40px] text-ink text-center mb-10">
          More case studies
        </h2>

        <div className="relative">
          {stackPeeks.map((peek, i) => (
            <img
              key={peek.id}
              src={peek.folder}
              alt=""
              aria-hidden="true"
              className="absolute inset-x-0 w-full h-auto drop-shadow-xl"
              style={{
                top: `-${(i + 1) * 10}px`,
                transform: `rotate(${peek.rotate}deg)`,
                zIndex: -1 - i,
                opacity: 0.8 - i * 0.2,
              }}
            />
          ))}

          <AnimatePresence mode="wait">
            <motion.div
              key={study.id}
              initial={reduceMotion ? { opacity: 1 } : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduceMotion ? { opacity: 1 } : { opacity: 0, y: -12 }}
              transition={{ duration: reduceMotion ? 0 : 0.35, ease: 'easeOut' }}
              className="relative"
            >
              <img src={study.folder} alt="" className="w-full h-auto drop-shadow-2xl" />

              <span className="absolute top-[3%] left-[calc(4%-12px)] text-ink text-[16px] font-dm font-semibold">
                {study.tag}
              </span>

              <div className="absolute inset-y-0 left-0 w-[48%] flex flex-col justify-center pl-14 pr-6">
                <h3 className="font-dm font-extrabold text-[24px] lg:text-[28px] text-[#000000] leading-tight">
                  {study.title}
                </h3>
                <p className="mt-4 font-dm font-light text-[16px] text-black">{study.body}</p>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="mt-6 flex flex-col items-center gap-4">
          {study.link ? (
            <Link
              to={study.link}
              className="inline-flex items-center gap-2 h-12 rounded-full bg-ink text-white font-dm font-bold px-6 hover:bg-ink/90 transition-colors"
            >
              Read case study
              <ArrowIcon />
            </Link>
          ) : (
            <span
              aria-disabled="true"
              className="inline-flex items-center gap-2 h-12 rounded-full bg-ink/10 text-ink/40 font-dm font-bold px-6 cursor-not-allowed"
            >
              Coming soon
            </span>
          )}

          {pool.length > 1 && (
            <button
              type="button"
              onClick={() => setIndex((i) => (i + 1) % pool.length)}
              className="h-11 rounded-full bg-ink text-white font-dm font-semibold px-6 hover:bg-ink/90 transition-colors"
            >
              Shuffle
            </button>
          )}
        </div>
      </div>
    </section>
  );
}
