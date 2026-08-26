import { useLanguage } from '../../context/LanguageContext';
import { useScrollReveal } from '../../hooks/useScrollReveal';

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

      <div ref={gridRef} className="grid md:grid-cols-3 gap-10 items-start">
        {/* PLAN 1: LANZAMIENTO */}
        <div className="relative bg-white/40 dark:bg-[#2A2A2A]/40 backdrop-blur-2xl p-10 rounded-[3rem] border border-black/5 dark:border-white/10 transition-shadow duration-500 hover:shadow-2xl hover:-translate-y-2 group">
          <div className="text-accent font-black text-xs uppercase tracking-[0.2em] mb-4 opacity-70">{t('serv_basico')}</div>
          <h3 className="text-3xl font-black mb-6 group-hover:text-accent transition-colors">{t('serv_basico_titulo')}</h3>
          <p className="text-sm opacity-60 mb-8 leading-relaxed">{t('serv_basico_desc')}</p>
          <ul className="space-y-5 mb-12 text-sm opacity-80">
            <li className="flex items-center gap-3"><span className="text-accent">●</span> <span>{t('serv_basico_feat1')}</span></li>
            <li className="flex items-center gap-3"><span className="text-accent">●</span> <span>{t('serv_basico_feat2')}</span></li>
          </ul>
          <a
            href="#contacto"
            onClick={selectAndScroll('Landing Page')}
            className="block text-center py-4 rounded-full border-2 border-black/10 dark:border-white/10 font-black hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-all"
          >
            {t('serv_basico_cta')}
          </a>
        </div>

        {/* PLAN 2: CORPORATIVO (destacado) */}
        <div className="relative bg-white dark:bg-[#121212] p-10 rounded-[3rem] border-2 border-accent shadow-2xl md:-mt-8 scale-105 group z-10">
          <div className="absolute -top-5 left-1/2 -translate-x-1/2 bg-accent text-white text-[10px] font-black px-8 py-2 rounded-full uppercase tracking-widest shadow-xl">{t('serv_multipagina_badge')}</div>
          <h3 className="text-4xl font-black mb-6 mt-4">{t('serv_multipagina_titulo')}</h3>
          <p className="text-sm opacity-60 mb-8 leading-relaxed">{t('serv_multipagina_desc')}</p>
          <ul className="space-y-5 mb-12 text-sm font-bold">
            <li className="flex items-center gap-3 text-accent"><span>✦</span> <span className="text-black dark:text-white">{t('serv_multi_feat1')}</span></li>
            <li className="flex items-center gap-3 text-accent"><span>✦</span> <span className="text-black dark:text-white">{t('serv_multi_feat2')}</span></li>
            <li className="flex items-center gap-3 text-accent"><span>✦</span> <span className="text-black dark:text-white">{t('serv_multi_feat3')}</span></li>
          </ul>
          <a
            href="#contacto"
            onClick={selectAndScroll('Sitio Multipágina')}
            className="block text-center py-5 rounded-full bg-accent text-white font-black text-lg hover:brightness-110 shadow-lg shadow-accent/40 transition-all"
          >
            {t('serv_multi_cta')}
          </a>
        </div>

        {/* PLAN 3: MANTENIMIENTO */}
        <div className="relative bg-white/40 dark:bg-[#2A2A2A]/40 backdrop-blur-2xl p-10 rounded-[3rem] border border-black/5 dark:border-white/10 transition-shadow duration-500 hover:shadow-2xl hover:-translate-y-2 group">
          <div className="text-accent font-black text-xs uppercase tracking-[0.2em] mb-4 opacity-70">{t('serv_mantenimiento')}</div>
          <h3 className="text-3xl font-black mb-6 group-hover:text-accent transition-colors">{t('serv_mantenimiento_titulo')}</h3>
          <p className="text-sm opacity-60 mb-8 leading-relaxed">{t('serv_mantenimiento_desc')}</p>
          <ul className="space-y-5 mb-12 text-sm opacity-80">
            <li className="flex items-center gap-3"><span className="text-accent">●</span> <span>{t('serv_mant_feat1')}</span></li>
            <li className="flex items-center gap-3"><span className="text-accent">●</span> <span>{t('serv_mant_feat2')}</span></li>
          </ul>
          <a
            href="#contacto"
            onClick={selectAndScroll('Mantenimiento')}
            className="block text-center py-4 rounded-full border-2 border-black/10 dark:border-white/10 font-black hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-all"
          >
            {t('serv_mant_cta')}
          </a>
        </div>
      </div>
    </section>
  );
}
