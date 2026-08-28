import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import { IconLock, IconCircleCheck } from '@tabler/icons-react';
import { gsap } from '../../lib/gsap';

// Chrome de navegador falso: tipea un dominio, "carga" al 100% y confirma
// optimizado -- mismo mecanismo de reveal de una sola vez que ScoreGauge
// (toggleActions play, sin scrub) y la misma precaucion de resetear en
// pixeles/porcentaje explicitamente antes de animar (ver MaskedHeading).
const DOMAIN = 'tu-negocio.com';

export default function BrowserBar() {
  const wrapRef = useRef(null);
  const textRef = useRef(null);
  const loadRef = useRef(null);
  const checkRef = useRef(null);

  useGSAP(
    () => {
      if (!textRef.current || !loadRef.current || !checkRef.current) return;

      const state = { i: 0 };
      textRef.current.textContent = '';
      gsap.set(loadRef.current, { scaleX: 0 });
      gsap.set(checkRef.current, { autoAlpha: 0, y: -4 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: wrapRef.current,
          start: 'top 85%',
          toggleActions: 'play none none none',
        },
      });

      tl.to(state, {
        i: DOMAIN.length,
        duration: DOMAIN.length * 0.06,
        ease: 'none',
        onUpdate: () => {
          textRef.current.textContent = DOMAIN.slice(0, Math.round(state.i));
        },
      })
        .to(loadRef.current, { scaleX: 1, duration: 0.6, ease: 'power2.out' }, '+=0.2')
        .to(checkRef.current, { autoAlpha: 1, y: 0, duration: 0.35, ease: 'power2.out' }, '-=0.15');
    },
    { scope: wrapRef },
  );

  return (
    <div
      ref={wrapRef}
      className="mx-auto w-full max-w-sm overflow-hidden rounded-2xl border border-black/10 bg-white/70 shadow-lg backdrop-blur-xl dark:border-white/10 dark:bg-white/5"
    >
      <div className="flex items-center gap-2 border-b border-black/5 px-4 py-3 dark:border-white/10">
        <span className="h-2.5 w-2.5 rounded-full bg-[#FF5F57]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#FEBC2E]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#28C840]" />
        <div className="ml-2 flex flex-1 items-center gap-1.5 rounded-full bg-black/5 px-3 py-1.5 dark:bg-white/10">
          <IconLock className="h-3 w-3 shrink-0 text-accent" />
          <span ref={textRef} className="truncate font-mono text-xs opacity-80" />
        </div>
      </div>

      <div className="h-1 w-full bg-black/5 dark:bg-white/10">
        <div ref={loadRef} className="h-full origin-left bg-linear-to-r from-accent to-[#8B5CF6]" />
      </div>

      <div ref={checkRef} className="flex items-center gap-2 px-4 py-3">
        <IconCircleCheck className="h-4 w-4 shrink-0 text-emerald-500" />
        <span className="text-xs font-bold text-emerald-500">Optimizada · carga en 0.4s</span>
      </div>
    </div>
  );
}
