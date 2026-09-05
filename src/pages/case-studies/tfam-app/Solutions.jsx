import Section from '../../../components/case-study/Section';
import ImagePlaceholder from '../../../components/case-study/ImagePlaceholder';

// IA tree, per Figma (node 258:1227): a root pill fanning out to 5 tabs,
// each tab a vertical chain of screens.
const IA_TABS = [
  { name: 'Home', screens: ['Arrival Screen', 'Audio Guide'] },
  { name: "What's On", screens: ['Exhibition List', 'Exhibition Detail', 'Getting There'] },
  { name: 'Map', screens: ['Floor Map', 'Suggested Route', 'Exhibition Detail'] },
  {
    name: 'Activities',
    screens: ['Activities List', 'Date/Time Picker', 'Slot Picker', 'Confirm Screen', 'Booking Confirm'],
  },
  { name: 'Settings', screens: ['Notification', 'Interest Picker', 'Notification Toggle'] },
];

function DownArrow() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true" className="shrink-0 text-ink/30">
      <path d="M8 2v10.5M3.5 9 8 13.5 12.5 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function IaDiagram() {
  return (
    <div className="mb-12">
      {/* Root pill + fan-out connector. The connector is a simplified,
          edge-to-edge version of Figma's center-to-center bar — close enough
          to read as the same tree, much simpler than tracing exact vector
          paths. */}
      <div className="hidden lg:flex flex-col items-center">
        <span className="bg-ink text-white font-satoshi font-bold text-[16px] rounded-full px-5 py-[10px]">
          TFAM App
        </span>
        <div className="w-px h-6 bg-ink/20" />
        <div className="w-full border-t border-ink/20">
          <div className="grid grid-cols-5">
            {IA_TABS.map((tab) => (
              <div key={tab.name} className="flex justify-center">
                <div className="w-px h-6 bg-ink/20" />
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 lg:gap-3">
        {IA_TABS.map((tab) => (
          <div key={tab.name} className="flex flex-col items-center gap-2">
            <div className="w-full bg-tfam-chip border border-tfam-chip rounded-2xl p-4 lg:p-6 text-center">
              <p className="font-satoshi font-bold text-[14px] text-ink">{tab.name}</p>
            </div>
            {tab.screens.map((screen) => (
              <div key={screen} className="w-full flex flex-col items-center gap-2">
                <DownArrow />
                <div className="w-full bg-tfam-screen border border-tfam-chip rounded-2xl px-3 py-4 lg:py-6 text-center">
                  <p className="font-satoshi font-bold text-[14px] text-ink">{screen}</p>
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

// Per Figma (nodes 258:1301 / 258:1315): each moment is its own heading, then
// one or more rows of 2 features, each row a pair of 317x396 screenshot
// placeholders above the matching pair of title/body text. Wander's
// "Notification" feature repeats the Audio Guide's body text verbatim in
// Figma itself — not a PDF-extraction artifact, kept as-is, flagged below.
const MOMENTS = [
  {
    title: 'Plan (Before the Visit)',
    rows: [
      [
        {
          title: "What's On",
          body: 'Current and upcoming exhibitions in one place, so visitors stop hunting across social media, the website, and the front desk.',
        },
        {
          title: 'Pre-Book Activities',
          body: 'Reserve in a few taps, right in the app, instead of an email or a phone call. Target: 80%+ of people finish it in under 45 seconds.',
        },
      ],
    ],
  },
  {
    title: 'Wander (During the Visit)',
    rows: [
      [
        {
          title: 'Audio Guide',
          body: 'The app opens on a clear "Start audio guide" button. No digging through menus. Target: a 25% lift in audio guide use.',
        },
        {
          title: 'Floor Map & Suggested Route',
          body: 'Works without a connection, so first-timers can find their way without relying on staff or signage.',
        },
      ],
      [
        {
          title: 'Notification',
          body: 'The app opens on a clear "Start audio guide" button. No digging through menus. Target: a 25% lift in audio guide use.',
        },
        {
          title: 'Language',
          body: 'The whole app works in English as well as Mandarin. The audio codes on the placards now map to something a tourist can actually read and start.',
        },
      ],
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
    <Section id="solutions" eyebrow="SOLUTION" eyebrowColor="text-tfam-gray" title="One companion, three moments of the visit">
      <p className="font-satoshi font-bold text-[20px] text-ink mb-4">From three moments to a five-tab app</p>
      <p className="font-satoshi text-[16px] text-ink leading-[23px] mb-8">
        The three moments became five tabs: Home, What&apos;s On, Map, Classes, and Settings. Every feature that was
        buried in the old app now sits in the tab where a visitor would go looking for it. The audio guide, the old
        app&apos;s weakest point, is now reachable from Home, What&apos;s On, and the Map, so it&apos;s never more
        than one tap away.
      </p>

      <IaDiagram />

      <div className="flex flex-col gap-[87px] mb-12">
        {MOMENTS.map((m) => (
          <div key={m.title} className="flex flex-col gap-[42px]">
            <p className="font-satoshi font-bold text-[20px] text-ink">{m.title}</p>
            {m.rows.map((row, rowIndex) => (
              <div key={rowIndex} className="flex flex-col gap-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-[52px]">
                  {row.map((f) => (
                    <ImagePlaceholder key={f.title} label="Screenshot" className="w-full aspect-[317/396]" />
                  ))}
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-[52px]">
                  {row.map((f) => (
                    <div key={f.title} className="flex flex-col gap-4">
                      <p className="font-satoshi font-bold text-[16px] text-ink">{f.title}</p>
                      <p className="font-satoshi text-[16px] text-ink leading-[25px]">{f.body}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        ))}

        <div>
          <p className="font-satoshi font-bold text-[20px] text-ink mb-[21px]">Remember (After the Visit)</p>
          <p className="font-satoshi text-[16px] text-ink leading-[25px]">
            Save the pieces you loved during the visit. This was the lowest-friction moment of the three, so it was
            the right one to cut from this build while booking and wayfinding came first.
          </p>
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
