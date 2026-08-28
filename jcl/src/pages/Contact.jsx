import { SOCIALS, wa } from '../data/site';
import Reveal from '../components/Reveal';

export default function Contact() {
  return (
    <>
      <section className="contact-hero">
        <div style={{ maxWidth: 'var(--max)', margin: '0 auto' }}>
          <p className="eyebrow" style={{ color: 'var(--ember-soft)' }}>
            Contacto
          </p>
          <h1 style={{ fontSize: 'clamp(3rem, 9vw, 7.5rem)', margin: '22px 0 24px' }}>
            Estamos <em>del otro lado.</em>
          </h1>
          <p className="lead" style={{ color: '#cfc9bc' }}>
            La forma más rápida es WhatsApp. Respondemos de lunes a sábado, durante el día.
          </p>
          <a
            className="btn btn--light"
            style={{ marginTop: 32 }}
            href={wa('Hola, JCL. Quiero consultar por sus pantalones y shorts: modelos, talles y disponibilidad.')}
            target="_blank"
            rel="noreferrer"
          >
            Abrir WhatsApp <span className="arw">↗</span>
          </a>
        </div>
      </section>

      <section className="wrap section">
        <div className="contact-grid">
          {[
            ['01', 'WhatsApp', '+54 11 3062 1946', 'El canal principal. Pedidos, dudas de talle, seguimiento de envío.'],
            ['02', 'Dónde estamos', 'Flores, CABA', 'Punto de encuentro a coordinar. Sin local a la calle por ahora.'],
            ['03', 'Horario', 'Lun a Sáb', 'Respondemos durante el día. Los mensajes de la noche los vemos a la mañana.'],
          ].map(([n, t, big, d]) => (
            <Reveal className="contact-card" key={n}>
              <span className="index-num">{n}</span>
              <h3>{t}</h3>
              <p style={{ color: 'var(--ink)', fontFamily: 'var(--serif)', fontSize: '1.1rem', marginBottom: 8 }}>
                {big}
              </p>
              <p>{d}</p>
            </Reveal>
          ))}
        </div>

        <div style={{ marginTop: 64, display: 'flex', gap: 20, flexWrap: 'wrap', alignItems: 'center' }}>
          <span className="eyebrow">Seguinos</span>
          {SOCIALS.map((s) => (
            <a key={s.href} className="tlink" href={s.href} target="_blank" rel="noreferrer">
              {s.label} <b>↗</b>
            </a>
          ))}
        </div>
      </section>
    </>
  );
}
