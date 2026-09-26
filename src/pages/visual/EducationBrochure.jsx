import { Helmet } from 'react-helmet-async';
import Flow from '../../components/Flow';
import { motion, useReducedMotion } from 'framer-motion';
import pageOne from '../../assets/visual/education-brochure/page-1.jpg';
import spreadVideo from '../../assets/visual/education-brochure/spread-viewboard.mp4';
import spreadPoster from '../../assets/visual/education-brochure/spread-viewboard-poster.jpg';
import pageThree from '../../assets/visual/education-brochure/page-3.jpg';

// Case-study page for the Education Brochure 2026 visual project, built from
// the Figma frame (node 360:625, 1440 wide). The site's own nav and footer
// wrap it. Layout: intro (eyebrow, title, three principles), then the
// brochure pages, with a 269px Role / Overview column at the right of the intro. Horizontal margins
// match the homepage (max-w-7xl, px-6 / lg:px-10) rather than the frame's
// own 112px inset, so the image column is 883px wide at 1440 instead of 911.
const PRINCIPLES = [
  {
    title: '01. Global by Design',
    body: 'A more universal visual language that helps K–12 and Higher Education audiences navigate the same education ecosystem.',
  },
  {
    title: '02. Consistent Brand',
    body: 'Education imagery paired with Finch-inspired brand elements to create a more consistent connection to the wider ViewSonic brand.',
  },
  {
    title: '03. Built to Adapt',
    body: 'A modular content system that lets regional teams localize products and messaging without disrupting the overall structure.',
  },
];

const PAGES = [
  { src: pageOne, alt: 'Education Brochure 2026 cover, "Growing Together"' },
  { src: spreadVideo, poster: spreadPoster, alt: 'Brochure spread: ViewBoard Interactive Displays' },
  { src: pageThree, alt: 'Brochure spread: Creative Monitors' },
];

// Shared scroll-reveal recipe (same fade + rise the case-study pages use).
const revealVariants = { hidden: { opacity: 0, y: 8 }, visible: { opacity: 1, y: 0 } };
const revealVariantsReduced = { hidden: { opacity: 0 }, visible: { opacity: 1 } };
const revealViewport = { once: true, margin: '0px 0px -10% 0px' };

function Reveal({ children, className, delay = 0 }) {
  const reduceMotion = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={revealViewport}
      variants={reduceMotion ? revealVariantsReduced : revealVariants}
      transition={{ duration: reduceMotion ? 0 : 0.4, delay: reduceMotion ? 0 : delay, ease: [0, 0, 0.2, 1] }}
    >
      {children}
    </motion.div>
  );
}

export default function EducationBrochure() {
  const reduceMotion = useReducedMotion();

  return (
    <>
      <Helmet>
        <title>Education Brochure 2026 — Cynthia Tanawi</title>
        <link rel="canonical" href="https://cynthiatanawi.design/visual-design/education-brochure-2026" />
        <meta
          name="description"
          content="A modular brochure system that makes the ViewSonic education ecosystem clearer across global markets."
        />
        <meta property="og:type" content="article" />
        <meta property="og:title" content="Education Brochure 2026 — Cynthia Tanawi" />
        <meta
          property="og:description"
          content="A modular brochure system that makes the ViewSonic education ecosystem clearer across global markets."
        />
      </Helmet>

      <div className="bg-white">
        <div className="mx-auto max-w-7xl px-6 lg:px-10 pt-[140px] lg:pt-[221px] pb-6 lg:pb-[54px]">
          {/* Two columns from lg: the intro, principles and brochure pages stack
              on the left; Role / Overview sits in the right column starting at
              the top, level with the eyebrow. Below lg the left wrapper is
              `display: contents` so `order` can slot Role / Overview between
              the title and the principles. */}
          <div className="flex flex-col lg:grid lg:grid-cols-[minmax(0,1fr)_269px] lg:gap-x-12">
            <div className="contents lg:block">
              <Reveal className="order-1">
                <p className="font-satoshi font-medium text-[18px] lg:text-[24px] text-black">2026 ViewSonic Education Brochure</p>
                <h1 className="mt-3 font-satoshi font-bold text-[32px] leading-[40px] lg:text-[48px] lg:leading-[60px] text-black">
                  Designed for Clarity Across Markets
                </h1>
              </Reveal>

              <Flow className="order-3 mt-10 lg:mt-14 grid grid-cols-1 gap-8 lg:grid-cols-[237px_237px_256px] lg:gap-7">
                {PRINCIPLES.map((item) => (
                  <div key={item.title} className="flex flex-col gap-5">
                    <h2 className="font-satoshi font-bold text-[20px] leading-6 text-black">{item.title}</h2>
                    <p className="font-satoshi text-[16px] leading-[22px] text-black">{item.body}</p>
                  </div>
                ))}
              </Flow>

              <div className="order-4 mt-10 flex flex-col gap-8">
                {PAGES.map((page, i) => (
                  <Flow key={page.src}>
                    {page.poster ? (
                      // Looping, muted clip (autoplay is only allowed muted). With
                      // reduced motion it stays on its poster frame.
                      <video
                        src={page.src}
                        poster={page.poster}
                        aria-label={page.alt}
                        className="aspect-[911/613] w-full rounded-2xl object-cover"
                        autoPlay={!reduceMotion}
                        loop
                        muted
                        playsInline
                        preload="auto"
                      />
                    ) : (
                      <img
                        src={page.src}
                        alt={page.alt}
                        className="aspect-[911/613] w-full rounded-2xl object-cover"
                        loading={i === 0 ? 'eager' : 'lazy'}
                      />
                    )}
                  </Flow>
                ))}
              </div>
            </div>

            {/* The grid cell spans the whole left column, so the sticky child
                stays pinned (below the nav) while the pages scroll past. */}
            <div className="order-2 mt-10 lg:col-start-2 lg:row-start-1 lg:mt-0">
              <div className="lg:sticky lg:top-[120px]">
              <Reveal delay={0.12} className="flex flex-col gap-16">
                <div className="flex flex-col gap-2">
                  <h2 className="font-satoshi font-bold text-[20px] text-black">Role</h2>
                  <p className="font-satoshi text-[16px] text-black">Brand &amp; Editorial</p>
                </div>
                <div className="flex flex-col gap-2">
                  <h2 className="font-satoshi font-bold text-[20px] text-black">Overview</h2>
                  <p className="font-satoshi text-[16px] leading-[1.25] text-black">
                    Redesigned the 2026 ViewSonic Education brochure as a modular global system for K–12 and Higher Education. The new
                    direction unified Education with the broader ViewSonic brand while making regional product customization easier.
                  </p>
                </div>
              </Reveal>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
