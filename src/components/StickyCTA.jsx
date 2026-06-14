import React from 'react';
import { Zap, Clock } from './Icons';

export const StickyCTA = React.memo(function StickyCTA({ onCTA }) {
  return (
    <div className="fixed bottom-6 right-6 left-[5.5rem] sm:left-auto sm:w-[360px] z-[90] pointer-events-auto">
      <button 
        onClick={() => onCTA('scroll', 'sticky_bottom')}
        className="w-full primary-button p-[2px] rounded-[18px] shadow-[0_10px_40px_rgba(255,0,127,0.3)] hover:shadow-[0_10px_60px_rgba(255,0,127,0.5)] transition-all group overflow-hidden outline-none">
        <div className="bg-[#16161a]/88 backdrop-blur-xl rounded-[16px] px-4 sm:px-6 py-3 sm:py-4 flex items-center justify-between gap-3 group-hover:bg-[#16161a]/72 transition-all border border-white/5">
          <div className="flex flex-col text-left">
            <span className="brand-heading text-white text-base sm:text-lg leading-none">Asegura tu XS</span>
            <span className="text-[#ff8cc0] text-[9px] sm:text-[10px] uppercase tracking-[0.28em] font-semibold mt-1 flex items-center gap-1"><Clock size={10} /> Oferta Limitada</span>
          </div>
          <div className="bg-white text-black rounded-full p-2 group-hover:rotate-12 group-hover:scale-110 transition-transform shadow-[0_0_20px_rgba(255,255,255,0.5)] shrink-0">
            <Zap size={18} fill="currentColor" />
          </div>
        </div>
      </button>
    </div>
  );
});
