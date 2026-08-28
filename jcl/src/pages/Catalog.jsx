import { useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { PRODUCTS } from '../data/products';
import ProductCard from '../components/ProductCard';
import SizeGuide from '../components/SizeGuide';

const FILTERS = [
  { id: 'todos', label: 'Todo' },
  { id: 'pantalon', label: 'Pantalones' },
  { id: 'short', label: 'Shorts' },
];

export default function Catalog() {
  const [params, setParams] = useSearchParams();
  const filter = params.get('tipo') || 'todos';
  const [q, setQ] = useState('');
  const [view, setView] = useState('grid');
  const [guide, setGuide] = useState(false);

  const setFilter = (id) => {
    if (id === 'todos') params.delete('tipo');
    else params.set('tipo', id);
    setParams(params, { replace: true });
  };

  const list = useMemo(() => {
    const term = q.trim().toLowerCase();
    return PRODUCTS.filter(
      (p) =>
        (filter === 'todos' || p.category === filter) &&
        `${p.name} ${p.color} ${p.fabric}`.toLowerCase().includes(term),
    );
  }, [filter, q]);

  return (
    <>
      <div className="page-head">
        <p className="eyebrow">Catálogo · {PRODUCTS.length} modelos</p>
        <h1>
          Hecho <em>para repetir.</em>
        </h1>
      </div>

      <div className="wrap" style={{ paddingBottom: 'clamp(90px, 14vw, 180px)' }}>
        <div className="cat-bar">
          <div className="cat-filters">
            {FILTERS.map((f) => (
              <button
                key={f.id}
                className={filter === f.id ? 'active' : ''}
                onClick={() => setFilter(f.id)}
              >
                {f.label}
              </button>
            ))}
          </div>
          <div className="cat-right">
            <label className="cat-search">
              <span aria-hidden="true">⌕</span>
              <input
                type="search"
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Buscar modelo, color o tela"
                aria-label="Buscar"
              />
            </label>
            <button className="tlink" onClick={() => setGuide(true)}>
              Guía de talles
            </button>
            <div className="view-toggle" role="group" aria-label="Vista">
              <button className={view === 'grid' ? 'active' : ''} onClick={() => setView('grid')}>
                Grid
              </button>
              <button
                className={view === 'editorial' ? 'active' : ''}
                onClick={() => setView('editorial')}
              >
                Editorial
              </button>
            </div>
          </div>
        </div>

        <div className={`product-grid ${view === 'editorial' ? 'product-grid--editorial' : ''}`}>
          {list.length ? (
            list.map((p, i) => <ProductCard key={p.slug} product={p} index={i} />)
          ) : (
            <div className="cat-empty">
              <p>No encontramos modelos con ese criterio.</p>
              <button
                className="tlink"
                onClick={() => {
                  setQ('');
                  setFilter('todos');
                }}
              >
                Ver todo <b>→</b>
              </button>
            </div>
          )}
        </div>
      </div>

      <SizeGuide open={guide} onClose={() => setGuide(false)} />
    </>
  );
}
