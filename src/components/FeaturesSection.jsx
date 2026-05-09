import React from 'react';

export const FeaturesSection = React.memo(function FeaturesSection({ content }) {
  return (
    <section className="scroll-section align-right" data-enter="12" data-leave="20" data-animation="clip-reveal">
      <div className="section-inner opacity-100 flex flex-col gap-4 relative">
        <div className="absolute -left-16 top-0 w-px h-32 bg-gradient-to-b from-[#ff007f] to-transparent hidden md:block"></div>
        
        <div className="s-elem brand-chip px-3 py-1 rounded-full w-fit mb-2">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#ff007f] opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-[#ff007f]"></span>
          </span>
          <span className="text-[10px] font-semibold text-white/75 uppercase tracking-[0.32em]">{content.badge}</span>
        </div>

        <h2 className="s-elem brand-heading text-[clamp(2.8rem,6vw,5.75rem)] text-white drop-shadow-lg">
          {content.title.line1}<br/><span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00f0ff] via-white to-[#ff007f]">{content.title.line2}</span>
        </h2>
        <p className="s-elem brand-body text-base md:text-lg text-white/72 font-medium max-w-sm mt-4 leading-relaxed" dangerouslySetInnerHTML={{ __html: content.description }}></p>
        
        <div className="s-elem flex flex-wrap gap-4 mt-8">
          {content.stats.map((stat, idx) => (
            <div key={idx} className="glass-card premium-card px-6 py-4 rounded-[16px] relative overflow-hidden min-w-[180px]">
              <div className="card-accent absolute inset-x-0 top-0 h-px bg-gradient-to-r from-[#ff007f] via-[#5d2b9c] to-[#00f0ff] opacity-70 transition-opacity"></div>
              <div className="text-3xl font-black text-white">{stat.value}</div>
              <div className="text-[10px] text-white/65 uppercase tracking-[0.3em] mt-1 font-semibold">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
});
