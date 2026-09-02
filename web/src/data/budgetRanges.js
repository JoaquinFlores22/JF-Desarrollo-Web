// Rangos de referencia para la calculadora de presupuesto del home.
// Mismos tres escalones que la sección "Planes" (Esencial / Firma / Estudio).
export const budgetRanges = {
  esencial: [260000, 350000],
  firma: [580000, 740000],
  estudio: [1300000, 1300000],
};

export const budgetTypeLabels = {
  esencial: 'Esencial — landing con firma',
  firma: 'Firma — varias páginas',
  estudio: 'Estudio — a medida',
};

export const budgetExtras = [
  { value: 0, label: 'Sin extras' },
  { value: 40000, label: 'Carrito y checkout' },
  { value: 60000, label: 'Analítica y métricas' },
  { value: 90000, label: 'Carrito + analítica' },
];
