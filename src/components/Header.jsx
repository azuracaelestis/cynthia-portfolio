import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import profilePicture from '../assets/hero/profile-picture/cynthia-profile-picture.svg';
import { useHasScrolled } from '../hooks/useHasScrolled';
import { useActiveSection } from '../hooks/useActiveSection';

const NAV_ITEMS = [
  { label: 'Home', href: '#home' },
  { label: 'Work', href: '#work' },
  { label: 'About', href: '#about' },
];

const SECTION_IDS = NAV_ITEMS.map((item) => item.href.slice(1));

export default function Header() {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const displayIndex = hoveredIndex ?? selectedIndex;
  const isHovering = hoveredIndex !== null;
  const hasScrolled = useHasScrolled();
  const activeId = useActiveSection(SECTION_IDS);

  useEffect(() => {
    const idx = NAV_ITEMS.findIndex((item) => item.href === `#${activeId}`);
    if (idx !== -1) setSelectedIndex(idx);
  }, [activeId]);

  return (
    <>
      <header className="absolute top-0 inset-x-0 z-40 bg-paper/80 backdrop-blur-sm">
        <div className="mx-auto max-w-7xl px-6 lg:px-10 py-5 flex items-center justify-between gap-6">
          <a href="#home" className="group flex items-center gap-3 shrink-0">
            <span className="w-8 h-8 lg:w-[65px] lg:h-[65px] rounded-full bg-sky-100 flex items-center justify-center overflow-hidden transition-transform duration-200 group-hover:scale-110">
              <img src={profilePicture} alt="Cynthia Tanawi" className="w-full h-full rounded-full object-cover" />
            </span>
            <span className="font-dm font-semibold text-[16px] lg:text-[20px] text-ink whitespace-nowrap transition-colors group-hover:text-about-blue">Cynthia Tanawi</span>
          </a>

          <a
            href="mailto:azuracaelestis@outlook.com?subject=Let%27s%20connect&body=Hi%20Cynthia%2C%0A%0A"
            className="font-dm h-auto lg:h-12 rounded-full bg-ink hover:bg-charcoal active:bg-charcoal transition-colors px-4 py-2 lg:px-6 lg:py-3 text-xs lg:text-sm font-semibold text-white flex items-center gap-2 shrink-0"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="3" y="5" width="18" height="14" rx="2" />
              <path d="M3 7l9 6 9-6" />
            </svg>
            Let's Talk
          </a>
        </div>
      </header>

      <nav
        className={`hidden md:flex fixed top-5 left-1/2 -translate-x-1/2 z-50 items-center gap-1 bg-sky-50 rounded-full h-[70px] px-4 py-4 transition-shadow duration-200 ${
          hasScrolled ? 'shadow-md' : ''
        }`}
        onMouseLeave={() => setHoveredIndex(null)}
      >
        {NAV_ITEMS.map((item, i) => (
          <a
            key={item.label}
            href={item.href}
            onMouseEnter={() => setHoveredIndex(i)}
            onClick={() => setSelectedIndex(i)}
            className="font-dm relative rounded-full px-5 py-2 font-semibold text-[16px]"
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
          </a>
        ))}
      </nav>

      <nav
        aria-label="Mobile"
        className="md:hidden fixed bottom-4 left-1/2 -translate-x-1/2 z-50 flex items-center gap-1 bg-sky-50 rounded-full px-3 pt-2 pb-[calc(0.5rem+env(safe-area-inset-bottom))] shadow-md"
      >
        {NAV_ITEMS.map((item, i) => (
          <a
            key={item.label}
            href={item.href}
            onClick={() => setSelectedIndex(i)}
            aria-current={selectedIndex === i ? 'page' : undefined}
            className="font-dm relative min-h-[44px] flex items-center justify-center rounded-full px-4 font-semibold text-[14px]"
          >
            {selectedIndex === i && (
              <motion.span
                layoutId="mobile-nav-highlight"
                className="absolute inset-0 rounded-full bg-[#1A87D5]"
                transition={{ type: 'spring', stiffness: 500, damping: 35 }}
              />
            )}
            <span className={`relative z-10 transition-colors ${selectedIndex === i ? 'text-white' : 'text-ink'}`}>
              {item.label}
            </span>
          </a>
        ))}
      </nav>
    </>
  );
}
