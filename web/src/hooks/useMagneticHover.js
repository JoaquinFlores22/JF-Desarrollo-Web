import { useRef } from 'react';

// Aplicado deliberadamente solo a CTAs primarios (no a todo botón/link como
// hacía el sitio viejo) — evita jank innecesario en links de nav y en mobile.
export function useMagneticHover(strength = 0.25) {
  const ref = useRef(null);

  const onMouseMove = (e) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = (e.clientX - rect.left - rect.width / 2) * strength;
    const y = (e.clientY - rect.top - rect.height / 2) * strength;
    el.style.transform = `translate(${x}px, ${y}px)`;
  };

  const onMouseLeave = () => {
    if (ref.current) ref.current.style.transform = 'translate(0, 0)';
  };

  return { ref, onMouseMove, onMouseLeave };
}
