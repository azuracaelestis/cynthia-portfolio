import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
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
import brochureCover from '../assets/visual/education-brochure/cover.jpg';
import brochureViewboard from '../assets/visual/education-brochure/spread-viewboard.jpg';
import brochureMonitors from '../assets/visual/education-brochure/spread-creative-monitors.jpg';

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

// The illustration and the elements around it form one "cluster" 723 x 470
// units wide (x from the yellow flower's left edge to the blue flower's right
// edge, y from the top of the illustration to its desk). Everything below is
// placed in those cluster units, then mapped either onto the desktop stage
// (the cluster's origin sits at 615,154 of the 1440 x 618 frame) or onto the
// mobile hero (the cluster fills a 306px-wide box, per the mobile frame).
const CLUSTER_W = 723;
const CLUSTER_H = 470;
const CLUSTER_ORIGIN = { x: 615, y: 154 };
const placeInCluster = (x, y, w) => ({
  left: `${(x / CLUSTER_W) * 100}%`,
  top: `${(y / CLUSTER_H) * 100}%`,
  width: `${(w / CLUSTER_W) * 100}%`,
});
const placeOnStage = (x, y, w) => place(CLUSTER_ORIGIN.x + x, CLUSTER_ORIGIN.y + y, w);
const ILLUSTRATION = { x: 48.94, y: 0, w: 565.13 };

// The elements around the character appear one by one, then float. Each has
// its own float distance/tilt/period so they drift out of sync — obvious
// enough to notice, gentle enough not to distract. `delay` is the entrance
// start (seconds); the float begins once the entrance has landed.
const FLOATERS = [
  { name: 'picture-card', src: heroPictureCard, at: [54.94, 22, 170], delay: 0.4, rise: 12, tilt: 1.5, period: 4.6, z: 'z-20' },
  { name: 'palette-card', src: paletteCard, at: [523.38, 18, 123.21], delay: 0.7, rise: 10, tilt: -1.5, period: 5.2, z: '' },
  { name: 'yellow-flower', src: heroFlowerYellow, at: [0, 321, 83], delay: 1.0, rise: 11, tilt: 4, period: 4.2, z: '' },
  { name: 'blue-flower', src: heroFlowerBlue, at: [632, 185, 91], delay: 1.3, rise: 9, tilt: -4, period: 4.9, z: '' },
];

const ENTRANCE_DURATION = 0.7;

function Floater({ src, at, place: placeFn, delay, rise, tilt, period, z }) {
  const pos = placeFn(...at);
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

// The showcase will hold six projects, three to a row; for now only the first
// row is shown: the finished project plus two placeholder folders (hover shows
// the placeholder caption so the reveal can be judged). As projects are
// finished, fill in the placeholders and, once there are more than three, add
// the rest — the grid grows a second row. `files` are the sheets inside the
// folder, left to right (the last one is the front sheet); a project without
// files falls back to plain white sheets.
const PLACEHOLDER_CAPTION = 'Project description goes here.';
const PROJECTS = [
  {
    title: 'Education Brochure 2026',
    caption: 'A modular brochure system that makes the education ecosystem clearer across global markets.',
    to: '/visual-design/education-brochure-2026',
    files: [brochureMonitors, brochureViewboard, brochureCover],
  },
  { title: 'IFP53' },
  {},
];
const COLUMNS = 3;

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
const MOBILE_FOLDER_SCALE = 273.5 / 357.66;

const EASE = [0.22, 1, 0.36, 1];

// On hover the folder settles down and shrinks slightly, the sheets fan out
// above it, and the caption fades in below. Without a hover-capable pointer
// (touch) there is nothing to trigger it, so the caption just stays visible;
// with reduced motion the same end states apply instantly.
// `mobile` is the phone layout (Figma 364:229): the folder is drawn at 76.5%
// (273.5px wide), the caption is always visible (there is no hover) at 280px,
// and a black "View" button sits under linked projects. The whole card is one
// link, so the button is just its visible affordance.
// `open` (mobile) plays the same reveal as hover — the sheets fan out — for the
// folder currently scrolled to the middle of the screen; `cardRef` lets the page
// measure where each card is.
function FolderCard({ title, caption = PLACEHOLDER_CAPTION, files = [], to, mobile = false, open = false, cardRef }) {
  // Keyboard focus opens the folder the same way hover does.
  const [focused, setFocused] = useState(false);
  const reduceMotion = useReducedMotion();
  const canHover = useMediaQuery('(hover: hover)') && !mobile;
  const folderScale = mobile ? MOBILE_FOLDER_SCALE : FOLDER_SCALE;
  // The sheets fan out less sideways on a phone, so they stay inside the panel.
  const fanSpread = mobile ? 0.5 : 1;
  const t = (duration, delay = 0) => ({ duration: reduceMotion ? 0 : duration, delay: reduceMotion ? 0 : delay, ease: EASE });

  const Wrapper = to ? Link : 'div';
  return (
    <Wrapper
      ref={cardRef}
      {...(to ? { to, 'data-cursor': 'View', 'data-cursor-tone': 'light', 'aria-label': `${title}: ${caption}`, onFocus: () => setFocused(true), onBlur: () => setFocused(false) } : {})}
      className="block rounded-[32px] outline-none focus-visible:ring-2 focus-visible:ring-case-study-blue"
    >
    <motion.div
      initial="rest"
      animate={focused || open ? 'hover' : 'rest'}
      whileHover="hover"
      className="flex flex-col items-center gap-8"
    >
      <div style={{ width: 357.66 * folderScale, height: 272 * folderScale }}>
        <div className="relative h-[272px] w-[357.66px] origin-top-left" style={{ transform: `scale(${folderScale})` }}>
          {SHEETS.map((sheet, i) => (
            <motion.div
              key={sheet.x}
              aria-hidden="true"
              className="absolute flex items-center justify-center"
              style={{ left: sheet.x, top: sheet.y, width: sheet.w, height: sheet.h }}
              variants={{
                rest: { x: 0, y: 0, transition: t(0.45) },
                hover: { x: sheet.hover.x * fanSpread, y: sheet.hover.y, transition: t(0.5, i * 0.03) },
              }}
            >
              <motion.div
                className="h-[223px] w-[284px] overflow-hidden rounded-[15px] bg-white shadow-[0px_0px_6px_2px_rgba(0,0,0,0.05)]"
                variants={{
                  rest: { rotate: sheet.rotate, transition: t(0.45) },
                  hover: { rotate: sheet.hover.rotate, transition: t(0.5, i * 0.03) },
                }}
              >
                {files[i] && <img src={files[i]} alt="" className="size-full object-cover" />}
              </motion.div>
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
              // Same band as the original single-line label (centred ~182px
              // down the folder); long titles drop a size and wrap to two lines.
              <p
                className={`absolute inset-x-0 top-[60.67%] flex h-[75px] items-center justify-center px-5 text-center font-satoshi font-bold text-black text-balance ${
                  title.length > 12 ? 'text-[28px] leading-[32px]' : 'text-[36px] leading-[75px]'
                }`}
              >
                {title}
              </p>
            )}
          </motion.div>
        </div>
      </div>
      {/* Reserved so every row keeps the same rhythm; stays in the DOM (and
          readable to assistive tech and crawlers) while hidden at rest. */}
      <motion.p
        className={`text-center font-satoshi text-[16px] leading-6 text-black ${mobile ? 'w-[280px]' : 'h-12 w-[400px] max-w-none'}`}
        variants={{
          rest: { opacity: canHover ? 0 : 1, y: canHover ? 8 : 0, transition: t(0.25) },
          hover: { opacity: 1, y: 0, transition: t(0.35, 0.12) },
        }}
      >
        {caption}
      </motion.p>
      {mobile && to && (
        <span className="mt-0 flex h-[45px] w-[299px] items-center justify-center gap-2 rounded-full bg-black font-satoshi text-[16px] font-medium text-white">
          View
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M7 17L17 7M8 7h9v9" />
          </svg>
        </span>
      )}
    </motion.div>
    </Wrapper>
  );
}

// Eyes sit at about (66%, 26%) of the illustration; the head nods (rotates
// about the neck) with the cursor's vertical position, up to 5 degrees.
const EYE_ANCHOR = { x: 0.66, y: 0.26 };
const EYE_LIMITS = { minX: -4, maxX: 0, minY: -1.5, maxY: 3 };

export default function VisualDesign() {
  // Only one hero is mounted (two copies of the illustration would share SVG
  // ids for its masks): the desktop stage from lg up, the phone layout below.
  const isDesktop = useMediaQuery('(min-width: 1024px)');
  const reduceMotion = useReducedMotion();
  const characterRef = useRef(null);

  // Phone layout: as the visitor scrolls, the folder nearest the middle of the
  // screen opens (its sheets float up, like the desktop hover) and the one
  // they scrolled past closes again. A folder counts only while its centre is
  // within ~3/4 of a card height of the screen's centre, so nothing is open
  // while the intro is still on screen.
  const cardRefs = useRef([]);
  const [openIndex, setOpenIndex] = useState(-1);
  useEffect(() => {
    if (isDesktop) return undefined;
    let frame = 0;
    const update = () => {
      frame = 0;
      const middle = window.innerHeight / 2;
      let best = -1;
      let bestDistance = Infinity;
      cardRefs.current.forEach((el, i) => {
        if (!el) return;
        const rect = el.getBoundingClientRect();
        const distance = Math.abs(rect.top + rect.height / 2 - middle);
        if (distance < bestDistance && distance < rect.height * 0.75) {
          best = i;
          bestDistance = distance;
        }
      });
      setOpenIndex(best);
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [isDesktop]);
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

      {isDesktop ? (
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
              style={{ ...placeOnStage(ILLUSTRATION.x, ILLUSTRATION.y, ILLUSTRATION.w), '--eye-x': `${offset.x}px`, '--eye-y': `${offset.y}px`, '--head-tilt': `${tiltDeg}deg` }}
            >
              <HeroCharacterArt className="block w-full" alt="Illustration of Cynthia working at a laptop" />
            </div>
            {FLOATERS.map((item) => (
              <Floater key={item.name} {...item} place={placeOnStage} />
            ))}
          </section>
          </div>

          <section className="mx-auto max-w-[1343px] rounded-[32px] bg-case-study-highlight px-[78px] pb-[90px] pt-[114px]">
            <div
              className="mx-auto grid w-fit justify-items-center gap-x-[53px] gap-y-[120px]"
              style={{ gridTemplateColumns: `repeat(${Math.min(PROJECTS.length, COLUMNS)}, 358px)` }}
            >
              {PROJECTS.map((project, index) => (
                <FolderCard key={project.title ?? `empty-${index}`} {...project} />
              ))}
            </div>
          </section>

          {/* Gap to the footer panel (Figma: 66px below the folder panel). */}
          <div className="h-[66px]" />
        </div>
      ) : (
        <div className="bg-white">
          {/* Phone layout (Figma 364:229, 375 wide): title + intro at 18px margins,
              the illustration cluster (306px wide) sitting on the folder panel,
              then the folders stacked, each with its always-visible caption and
              a black View button. The site's header and footer are used as-is. */}
          <section className="px-[18px] pb-[68px] pt-[98px]">
            <h1 className="font-satoshi text-[36px] font-bold leading-[45px] text-black">
              Selected
              <br />
              Visual Work
            </h1>
            <p className="mt-6 font-satoshi text-[16px] leading-6 text-black">
              Selected brand, campaign, and communication design from across my practice.
            </p>
          </section>

          <div className="relative z-10 mx-auto w-[306px]" style={{ aspectRatio: `${CLUSTER_W} / ${CLUSTER_H}` }}>
            <div className="absolute z-10" style={placeInCluster(ILLUSTRATION.x, ILLUSTRATION.y, ILLUSTRATION.w)}>
              <HeroCharacterArt className="block w-full" alt="Illustration of Cynthia working at a laptop" />
            </div>
            {FLOATERS.map((item) => (
              <Floater key={item.name} {...item} place={placeInCluster} />
            ))}
          </div>

          <section className="mx-2 rounded-[32px] bg-case-study-highlight pb-[116px] pt-20">
            <div className="flex flex-col items-center gap-[76px]">
              {PROJECTS.map((project, index) => (
                <FolderCard
                  key={project.title ?? `empty-${index}`}
                  mobile
                  open={openIndex === index}
                  cardRef={(el) => {
                    cardRefs.current[index] = el;
                  }}
                  {...project}
                />
              ))}
            </div>
          </section>

          <div className="h-8" />
        </div>
      )}
    </>
  );
}
