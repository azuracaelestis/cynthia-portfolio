import { Fragment, useRef, useState } from 'react';
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

export default function MoreCaseStudies({ currentId, background = 'bg-case-study-cream', paddingTop = 'pt-20' }) {
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
    <section className={`${background} ${paddingTop} pb-24`}>
      <div className="mx-[6px] lg:mx-auto max-w-[1302px] rounded-[32px] bg-white px-6 lg:px-12 py-12 lg:py-[90px] flex flex-col items-center gap-8">
        <h2 className="font-satoshi font-bold text-[32px] lg:text-[48px] text-ink text-center leading-tight">
          More case studies
        </h2>

        <div className="relative w-full lg:max-w-[900px] mt-[60px]">
          {stackPeeks.map((peek, i) => {
            const depth = PEEK_COUNT - i;
            const peekStyle = {
              top: `-${depth * 14}px`,
              left: `${depth * 10}px`,
              right: `${depth * 10}px`,
              width: `calc(100% - ${depth * 20}px)`,
              opacity: 1 - depth * 0.1,
              zIndex: i + 1,
              transform: `rotate(${peek.rotate * TILT_SCALE}deg)`,
            };
            return (
              <Fragment key={`${peek.id}-${i}`}>
                <img
                  src={peek.folderMobile}
                  alt=""
                  aria-hidden="true"
                  className="lg:hidden absolute w-full h-auto drop-shadow-lg"
                  style={peekStyle}
                />
                <img
                  src={peek.folder}
                  alt=""
                  aria-hidden="true"
                  className="hidden lg:block absolute w-full h-auto drop-shadow-lg"
                  style={peekStyle}
                />
              </Fragment>
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
              <img src={study.folderMobile} alt="" className="lg:hidden w-full h-auto drop-shadow-2xl" />
              <img src={study.folder} alt="" className="hidden lg:block w-full h-auto drop-shadow-2xl" />

              <span className="absolute top-[51px] left-[24px] text-ink text-[12px] lg:top-[3.7%] lg:left-[3.4%] lg:w-[17%] lg:text-[14px] font-satoshi font-bold">
                {study.tag}
              </span>

              <div className="absolute top-[51px] left-[24px] right-[24px] lg:top-[calc(24%+24px)] lg:left-[5.3%] lg:right-auto lg:w-[42%]">
                <div className="max-w-[440px] translate-y-[28px] lg:translate-y-0">
                  {!study.link && (
                    <span className="mb-3 inline-block rounded-full bg-ink/80 text-white text-[11px] lg:text-[13px] font-satoshi font-semibold px-3 py-1">
                      Coming soon
                    </span>
                  )}
                  <h3 className="font-satoshi font-bold text-[24px] lg:text-[32px] text-ink leading-tight">
                    {study.title}
                  </h3>
                  <p className="mt-4 font-satoshi font-normal text-[16px] lg:text-[18px] text-ink/80 leading-snug">
                    {study.body}
                  </p>

                  {study.thumbnail?.phones && (
                    <div className="lg:hidden relative mt-11 w-full aspect-[6/5]">
                      <img src={study.thumbnail.phones[0]} alt="" className="absolute left-0 top-[calc(15%-32px)] w-[38%] rounded-2xl drop-shadow-lg" />
                      <img src={study.thumbnail.phones[2]} alt="" className="absolute right-0 top-[calc(15%-32px)] w-[38%] rounded-2xl drop-shadow-lg" />
                      <img src={study.thumbnail.phones[1]} alt="" className="absolute left-1/2 -translate-x-1/2 top-[-8px] w-[42%] rounded-2xl drop-shadow-2xl" />
                    </div>
                  )}
                </div>
              </div>

              {study.thumbnail?.mockup && (
                <div className="lg:hidden absolute left-[5%] right-[5%] top-[calc(54%+20px)] flex flex-col items-center">
                  <div className="relative w-[80%]">
                    <img src={study.thumbnail.mockup} alt="" className="w-full h-auto rounded-xl object-contain drop-shadow-lg" />
                    {study.thumbnail.bubble && <img src={study.thumbnail.bubble} alt="" className="absolute top-[16%] left-[5%] w-[15%]" />}
                    {study.thumbnail.birdLeft && (
                      <img src={study.thumbnail.birdLeft} alt="" className="absolute top-[30%] -left-[5%] w-[27%] rotate-12" />
                    )}
                    {study.thumbnail.book && <img src={study.thumbnail.book} alt="" className="absolute top-[22%] right-[4%] w-[9%]" />}
                    {study.thumbnail.birdRight && (
                      <img src={study.thumbnail.birdRight} alt="" className="absolute top-[36%] -right-[6%] w-[25%] -rotate-[30deg]" />
                    )}
                  </div>
                </div>
              )}

              {study.thumbnail && (
                <div className="hidden lg:flex absolute top-[28%] bottom-[10%] right-[6%] w-[42%] items-center justify-center">
                  <div className="relative h-full w-full flex items-center justify-center">
                    {study.thumbnail.phones ? (
                      <>
                        <img src={study.thumbnail.phones[0]} alt="" className="absolute left-0 top-[calc(15%-32px)] w-[38%] rounded-2xl drop-shadow-lg" />
                        <img src={study.thumbnail.phones[2]} alt="" className="absolute right-0 top-[calc(15%-32px)] w-[38%] rounded-2xl drop-shadow-lg" />
                        <img src={study.thumbnail.phones[1]} alt="" className="absolute left-1/2 -translate-x-1/2 top-[-8px] w-[42%] rounded-2xl drop-shadow-2xl" />
                      </>
                    ) : (
                      study.thumbnail.mockup && (
                        <img src={study.thumbnail.mockup} alt="" className="w-full max-h-full rounded-xl object-contain drop-shadow-lg" />
                      )
                    )}
                    {study.thumbnail.bubble && <img src={study.thumbnail.bubble} alt="" className="absolute top-[16%] left-[5%] w-[15%]" />}
                    {study.thumbnail.birdLeft && (
                      <img src={study.thumbnail.birdLeft} alt="" className="absolute top-[30%] -left-[5%] w-[27%] rotate-12" />
                    )}
                    {study.thumbnail.book && <img src={study.thumbnail.book} alt="" className="absolute top-[22%] right-[4%] w-[9%]" />}
                    {study.thumbnail.birdRight && (
                      <img src={study.thumbnail.birdRight} alt="" className="absolute top-[36%] -right-[6%] w-[25%] -rotate-[30deg]" />
                    )}
                  </div>
                </div>
              )}
            </Wrapper>
          </motion.div>
        </div>

        {pool.length > 1 && (
          <button
            type="button"
            onClick={handleShuffle}
            className="flex items-center gap-[10px] rounded-full bg-[#f8ab1c] hover:bg-[#FACC61] active:bg-[#F18F06] transition-colors px-6 py-3 lg:px-12 lg:py-4 font-satoshi font-bold text-[16px] lg:text-[20px] text-ink"
          >
            Shuffle
            <RefreshIcon />
          </button>
        )}
      </div>
    </section>
  );
}
