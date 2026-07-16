import { Helmet } from 'react-helmet-async';
import Header from './components/Header';
import Hero from './components/Hero/Hero';
import DesignPractice from './components/DesignPractice';
import CaseStudies from './components/CaseStudies';
import AboutMe from './components/AboutMe';
import Footer from './components/Footer';

export default function App() {
  return (
    <div className="min-h-screen bg-paper">
      <Helmet>
        <title>Cynthia Tanawi — Product & Graphic Designer</title>
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
        {/* Placeholder path — drop the real social-preview image at public/og-image.png before launch. */}
        <meta property="og:image" content="/og-image.png" />
      </Helmet>
      <Header />
      <main>
        <Hero />
        <DesignPractice />
        <div className="relative">
          <div className="sticky top-0 h-[500px] mx-auto max-w-6xl rounded-b-[32px] bg-bleed-blue" aria-hidden="true" />
          <CaseStudies />
        </div>
        <AboutMe />
      </main>
      <Footer />
    </div>
  );
}
