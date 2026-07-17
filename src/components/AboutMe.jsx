import { motion } from 'framer-motion';
import cynthiaPhoto from '../assets/about me/cynthia-pp.png';
import blueFlower from '../assets/about me/element7.svg';
import yellowSunburst from '../assets/about me/element8.svg';
import aiIcon from '../assets/about me/logo design toolkit/ai.svg';
import psIcon from '../assets/about me/logo design toolkit/ps.svg';
import idIcon from '../assets/about me/logo design toolkit/id.svg';
import figmaIcon from '../assets/about me/logo design toolkit/figma.svg';
import chatgptIcon from '../assets/about me/logo design toolkit/chatgpt.svg';
import lovartIcon from '../assets/about me/logo design toolkit/lovart.png';
import claudeCodeIcon from '../assets/about me/vibe code/claude_code.png';
import githubIcon from '../assets/about me/vibe code/github.svg';
import mobbinIcon from '../assets/about me/vibe code/mobbin.svg';
import v0Icon from '../assets/about me/vibe code/v0.svg';
import vsCodeIcon from '../assets/about me/vibe code/vs code.svg';

const EXPERIENCE = [
  { company: 'ViewSonic (Taipei, Taiwan)', role: 'Design Project Lead', period: '2023 – Present' },
  { company: 'New Century Product (Taipei, Taiwan)', role: 'Graphic Design, Part-Time', period: '2021 – 2023' },
  { company: 'Golin Ketchum (Taipei, Taiwan)', role: 'Graphic Design, Freelance', period: '2017 – 2021' },
];

const DESIGN_TOOLS = [
  { name: 'Illustrator', icon: aiIcon },
  { name: 'Photoshop', icon: psIcon },
  { name: 'InDesign', icon: idIcon },
  { name: 'Figma', icon: figmaIcon },
  { name: 'ChatGPT', icon: chatgptIcon },
  { name: 'Lovart', icon: lovartIcon },
];

const VIBE_TOOLS = [
  { name: 'Claude Code', icon: claudeCodeIcon },
  { name: 'GitHub', icon: githubIcon },
  { name: 'Mobbin', icon: mobbinIcon },
  { name: 'v0', icon: v0Icon },
  { name: 'VS Code', icon: vsCodeIcon },
];

export default function AboutMe() {
  return (
    <section id="about" className="py-14">
      <div className="relative mx-auto max-w-[1302px] rounded-[32px] bg-about-blue px-6 lg:px-[117px] py-10 lg:py-[90px]">
        <motion.img
          src={yellowSunburst}
          alt=""
          aria-hidden="true"
          className="pointer-events-none absolute -top-8 right-[12%] w-20 lg:w-[115px] z-20"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 6.5, delay: 0.8, repeat: Infinity, ease: 'easeInOut' }}
        />

        <div className="grid lg:grid-cols-[minmax(0,357px)_1fr] lg:grid-rows-[auto_auto] gap-8 lg:gap-x-[84px] items-start">
          <div className="relative mx-auto lg:mx-0 lg:col-start-1 lg:row-start-1">
            <motion.img
              src={blueFlower}
              alt=""
              aria-hidden="true"
              className="pointer-events-none absolute -left-12 -top-12 lg:-left-[65px] lg:-top-[65px] w-24 lg:w-[130px] z-20"
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
            />
            <div className="relative z-10 w-64 sm:w-80 lg:w-[357px] aspect-square rounded-[32px] overflow-hidden shadow-2xl">
              <img
                src={cynthiaPhoto}
                alt="Cynthia Tanawi"
                className="w-full h-full object-cover object-top"
              />
            </div>
          </div>

          <div className="lg:col-start-2 lg:row-start-1">
            <h2 className="font-dm font-bold text-[44px] leading-[52px] text-white">
              Halo, I'm Cynthia
            </h2>
            <p className="mt-6 font-dm font-light text-[16px] leading-[24px] text-white">
              I'm Indonesian, and I've called Taiwan home for the past ten years — now building toward a new
              chapter in Vancouver.
            </p>
            <p className="mt-4 font-dm font-light text-[16px] leading-[24px] text-white">
              I work fluently across three languages (English, Chinese, and Bahasa), with a background in both
              design and language teaching, and I bring that same instinct to my design practice: making
              complex things clear for specific people. Before any of that, though, I was a storyteller; I grew
              up writing novels in my first language, and I still publish fiction on the side. That narrative
              instinct runs through everything I design.
            </p>
            <p className="mt-4 font-dm font-light text-[16px] leading-[24px] text-white">
              Outside of work, you can find me hiking, biking, watching movies, and vibe coding throughout the
              weekends.
            </p>
          </div>

          <div className="lg:col-start-1 lg:row-start-2">
            <h3 className="font-dm font-bold text-sm uppercase tracking-wide text-sky-200/70">
              Experience
            </h3>
            <ul className="mt-4 divide-y divide-white/15">
              {EXPERIENCE.map((job) => (
                <li key={job.company} className="font-dm py-3 first:pt-0 flex justify-between gap-4 text-sm">
                  <div>
                    <p className="font-semibold text-sky-50">{job.company}</p>
                    <p className="text-sky-100/60">{job.role}</p>
                  </div>
                  <span className="text-sky-100/50 whitespace-nowrap">{job.period}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-start-2 lg:row-start-2">
            <div>
              <h3 className="font-dm font-bold text-sm uppercase tracking-wide text-sky-200/70">
                Design Toolkit
              </h3>
              <div className="mt-3 flex gap-2 flex-wrap">
                {DESIGN_TOOLS.map((tool) => (
                  <span
                    key={tool.name}
                    className="w-16 h-16 rounded-lg bg-sky-50/10 flex items-center justify-center"
                  >
                    <img src={tool.icon} alt={tool.name} className="w-10 h-10 object-contain" />
                  </span>
                ))}
              </div>
            </div>

            <div className="mt-4">
              <h3 className="font-dm font-bold text-sm uppercase tracking-wide text-sky-200/70">
                Vibe Coding Toolkit
              </h3>
              <div className="mt-3 flex gap-2 flex-wrap">
                {VIBE_TOOLS.map((tool) => (
                  <span
                    key={tool.name}
                    className="w-16 h-16 rounded-lg bg-sky-50/10 flex items-center justify-center"
                  >
                    <img src={tool.icon} alt={tool.name} className="w-10 h-10 object-contain" />
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
