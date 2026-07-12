import { motion, AnimatePresence } from 'framer-motion';

const NOTES = [
  { color: 'bg-cream', rotate: -10, className: 'top-[2%] left-[6%] w-20 sm:w-24' },
  { color: 'bg-sky-200', rotate: 8, className: 'top-[-4%] right-[2%] w-24 sm:w-28' },
  { color: 'bg-amber-100', rotate: -6, className: 'top-[26%] left-[-6%] w-20 sm:w-24' },
];

function Note({ color, rotate, className, delay }) {
  return (
    <motion.div
      className={`absolute ${color} ${className} aspect-square rounded-md shadow-lg p-3 flex flex-col justify-center gap-1.5`}
      style={{ rotate }}
      initial={{ opacity: 0, scale: 0.3, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.3, y: 10 }}
      transition={{ duration: 0.45, delay, ease: 'backOut' }}
    >
      <span className="block h-1.5 rounded-full bg-black/15 w-full" />
      <span className="block h-1.5 rounded-full bg-black/15 w-4/5" />
      <span className="block h-1.5 rounded-full bg-black/15 w-3/5" />
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
