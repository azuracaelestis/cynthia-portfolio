import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { motion, useMotionValue, useReducedMotion, useSpring } from 'framer-motion';
import { useMediaQuery } from '../hooks/useMediaQuery';
import flowerShape from '../assets/my design practice/element-decoration/element6.svg';

// Site-wide custom cursor (desktop / fine pointers only). By default the
// native cursor is replaced by a small dot that trails the pointer and inverts
// against whatever is under it (white with mix-blend-mode: difference, so it
// reads black on the light page and white over black type or dark surfaces); over an
// element marked `data-cursor="Label"` the dot morphs into a pill with that
// label (and a spinning flower). `data-cursor-tone="light"` makes it a white pill
// with blue text instead of the default blue one. Over other links and
// buttons the dot swells a little, since the native pointer is gone.
//   <Link data-cursor="Read case study">   <Link data-cursor="View" data-cursor-tone="light">
// Touch devices and reduced-motion visitors: touch keeps its native behaviour;
// reduced motion gets the same cursor without the trailing spring or morph.
// Sizes have been tuned up twice: everything +15% (dot 10 -> 11.5, pill 40 -> 46,
// ...), then the dot states +30% so it can't be mistaken for a dot in the
// type (11.5 -> 15, swell 27.5 -> 36). The pill is left at its +15% size.
const DOT = 15;
const SWELL = 36;
const PILL_HEIGHT = 46;
const PILL_PADDING = 21; // each side
const ICON = 26; // the flower art has empty margin, so this reads as roughly a 20px icon
const SPIN_SECONDS = 1.2; // one full turn of the flower (the shape is 15-fold symmetric, so slower looks static)

const TONE_CLASS = {
  brand: 'bg-case-study-blue text-white',
  light: 'bg-white text-case-study-blue shadow-[0_2px_10px_rgba(0,0,0,0.14)]',
};

// The label's icon: the daisy shape from the "My Design Practice" decorations,
// used purely as a mask so it takes the pill's text colour (white on the blue
// pill, blue on the white one) instead of its own yellow. It keeps spinning
// while the pill is showing.
function Flower({ spinning }) {
  return (
    <motion.span
      aria-hidden="true"
      className="block shrink-0"
      style={{
        width: ICON,
        height: ICON,
        backgroundColor: 'currentColor',
        WebkitMaskImage: `url("${flowerShape}")`,
        maskImage: `url("${flowerShape}")`,
        WebkitMaskSize: 'contain',
        maskSize: 'contain',
        WebkitMaskRepeat: 'no-repeat',
        maskRepeat: 'no-repeat',
        WebkitMaskPosition: 'center',
        maskPosition: 'center',
      }}
      animate={{ rotate: spinning ? 360 : 0 }}
      transition={spinning ? { duration: SPIN_SECONDS, ease: 'linear', repeat: Infinity } : { duration: 0 }}
    />
  );
}

export default function CustomCursor() {
  // Desktop only: a fine pointer AND a desktop-width window (lg and up), so a narrowed
  // browser window that emulates mobile keeps the native cursor too.
  const enabled = useMediaQuery('(hover: hover) and (pointer: fine) and (min-width: 1024px)');
  const reduceMotion = useReducedMotion();

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const springX = useSpring(x, { stiffness: 700, damping: 46, mass: 0.35 });
  const springY = useSpring(y, { stiffness: 700, damping: 46, mass: 0.35 });

  const [visible, setVisible] = useState(false);
  const [pressed, setPressed] = useState(false);
  const [target, setTarget] = useState({ label: null, tone: 'brand', swell: false });

  const measureRef = useRef(null);
  const [pillWidth, setPillWidth] = useState(0);

  useEffect(() => {
    if (!enabled) return undefined;
    const root = document.documentElement;
    root.classList.add('custom-cursor');

    function handleMove(event) {
      x.set(event.clientX);
      y.set(event.clientY);
      setVisible(true);
    }
    function handleOver(event) {
      const el = event.target instanceof Element ? event.target : null;
      const labelled = el?.closest('[data-cursor]');
      if (labelled) {
        setTarget({ label: labelled.dataset.cursor, tone: labelled.dataset.cursorTone || 'brand', swell: false });
      } else {
        const interactive = !!el?.closest('a, button, [role="button"], summary, label, input, select, textarea');
        setTarget((prev) => (prev.label || prev.swell !== interactive ? { label: null, tone: 'brand', swell: interactive } : prev));
      }
    }
    const handleLeave = () => setVisible(false);
    const handleDown = () => setPressed(true);
    const handleUp = () => setPressed(false);

    window.addEventListener('mousemove', handleMove, { passive: true });
    window.addEventListener('mouseover', handleOver, { passive: true });
    window.addEventListener('mousedown', handleDown, { passive: true });
    window.addEventListener('mouseup', handleUp, { passive: true });
    root.addEventListener('mouseleave', handleLeave);
    return () => {
      root.classList.remove('custom-cursor');
      window.removeEventListener('mousemove', handleMove);
      window.removeEventListener('mouseover', handleOver);
      window.removeEventListener('mousedown', handleDown);
      window.removeEventListener('mouseup', handleUp);
      root.removeEventListener('mouseleave', handleLeave);
    };
  }, [enabled, x, y]);

  // Width of the pill for the current label, measured off-screen.
  useLayoutEffect(() => {
    if (target.label && measureRef.current) setPillWidth(Math.ceil(measureRef.current.offsetWidth) + PILL_PADDING * 2);
  }, [target.label, enabled]);

  if (!enabled) return null;

  const isPill = !!target.label;
  const dotSize = target.swell ? SWELL : DOT;
  const move = { duration: reduceMotion ? 0 : 0.3, ease: [0.22, 1, 0.36, 1] };
  const fade = { duration: reduceMotion ? 0 : 0.14 };
  const pos = { x: reduceMotion ? x : springX, y: reduceMotion ? y : springY };

  // Two top-level layers (not one nested pair): mix-blend-mode only blends with
  // the page when the blended element sits directly in the root stacking
  // context, and a fixed parent would isolate it. The dot layer blends; the
  // pill layer is a plain opaque pill. They crossfade as the dot grows into it.
  return (
    <>
      {/* Off-screen copy of the label, only to measure the pill's width. */}
      <span
        ref={measureRef}
        aria-hidden="true"
        className="pointer-events-none invisible fixed left-0 top-0 inline-flex items-center gap-2 whitespace-nowrap font-satoshi text-[16px] font-medium"
      >
        <span style={{ width: ICON }} />
        {target.label}
      </span>

      <motion.div
        aria-hidden="true"
        className="pointer-events-none fixed left-0 top-0 z-[9999] mix-blend-difference"
        style={pos}
        animate={{ opacity: visible && !isPill ? (target.swell ? 0.88 : 1) : 0 }}
        transition={fade}
      >
        <motion.div
          className="-translate-x-1/2 -translate-y-1/2 rounded-full bg-white"
          animate={{ width: dotSize, height: dotSize, scale: pressed ? 0.92 : 1 }}
          transition={move}
        />
      </motion.div>

      <motion.div
        aria-hidden="true"
        className="pointer-events-none fixed left-0 top-0 z-[9999]"
        style={pos}
        animate={{ opacity: visible && isPill ? 1 : 0 }}
        transition={fade}
      >
        <motion.div
          className={`-translate-x-1/2 -translate-y-1/2 flex items-center justify-center overflow-hidden rounded-full transition-colors duration-200 ${
            TONE_CLASS[target.tone] ?? TONE_CLASS.brand
          }`}
          animate={{
            width: isPill ? pillWidth || DOT : DOT,
            height: isPill ? PILL_HEIGHT : DOT,
            scale: pressed ? 0.94 : 1,
          }}
          transition={move}
        >
          <motion.span
            className="flex items-center gap-2 whitespace-nowrap font-satoshi text-[16px] font-medium"
            animate={{ opacity: isPill ? 1 : 0 }}
            transition={{ duration: reduceMotion ? 0 : 0.18, delay: reduceMotion || !isPill ? 0 : 0.1 }}
          >
            <Flower spinning={isPill && !reduceMotion} />
            {target.label}
          </motion.span>
        </motion.div>
      </motion.div>
    </>
  );
}
