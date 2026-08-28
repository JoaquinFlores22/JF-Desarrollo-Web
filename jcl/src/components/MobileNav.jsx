import { motion } from 'framer-motion';
import { NavLink } from 'react-router-dom';
import { NAV, SOCIALS } from '../data/site';

export default function MobileNav({ onClose }) {
  return (
    <motion.div
      className="mobile-nav"
      initial={{ clipPath: 'inset(0 0 100% 0)' }}
      animate={{ clipPath: 'inset(0 0 0% 0)' }}
      exit={{ clipPath: 'inset(0 0 100% 0)' }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
    >
      <button
        onClick={onClose}
        style={{
          position: 'absolute',
          top: 22,
          right: 'var(--gutter)',
          fontFamily: 'var(--mono)',
          fontSize: '0.72rem',
          letterSpacing: '0.14em',
          textTransform: 'uppercase',
          color: 'var(--bone)',
        }}
      >
        Cerrar
      </button>
      {NAV.map((n, i) => (
        <motion.span
          key={n.to}
          initial={{ y: 40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.15 + i * 0.06, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        >
          <NavLink to={n.to} end={n.to === '/'} onClick={onClose}>
            {n.label}
          </NavLink>
        </motion.span>
      ))}
      <div className="socials">
        {SOCIALS.map((s) => (
          <a key={s.href} href={s.href} target="_blank" rel="noreferrer">
            {s.label}
          </a>
        ))}
      </div>
    </motion.div>
  );
}
