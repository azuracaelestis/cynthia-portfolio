import { useRef } from 'react';
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';
import { useMediaQuery } from '../hooks/useMediaQuery';
import folderYellow from '../assets/case study/folder/folder-yellow.svg';
import folderBlue from '../assets/case study/folder/folder-blue.svg';
import folderBrown from '../assets/case study/folder/folder-brown.svg';
import folderMobileYellow from '../assets/case study/folder-mobile/folder-mobile-yellow.svg';
import folderMobileBlue from '../assets/case study/folder-mobile/folder-mobile-blue.svg';
import folderMobileBrown from '../assets/case study/folder-mobile/folder-mobile-brown.svg';

const STUDIES = [
  {
    tag: 'Taipei Fine Art Museum',
    title: 'A companion for the whole museum visit',
    body: 'TFAM already had an app, but low ratings and buried features meant most visitors never used it. I led an end-to-end redesign that reframed the brief from...',
    folder: folderYellow,
    folderMobile: folderMobileYellow,
    rotate: -5,
  },
  {
    tag: 'ViewSonic Education',
    title: 'A product Update Teachers Actually Wanted to Play',
    body: 'A gamified experience that taught teachers about myViewBoard 3.0 by turning real classroom problems into play.',
    folder: folderBlue,
    folderMobile: folderMobileBlue,
    rotate: 4,
  },
  {
    tag: 'Asia Money Fintech',
    title: 'Revamping the marketing homepage',
    body: "Turning a 13-year-old B2B homepage into a funnel built to sell loans directly to everyday consumers.",
    folder: folderBrown,
    folderMobile: folderMobileBrown,
    rotate: -3,
  },
];

function StudyCard({ study, index }) {
  const isFirst = index === 0;
  const cardRef = useRef(null);
  const reduceMotion = useReducedMotion();
  const isMobileViewport = useMediaQuery('(max-width: 1023px)');

  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ['start end', 'start center'],
  });
  const opacity = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const scale = useTransform(scrollYProgress, [0, 1], [0.85, 1]);
  const y = useTransform(scrollYProgress, [0, 1], [60, 0]);

  const cardContent = (
    <>
      <img src={study.folderMobile} alt="" className="lg:hidden w-full h-auto drop-shadow-2xl" />
      <img src={study.folder} alt="" className="hidden lg:block w-full h-auto drop-shadow-2xl" />

      <span className="absolute top-[59px] left-[24px] lg:top-[3%] lg:left-[calc(4%-12px)] inline-block text-ink text-[12px] lg:text-base font-dm font-semibold">
        {study.tag}
      </span>

      <div className="absolute top-[91px] left-[24px] w-[282px] lg:inset-0 lg:left-auto lg:top-auto lg:w-auto lg:flex lg:flex-col lg:justify-center lg:px-14 lg:pt-[12%] lg:pb-14">
        <div className="max-w-[440px]">
          <h3 className="font-dm font-extrabold text-[24px] md:text-[32px] lg:text-[40px] text-ink leading-tight">
            {study.title}
          </h3>
          <p className="mt-4 font-dm font-light lg:font-normal text-base md:text-lg lg:text-xl text-ink/70">{study.body}</p>
        </div>
      </div>

      {study.mockupMobile && (
        <img
          src={study.mockupMobile}
          alt=""
          className="lg:hidden absolute left-1/2 -translate-x-1/2 bottom-[90px] w-[80%] h-auto"
        />
      )}

      <a
        href="#"
        className="absolute left-1/2 -translate-x-1/2 bottom-[20px] w-[299px] h-[45px] lg:left-auto lg:translate-x-0 lg:bottom-auto lg:top-[17%] lg:right-[9%] lg:w-auto lg:h-auto rounded-full bg-ink hover:bg-charcoal active:bg-charcoal transition-colors text-white text-[16px] lg:text-sm font-dm font-semibold px-8 py-2 lg:px-4 lg:py-2 flex items-center justify-center gap-[10px] lg:gap-1.5"
      >
        View
        <svg className="w-[24px] h-[24px] lg:w-[14px] lg:h-[14px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
          <path d="M7 17 17 7M9 7h8v8" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </a>
    </>
  );

  if (isMobileViewport) {
    if (reduceMotion) {
      return <div className="relative">{cardContent}</div>;
    }
    return (
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
      >
        <div className="relative transition-transform duration-200 ease-out hover:-translate-y-2">
          {cardContent}
        </div>
      </motion.div>
    );
  }

  const stickyCard = (
    <div
      className="lg:sticky"
      style={{ top: `calc(13rem + ${index * 1.75}rem)`, zIndex: index + 1 }}
    >
      <div className="relative rotate-[var(--r)] transition-transform duration-200 ease-out hover:-translate-y-2 hover:rotate-0" style={{ '--r': `${study.rotate}deg` }}>
        {cardContent}
      </div>
    </div>
  );

  if (!isFirst || reduceMotion) return stickyCard;

  return (
    <div
      ref={cardRef}
      className="lg:sticky"
      style={{ top: `calc(13rem + ${index * 1.75}rem)`, zIndex: index + 1 }}
    >
      <motion.div style={{ opacity, scale, y }}>
        <div className="relative rotate-[var(--r)] transition-transform duration-200 ease-out hover:-translate-y-2 hover:rotate-0" style={{ '--r': `${study.rotate}deg` }}>
          {cardContent}
        </div>
      </motion.div>
    </div>
  );
}

export default function CaseStudies() {
  const containerRef = useRef(null);

  return (
    <section id="work" className="relative z-20 lg:-mt-[500px] pt-[120px] pb-[150px] lg:pb-28">
      <div className="mx-auto max-w-6xl px-6 lg:px-10">
        <div ref={containerRef} className="relative">
          <div className="relative h-[100px] lg:h-[171px]">
            <div className="lg:sticky top-24 z-30 text-center">
              <span className="inline-block rotate-3 rounded-[8px] lg:rounded-[16px] bg-[#FACC61] text-black font-semibold text-[12px] lg:text-[16px] px-4 py-1 lg:px-6 lg:py-3">
                Selected Projects
              </span>
              <h2 className="mt-3 lg:mt-8 font-dm font-extrabold text-[32px] md:text-[36px] lg:text-[44px] leading-[34px] lg:leading-none text-ink">
                Case Studies
              </h2>
            </div>
          </div>

          <div className="relative flex flex-col gap-12 lg:gap-24">
            {STUDIES.map((study, i) => (
              <StudyCard key={study.tag} study={study} index={i} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
