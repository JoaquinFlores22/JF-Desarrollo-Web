// Marco de celular en CSS puro, hermano del bisel del MacbookScroll: mismo
// espiritu (chrome de hardware falso, sin imagenes), pensado para pararse
// al lado del Mac y completar visualmente el "100% RESPONSIVE" que el
// SplitFlapText de MacbookShowcase ya promete en texto.
export default function PhoneFrame({ children, className = '' }) {
  return (
    <div className={`relative aspect-[9/19.5] w-full rounded-[2.2rem] bg-[#0a0a0a] p-[3px] shadow-2xl ring-1 ring-white/10 ${className}`}>
      <div className="relative h-full w-full overflow-hidden rounded-[2rem] bg-black">
        {children}
        {/* Notch */}
        <div className="absolute left-1/2 top-0 z-10 h-5 w-24 -translate-x-1/2 rounded-b-2xl bg-[#0a0a0a]" />
        {/* Boton lateral */}
        <div className="absolute -right-[3px] top-20 h-12 w-[3px] rounded-r bg-[#0a0a0a]" />
      </div>
    </div>
  );
}
