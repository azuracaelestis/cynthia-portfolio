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
import accessibilityMockup from '../../../assets/case study/case-study-tfam-app/testing/accessibility_mockup-2.mp4';
import accessibilityMockupV1 from '../../../assets/case study/case-study-tfam-app/testing/accessibility_mockup-v1.mp4';

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
      "One visitor wasn't sure what app she was even looking at. The arrival screen showed only a small logo, no museum name, nothing that felt like TFAM. In making it simple, I had stripped out the brand.",
    images: [
      // Centered scale-[1.15]. Bottom-anchoring the zoom was tried (to
      // protect the bottom edge, since these clips have moments — their own
      // baked-in zoom/scroll — where the phone already fills nearly the
      // whole frame) but cropped the top too aggressively; centered is the
      // accepted compromise between the two edges.
      { label: 'Existing App', video: tfamSplashTest, videoScale: 'scale-[1.15]' },
      { label: 'Version 1', image: tfamSplashTestV1, enlarge: true },
      { label: 'Version 2', video: tfamSplashScreenV2, videoScale: 'scale-[1.15]' },
    ],
    version1:
      "I put the audio guide at the top of the arrival screen. That made the audio guide easy to see, but the app lost its context. People had no idea what the app was, all that was left was the TFAM logo mark in the top-left corner, which most people didn't recognize.",
    version2:
      'I built a splash screen to carry the brand, then added a clear "Welcome to Taipei Fine Arts Museum" on the arrival screen. Now the app tells you what it is and where you are the moment it opens, and the working screens still stay clean and simple.',
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
    version1:
      'Starting the audio guide meant typing a code on a keypad. It worked, but only if you had two free hands and could look at the screen the whole time. For a parent holding a child, or anyone with one hand full, that was hard to do.',
    version2:
      'I made scanning a QR code the first option, since it takes just one tap, and kept typing the code as a backup for anyone who prefers it. Now most people can start the audio guide with one hand.',
  },
  {
    title: 'You could swipe, but not everyone can',
    observed:
      'The card sliders used a peeking card and dots to show they could be swiped. That signals it well, but swiping is still a gesture, and a gesture needs finger reach and flexibility. For a visitor using one thumb, knowing you can swipe doesn’t help if the swipe itself is hard to do.',
    images: [
      // No videoScale here, unlike the other findings' videos: these two
      // clips' own aspect ratio already matches the 221:396 box almost
      // exactly, so plain object-cover leaves ~0 vertical crop room —
      // scale-[1.15] pushed 7.5% of the frame past the box's top AND
      // bottom edges, and these clips have almost no margin below the
      // phone to spare, so the bottom (tab bar / swipe UI) was getting
      // clipped.
      { label: 'Version 1', video: accessibilityMockupV1 },
      { label: 'Version 2', video: accessibilityMockup },
    ],
    version1:
      'You moved between cards by swiping. The peeking card and the dots hinted that you could, but swiping was the only way, so if the gesture was hard for you, you were stuck.',
    version2:
      "I added an arrow so you can move between cards with one tap, no swipe needed. Where a peeking card already hints there's more (What's On and Activities), the arrow shows up only when you start to drag, keeping the screen clean. Where there's just a row of dots (the full exhibition slider), the arrow stays visible, since without it people didn't realise the slider could move.",
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
            {/* Desktop: media row, then a separate text row below (Figma's
                own composition). Mobile gets its own block further down —
                pairing each image directly with its own text reads better
                than forcing the reader to scroll past 2-3 stacked images
                before reaching any text (same fix as Solutions.jsx's
                FeatureRow). */}
            <div className="hidden lg:flex lg:flex-col gap-[48px]">
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
                    className="flex flex-col items-center gap-3 w-full max-w-[221px] sm:w-[221px]"
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
              {finding.version1 && finding.version2 ? (
                <>
                  <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={revealViewport}
                    variants={reduceMotion ? revealVariantsReduced : revealVariants}
                    transition={reduceMotion ? revealTransitionReduced : revealTransition}
                    className="flex flex-col gap-2"
                  >
                    <p className="font-satoshi font-bold text-[16px] text-ink">Version 1</p>
                    <p className="font-satoshi text-[16px] text-ink leading-[25px]">{finding.version1}</p>
                  </motion.div>
                  <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={revealViewport}
                    variants={reduceMotion ? revealVariantsReduced : revealVariants}
                    transition={reduceMotion ? revealTransitionReduced : revealTransition}
                    className="flex flex-col gap-2"
                  >
                    <p className="font-satoshi font-bold text-[16px] text-ink">Version 2</p>
                    <p className="font-satoshi text-[16px] text-ink leading-[25px]">{finding.version2}</p>
                  </motion.div>
                </>
              ) : (
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
              )}
            </div>

            <div className="lg:hidden flex flex-col gap-[48px]">
              <div className="flex flex-col gap-2">
                <p className="font-satoshi font-bold text-[16px] text-ink">Observed</p>
                <p className="font-satoshi text-[16px] text-ink leading-[25px]">{finding.observed}</p>
              </div>
              <div className="flex flex-col gap-[42px]">
                {finding.images.map((image) => {
                  const text =
                    image.label === 'Version 1' ? finding.version1 : image.label === 'Version 2' ? finding.version2 : null;
                  return (
                    <div key={image.label} className="flex flex-col gap-6">
                      <div className="flex flex-col items-center gap-3">
                        <p className="font-satoshi font-bold text-[16px] text-ink">{image.label}</p>
                        {image.video ? (
                          <FindingVideo src={image.video} className="w-full max-w-[221px] aspect-[221/396]" videoScale={image.videoScale} />
                        ) : image.image ? (
                          <FindingImage
                            src={image.image}
                            alt={`${image.label} of the arrival screen`}
                            className="w-full max-w-[221px] aspect-[221/396]"
                            enlarge={image.enlarge}
                          />
                        ) : (
                          <ImagePlaceholder label="" className="w-full max-w-[221px] aspect-[221/396]" />
                        )}
                      </div>
                      {text && <p className="font-satoshi text-[16px] text-ink leading-[25px] w-full">{text}</p>}
                    </div>
                  );
                })}
                {!(finding.version1 && finding.version2) && (
                  <div className="flex flex-col gap-2">
                    <p className="font-satoshi font-bold text-[16px] text-ink">Changed</p>
                    <p className="font-satoshi text-[16px] text-ink leading-[25px]">{finding.changed}</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
}
