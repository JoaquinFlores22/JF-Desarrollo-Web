import MaskedHeading from '../hero/MaskedHeading';

// Eco de cierre del MaskedHeading del Hero: mismo mecanismo, escala menor,
// disparado por scroll (sin pin) — da el ritmo de "bookend" antes del form.
export default function ClosingCta() {
  return (
    <section className="max-w-4xl mx-auto px-6 py-16 text-center">
      <p className="text-xs font-black uppercase tracking-[.2em] text-accent mb-6">¿Hablamos?</p>
      <MaskedHeading
        as="h2"
        size="cta"
        trigger="scroll"
        pin={false}
        className="justify-center"
        lines={['Tu próximo proyecto', <span className="text-gradient" key="empieza">empieza acá.</span>]}
      />
    </section>
  );
}
