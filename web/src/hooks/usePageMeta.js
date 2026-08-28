import { useEffect } from 'react';

const ORIGIN = 'https://desarrollodigital.vercel.app';

// Sin SSR, cada página ajusta title/description/canonical al montar. Es
// best-effort para SEO (Google ejecuta el JS) y correcto para el tab y para
// lo que comparten los usuarios.
export function usePageMeta({ title, description, path = '/' }) {
  useEffect(() => {
    if (title) document.title = title;

    const setAttr = (selector, attr, value) => {
      if (value == null) return;
      const el = document.head.querySelector(selector);
      if (el) el.setAttribute(attr, value);
    };

    setAttr('meta[name="description"]', 'content', description);
    setAttr('meta[property="og:title"]', 'content', title);
    setAttr('meta[property="og:description"]', 'content', description);
    setAttr('meta[property="og:url"]', 'content', `${ORIGIN}${path}`);
    setAttr('link[rel="canonical"]', 'href', `${ORIGIN}${path}`);
  }, [title, description, path]);
}
