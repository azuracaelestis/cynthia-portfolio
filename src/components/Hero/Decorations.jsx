import { motion } from 'framer-motion';
import stickerBlueBloom from '../../assets/hero/decorations/sticker-346.svg';
import stickerYellowBlob from '../../assets/hero/decorations/sticker-344.svg';
import stickerGear from '../../assets/hero/decorations/sticker-343.svg';
import stickerPaleBloom from '../../assets/hero/decorations/sticker-345.svg';

const STICKERS = [
  { src: stickerBlueBloom, className: 'top-[13%] left-[54%] w-10 lg:top-[10%] lg:left-[46%] lg:w-9', duration: 6, delay: 0 },
  { src: stickerYellowBlob, className: 'top-[16%] right-[10%] w-12 lg:top-[14%] lg:right-[14%] lg:w-11', duration: 7, delay: 0.4 },
  { src: stickerGear, className: 'top-[60%] left-[38%] w-20 lg:top-[56%] lg:left-[40%] lg:w-16', duration: 6.5, delay: 0.8 },
  { src: stickerPaleBloom, className: 'top-[70%] right-[6%] w-16 lg:top-[46%] lg:right-[2%] lg:w-14', duration: 5.5, delay: 1.2 },
];

export default function Decorations() {
  return (
    <div className="pointer-events-none absolute inset-0 col-span-full row-span-full hidden sm:block" aria-hidden="true">
      {STICKERS.map((sticker) => (
        <motion.img
          key={sticker.src}
          src={sticker.src}
          alt=""
          className={`absolute select-none ${sticker.className}`}
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: sticker.duration, delay: sticker.delay, repeat: Infinity, ease: 'easeInOut' }}
        />
      ))}
    </div>
  );
}
