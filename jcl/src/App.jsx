import { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import Header from './components/Header';
import Footer from './components/Footer';
import Cursor from './components/Cursor';
import CartDrawer from './components/CartDrawer';
import Home from './pages/Home';
import Catalog from './pages/Catalog';
import Wholesale from './pages/Wholesale';
import HowToBuy from './pages/HowToBuy';
import Contact from './pages/Contact';
import Terms from './pages/Terms';
import NotFound from './pages/NotFound';

const EASE = [0.16, 1, 0.3, 1];

function Page({ children }) {
  return (
    <>
      <motion.div
        className="page-wipe"
        initial={{ scaleY: 1 }}
        animate={{ scaleY: 0 }}
        exit={{ scaleY: 1 }}
        style={{ transformOrigin: 'bottom' }}
        transition={{ duration: 0.6, ease: EASE }}
      />
      <motion.main
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.35, delay: 0.25 }}
      >
        {children}
      </motion.main>
    </>
  );
}

export default function App() {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <>
      <div className="grain" aria-hidden="true" />
      <Cursor />
      <Header />
      <CartDrawer />

      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<Page><Home /></Page>} />
          <Route path="/catalogo" element={<Page><Catalog /></Page>} />
          <Route path="/mayoristas" element={<Page><Wholesale /></Page>} />
          <Route path="/como-comprar" element={<Page><HowToBuy /></Page>} />
          <Route path="/contacto" element={<Page><Contact /></Page>} />
          <Route path="/terminos" element={<Page><Terms /></Page>} />
          <Route path="*" element={<Page><NotFound /></Page>} />
        </Routes>
      </AnimatePresence>

      <Footer />
    </>
  );
}
