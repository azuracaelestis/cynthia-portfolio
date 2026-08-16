import { motion, useReducedMotion } from 'framer-motion';
import landingPage from '../../../assets/case study/case-study-classroom-quest/exploration/Landing page_large.jpg';
import commentJanice from '../../../assets/case study/case-study-classroom-quest/exploration/landing page-comment-janice.svg';
import chooseYourCompanion from '../../../assets/case study/case-study-classroom-quest/exploration/choose your companion/choose-your-companion2.png';
import selectedArrow from '../../../assets/case study/case-study-classroom-quest/exploration/selected-arrow.svg';
import commentJoy from '../../../assets/case study/case-study-classroom-quest/exploration/choose your companion/companion-comment-joy.svg';
import missionScenario from '../../../assets/case study/case-study-classroom-quest/exploration/mission scenario/mission-scenario2.png';
import commentJaniceMission from '../../../assets/case study/case-study-classroom-quest/exploration/mission scenario/mission-scenario-comment-janice.svg';
import missionScenarioArrow from '../../../assets/case study/case-study-classroom-quest/exploration/mission scenario/mission-scenario-arrow.svg';
import resultPage from '../../../assets/case study/case-study-classroom-quest/exploration/result page/result-page.png';
import commentSamResult from '../../../assets/case study/case-study-classroom-quest/exploration/result page/result-page-comment-sam.svg';
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
    <Section
      id="exploration"
      eyebrow="EXPLORATION"
      title="Built inside constraints, not around them."
      eyebrowClassName="mb-4"
      titleClassName="mb-8"
    >
      <p className="font-dm font-bold text-[20px] text-black mb-[1.11vw]">Landing Page</p>
      <p className="font-dm text-[16px] text-black leading-[23px] mb-[2.22vw]">
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

      <p className="font-dm font-bold text-[20px] text-black mt-[6.94vw] mb-[1.11vw]">Choose Your Companion</p>
      <p className="font-dm text-[16px] text-black leading-[23px] mb-[2.22vw]">
        This was where teachers picked their guide: one of four returning Teaching Superpower characters, chosen
        through interactive flash cards. On a 9:16 mobile screen, a button under the grid would fall below the fold,
        so I designed the CTA to surface on the selected card instead, then carried that same logic up to desktop.
      </p>
      <div className="relative w-full">
        <img
          src={chooseYourCompanion}
          alt="Choose Your Companion character cards: default state (a single card, 'Turns ideas into classroom magic') and hover state (the same card with an 'I'm Ready' button revealed), alongside the full 4-character grid in its default state and its selected state with the red creature card highlighted."
          className="relative w-full h-auto"
        />
        <p className="hidden lg:block absolute left-[1%] top-[3%] font-caveat font-bold text-[19.36px] text-about-blue">
          Default state
        </p>
        <p className="hidden lg:block absolute left-[1%] top-[calc(36%+15px)] font-caveat font-bold text-[19.36px] text-about-blue">
          Hover state
        </p>
        <p className="hidden lg:block absolute left-[1%] top-[calc(76%+58px)] font-caveat font-bold text-[22px] text-about-blue">
          Mobile-first design
        </p>
        <p className="hidden lg:block absolute left-[43.5%] top-[3%] font-caveat font-bold text-[22px] text-about-blue">
          First iteration.
        </p>
        <img src={selectedArrow} alt="" className="hidden lg:block absolute left-[46%] top-[calc(74%+60px)] w-[4.5%] h-auto" />
        <p className="hidden lg:block absolute left-[52%] top-[calc(75%+75px)] font-caveat font-bold text-[26.4px] text-about-blue">
          Selected
        </p>
        <motion.img
          src={commentJoy}
          alt="Design review comment from Joy Wu: Nice, the desktop version follows the mobile logic now. The CTA on the selected card reads much clearer than one button under the whole grid."
          className="hidden lg:block absolute left-[calc(67%-10px)] top-[calc(73%+67px)] w-[32.67%]"
          initial="hidden"
          whileInView="visible"
          variants={reduceMotion ? commentVariantsReduced : commentVariants}
          viewport={{ amount: 0.6, margin: '-20% 0px -20% 0px' }}
        />
      </div>

      <p className="font-dm font-bold text-[20px] text-black mt-[6.94vw] mb-[1.11vw]">Mission Scenarios</p>
      <p className="font-dm text-[16px] text-black leading-[23px] mb-[2.22vw]">
        Each scene dropped teachers into a real classroom moment and asked them to respond. I explored framing the
        whole thing as a game &quot;mission console&quot; with decorative window UI, but pared it back to a clean chat
        layout, so the only thing to tap is the choice itself, and nothing competes for attention with the decision.
      </p>
      <div className="relative w-full aspect-[874/460] rounded-2xl flex items-center justify-center">
        <img
          src={missionScenario}
          alt="Mission Scenario mobile screen, 'The Kingdom of Snooze': a chat-style story sequence ending in a highlighted spellbook choice, 'Load a quick bell-ringer worksheet on the board to awaken their focus,' alongside a zoomed-in detail of the same dialogue and choice list."
          className="w-[92%] h-auto"
        />
        <img src={missionScenarioArrow} alt="" className="absolute left-[58%] top-[calc(12%+270px)] w-[6%] h-auto" />
        <p className="absolute left-[calc(65%+10px)] top-[calc(12%+313px)] font-caveat font-bold text-[20px] text-about-blue leading-tight">
          Stripped to a chat thread.
          <br />
          One clear choice, nothing else to tap.
        </p>
        <motion.img
          src={commentJaniceMission}
          alt="Design review comment from Janice L: The window chrome looks cool but I keep trying to click the toolbar. Can we simplify so the choices are the obvious thing to tap?"
          className="absolute left-[calc(63%-500px)] top-[calc(3%+32px)] w-[33.8%]"
          initial="hidden"
          whileInView="visible"
          variants={reduceMotion ? commentVariantsReduced : commentVariants}
          viewport={{ amount: 0.6, margin: '-20% 0px -20% 0px' }}
        />
      </div>

      <p className="font-dm font-bold text-[20px] text-black mt-[6.94vw] mb-[1.11vw]">Result Page</p>
      <p className="font-dm text-[16px] text-black leading-[23px] mb-[2.22vw]">
        The teacher&apos;s choices resolving into the myViewBoard 3.0 features that matched their approach. Last
        year&apos;s version was a wall of research text; this one had to sell features, so I built it as a bento grid
        styled like an RPG character card, letting each tool read as an earned reward instead of a spec sheet.
      </p>
      <div className="relative w-full aspect-[3560/2548] rounded-2xl flex items-center justify-center">
        <img
          src={resultPage}
          alt="Result Page, 'The Day Nothing Caught Fire': a story recap, an 'Igniter of Curiosity' character result, a 'You've Leveled Up!' attributes panel, and 'New Skills Unlocked' myViewBoard 3.0 feature cards, styled as an RPG bento grid."
          className="w-[92%] h-auto"
        />
        <motion.img
          src={commentSamResult}
          alt="Design review comment from Sam Perinskie: Love the leveled-up framing here. Makes the features feel like a reward."
          className="absolute left-[calc(2%-20px)] top-[calc(3%+42px)] w-[34.85%]"
          initial="hidden"
          whileInView="visible"
          variants={reduceMotion ? commentVariantsReduced : commentVariants}
          viewport={{ amount: 0.6, margin: '-20% 0px -20% 0px' }}
        />
      </div>
    </Section>
  );
}
