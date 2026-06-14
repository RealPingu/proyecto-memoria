'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';

// Componente de marcado universal (DEFINIDO FUERA PARA EVITAR PARPADEO)
const Markable = ({ 
  id, 
  children, 
  isMarked, 
  isActive, 
  onToggle, 
  className = "" 
}: { 
  id: string, 
  children: React.ReactNode, 
  isMarked: boolean, 
  isActive: boolean,
  onToggle: (id: string) => void,
  className?: string 
}) => {
  return (
    <div 
      onClick={(e) => {
        e.stopPropagation();
        onToggle(id);
      }}
      className={`relative transition-all duration-150 ${className} 
      ${isActive ? 'cursor-crosshair hover:bg-red-500/5' : 'cursor-default'}
      ${isMarked ? 'ring-2 ring-red-500 z-10 shadow-lg' : ''}`}
    >
      {children}
      <AnimatePresence>
        {isMarked && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-red-500/10 border-2 border-dashed border-red-500 pointer-events-none flex items-center justify-center overflow-hidden"
          >
            <span className="bg-red-500 text-white text-[7px] font-bold px-1 absolute top-0 left-0 uppercase">
              Marcado
            </span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default function TestPrototypePage() {
  const [markedElements, setMarkedElements] = useState<Record<string, boolean>>({});
  const [timeLeft, setTimeId] = useState(30); 
  const [isActive, setIsActive] = useState(true);
  const router = useRouter();

  useEffect(() => {
    if (!isActive || timeLeft <= 0) {
      if (timeLeft <= 0) setIsActive(false);
      return;
    };
    
    const timer = setInterval(() => {
      setTimeId((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft, isActive]);

  const toggleMark = (id: string) => {
    if (!isActive) return;
    setMarkedElements((prev) => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  // Función auxiliar para pasar las props comunes de forma limpia
  const getMarkableProps = (id: string) => ({
    id,
    isMarked: !!markedElements[id],
    isActive,
    onToggle: toggleMark
  });

  return (
    <div className="flex flex-col h-screen w-full bg-game-bg text-game-text overflow-hidden font-sans">
      
      <header className="p-6 border-b border-game-muted/10 grid grid-cols-3 items-center shrink-0">
        <div className="space-y-1">
          <h1 className="text-xl font-bold uppercase italic tracking-tighter text-game-accent">Prueba de Marcado</h1>
          <p className="text-[10px] text-game-muted uppercase tracking-widest">Analiza la interfaz y marca elementos persuasivos</p>
        </div>

        <div className="flex justify-center">
          <div className={`flex flex-col items-center p-3 border ${timeLeft < 10 ? 'border-red-500' : 'border-game-muted/20'} min-w-[100px] bg-game-surface/10`}>
            <span className="text-[8px] uppercase tracking-widest text-game-muted">Tiempo Restante</span>
            <span className={`text-2xl font-mono font-bold transition-colors duration-500 ${timeLeft < 10 ? 'text-red-500' : 'text-game-accent'}`}>
              00:{timeLeft.toString().padStart(2, '0')}
            </span>
          </div>
        </div>

        <div className="flex justify-end italic text-[9px] text-game-muted uppercase tracking-tighter">
          Fase de Evaluación 01
        </div>
      </header>

      <main className="flex-1 flex items-center justify-center p-4 md:p-8 bg-black/20 overflow-hidden">
        <div className="w-full max-w-4xl max-h-full aspect-video bg-white text-black rounded shadow-2xl overflow-hidden flex flex-col scale-90 md:scale-100 transition-transform">
          
          <Markable {...getMarkableProps("nav_bar")} className="bg-zinc-100 p-3 border-b border-zinc-200 flex justify-between items-center shrink-0">
            <div className="font-black text-lg italic">LOGO.SHOP</div>
            <div className="flex space-x-4 text-[10px] font-bold text-zinc-400 uppercase">
              <span>Home</span><span>Shop</span><span>Blog</span>
            </div>
          </Markable>

          <div className="flex-1 flex flex-col min-h-0">
            <Markable {...getMarkableProps("urgency_banner")} className="bg-yellow-400 p-2 text-center shrink-0">
              <p className="text-[9px] font-bold uppercase tracking-widest">
                ¡Solo quedan 3 unidades en stock! Envío gratis por los próximos 10 minutos.
              </p>
            </Markable>

            <div className="flex-1 flex min-h-0 overflow-hidden">
              <Markable {...getMarkableProps("main_image")} className="w-2/5 bg-zinc-200 flex items-center justify-center border-r border-zinc-100">
                <span className="text-zinc-400 text-[10px] uppercase font-black">Imagen de Producto</span>
              </Markable>

              <div className="flex-1 p-6 flex flex-col justify-between">
                <div className="space-y-4">
                  <header className="space-y-1">
                    <Markable {...getMarkableProps("title")}><h3 className="text-xl font-bold">Smartwatch Series V</h3></Markable>
                    <Markable {...getMarkableProps("subtitle")}><p className="text-zinc-400 text-xs italic">El futuro en tu muñeca</p></Markable>
                  </header>

                  <div className="space-y-1 text-left">
                    <Markable {...getMarkableProps("price")}><p className="text-2xl font-black text-zinc-900">$299.00</p></Markable>
                    <Markable {...getMarkableProps("small_print")}>
                      <p className="text-[8px] text-zinc-400 leading-tight">
                        * Sujeto a contrato de permanencia de 24 meses. Cargos por cancelación anticipada aplican.
                      </p>
                    </Markable>
                  </div>
                </div>

                <div className="space-y-3 pt-4">
                  <Markable {...getMarkableProps("cta_button")}>
                    <button className="w-full h-10 bg-zinc-950 text-white font-bold uppercase text-[10px] tracking-widest active:scale-95 transition-all">
                      Añadir al Carrito
                    </button>
                  </Markable>
                  <Markable {...getMarkableProps("social_proof")} className="text-center italic">
                    <p className="text-[9px] text-zinc-500">1.240 personas compraron esto hoy</p>
                  </Markable>
                </div>
              </div>
            </div>
          </div>

          <Markable {...getMarkableProps("footer")} className="bg-zinc-50 p-3 border-t border-zinc-200 text-center shrink-0">
            <p className="text-[8px] text-zinc-400 uppercase tracking-tighter">Política de privacidad | Términos de uso</p>
          </Markable>
        </div>
      </main>

      <footer className="p-6 border-t border-game-muted/10 bg-game-bg flex justify-between items-center shrink-0">
        <div className="flex space-x-6 items-center">
          <div className="text-[10px] text-game-muted uppercase tracking-widest font-mono">
            Marcados: <span className="text-game-accent font-bold">{Object.values(markedElements).filter(Boolean).length}</span>
          </div>
          {!isActive && (
            <span className="text-[10px] text-red-500 font-bold uppercase">¡Tiempo Agotado!</span>
          )}
        </div>
        
        <div className="flex space-x-4">
          <button 
            disabled={!isActive}
            onClick={() => setMarkedElements({})}
            className="text-[10px] uppercase tracking-widest text-game-muted hover:text-game-accent transition-colors disabled:opacity-30"
          >
            Limpiar selección
          </button>
          <button 
            onClick={() => router.push('/survey')}
            className="bg-game-accent text-game-bg px-8 py-3 font-bold uppercase text-[10px] tracking-widest hover:bg-game-text transition-all active:scale-95"
          >
            Finalizar Marcado
          </button>
        </div>
      </footer>
    </div>
  );
}
