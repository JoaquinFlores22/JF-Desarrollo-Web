import { createContext, useContext, useState } from 'react';
import es from '../locales/es.json';
import en from '../locales/en.json';

const dictionaries = { es, en };

const LanguageContext = createContext(null);

function getInitialLang() {
  if (typeof window === 'undefined') return 'es';
  try {
    return localStorage.getItem('lang') === 'en' ? 'en' : 'es';
  } catch {
    return 'es';
  }
}

export function LanguageProvider({ children }) {
  const [lang, setLangState] = useState(getInitialLang);

  const setLang = (l) => {
    setLangState(l);
    try {
      localStorage.setItem('lang', l);
    } catch {
      /* modo privado: no se recuerda el idioma, nada más */
    }
  };

  // Fallback a la propia key: un typo nunca renderiza vacío, se nota enseguida.
  const t = (key) => dictionaries[lang][key] ?? key;

  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export const useLanguage = () => useContext(LanguageContext);
