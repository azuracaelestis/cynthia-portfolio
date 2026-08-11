import cyanBird from '../../../assets/case study/case-study-classroom-quest/header/cyan-bird.svg';
import purpleBlueBird from '../../../assets/case study/case-study-classroom-quest/header/purple-blue_bird.svg';
import panicBubble from '../../../assets/case study/case-study-classroom-quest/header/panic_bubble.svg';
import classroomQuestMockup from '../../../assets/case study/case-study-classroom-quest/header/Classroom Quest.jpg';
import mobilePreview from '../../../assets/case study/case-study-classroom-quest/header/header-mobile-preview.png';

export default function Overview() {
  return (
    <div id="overview" className="scroll-mt-28 bg-gradient-to-b from-white to-bleed-blue">
      <div className="mx-auto max-w-7xl px-6 lg:px-10 pt-[140px] lg:pt-40 pb-16 lg:pb-24">
        <span className="font-dm font-bold text-[16px] lg:text-[24px] text-black">ViewSonic Education</span>
        <h1 className="mt-3 font-dm font-bold text-[28px] md:text-[36px] lg:text-[48px] lg:leading-[60px] text-black">
          A Product Update Teachers Wanted to Play
        </h1>

        <div className="mt-8 flex flex-col gap-6 lg:mt-12 lg:flex-row lg:justify-between lg:gap-x-8">
          <div>
            <p className="font-dm font-extrabold text-[20px] text-black">Overview</p>
            <p className="mt-2 font-dm text-[16px] text-black lg:max-w-[390px]">
              Classroom Quest is a gamified web experience for myViewBoard 3.0 where teachers play through five familiar classroom moments, each resolving into the feature that solves it.
            </p>
          </div>
          <div>
            <p className="font-dm font-extrabold text-[20px] text-black">Role</p>
            <p className="mt-2 font-dm text-[16px] text-black lg:max-w-[220px]">
              <span className="font-semibold">Lead UI Designer</span>
              <br />
              Owned visual direction, interaction design, character system, and localization
            </p>
          </div>
          <div>
            <p className="font-dm font-extrabold text-[20px] text-black">The Team</p>
            <p className="mt-2 font-dm text-[16px] text-black lg:max-w-[231px]">
              UI Designers, Project Manager,
              <br />
              Engineers, UX Researchers, Content Team, Growth Team
            </p>
          </div>
          <div>
            <p className="font-dm font-extrabold text-[20px] text-black">Timeline</p>
            <p className="mt-2 font-dm text-[16px] text-black">Q2 2025 (4 weeks)</p>
          </div>
        </div>

        <div className="relative mt-12 lg:mt-16 lg:max-w-[72%] lg:mx-auto">
          <img
            src={classroomQuestMockup}
            alt="Classroom Quest homepage mockup"
            className="relative w-full h-auto rounded-t-[16px]"
          />

          {/* Decorations — desktop only. Each sized/positioned as a direct
              percentage of this wrapper (= mockup width), pulled from the
              Figma frame (node 37:37) via MCP — not nested/guessed. */}
          <img src={panicBubble} alt="" className="hidden lg:block absolute left-[8%] top-[18%] w-[12%] -rotate-[16deg]" />
          <img src={cyanBird} alt="" className="hidden lg:block absolute -left-[7%] top-[32%] w-[32%] -rotate-[16deg]" />
          <img src={purpleBlueBird} alt="" className="hidden lg:block absolute left-[74%] top-[14%] w-[24%] -rotate-[6deg]" />
          <img src={mobilePreview} alt="" className="hidden lg:block absolute left-[87%] top-[24%] w-[32%]" />
        </div>
      </div>
    </div>
  );
}
