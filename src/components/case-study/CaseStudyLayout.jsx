import { useActiveSection } from '../../hooks/useActiveSection';

// sections: [{ id: 'overview', label: 'Overview' }, ...]
export default function CaseStudyLayout({ sections, children }) {
  const ids = sections.map((s) => s.id);
  const activeId = useActiveSection(ids);

  return (
    <div className="mx-auto max-w-6xl px-6 lg:px-10 pt-12 lg:pt-16 pb-28">
      {/* Mobile: horizontal jump-to row */}
      <nav aria-label="On this page" className="lg:hidden -mx-6 px-6 mb-8 flex gap-2 overflow-x-auto pb-2">
        {sections.map((s) => (
          <a
            key={s.id}
            href={`#${s.id}`}
            className={`shrink-0 whitespace-nowrap rounded-full px-4 py-2 font-dm text-sm font-semibold transition-colors ${
              activeId === s.id ? 'bg-[#1A87D5] text-white' : 'bg-sky-50 text-ink'
            }`}
          >
            {s.label}
          </a>
        ))}
      </nav>

      <div className="lg:grid lg:grid-cols-[220px_1fr] lg:gap-16">
        {/* Desktop: sticky sidebar */}
        <nav aria-label="On this page" className="hidden lg:block">
          <div className="sticky top-32">
            <p className="font-dm text-xs font-semibold uppercase tracking-wide text-ink/50 mb-4">On this page</p>
            <ul className="space-y-1">
              {sections.map((s) => (
                <li key={s.id}>
                  <a
                    href={`#${s.id}`}
                    className={`block rounded-lg px-3 py-2 font-dm text-sm font-semibold transition-colors ${
                      activeId === s.id ? 'bg-sky-50 text-[#1A87D5]' : 'text-ink/70 hover:text-ink'
                    }`}
                  >
                    {s.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </nav>

        <div className="min-w-0">{children}</div>
      </div>
    </div>
  );
}
