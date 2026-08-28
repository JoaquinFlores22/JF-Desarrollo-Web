import { IconMenu2, IconBrandWhatsapp } from '@tabler/icons-react';

// Mock en CSS puro de la home de sociedades360.com.ar en vista mobile.
// Reemplaza al lock screen dentro del PhoneFrame de MacbookShowcase: el
// "100% RESPONSIVE" pasa a mostrar trabajo real del estudio (mismos
// colores de marca: regal-blue #06113F, ice-blue #38BDF8, acento amarillo).
export default function SociedadesPhone() {
  return (
    <div className="relative flex h-full w-full flex-col overflow-hidden rounded-lg bg-[#06113F] text-white">
      {/* Nav fija */}
      <div className="flex items-center justify-between border-b border-white/10 bg-[#0A1128] px-2 py-1.5">
        <span className="text-[6px] font-black uppercase italic tracking-tight">
          Sociedades<span className="text-yellow-400">360</span>
        </span>
        <IconMenu2 className="h-2 w-2 text-white/80" />
      </div>

      {/* Hero */}
      <div
        className="flex flex-1 flex-col justify-center px-2.5 py-3"
        style={{
          background:
            'linear-gradient(180deg, rgba(6,17,63,0.35) 0%, rgba(6,17,63,0.92) 100%), ' +
            'radial-gradient(80% 55% at 82% 0%, rgba(56,189,248,0.28) 0%, transparent 70%)',
        }}
      >
        <span className="w-fit rounded-full border border-white/15 px-1 py-[1px] text-[3.5px] font-bold uppercase tracking-[0.15em] text-white/60">
          Estructuras legales de alto nivel
        </span>
        <h1 className="mt-1.5 text-[9px] font-extrabold leading-[1.15] tracking-tight">
          Asesoramiento societario
          <br />
          <span className="text-[#38BDF8]">Menos trámites, más soluciones</span>
        </h1>
        <p className="mt-1 text-[4px] leading-snug text-slate-300/80">
          Constitución de sociedades y gestión ante IGJ. Eliminamos la burocracia.
        </p>
        <div className="mt-2 flex gap-1">
          <span className="rounded bg-white px-1.5 py-1 text-[4px] font-bold text-[#06113F]">
            Solicitar Propuesta
          </span>
          <span className="rounded border border-white/25 px-1.5 py-1 text-[4px] font-bold text-white">
            Ver Portafolio
          </span>
        </div>
      </div>

      {/* Asomo de la seccion "Elegí tu estructura legal" */}
      <div className="border-t border-white/5 bg-[#0A1128] px-2 py-2">
        <p className="text-center text-[5px] font-black tracking-tight">Elegí tu estructura legal</p>
        <div className="mt-1.5 flex justify-center gap-1">
          {[
            ['🚀', 'S.A.S.'],
            ['🤝', 'S.R.L.'],
            ['🏢', 'S.A.'],
          ].map(([icon, label]) => (
            <div
              key={label}
              className="flex flex-col items-center gap-0.5 rounded-md bg-white/[0.04] px-1.5 py-1 ring-1 ring-white/10"
            >
              <span className="text-[6px] leading-none">{icon}</span>
              <span className="text-[4px] font-bold text-white/80">{label}</span>
              <span className="text-[3px] font-bold uppercase tracking-wider text-[#38BDF8]">Cotizar →</span>
            </div>
          ))}
        </div>
      </div>

      {/* WhatsApp flotante, como en el sitio real */}
      <div className="absolute bottom-1.5 right-1.5 flex h-3.5 w-3.5 items-center justify-center rounded-full bg-[#25D366] shadow-lg shadow-black/30">
        <IconBrandWhatsapp className="h-2 w-2 text-white" />
      </div>
    </div>
  );
}
