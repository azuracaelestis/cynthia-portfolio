import { motion } from 'framer-motion';
import stickerBlueBloom from '../../assets/hero/decorations/sticker-346.svg';
import stickerYellowBlob from '../../assets/hero/decorations/sticker-344.svg';
import stickerGear from '../../assets/hero/decorations/sticker-343.svg';
import stickerPaleBloom from '../../assets/hero/decorations/sticker-345.svg';

// x/y are static offsets applied via Framer Motion's own motion values (not
// CSS transform classes) — motion.img's animate={{ y: [...] }} bob writes
// the transform property directly as an inline style every frame, which
// silently overrides any Tailwind translate-* class targeting the same
// element. x is fixed and set once via `style` (never re-tweened); only y
// is animated — putting a static value in `animate` under repeat: Infinity
// would make Framer Motion snap it back to 0 and retween every cycle.
const STICKERS = [
  { src: stickerBlueBloom, className: 'top-[16%] left-[56%] w-[53px] lg:top-[22%] lg:left-[57%] lg:w-[48px]', x: 0, y: -48, duration: 6, delay: 0 },
  { src: stickerYellowBlob, className: 'top-[19%] right-[12%] w-14 lg:top-[24%] lg:right-[14%] lg:w-[50px]', x: -34, y: 32, duration: 7, delay: 0.4 },
  { src: stickerGear, className: 'top-[56%] left-[42%] w-[97px] lg:top-[58%] lg:left-[50%] lg:w-[78px]', x: 0, y: 80, duration: 6.5, delay: 0.8 },
  { src: stickerPaleBloom, className: 'top-[68%] right-[9%] w-[81px] lg:top-[48%] lg:right-[8%] lg:w-[72px]', x: 0, y: 0, duration: 5.5, delay: 1.2 },
];

export default function Decorations({ show = true }) {
  return (
    <motion.div
      className="pointer-events-none absolute inset-0 col-span-full row-span-full hidden sm:block lg:-translate-x-[30px]"
      aria-hidden="true"
      animate={{ opacity: show ? 1 : 0 }}
      transition={{ duration: 0.35, ease: 'easeInOut' }}
    >
      {STICKERS.map((sticker) => (
        <motion.img
          key={sticker.src}
          src={sticker.src}
          alt=""
          className={`absolute select-none ${sticker.className}`}
          style={{ x: sticker.x }}
          animate={{ y: [sticker.y, sticker.y - 10, sticker.y] }}
          transition={{ duration: sticker.duration, delay: sticker.delay, repeat: Infinity, ease: 'easeInOut' }}
        />
      ))}
    </motion.div>
  );
}
