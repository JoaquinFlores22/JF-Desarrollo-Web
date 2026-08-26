import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap, ScrollTrigger } from '../../lib/gsap';
import { useLanguage } from '../../context/LanguageContext';

const SIZE_CLASSES = {
  hero: 'text-6xl md:text-8xl leading-[0.9] tracking-tighter',
  cta: 'text-3xl md:text-5xl leading-tight tracking-tighter',
};

/**
 * Reveal de máscara para titulares grandes, al estilo React Bits.
 * - trigger="mount": anima una vez al montar (Hero, primera pasada).
 * - trigger="scroll": scrubbed contra el scroll, con 3 fases en un eje
 *   (reveal-in 0-30%, hold/pin 30-70% si pin=true, mask-close 70-100%) —
 *   para no cortar de golpe al salir de la vista.
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

      gsap.set(spans, { yPercent: 110 });

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
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: '+=60%',
          scrub: true,
          pin: pin || undefined,
          pinSpacing: false,
        },
      });

      tl.to(spans, { yPercent: 0, stagger: 0.12, ease: 'power2.out' }, 0)
        .to(containerRef.current, { autoAlpha: 1 }, 0)
        .to(spans, { yPercent: -110, stagger: 0.08, ease: 'power2.in' }, 0.7)
        .to(containerRef.current, { scale: 0.92, autoAlpha: 0, ease: 'power2.in' }, 0.7);

      return () => ScrollTrigger.getAll().forEach((st) => st.kill());
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
