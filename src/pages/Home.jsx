import { Helmet } from 'react-helmet-async';
import Hero from '../components/Hero/Hero';
import DesignPractice from '../components/DesignPractice';
import CaseStudies from '../components/CaseStudies';
import AboutMe from '../components/AboutMe';
import { useScrollToHash } from '../hooks/useScrollToHash';

export default function Home() {
  useScrollToHash();

  return (
    <>
      <Helmet>
        <title>Cynthia Tanawi — Product & Graphic Designer</title>
        <link rel="canonical" href="https://cynthiatanawi.design/" />
        <meta
          name="description"
          content="Cynthia Tanawi's design portfolio — product and graphic design work bridging storytelling, collaboration, and fearless problem-solving."
        />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Cynthia Tanawi — Product & Graphic Designer" />
        <meta
          property="og:description"
          content="Cynthia Tanawi's design portfolio — product and graphic design work bridging storytelling, collaboration, and fearless problem-solving."
        />
        <meta property="og:image" content="/cynthia-og-image.jpg" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Cynthia Tanawi — Product & Graphic Designer" />
        <meta
          name="twitter:description"
          content="Cynthia Tanawi's design portfolio — product and graphic design work bridging storytelling, collaboration, and fearless problem-solving."
        />
        <meta name="twitter:image" content="/cynthia-og-image.jpg" />
      </Helmet>
      <Hero />
      <DesignPractice />
      <div className="relative">
        <div className="hidden lg:block sticky top-0 h-[500px] mx-auto max-w-[1302px] rounded-b-[32px] bg-bleed-blue" aria-hidden="true" />
        <CaseStudies />
      </div>
      <AboutMe />
    </>
  );
}
