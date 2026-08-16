import { useEffect, useRef, useState } from 'react';
import { useReducedMotion } from 'framer-motion';
import Section from '../../../components/case-study/Section';

const LESSONS = [
  {
    title: 'Engineering',
    body: 'I scoped the build with the dev team early, prioritizing the interactions that carried the experience over a chatbot format with no precedent, on a hard timeline.',
  },
  {
    title: 'Localization',
    body: "Some languages, like Arabic, needed extra support: text that reads right to left, and text that's longer than English. Since this came in late, I used Canva as a quick, simple tool so our local partners in each country could adjust the layout themselves.",
  },
  {
    title: 'Time Constrains',
    body: "Five weeks to define, ideate, prototype, iterate, and deploy left fewer rounds of iteration than I'd have wanted on any single piece. Leading here meant making scoping calls fast, on incomplete information, and trusting the ones that mattered most would hold up.",
  },
];

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

  useEffect(() => {
    const el = scrollerRef.current;
    if (!el) return undefined;

    const update = () => {
      setCanScrollLeft(el.scrollLeft > 1);
      setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 1);
    };
    update();
    el.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    return () => {
      el.removeEventListener('scroll', update);
      window.removeEventListener('resize', update);
    };
  }, []);

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
    <Section id="impact-reflection" eyebrow="IMPACT & REFLECTION">
      <div className="flex flex-col gap-8">
        <div className="flex flex-col gap-4">
          <p className="font-dm font-bold text-[20px] text-black">Status</p>
          <p className="font-dm text-[16px] text-black leading-[23px]">
            The experience was designed, built, and ready to ship on schedule. Before launch, myViewBoard 3.0 failed
            its usability testing. Widespread bug reports led the product team to pull it back for fixes, and the
            Classroom Quest campaign was put on hold indefinitely.
          </p>
        </div>
        <div className="flex flex-col gap-4">
          <p className="font-dm font-bold text-[20px] text-black">What I&apos;d have measured</p>
          <p className="font-dm text-[16px] text-black leading-[23px]">
            Completion rate through all five scenes, click-through from the Result Page to the download page, and
            time spent per scenario: the numbers that would show whether &quot;feel the problem, then reveal the
            tool&quot; actually changed behavior, not just attention.
          </p>
        </div>
      </div>

      <div className="flex flex-col gap-6 mt-8">
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
            className="flex gap-5 overflow-x-auto snap-x snap-mandatory scrollbar-hide pb-2 -mx-6 px-6 lg:mx-0 lg:px-0 lg:cursor-grab lg:active:cursor-grabbing touch-pan-x select-none"
          >
            {LESSONS.map((lesson) => (
              <div
                key={lesson.title}
                className="shrink-0 snap-start bg-white rounded-2xl shadow-[0px_0px_5px_rgba(0,0,0,0.1)] p-6 flex flex-col gap-2 overflow-y-auto w-[85vw] max-w-[350px] h-[236px] lg:w-[24.31vw] lg:h-[16.39vw]"
              >
                <p className="font-dm font-bold text-[16px] text-black">{lesson.title}</p>
                <p className="font-dm text-[16px] text-black leading-[23px]">{lesson.body}</p>
              </div>
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
    </Section>
  );
}
