import Header from './components/Header';
import Hero from './components/Hero/Hero';
import DesignPractice from './components/DesignPractice';
import CaseStudies from './components/CaseStudies';
import AboutMe from './components/AboutMe';
import Footer from './components/Footer';

export default function App() {
  return (
    <div className="min-h-screen bg-paper">
      <Header />
      <main>
        <Hero />
        <DesignPractice />
        <CaseStudies />
        <AboutMe />
      </main>
      <Footer />
    </div>
  );
}
