'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import Scene6Glow from '../../components/scene_6_glow';

// Configuración del resplandor de las aletas para la exportación estática
const GLOW_CONFIGS: Record<number, {
  colorStart: string;
  colorMiddle: string;
  colorEnd: string;
  glowFilter: string;
}> = {
  1: { colorStart: '#34d399', colorMiddle: '#059669', colorEnd: '#064e3b', glowFilter: 'drop-shadow(0 0 10px #34d399)' },
  2: { colorStart: '#4ade80', colorMiddle: '#16a34a', colorEnd: '#14532d', glowFilter: 'drop-shadow(0 0 10px #4ade80)' },
  3: { colorStart: '#fbbf24', colorMiddle: '#d97706', colorEnd: '#78350f', glowFilter: 'drop-shadow(0 0 10px #fbbf24)' },
  4: { colorStart: '#38bdf8', colorMiddle: '#0284c7', colorEnd: '#0c4a6e', glowFilter: 'drop-shadow(0 0 10px #38bdf8)' },
  5: { colorStart: '#22d3ee', colorMiddle: '#0891b2', colorEnd: '#164e63', glowFilter: 'drop-shadow(0 0 10px #22d3ee)' }, // Cyan/Mágico
  6: { colorStart: '#818cf8', colorMiddle: '#4f46e5', colorEnd: '#312e81', glowFilter: 'drop-shadow(0 0 10px #818cf8)' },
  7: { colorStart: '#cbd5e1', colorMiddle: '#64748b', colorEnd: '#1e293b', glowFilter: 'drop-shadow(0 0 10px #cbd5e1)' },
  8: { colorStart: '#fbbf24', colorMiddle: '#ca8a04', colorEnd: '#854d0e', glowFilter: 'drop-shadow(0 0 10px #fbbf24)' },
};

// Generar código SVG estático limpio para exportar al portapapeles
function getScene6StaticSvg(glowVariantId: number): string {
  const glowConfig = GLOW_CONFIGS[glowVariantId] || GLOW_CONFIGS[5];

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 120" width="200px" height="120px">
  <defs>
    <!-- Gradiente Ojo Blanco Metálico/Plata -->
    <radialGradient id="white-eye-grad" cx="50%" cy="50%" r="50%">
      <stop offset="0" stop-color="#ffffff"/>
      <stop offset="0.7" stop-color="#f8fafc"/>
      <stop offset="1" stop-color="#cbd5e1"/>
    </radialGradient>
    
    <!-- Gradiente dinámico de resplandor para las manos -->
    <radialGradient id="hand-glow-grad" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="${glowConfig.colorStart}" stop-opacity="1" />
      <stop offset="50%" stop-color="${glowConfig.colorMiddle}" stop-opacity="0.65" />
      <stop offset="100%" stop-color="${glowConfig.colorEnd}" stop-opacity="0" />
    </radialGradient>
  </defs>

  <rect width="200" height="120" fill="#000000" x="0" y="0" />

  <!-- 1. Protagonista mirando hacia abajo en el centro -->
  <g id="protagonista-contenedor" transform="matrix(0.796426, 0, 0, 0.829579, 101.277, 8.853)">
    <g id="protagonista-posicion" transform="matrix(0, 0.848747, -0.768697, 0, 35, 115)">
      <g id="protagonista-respiracion">
        <!-- Patas -->
        <g id="protagonista-patas" transform="matrix(1, 0, 0, 1, -51.910336, 17.303471)">
          <path id="protagonista-pata-inferior" d="M 22.869 24.905 L 23.057 31.616 L 15.692 28.426 L 22.869 24.905 Z" fill="#f59e0b"/>
        </g>
        <g id="protagonista-patas-superior">
          <path id="protagonista-pata-superior" d="M -35.622 35.869 L -29.033 32.462 L -29.063 39.564 L -35.622 35.869 Z" fill="#f59e0b"/>
        </g>

        <!-- Cuerpo del Protagonista -->
        <ellipse id="protagonista-cuerpo" cx="-52.831" cy="41.022" rx="20" ry="14" fill="#18181b" />
        <ellipse id="protagonista-vientre" cx="-54.21" cy="39.739" rx="14" ry="7.999" fill="#f4f4f5" style="transform-box: fill-box; transform-origin: 50% 50%;" transform="matrix(0.999912, -0.013232, 0.010004, 0.999955, -0.505833, 1.163667)" />
        
        <!-- Cabeza del Protagonista -->
        <circle id="protagonista-cabeza" cx="-80.174" cy="41.967" r="10" fill="#18181b" />

        <!-- Bufanda del Protagonista -->
        <g id="protagonista-bufanda" transform="matrix(1, 0, 0, 1, -51.910336, 17.303471)">
          <path id="protagonista-bufanda-cuello" d="M -19.205 29.546 C -17.205 23.546 -17.229 23.62 -19.862 18.279" stroke="#ef4444" stroke-width="2.2" fill="none" stroke-linecap="round" />
          <path id="protagonista-bufanda-caida-roja" d="M -16.769 24.06 C -11.769 23.06 -14.875 24.867 -7.755 23.934 C -12.791 23.485 -10.167 20.493 -17.167 22.493 L -16.769 24.06 Z" fill="#ef4444" />
          <path id="protagonista-bufanda-caida-guinda" d="M -17.131 26.05 C -13.649 23.432 -11.491 26.897 -8.491 25.897 C -10.491 23.897 -12.226 24.897 -16.612 24.024 L -17.131 26.05 Z" fill="#b91c1c" />
        </g>

        <!-- Ojos del Protagonista mirando hacia abajo -->
        <g id="protagonista-ojo-izquierdo" transform="matrix(1, 0, 0, 1, -12.964486, 12.089528)">
          <circle id="protagonista-ojo-izq-borde" cx="-67.91" cy="33.303" r="2.2" fill="#f4f4f5"/>
          <circle id="protagonista-ojo-izq-pupila" cx="-66.903" cy="33.255" r="1.019" fill="#000000"/>
        </g>
        <g id="protagonista-ojo-derecho" transform="matrix(1, 0, 0, 1, -13.406372, 4.79269)">
          <circle id="protagonista-ojo-der-borde" cx="-67.91" cy="33.303" r="2.2" fill="#f4f4f5"/>
          <circle id="protagonista-ojo-der-pupila" cx="-66.692" cy="33.174" r="1.019" fill="#000000"/>
        </g>

        {/* Pico apuntando hacia abajo */}
        <polygon id="protagonista-pico" points="-78.432 41.582 -75.432 38.14 -75.384 44.735" fill="#f59e0b" />

        {/* Sus dos aletas posicionadas al frente, sosteniendo el resplandor */}
        <g id="protagonista-aletas">
          <path id="protagonista-aleta-izq" d="M -65.559 48.643 C -66.821 52.694 -40.685 47.857 -49.73 42.79" stroke-width="2.5" stroke-linecap="round" stroke="rgb(0, 0, 0)" fill="none" />
          <path id="protagonista-aleta-der" d="M -66.114 33.119 C -67.376 29.926 -40.396 32.693 -50.116 38.658" stroke-width="2.5" stroke-linecap="round" stroke="rgb(0, 0, 0)" fill="none" style="stroke-width: 2.5;" />
        </g>
      </g>
    </g>
  </g>

  <!-- 2. El Resplandor Mágico en sus manos -->
  <g id="resplandor-magico" style="mix-blend-mode: screen;">
    <circle cx="104" cy="58" r="16" fill="url(#hand-glow-grad)" style="filter: ${glowConfig.glowFilter};" />
    <circle cx="104" cy="58" r="3" fill="#ffffff" />
    <!-- Partículas estáticas -->
    <circle cx="100" cy="52" r="1.4" fill="${glowConfig.colorStart}" opacity="0.8" />
    <circle cx="108" cy="48" r="1.4" fill="${glowConfig.colorStart}" opacity="0.6" />
    <circle cx="103" cy="42" r="1.4" fill="${glowConfig.colorStart}" opacity="0.7" />
    <circle cx="107" cy="54" r="1.4" fill="${glowConfig.colorStart}" opacity="0.5" />
  </g>

  <!-- 3. El Ojo Subconsciente observando al protagonista desde arriba -->
  <g id="ojo-subconsciente-grupo" transform="matrix(-0.49031, 0, 0, 0.488349, 101.288, 26.079)">
    <g id="ojo-subconsciente-flotacion">
      <circle id="ojo-glow" cx="1.961" cy="-10.68" r="18" fill="#ffffff" opacity="0.08" transform="matrix(1.726518, 0, 0, 1.106832, -9.235068, 0.649597)" />
      <circle id="ojo-esclera" cx="3.705" cy="-5.231" r="10.925" fill="url(#white-eye-grad)" stroke-width="0.5" stroke="#e2e8f0" style="transform-origin: 3.705px -5.231px;" transform="matrix(1.29319, -0.463554, 0.663729, 1.046532, -8.874192, -6.849365)" />
      <path id="ojo-trazo-luz" style="fill: none; stroke: rgb(255, 255, 255); stroke-width: 0.489; transform-box: fill-box; transform-origin: 50% 50%;" d="M -36.019 -8.803 C -35.797 -10.37 3.97 -37.752 -3.682 -36.216 C -9.163 -35.116 19.986 -17.875 23.111 -7.302" opacity="0.8" />
      <g id="ojo-pupila-grupo-interno">
        <circle id="ojo-pupila-centro" cx="-4.5" cy="-8.0" r="6.2" fill="#0f172a" />
        <circle id="ojo-pupila-brillo" cx="-4.8" cy="-1.8" r="1.5" fill="#ffffff" transform="matrix(-1.397505, 0, 0, 1.944474, -11.501339, -1.758476)" />
      </g>
    </g>
  </g>
</svg>`;
}

export default function Scene6PlaygroundPage() {
  const router = useRouter();
  
  // Customizer state
  const [selectedVariant, setSelectedVariant] = useState(5); // Por defecto resplandor cyan/mágico
  
  const [status, setStatus] = useState<{ type: 'idle' | 'success' | 'error'; message: string }>({
    type: 'idle',
    message: ''
  });

  const handleCopyToClipboard = () => {
    try {
      const svgCode = getScene6StaticSvg(selectedVariant);
      navigator.clipboard.writeText(svgCode);
      setStatus({
        type: 'success',
        message: '¡Código SVG estático de la Escena 6 copiado al portapapeles!'
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

  const VARIANTS = [
    { id: 1, name: 'Resplandor Esmeralda', desc: 'Verde esmeralda mágico y curativo' },
    { id: 2, name: 'Resplandor Verde Bosque', desc: 'Verde vivo natural y orgánico' },
    { id: 3, name: 'Resplandor Ámbar Cálido', desc: 'Naranja fuego concentrado' },
    { id: 4, name: 'Resplandor Gélido Ártico', desc: 'Celeste hielo frío y brillante' },
    { id: 5, name: 'Resplandor Cyan Mágico', desc: 'Cyan puro del subconsciente (Recomendado)' },
    { id: 6, name: 'Resplandor Neon Índigo', desc: 'Púrpura/azul nocturno de alta frecuencia' },
    { id: 7, name: 'Resplandor Plateado', desc: 'Blanco plateado metálico celestial' },
    { id: 8, name: 'Resplandor Dorado', desc: 'Oro puro radiante majestuoso' },
  ];

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
              Escena 6 — El Despertar del Protagonista
            </p>
            <p className="text-xs text-zinc-500">
              El protagonista mira sus manos emisoras de energía mágica, bajo la observación del Ojo Blanco.
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
                <Scene6Glow 
                  glowVariantId={selectedVariant}
                />
              </div>

              {/* Indicador de Escena */}
              <div className="absolute top-4 left-4 bg-zinc-900/80 border border-zinc-800/80 px-2 py-1 rounded text-[10px] font-mono text-zinc-500 select-none">
                VISTA PREVIA DE ESCENA 6
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

          {/* Columna Derecha: Panel de Personalización (1/3 de ancho en lg) */}
          <div className="bg-zinc-950/40 border border-zinc-900 rounded-lg p-5 flex flex-col gap-6 backdrop-blur-sm shadow-xl overflow-y-auto max-h-[600px] custom-scrollbar">
            
            <div>
              <h2 className="text-sm font-bold text-white tracking-wide mb-1 uppercase font-mono text-emerald-400">
                Ajustes de Resplandor Mágico
              </h2>
              <p className="text-[11px] text-zinc-500">
                Selecciona la variante de color de la energía que emite el protagonista de sus manos.
              </p>
            </div>

            {/* Selector de Patrón de Camuflaje */}
            <div className="space-y-3">
              <label className="text-[11px] font-mono uppercase tracking-wider text-zinc-400 block font-bold">
                Tonalidad de la Energía
              </label>
              <div className="grid grid-cols-1 gap-2">
                {VARIANTS.map((v) => (
                  <button
                    key={v.id}
                    onClick={() => setSelectedVariant(v.id)}
                    className={`p-2.5 rounded text-left border transition flex flex-col gap-0.5 ${
                      selectedVariant === v.id
                        ? 'bg-emerald-500/10 border-emerald-500/50 text-white shadow-md'
                        : 'bg-zinc-950/80 border-zinc-900 text-zinc-400 hover:border-zinc-800'
                    }`}
                  >
                    <span className="text-xs font-bold">{v.name}</span>
                    <span className="text-[9px] text-zinc-600 leading-snug">{v.desc}</span>
                  </button>
                ))}
              </div>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}
