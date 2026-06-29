'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import Scene8DarkPattern from '../../components/scene_8_dark_pattern';

// Generar código SVG estático limpio para exportar al portapapeles
function getScene8StaticSvg(): string {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 350" width="100%" height="100%">
  <defs>
    <pattern id="camo-digital" width="20" height="20" patternUnits="userSpaceOnUse">
      <rect width="20" height="20" fill="#3f4e3f" id="rect-bg-dig"/>
      <rect x="0" y="0" width="8" height="6" fill="#2d3a2d" id="rect-dark-dig"/>
      <rect x="10" y="4" width="6" height="8" fill="#546554" id="rect-medium-dig"/>
      <rect x="2" y="10" width="8" height="6" fill="#7ba077" id="rect-light-dig"/>
      <rect x="12" y="12" width="6" height="6" fill="#202a20" id="rect-black-dig"/>
    </pattern>
    <linearGradient id="brillo-celular" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0" stop-color="#38bdf8" stop-opacity="0.6"/>
      <stop offset="1" stop-color="#bae6fd" stop-opacity="0.1"/>
    </linearGradient>
    <pattern id="teselacion" width="40" height="40" patternUnits="userSpaceOnUse">
      <polygon points="0,0 20,10 20,30 0,20" fill="#111827" stroke="#020408" stroke-width="0.5"/>
      <polygon points="20,10 40,0 40,20 20,30" fill="#1f2937" stroke="#020408" stroke-width="0.5"/>
      <polygon points="0,20 20,30 20,40 0,40" fill="#0f172a" stroke="#020408" stroke-width="0.5"/>
      <polygon points="20,30 40,20 40,40 20,40" fill="#1e1b4b" stroke="#020408" stroke-width="0.5"/>
    </pattern>
    <radialGradient id="colored-bg-grad" cx="50%" cy="50%" r="65%">
      <stop offset="0%" stop-color="#14532d" stop-opacity="0.35"/>
      <stop offset="60%" stop-color="#052e16" stop-opacity="0.1"/>
      <stop offset="100%" stop-color="#000000" stop-opacity="1"/>
    </radialGradient>
    <radialGradient id="diamond-glow-grad" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="#22d3ee" stop-opacity="0.8"/>
      <stop offset="50%" stop-color="#06b6d4" stop-opacity="0.3"/>
      <stop offset="100%" stop-color="#0891b2" stop-opacity="0"/>
    </radialGradient>
  </defs>
  <rect width="100%" height="100%" fill="url(#colored-bg-grad)" />
  <g transform="matrix(0.416908, 0, -0.265896, 0.415816, 393.614086, -17.966342)">
    <circle cx="200" cy="180" r="80" fill="url(#diamond-glow-grad)" opacity="0.6"/>
    <polygon points="130,360 100,120 300,120 270,360" fill="url(#teselacion)" stroke="#06b6d4" stroke-width="1.5"/>
    <g transform="matrix(1, 0, 0, 1, -54.158613, 5.563326)">
      <polygon points="200,160 225,180 200,200 175,180" fill="#22d3ee"/>
      <line x1="188.179" y1="174.081" x2="200.433" y2="193.748" stroke="#020408" stroke-width="3" />
    </g>
  </g>
  <g id="sillon-contenedor" transform="matrix(1, 0, 0, 1, 0, 2.133994)">
    <rect x="60" y="80" width="380" height="130" rx="15" fill="#78350f" stroke="#451a03" stroke-width="2"/>
    <rect x="50" y="180" width="400" height="70" rx="12" fill="#92400e" stroke="#451a03" stroke-width="2"/>
    <line x1="250" y1="180" x2="250" y2="250" stroke="#451a03" stroke-width="1.5"/>
    <rect x="20" y="150" width="60" height="100" rx="20" fill="#b45309" stroke="#451a03" stroke-width="2"/>
    <rect x="420" y="150" width="60" height="100" rx="20" fill="#b45309" stroke="#451a03" stroke-width="2"/>
    <rect x="40" y="250" width="25" height="15" fill="#1c1917"/>
    <rect x="435" y="250" width="25" height="15" fill="#1c1917"/>
  </g>
  <g id="celular-táctico" transform="matrix(0.77943, 0, 0, 0.862829, 3.264157, -17.062647)">
    <polygon points="160,150 162,175 120,165 122,158" fill="url(#brillo-celular)"/>
    <rect x="158" y="148" width="8" height="26" rx="1.5" fill="#18181b" stroke="#27272a" stroke-width="0.5" transform="rotate(-15, 160, 160)"/>
    <rect x="159" y="150" width="4" height="22" rx="0.5" fill="#38bdf8" transform="rotate(-15, 160, 160)"/>
  </g>
  <g id="camo-flojo" transform="translate(10, -10)">
    <path id="camo-pata-superior" d="M 130.444 194.395 L 150.444 184.395 L 148.444 199.395 L 130.444 194.395 Z" fill="#f59e0b" stroke="#d97706" stroke-width="0.5"/>
    <ellipse id="camo-cuerpo" cx="118.065" cy="174.941" rx="32.959" ry="20.195" fill="url(#camo-digital)" stroke="#7ba077" stroke-width="0.5" transform="matrix(0.964779, 0.26306, 0, 1.036506, -8.433431, -36.30004)"/>
    <ellipse id="camo-vientre" cx="106.907" cy="174.248" rx="22.886" ry="13.458" fill="#d8d8d0" stroke="#000000" stroke-width="0.8" transform="matrix(0.961297, 0.275515, 0, 1.040261, 5.282357, -40.190219)"/>
    <circle id="camo-cabeza" cx="115" cy="165" r="18" fill="url(#camo-digital)" stroke="#7ba077" stroke-width="0.5" transform="matrix(1.297488, 0, 0, 1.424591, -78.935854, -98.101832)"/>
    <polygon id="camo-pico" points="84.066 141.103 93.12 145.741 82.255 148.832" fill="#f59e0b" stroke="#d97706" stroke-width="0.5"/>
    <g id="camo-patas-contenedor" transform="matrix(1, 0, 0, 1, -71.257288, -14.881023)">
      <path id="camo-pata-inferior" d="M 195 210 L 215 212 L 208 222 Z" fill="#f59e0b" stroke="#d97706" stroke-width="0.5"/>
    </g>
    <g id="group-1" transform="matrix(0, 2.369476, -2.141482, 0, 150.247929, 290.859048)">
      <circle id="circle-1" cx="-67.91" cy="33.303" r="2.2" fill="#f4f4f5"/>
      <circle id="circle-2" cx="-67.859" cy="32.19" r="1.019" fill="#000000"/>
      <path id="path-1" d="M -69.893 30.003 C -71.83 29.334 -72.272 34.537 -71.043 36.562" stroke="#18181b" stroke-width="1.2" stroke-linecap="round" fill="none" />
    </g>
    <path id="camo-aleta" d="M 99.09 153.521 C 112.09 148.521 121.804 131.199 126.804 141.199" stroke-width="3" stroke-linecap="round" stroke="#1c1917" fill="none"/>
    <path id="path-2" d="M 86.361 170.394 C 99.361 165.394 126.789 155.112 125.203 142.63" stroke-width="3" stroke-linecap="round" stroke="#1c1917" fill="none"/>
  </g>
  <g id="casco-grupo" transform="matrix(-1.601074, 0.745463, 0.679496, 1.459393, 472.639357, 138.422505)" style="transform-origin: -68.388px 28.512px;">
    <path id="casco-cuerpo" d="M -58.2 33 C -58.472 18.27 -77.743 18.379 -77.6 33 C -77.585 34.5 -58.172 34.5 -58.2 33 Z" fill="url(#camo-digital)" stroke="#1b2611" stroke-width="0.5"/>
    <path id="casco-banda" d="M -77.2 27.5 C -72 25 -64 25 -58.6 27.5" stroke="#1c1917" stroke-width="1.2" fill="none" opacity="0.8"/>
  </g>
</svg>`;
}

export default function Scene8PlaygroundPage() {
  const router = useRouter();
  const [status, setStatus] = useState<{ type: 'idle' | 'success' | 'error'; message: string }>({
    type: 'idle',
    message: ''
  });

  const handleCopyToClipboard = () => {
    try {
      const svgCode = getScene8StaticSvg();
      navigator.clipboard.writeText(svgCode);
      setStatus({
        type: 'success',
        message: '¡Código SVG estático de la Escena 8 copiado al portapapeles!'
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
      <div className="absolute top-0 left-1/4 w-[400px] h-[400px] bg-cyan-500/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-indigo-500/5 rounded-full blur-[100px] pointer-events-none" />
 
      <div className="max-w-6xl w-full mx-auto flex-1 flex flex-col relative z-10">
        
        {/* Header */}
        <header className="flex flex-col md:flex-row justify-between items-start md:items-center border-b border-zinc-900 pb-4 mb-6 shrink-0 gap-4">
          <div className="space-y-1">
            <h1 className="text-xs font-mono uppercase tracking-widest text-emerald-400 font-bold">
              Playground de Animación y Diseño
            </h1>
            <p className="text-xl font-bold tracking-tight text-white flex items-center gap-2">
              Escena 8 — Camo y el Patrón Oscuro
            </p>
            <p className="text-xs text-zinc-500">
              Camo cae en el letargo de la oscuridad, acechado por el flotante Patrón Oscuro.
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
                <Scene8DarkPattern />
              </div>

              {/* Indicador de Escena */}
              <div className="absolute top-4 left-4 bg-zinc-900/80 border border-zinc-800/80 px-2 py-1 rounded text-[10px] font-mono text-zinc-500 select-none">
                VISTA PREVIA DE ESCENA 8
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
                Información de Escena 8
              </h2>
              <p className="text-[11px] text-zinc-500">
                Camo es consumido por los patrones de persuasión, perdiendo su luz y su casco militar, mientras duerme acechado por el Patrón Oscuro.
              </p>
            </div>

            <div className="space-y-3 font-mono text-[10px] text-zinc-400">
              <div className="p-3 rounded border border-zinc-800/80 bg-zinc-950/80 space-y-1">
                <span className="text-emerald-400 font-bold uppercase block text-[9px]">Diálogo Escena 8:</span>
                <p className="italic">"Lamentablemente, como a muchos otros espíritus, este fue cegado por su ego... y fue víctima de los "patrones" los cuales lo llevaron a la "oscuridad"..."</p>
              </div>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
