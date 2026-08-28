import { Link } from 'react-router-dom';
import { SOCIALS, wa } from '../data/site';

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="footer">
      <div className="footer-inner">
        <div className="footer-top">
          <div className="footer-brand">
            <div className="footer-mark">
              JCL<em>·</em>
            </div>
            <p>
              Pantalones y shorts unisex para el uso diario. Mayor y menor desde Flores, CABA, con
              envíos a todo el país.
            </p>
            <div className="mobile-nav socials" style={{ position: 'static', marginTop: 22, gap: 14 }}>
              <a href={wa('Hola, JCL. Quiero hacer una consulta.')} target="_blank" rel="noreferrer">
                WA
              </a>
              {SOCIALS.map((s) => (
                <a key={s.href} href={s.href} target="_blank" rel="noreferrer">
                  {s.short}
                </a>
              ))}
            </div>
          </div>

          <div className="footer-col">
            <h4>Tienda</h4>
            <Link to="/catalogo">Catálogo</Link>
            <Link to="/catalogo?tipo=pantalon">Pantalones</Link>
            <Link to="/catalogo?tipo=short">Shorts</Link>
            <Link to="/mayoristas">Comprar por mayor</Link>
          </div>

          <div className="footer-col">
            <h4>Ayuda</h4>
            <Link to="/como-comprar">Envíos y pagos</Link>
            <Link to="/contacto">Contacto</Link>
            <Link to="/terminos">Términos</Link>
            <a href={wa('Hola, JCL. Quiero hacer una consulta.')} target="_blank" rel="noreferrer">
              WhatsApp
            </a>
          </div>
        </div>

        <div className="footer-bottom">
          <span>© {year} JCL Pantalones</span>
          <span>Flores, CABA · Lun a Sáb</span>
        </div>
      </div>
    </footer>
  );
}
