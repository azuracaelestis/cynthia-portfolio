const CARDS = [
  {
    title: 'Designing From Friction',
    body: 'I frame projects as human stories first — a moment of real friction becomes the brief, not a feature list.',
    bg: 'bg-cream',
    rotate: -4,
    offset: 'lg:translate-y-2',
  },
  {
    title: 'Welcoming Pushback',
    body: 'I treat my first solution as a hypothesis, inviting other perspectives early, before a design is too expensive to change.',
    bg: 'bg-sky-100',
    rotate: 2,
    offset: 'lg:-translate-y-3',
  },
  {
    title: 'Choosing the Unfamiliar',
    body: 'I treat unfamiliar tools, domains, and constraints as the interesting part of a problem — not the risky part.',
    bg: 'bg-amber-100',
    rotate: -2,
    offset: 'lg:translate-y-4',
  },
];

export default function DesignPractice() {
  return (
    <section className="relative lg:z-10 lg:-mt-16 rounded-t-[32px] bg-sky-50 py-28 overflow-hidden">
      <div className="mx-auto max-w-6xl px-6 lg:px-10 text-center">
        <span className="inline-block rounded-full bg-sky-200 text-sky-700 font-semibold text-sm px-4 py-1.5">
          My Design Practice
        </span>
        <h2 className="mt-5 font-display font-extrabold text-3xl sm:text-4xl text-ink">
          Story-Driven, Collaborative, &amp; Fearless
        </h2>

        <div className="mt-16 grid sm:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-6">
          {CARDS.map((card) => (
            <div
              key={card.title}
              className={`group ${card.offset} rotate-[var(--r)] transition-transform duration-300 ease-out hover:-translate-y-4 hover:rotate-0`}
              style={{ '--r': `${card.rotate}deg` }}
            >
              <div
                className={`h-full ${card.bg} rounded-2xl p-7 text-left shadow-md group-hover:shadow-2xl transition-shadow duration-300`}
              >
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#16181d" strokeWidth="1.8" className="mb-5">
                  <path d="M12 20h9" strokeLinecap="round" />
                  <path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4Z" strokeLinejoin="round" />
                </svg>
                <h3 className="font-display font-bold text-lg text-ink">{card.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-ink/70">{card.body}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
