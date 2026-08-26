import { Terminal } from '../ui/terminal';

export default function TerminalShowcase() {
  return (
    <section className="max-w-4xl mx-auto px-6 py-20 text-center">
      <p className="text-xs font-black uppercase tracking-[.2em] text-accent mb-4">Detrás de escena</p>
      <h2 className="text-3xl md:text-5xl font-black tracking-tighter mb-4">
        ¡Hola! 👋 <span className="text-gradient">¿Listo para arrancar tu próximo proyecto?</span>
      </h2>
      <p className="opacity-60 max-w-xl mx-auto mb-12">
        Así de simple es para nosotros poner un sitio en marcha. Contanos tu idea y en cuestión de días
        la vemos online, igual de rápido.
      </p>

      <Terminal
        commands={[
          'npm create vite@latest tu-proyecto',
          'npm install',
          'npm run build',
          'vercel --prod',
        ]}
        outputs={{
          0: ['✔ Proyecto creado.', '✔ Listo para empezar a construir.'],
          1: ['added 214 packages in 6s'],
          2: ['✔ Build completado en 1.4s', 'dist/ 42.3 kB (gzip)'],
          3: ['✔ Deploy listo → https://tu-proyecto.vercel.app', '✔ Tu web ya está online. 🚀'],
        }}
        typingSpeed={45}
        delayBetweenCommands={1400}
      />
    </section>
  );
}
