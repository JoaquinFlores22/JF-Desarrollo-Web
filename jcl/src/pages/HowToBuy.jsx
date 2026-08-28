import { wa } from '../data/site';
import Reveal from '../components/Reveal';

export default function HowToBuy() {
  return (
    <>
      <div className="page-head">
        <p className="eyebrow">Cómo comprar</p>
        <h1>
          Simple, <em>en serio.</em>
        </h1>
        <p className="lead">
          No hay carrito con tarjeta ni formularios eternos. Elegís, nos escribís y cerramos el
          pedido por WhatsApp en el día.
        </p>
      </div>

      <section className="wrap section--tight">
        <div className="steps">
          {[
            ['01', 'Armá tu selección', 'Guardá las prendas que te gustan desde el catálogo. Quedan guardadas en tu teléfono.'],
            ['02', 'Enviala por WhatsApp', 'Con un toque nos llega tu selección con talles y cantidades listas para revisar.'],
            ['03', 'Confirmamos y despachamos', 'Te pasamos stock, precio final y link de pago. Enviamos o coordinamos retiro en Flores.'],
          ].map(([n, t, d]) => (
            <Reveal className="step" key={n}>
              <span>{n}</span>
              <div>
                <h3>{t}</h3>
                <p>{d}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="wrap section">
        <div className="section-head">
          <div>
            <p className="eyebrow">Pagos y envíos</p>
            <h2>Lo esencial.</h2>
          </div>
        </div>
        <div className="detail-cols">
          {[
            ['Medios de pago', 'Efectivo, transferencia bancaria o Mercado Pago. El link de pago se coordina por WhatsApp junto con la confirmación.'],
            ['Envíos al país', 'Despachamos a todo el país por correo. Los costos y tiempos dependen del destino; te los pasamos antes de cerrar.'],
            ['Retiro en CABA', 'Coordinamos punto de encuentro en Flores, sin costo. Lunes a sábado, en el día.'],
            ['Cambios', 'Si el talle no va, lo cambiamos. Escribinos dentro de los 7 días de recibido el pedido.'],
          ].map(([t, d]) => (
            <Reveal className="detail" key={t}>
              <h3>{t}</h3>
              <p>{d}</p>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="wrap section" style={{ maxWidth: 720 }}>
        <p className="eyebrow">Preguntas frecuentes</p>
        <h2 style={{ marginTop: 16, marginBottom: 32 }}>Antes de escribirnos.</h2>
        <div className="legal">
          {[
            ['¿Puedo comprar una sola prenda?', 'Sí. JCL vende por menor desde una unidad, y también trabaja pedidos mayoristas desde 6.'],
            ['¿Cómo sé qué talle elegir?', 'Usá la guía de talles del catálogo como referencia de cintura. Si dudás, decinos tu medida y te recomendamos.'],
            ['¿Hacen envíos?', 'Sí, a todo el país. En CABA también coordinamos punto de encuentro en Flores.'],
            ['¿Puedo pagar con Mercado Pago?', 'Sí. El link de pago se coordina por WhatsApp junto con la confirmación del pedido.'],
          ].map(([q, a]) => (
            <section key={q}>
              <h2 style={{ fontSize: '1.15rem' }}>{q}</h2>
              <p>{a}</p>
            </section>
          ))}
        </div>
        <a
          className="btn btn--ember"
          style={{ marginTop: 40 }}
          href={wa('Hola, JCL. Estoy viendo cómo comprar y quiero hacer una consulta.')}
          target="_blank"
          rel="noreferrer"
        >
          Escribir por WhatsApp <span className="arw">↗</span>
        </a>
      </section>
    </>
  );
}
