import { Helmet } from 'react-helmet-async';
import CaseStudyLayout from '../../components/case-study/CaseStudyLayout';
import MoreCaseStudies from '../../components/case-study/MoreCaseStudies';
import Overview from './tfam-app/Overview';
import Context from './tfam-app/Context';
import Symptoms from './tfam-app/Symptoms';
import Diagnosis from './tfam-app/Diagnosis';
import Solutions from './tfam-app/Solutions';
import Testing from './tfam-app/Testing';
import Reflection from './tfam-app/Reflection';

const CUSTOM_SECTIONS = {
  context: Context,
  symptoms: Symptoms,
  diagnosis: Diagnosis,
  solutions: Solutions,
  testing: Testing,
  reflection: Reflection,
};

const SECTIONS = [
  { id: 'overview', label: 'Overview' },
  { id: 'context', label: 'Context' },
  { id: 'symptoms', label: 'Symptoms' },
  { id: 'diagnosis', label: 'Diagnosis' },
  { id: 'solutions', label: 'Solutions' },
  { id: 'testing', label: 'Testing' },
  { id: 'reflection', label: 'Reflection' },
];

export default function TfamApp() {
  return (
    <>
      <Helmet>
        <title>TFAM App — Cynthia Tanawi</title>
        <meta
          name="description"
          content="TFAM built a branding campaign, not a companion. An end-to-end redesign of the Taipei Fine Arts Museum app, focused on surfacing what was already there."
        />
        <meta property="og:type" content="article" />
        <meta property="og:title" content="TFAM App — Cynthia Tanawi" />
        <meta
          property="og:description"
          content="TFAM built a branding campaign, not a companion. An end-to-end redesign of the Taipei Fine Arts Museum app, focused on surfacing what was already there."
        />
      </Helmet>

      <Overview />

      <CaseStudyLayout
        sections={SECTIONS}
        background="bg-paper"
        paddingTop="pt-12 lg:pt-[184px]"
        sidebarVariant="mono"
      >
        {SECTIONS.filter((section) => section.id !== 'overview').map((section) => {
          const Custom = CUSTOM_SECTIONS[section.id];
          return <Custom key={section.id} />;
        })}
      </CaseStudyLayout>

      <MoreCaseStudies currentId="tfam" />
    </>
  );
}
