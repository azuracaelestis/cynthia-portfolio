import { useEffect, useRef, useState } from 'react';
import { motion, useInView, useReducedMotion } from 'framer-motion';
import Section from '../../../components/case-study/Section';
import ImagePlaceholder from '../../../components/case-study/ImagePlaceholder';
import tfamSplashTest from '../../../assets/case study/case-study-tfam-app/testing/tfam-splash-test.mp4';
import tfamSplashScreenV2 from '../../../assets/case study/case-study-tfam-app/testing/tfam-splash-screen-v2-3.mp4';
import tfamSplashTestV1 from '../../../assets/case study/case-study-tfam-app/testing/tfam-splash-test-v1.jpg';
import tfamAudioGuideExisting from '../../../assets/case study/case-study-tfam-app/testing/tfam-audio-guide-existing-app.jpg';
import tfamAudioGuideV1 from '../../../assets/case study/case-study-tfam-app/testing/tfam-audio-guide-v1.jpg';
import tfamAudioGuideV2 from '../../../assets/case study/case-study-tfam-app/testing/tfam-audio-guide-v2.jpg';
import accessibilityMockup from '../../../assets/case study/case-study-tfam-app/testing/accessibility_mockup.mp4';

// Shared scroll-reveal recipe (matches Section.jsx / Diagnosis / Symptoms /
// Solutions — one fade+rise system across the whole page).
const revealVariants = { hidden: { opacity: 0, y: 8 }, visible: { opacity: 1, y: 0 } };
const revealVariantsReduced = { hidden: { opacity: 0 }, visible: { opacity: 1 } };
const revealTransition = { duration: 0.4, ease: [0, 0, 0.2, 1] };
const revealTransitionReduced = { duration: 0 };
const revealViewport = { once: true, margin: '0px 0px -20% 0px' };
const IMAGE_STAGGER = 0.08;

// Per Figma (node 258:1370 vs 258:1412): the 3-image row uses a tighter
// ~24px gap than the 2-image row's 32px. Both use a flex row (not a
// stretching grid) so a 2-image row's placeholders stay the same size as
// a 3-image row's, instead of stretching wider to fill the row.
const IMAGE_ROW_GAP_BY_COUNT = {
  2: 'gap-8',
  3: 'gap-6',
};

const FINDINGS = [
  {
    title: 'The arrival screen lost its context',
    observed:
      "One visitor wasn't sure what app she was even looking at. The arrival screen showed only a small logo mark, with no museum name and nothing that felt like TFAM. In making it simple, I had stripped out the brand.",
    images: [
      { label: 'Existing App', video: tfamSplashTest, videoScale: 'scale-[1.15]' },
      { label: 'Version 1', image: tfamSplashTestV1, enlarge: true },
      { label: 'Version 2', video: tfamSplashScreenV2, videoScale: 'scale-[1.15]' },
    ],
    changed:
      "Two moves. I built a splash screen from scratch to hold the museum's brand and a contemporary feel, something I had skipped in version one to stay simple, but that was a mistake. Giving the brand its own home on the splash let the working screens stay clean. Then on the arrival screen I added a clear Welcome to Taipei Fine Arts Museum, so the app tells you where you are the moment it opens.",
  },
  {
    title: 'Designed for two hands, used with one',
    observed:
      'Visitors found it hard to type a code to start the audio guide. This is a situational disability, not a preference. In a museum full of families, many people have only one free hand, holding a child or a bag, and typing a number needs two hands and full attention.',
    images: [
      { label: 'Existing App', image: tfamAudioGuideExisting, enlarge: true },
      { label: 'Version 1', image: tfamAudioGuideV1, enlarge: true },
      { label: 'Version 2', image: tfamAudioGuideV2, enlarge: true },
    ],
    changed:
      "I made scanning a QR code the first option, since it takes one tap, and kept typing the code as a backup for anyone who prefers it. This also closes the loop on the old app's biggest problem, the audio guide that was too hard to start.",
  },
  {
    title: 'You could swipe, but not everyone can',
    observed:
      'The card sliders used a peeking card and dots to show they could be swiped. That signals it well, but swiping is still a gesture, and a gesture needs finger reach and flexibility. For a visitor using one thumb, knowing you can swipe doesn’t help if the swipe itself is hard to do.',
    images: [{ label: 'Version 1' }, { label: 'Version 2', video: accessibilityMockup, videoScale: 'scale-[1.08]' }],
    changed:
      "I added an arrow as a one-tap way to move between cards, so no drag is needed. Where a peeking card already hints there's more (What's On and Activities), the arrow appears only when someone starts to drag, keeping the screen clean. Where there's just a row of dots (the full exhibition slider), the arrow stays visible, since without it people didn't realise the slider could move at all.",
  },
];

function PlayIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
      <path d="M6 4.5v11l9-5.5-9-5.5z" />
    </svg>
  );
}

function PauseIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
      <rect x="5" y="4" width="3.5" height="12" rx="1" />
      <rect x="11.5" y="4" width="3.5" height="12" rx="1" />
    </svg>
  );
}

// Same circular play/pause treatment as Solutions.jsx's MockupVideo — no
// native controls, plays once scrolled into view, then loops. Simpler than
// Solutions' version since each Testing video is independent (no handoff to
// a sibling video once it finishes).
function FindingVideo({ src, className = '', videoScale = '' }) {
  const wrapperRef = useRef(null);
  const videoRef = useRef(null);
  const isInView = useInView(wrapperRef, { once: true, margin: '0px 0px -20% 0px' });
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    if (isInView) videoRef.current?.play().catch(() => {});
  }, [isInView]);

  function togglePlay() {
    const el = videoRef.current;
    if (!el) return;
    if (el.paused) el.play().catch(() => {});
    else el.pause();
  }

  return (
    <div ref={wrapperRef} className={`relative w-full overflow-hidden rounded-2xl ${className}`}>
      <video
        ref={videoRef}
        src={src}
        className={`w-full h-full object-cover rounded-2xl ${videoScale}`}
        loop
        muted
        playsInline
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
      />
      <button
        type="button"
        onClick={togglePlay}
        aria-label={isPlaying ? 'Pause video' : 'Play video'}
        className="absolute left-3 bottom-3 w-8 h-8 rounded-full bg-ink/60 backdrop-blur-sm ring-2 ring-white/70 flex items-center justify-center text-white opacity-30 hover:opacity-100 transition-[opacity,transform] hover:scale-105"
      >
        {isPlaying ? <PauseIcon /> : <PlayIcon />}
      </button>
    </div>
  );
}

// Static-image counterpart to FindingVideo — same clipped box, plus an
// `enlarge` option that renders at exactly the same size as the videos'
// `scale-[1.15]` (115% box, object-cover, center-cropped back to the box).
//
// Sized with explicit width/height rather than a `transform: scale`, so the
// browser rasterizes at the true final size instead of stretching an
// already-rasterized layer (a transform zoom visibly softened static images;
// video hides it by re-rendering every frame). Both are load-bearing and
// non-obvious:
//   - `w-`/`h-` must be explicit. Tailwind's preflight sets `img { height:
//     auto; max-width: 100% }`, and an absolutely positioned REPLACED element
//     with `height: auto` uses its INTRINSIC height instead of stretching to
//     its inset box — so `inset-[-7.5%]` alone left the image at ~56% of the
//     box height, which is what made it render far smaller than the videos.
//   - offsets use `left`/`top`, not margins. Percentage MARGINS always
//     resolve against the container's WIDTH (even top/bottom), which
//     under-shifted this non-square 221:396 box vertically; `left`/`top` on a
//     positioned element resolve per-axis correctly.
function FindingImage({ src, alt, className = '', enlarge = false }) {
  return (
    <div className={`relative w-full overflow-hidden rounded-2xl ${className}`}>
      <img
        src={src}
        alt={alt}
        className={`absolute max-w-none object-cover rounded-2xl ${
          enlarge ? 'left-[-7.5%] top-[-7.5%] w-[115%] h-[115%]' : 'inset-0 w-full h-full'
        }`}
      />
    </div>
  );
}

export default function Testing() {
  const reduceMotion = useReducedMotion();
  return (
    <Section
      id="testing"
      eyebrow="TESTING"
      eyebrowColor="text-tfam-gray"
      eyebrowClassName="mb-6"
      title="It worked, but it wasn't finished."
      titleClassName="mb-3"
    >
      <p className="font-satoshi text-[16px] text-ink leading-[25px] mb-[90px]">
        I built the first version as a full, working prototype and tested it with five visitors across the range
        TFAM serves, ages 25 to 58. All five finished the four core tasks, start the audio guide, find a gallery on
        the map, book a class, and check what&apos;s on, so the structure held. But passing the tasks only proved the
        app worked, not that it was finished. In fixing an app that was too pretty to use, I had overcorrected into
        one that was too plain to feel like a museum. The test showed me a good app has to do three things at once:
        be usable, feel like the brand, and be open to everyone. These are the problems that surfaced.
      </p>

      <div className="flex flex-col gap-[90px]">
        {FINDINGS.map((finding, i) => (
          <div key={finding.title} className="flex flex-col gap-8">
            <p className="font-satoshi font-bold text-[20px] text-ink">
              Finding {i + 1}: {finding.title}
            </p>
            <div className="flex flex-col gap-[48px]">
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={revealViewport}
                variants={reduceMotion ? revealVariantsReduced : revealVariants}
                transition={reduceMotion ? revealTransitionReduced : revealTransition}
                className="flex flex-col gap-2"
              >
                <p className="font-satoshi font-bold text-[16px] text-ink">Observed</p>
                <p className="font-satoshi text-[16px] text-ink leading-[25px]">{finding.observed}</p>
              </motion.div>
              <div className={`flex flex-wrap justify-center ${IMAGE_ROW_GAP_BY_COUNT[finding.images.length]}`}>
                {finding.images.map((image, i) => (
                  <motion.div
                    key={image.label}
                    initial="hidden"
                    whileInView="visible"
                    viewport={revealViewport}
                    variants={reduceMotion ? revealVariantsReduced : revealVariants}
                    transition={{ ...(reduceMotion ? revealTransitionReduced : revealTransition), delay: reduceMotion ? 0 : i * IMAGE_STAGGER }}
                    className="flex flex-col items-center gap-2 w-full max-w-[221px] sm:w-[221px]"
                  >
                    <p className="font-satoshi font-bold text-[14px] text-ink">{image.label}</p>
                    {image.video ? (
                      <FindingVideo src={image.video} className="aspect-[221/396]" videoScale={image.videoScale} />
                    ) : image.image ? (
                      <FindingImage
                        src={image.image}
                        alt={`${image.label} of the arrival screen`}
                        className="aspect-[221/396]"
                        enlarge={image.enlarge}
                      />
                    ) : (
                      <ImagePlaceholder label="" className="w-full aspect-[221/396]" />
                    )}
                  </motion.div>
                ))}
              </div>
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={revealViewport}
                variants={reduceMotion ? revealVariantsReduced : revealVariants}
                transition={reduceMotion ? revealTransitionReduced : revealTransition}
                className="flex flex-col gap-2"
              >
                <p className="font-satoshi font-bold text-[16px] text-ink">Changed</p>
                <p className="font-satoshi text-[16px] text-ink leading-[25px]">{finding.changed}</p>
              </motion.div>
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
}
