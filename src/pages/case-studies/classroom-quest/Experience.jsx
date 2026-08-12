import userFlow from '../../../assets/case study/case-study-classroom-quest/experience/user-flow.svg';
import swoosh2 from '../../../assets/case study/case-study-classroom-quest/experience/swoosh-2.svg';
import swoosh1 from '../../../assets/case study/case-study-classroom-quest/experience/swoosh-1.svg';
import Section from '../../../components/case-study/Section';

const ANNOTATIONS = [
  {
    text: 'Building the context & story environment',
    x: 85,
    y: 51,
    arrow: { src: swoosh2, x: 248, y: 90, width: 48.5 },
  },
  {
    text: 'Highlights of teaching approach and strengths based on their choices',
    x: 0,
    y: 292,
    arrow: { src: swoosh1, x: 255, y: 255, width: 59 },
  },
  { text: "Summary of user's teaching journey and key decisions", x: 25, y: 475 },
];

export default function Experience() {
  return (
    <Section id="the-experience" eyebrow="THE EXPERIENCE" title="A five-minute quest, built to feel effortless.">
      <p className="font-dm font-bold text-[20px] text-black mb-6">User Flow</p>
      <div className="relative">
        <img
          src={userFlow}
          alt="User flow diagram: Start the Journey leads through Opening Scenario, Choose Your Companion, five Mission Scenarios (each a choice of three answers), to the Result Page, which branches to the Product page, Download page, or Retake the quest (looping back to Start the Journey)."
          className="lg:ml-[160px] lg:w-[calc(100%-160px)] w-full h-auto"
        />
        {ANNOTATIONS.map((note) => (
          <p
            key={note.text}
            className="hidden lg:block absolute font-caveat font-bold text-[16px] text-about-blue leading-snug w-[150px]"
            style={{ left: note.x, top: note.y }}
          >
            {note.text}
          </p>
        ))}
        {ANNOTATIONS.filter((note) => note.arrow).map((note) => (
          <img
            key={note.arrow.src}
            src={note.arrow.src}
            alt=""
            className="hidden lg:block absolute"
            style={{ left: note.arrow.x, top: note.arrow.y, width: note.arrow.width }}
          />
        ))}
      </div>
    </Section>
  );
}
