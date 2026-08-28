import { MacbookScroll } from '../ui/macbook-scroll';
import MacLockScreen from '../ui/mac-lock-screen';
import PhoneFrame from '../ui/phone-frame';
import TextType from '../ui/text-type';
import SplitFlapText from '../ui/split-flap-text';
import { useScrollReveal } from '../../hooks/useScrollReveal';

export default function MacbookShowcase() {
  // El celular vive suelto al lado del Mac -- completa en la practica el
  // "100% RESPONSIVE" que el SplitFlapText de abajo solo promete en texto.
  const phoneRevealRef = useScrollReveal();

  return (
    <section className="w-full">
      <div className="relative">
        <MacbookScroll
          title={
            <span>
              Cuidamos cada detalle, <br /> hasta el que no ves.
            </span>
          }
          screen={<MacLockScreen />}
          showGradient={false}
        />

        {/*
          El Mac se centra dentro de un contenedor min-h-[120vh] (para el
          scroll-jack de la tapa), asi que "bottom/right en %" queda relativo
          a esa caja gigante, no al laptop en si -- flota lejos de el. En
          cambio, el laptop esta siempre centrado y con medidas en rem fijas
          (no dependen del viewport), asi que anclamos el telefono al CENTRO
          (top-1/2 left-1/2, robusto a cualquier alto de viewport) y lo
          corremos con un offset fijo en px hasta la esquina inferior-derecha
          de la pantalla ya asentada (medido con la tapa abierta del todo).
        */}
        <div
          ref={phoneRevealRef}
          className="pointer-events-none absolute top-[calc(50%+280px)] left-[calc(50%+312px)] hidden w-24 md:block lg:w-28"
        >
          <PhoneFrame>
            <MacLockScreen compact initials="JF" />
          </PhoneFrame>
        </div>
      </div>

      <div className="mt-8 md:mt-12 max-w-2xl mx-auto px-6 text-center">
        <TextType
          as="p"
          text={[
            'Responsive, rápida y prolija de la punta a la punta: el mismo cuidado que le ponemos a cada proyecto que entregamos, se note o no a simple vista.',
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
