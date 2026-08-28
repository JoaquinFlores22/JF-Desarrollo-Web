import { useEffect, useRef } from 'react';

// Cursor de dos piezas: un punto que sigue exacto y un aro que va con
// retardo y crece sobre elementos interactivos. Se apaga solo en touch (CSS).
export default function Cursor() {
  const dot = useRef(null);
  const ring = useRef(null);

  useEffect(() => {
    if (window.matchMedia('(pointer: coarse)').matches) return;
    const rx = { x: innerWidth / 2, y: innerHeight / 2 };
    const target = { ...rx };
    let raf;

    const move = (e) => {
      target.x = e.clientX;
      target.y = e.clientY;
      if (dot.current) dot.current.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
      const hot = e.target.closest('a, button, input, [data-hot]');
      ring.current?.classList.toggle('hot', Boolean(hot));
    };

    const loop = () => {
      rx.x += (target.x - rx.x) * 0.18;
      rx.y += (target.y - rx.y) * 0.18;
      if (ring.current) ring.current.style.transform = `translate(${rx.x}px, ${rx.y}px)`;
      raf = requestAnimationFrame(loop);
    };

    window.addEventListener('pointermove', move);
    loop();
    return () => {
      window.removeEventListener('pointermove', move);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <>
      <div ref={dot} className="cursor-dot" aria-hidden="true" />
      <div ref={ring} className="cursor-ring" aria-hidden="true" />
    </>
  );
}
