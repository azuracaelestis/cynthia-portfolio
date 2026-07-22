import { motion, useReducedMotion } from 'framer-motion';
import frictionIcon from '../assets/my design practice/icon/01-designing-from-friction.svg';
import pushbackIcon from '../assets/my design practice/icon/02-welcoming-pushback.svg';
import unfamiliarIcon from '../assets/my design practice/icon/03-choosing-the-unfamiliar.svg';
import blueFlower from '../assets/my design practice/element-decoration/element5.svg';
import yellowSunburst from '../assets/my design practice/element-decoration/element6.svg';

const CARDS = [
  {
    title: 'Designing From Friction',
    body: 'I frame every project as a human story first, so a real moment of friction becomes the brief, not a feature list.',
    bg: 'bg-[#F2EFE8]',
    rotate: -4,
    offset: 'lg:translate-y-2',
    icon: frictionIcon,
  },
  {
    title: 'Welcoming Pushback',
    body: 'My first solution is only a hypothesis, so I invite perspectives early, before a design gets too expensive to change.',
    bg: 'bg-[#E7F5FD]',
    rotate: 2,
    offset: 'lg:-translate-y-3',
    icon: pushbackIcon,
  },
  {
    title: 'Choosing the Unfamiliar',
    body: 'I treat unfamiliar tools, domains, and constraints as the interesting part of a problem, not the risky part.',
    bg: 'bg-[#FCEDBA]',
    rotate: -2,
    offset: 'lg:translate-y-4',
    icon: unfamiliarIcon,
  },
];

export default function DesignPractice() {
  const reduceMotion = useReducedMotion();

  return (
    <section className="relative z-10 -mt-[180px] lg:-mt-[185px]">
      <div className="relative mx-auto max-w-[1302px] rounded-t-[32px] rounded-b-[32px] lg:rounded-b-none bg-bleed-blue px-6 lg:px-10 pt-16 pb-16 lg:pt-28 lg:pb-28 overflow-visible sm:overflow-hidden">
        <motion.img
          src={blueFlower}
          alt=""
          aria-hidden="true"
          className="hidden lg:block pointer-events-none absolute top-[72px] left-[17px] w-[39px] h-[39px] lg:top-16 lg:left-16 lg:w-[76px] lg:h-[76px]"
          animate={{ y: [0, -10, 0] }}
          transition={{ default: { duration: 6, repeat: Infinity, ease: 'easeInOut' }, rotate: { duration: 2, ease: 'easeInOut' } }}
          whileHover={reduceMotion ? undefined : { rotate: 360 }}
        />
        <motion.img
          src={yellowSunburst}
          alt=""
          aria-hidden="true"
          className="hidden lg:block pointer-events-none absolute top-[192px] right-[12px] w-[38px] h-[38px] lg:top-24 lg:right-16 lg:w-[92px] lg:h-[92px]"
          animate={{ y: [0, 10, 0] }}
          transition={{ default: { duration: 6.5, delay: 0.8, repeat: Infinity, ease: 'easeInOut' }, rotate: { duration: 2, ease: 'easeInOut' } }}
          whileHover={reduceMotion ? undefined : { rotate: 360 }}
        />
        <div className="text-center font-dm">
          <span className="inline-block -rotate-3 rounded-[8px] lg:rounded-[16px] bg-[#8CCFF3] text-black font-semibold text-[12px] lg:text-[16px] px-4 py-1 lg:px-6 lg:py-3">
            My Design Practice
          </span>
          <h2 className="mt-3 lg:mt-8 font-extrabold text-[32px] md:text-[36px] lg:text-[44px] leading-[34px] lg:leading-normal text-ink">
            Story-Driven, Collaborative, &amp; Curious
          </h2>

          <div className="mt-8 lg:mt-16 flex flex-col sm:grid sm:grid-cols-2 lg:grid-cols-3 gap-[28px] sm:gap-[20px] lg:gap-6">
            {CARDS.map((card, i) => (
              <div
                key={card.title}
                className={`group ${card.offset} ${reduceMotion ? '' : 'sticky sm:static'} rotate-[var(--r)] transition-transform duration-300 ease-out hover:-translate-y-4 hover:rotate-0`}
                style={{
                  '--r': `${card.rotate}deg`,
                  top: reduceMotion ? undefined : `calc(6rem + ${i * 1.5}rem)`,
                  zIndex: i + 1,
                }}
              >
                <div
                  className={`h-[300px] lg:aspect-square lg:h-auto ${card.bg} rounded-2xl px-6 py-8 lg:p-7 flex flex-col items-center justify-center text-center shadow-md group-hover:shadow-2xl transition-shadow duration-300`}
                >
                  <img src={card.icon} alt="" className="h-[50px] w-auto mb-8 lg:mb-5" />
                  <h3 className="font-bold text-lg md:text-xl lg:text-2xl text-ink">{card.title}</h3>
                  <p className="mt-[18px] lg:mt-3 text-[16px] md:text-[18px] lg:text-[20px] leading-relaxed text-black">{card.body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
