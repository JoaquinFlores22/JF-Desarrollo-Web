const ITEMS = [
  'Mayor y menor',
  'Envíos a todo el país',
  'Punto de encuentro en Flores',
  'Desde una unidad',
  'Calces reales',
];

export default function Marquee() {
  const row = [...ITEMS, ...ITEMS];
  return (
    <div className="marquee" aria-hidden="true">
      <div className="marquee__track">
        {row.map((t, i) => (
          <span key={i}>{t}</span>
        ))}
      </div>
    </div>
  );
}
