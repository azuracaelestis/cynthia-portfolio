import { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, useAnimation, useReducedMotion } from 'framer-motion';
import { CASE_STUDIES } from '../../data/caseStudies';

const EASE_IN = [0.4, 0, 1, 1];
const EASE_OUT = [0, 0, 0.2, 1];
// Scales down each study's shared `rotate` value for this stack only — the
// full angle (used by the homepage's tilted cards) reads as too much tilt
// at this smaller card size.
const TILT_SCALE = 0.5;

function RefreshIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M21 2v6h-6" />
      <path d="M3 12a9 9 0 0 1 15-6.7L21 8" />
      <path d="M3 22v-6h6" />
      <path d="M21 12a9 9 0 0 1-15 6.7L3 16" />
    </svg>
  );
}

export default function MoreCaseStudies({ currentId, background = 'bg-case-study-cream' }) {
  const pool = CASE_STUDIES.filter((study) => study.id !== currentId);
  const [studyIndex, setStudyIndex] = useState(0);
  const reduceMotion = useReducedMotion();
  const controls = useAnimation();
  const indexRef = useRef(0);
  const tokenRef = useRef(0);
  indexRef.current = studyIndex;

  if (pool.length === 0) return null;
  const study = pool[studyIndex % pool.length];
  const otherStudies = CASE_STUDIES.filter((s) => s.id !== study.id);
  const PEEK_COUNT = 2;
  const stackPeeks =
    otherStudies.length > 0
      ? Array.from({ length: PEEK_COUNT }, (_, i) => otherStudies[i % otherStudies.length])
      : [];
  const Wrapper = study.link ? Link : 'div';
  const wrapperProps = study.link ? { to: study.link } : {};

  async function handleShuffle() {
    const myToken = ++tokenRef.current;
    const nextIndex = (indexRef.current + 1) % pool.length;

    if (reduceMotion) {
      await controls.start({ opacity: 0, transition: { duration: 0.15 } });
      if (tokenRef.current !== myToken) return;
      indexRef.current = nextIndex;
      setStudyIndex(nextIndex);
      controls.set({ opacity: 0 });
      controls.start({ opacity: 1, transition: { duration: 0.15 } });
      return;
    }

    await controls.start({ scale: 0.82, y: -16, opacity: 0, transition: { duration: 0.4, ease: EASE_IN } });
    if (tokenRef.current !== myToken) return;
    indexRef.current = nextIndex;
    setStudyIndex(nextIndex);
    controls.set({ scale: 0.88, y: 12, opacity: 0 });
    controls.start({ scale: 1, y: 0, opacity: 1, transition: { duration: 0.4, ease: EASE_OUT } });
  }

  return (
    <section className={`${background} pt-20 pb-24`}>
      <div className="mx-[6px] lg:mx-auto max-w-[1302px] rounded-[32px] bg-white px-6 lg:px-12 py-12 lg:py-[90px] flex flex-col items-center gap-8">
        <h2 className="font-dm font-bold text-[32px] lg:text-[48px] text-ink text-center leading-tight">
          More case studies
        </h2>

        <div className="relative w-full lg:max-w-[900px] mt-[60px]">
          {stackPeeks.map((peek, i) => {
            const depth = PEEK_COUNT - i;
            return (
              <img
                key={`${peek.id}-${i}`}
                src={peek.folder}
                alt=""
                aria-hidden="true"
                className="absolute w-full h-auto drop-shadow-lg"
                style={{
                  top: `-${depth * 14}px`,
                  left: `${depth * 10}px`,
                  right: `${depth * 10}px`,
                  width: `calc(100% - ${depth * 20}px)`,
                  opacity: 1 - depth * 0.1,
                  zIndex: i + 1,
                  transform: `rotate(${peek.rotate * TILT_SCALE}deg)`,
                }}
              />
            );
          })}

          <motion.div
            className="relative z-10"
            initial={{ opacity: 1, scale: 1, y: 0 }}
            animate={controls}
          >
            <Wrapper
              {...wrapperProps}
              className={`group relative block w-full rotate-[var(--r)] transition-transform duration-200 ease-out ${
                study.link ? 'hover:-translate-y-1 hover:rotate-0' : 'cursor-default'
              }`}
              style={{ '--r': `${study.rotate * TILT_SCALE}deg` }}
            >
              <img src={study.folder} alt="" className="w-full h-auto drop-shadow-2xl" />

              <span className="hidden lg:block absolute top-[3.7%] left-[3.4%] w-[17%] text-ink text-[14px] font-dm font-bold">
                {study.tag}
              </span>

              <div className="absolute top-[calc(24%+4px)] left-[calc(5.3%+94px)] lg:top-[calc(24%+24px)] lg:left-[5.3%] w-[42%]">
                {!study.link && (
                  <span className="mb-3 inline-block rounded-full bg-ink/80 text-white text-[11px] lg:text-[13px] font-dm font-semibold px-3 py-1">
                    Coming soon
                  </span>
                )}
                <h3 className="font-dm font-bold text-[18px] lg:text-[32px] text-ink leading-tight">
                  {study.title}
                </h3>
                <p className="hidden lg:block mt-4 font-dm font-light text-[18px] text-ink/80 leading-snug">
                  {study.body}
                </p>
              </div>
            </Wrapper>
          </motion.div>
        </div>

        {pool.length > 1 && (
          <button
            type="button"
            onClick={handleShuffle}
            className="flex items-center gap-[10px] rounded-full bg-[#f8ab1c] hover:bg-[#FACC61] active:bg-[#F18F06] transition-colors px-6 py-3 lg:px-12 lg:py-4 font-dm font-bold text-[16px] lg:text-[20px] text-ink"
          >
            Shuffle
            <RefreshIcon />
          </button>
        )}
      </div>
    </section>
  );
}
