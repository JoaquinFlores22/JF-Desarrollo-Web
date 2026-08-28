import { useLanguage } from '../../context/LanguageContext';
import { useMagneticHover } from '../../hooks/useMagneticHover';
import { useScrollReveal } from '../../hooks/useScrollReveal';
import ScoreGauge from '../ui/score-gauge';

const STATS = [
  { valueKey: 'beneficios_maxima', labelKey: 'beneficios_velocidad', gauge: 98 },
  { valueKey: 'beneficios_google', labelKey: 'beneficios_posicionamiento' },
  { valueKey: 'beneficios_intuitiva', labelKey: 'beneficios_experiencia' },
  { valueKey: 'beneficios_absoluta', labelKey: 'beneficios_confianza' },
];

export default function BenefitsBand() {
  const { t } = useLanguage();
  const { ref: magneticRef, onMouseMove, onMouseLeave } = useMagneticHover();
  const gridRef = useScrollReveal();

  return (
    <section className="py-20">
      <div className="relative max-w-4xl mx-auto">
        <div className="absolute -inset-1 bg-gradient-to-r from-accent to-purple-600 rounded-[2.5rem] blur-xl opacity-20" />

        <div className="relative bg-[#1A1A1A]/80 backdrop-blur-2xl border border-white/10 p-12 rounded-[2rem] shadow-2xl">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
            <div className="space-y-4">
              <span className="inline-block py-1 px-3 rounded-full bg-accent/20 text-accent text-xs font-bold uppercase tracking-widest border border-accent/20">
                Lleva tu negocio al siguiente nivel
              </span>
              <h2 className="text-4xl md:text-5xl font-black text-white leading-tight">
                <span>{t('beneficios_titulo')}</span>
                <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-blue-400">{t('beneficios_titulo2')}</span>
              </h2>
            </div>

            <button
              ref={magneticRef}
              onMouseMove={onMouseMove}
              onMouseLeave={onMouseLeave}
              onClick={() => document.getElementById('contacto')?.scrollIntoView({ behavior: 'smooth' })}
              className="group relative px-8 py-4 bg-white text-black font-bold rounded-full overflow-hidden transition-all hover:scale-105 hover:bg-accent hover:text-white"
            >
              <span className="relative z-10">{t('btn_start_project')}</span>
              <div className="absolute inset-0 bg-accent opacity-0 group-hover:opacity-100 transition-opacity" />
            </button>
          </div>

          <div className="my-10 h-px w-full bg-gradient-to-r from-transparent via-white/20 to-transparent" />

          <div ref={gridRef} className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {STATS.map((stat) =>
              stat.gauge ? (
                <div className="group flex justify-center" key={stat.valueKey}>
                  <ScoreGauge value={stat.gauge} label={t(stat.labelKey)} />
                </div>
              ) : (
                <div className="group" key={stat.valueKey}>
                  <div className="text-3xl font-black text-white group-hover:text-accent transition-colors">{t(stat.valueKey)}</div>
                  <div className="text-[11px] uppercase opacity-60 tracking-[0.2em] mt-2 font-bold text-white">{t(stat.labelKey)}</div>
                </div>
              ),
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
