import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../../../context/LanguageContext';
import { projects } from '../../../data/projects';
import AccordionItem from './AccordionItem';
import BrowserBar from '../../ui/browser-bar';

export default function AccordionGallery() {
  const { t } = useLanguage();
  const [activeId, setActiveId] = useState(projects[0].id);

  return (
    <section id="proyectos-y-futuro" className="max-w-4xl mx-auto py-32 px-6">
      <div className="mb-14 flex items-end justify-between gap-8 flex-wrap">
        <div>
          <div className="mb-6 inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-accent/10 text-accent text-3xl">🏆</div>
          <h3 className="text-4xl md:text-5xl font-black tracking-tighter">
            {t('proy_ejecutados')}
          </h3>
        </div>
        <p className="text-base opacity-60 max-w-sm leading-relaxed">{t('proy_ejecutados_desc')}</p>
      </div>

      <div className="mb-14">
        <BrowserBar />
      </div>

      <ul className="space-y-4">
        {projects.map((project) => (
          <AccordionItem
            key={project.id}
            project={project}
            isOpen={activeId === project.id}
            onToggle={() => setActiveId((cur) => (cur === project.id ? null : project.id))}
          />
        ))}
      </ul>

      <div className="mt-10 text-center">
        <Link
          to="/proyectos"
          className="inline-flex items-center gap-3 bg-graphite dark:bg-white text-white dark:text-graphite px-8 py-4 rounded-2xl font-black hover:bg-accent dark:hover:bg-accent hover:text-white transition-all group/btn"
        >
          <span>{t('btn_ver_proy')}</span>
          <svg className="w-5 h-5 transition-transform group-hover/btn:translate-x-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </Link>
      </div>
    </section>
  );
}
