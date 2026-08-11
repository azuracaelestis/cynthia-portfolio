import { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';

const ClassroomQuest = lazy(() => import('./pages/case-studies/ClassroomQuest'));

export default function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-paper">
        <Header />
        <main>
          <Suspense fallback={null}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/work/classroom-quest" element={<ClassroomQuest />} />
            </Routes>
          </Suspense>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}
