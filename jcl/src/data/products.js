import cargo from '../assets/img/cargo.jpg';
import jogger from '../assets/img/jogger.jpg';
import shortLoop from '../assets/img/short-loop.jpg';
import parachute from '../assets/img/parachute.jpg';
import shortBasico from '../assets/img/short-basico.jpg';
import recto from '../assets/img/recto.jpg';

// 6 modelos. Precio minorista base; la escala por volumen vive en site.js.
export const PRODUCTS = [
  {
    slug: 'cargo-relax',
    name: 'Cargo Relax',
    category: 'pantalon',
    price: 32000,
    color: 'Arena',
    fit: 'Calce amplio',
    fabric: 'Gabardina de algodón lavada',
    image: cargo,
    tag: 'Calce amplio',
    sizes: ['S', 'M', 'L', 'XL'],
    stock: 'Disponible',
  },
  {
    slug: 'jogger-base',
    name: 'Jogger Base',
    category: 'pantalon',
    price: 29900,
    color: 'Negro',
    fit: 'Calce regular con puño',
    fabric: 'Frisa de algodón peinado',
    image: jogger,
    tag: 'Infaltable',
    sizes: ['S', 'M', 'L', 'XL'],
    stock: 'Disponible',
  },
  {
    slug: 'sport-loop',
    name: 'Short Sport Loop',
    category: 'short',
    price: 21900,
    color: 'Gris topo',
    fit: 'Calce corto, liviano',
    fabric: 'Micro-poliéster de secado rápido',
    image: shortLoop,
    tag: 'Liviano',
    sizes: ['S', 'M', 'L'],
    stock: 'Últimas unidades',
  },
  {
    slug: 'parachute',
    name: 'Parachute JCL',
    category: 'pantalon',
    price: 34900,
    color: 'Verde seco',
    fit: 'Calce oversize con cordón',
    fabric: 'Nylon mate reciclado',
    image: parachute,
    tag: 'Nuevo',
    sizes: ['S', 'M', 'L', 'XL'],
    stock: 'Disponible',
  },
  {
    slug: 'short-esencial',
    name: 'Short Esencial',
    category: 'short',
    price: 19900,
    color: 'Negro',
    fit: 'Calce clásico',
    fabric: 'Gabardina liviana',
    image: shortBasico,
    tag: 'Esencial',
    sizes: ['S', 'M', 'L'],
    stock: 'Últimas unidades',
  },
  {
    slug: 'recto-daily',
    name: 'Recto Daily',
    category: 'pantalon',
    price: 28900,
    color: 'Piedra',
    fit: 'Calce recto',
    fabric: 'Denim rígido 12 oz',
    image: recto,
    tag: 'Calce recto',
    sizes: ['S', 'M', 'L', 'XL'],
    stock: 'Disponible',
  },
];

export const money = (value) => `$ ${value.toLocaleString('es-AR')}`;
