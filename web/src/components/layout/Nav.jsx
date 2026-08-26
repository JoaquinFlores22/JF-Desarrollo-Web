import { useState } from 'react';
import { useTheme } from '../../context/ThemeContext';
import { useLanguage } from '../../context/LanguageContext';
import MobileMenu from './MobileMenu';

const NAV_LINK_CLASS =
  "relative opacity-60 hover:opacity-100 transition-all after:content-[''] after:absolute after:-bottom-1 after:left-0 after:w-0 after:h-0.5 after:bg-accent after:transition-all hover:after:w-full";

export default function Nav() {
  const { toggleTheme } = useTheme();
  const { lang, setLang, t } = useLanguage();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [langMenuOpen, setLangMenuOpen] = useState(false);

  const selectLang = (l) => {
    setLang(l);
    setLangMenuOpen(false);
  };

  return (
    <nav className="fixed w-full z-50 top-6 px-6">
      <div className="max-w-5xl mx-auto">
        <div className="glass-card bg-[#1A1A1A]/70 backdrop-blur-xl rounded-3xl border border-black/5 dark:border-white/10 px-6 py-4 flex justify-between items-center shadow-2xl shadow-black/5">
          <a href="/" className="text-2xl font-black tracking-tighter italic group text-white">
            JF<span className="text-gradient group-hover:animate-pulse">.</span>
          </a>

          <div className="hidden md:flex items-center gap-8 text-sm font-bold tracking-tight text-white">
            <a href="/" className={NAV_LINK_CLASS}>{t('nav_inicio')}</a>
            <a href="/proyectos.html" className={NAV_LINK_CLASS}>{t('nav_proyectos')}</a>
            <a href="/casos.html" className={NAV_LINK_CLASS}>Casos</a>
            <a href="#contacto" className={NAV_LINK_CLASS}>{t('nav_contacto')}</a>

            <div className="h-6 w-px bg-white/10" />

            <div className="flex items-center gap-4">
              <button
                id="theme-toggle"
                type="button"
                aria-label="Cambiar entre modo claro y oscuro"
                onClick={toggleTheme}
                className="p-2.5 rounded-xl bg-white/5 hover:scale-110 active:scale-95 transition-all"
              >
                <span className="dark:hidden text-lg">🌙</span>
                <span className="hidden dark:inline text-lg">☀️</span>
              </button>

              <div className="relative">
                <button
                  type="button"
                  aria-label="Seleccionar idioma"
                  aria-expanded={langMenuOpen}
                  onClick={() => setLangMenuOpen((o) => !o)}
                  className="flex items-center gap-2 bg-white/5 px-3 py-2 rounded-xl hover:bg-accent hover:text-white transition-all"
                >
                  <span className="text-xs uppercase font-black">{lang}</span>
                  <svg className={`w-3 h-3 transition-transform ${langMenuOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                {langMenuOpen && (
                  <div className="absolute right-0 mt-3 py-2 w-28 bg-white dark:bg-[#2A2A2A] border border-black/5 dark:border-white/10 rounded-2xl shadow-2xl overflow-hidden animate-reveal-up text-graphite dark:text-white">
                    <button onClick={() => selectLang('es')} className="block w-full px-4 py-2 hover:bg-accent hover:text-white text-left text-xs font-bold transition-colors">Español</button>
                    <button onClick={() => selectLang('en')} className="block w-full px-4 py-2 hover:bg-accent hover:text-white text-left text-xs font-bold transition-colors">English</button>
                  </div>
                )}
              </div>
            </div>
          </div>

          <button
            type="button"
            aria-label="Abrir menú de navegación"
            aria-expanded={mobileOpen}
            onClick={() => setMobileOpen((o) => !o)}
            className="md:hidden p-3 rounded-xl bg-white/5 text-xl text-white"
          >
            <span className="block w-6 h-0.5 bg-current mb-1.5" />
            <span className="block w-4 h-0.5 bg-current ml-auto" />
          </button>
        </div>
      </div>

      <MobileMenu open={mobileOpen} />
    </nav>
  );
}
