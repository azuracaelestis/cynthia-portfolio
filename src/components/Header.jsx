import { useEffect, useRef, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import hatIcon from '../assets/hero/character/hat-icon.svg';
import { useHasScrolled } from '../hooks/useHasScrolled';
import { useActiveSection } from '../hooks/useActiveSection';

const NAV_ITEMS = [
  { label: 'Home', href: '#home' },
  { label: 'Work', href: '#work' },
  { label: 'About', href: '#about' },
];

const SECTION_IDS = NAV_ITEMS.map((item) => item.href.slice(1));

export default function Header() {
  const location = useLocation();
  const isHome = location.pathname === '/';
  const isTfam = location.pathname === '/work/tfam-app';
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const effectiveSelectedIndex = isHome ? selectedIndex : null;
  const displayIndex = hoveredIndex ?? effectiveSelectedIndex;
  const isHovering = hoveredIndex !== null;
  const hasScrolled = useHasScrolled();
  const activeId = useActiveSection(SECTION_IDS);
  const reduceMotion = useReducedMotion();
  const [navHidden, setNavHidden] = useState(false);
  const lastScrollY = useRef(0);

  useEffect(() => {
    if (!isHome) return;
    const idx = NAV_ITEMS.findIndex((item) => item.href === `#${activeId}`);
    if (idx !== -1) setSelectedIndex(idx);
  }, [activeId, isHome]);

  useEffect(() => {
    lastScrollY.current = window.scrollY;

    function handleScroll() {
      const y = window.scrollY;
      if (y > lastScrollY.current && y > 80) {
        setNavHidden(true);
      } else if (y < lastScrollY.current) {
        setNavHidden(false);
      }
      lastScrollY.current = y;
    }

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <header className={`md:hidden absolute top-0 inset-x-0 z-40 ${isTfam ? '' : 'bg-paper/80 backdrop-blur-sm'}`}>
        <div className="mx-auto max-w-7xl px-6 lg:px-10 py-5 flex items-center justify-between gap-6">
          <Link to="/" className="group flex items-center gap-3 shrink-0">
            {/* Icon tips right + grows on hover. Both are plain CSS driven by
                the Link's `group`, so hovering the name tips the hat too —
                with framer's `whileHover` on the img, the rotate only fired
                when the cursor was over the image itself, while the scale
                fired from anywhere on the link. `index.css`'s global
                prefers-reduced-motion rule neutralises both transitions. */}
            <span className="w-[30.4px] h-[30.4px] lg:w-[61.75px] lg:h-[61.75px] flex items-center justify-center shrink-0">
              <img
                src={hatIcon}
                alt="Cynthia Tanawi"
                className="w-full h-full object-contain origin-center transition-transform duration-200 ease-out group-hover:rotate-[20deg] group-hover:scale-110"
              />
            </span>
            <span className="font-satoshi font-semibold text-[16px] lg:text-[20px] text-ink whitespace-nowrap transition-colors group-hover:text-about-blue">Cynthia Tanawi</span>
          </Link>

          <a
            href="mailto:azuracaelestis@outlook.com?subject=Let%27s%20connect&body=Hi%20Cynthia%2C%0A%0A"
            className="font-satoshi h-auto lg:h-12 rounded-full bg-ink hover:bg-charcoal active:bg-charcoal transition-colors px-4 py-2 lg:px-6 lg:py-3 text-xs lg:text-sm font-semibold text-white flex items-center gap-2 shrink-0"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="3" y="5" width="18" height="14" rx="2" />
              <path d="M3 7l9 6 9-6" />
            </svg>
            Let's Talk
          </a>
        </div>
      </header>

      {/* Desktop/tablet nav: logo, links, and CTA share one bar so it always
          has the pill's solid bg-sky-50 background, legible against any
          hero (including TFAM's dark bg-ink) — unlike the old split header,
          which went transparent on TFAM and left the dark logo text/CTA
          invisible against the dark hero. Grid (not flex-justify-between)
          keeps the center links group truly centered regardless of the
          logo and CTA columns having different widths. */}
      <motion.nav
        className={`hidden md:flex fixed top-5 left-1/2 z-50 items-center gap-6 lg:gap-8 bg-sky-50 rounded-full h-[63px] lg:h-[68px] px-5 lg:px-6 transition-shadow duration-200 ${
          hasScrolled ? 'shadow-md' : ''
        }`}
        animate={{ y: navHidden ? '-150%' : '0%', opacity: navHidden ? 0 : 1 }}
        initial={false}
        transition={{ duration: reduceMotion ? 0 : 0.3, ease: 'easeInOut' }}
        style={{ x: '-50%' }}
      >
        <Link to="/" className="group flex items-center gap-2 shrink-0">
          <span className="w-[27px] h-[27px] lg:w-[40px] lg:h-[40px] flex items-center justify-center shrink-0">
            <img
              src={hatIcon}
              alt="Cynthia Tanawi"
              className="w-full h-full object-contain origin-center transition-transform duration-200 ease-out group-hover:rotate-[20deg] group-hover:scale-110"
            />
          </span>
          <span className="font-satoshi font-semibold text-[14px] lg:text-[16px] text-ink whitespace-nowrap transition-colors group-hover:text-about-blue">Cynthia Tanawi</span>
        </Link>

        <div className="flex items-center gap-1" onMouseLeave={() => setHoveredIndex(null)}>
          {NAV_ITEMS.map((item, i) => {
            const ItemTag = isHome ? 'a' : Link;
            const itemLinkProps = isHome ? { href: item.href } : { to: `/${item.href}` };
            return (
              <ItemTag
                key={item.label}
                {...itemLinkProps}
                onMouseEnter={() => setHoveredIndex(i)}
                onClick={() => setSelectedIndex(i)}
                className="font-satoshi relative rounded-full px-4 py-1.5 font-semibold text-[14px]"
              >
                {displayIndex === i && (
                  <motion.span
                    layoutId="nav-highlight"
                    className="absolute inset-0 rounded-full"
                    animate={{ backgroundColor: isHovering ? '#B0DDF8' : '#1A87D5' }}
                    transition={{ type: 'spring', stiffness: 500, damping: 35 }}
                  />
                )}
                <span
                  className={`relative z-10 transition-colors ${
                    displayIndex === i ? (isHovering ? 'text-ink' : 'text-white') : 'text-black'
                  }`}
                >
                  {item.label}
                </span>
              </ItemTag>
            );
          })}
        </div>

        <a
          href="mailto:azuracaelestis@outlook.com?subject=Let%27s%20connect&body=Hi%20Cynthia%2C%0A%0A"
          className="font-satoshi h-9 lg:h-[42px] rounded-full bg-ink hover:bg-charcoal active:bg-charcoal transition-colors px-3 lg:px-5 text-xs lg:text-sm font-semibold text-white flex items-center gap-1.5 shrink-0"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <rect x="3" y="5" width="18" height="14" rx="2" />
            <path d="M3 7l9 6 9-6" />
          </svg>
          Let's Talk
        </a>
      </motion.nav>

      <nav
        aria-label="Mobile"
        className="md:hidden fixed bottom-4 left-1/2 -translate-x-1/2 z-50 flex items-center gap-1 bg-sky-50 rounded-full px-3 pt-2 pb-[calc(0.5rem+env(safe-area-inset-bottom))] shadow-md"
      >
        {NAV_ITEMS.map((item, i) => {
          const ItemTag = isHome ? 'a' : Link;
          const itemLinkProps = isHome ? { href: item.href } : { to: `/${item.href}` };
          return (
            <ItemTag
              key={item.label}
              {...itemLinkProps}
              onClick={() => setSelectedIndex(i)}
              aria-current={effectiveSelectedIndex === i ? 'page' : undefined}
              className="font-satoshi relative min-h-[44px] flex items-center justify-center rounded-full px-4 font-semibold text-[14px]"
            >
              {effectiveSelectedIndex === i && (
                <motion.span
                  layoutId="mobile-nav-highlight"
                  className="absolute inset-0 rounded-full bg-[#1A87D5]"
                  transition={{ type: 'spring', stiffness: 500, damping: 35 }}
                />
              )}
              <span className={`relative z-10 transition-colors ${effectiveSelectedIndex === i ? 'text-white' : 'text-ink'}`}>
                {item.label}
              </span>
            </ItemTag>
          );
        })}
      </nav>
    </>
  );
}
