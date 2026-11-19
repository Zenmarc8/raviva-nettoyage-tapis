import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

interface FaqItem {
  q: string;
  a: string;
}

interface FaqAccordionProps {
  items: FaqItem[];
  idPrefix?: string;
}

export const FaqAccordion: React.FC<FaqAccordionProps> = ({ items, idPrefix = 'faq' }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="divide-y divide-slate-200 border-y border-slate-200">
      {items.map((item, idx) => {
        const isOpen = openIndex === idx;
        const btnId = `${idPrefix}-btn-${idx}`;
        const panelId = `${idPrefix}-panel-${idx}`;

        return (
          <div key={item.q}>
            <h3>
              <button
                id={btnId}
                type="button"
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => setOpenIndex(isOpen ? null : idx)}
                className="flex min-h-[56px] w-full items-center justify-between gap-4 py-4 text-left text-base font-semibold text-slate-900 transition-colors hover:text-[#0b3d2e]"
              >
                <span>{item.q}</span>
                <ChevronDown
                  className={`h-5 w-5 shrink-0 text-slate-500 transition-transform duration-200 ${
                    isOpen ? 'rotate-180 text-[#0b3d2e]' : ''
                  }`}
                  aria-hidden="true"
                />
              </button>
            </h3>
            <div
              id={panelId}
              role="region"
              aria-labelledby={btnId}
              hidden={!isOpen}
              className="pb-5 pr-8 text-sm leading-relaxed text-slate-600"
            >
              {item.a}
            </div>
          </div>
        );
      })}
    </div>
  );
};
