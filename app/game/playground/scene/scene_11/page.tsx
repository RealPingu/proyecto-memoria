'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import Scene11AletaPagar from '../../components/scene_11_aleta_pagar';

// Generar código SVG estático limpio para exportar al portapapeles
function getScene11StaticSvg(): string {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 120" width="100%" height="100%">
  <defs>
    <pattern id="camo-digital" width="20" height="20" patternUnits="userSpaceOnUse">
      <rect width="20" height="20" fill="#3f4e3f" id="rect-bg-dig"/>
      <rect x="0" y="0" width="8" height="6" fill="#2d3a2d" id="rect-dark-dig"/>
      <rect x="10" y="4" width="6" height="8" fill="#546554" id="rect-medium-dig"/>
      <rect x="2" y="10" width="8" height="6" fill="#7ba077" id="rect-light-dig"/>
      <rect x="12" y="12" width="6" height="6" fill="#202a20" id="rect-black-dig"/>
    </pattern>
    <radialGradient id="aleta-bg-grad" cx="50%" cy="50%" r="65%">
      <stop offset="0%" stop-color="#ef4444" stop-opacity="0.25"/>
      <stop offset="60%" stop-color="#1e1b4b" stop-opacity="0.6"/>
      <stop offset="100%" stop-color="#050508" stop-opacity="1"/>
    </radialGradient>
    <linearGradient id="oro-grad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#fef08a" />
      <stop offset="40%" stop-color="#eab308" />
      <stop offset="100%" stop-color="#ca8a04" />
    </linearGradient>
  </defs>
  <rect width="100%" height="100%" fill="url(#aleta-bg-grad)"/>
  <rect x="36" y="48" width="128" height="28" rx="8" fill="#22c55e" stroke="#4ade80" strokeWidth="0.8" />
  <text x="100" y="66" fontFamily="sans-serif" fontSize="8.5" fontWeight="900" fill="#ffffff" textAnchor="middle" letterSpacing="0.8">ALETEA PARA PAGAR !!!</text>
  <g transform="matrix(1, 0, 0, 1, 0, 12)">
    <path id="aleta" d="M 50,-10 C 65,15 82,38 92,54 C 70,58 48,34 32,12 Z" fill="url(#camo-digital)" stroke="#1b2611" strokeWidth="0.8" />
    <path id="aleta-borde-blanco" d="M 50,-10 C 58,5 68,18 74,27" fill="none" stroke="#d8d8d0" strokeWidth="2.5" strokeLinecap="round"/>
  </g>
</svg>`;
}

export default function Scene11PlaygroundPage() {
  const router = useRouter();
  const [status, setStatus] = useState<{ type: 'idle' | 'success' | 'error'; message: string }>({
    type: 'idle',
    message: ''
  });

  const handleCopyToClipboard = () => {
    try {
      const svgCode = getScene11StaticSvg();
      navigator.clipboard.writeText(svgCode);
      setStatus({
        type: 'success',
        message: '¡Código SVG estático de la Escena 11 copiado al portapapeles!'
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
      
      {/* Background Decorative Glows */}
      <div className="absolute top-0 left-1/4 w-[400px] h-[400px] bg-red-500/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-emerald-500/5 rounded-full blur-[100px] pointer-events-none" />
 
      <div className="max-w-6xl w-full mx-auto flex-1 flex flex-col relative z-10">
        
        {/* Header */}
        <header className="flex flex-col md:flex-row justify-between items-start md:items-center border-b border-zinc-900 pb-4 mb-6 shrink-0 gap-4">
          <div className="space-y-1">
            <h1 className="text-xs font-mono uppercase tracking-widest text-emerald-400 font-bold">
              Playground de Animación y Diseño
            </h1>
            <p className="text-xl font-bold tracking-tight text-white flex items-center gap-2">
              Escena 11 — Aleteo de Pago
            </p>
            <p className="text-xs text-zinc-500">
              Primer plano de la aleta de Camo slameando repetidamente el botón de compra.
            </p>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => router.push('/game/playground')}
              className="px-3 py-1.5 text-xs font-medium bg-zinc-950 border border-zinc-800 hover:border-zinc-700 text-zinc-400 hover:text-white rounded transition"
            >
              ← Volver al Menú
            </button>
          </div>
        </header>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 flex-1 items-stretch">
          
          {/* Columna Izquierda: Preview de la Escena (2/3 de ancho en lg) */}
          <div className="lg:col-span-2 flex flex-col gap-6">
            <div className="flex-1 min-h-[300px] lg:min-h-[400px] bg-zinc-950/80 border border-zinc-900 rounded-lg p-6 flex items-center justify-center relative overflow-hidden backdrop-blur-sm shadow-2xl">
              
              {/* Animación SVG renderizada */}
              <div className="w-full max-w-[450px] aspect-video">
                <Scene11AletaPagar />
              </div>

              {/* Indicador de Escena */}
              <div className="absolute top-4 left-4 bg-zinc-900/80 border border-zinc-800/80 px-2 py-1 rounded text-[10px] font-mono text-zinc-500 select-none">
                VISTA PREVIA DE ESCENA 11
              </div>

              {/* Botón de exportación rápida */}
              <button 
                onClick={handleCopyToClipboard}
                className="absolute bottom-4 right-4 bg-emerald-500 hover:bg-emerald-400 text-black text-xs font-bold px-3 py-1.5 rounded flex items-center gap-1.5 shadow-lg active:scale-95 transition"
              >
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
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
                  className="p-3 rounded text-xs font-mono border bg-emerald-950/20 border-emerald-500/20 text-emerald-400"
                >
                  {status.message}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Columna Derecha: Panel explicativo */}
          <div className="bg-zinc-950/40 border border-zinc-900 rounded-lg p-5 flex flex-col gap-6 backdrop-blur-sm shadow-xl overflow-y-auto max-h-[600px] custom-scrollbar">
            <div>
              <h2 className="text-sm font-bold text-white tracking-wide mb-1 uppercase font-mono text-emerald-400">
                Información de Escena 11
              </h2>
              <p className="text-[11px] text-zinc-500">
                Vemos una aleta de pingüino presionando un botón de Pagar repetidamente de forma caricaturesca y frenética.
              </p>
            </div>

            <div className="space-y-3 font-mono text-[10px] text-zinc-400">
              <div className="p-3 rounded border border-zinc-800/80 bg-zinc-950/80 space-y-1">
                <span className="text-emerald-400 font-bold uppercase block text-[9px]">Diálogos de Escena 11:</span>
                <p className="italic">"A este paso la historia de Camo tendrá un trágico final, ayúdame "[nombre del jugador]", yo solo puedo narrar y absorber, pero "TÚ" puedes hacer la diferencia, ayuda a Camo a tomar la decisión correcta, tu "conciencia" frente a los "patrones oscuros" puede #ayudarlo#."</p>
              </div>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
