import { useState } from 'react';
import Nav from './components/layout/Nav';
import Footer from './components/layout/Footer';
import FloatingWhatsApp from './components/layout/FloatingWhatsApp';
import Hero from './components/hero/Hero';
import BenefitsBand from './components/sections/BenefitsBand';
import MacbookShowcase from './components/sections/MacbookShowcase';
import LeadMagnet from './components/sections/LeadMagnet';
import Process from './components/sections/Process';
import BudgetCalculator from './components/sections/BudgetCalculator';
import Services from './components/sections/Services';
import AccordionGallery from './components/sections/ProjectShowcase/AccordionGallery';
import Faq from './components/sections/Faq';
import TerminalShowcase from './components/sections/TerminalShowcase';
import ClosingCta from './components/sections/ClosingCta';
import ContactForm from './components/sections/ContactForm';

export default function App() {
  const [selectedService, setSelectedService] = useState('');

  return (
    <>
      <Nav />

      <main className="max-w-5xl mx-auto px-6 pt-32 pb-24">
        <Hero />
        <BenefitsBand />
        <MacbookShowcase />
        <LeadMagnet />
        <Process />
        <BudgetCalculator />
        <Services onSelectService={setSelectedService} />
        <AccordionGallery />
        <Faq />
        <TerminalShowcase />
        <ClosingCta />
        <ContactForm selectedService={selectedService} onSelectService={setSelectedService} />
      </main>

      <Footer />
      <FloatingWhatsApp />
    </>
  );
}
