import Section from '../../../components/case-study/Section';

const LESSONS = [
  {
    title: 'Engineering',
    body: 'I scoped the build with the dev team early, prioritizing the interactions that carried the experience over a chatbot format with no precedent, on a hard timeline.',
  },
  {
    title: 'Localization',
    body: "Some languages, like Arabic, needed extra support: text that reads right to left, and text that's longer than English. Since this came in late, I used Canva as a quick, simple tool so our local partners in each country could adjust the layout themselves.",
  },
  {
    title: 'Time Constrains',
    body: "Five weeks to define, ideate, prototype, iterate, and deploy left fewer rounds of iteration than I'd have wanted on any single piece. Leading here meant making scoping calls fast, on incomplete information, and trusting the ones that mattered most would hold up.",
  },
];

export default function ImpactReflection() {
  return (
    <Section id="impact-reflection" eyebrow="IMPACT & REFLECTION">
      <div className="flex flex-col gap-8">
        <div className="flex flex-col gap-4">
          <p className="font-dm font-bold text-[20px] text-black">Status</p>
          <p className="font-dm text-[16px] text-black leading-[23px]">
            The experience was designed, built, and ready to ship on schedule. Before launch, myViewBoard 3.0 failed
            its usability testing. Widespread bug reports led the product team to pull it back for fixes, and the
            Classroom Quest campaign was put on hold indefinitely.
          </p>
        </div>
        <div className="flex flex-col gap-4">
          <p className="font-dm font-bold text-[20px] text-black">What I&apos;d have measured</p>
          <p className="font-dm text-[16px] text-black leading-[23px]">
            Completion rate through all five scenes, click-through from the Result Page to the download page, and
            time spent per scenario: the numbers that would show whether &quot;feel the problem, then reveal the
            tool&quot; actually changed behavior, not just attention.
          </p>
        </div>
      </div>

      <div className="flex flex-col gap-6 mt-8">
        <div className="flex flex-col gap-4">
          <p className="font-dm font-bold text-[20px] text-black">Reflection</p>
          <p className="font-dm text-[16px] text-black leading-[23px]">
            This project reshaped how I think about building design: as big-team collaboration, where communicating
            the work clearly and bringing the whole team along matters as much as the design itself.
          </p>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
          {LESSONS.map((lesson) => (
            <div
              key={lesson.title}
              className="bg-white rounded-2xl shadow-[0px_0px_5px_rgba(0,0,0,0.1)] p-6 flex flex-col gap-2"
            >
              <p className="font-dm font-bold text-[16px] text-black">{lesson.title}</p>
              <p className="font-dm text-[16px] text-black leading-[23px]">{lesson.body}</p>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}
