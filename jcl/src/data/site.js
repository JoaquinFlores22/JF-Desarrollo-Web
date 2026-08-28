export const WHATSAPP_NUMBER = '541130621946';

export function wa(text) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;
}

export const SOCIALS = [
  { label: 'Instagram', short: 'IG', href: 'https://www.instagram.com/jcl.pantalones/' },
  { label: 'Threads', short: 'TH', href: 'https://www.threads.com/@jcl.pantalones' },
  { label: 'TikTok', short: 'TT', href: 'https://www.tiktok.com/@jcl_joggins' },
];

// Escalas de precio por volumen (por unidad, en pesos).
export const WHOLESALE_TIERS = [
  { min: 1, max: 5, unit: 32000, label: 'Minorista' },
  { min: 6, max: 11, unit: 26500, label: 'Mayorista' },
  { min: 12, max: Infinity, unit: 22900, label: 'Mayorista +' },
];

export function unitPriceFor(qty) {
  const tier = WHOLESALE_TIERS.find((t) => qty >= t.min && qty <= t.max) ?? WHOLESALE_TIERS[0];
  return tier.unit;
}

export const SIZE_GUIDE = [
  { size: 'S', waist: '70 – 78 cm' },
  { size: 'M', waist: '78 – 86 cm' },
  { size: 'L', waist: '86 – 94 cm' },
  { size: 'XL', waist: '94 – 102 cm' },
];

export const NAV = [
  { to: '/', label: 'Inicio' },
  { to: '/catalogo', label: 'Catálogo' },
  { to: '/mayoristas', label: 'Mayoristas' },
  { to: '/como-comprar', label: 'Cómo comprar' },
  { to: '/contacto', label: 'Contacto' },
];
