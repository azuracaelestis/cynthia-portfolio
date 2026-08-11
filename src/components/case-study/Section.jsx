export default function Section({ id, title, children }) {
  return (
    <section id={id} className="scroll-mt-28 pt-16 first:pt-0">
      {title && (
        <h2 className="font-dm font-extrabold text-[28px] lg:text-[36px] text-ink leading-tight mb-6">{title}</h2>
      )}
      {children}
    </section>
  );
}
