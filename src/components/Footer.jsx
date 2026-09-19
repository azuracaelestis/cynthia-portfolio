import { useLocation } from 'react-router-dom';
import { motion, useReducedMotion } from 'framer-motion';
import { useMediaQuery } from '../hooks/useMediaQuery';
import yellowSunburst from '../assets/footer/element10.svg';
import blueFlower from '../assets/footer/element9.svg';
import linkedinIcon from '../assets/footer/icon/linkedin.svg';
import resumeIcon from '../assets/footer/icon/resume.svg';

// Same reveal as the header's "Let's Talk" icon: hidden and collapsed at
// rest, grows in on hover — the wrapper's width/margin animate alongside the
// icon's own scale/opacity, so the button visibly widens rather than the
// icon just fading into a fixed slot. Desktop (pointer) only: below `lg`,
// touch has no hover state, so the icon stays exactly as it always was —
// always visible, sized by the footer's own w-6/h-6 mobile classes.
function FooterIcon({ children, isDesktopHover, reduceMotion }) {
  if (!isDesktopHover) {
    return <span className="inline-flex w-6 h-6">{children}</span>;
  }
  const transition = { duration: reduceMotion ? 0 : 0.6, ease: [0.22, 1, 0.36, 1] };
  return (
    <motion.span
      className="inline-flex items-center overflow-hidden"
      variants={{ rest: { width: 0, marginRight: 0 }, hover: { width: 16, marginRight: 8 } }}
      transition={transition}
    >
      <motion.span
        className="inline-flex w-4 h-4 shrink-0"
        variants={{ rest: { opacity: 0, scale: 0 }, hover: { opacity: 1, scale: 1 } }}
        transition={transition}
      >
        {children}
      </motion.span>
    </motion.span>
  );
}

export default function Footer() {
  const location = useLocation();
  const isCaseStudy = location.pathname.startsWith('/work/');
  const isDesktopHover = useMediaQuery('(min-width: 1024px)');
  // TFAM's own page background is white (bg-paper, see TfamApp.jsx), not the
  // cream every other case-study page defaults to — so its footer shouldn't
  // pick up the cream tint either. Other case-study pages (e.g. Classroom
  // Quest) keep it, since their page background is still cream and the
  // footer is meant to blend into it seamlessly.
  const isTfamApp = location.pathname.startsWith('/work/tfam-app');
  const reduceMotion = useReducedMotion();

  return (
    <footer
      id="contact"
      className={`mx-[6px] lg:mx-0 rounded-t-[32px] bg-bleed-blue pt-[34px] pb-[120px] lg:rounded-t-none lg:pt-12 lg:pb-0 ${
        isCaseStudy && !isTfamApp ? 'lg:bg-case-study-cream' : 'lg:bg-transparent'
      }`}
    >
      <div className="relative mx-auto max-w-[1302px] rounded-t-[32px] bg-bleed-blue px-0 lg:px-10 pt-[56px] lg:pt-24 pb-12 text-center overflow-hidden">
        <motion.img
          src={yellowSunburst}
          alt=""
          aria-hidden="true"
          className="hidden lg:block pointer-events-none absolute lg:left-[10%] lg:top-[238px] lg:w-[107px] lg:h-[107px] z-20"
          animate={reduceMotion ? undefined : { y: [0, -10, 0] }}
          transition={reduceMotion ? undefined : { duration: 6, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.img
          src={blueFlower}
          alt=""
          aria-hidden="true"
          className="hidden lg:block pointer-events-none absolute lg:right-[8%] lg:top-[240px] lg:w-[174px] lg:h-[174px] z-20"
          animate={reduceMotion ? undefined : { y: [0, -10, 0] }}
          transition={reduceMotion ? undefined : { duration: 7, delay: 0.4, repeat: Infinity, ease: 'easeInOut' }}
        />

        <h2 className="font-satoshi font-bold text-[36px] leading-[40px] md:text-[48px] md:leading-[54px] lg:text-[64px] lg:leading-[70px] text-ink">
          {isCaseStudy ? (
            <>
              Still here?<br className="lg:hidden" /> That's a good sign.
              <br />
              Let's chat!
            </>
          ) : (
            <>
              Are we vibing?
              <br />
              Let's Connect!
            </>
          )}
        </h2>

        <div className="mt-8 flex flex-col gap-[15px] px-[18px] lg:flex-row lg:flex-wrap lg:justify-center lg:gap-4 lg:px-0">
          <motion.a
            href="mailto:azuracaelestis@outlook.com?subject=Let%27s%20connect&body=Hi%20Cynthia%2C%0A%0A"
            initial="rest"
            whileHover="hover"
            className="font-satoshi h-12 w-full lg:w-auto rounded-full bg-ink active:bg-charcoal transition-colors px-6 py-3 font-semibold text-white flex items-center justify-center gap-[10px] lg:gap-0"
          >
            <FooterIcon isDesktopHover={isDesktopHover} reduceMotion={reduceMotion}>
              <svg className="w-full h-full" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="3" y="5" width="18" height="14" rx="2" />
                <path d="M3 7l9 6 9-6" />
              </svg>
            </FooterIcon>
            Email
          </motion.a>
          <motion.a
            href="https://www.linkedin.com/in/cynthia-tanawi/"
            target="_blank"
            rel="noreferrer"
            initial="rest"
            whileHover="hover"
            className="font-satoshi h-12 w-full lg:w-auto rounded-full border border-black bg-white active:bg-amber-550 transition-colors px-6 py-3 font-semibold text-ink flex items-center justify-center gap-[10px] lg:gap-0"
          >
            <FooterIcon isDesktopHover={isDesktopHover} reduceMotion={reduceMotion}>
              <img src={linkedinIcon} alt="" className="w-full h-full" />
            </FooterIcon>
            LinkedIn
          </motion.a>
          <motion.a
            href="https://drive.google.com/file/d/1V_B6y68jByI4LLJNXn_PNNCMN525ZXL2/view?usp=sharing"
            target="_blank"
            rel="noreferrer"
            initial="rest"
            whileHover="hover"
            className="font-satoshi h-12 w-full lg:w-auto rounded-full border border-black bg-white active:bg-amber-550 transition-colors px-6 py-3 font-semibold text-ink flex items-center justify-center gap-[10px] lg:gap-0"
          >
            <FooterIcon isDesktopHover={isDesktopHover} reduceMotion={reduceMotion}>
              <img src={resumeIcon} alt="" className="w-full h-full" />
            </FooterIcon>
            Resume
          </motion.a>
        </div>

        <div className="font-satoshi mt-[52px] sm:mt-20 flex flex-col sm:flex-row items-center justify-between gap-[40px] sm:gap-4 text-sm text-black sm:pt-6">
          <nav className="flex gap-[20px] sm:gap-6">
            <a href="#home" className="group relative font-bold text-[16px] text-ink transition-colors">
              Home
              <span className="pointer-events-none absolute left-0 -bottom-1 h-[2px] w-full rounded-full bg-black scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
            </a>
            <a href="#work" className="group relative font-bold text-[16px] text-ink transition-colors">
              Work
              <span className="pointer-events-none absolute left-0 -bottom-1 h-[2px] w-full rounded-full bg-black scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
            </a>
            <a href="#about" className="group relative font-bold text-[16px] text-ink transition-colors">
              About
              <span className="pointer-events-none absolute left-0 -bottom-1 h-[2px] w-full rounded-full bg-black scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
            </a>
          </nav>
          <p className="font-medium">© 2026 Cynthia Tanawi. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
}
