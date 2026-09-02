import { useLanguage } from '../../context/LanguageContext';
import { useScrollReveal } from '../../hooks/useScrollReveal';

// Tres escalones en un eje (todos con la firma de JF Desarrollo; los de arriba
// suman lo que tiene costo real) + Cuidado Continuo como servicio mensual
// aparte, en una franja ancha para que no compita con la escalera.
// El valor de `service` tiene que coincidir con el <option value> del select
// de ContactForm.
const TIERS = [
  {
    service: 'Esencial',
    eyebrow: 'serv_basico',
    title: 'serv_basico_titulo',
    price: 'serv_basico_precio',
    desc: 'serv_basico_desc',
    feats: ['serv_basico_feat1', 'serv_basico_feat2', 'serv_basico_feat3'],
    cta: 'serv_basico_cta',
  },
  {
    service: 'Firma',
    featured: true,
    badge: 'serv_multipagina_badge',
    title: 'serv_multipagina_titulo',
    price: 'serv_multi_precio',
    desc: 'serv_multipagina_desc',
    feats: ['serv_multi_feat1', 'serv_multi_feat2', 'serv_multi_feat3'],
    cta: 'serv_multi_cta',
  },
  {
    service: 'Estudio',
    eyebrow: 'serv_estudio',
    title: 'serv_estudio_titulo',
    price: 'serv_estudio_precio',
    desc: 'serv_estudio_desc',
    feats: ['serv_estudio_feat1', 'serv_estudio_feat2', 'serv_estudio_feat3'],
    cta: 'serv_estudio_cta',
  },
];

export default function Services({ onSelectService }) {
  const { t } = useLanguage();
  const gridRef = useScrollReveal();

  const selectAndScroll = (service) => (e) => {
    e.preventDefault();
    onSelectService(service);
    document.getElementById('contacto')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="servicios" className="max-w-6xl mx-auto py-32 px-6">
      <h2 className="text-6xl font-black mb-24 text-center tracking-tighter">{t('servicios_titulo')}</h2>

      <div ref={gridRef} className="grid md:grid-cols-3 gap-10 md:items-stretch">
        {TIERS.map((tier) =>
          tier.featured ? (
            <div
              key={tier.service}
              className="relative flex flex-col h-full bg-white dark:bg-[#121212] p-10 rounded-[3rem] border-2 border-accent shadow-2xl md:-mt-8 md:scale-105 group z-10"
            >
              <div className="absolute -top-5 left-1/2 -translate-x-1/2 whitespace-nowrap bg-accent text-white text-[10px] font-black px-6 py-2 rounded-full uppercase tracking-[0.15em] shadow-xl">
                {t(tier.badge)}
              </div>
              <h3 className="text-4xl font-black mb-3 mt-4">{t(tier.title)}</h3>
              <p className="text-xl font-black text-accent mb-6">{t(tier.price)}</p>
              <p className="text-sm opacity-60 mb-8 leading-relaxed">{t(tier.desc)}</p>
              <ul className="space-y-5 mb-10 text-sm font-bold">
                {tier.feats.map((feat) => (
                  <li className="flex items-start gap-3 text-accent" key={feat}>
                    <span>✦</span> <span className="text-black dark:text-white">{t(feat)}</span>
                  </li>
                ))}
              </ul>
              <a
                href="#contacto"
                onClick={selectAndScroll(tier.service)}
                className="block mt-auto text-center py-5 rounded-full bg-accent text-white font-black text-lg hover:brightness-110 shadow-lg shadow-accent/40 transition-all"
              >
                {t(tier.cta)}
              </a>
            </div>
          ) : (
            <div
              key={tier.service}
              className="relative flex flex-col h-full bg-white/40 dark:bg-[#2A2A2A]/40 backdrop-blur-2xl p-10 rounded-[3rem] border border-black/5 dark:border-white/10 transition-shadow duration-500 hover:shadow-2xl hover:-translate-y-2 group"
            >
              <div className="text-accent font-black text-xs uppercase tracking-[0.2em] mb-4 opacity-70">{t(tier.eyebrow)}</div>
              <h3 className="text-3xl font-black mb-3 group-hover:text-accent transition-colors">{t(tier.title)}</h3>
              <p className="text-xl font-black text-accent mb-6">{t(tier.price)}</p>
              <p className="text-sm opacity-60 mb-8 leading-relaxed">{t(tier.desc)}</p>
              <ul className="space-y-5 mb-10 text-sm opacity-80">
                {tier.feats.map((feat) => (
                  <li className="flex items-start gap-3" key={feat}>
                    <span className="text-accent">●</span> <span>{t(feat)}</span>
                  </li>
                ))}
              </ul>
              <a
                href="#contacto"
                onClick={selectAndScroll(tier.service)}
                className="block mt-auto text-center py-4 rounded-full border-2 border-black/10 dark:border-white/10 font-black hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-all"
              >
                {t(tier.cta)}
              </a>
            </div>
          ),
        )}
      </div>

      <p className="text-center text-xs opacity-50 mt-10 max-w-md mx-auto">{t('serv_precio_nota')}</p>

      {/* Cuidado Continuo: servicio mensual, no un escalón. Franja ancha. */}
      <div className="mt-16 bg-white/40 dark:bg-[#2A2A2A]/40 backdrop-blur-2xl border border-black/5 dark:border-white/10 rounded-[3rem] p-10 flex flex-col md:flex-row md:items-center gap-8">
        <div className="flex-1">
          <div className="text-accent font-black text-xs uppercase tracking-[0.2em] mb-3 opacity-70">{t('serv_mantenimiento')}</div>
          <h3 className="text-3xl font-black mb-3">{t('serv_mantenimiento_titulo')}</h3>
          <p className="text-sm opacity-60 leading-relaxed max-w-2xl">{t('serv_mantenimiento_desc')}</p>
        </div>
        <a
          href="#contacto"
          onClick={selectAndScroll('Cuidado Continuo')}
          className="shrink-0 text-center py-4 px-10 rounded-full border-2 border-black/10 dark:border-white/10 font-black hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-all"
        >
          {t('serv_mant_cta')}
        </a>
      </div>
    </section>
  );
}
