import { MacbookScroll } from '../ui/macbook-scroll';

// Imagen temporal: screenshot real de nuestra propia home (desarrollodigital.vercel.app).
// TODO: reemplazar por la URL final que decidamos (ver charla con el usuario).
const SCREEN_SRC = '/img/macbook-preview.png';

export default function MacbookShowcase() {
  return (
    <section className="w-full overflow-hidden">
      <MacbookScroll
        title={
          <span>
            Así se ve tu web, <br /> funcionando de verdad.
          </span>
        }
        src={SCREEN_SRC}
        caption="Esta es justamente la web que estás mirando ahora mismo: responsive, rápida, y construida con el mismo cuidado que le ponemos a cada proyecto que entregamos."
      />
    </section>
  );
}
