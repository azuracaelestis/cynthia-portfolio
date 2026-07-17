import { motion } from 'framer-motion';
import frictionIcon from '../assets/my design practice/icon/01-designing-from-friction.svg';
import pushbackIcon from '../assets/my design practice/icon/02-welcoming-pushback.svg';
import unfamiliarIcon from '../assets/my design practice/icon/03-choosing-the-unfamiliar.svg';
import blueFlower from '../assets/my design practice/element-decoration/element5.svg';
import yellowSunburst from '../assets/my design practice/element-decoration/element6.svg';

const CARDS = [
  {
    title: 'Designing From Friction',
    body: 'I frame projects as human stories first — a moment of real friction becomes the brief, not a feature list.',
    bg: 'bg-[#F2EFE8]',
    rotate: -4,
    offset: 'lg:translate-y-2',
    icon: frictionIcon,
  },
  {
    title: 'Welcoming Pushback',
    body: 'I treat my first solution as a hypothesis, inviting other perspectives early, before a design is too expensive to change.',
    bg: 'bg-[#E7F5FD]',
    rotate: 2,
    offset: 'lg:-translate-y-3',
    icon: pushbackIcon,
  },
  {
    title: 'Choosing the Unfamiliar',
    body: 'I treat unfamiliar tools, domains, and constraints as the interesting part of a problem — not the risky part.',
    bg: 'bg-[#FCEDBA]',
    rotate: -2,
    offset: 'lg:translate-y-4',
    icon: unfamiliarIcon,
  },
];

export default function DesignPractice() {
  return (
    <section className="relative lg:z-10 lg:-mt-[185px]">
      <div className="relative mx-auto max-w-[1302px] rounded-t-[32px] bg-bleed-blue px-6 lg:px-10 pt-28 pb-28 overflow-hidden">
        <motion.img
          src={blueFlower}
          alt=""
          aria-hidden="true"
          className="pointer-events-none absolute top-10 left-10 lg:top-16 lg:left-16 w-[76px] h-[76px]"
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.img
          src={yellowSunburst}
          alt=""
          aria-hidden="true"
          className="pointer-events-none absolute top-20 right-10 lg:top-24 lg:right-16 w-20 lg:w-[97px]"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 6.5, delay: 0.8, repeat: Infinity, ease: 'easeInOut' }}
        />
        <div className="text-center font-dm">
          <span className="inline-block rounded-[16px] bg-[#8CCFF3] text-black font-semibold text-[16px] px-6 py-3">
            My Design Practice
          </span>
          <h2 className="mt-8 font-extrabold text-[44px] text-ink">
            Story-Driven, Collaborative, Fearless
          </h2>

          <div className="mt-16 grid sm:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-6">
            {CARDS.map((card) => (
              <div
                key={card.title}
                className={`group ${card.offset} rotate-[var(--r)] transition-transform duration-300 ease-out hover:-translate-y-4 hover:rotate-0`}
                style={{ '--r': `${card.rotate}deg` }}
              >
                <div
                  className={`aspect-square ${card.bg} rounded-2xl p-7 flex flex-col items-center justify-center text-center shadow-md group-hover:shadow-2xl transition-shadow duration-300`}
                >
                  <img src={card.icon} alt="" className="h-[50px] w-auto mb-5" />
                  <h3 className="font-bold text-2xl text-ink">{card.title}</h3>
                  <p className="mt-3 text-base leading-relaxed text-black">{card.body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
