import React from 'react';
import { Check, Zap } from './Icons';

export const VitaminsSection = React.memo(function VitaminsSection({ content }) {
  return (
    <section className="scroll-section align-left" data-enter="24" data-leave="34" data-animation="fade-up">
      <div className="section-inner">
        <span className="s-elem brand-chip px-3 py-1 text-[10px] uppercase tracking-[0.32em] mb-4 block w-fit">{content.badge}</span>
        <h2 className="s-elem brand-heading text-[clamp(2.6rem,5vw,5rem)] drop-shadow-lg text-white">
          {content.title.line1}<br/><span className="text-stroke text-[#00f0ff]/40">{content.title.line2}</span>
        </h2>
        
        <div className="s-elem mt-6 flex items-center gap-3 text-sm text-white/72 brand-body">
          <Check className="text-[#00f0ff]" size={18} />
          <span>{content.subtitle}</span>
        </div>

        <div className="s-elem mt-8 grid grid-cols-2 gap-4">
          <div className="glass-card premium-card p-6 rounded-[18px] relative overflow-hidden group border border-[#00f0ff]/15 bg-white/[0.03]">
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <div className="text-4xl font-black text-white mb-1 drop-shadow-[0_0_15px_rgba(0,240,255,0.35)]">
                <span className="stat-number" data-value={content.cards[0].percentage}>0</span>%
              </div>
              <div className="text-xs text-[#00f0ff] uppercase font-semibold tracking-[0.28em] mb-2">{content.cards[0].label}</div>
              <div className="text-sm text-white/62 font-medium">{content.cards[0].description}</div>
          </div>
          <div className="glass-card premium-card p-6 rounded-[18px] relative overflow-hidden group border border-[#ff007f]/15 bg-white/[0.03]">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <Zap className="text-[#ff007f] mb-3 relative z-10 drop-shadow-[0_0_10px_rgba(255,0,127,0.45)]" size={32} />
              <div className="text-sm font-bold text-white mb-2 relative z-10 uppercase tracking-[0.28em]">{content.cards[1].label}</div>
              <div className="text-xs text-white/62 font-medium relative z-10">{content.cards[1].description}</div>
          </div>
        </div>
        <p className="s-elem text-[10px] text-white/42 mt-4 uppercase tracking-[0.22em]">{content.disclaimer}</p>
      </div>
    </section>
  );
});
