import { Helmet } from 'react-helmet-async';
import CaseStudyLayout from '../../components/case-study/CaseStudyLayout';
import MoreCaseStudies from '../../components/case-study/MoreCaseStudies';
import Overview from './tfam-app/Overview';
import Impact from './tfam-app/Impact';
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

// Reveal the side nav once its slot is a quarter of the way up the screen,
// rather than when it reaches the top: Impact sits above the layout, so the
// nav's slot is the row just below it, and waiting for that row to reach the
// top made the nav show up late — after Impact was already scrolled away.
// (Impact itself never overlaps the nav: the nav rests below it.)
const NAV_START_LINE = () => window.innerHeight * 0.75;

const SECTIONS = [
  { id: 'overview', label: 'Overview' },
  { id: 'impact', label: 'Validation' },
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
        <link rel="canonical" href="https://cynthiatanawi.design/work/tfam-app" />
        <meta
          name="description"
          content="I redesigned the Taipei Fine Arts Museum app around three moments in the museum journey: plan, wander, and remember."
        />
        <meta property="og:type" content="article" />
        <meta property="og:title" content="TFAM App — Cynthia Tanawi" />
        <meta
          property="og:description"
          content="I redesigned the Taipei Fine Arts Museum app around three moments in the museum journey: plan, wander, and remember."
        />
        <meta property="og:image" content="/tfam-app-og-image.jpg" />
      </Helmet>

      <Overview />

      {/* Impact sits above the side-nav layout, as a centred full-width band,
          so it's the first thing read below the hero. Its top padding (set
          inside Impact.jsx) makes the gap between the phone mockups' visible
          bottom edge and the panel equal to the gap between the panel and
          Context below it — measured off the rendered page. The phones
          overhang the hero's dark edge and, with no scroll-linked drift,
          sit at a fixed spot, so that gap holds at every scroll position. */}
      <Impact />

      {/* The layout's own top padding is now just the normal gap between
          sections (matches Section.jsx's pt-24 lg:pt-[120px]). */}
      <CaseStudyLayout
        sections={SECTIONS}
        background="bg-paper"
        paddingTop="pt-24 lg:pt-[120px]"
        paddingBottom="pb-8"
        sidebarVariant="mono"
        sidebarGridClassName="lg:grid-cols-[185px_1fr] lg:gap-[34px]"
        navStartLine={NAV_START_LINE}
      >
        {SECTIONS.filter((section) => CUSTOM_SECTIONS[section.id]).map((section) => {
          const Custom = CUSTOM_SECTIONS[section.id];
          return <Custom key={section.id} />;
        })}
      </CaseStudyLayout>

      <MoreCaseStudies currentId="tfam" background="bg-paper" paddingTop="pt-10" />
    </>
  );
}
