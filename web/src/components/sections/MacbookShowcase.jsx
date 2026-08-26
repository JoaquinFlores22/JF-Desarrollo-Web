import { MacbookScroll } from '../ui/macbook-scroll';
import TextType from '../ui/text-type';
import SplitFlapText from '../ui/split-flap-text';

// Screenshot real de nuestra propia home (desarrollodigital.vercel.app),
// encuadrado a la proporcion real de la pantalla del componente (4:3).
const SCREEN_SRC = '/img/macbook-preview.jpg';

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
      />

      <div className="mt-8 md:mt-12 max-w-2xl mx-auto px-6 text-center">
        <TextType
          as="p"
          text={[
            'Esta es justamente la web que estás mirando ahora mismo: responsive, rápida, y construida con el mismo cuidado que le ponemos a cada proyecto que entregamos.',
          ]}
          typingSpeed={20}
          initialDelay={200}
          loop={false}
          showCursor
          cursorCharacter="|"
          startOnVisible
          className="text-lg opacity-80"
        />

        <div className="mt-8 flex justify-center">
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
    </section>
  );
}
