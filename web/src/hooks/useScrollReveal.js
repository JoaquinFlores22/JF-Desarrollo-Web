import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap } from '../lib/gsap';

// Portado de js/index.js (ScrollTrigger sobre ".grid > div"): revela las
// tarjetas hijas directas del contenedor con un fade+slide sutil y stagger.
export function useScrollReveal(selector = ':scope > *') {
  const containerRef = useRef(null);

  useGSAP(
    () => {
      const cards = gsap.utils.toArray(selector, containerRef.current);
      if (!cards.length) return;

      gsap.from(cards, {
        scrollTrigger: { trigger: containerRef.current, start: 'top bottom-=40' },
        opacity: 0,
        y: 24,
        duration: 0.35,
        stagger: 0.06,
        ease: 'power2.out',
      });
    },
    { scope: containerRef },
  );

  return containerRef;
}
