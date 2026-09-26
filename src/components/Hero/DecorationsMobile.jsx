import { motion, useReducedMotion } from 'framer-motion';
import stickerBlobMobile from '../../assets/hero/decoration-mobile/element12-mobile.svg';
import stickerStarMobile from '../../assets/hero/decoration-mobile/element13-mobile.svg';
import { stickerVariants, stickerTransition } from './stickerEntrance';

const STICKERS = [
  { src: stickerBlobMobile, className: 'top-[104px] right-[33px] w-[85px] h-[85px]', y: 32, duration: 7, delay: 0.4 },
  { src: stickerStarMobile, className: 'top-[110px] left-[42px] w-[49px]', y: 0, duration: 5.5, delay: 1.2 },
];

// Same triggers as Decorations (first entrance, and waking from sleep).
export default function DecorationsMobile({ entranceReady = true, playFirst = false, wakeCount = 0 }) {
  const reduceMotion = useReducedMotion();
  const kind = wakeCount > 0 ? 'wake' : 'first';
  const animateIn = wakeCount > 0 || playFirst;

  return (
    <div
      className="pointer-events-none absolute inset-0 lg:hidden"
      aria-hidden="true"
    >
      {STICKERS.map((sticker, index) => (
        <motion.div
          key={`${sticker.src}-${wakeCount}`}
          className={`absolute select-none ${sticker.className}`}
          variants={stickerVariants}
          initial={animateIn ? 'hidden' : false}
          animate={entranceReady ? 'visible' : 'hidden'}
          transition={stickerTransition({ index, kind, reduceMotion })}
        >
          <motion.img
            src={sticker.src}
            alt=""
            className="block w-full h-full"
            style={{ y: sticker.y }}
            animate={reduceMotion ? undefined : { y: [sticker.y, sticker.y - 10, sticker.y] }}
            transition={reduceMotion ? undefined : { duration: sticker.duration, delay: sticker.delay, repeat: Infinity, ease: 'easeInOut' }}
          />
        </motion.div>
      ))}
    </div>
  );
}
