import { useTheme } from '../../context/ThemeContext';
import { useLanguage } from '../../context/LanguageContext';

export default function MobileMenu({ open }) {
  const { toggleTheme } = useTheme();
  const { lang, setLang, t } = useLanguage();

  if (!open) return null;

  return (
    <div className="md:hidden absolute top-24 left-6 right-6 glass-card bg-white/90 dark:bg-[#1A1A1A]/90 rounded-3xl p-8 flex flex-col gap-6 text-center font-bold shadow-2xl border border-black/5 dark:border-white/10 animate-reveal-up">
      <a href="/" className="text-xl hover:text-accent transition-colors">{t('nav_inicio')}</a>
      <a href="/proyectos.html" className="text-xl hover:text-accent transition-colors">{t('nav_proyectos')}</a>
      <a href="/casos.html" className="text-xl hover:text-accent transition-colors">Casos</a>
      <a href="#contacto" className="text-xl hover:text-accent transition-colors">{t('nav_contacto')}</a>
      <div className="h-px bg-black/10 dark:bg-white/10 my-2" />
      <div className="flex justify-center gap-6">
        <button type="button" aria-label="Cambiar entre modo claro y oscuro" onClick={toggleTheme} className="p-4 bg-black/5 dark:bg-white/5 rounded-2xl text-2xl">🌙</button>
        <button type="button" aria-label="Cambiar a español" onClick={() => setLang('es')} className={`px-6 bg-black/5 dark:bg-white/5 rounded-2xl text-sm font-black ${lang === 'es' ? 'text-accent' : ''}`}>ES</button>
        <button type="button" aria-label="Cambiar a inglés" onClick={() => setLang('en')} className={`px-6 bg-black/5 dark:bg-white/5 rounded-2xl text-sm font-black ${lang === 'en' ? 'text-accent' : ''}`}>EN</button>
      </div>
    </div>
  );
}
