import { Link } from 'react-router-dom';
import { usePageMeta } from '../hooks/usePageMeta';

export default function NotFoundPage() {
  usePageMeta({ title: 'Página no encontrada | Estudio Flores', path: '/404', noindex: true });

  return (
    <main className="max-w-xl mx-auto px-6 pt-40 pb-32 text-center">
      <p className="text-7xl font-black tracking-tighter text-gradient">404</p>
      <h1 className="text-2xl font-black mt-4 mb-3">Esta página no existe</h1>
      <p className="opacity-60 mb-8">Puede que el enlace esté roto o que la página se haya movido.</p>
      <Link
        to="/"
        className="inline-block px-8 py-3 rounded-full bg-graphite dark:bg-white text-white dark:text-graphite font-black text-sm"
      >
        Volver al inicio
      </Link>
    </main>
  );
}
