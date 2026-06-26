'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import Scene14Batalla from '../../components/scene_14_batalla';

// Generar código SVG estático limpio para exportar al portapapeles
function getScene14StaticSvg(): string {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 120" width="200px" height="120px">
  <defs>
    <pattern id="teselacion-enemigo" width="40" height="40" patternUnits="userSpaceOnUse" patternTransform="matrix(0.999888, 0.017041, -0.013154, 0.999888, 3.179298, -3.381333)">
      <polygon points="0,0 20,10 20,30 0,20" fill="#111827" stroke="#020408" stroke-width="0.5"/>
      <polygon points="20,10 40,0 40,20 20,30" fill="#1f2937" stroke="#020408" stroke-width="0.5"/>
      <polygon points="0,20 20,30 20,40 0,40" fill="#0f172a" stroke="#020408" stroke-width="0.5"/>
      <polygon points="20,30 40,20 40,40 20,40" fill="#1e1b4b" stroke="#020408" stroke-width="0.5"/>
    </pattern>
    <radialGradient id="grad-fondo-batalla" cx="65%" cy="40%" r="65%">
      <stop offset="0%" stop-color="#06b6d4" stop-opacity="0.28"/>
      <stop offset="50%" stop-color="#1e1b4b" stop-opacity="0.12"/>
      <stop offset="100%" stop-color="#05040a" stop-opacity="1"/>
    </radialGradient>
    <radialGradient id="halo-energia" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="#22d3ee" stop-opacity="0.4"/>
      <stop offset="50%" stop-color="#06b6d4" stop-opacity="0.15"/>
      <stop offset="100%" stop-color="#06b6d4" stop-opacity="0"/>
    </radialGradient>
  </defs>
  <rect width="200" height="120" fill="url(#grad-fondo-batalla)" id="rect-fondo"/>
  <g id="dispositivo-zoom-contenedor" transform="matrix(0.204386, 0, 0, 0.179566, 109.414691, 19.192984)">
    <path id="tentaculo-izq" d="M 76.803 196.156 C 71.563 178.814 115.955 225.818 91.894 280.699" stroke-linecap="round" stroke="#000000" fill="none" style="transform-box: fill-box; transform-origin: 50% 50%; stroke-width: 10.418px;" transform="matrix(0, 1.138222, -0.878563, 0, 0.000028, -0.00001)"/>
    <polygon id="patron-rombo-cuerpo" points="128.429 358.794 101.59 118.309 301.567 121.718 268.414 361.179" fill="url(#teselacion-enemigo)" stroke="#06b6d4" stroke-width="2.5"/>
    <polygon id="patron-rombo-nucleo" points="155.035 148.511 180.035 168.511 155.035 188.511 130.035 168.511" fill="#22d3ee"/>
    <line id="patron-nucleo-linea" x1="148.611" y1="158.732" x2="155.035" y2="182.988" stroke="#020408" stroke-width="3"/>
    <path id="tentaculo-der" d="M 116.335 196.849 C 111.095 179.508 166.823 207.174 115.253 292.447" stroke-linecap="round" stroke="#000000" fill="none" style="stroke-width: 10.418px; transform-box: fill-box; transform-origin: 50% 50%;" transform="matrix(0, 1.138222, -0.878563, 0, -0.000013, 0.000012)"/>
    <path id="brillo-reflejo" d="M 386.098 120.481 C 434.242 133.117 400.957 140.502 385.262 152.43" stroke-linecap="round" style="fill: none; stroke: #ffffff; transform-origin: 273.549px -7.507px; stroke-width: 5.20898px;" transform="matrix(0, 1.138222, -0.878563, 0, -0.000058, 0.000053)"/>
  </g>
  <g id="pinguino-contenedor" transform="matrix(0, 0.848747, -0.768697, 0, 76.463808, 104.227954)">
    <path id="cola" d="M -57.788 25.808 C -59.05 29.859 -48.36 18.879 -54.154 6.059" stroke-width="2.5" stroke-linecap="round" stroke="#000000" fill="none"/>
    <path id="pata-superior" d="M -32.417 31.796 L -25.744 26.644 L -25.774 33.746 L -32.417 31.796 Z" fill="#f59e0b"/>
    <ellipse id="cuerpo" cx="-47.91" cy="37.303" rx="20" ry="14" fill="#18181b"/>
    <ellipse id="vientre" cx="-49.91" cy="31.303" rx="14" ry="8" fill="#f4f4f5"/>
    <circle id="cabeza" cx="-67.91" cy="33.303" r="10" fill="#18181b"/>
    <g id="bufanda" transform="matrix(1, 0, 0, 1, -51.910336, 17.303471)">
      <path id="bufanda-cuello" d="M -14.315 26.443 C -12.315 20.443 -3.738 18.577 -6.624 13.624" stroke="#ef4444" stroke-width="2.2" fill="none" stroke-linecap="round"/>
      <path id="bufanda-caida-roja" d="M -7.663 13.49 C -2.663 12.49 3 11 7 9 C 5 7 0.204 10.408 -6.796 12.408 L -7.663 13.49 Z" fill="#ef4444"/>
      <path id="bufanda-caida-guinda" d="M -6.929 14.898 C -1.929 14.898 2 14 5 13 C 3 11 -0.337 13.357 -7.337 13.357 L -6.929 14.898 Z" fill="#b91c1c"/>
    </g>
    <g id="ojo">
      <circle id="ojo-borde" cx="-67.91" cy="33.303" r="2.2" fill="#f4f4f5"/>
      <circle id="ojo-pupila" cx="-68.196" cy="31.871" r="1.019" fill="#000000"/>
    </g>
    <polygon id="pico" points="-70.91 26.303 -67.91 19.303 -64.91 26.303" fill="#f59e0b"/>
    <g id="patas" transform="matrix(1, 0, 0, 1, -51.910336, 17.303471)">
      <path id="pata-inferior" d="M 26.663 20.735 L 26.851 27.446 L 19.486 24.256 L 26.663 20.735 Z" fill="#f59e0b"/>
    </g>
    <g id="aleta-grupo">
      <path id="aleta" d="M -56.369 37.201 C -56 42 -40 37 -56.6 14.8" stroke-width="2.5" stroke-linecap="round" stroke="#000000" fill="none"/>
    </g>
    <path id="reflejo-cabeza" d="M -73.439 29.591 C -69.243 32.171 -72.144 33.677 -73.512 36.113" stroke-width="0.77" stroke-linecap="round" fill="none" stroke="#ffffff"/>
  </g>
</svg>`;
}

interface DecisionOption {
  id: number;
  text: string;
}

export default function Scene14PlaygroundPage() {
  const router = useRouter();
  const [chosenId, setChosenId] = useState<number | null>(null);
  const [isNavigating, setIsNavigating] = useState(false);
  const [status, setStatus] = useState<{ type: 'idle' | 'success' | 'error'; message: string }>({
    type: 'idle',
    message: ''
  });

  const options: DecisionOption[] = [
    {
      id: 1,
      text: 'Tomas desesperadamente el celular y presionas "todos los botones", lo único que piensas en este momento es en ti, tu iglú, y la mejor cama de hielo en el polo sur.'
    },
    {
      id: 2,
      text: 'Respiras, te calmas, y te fijas que la mayoría de los botones y anuncios tienen un diseño distinto al resto del tema de la página, entiendes que están "sigilosamente" "persuadiéndote" con "anuncios escondidos", te tomas tu tiempo y logras encontrar el botón que mantiene la temática de "Pinguilario inmobiliario".'
    },
    {
      id: 3,
      text: 'Luego de observar la cantidad de anuncios y botones que tiene la página, decides calmarte, regresar y buscar la vivienda por otros medios, entiendes que una casa tan buena debe estar disponible en otras páginas o medios de compra.'
    }
  ];

  const handleSelect = (id: number) => {
    setIsNavigating(true);
    setChosenId(id);
    setTimeout(() => {
      router.push(`/game/playground/scene/scene_14/resultado_${id}`);
    }, 1200); // Retraso para animación dramática y feedback táctil
  };

  const handleCopyToClipboard = () => {
    try {
      const svgCode = getScene14StaticSvg();
      navigator.clipboard.writeText(svgCode);
      setStatus({
        type: 'success',
        message: '¡Código SVG estático de la Escena 14 copiado al portapapeles!'
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
            <h1 className="text-xs font-mono uppercase tracking-widest text-cyan-400 font-bold">
              Playground de Animación y Decisiones
            </h1>
            <p className="text-xl font-bold tracking-tight text-white flex items-center gap-2">
              Escena 14 — La Batalla Mental (Toma de Decisiones)
            </p>
            <p className="text-xs text-zinc-500">
              Camo se enfrenta al Patrón Oscuro. Toma la decisión que definirá su destino.
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
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 flex-1 items-stretch mb-6">
          
          {/* Columna Izquierda: Preview de la Escena (5/12 de ancho) */}
          <div className="lg:col-span-5 flex flex-col gap-4">
            <div className="flex-1 min-h-[250px] bg-zinc-950/80 border border-zinc-900 rounded-lg p-6 flex items-center justify-center relative overflow-hidden backdrop-blur-sm shadow-2xl">
              
              {/* Animación SVG renderizada */}
              <div className="w-full aspect-video">
                <Scene14Batalla />
              </div>

              {/* Indicador de Escena */}
              <div className="absolute top-4 left-4 bg-zinc-900/80 border border-zinc-800/80 px-2 py-1 rounded text-[10px] font-mono text-zinc-500 select-none">
                BOCETO VECTORIAL DE BATALLA
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

          {/* Columna Derecha: Panel Interactivo de Decisiones (7/12 de ancho) */}
          <div className="lg:col-span-7 bg-zinc-950/50 border border-zinc-900 rounded-lg p-6 flex flex-col gap-6 backdrop-blur-sm shadow-xl relative overflow-hidden">
            <div>
              <span className="text-[10px] font-mono uppercase tracking-widest text-cyan-400 font-bold block mb-1">
                Batalla en Progreso
              </span>
              <h2 className="text-lg font-bold text-white tracking-tight">
                Elige la acción de Camo
              </h2>
              <p className="text-xs text-zinc-400 mt-1">
                El Patrón Oscuro está intentando aplicar la técnica de <strong className="text-cyan-300">Sneaking → Bait and Switch → Disguised Ads</strong> (Anuncios Disfrazados).
              </p>
            </div>

            <div className="flex-1 flex flex-col gap-4 justify-center relative">
              <AnimatePresence mode="wait">
                {!isNavigating ? (
                  <motion.div
                    key="options-selector"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="flex flex-col gap-3"
                  >
                    {options.map((opt) => (
                      <button
                        key={opt.id}
                        disabled={isNavigating}
                        onClick={() => handleSelect(opt.id)}
                        className="p-4 rounded-xl border border-zinc-900 bg-zinc-950/60 hover:bg-zinc-900/60 hover:border-zinc-800 text-left transition-all active:scale-[0.99] group flex gap-3 items-start disabled:opacity-50"
                      >
                        <span className="w-5 h-5 rounded-full bg-zinc-900 border border-zinc-800 text-[10px] font-bold font-mono text-zinc-500 flex items-center justify-center shrink-0 group-hover:border-cyan-500 group-hover:text-cyan-400 transition-colors">
                          {opt.id}
                        </span>
                        <span className="text-xs text-zinc-300 group-hover:text-white leading-relaxed transition-colors">
                          {opt.text}
                        </span>
                      </button>
                    ))}
                  </motion.div>
                ) : (
                  <motion.div
                    key="navigation-loader"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex flex-col items-center justify-center py-12 text-center space-y-4"
                  >
                    <div className="w-8 h-8 rounded-full border-2 border-cyan-500 border-t-transparent animate-spin" />
                    <div className="space-y-1">
                      <p className="text-sm font-bold text-white">Cargando consecuencias...</p>
                      <p className="text-xs text-zinc-500">Transicionando al desenlace de la opción {chosenId}</p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
