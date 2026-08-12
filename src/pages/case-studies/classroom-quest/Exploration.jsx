import { motion, useReducedMotion } from 'framer-motion';
import landingPage from '../../../assets/case study/case-study-classroom-quest/exploration/Landing page_large.jpg';
import commentJanice from '../../../assets/case study/case-study-classroom-quest/exploration/landing page-comment-janice.svg';
import chooseYourCompanion from '../../../assets/case study/case-study-classroom-quest/exploration/choose your companion/choose-your-companion.png';
import Section from '../../../components/case-study/Section';

const commentVariants = {
  hidden: { opacity: 0, scale: 0.6, transition: { duration: 0.2 } },
  visible: { opacity: 1, scale: 1, transition: { type: 'spring', stiffness: 350, damping: 15 } },
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
          viewport={{ amount: 0.6, margin: '-20% 0px -20% 0px' }}
        />
      </div>

      <p className="font-dm font-bold text-[20px] text-black mt-16 mb-4">Choose Your Companion</p>
      <p className="font-dm text-[16px] text-black leading-[23px] mb-6">
        This was where teachers picked their guide: one of four returning Teaching Superpower characters, chosen
        through interactive flash cards. On a 9:16 mobile screen, a button under the grid would fall below the fold,
        so I designed the CTA to surface on the selected card instead, then carried that same logic up to desktop.
      </p>
      <div className="rounded-2xl bg-case-study-yellow-light p-6 lg:p-10 flex items-center justify-start overflow-hidden lg:w-[55.54vw] lg:min-h-[37.02vw] lg:ml-auto">
        <img
          src={chooseYourCompanion}
          alt="Choose Your Companion character cards: default state (a single card, 'Turns ideas into classroom magic') and hover state (the same card with an 'I'm Ready' button revealed), alongside the full 4-character grid in its default state and its selected state with the red creature card highlighted."
          className="w-[110%] h-auto"
        />
      </div>
    </Section>
  );
}
