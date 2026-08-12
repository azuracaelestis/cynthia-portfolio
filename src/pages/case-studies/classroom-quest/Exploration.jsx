import landingPage from '../../../assets/case study/case-study-classroom-quest/exploration/landing page.png';
import Section from '../../../components/case-study/Section';

export default function Exploration() {
  return (
    <Section id="exploration" eyebrow="EXPLORATION" title="Built inside constraints, not around them.">
      <p className="font-dm font-bold text-[20px] text-black mb-4">Landing Page</p>
      <p className="font-dm text-[16px] text-black leading-[23px] mb-6">
        This was the first thing teachers saw. The CTA sends them to play, with a myViewBoard download card tied to
        the campaign&apos;s main KPI. The catch was the copy set inside the interactive display — it couldn&apos;t
        stretch, so longer languages like German and Spanish overflowed. I anchored the visual to a fixed safe zone
        and moved the subheadline outside the display, giving translations room to grow.
      </p>
      <div className="w-full aspect-[890/656] rounded-2xl bg-bleed-blue flex items-center justify-center">
        <img
          src={landingPage}
          alt="Classroom Quest landing page: a hero banner inviting teachers to 'Embark on Your Quest', illustrated classroom-hero characters, and a myViewBoard feature callout below."
          className="w-[78%] h-auto rounded-2xl shadow-[0px_0px_5px_rgba(0,0,0,0.1)] translate-y-[60px]"
        />
      </div>
    </Section>
  );
}
