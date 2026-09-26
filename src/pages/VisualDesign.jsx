import { useRef } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion, useReducedMotion } from 'framer-motion';
import { useMediaQuery } from '../hooks/useMediaQuery';
import { useEyeTracking } from '../hooks/useEyeTracking';
import HeroCharacterArt from '../components/visual/HeroCharacterArt';
import paletteCard from '../assets/visual/palette-card.svg';
import heroFlowerYellow from '../assets/visual/hero-flower-yellow.svg';
import heroPictureCard from '../assets/visual/hero-picture-card.svg';
import heroFlowerBlue from '../assets/visual/hero-flower-blue.svg';
import folder from '../assets/visual/folder.svg';

// Desktop layout, built from the Figma frame "Cynthia - Portfolio Visual"
// (1440 wide; node 360:390). The hero is a fixed-aspect stage so the
// illustration cluster keeps its proportions as the viewport scales: every
// position below is the Figma x/y/width expressed as a percentage of the
// 1440 x 618 stage. The site's own nav and footer are used as-is (the frame's
// nav/footer are just placeholders for them).
const STAGE_W = 1440;
const STAGE_H = 618;
const place = (x, y, w) => ({
  left: `${(x / STAGE_W) * 100}%`,
  top: `${(y / STAGE_H) * 100}%`,
  width: `${(w / STAGE_W) * 100}%`,
});

// The elements around the character appear one by one, then float. Each has
// its own float distance/tilt/period so they drift out of sync — obvious
// enough to notice, gentle enough not to distract. `delay` is the entrance
// start (seconds); the float begins once the entrance has landed.
const FLOATERS = [
  { name: 'picture-card', src: heroPictureCard, pos: place(668.94, 201, 169), delay: 0.4, rise: 12, tilt: 1.5, period: 4.6, z: 'z-20' },
  { name: 'palette-card', src: paletteCard, pos: place(1138.38, 172, 123.21), delay: 0.7, rise: 10, tilt: -1.5, period: 5.2, z: '' },
  { name: 'yellow-flower', src: heroFlowerYellow, pos: place(615, 475, 83), delay: 1.0, rise: 11, tilt: 4, period: 4.2, z: '' },
  { name: 'blue-flower', src: heroFlowerBlue, pos: place(1247, 339, 91), delay: 1.3, rise: 9, tilt: -4, period: 4.9, z: '' },
];

const ENTRANCE_DURATION = 0.7;

function Floater({ src, pos, delay, rise, tilt, period, z }) {
  const reduceMotion = useReducedMotion();
  // Reduced motion: shown in place, no entrance and no float.
  if (reduceMotion) {
    return <img src={src} alt="" aria-hidden="true" className={`absolute block max-w-none ${z}`} style={pos} />;
  }
  return (
    <motion.div
      aria-hidden="true"
      className={`absolute ${z}`}
      style={pos}
      initial={{ opacity: 0, scale: 0.6, y: 24 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: ENTRANCE_DURATION, delay, ease: [0.34, 1.56, 0.64, 1] }}
    >
      <motion.img
        src={src}
        alt=""
        className="block w-full max-w-none"
        animate={{ y: [0, -rise, 0], rotate: [0, tilt, 0] }}
        transition={{ duration: period, delay: delay + ENTRANCE_DURATION, repeat: Infinity, ease: 'easeInOut' }}
      />
    </motion.div>
  );
}

// Captions are placeholders except Bett's — they only exist so the hover
// reveal can be judged; replace with real copy per project.
const PLACEHOLDER_CAPTION = 'Project description goes here.';
const PROJECTS = [
  { title: 'Bett 2024', caption: 'Promotional campaign and motion storytelling for ViewSonic at BETT.' },
  { title: 'IFP53' },
  {},
  {},
  {},
  {},
];

// The three loose sheets fanned behind each folder (placeholders for the
// project's files). x/y/w/h are the sheets' rotated bounding boxes inside the
// 358 x 272 group (from the frame's layer bounds); the sheet itself is
// 284 x 223 and rotates inside its box. `hover` is where each sheet fans out
// to when the folder is hovered: up and apart, tilting further.
const SHEETS = [
  { x: 0, y: 27.43, w: 292, h: 233.28, rotate: -2.1, hover: { x: -34, y: -46, rotate: -9 } },
  { x: 28.27, y: 8, w: 291.12, h: 232.14, rotate: 1.87, hover: { x: 2, y: -62, rotate: 1 } },
  { x: 75.71, y: 0, w: 308.66, h: 255.41, rotate: 6.88, hover: { x: 40, y: -42, rotate: 12 } },
];

// Folders render at 80% of the Figma size (357.66 x 272): the outer box takes
// the scaled footprint, the inner group keeps the frame's native coordinates.
const FOLDER_SCALE = 0.8;

const EASE = [0.22, 1, 0.36, 1];

// On hover the folder settles down and shrinks slightly, the sheets fan out
// above it, and the caption fades in below. Without a hover-capable pointer
// (touch) there is nothing to trigger it, so the caption just stays visible;
// with reduced motion the same end states apply instantly.
function FolderCard({ title, caption = PLACEHOLDER_CAPTION }) {
  const reduceMotion = useReducedMotion();
  const canHover = useMediaQuery('(hover: hover)');
  const t = (duration, delay = 0) => ({ duration: reduceMotion ? 0 : duration, delay: reduceMotion ? 0 : delay, ease: EASE });

  return (
    <motion.div
      initial="rest"
      whileHover="hover"
      className="flex flex-col items-center gap-8"
    >
      <div style={{ width: 357.66 * FOLDER_SCALE, height: 272 * FOLDER_SCALE }}>
        <div className="relative h-[272px] w-[357.66px] origin-top-left" style={{ transform: `scale(${FOLDER_SCALE})` }}>
          {SHEETS.map((sheet, i) => (
            <motion.div
              key={sheet.x}
              aria-hidden="true"
              className="absolute flex items-center justify-center"
              style={{ left: sheet.x, top: sheet.y, width: sheet.w, height: sheet.h }}
              variants={{
                rest: { x: 0, y: 0, transition: t(0.45) },
                hover: { x: sheet.hover.x, y: sheet.hover.y, transition: t(0.5, i * 0.03) },
              }}
            >
              <motion.div
                className="h-[223px] w-[284px] rounded-[15px] bg-white shadow-[0px_0px_6px_2px_rgba(0,0,0,0.05)]"
                variants={{
                  rest: { rotate: sheet.rotate, transition: t(0.45) },
                  hover: { rotate: sheet.hover.rotate, transition: t(0.5, i * 0.03) },
                }}
              />
            </motion.div>
          ))}
          <motion.div
            className="absolute left-[21px] top-[33px] h-[239px] w-[316px] origin-bottom"
            variants={{
              rest: { y: 0, scale: 1, rotate: 0, transition: t(0.45) },
              hover: { y: 26, scale: 0.8, rotate: -2, transition: t(0.5) },
            }}
          >
            <img src={folder} alt="" className="absolute inset-0 block size-full max-w-none" />
            {title && (
              <p className="absolute inset-x-0 top-[60.67%] text-center font-satoshi font-bold text-[36px] leading-[75px] text-black">
                {title}
              </p>
            )}
          </motion.div>
        </div>
      </div>
      {/* Reserved so every row keeps the same rhythm; stays in the DOM (and
          readable to assistive tech and crawlers) while hidden at rest. */}
      <motion.p
        className="h-12 w-[328px] text-center font-satoshi text-[16px] leading-6 text-black"
        variants={{
          rest: { opacity: canHover ? 0 : 1, y: canHover ? 8 : 0, transition: t(0.25) },
          hover: { opacity: 1, y: 0, transition: t(0.35, 0.12) },
        }}
      >
        {caption}
      </motion.p>
    </motion.div>
  );
}

// Eyes sit at about (66%, 26%) of the illustration; the head nods (rotates
// about the neck) with the cursor's vertical position, up to 5 degrees.
const EYE_ANCHOR = { x: 0.66, y: 0.26 };
const EYE_LIMITS = { minX: -4, maxX: 0, minY: -1.5, maxY: 3 };

export default function VisualDesign() {
  const reduceMotion = useReducedMotion();
  const characterRef = useRef(null);
  const { offset, tiltDeg } = useEyeTracking(characterRef, {
    enabled: !reduceMotion,
    anchor: EYE_ANCHOR,
    tiltAxis: 'y',
    // Her pupils already sit against the right edge of each eye white (she
    // looks right), and the whites are small, so they can only travel left
    // and slightly up/down before leaving the eye.
    offsetLimits: EYE_LIMITS,
    maxTiltDeg: 5,
    degPerCursorPx: 0.012,
  });

  return (
    <>
      <Helmet>
        <title>Visual Design — Cynthia Tanawi</title>
        <link rel="canonical" href="https://cynthiatanawi.design/visual-design" />
        <meta
          name="description"
          content="Selected brand, campaign, and communication design from across Cynthia Tanawi's practice."
        />
      </Helmet>

      <div className="bg-white">
        {/* 90px from the nav's bottom edge (88px) to the illustration's top
            (154px in the frame): the frame leaves 66, so 24px is added. */}
        <div className="pt-6">
        <section className="relative mx-auto w-full max-w-[1440px]" style={{ aspectRatio: `${STAGE_W} / ${STAGE_H}` }}>
          <h1
            className="absolute font-satoshi font-bold text-black text-[clamp(44px,4.444vw,64px)] leading-[1.17]"
            style={{ left: `${(100 / STAGE_W) * 100}%`, top: `${(242 / STAGE_H) * 100}%` }}
          >
            Selected
            <br />
            Visual Work
          </h1>
          <p
            className="absolute font-satoshi text-black text-[clamp(16px,1.389vw,20px)] leading-[1.7]"
            style={{ left: `${(105 / STAGE_W) * 100}%`, top: `${(416 / STAGE_H) * 100}%`, width: `${(426 / STAGE_W) * 100}%` }}
          >
            Selected brand, campaign, and communication design from across my practice.
          </p>

          <div
            ref={characterRef}
            className="absolute z-10"
            style={{ ...place(663.94, 154, 565.13), '--eye-x': `${offset.x}px`, '--eye-y': `${offset.y}px`, '--head-tilt': `${tiltDeg}deg` }}
          >
            <HeroCharacterArt className="block w-full" alt="Illustration of Cynthia working at a laptop" />
          </div>
          {FLOATERS.map((item) => (
            <Floater key={item.name} {...item} />
          ))}
        </section>
        </div>

        <section className="mx-auto max-w-[1343px] rounded-[32px] bg-case-study-highlight px-[78px] pb-2 pt-[114px]">
          <div className="grid grid-cols-3 justify-items-center gap-x-[53px] gap-y-[120px]">
            {PROJECTS.map((project, i) => (
              <FolderCard key={project.title ?? `empty-${i}`} {...project} />
            ))}
          </div>
        </section>

        {/* Gap to the footer panel (Figma: 66px below the folder panel). */}
        <div className="h-[66px]" />
      </div>
    </>
  );
}
