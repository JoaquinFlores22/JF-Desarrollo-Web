import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <div className="nf">
      <p className="eyebrow" style={{ justifyContent: 'center' }}>
        Error 404
      </p>
      <b>Ups.</b>
      <h1 style={{ fontSize: '1.6rem', margin: '4px 0 20px' }}>Esta página no existe.</h1>
      <Link className="btn btn--ember" to="/" style={{ justifySelf: 'center' }}>
        Volver al inicio <span className="arw">↗</span>
      </Link>
    </div>
  );
}
