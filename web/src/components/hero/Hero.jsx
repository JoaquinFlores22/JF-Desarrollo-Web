import { useLanguage } from '../../context/LanguageContext';
import MaskedHeading from './MaskedHeading';

export default function Hero() {
  const { t } = useLanguage();

  return (
    <section className="grid md:grid-cols-2 gap-16 items-center">
      <div className="space-y-6">
        <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 text-accent font-bold text-xs uppercase border border-accent/20">
          <span className="animate-ping h-2 w-2 rounded-full bg-accent" />
          {t('hero_badge')}
        </span>

        <MaskedHeading
          as="div"
          size="hero"
          trigger="mount"
          lines={['JOAQUÍN', <span className="text-gradient" key="flores">FLORES.</span>]}
        />

        <h1 className="text-2xl md:text-[1.75rem] font-black tracking-tight leading-snug max-w-xl">
          {t('hero_h1')}
        </h1>

        <p className="text-lg font-light max-w-lg opacity-70">{t('hero_desc')}</p>
      </div>

      <div className="relative">
        <div className="absolute -inset-1 bg-gradient-to-r from-accent to-purple-600 rounded-[2rem] blur opacity-20 animate-pulse" />
        <div className="glass-card p-10 rounded-[2rem] relative z-10 border border-white/10">
          <div className="flex justify-between items-center mb-8">
            <div className="space-y-1">
              <div className="text-xs opacity-50 uppercase tracking-widest">{t('hero_status')}</div>
              <div className="text-xl font-black">{t('hero_status_disponible')}</div>
            </div>
            <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center text-2xl">🚀</div>
          </div>
          <div className="space-y-6">
            <div className="w-full bg-black/20 h-2 rounded-full overflow-hidden">
              <div className="h-full bg-accent w-[85%]" />
            </div>
            <p className="text-sm opacity-60">{t('hero_stats')}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
