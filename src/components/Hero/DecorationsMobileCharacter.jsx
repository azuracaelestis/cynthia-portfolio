import { motion, useReducedMotion } from 'framer-motion';
import stickerBlueBloom from '../../assets/hero/decorations/sticker-346.svg';
import stickerYellowBlob from '../../assets/hero/decorations/sticker-344.svg';
import stickerGear from '../../assets/hero/decorations/sticker-343.svg';
import stickerPaleBloom from '../../assets/hero/decorations/sticker-345.svg';
import { stickerVariants, stickerTransition } from './stickerEntrance';

// The four stickers around the character on mobile — the same set as the
// desktop Decorations, placed by px inside the 282 x 351 character frame (the
// overlay below is exactly that frame, centred) at the same spots, relative to the
// character, as on desktop (centres at 24% / 82% / 3.5% / 103% across the drawn
// art and 4% / 6% / 40% / 30% down it, sized 11% / 11% / 17% / 16% of its width). They pop in
// one by one when the character scrolls into view (`entranceReady`), on the
// same triggers as the desktop ones (first entrance / waking from sleep), and
// are hidden while she thinks (the thought post-its take over), like desktop.
const STICKERS = [
  { src: stickerBlueBloom, className: 'left-[46px] top-[-37px] w-[32px]', y: 0, duration: 6, delay: 0 },
  { src: stickerYellowBlob, className: 'left-[223px] top-[-31px] w-[34px]', y: 0, duration: 7, delay: 0.4 },
  { src: stickerGear, className: 'left-[-27px] top-[88px] w-[52px]', y: 0, duration: 6.5, delay: 0.8 },
  { src: stickerPaleBloom, className: 'left-[280px] top-[53px] w-[48px]', y: 0, duration: 5.5, delay: 1.2 },
];

export default function DecorationsMobileCharacter({ show = true, entranceReady = true, playFirst = false, wakeCount = 0 }) {
  const reduceMotion = useReducedMotion();
  const kind = wakeCount > 0 ? 'wake' : 'first';
  const animateIn = wakeCount > 0 || playFirst;

  return (
    <motion.div
      className="pointer-events-none absolute left-1/2 top-0 h-[351px] w-[282px] -translate-x-1/2 lg:hidden"
      aria-hidden="true"
      animate={{ opacity: show ? 1 : 0 }}
      transition={{ duration: show ? 0.35 : 0.5, ease: 'easeInOut' }}
    >
      {STICKERS.map((sticker, index) => (
        <motion.div
          key={`${sticker.src}-${wakeCount}`}
          className={`absolute select-none ${sticker.className}`}
          variants={stickerVariants}
          initial={animateIn ? 'hidden' : false}
          animate={entranceReady || !animateIn ? 'visible' : 'hidden'}
          transition={stickerTransition({ index, kind, reduceMotion })}
        >
          <motion.img
            src={sticker.src}
            alt=""
            className="block h-full w-full"
            animate={reduceMotion ? undefined : { y: [sticker.y, sticker.y - 8, sticker.y] }}
            transition={reduceMotion ? undefined : { duration: sticker.duration, delay: sticker.delay, repeat: Infinity, ease: 'easeInOut' }}
          />
        </motion.div>
      ))}
    </motion.div>
  );
}
