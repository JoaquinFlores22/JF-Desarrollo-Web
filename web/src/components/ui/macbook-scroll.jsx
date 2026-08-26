import { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

// Puerto a JS (sin TypeScript, sin alias "@/") del MacbookScroll de Aceternity UI:
// https://ui.aceternity.com/components/macbook-scroll — misma mecánica de scroll
// (la tapa se "cierra" y se acerca a medida que scrolleás), adaptada al stack de
// este proyecto (Vite + JSX simple, imports relativos).
export function MacbookScroll({ src, showGradient = false, title, badge }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref });
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  const scaleX = useTransform(scrollYProgress, [0, 0.3], [1.2, isMobile ? 1 : 1.5]);
  const scaleY = useTransform(scrollYProgress, [0, 0.3], [0.6, isMobile ? 1 : 1.5]);
  const translate = useTransform(scrollYProgress, [0, 1], [0, 1500]);
  const rotate = useTransform(scrollYProgress, [0.1, 0.12, 0.3], [-28, -28, 0]);
  const textTransform = useTransform(scrollYProgress, [0, 0.3], [0, 100]);
  const textOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);

  return (
    <div
      ref={ref}
      className="flex min-h-[200vh] shrink-0 transform flex-col items-center justify-start py-0 [perspective:800px] md:py-64"
    >
      <motion.h2
        style={{ translateY: textTransform, opacity: textOpacity }}
        className="mb-16 text-center text-3xl md:text-5xl font-black tracking-tighter"
      >
        {title}
      </motion.h2>

      {/* Lid: cámara + pantalla que muestra `src`, atadas al scroll */}
      <Lid src={src} scaleX={scaleX} scaleY={scaleY} rotate={rotate} translate={translate} />

      {/* Base: teclado, trackpad, parlantes */}
      <div className="relative -z-10 h-[22rem] w-[32rem] overflow-hidden rounded-2xl bg-gray-200 dark:bg-[#272729]">
        <div className="relative h-10 w-full">
          <div className="absolute inset-x-0 mx-auto h-4 w-[80%] bg-[#050505]" />
        </div>
        <div className="relative flex">
          <div className="mx-auto h-full w-[10%] overflow-hidden"><SpeakerGrid /></div>
          <div className="mx-auto h-full w-[80%]"><Keyboard /></div>
          <div className="mx-auto h-full w-[10%] overflow-hidden"><SpeakerGrid /></div>
        </div>
        <Trackpad />
        <div className="absolute inset-x-0 bottom-0 mx-auto h-2 w-20 rounded-tl-3xl rounded-tr-3xl bg-gradient-to-t from-[#272729] to-[#050505]" />
        {showGradient && (
          <div className="absolute inset-x-0 bottom-0 z-50 h-40 w-full bg-gradient-to-t from-white via-white to-transparent dark:from-black dark:via-black" />
        )}
        {badge && <div className="absolute bottom-4 left-4">{badge}</div>}
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
        className="relative h-[12rem] w-[32rem] rounded-2xl bg-[#010101] p-2"
      >
        <div
          style={{ boxShadow: '0px 2px 0px 2px #171717 inset' }}
          className="absolute inset-0 flex items-center justify-center rounded-lg bg-[#010101]"
        >
          <span className="text-white">
            <AceternityLogo />
          </span>
        </div>
        <div className="absolute left-0 top-[10%] h-40 w-px bg-gradient-to-b from-transparent via-white to-transparent" />
        <div className="absolute right-0 top-[10%] h-40 w-px bg-gradient-to-b from-transparent via-white to-transparent" />
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
        className="absolute inset-0 h-96 w-[32rem] rounded-2xl bg-[#010101] p-2"
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
      className="mt-2 flex h-40 gap-[2px] px-[0.5px]"
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
      className="absolute inset-x-0 bottom-0 mx-auto h-32 w-[40%] rounded-xl"
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
    <div className="mx-1 mb-2 mt-1 h-full rounded-md bg-[#050505] p-1">
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
