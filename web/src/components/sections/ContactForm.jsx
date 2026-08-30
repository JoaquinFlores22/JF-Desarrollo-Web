import { useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { useMagneticHover } from '../../hooks/useMagneticHover';
import { waHref } from '../../lib/contact';
import LeadNotification from '../ui/lead-notification';

const INITIAL = { servicio: '', nombre: '', email: '', telefono: '', mensaje: '', website: '' };

export default function ContactForm({ selectedService, onSelectService }) {
  const { t } = useLanguage();
  const { ref: magneticRef, onMouseMove, onMouseLeave } = useMagneticHover();
  const [form, setForm] = useState(INITIAL);
  // idle | sending | ok (mail enviado) | fallback (abrimos WhatsApp) | error
  const [status, setStatus] = useState('idle');
  // Momento en que se montó el form: el backend descarta envíos < 2,5s (bots).
  const [startedAt] = useState(() => Date.now());

  const servicio = selectedService || form.servicio;
  const update = (field) => (e) => setForm((f) => ({ ...f, [field]: e.target.value }));

  const waMessage = () =>
    `Hola, Joaquín. Soy ${form.nombre || 'una persona interesada'}. ` +
    `Me interesa: ${servicio || 'una web'}. Mi email es ${form.email}. ${form.mensaje || ''}`.trim();

  const openWhatsApp = () => window.open(waHref(waMessage()), '_blank', 'noopener');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (status === 'sending') return;
    setStatus('sending');

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          nombre: form.nombre,
          email: form.email,
          telefono: form.telefono,
          servicio,
          mensaje: form.mensaje,
          website: form.website,
          startedAt,
        }),
      });

      if (res.ok) {
        setStatus('ok');
        setForm(INITIAL);
        return;
      }
      if (res.status === 422) {
        setStatus('error');
        return;
      }
      // 503 (sin proveedor de mail), 429 o 5xx: no perdemos el lead -> WhatsApp.
      openWhatsApp();
      setStatus('fallback');
    } catch {
      openWhatsApp();
      setStatus('fallback');
    }
  };

  return (
    <section id="contacto" className="relative max-w-3xl mx-auto py-24 px-6">
      <LeadNotification />
      <div className="bg-white/40 dark:bg-[#2A2A2A]/40 backdrop-blur-2xl p-10 rounded-[2.5rem] border border-black/5 dark:border-white/10 shadow-xl">
        <h2 className="text-4xl font-black mb-2 text-center tracking-tighter">{t('form_titulo')}</h2>
        <p className="text-center opacity-60 mb-10">{t('form_subtitulo')}</p>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Honeypot: invisible para humanos, los bots lo completan */}
          <input
            type="text"
            name="website"
            tabIndex={-1}
            autoComplete="off"
            aria-hidden="true"
            value={form.website}
            onChange={update('website')}
            className="absolute left-[-9999px] h-0 w-0 opacity-0"
          />

          <div>
            <label className="block text-sm font-bold mb-2 opacity-80">{t('form_servicio')}</label>
            <select
              value={servicio}
              onChange={(e) => onSelectService(e.target.value)}
              required
              className="w-full p-4 rounded-2xl bg-white/50 dark:bg-black/20 border border-black/10 dark:border-white/10 outline-none focus:border-blue-500 transition-all cursor-pointer text-sm"
            >
              <option value="" disabled>{t('btn_seleccionar_pro')}</option>
              <option value="Esencial">{t('opt_esencial')}</option>
              <option value="Firma">{t('opt_firma')}</option>
              <option value="Estudio">{t('opt_estudio')}</option>
              <option value="Cuidado Continuo">{t('opt_cuidado')}</option>
            </select>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-bold mb-2 opacity-80">{t('form_nombre')}</label>
              <input
                type="text" required maxLength={80} placeholder={t('form_nombre_ph')}
                value={form.nombre} onChange={update('nombre')}
                className="w-full p-4 rounded-2xl bg-white/50 dark:bg-black/20 border border-black/10 dark:border-white/10 outline-none focus:border-blue-500 transition-all text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-bold mb-2 opacity-80">{t('form_email')}</label>
              <input
                type="email" required maxLength={120} placeholder={t('form_email_ph')}
                value={form.email} onChange={update('email')}
                className="w-full p-4 rounded-2xl bg-white/50 dark:bg-black/20 border border-black/10 dark:border-white/10 outline-none focus:border-blue-500 transition-all text-sm"
              />
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-bold mb-2 opacity-80">{t('form_numero')}</label>
              <input
                type="tel" maxLength={30} placeholder={t('form_numero_ph')}
                value={form.telefono} onChange={update('telefono')}
                className="w-full p-4 rounded-2xl bg-white/50 dark:bg-black/20 border border-black/10 dark:border-white/10 outline-none focus:border-blue-500 transition-all text-sm"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-bold mb-2 opacity-80">{t('form_mensaje')}</label>
            <textarea
              rows={4} maxLength={2000} placeholder={t('form_mensaje_ph')}
              value={form.mensaje} onChange={update('mensaje')}
              className="w-full p-4 rounded-2xl bg-white/50 dark:bg-black/20 border border-black/10 dark:border-white/10 outline-none focus:border-blue-500 transition-all text-sm resize-none"
            />
          </div>

          <button
            ref={magneticRef}
            onMouseMove={onMouseMove}
            onMouseLeave={onMouseLeave}
            type="submit"
            disabled={status === 'sending'}
            className="w-full py-4 rounded-full bg-black dark:bg-white text-white dark:text-black font-black hover:bg-blue-600 hover:text-white transition-all transform hover:scale-[1.02] disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:scale-100"
          >
            {status === 'sending' ? t('form_sending') : t('btn_enviar')}
          </button>

          {status === 'ok' && (
            <p className="text-center text-sm font-medium text-green-600">{t('form_ok')}</p>
          )}
          {status === 'fallback' && (
            <p className="text-center text-sm opacity-80">
              {t('form_sent')}{' '}
              <a
                href={waHref(waMessage())}
                target="_blank"
                rel="noopener noreferrer"
                className="font-bold text-accent underline"
              >
                {t('form_sent_link')}
              </a>
            </p>
          )}
          {status === 'error' && (
            <p className="text-center text-sm text-red-500">{t('form_error')}</p>
          )}

          <a
            href={waHref('Hola, Joaquín. Quiero consultar por una web para mi negocio.')}
            target="_blank"
            rel="noopener noreferrer"
            className="block text-center text-sm opacity-60 hover:opacity-100 transition-opacity"
          >
            {t('form_wa_alt')}
          </a>
        </form>
      </div>
    </section>
  );
}
