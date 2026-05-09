import React from 'react';

export const Footer = React.memo(function Footer({ setModalContent }) {
  return (
    <footer className="s-elem w-full mt-24 border-t border-white/10 pt-8 pb-32 md:pb-12 flex flex-col md:flex-row justify-between items-center text-xs text-white/40 brand-body gap-4 pointer-events-auto">
      <div className="flex gap-6">
        <button onClick={() => setModalContent('legal')} className="hover:text-white transition-colors uppercase outline-none tracking-[0.22em]">LEGAL</button>
        <button onClick={() => setModalContent('privacy')} className="hover:text-white transition-colors uppercase outline-none tracking-[0.22em]">PRIVACY POLICY</button>
      </div>
      <div className="tracking-[0.22em] uppercase">&copy; {new Date().getFullYear()} XS POWER DRINK GLOBAL.</div>
    </footer>
  );
});
