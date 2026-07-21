import { motion, useReducedMotion } from 'framer-motion';
import stickerPaperMobile from '../../assets/hero/decoration-mobile/element11-mobile.svg';
import stickerBlobMobile from '../../assets/hero/decoration-mobile/element12-mobile.svg';
import stickerStarMobile from '../../assets/hero/decoration-mobile/element13-mobile.svg';

const STICKERS = [
  { src: stickerPaperMobile, className: 'top-[128px] left-[150px] w-[62px]', y: -48, duration: 6, delay: 0 },
  { src: stickerBlobMobile, className: 'top-[68px] right-[33px] w-[64px]', y: 32, duration: 7, delay: 0.4 },
  { src: stickerStarMobile, className: 'top-[110px] left-[42px] w-[49px]', y: 0, duration: 5.5, delay: 1.2 },
];

export default function DecorationsMobile() {
  const reduceMotion = useReducedMotion();

  return (
    <div
      className="pointer-events-none absolute inset-0 col-span-full row-span-full lg:hidden"
      aria-hidden="true"
    >
      {STICKERS.map((sticker) => (
        <motion.img
          key={sticker.src}
          src={sticker.src}
          alt=""
          className={`absolute select-none ${sticker.className}`}
          style={{ y: sticker.y }}
          animate={reduceMotion ? undefined : { y: [sticker.y, sticker.y - 10, sticker.y] }}
          transition={reduceMotion ? undefined : { duration: sticker.duration, delay: sticker.delay, repeat: Infinity, ease: 'easeInOut' }}
        />
      ))}
    </div>
  );
}
