// Rangos de referencia para la calculadora de presupuesto del home.
export const budgetRanges = {
  landing: [180000, 260000],
  corporate: [320000, 480000],
  commerce: [420000, 680000],
};

export const budgetTypeLabels = {
  landing: 'Landing de lanzamiento',
  corporate: 'Sitio corporativo',
  commerce: 'Catálogo / e-commerce',
};

export const budgetExtras = [
  { value: 0, label: 'Sin extras' },
  { value: 30000, label: 'Carrito y WhatsApp' },
  { value: 50000, label: 'SEO y analítica' },
  { value: 80000, label: 'Carrito + SEO' },
];
