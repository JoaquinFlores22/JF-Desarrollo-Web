// Número único de WhatsApp del estudio. Para wa.me va sin '+', y en móviles
// argentinos lleva el 9 después del 54 (54 · 9 · 11 · ...); sin ese 9 los
// mensajes de wa.me no se entregan.
export const WHATSAPP_NUMBER = '5491169024270';

// Link a WhatsApp con un texto opcional ya prellenado.
export function waHref(text) {
  const base = `https://wa.me/${WHATSAPP_NUMBER}`;
  return text ? `${base}?text=${encodeURIComponent(text)}` : base;
}
