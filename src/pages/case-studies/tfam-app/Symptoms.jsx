import Section from '../../../components/case-study/Section';
import existingNavDrawer from '../../../assets/case study/case-study-tfam-app/symptoms/existing-nav-drawer.jpg';
import existingExhibitionDetail from '../../../assets/case study/case-study-tfam-app/symptoms/existing-exhibition-detail.jpg';
import existingAudioCodeEntry from '../../../assets/case study/case-study-tfam-app/symptoms/existing-audio-code-entry.jpg';
import existingAudioPlayer from '../../../assets/case study/case-study-tfam-app/symptoms/existing-audio-player.jpg';
import iconVolume from '../../../assets/case study/case-study-tfam-app/symptoms/icon-volume.svg';
import iconFrown from '../../../assets/case study/case-study-tfam-app/symptoms/icon-frown.svg';
import iconTag from '../../../assets/case study/case-study-tfam-app/symptoms/icon-tag.svg';
import iconThumbsDown from '../../../assets/case study/case-study-tfam-app/symptoms/icon-thumbs-down.svg';

const PROBLEMS = [
  {
    icon: iconVolume,
    title: 'Audio guide hard to start',
    body: "The app's whole reason to exist, yet starting it meant turning on Bluetooth or typing in a code. No clear way in.",
  },
  {
    icon: iconFrown,
    title: 'No way to book',
    body: 'Booking a tour or class meant leaving the app for email or a phone call.',
  },
  {
    icon: iconTag,
    title: 'Exhibition info was incomplete',
    body: 'The app only showed exhibitions that had an audio guide. For everything else, you went to the website.',
  },
  {
    icon: iconThumbsDown,
    title: "Buttons don't look tappable",
    body: "The interface was so clean, visitors couldn't tell what to press.",
  },
];

// 2x2 grid of the existing app's screens, in Figma's own order.
const SCREENS = [
  { src: existingExhibitionDetail, alt: "The existing TFAM app's exhibition detail screen" },
  { src: existingNavDrawer, alt: "The existing TFAM app's navigation drawer" },
  { src: existingAudioCodeEntry, alt: "The existing TFAM app's audio guide code entry screen" },
  { src: existingAudioPlayer, alt: "The existing TFAM app's audio guide player screen" },
];

export default function Symptoms() {
  return (
    <Section
      id="symptoms"
      eyebrow="SYMPTOMS"
      eyebrowColor="text-tfam-gray"
      eyebrowClassName="mb-4"
      title="Built to look like art, not to be used"
      titleClassName="mb-3"
    >
      <p className="font-satoshi text-[16px] text-ink leading-[25px] mb-8">
        The app was not short on features. It had plenty. But it was built to look like the museum first, so the
        features visitors needed most were either hard to reach or missing. Four problems stood out.
      </p>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-x-7 lg:gap-y-6">
        {PROBLEMS.map((problem) => (
          <div
            key={problem.title}
            className="bg-white rounded-2xl shadow-[0px_0px_5px_rgba(0,0,0,0.1)] p-5 flex flex-col gap-3"
          >
            <div className="size-[52px] overflow-clip">
              <img src={problem.icon} alt="" className="block size-full" />
            </div>
            <p className="font-satoshi font-bold text-[20px] leading-[25px] text-ink">{problem.title}</p>
            <p className="font-satoshi text-[16px] text-ink leading-[25px]">{problem.body}</p>
          </div>
        ))}
      </div>

      <p className="font-satoshi text-[16px] text-ink leading-[25px] mt-[52px]">
        These weren&apos;t just my read. For an app this polished, the public reviews were only lukewarm.
      </p>

      <blockquote className="mt-8 bg-white rounded-2xl shadow-[0px_0px_10px_rgba(0,0,0,0.1)] px-6 py-5 text-center">
        <p className="font-satoshi text-[16px] text-ink leading-[30px]">
          &ldquo;A curator&apos;s vanity project, not a useful app for the public.&rdquo;
          <br />
          <span className="font-bold">— TFAM app review, App Store</span>
        </p>
      </blockquote>

      <p className="font-satoshi font-bold text-[20px] text-ink mt-[52px] mb-6">Heuristic Evaluation</p>
      <p className="font-satoshi text-[16px] text-ink leading-[25px]">
        Reviews told me people were frustrated. To find out exactly why, I ran a heuristic evaluation to turn the
        vague complaints into specific, nameable problems I could design against.
      </p>

      {/* 2x2 grid of the existing app's screens, centered in the content
          column. Sizes, 18px column gap, 53px row gap, 16px radius and the
          0 0 10px elevation are Figma's own; the fixed 444px grid width
          matches the design at desktop and falls back to a fluid 2-up on
          mobile. */}
      <div className="mt-12 grid grid-cols-2 gap-4 lg:gap-x-[18px] lg:gap-y-[53px] lg:w-[444px] mx-auto">
        {SCREENS.map((screen) => (
          <img
            key={screen.src}
            src={screen.src}
            alt={screen.alt}
            className="w-full h-auto aspect-[213/463] object-cover rounded-2xl shadow-[0px_0px_10px_0px_rgba(0,0,0,0.1)]"
          />
        ))}
      </div>

    </Section>
  );
}
