import { motion, useReducedMotion } from 'framer-motion';
import { useMediaQuery } from '../../../hooks/useMediaQuery';
import originalCyan from '../../../assets/case study/case-study-classroom-quest/character system/personality test_bird-13.png';
import originalRed from '../../../assets/case study/case-study-classroom-quest/character system/personality test_bird-15.png';
import render3dCyan from '../../../assets/case study/case-study-classroom-quest/character system/inspiration_without_costume.png';
import render3dRed from '../../../assets/case study/case-study-classroom-quest/character system/adaptability_without_costume.png';
import motion2dCyan from '../../../assets/case study/case-study-classroom-quest/character system/cyan-bird.svg';
import motion2dRed from '../../../assets/case study/case-study-classroom-quest/character system/red-bird.svg';
import Section from '../../../components/case-study/Section';

const COLUMNS = ['Original design for 2024', '3D render', '2D illustration'];

const ROWS = [
  {
    original: originalCyan,
    render3d: render3dCyan,
    motion2d: motion2dCyan,
    alt: 'cyan wizard-bird character',
    render3dMaxHeight: 153,
    motion2dMaxHeight: 230,
  },
  {
    original: originalRed,
    render3d: render3dRed,
    motion2d: motion2dRed,
    alt: 'red creature character',
    render3dMaxHeight: 140,
    render3dMaxHeightMobile: 115,
  },
];

const revealVariants = { hidden: { opacity: 0, y: 8 }, visible: { opacity: 1, y: 0 } };
const revealVariantsReduced = { hidden: { opacity: 0 }, visible: { opacity: 1 } };
const revealTransition = { duration: 0.4, ease: [0, 0, 0.2, 1] };
const revealTransitionReduced = { duration: 0 };
const revealViewport = { once: true, margin: '0px 0px -20% 0px' };
const STAGGER_STEP = 0.06;

export default function CharacterSystem() {
  const reduceMotion = useReducedMotion();
  const isMobileViewport = useMediaQuery('(max-width: 1023px)');
  const variants = reduceMotion ? revealVariantsReduced : revealVariants;
  const transitionAt = (i) => ({
    ...(reduceMotion ? revealTransitionReduced : revealTransition),
    delay: reduceMotion ? 0 : i * STAGGER_STEP,
  });

  return (
    <Section id="character-system" eyebrow="CHARACTER SYSTEM" title="Same characters, rebuilt for a new format.">
      <p className="font-dm text-[16px] text-black leading-[23px] mb-8">
        Last year, we used 3D-rendered GIFs. They looked great on a laptop, but they broke down at the event. The
        files were too heavy, so they loaded slowly on the venue&apos;s Wi-Fi. Because of this, I set one rule before
        starting the character designs: use 2D MP4 only. This kept the quality high, while making the files much
        smaller. Every character below was rebuilt from 3D to 2D under this rule, without losing what made them who
        they are.
      </p>
      <div className="grid grid-cols-3 gap-6 mb-5 lg:mb-4">
        {COLUMNS.map((label) => (
          <p key={label} className="font-caveat font-bold text-[20px] text-about-blue text-center">
            {label}
          </p>
        ))}
      </div>
      <div className="flex flex-col gap-[8px] lg:gap-2">
        {ROWS.map((row) => (
          <div key={row.alt} className="grid grid-cols-3 gap-6 items-center">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={revealViewport}
              variants={variants}
              transition={transitionAt(0)}
              className="flex items-center justify-center h-[130px] lg:h-[200px]"
            >
              <img
                src={row.original}
                alt={`${row.alt}, original design for 2024`}
                className="max-w-full max-h-full w-auto h-auto"
              />
            </motion.div>
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={revealViewport}
              variants={variants}
              transition={transitionAt(1)}
              className="flex items-center justify-center h-[130px] lg:h-[200px]"
            >
              <img
                src={row.render3d}
                alt={`${row.alt}, 3D render`}
                className="max-w-full w-auto h-auto"
                style={{
                  maxHeight:
                    isMobileViewport && row.render3dMaxHeightMobile
                      ? row.render3dMaxHeightMobile
                      : row.render3dMaxHeight ?? 200,
                }}
              />
            </motion.div>
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={revealViewport}
              variants={variants}
              transition={transitionAt(2)}
              className="flex items-center justify-center h-[130px] lg:h-[200px]"
            >
              <img
                src={row.motion2d}
                alt={`${row.alt}, final 2D motion style for Classroom Quest`}
                className="max-w-full w-auto h-auto"
                style={{ maxHeight: row.motion2dMaxHeight ?? 200 }}
              />
            </motion.div>
          </div>
        ))}
      </div>
    </Section>
  );
}
