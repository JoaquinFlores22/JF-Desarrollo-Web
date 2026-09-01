import { useEffect } from 'react';

const ORIGIN = 'https://desarrollodigital.vercel.app';

// Sin SSR, cada página ajusta title/description/canonical al montar. Es
// best-effort para SEO (Google ejecuta el JS) y correcto para el tab y para
// lo que comparten los usuarios.
export function usePageMeta({ title, description, path = '/', noindex = false }) {
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
    setAttr('meta[name="twitter:title"]', 'content', title);
    setAttr('meta[name="twitter:description"]', 'content', description);
    setAttr('link[rel="canonical"]', 'href', `${ORIGIN}${path}`);

    let robots = document.head.querySelector('meta[name="robots"]');
    if (noindex) {
      if (!robots) {
        robots = document.createElement('meta');
        robots.setAttribute('name', 'robots');
        document.head.appendChild(robots);
      }
      robots.setAttribute('content', 'noindex, follow');
    } else if (robots) {
      robots.setAttribute('content', 'index, follow');
    }
  }, [title, description, path, noindex]);
}
