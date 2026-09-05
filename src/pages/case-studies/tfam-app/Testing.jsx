import Section from '../../../components/case-study/Section';
import ImagePlaceholder from '../../../components/case-study/ImagePlaceholder';

const GRID_COLS_BY_COUNT = {
  2: 'grid-cols-1 sm:grid-cols-2',
  3: 'grid-cols-1 sm:grid-cols-3',
};

const FINDINGS = [
  {
    title: 'The arrival screen lost its context',
    observed:
      "One visitor wasn't sure what app she was even looking at. The arrival screen showed only a small logo mark, with no museum name and nothing that felt like TFAM. In making it simple, I had stripped out the brand.",
    images: ['Existing', 'Version 1', 'Version 2'],
    changed:
      "Two moves. I built a splash screen from scratch to hold the museum's brand and a contemporary feel, something I had skipped in version one to stay simple, but that was a mistake. Giving the brand its own home on the splash let the working screens stay clean. Then on the arrival screen I added a clear Welcome to Taipei Fine Arts Museum, so the app tells you where you are the moment it opens.",
  },
  {
    title: 'Designed for two hands, used with one',
    observed:
      'Visitors found it hard to type a code to start the audio guide. This is a situational disability, not a preference. In a museum full of families, many people have only one free hand, holding a child or a bag, and typing a number needs two hands and full attention.',
    images: ['Existing App', 'Version 1', 'Version 2'],
    changed:
      "I made scanning a QR code the first option, since it takes one tap, and kept typing the code as a backup for anyone who prefers it. This also closes the loop on the old app's biggest problem, the audio guide that was too hard to start.",
  },
  {
    title: 'You could swipe, but not everyone can',
    observed:
      'The card sliders used a peeking card and dots to show they could be swiped. That signals it well, but swiping is still a gesture, and a gesture needs finger reach and flexibility. For a visitor using one thumb, knowing you can swipe doesn’t help if the swipe itself is hard to do.',
    images: ['Version 1', 'Version 2'],
    changed:
      "I added an arrow as a one-tap way to move between cards, so no drag is needed. Where a peeking card already hints there's more (What's On and Activities), the arrow appears only when someone starts to drag, keeping the screen clean. Where there's just a row of dots (the full exhibition slider), the arrow stays visible, since without it people didn't realise the slider could move at all.",
  },
];

export default function Testing() {
  return (
    <Section id="testing" eyebrow="TESTING" eyebrowColor="text-tfam-gray" title="It worked, but it wasn't finished.">
      <p className="font-satoshi text-[16px] text-ink leading-[23px] mb-4">
        I built the first version as a full, working prototype and tested it with five visitors across the range
        TFAM serves, ages 25 to 58. All five finished the four core tasks, start the audio guide, find a gallery on
        the map, book a class, and check what&apos;s on, so the structure held. But passing the tasks only proved the
        app worked, not that it was finished.
      </p>
      <p className="font-satoshi text-[16px] text-ink leading-[23px] mb-12">
        In fixing an app that was too pretty to use, I had overcorrected into one that was too plain to feel like a
        museum. The test showed me a good app has to do three things at once: be usable, feel like the brand, and be
        open to everyone. These are the problems that surfaced.
      </p>

      <div className="flex flex-col gap-12">
        {FINDINGS.map((finding, i) => (
          <div key={finding.title}>
            <p className="font-satoshi font-bold text-[20px] text-ink mb-4">
              Finding {i + 1}: {finding.title}
            </p>
            <div className="mb-4">
              <p className="font-satoshi font-bold text-[14px] text-case-study-blue mb-1">Observed</p>
              <p className="font-satoshi text-[16px] text-charcoal leading-[23px]">{finding.observed}</p>
            </div>
            <div className={`grid ${GRID_COLS_BY_COUNT[finding.images.length]} gap-4 mb-4`}>
              {finding.images.map((label) => (
                <ImagePlaceholder key={label} label={label} className="h-56" />
              ))}
            </div>
            <div>
              <p className="font-satoshi font-bold text-[14px] text-case-study-blue mb-1">Changed</p>
              <p className="font-satoshi text-[16px] text-charcoal leading-[23px]">{finding.changed}</p>
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
}
