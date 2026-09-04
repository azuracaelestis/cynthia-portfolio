import { motion, useReducedMotion } from 'framer-motion';
import stickerBlobMobile from '../../assets/hero/decoration-mobile/element12-mobile.svg';
import stickerStarMobile from '../../assets/hero/decoration-mobile/element13-mobile.svg';

const STICKERS = [
  { src: stickerBlobMobile, className: 'top-[104px] right-[33px] w-[85px] h-[85px]', y: 32, duration: 7, delay: 0.4 },
  { src: stickerStarMobile, className: 'top-[110px] left-[42px] w-[49px]', y: 0, duration: 5.5, delay: 1.2 },
];

const fadeUpVariants = { hidden: { opacity: 0, y: 10 }, visible: { opacity: 1, y: 0 } };

export default function DecorationsMobile({ entranceReady = true }) {
  const reduceMotion = useReducedMotion();
  const entranceDelay = (s) => (reduceMotion ? { duration: 0 } : { duration: 0.35, delay: s, ease: 'easeOut' });

  return (
    <div
      className="pointer-events-none absolute inset-0 lg:hidden"
      aria-hidden="true"
    >
      {STICKERS.map((sticker, index) => (
        <motion.div
          key={sticker.src}
          className={`absolute select-none ${sticker.className}`}
          variants={fadeUpVariants}
          initial="hidden"
          animate={entranceReady ? 'visible' : 'hidden'}
          transition={entranceDelay(0.24 + index * 0.06)}
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
