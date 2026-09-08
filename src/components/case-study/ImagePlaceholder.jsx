export default function ImagePlaceholder({ label = 'Image placeholder', className = '' }) {
  return (
    <div
      className={`flex items-center justify-center rounded-2xl border-2 border-dashed border-ink/30 bg-ink/5 text-ink/50 font-satoshi text-sm text-center px-4 ${className}`}
    >
      {label}
    </div>
  );
}
