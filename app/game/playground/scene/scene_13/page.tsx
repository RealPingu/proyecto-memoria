'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import Scene13Anuncios from '../../components/scene_13_anuncios';

// Generar código SVG estático limpio para exportar al portapapeles
function getScene13StaticSvg(): string {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 120" width="200px" height="120px">
  <defs>
    <radialGradient gradientUnits="userSpaceOnUse" cx="159.145" cy="39.462" r="136.148" id="gradient-3" gradientTransform="matrix(-0.021859, 0.323436, -0.856484, -0.078422, 196.422295, -8.916606)">
      <stop offset="0" stop-color="#5574da"/>
      <stop offset="1" stop-color="#0244a2"/>
    </radialGradient>
    <radialGradient id="colored-bg-grad-chaotic" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="#06b6d4" stop-opacity="0.25"/>
      <stop offset="60%" stop-color="#1e1b4b" stop-opacity="0.15"/>
      <stop offset="100%" stop-color="#080711" stop-opacity="1"/>
    </radialGradient>
  </defs>
  <rect width="200" height="120" fill="url(#colored-bg-grad-chaotic)" x="0" y="0" id="fondo-escena"/>
  <circle cx="100" cy="60" r="80" fill="url(#colored-bg-grad-chaotic)"/>
  <g id="dispositivo-zoom-contenedor" transform="matrix(0.22, 0, 0, 0.22, 45, -6)">
    <g id="dispositivo">
      <rect x="80" y="30" width="340" height="540" rx="40" fill="#0f172a"/>
      <rect x="92" y="42" width="316" height="516" rx="30" fill="#cbd5e1"/>
      <rect x="185" y="52" width="130" height="20" rx="10" fill="#0f172a"/>
    </g>
    <g id="caos-ventanas" transform="translate(92, 72)">
      <g id="popup-codigo-unico-wrapper" transform="translate(15, 15)">
        <g transform="matrix(0.993573, -0.131775, 0.097235, 0.993573, 0, 0)">
          <rect width="286" height="60" rx="10" fill="#5b21b6" stroke="#f59e0b" stroke-width="2"/>
          <text x="143" y="35" font-family="sans-serif" font-size="15" font-weight="900" fill="#ffffff" text-anchor="middle" letter-spacing="0.5">¡CÓDIGO ÚNICO! ¡PULSA AQUÍ!</text>
        </g>
      </g>
      <g id="popup-compra-ya-wrapper" transform="translate(22.017, 102.155)">
        <g transform="matrix(0.975167, 0.257822, -0.190244, 0.975167, 0, 0)">
          <rect width="130" height="70" fill="#b91c1c" rx="15.8" ry="15.8"/>
          <text x="65" y="42" font-family="sans-serif" font-size="15" font-weight="900" fill="#fde047" text-anchor="middle">¡COMPRA YA!</text>
        </g>
      </g>
      <g id="popup-solo-hoy-wrapper" transform="translate(244.216, 131.578)">
        <g transform="matrix(0.986488, 0.470699, -0.400603, 1.137813, 0, 0)">
          <circle cx="0" cy="0" r="40" fill="#f97316" stroke="#c2410c" stroke-width="2"/>
          <text x="0" y="-8" font-family="sans-serif" font-size="13" font-weight="900" fill="#ffffff" text-anchor="middle">SOLO HOY</text>
          <text x="0" y="10" font-family="sans-serif" font-size="12" font-weight="900" fill="#ffffff" text-anchor="middle">APRESÚRATE</text>
        </g>
      </g>
      <g id="popup-sigue-compra-wrapper" transform="translate(7, 185)">
        <rect x="20" y="17" width="262" height="62" rx="4" fill="#0f172a" opacity="0.3"/>
        <rect x="15" y="12" width="262" height="62" stroke="#000000" stroke-width="2" fill="url(#gradient-3)"/>
        <text x="146" y="48" fill="#2ca8f9" font-family="sans-serif" font-size="18" font-weight="900" letter-spacing="0.5" text-anchor="middle">SIGUE CON TU COMPRA</text>
      </g>
      <g id="popup-suscribete-wrapper" transform="translate(94.296, 330.225)">
        <circle cx="0" cy="0" r="45" fill="#a3e635" stroke="#4d7c0f" stroke-width="2"/>
        <text x="0" y="-8" font-family="sans-serif" font-size="13" font-weight="900" fill="#0f172a" text-anchor="middle">SUSCRÍBITE</text>
        <text x="0" y="10" font-family="sans-serif" font-size="13" font-weight="900" fill="#0f172a" text-anchor="middle">AQUÍ!</text>
      </g>
      <g id="popup-relajate-wrapper" transform="translate(221.755, 329.605)">
        <path d="M 0 -40 L 12 -15 L 35 -25 L 20 -3 L 42 8 L 12 12 L 20 40 L -4 15 L -28 30 L -16 4 L -40 -12 L -12 -12 Z" fill="#f472b6" stroke="#db2777" stroke-width="2"/>
        <text x="0" y="4" font-family="sans-serif" font-size="12" font-weight="900" fill="#000000" text-anchor="middle">¡RELAJATE!</text>
      </g>
    </g>
    <g id="footer-falso-wrapper" transform="translate(92, 470)">
      <rect width="316" height="88" fill="#f87171" opacity="0.6" rx="37.893" ry="37.893"/>
      <rect x="20" y="19" width="272" height="50" rx="12" fill="#111827"/>
      <text x="156" y="50" font-family="sans-serif" font-size="15" font-weight="900" fill="#ef4444" text-anchor="middle">DESCARGAR ERROR_FIX.EXE</text>
    </g>
  </g>
</svg>`;
}

export default function Scene13PlaygroundPage() {
  const router = useRouter();
  const [status, setStatus] = useState<{ type: 'idle' | 'success' | 'error'; message: string }>({
    type: 'idle',
    message: ''
  });

  const handleCopyToClipboard = () => {
    try {
      const svgCode = getScene13StaticSvg();
      navigator.clipboard.writeText(svgCode);
      setStatus({
        type: 'success',
        message: '¡Código SVG estático de la Escena 13 copiado al portapapeles!'
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
      <div className="absolute top-0 left-1/4 w-[400px] h-[400px] bg-purple-500/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-fuchsia-500/5 rounded-full blur-[100px] pointer-events-none" />
 
      <div className="max-w-6xl w-full mx-auto flex-1 flex flex-col relative z-10">
        
        {/* Header */}
        <header className="flex flex-col md:flex-row justify-between items-start md:items-center border-b border-zinc-900 pb-4 mb-6 shrink-0 gap-4">
          <div className="space-y-1">
            <h1 className="text-xs font-mono uppercase tracking-widest text-fuchsia-400 font-bold">
              Playground de Animación y Diseño
            </h1>
            <p className="text-xl font-bold tracking-tight text-white flex items-center gap-2">
              Escena 13 — Camo y los Anuncios Caóticos
            </p>
            <p className="text-xs text-zinc-500">
              La pantalla del celular gigante inundada por multitud de anuncios persuasivos y botones engañosos (Disguised Ads).
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
                <Scene13Anuncios />
              </div>

              {/* Indicador de Escena */}
              <div className="absolute top-4 left-4 bg-zinc-900/80 border border-zinc-800/80 px-2 py-1 rounded text-[10px] font-mono text-zinc-500 select-none">
                VISTA PREVIA DE ESCENA 13
              </div>

              {/* Botón de exportación rápida */}
              <button 
                onClick={handleCopyToClipboard}
                className="absolute bottom-4 right-4 bg-fuchsia-600 hover:bg-fuchsia-500 text-white text-xs font-bold px-3 py-1.5 rounded flex items-center gap-1.5 shadow-lg active:scale-95 transition"
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
                  className="p-3 rounded text-xs font-mono border bg-fuchsia-950/20 border-fuchsia-500/20 text-fuchsia-400"
                >
                  {status.message}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Columna Derecha: Panel explicativo */}
          <div className="bg-zinc-950/40 border border-zinc-900 rounded-lg p-5 flex flex-col gap-6 backdrop-blur-sm shadow-xl overflow-y-auto max-h-[600px] custom-scrollbar">
            <div>
              <h2 className="text-sm font-bold text-white tracking-wide mb-1 uppercase font-mono text-fuchsia-400">
                Información de Escena 13
              </h2>
              <p className="text-[11px] text-zinc-500">
                El celular despliega una imagen con multitud de botones y anuncios molestos diseñados para inducir a clics e interacciones accidentales.
              </p>
            </div>

            <div className="space-y-3 font-mono text-[10px] text-zinc-400">
              <div className="p-3 rounded border border-zinc-800/80 bg-zinc-950/80 space-y-1">
                <span className="text-fuchsia-400 font-bold uppercase block text-[9px]">Diálogos de Escena 13:</span>
                <p className="italic">"- ¡Camo entró rápidamente a la página!"</p>
                <p className="italic">"- ¡Lo primero que encontró fue una pantalla llena de botones y anuncios que decían "comprar ahora"!"</p>
                <p className="italic font-bold text-zinc-300">"- ¡Es el momento, toma las riendas y usa tu "conciencia" para ayudar a Camo! lucha contra el patron oscuro y toma las riendas de tus desiciones!"</p>
              </div>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
