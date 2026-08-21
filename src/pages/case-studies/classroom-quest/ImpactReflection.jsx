import { useEffect, useRef, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import viewboardTextDesktop from '../../../assets/case study/case-study-classroom-quest/reflection/viewboard_text_desktop2.svg';
import Section from '../../../components/case-study/Section';

const LESSONS = [
  {
    title: 'Engineering',
    body: 'I worked with the dev team early to plan the build. The chatbot format was new, and time was tight, so I focused on the interactions that mattered most for the experience and kept the rest simple.',
  },
  {
    title: 'Localization',
    body: "Some languages, like Arabic, needed extra care: the text reads right to left, and it's often longer than English. This need came in late, so I used Canva, a quick and simple tool, letting our local partners in each country adjust the layout themselves.",
  },
  {
    title: 'Time Constrains',
    body: 'We had five weeks to define, ideate, prototype, iterate, and deploy. That left less time to refine any single piece than I would have liked. Leading through this meant making fast decisions with incomplete information, and trusting that the most important ones would hold up.',
  },
];

const revealVariants = { hidden: { opacity: 0, y: 8 }, visible: { opacity: 1, y: 0 } };
const revealVariantsReduced = { hidden: { opacity: 0 }, visible: { opacity: 1 } };
const revealTransition = { duration: 0.4, ease: [0, 0, 0.2, 1] };
const revealTransitionReduced = { duration: 0 };
const revealViewport = { once: true, margin: '0px 0px -20% 0px' };
const STAGGER_STEP = 0.06;

function ChevronIcon({ direction = 'right' }) {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 20 20"
      fill="none"
      className={direction === 'left' ? 'scale-x-[-1]' : ''}
      aria-hidden="true"
    >
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

export default function ImpactReflection() {
  const reduceMotion = useReducedMotion();
  const scrollerRef = useRef(null);
  const dragState = useRef({ isDown: false, dragged: false, startX: 0, startScrollLeft: 0 });
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const el = scrollerRef.current;
    if (!el) return undefined;

    const update = () => {
      setCanScrollLeft(el.scrollLeft > 1);
      setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 1);
      const maxScroll = el.scrollWidth - el.clientWidth;
      const progress = maxScroll > 0 ? el.scrollLeft / maxScroll : 0;
      setActiveIndex(Math.round(progress * (LESSONS.length - 1)));
    };
    update();
    el.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    return () => {
      el.removeEventListener('scroll', update);
      window.removeEventListener('resize', update);
    };
  }, []);

  const scrollToIndex = (index) => {
    const el = scrollerRef.current;
    if (!el) return;
    const maxScroll = el.scrollWidth - el.clientWidth;
    el.scrollTo({ left: (index / (LESSONS.length - 1)) * maxScroll, behavior: reduceMotion ? 'auto' : 'smooth' });
  };

  const handlePointerDown = (e) => {
    if (e.pointerType === 'touch') return;
    const el = scrollerRef.current;
    dragState.current.isDown = true;
    dragState.current.dragged = false;
    dragState.current.startX = e.clientX;
    dragState.current.startScrollLeft = el.scrollLeft;
    el.setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e) => {
    if (!dragState.current.isDown) return;
    const dx = e.clientX - dragState.current.startX;
    if (Math.abs(dx) > 5) dragState.current.dragged = true;
    scrollerRef.current.scrollLeft = dragState.current.startScrollLeft - dx;
  };

  const endDrag = (e) => {
    if (!dragState.current.isDown) return;
    dragState.current.isDown = false;
    scrollerRef.current?.releasePointerCapture?.(e.pointerId);
  };

  const handleClickCapture = (e) => {
    if (dragState.current.dragged) {
      e.preventDefault();
      e.stopPropagation();
      dragState.current.dragged = false;
    }
  };

  const scrollByCards = (direction) => {
    const el = scrollerRef.current;
    if (!el) return;
    el.scrollBy({ left: el.clientWidth * 0.9 * direction, behavior: reduceMotion ? 'auto' : 'smooth' });
  };

  return (
    <Section id="impact-reflection" eyebrow="IMPACT & REFLECTION" title="The direct hand-off">
      <div className="flex flex-col gap-8">
        <div className="flex flex-col gap-4">
          <p className="font-dm font-bold text-[20px] text-black">Status</p>
          <p className="font-dm text-[16px] text-black leading-[23px]">
            The game was designed, built, and put online. It&apos;s live on ViewSonic&apos;s website today. What
            never happened was the marketing push around it. Before that could start, myViewBoard 3.0 failed its
            usability testing, so the product team pulled it back to fix it. Because of that, the whole promotion
            plan, including the exhibition event this was built for, was put on hold too. The game is out there, but
            almost no one has been told about it. So there&apos;s no real data on how many people played it or
            downloaded the update.
          </p>
        </div>
        <div className="flex flex-col gap-4">
          <p className="font-dm font-bold text-[20px] text-black">What I&apos;d have measured</p>
          <p className="font-dm text-[16px] text-black leading-[23px]">
            If it had launched, I&apos;d have tracked three things: how many teachers finished all five scenes, how
            many clicked from the Result Page to the download page, and how long they spent on each scenario.
            Together, these would show whether the &quot;feel the problem, then reveal the tool&quot; idea actually
            got people to act, not just pay attention.
          </p>
        </div>
      </div>

      <div className="flex flex-col gap-6 mt-12 lg:mt-8">
        <div className="flex flex-col gap-4">
          <p className="font-dm font-bold text-[20px] text-black">Reflection</p>
          <p className="font-dm text-[16px] text-black leading-[23px]">
            This project reshaped how I think about building design: as big-team collaboration, where communicating
            the work clearly and bringing the whole team along matters as much as the design itself.
          </p>
        </div>
        <div className="relative">
          <div
            ref={scrollerRef}
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={endDrag}
            onPointerLeave={endDrag}
            onPointerCancel={endDrag}
            onClickCapture={handleClickCapture}
            className="flex gap-5 overflow-x-auto snap-x snap-mandatory scrollbar-hide pb-2 -mr-6 pr-6 lg:mx-0 lg:px-0 lg:cursor-grab lg:active:cursor-grabbing touch-pan-x select-none"
          >
            {LESSONS.map((lesson, i) => (
              <motion.div
                key={lesson.title}
                initial="hidden"
                whileInView="visible"
                viewport={revealViewport}
                variants={reduceMotion ? revealVariantsReduced : revealVariants}
                transition={{
                  ...(reduceMotion ? revealTransitionReduced : revealTransition),
                  delay: reduceMotion ? 0 : i * STAGGER_STEP,
                }}
                className="shrink-0 snap-start bg-white rounded-2xl shadow-[0px_0px_5px_rgba(0,0,0,0.1)] p-6 flex flex-col justify-start lg:justify-center gap-2 overflow-y-auto w-[85vw] max-w-[350px] h-[284px] lg:w-[24.31vw] lg:h-[16.39vw]"
              >
                <p className="font-dm font-bold text-[16px] text-black">{lesson.title}</p>
                <p className="font-dm text-[16px] text-black leading-[23px]">{lesson.body}</p>
              </motion.div>
            ))}
          </div>
          <div className="lg:hidden flex justify-center items-center gap-2 mt-4">
            {LESSONS.map((lesson, i) => (
              <button
                key={lesson.title}
                type="button"
                onClick={() => scrollToIndex(i)}
                aria-label={`Go to lesson ${i + 1}`}
                className={`rounded-full transition-all ${
                  activeIndex === i ? 'w-5 h-2 bg-case-study-blue' : 'w-2 h-2 bg-case-study-blue/30'
                }`}
              />
            ))}
          </div>
          <button
            type="button"
            onClick={() => scrollByCards(-1)}
            disabled={!canScrollLeft}
            aria-label="Scroll lessons left"
            className={`hidden lg:flex items-center justify-center absolute left-2 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white/90 backdrop-blur-sm shadow-[0px_0px_5px_rgba(0,0,0,0.15)] text-sky-600 transition-transform hover:scale-110 ${
              canScrollLeft ? 'opacity-100' : 'opacity-0 pointer-events-none'
            }`}
          >
            <ChevronIcon direction="left" />
          </button>
          <button
            type="button"
            onClick={() => scrollByCards(1)}
            disabled={!canScrollRight}
            aria-label="Scroll lessons right"
            className={`hidden lg:flex items-center justify-center absolute right-2 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white/90 backdrop-blur-sm shadow-[0px_0px_5px_rgba(0,0,0,0.15)] text-sky-600 transition-transform hover:scale-110 ${
              canScrollRight ? 'opacity-100' : 'opacity-0 pointer-events-none'
            }`}
          >
            <ChevronIcon direction="right" />
          </button>
        </div>
      </div>

      <div className="mt-12 lg:mt-8 flex flex-col gap-4">
        <p className="font-dm font-extrabold text-[28px] lg:text-[32px] text-black leading-tight">Play it yourself</p>
        <p className="font-dm text-[16px] text-black leading-[23px]">
          This is the real game — it&apos;s live, but no one ever got to hear about it. Try it yourself.
        </p>
      </div>

      <div className="relative mt-8 lg:max-w-[94%] lg:mx-auto">
        <img
          src={viewboardTextDesktop}
          alt="myViewBoard 3.0 browser mockup showing the Classroom Quest game live on the ViewSonic Education website."
          className="w-full h-auto rounded-2xl"
        />

        <a
          href="https://www.viewsonic.com/education/classroomquest"
          target="_blank"
          rel="noopener noreferrer"
          className="absolute left-[50%] top-[68.1%] z-10 flex w-[20.76%] h-[8.62%] -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-case-study-violet hover:opacity-90 active:opacity-80 transition-all duration-300 ease-out hover:scale-105 font-dm font-bold text-white text-[10px] sm:text-sm md:text-base lg:w-[311px] lg:h-[54px] lg:text-[16px]"
        >
          Embark on Your Quest
        </a>
      </div>
    </Section>
  );
}
