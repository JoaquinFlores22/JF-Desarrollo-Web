import { AnimatePresence, motion } from 'framer-motion';
import { useCart } from '../context/CartContext';
import { money } from '../data/products';

const EASE = [0.16, 1, 0.3, 1];

export default function CartDrawer() {
  const { open, setOpen, items, total, count, setQty, remove, clear, waLink } = useCart();

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            className="scrim"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpen(false)}
          />
          <motion.aside
            className="drawer"
            role="dialog"
            aria-label="Tu selección"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ duration: 0.5, ease: EASE }}
          >
            <div className="drawer__head">
              <h2>
                Tu selección <span style={{ fontFamily: 'var(--mono)', fontSize: '0.9rem' }}>({count})</span>
              </h2>
              <button onClick={() => setOpen(false)}>Cerrar</button>
            </div>

            <div className="drawer__body">
              {items.length === 0 ? (
                <p className="drawer__empty">
                  Todavía no elegiste nada.
                  <br />
                  Sumá prendas desde el catálogo.
                </p>
              ) : (
                items.map((i) => (
                  <div className="dline" key={i.key}>
                    <img src={i.image} alt="" />
                    <div>
                      <h4>{i.name}</h4>
                      <p>
                        {i.color} · Talle {i.size}
                      </p>
                      <div className="dline__qty">
                        <button onClick={() => setQty(i.key, -1)} aria-label="Menos">
                          –
                        </button>
                        <span>{i.qty}</span>
                        <button onClick={() => setQty(i.key, 1)} aria-label="Más">
                          +
                        </button>
                      </div>
                    </div>
                    <div>
                      <div className="dline__price">{money(i.price * i.qty)}</div>
                      <button className="dline__remove" onClick={() => remove(i.key)}>
                        Quitar
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>

            {items.length > 0 && (
              <div className="drawer__foot">
                <div className="drawer__total">
                  <span>Total orientativo</span>
                  <b>{money(total)}</b>
                </div>
                <p className="drawer__note">
                  El precio final, el stock y la forma de pago los confirmamos por WhatsApp.
                </p>
                <a className="btn btn--ember" href={waLink} target="_blank" rel="noreferrer">
                  Enviar por WhatsApp <span className="arw">↗</span>
                </a>
                <button className="drawer__clear" onClick={clear}>
                  Vaciar selección
                </button>
              </div>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
