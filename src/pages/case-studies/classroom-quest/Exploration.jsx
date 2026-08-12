import { motion, useReducedMotion } from 'framer-motion';
import landingPage from '../../../assets/case study/case-study-classroom-quest/exploration/landing page.png';
import commentJanice from '../../../assets/case study/case-study-classroom-quest/exploration/landing page-comment-janice.svg';
import Section from '../../../components/case-study/Section';

const commentVariants = {
  hidden: { opacity: 0, scale: 0.6, transition: { duration: 0.2 } },
  visible: { opacity: 1, scale: 1, transition: { type: 'spring', stiffness: 350, damping: 15, delay: 0.5 } },
};

const commentVariantsReduced = {
  hidden: { opacity: 0, transition: { duration: 0 } },
  visible: { opacity: 1, transition: { duration: 0 } },
};

export default function Exploration() {
  const reduceMotion = useReducedMotion();

  return (
    <Section id="exploration" eyebrow="EXPLORATION" title="Built inside constraints, not around them.">
      <p className="font-dm font-bold text-[20px] text-black mb-4">Landing Page</p>
      <p className="font-dm text-[16px] text-black leading-[23px] mb-6">
        This was the first thing teachers saw. The CTA sends them to play, with a myViewBoard download card tied to
        the campaign&apos;s main KPI. The catch was the copy set inside the interactive display — it couldn&apos;t
        stretch, so longer languages like German and Spanish overflowed. I anchored the visual to a fixed safe zone
        and moved the subheadline outside the display, giving translations room to grow.
      </p>
      <div className="relative w-full aspect-[890/656] rounded-2xl bg-bleed-blue flex items-center justify-center">
        <img
          src={landingPage}
          alt="Classroom Quest landing page: a hero banner inviting teachers to 'Embark on Your Quest', illustrated classroom-hero characters, and a myViewBoard feature callout below."
          className="w-[78%] h-auto rounded-2xl shadow-[0px_0px_5px_rgba(0,0,0,0.1)] translate-y-[60px]"
        />
        <motion.img
          src={commentJanice}
          alt="Design review comment from Janice L: The subheadline outside the display fixes the overflow for German and Spanish. Looks locked-in to me."
          className="absolute left-[64.4%] top-[4.4%] w-[32.7%]"
          initial="hidden"
          whileInView="visible"
          variants={reduceMotion ? commentVariantsReduced : commentVariants}
          viewport={{ amount: 0.4 }}
        />
      </div>
    </Section>
  );
}
