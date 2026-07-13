import { motion, AnimatePresence } from 'framer-motion';
import stickyBlue from '../../assets/hero/sticky notes/sticky-notes-blue.svg';
import stickyYellow from '../../assets/hero/sticky notes/sticky-notes-yellow.svg';
import stickyBrown from '../../assets/hero/sticky notes/sticky-notes-brown.svg';

// origin is the offset (px) back toward the character's head — notes fly
// out from there on entrance and shrink back into it on exit.
const NOTES = [
  { src: stickyBrown, rotate: -8, className: 'top-[-20%] left-[26%] w-20 sm:w-24', origin: { x: 20, y: 60 }, duration: 4.6 },
  { src: stickyBlue, rotate: 8, className: 'top-[-8%] right-[6%] w-24 sm:w-28', origin: { x: -30, y: 50 }, duration: 5 },
  { src: stickyYellow, rotate: -6, className: 'top-[46%] left-[20%] w-20 sm:w-24', origin: { x: 40, y: -50 }, duration: 5.8 },
];

const ENTRANCE_DURATION = 0.5;

function Note({ src, rotate, className, origin, duration, delay }) {
  return (
    <motion.div
      className={`absolute ${className}`}
      initial={{ opacity: 0, scale: 0.25, x: origin.x, y: origin.y, rotate: 0 }}
      animate={{ opacity: 1, scale: 1, x: 0, y: 0, rotate }}
      exit={{ opacity: 0, scale: 0.25, x: origin.x, y: origin.y, rotate: 0 }}
      transition={{ duration: ENTRANCE_DURATION, delay, ease: 'backOut' }}
    >
      <motion.img
        src={src}
        alt=""
        className="w-full h-full select-none"
        animate={{ y: [0, -8, 0] }}
        transition={{ duration, delay: delay + ENTRANCE_DURATION, repeat: Infinity, ease: 'easeInOut' }}
      />
    </motion.div>
  );
}

export default function ThoughtPostits({ show }) {
  return (
    <div className="pointer-events-none absolute inset-0">
      <AnimatePresence>
        {show &&
          NOTES.map((note, i) => (
            <Note key={note.className} {...note} delay={i * 0.12} />
          ))}
      </AnimatePresence>
    </div>
  );
}
