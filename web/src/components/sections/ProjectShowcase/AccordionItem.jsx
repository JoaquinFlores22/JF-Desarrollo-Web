import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap } from '../../../lib/gsap';
import { useLanguage } from '../../../context/LanguageContext';

export default function AccordionItem({ project, isOpen, onToggle }) {
  const { t } = useLanguage();
  const panelRef = useRef(null);

  useGSAP(
    () => {
      const panel = panelRef.current;
      if (!panel) return;
      const targetHeight = isOpen ? panel.scrollHeight : 0;
      gsap.to(panel, {
        height: targetHeight,
        opacity: isOpen ? 1 : 0,
        duration: 0.5,
        ease: 'power3.inOut',
      });
    },
    { dependencies: [isOpen], scope: panelRef },
  );

  return (
    <li
      style={{ '--accent': project.accent }}
      className="glass-card bg-white/60 dark:bg-[#1A1A1A]/70 rounded-3xl border border-black/5 dark:border-white/10 overflow-hidden transition-shadow hover:shadow-xl"
    >
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={isOpen}
        className="w-full flex items-center justify-between gap-6 px-8 py-6 text-left"
      >
        <span className="text-xl md:text-2xl font-black tracking-tight">{t(project.nameKey)}</span>
        <span className="flex items-center gap-4 shrink-0">
          <span className="h-1.5 w-12 rounded-full" style={{ background: 'var(--accent)' }} />
          <svg
            className={`w-5 h-5 transition-transform duration-300 ${isOpen ? 'rotate-45' : ''}`}
            style={{ color: 'var(--accent)' }}
            fill="none" stroke="currentColor" viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
          </svg>
        </span>
      </button>

      <div ref={panelRef} className="overflow-hidden" style={{ height: 0, opacity: 0 }}>
        <div className="px-8 pb-8 flex flex-col md:flex-row gap-8 items-start">
          <img
            src={project.mockup}
            alt=""
            className="w-full md:w-48 h-32 object-cover rounded-2xl shrink-0"
            style={{ background: 'color-mix(in srgb, var(--accent) 15%, transparent)' }}
          />
          <div className="space-y-4 flex-1">
            <p className="text-sm opacity-70 leading-relaxed">{t(project.descKey)}</p>
            <a
              href={project.href}
              target={project.external ? '_blank' : undefined}
              rel={project.external ? 'noopener noreferrer' : undefined}
              className="inline-block text-sm font-bold px-6 py-3 rounded-full border-2 transition-all hover:bg-[var(--accent)] hover:text-white"
              style={{ borderColor: 'var(--accent)', color: 'var(--accent)' }}
            >
              {t(project.external ? 'ver_sitio' : 'ver_catalogo')} →
            </a>
          </div>
        </div>
      </div>
    </li>
  );
}
