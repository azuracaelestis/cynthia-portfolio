import { motion, AnimatePresence } from 'framer-motion';

// mood: 'awake' | 'sleeping' | 'thinking'
export default function Character({ mood }) {
  const isSleeping = mood === 'sleeping';
  const isThinking = mood === 'thinking';

  return (
    <div className="relative">
      <motion.svg
        viewBox="0 0 420 520"
        className="w-[280px] sm:w-[360px] lg:w-[420px] h-auto select-none"
        animate={{ y: [0, -8, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
      >
        {/* shirt */}
        <g clipPath="url(#shirtClip)">
          <rect x="120" y="360" width="260" height="160" fill="#f7efdd" />
          {[0, 1, 2, 3, 4].map((i) => (
            <rect key={i} x="120" y={370 + i * 30} width="260" height="16" fill="#f2a93b" />
          ))}
        </g>
        <path
          id="shirtOutline"
          d="M140 372 C140 340 170 358 235 358 C300 358 330 340 330 372 L340 520 L130 520 Z"
          fill="none"
        />
        <clipPath id="shirtClip">
          <path d="M140 372 C140 340 170 358 235 358 C300 358 330 340 330 372 L340 520 L130 520 Z" />
        </clipPath>

        {/* neck */}
        <path d="M205 330 C205 355 205 365 215 372 C235 380 260 378 268 368 C276 352 274 335 274 320 L205 320 Z" fill="#f7cbab" />

        {/* hair (back) */}
        <path
          d="M228 80 C 320 78 372 150 372 240 C 372 300 366 350 348 392 C 336 418 318 424 296 418 L292 340 C 300 300 300 200 250 150 C 225 125 210 100 228 80 Z"
          fill="#6fb3e0"
        />

        {/* head */}
        <path
          d="M232 90 C 296 88 320 150 318 210 C 317 244 306 270 288 292 C 300 306 300 322 288 332 C 270 348 236 344 218 320 C 188 318 168 296 168 262 C 168 258 172 250 168 244 C 160 232 162 214 172 208 C 172 180 176 100 232 90 Z"
          fill="#f7cbab"
        />

        {/* ear detail */}
        <path d="M300 236 C 312 234 320 244 318 258 C 316 270 304 274 296 266 C 292 256 292 240 300 236 Z" fill="#f7cbab" />
        <path d="M303 244 C 309 244 311 250 309 256" stroke="#e0a684" strokeWidth="4" fill="none" strokeLinecap="round" />

        {/* cap brim */}
        <path d="M168 208 C 150 210 120 222 96 232 C 88 236 88 246 98 248 C 128 250 158 240 176 230 Z" fill="#3d84b8" />

        {/* cap */}
        <path
          d="M170 214 C 176 140 216 96 268 92 C 330 88 370 128 372 190 C 374 214 366 224 350 224 C 300 224 220 224 178 226 C 170 226 168 220 170 214 Z"
          fill="#6fb3e0"
        />
        <path d="M170 214 C176 210 200 206 230 205" stroke="#3d84b8" strokeWidth="3" fill="none" strokeLinecap="round" opacity="0.5" />

        {/* glasses */}
        <circle cx="225" cy="248" r="34" fill="#f7cbab" stroke="#7a4a2a" strokeWidth="7" />
        <path d="M259 244 C 270 242 282 244 292 250" stroke="#7a4a2a" strokeWidth="7" fill="none" strokeLinecap="round" />

        {/* eye (mood-driven) */}
        <AnimatePresence mode="wait">
          {isSleeping ? (
            <motion.path
              key="eye-sleep"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              d="M210 250 C 216 258 232 258 238 250"
              stroke="#3a2a1c"
              strokeWidth="6"
              strokeLinecap="round"
              fill="none"
            />
          ) : isThinking ? (
            <motion.path
              key="eye-think"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              d="M212 258 C 218 240 232 236 240 244"
              stroke="#3a2a1c"
              strokeWidth="6"
              strokeLinecap="round"
              fill="none"
            />
          ) : (
            <motion.path
              key="eye-awake"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              d="M238 232 L214 248 L238 264"
              stroke="#3a2a1c"
              strokeWidth="6"
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
            />
          )}
        </AnimatePresence>

        {/* nose */}
        <path d="M168 244 C 158 250 156 262 166 268" stroke="#e0a684" strokeWidth="5" fill="none" strokeLinecap="round" />
      </motion.svg>

      {/* zzz sleep indicator */}
      <AnimatePresence>
        {isSleeping && (
          <motion.div
            className="absolute top-6 right-6 font-display font-bold text-sky-600 pointer-events-none"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: -6 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6 }}
          >
            <motion.span
              className="block text-2xl"
              animate={{ y: [-4, -14, -4], opacity: [0.4, 1, 0.4] }}
              transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
            >
              Z z z
            </motion.span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
