import React from 'react';

export const Modals = React.memo(function Modals({ modalContent, setModalContent }) {
  if (!modalContent) return null;

  return (
    <div className="fixed inset-0 z-[200] bg-black/80 backdrop-blur-sm flex justify-center items-center p-4">
      <div className="premium-card bg-[#111] border border-white/10 p-8 rounded-[20px] max-w-xl w-full text-white/70 relative shadow-2xl">
        <button onClick={() => setModalContent(null)} className="absolute top-4 right-4 text-white hover:text-[#ff007f] transition-colors text-xl font-bold">
          ✕
        </button>
        {modalContent === 'legal' && (
          <>
            <h3 className="brand-heading text-2xl text-white mb-4">Aviso Legal</h3>
            <p className="text-sm font-medium leading-relaxed mb-4">Esta página es una demostración de interfaz interactiva de alto rendimiento ("Antigravity Design"). Las declaraciones de propiedades saludables aquí presentadas son ejemplos basados en normativas aplicables a vitaminas, pero no constituyen consejo médico ni comercial real.</p>
            <p className="text-sm font-medium leading-relaxed">Proyecto simulado para fines de diseño y desarrollo frontend. Contacto: support@xspower.dev</p>
          </>
        )}
        {modalContent === 'privacy' && (
          <>
            <h3 className="brand-heading text-2xl text-white mb-4">Política de Privacidad</h3>
            <p className="text-sm font-medium leading-relaxed mb-4">No recolectamos, almacenamos ni compartimos datos personales. Todo el entorno es seguro, local o simulado para pruebas de desarrollo. Las únicas cookies o almacenamientos locales se emplean estrictamente para el correcto funcionamiento interactivo.</p>
          </>
        )}
      </div>
    </div>
  );
});
