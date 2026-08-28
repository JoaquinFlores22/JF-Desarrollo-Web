import { lazy, Suspense, useState } from 'react';
import Hero from '../components/hero/Hero';
import BenefitsBand from '../components/sections/BenefitsBand';
import { usePageMeta } from '../hooks/usePageMeta';

// Todo lo que está bajo el fold se carga en su propio chunk. MacbookShowcase
// además arrastra framer-motion, así que sacarlo del chunk principal es la
// mayor ganancia de peso.
const MacbookShowcase = lazy(() => import('../components/sections/MacbookShowcase'));
const Process = lazy(() => import('../components/sections/Process'));
const BudgetCalculator = lazy(() => import('../components/sections/BudgetCalculator'));
const Services = lazy(() => import('../components/sections/Services'));
const AccordionGallery = lazy(() => import('../components/sections/ProjectShowcase/AccordionGallery'));
const Faq = lazy(() => import('../components/sections/Faq'));
const ClosingCta = lazy(() => import('../components/sections/ClosingCta'));
const ContactForm = lazy(() => import('../components/sections/ContactForm'));

function Deferred({ minHeight, children }) {
  return (
    <Suspense fallback={<div style={{ minHeight }} aria-hidden="true" />}>{children}</Suspense>
  );
}

export default function HomePage() {
  const [selectedService, setSelectedService] = useState('');

  usePageMeta({
    title: 'Estudio Flores | Sitios Web de Alto Rendimiento para Empresas',
    description:
      'Diseño y desarrollo web profesional que impulsa tus ventas. Creamos sitios rápidos, seguros y optimizados para convertir visitantes en clientes reales.',
    path: '/',
  });

  return (
    <main className="max-w-5xl mx-auto px-6 pt-32 pb-24">
      <Hero />
      <BenefitsBand />

      <Deferred minHeight="120vh"><MacbookShowcase /></Deferred>
      <Deferred minHeight="90vh"><Process /></Deferred>
      <Deferred minHeight="80vh"><BudgetCalculator /></Deferred>
      <Deferred minHeight="140vh"><Services onSelectService={setSelectedService} /></Deferred>
      <Deferred minHeight="90vh"><AccordionGallery /></Deferred>
      <Deferred minHeight="70vh"><Faq /></Deferred>
      <Deferred minHeight="40vh"><ClosingCta /></Deferred>
      <Deferred minHeight="90vh">
        <ContactForm selectedService={selectedService} onSelectService={setSelectedService} />
      </Deferred>
    </main>
  );
}
