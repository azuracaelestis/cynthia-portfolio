const NAV_ITEMS = [
  { label: 'Home', href: '#home' },
  { label: 'Work', href: '#work' },
  { label: 'About', href: '#about' },
];

export default function Header() {
  return (
    <header className="fixed top-0 inset-x-0 z-50 bg-paper/80 backdrop-blur-sm">
      <div className="mx-auto max-w-7xl px-6 lg:px-10 py-5 flex items-center justify-between gap-6">
        <a href="#home" className="flex items-center gap-3 shrink-0">
          <span className="w-11 h-11 rounded-full bg-sky-100 flex items-center justify-center overflow-hidden">
            <svg viewBox="0 0 100 100" className="w-9 h-9">
              <path d="M55 20 C75 20 88 38 88 58 C88 74 78 84 62 84 C46 84 36 72 36 56 C36 40 42 20 55 20Z" fill="#6fb3e0" />
              <circle cx="52" cy="58" r="9" fill="none" stroke="#7a4a2a" strokeWidth="3" />
              <path d="M58 55 L50 58 L58 61" stroke="#3a2a1c" strokeWidth="2.5" fill="none" strokeLinecap="round" />
            </svg>
          </span>
          <span className="font-display font-bold text-lg text-ink whitespace-nowrap">Cynthia Tanawi</span>
        </a>

        <nav className="hidden md:flex items-center gap-1 bg-sky-50 rounded-full p-1.5">
          {NAV_ITEMS.map((item, i) => (
            <a
              key={item.label}
              href={item.href}
              className={
                i === 0
                  ? 'rounded-full px-5 py-2 font-semibold text-sm bg-sky-500 text-white'
                  : 'rounded-full px-5 py-2 font-semibold text-sm text-ink/70 hover:text-ink transition-colors'
              }
            >
              {item.label}
            </a>
          ))}
        </nav>

        <a
          href="#contact"
          className="rounded-full bg-ink hover:bg-amber-600 transition-colors px-5 py-2.5 text-sm font-semibold text-white flex items-center gap-2 shrink-0"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <rect x="3" y="5" width="18" height="14" rx="2" />
            <path d="M3 7l9 6 9-6" />
          </svg>
          Let's Talk
        </a>
      </div>
    </header>
  );
}
