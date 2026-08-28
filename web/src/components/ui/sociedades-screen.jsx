import { IconBrandWhatsapp } from '@tabler/icons-react';

// Mock en CSS puro de la home de sociedades360.com.ar en vista desktop.
// Ocupa la "pantalla" del MacbookScroll (4:3) -- junto con SociedadesPhone
// en el celular de al lado, muestra la MISMA web adaptada a los dos
// dispositivos: el "100% RESPONSIVE" hecho literal, con trabajo real.
// Colores de marca: regal-blue #06113F, ice-blue #38BDF8, acento amarillo.
const CARDS = [
  ['🚀', 'S.A.S.', 'Rapidez y digitalización para emprendedores tech.'],
  ['🤝', 'S.R.L.', 'La estructura clásica para PyMEs, con patrimonio protegido.'],
  ['🏢', 'S.A.', 'Corporativa y robusta, para grandes inversiones.'],
];

export default function SociedadesScreen() {
  return (
    <div className="relative flex h-full w-full flex-col overflow-hidden rounded-lg bg-[#0A1128] font-sans text-white">
      {/* Nav */}
      <div className="flex shrink-0 items-center justify-between border-b border-white/10 bg-[#0A1128] px-5 py-2.5">
        <span className="text-[13px] font-black uppercase italic tracking-tight">
          Sociedades<span className="text-yellow-400">360</span>
        </span>
        <div className="flex items-center gap-3 text-[8px] font-medium text-slate-400">
          <span>Sociedades</span>
          <span className="font-bold text-[#38BDF8]">Nosotros</span>
          <span className="rounded-md bg-white px-2.5 py-1 text-[7px] font-bold text-[#06113F]">CONSULTAR AHORA</span>
          <span className="rounded-lg border border-white/10 bg-white/5 px-1.5 py-1 text-[7px] font-black text-white">AR · ES</span>
          <span className="text-[9px]">🌙</span>
        </div>
      </div>

      {/* Hero */}
      <div
        className="relative flex flex-1 flex-col justify-center px-8"
        style={{
          background:
            'radial-gradient(60% 80% at 80% 8%, rgba(56,189,248,0.18) 0%, transparent 60%), ' +
            'radial-gradient(55% 65% at 8% 100%, rgba(6,17,63,0.95) 0%, transparent 72%), ' +
            'linear-gradient(180deg, #0A1128 0%, #06102e 100%)',
        }}
      >
        <div className="max-w-[64%]">
          <span className="inline-block w-fit rounded-full border border-white/10 bg-white/5 px-2 py-0.5 text-[6.5px] font-bold uppercase tracking-[0.18em] text-slate-400">
            Estructuras legales de alto nivel
          </span>
          <h1 className="mt-2.5 text-[23px] font-extrabold leading-[1.08] tracking-tight">
            Asesoramiento societario
            <br />
            <span className="text-[#38BDF8]">Menos trámites, más soluciones</span>
          </h1>
          <p className="mt-2.5 max-w-[85%] text-[8px] leading-relaxed text-slate-400">
            Constitución de sociedades y gestión ante IGJ. Eliminamos la burocracia para que usted se
            enfoque en el negocio.
          </p>
          <div className="mt-3.5 flex gap-2">
            <span className="rounded-lg bg-white px-3 py-1.5 text-[8px] font-bold text-[#06113F] shadow-lg shadow-black/20">
              Solicitar Propuesta
            </span>
            <span className="rounded-lg border border-white/20 px-3 py-1.5 text-[8px] font-bold text-white">
              Ver Portafolio
            </span>
          </div>
        </div>
      </div>

      {/* Asomo de la seccion "Elegí tu estructura legal" */}
      <div className="shrink-0 border-t border-white/5 bg-[#0b1230] px-8 py-3">
        <p className="text-[9px] font-black tracking-tight">Elegí tu estructura legal</p>
        <div className="mt-2 grid grid-cols-3 gap-2">
          {CARDS.map(([icon, label, desc]) => (
            <div key={label} className="rounded-xl bg-white/[0.03] px-2.5 py-2 ring-1 ring-white/10">
              <span className="text-[11px] leading-none">{icon}</span>
              <p className="mt-1 text-[8px] font-black text-white">{label}</p>
              <p className="mt-0.5 text-[6px] leading-snug text-slate-400">{desc}</p>
              <p className="mt-1 text-[5.5px] font-bold uppercase tracking-[0.15em] text-[#38BDF8]">Cotizar ahora →</p>
            </div>
          ))}
        </div>
      </div>

      {/* WhatsApp flotante, como en el sitio real */}
      <div className="absolute bottom-3 right-3 flex h-7 w-7 items-center justify-center rounded-full bg-[#25D366] shadow-xl shadow-black/30">
        <IconBrandWhatsapp className="h-4 w-4 text-white" />
      </div>
    </div>
  );
}
