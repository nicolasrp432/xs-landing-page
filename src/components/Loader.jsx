import React from 'react';

export const Loader = React.memo(function Loader({ progress }) {
  return (
    <div id="loader">
      <h1 className="brand-heading text-4xl bg-clip-text text-transparent bg-gradient-to-r from-[#5d2b9c] via-[#ff007f] to-[#00f0ff] animate-pulse">
        XS™
      </h1>
      <div id="loader-bar">
        <div id="loader-progress" style={{ width: `${progress}%` }}></div>
      </div>
      <p className="mt-4 text-xs text-white/45 uppercase tracking-[0.28em]">CARGANDO MODO XS... {progress}%</p>
    </div>
  );
});
