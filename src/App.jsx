import React, { useState, useEffect, useRef, useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';
import FloatingAgent from './FloatingAgent';

gsap.registerPlugin(ScrollTrigger);

// Custom Icons
const Zap = ({ size = 24, className = "" }) => <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" /></svg>;
const Check = ({ size = 24, className = "" }) => <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><polyline points="20 6 9 17 4 12" /></svg>;
const Truck = ({ size = 24, className = "" }) => <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M5 18H3c-.6 0-1-.4-1-1V7c0-.6.4-1 1-1h10c.6 0 1 .4 1 1v11" /><path d="M14 9h4l4 4v4c0 .6-.4 1-1 1h-2" /><circle cx="7" cy="18" r="2" /><circle cx="17" cy="18" r="2" /></svg>;
const ChevronDown = ({ size = 24, className = "" }) => <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="m6 9 6 6 6-6" /></svg>;

export default function App() {
  const [loaded, setLoaded] = useState(false);
  const [progress, setProgress] = useState(0);
  const canvasRef = useRef(null);
  const scrollContainerRef = useRef(null);
  const heroRef = useRef(null);
  const darkOverlayRef = useRef(null);

  const FRAME_COUNT = 192; 
  const IMAGE_SCALE = 0.85;
  const FRAME_SPEED = 1.35; // Fine-tuned so video ends comfortably

  const framesRef = useRef([]);
  const lenisRef = useRef(null);

  // --- Lenis Smooth Scroll Setup ---
  useLayoutEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });
    lenisRef.current = lenis;

    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add((time) => lenis.raf(time * 1000));
    gsap.ticker.lagSmoothing(0);

    return () => {
      lenis.destroy();
      gsap.ticker.remove((time) => lenis.raf(time * 1000));
    };
  }, []);

  // --- Preloader & Canvas Drawing ---
  useLayoutEffect(() => {
    let imagesLoaded = 0;
    const frames = [];
    
    // Draw single frame function
    const drawFrame = (index) => {
      const img = framesRef.current[index];
      const canvas = canvasRef.current;
      if (!img || !canvas) return;
      const ctx = canvas.getContext('2d');
      const cw = canvas.width;
      const ch = canvas.height;
      const iw = img.naturalWidth || 1920;
      const ih = img.naturalHeight || 1080;
      const scale = Math.max(cw / iw, ch / ih) * IMAGE_SCALE;
      const dw = iw * scale;
      const dh = ih * scale;
      const dx = (cw - dw) / 2;
      const dy = (ch - dh) / 2;
      
      // Auto-sample border could be added, black fits the theme
      ctx.fillStyle = '#000000';
      ctx.fillRect(0, 0, cw, ch);
      ctx.drawImage(img, dx, dy, dw, dh);
    };

    // Load frames
    for (let i = 1; i <= FRAME_COUNT; i++) {
      const img = new Image();
      const paddedIndex = i.toString().padStart(4, '0');
      img.src = `/frames/frame_${paddedIndex}.webp`;
      img.onload = () => {
        imagesLoaded++;
        setProgress(Math.round((imagesLoaded / FRAME_COUNT) * 100));
        
        // Resolve early if we just loaded enough frames to start rendering
        if (imagesLoaded === 10) {
           drawFrame(1);
        }
        if (imagesLoaded === FRAME_COUNT) {
          setTimeout(() => setLoaded(true), 300);
        }
      };
      img.onerror = () => {
        // Mock finish if images don't exist
        imagesLoaded++;
        if (imagesLoaded === FRAME_COUNT) setLoaded(true);
      };
      frames.push(img);
    }
    framesRef.current = frames;

    let currentFrameIdx = 0;
    const getCurrentStoredFrame = () => currentFrameIdx;

    const resizeCanvas = () => {
      const canvas = canvasRef.current;
      if (canvas) {
        // Adjust for device pixel ratio to prevent blurring
        const dpr = window.devicePixelRatio || 1;
        canvas.width = window.innerWidth * dpr;
        canvas.height = window.innerHeight * dpr;
        drawFrame(Math.max(0, getCurrentStoredFrame())); // Re-draw current
      }
    };
    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();
    
    const canvasCtx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: scrollContainerRef.current,
        start: 'top top',
        end: 'bottom bottom',
        scrub: true,
        onUpdate: (self) => {
          const accelerated = Math.min(self.progress * FRAME_SPEED, 1);
          const index = Math.min(Math.floor(accelerated * FRAME_COUNT), FRAME_COUNT - 1);
          if (index !== currentFrameIdx) {
            currentFrameIdx = index;
            requestAnimationFrame(() => drawFrame(currentFrameIdx));
          }
        }
      });

      // Hero Fade Out
      ScrollTrigger.create({
        trigger: scrollContainerRef.current,
        start: 'top top',
        end: '15% top',
        scrub: true,
        onUpdate: (self) => {
          const p = self.progress;
          const opacity = Math.max(0, 1 - (p / 0.15));
          if (heroRef.current) {
            heroRef.current.style.opacity = opacity;
            heroRef.current.style.transform = `translateY(${p * 200}px)`;
            heroRef.current.style.pointerEvents = opacity > 0 ? 'auto' : 'none';
          }
        }
      });

      // Dark Overlay Fade
      // Ranges: enter at 20%, leave at 80%
      ScrollTrigger.create({
        trigger: scrollContainerRef.current,
        start: 'top top',
        end: 'bottom bottom',
        scrub: true,
        onUpdate: (self) => {
          const p = self.progress;
          let opacity = 0;
          if (p >= 0.18 && p <= 0.22) opacity = (p - 0.18) / 0.04 * 0.9;
          else if (p > 0.22 && p < 0.78) opacity = 0.9;
          else if (p >= 0.78 && p <= 0.82) opacity = 0.9 * (1 - (p - 0.78) / 0.04);
          if (darkOverlayRef.current) darkOverlayRef.current.style.opacity = opacity;
        }
      });
    });

    return () => {
      canvasCtx.revert();
      window.removeEventListener('resize', resizeCanvas);
    };
  }, []);

  // --- Scroll Sections Animation Logic ---
  useLayoutEffect(() => {
    if (!loaded) return;
    const sections = gsap.utils.toArray('.scroll-section');
    const ctx = gsap.context(() => {
      sections.forEach((section) => {
        const type = section.dataset.animation;
        const persist = section.dataset.persist === 'true';
        const enter = parseFloat(section.dataset.enter) / 100;
        const leave = parseFloat(section.dataset.leave) / 100;
        const children = section.querySelectorAll('.s-elem');

        section.style.top = `${((enter + leave) / 2) * 100}%`;

        const tl = gsap.timeline({ paused: true });

        switch (type) {
          case 'fade-up':
            tl.fromTo(children, { y: 60, opacity: 0 }, { y: 0, opacity: 1, stagger: 0.1, duration: 1.0, ease: 'power3.out' });
            break;
          case 'scale-up':
            tl.fromTo(children, { y: 50, scale: 0.85, opacity: 0 }, { y: 0, scale: 1, opacity: 1, stagger: 0.1, duration: 1.0, ease: 'power2.out' });
            break;
          case 'stagger-up':
            tl.fromTo(children, { y: 80, opacity: 0 }, { y: 0, opacity: 1, stagger: 0.15, duration: 0.8, ease: 'power3.out' });
            break;
          case 'clip-reveal':
            tl.fromTo(children, { clipPath: 'inset(100% 0 0 0)', opacity: 0 }, { clipPath: 'inset(0% 0 0 0)', opacity: 1, stagger: 0.15, duration: 1.2, ease: 'power4.inOut' });
            break;
          default:
            tl.fromTo(children, { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: 1.0 });
        }

        const WINDOW = 0.08;
        ScrollTrigger.create({
          trigger: scrollContainerRef.current,
          start: 'top top',
          end: 'bottom bottom',
          scrub: true,
          onUpdate: (self) => {
            const p = self.progress;
            // Play mechanism
            if (p >= enter && p <= enter + WINDOW) {
              tl.progress((p - enter) / WINDOW);
            } else if (p > enter + WINDOW && p < leave - WINDOW) {
              tl.progress(1);
            } else if (p >= leave - WINDOW && p <= leave) {
              if (persist) tl.progress(1);
              else tl.progress(1 - (p - (leave - WINDOW)) / WINDOW);
            } else {
              if (p < enter) tl.progress(0);
              if (p > leave && !persist) tl.progress(0);
              if (p > leave && persist) tl.progress(1);
            }
          }
        });
      });

      // Counter Animations
      const stats = gsap.utils.toArray('.stat-number');
      stats.forEach(el => {
        const target = parseFloat(el.dataset.value);
        const proxy = { val: 0 };
        gsap.fromTo(proxy, 
          { val: 0 }, 
          {
            val: target,
            duration: 2,
            ease: "power2.out",
            onUpdate: () => el.textContent = Math.round(proxy.val),
            onComplete: () => el.textContent = target,
            scrollTrigger: {
              trigger: el.closest('.scroll-section'),
              start: "top 75%",
              toggleActions: "play none none reset"
            }
          }
        );
      });

    }, scrollContainerRef);
    return () => ctx.revert();
  }, [loaded]);

  const toggleFaq = (e) => {
    const content = e.currentTarget.nextElementSibling;
    const icon = e.currentTarget.querySelector('.chevron');
    if (content.style.maxHeight && content.style.maxHeight !== '0px') {
      content.style.maxHeight = '0px';
      content.style.opacity = 0;
      icon.style.transform = 'rotate(0deg)';
    } else {
      content.style.maxHeight = content.scrollHeight + 'px';
      content.style.opacity = 1;
      icon.style.transform = 'rotate(180deg)';
    }
  };

  return (
    <>
      {/* Loader */}
      {!loaded && (
        <div id="loader">
          <h1 className="text-4xl font-black italic tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-pink-500 animate-pulse">
            XS™
          </h1>
          <div id="loader-bar">
            <div id="loader-progress" style={{ width: `${progress}%` }}></div>
          </div>
          <p className="mt-4 text-xs text-gray-500 font-mono">CARGANDO MODO XS... {progress}%</p>
        </div>
      )}

      {/* Fixed Nav */}
      <nav className="fixed w-full z-[100] px-6 py-5 flex justify-between items-center mix-blend-difference">
        <div className="text-2xl font-black tracking-tighter italic text-white flex items-center gap-2">
          XS<span className="text-xs uppercase font-light not-italic">Power Drink</span>
        </div>
        <button className="text-white border border-white/50 font-bold text-xs px-6 py-2 rounded-full hover:bg-white hover:text-black transition-all uppercase tracking-widest backdrop-blur-sm">
          Reservar
        </button>
      </nav>

      {/* Canvas Wrap (Visible frame 1) */}
      <div className="canvas-wrap">
        <canvas ref={canvasRef} id="canvas"></canvas>
      </div>

      {/* Hero Overlay */}
      <div id="hero-overlay" ref={heroRef} className="flex flex-col gap-2">
         {/* Render words staggered */}
         <h1 className="text-6xl md:text-8xl xl:text-9xl font-black italic tracking-tighter leading-[0.85] uppercase">
            <span className="hero-word" style={{ animationDelay: '0.1s' }}>TU ENERGÍA.</span>
            <span className="hero-word text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500" style={{ animationDelay: '0.2s', paddingBottom: '10px' }}>SIN LÍMITES.</span>
            <span className="hero-word text-stroke" style={{ animationDelay: '0.3s' }}>SIN AZÚCAR.</span>
         </h1>
         <div className="flex gap-4 items-center mt-8">
            <div className="hero-word w-10 h-[1px] bg-white opacity-50" style={{ animationDelay: '0.5s' }}></div>
            <p className="hero-word text-lg md:text-xl font-light tracking-wide max-w-sm" style={{ animationDelay: '0.6s' }}>
              Wild Berry Blast. Scroll para descubrir la fusión.
            </p>
         </div>
      </div>

      {/* Dark Overlay mapped to scroll */}
      <div id="dark-overlay" ref={darkOverlayRef}></div>

      {/* Scroll Sections Container */}
      <div id="scroll-container" ref={scrollContainerRef}>
        
        {/* Section 1: Features */}
        <section className="scroll-section align-right" data-enter="22" data-leave="38" data-animation="clip-reveal">
          <div className="section-inner opacity-100 flex flex-col gap-4 relative">
            <div className="absolute -left-16 top-0 w-[1px] h-32 bg-gradient-to-b from-purple-500 to-transparent hidden md:block"></div>
            <span className="s-elem text-xs font-mono text-purple-400 uppercase tracking-[0.3em]">001 / Fusión</span>
            <h2 className="s-elem text-5xl md:text-7xl font-black italic uppercase leading-none">Sabor<br/>Impactante</h2>
            <p className="s-elem text-lg text-gray-300 font-light max-w-sm mt-4 leading-relaxed">
               Una explosión The Wild Berry Blast que despierta tus sentidos. Experiencia sin compromiso, 100% poder bruto.
            </p>
            <div className="s-elem flex gap-6 mt-8">
              <div className="border-l border-white/20 pl-4 py-1">
                 <div className="text-2xl font-bold">0g</div>
                 <div className="text-xs text-gray-500 uppercase tracking-widest mt-1">Azúcar</div>
              </div>
              <div className="border-l border-white/20 pl-4 py-1">
                 <div className="text-2xl font-bold">8kJ</div>
                 <div className="text-xs text-gray-500 uppercase tracking-widest mt-1">Energía</div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 2: Vitamins */}
        <section className="scroll-section align-left" data-enter="45" data-leave="58" data-animation="fade-up">
           <div className="section-inner">
             <span className="s-elem text-xs font-mono text-cyan-400 uppercase tracking-[0.3em] mb-4 block">002 / Metabolismo Activo</span>
             <h2 className="s-elem text-4xl md:text-6xl font-black italic uppercase">B-Complex<br/><span className="text-stroke">Matrix</span></h2>
             <div className="s-elem mt-8 grid grid-cols-2 gap-4">
                <div className="glass-card p-6 rounded-2xl">
                   <div className="text-3xl font-bold text-white mb-1"><span className="stat-number" data-value="120">0</span>%</div>
                   <div className="text-xs text-cyan-500 uppercase font-bold tracking-wider mb-2">Vitamina B12</div>
                   <div className="text-sm text-gray-400 font-light">Reduce drásticamente la fatiga muscular.</div>
                </div>
                <div className="glass-card p-6 rounded-2xl relative overflow-hidden group">
                   <div className="absolute inset-0 bg-gradient-to-br from-pink-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                   <Zap className="text-pink-500 mb-2 relative z-10" size={28} />
                   <div className="text-sm font-bold text-white mb-2 relative z-10 uppercase tracking-wide">Claridad Focus</div>
                   <div className="text-xs text-gray-400 font-light relative z-10">Ácido pantoténico para el rendimiento mental.</div>
                </div>
             </div>
           </div>
        </section>

        {/* Section 3: Data Table / Transparencia */}
        <section className="scroll-section align-right" data-enter="65" data-leave="80" data-animation="scale-up">
           <div className="section-inner w-full">
            <span className="s-elem text-xs font-mono text-gray-500 uppercase tracking-[0.3em] mb-6 block">003 / Transparencia Radical</span>
            
            <div className="s-elem w-full max-w-2xl bg-black/60 backdrop-blur-3xl border border-white/10 rounded-2xl overflow-hidden shadow-2xl">
              <div className="flex border-b border-white/10 p-4 bg-white/5 uppercase text-[10px] tracking-widest text-gray-400 font-bold">
                <div className="w-1/3">Componente</div>
                <div className="w-1/3">Dosis</div>
                <div className="w-1/3 text-right">Beneficio</div>
              </div>
              
              <div className="group border-b border-white/5 p-4 hover:bg-white/5 transition-colors flex items-center">
                <div className="w-1/3 font-bold text-white text-sm">Cafeína</div>
                <div className="w-1/3 text-purple-400 font-mono text-sm">32 mg/100ml</div>
                <div className="w-1/3 text-right text-gray-400 text-sm">Alerta Inmediata</div>
              </div>

              <div className="group border-b border-white/5 p-4 hover:bg-white/5 transition-colors flex items-center">
                <div className="w-1/3 font-bold text-white text-sm">Taurina</div>
                <div className="w-1/3 text-cyan-400 font-mono text-sm">0.2% Activo</div>
                <div className="w-1/3 text-right text-gray-400 text-sm">Potenciador Físico</div>
              </div>

              <div className="group border-b border-white/5 p-4 hover:bg-white/5 transition-colors flex items-center">
                <div className="w-1/3 font-bold text-white text-sm">Azúcar Añadido</div>
                <div className="w-1/3 text-pink-500 font-mono font-bold text-lg">0g</div>
                <div className="w-1/3 text-right text-gray-400 text-sm">Pico sin picada</div>
              </div>
            </div>
           </div>
        </section>

        {/* Section 4: Store / Offer persists until end */}
        <section className="scroll-section flex flex-col items-center text-center !padding-0 w-full left-0 right-0 max-w-7xl mx-auto px-4" style={{ position: 'absolute' }} data-persist="true" data-enter="88" data-leave="100" data-animation="stagger-up">
          <div className="s-elem mb-10 text-center">
            <h2 className="text-5xl md:text-7xl font-black italic text-white uppercase leading-none mb-4">EL COMBUSTIBLE <br/><span className="text-stroke">DE TU SEMANA</span></h2>
          </div>

          <div className="s-elem grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-4xl mx-auto cursor-auto pointer-events-auto">
            {/* Starter */}
            <div className="border border-white/10 bg-black/50 backdrop-blur-md p-8 rounded-[2rem] hover:border-white/30 transition-all text-left">
              <h3 className="text-sm font-mono tracking-widest text-gray-400 mb-2 uppercase">Starter</h3>
              <div className="text-4xl font-bold mb-6 text-white font-serif">1 Caja <span className="text-sm font-sans text-gray-500 font-normal">/ 12 Volúmenes</span></div>
              <ul className="space-y-4 text-gray-300 mb-10 text-sm font-light">
                <li className="flex items-center gap-3"><Check size={16} className="text-purple-500" /> Testea el Kick Inicial</li>
                <li className="flex items-center gap-3"><Check size={16} className="text-purple-500" /> Energía Táctica (2 sem)</li>
              </ul>
              <button className="w-full border border-white text-white font-bold py-4 rounded-xl hover:bg-white hover:text-black transition-all uppercase tracking-wider text-sm outline-none">
                Adquirir Unidad
              </button>
            </div>

            {/* Pro - Glass Morphism High End */}
            <div className="relative border border-purple-500/50 bg-gradient-to-br from-purple-900/20 to-black backdrop-blur-xl p-8 rounded-[2rem] text-left overflow-hidden group hover:shadow-[0_0_80px_rgba(138,43,226,0.3)] transition-all">
              <div className="absolute top-0 right-0 w-64 h-64 bg-pink-500/20 rounded-full blur-[80px] -z-10 group-hover:bg-pink-500/30 transition-colors"></div>
              
              <div className="absolute top-6 right-6 border border-pink-500/50 text-pink-400 font-mono px-3 py-1 rounded-full text-[10px] uppercase tracking-widest bg-pink-500/10">
                Most Viral
              </div>

              <h3 className="text-sm font-mono tracking-widest text-purple-400 mb-2 uppercase">Pro Pack</h3>
              <div className="text-5xl font-bold mb-6 text-white font-serif italic">3 Cajas</div>
              <div className="text-xs text-gray-400 mb-8 uppercase tracking-widest">36 Latas · Abastecimiento Mensual</div>
              
              <ul className="space-y-4 text-gray-200 mb-10 text-sm">
                <li className="flex items-center gap-3 font-medium"><Zap size={16} className="text-pink-500" fill="currentColor" /> Drop Preferencial de Precio</li>
                <li className="flex items-center gap-3"><Truck size={16} className="text-cyan-400" /> Free Shipping Garantizado</li>
              </ul>
              
              <button className="w-full bg-white text-black font-black py-4 rounded-xl hover:scale-[1.02] transition-transform uppercase tracking-wider text-sm shadow-[0_0_30px_rgba(255,255,255,0.2)]">
                Upgrade Now
              </button>
            </div>
          </div>

          {/* Simple footer appending */}
          <footer className="s-elem w-full mt-24 border-t border-white/10 pt-8 pb-12 flex flex-col md:flex-row justify-between items-center text-xs text-gray-600 font-mono gap-4 pointer-events-auto">
            <div className="flex gap-6">
              <a href="#" className="hover:text-white transition-colors">LEGAL</a>
              <a href="#" className="hover:text-white transition-colors">PRIVACY POLICY</a>
            </div>
            <div>&copy; 2026 XS POWER DRINK GLOBAL.</div>
          </footer>
        </section>

      </div>
      
      {/* Interactive Floating Agent component aligned to 21st UI components vision */}
      <FloatingAgent />

    </>
  );
}