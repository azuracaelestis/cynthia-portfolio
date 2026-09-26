import { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Analytics } from '@vercel/analytics/react';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import { useScrollToTopOnNavigate } from './hooks/useScrollToTopOnNavigate';

const ClassroomQuest = lazy(() => import('./pages/case-studies/ClassroomQuest'));
const TfamApp = lazy(() => import('./pages/case-studies/TfamApp'));
const VisualDesign = lazy(() => import('./pages/VisualDesign'));
const EducationBrochure = lazy(() => import('./pages/visual/EducationBrochure'));

// Exported so the build-time prerender (entry-server.jsx) can render the same
// tree inside a StaticRouter, without BrowserRouter or Analytics.
export function AppLayout() {
  useScrollToTopOnNavigate();

  return (
    <div className="min-h-screen bg-paper">
      <Header />
      <main>
        <Suspense fallback={null}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/work/classroom-quest" element={<ClassroomQuest />} />
            <Route path="/visual-design" element={<VisualDesign />} />
            <Route path="/visual-design/education-brochure-2026" element={<EducationBrochure />} />
            <Route path="/work/tfam-app" element={<TfamApp />} />
          </Routes>
        </Suspense>
      </main>
      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AppLayout />
      <Analytics />
    </BrowserRouter>
  );
}
