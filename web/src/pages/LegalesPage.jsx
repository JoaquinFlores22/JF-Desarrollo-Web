import { Link } from 'react-router-dom';
import { usePageMeta } from '../hooks/usePageMeta';

// Contenido legal en español: aplica jurisdicción argentina, no se traduce.
const SECTIONS = [
  {
    tag: '01. Propiedad',
    title: 'Derechos de autor',
    body: 'Todo el ecosistema digital de este sitio —diseño, código, estructura y contenidos— es propiedad intelectual de Joaquín Flores (Estudio Flores). La copia, distribución o modificación no autorizada está protegida por las leyes de propiedad intelectual vigentes.',
  },
  {
    tag: '02. Transparencia',
    title: 'Protección de tus datos',
    body: 'Tu información se trata bajo confidencialidad estricta. Los datos del formulario de contacto se usan exclusivamente para cotizar y gestionar tu proyecto. No se comparten con terceros ni se utilizan para publicidad no solicitada. Podés pedir la baja o rectificación de tus datos escribiendo a joaquinflores2207@gmail.com.',
  },
  {
    tag: '03. Resguardo legal',
    title: 'Limitación de responsabilidad',
    body: 'Los servicios web se entregan bajo estándares técnicos profesionales. Estudio Flores no asume responsabilidad por interrupciones de proveedores externos, cambios en políticas de plataformas de terceros, ni por el uso indebido del software una vez finalizado el período de entrega y soporte acordado.',
  },
  {
    tag: '04. Resolución',
    title: 'Marco legal',
    body: 'Cualquier discrepancia se resolverá de buena fe entre las partes. De no llegar a un acuerdo, se someterá a la jurisdicción de los tribunales ordinarios de la Ciudad Autónoma de Buenos Aires, Argentina.',
  },
];

export default function LegalesPage() {
  usePageMeta({
    title: 'Términos y Privacidad | Estudio Flores',
    description: 'Términos de servicio y política de privacidad de Estudio Flores.',
    path: '/legales',
  });

  return (
    <main className="max-w-2xl mx-auto px-6 pt-36 pb-24">
      <header className="mb-16">
        <Link to="/" className="text-sm font-bold opacity-50 hover:opacity-100 transition-opacity">
          ← Volver al inicio
        </Link>
        <h1 className="text-3xl md:text-4xl font-black mt-6 mb-2 tracking-tight">
          Términos y Privacidad
        </h1>
        <p className="text-sm opacity-60">Última actualización: abril de 2026</p>
      </header>

      <div className="space-y-12">
        {SECTIONS.map((s) => (
          <section key={s.tag}>
            <p className="text-xs font-bold uppercase tracking-widest text-accent mb-3">{s.tag}</p>
            <h2 className="text-xl font-bold mb-3">{s.title}</h2>
            <p className="leading-relaxed opacity-80">{s.body}</p>
          </section>
        ))}
      </div>

      <footer className="mt-24 pt-10 border-t border-black/10 dark:border-white/10 text-xs opacity-50">
        © 2026 Estudio Flores.
      </footer>
    </main>
  );
}
