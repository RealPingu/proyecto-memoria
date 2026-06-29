'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import Scene14Resultado1 from '../../../components/scene_14_resultado_1';

export default function Scene15v2Resultado2Page() {
  const router = useRouter();
  const [status, setStatus] = useState<{ type: 'idle' | 'success' | 'error'; message: string }>({
    type: 'idle',
    message: ''
  });

  const handleCopyToClipboard = () => {
    try {
      const svgElement = document.querySelector('svg');
      if (svgElement) {
        navigator.clipboard.writeText(svgElement.outerHTML);
        setStatus({
          type: 'success',
          message: '¡Código SVG estático copiado al portapapeles!'
        });
      } else {
        throw new Error('SVG no encontrado');
      }
      setTimeout(() => setStatus({ type: 'idle', message: '' }), 3000);
    } catch (err) {
      setStatus({
        type: 'error',
        message: 'Error al copiar al portapapeles.'
      });
      setTimeout(() => setStatus({ type: 'idle', message: '' }), 3000);
    }
  };

  return (
    <div className="min-h-screen w-screen bg-[#050508] text-zinc-200 flex flex-col p-4 md:p-8 font-sans overflow-y-auto custom-scrollbar">
      
      {/* Background Decorative Glows */}
      <div className="absolute top-0 left-1/4 w-[400px] h-[400px] bg-red-500/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-indigo-500/5 rounded-full blur-[100px] pointer-events-none" />
 
      <div className="max-w-6xl w-full mx-auto flex-1 flex flex-col relative z-10">
        
        {/* Header */}
        <header className="flex flex-col md:flex-row justify-between items-start md:items-center border-b border-zinc-900 pb-4 mb-6 shrink-0 gap-4">
          <div className="space-y-1">
            <h1 className="text-xs font-mono uppercase tracking-widest text-red-500 font-bold">
              Consecuencias de la Decisión
            </h1>
            <p className="text-xl font-bold tracking-tight text-white flex items-center gap-2">
              Opción 2 — Trampa de Cobros Ocultos
            </p>
            <p className="text-xs text-zinc-500">
              Camo avanzó rápido y aceptó cobros opcionales camuflados.
            </p>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => router.push('/game/playground/scene/scene_15v2')}
              className="px-3 py-1.5 text-xs font-medium bg-zinc-950 border border-zinc-800 hover:border-zinc-700 text-zinc-400 hover:text-white rounded transition"
            >
              ← Volver a Decisión
            </button>
          </div>
        </header>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 flex-1 items-stretch mb-6">
          
          {/* Columna Izquierda: Preview */}
          <div className="lg:col-span-5 flex flex-col gap-4">
            <div className="flex-1 min-h-[250px] bg-zinc-950/80 border border-zinc-900 rounded-lg p-6 flex items-center justify-center relative overflow-hidden backdrop-blur-sm shadow-2xl">
              
              <div className="w-full aspect-video">
                <Scene14Resultado1 />
              </div>

              <div className="absolute top-4 left-4 bg-red-950/50 border border-red-800/80 px-2 py-1 rounded text-[10px] font-mono text-red-400 select-none font-bold">
                ESTADO: COBROS ADICIONALES APLICADOS
              </div>

              <button 
                onClick={handleCopyToClipboard}
                className="absolute bottom-4 right-4 bg-red-650 hover:bg-red-600 text-white text-xs font-bold px-3 py-1.5 rounded flex items-center gap-1.5 shadow-lg active:scale-95 transition"
              >
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1 2-2V6a2 2 0 0 1 2-2h2" />
                  <rect x="8" y="2" width="8" height="4" rx="1" ry="1" />
                </svg>
                Exportar SVG Estático
              </button>
            </div>
            
            <AnimatePresence>
              {status.message && (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="p-3 rounded text-xs font-mono border bg-red-950/20 border-red-500/20 text-red-400"
                >
                  {status.message}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Columna Derecha: Panel Narrativo */}
          <div className="lg:col-span-7 bg-zinc-950/50 border border-zinc-900 rounded-lg p-6 flex flex-col justify-between backdrop-blur-sm shadow-xl">
            
            <div className="space-y-4 flex-1 flex flex-col justify-center">
              <div className="space-y-2">
                <span className="text-[10px] font-mono uppercase tracking-widest text-red-400 font-bold block">
                  Desenlace Narrativo
                </span>
                <div className="p-4 rounded-xl border border-red-500/25 bg-red-950/10 text-red-100 leading-relaxed text-sm">
                  ¡Oh no! Has caído en la trampa del Drip Pricing (Precios por Goteo). Al avanzar rápido sin leer las opciones ocultas en gris, aceptaste un seguro atómico innecesario, una donación ficticia al Polo Norte y la tarifa extra del Patrón Oscuro. Ahora Camo tiene cobros adicionales recurrentes en su cuenta bancaria.
                </div>
              </div>

              <div className="p-4 rounded-xl border border-red-500/30 bg-red-550/10 text-center">
                <p className="text-sm font-bold text-red-400">
                  Has fallado. Debes reintentar y desmarcar todos los cobros ocultos en el checkout.
                </p>
              </div>
            </div>

            {/* Acciones */}
            <div className="border-t border-zinc-900 pt-3 mt-4 flex justify-end gap-3">
              <button
                onClick={() => router.push('/game/playground/scene/scene_15v2')}
                className="px-5 py-2.5 text-xs font-bold rounded-lg bg-red-650 hover:bg-red-600 text-white shadow-lg active:scale-95 transition"
              >
                Reintentar
              </button>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}
