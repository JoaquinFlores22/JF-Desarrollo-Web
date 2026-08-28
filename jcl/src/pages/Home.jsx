import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { PRODUCTS } from '../data/products';
import { wa } from '../data/site';
import Marquee from '../components/Marquee';
import Seal from '../components/Seal';
import Reveal from '../components/Reveal';
import ProductCard from '../components/ProductCard';
import heroImg from '../assets/img/hero.jpg';
import look1 from '../assets/img/editorial-1.jpg';
import look2 from '../assets/img/look-1.jpg';

const EASE = [0.16, 1, 0.3, 1];

export default function Home() {
  return (
    <>
      <section className="hero">
        <div className="hero__bg">
          <motion.img
            src={heroImg}
            alt="Prenda JCL en uso"
            initial={{ scale: 1.15 }}
            animate={{ scale: 1 }}
            transition={{ duration: 1.6, ease: EASE }}
          />
        </div>

        <Seal className="hero__seal" text="JCL · ROPA SPORT · CABA · " center="26" />

        <div className="hero__inner">
          <p className="eyebrow">Ropa sport · Colección 2026</p>
          <h1 className="display">
            El básico,
            <br />
            <em>elevado.</em>
          </h1>
          <div className="hero__actions">
            <Link className="btn btn--light" to="/catalogo">
              Ver catálogo <span className="arw">↗</span>
            </Link>
            <Link className="tlink" to="/mayoristas" style={{ color: 'var(--bone)' }}>
              Comprar por mayor <b>→</b>
            </Link>
          </div>
          <div className="hero__meta">
            <span>Pantalones + Shorts</span>
            <span>Unisex · S – XL</span>
            <span>Desde 1 unidad</span>
            <span>Envíos a todo el país</span>
          </div>
        </div>
        <span className="scroll-cue">Scroll</span>
      </section>

      <Marquee />

      <section className="section wrap">
        <div className="section-head">
          <div>
            <p className="eyebrow">Elegidos de la semana</p>
            <h2>Lo que más se mueve.</h2>
          </div>
          <Link className="tlink" to="/catalogo">
            Todo el catálogo <b>→</b>
          </Link>
        </div>
        <div className="product-grid">
          {PRODUCTS.slice(0, 3).map((p, i) => (
            <ProductCard key={p.slug} product={p} index={i} />
          ))}
        </div>
      </section>

      <section className="section wrap">
        <div className="split">
          <Reveal className="split__intro">
            <p className="eyebrow">Cómo funciona</p>
            <h2>
              Tu ritmo,
              <br />
              <em>tu cantidad.</em>
            </h2>
          </Reveal>
          <div className="pillars">
            {[
              ['01', 'Mayor o menor', 'Comprá una sola prenda para vos o armá el pedido de tu local. Mismo trato, misma atención.'],
              ['02', 'Pago flexible', 'Efectivo, transferencia o Mercado Pago. Coordinamos la opción que te quede cómoda.'],
              ['03', 'Llega donde estés', 'Enviamos a todo el país. En CABA también coordinamos punto de encuentro en Flores.'],
            ].map(([n, t, d]) => (
              <Reveal className="pillar" key={n}>
                <span>{n}</span>
                <div>
                  <h3>{t}</h3>
                  <p>{d}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section wrap">
        <div className="section-head">
          <div>
            <p className="eyebrow">Lookbook</p>
            <h2>Hecho para repetir.</h2>
          </div>
          <p className="note">
            Pantalones y shorts unisex
            <br />
            Calces reales · Sin vueltas
          </p>
        </div>
        <div className="lookbook">
          <Reveal as="figure" img>
            <Link to="/catalogo?tipo=pantalon">
              <img src={look1} alt="Pantalón de uso diario" loading="lazy" />
              <figcaption>
                <span>Pantalones</span>
                <span>→</span>
              </figcaption>
            </Link>
          </Reveal>
          <Reveal as="figure" img>
            <Link to="/catalogo?tipo=short">
              <img src={look2} alt="Short deportivo" loading="lazy" />
              <figcaption>
                <span>Shorts</span>
                <span>→</span>
              </figcaption>
            </Link>
          </Reveal>
          <Reveal className="quote-card">
            <p>“Prendas que se bancan el día entero y siguen siendo vos.”</p>
            <span>JCL · Pantalones</span>
          </Reveal>
        </div>
      </section>

      <section className="closer">
        <p className="eyebrow" style={{ justifyContent: 'center', color: 'var(--ember-soft)' }}>
          Empecemos
        </p>
        <h2>
          Escribinos y armamos <em>tu pedido</em>.
        </h2>
        <a
          className="btn btn--ember"
          href={wa('Hola, JCL. Quiero consultar el catálogo, los talles y los colores disponibles.')}
          target="_blank"
          rel="noreferrer"
        >
          Escribir por WhatsApp <span className="arw">↗</span>
        </a>
      </section>
    </>
  );
}
