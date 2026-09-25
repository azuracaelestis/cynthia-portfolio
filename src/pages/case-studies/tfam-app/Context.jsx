import Section from '../../../components/case-study/Section';

export default function Context() {
  return (
    <Section id="context" eyebrow="CONTEXT" eyebrowColor="text-tfam-gray">
      <p className="font-satoshi text-[16px] text-ink leading-[23px]">
        TFAM is Taiwan&apos;s first museum of modern and contemporary art, and it already had its own app. It looks
        polished, strong branding, a clean interface, exactly like something made to show off the museum. I took it
        on as a solo redesign, from research through prototyping, to find out why so few people used it, and how to
        change that.
      </p>

      <div className="mt-6 lg:mt-8 flex flex-col gap-2">
        <p className="font-satoshi font-bold text-[12px] text-ink">Project note</p>
        <p className="font-satoshi text-[12px] text-ink leading-[18px]">
          Independent concept project. Not affiliated with or commissioned by TFAM. Exhibition names are real;
          artwork imagery is created for demonstration purposes and is not official TFAM content.
        </p>
      </div>
    </Section>
  );
}
