import { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useSpring, useTransform } from 'framer-motion';

// Puerto a JS (sin TypeScript, sin alias "@/") del MacbookScroll de Aceternity UI,
// simplificado a propósito: en el original la pantalla sigue viajando (translateY
// hasta 1500px) durante todo el scroll y termina superpuesta/oculta sobre el
// teclado — acá la tapa se abre, se asienta y se queda quieta y visible, con un
// texto explicativo que aparece al lado una vez que terminó de abrirse.
export function MacbookScroll({ src, caption, title }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] });
  const smoothProgress = useSpring(scrollYProgress, { stiffness: 90, damping: 26, restDelta: 0.001 });
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  // Fase 1 (0 → 0.4): la tapa se abre y se asienta. Fase 2 (en adelante):
  // todo queda quieto, solo entra el texto explicativo.
  const scaleX = useTransform(smoothProgress, [0, 0.4], [1.15, 1]);
  const scaleY = useTransform(smoothProgress, [0, 0.4], [0.7, 1]);
  const rotate = useTransform(smoothProgress, [0, 0.4], [isMobile ? -12 : -22, 0]);
  const translate = useTransform(smoothProgress, [0, 0.4], [24, 0]);

  const titleOpacity = useTransform(smoothProgress, [0, 0.18], [1, 0]);
  const titleTranslate = useTransform(smoothProgress, [0, 0.18], [0, -40]);

  const captionOpacity = useTransform(smoothProgress, [0.45, 0.65], [0, 1]);
  const captionTranslate = useTransform(smoothProgress, [0.45, 0.65], [24, 0]);

  return (
    <div ref={ref} className="relative flex min-h-[140vh] shrink-0 flex-col items-center justify-start [perspective:800px] md:py-32">
      <div className="sticky top-24 flex w-full flex-col items-center">
        <motion.h2
          style={{ opacity: titleOpacity, translateY: titleTranslate }}
          className="mb-14 px-6 text-center text-3xl md:text-5xl font-black tracking-tighter"
        >
          {title}
        </motion.h2>

        <div className="mx-auto flex w-full max-w-lg flex-col items-center gap-8 px-6 md:max-w-none md:flex-row md:items-start md:justify-center md:gap-14 md:px-0">
          {/* Laptop */}
          <div className="relative w-full max-w-lg shrink-0 md:w-[32rem]">
            <Lid src={src} scaleX={scaleX} scaleY={scaleY} rotate={rotate} translate={translate} />
            <div className="relative -z-10 h-[13rem] w-full overflow-hidden rounded-2xl bg-gray-200 dark:bg-[#272729] md:h-[22rem]">
              <div className="relative h-6 w-full md:h-10">
                <div className="absolute inset-x-0 mx-auto h-2.5 w-[80%] bg-[#050505] md:h-4" />
              </div>
              <div className="relative flex">
                <div className="mx-auto h-full w-[10%] overflow-hidden"><SpeakerGrid /></div>
                <div className="mx-auto h-full w-[80%]"><Keyboard /></div>
                <div className="mx-auto h-full w-[10%] overflow-hidden"><SpeakerGrid /></div>
              </div>
              <Trackpad />
              <div className="absolute inset-x-0 bottom-0 mx-auto h-2 w-20 rounded-tl-3xl rounded-tr-3xl bg-gradient-to-t from-[#272729] to-[#050505]" />
            </div>
          </div>

          {/* Explicación: aparece al lado una vez que la laptop terminó de abrirse */}
          <motion.div
            style={{ opacity: captionOpacity, translateY: captionTranslate }}
            className="max-w-sm px-6 text-center md:px-0 md:pt-16 md:text-left"
          >
            <p className="text-lg md:text-xl font-medium leading-relaxed opacity-80">{caption}</p>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

function Lid({ scaleX, scaleY, rotate, translate, src }) {
  return (
    <div className="relative [perspective:800px]">
      <div
        style={{
          transform: 'perspective(800px) rotateX(-25deg) translateZ(0px)',
          transformOrigin: 'bottom',
          transformStyle: 'preserve-3d',
        }}
        className="relative h-24 w-full rounded-2xl bg-[#010101] p-2 md:h-[12rem]"
      >
        <div
          style={{ boxShadow: '0px 2px 0px 2px #171717 inset' }}
          className="absolute inset-0 flex items-center justify-center rounded-lg bg-[#010101]"
        >
          <span className="text-white"><AceternityLogo /></span>
        </div>
        <span className="absolute left-[50%] top-0 h-2 w-16 -translate-x-1/2 rounded-b-xl bg-[#010101]" />
      </div>
      <motion.div
        style={{
          scaleX,
          scaleY,
          rotateX: rotate,
          translateY: translate,
          transformStyle: 'preserve-3d',
          transformOrigin: 'top',
        }}
        className="absolute inset-0 h-56 w-full rounded-2xl bg-[#010101] p-2 md:h-96"
      >
        <div className="absolute inset-0 rounded-lg bg-[#272729]" />
        {src && (
          <img
            src={src}
            alt=""
            className="absolute inset-0 h-full w-full rounded-lg object-cover object-left-top"
          />
        )}
      </motion.div>
    </div>
  );
}

function AceternityLogo() {
  return (
    <svg width="16" height="16" viewBox="0 0 66 65" fill="none" xmlns="http://www.w3.org/2000/svg" className="opacity-40">
      <path
        d="M8 8.05571C8 8.05571 54.9009 18.1782 57.8687 30.062C60.8365 41.9458 9.05432 57.4696 9.05432 57.4696"
        stroke="currentColor" strokeWidth="15" strokeMiterlimit="3.86874" strokeLinecap="round"
      />
    </svg>
  );
}

function SpeakerGrid() {
  return (
    <div
      className="mt-2 flex h-16 gap-[2px] px-[0.5px] md:h-40"
      style={{
        backgroundImage: 'radial-gradient(circle, #08070706 0.5px, transparent 0.5px)',
        backgroundSize: '3px 3px',
      }}
    />
  );
}

function Trackpad() {
  return (
    <div
      className="absolute inset-x-0 bottom-0 mx-auto hidden h-32 w-[40%] rounded-xl md:block"
      style={{ boxShadow: '0px 0px 1px 1px #00000020 inset' }}
    />
  );
}

const KEY_ROWS = [
  ['esc', 'F1', 'F2', 'F3', 'F4', 'F5', 'F6', 'F7', 'F8', 'F9', 'F10', 'F11', 'F12'],
  ['~', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '=', 'delete'],
  ['tab', 'Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P', '[', ']', '\\'],
  ['caps', 'A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L', ';', "'", 'return'],
  ['shift', 'Z', 'X', 'C', 'V', 'B', 'N', 'M', ',', '.', '/', 'shift'],
];

function Keyboard() {
  return (
    <div className="mx-1 mb-2 mt-1 hidden h-full rounded-md bg-[#050505] p-1 md:block">
      {KEY_ROWS.map((row, i) => (
        <div className="mb-[2px] flex w-full shrink-0 gap-[2px]" key={i}>
          {row.map((key) => (
            <div
              key={key}
              className="flex flex-1 items-center justify-center rounded-[4px] bg-[#0A090A] p-[0.5px]"
              style={{ boxShadow: '0px -0.5px 2px 0 #0D0D0F inset, 0px 0.5px 2px 0 #0D0D0F inset' }}
            >
              <div className="flex w-full flex-col items-center justify-center">
                <span className="text-[5px] text-white">{key}</span>
              </div>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}
