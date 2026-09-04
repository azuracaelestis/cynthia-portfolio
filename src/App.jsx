import { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import { useScrollToTopOnNavigate } from './hooks/useScrollToTopOnNavigate';

const ClassroomQuest = lazy(() => import('./pages/case-studies/ClassroomQuest'));
const TfamApp = lazy(() => import('./pages/case-studies/TfamApp'));

function AppLayout() {
  useScrollToTopOnNavigate();

  return (
    <div className="min-h-screen bg-paper">
      <Header />
      <main>
        <Suspense fallback={null}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/work/classroom-quest" element={<ClassroomQuest />} />
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
    </BrowserRouter>
  );
}
