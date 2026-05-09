import React from 'react';
import { Zap, Shield } from './Icons';

export const ComparisonSection = React.memo(function ComparisonSection({ content }) {
  const getIcon = (iconName) => {
    if (iconName === 'Zap') return <Zap size={14} className="text-yellow-500" />;
    if (iconName === 'Shield') return <Shield size={14} className="text-cyan-500" />;
    return null;
  };

  return (
    <section className="scroll-section align-right" data-enter="44" data-leave="56" data-animation="scale-up">
      <div className="section-inner w-full">
        <span className="s-elem brand-chip px-3 py-1 text-[10px] uppercase tracking-[0.32em] mb-6 block w-fit">{content.badge}</span>
        
        <h2 className="s-elem brand-heading text-[clamp(2.75rem,5.5vw,5.5rem)] mb-8 leading-none drop-shadow-lg text-white">
          {content.title.line1} <br/><span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ff007f] via-white to-[#00f0ff]">{content.title.line2}</span> {content.title.line3}
        </h2>

        <div className="s-elem w-full max-w-2xl premium-table rounded-[20px] overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
          <div className="flex border-b border-white/10 p-4 bg-gradient-to-r from-white/5 to-transparent uppercase text-[10px] tracking-[0.3em] text-white/45 font-semibold">
            <div className="w-1/3">Componente</div>
            <div className="w-1/3 text-white">XS Power Drink</div>
            <div className="w-1/3 text-right">El Resto</div>
          </div>
          
          {content.rows.map((row, idx) => (
            <div key={idx} className={`group ${idx !== content.rows.length - 1 ? 'premium-table-row' : ''} p-4 hover:bg-white/[0.04] transition-colors flex items-center ${idx === content.rows.length - 1 ? 'bg-white/[0.04]' : ''}`}>
              <div className="w-1/3 font-semibold text-white text-sm flex items-center gap-2">
                {getIcon(row.icon)}
                {row.icon === 'null' ? row.name : ` ${row.name}`}
              </div>
              <div className={`w-1/3 ${idx === content.rows.length - 1 ? 'text-[#ff007f] font-black text-lg drop-shadow-[0_0_10px_rgba(255,0,127,0.35)]' : 'text-[#39ff14] text-sm font-bold drop-shadow-[0_0_8px_rgba(57,255,20,0.25)]'}`}>
                {row.xs}
              </div>
              <div className={`w-1/3 text-right text-[#ff3333] text-sm opacity-55 ${idx === 0 ? 'line-through' : ''}`}>
                {row.rest}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
});
