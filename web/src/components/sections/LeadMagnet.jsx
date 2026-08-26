import { useLanguage } from '../../context/LanguageContext';

export default function LeadMagnet() {
  const { t } = useLanguage();

  return (
    <section id="lead-magnet" className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-accent/5" />

      <div className="max-w-4xl mx-auto px-6 relative">
        <div className="bg-[#1A1A1A] border border-white/10 rounded-[2rem] p-10 md:p-16 flex flex-col md:flex-row items-center gap-10 shadow-2xl">
          <div className="flex-1 space-y-4">
            <h2 className="text-3xl md:text-4xl font-black leading-tight text-white">
              <span>{t('lead_title_1')}</span>{' '}
              <span className="text-accent">{t('lead_title_dinero')}</span>{' '}
              <span>{t('lead_title_2')}</span>{' '}
              <span className="text-white/60">{t('lead_title_lentitud')}</span>
            </h2>
            {/* Compuesto en JSX en vez de innerHTML: así el <strong> siempre
                renderiza en negrita en los dos idiomas. */}
            <p className="text-white/60 text-lg">
              {t('lead_magnet_part1')} <strong className="text-white">{t('lead_magnet_bold')}</strong> {t('lead_magnet_part2')}
            </p>
            <ul className="space-y-2">
              <li className="flex items-center gap-2 text-sm text-white/80">{t('lead_magnet_feat1')}</li>
              <li className="flex items-center gap-2 text-sm text-white/80">{t('lead_magnet_feat2')}</li>
            </ul>
          </div>

          <div className="w-full md:w-auto">
            <a
              href="https://drive.google.com/file/d/1ocsCg4HxcurvTAPDijiEGvDRisqg4qOY/view?usp=drive_link"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block w-full text-center bg-accent hover:bg-white hover:text-black transition-all px-8 py-4 rounded-full font-bold"
            >
              {t('btn_download')}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
