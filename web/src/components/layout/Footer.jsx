import { useLanguage } from '../../context/LanguageContext';

export default function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="bg-[#1A1A1A] text-[#F4F1ED] pt-20 pb-10">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-20">
          <div className="col-span-1 md:col-span-2">
            <div className="text-2xl font-black italic mb-6" aria-label="Estudio Flores">
              JF<span className="text-blue-500">.</span>
            </div>
            <p className="opacity-60 max-w-sm">{t('footer_desc')}</p>
          </div>

          <div>
            <h4 className="font-bold mb-6">{t('footer_nav')}</h4>
            <ul className="space-y-4 text-sm opacity-60">
              <li><a href="/" className="hover:text-blue-400 transition">{t('nav_inicio')}</a></li>
              <li><a href="/proyectos.html" className="hover:text-blue-400 transition">{t('nav_proyectos')}</a></li>
              <li><a href="/legales.html" className="hover:text-blue-400 transition">{t('nav_legales')}</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-6">{t('footer_social')}</h4>
            <ul className="space-y-4 text-sm opacity-60">
              <li><a href="https://www.instagram.com/jf_desarrolloweb/" target="_blank" rel="noopener noreferrer" className="hover:text-blue-400 transition">Instagram</a></li>
              <li><a href="https://github.com/JoaquinFlores22" target="_blank" rel="noopener noreferrer" className="hover:text-blue-400 transition">GitHub</a></li>
              <li><a href="https://www.linkedin.com/in/joaquin-flores-846b392ba/" target="_blank" rel="noopener noreferrer" className="hover:text-blue-400 transition">LinkedIn</a></li>
              <li><a href="https://mail.google.com/mail/?view=cm&fs=1&to=joaquinflores2207@gmail.com&su=Consulta%20sobre%20desarrollo%20web" target="_blank" rel="noopener noreferrer" className="hover:text-blue-400 transition">Email</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center text-xs opacity-40">
          <p>&copy; 2026 Estudio Flores.</p>
          <p className="mt-4 md:mt-0">{t('footer_copy')}</p>
        </div>
      </div>
    </footer>
  );
}
