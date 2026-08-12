import { useActiveSection } from '../../hooks/useActiveSection';

// sections: [{ id: 'overview', label: 'Overview' }, ...]
export default function CaseStudyLayout({ sections, children }) {
  const ids = sections.map((s) => s.id);
  const activeId = useActiveSection(ids);

  return (
    <div className="bg-case-study-cream">
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

        <div className="lg:grid lg:grid-cols-[250px_1fr] lg:gap-[34px]">
          {/* Desktop: sticky sidebar */}
          <nav aria-label="On this page" className="hidden lg:block">
            <div className="sticky top-32 -translate-x-[40px] scale-90 origin-top-left bg-white rounded-2xl shadow-[0px_0px_12.5px_rgba(0,0,0,0.1)] p-6 flex flex-col gap-4">
              <p className="font-dm font-bold text-[14px] text-case-study-blue">ON THIS PAGE</p>
              <ul className="flex flex-col gap-[10px]">
                {sections.map((s) => (
                  <li key={s.id}>
                    <a
                      href={`#${s.id}`}
                      className={`flex items-center gap-4 rounded-lg px-3 py-1 font-dm font-bold text-[16px] text-black transition-colors ${
                        activeId === s.id ? 'bg-case-study-highlight' : ''
                      }`}
                    >
                      <span
                        className={`shrink-0 size-1.5 rounded-full ${
                          activeId === s.id ? 'bg-case-study-blue' : 'bg-case-study-cream'
                        }`}
                      />
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
    </div>
  );
}
