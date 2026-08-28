import { useEffect, useRef, useState } from 'react';

// Reveal por scroll sin dependencias: agrega .in al entrar en viewport.
export default function Reveal({ as: Tag = 'div', img = false, className = '', style, children, ...rest }) {
  const ref = useRef(null);
  const [seen, setSeen] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || seen) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setSeen(true);
          io.disconnect();
        }
      },
      { threshold: 0.12, rootMargin: '0px 0px -8% 0px' },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [seen]);

  return (
    <Tag
      ref={ref}
      className={`${img ? 'reveal-img' : 'reveal'} ${seen ? 'in' : ''} ${className}`}
      style={style}
      {...rest}
    >
      {children}
    </Tag>
  );
}
