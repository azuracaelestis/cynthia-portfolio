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

      {/* lg:pt-[258px] puts 125px between the phone mockups' visible bottom
          and the Context section. Derived, not guessed — the phones' bottom
          edge is the sum of several things: the hero stage is 655px tall at
          a 1200px content width (aspect-[1200/655]), the phones render 726px
          and 777px tall there, rotating them ±23° pushes their corners lower
          still, and each PNG's artwork stops at 91.26% of its canvas. Net:
          they bottom out 125px BELOW the dark edge at rest.

          Note this gap is not constant — Overview's PHONE_DRIFT floats the
          phones up to 120px upward as the hero scrolls, so the gap opens
          from ~5px to 125px on the way down. 125px is the value at full
          drift, i.e. what you see once the boundary has scrolled up into
          view. Damping PHONE_DRIFT is the lever if it should hold steadier. */}
      <CaseStudyLayout
        sections={SECTIONS}
        background="bg-paper"
        paddingTop="pt-12 lg:pt-[258px]"
        paddingBottom="pb-8"
        sidebarVariant="mono"
        sidebarGridClassName="lg:grid-cols-[185px_1fr] lg:gap-[34px]"
      >
        {SECTIONS.filter((section) => section.id !== 'overview').map((section) => {
          const Custom = CUSTOM_SECTIONS[section.id];
          return <Custom key={section.id} />;
        })}
      </CaseStudyLayout>

      <MoreCaseStudies currentId="tfam" background="bg-paper" paddingTop="pt-10" />
    </>
  );
}
