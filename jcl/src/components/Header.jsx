import { useEffect, useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { NAV } from '../data/site';
import { useCart } from '../context/CartContext';
import MobileNav from './MobileNav';

export default function Header() {
  const [solid, setSolid] = useState(false);
  const [menu, setMenu] = useState(false);
  const { count, setOpen } = useCart();
  const { pathname } = useLocation();

  useEffect(() => {
    const onScroll = () => setSolid(window.scrollY > 40);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => setMenu(false), [pathname]);

  return (
    <>
      <header className={`header ${solid ? 'is-solid' : ''}`}>
        <NavLink to="/" className="brand" aria-label="JCL Pantalones, inicio">
          <span>
            JCL<i>·</i>
          </span>
          <small>Pantalones</small>
        </NavLink>

        <nav className="header-nav">
          {NAV.map((n) => (
            <NavLink key={n.to} to={n.to} end={n.to === '/'}>
              {n.label}
            </NavLink>
          ))}
        </nav>

        <div className="header-right">
          <button className="cart-btn" onClick={() => setOpen(true)} data-hot>
            <span>Selección</span>
            <sup>{count}</sup>
          </button>
          <button className="menu-toggle" onClick={() => setMenu(true)} aria-label="Abrir menú">
            Menú
          </button>
        </div>
      </header>

      {menu && <MobileNav onClose={() => setMenu(false)} />}
    </>
  );
}
