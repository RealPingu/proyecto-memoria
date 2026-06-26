'use client';
import { renderToStaticMarkup } from 'react-dom/server';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import Scene16CelularCheckout from '../../components/scene_16_celular_checkout';

export default function Scene16PlaygroundPage() {
  const router = useRouter();
  const [status, setStatus] = useState<{ type: 'idle' | 'success' | 'error'; message: string }>({
    type: 'idle',
    message: ''
  });

  const handleCopyToClipboard = () => {
    try {
      const element = <Scene16CelularCheckout />;
      const html = renderToStaticMarkup(element);
      const match = html.match(/<svg[\s\S]*<\/svg>/);
      const svgCode = match ? match[0] : html;
      navigator.clipboard.writeText(svgCode);
      setStatus({
        type: 'success',
        message: '¡Código SVG estático copiado al portapapeles!'
      });
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
      
      <div className="absolute top-0 left-1/4 w-[400px] h-[400px] bg-blue-500/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-indigo-500/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-6xl w-full mx-auto flex-1 flex flex-col relative z-10">
        
        <header className="flex flex-col md:flex-row justify-between items-start md:items-center border-b border-zinc-900 pb-4 mb-6 shrink-0 gap-4">
          <div className="space-y-1">
            <h1 className="text-xs font-mono uppercase tracking-widest text-blue-400 font-bold">
              Playground de Animación
            </h1>
            <p className="text-xl font-bold tracking-tight text-white">
              Escena 16 — El Proceso de Compra
            </p>
            <p className="text-xs text-zinc-500">
              Zoom al celular de Camo: el seguro oculto se esconde entre los pasos del checkout.
            </p>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => router.push('/game/playground/scene/scene_15')}
              className="px-3 py-1.5 text-xs font-medium bg-zinc-950 border border-zinc-800 hover:border-zinc-700 text-zinc-400 hover:text-white rounded transition"
            >
              ← Escena 15
            </button>
            <button
              onClick={() => router.push('/game/playground')}
              className="px-3 py-1.5 text-xs font-medium bg-zinc-950 border border-zinc-800 hover:border-zinc-700 text-zinc-400 hover:text-white rounded transition"
            >
              Menú
            </button>
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 flex-1 items-start mb-6">

          {/* Ilustración principal — celular grande */}
          <div className="lg:col-span-7">
            <div className="min-h-[320px] bg-zinc-950/80 border border-zinc-900 rounded-lg p-6 flex items-center justify-center relative overflow-hidden backdrop-blur-sm shadow-2xl">
              <div className="w-full aspect-video">
                <Scene16CelularCheckout />
              </div>
              <div className="absolute top-4 left-4 bg-zinc-900/80 border border-zinc-800/80 px-2 py-1 rounded text-[10px] font-mono text-zinc-500 select-none">
                BOCETO VECTORIAL — ESCENA 16
              </div>

              {/* Botón de exportación rápida */}
              <button 
                onClick={handleCopyToClipboard}
                className="absolute bottom-4 right-4 bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-bold px-3 py-1.5 rounded flex items-center gap-1.5 shadow-lg active:scale-95 transition"
              >
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1 2-2V6a2 2 0 0 1 2-2h2" />
                  <rect x="8" y="2" width="8" height="4" rx="1" ry="1" />
                </svg>
                Exportar SVG Estático
              </button>
            </div>
            
            {/* Consola de estado */}
            <AnimatePresence>
              {status.message && (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="p-3 rounded text-xs font-mono border bg-cyan-950/20 border-cyan-500/20 text-cyan-400"
                >
                  {status.message}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Panel de información */}
          <div className="lg:col-span-5 bg-zinc-950/50 border border-zinc-900 rounded-lg p-6 flex flex-col gap-4 backdrop-blur-sm shadow-xl">
            <div>
              <span className="text-[10px] font-mono uppercase tracking-widest text-blue-400 font-bold block mb-1">
                Descripción de la Escena
              </span>
              <h2 className="text-base font-bold text-white tracking-tight">
                El Checkout Trampa
              </h2>
            </div>

            <div className="space-y-3 text-xs text-zinc-400 leading-relaxed">
              <p>
                El proceso de compra luce normal a primera vista: términos y condiciones, pasos numerados, un botón de "Siguiente" prominente. Pero en la sección de <span className="text-blue-300 font-bold">Servicios Adicionales</span>, escondido entre texto pequeño, hay un checkbox pre-marcado.
              </p>
              <p>
                <span className="text-blue-300 font-bold">Seguro Anti-Bombardeo Atómico — +19.99€/mes.</span> La aleta de Camo lo pasa sin detenerse.
              </p>
              <p>
                El Patrón Oscuro apostó a que el esfuerzo ya invertido en el proceso haría que Camo aceptara sin leer. Ese es el <span className="text-blue-300 font-bold">Drip Pricing</span>.
              </p>
            </div>

            <div className="mt-auto pt-4 border-t border-zinc-900">
              <motion.button
                onClick={() => router.push('/game/playground/scene/scene_17')}
                className="w-full px-4 py-2.5 text-xs font-bold rounded-lg bg-blue-700 hover:bg-blue-600 text-white shadow-lg active:scale-95 transition"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Ver Escena 17 → La Batalla
              </motion.button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
