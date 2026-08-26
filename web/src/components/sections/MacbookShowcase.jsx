import { MacbookScroll } from '../ui/macbook-scroll';
import { useScrollReveal } from '../../hooks/useScrollReveal';

// Imagen temporal: screenshot real de nuestra propia home (desarrollodigital.vercel.app).
// TODO: reemplazar por la URL final que decidamos (ver charla con el usuario).
const SCREEN_SRC = '/img/macbook-preview.png';

export default function MacbookShowcase() {
  const captionRef = useScrollReveal();

  return (
    <section className="w-full overflow-hidden">
      <MacbookScroll
        title={
          <span>
            Así se ve tu web, <br /> funcionando de verdad.
          </span>
        }
        src={SCREEN_SRC}
        showGradient={false}
      />

      <div ref={captionRef} className="-mt-16 md:-mt-24 relative z-10 px-6">
        <p className="max-w-md mx-auto text-center text-lg opacity-70">
          Esta es justamente la web que estás mirando ahora mismo: responsive, rápida, y
          construida con el mismo cuidado que le ponemos a cada proyecto que entregamos.
        </p>
      </div>
    </section>
  );
}
