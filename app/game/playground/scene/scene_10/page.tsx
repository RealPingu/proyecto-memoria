'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import Scene10CelularGrande from '../../components/scene_10_celular_grande';

// Generar código SVG estático limpio para exportar al portapapeles
function getScene10StaticSvg(): string {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 600" width="100%" height="100%">
  <defs>
    <pattern id="camo-digital" width="20" height="20" patternUnits="userSpaceOnUse">
      <rect width="20" height="20" fill="#3f4e3f" id="rect-bg-dig"/>
      <rect x="0" y="0" width="8" height="6" fill="#2d3a2d" id="rect-dark-dig"/>
      <rect x="10" y="4" width="6" height="8" fill="#546554" id="rect-medium-dig"/>
      <rect x="2" y="10" width="8" height="6" fill="#7ba077" id="rect-light-dig"/>
      <rect x="12" y="12" width="6" height="6" fill="#202a20" id="rect-black-dig"/>
    </pattern>
    <linearGradient id="brillo-pantalla" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0" stop-color="#38bdf8" stop-opacity="0.4"/>
      <stop offset="0.5" stop-color="#bae6fd" stop-opacity="0.1"/>
      <stop offset="1" stop-color="#22c55e" stop-opacity="0.15"/>
    </linearGradient>
    <linearGradient id="oro-grad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#fef08a" />
      <stop offset="40%" stop-color="#eab308" />
      <stop offset="100%" stop-color="#ca8a04" />
    </linearGradient>
  </defs>
  <rect width="100%" height="100%" fill="#090d16"/>
  <g id="dispositivo-completo">
    <g id="dispositivo">
      <rect x="80" y="20" width="340" height="560" rx="40" fill="#0f172a"/>
      <rect x="92" y="32" width="316" height="536" rx="30" fill="#ffffff"/>
      <rect x="185" y="42" width="130" height="20" rx="10" fill="#0f172a"/>
      <rect x="92" y="32" width="316" height="536" rx="30" fill="url(#brillo-pantalla)" opacity="0.65"/>
    </g>
    <g id="productos-grid" transform="translate(110, 90)">
      <text x="0" y="0" font-family="sans-serif" font-size="13" font-weight="900" fill="#64748b" letter-spacing="1.5">RECOMENDADOS</text>
      <g id="producto-1" transform="translate(0, 20)">
        <rect width="135" height="135" rx="16" fill="#f8fafc" stroke="#e2e8f0" stroke-width="1"/>
        <circle cx="67" cy="55" r="25" fill="#dcfce7"/>
        <path d="M 52,58 C 52,43 82,43 82,58 Z" fill="#3f4e3f" stroke="#1b2611" stroke-width="0.75" />
        <path d="M 55,58 L 67,65 L 79,58" stroke="#1c1917" stroke-width="1.2" fill="none" />
        <rect x="15" y="95" width="105" height="8" rx="2" fill="#cbd5e1"/>
        <text x="15" y="120" font-family="sans-serif" font-size="12" font-weight="bold" fill="#0f172a">$19.99</text>
      </g>
      <g id="producto-2" transform="translate(145, 20)">
        <rect width="135" height="135" rx="16" fill="#f8fafc" stroke="#e2e8f0" stroke-width="1"/>
        <circle cx="67" cy="55" r="25" fill="#fef9c3"/>
        <path d="M 49,58 C 49,42 85,42 85,58 Z" fill="#eab308" />
        <path d="M 52,50 C 60,46 74,46 82,50 M 57,58 L 57,50 M 67,58 L 67,46 M 77,58 L 77,50" stroke="#ca8a04" stroke-width="0.8" fill="none" />
        <path d="M 62,58 L 62,52 C 62,50 72,50 72,52 L 72,58 Z" fill="#78350f" />
        <rect x="15" y="95" width="105" height="8" rx="2" fill="#cbd5e1"/>
        <text x="15" y="120" font-family="sans-serif" font-size="12" font-weight="bold" fill="#0f172a">$299.99</text>
      </g>
      <g id="producto-3" transform="translate(0, 175)">
        <rect width="135" height="135" rx="16" fill="#f8fafc" stroke="#e2e8f0" stroke-width="1"/>
        <circle cx="67" cy="55" r="25" fill="#e0f2fe"/>
        <path d="M 48,55 C 57,49 70,49 76,55 C 70,61 57,61 48,55 Z" fill="#0284c7" />
        <polygon points="76,55 85,50 83,55 85,60" fill="#0284c7" />
        <circle cx="53" cy="54" r="1.2" fill="#ffffff" />
        <rect x="15" y="95" width="105" height="8" rx="2" fill="#cbd5e1"/>
        <text x="15" y="120" font-family="sans-serif" font-size="12" font-weight="bold" fill="#0f172a">$4.99</text>
      </g>
      <g id="producto-4" transform="translate(145, 175)">
        <rect width="135" height="135" rx="16" fill="#f8fafc" stroke="#22c55e" stroke-width="2.5" />
        <circle cx="67" cy="55" r="25" fill="#f3e8ff"/>
        <path d="M 46,55 H 88" stroke="#1e293b" stroke-width="2.5" />
        <rect x="52" y="49" width="30" height="12" rx="3.5" fill="#22c55e" stroke="#16a34a" stroke-width="1.2" />
        <line x1="56" y1="52" x2="61" y2="57" stroke="#ffffff" stroke-width="1.2" />
        <rect x="15" y="95" width="105" height="8" rx="2" fill="#cbd5e1"/>
        <g transform="translate(112, 10)">
          <circle r="9.5" fill="#22c55e"/>
          <path d="M -4.5,0 L -1.5,3 L 4.5,-3" fill="none" stroke="#ffffff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </g>
        <text x="15" y="120" font-family="sans-serif" font-size="12" font-weight="bold" fill="#22c55e">$49.99</text>
      </g>
    </g>
    <g id="checkout-footer" transform="translate(92, 420)">
      <rect width="316" height="128" fill="#ffffff"/>
      <line x1="20" y1="0" x2="296" y2="0" stroke="#f1f5f9" stroke-width="2"/>
      <text x="24" y="27" font-family="sans-serif" font-size="12" font-weight="bold" fill="#64748b">TOTAL PINGÜICARRO</text>
      <text x="292" y="30" font-family="sans-serif" font-size="22" font-weight="900" fill="#0f172a" text-anchor="end">$49.99</text>
      <g id="boton-simple-aletea" transform="translate(20, 50)">
        <rect width="272" height="50" rx="12" fill="#22c55e"/>
        <text x="136" y="31" font-family="sans-serif" font-size="15" font-weight="900" fill="#ffffff" text-anchor="middle" letter-spacing="1.2">ALETEA PARA PAGAR</text>
      </g>
    </g>
  </g>
  <g id="camo-peaking" transform="translate(-10, 430)">
    <ellipse id="cuerpo" cx="30" cy="120" rx="55" ry="65" fill="url(#camo-digital)" stroke="#4f5d4e" stroke-width="0.8" transform="rotate(-15, 30, 120)" />
    <ellipse id="vientre" cx="48" cy="120" rx="34" ry="48" fill="#d8d8d0" stroke="#1e293b" stroke-width="1" transform="rotate(-15, 48, 120)" />
    <circle id="cabeza" cx="62" cy="55" r="34" fill="url(#camo-digital)" stroke="#4f5d4e" stroke-width="0.8" />
    <g id="ojo-grupo">
      <circle id="ojo" cx="74" cy="48" r="9" fill="#ffffff" stroke="#0f172a" stroke-width="1.2" />
      <circle id="pupila" cx="76" cy="48" r="5" fill="#000000" />
      <circle id="ojo-brillo" cx="73.5" cy="44.5" r="2" fill="#ffffff" />
      <circle id="ojo-reflejo" cx="78" cy="51" r="2.8" fill="#22c55e" opacity="0.55" />
    </g>
    <path id="ceja" d="M 60,33 Q 74,35 80,41" stroke="#1c1917" stroke-width="2.2" fill="none" stroke-linecap="round" />
    <polygon id="pico" points="91,48 114,53 93,62" fill="#f59e0b" stroke="#d97706" stroke-width="0.8" />
    <path id="aleta" d="M 55,90 C 82,90 108,80 118,68" stroke-width="6.5" stroke-linecap="round" stroke="#1c1917" fill="none" />
  </g>
</svg>`;
}

export default function Scene10PlaygroundPage() {
  const router = useRouter();
  const [status, setStatus] = useState<{ type: 'idle' | 'success' | 'error'; message: string }>({
    type: 'idle',
    message: ''
  });

  const handleCopyToClipboard = () => {
    try {
      const svgCode = getScene10StaticSvg();
      navigator.clipboard.writeText(svgCode);
      setStatus({
        type: 'success',
        message: '¡Código SVG estático de la Escena 10 copiado al portapapeles!'
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
      <div className="absolute top-0 left-1/4 w-[400px] h-[400px] bg-emerald-500/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-indigo-500/5 rounded-full blur-[100px] pointer-events-none" />
 
      <div className="max-w-6xl w-full mx-auto flex-1 flex flex-col relative z-10">
        
        {/* Header */}
        <header className="flex flex-col md:flex-row justify-between items-start md:items-center border-b border-zinc-900 pb-4 mb-6 shrink-0 gap-4">
          <div className="space-y-1">
            <h1 className="text-xs font-mono uppercase tracking-widest text-emerald-400 font-bold">
              Playground de Animación y Diseño
            </h1>
            <p className="text-xl font-bold tracking-tight text-white flex items-center gap-2">
              Escena 10 — Interfaz Ampliada
            </p>
            <p className="text-xs text-zinc-500">
              Camo el pingüino y el catálogo detallado del celular en tamaño completo.
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
              <div className="w-full max-w-[340px] aspect-[5/6] max-h-[500px]">
                <Scene10CelularGrande />
              </div>

              {/* Indicador de Escena */}
              <div className="absolute top-4 left-4 bg-zinc-900/80 border border-zinc-800/80 px-2 py-1 rounded text-[10px] font-mono text-zinc-500 select-none">
                VISTA PREVIA DE ESCENA 10
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
                Información de Escena 10
              </h2>
              <p className="text-[11px] text-zinc-500">
                Esta escena enfoca la interfaz del celular en grande para ver detalladamente cómo Camo navega por el catálogo e-commerce y es tentado a aletear para pagar por sus compras.
              </p>
            </div>

            <div className="space-y-3 font-mono text-[10px] text-zinc-400">
              <div className="p-3 rounded border border-zinc-800/80 bg-zinc-950/80 space-y-1">
                <span className="text-emerald-400 font-bold uppercase block text-[9px]">Diálogos de Escena 10:</span>
                <p className="italic">"Uno de sus mayores pasatiempos era recorrer y revisar páginas "comerciales" de productos en su celular, pero como "Camo" ya no se encontraba en el campo de batalla, este perdía su rigurosidad y al no sentirse amenazado por enemigos, este se dejaba llevar..."</p>
              </div>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
