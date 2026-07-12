import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const EXPERIENCE = [
  { company: 'ViewSonic (Taipei, Taiwan)', role: 'Design Project Lead', period: '2023 – Present' },
  { company: 'New Century Product (Taipei, Taiwan)', role: 'Graphic Design, Part-Time', period: '2021 – 2023' },
  { company: 'Golin Ketchum (Taipei, Taiwan)', role: 'Graphic Design, Freelance', period: '2017 – 2021' },
];

const DESIGN_TOOLS = ['Ai', 'Ps', 'Id', 'Fg', 'Pr'];
const VIBE_TOOLS = ['✳', 'Ⅹ', 'Gh', 'Vs'];

function Flower({ isInView }) {
  return (
    <motion.svg
      viewBox="0 0 100 100"
      className="w-16 h-16 sm:w-20 sm:h-20 absolute -top-8 -left-6 sm:-left-8 drop-shadow-lg"
      initial={{ opacity: 0, scale: 0.3, rotate: -160 }}
      animate={isInView ? { opacity: 1, scale: 1, rotate: 0 } : {}}
      transition={{ duration: 0.9, ease: 'backOut' }}
    >
      {Array.from({ length: 8 }).map((_, i) => (
        <ellipse
          key={i}
          cx="50"
          cy="22"
          rx="9"
          ry="20"
          fill="#f2a93b"
          transform={`rotate(${i * 45} 50 50)`}
        />
      ))}
      <circle cx="50" cy="50" r="14" fill="#fbeac0" />
    </motion.svg>
  );
}

export default function AboutMe() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { amount: 0.4, once: true });

  return (
    <section id="about" ref={sectionRef} className="bg-navy-900 py-28">
      <div className="mx-auto max-w-6xl px-6 lg:px-10 grid lg:grid-cols-[minmax(0,320px)_1fr] gap-14 items-start">
        <div className="relative mx-auto lg:mx-0">
          <Flower isInView={isInView} />
          <div className="w-64 sm:w-72 aspect-[4/5] rounded-3xl bg-sky-200 overflow-hidden shadow-2xl">
            <div className="w-full h-full flex items-center justify-center text-navy-900/40 font-display font-bold">
              Photo
            </div>
          </div>
        </div>

        <div className="text-sky-50">
          <h2 className="font-display font-extrabold text-3xl sm:text-4xl">Halo, I'm Cynthia</h2>
          <p className="mt-5 text-sky-100/80 leading-relaxed max-w-2xl">
            I'm Indonesian, and I've called Taiwan home for the past ten years — now building toward a new
            chapter in Vancouver.
          </p>
          <p className="mt-4 text-sky-100/80 leading-relaxed max-w-2xl">
            I work fluently across three languages (English, Chinese, and Bahasa), with a background in both
            design and language teaching, and I bring that same instinct to my design practice — making
            complex things clear for specific people. Before any of that, though, I was a storyteller; I grew
            up writing novels in my first language, and I still publish fiction on the side.
          </p>
          <p className="mt-4 text-sky-100/80 leading-relaxed max-w-2xl">
            Outside of work, you can find me hiking, biking, watching movies, and vibe coding throughout the
            weekends.
          </p>

          <div className="mt-10 grid sm:grid-cols-2 gap-10">
            <div>
              <h3 className="font-display font-bold text-sm uppercase tracking-wide text-sky-200/70">
                Experience
              </h3>
              <ul className="mt-4 space-y-4">
                {EXPERIENCE.map((job) => (
                  <li key={job.company} className="flex justify-between gap-4 text-sm">
                    <div>
                      <p className="font-semibold text-sky-50">{job.company}</p>
                      <p className="text-sky-100/60">{job.role}</p>
                    </div>
                    <span className="text-sky-100/50 whitespace-nowrap">{job.period}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <div>
                <h3 className="font-display font-bold text-sm uppercase tracking-wide text-sky-200/70">
                  Design Toolkit
                </h3>
                <div className="mt-4 flex gap-2 flex-wrap">
                  {DESIGN_TOOLS.map((tool) => (
                    <span
                      key={tool}
                      className="w-9 h-9 rounded-lg bg-sky-50/10 flex items-center justify-center text-xs font-bold text-sky-50"
                    >
                      {tool}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mt-6">
                <h3 className="font-display font-bold text-sm uppercase tracking-wide text-sky-200/70">
                  Vibe Coding Toolkit
                </h3>
                <div className="mt-4 flex gap-2 flex-wrap">
                  {VIBE_TOOLS.map((tool) => (
                    <span
                      key={tool}
                      className="w-9 h-9 rounded-lg bg-sky-50/10 flex items-center justify-center text-xs font-bold text-sky-50"
                    >
                      {tool}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
