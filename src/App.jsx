import React, { useState, useRef, useLayoutEffect, useCallback } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';
import FloatingAgent from './FloatingAgent';
import { useABTest } from './hooks/useABTest';

import { CONTENT } from './data/content';
import { Navigation } from './components/Navigation';
import { HeroSection } from './components/HeroSection';
import { StickyCTA } from './components/StickyCTA';
import { FeaturesSection } from './components/FeaturesSection';
import { VitaminsSection } from './components/VitaminsSection';
import { ComparisonSection } from './components/ComparisonSection';
import { FAQSection } from './components/FAQSection';
import { FlavorsSection } from './components/FlavorsSection';
import { PricingSection } from './components/PricingSection';
import { Modals } from './components/Modals';
import { Check } from './components/Icons';

gsap.registerPlugin(ScrollTrigger);

export default function App() {
  const [framesReady, setFramesReady] = useState(false);
  const [modalContent, setModalContent] = useState(null);
  const pricingVariant = useABTest('pricing_cta_text');
  
  const canvasRef = useRef(null);
  const scrollContainerRef = useRef(null);
  const heroRef = useRef(null);
  const darkOverlayRef = useRef(null);

  const FRAME_COUNT = 152; 
  const IMAGE_SCALE = 1.0;
  const FRAME_SPEED = 1.35;

  const framesRef = useRef([]);
  const lenisRef = useRef(null);

  useLayoutEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });
    lenisRef.current = lenis;

    lenis.on('scroll', ScrollTrigger.update);
    const update = (time) => lenis.raf(time * 1000);
    gsap.ticker.add(update);
    gsap.ticker.lagSmoothing(0);

    return () => {
      lenis.destroy();
      gsap.ticker.remove(update);
    };
  }, []);

  useLayoutEffect(() => {
    let imagesLoaded = 0;
    const frames = [];
    
    const drawFrame = (index) => {
      const img = framesRef.current[index];
      const canvas = canvasRef.current;
      if (!img || !canvas || !img.complete || img.naturalWidth === 0) return;
      const ctx = canvas.getContext('2d');
      const cw = canvas.width;
      const ch = canvas.height;
      const iw = img.naturalWidth;
      const ih = img.naturalHeight;
      const scale = Math.max(cw / iw, ch / ih) * IMAGE_SCALE;
      const dw = iw * scale;
      const dh = ih * scale;
      const dx = (cw - dw) / 2;
      const dy = (ch - dh) / 2;
      
      // Clear canvas instead of painting it black to avoid the 'otro background' issue
      ctx.clearRect(0, 0, cw, ch);
      ctx.drawImage(img, dx, dy, dw, dh);
    };

    for (let i = 1; i <= FRAME_COUNT; i++) {
      const img = new Image();
      const paddedIndex = i.toString().padStart(4, '0');
      img.src = `/frames/frame_${paddedIndex}.webp?v=3`;
      img.onload = () => {
        imagesLoaded++;
        // Draw first frame as soon as it's ready for immediate visual
        if (imagesLoaded === 1) drawFrame(0);
        if (imagesLoaded === FRAME_COUNT) setFramesReady(true);
      };
      img.onerror = () => {
        imagesLoaded++;
        if (imagesLoaded === FRAME_COUNT) setFramesReady(true);
      };
      frames.push(img);
    }
    framesRef.current = frames;

    let currentFrameIdx = 0;
    const getCurrentStoredFrame = () => currentFrameIdx;

    const resizeCanvas = () => {
      const canvas = canvasRef.current;
      if (canvas) {
        const dpr = window.devicePixelRatio || 1;
        canvas.width = window.innerWidth * dpr;
        canvas.height = window.innerHeight * dpr;
        drawFrame(Math.max(0, getCurrentStoredFrame()));
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
          const accelerated = Math.min(self.progress * 1.1, 1); // Spreads video across 90% of scroll
          const index = Math.min(Math.floor(accelerated * FRAME_COUNT), FRAME_COUNT - 1);
          
          // Debug output
          const dbgFrame = document.getElementById('debug-frame');
          const dbgProg = document.getElementById('debug-progress');
          if (dbgFrame) dbgFrame.textContent = index;
          if (dbgProg) dbgProg.textContent = self.progress.toFixed(3);

          if (index !== currentFrameIdx) {
            currentFrameIdx = index;
            requestAnimationFrame(() => drawFrame(currentFrameIdx));
          }
        }
      });

      ScrollTrigger.create({
        trigger: scrollContainerRef.current,
        start: 'top top',
        end: '10% top',
        scrub: true,
        onUpdate: (self) => {
          const p = self.progress;
          const opacity = Math.max(0, 1 - (p / 0.1));
          if (heroRef.current) {
            heroRef.current.style.opacity = opacity;
            heroRef.current.style.transform = `translateY(${p * 140}px)`;
            heroRef.current.style.pointerEvents = opacity > 0 ? 'auto' : 'none';
          }
        }
      });

      ScrollTrigger.create({
        trigger: scrollContainerRef.current,
        start: 'top top',
        end: 'bottom bottom',
        scrub: true,
        onUpdate: (self) => {
          const p = self.progress;
          let opacity = 0;
          if (p >= 0.18 && p <= 0.22) opacity = (p - 0.18) / 0.04 * 0.4;
          else if (p > 0.22 && p < 0.78) opacity = 0.4;
          else if (p >= 0.78 && p <= 0.82) opacity = 0.4 * (1 - (p - 0.78) / 0.04);
          if (darkOverlayRef.current) darkOverlayRef.current.style.opacity = opacity;
        }
      });
    });

    return () => {
      canvasCtx.revert();
      window.removeEventListener('resize', resizeCanvas);
    };
  }, []);

  useLayoutEffect(() => {
    if (!framesReady) return;
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

        const WINDOW = 0.05;
        ScrollTrigger.create({
          trigger: scrollContainerRef.current,
          start: 'top top',
          end: 'bottom bottom',
          scrub: true,
          onUpdate: (self) => {
            const p = self.progress;
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
  }, [framesReady]);

  const trackEvent = useCallback((eventName, data = {}) => {
    // Merge global context (like A/B variants) into tracking data
    const trackingData = {
      ...data,
      ab_variants: { pricing_cta_text: pricingVariant }
    };
    console.log(`[TRACKING EVENT] ${eventName}`, trackingData);
  }, [pricingVariant]);

  const handleCTA = useCallback((action, source, planId = null) => {
    trackEvent('track_cta', { action, source, planId });
    if (action === 'scroll') {
      document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' });
    } else if (action === 'checkout') {
      console.log(`Iniciando checkout para: ${planId} desde ${source}`);
      fetch('/api/create-checkout-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ planId }),
      })
      .then(res => res.json())
      .then(data => {
        if (data.url) {
          window.location.href = data.url;
        } else {
          console.error('Error creating checkout session:', data.error);
          alert('Hubo un error al iniciar el checkout. Por favor intenta de nuevo.');
        }
      })
      .catch(err => {
        console.error('Fetch error:', err);
        alert('Error de conexión. Inténtalo más tarde.');
      });
    }
  }, [trackEvent]);

  const path = window.location.pathname;
  if (path === '/success') {
    const params = new URLSearchParams(window.location.search);
    const plan = params.get('plan') || 'tu pack';
    trackEvent('track_purchase_success', { plan });

    return (
      <div className="min-h-screen bg-[#0a0a0c] text-white flex flex-col items-center justify-center p-4 text-center premium-shell">
        <Check size={64} className="text-[#39ff14] mb-6" />
        <h1 className="brand-heading text-[clamp(3rem,6vw,5rem)] mb-4">¡Pago Completado!</h1>
        <p className="text-white/65 mb-8 max-w-md brand-body">Tu pedido de XS ({plan}) ha sido procesado con éxito. Preparando el envío.</p>
        <button onClick={() => window.location.href = '/'} className="primary-button font-bold py-3 px-8 rounded-[10px] uppercase tracking-[0.28em] text-sm">Volver al inicio</button>
      </div>
    );
  }

  if (path === '/cancel') {
    return (
      <div className="min-h-screen bg-[#0a0a0c] text-white flex flex-col items-center justify-center p-4 text-center premium-shell">
        <div className="w-16 h-16 border-4 border-[#ff3333] rounded-full flex items-center justify-center mb-6 text-[#ff3333] text-3xl font-bold">!</div>
        <h1 className="brand-heading text-[clamp(3rem,6vw,5rem)] mb-4">Pago Cancelado</h1>
        <p className="text-white/65 mb-8 max-w-md brand-body">Has cancelado el proceso de pago. No se ha realizado ningún cargo.</p>
        <button onClick={() => window.location.href = '/'} className="secondary-button font-bold py-3 px-8 rounded-[10px] uppercase tracking-[0.28em] text-sm">Intentar de nuevo</button>
      </div>
    );
  }

  return (
    <>
      <Navigation onCTA={handleCTA} />

      <div className="canvas-wrap">
        <canvas ref={canvasRef} id="canvas"></canvas>
      </div>

      <HeroSection ref={heroRef} content={CONTENT.hero} />
      <StickyCTA onCTA={handleCTA} />

      <div id="dark-overlay" ref={darkOverlayRef}></div>

      <div id="scroll-container" ref={scrollContainerRef}>
        <FeaturesSection content={CONTENT.features} />
        <VitaminsSection content={CONTENT.vitamins} />
        <ComparisonSection content={CONTENT.comparison} />
        <FAQSection content={CONTENT.faq} />
        <PricingSection content={CONTENT.pricing} onCTA={handleCTA} setModalContent={setModalContent} variant={pricingVariant} />
        <FlavorsSection content={CONTENT.flavors} />
      </div>
      
      <Modals modalContent={modalContent} setModalContent={setModalContent} />
      <FloatingAgent />
    </>
  );
}
