import { useState } from 'react';
import { WHOLESALE_TIERS, unitPriceFor, wa } from '../data/site';
import { money } from '../data/products';
import Reveal from '../components/Reveal';
import Seal from '../components/Seal';

export default function Wholesale() {
  const [qty, setQty] = useState(6);
  const clamp = (n) => Math.max(1, Math.min(999, n || 1));
  const unit = unitPriceFor(qty);
  const total = unit * qty;

  return (
    <>
      <section className="wholesale-hero">
        <div style={{ maxWidth: 'var(--max)', margin: '0 auto', position: 'relative' }}>
          <p className="eyebrow">Mayoristas · Desde 6 unidades</p>
          <h1>
            Comprá para <em>revender.</em>
          </h1>
          <p className="lead">
            Escalas de precio claras, sin mínimos imposibles. Armás el pedido, lo confirmamos por
            WhatsApp y coordinamos envío o retiro en Flores.
          </p>
        </div>
      </section>

      <section className="section wrap">
        <div className="wholesale-layout">
          <div>
            <p className="eyebrow">Escala de precios</p>
            <div className="tier-table" style={{ marginTop: 24 }}>
              <div className="tier-row tier-row--head">
                <span>Nivel</span>
                <span>Cantidad</span>
                <span>Precio / unidad</span>
                <span />
              </div>
              {WHOLESALE_TIERS.map((t) => {
                const active = qty >= t.min && qty <= t.max;
                return (
                  <div className={`tier-row ${active ? 'is-active' : ''}`} key={t.label}>
                    <span className="lvl">{t.label}</span>
                    <span>
                      {t.max === Infinity ? `${t.min}+ unidades` : `${t.min}–${t.max} unidades`}
                    </span>
                    <strong>{money(t.unit)}</strong>
                    <span className="index-num">{active ? '● vos' : ''}</span>
                  </div>
                );
              })}
            </div>
            <p style={{ color: 'var(--ash)', fontSize: '0.85rem', marginTop: 20 }}>
              Precios orientativos por prenda, combinables entre modelos. El precio final se confirma
              al cerrar el pedido.
            </p>
          </div>

          <Reveal className="calc">
            <label htmlFor="q">Calculá tu pedido</label>
            <div className="qty-control">
              <button onClick={() => setQty((n) => clamp(n - 1))} aria-label="Restar">
                –
              </button>
              <input
                id="q"
                type="number"
                min="1"
                value={qty}
                onChange={(e) => setQty(clamp(Number(e.target.value)))}
              />
              <button onClick={() => setQty((n) => clamp(n + 1))} aria-label="Sumar">
                +
              </button>
            </div>
            <div className="calc__out">
              <span>Precio por unidad</span>
              <b>{money(unit)}</b>
              <span>Total ({qty} prendas)</span>
              <b>{money(total)}</b>
            </div>
            <a
              className="btn btn--ember"
              href={wa(
                `Hola, JCL. Quiero un pedido mayorista de ${qty} prendas (aprox. ${money(total)}). ¿Me pasan disponibilidad y coordinamos?`,
              )}
              target="_blank"
              rel="noreferrer"
            >
              Consultar este pedido <span className="arw">↗</span>
            </a>
          </Reveal>
        </div>
      </section>

      <section className="section--tight wrap" style={{ display: 'grid', placeItems: 'center' }}>
        <Seal
          className=""
          style={{ width: 190, height: 190, color: 'var(--olive)' }}
          text="MAYOR Y MENOR · DESDE FLORES · "
          center="JCL"
        />
      </section>

      <section className="section wrap">
        <div className="steps">
          {[
            ['Uno', 'Elegí modelos y cantidades', 'Combiná pantalones y shorts hasta llegar a la escala que te sirve.'],
            ['Dos', 'Confirmamos por WhatsApp', 'Te pasamos stock real, talles y el precio final del pedido.'],
            ['Tres', 'Enviamos o coordinás retiro', 'Despacho a todo el país o punto de encuentro en Flores, CABA.'],
          ].map(([n, t, d]) => (
            <Reveal className="step" key={n}>
              <span>{n}</span>
              <div>
                <h3>{t}</h3>
                <p>{d}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>
    </>
  );
}
