import { useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';

export default function FaqItem({ qKey, aKey }) {
  const { t } = useLanguage();
  const [open, setOpen] = useState(false);

  return (
    <div className="border-b border-graphite/10 dark:border-white/10 pb-4">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="w-full text-left font-bold py-4 flex justify-between items-center"
      >
        <span>{t(qKey)}</span>
        <span className="text-accent text-xl">{open ? '−' : '+'}</span>
      </button>
      {open && <div className="pt-2 pb-4 opacity-70 text-sm">{t(aKey)}</div>}
    </div>
  );
}
