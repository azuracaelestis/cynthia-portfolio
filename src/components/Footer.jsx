export default function Footer() {
  return (
    <footer id="contact" className="bg-sky-50">
      <div className="mx-auto max-w-6xl px-6 lg:px-10 pt-24 pb-12 text-center">
        <h2 className="font-dm font-extrabold text-[64px] leading-[70px] text-ink">
          Are we vibing?
          <br />
          Let's Connect!
        </h2>

        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <a
            href="mailto:hello@cynthiatanawi.com"
            className="font-dm rounded-full bg-amber-400 hover:bg-amber-600 transition-colors px-6 py-3 font-semibold text-ink flex items-center gap-2"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="3" y="5" width="18" height="14" rx="2" />
              <path d="M3 7l9 6 9-6" />
            </svg>
            Email
          </a>
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noreferrer"
            className="font-dm rounded-full border-2 border-black hover:border-amber-600 hover:text-amber-600 transition-colors px-6 py-3 font-semibold text-ink"
          >
            LinkedIn
          </a>
          <a
            href="/resume.pdf"
            className="font-dm rounded-full border-2 border-black hover:border-amber-600 hover:text-amber-600 transition-colors px-6 py-3 font-semibold text-ink"
          >
            Resume
          </a>
        </div>

        <div className="font-dm mt-20 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-black border-t border-black pt-6">
          <nav className="flex gap-6">
            <a href="#home" className="hover:text-ink transition-colors">Home</a>
            <a href="#work" className="hover:text-ink transition-colors">Work</a>
            <a href="#about" className="hover:text-ink transition-colors">About</a>
          </nav>
          <p>© 2026 Cynthia Tanawi. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
}
