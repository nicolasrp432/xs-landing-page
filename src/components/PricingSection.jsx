import React from 'react';
import { ArrowRight, Zap, Check, Truck, Clock, Shield } from './Icons';
import { Footer } from './Footer';

export const PricingSection = React.memo(function PricingSection({ content, onCTA, setModalContent, variant }) {
  const starter = content.plans[0];
  const pro = content.plans[1];
  const proCta = variant === 'B' ? pro.ctaVariantB : pro.cta;

  return (
    <section id="pricing" className="scroll-section flex flex-col items-center text-center !padding-0 w-full left-0 right-0 max-w-7xl mx-auto px-4" style={{ position: 'absolute' }} data-persist="true" data-enter="68" data-leave="82" data-animation="stagger-up">
      <div className="s-elem mb-10 text-center relative">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-[#ff007f]/25 blur-[50px] -z-10"></div>
        <span className="brand-chip inline-block text-[10px] uppercase tracking-[0.32em] px-4 py-1 rounded-full mb-6">{content.badge}</span>
        <h2 className="brand-heading text-[clamp(3rem,6vw,6.25rem)] text-white leading-none mb-4 drop-shadow-2xl">{content.title.line1} <br/><span className="text-transparent bg-clip-text bg-gradient-to-r from-[#5d2b9c] via-[#ff007f] to-[#00f0ff]">{content.title.line2}</span></h2>
        <p className="brand-body text-white/65 max-w-md mx-auto text-sm font-medium mt-4" dangerouslySetInnerHTML={{ __html: content.subtitle }}></p>
      </div>

      <div className="s-elem grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-4xl mx-auto cursor-auto pointer-events-auto perspective-[1000px]">
        {/* Starter */}
        <div className="relative premium-card bg-black/50 p-8 rounded-[22px] text-left flex flex-col justify-between" style={{ transform: 'rotateY(5deg)' }}>
          <div>
            <h3 className="text-sm font-semibold tracking-[0.28em] text-white/45 mb-2 uppercase">{starter.name}</h3>
            <div className="text-4xl font-black mb-2 text-white brand-heading">{starter.quantity}</div>
            <div className="text-sm text-white/45 mb-6 brand-body">{starter.description}</div>
            <ul className="space-y-4 text-white/72 mb-10 text-sm font-medium">
              {starter.features.map((feature, idx) => (
                <li key={idx} className="flex items-center gap-3"><Check size={16} className="text-[#ff007f]" /> {feature}</li>
              ))}
            </ul>
          </div>
          <button 
            onClick={() => onCTA('checkout', `pricing_${starter.id}`, starter.id)}
            className="w-full secondary-button font-bold py-4 rounded-[10px] uppercase tracking-[0.28em] text-sm outline-none flex items-center justify-center gap-2 mt-auto">
            {starter.cta} <ArrowRight size={16} />
          </button>
        </div>

        {/* Pro - Glass Morphism High End */}
        <div className="relative premium-card border border-[#ff007f]/45 bg-gradient-to-br from-[#5d2b9c]/30 to-black p-8 rounded-[22px] text-left overflow-hidden group transition-all flex flex-col justify-between" style={{ transform: 'rotateY(-5deg) translateZ(20px)' }}>
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#ff007f]/18 rounded-full blur-[80px] -z-10 group-hover:bg-[#ff007f]/26 transition-colors"></div>
          
          {pro.isPopular && (
            <div className="absolute top-6 right-6 brand-chip text-[#ff8cc0] font-bold px-3 py-1 rounded-full text-[10px] uppercase tracking-[0.28em] flex items-center gap-1">
              <Zap size={12} fill="currentColor" /> Más Elegido
            </div>
          )}

          <div>
            <h3 className="text-sm font-semibold tracking-[0.28em] text-[#ff8cc0] mb-2 uppercase drop-shadow-[0_0_10px_rgba(255,0,127,0.35)]">{pro.name}</h3>
            <div className="flex items-end gap-3 mb-2">
              <div className="text-5xl font-black text-white brand-heading drop-shadow-lg">{pro.quantity}</div>
              <div className="text-lg text-white/45 line-through mb-1">{pro.price}</div>
            </div>
            <div className="text-xs text-[#ff8cc0] mb-8 uppercase tracking-[0.28em] font-semibold">{pro.description}</div>
            
            <ul className="space-y-4 text-white/82 mb-10 text-sm font-medium">
              <li className="flex items-center gap-3"><Zap size={16} className="text-[#ff007f]" fill="currentColor" /> {pro.features[0]}</li>
              <li className="flex items-center gap-3"><Truck size={16} className="text-[#00f0ff]" /> {pro.features[1]}</li>
              <li className="flex items-center gap-3"><Clock size={16} className="text-[#5d2b9c]" /> {pro.features[2]}</li>
            </ul>
          </div>
          
          <button 
            onClick={() => onCTA('checkout', `pricing_${pro.id}`, pro.id)}
            className="w-full primary-button font-black py-4 rounded-[10px] uppercase tracking-[0.28em] text-sm flex items-center justify-center gap-2 mt-auto">
            <Zap size={18} fill="currentColor" /> {proCta}
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
