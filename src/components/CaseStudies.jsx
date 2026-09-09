import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useReducedMotion } from 'framer-motion';
import { useMediaQuery } from '../hooks/useMediaQuery';
import { CASE_STUDIES as STUDIES } from '../data/caseStudies';

function StudyCard({ study, index }) {
  const reduceMotion = useReducedMotion();
  const isMobileViewport = useMediaQuery('(max-width: 1023px)');
  const Wrapper = study.link ? Link : 'div';
  const wrapperProps = study.link ? { to: study.link } : {};

  const cardContent = (
    <>
      <img src={study.folderMobile} alt="" className="lg:hidden w-full h-auto drop-shadow-2xl" />
      <div className="hidden lg:block relative">
        <img src={study.folder} alt="" className="w-full h-auto drop-shadow-2xl" />
        {study.folderHover && (
          <img
            src={study.folderHover}
            alt=""
            className="absolute inset-0 w-full h-full drop-shadow-2xl opacity-0 transition-opacity duration-300 ease-out group-hover:opacity-100"
          />
        )}
      </div>

      <span className="absolute top-[51px] left-[24px] lg:top-[3%] lg:left-[calc(4%-12px)] inline-block text-ink text-[12px] lg:text-base font-satoshi font-semibold">
        {study.tag}
      </span>

      <div className="absolute top-[51px] left-[24px] right-[24px] lg:inset-y-0 lg:left-0 lg:right-auto lg:w-[48%] lg:flex lg:flex-col lg:justify-center lg:pl-14 lg:pr-6">
        <div className="max-w-[440px] translate-y-[40px]">
          <h3 className="font-satoshi font-bold text-[24px] md:text-[32px] lg:text-[36px] text-[#000000] leading-tight">
            {study.title}
          </h3>
          <p className="mt-4 font-satoshi font-light lg:font-normal text-[16px] md:text-lg lg:text-[20px] text-black">{study.body}</p>
          {study.arrowRight && (
            <img
              src={study.arrowRight}
              alt=""
              className="hidden lg:block mt-4 w-8 opacity-0 -translate-x-4 transition-[opacity,transform] duration-300 ease-out group-hover:opacity-100 group-hover:translate-x-0"
            />
          )}
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
            <img src={study.thumbnail.birdLeft} alt="" className="absolute top-[30%] -left-[5%] w-[27%] rotate-12 transition-transform duration-300 ease-out group-hover:-translate-x-8 group-hover:-translate-y-3 group-hover:rotate-2" />
            <img src={study.thumbnail.book} alt="" className="absolute top-[22%] right-[4%] w-[9%]" />
            <img src={study.thumbnail.birdRight} alt="" className="absolute top-[36%] -right-[6%] w-[25%] -rotate-[30deg] transition-transform duration-300 ease-out group-hover:translate-x-8 group-hover:-translate-y-3 group-hover:-rotate-[38deg]" />
          </div>
        </div>
      ) : (
        <div className="hidden lg:flex absolute top-[28%] bottom-[10%] right-[6%] w-[42%] items-center justify-center rounded-2xl border-2 border-dashed border-ink/30 bg-ink/5 text-ink/50 font-satoshi text-sm">
          Image placeholder
        </div>
      )}

      {study.thumbnail && (
        <div className="lg:hidden absolute left-[5%] right-[5%] top-[calc(54%-24px)] flex flex-col items-center">
          <div className="relative w-[80%]">
            <img
              src={study.thumbnail.mockup}
              alt=""
              className="w-full h-auto rounded-xl object-contain drop-shadow-lg"
            />
            <img src={study.thumbnail.bubble} alt="" className="absolute top-[16%] left-[5%] w-[15%]" />
            <motion.img
              src={study.thumbnail.birdLeft}
              alt=""
              className="absolute top-[30%] -left-[5%] w-[27%]"
              initial={{ x: 0, y: 0, rotate: 12 }}
              whileInView={reduceMotion ? undefined : { x: -32, y: -12, rotate: 2 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
            />
            <img src={study.thumbnail.book} alt="" className="absolute top-[22%] right-[4%] w-[9%]" />
            <motion.img
              src={study.thumbnail.birdRight}
              alt=""
              className="absolute top-[36%] -right-[6%] w-[25%]"
              initial={{ x: 0, y: 0, rotate: -30 }}
              whileInView={reduceMotion ? undefined : { x: 32, y: -12, rotate: -38 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
            />
          </div>
        </div>
      )}

      {study.thumbnail ? (
        <span className="lg:hidden absolute left-[5%] right-[5%] bottom-[6%] flex items-center justify-center rounded-full bg-ink text-white font-satoshi font-bold text-[16px] h-[45px]">
          Read Case Study
        </span>
      ) : (
        <span className="lg:hidden absolute left-[5%] right-[5%] bottom-[6%] flex items-center justify-center rounded-full bg-ink/30 text-white font-satoshi font-bold text-[16px] h-[45px]">
          Coming Soon
        </span>
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
      return (
        <Wrapper {...wrapperProps} className="block relative">
          {cardContent}
        </Wrapper>
      );
    }
    return (
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
      >
        <Wrapper {...wrapperProps} className="block relative transition-transform duration-200 ease-out hover:-translate-y-2">
          {cardContent}
        </Wrapper>
      </motion.div>
    );
  }

  return (
    <div
      className="lg:sticky"
      style={{ top: `calc(clamp(7rem, 18vh, 13rem) - 64px + ${index * 4.5}rem)`, zIndex: index + 1 }}
    >
      <Wrapper {...wrapperProps} className="group block relative transition-transform duration-200 ease-out hover:-translate-y-2">
        {cardContent}
      </Wrapper>
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
            <div className="lg:sticky lg:top-8 z-30 text-center">
              <span className="inline-block rotate-3 rounded-[8px] lg:rounded-[16px] bg-[#FACC61] text-black font-semibold text-[12px] lg:text-[16px] px-4 py-1 lg:px-6 lg:py-3">
                Selected Projects
              </span>
              <h2 className="mt-3 lg:mt-8 font-satoshi font-bold text-[32px] md:text-[36px] lg:text-[44px] leading-[34px] lg:leading-none text-ink">
                Case Studies
              </h2>
            </div>
          </div>

          <div className="relative flex flex-col gap-12 lg:gap-[126px]">
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
