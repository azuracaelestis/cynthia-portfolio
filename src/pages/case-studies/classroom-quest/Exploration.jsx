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
import Flow from '../../../components/Flow';

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

// Landing Page image rests at a baked-in translate-y-[60px]; fold that into
// the reveal variant instead of a static Tailwind class, since Framer's
// inline transform would otherwise silently override it.
const landingPageRevealVariants = { hidden: { opacity: 0, y: 68 }, visible: { opacity: 1, y: 60 } };
const landingPageRevealVariantsReduced = { hidden: { opacity: 0, y: 60 }, visible: { opacity: 1, y: 60 } };

export default function Exploration() {
  const reduceMotion = useReducedMotion();

  return (
    <Section flow
      id="exploration"
      eyebrow="KEY DESIGN DECISIONS"
      title="Designing for real-world constraints"
      eyebrowClassName="mb-4"
      titleClassName="mb-6 lg:mb-8"
    >
      <Flow>
        <p className="font-satoshi text-[16px] text-black leading-[23px] mb-10 lg:mb-[3.5vw]">
          The experience had to work across languages, screen sizes, and real event conditions. These constraints
          shaped four key design decisions.
        </p>
      </Flow>
      <Flow>
        <p className="font-satoshi font-bold text-[20px] text-black mb-[1.11vw]">01 Designing for localization</p>
        <p className="font-satoshi text-[16px] text-black leading-[23px] mb-8 lg:mb-[2.22vw]">
          Longer translations like German and Spanish broke the original hero layout. I moved the supporting copy
          outside the display and created a safer layout that could scale across languages.
        </p>
      </Flow>
      <Flow>
        <div className="relative w-full aspect-[890/656] rounded-2xl bg-bleed-blue flex items-center justify-center">
          <motion.img
            src={landingPage}
            alt="Classroom Quest landing page: a hero banner inviting teachers to 'Embark on Your Quest', illustrated classroom-hero characters, and a myViewBoard feature callout below."
            className="w-[78%] h-auto rounded-2xl shadow-[0px_0px_5px_rgba(0,0,0,0.1)]"
            initial="hidden"
            whileInView="visible"
            viewport={revealViewport}
            variants={reduceMotion ? landingPageRevealVariantsReduced : landingPageRevealVariants}
            transition={reduceMotion ? revealTransitionReduced : revealTransition}
          />
          <motion.img
            src={commentJanice}
            alt="Design review comment from Janice L: The subheadline outside the display fixes the overflow for German and Spanish. Looks locked-in to me."
            className="absolute left-[calc(64.4%-62px)] top-[4.4%] w-[49.05%] lg:left-[64.4%] lg:top-[4.4%] lg:w-[32.7%]"
            initial="hidden"
            whileInView="visible"
            variants={reduceMotion ? commentVariantsReduced : commentVariants}
            viewport={{ amount: 0.6, margin: '-20% 0px -20% 0px' }}
          />
        </div>
      </Flow>

      {/* Subsection spacing: each heading's top margin is set so the VISIBLE gap
          from the previous image to this heading is 80px. That isn't the same
          as the gap between boxes — the images don't sit flush in them: 01's
          landing image hangs 60px below its box (its baked-in y:60), 02's fills
          its box, and 03's ends ~17px inside its box on desktop. So the margins
          are 60+80, 80 and 80-17. Re-measure if an image or its box changes. */}
      <Flow>
        <p className="font-satoshi font-bold text-[20px] text-black mt-[140px] mb-[1.11vw]">02 Keeping the next step visible</p>
        <p className="font-satoshi text-[16px] text-black leading-[23px] mb-8 lg:mb-[2.22vw]">
          On mobile, placing one CTA below all four character cards pushed the action too far down the page. I moved
          the CTA onto the selected card, then carried the same interaction back to desktop.
        </p>
      </Flow>
      <Flow>
        <div className="relative w-full">
          <motion.img
            src={chooseYourCompanion}
            alt="Choose Your Companion character cards: default state (a single card, 'Turns ideas into classroom magic') and hover state (the same card with an 'I'm Ready' button revealed), alongside the full 4-character grid in its default state and its selected state with the red creature card highlighted."
            className="relative w-full h-auto"
            initial="hidden"
            whileInView="visible"
            viewport={revealViewport}
            variants={reduceMotion ? revealVariantsReduced : revealVariants}
            transition={reduceMotion ? revealTransitionReduced : revealTransition}
          />
          <p className="absolute left-[1%] top-[calc(3%-5px)] lg:top-[3%] font-caveat font-bold text-[14px] lg:text-[19.36px] text-about-blue">
            Default state
          </p>
          <p className="absolute left-[1%] top-[36%] lg:top-[calc(36%+15px)] font-caveat font-bold text-[14px] lg:text-[19.36px] text-about-blue">
            Hover state
          </p>
          <p className="absolute left-[1%] top-[calc(76%+34px)] lg:top-[calc(76%+58px)] font-caveat font-bold text-[14px] lg:text-[22px] text-about-blue">
            Mobile-first design
          </p>
          <p className="absolute left-[43.5%] top-[calc(3%-5px)] lg:top-[3%] font-caveat font-bold text-[14px] lg:text-[22px] text-about-blue">
            First iteration.
          </p>
          <img src={selectedArrow} alt="" className="hidden lg:block absolute left-[46%] top-[calc(74%+60px)] w-[4.5%] h-auto" />
          <p className="hidden lg:block absolute left-[52%] top-[calc(75%+75px)] font-caveat font-bold text-[26.4px] text-about-blue">
            Selected
          </p>
          <motion.img
            src={commentJoy}
            alt="Design review comment from Joy Wu: Nice, the desktop version follows the mobile logic now. The CTA on the selected card reads much clearer than one button under the whole grid."
            className="absolute left-[calc(67%-42px)] top-[calc(73%+35px)] w-[49.01%] lg:left-[calc(67%-10px)] lg:top-[calc(73%+67px)] lg:w-[32.67%]"
            initial="hidden"
            whileInView="visible"
            variants={reduceMotion ? commentVariantsReduced : commentVariants}
            viewport={{ amount: 0.6, margin: '-20% 0px -20% 0px' }}
          />
        </div>
      </Flow>

      <Flow>
        <p className="font-satoshi font-bold text-[20px] text-black mt-20 mb-[1.11vw]">03 Removing interaction noise</p>
        <p className="font-satoshi text-[16px] text-black leading-[23px] mb-8 lg:mb-[2.22vw]">
          The first mission concept looked like a game console, but the extra controls competed with the actual
          choices. I stripped it back to a chat-style interface so there was only one obvious thing to interact with.
        </p>
      </Flow>
      <Flow>
        <div className="relative w-full aspect-[874/460] rounded-2xl flex items-center justify-center">
          <motion.img
            src={missionScenario}
            alt="Mission Scenario mobile screen, 'The Kingdom of Snooze': a chat-style story sequence ending in a highlighted spellbook choice, 'Load a quick bell-ringer worksheet on the board to awaken their focus,' alongside a zoomed-in detail of the same dialogue and choice list."
            className="w-[110.4%] lg:w-[92%] h-auto"
            initial="hidden"
            whileInView="visible"
            viewport={revealViewport}
            variants={reduceMotion ? revealVariantsReduced : revealVariants}
            transition={reduceMotion ? revealTransitionReduced : revealTransition}
          />
          <img
            src={missionScenarioArrow}
            alt=""
            className="hidden lg:block absolute left-[58%] top-[calc(12%+270px)] w-[6%] h-auto"
          />
          <p className="hidden lg:block absolute left-[calc(65%+10px)] top-[calc(12%+313px)] font-caveat font-bold text-[20px] text-about-blue leading-tight">
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
      </Flow>

      <Flow>
        <p className="font-satoshi font-bold text-[20px] text-black mt-20 lg:mt-[63px] mb-[1.11vw]">04 Turning features into rewards</p>
        <p className="font-satoshi text-[16px] text-black leading-[23px] mb-8 lg:mb-[2.22vw]">
          The result page still needed to introduce myViewBoard 3.0 without ending the game with a feature list. I
          turned the teacher’s choices into unlocked skills, framing each product feature as a reward they had earned.
        </p>
      </Flow>
      <Flow>
        <div className="relative w-full aspect-[3560/2548] rounded-2xl flex items-center justify-center">
          <motion.img
            src={resultPage}
            alt="Result Page, 'The Day Nothing Caught Fire': a story recap, an 'Igniter of Curiosity' character result, a 'You've Leveled Up!' attributes panel, and 'New Skills Unlocked' myViewBoard 3.0 feature cards, styled as an RPG bento grid."
            className="w-[92%] h-auto"
            initial="hidden"
            whileInView="visible"
            viewport={revealViewport}
            variants={reduceMotion ? revealVariantsReduced : revealVariants}
            transition={reduceMotion ? revealTransitionReduced : revealTransition}
          />
          <motion.img
            src={commentSamResult}
            alt="Design review comment from Sam Perinskie: Love the leveled-up framing here. Makes the features feel like a reward."
            className="absolute left-[calc(2%-20px)] top-[calc(3%+10px)] w-[46%] lg:top-[calc(3%+42px)] lg:w-[34.85%]"
            initial="hidden"
            whileInView="visible"
            variants={reduceMotion ? commentVariantsReduced : commentVariants}
            viewport={{ amount: 0.6, margin: '-20% 0px -20% 0px' }}
          />
        </div>
      </Flow>
    </Section>
  );
}
