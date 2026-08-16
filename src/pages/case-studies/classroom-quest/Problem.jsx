import lowAwareness from '../../../assets/case study/case-study-classroom-quest/problem/low-awareness.svg';
import narrowReach from '../../../assets/case study/case-study-classroom-quest/problem/narrow-reach.svg';
import optInUpdate from '../../../assets/case study/case-study-classroom-quest/problem/opt-in-update.svg';
import noHardSell from '../../../assets/case study/case-study-classroom-quest/problem/no-hard-sell.svg';
import Section from '../../../components/case-study/Section';

const CARDS = [
  { icon: lowAwareness, title: 'Low Adoption Awareness', body: 'Over half of myViewBoard users worldwide still ran 2.0, unaware version 3.0 existed.' },
  { icon: narrowReach, title: 'Narrow Reach', body: "The launch ran on LinkedIn, reaching IT and admins, not the teachers who'd use it." },
  { icon: optInUpdate, title: 'Opt-In Upgrade', body: 'No auto-update. A teacher had to want myViewBoard 3.0 enough to ask IT for updates.' },
  { icon: noHardSell, title: 'No Hard Sell', body: 'Teachers tune out pitches, and pressure deepens resistance. Interest had to pull them, not push.' },
];

export default function Problem() {
  return (
    <Section id="problem" eyebrow="PROBLEM" title="A major update launched, and teachers never knew.">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {CARDS.map((card) => (
          <div
            key={card.title}
            className="bg-white rounded-2xl shadow-[0px_0px_5px_rgba(0,0,0,0.1)] p-6 flex flex-col items-start gap-4 transition-transform duration-200 ease-out hover:-translate-y-2 hover:shadow-[0px_12px_24px_rgba(0,0,0,0.15)]"
          >
            <img src={card.icon} alt="" className="h-[52px] w-auto" />
            <div>
              <p className="font-dm font-bold text-[20px] text-black">{card.title}</p>
              <p className="mt-2 font-dm text-[16px] text-black leading-[23px]">{card.body}</p>
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
}
