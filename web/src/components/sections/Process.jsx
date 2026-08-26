// Esta sección es hardcoded en español en el sitio original (sin data-i18n) —
// se preserva igual acá, no se inventa i18n que el sitio nunca tuvo.
const STEPS = [
  { n: '01', title: 'Diagnóstico', desc: 'Entendemos tu negocio, audiencia y objetivo antes de diseñar.' },
  { n: '02', title: 'Estructura', desc: 'Ordenamos el contenido y definimos el recorrido que debe hacer tu cliente.' },
  { n: '03', title: 'Construcción', desc: 'Desarrollamos, probamos en mobile y ajustamos con feedback real.' },
  { n: '04', title: 'Publicación', desc: 'Dejamos tu sitio online, medible y listo para seguir creciendo.' },
];

export default function Process() {
  return (
    <section id="proceso" className="max-w-6xl mx-auto py-24 px-6">
      <div className="flex flex-col md:flex-row justify-between gap-10 mb-14">
        <div>
          <p className="text-xs font-black uppercase tracking-[.2em] text-accent mb-4">Cómo trabajamos</p>
          <h2 className="text-5xl md:text-6xl font-black tracking-tighter">
            De idea a activo<br /><span className="text-gradient">que trabaja.</span>
          </h2>
        </div>
        <p className="max-w-sm opacity-60 leading-relaxed">
          Un proceso claro para que sepas qué pasa, qué recibís y cuándo podés revisar cada avance.
        </p>
      </div>
      <div className="grid md:grid-cols-4 gap-5">
        {STEPS.map((step) => (
          <div className="border-t-2 border-accent pt-5" key={step.n}>
            <b className="text-accent">{step.n}</b>
            <h3 className="text-2xl font-black mt-10">{step.title}</h3>
            <p className="text-sm opacity-60 mt-3">{step.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
