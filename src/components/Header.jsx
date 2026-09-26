import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import hatIcon from '../assets/hero/character/hat-icon.svg';
import { useHasScrolled } from '../hooks/useHasScrolled';
import { useActiveSection } from '../hooks/useActiveSection';

const NAV_ITEMS = [
  { label: 'Home', href: '#home' },
  { label: 'Product', href: '#work' },
  { label: 'Visual', to: '/visual-design' },
  { label: 'About', href: '#about' },
];

// Only the in-page anchors take part in scroll-spy; 'Visual' is its own page.
const SECTION_IDS = NAV_ITEMS.filter((item) => item.href).map((item) => item.href.slice(1));

// The nav highlight (the pill behind the selected / hovered item) slides
// between items by animating its measured x / y / size — position relative to
// the bar (offsetLeft / offsetTop), never the page. A shared-layout animation
// (framer's layoutId) was used before, but it measures in page coordinates, so
// a route change that resets the scroll to the top (tapping Visual from far
// down the home page) made the pill fly in from the old scroll offset instead
// of sliding between items. Returns the last measured rect (so the pill can
// fade out in place) and whether an item is currently selected.
function useItemRect(containerRef, itemRefs, index) {
  const [rect, setRect] = useState(null);
  useLayoutEffect(() => {
    const measure = () => {
      const el = index == null ? null : itemRefs.current[index];
      if (el) setRect({ x: el.offsetLeft, y: el.offsetTop, w: el.offsetWidth, h: el.offsetHeight });
    };
    measure();
    const container = containerRef.current;
    const observer = typeof ResizeObserver !== 'undefined' && container ? new ResizeObserver(measure) : null;
    observer?.observe(container);
    window.addEventListener('resize', measure);
    document.fonts?.ready.then(measure);
    return () => {
      observer?.disconnect();
      window.removeEventListener('resize', measure);
    };
  }, [containerRef, itemRefs, index]);
  return { rect, visible: index != null };
}

function NavHighlight({ rect, visible, color, reduceMotion }) {
  if (!rect) return null;
  return (
    <motion.span
      aria-hidden="true"
      className="pointer-events-none absolute left-0 top-0 rounded-full"
      initial={false}
      animate={{ x: rect.x, y: rect.y, width: rect.w, height: rect.h, opacity: visible ? 1 : 0, backgroundColor: color }}
      transition={reduceMotion ? { duration: 0 } : { type: 'spring', stiffness: 500, damping: 35 }}
    />
  );
}

// Anchor items scroll within the home page (or route back to it from
// elsewhere); page items always route to their own URL.
function getItemLink(item, isHome) {
  if (item.to) return { Tag: Link, props: { to: item.to } };
  return isHome ? { Tag: 'a', props: { href: item.href } } : { Tag: Link, props: { to: `/${item.href}` } };
}

export default function Header() {
  const location = useLocation();
  const isHome = location.pathname === '/';
  const isTfam = location.pathname === '/work/tfam-app';
  const pageIndex = NAV_ITEMS.findIndex(
    (item) => item.to && (location.pathname === item.to || location.pathname.startsWith(`${item.to}/`)),
  );
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const effectiveSelectedIndex = isHome ? selectedIndex : pageIndex !== -1 ? pageIndex : null;
  const displayIndex = hoveredIndex ?? effectiveSelectedIndex;
  const isHovering = hoveredIndex !== null;
  const desktopItemsRef = useRef([]);
  const desktopItemsBox = useRef(null);
  const desktopHighlight = useItemRect(desktopItemsBox, desktopItemsRef, displayIndex);
  const mobileNavBox = useRef(null);
  const mobileItemsRef = useRef([]);
  const mobileHighlight = useItemRect(mobileNavBox, mobileItemsRef, effectiveSelectedIndex);
  const hasScrolled = useHasScrolled();
  const activeId = useActiveSection(SECTION_IDS);
  const reduceMotion = useReducedMotion();
  const [navHidden, setNavHidden] = useState(false);
  const lastScrollY = useRef(0);

  useEffect(() => {
    if (!isHome) return;
    const idx = NAV_ITEMS.findIndex((item) => item.href && item.href === `#${activeId}`);
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
            <span
              className={`font-satoshi font-semibold text-[16px] lg:text-[20px] whitespace-nowrap transition-colors ${
                isTfam ? 'text-white group-hover:text-sky-200' : 'text-ink group-hover:text-about-blue'
              }`}
            >
              Cynthia Tanawi
            </span>
          </Link>

          <a
            href="mailto:azuracaelestis@outlook.com?subject=Let%27s%20connect&body=Hi%20Cynthia%2C%0A%0A"
            className={`font-satoshi h-auto lg:h-12 rounded-full transition-colors px-4 py-2 lg:px-6 lg:py-3 text-xs lg:text-sm font-semibold text-white flex items-center gap-2 shrink-0 ${
              isTfam
                ? 'border border-white/25 bg-white/20 backdrop-blur-xl hover:bg-white/30 active:bg-white/30'
                : 'bg-ink hover:bg-charcoal active:bg-charcoal'
            }`}
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
        className={`hidden md:flex fixed top-5 inset-x-0 mx-auto w-fit max-w-[calc(100vw-16px)] z-50 items-center gap-6 lg:gap-[52px] rounded-full h-[63px] lg:h-[68px] px-5 lg:px-6 border border-white/60 bg-white/70 backdrop-blur-2xl backdrop-saturate-150 transition-shadow duration-200 ${
          hasScrolled
            ? 'shadow-[0_12px_40px_rgba(0,0,0,0.18),inset_0_1px_0_rgba(255,255,255,0.6)]'
            : 'shadow-[0_8px_32px_rgba(0,0,0,0.12),inset_0_1px_0_rgba(255,255,255,0.6)]'
        }`}
        animate={{ y: navHidden ? '-150%' : '0%', opacity: navHidden ? 0 : 1 }}
        initial={false}
        transition={{ duration: reduceMotion ? 0 : 0.3, ease: 'easeInOut' }}
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

        <div ref={desktopItemsBox} className="relative flex items-center gap-1" onMouseLeave={() => setHoveredIndex(null)}>
          <NavHighlight {...desktopHighlight} color={isHovering ? '#B0DDF8' : '#1A87D5'} reduceMotion={reduceMotion} />
          {NAV_ITEMS.map((item, i) => {
            const { Tag: ItemTag, props: itemLinkProps } = getItemLink(item, isHome);
            return (
              <ItemTag
                key={item.label}
                ref={(el) => {
                  desktopItemsRef.current[i] = el;
                }}
                {...itemLinkProps}
                onMouseEnter={() => setHoveredIndex(i)}
                onClick={() => setSelectedIndex(i)}
                className="font-satoshi relative rounded-full px-4 py-1.5 font-semibold text-[14px]"
              >
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

        <motion.a
          href="mailto:azuracaelestis@outlook.com?subject=Let%27s%20connect&body=Hi%20Cynthia%2C%0A%0A"
          initial="rest"
          whileHover="hover"
          className="font-satoshi h-9 lg:h-[42px] rounded-full bg-ink active:bg-charcoal transition-colors px-3 lg:px-5 text-xs lg:text-sm font-semibold text-white flex items-center shrink-0"
        >
          {/* Hidden and collapsed at rest, grows in on hover — desktop only
              (this is the pointer-driven nav; the mobile header's own Let's
              Talk button keeps its icon always visible, since touch has no
              hover state). Unlike the CTA chevrons, this one is allowed to
              widen the button — the reference (interaction-2.mov) shows the
              pill itself extending as the icon appears, not a fixed slot
              fading in, so the wrapper's width/margin animate together with
              the icon's own scale/opacity.
              Numbers measured directly off the reference, frame-by-frame:
              the icon grows from fully hidden (not a subtle partial scale)
              to full size, settling ~18 frames after the cursor arrives at
              30fps → 0.6s, with a long, gentle deceleration rather than a
              snappy pop. `initial=false` isn't needed since `whileHover`
              only ever animates FROM the `rest` variant, never on mount. */}
          <motion.span
            className="inline-flex items-center overflow-hidden"
            variants={{ rest: { width: 0, marginRight: 0 }, hover: { width: 16, marginRight: 6 } }}
            transition={{ duration: reduceMotion ? 0 : 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            <motion.svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className="shrink-0"
              variants={{ rest: { opacity: 0, scale: 0 }, hover: { opacity: 1, scale: 1 } }}
              transition={{ duration: reduceMotion ? 0 : 0.6, ease: [0.22, 1, 0.36, 1] }}
            >
              <rect x="3" y="5" width="18" height="14" rx="2" />
              <path d="M3 7l9 6 9-6" />
            </motion.svg>
          </motion.span>
          Let's Talk
        </motion.a>
      </motion.nav>

      <nav
        ref={mobileNavBox}
        aria-label="Mobile"
        className="md:hidden fixed bottom-4 left-1/2 -translate-x-1/2 z-50 flex items-center gap-1 bg-sky-50 rounded-full px-3 pt-2 pb-[calc(0.5rem+env(safe-area-inset-bottom))] shadow-md"
      >
        <NavHighlight {...mobileHighlight} color="#1A87D5" reduceMotion={reduceMotion} />
        {NAV_ITEMS.map((item, i) => {
          const { Tag: ItemTag, props: itemLinkProps } = getItemLink(item, isHome);
          return (
            <ItemTag
              key={item.label}
              ref={(el) => {
                mobileItemsRef.current[i] = el;
              }}
              {...itemLinkProps}
              onClick={() => setSelectedIndex(i)}
              aria-current={effectiveSelectedIndex === i ? 'page' : undefined}
              className="font-satoshi relative min-h-[44px] flex items-center justify-center rounded-full px-4 font-semibold text-[14px]"
            >
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
