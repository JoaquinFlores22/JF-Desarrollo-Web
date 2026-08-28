import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap } from '../../lib/gsap';

// Medidor circular tipo Lighthouse/PageSpeed: el arco y el numero cuentan
// de 0 al valor final una sola vez, al entrar en viewport. Sin dependencias
// de scroll-scrub (aprendimos con MaskedHeading que atar una animacion a
// distancia de scroll en pixeles es fragil) -- un reveal de una sola vez
// alcanza sobra para el efecto "wow" y es mucho mas robusto.
const SIZE = 96;
const STROKE = 8;
const RADIUS = (SIZE - STROKE) / 2;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

export default function ScoreGauge({ value = 98, label = 'Performance' }) {
  const arcRef = useRef(null);
  const textRef = useRef(null);
  const wrapRef = useRef(null);

  useGSAP(
    () => {
      if (!arcRef.current || !textRef.current) return;

      const counter = { n: 0 };
      gsap.set(arcRef.current, { strokeDashoffset: CIRCUMFERENCE });
      textRef.current.textContent = '0';

      gsap.to(counter, {
        n: value,
        duration: 1.4,
        ease: 'power2.out',
        onUpdate: () => {
          const n = Math.round(counter.n);
          textRef.current.textContent = String(n);
          arcRef.current.style.strokeDashoffset = String(CIRCUMFERENCE * (1 - n / 100));
        },
        scrollTrigger: {
          trigger: wrapRef.current,
          start: 'top 85%',
          toggleActions: 'play none none none',
        },
      });
    },
    { scope: wrapRef, dependencies: [value] },
  );

  return (
    <div ref={wrapRef} className="flex flex-col items-center gap-2">
      <div className="relative" style={{ width: SIZE, height: SIZE }}>
        <svg width={SIZE} height={SIZE} viewBox={`0 0 ${SIZE} ${SIZE}`} className="-rotate-90">
          <defs>
            <linearGradient id="scoreGaugeGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#4A6FA5" />
              <stop offset="100%" stopColor="#8B5CF6" />
            </linearGradient>
          </defs>
          <circle
            cx={SIZE / 2} cy={SIZE / 2} r={RADIUS}
            fill="none" stroke="currentColor" strokeWidth={STROKE}
            className="text-white/10"
          />
          <circle
            ref={arcRef}
            cx={SIZE / 2} cy={SIZE / 2} r={RADIUS}
            fill="none" stroke="url(#scoreGaugeGradient)" strokeWidth={STROKE}
            strokeLinecap="round" strokeDasharray={CIRCUMFERENCE}
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span ref={textRef} className="text-2xl font-black text-white tabular-nums">0</span>
        </div>
      </div>
      <span className="text-[10px] uppercase tracking-[0.15em] opacity-60 font-bold text-white">{label}</span>
    </div>
  );
}
