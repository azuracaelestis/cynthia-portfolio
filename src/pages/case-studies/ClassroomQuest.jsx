import { Helmet } from 'react-helmet-async';
import CaseStudyLayout from '../../components/case-study/CaseStudyLayout';
import Section from '../../components/case-study/Section';
import ImagePlaceholder from '../../components/case-study/ImagePlaceholder';
import Overview from './classroom-quest/Overview';
import Context from './classroom-quest/Context';
import Problem from './classroom-quest/Problem';
import Hypothesis from './classroom-quest/Hypothesis';
import Experience from './classroom-quest/Experience';
import CharacterSystem from './classroom-quest/CharacterSystem';
import Exploration from './classroom-quest/Exploration';
import Design from './classroom-quest/Design';
import ImpactReflection from './classroom-quest/ImpactReflection';
import classroomQuestMockup from '../../assets/case study/folder-thumnail/classroom quest/Classroom Quest.jpg';

const CUSTOM_SECTIONS = {
  context: Context,
  problem: Problem,
  hypothesis: Hypothesis,
  'the-experience': Experience,
  'character-system': CharacterSystem,
  exploration: Exploration,
  design: Design,
  'impact-reflection': ImpactReflection,
};

const SECTIONS = [
  { id: 'overview', label: 'Overview' },
  { id: 'context', label: 'Context' },
  { id: 'problem', label: 'Problem' },
  { id: 'hypothesis', label: 'Hypothesis' },
  { id: 'the-experience', label: 'The Experience' },
  { id: 'character-system', label: 'Character System' },
  { id: 'exploration', label: 'Exploration' },
  { id: 'design', label: 'Design' },
  { id: 'impact-reflection', label: 'Impact & Reflection' },
];

export default function ClassroomQuest() {
  return (
    <>
      <Helmet>
        <title>Classroom Quest — Cynthia Tanawi</title>
        <meta
          name="description"
          content="A gamified experience that taught teachers about myViewBoard 3.0 by turning real classroom problems into play."
        />
        <meta property="og:type" content="article" />
        <meta property="og:title" content="Classroom Quest — Cynthia Tanawi" />
        <meta
          property="og:description"
          content="A gamified experience that taught teachers about myViewBoard 3.0 by turning real classroom problems into play."
        />
        <meta property="og:image" content={classroomQuestMockup} />
      </Helmet>

      <Overview />

      <CaseStudyLayout sections={SECTIONS}>
        {SECTIONS.filter((section) => section.id !== 'overview').map((section) => {
          const Custom = CUSTOM_SECTIONS[section.id];
          if (Custom) return <Custom key={section.id} />;
          return (
            <Section key={section.id} id={section.id} title={section.label}>
              <ImagePlaceholder className="h-64 lg:h-96" />
            </Section>
          );
        })}
      </CaseStudyLayout>
    </>
  );
}
