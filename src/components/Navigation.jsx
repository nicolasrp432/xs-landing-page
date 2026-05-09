import React from 'react';
import { Zap } from './Icons';

export const Navigation = React.memo(function Navigation({ onCTA }) {
  return (
    <nav className="fixed w-full z-[100] px-4 sm:px-6 py-4 sm:py-5 flex justify-between items-center pointer-events-auto isolate">
      <div className="brand-chip px-4 py-2 rounded-full text-sm sm:text-base relative z-10">
        <span className="brand-heading text-xl sm:text-2xl">XS</span>
        <span className="uppercase text-[10px] sm:text-xs tracking-[0.3em] text-white/75">Power Drink</span>
      </div>
      <button 
        onClick={() => onCTA('scroll', 'nav')}
        className="hidden md:flex secondary-button font-semibold text-xs px-6 py-2 rounded-full uppercase tracking-[0.28em] items-center gap-2">
        <Zap size={14} /> Comprar Ahora
      </button>
    </nav>
  );
});
