import Section from '../../../components/case-study/Section';
import ImagePlaceholder from '../../../components/case-study/ImagePlaceholder';

const MOMENTS = [
  {
    moment: 'Plan',
    subtitle: 'Before the Visit',
    features: [
      {
        title: "What's On",
        body: 'Current and upcoming exhibitions in one place, so visitors stop hunting across social media, the website, and the front desk.',
      },
      {
        title: 'Pre-Book Activities',
        body: 'Reserve in a few taps, right in the app, instead of an email or a phone call. Target: 80%+ of people finish it in under 45 seconds.',
      },
    ],
  },
  {
    moment: 'Wander',
    subtitle: 'During the Visit',
    features: [
      {
        title: 'Audio Guide',
        body: 'The app opens on a clear Start audio guide button. No digging through menus. Target: a 25% lift in audio guide use.',
      },
      {
        title: 'Floor Map & Suggested Route',
        body: 'Works without a connection, so first-timers can find their way without relying on staff or signage.',
      },
      {
        title: 'Language',
        body: 'The whole app works in English as well as Mandarin. The audio codes on the placards now map to something a tourist can actually read and start.',
      },
    ],
  },
];

const STATS = [
  { value: '+25%', label: 'Feature discovery', body: 'Aimed lift in audio guide use, by surfacing it on arrival.' },
  { value: '80%', label: 'Self service booking', body: 'Booking completion in-app, replacing email and phone in under 45 sec.' },
  { value: '4/5', label: 'Visitor confidence', body: 'Target confidence score in post-visit surveys.' },
];

export default function Solutions() {
  return (
    <Section id="solutions" eyebrow="SOLUTION" title="One companion, three moments of the visit">
      <p className="font-satoshi font-bold text-[20px] text-ink mb-4">From three moments to a five-tab app</p>
      <p className="font-satoshi text-[16px] text-ink leading-[23px] mb-8">
        The three moments became five tabs: Home, What&apos;s On, Map, Classes, and Settings. Every feature that was
        buried in the old app now sits in the tab where a visitor would go looking for it. The audio guide, the old
        app&apos;s weakest point, is now reachable from Home, What&apos;s On, and the Map, so it&apos;s never more
        than one tap away.
      </p>

      <ImagePlaceholder
        label="IA diagram — TFAM App: Home / What's On / Map / Activities / Settings"
        className="h-64 lg:h-96 mb-12"
      />

      <div className="flex flex-col gap-8 mb-12">
        {MOMENTS.map((m) => (
          <div key={m.moment}>
            <p className="font-satoshi font-bold text-[20px] text-ink">{m.moment}</p>
            <p className="font-satoshi text-[14px] text-case-study-blue mb-4">{m.subtitle}</p>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {m.features.map((f) => (
                <div key={f.title} className="bg-white rounded-2xl shadow-[0px_0px_5px_rgba(0,0,0,0.1)] p-6">
                  <p className="font-satoshi font-bold text-[16px] text-ink">{f.title}</p>
                  <p className="font-satoshi text-[16px] text-charcoal leading-[23px] mt-1">{f.body}</p>
                </div>
              ))}
            </div>
          </div>
        ))}

        <div>
          <p className="font-satoshi font-bold text-[20px] text-ink">Remember</p>
          <p className="font-satoshi text-[14px] text-case-study-blue mb-4">After the Visit</p>
          <div className="bg-white rounded-2xl shadow-[0px_0px_5px_rgba(0,0,0,0.1)] p-6">
            <p className="font-satoshi text-[16px] text-charcoal leading-[23px]">
              Save the pieces you loved during the visit. This was the lowest-friction moment of the three, so it
              was the right one to cut from this build while booking and wayfinding came first.
            </p>
          </div>
        </div>
      </div>

      <div className="bg-ink/5 rounded-2xl px-6 py-5 mb-8">
        <p className="font-satoshi font-bold text-[14px] text-ink mb-2">Note on the numbers below</p>
        <p className="font-satoshi text-[14px] text-charcoal leading-[21px]">
          This is a self-initiated passion project, so these are design targets I&apos;d measure against, not results
          from real usage. I&apos;m labelling them that way on purpose. Validating them against real visitor data is
          the natural next step once the museum&apos;s booking system exists.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-12">
        {STATS.map((s) => (
          <div key={s.label} className="bg-white rounded-2xl shadow-[0px_0px_5px_rgba(0,0,0,0.1)] p-6 text-center">
            <p className="font-satoshi font-extrabold text-[40px] text-case-study-blue leading-tight">{s.value}</p>
            <p className="font-satoshi font-bold text-[16px] text-ink mt-1">{s.label}</p>
            <p className="font-satoshi text-[14px] text-charcoal leading-[21px] mt-2">{s.body}</p>
          </div>
        ))}
      </div>

      <div className="bg-ink rounded-2xl p-8 flex flex-col items-start gap-4">
        <p className="font-satoshi font-bold text-[20px] text-white">Try it yourself</p>
        <p className="font-satoshi text-[16px] text-white/70 leading-[23px]">
          This is a real, working prototype. Walk through the arrival screen, start the audio guide, and book a
          class, just like a visitor would.
        </p>
        <span
          aria-disabled="true"
          className="inline-flex items-center rounded-full bg-white/10 text-white/40 font-satoshi font-semibold text-[16px] px-6 py-3 cursor-not-allowed"
        >
          Launch the Prototype
        </span>
      </div>
    </Section>
  );
}
