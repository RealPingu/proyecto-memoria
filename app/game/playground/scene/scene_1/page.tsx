'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import Scene1Sleeping from '../../components/scene_1_sleeping';

// Clean static SVG code for clipboard export (no animations, standard SVG tags)
function getVariantStaticSvg(variantId: number): string {
  const baseStart = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 120" width="200px" height="120px">
  <g id="pinguino-contenedor" transform="matrix(1, 0, 0, 1, 99.815317, 50.407472)">
    <ellipse id="cuerpo" cx="-47.91" cy="37.303" rx="20" ry="14" fill="#18181b"></ellipse>
    <ellipse id="vientre" cx="-49.91" cy="31.303" rx="14" ry="8" fill="#f4f4f5"></ellipse>
    <circle id="cabeza" cx="-67.91" cy="33.303" r="10" fill="#18181b"></circle>
    <g id="bufanda" transform="matrix(1, 0, 0, 1, -51.910336, 17.303471)">
      <path id="bufanda-cuello" d="M -14.315 26.443 C -12.315 20.443 -3.738 18.577 -6.624 13.624" stroke="#ef4444" stroke-width="2.2" fill="none" stroke-linecap="round"></path>
      <path id="bufanda-caida-roja" d="M -7.663 13.49 C -2.663 12.49 3 11 7 9 C 5 7 0.204 10.408 -6.796 12.408 L -7.663 13.49 Z" fill="#ef4444"></path>
      <path id="bufanda-caida-guinda" d="M -6.929 14.898 C -1.929 14.898 2 14 5 13 C 3 11 -0.337 13.357 -7.337 13.357 L -6.929 14.898 Z" fill="#b91c1c"></path>
    </g>
    <path id="ojo" d="M -70.91 31.303 C -68.91 33.303 -66.91 33.303 -64.91 31.303" stroke="#a1a1aa" stroke-width="1.2" fill="none" stroke-linecap="round"></path>
    <polygon id="pico" points="-70.91 26.303 -67.91 19.303 -64.91 26.303" fill="#f59e0b"></polygon>
    <circle id="burbuja-sueno" cx="-67.91" cy="19.303" r="4" fill="#38bdf8" fill-opacity="0.25" stroke="#0284c7" stroke-width="0.8"></circle>
    <g id="patas" transform="matrix(1, 0, 0, 1, -51.910336, 17.303471)">
      <path id="pata-superior" d="M18,13 L26,11 L25,18 Z" fill="#f59e0b"></path>
      <path id="pata-inferior" d="M20,22 L28,24 L25,30 Z" fill="#f59e0b"></path>
    </g>
    <path id="aleta" d="M -56.369 37.201 C -57.631 41.252 -39.926 36.511 -37.926 32.511" stroke-width="2.5" stroke-linecap="round" style="stroke: rgb(0, 0, 0);" fill="none"></path>`;

  const baseEnd = `  </g>\n</svg>`;

  switch (variantId) {
    case 1:
      return `${baseStart}\n${baseEnd}`;
    case 2:
      return `${baseStart}\n    <!-- Antifaz de Sueño -->\n    <rect id="antifaz-cuerpo" x="-74" y="29" width="13" height="6" fill="#1e3a8a" rx="2" stroke="#3b82f6" stroke-width="0.5" />\n    <circle id="antifaz-ojo-l" cx="-71" cy="32" r="1" fill="#f8fafc" />\n    <circle id="antifaz-ojo-r" cx="-67" cy="32" r="1" fill="#f8fafc" />\n${baseEnd}`;
    case 3:
      return `${baseStart}\n    <!-- Manta de Abrigo -->\n    <path id="manta" d="M-60,34 C-45,20 -28,26 -35,42 C-40,46 -55,47 -60,34 Z" fill="#b91c1c" stroke="#991b1b" stroke-width="0.5" />\n${baseEnd}`;
    case 4:
      return `${baseStart}\n    <!-- Gorro de Dormir -->\n    <path id="gorro-cono" d="M-75,25 Q-85,15 -88,24 Q-82,27 -74,27 Z" fill="#3b82f6" />\n    <circle id="gorro-pompon" cx="-88" cy="24" r="2.5" fill="#f8fafc" />\n${baseEnd}`;
    case 5:
      return `${baseStart}\n    <!-- Peluche Pez -->\n    <path id="peluche-cuerpo" d="M-55,42 C-48,46 -46,38 -55,42 Z M-48,40 L-45,37 L-45,43 Z" fill="#06b6d4" />\n${baseEnd}`;
    case 6:
      return `${baseStart}\n    <!-- Orejeras -->\n    <circle id="orejera-l" cx="-75" cy="33" r="3" fill="#10b981" />\n    <circle id="orejera-r" cx="-61" cy="33" r="3" fill="#10b981" />\n    <path id="orejeras-vincha" d="M-75,30 C-75,22 -61,22 -61,30" stroke="#10b981" stroke-width="1.2" fill="none" />\n${baseEnd}`;
    case 7:
      return `${baseStart.replace(/fill="#18181b"/g, 'fill="none" stroke="#06b6d4" stroke-width="1"').replace(/fill="#f4f4f5"/g, 'fill="none" stroke="#22d3ee" stroke-width="0.5" stroke-dasharray="2 1"')}\n${baseEnd}`;
    case 8:
      return `${baseStart}\n    <!-- Pixel Art -->\n    <rect x="-60" y="28" width="4" height="4" fill="#a1a1aa" opacity="0.3" />\n${baseEnd}`;
    default:
      return `${baseStart}\n${baseEnd}`;
  }
}

// React component rendering the variant FULLY ANIMATED
function AnimatedVariantPreview({ id }: { id: number }) {
  const isCyber = id === 7;
  const bodyColor = isCyber ? "none" : "#18181b";
  const bodyStroke = isCyber ? "#06b6d4" : "none";
  const bodyStrokeWidth = isCyber ? 1 : 0;
  
  const bellyColor = isCyber ? "none" : "#f4f4f5";
  const bellyStroke = isCyber ? "#22d3ee" : "none";
  const bellyStrokeWidth = isCyber ? 0.5 : 0;
  const bellyDash = isCyber ? "2 1" : "none";

  const renderZs = () => (
    <g id="sueno-zs" transform="translate(-67.91, 19.303)">
      <motion.text
        x="0" y="0"
        fill="#ef4444"
        fontSize="4.5"
        fontWeight="bold"
        fontFamily="monospace"
        animate={{ opacity: [0, 0.9, 0], y: [-1, -16], x: [0, 2, -2, 0], scale: [0.7, 1.2] }}
        transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
      >
        z
      </motion.text>
      <motion.text
        x="3" y="-3"
        fill="#ef4444"
        fontSize="5.5"
        fontWeight="bold"
        fontFamily="monospace"
        animate={{ opacity: [0, 0.8, 0], y: [-3, -25], x: [0, -3, 3, 0], scale: [0.8, 1.3] }}
        transition={{ repeat: Infinity, duration: 3, ease: "easeInOut", delay: 1 }}
      >
        z
      </motion.text>
    </g>
  );

  return (
    <svg viewBox="0 0 200 120" className="w-full h-full">
      <rect width="200" height="120" fill="#000000" />
      <g id="pinguino-contenedor" transform="matrix(1, 0, 0, 1, 99.815317, 50.407472)">
        <motion.g
          animate={{ x: [0, 0.4, 0], y: [0, -0.4, 0] }}
          transition={{ repeat: Infinity, duration: 3.2, ease: "easeInOut" }}
        >
          {/* Base body shapes */}
          <ellipse cx="-47.91" cy="37.303" rx="20" ry="14" fill={bodyColor} stroke={bodyStroke} strokeWidth={bodyStrokeWidth} />
          <ellipse cx="-49.91" cy="31.303" rx="14" ry="8" fill={bellyColor} stroke={bellyStroke} strokeWidth={bellyStrokeWidth} strokeDasharray={bellyDash} />
          <circle cx="-67.91" cy="33.303" r="10" fill={bodyColor} stroke={bodyStroke} strokeWidth={bodyStrokeWidth} />
          
          <g id="bufanda" transform="matrix(1, 0, 0, 1, -51.910336, 17.303471)">
            <path d="M -14.315 26.443 C -12.315 20.443 -3.738 18.577 -6.624 13.624" stroke="#ef4444" strokeWidth="2.2" fill="none" strokeLinecap="round"></path>
            <path d="M -7.663 13.49 C -2.663 12.49 3 11 7 9 C 5 7 0.204 10.408 -6.796 12.408 L -7.663 13.49 Z" fill="#ef4444"></path>
            <path d="M -6.929 14.898 C -1.929 14.898 2 14 5 13 C 3 11 -0.337 13.357 -7.337 13.357 L -6.929 14.898 Z" fill="#b91c1c"></path>
          </g>
          
          <path d="M -70.91 31.303 C -68.91 33.303 -66.91 33.303 -64.91 31.303" stroke="#a1a1aa" strokeWidth="1.2" fill="none" strokeLinecap="round"></path>
          <polygon points="-70.91 26.303 -67.91 19.303 -64.91 26.303" fill="#f59e0b"></polygon>
          
          {/* Variant-specific visuals */}
          {id === 2 && (
            <>
              <rect x="-74" y="29" width="13" height="6" fill="#1e3a8a" rx="2" stroke="#3b82f6" strokeWidth={0.5} />
              <circle cx="-71" cy="32" r="1" fill="#f8fafc" />
              <circle cx="-67" cy="32" r="1" fill="#f8fafc" />
            </>
          )}

          {id === 3 && (
            <path d="M-60,34 C-45,20 -28,26 -35,42 C-40,46 -55,47 -60,34 Z" fill="#b91c1c" stroke="#991b1b" strokeWidth={0.5} />
          )}

          {id === 4 && (
            <>
              <path d="M-75,25 Q-85,15 -88,24 Q-82,27 -74,27 Z" fill="#3b82f6" />
              <circle cx="-88" cy="24" r="2.5" fill="#f8fafc" />
            </>
          )}

          {id === 5 && (
            <path d="M-55,42 C-48,46 -46,38 -55,42 Z M-48,40 L-45,37 L-45,43 Z" fill="#06b6d4" />
          )}

          {id === 6 && (
            <>
              <circle cx="-75" cy="33" r="3" fill="#10b981" />
              <circle cx="-61" cy="33" r="3" fill="#10b981" />
              <path d="M-75,30 C-75,22 -61,22 -61,30" stroke="#10b981" strokeWidth="1.2" fill="none" />
            </>
          )}

          {id === 8 && (
            <rect x="-60" y="28" width="4" height="4" fill="#a1a1aa" opacity="0.3" />
          )}

          {/* Animated sleep bubble */}
          <motion.circle
            id="burbuja-sueno"
            cx="-67.91"
            cy="19.303"
            fill="#38bdf8"
            fillOpacity={0.25}
            stroke="#0284c7"
            strokeWidth={0.8}
            animate={{
              r: [1, 7, 1],
              cx: [-67.91, -67.91, -67.91],
              cy: [19.303, 13.303, 19.303]
            }}
            transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
          />

          <g id="patas" transform="matrix(1, 0, 0, 1, -51.910336, 17.303471)">
            <path d="M18,13 L26,11 L25,18 Z" fill="#f59e0b"></path>
            <path d="M20,22 L28,24 L25,30 Z" fill="#f59e0b"></path>
          </g>
          
          <path d="M -56.369 37.201 C -57.631 41.252 -39.926 36.511 -37.926 32.511" strokeWidth="2.5" strokeLinecap="round" stroke={isCyber ? "#06b6d4" : "black"} fill="none"></path>
          {renderZs()}
        </motion.g>
      </g>
    </svg>
  );
}

export default function SimplePlaygroundPage() {
  const router = useRouter();
  const [selectedVariant, setSelectedVariant] = useState(1);
  const [status, setStatus] = useState<{ type: 'idle' | 'success' | 'error'; message: string }>({
    type: 'idle',
    message: ''
  });

  const VARIANTS = [
    { id: 1, name: 'v1: Original' },
    { id: 2, name: 'v2: Antifaz' },
    { id: 3, name: 'v3: Manta' },
    { id: 4, name: 'v4: Gorro' },
    { id: 5, name: 'v5: Peluche' },
    { id: 6, name: 'v6: Orejeras' },
    { id: 7, name: 'v7: Cyber' },
    { id: 8, name: 'v8: Pixel' }
  ];

  const handleCopyVariant = async (id: number) => {
    const code = getVariantStaticSvg(id);
    try {
      await navigator.clipboard.writeText(code);
      setSelectedVariant(id);
      setStatus({ type: 'success', message: `Copiado v${id}` });
      setTimeout(() => setStatus({ type: 'idle', message: '' }), 1500);
    } catch (err) {
      setStatus({ type: 'error', message: 'No se pudo copiar.' });
    }
  };

  return (
    <div className="h-screen w-screen bg-[#050508] text-zinc-200 flex flex-col p-4 md:p-6 font-sans overflow-hidden">
      
      {/* Top Header */}
      <header className="flex justify-between items-center shrink-0 border-b border-zinc-900 pb-3 mb-4">
        <div>
          <h1 className="text-xs font-mono uppercase tracking-wider text-emerald-400 font-bold">
            Playground — Escena 1 (Composición)
          </h1>
          <p className="text-[9px] text-zinc-500 uppercase tracking-widest">
            Pingüino Durmiendo (Asset: 200 x 120)
          </p>
        </div>
        <div className="flex items-center space-x-3">
          {status.message && (
            <span className="text-[9px] font-mono px-2 py-0.5 rounded border bg-emerald-950/20 border-emerald-900/40 text-emerald-400">
              {status.message}
            </span>
          )}
          <button
            onClick={() => router.push('/game/playground')}
            className="text-[9px] font-mono border border-zinc-800 px-2.5 py-1 text-zinc-400 hover:text-emerald-400 hover:border-emerald-500/50 transition rounded cursor-pointer active:scale-95"
          >
            Menú de Escenas
          </button>
          <button
            onClick={() => router.push('/game/narrative')}
            className="text-[9px] font-mono border border-zinc-800 px-2.5 py-1 text-zinc-400 hover:text-emerald-400 hover:border-emerald-500/50 transition rounded cursor-pointer active:scale-95"
          >
            Volver al Juego
          </button>
        </div>
      </header>

      {/* Symmetrical Two-Box Split Layout occupying full remaining height */}
      <div className="flex-1 flex flex-col md:flex-row gap-6 items-stretch justify-center min-h-0 w-full max-w-7xl mx-auto pb-2">
        
        {/* 1. LEFT BOX: The Scene Canvas (Stretches to full height, maintains 16:9 illustration box) */}
        <div className="flex-1 md:w-1/2 bg-zinc-950/40 border border-zinc-900 rounded p-4 flex flex-col justify-between min-h-0 shadow-xl">
          
          <div className="border-b border-zinc-900/60 pb-2 flex justify-between items-center shrink-0">
            <span className="text-[9px] font-mono uppercase tracking-widest text-zinc-400 font-bold">
              Escena Principal (Simulada)
            </span>
            <span className="text-[8px] font-mono text-zinc-500 uppercase">
              16:9 ratio
            </span>
          </div>

          {/* Symmetrical 16:9 Illustration Box (Centered vertically, fills container width) */}
          <div className="flex-1 flex items-center justify-center py-4 min-h-0 overflow-hidden">
            <div className="relative w-full aspect-video rounded border border-zinc-900/60 overflow-hidden bg-black shadow-2xl">
              <Scene1Sleeping />
            </div>
          </div>

          <div className="h-6 flex items-center justify-between border-t border-zinc-900/60 pt-2 shrink-0">
            <span className="text-[8px] font-mono text-zinc-500 uppercase tracking-widest">
              Canvas: 200 x 120
            </span>
            <span className="text-[8px] font-mono text-zinc-600">
              Sutil brillo azul
            </span>
          </div>

        </div>

        {/* 2. RIGHT BOX: Grid of 8 variants (Scrollable inside the panel) */}
        <div className="flex-1 md:w-1/2 bg-zinc-950/40 border border-zinc-900 rounded p-4 flex flex-col justify-between min-h-0 shadow-xl">
          
          <div className="border-b border-zinc-900/60 pb-2 flex justify-between items-center shrink-0">
            <div>
              <h2 className="text-[9px] font-mono uppercase tracking-widest text-zinc-400 font-bold">
                Generaciones del Asset
              </h2>
            </div>
            <span className="text-[8px] text-zinc-500 uppercase font-mono">
              8 Variantes Disponibles
            </span>
          </div>

          {/* Symmetrical Middle Area - Scrollable Grid of 8 cards */}
          <div className="flex-1 min-h-0 w-full overflow-y-auto custom-scrollbar py-4">
            <div className="w-full grid grid-cols-2 lg:grid-cols-4 gap-2.5 min-h-0 select-none">
              {VARIANTS.map((v) => {
                const isSelected = selectedVariant === v.id;
                return (
                  <div
                    key={v.id}
                    className={`flex flex-col justify-between bg-[#0b0b0e] border rounded p-2 text-left relative ${
                      isSelected
                        ? 'border-emerald-500/50 bg-emerald-500/5'
                        : 'border-zinc-900'
                    }`}
                  >
                    <div className="flex justify-between items-center w-full mb-1 shrink-0">
                      <span className={`text-[8px] font-mono font-bold px-1.5 py-0.25 rounded ${
                        isSelected ? 'bg-emerald-500/10 text-emerald-400' : 'bg-zinc-900 text-zinc-500'
                      }`}>
                        v{v.id}
                      </span>
                      <span className="text-[7px] font-mono text-zinc-500 text-right truncate max-w-[55px]">
                        {v.name.split(':')[1]?.trim() || v.name}
                      </span>
                    </div>

                    {/* Animated Variant Preview Box (Standard aspect ratio thumbnail) */}
                    <div className="aspect-[200/120] w-full bg-black/40 border border-zinc-900/50 rounded flex items-center justify-center p-0.5 overflow-hidden shrink-0 mt-1">
                      <div className="w-full h-full scale-[0.95]">
                        <AnimatedVariantPreview id={v.id} />
                      </div>
                    </div>

                    {/* Separate Copy Button inside the card */}
                    <button
                      onClick={() => handleCopyVariant(v.id)}
                      className={`w-full text-center py-1 text-[8px] font-mono uppercase font-bold tracking-wider rounded transition mt-2 cursor-pointer shrink-0 active:scale-95 ${
                        isSelected
                          ? 'bg-emerald-500 text-zinc-950 hover:bg-emerald-400'
                          : 'bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-emerald-400 hover:border-emerald-500/30'
                      }`}
                    >
                      Copiar SVG
                    </button>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="h-6 flex items-center border-t border-zinc-900/60 pt-2 shrink-0">
            <p className="text-[8px] font-mono text-zinc-500 uppercase tracking-widest leading-relaxed">
              * Haz clic en "Copiar SVG" para exportar esa variante a tu editor de código.
            </p>
          </div>

        </div>

      </div>
    </div>
  );
}
