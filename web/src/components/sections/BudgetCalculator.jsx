import { useMemo, useState } from 'react';
import { budgetRanges, budgetTypeLabels, budgetExtras } from '../../data/budgetRanges';
import { useMagneticHover } from '../../hooks/useMagneticHover';
import { waHref } from '../../lib/contact';

export default function BudgetCalculator() {
  const { ref: magneticRef, onMouseMove, onMouseLeave } = useMagneticHover();
  const [type, setType] = useState('esencial');
  const [extra, setExtra] = useState(0);
  const isEstudio = type === 'estudio';

  const { rangeText, waLink } = useMemo(() => {
    const [min, max] = budgetRanges[type];
    const extraValue = isEstudio ? 0 : Number(extra);
    const format = (n) => `$ ${n.toLocaleString('es-AR')}`;
    const rangeText = isEstudio
      ? `Desde ${format(min)}`
      : `${format(min + extraValue)} – ${format(max + extraValue)}`;

    const extraLabel = budgetExtras.find((e) => e.value === extraValue)?.label ?? '';
    const message = isEstudio
      ? `Hola, Joaquín. Me interesa un ${budgetTypeLabels[type]}. Quiero coordinar una llamada para el presupuesto.`
      : `Hola, Joaquín. Estimé un proyecto de ${budgetTypeLabels[type]} con ${extraLabel}. Quiero conversar el presupuesto.`;
    const waLink = waHref(message);

    return { rangeText, waLink };
  }, [type, extra, isEstudio]);

  return (
    <section id="presupuesto" className="max-w-5xl mx-auto py-24 px-6">
      <div className="bg-[#1A1A1A] text-white rounded-[2.5rem] p-8 md:p-14 grid md:grid-cols-2 gap-12 items-center">
        <div>
          <p className="text-xs font-black uppercase tracking-[.2em] text-blue-300 mb-5">Estimá tu proyecto</p>
          <h2 className="text-4xl md:text-5xl font-black tracking-tighter">Una primera cifra<br />para empezar.</h2>
          <p className="text-white/60 mt-5 max-w-sm">
            Elegí el alcance. Te damos un rango orientativo y podés enviarlo por WhatsApp para conversar los detalles.
          </p>
        </div>

        <div className="space-y-5">
          <label className="block text-sm font-bold">
            Tipo de proyecto
            <select
              value={type}
              onChange={(e) => setType(e.target.value)}
              className="mt-2 w-full p-4 rounded-2xl bg-white/10 border border-white/20 text-white"
            >
              <option value="esencial">Esencial — landing con firma</option>
              <option value="firma">Firma — varias páginas</option>
              <option value="estudio">Estudio — a medida</option>
            </select>
          </label>

          <label className="block text-sm font-bold">
            Extras
            <select
              value={extra}
              onChange={(e) => setExtra(Number(e.target.value))}
              disabled={isEstudio}
              className="mt-2 w-full p-4 rounded-2xl bg-white/10 border border-white/20 text-white disabled:opacity-40"
            >
              {budgetExtras.map((opt) => (
                <option value={opt.value} key={opt.value}>{opt.label}</option>
              ))}
            </select>
          </label>

          <div className="border-t border-white/20 pt-5 flex flex-wrap justify-between items-end gap-x-4 gap-y-1">
            <span className="text-sm text-white/60">{isEstudio ? 'Cerrado por proyecto' : 'Rango orientativo'}</span>
            <strong className="text-2xl md:text-3xl font-black text-blue-300 tabular-nums whitespace-nowrap">{rangeText}</strong>
          </div>

          <a
            ref={magneticRef}
            onMouseMove={onMouseMove}
            onMouseLeave={onMouseLeave}
            href={waLink}
            target="_blank"
            rel="noopener noreferrer"
            className="block text-center py-4 rounded-full bg-white text-black font-black hover:bg-blue-300 transition"
          >
            Consultar esta propuesta →
          </a>
        </div>
      </div>
    </section>
  );
}
