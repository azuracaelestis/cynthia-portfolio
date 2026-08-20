import { useEffect, useState } from 'react';

// Tracks which of the given section ids is "active" — the deepest section
// the user has scrolled past the top of — via IntersectionObserver. Used to
// drive the sidebar/mobile nav's scroll-spy highlight.
//
// Deliberately NOT a "most-visible-by-ratio in a middle band" approach: that
// breaks for short sections (e.g. Context, which is just one paragraph) —
// a short section can be entirely above/below a mid-screen band while a
// taller neighboring section still occupies most of it, so the neighbor
// wins even though the user just landed on the short one. Instead, this
// watches a thin strip near the top of the viewport (below the sticky
// header) and picks the LAST section in document order currently touching
// it, which matches how sections are meant to become "active" as their
// heading passes that line.
export function useActiveSection(ids) {
  const [activeId, setActiveId] = useState(ids[0]);

  useEffect(() => {
    const elements = ids.map((id) => document.getElementById(id)).filter(Boolean);
    if (!elements.length) return undefined;

    const intersecting = new Set();

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) intersecting.add(entry.target.id);
          else intersecting.delete(entry.target.id);
        });
        const active = ids.filter((id) => intersecting.has(id));
        if (active.length > 0) setActiveId(active[active.length - 1]);
      },
      { threshold: 0, rootMargin: '-140px 0px -70% 0px' }
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [ids]);

  return activeId;
}
