import Section from '../../../components/case-study/Section';

const LEARNED = [
  {
    title: 'An app is not a landing page.',
    body: 'I built the first version like a landing page: lead with the main action, keep it short. It was easy to use, but testing showed an app has to feel like a place, not just work like a funnel.',
  },
  {
    title: 'Simple and beautiful, not one or the other.',
    body: "Many polished apps I looked at were pretty but hard to use, the same trap as the old TFAM app. So I kept the simple, usable base and added TFAM's identity on top, mostly on the arrival and splash, not the working screens.",
  },
  {
    title: 'Micro interactions are communication.',
    body: "Small motion in an app isn't just polish. It tells you a button works, a tap landed, or the app is loading. Most of my second round went into these details, and they mattered more than I expected.",
  },
];

const NEXT = [
  {
    title: 'Build the Remember phase and real booking.',
    body: 'Both are designed and tested in the prototype, but need a backend, so they’re saved for a later build.',
  },
  {
    title: 'Do more research on the map experience.',
    body: 'Right now it’s flat, just numbered steps. For first timers like Marco, I want to test whether a more guided or interactive wayfinding experience actually helps, before deciding what that looks like.',
  },
];

function NumberedList({ items }) {
  return (
    <div className="flex flex-col gap-6">
      {items.map((item, i) => (
        <div key={item.title} className="flex gap-4">
          <span className="shrink-0 font-satoshi font-extrabold text-[20px] text-case-study-blue">
            {String(i + 1).padStart(2, '0')}
          </span>
          <p className="font-satoshi text-[16px] text-ink leading-[23px]">
            <span className="font-bold">{item.title}</span> {item.body}
          </p>
        </div>
      ))}
    </div>
  );
}

export default function Reflection() {
  return (
    <Section id="reflection" eyebrow="REFLECTION" eyebrowColor="text-tfam-gray" title="What I learned, and what comes next">
      <div className="flex flex-col gap-12">
        <div>
          <p className="font-satoshi font-bold text-[20px] text-ink mb-6">What I learned</p>
          <NumberedList items={LEARNED} />
        </div>
        <div>
          <p className="font-satoshi font-bold text-[20px] text-ink mb-6">What&apos;s next</p>
          <NumberedList items={NEXT} />
        </div>
      </div>
    </Section>
  );
}
