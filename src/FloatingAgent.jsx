import React, { useState } from 'react';
import { Clock } from './components/Icons';

export default function FloatingAgent() {
  const [isOpen, setIsOpen] = useState(false);
  const [inputVal, setInputVal] = useState('');
  const [messages, setMessages] = useState([
    { id: '1', role: 'assistant', content: '¿Dudas sobre XS o sus beneficios? Pregúntame lo que necesites.' }
  ]);

  if (typeof document === 'undefined') return null;

  const handleSend = (e) => {
    e.preventDefault();
    if (!inputVal.trim()) return;

    setMessages([...messages, { id: Date.now().toString(), role: 'user', content: inputVal }]);
    setInputVal('');

    setTimeout(() => {
      setMessages(prev => [
        ...prev,
        { id: (Date.now() + 1).toString(), role: 'assistant', content: '¡Claro! XS contiene cafeína natural, sin azúcar y con el doble de vitaminas del grupo B para darte energía limpia sin el temido bajón. ¿Te gustaría saber sobre algún sabor en particular?' }
      ]);
    }, 1000);
  };

  return (
    <>
      <div 
        className={`fixed bottom-6 left-6 z-[95] pointer-events-auto transition-all ${isOpen ? 'opacity-0 pointer-events-none translate-y-4' : 'opacity-100 translate-y-0'}`}
      >
        <button
          onClick={() => setIsOpen(true)}
          className="w-[60px] h-[60px] primary-button p-[2px] rounded-full shadow-[0_10px_40px_rgba(255,0,127,0.3)] hover:shadow-[0_10px_60px_rgba(255,0,127,0.5)] transition-all group overflow-hidden outline-none"
        >
          <div className="bg-[#16161a]/88 w-full h-full backdrop-blur-xl rounded-full flex items-center justify-center group-hover:bg-[#16161a]/72 transition-all border border-white/5">
            <div className="bg-white text-black rounded-full p-2 group-hover:rotate-12 group-hover:scale-110 transition-transform shadow-[0_0_20px_rgba(255,255,255,0.5)]">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m3 21 1.9-5.7a8.5 8.5 0 1 1 3.8 3.8z" /></svg>
            </div>
          </div>
        </button>
      </div>

      {isOpen && (
        <div className="fixed bottom-24 left-6 right-6 sm:right-auto sm:w-[350px] h-[500px] max-h-[60vh] premium-card bg-[#16161a]/95 backdrop-blur-xl border border-white/10 rounded-[20px] flex flex-col shadow-[0_10px_50px_rgba(255,0,127,0.25)] z-[95] overflow-hidden transform transition-all">
          <div className="p-4 border-b border-white/10 flex items-center justify-between bg-white/[0.02]">
            <div className="flex items-center gap-2">
               <div className="w-2 h-2 bg-[#ff007f] rounded-full animate-pulse"></div>
               <span className="brand-heading font-bold text-sm tracking-[0.28em] uppercase bg-clip-text text-transparent bg-gradient-to-r from-[#5d2b9c] via-[#ff007f] to-[#00f0ff]">XS Intelligence</span>
            </div>
            <button onClick={() => setIsOpen(false)} className="text-gray-400 hover:text-white transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-4">
            {messages.map((m) => (
              <div key={m.id} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[85%] p-3 rounded-2xl text-sm ${m.role === 'user' ? 'bg-[#ff007f]/35 text-white rounded-br-none border border-[#ff007f]/30' : 'bg-white/5 text-white/76 rounded-bl-none border border-white/10'}`}>
                  {m.content}
                </div>
              </div>
            ))}
          </div>

          <form onSubmit={handleSend} className="p-4 border-t border-white/10 bg-white/[0.02] flex gap-2">
            <input
              type="text"
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              placeholder="Haz tu consulta..."
              className="flex-1 bg-black/50 border border-white/10 rounded-lg px-4 py-2 text-sm text-white focus:outline-none focus:border-[#ff007f] transition-colors placeholder:text-white/28"
            />
            <button type="submit" className="bg-white/10 hover:bg-white/20 text-white p-2 rounded-lg transition-colors border border-white/5">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>
            </button>
          </form>
        </div>
      )}
    </>
  );
}
