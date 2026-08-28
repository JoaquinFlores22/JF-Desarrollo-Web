import { useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { useMagneticHover } from '../../hooks/useMagneticHover';
import { waHref } from '../../lib/contact';
import LeadNotification from '../ui/lead-notification';

const INITIAL = { servicio: '', nombre: '', email: '', telefono: '', mensaje: '' };

export default function ContactForm({ selectedService, onSelectService }) {
  const { t } = useLanguage();
  const { ref: magneticRef, onMouseMove, onMouseLeave } = useMagneticHover();
  const [form, setForm] = useState(INITIAL);
  // Guardamos el link ya armado: si el navegador bloqueó el popup, el
  // visitante todavía puede abrirlo a mano y no perdemos el lead.
  const [sentHref, setSentHref] = useState('');

  const servicio = selectedService || form.servicio;

  const update = (field) => (e) => setForm((f) => ({ ...f, [field]: e.target.value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    const message = `Hola, Joaquín. Soy ${form.nombre}. Me interesa: ${servicio}. Mi WhatsApp es ${form.telefono || 'a confirmar'} y mi email es ${form.email}. ${form.mensaje || ''}`;
    const href = waHref(message);
    window.open(href, '_blank', 'noopener');
    setSentHref(href);
  };

  return (
    <section id="contacto" className="relative max-w-3xl mx-auto py-24 px-6">
      <LeadNotification />
      <div className="bg-white/40 dark:bg-[#2A2A2A]/40 backdrop-blur-2xl p-10 rounded-[2.5rem] border border-black/5 dark:border-white/10 shadow-xl">
        <h2 className="text-4xl font-black mb-2 text-center tracking-tighter">{t('form_titulo')}</h2>
        <p className="text-center opacity-60 mb-10">{t('form_subtitulo')}</p>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-bold mb-2 opacity-80">{t('form_servicio')}</label>
            <select
              value={servicio}
              onChange={(e) => onSelectService(e.target.value)}
              required
              className="w-full p-4 rounded-2xl bg-white/50 dark:bg-black/20 border border-black/10 dark:border-white/10 outline-none focus:border-blue-500 transition-all cursor-pointer text-sm"
            >
              <option value="" disabled>{t('btn_seleccionar_pro')}</option>
              <option value="Landing Page">{t('opt_landing')}</option>
              <option value="Sitio Multipágina">{t('opt_multipagina')}</option>
              <option value="Mantenimiento">{t('opt_mantenimiento')}</option>
            </select>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-bold mb-2 opacity-80">{t('form_nombre')}</label>
              <input
                type="text" required placeholder={t('form_nombre_ph')}
                value={form.nombre} onChange={update('nombre')}
                className="w-full p-4 rounded-2xl bg-white/50 dark:bg-black/20 border border-black/10 dark:border-white/10 outline-none focus:border-blue-500 transition-all text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-bold mb-2 opacity-80">{t('form_email')}</label>
              <input
                type="email" required placeholder={t('form_email_ph')}
                value={form.email} onChange={update('email')}
                className="w-full p-4 rounded-2xl bg-white/50 dark:bg-black/20 border border-black/10 dark:border-white/10 outline-none focus:border-blue-500 transition-all text-sm"
              />
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-bold mb-2 opacity-80">{t('form_numero')}</label>
              <input
                type="tel" placeholder={t('form_numero_ph')}
                value={form.telefono} onChange={update('telefono')}
                className="w-full p-4 rounded-2xl bg-white/50 dark:bg-black/20 border border-black/10 dark:border-white/10 outline-none focus:border-blue-500 transition-all text-sm"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-bold mb-2 opacity-80">{t('form_mensaje')}</label>
            <textarea
              rows={4} placeholder={t('form_mensaje_ph')}
              value={form.mensaje} onChange={update('mensaje')}
              className="w-full p-4 rounded-2xl bg-white/50 dark:bg-black/20 border border-black/10 dark:border-white/10 outline-none focus:border-blue-500 transition-all text-sm resize-none"
            />
          </div>

          <button
            ref={magneticRef}
            onMouseMove={onMouseMove}
            onMouseLeave={onMouseLeave}
            type="submit"
            className="w-full py-4 rounded-full bg-black dark:bg-white text-white dark:text-black font-black hover:bg-blue-600 transition-all transform hover:scale-[1.02]"
          >
            {t('btn_enviar')}
          </button>

          {sentHref && (
            <p className="text-center text-sm opacity-80">
              {t('form_sent')}{' '}
              <a
                href={sentHref}
                target="_blank"
                rel="noopener noreferrer"
                className="font-bold text-accent underline"
              >
                {t('form_sent_link')}
              </a>
            </p>
          )}
        </form>
      </div>
    </section>
  );
}
