import yellowSunburst from '../assets/footer/element10.svg';
import blueFlower from '../assets/footer/element9.svg';
import linkedinIcon from '../assets/footer/icon/linkedin.svg';
import resumeIcon from '../assets/footer/icon/resume.svg';

export default function Footer() {
  return (
    <footer id="contact" className="pt-12">
      <div className="relative mx-auto max-w-[1302px] rounded-t-[32px] bg-bleed-blue px-6 lg:px-10 pt-24 pb-12 text-center overflow-hidden">
        <img
          src={yellowSunburst}
          alt=""
          aria-hidden="true"
          className="pointer-events-none absolute left-[12%] top-[220px] w-32 lg:w-[134px] lg:h-[134px] z-20"
        />
        <img
          src={blueFlower}
          alt=""
          aria-hidden="true"
          className="pointer-events-none absolute right-[10%] top-[110px] w-24 lg:w-[174px] lg:h-[174px] z-20"
        />

        <h2 className="font-dm font-extrabold text-[64px] leading-[70px] text-ink">
          Are we vibing?
          <br />
          Let's Connect!
        </h2>

        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <a
            href="mailto:hello@cynthiatanawi.com"
            className="font-dm h-12 rounded-full bg-amber-400 hover:bg-amber-350 active:bg-amber-550 transition-colors px-6 py-3 font-semibold text-ink flex items-center justify-center gap-2"
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
            className="font-dm h-12 rounded-full border border-black bg-white hover:bg-amber-350 active:bg-amber-550 transition-colors px-6 py-3 font-semibold text-ink flex items-center justify-center gap-2"
          >
            <img src={linkedinIcon} alt="" className="w-4 h-4" />
            LinkedIn
          </a>
          <a
            href="/resume.pdf"
            className="font-dm h-12 rounded-full border border-black bg-white hover:bg-amber-350 active:bg-amber-550 transition-colors px-6 py-3 font-semibold text-ink flex items-center justify-center gap-2"
          >
            <img src={resumeIcon} alt="" className="w-4 h-4" />
            Resume
          </a>
        </div>

        <div className="font-dm mt-20 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-black pt-6">
          <nav className="flex gap-6">
            <a href="#home" className="group relative font-bold text-[16px] text-ink transition-colors">
              Home
              <span className="pointer-events-none absolute left-0 -bottom-1 h-[2px] w-full rounded-full bg-black scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
            </a>
            <a href="#work" className="group relative font-bold text-[16px] text-ink transition-colors">
              Work
              <span className="pointer-events-none absolute left-0 -bottom-1 h-[2px] w-full rounded-full bg-black scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
            </a>
            <a href="#about" className="group relative font-bold text-[16px] text-ink transition-colors">
              About
              <span className="pointer-events-none absolute left-0 -bottom-1 h-[2px] w-full rounded-full bg-black scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
            </a>
          </nav>
          <p className="font-medium">© 2026 Cynthia Tanawi. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
}
