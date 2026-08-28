import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { projects } from '../data/projects';
import { usePageMeta } from '../hooks/usePageMeta';

const STACK = ['React', 'Next.js', 'Tailwind', 'Vite', 'Node'];

export default function ProyectosPage() {
  const { t } = useLanguage();

  usePageMeta({
    title: 'Proyectos | Estudio Flores',
    description:
      'Sitios web, catálogos y tiendas online desarrollados por Estudio Flores: qué necesitaba cada negocio y qué construimos para resolverlo.',
    path: '/proyectos',
  });

  return (
    <main className="max-w-5xl mx-auto px-6 pt-36 pb-24">
      <header className="mb-16 max-w-2xl">
        <p className="text-xs font-black uppercase tracking-[0.2em] text-accent mb-5">
          {t('proyectos_page_tag')}
        </p>
        <h1 className="text-5xl md:text-7xl font-black tracking-tighter leading-[0.95] mb-6">
          {t('proyectos_page_titulo')}
        </h1>
        <p className="text-lg opacity-70">{t('proyectos_page_sub')}</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {projects.map((p) => (
          <article
            key={p.id}
            style={{ '--accent': p.accent }}
            className="flex flex-col rounded-[2rem] overflow-hidden bg-white dark:bg-[#1A1A1A] border border-black/5 dark:border-white/10 transition-shadow hover:shadow-xl"
          >
            <img
              src={p.mockup}
              alt=""
              loading="lazy"
              className="w-full h-44 object-cover"
              style={{ background: 'color-mix(in srgb, var(--accent) 12%, transparent)' }}
            />
            <div className="p-8 flex flex-col flex-1">
              <p className="text-[11px] font-black uppercase tracking-[0.18em] mb-3" style={{ color: 'var(--accent)' }}>
                {t(p.catKey)}
              </p>
              <h2 className="text-2xl font-black mb-3 tracking-tight">{t(p.nameKey)}</h2>
              <p className="text-sm opacity-70 leading-relaxed mb-6 flex-1">{t(p.descKey)}</p>
              <a
                href={p.href}
                target={p.external ? '_blank' : undefined}
                rel={p.external ? 'noopener noreferrer' : undefined}
                className="inline-flex w-fit text-sm font-bold px-5 py-2.5 rounded-full border-2 border-[var(--accent)] text-[var(--accent)] transition-colors hover:bg-[var(--accent)] hover:text-white"
              >
                {t(p.external ? 'ver_sitio' : 'ver_catalogo')} →
              </a>
            </div>
          </article>
        ))}
      </div>

      <section className="py-24 text-center">
        <p className="text-xs font-black uppercase tracking-[0.2em] mb-8 opacity-40">
          {t('stack_titulo')}
        </p>
        <div className="flex flex-wrap justify-center gap-x-10 gap-y-4">
          {STACK.map((tech) => (
            <span key={tech} className="font-black text-lg opacity-70">
              {tech}
            </span>
          ))}
        </div>
      </section>

      <section className="text-center">
        <div className="p-12 md:p-16 rounded-[2.5rem] bg-accent/5 border border-accent/10 dark:bg-[#1A1A1A] dark:border-white/5">
          <h2 className="text-3xl md:text-5xl font-black mb-8 tracking-tighter">
            {t('proyectos_cta_titulo')}
          </h2>
          <Link
            to="/#contacto"
            className="inline-block px-10 py-4 rounded-full bg-graphite dark:bg-white text-white dark:text-graphite font-black text-sm uppercase tracking-widest hover:scale-105 transition-transform"
          >
            {t('proyectos_cta_btn')}
          </Link>
        </div>
      </section>
    </main>
  );
}
