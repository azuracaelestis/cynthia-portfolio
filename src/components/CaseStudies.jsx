import { useRef } from 'react';
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';
import folderYellow from '../assets/case study/folder/folder-yellow.svg';
import folderBlue from '../assets/case study/folder/folder-blue.svg';
import folderBrown from '../assets/case study/folder/folder-brown.svg';

const STUDIES = [
  {
    tag: 'Taipei Fine Art Museum',
    title: 'A companion for the whole museum visit',
    body: 'TFAM already had an app, but low ratings and buried features meant most visitors never used it. I led an end-to-end redesign that reframed the brief from...',
    folder: folderYellow,
    rotate: -5,
  },
  {
    tag: 'ViewSonic Education',
    title: 'A product Update Teachers Actually Wanted to Play',
    body: 'A gamified experience that taught teachers about myViewBoard 3.0 by turning real classroom problems into play.',
    folder: folderBlue,
    rotate: 4,
  },
  {
    tag: 'Asia Money Fintech',
    title: 'Revamping the marketing homepage',
    body: "Turning a 13-year-old B2B homepage into a funnel built to sell loans directly to everyday consumers.",
    folder: folderBrown,
    rotate: -3,
  },
];

function StudyCard({ study, index }) {
  const isFirst = index === 0;
  const cardRef = useRef(null);
  const reduceMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ['start end', 'start center'],
  });
  const opacity = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const scale = useTransform(scrollYProgress, [0, 1], [0.85, 1]);
  const y = useTransform(scrollYProgress, [0, 1], [60, 0]);

  const cardContent = (
    <>
      <img src={study.folder} alt="" className="w-full h-auto drop-shadow-2xl" />

      <span className="absolute left-[calc(4%-12px)] top-[3%] inline-block text-ink text-base font-dm font-semibold">
        {study.tag}
      </span>

      <div className="absolute inset-0 flex flex-col justify-center px-10 sm:px-14 pt-[12%] pb-10 sm:pb-14">
        <div className="max-w-[440px]">
          <h3 className="font-dm font-extrabold text-[24px] md:text-[32px] lg:text-[40px] text-ink leading-tight">
            {study.title}
          </h3>
          <p className="mt-4 font-dm text-base md:text-lg lg:text-xl text-ink/70">{study.body}</p>
        </div>
      </div>

      <a
        href="#"
        className="absolute top-[17%] right-[9%] rounded-full bg-ink hover:bg-charcoal active:bg-charcoal transition-colors text-white text-sm font-dm font-semibold px-4 py-2 flex items-center gap-1.5"
      >
        View
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
          <path d="M7 17 17 7M9 7h8v8" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </a>
    </>
  );

  const stickyCard = (
    <div
      className="sticky"
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
      className="sticky"
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
    <section id="work" className="relative z-20 -mt-[500px] pt-[120px] pb-28">
      <div className="mx-auto max-w-6xl px-6 lg:px-10">
        <div ref={containerRef} className="relative">
          <div className="relative h-[171px]">
            <div className="sticky top-24 z-30 text-center">
              <span className="inline-block rotate-3 rounded-[16px] bg-[#FACC61] text-black font-semibold text-[16px] px-6 py-3">
                Selected Projects
              </span>
              <h2 className="mt-8 font-dm font-extrabold text-[28px] md:text-[36px] lg:text-[44px] leading-none text-ink">
                Case Studies
              </h2>
            </div>
          </div>

          <div className="relative flex flex-col gap-24">
            {STUDIES.map((study, i) => (
              <StudyCard key={study.tag} study={study} index={i} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
