import React from 'react';
import { Zap, Check, Truck, Shield } from './Icons';
import { Footer } from './Footer';

export const PricingSection = React.memo(function PricingSection({ content, onCTA, setModalContent, variant }) {
  const starter = content.plans[0];
  const starterCta = variant === 'B' ? (starter.ctaVariantB || starter.cta) : starter.cta;

  return (
    <section id="pricing" className="scroll-section flex flex-col items-center text-center !padding-0 w-full left-0 right-0 max-w-7xl mx-auto px-4" style={{ position: 'absolute' }} data-persist="true" data-enter="78" data-leave="94" data-animation="stagger-up">
      <div className="s-elem mb-16 text-center relative">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-[#ff007f]/25 blur-[50px] -z-10"></div>
        <span className="brand-chip inline-block text-[10px] uppercase tracking-[0.32em] px-4 py-1 rounded-full mb-8">{content.badge}</span>
        <h2 className="brand-heading text-[clamp(3rem,6vw,6.25rem)] text-white leading-tight mb-6 drop-shadow-2xl">{content.title.line1} <br/><span className="text-transparent bg-clip-text bg-gradient-to-r from-[#5d2b9c] via-[#ff007f] to-[#00f0ff]">{content.title.line2}</span></h2>
        <p className="brand-body text-white/70 max-w-2xl mx-auto text-base font-medium mt-6" dangerouslySetInnerHTML={{ __html: content.subtitle }}></p>
      </div>

      <div className="s-elem w-full max-w-md mx-auto cursor-auto pointer-events-auto">
        {/* Único pack disponible */}
        <div className="relative premium-card border border-[#ff007f]/45 bg-gradient-to-br from-[#5d2b9c]/30 to-black p-8 rounded-[22px] text-left overflow-hidden group transition-all flex flex-col justify-between">
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#ff007f]/18 rounded-full blur-[80px] -z-10 group-hover:bg-[#ff007f]/26 transition-colors"></div>

          <div>
            <h3 className="text-xs sm:text-sm font-semibold tracking-[0.28em] text-[#ff8cc0] mb-3 uppercase drop-shadow-[0_0_10px_rgba(255,0,127,0.35)]">{starter.name}</h3>
            <div className="flex items-baseline gap-3 mb-1">
              <span className="text-4xl sm:text-5xl font-black text-white brand-heading drop-shadow-lg">{starter.price}</span>
              <span className="text-sm text-white/55 font-semibold">{starter.quantity}</span>
            </div>
            <div className="text-xs text-[#ff8cc0]/80 mb-1">{starter.unitPrice}</div>
            <div className="text-xs sm:text-sm text-white/55 mb-6 brand-body">{starter.description}</div>
            <ul className="space-y-3 text-white/82 mb-8 text-sm font-medium">
              {starter.features.map((feature, idx) => (
                <li key={idx} className="flex items-center gap-3"><Check size={16} className="text-[#ff007f]" /> {feature}</li>
              ))}
            </ul>
          </div>
          <button 
            onClick={() => onCTA('checkout', `pricing_${starter.id}`, starter.id)}
            className="w-full primary-button font-black py-4 rounded-[10px] uppercase tracking-[0.28em] text-sm flex items-center justify-center gap-2 mt-auto">
            <Zap size={18} fill="currentColor" /> {starterCta}
          </button>
        </div>
      </div>

      <div className="s-elem mt-12 flex flex-wrap justify-center gap-8 text-white/42 text-xs uppercase tracking-[0.28em] items-center">
        <div className="flex items-center gap-2"><Shield size={16} /> {content.trustBadges[0]}</div>
        <div className="flex items-center gap-2"><Truck size={16} /> {content.trustBadges[1]}</div>
        <div className="flex items-center gap-2"><Check size={16} /> {content.trustBadges[2]}</div>
      </div>

      <Footer setModalContent={setModalContent} />
    </section>
  );
});
