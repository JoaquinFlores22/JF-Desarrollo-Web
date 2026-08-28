const SECTIONS = [
  [
    'Sobre este sitio',
    'JCL Pantalones es una marca de indumentaria sport. Este sitio muestra el catálogo y canaliza los pedidos por WhatsApp; no procesa pagos en línea.',
  ],
  [
    'Precios y stock',
    'Los precios y la disponibilidad son orientativos y pueden cambiar sin aviso. El precio final y el stock se confirman al cerrar cada pedido por WhatsApp.',
  ],
  [
    'Pagos',
    'Se aceptan efectivo, transferencia y Mercado Pago. El link o los datos de pago se envían junto con la confirmación del pedido.',
  ],
  [
    'Envíos y cambios',
    'Se realizan envíos a todo el país; costos y plazos dependen del destino. Los cambios por talle se gestionan dentro de los 7 días de recibido el pedido, con la prenda sin uso y con etiqueta.',
  ],
  [
    'Datos personales',
    'Los datos que compartís al hacer un pedido (nombre, contacto, domicilio de envío) se usan únicamente para gestionar esa compra. No se comparten con terceros ajenos al envío.',
  ],
  [
    'Contacto',
    'Ante cualquier duda sobre estos términos, escribinos por WhatsApp al +54 11 3062 1946.',
  ],
];

export default function Terms() {
  return (
    <>
      <div className="page-head">
        <p className="eyebrow">Legales</p>
        <h1>
          Términos <em>y condiciones.</em>
        </h1>
        <p className="lead">Última actualización: 2026.</p>
      </div>
      <section className="wrap section--tight">
        <div className="legal">
          {SECTIONS.map(([t, d]) => (
            <section key={t}>
              <h2>{t}</h2>
              <p>{d}</p>
            </section>
          ))}
        </div>
      </section>
    </>
  );
}
