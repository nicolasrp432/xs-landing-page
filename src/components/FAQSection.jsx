import React from 'react';
import { ChevronDown } from './Icons';

export const FAQSection = React.memo(function FAQSection({ content }) {
  const [openIndex, setOpenIndex] = React.useState(0);

  const toggleFaq = (idx) => {
    setOpenIndex((current) => (current === idx ? -1 : idx));
  };

  return (
    <section className="scroll-section align-left" data-enter="54" data-leave="66" data-animation="fade-up">
      <div className="section-inner">
        <span className="s-elem brand-chip px-3 py-1 text-[10px] uppercase tracking-[0.32em] mb-4 block w-fit">{content.badge}</span>
        <h2 className="s-elem brand-heading text-[clamp(2.4rem,4.5vw,4.75rem)] drop-shadow-lg mb-8 text-white">{content.title}</h2>
        
        <div className="s-elem space-y-4 max-w-2xl pointer-events-auto">
          {content.items.map((item, idx) => (
            <div key={idx} className="premium-card rounded-[16px] overflow-hidden">
              <button
                onClick={() => toggleFaq(idx)}
                aria-expanded={openIndex === idx}
                className="w-full text-left p-4 flex justify-between items-center hover:bg-white/[0.04] font-semibold text-sm uppercase tracking-[0.24em] text-white"
              >
                {item.q}
                <ChevronDown
                  className={`transition-transform text-[#ff007f] ${openIndex === idx ? 'rotate-180' : 'rotate-0'}`}
                  size={16}
                />
              </button>
              <div
                className="px-4 text-white/62 brand-body font-medium text-sm overflow-hidden transition-all duration-300 ease"
                style={{ maxHeight: openIndex === idx ? '240px' : '0px', opacity: openIndex === idx ? 1 : 0 }}
              >
                <div className="pb-4">{item.a}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
});
