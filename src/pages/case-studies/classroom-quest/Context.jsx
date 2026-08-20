import Section from '../../../components/case-study/Section';

export default function Context() {
  return (
    <Section id="context" eyebrow="CONTEXT" title="Not everyone in the room is the user.">
      <p className="font-dm text-[16px] text-black leading-[23px] mb-[24px]">
        myViewBoard is a digital whiteboard app, sold together with ViewSonic&apos;s interactive flat panel displays.
        It&apos;s one of the more popular whiteboard apps in schools across North America. In 2025, it got a major
        update and relaunched as myViewBoard 3.0.
      </p>
      <p className="font-dm text-[16px] text-black leading-[23px]">
        In EdTech, a product reaches three different people: the decision-maker who buys it, the IT admin who
        installs it, and the teacher who actually uses it. A campaign can reach one of these people and completely
        miss the other two. When myViewBoard 3.0 launched, that&apos;s exactly the gap it fell into.
      </p>
    </Section>
  );
}
