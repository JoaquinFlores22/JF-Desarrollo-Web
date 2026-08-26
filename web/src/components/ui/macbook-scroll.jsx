import { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import {
  IconBrightnessDown,
  IconBrightnessUp,
  IconCaretRightFilled,
  IconCaretUpFilled,
  IconChevronUp,
  IconMicrophone,
  IconMoon,
  IconPlayerSkipForward,
  IconPlayerTrackNext,
  IconPlayerTrackPrev,
  IconTable,
  IconVolume,
  IconVolume2,
  IconVolume3,
  IconSearch,
  IconWorld,
  IconCommand,
  IconCaretLeftFilled,
  IconCaretDownFilled,
} from '@tabler/icons-react';

// Puerto fiel (sin TypeScript, sin el alias "@/", con framer-motion en vez de
// "motion/react") del MacbookScroll de Aceternity UI:
// https://ui.aceternity.com/components/macbook-scroll
//
// Diferencia deliberada respecto al original: ahi la pantalla viaja hasta
// 1500px de translateY a lo largo de TODO el scroll y termina tapada por el
// teclado (perdida de vista, sin nada cerca que la explique). Aca el
// translate se frena apenas la tapa termina de abrirse, asi la imagen queda
// asentada y visible -- el texto/contenido que la acompaña va DEBAJO, en
// flujo normal (ver MacbookShowcase), no scrolleado/pegado dentro de este
// componente. Sin sticky ni fases extra: abre, se asienta, listo.
function cn(...classes) {
  return classes.filter(Boolean).join(' ');
}

export function MacbookScroll({ src, showGradient, title, badge }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    if (window.innerWidth < 768) setIsMobile(true);
  }, []);

  const scaleX = useTransform(scrollYProgress, [0, 0.3], [1.2, isMobile ? 1 : 1.5]);
  const scaleY = useTransform(scrollYProgress, [0, 0.3], [0.6, isMobile ? 1 : 1.5]);
  const translate = useTransform(scrollYProgress, [0, 0.3], [0, 40]);
  const rotate = useTransform(scrollYProgress, [0.1, 0.12, 0.3], [-28, -28, 0]);
  const textTransform = useTransform(scrollYProgress, [0, 0.3], [0, 100]);
  const textOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  // El marco/bisel estatico de la tapa esta pensado para asomar solo
  // mientras la pantalla todavia esta chica/inclinada; una vez que termina
  // de abrirse queda "flotando" separado de la pantalla en vez de taparse
  // por completo. Se desvanece apenas termina la apertura.
  const bezelOpacity = useTransform(scrollYProgress, [0.15, 0.3], [1, 0]);

  return (
    <div ref={ref} className="relative flex min-h-[120vh] shrink-0 flex-col items-center justify-center [perspective:800px]">
      <motion.h2
        style={{ translateY: textTransform, opacity: textOpacity }}
        className="mb-20 text-center text-3xl font-black tracking-tighter text-graphite dark:text-white"
      >
        {title}
      </motion.h2>

      <Lid src={src} scaleX={scaleX} scaleY={scaleY} rotate={rotate} translate={translate} bezelOpacity={bezelOpacity} />

      <div className="relative -z-10 h-[22rem] w-[32rem] overflow-hidden rounded-2xl bg-gray-200 dark:bg-[#272729]">
        <div className="relative h-10 w-full">
          <div className="absolute inset-x-0 mx-auto h-4 w-[80%] bg-[#050505]" />
        </div>
        <div className="relative flex">
          <div className="mx-auto h-full w-[10%] overflow-hidden"><SpeakerGrid /></div>
          <div className="mx-auto h-full w-[80%]"><Keypad /></div>
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

function Lid({ scaleX, scaleY, rotate, translate, src, bezelOpacity }) {
  const bezelRef = useRef(null);
  useEffect(() => {
    if (!bezelOpacity) return;
    if (bezelRef.current) bezelRef.current.style.opacity = String(bezelOpacity.get());
    return bezelOpacity.on('change', (v) => {
      if (bezelRef.current) bezelRef.current.style.opacity = String(v);
    });
  }, [bezelOpacity]);

  return (
    <div className="relative [perspective:800px]">
      <div
        ref={bezelRef}
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
          <span className="text-white"><AceternityLogo /></span>
        </div>
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
          <img src={src} alt="" className="absolute inset-0 h-full w-full rounded-lg object-cover object-left-top" />
        )}
      </motion.div>
    </div>
  );
}

function Trackpad() {
  return (
    <div
      className="mx-auto my-1 h-32 w-[40%] rounded-xl"
      style={{ boxShadow: '0px 0px 1px 1px #00000020 inset' }}
    />
  );
}

function Keypad() {
  return (
    <div className="mx-1 h-full [transform:translateZ(0)] rounded-md bg-[#050505] p-1 [will-change:transform]">
      {/* Primera fila */}
      <div className="mb-[2px] flex w-full shrink-0 gap-[2px]">
        <KBtn className="w-10 items-end justify-start pb-[2px] pl-[4px]" childrenClassName="items-start">esc</KBtn>
        <KBtn><IconBrightnessDown className="h-[6px] w-[6px]" /><span className="mt-1 inline-block">F1</span></KBtn>
        <KBtn><IconBrightnessUp className="h-[6px] w-[6px]" /><span className="mt-1 inline-block">F2</span></KBtn>
        <KBtn><IconTable className="h-[6px] w-[6px]" /><span className="mt-1 inline-block">F3</span></KBtn>
        <KBtn><IconSearch className="h-[6px] w-[6px]" /><span className="mt-1 inline-block">F4</span></KBtn>
        <KBtn><IconMicrophone className="h-[6px] w-[6px]" /><span className="mt-1 inline-block">F5</span></KBtn>
        <KBtn><IconMoon className="h-[6px] w-[6px]" /><span className="mt-1 inline-block">F6</span></KBtn>
        <KBtn><IconPlayerTrackPrev className="h-[6px] w-[6px]" /><span className="mt-1 inline-block">F7</span></KBtn>
        <KBtn><IconPlayerSkipForward className="h-[6px] w-[6px]" /><span className="mt-1 inline-block">F8</span></KBtn>
        <KBtn><IconPlayerTrackNext className="h-[6px] w-[6px]" /><span className="mt-1 inline-block">F9</span></KBtn>
        <KBtn><IconVolume3 className="h-[6px] w-[6px]" /><span className="mt-1 inline-block">F10</span></KBtn>
        <KBtn><IconVolume2 className="h-[6px] w-[6px]" /><span className="mt-1 inline-block">F11</span></KBtn>
        <KBtn><IconVolume className="h-[6px] w-[6px]" /><span className="mt-1 inline-block">F12</span></KBtn>
        <KBtn>
          <div className="h-4 w-4 rounded-full bg-gradient-to-b from-neutral-900 from-20% via-black via-50% to-neutral-900 to-95% p-px">
            <div className="h-full w-full rounded-full bg-black" />
          </div>
        </KBtn>
      </div>

      {/* Segunda fila */}
      <div className="mb-[2px] flex w-full shrink-0 gap-[2px]">
        <KBtn><span className="block">~</span><span className="mt-1 block">`</span></KBtn>
        <KBtn><span className="block">!</span><span className="block">1</span></KBtn>
        <KBtn><span className="block">@</span><span className="block">2</span></KBtn>
        <KBtn><span className="block">#</span><span className="block">3</span></KBtn>
        <KBtn><span className="block">$</span><span className="block">4</span></KBtn>
        <KBtn><span className="block">%</span><span className="block">5</span></KBtn>
        <KBtn><span className="block">^</span><span className="block">6</span></KBtn>
        <KBtn><span className="block">&amp;</span><span className="block">7</span></KBtn>
        <KBtn><span className="block">*</span><span className="block">8</span></KBtn>
        <KBtn><span className="block">(</span><span className="block">9</span></KBtn>
        <KBtn><span className="block">)</span><span className="block">0</span></KBtn>
        <KBtn><span className="block">&mdash;</span><span className="block">_</span></KBtn>
        <KBtn><span className="block">+</span><span className="block"> = </span></KBtn>
        <KBtn className="w-10 items-end justify-end pr-[4px] pb-[2px]" childrenClassName="items-end">delete</KBtn>
      </div>

      {/* Tercera fila */}
      <div className="mb-[2px] flex w-full shrink-0 gap-[2px]">
        <KBtn className="w-10 items-end justify-start pb-[2px] pl-[4px]" childrenClassName="items-start">tab</KBtn>
        {['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'].map((k) => (
          <KBtn key={k}><span className="block">{k}</span></KBtn>
        ))}
        <KBtn><span className="block">{'{'}</span><span className="block">{'['}</span></KBtn>
        <KBtn><span className="block">{'}'}</span><span className="block">{']'}</span></KBtn>
        <KBtn><span className="block">{'|'}</span><span className="block">{'\\'}</span></KBtn>
      </div>

      {/* Cuarta fila */}
      <div className="mb-[2px] flex w-full shrink-0 gap-[2px]">
        <KBtn className="w-[2.8rem] items-end justify-start pb-[2px] pl-[4px]" childrenClassName="items-start">caps lock</KBtn>
        {['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'].map((k) => (
          <KBtn key={k}><span className="block">{k}</span></KBtn>
        ))}
        <KBtn><span className="block">{':'}</span><span className="block">{';'}</span></KBtn>
        <KBtn><span className="block">{'"'}</span><span className="block">{"'"}</span></KBtn>
        <KBtn className="w-[2.85rem] items-end justify-end pr-[4px] pb-[2px]" childrenClassName="items-end">return</KBtn>
      </div>

      {/* Quinta fila */}
      <div className="mb-[2px] flex w-full shrink-0 gap-[2px]">
        <KBtn className="w-[3.65rem] items-end justify-start pb-[2px] pl-[4px]" childrenClassName="items-start">shift</KBtn>
        {['Z', 'X', 'C', 'V', 'B', 'N', 'M'].map((k) => (
          <KBtn key={k}><span className="block">{k}</span></KBtn>
        ))}
        <KBtn><span className="block">{'<'}</span><span className="block">{','}</span></KBtn>
        <KBtn><span className="block">{'>'}</span><span className="block">{'.'}</span></KBtn>
        <KBtn><span className="block">{'?'}</span><span className="block">{'/'}</span></KBtn>
        <KBtn className="w-[3.65rem] items-end justify-end pr-[4px] pb-[2px]" childrenClassName="items-end">shift</KBtn>
      </div>

      {/* Sexta fila */}
      <div className="mb-[2px] flex w-full shrink-0 gap-[2px]">
        <KBtn childrenClassName="h-full justify-between py-[4px]">
          <div className="flex w-full justify-end pr-1"><span className="block">fn</span></div>
          <div className="flex w-full justify-start pl-1"><IconWorld className="h-[6px] w-[6px]" /></div>
        </KBtn>
        <KBtn childrenClassName="h-full justify-between py-[4px]">
          <div className="flex w-full justify-end pr-1"><IconChevronUp className="h-[6px] w-[6px]" /></div>
          <div className="flex w-full justify-start pl-1"><span className="block">control</span></div>
        </KBtn>
        <KBtn childrenClassName="h-full justify-between py-[4px]">
          <div className="flex w-full justify-end pr-1"><OptionKey className="h-[6px] w-[6px]" /></div>
          <div className="flex w-full justify-start pl-1"><span className="block">option</span></div>
        </KBtn>
        <KBtn className="w-8" childrenClassName="h-full justify-between py-[4px]">
          <div className="flex w-full justify-end pr-1"><IconCommand className="h-[6px] w-[6px]" /></div>
          <div className="flex w-full justify-start pl-1"><span className="block">command</span></div>
        </KBtn>
        <KBtn className="w-[8.2rem]" />
        <KBtn className="w-8" childrenClassName="h-full justify-between py-[4px]">
          <div className="flex w-full justify-start pl-1"><IconCommand className="h-[6px] w-[6px]" /></div>
          <div className="flex w-full justify-start pl-1"><span className="block">command</span></div>
        </KBtn>
        <KBtn childrenClassName="h-full justify-between py-[4px]">
          <div className="flex w-full justify-start pl-1"><OptionKey className="h-[6px] w-[6px]" /></div>
          <div className="flex w-full justify-start pl-1"><span className="block">option</span></div>
        </KBtn>
        <div className="mt-[2px] flex h-6 w-[4.9rem] flex-col items-center justify-end rounded-[4px] p-[0.5px]">
          <KBtn className="h-3 w-6"><IconCaretUpFilled className="h-[6px] w-[6px]" /></KBtn>
          <div className="flex">
            <KBtn className="h-3 w-6"><IconCaretLeftFilled className="h-[6px] w-[6px]" /></KBtn>
            <KBtn className="h-3 w-6"><IconCaretDownFilled className="h-[6px] w-[6px]" /></KBtn>
            <KBtn className="h-3 w-6"><IconCaretRightFilled className="h-[6px] w-[6px]" /></KBtn>
          </div>
        </div>
      </div>
    </div>
  );
}

function KBtn({ className, children, childrenClassName, backlit = true }) {
  return (
    <div className={cn('[transform:translateZ(0)] rounded-[4px] p-[0.5px] [will-change:transform]', backlit && 'bg-white/[0.2] shadow-xl shadow-white')}>
      <div
        className={cn('flex h-6 w-6 items-center justify-center rounded-[3.5px] bg-[#0A090D]', className)}
        style={{ boxShadow: '0px -0.5px 2px 0 #0D0D0F inset, -0.5px 0px 2px 0 #0D0D0F inset' }}
      >
        <div className={cn('flex w-full flex-col items-center justify-center text-[5px] text-neutral-200', childrenClassName, backlit && 'text-white')}>
          {children}
        </div>
      </div>
    </div>
  );
}

function SpeakerGrid() {
  return (
    <div
      className="mt-2 flex h-40 gap-[2px] px-[0.5px]"
      style={{ backgroundImage: 'radial-gradient(circle, #08080A 0.5px, transparent 0.5px)', backgroundSize: '3px 3px' }}
    />
  );
}

function OptionKey({ className }) {
  return (
    <svg fill="none" viewBox="0 0 32 32" className={className}>
      <rect stroke="currentColor" strokeWidth={2} x="18" y="5" width="10" height="2" />
      <polygon stroke="currentColor" strokeWidth={2} points="10.6,5 4,5 4,7 9.4,7 18.4,27 28,27 28,25 19.6,25 " />
      <rect width="32" height="32" stroke="none" fill="none" />
    </svg>
  );
}

function AceternityLogo() {
  return (
    <svg width="66" height="65" viewBox="0 0 66 65" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 text-white">
      <path
        d="M8 8.05571C8 8.05571 54.9009 18.1782 57.8687 30.062C60.8365 41.9458 9.05432 57.4696 9.05432 57.4696"
        stroke="currentColor" strokeWidth="15" strokeMiterlimit="3.86874" strokeLinecap="round"
      />
    </svg>
  );
}
