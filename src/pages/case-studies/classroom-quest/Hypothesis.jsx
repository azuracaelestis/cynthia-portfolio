import arrowRight from '../../../assets/case study/case-study-classroom-quest/hypothesis/arrow-right.svg';
import Section from '../../../components/case-study/Section';

const QUESTIONS = [
  "How might we show myViewBoard 3.0's features without it feeling like a feature list?",
  "How might we make abstract tools feel relevant to a teacher's real day?",
  'How might we connect "here\'s a feature" to "here\'s a problem you actually have"?',
];

export default function Hypothesis() {
  return (
    <Section id="hypothesis" eyebrow="HYPOTHESIS" title="We bet a game could sell without selling.">
      <div className="flex flex-col gap-12">
        <div className="flex flex-col gap-5">
          <p className="font-satoshi font-bold text-[16px] text-black">What We Knew</p>
          <p className="font-satoshi text-[16px] text-black leading-[23px]">
            In 2024 we&apos;d built a personality quiz,{' '}
            <a
              href="https://www.viewsonic.com/education/superpower_quiz/"
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-case-study-blue no-underline lg:hover:underline"
            >
              Teaching Superpower
            </a>
            , that took the
            ISTE spotlight and drew over 6,000 visitors and 11,000 page views. Gamification clearly worked to attract
            teachers, the real question was what kind of experience could also move them toward myViewBoard 3.0. A
            quiz only has to be fun. Selling a real product without triggering a sales pitch raised harder questions:
          </p>
          <div className="bg-white rounded-2xl shadow-[0px_0px_5px_rgba(0,0,0,0.1)] px-6 py-8 flex flex-col gap-5 w-full">
            {QUESTIONS.map((question) => (
              <div key={question} className="flex gap-[14px] items-start">
                <img src={arrowRight} alt="" className="shrink-0 w-5 h-5" />
                <p className="font-satoshi font-bold text-[16px] text-black">{question}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="flex flex-col gap-5">
          <p className="font-satoshi font-bold text-[16px] text-black">Our Strategy</p>
          <p className="font-satoshi font-extrabold text-[28px] lg:text-[32px] text-black leading-tight">
            Don&apos;t demo the tool. Make them need it.
          </p>
          <p className="font-satoshi text-[16px] text-black leading-[23px]">
            Instead of presenting features, we put teachers inside a classroom moment and let them feel the friction
            first, then revealed the tool as the answer, not the pitch.
          </p>
        </div>
      </div>
    </Section>
  );
}
