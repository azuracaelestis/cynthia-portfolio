import { useEffect, useState } from 'react';

// Tracks which of the given section ids is currently most visible in the
// viewport, via IntersectionObserver — used to drive the mobile nav's
// scroll-spy active state (so it's not just the initial value).
export function useActiveSection(ids) {
  const [activeId, setActiveId] = useState(ids[0]);

  useEffect(() => {
    const elements = ids.map((id) => document.getElementById(id)).filter(Boolean);
    if (!elements.length) return undefined;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((entry) => entry.isIntersecting);
        if (visible.length === 0) return;
        const mostVisible = visible.reduce((a, b) => (b.intersectionRatio > a.intersectionRatio ? b : a));
        setActiveId(mostVisible.target.id);
      },
      { threshold: [0, 0.25, 0.5, 0.75, 1], rootMargin: '-40% 0px -40% 0px' }
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [ids]);

  return activeId;
}
