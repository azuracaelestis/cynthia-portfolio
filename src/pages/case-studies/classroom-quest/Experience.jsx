import { motion, useReducedMotion } from 'framer-motion';
import userFlow from '../../../assets/case study/case-study-classroom-quest/experience/user-flow.svg';
import swoosh2 from '../../../assets/case study/case-study-classroom-quest/experience/swoosh-2.svg';
import swoosh1 from '../../../assets/case study/case-study-classroom-quest/experience/swoosh-1.svg';
import Section from '../../../components/case-study/Section';

const commentVariants = {
  hidden: { opacity: 0, scale: 0.6, transition: { duration: 0.2 } },
  visible: { opacity: 1, scale: 1, transition: { type: 'spring', stiffness: 350, damping: 15 } },
};

const commentVariantsReduced = {
  hidden: { opacity: 0, transition: { duration: 0 } },
  visible: { opacity: 1, transition: { duration: 0 } },
};

const revealVariants = { hidden: { opacity: 0, y: 8 }, visible: { opacity: 1, y: 0 } };
const revealVariantsReduced = { hidden: { opacity: 0 }, visible: { opacity: 1 } };
const revealTransition = { duration: 0.4, ease: [0, 0, 0.2, 1] };
const revealTransitionReduced = { duration: 0 };
const revealViewport = { once: true, margin: '0px 0px -20% 0px' };

const ANNOTATIONS = [
  {
    text: 'Building the context & story environment',
    x: 115,
    y: 41,
    arrow: { src: swoosh2, x: 228, y: 75, width: 48.5 },
  },
  {
    text: 'Highlights of teaching approach and strengths based on their choices',
    x: 55,
    y: 252,
    arrow: { src: swoosh1, x: 155, y: 220, width: 59 },
  },
  { text: "Summary of user's teaching journey and key decisions", x: 105, y: 375 },
];

export default function Experience() {
  const reduceMotion = useReducedMotion();
  const variants = reduceMotion ? commentVariantsReduced : commentVariants;

  return (
    <Section
      id="the-experience"
      eyebrow="THE EXPERIENCE"
      title="A five-minute quest, built to feel effortless."
      titleClassName="mb-8 lg:mb-6"
    >
      <div className="relative">
        <motion.img
          src={userFlow}
          alt="User flow diagram: Start the Journey leads through Opening Scenario, Choose Your Companion, five Mission Scenarios (each a choice of three answers), to the Result Page, which branches to the Product page, Download page, or Retake the quest (looping back to Start the Journey)."
          className="lg:mx-[160px] lg:w-[calc(100%-320px)] w-full h-auto"
          initial="hidden"
          whileInView="visible"
          viewport={revealViewport}
          variants={reduceMotion ? revealVariantsReduced : revealVariants}
          transition={reduceMotion ? revealTransitionReduced : revealTransition}
        />
        {ANNOTATIONS.map((note) => (
          <motion.p
            key={note.text}
            className="hidden lg:block absolute font-caveat font-bold text-[16px] text-about-blue leading-[17px] w-[150px]"
            style={{ left: note.x, top: note.y }}
            initial="hidden"
            whileInView="visible"
            variants={variants}
            viewport={{ amount: 0.6, margin: '-20% 0px -20% 0px' }}
          >
            {note.text}
          </motion.p>
        ))}
        {ANNOTATIONS.filter((note) => note.arrow).map((note) => (
          <motion.img
            key={note.arrow.src}
            src={note.arrow.src}
            alt=""
            className="hidden lg:block absolute"
            style={{ left: note.arrow.x, top: note.arrow.y, width: note.arrow.width }}
            initial="hidden"
            whileInView="visible"
            variants={variants}
            viewport={{ amount: 0.6, margin: '-20% 0px -20% 0px' }}
          />
        ))}
      </div>
    </Section>
  );
}
