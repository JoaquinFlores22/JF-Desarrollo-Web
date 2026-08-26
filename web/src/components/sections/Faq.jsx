import { useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import FaqItem from './FaqItem';

export default function Faq() {
  const { t } = useLanguage();
  const [expanded, setExpanded] = useState(false);

  return (
    <section className="max-w-3xl mx-auto py-24 px-6">
      <h3 className="text-3xl font-black mb-10 text-center">{t('faq_titulo')}</h3>

      <div className="space-y-4">
        <FaqItem qKey="faq_1_q" aKey="faq_1_a" />
        <FaqItem qKey="faq_2_q" aKey="faq_2_a" />
        {expanded && (
          <div className="space-y-4 pt-4">
            <FaqItem qKey="faq_3_q" aKey="faq_3_a" />
          </div>
        )}
      </div>

      <div className="text-center mt-12">
        <button
          type="button"
          onClick={() => setExpanded((e) => !e)}
          className="border-2 border-graphite dark:border-white px-8 py-3 rounded-full font-bold hover:bg-graphite hover:text-white dark:hover:bg-white dark:hover:text-graphite transition"
        >
          {t(expanded ? 'btn_ver_menos' : 'btn_ver_mas')}
        </button>
      </div>
    </section>
  );
}
