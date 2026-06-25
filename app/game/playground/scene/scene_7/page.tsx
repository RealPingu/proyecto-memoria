'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import Scene7Sniper from '../../components/scene_7_sniper';

// Generar código SVG estático limpio para exportar al portapapeles
function getScene7StaticSvg(): string {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 120" width="200px" height="120px">
  <defs>
    <pattern id="camo-digital" width="20" height="20" patternUnits="userSpaceOnUse">
      <rect width="20" height="20" fill="#3f4e3f" id="rect-bg-dig"/>
      <rect x="0" y="0" width="8" height="6" fill="#2d3a2d" id="rect-dark-dig"/>
      <rect x="10" y="4" width="6" height="8" fill="#546554" id="rect-medium-dig"/>
      <rect x="2" y="10" width="8" height="6" fill="#7ba077" id="rect-light-dig"/>
      <rect x="12" y="12" width="6" height="6" fill="#202a20" id="rect-black-dig"/>
    </pattern>
  </defs>
  <rect width="200" height="120" fill="#000000" x="0" y="0" />
  <g id="rifle-fijo-boxy" transform="matrix(0, -0.114165, -0.106794, 0, -145.633992, -65.345682)" style="transform-origin: 265.5px 119.5px;">
    <g id="canon">
      <rect x="250" y="100" width="230" height="8" fill="#1c1917" stroke="#100e0d" stroke-width="1"/>
      <rect x="480" y="96" width="16" height="16" rx="2" fill="#141210"/>
    </g>
    <g id="chasis-principal">
      <rect x="90" y="90" width="160" height="30" fill="#3f4e3f" stroke="#2d3a2d" stroke-width="1"/>
      <rect x="50" y="90" width="40" height="45" fill="#3f4e3f" stroke="#2d3a2d" stroke-width="1"/>
      <rect x="90" y="120" width="30" height="15" fill="#3f4e3f"/>
      <rect x="170" y="120" width="40" height="10" fill="#3f4e3f"/>
      <circle cx="70" cy="115" r="10" fill="#f4f4f5" stroke="#2d3a2d" stroke-width="1"/>
      <rect x="55" y="95" width="15" height="10" fill="#2d3a2d"/>
      <rect x="95" y="105" width="20" height="12" fill="#7ba077"/>
      <rect x="110" y="92" width="25" height="10" fill="#202a20"/>
      <rect x="140" y="100" width="15" height="15" fill="#2d3a2d"/>
      <rect x="170" y="92" width="30" height="12" fill="#546554"/>
      <rect x="210" y="102" width="25" height="14" fill="#7ba077"/>
      <rect x="230" y="92" width="15" height="15" fill="#202a20"/>
      <rect x="180" y="122" width="15" height="6" fill="#2d3a2d"/>
      <rect x="185" y="95" width="12" height="4" rx="1" fill="#141210"/>
      <rect x="225" y="95" width="12" height="4" rx="1" fill="#141210"/>
    </g>
    <g id="culata">
      <rect x="35" y="85" width="15" height="55" rx="3" fill="#141210"/>
      <circle cx="58" cy="130" r="3" fill="#141210"/>
      <circle cx="82" cy="130" r="3" fill="#141210"/>
    </g>
    <g id="accion-cerrojo" transform="matrix(1, 0, 0, 1, 3.932346, -0.265837)">
      <rect x="110" y="80" width="80" height="10" fill="#1c1917" stroke="#100e0d" stroke-width="0.5"/>
      <circle cx="125" cy="87" r="4" fill="#1c1917"/>
      <rect x="135" y="120" width="30" height="22" rx="1" fill="#141210"/>
      <rect x="141" y="123" width="2" height="15" fill="#2e2a24"/>
      <rect x="149" y="123" width="2" height="15" fill="#2e2a24"/>
      <rect x="157" y="123" width="2" height="15" fill="#2e2a24"/>
      <rect x="128" y="120" width="3" height="12" fill="#141210"/>
      <rect x="110" y="130" width="20" height="3" fill="#141210"/>
      <rect x="118" y="123" width="3" height="7" fill="#141210"/>
    </g>
    <g id="mira-telescopica">
      <rect x="120" y="76" width="60" height="4" fill="#2a2624"/>
      <rect x="128" y="66" width="8" height="10" fill="#141210"/>
      <rect x="164" y="66" width="8" height="10" fill="#141210"/>
      <rect x="122" y="58" width="56" height="8" fill="#1c1917"/>
      <rect x="178" y="54" width="10" height="16" fill="#1c1917"/>
      <rect x="188" y="50" width="16" height="24" fill="#1c1917"/>
      <rect x="204" y="52" width="3" height="20" fill="#f59e0b" rx="0.5"/>
      <rect x="106" y="52" width="16" height="20" fill="#1c1917"/>
    </g>
    <g id="bipode">
      <rect x="225" y="120" width="14" height="8" rx="1" fill="#1c1917"/>
      <circle cx="232" cy="124" r="2" fill="#7ba077"/>
      <rect x="228" y="128" width="5" height="55" fill="#141210"/>
      <rect x="222" y="183" width="16" height="6" rx="1" fill="#0a0908"/>
    </g>
  </g>
  <g id="podio-militar" transform="matrix(0.390857, 0, 0, 0.336447, 62.472357, 69.360377)">
    <ellipse cx="100" cy="125" rx="95" ry="12" fill="#e4e4e7"/>
    <polygon points="20 120 180 120 168.036 24.482 36.417 41.176" fill="#374151" stroke="#1f2937" stroke-width="2"/>
    <polygon points="45,110 155,110 145,55 55,55" fill="#4b5563" stroke="#1f2937" stroke-width="1"/>
    <polygon points="34.921 42.012 163.065 42.448 169.226 23.472 53.228 22.4" fill="#1f2937" style="transform-origin: 99.595px 24.06px;"/>
    <circle cx="40" cy="46" r="2.5" fill="#9ca3af"/>
    <circle cx="160" cy="46" r="2.5" fill="#9ca3af"/>
    <circle cx="26" cy="114" r="2.5" fill="#9ca3af"/>
    <circle cx="174" cy="114" r="2.5" fill="#9ca3af"/>
    <g id="numero-uno-tactico" transform="translate(82, 60)">
      <polygon points="14.26 9.595 5.753 12.328 1 12 1.188 3.921 12.731 -1.188" fill="#713f12"/>
      <polygon points="12 -1.073 25 -1.073 25 39.241 32 39.241 32 45 5 45 5 39.241 12 39.241" fill="#713f12"/>
      <polygon points="13.404 8.707 5.83 10.781 2 11 2 4.908 13.797 -0.607" fill="#facc15"/>
      <polygon points="13 -0.217 24 -0.217 24 38.473 31 38.473 31 44 6 44 6 38.473 13 38.473" fill="#facc15"/>
      <polygon points="13 -0.386 24 -0.386 24 39 13 39" fill="#fef08a" opacity="0.45"/>
    </g>
  </g>
  <g id="pingüino-táctico-estático" transform="matrix(0, 0.602053, -0.681764, 0, 152.878331, 27.135072)" style="transform-origin: -51.9507px 37.555px;">
    <path id="path-2" d="M -54.269 -9.059 C -55.047 -8.397 -70.361 -6.589 -76.425 -7.311" stroke-width="2.5" stroke-linecap="round" stroke="rgb(0, 0, 0)" fill="none" style="stroke-width: 2.5; transform-origin: -58.488px 10.36px;" transform="matrix(-1, 0, 0, -1, -0.000003, -0.000009)"/>
    <path id="pata-superior" d="M -32.417 31.796 L -25.744 26.644 L -25.774 33.746 L -32.417 31.796 Z" fill="#f59e0b"/>
    <ellipse id="cuerpo" cx="-47.91" cy="37.303" rx="20" ry="9.723" fill="url(#camo-digital)" stroke="#7ba077" stroke-width="0.5"/>
    <ellipse id="vientre" cx="-46.644" cy="36.663" rx="11.496" ry="6.609" fill="#d8d8d0" stroke="#000000" stroke-width="0.8" />
    <circle id="cabeza" cx="-73.89" cy="37.137" r="10" fill="url(#camo-digital)" stroke="#7ba077" stroke-width="0.5"/>
    <g id="ojo-determinado" transform="matrix(1, 0, 0, 1, -6.119227, -1.486034)">
      <circle id="ojo-borde" cx="-68.31" cy="33.013" r="2.2" fill="#f4f4f5"/>
      <circle id="ojo-pupila" cx="-67.358" cy="32.964" r="1.019" fill="#000000"/>
      <path id="ceja" d="M -70.916 30.357 C -71.41 30.893 -71.824 35.05 -70.221 36.338" stroke="#18181b" stroke-width="1.2" stroke-linecap="round"/>
    </g>
    <polygon id="pico" points="-70.546 36.372 -66.826 32.353 -66.586 39.331" fill="#f59e0b"/>
    <g id="patas-contenedor" transform="matrix(1, 0, 0, 1, -51.910336, 17.303471)">
      <path id="pata-inferior" d="M 26.663 20.735 L 26.851 27.446 L 19.486 24.256 L 26.663 20.735 Z" fill="#f59e0b"/>
    </g>
    <path id="aleta" d="M -67.153 26.966 C -68.275 22.518 -50.218 27.663 -48.44 32.055" stroke-width="2.5" stroke-linecap="round" stroke="rgb(0, 0, 0)" fill="none" style="transform-box: fill-box; transform-origin: 50% 50%;" transform="matrix(-1, 0, 0, -1, -13.674032, 13.334826)"/>
    <g id="casco-grupo" transform="matrix(0, 1.038801, 0.967817, 0, -17.114298, 8.442147)" style="transform-origin: -67.9004px 28.6293px;">
      <path id="casco-cuerpo" d="M -58.2 33 C -58.472 18.27 -77.743 18.379 -77.6 33 C -77.585 34.5 -58.172 34.5 -58.2 33 Z" fill="url(#camo-digital)" stroke="#1b2611" stroke-width="0.5"/>
      <path id="casco-banda" d="M -77.2 27.5 C -72 25 -64 25 -58.6 27.5" stroke="#1c1917" stroke-width="1.2" fill="none" opacity="0.8"/>
    </g>
    <g id="group-1" transform="matrix(1, 0, 0, 1, -6.463005, 7.373969)">
      <circle id="circle-1" cx="-67.91" cy="33.303" r="2.2" fill="#f4f4f5"/>
      <circle id="circle-2" cx="-67.03" cy="33.319" r="1.019" fill="#000000"/>
      <path id="path-1" d="M -70.406 30.003 C -70.426 30.764 -71.314 35.178 -70.731 36.241" stroke="#18181b" stroke-width="1.2" stroke-linecap="round"/>
    </g>
  </g>
</svg>`;
}

export default function Scene7PlaygroundPage() {
  const router = useRouter();
  const [status, setStatus] = useState<{ type: 'idle' | 'success' | 'error'; message: string }>({
    type: 'idle',
    message: ''
  });

  const handleCopyToClipboard = () => {
    try {
      const svgCode = getScene7StaticSvg();
      navigator.clipboard.writeText(svgCode);
      setStatus({
        type: 'success',
        message: '¡Código SVG estático de la Escena 7 (Camo) copiado al portapapeles!'
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
              Escena 7 — Camo el Francotirador
            </p>
            <p className="text-xs text-zinc-500">
              Camo viste su camuflaje con orgullo y se encuentra posando en su podio militar con su rifle.
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
              <div className="w-full max-w-[400px] aspect-video">
                <Scene7Sniper />
              </div>

              {/* Indicador de Escena */}
              <div className="absolute top-4 left-4 bg-zinc-900/80 border border-zinc-800/80 px-2 py-1 rounded text-[10px] font-mono text-zinc-500 select-none">
                VISTA PREVIA DE ESCENA 7
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
                Información de Escena 7
              </h2>
              <p className="text-[11px] text-zinc-500">
                Esta escena presenta el trasfondo militar y heroico de Camo antes de que su mente fuera persuadida y consumida por el "Patrón".
              </p>
            </div>

            <div className="space-y-3 font-mono text-[10px] text-zinc-400">
              <div className="p-3 rounded border border-zinc-800/80 bg-zinc-950/80 space-y-1">
                <span className="text-emerald-400 font-bold uppercase block text-[9px]">Diálogo 1:</span>
                <p className="italic">"Su nombre era "Camo", el pingüino "sigiloso", dentro de la comarca "pingüinal", era conocido como el mejor francotirador."</p>
              </div>

              <div className="p-3 rounded border border-zinc-800/80 bg-zinc-950/80 space-y-1">
                <span className="text-emerald-400 font-bold uppercase block text-[9px]">Diálogo 2:</span>
                <p className="italic">"Camo vestía su camuflaje con orgullo, y todo el mundo lo conocía por su pericia en su rol..."</p>
              </div>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
