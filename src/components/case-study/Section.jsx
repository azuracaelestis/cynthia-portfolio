import { motion, useReducedMotion } from 'framer-motion';
import Flow from '../Flow';

const revealVariants = { hidden: { opacity: 0, y: 8 }, visible: { opacity: 1, y: 0 } };
const revealVariantsReduced = { hidden: { opacity: 0 }, visible: { opacity: 1 } };
const revealTransition = { duration: 0.4, ease: [0, 0, 0.2, 1] };
const revealTransitionReduced = { duration: 0 };
const revealViewport = { once: true, margin: '0px 0px -20% 0px' };

export default function Section({
  id,
  eyebrow,
  title,
  children,
  eyebrowClassName = 'mb-4 lg:mb-3',
  eyebrowColor = 'text-case-study-blue',
  titleClassName = 'mb-6',
  flow = false, // use the scroll "flow" reveal (see Flow.jsx) for the eyebrow and title
}) {
  const reduceMotion = useReducedMotion();
  const variants = reduceMotion ? revealVariantsReduced : revealVariants;
  const transition = reduceMotion ? revealTransitionReduced : revealTransition;

  return (
    <section id={id} className="scroll-mt-28 pt-24 lg:pt-[120px] first:pt-0">
      {eyebrow &&
        (flow ? (
          <Flow>
            <p className={`font-satoshi font-bold text-[16px] ${eyebrowColor} ${eyebrowClassName}`}>{eyebrow}</p>
          </Flow>
        ) : (
          <motion.p
            initial="hidden"
            whileInView="visible"
            viewport={revealViewport}
            variants={variants}
            transition={transition}
            className={`font-satoshi font-bold text-[16px] ${eyebrowColor} ${eyebrowClassName}`}
          >
            {eyebrow}
          </motion.p>
        ))}
      {title &&
        (flow ? (
          <Flow>
            <h2 className={`font-satoshi font-bold text-[28px] lg:text-[36px] text-ink leading-tight ${titleClassName}`}>{title}</h2>
          </Flow>
        ) : (
          <motion.h2
            initial="hidden"
            whileInView="visible"
            viewport={revealViewport}
            variants={variants}
            transition={transition}
            className={`font-satoshi font-bold text-[28px] lg:text-[36px] text-ink leading-tight ${titleClassName}`}
          >
            {title}
          </motion.h2>
        ))}
      {children}
    </section>
  );
}
