import { motion, useReducedMotion } from 'framer-motion';
import cyanBird from '../../../assets/case study/case-study-classroom-quest/header/cyan-bird.svg';
import redBird from '../../../assets/case study/case-study-classroom-quest/header/red-bird.svg';
import purpleBlueBird from '../../../assets/case study/case-study-classroom-quest/header/purple-blue_bird.svg';
import panicBubble from '../../../assets/case study/case-study-classroom-quest/header/panic_bubble.svg';
import classroomQuestMockup from '../../../assets/case study/case-study-classroom-quest/header/Classroom Quest2.jpg';
import mobilePreview from '../../../assets/case study/case-study-classroom-quest/header/header-mobile-preview.png';

const EASE_TEXT = [0.22, 0.61, 0.36, 1];
const EASE_HERO = [0.34, 1.56, 0.64, 1];
const textTransition = { duration: 0.5, ease: EASE_TEXT };
const heroTransition = { duration: 0.6, ease: EASE_HERO };
const reducedTransition = { duration: 0.2 };
const withDelay = (transition, delay) => ({ ...transition, delay });

const textVariants = { hidden: { opacity: 0, y: 14 }, visible: { opacity: 1, y: 0 } };
const textVariantsReduced = { hidden: { opacity: 0 }, visible: { opacity: 1 } };
const heroVariants = { hidden: { opacity: 0, y: 30, scale: 0.8 }, visible: { opacity: 1, y: 0, scale: 1 } };
const heroVariantsReduced = { hidden: { opacity: 0 }, visible: { opacity: 1 } };
const heroRotatedVariants = (deg) => ({
  hidden: { opacity: 0, y: 30, scale: 0.8, rotate: deg },
  visible: { opacity: 1, y: 0, scale: 1, rotate: deg },
});
const heroRotatedVariantsReduced = (deg) => ({
  hidden: { opacity: 0, rotate: deg },
  visible: { opacity: 1, rotate: deg },
});

export default function Overview() {
  const reduceMotion = useReducedMotion();
  const enterProps = { initial: 'hidden', animate: 'visible' };

  const textDelay = (real, reduced) => withDelay(reduceMotion ? reducedTransition : textTransition, reduceMotion ? reduced : real);
  const heroDelay = (real, reduced) => withDelay(reduceMotion ? reducedTransition : heroTransition, reduceMotion ? reduced : real);

  // Mockup image reveals first, then the birds follow — every breakpoint.
  const mockupDelay = heroDelay(0.0, 0.0);
  const cyanBirdDelay = heroDelay(0.24, 0.08);
  const purpleBlueBirdDelay = heroDelay(0.36, 0.12);
  const redBirdDelay = heroDelay(0.48, 0.16);

  return (
    <div id="overview" className="scroll-mt-28 bg-gradient-to-b from-white to-bleed-blue">
      <div className="mx-auto max-w-7xl px-6 lg:px-10 pt-[140px] lg:pt-40 pb-0">
        <div className="-translate-y-6 lg:translate-y-0">
        <motion.span
          {...enterProps}
          variants={reduceMotion ? textVariantsReduced : textVariants}
          transition={textDelay(0.0, 0.0)}
          className="font-dm font-bold text-[16px] lg:text-[24px] text-black"
        >
          ViewSonic Education
        </motion.span>
        <motion.h1
          {...enterProps}
          variants={reduceMotion ? textVariantsReduced : textVariants}
          transition={textDelay(0.08, 0.04)}
          className="mt-4 lg:mt-3 font-dm font-bold text-[36px] leading-[47px] lg:text-[48px] lg:leading-[60px] text-black"
        >
          A Product Update<br className="lg:hidden" /> Teachers Wanted<br className="lg:hidden" /> to Play
        </motion.h1>

        <div className="mt-6 flex flex-col gap-6 lg:mt-12 lg:flex-row lg:justify-between lg:gap-x-8">
          <motion.div {...enterProps} variants={reduceMotion ? textVariantsReduced : textVariants} transition={textDelay(0.18, 0.08)}>
            <p className="font-dm font-extrabold text-[20px] text-black">Overview</p>
            <p className="mt-2 font-dm text-[16px] text-black lg:max-w-[390px]">
              Classroom Quest is a gamified web experience for myViewBoard 3.0 where teachers play through five familiar classroom moments, each resolving into the feature that solves it.
            </p>
          </motion.div>
          <motion.div {...enterProps} variants={reduceMotion ? textVariantsReduced : textVariants} transition={textDelay(0.24, 0.12)}>
            <p className="font-dm font-extrabold text-[20px] text-black">Role</p>
            <p className="mt-2 font-dm text-[16px] text-black lg:max-w-[220px]">
              <span className="font-semibold">Lead UI Designer</span>
              <br />
              Owned visual direction, interaction design, character system, and localization
            </p>
          </motion.div>
          <motion.div {...enterProps} variants={reduceMotion ? textVariantsReduced : textVariants} transition={textDelay(0.3, 0.16)}>
            <p className="font-dm font-extrabold text-[20px] text-black">The Team</p>
            <p className="mt-2 font-dm text-[16px] text-black lg:max-w-[231px]">
              UI Designers, Project Manager,
              <br />
              Engineers, UX Researchers, Content Team, Growth Team
            </p>
          </motion.div>
          <motion.div {...enterProps} variants={reduceMotion ? textVariantsReduced : textVariants} transition={textDelay(0.36, 0.2)}>
            <p className="font-dm font-extrabold text-[20px] text-black">Timeline</p>
            <p className="mt-2 font-dm text-[16px] text-black">Q2 2025 (4 weeks)</p>
          </motion.div>
        </div>
        </div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '0px 0px -60% 0px' }}
          className="relative mt-8 lg:mt-[94px] lg:max-w-[72%] lg:mx-auto"
        >
          <motion.img
            variants={reduceMotion ? heroVariantsReduced : heroVariants}
            transition={mockupDelay}
            src={classroomQuestMockup}
            alt="Classroom Quest homepage mockup"
            className="relative w-full h-auto rounded-t-[16px]"
          />

          {/* Decorations. Each sized/positioned as a direct percentage of
              this wrapper (= mockup width), pulled from the Figma frame
              (node 37:37) via MCP — not nested/guessed. panicBubble and
              mobilePreview stay desktop-only; the three birds are shown at
              every breakpoint. */}
          <motion.img
            variants={reduceMotion ? heroRotatedVariantsReduced(-16) : heroRotatedVariants(-16)}
            transition={heroDelay(0.0, 0.0)}
            src={panicBubble}
            alt=""
            className="hidden lg:block absolute left-[8%] top-[calc(18%-20px)] w-[12%]"
          />
          <motion.img
            variants={reduceMotion ? heroRotatedVariantsReduced(-16) : heroRotatedVariants(-16)}
            transition={cyanBirdDelay}
            src={cyanBird}
            alt=""
            className="absolute -left-[7%] top-[calc(32%-45px)] w-[28.88%]"
          />
          <motion.img
            variants={reduceMotion ? heroRotatedVariantsReduced(-6) : heroRotatedVariants(-6)}
            transition={purpleBlueBirdDelay}
            src={purpleBlueBird}
            alt=""
            className="absolute left-[calc(74%+10px)] top-[14%] w-[24%]"
          />
          <motion.img
            variants={reduceMotion ? heroVariantsReduced : heroVariants}
            transition={heroDelay(0.48, 0.16)}
            src={mobilePreview}
            alt=""
            className="hidden lg:block absolute left-[87%] top-[33%] w-[32%]"
          />
          <motion.img
            variants={reduceMotion ? heroVariantsReduced : heroVariants}
            transition={redBirdDelay}
            src={redBird}
            alt=""
            className="absolute left-[calc(65.7%-20px)] top-[calc(63.9%+2px)] lg:top-[calc(63.9%-50px)] w-[29.26%]"
          />
        </motion.div>
      </div>
    </div>
  );
}
