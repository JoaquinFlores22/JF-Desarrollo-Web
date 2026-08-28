import { lazy, Suspense, useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { Analytics } from '@vercel/analytics/react';
import Nav from './components/layout/Nav';
import Footer from './components/layout/Footer';
import FloatingWhatsApp from './components/layout/FloatingWhatsApp';
import HomePage from './pages/HomePage';

const ProyectosPage = lazy(() => import('./pages/ProyectosPage'));
const LegalesPage = lazy(() => import('./pages/LegalesPage'));
const NotFoundPage = lazy(() => import('./pages/NotFoundPage'));

// Al cambiar de ruta: si hay ancla (#contacto), scrollear a ese elemento
// -- reintentando, porque la sección puede estar en un chunk lazy que
// todavía no montó. Si no hay ancla, arrancar arriba.
function ScrollManager() {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    if (!hash) {
      window.scrollTo(0, 0);
      return;
    }
    let tries = 0;
    let timer;
    const go = () => {
      const el = document.getElementById(decodeURIComponent(hash.slice(1)));
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      } else if (tries++ < 25) {
        timer = setTimeout(go, 100);
      }
    };
    go();
    return () => clearTimeout(timer);
  }, [pathname, hash]);
  return null;
}

export default function App() {
  return (
    <>
      <ScrollManager />
      <Nav />

      <Suspense fallback={<div style={{ minHeight: '100vh' }} aria-hidden="true" />}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/proyectos" element={<ProyectosPage />} />
          <Route path="/legales" element={<LegalesPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Suspense>

      <Footer />
      <FloatingWhatsApp />
      <Analytics />
    </>
  );
}
