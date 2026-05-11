import React from 'react';

export const FlavorsSection = React.memo(function FlavorsSection({ content }) {
  return (
    <section className="scroll-section align-right flavors-section" data-enter="110" data-leave="127" data-animation="stagger-up">
      <div className="section-inner">
        <span className="s-elem brand-chip px-3 py-1 text-[10px] uppercase tracking-[0.32em] mb-8 block w-fit">{content.badge}</span>
        <h2 className="s-elem brand-heading text-[clamp(2.6rem,5vw,5rem)] drop-shadow-lg text-white leading-tight">
          {content.title.line1}<br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ff007f] via-white to-[#00f0ff]">{content.title.line2}</span>
        </h2>

        <p className="s-elem brand-body text-base md:text-lg text-white/80 font-medium max-w-2xl mt-6 leading-relaxed">
          {content.subtitle}
        </p>

        <div className="s-elem mt-12 grid gap-6 md:gap-8 md:grid-cols-2 pointer-events-auto flavors-grid">
          {content.items.map((flavor) => (
            <article key={flavor.name} className="premium-card rounded-[18px] p-5 relative overflow-hidden bg-white/[0.03] border border-white/10">
              <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-[#ff007f] via-[#5d2b9c] to-[#00f0ff] opacity-80"></div>
              <div className="flex items-start justify-between gap-3 mb-3">
                <div>
                  <h3 className="brand-heading text-white text-xl leading-none">{flavor.name}</h3>
                  <p className="text-[10px] uppercase tracking-[0.28em] text-[#ff8cc0] mt-2 font-semibold">{flavor.tag}</p>
                </div>
                <span className="text-[10px] uppercase tracking-[0.24em] text-white/42 border border-white/10 rounded-full px-3 py-1">XS</span>
              </div>

              <p className="brand-body text-sm text-white/72 leading-relaxed">{flavor.description}</p>
              <p className="brand-body text-[12px] text-white/45 mt-3 leading-relaxed">{flavor.note}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
});
