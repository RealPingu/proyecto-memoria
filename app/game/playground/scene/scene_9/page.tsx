'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import Scene9CelularPagar from '../../components/scene_9_celular_pagar';

// Generar código SVG estático limpio para exportar al portapapeles
function getScene9StaticSvg(): string {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 120" width="100%" height="100%">
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
    <linearGradient id="gradient-1" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0" stop-color="#38bdf8" stop-opacity="0.55"/>
      <stop offset="1" stop-color="#22c55e" stop-opacity="0.05"/>
    </linearGradient>
    <radialGradient id="colored-bg-grad" cx="80%" cy="30%" r="60%">
      <stop offset="0%" stop-color="#059669" stop-opacity="0.25"/>
      <stop offset="100%" stop-color="#050508" stop-opacity="1"/>
    </radialGradient>
    <linearGradient id="oro-grad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#fef08a" />
      <stop offset="40%" stop-color="#eab308" />
      <stop offset="100%" stop-color="#ca8a04" />
    </linearGradient>
  </defs>
  <rect width="100%" height="100%" fill="url(#colored-bg-grad)" x="0" y="0" />
  <g id="patron-oscuro-pequeno" transform="matrix(-0.047757, 0, 0.030459, 0.054367, 16.512572, 72.678393)">
    <polygon points="130,360 100,120 300,120 270,360" fill="url(#teselacion)" stroke="#06b6d4" stroke-width="1.5"/>
    <g transform="matrix(1, 0, 0, 1, -54.158613, 5.563326)">
      <polygon points="200,160 225,180 200,200 175,180" fill="#22d3ee"/>
      <line x1="188.179" y1="174.081" x2="200.433" y2="193.748" stroke="#020408" stroke-width="3" />
    </g>
  </g>
  <g id="sillon-contenedor" transform="matrix(0.114551, 0, 0, 0.130749, 5.932414, 76.120112)">
    <rect x="60" y="80" width="380" height="130" rx="15" fill="#78350f" stroke="#451a03" stroke-width="2"/>
    <rect x="50" y="180" width="400" height="70" rx="12" fill="#92400e" stroke="#451a03" stroke-width="2"/>
    <line x1="250" y1="180" x2="250" y2="250" stroke="#451a03" stroke-width="1.5"/>
    <rect x="20" y="150" width="60" height="100" rx="20" fill="#b45309" stroke="#451a03" stroke-width="2"/>
    <rect x="420" y="150" width="60" height="100" rx="20" fill="#b45309" stroke="#451a03" stroke-width="2"/>
    <rect x="40" y="250" width="25" height="15" fill="#1c1917"/>
    <rect x="435" y="250" width="25" height="15" fill="#1c1917"/>
  </g>
  <g id="celular-tactico-sofa" transform="matrix(0.089285, 0, 0, 0.112814, 6.306325, 73.610171)">
    <polygon points="160,150 162,175 120,165 122,158" fill="url(#brillo-celular)"/>
    <rect x="158" y="148" width="8" height="26" rx="1.5" fill="#18181b" stroke="#27272a" stroke-width="0.5" transform="rotate(-15, 160, 160)"/>
    <rect x="159" y="150" width="4" height="22" rx="0.5" fill="#38bdf8" transform="rotate(-15, 160, 160)"/>
  </g>
  <g id="camo-flojo" transform="matrix(0.114551, 0, 0, 0.130749, 7.077928, 74.533602)">
    <path id="camo-pata-superior" d="M 130.444 194.395 L 150.444 184.395 L 148.444 199.395 L 130.444 194.395 Z" fill="#f59e0b" stroke="#d97706" stroke-width="0.5"/>
    <ellipse id="camo-cuerpo" cx="118.065" cy="174.941" rx="32.959" ry="20.195" fill="url(#camo-digital)" stroke="#7ba077" stroke-width="0.5" transform="matrix(0.964779, 0.26306, 0, 1.036506, -8.433431, -36.30004)"/>
    <ellipse id="camo-vientre" cx="106.907" cy="174.248" rx="22.886" ry="13.458" fill="#d8d8d0" stroke="#000000" stroke-width="0.8" transform="matrix(0.961297, 0.275515, 0, 1.040261, 5.282357, -40.190219)"/>
    <circle id="camo-cabeza" cx="115" cy="165" r="18" fill="url(#camo-digital)" stroke="#7ba077" stroke-width="0.5" transform="matrix(1.297488, 0, 0, 1.424591, -78.935854, -98.101832)"/>
    <polygon id="pico" points="84.066 141.103 93.12 145.741 82.255 148.832" fill="#f59e0b" stroke="#d97706" stroke-width="0.5"/>
    <g id="camo-patas-contenedor" transform="matrix(1, 0, 0, 1, -71.257288, -14.881023)">
      <path id="camo-pata-inferior" d="M 195 210 L 215 212 L 208 222 Z" fill="#f59e0b" stroke="#d97706" stroke-width="0.5"/>
    </g>
    <g id="camo-ojos" transform="matrix(0, 2.369476, -2.141482, 0, 150.247929, 290.859048)">
      <circle id="ojo-borde" cx="-67.91" cy="33.303" r="2.2" fill="#f4f4f5"/>
      <circle id="ojo-pupila" cx="-67.859" cy="32.19" r="1.019" fill="#000000"/>
      <path id="ojo-parpado" d="M -69.893 30.003 C -71.83 29.334 -72.272 34.537 -71.043 36.562" stroke="#18181b" stroke-width="1.2" stroke-linecap="round" fill="none"/>
    </g>
    <path id="camo-aleta" d="M 99.09 153.521 C 112.09 148.521 121.804 131.199 126.804 141.199" stroke-width="3" stroke-linecap="round" stroke="#1c1917" fill="none"/>
    <path id="path-2" d="M 86.361 170.394 C 99.361 165.394 126.789 155.112 125.203 142.63" stroke-width="3" stroke-linecap="round" stroke="#1c1917" fill="none"/>
  </g>
  <g id="casco-grupo" transform="matrix(-0.183405, 0.097468, 0.077837, 0.190814, 120.62791, 69.155581)" style="transform-origin: -68.388px 28.512px;">
    <path id="casco-cuerpo" d="M -58.2 33 C -58.472 18.27 -77.743 18.379 -77.6 33 C -77.585 34.5 -58.172 34.5 -58.2 33 Z" fill="url(#camo-digital)" stroke="#1b2611" stroke-width="0.5"/>
    <path id="casco-banda" d="M -77.2 27.5 C -72 25 -64 25 -58.6 27.5" stroke="#1c1917" stroke-width="1.2" fill="none" opacity="0.8"/>
  </g>
  <g id="brillo-proyeccion-grupo" transform="matrix(1.526425, 0, 0, 1.857937, -95.956218, -228.358634)">
    <polygon points="121.805 131.076 128.666 170.055 78.101 170.895 77.786 169.791" fill="url(#gradient-1)" />
  </g>
  <g id="dispositivo-contenedor" transform="matrix(0.163443, 0, 0, 0.151725, 96.941829, 1.920114)">
    <g id="dispositivo">
      <rect x="80" y="30" width="340" height="540" rx="40" fill="#0f172a"/>
      <rect x="92" y="42" width="316" height="516" rx="30" fill="#ffffff"/>
      <rect x="185" y="52" width="130" height="20" rx="10" fill="#0f172a"/>
    </g>
    <g id="productos-grid" transform="translate(110, 100)">
      <text x="0" y="0" font-family="sans-serif" font-size="14" font-weight="bold" fill="#94a3b8" letter-spacing="1">RECOMENDADOS</text>
      <g transform="translate(0, 20)">
        <rect width="135" height="135" rx="16" fill="#f8fafc" stroke="#e2e8f0" stroke-width="1"/>
        <circle cx="67" cy="55" r="25" fill="#e0f2fe"/>
        <path d="M 52,58 C 52,43 82,43 82,58 Z" fill="#3f4e3f" stroke="#1b2611" stroke-width="0.75" />
        <path d="M 55,58 L 67,65 L 79,58" stroke="#1c1917" stroke-width="1.2" fill="none" />
        <rect x="20" y="95" width="95" height="10" rx="2" fill="#cbd5e1"/>
        <rect x="20" y="110" width="45" height="8" rx="2" fill="#94a3b8"/>
      </g>
      <g transform="translate(145, 20)">
        <rect width="135" height="135" rx="16" fill="#f8fafc" stroke="#e2e8f0" stroke-width="1"/>
        <circle cx="67" cy="55" r="25" fill="#ffedd5"/>
        <path d="M 49,58 C 49,42 85,42 85,58 Z" fill="#eab308" />
        <path d="M 52,50 C 60,46 74,46 82,50 M 57,58 L 57,50 M 67,58 L 67,46 M 77,58 L 77,50" stroke="#ca8a04" stroke-width="0.8" fill="none" />
        <rect x="20" y="95" width="95" height="10" rx="2" fill="#cbd5e1"/>
        <rect x="20" y="110" width="45" height="8" rx="2" fill="#94a3b8"/>
      </g>
      <g transform="translate(0, 175)">
        <rect width="135" height="135" rx="16" fill="#f8fafc" stroke="#e2e8f0" stroke-width="1"/>
        <circle cx="67" cy="55" r="25" fill="#dcfce7"/>
        <path d="M 48,55 C 57,49 70,49 76,55 C 70,61 57,61 48,55 Z" fill="#0284c7" />
        <polygon points="76,55 85,50 83,55 85,60" fill="#0284c7" />
        <rect x="20" y="95" width="95" height="10" rx="2" fill="#cbd5e1"/>
        <rect x="20" y="110" width="45" height="8" rx="2" fill="#94a3b8"/>
      </g>
      <g transform="translate(145, 175)">
        <rect width="135" height="135" rx="16" fill="#f8fafc" stroke="#22c55e" stroke-width="2"/>
        <circle cx="67" cy="55" r="25" fill="#f3e8ff"/>
        <path d="M 46,55 H 88" stroke="#1e293b" stroke-width="2.5" />
        <rect x="52" y="49" width="30" height="12" rx="3.5" fill="#22c55e" stroke="#16a34a" stroke-width="1.2" />
        <rect x="20" y="95" width="95" height="10" rx="2" fill="#cbd5e1"/>
        <rect x="20" y="110" width="45" height="8" rx="2" fill="#94a3b8"/>
      </g>
    </g>
    <g id="checkout-footer" transform="translate(92, 430)">
      <rect width="316" height="128" rx="42.157" fill="#ffffff" ry="42.157"/>
      <line x1="20" y1="0" x2="296" y2="0" stroke="#f1f5f9" stroke-width="2"/>
      <rect x="24" y="20" width="80" height="10" rx="2" fill="#94a3b8"/>
      <text x="292" y="30" font-family="sans-serif" font-size="20" font-weight="bold" fill="#0f172a" text-anchor="end">$49.99</text>
      <g id="boton-simple-aletea" transform="translate(20, 50)">
        <rect width="272" height="50" rx="12" fill="#22c55e"/>
        <text x="136" y="31" font-family="sans-serif" font-size="16" font-weight="900" fill="#ffffff" text-anchor="middle" letter-spacing="1">ALETEA PARA PAGAR !!!</text>
      </g>
    </g>
  </g>
</svg>`;
}

export default function Scene9PlaygroundPage() {
  const router = useRouter();
  const [status, setStatus] = useState<{ type: 'idle' | 'success' | 'error'; message: string }>({
    type: 'idle',
    message: ''
  });

  const handleCopyToClipboard = () => {
    try {
      const svgCode = getScene9StaticSvg();
      navigator.clipboard.writeText(svgCode);
      setStatus({
        type: 'success',
        message: '¡Código SVG estático de la Escena 9 copiado al portapapeles!'
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
              Escena 9 — El Letargo Comercial
            </p>
            <p className="text-xs text-zinc-500">
              Camo pierde su rigurosidad y se deja llevar por el pasatiempo de las compras compulsivas.
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
                <Scene9CelularPagar />
              </div>

              {/* Indicador de Escena */}
              <div className="absolute top-4 left-4 bg-zinc-900/80 border border-zinc-800/80 px-2 py-1 rounded text-[10px] font-mono text-zinc-500 select-none">
                VISTA PREVIA DE ESCENA 9
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
                Información de Escena 9
              </h2>
              <p className="text-[11px] text-zinc-500">
                Esta escena muestra a Camo el pingüino frente a un celular. Con su experiencia y competencia, Camo fue remunerado con grandes cantidades de Dólares pingüinales. Uno de sus mayores pasatiempos era recorrer y revisar páginas comerciales de productos en su celular, perdiendo su rigurosidad y dejándose llevar.
              </p>
            </div>

            <div className="space-y-3 font-mono text-[10px] text-zinc-400">
              <div className="p-3 rounded border border-zinc-800/80 bg-zinc-950/80 space-y-1">
                <span className="text-emerald-400 font-bold uppercase block text-[9px]">Diálogos del Narrador:</span>
                <p className="italic mb-2">1. "Con su experiencia y competencia, Camo fue remunerado con grandes cantidades de "Dólares pingüinales$"."</p>
                <p className="italic">2. "Uno de sus mayores pasatiempos era recorrer y revisar páginas "comerciales" de productos en su celular, pero como "Camo" ya no se encontraba en el campo de batalla, este perdía su rigurosidad y al no sentirse amenazado por enemigos, este se dejaba llevar..."</p>
              </div>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
