import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap } from '../../lib/gsap';
import { useLanguage } from '../../context/LanguageContext';

const SIZE_CLASSES = {
  hero: 'text-6xl md:text-8xl leading-[0.9] tracking-tighter',
  cta: 'text-3xl md:text-5xl leading-tight tracking-tighter',
};

/**
 * Reveal de máscara para titulares grandes, al estilo React Bits.
 * - trigger="mount": anima una vez al montar (Hero, primera pasada).
 * - trigger="scroll" + pin=true: scrubbed contra un rango fijo de scroll,
 *   con la seccion clavada en pantalla (reveal-in / hold / mask-close).
 * - trigger="scroll" sin pin: reveal de una sola vez al entrar en viewport,
 *   sin fase de cierre. Un cierre scrubbeado necesitaria medir en pixeles
 *   donde termina de salir la seccion del viewport, y ese numero se
 *   desincroniza en cuanto algo mas arriba en la pagina cambia de alto
 *   despues del montaje (fuentes, imagenes, otras animaciones) — quedaba
 *   clampeado en invisible mucho antes de que la seccion llegara al borde.
 *   El corte natural del borde del navegador al salir de vista es normal
 *   y no hace falta disimularlo.
 */
export default function MaskedHeading({
  lines,
  as: Tag = 'h1',
  size = 'hero',
  trigger = 'mount',
  pin = false,
  className = '',
}) {
  const containerRef = useRef(null);
  const { lang } = useLanguage();

  useGSAP(
    () => {
      const spans = gsap.utils.toArray('[data-mask-line]', containerRef.current);
      if (!spans.length) return;

      // y:0 explicito -- sin esto, un remanente de "y" en pixeles de un
      // gsap.set/to previo (p.ej. el segundo montaje de React StrictMode
      // en dev) queda cacheado y se combina con el nuevo yPercent, dejando
      // el span desplazado aunque yPercent llegue a 0.
      gsap.set(spans, { y: 0, yPercent: 110 });

      if (trigger === 'mount') {
        gsap.to(spans, {
          yPercent: 0,
          duration: 1.1,
          ease: 'power4.out',
          stagger: 0.12,
          delay: 0.15,
        });
        return;
      }

      // trigger === 'scroll'
      if (!pin) {
        gsap.to(spans, {
          yPercent: 0,
          duration: 1.1,
          ease: 'power4.out',
          stagger: 0.12,
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
        });
        return;
      }

      // trigger === 'scroll' + pin: pineado, con rango fijo de scroll.
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: '+=60%',
          scrub: true,
          pin: true,
          pinSpacing: false,
        },
      });

      tl.to(spans, { yPercent: 0, stagger: 0.12, ease: 'power2.out' }, 0)
        .to(containerRef.current, { autoAlpha: 1 }, 0)
        .to(spans, { yPercent: -110, stagger: 0.08, ease: 'power2.in' }, 0.7)
        .to(containerRef.current, { scale: 0.92, autoAlpha: 0, ease: 'power2.in' }, 0.7);
    },
    { scope: containerRef, dependencies: [lang, trigger, pin] },
  );

  return (
    <Tag ref={containerRef} className={`font-black ${SIZE_CLASSES[size]} ${className}`}>
      {lines.map((line, i) => (
        <div key={i} className="overflow-hidden">
          <span data-mask-line className="inline-block">{line}</span>
        </div>
      ))}
    </Tag>
  );
}
