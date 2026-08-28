import { AnimatePresence, motion } from 'framer-motion';
import { SIZE_GUIDE } from '../data/site';

export default function SizeGuide({ open, onClose }) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="modal"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            className="modal__card"
            initial={{ y: 24, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 24, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            onClick={(e) => e.stopPropagation()}
          >
            <h3>Guía de talles</h3>
            <p>
              Medidas orientativas de cintura. El calce cambia según el modelo — confirmamos largo y
              cintura por WhatsApp antes de despachar.
            </p>
            <table className="size-table">
              <thead>
                <tr>
                  <th>Talle</th>
                  <th>Cintura</th>
                </tr>
              </thead>
              <tbody>
                {SIZE_GUIDE.map((r) => (
                  <tr key={r.size}>
                    <td>{r.size}</td>
                    <td>{r.waist}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <button
              className="btn btn--ghost"
              style={{ marginTop: 24, width: '100%', justifyContent: 'center' }}
              onClick={onClose}
            >
              Cerrar
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
