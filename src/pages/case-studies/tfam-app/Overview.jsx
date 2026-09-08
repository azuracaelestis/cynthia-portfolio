import { useRef } from 'react';
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { ShaderBackground } from '../../../shader/ShaderBackground';
import grainField from '../../../assets/case study/case-study-tfam-app/header/tfam-grain-field-2744.80.png';
import mockupHome from '../../../assets/case study/case-study-tfam-app/header/mockup-visual_Artboard 2 copy 2.png';
import mockupWhatsOnList from '../../../assets/case study/case-study-tfam-app/header/mockup-visual_Artboard 2 copy 4.png';
import mockupWhatsOnDetail from '../../../assets/case study/case-study-tfam-app/header/mockup-visual_Artboard 2 copy 3.png';

// Per Figma (node 312:1503, "Frame 3465598"): 3 flat, non-rotated mockups in
// a row, bottom-aligned, 15px gap, each 316px of the page's 1440px width
// (21.94%) — replaces the earlier 2-rotated-phone composition, which (per
// the removed comment below) was never actually sourced from this real
// Figma frame in the first place.
const MOCKUPS = [
  { src: mockupHome, alt: "TFAM App, home screen mockup" },
  { src: mockupWhatsOnList, alt: "TFAM App, What's On list mockup" },
  { src: mockupWhatsOnDetail, alt: 'TFAM App, exhibition detail mockup' },
];

// The tuned "Grain Field — the one" look, straight from the shader lab's
// Remotion-props export (see src/shader/README.md).
const GRAIN_FIELD_SEED = 6.6304;
const GRAIN_FIELD_PARAMS = {
  speed: 0.64, scale: 0.56, angle: -2.63, drift: 0.6, warp: 0.4, flow: 1.2,
  detail: 2.4, rough: 0.52, soft: 0.3, blur: 0.22, norm: 0.55,
  p1: 0.62, p2: 0.45, p3: 0, p4: 0.5,
  bump: 0.1, lightAngle: -1.26, lightElev: 0.995, ambient: 1,
  spec: 0.82, specPow: 7.95, fresnel: 0.385,
  contrast: 1.14, bright: -0.01, gamma: 1.16, lift: 0.004,
  bloom: 0.1, vignette: 0.34, invert: 0,
  auto: 0.8, target: 0.25,
  grain: 0.085, grainScale: 0.95, grainAnim: 1, bands: 0,
  stipple: 0.93, grain2: 0.455, renderScale: 1,
};

// Continuous scroll-linked parallax for the background + phone drift.
// Expressed as a fraction of THIS section's scroll range (0 = its top hits
// the viewport top, 1 = its bottom does), not of the page, so the timing
// holds at any height. The phones' initial appearance is a separate,
// mount-time cascade (see PHONE_ENTER_* below) — scroll-linking that entrance
// meant it played out over whatever few percent of the scroll range the user
// happened to cross, which read as a snap/blink rather than an ease-in.
const PHONE_DRIFT = -120;    // px the phones travel PAST their resting spot
const GRAIN_DRIFT = 40;      // px the shader counter-drifts, the other way
const VEIL_REST = 0.65;      // the black veil thins as the field comes forward

// One-time entrance cascade for the phones, independent of scroll — plays
// once on mount, so it always takes its full slow duration regardless of
// scroll speed or position, and never re-triggers.
const PHONE_ENTER_EASE = [0.22, 0.61, 0.36, 1];
const PHONE_ENTER_DURATION = 1.1;
const PHONE_ENTER_STAGGER = 0.35;

export default function Overview() {
  const reduceMotion = useReducedMotion();
  const sectionRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  });

  // The phones keep rising as the section scrolls, so they read as floating
  // in front of the field rather than pinned to it.
  const phoneY = useTransform(scrollYProgress, [0, 1], [0, PHONE_DRIFT]);

  // The background moves the opposite way and the veil lifts — the two halves
  // of what makes this read as depth rather than as two sliding layers.
  const grainY = useTransform(scrollYProgress, [0, 1], [0, GRAIN_DRIFT]);
  const veilOpacity = useTransform(scrollYProgress, [0, 1], [1, VEIL_REST]);

  return (
    <div ref={sectionRef} id="overview" className="scroll-mt-28 relative z-10 bg-ink">
      {/* Background layers get their OWN overflow-hidden box, clipped to the
          section's real bounds. The field is overscanned 48px top/bottom so
          its counter-drift never exposes an edge — but that overscan must
          stay clipped here, not bleed into the white section below, which is
          what was happening: `id=overview` itself has no overflow-hidden
          (removed deliberately so the phone mockups can bleed past its
          bottom edge), so the background's own -bottom-12 overscan was
          painting past that edge too, showing as a stray strip over the
          white content below. */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute inset-x-0 -top-12 -bottom-12"
          style={reduceMotion ? undefined : { y: grainY }}
        >
          {reduceMotion ? (
            <img src={grainField} alt="" className="absolute inset-0 w-full h-full object-cover" />
          ) : (
            <ShaderBackground
              preset="Grain Field"
              seed={GRAIN_FIELD_SEED}
              params={GRAIN_FIELD_PARAMS}
              className="absolute inset-0"
            />
          )}
        </motion.div>
        <motion.div
          className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/40 to-black/70"
          style={reduceMotion ? undefined : { opacity: veilOpacity }}
        />
      </div>
      <div className="relative mx-auto max-w-7xl px-6 lg:px-10 pt-[140px] lg:pt-40 pb-16 lg:pb-0">
        <span className="font-satoshi font-bold text-[16px] lg:text-[24px] text-white/70">
          Taipei Fine Arts Museum (TFAM)
        </span>
        <h1 className="mt-4 lg:mt-3 font-satoshi font-bold text-[36px] lg:text-[48px] lg:leading-[60px] text-white">
          TFAM built a branding campaign, not a companion.
        </h1>

        <div className="mt-6 lg:mt-6 flex flex-col gap-6 lg:flex-row lg:justify-between lg:gap-x-8 rounded-2xl border border-white/25 bg-white/20 backdrop-blur-xl shadow-[0_8px_32px_rgba(0,0,0,0.25)] px-6 py-6 lg:pl-8 lg:pr-10 lg:py-8">
          <div>
            <p className="font-satoshi font-medium text-[20px] text-white">Overview</p>
            <p className="mt-2 font-satoshi text-[16px] text-white/80 lg:max-w-[390px]">
              TFAM&apos;s app had plenty of features, but they were hard to reach because looks came before use. My
              redesign surfaced what was there and made it easier to use.
            </p>
          </div>
          <div>
            <p className="font-satoshi font-medium text-[20px] text-white">Role</p>
            <p className="mt-2 font-satoshi text-[16px] text-white/80 lg:max-w-[220px]">
              Solo UX Designer, Product Redesign
            </p>
          </div>
          <div>
            <p className="font-satoshi font-medium text-[20px] text-white">The Team</p>
            <p className="mt-2 font-satoshi text-[16px] text-white/80 lg:max-w-[260px]">
              Self-initiated solo project: research, define, ideation, IA, wireframing, prototyping
            </p>
          </div>
          <div>
            <p className="font-satoshi font-medium text-[20px] text-white">Timeline</p>
            <p className="mt-2 font-satoshi text-[16px] text-white/80">
              Q2–Q3 2026
              <br />
              (2.5 month)
            </p>
          </div>
        </div>

        {/* Mockup row, per Figma (node 312:1503, "Frame 3465598"): 3 flat,
            non-rotated device mockups, bottom-aligned, centered, 15px gap,
            each 21.94% of the page width (316/1440) — this is the FIRST
            time this composition has actually been sourced from Figma; the
            previous 2-rotated-phone version (crop/rotation/position tuned
            across many rounds, per this block's prior history) was an
            approximation that turned out not to match this real frame at
            all, so none of that per-phone tuning carries over. What DOES
            carry over: the stage box below (sizing/fit mechanics — the
            viewport-height cap, the shortened aspect ratio, the negative
            margin overlapping the white section) was tuned independently of
            the phones themselves and is reused as-is as the mounting
            surface for this new row.

            The row is `absolute inset-x-0` of the stage box, bottom-aligned
            (matching Figma's own "items-end" for this group) at `bottom-
            [-90px]` — 90px BELOW the box's own bottom edge (48px, then
            +42px more per feedback), on top of whatever overlap that box's
            `-mb-20`/aspect-ratio tuning already produces, so the mockups'
            bottoms visibly cover a bit of the white section rather than
            landing flush at the boundary. Each
            image is 10% larger than Figma's raw 21.94% (316/1440) — 24.13%
            — per direct feedback that they read too small at 1:1. Mobile:
            hidden until a dedicated mobile pass, same as before.

            The scroll-linked drift (`y: phoneY`) now applies to the whole
            row as one unit (a single wrapper) rather than per-image, since
            all 3 move together at the same rate in this layout — simpler
            than the old per-phone wrappers, which existed to let 2
            independently-positioned images share a differently-shaped
            drift range. The one-time mount entrance (opacity/y/scale)
            still staggers per image via PHONE_ENTER_STAGGER. */}
        <div className="relative mt-12 h-32 lg:mt-6 lg:h-auto lg:mx-auto lg:w-[min(100%,119.1vh)] lg:aspect-[1200/520] lg:-mb-20">
          <motion.div
            className="hidden lg:flex absolute inset-x-0 bottom-[-90px] items-end justify-center gap-[15px]"
            style={reduceMotion ? undefined : { y: phoneY }}
          >
            {MOCKUPS.map((mockup, i) => (
              <motion.img
                key={mockup.src}
                src={mockup.src}
                alt={mockup.alt}
                className="w-[24.13%] h-auto drop-shadow-2xl"
                initial={reduceMotion ? false : { opacity: 0, y: 40, scale: 0.92 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={
                  reduceMotion
                    ? { duration: 0 }
                    : { duration: PHONE_ENTER_DURATION, ease: PHONE_ENTER_EASE, delay: i * PHONE_ENTER_STAGGER }
                }
              />
            ))}
          </motion.div>
        </div>
      </div>
    </div>
  );
}
