import { useEffect, useRef, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';

// Scroll "flow" reveal, in both scroll directions (used on the Education Brochure
// page and the TFAM case study): whenever a block enters the viewport it
// rises/drops ~40px into place while a heavy blur clears and it fades in — from
// below when scrolling down, from above when scrolling back up. It is a slow,
// eased, time-based animation, and it replays every time the block re-enters.
// On leaving, the block resets instantly (it is off-screen) to the side it left
// by, so the next entrance starts from the right direction. Blocks already on
// screen at load animate in the same way. Reduced motion: shown as-is.
const FLOW_OFFSET = 40;
const FLOW_BLUR = 'blur(14px)';
const flowTransition = { duration: 1.5, ease: [0.4, 0, 0.2, 1] };
const flowVariants = {
  below: { opacity: 0, y: FLOW_OFFSET, filter: FLOW_BLUR, transition: { duration: 0 } },
  above: { opacity: 0, y: -FLOW_OFFSET, filter: FLOW_BLUR, transition: { duration: 0 } },
  visible: { opacity: 1, y: 0, filter: 'blur(0px)', transition: flowTransition },
};

export default function Flow({ children, className }) {
  const reduceMotion = useReducedMotion();
  const ref = useRef(null);
  const [state, setState] = useState('below');

  useEffect(() => {
    const node = ref.current;
    if (reduceMotion || !node) return undefined;
    // The bottom margin makes a block count as "in" once it is ~12% up the screen.
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setState('visible');
        else setState(entry.boundingClientRect.top < 0 ? 'above' : 'below');
      },
      { rootMargin: '0px 0px -12% 0px' },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [reduceMotion]);

  if (reduceMotion) return <div className={className}>{children}</div>;
  return (
    <motion.div ref={ref} className={className} initial="below" animate={state} variants={flowVariants}>
      {children}
    </motion.div>
  );
}
