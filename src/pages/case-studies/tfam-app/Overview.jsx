import grainField from '../../../assets/case study/case-study-tfam-app/header/tfam-grain-field-2744.80.png';
import mockupWhatson from '../../../assets/case study/case-study-tfam-app/header/mockup1_whatson.png';
import mockupOnboarding from '../../../assets/case study/case-study-tfam-app/header/mockup1_onboarding.png';

export default function Overview() {
  return (
    <div id="overview" className="scroll-mt-28 relative z-10 bg-ink">
      <img src={grainField} alt="" className="absolute inset-0 w-full h-full object-cover" />
      <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/40 to-black/70" />
      <div className="relative mx-auto max-w-7xl px-6 lg:px-10 pt-[140px] lg:pt-40 pb-16 lg:pb-0">
        <span className="font-satoshi font-bold text-[16px] lg:text-[24px] text-white/70">
          Taipei Fine Arts Museum (TFAM)
        </span>
        <h1 className="mt-4 lg:mt-3 font-satoshi font-bold text-[36px] lg:text-[48px] lg:leading-[60px] text-white">
          TFAM built a branding campaign, not a companion.
        </h1>

        <div className="mt-6 lg:mt-6 flex flex-col gap-6 lg:flex-row lg:justify-between lg:gap-x-8 rounded-2xl border border-white/25 bg-white/20 backdrop-blur-xl shadow-[0_8px_32px_rgba(0,0,0,0.25)] px-6 py-6 lg:pl-8 lg:pr-10 lg:py-8">
          <div>
            <p className="font-satoshi font-medium text-[20px] text-white">Overview</p>
            <p className="mt-2 font-satoshi text-[16px] text-white/80 lg:max-w-[390px]">
              TFAM&apos;s app had plenty of features, but they were built to look good more than to be used, so the
              ones visitors needed most were hard to reach. I led an end-to-end redesign focused on surfacing what
              was already there, not adding more.
            </p>
          </div>
          <div>
            <p className="font-satoshi font-medium text-[20px] text-white">Role</p>
            <p className="mt-2 font-satoshi text-[16px] text-white/80 lg:max-w-[220px]">
              Solo UX Designer, Product Redesign
            </p>
          </div>
          <div>
            <p className="font-satoshi font-medium text-[20px] text-white">The Team</p>
            <p className="mt-2 font-satoshi text-[16px] text-white/80 lg:max-w-[260px]">
              Self-initiated solo project: research, define, ideation, IA, wireframing, prototyping
            </p>
          </div>
          <div>
            <p className="font-satoshi font-medium text-[20px] text-white">Timeline</p>
            <p className="mt-2 font-satoshi text-[16px] text-white/80">Q2–Q3 2026 (2.5 month)</p>
          </div>
        </div>

        {/* Phone mockups, positioned per Figma (node 258:1042). The stage's
            aspect ratio is Figma's own 1200x655 — the span from the meta
            card's bottom (y545) down to the dark rectangle's bottom (y1200)
            — so the dark hero ends exactly where Figma's does and every
            offset below stays proportional at any width. The mockups are
            absolutely positioned, so they don't add flow height: their
            bottoms hang ~210px past the dark edge and float over the white
            section below (via this section's z-10). Static for now; the
            scroll-driven reveal is a later pass. Mobile: hidden until a
            dedicated mobile pass. */}
        <div className="relative mt-12 h-32 lg:mt-0 lg:h-auto lg:aspect-[1200/655]">
          <img
            src={mockupWhatson}
            alt="TFAM App, What's On screen mockup"
            className="hidden lg:block absolute w-[35.51%] top-[12.88%] left-[17.79%] rotate-[-23.02deg] drop-shadow-2xl"
          />
          <img
            src={mockupOnboarding}
            alt="TFAM App, onboarding screen mockup"
            className="hidden lg:block absolute w-[37.99%] top-[3.7%] left-[43.47%] rotate-[23.09deg] drop-shadow-2xl"
          />
        </div>
      </div>
    </div>
  );
}
