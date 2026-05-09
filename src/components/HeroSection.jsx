import React, { forwardRef } from 'react';
import { Star, Shield, Truck } from './Icons';

export const HeroSection = React.memo(forwardRef(({ content }, ref) => {
  return (
    <div id="hero-overlay" ref={ref} className="flex flex-col gap-1 premium-shell">
      {/* Social proof badge */}
      <div className="hero-word flex items-center gap-3 mb-3" style={{ animationDelay: '0.05s' }}>
        <div className="flex -space-x-2 rounded-full p-1 brand-chip">
            {[1,2,3,4].map(i => <div key={i} className="w-8 h-8 rounded-full border-2 border-black bg-gray-800 flex items-center justify-center overflow-hidden"><img src={`https://i.pravatar.cc/100?img=${i+10}`} alt="User" /></div>)}
        </div>
        <div className="flex flex-col">
          <div className="flex text-[#ff007f] drop-shadow-[0_0_8px_rgba(255,0,127,0.35)]">
            <Star size={12} /><Star size={12} /><Star size={12} /><Star size={12} /><Star size={12} />
          </div>
          <span className="text-[10px] uppercase font-semibold tracking-[0.35em] text-white/75 drop-shadow-md">{content.badge}</span>
        </div>
      </div>
      
      {/* Render words staggered */}
      <h1 className="brand-heading text-[clamp(3.25rem,8vw,7rem)] xl:text-[clamp(4.5rem,8.5vw,8.75rem)] drop-shadow-2xl">
        {content.titleWords.map((word, idx) => (
          <span key={idx} className={`hero-word ${word.style}`} style={{ animationDelay: word.delay, paddingBottom: word.paddingBottom }}>
            {word.text}
          </span>
        ))}
      </h1>

      <div className="hero-word flex flex-col sm:flex-row gap-4 items-start sm:items-center mt-5" style={{ animationDelay: '0.55s' }}>
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 text-[11px] sm:text-xs text-white/74 brand-body tracking-[0.26em] uppercase drop-shadow-md">
          <div className="flex items-center gap-2">
            <Shield size={16} className="text-[#39ff14]" />
            <span>{content.guarantees[0]}</span>
          </div>
          <div className="hidden sm:block w-px h-4 bg-white/20"></div>
          <div className="flex items-center gap-2">
            <Truck size={16} className="text-[#00f0ff]" />
            <span>{content.guarantees[1]}</span>
          </div>
        </div>
      </div>
      
      <div className="flex flex-col md:flex-row gap-6 items-start md:items-center mt-5">
        <div className="hero-word hidden md:block w-10 h-px bg-gradient-to-r from-white/70 to-transparent" style={{ animationDelay: '0.5s' }}></div>
        <p className="hero-word brand-body text-base md:text-lg font-medium tracking-wide max-w-md text-white/82 drop-shadow-md" style={{ animationDelay: '0.6s' }} dangerouslySetInnerHTML={{ __html: content.description }}></p>
      </div>
    </div>
  );
}));
