import { MacbookScroll } from '../ui/macbook-scroll';
import SplitFlapText from '../ui/split-flap-text';

// Imagen temporal: screenshot real de nuestra propia home (desarrollodigital.vercel.app).
// TODO: reemplazar por la URL final que decidamos (ver charla con el usuario).
const SCREEN_SRC = '/img/macbook-preview.png';

function SidePanel() {
  return (
    <div className="text-center md:text-left">
      <p className="text-lg opacity-70 mb-6">
        Esta es justamente la web que estás mirando ahora mismo: responsive, rápida, y
        construida con el mismo cuidado que le ponemos a cada proyecto que entregamos.
      </p>
      <div className="flex justify-center md:justify-start">
        <SplitFlapText
          words={['WEB EN VIVO', '100% RESPONSIVE', 'SIEMPRE RAPIDA']}
          flipDuration={0.12}
          stagger={0.05}
          cycleDelay={2200}
          charset="alphanumeric"
          flipsPerChar={6}
          tileColor="#4A6FA5"
          textColor="#f8fafc"
          tileRadius={6}
          gap={4}
          fontSize={20}
          loop
          padTo={15}
        />
      </div>
    </div>
  );
}

export default function MacbookShowcase() {
  return (
    <section className="w-full">
      <MacbookScroll
        title={
          <span>
            Así se ve tu web, <br /> funcionando de verdad.
          </span>
        }
        src={SCREEN_SRC}
        showGradient={false}
        sidePanel={<SidePanel />}
      />
    </section>
  );
}
