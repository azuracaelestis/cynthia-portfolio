export default function Section({ id, eyebrow, title, children }) {
  return (
    <section id={id} className="scroll-mt-28 pt-12 lg:pt-[90px] first:pt-0">
      {eyebrow && (
        <p className="font-dm font-bold text-[16px] text-case-study-blue mb-3">{eyebrow}</p>
      )}
      {title && (
        <h2 className="font-dm font-extrabold text-[28px] lg:text-[36px] text-ink leading-tight mb-6">{title}</h2>
      )}
      {children}
    </section>
  );
}
