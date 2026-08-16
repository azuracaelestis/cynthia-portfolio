import originalCyan from '../../../assets/case study/case-study-classroom-quest/character system/personality test_bird-13.png';
import originalRed from '../../../assets/case study/case-study-classroom-quest/character system/personality test_bird-15.png';
import render3dCyan from '../../../assets/case study/case-study-classroom-quest/character system/inspiration_without_costume.png';
import render3dRed from '../../../assets/case study/case-study-classroom-quest/character system/adaptability_without_costume.png';
import motion2dCyan from '../../../assets/case study/case-study-classroom-quest/character system/cyan-bird.svg';
import motion2dRed from '../../../assets/case study/case-study-classroom-quest/character system/red-bird.svg';
import Section from '../../../components/case-study/Section';

const COLUMNS = ['Original design for 2024', '3D render', '2D illustration'];

const ROWS = [
  {
    original: originalCyan,
    render3d: render3dCyan,
    motion2d: motion2dCyan,
    alt: 'cyan wizard-bird character',
    render3dMaxHeight: 153,
    motion2dMaxHeight: 230,
  },
  {
    original: originalRed,
    render3d: render3dRed,
    motion2d: motion2dRed,
    alt: 'red creature character',
    render3dMaxHeight: 140,
  },
];

export default function CharacterSystem() {
  return (
    <Section id="character-system" eyebrow="CHARACTER SYSTEM" title="Same characters, rebuilt for a new format.">
      <p className="font-dm text-[16px] text-black leading-[23px] mb-8">
        Last year&apos;s 3D-rendered GIFs looked great on a laptop but fell apart at the exhibition venue — heavy
        files that loaded slowly on venue Wi-Fi. So before touching the character designs, I set one rule: 2D MP4
        only, full quality at a fraction of the weight. Every character below was rebuilt from 3D to 2D under that
        constraint, without losing who they were.
      </p>
      <div className="grid grid-cols-3 gap-6 mb-4">
        {COLUMNS.map((label) => (
          <p key={label} className="font-caveat font-bold text-[20px] text-about-blue text-center">
            {label}
          </p>
        ))}
      </div>
      <div className="flex flex-col gap-2">
        {ROWS.map((row) => (
          <div key={row.alt} className="grid grid-cols-3 gap-6 items-center">
            <div className="flex items-center justify-center h-[200px]">
              <img
                src={row.original}
                alt={`${row.alt}, original design for 2024`}
                className="max-w-full max-h-full w-auto h-auto"
              />
            </div>
            <div className="flex items-center justify-center h-[200px]">
              <img
                src={row.render3d}
                alt={`${row.alt}, 3D render`}
                className="max-w-full w-auto h-auto"
                style={{ maxHeight: row.render3dMaxHeight ?? 200 }}
              />
            </div>
            <div className="flex items-center justify-center h-[200px]">
              <img
                src={row.motion2d}
                alt={`${row.alt}, final 2D motion style for Classroom Quest`}
                className="max-w-full w-auto h-auto"
                style={{ maxHeight: row.motion2dMaxHeight ?? 200 }}
              />
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
}
