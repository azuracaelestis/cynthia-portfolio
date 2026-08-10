import { useRef } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { useMediaQuery } from '../hooks/useMediaQuery';
import folderYellow from '../assets/case study/folder/folder-yellow.svg';
import folderBlue from '../assets/case study/folder/folder-blue.svg';
import folderBrown from '../assets/case study/folder/folder-brown.svg';
import folderMobileYellow from '../assets/case study/folder-mobile/folder-mobile-yellow.svg';
import folderMobileBlue from '../assets/case study/folder-mobile/folder-mobile-blue.svg';
import folderMobileBrown from '../assets/case study/folder-mobile/folder-mobile-brown.svg';
import classroomQuestMockup from '../assets/case study/folder-thumnail/classroom quest/Classroom Quest.jpg';
import cyanBird from '../assets/case study/folder-thumnail/classroom quest/cyan-bird.svg';
import purpleBlueBird from '../assets/case study/folder-thumnail/classroom quest/purple-blue_bird.svg';
import flyingBook from '../assets/case study/folder-thumnail/classroom quest/flying_book.svg';
import panicBubble from '../assets/case study/folder-thumnail/classroom quest/panic_bubble.svg';

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
    thumbnail: {
      mockup: classroomQuestMockup,
      birdLeft: cyanBird,
      birdRight: purpleBlueBird,
      book: flyingBook,
      bubble: panicBubble,
    },
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
  const reduceMotion = useReducedMotion();
  const isMobileViewport = useMediaQuery('(max-width: 1023px)');

  const cardContent = (
    <>
      <img src={study.folderMobile} alt="" className="lg:hidden w-full h-auto drop-shadow-2xl" />
      <img src={study.folder} alt="" className="hidden lg:block w-full h-auto drop-shadow-2xl" />

      <span className="absolute top-[59px] left-[24px] lg:top-[3%] lg:left-[calc(4%-12px)] inline-block text-ink text-[12px] lg:text-base font-dm font-semibold">
        {study.tag}
      </span>

      <div className="absolute top-[91px] left-[24px] right-[24px] lg:inset-y-0 lg:left-0 lg:right-auto lg:w-[48%] lg:flex lg:flex-col lg:justify-center lg:pl-14 lg:pr-6">
        <div className="max-w-[440px]">
          <h3 className="font-dm font-extrabold text-[24px] md:text-[32px] lg:text-[48px] text-[#000000] leading-tight">
            {study.title}
          </h3>
          <p className="mt-4 font-dm font-light lg:font-normal text-[16px] md:text-lg lg:text-[20px] text-black">{study.body}</p>
        </div>
      </div>

      {study.thumbnail ? (
        <div className="hidden lg:block absolute top-[28%] bottom-[10%] right-[6%] w-[42%]">
          <div className="relative h-full flex items-center justify-center">
            <img
              src={study.thumbnail.mockup}
              alt=""
              className="w-full max-h-full rounded-xl object-contain drop-shadow-lg"
            />
            <img src={study.thumbnail.bubble} alt="" className="absolute top-[16%] left-[5%] w-[15%]" />
            <img src={study.thumbnail.birdLeft} alt="" className="absolute top-[30%] -left-[5%] w-[27%] rotate-12" />
            <img src={study.thumbnail.book} alt="" className="absolute top-[22%] right-[4%] w-[9%]" />
            <img src={study.thumbnail.birdRight} alt="" className="absolute top-[36%] -right-[6%] w-[25%] -rotate-[20deg]" />
          </div>
        </div>
      ) : (
        <div className="hidden lg:flex absolute top-[28%] bottom-[10%] right-[6%] w-[42%] items-center justify-center rounded-2xl border-2 border-dashed border-ink/30 bg-ink/5 text-ink/50 font-dm text-sm">
          Image placeholder
        </div>
      )}

      {study.mockupMobile && (
        <img
          src={study.mockupMobile}
          alt=""
          className="lg:hidden absolute left-1/2 -translate-x-1/2 bottom-[90px] w-[80%] h-auto"
        />
      )}

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

  return (
    <div
      className="lg:sticky"
      style={{ top: `calc(clamp(7rem, 18vh, 13rem) + ${index * 4.5}rem)`, zIndex: index + 1 }}
    >
      <div className="relative transition-transform duration-200 ease-out hover:-translate-y-2">
        {cardContent}
      </div>
    </div>
  );
}

export default function CaseStudies() {
  const containerRef = useRef(null);

  return (
    <section id="work" className="relative z-20 lg:-mt-[500px] pt-[120px] pb-[40px] lg:pb-28">
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
            <div aria-hidden="true" className="hidden lg:block h-[80vh]" />
          </div>
        </div>
      </div>
    </section>
  );
}
