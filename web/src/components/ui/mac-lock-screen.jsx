import { useEffect, useState } from 'react';
import { IconLock, IconArrowRight, IconFingerprint } from '@tabler/icons-react';

// Pantalla de bloqueo de macOS, hecha en CSS puro (sin imagen real).
// La reemplaza a `src` en <MacbookScroll> cuando no tenemos un screenshot
// del producto lo bastante lindo como para venderlo -- un lock screen es
// reconocible al toque, no necesita contenido real, y no se ve "vacío".
const WEEKDAYS = ['domingo', 'lunes', 'martes', 'miércoles', 'jueves', 'viernes', 'sábado'];
const MONTHS = [
  'enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio',
  'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre',
];

function formatDate(d) {
  return `${WEEKDAYS[d.getDay()]} ${d.getDate()} de ${MONTHS[d.getMonth()]}`;
}

function formatTime(d) {
  return d.toLocaleTimeString('es-AR', { hour: '2-digit', minute: '2-digit', hour12: false });
}

export default function MacLockScreen({ name = 'Joaquín Flores', initials = 'JF', compact = false }) {
  const [now, setNow] = useState(() => new Date());

  useEffect(() => {
    // Solo re-renderiza cuando cambia el minuto -- es un reloj de fondo,
    // no hace falta el tick de segundos.
    const id = setInterval(() => setNow(new Date()), 15000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="relative h-full w-full overflow-hidden rounded-lg">
      {/* Wallpaper: mismo par de colores que el gradiente de marca del sitio */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(120% 90% at 15% 15%, #8B5CF6 0%, transparent 55%), ' +
            'radial-gradient(120% 100% at 85% 100%, #4A6FA5 0%, transparent 60%), ' +
            'linear-gradient(160deg, #1A1A1A 0%, #232336 55%, #1A1A1A 100%)',
        }}
      />
      {/* Blur + oscurecido, como el wallpaper desenfocado detrás del lock screen real */}
      <div className="absolute inset-0 backdrop-blur-2xl bg-black/25" />

      <div className={`relative flex h-full w-full flex-col items-center justify-between text-white ${compact ? 'py-3' : 'py-6'}`}>
        <div className="flex flex-col items-center pt-1">
          <span className={`font-sans font-thin tracking-tight tabular-nums ${compact ? 'text-sm' : 'text-4xl'}`}>
            {formatTime(now)}
          </span>
          {!compact && (
            <span className="mt-1 text-[10px] font-medium uppercase tracking-[0.15em] text-white/70">
              {formatDate(now)}
            </span>
          )}
        </div>

        <div className="flex flex-col items-center gap-1">
          <div
            className={`flex items-center justify-center rounded-full bg-linear-to-br from-[#8B5CF6] to-accent font-bold shadow-lg shadow-black/30 ring-2 ring-white/20 ${compact ? 'h-5 w-5 text-[7px]' : 'h-11 w-11 text-sm'}`}
          >
            {initials}
          </div>
          {!compact && <span className="text-xs font-medium text-white/90">{name}</span>}

          <div
            className={`flex items-center gap-1 rounded-full bg-white/15 ring-1 ring-white/25 backdrop-blur-md ${compact ? 'mt-0.5 h-3.5 w-14 px-1.5' : 'mt-1 h-8 w-44 gap-2 px-3'}`}
          >
            <IconLock className={compact ? 'h-2 w-2 shrink-0 text-white/60' : 'h-3.5 w-3.5 shrink-0 text-white/60'} />
            {!compact && <span className="flex-1 text-[11px] text-white/50">Contraseña</span>}
            {!compact && <IconArrowRight className="h-3 w-3 shrink-0 text-white/50" />}
          </div>

          {!compact && (
            <div className="mt-1 flex items-center gap-1 text-[9px] text-white/40">
              <IconFingerprint className="h-3 w-3" />
              <span>Touch ID</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
