import { createContext, useContext, useEffect, useMemo, useState, useCallback } from 'react';
import { wa } from '../data/site';
import { money } from '../data/products';

const CartContext = createContext(null);
const KEY = 'jcl-seleccion';

const safeRead = () => {
  try {
    const raw = localStorage.getItem(KEY);
    const parsed = raw ? JSON.parse(raw) : [];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
};

export function CartProvider({ children }) {
  const [items, setItems] = useState(safeRead);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    try {
      localStorage.setItem(KEY, JSON.stringify(items));
    } catch {
      /* almacenamiento no disponible: seguimos sin persistir */
    }
  }, [items]);

  const add = useCallback((product, size) => {
    const key = `${product.slug}__${size || 'sin-talle'}`;
    setItems((cur) => {
      const found = cur.find((i) => i.key === key);
      if (found) return cur.map((i) => (i.key === key ? { ...i, qty: i.qty + 1 } : i));
      return [
        ...cur,
        {
          key,
          slug: product.slug,
          name: product.name,
          color: product.color,
          price: product.price,
          image: product.image,
          size: size || 'A confirmar',
          qty: 1,
        },
      ];
    });
    setOpen(true);
  }, []);

  const setQty = useCallback((key, delta) => {
    setItems((cur) =>
      cur
        .map((i) => (i.key === key ? { ...i, qty: i.qty + delta } : i))
        .filter((i) => i.qty > 0),
    );
  }, []);

  const remove = useCallback((key) => setItems((cur) => cur.filter((i) => i.key !== key)), []);
  const clear = useCallback(() => setItems([]), []);

  const value = useMemo(() => {
    const count = items.reduce((n, i) => n + i.qty, 0);
    const total = items.reduce((n, i) => n + i.qty * i.price, 0);
    const lines = items
      .map((i) => `· ${i.name} (${i.color}, talle ${i.size}) ×${i.qty}`)
      .join('\n');
    const waLink = wa(
      `Hola, JCL. Quiero confirmar esta selección:\n${lines}\n\nTotal orientativo: ${money(total)}\n¿Me confirman stock, talles y forma de pago?`,
    );
    return {
      items,
      count,
      total,
      open,
      setOpen,
      add,
      setQty,
      remove,
      clear,
      waLink,
      has: (slug, size) => items.some((i) => i.slug === slug && i.size === (size || 'A confirmar')),
    };
  }, [items, open, add, setQty, remove, clear]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export const useCart = () => useContext(CartContext);
