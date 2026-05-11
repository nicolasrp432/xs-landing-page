import React, { forwardRef } from 'react';
import { Star, Shield, Truck } from './Icons';

export const HeroSection = React.memo(forwardRef(({ content }, ref) => {
  return (
    <div id="hero-overlay" ref={ref} className="flex flex-col gap-1 premium-shell">
      {/* Premium backdrop for text contrast */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/30 to-transparent pointer-events-none" style={{ zIndex: -1 }}></div>
      
      {/* Social proof badge */}
      <div className="hero-word flex items-center gap-3 mb-3" style={{ animationDelay: '0.05s' }}>
        <div className="flex -space-x-2 rounded-full p-1.5 bg-black/40 backdrop-blur-sm border border-white/10">
          {[1,2,3,4].map(i => (
            <div key={i} className="w-8 h-8 rounded-full border-2 border-black/80 bg-gray-800 flex items-center justify-center overflow-hidden shadow-lg">
              <img src={`https://i.pravatar.cc/100?img=${i+10}`} alt="User" className="w-full h-full object-cover" />
            </div>
          ))}
        </div>
        <div className="flex flex-col">
          <div className="flex text-[#ff007f] drop-shadow-[0_0_12px_rgba(255,0,127,0.5)]">
            <Star size={12} /><Star size={12} /><Star size={12} /><Star size={12} /><Star size={12} />
          </div>
          <span className="text-[10px] uppercase font-bold tracking-[0.35em] text-white/90 drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">{content.badge}</span>
        </div>
      </div>
      
      {/* Premium Title with enhanced contrast */}
      <h1 className="brand-heading text-[clamp(3.25rem,8vw,7rem)] xl:text-[clamp(4.5rem,8.5vw,8.75rem)]" style={{ textShadow: '0 4px 20px rgba(0,0,0,0.8), 0 2px 6px rgba(0,0,0,0.9)' }}>
        {content.titleWords.map((word, idx) => (
          <span 
            key={idx} 
            className={`hero-word ${word.style}`} 
            style={{ 
              animationDelay: word.delay, 
              paddingBottom: word.paddingBottom,
              WebkitTextStroke: word.style.includes('gradient') ? 'none' : '0.5px rgba(255,255,255,0.1)'
            }}
          >
            {word.text}
          </span>
        ))}
      </h1>

      {/* Guarantees with glass effect */}
      <div className="hero-word flex flex-col sm:flex-row gap-4 items-start sm:items-center mt-6" style={{ animationDelay: '0.55s' }}>
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 px-4 py-2.5 rounded-full bg-black/40 backdrop-blur-md border border-white/10">
          <div className="flex items-center gap-2 text-[11px] sm:text-xs text-white/90 brand-body tracking-[0.22em] uppercase font-medium">
            <Shield size={16} className="text-[#39ff14] drop-shadow-[0_0_8px_rgba(57,255,20,0.5)]" />
            <span style={{ textShadow: '0 1px 3px rgba(0,0,0,0.8)' }}>{content.guarantees[0]}</span>
          </div>
          <div className="hidden sm:block w-px h-4 bg-white/30"></div>
          <div className="flex items-center gap-2 text-[11px] sm:text-xs text-white/90 brand-body tracking-[0.22em] uppercase font-medium">
            <Truck size={16} className="text-[#00f0ff] drop-shadow-[0_0_8px_rgba(0,240,255,0.5)]" />
            <span style={{ textShadow: '0 1px 3px rgba(0,0,0,0.8)' }}>{content.guarantees[1]}</span>
          </div>
        </div>
      </div>
      
      {/* Description with premium styling */}
      <div className="flex flex-col md:flex-row gap-6 items-start md:items-center mt-6">
        <div className="hero-word hidden md:block w-12 h-[2px] bg-gradient-to-r from-[#ff007f] via-[#00f0ff] to-transparent rounded-full" style={{ animationDelay: '0.5s' }}></div>
        <p 
          className="hero-word brand-body text-base md:text-lg font-medium tracking-wide max-w-md text-white/95 leading-relaxed" 
          style={{ 
            animationDelay: '0.6s',
            textShadow: '0 2px 8px rgba(0,0,0,0.9), 0 1px 2px rgba(0,0,0,0.8)'
          }} 
          dangerouslySetInnerHTML={{ __html: content.description }}
        ></p>
      </div>
    </div>
  );
}));
