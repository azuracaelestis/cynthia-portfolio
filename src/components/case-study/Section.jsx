export default function Section({ id, eyebrow, title, children, eyebrowClassName = 'mb-3', titleClassName = 'mb-6' }) {
  return (
    <section id={id} className="scroll-mt-28 pt-12 lg:pt-[90px] first:pt-0">
      {eyebrow && (
        <p className={`font-dm font-bold text-[16px] text-case-study-blue ${eyebrowClassName}`}>{eyebrow}</p>
      )}
      {title && (
        <h2 className={`font-dm font-extrabold text-[28px] lg:text-[36px] text-ink leading-tight ${titleClassName}`}>{title}</h2>
      )}
      {children}
    </section>
  );
}
