import { Helmet } from 'react-helmet-async';
import CaseStudyLayout from '../../components/case-study/CaseStudyLayout';
import Section from '../../components/case-study/Section';
import ImagePlaceholder from '../../components/case-study/ImagePlaceholder';
import Overview from './classroom-quest/Overview';
import classroomQuestMockup from '../../assets/case study/folder-thumnail/classroom quest/Classroom Quest.jpg';

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
        {SECTIONS.filter((section) => section.id !== 'overview').map((section) => (
          <Section key={section.id} id={section.id} title={section.label}>
            <ImagePlaceholder className="h-64 lg:h-96" />
          </Section>
        ))}
      </CaseStudyLayout>
    </>
  );
}
