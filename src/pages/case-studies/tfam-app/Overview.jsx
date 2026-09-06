import { useRef } from 'react';
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { ShaderBackground } from '../../../shader/ShaderBackground';
import grainField from '../../../assets/case study/case-study-tfam-app/header/tfam-grain-field-2744.80.png';
import mockupWhatson from '../../../assets/case study/case-study-tfam-app/header/mockup1_whatson.png';
import mockupOnboarding from '../../../assets/case study/case-study-tfam-app/header/mockup1_onboarding.png';

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
              TFAM&apos;s app had plenty of features, but they were built to look good more than to be used, so the
              ones visitors needed most were hard to reach. I led an end-to-end redesign focused on surfacing what
              was already there, not adding more.
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
            <p className="mt-2 font-satoshi text-[16px] text-white/80">Q2–Q3 2026 (2.5 month)</p>
          </div>
        </div>

        {/* Phone mockups, positioned per Figma (node 258:1042). The stage's
            aspect ratio is Figma's own 1200x655 — the span from the meta
            card's bottom (y545) down to the dark rectangle's bottom (y1200)
            — so the dark hero ends exactly where Figma's does and every
            offset below stays proportional at any width. The mockups are
            absolutely positioned, so they don't add flow height: their
            bottoms hang ~210px past the dark edge and float over the white
            section below (via this section's z-10). Mobile: hidden until a
            dedicated mobile pass.

            Rotation lives in `style`, not a `rotate-[...]` class: Tailwind v4
            sets the standalone `rotate` property, which would compose with
            framer-motion's `transform` and make the resting angle hard to
            reason about. One transform, one owner.

            Each phone is a wrapper (owns position + the continuous scroll
            drift, `y: phoneY`) around the actual image (owns the one-time
            mount entrance — opacity/y/scale via initial/animate — plus the
            static `rotate`). Splitting them this way is what lets a
            continuously-updating scroll value and a play-once mount
            animation coexist without one fighting the other over the same
            transform property.

            `lg:-mb-32`: per Figma, the stage's own height (this aspect-ratio
            box) is meant to end exactly where the dark background ends —
            the phones' overhang past that into the white section below is
            handled entirely by their absolute positioning, not by this box's
            height. But our meta card holds real copy (wraps differently
            than Figma's fitted mockup text), rendering a bit taller than
            Figma's, which pushes this whole box — and the white section
            starting right after it — lower than intended. This negative
            margin pulls the white section back up to compensate; it doesn't
            move the phones themselves (they're absolutely positioned inside
            this box, unaffected by the box's own trailing margin). Best-
            effort estimate, no live browser to measure the real overflow —
            flag for a follow-up nudge once seen live. */}
        <div className="relative mt-12 h-32 lg:mt-0 lg:h-auto lg:aspect-[1200/655] lg:-mb-32">
          <motion.div
            className="hidden lg:block absolute w-[35.51%] top-[12.88%] left-[17.79%]"
            style={reduceMotion ? undefined : { y: phoneY }}
          >
            <motion.img
              src={mockupWhatson}
              alt="TFAM App, What's On screen mockup"
              className="w-full drop-shadow-2xl"
              style={{ rotate: -23.02 }}
              initial={reduceMotion ? false : { opacity: 0, y: 40, scale: 0.92 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={
                reduceMotion
                  ? { duration: 0 }
                  : { duration: PHONE_ENTER_DURATION, ease: PHONE_ENTER_EASE, delay: 0 }
              }
            />
          </motion.div>
          <motion.div
            className="hidden lg:block absolute w-[37.99%] top-[3.7%] left-[43.47%]"
            style={reduceMotion ? undefined : { y: phoneY }}
          >
            <motion.img
              src={mockupOnboarding}
              alt="TFAM App, onboarding screen mockup"
              className="w-full drop-shadow-2xl"
              style={{ rotate: 23.09 }}
              initial={reduceMotion ? false : { opacity: 0, y: 40, scale: 0.92 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={
                reduceMotion
                  ? { duration: 0 }
                  : { duration: PHONE_ENTER_DURATION, ease: PHONE_ENTER_EASE, delay: PHONE_ENTER_STAGGER }
              }
            />
          </motion.div>
        </div>
      </div>
    </div>
  );
}
