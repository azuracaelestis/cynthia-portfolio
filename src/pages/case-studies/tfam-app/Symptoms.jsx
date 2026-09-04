import Section from '../../../components/case-study/Section';
import existingNavDrawer from '../../../assets/case study/case-study-tfam-app/symptoms/existing-nav-drawer.jpg';
import existingExhibitionDetail from '../../../assets/case study/case-study-tfam-app/symptoms/existing-exhibition-detail.jpg';

const PROBLEMS = [
  {
    title: 'Audio guide hard to start',
    body: "The app's whole reason to exist, yet starting it meant turning on Bluetooth or typing in a code. No clear way in.",
  },
  {
    title: 'No way to book',
    body: 'Booking a tour or class meant leaving the app for email or a phone call.',
  },
  {
    title: 'Exhibition info was incomplete',
    body: 'The app only showed exhibitions that had an audio guide. For everything else, you went to the website.',
  },
  {
    title: "Buttons don't look tappable",
    body: "The interface was so clean, visitors couldn't tell what to press.",
  },
];

const HEURISTICS = [
  {
    number: 1,
    name: 'Recognition Rather Than Recall (H6)',
    finding: 'Nav hidden inside an unlabeled logo',
    image: existingNavDrawer,
  },
  {
    number: 2,
    name: 'Aesthetic & Minimalist Design (H8)',
    finding: 'Image dominates, no supporting structure to guide the visitor',
    image: existingExhibitionDetail,
  },
  {
    number: 3,
    name: 'Visibility of System Status (H1)',
    finding: 'Unlabeled row of marks at the bottom, purpose unclear',
    image: existingExhibitionDetail,
  },
];

export default function Symptoms() {
  return (
    <Section id="symptoms" eyebrow="SYMPTOMS" title="Built to look like art, not to be used">
      <p className="font-satoshi text-[16px] text-ink leading-[23px] mb-8">
        The app was not short on features. It had plenty. But it was built to look like the museum first, so the
        features visitors needed most were either hard to reach or missing. Four problems stood out.
      </p>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {PROBLEMS.map((problem) => (
          <div
            key={problem.title}
            className="bg-white rounded-2xl shadow-[0px_0px_5px_rgba(0,0,0,0.1)] p-6 flex flex-col gap-2"
          >
            <p className="font-satoshi font-bold text-[20px] text-ink">{problem.title}</p>
            <p className="font-satoshi text-[16px] text-charcoal leading-[23px]">{problem.body}</p>
          </div>
        ))}
      </div>

      <blockquote className="mt-8 border-l-[3px] border-case-study-blue pl-6 font-satoshi italic text-[18px] text-ink leading-[27px]">
        &ldquo;A curator&apos;s vanity project, not a useful app for the public.&rdquo;
        <footer className="mt-2 font-satoshi not-italic text-[14px] text-charcoal">
          — TFAM app review, App Store
        </footer>
      </blockquote>

      <div className="mt-12">
        <p className="font-satoshi font-bold text-[20px] text-ink mb-4">Heuristic Evaluation</p>
        <p className="font-satoshi text-[16px] text-ink leading-[23px] mb-8">
          Reviews told me people were frustrated. To find out exactly why, I ran a heuristic evaluation to turn the
          vague complaints into specific, nameable problems I could design against.
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {HEURISTICS.map((h) => (
            <div key={h.number} className="flex flex-col gap-4">
              <img src={h.image} alt="" className="w-full h-auto rounded-2xl shadow-[0px_0px_5px_rgba(0,0,0,0.1)]" />
              <div>
                <span className="font-satoshi font-bold text-[14px] text-case-study-blue">{h.number}</span>
                <p className="font-satoshi font-bold text-[16px] text-ink mt-1">{h.name}</p>
                <p className="font-satoshi text-[16px] text-charcoal leading-[23px] mt-1">{h.finding}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}
