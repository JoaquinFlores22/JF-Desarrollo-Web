import { useState } from 'react';
import { money } from '../data/products';
import { useCart } from '../context/CartContext';
import Reveal from './Reveal';

export default function ProductCard({ product, index }) {
  const [size, setSize] = useState(null);
  const { add, has } = useCart();
  const added = has(product.slug, size || 'A confirmar');

  return (
    <Reveal as="article" className="pcard">
      <div className="pcard__media reveal-img in">
        <img src={product.image} alt={`${product.name} — ${product.color}`} loading="lazy" />
        <span className="pcard__tag">{product.tag}</span>
        <span className="pcard__stock">{product.stock}</span>
      </div>

      <div className="pcard__head">
        <div>
          <h3>{product.name}</h3>
          <p>
            {product.color} · Unisex
          </p>
        </div>
        <span className="pcard__price">{money(product.price)}</span>
      </div>

      <div className="pcard__meta">
        <span>{String(index + 1).padStart(2, '0')}</span>
        <span>{product.fit}</span>
      </div>

      <div className="pcard__buy">
        <div className="size-pills">
          {product.sizes.map((s) => (
            <button
              key={s}
              className="size-pill"
              aria-pressed={size === s}
              onClick={() => setSize((cur) => (cur === s ? null : s))}
            >
              {s}
            </button>
          ))}
        </div>
        <button
          className={`add-btn ${added ? 'added' : ''}`}
          onClick={() => add(product, size)}
        >
          {added ? 'Agregado ✓' : 'Agregar'}
        </button>
      </div>
    </Reveal>
  );
}
