import { useRef } from 'react';

const STUDIES = [
  {
    tag: 'Taipei Fine Art Museum',
    title: 'A companion for the whole museum visit',
    body: 'TFAM already had an app, but low ratings and buried features meant most visitors never used it. I led an end-to-end redesign that reframed the brief from...',
    bg: 'bg-amber-400',
    phones: 3,
  },
  {
    tag: 'ViewSonic Education',
    title: 'A product Update Teachers Actually Wanted to Play',
    body: 'A gamified experience that taught teachers about myViewBoard 3.0 by turning real classroom problems into play.',
    bg: 'bg-sky-200',
    phones: 1,
  },
  {
    tag: 'Asia Money Fintech',
    title: 'Revamping the marketing homepage',
    body: "Turning a 13-year-old B2B homepage into a funnel built to sell loans directly to everyday consumers.",
    bg: 'bg-tan-200',
    phones: 1,
  },
];

function Phone({ delay = 0 }) {
  return (
    <div
      className="w-28 sm:w-36 h-56 sm:h-72 rounded-[1.6rem] bg-ink shrink-0 shadow-xl relative"
      style={{ marginLeft: delay ? '-2.5rem' : 0 }}
    >
      <div className="absolute inset-1.5 rounded-[1.3rem] bg-white overflow-hidden">
        <div className="h-4 w-16 mx-auto mt-2 rounded-full bg-ink/10" />
      </div>
    </div>
  );
}

function StudyCard({ study, index }) {
  return (
    <div
      className="sticky relative"
      style={{ top: `calc(6rem + ${index * 1.75}rem)`, zIndex: index + 1 }}
    >
      <div className={`${study.bg} rounded-3xl px-8 sm:px-12 py-10 sm:py-14 shadow-2xl grid md:grid-cols-2 gap-8 items-center overflow-hidden`}>
        <div>
          <span className="inline-block rounded-full bg-black/10 text-ink text-xs font-semibold px-3 py-1">
            {study.tag}
          </span>
          <h3 className="mt-4 font-display font-extrabold text-2xl sm:text-3xl text-ink leading-tight">
            {study.title}
          </h3>
          <p className="mt-4 text-sm text-ink/70 max-w-sm">{study.body}</p>
        </div>
        <div className="flex justify-center md:justify-end">
          {Array.from({ length: study.phones }).map((_, i) => (
            <Phone key={i} delay={i} />
          ))}
        </div>
      </div>
      <a
        href="#"
        className="absolute top-8 right-8 sm:top-12 sm:right-12 rounded-full bg-ink hover:bg-amber-600 transition-colors text-white text-sm font-semibold px-4 py-2 flex items-center gap-1.5"
      >
        View
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
          <path d="M7 17 17 7M9 7h8v8" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </a>
    </div>
  );
}

export default function CaseStudies() {
  const containerRef = useRef(null);

  return (
    <section id="work" className="relative z-20 -mt-[500px] pt-[180px] pb-28">
      <div className="mx-auto max-w-6xl px-6 lg:px-10">
        <h2 className="text-center font-display font-extrabold text-3xl sm:text-4xl text-ink mb-16">
          Case Studies
        </h2>

        <div ref={containerRef} className="relative flex flex-col gap-24">
          {STUDIES.map((study, i) => (
            <StudyCard key={study.tag} study={study} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
