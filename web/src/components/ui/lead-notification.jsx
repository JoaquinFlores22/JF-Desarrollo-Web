import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap } from '../../lib/gsap';

// Notificacion flotante tipo macOS/iOS: entra, se sostiene un rato y se va
// sola -- secuencia por TIEMPO (no por scroll), disparada una sola vez al
// entrar en viewport. Puramente decorativa, vende "te contactamos rapido".
export default function LeadNotification() {
  const wrapRef = useRef(null);

  useGSAP(
    () => {
      if (!wrapRef.current) return;

      gsap.set(wrapRef.current, { autoAlpha: 0, y: -16, scale: 0.96 });

      gsap.timeline({
        scrollTrigger: {
          trigger: wrapRef.current,
          start: 'top 85%',
          toggleActions: 'play none none none',
        },
      })
        .to(wrapRef.current, { autoAlpha: 1, y: 0, scale: 1, duration: 0.5, ease: 'back.out(1.7)' })
        .to(wrapRef.current, { autoAlpha: 0, y: -10, duration: 0.4, ease: 'power2.in' }, '+=3.2');
    },
    { scope: wrapRef },
  );

  return (
    <div
      ref={wrapRef}
      className="pointer-events-none absolute left-1/2 top-0 z-20 w-64 -translate-x-1/2 md:left-auto md:right-4 md:translate-x-0"
    >
      <div className="flex items-start gap-3 rounded-2xl border border-black/5 bg-white p-3 shadow-2xl dark:border-white/10 dark:bg-[#242424]">
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-linear-to-br from-accent to-[#8B5CF6] text-base">
          💬
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex items-center justify-between gap-2">
            <span className="text-xs font-black">Nuevo mensaje</span>
            <span className="text-[10px] opacity-50 shrink-0">ahora</span>
          </div>
          <p className="mt-0.5 truncate text-xs opacity-70">"Necesito una web para mi negocio..."</p>
        </div>
      </div>
    </div>
  );
}
