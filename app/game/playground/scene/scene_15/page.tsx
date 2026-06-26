'use client';

import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import Scene15DripPricing from '../../components/scene_15_drip_pricing';

export default function Scene15PlaygroundPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen w-screen bg-[#050508] text-zinc-200 flex flex-col p-4 md:p-8 font-sans overflow-y-auto custom-scrollbar">
      
      <div className="absolute top-0 left-1/4 w-[400px] h-[400px] bg-sky-500/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-indigo-500/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-6xl w-full mx-auto flex-1 flex flex-col relative z-10">
        
        <header className="flex flex-col md:flex-row justify-between items-start md:items-center border-b border-zinc-900 pb-4 mb-6 shrink-0 gap-4">
          <div className="space-y-1">
            <h1 className="text-xs font-mono uppercase tracking-widest text-sky-400 font-bold">
              Playground de Animación
            </h1>
            <p className="text-xl font-bold tracking-tight text-white">
              Escena 15 — Camo y el Drip Pricing
            </p>
            <p className="text-xs text-zinc-500">
              Camo descansa en su sillón mientras el Patrón Oscuro se esconde en su celular.
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

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 flex-1 items-start mb-6">

          {/* Ilustración principal */}
          <div className="lg:col-span-7">
            <div className="min-h-[320px] bg-zinc-950/80 border border-zinc-900 rounded-lg p-6 flex items-center justify-center relative overflow-hidden backdrop-blur-sm shadow-2xl">
              <div className="w-full aspect-video">
                <Scene15DripPricing />
              </div>
              <div className="absolute top-4 left-4 bg-zinc-900/80 border border-zinc-800/80 px-2 py-1 rounded text-[10px] font-mono text-zinc-500 select-none">
                BOCETO VECTORIAL — ESCENA 15
              </div>
            </div>
          </div>

          {/* Panel de información */}
          <div className="lg:col-span-5 bg-zinc-950/50 border border-zinc-900 rounded-lg p-6 flex flex-col gap-4 backdrop-blur-sm shadow-xl">
            <div>
              <span className="text-[10px] font-mono uppercase tracking-widest text-sky-400 font-bold block mb-1">
                Descripción de la Escena
              </span>
              <h2 className="text-base font-bold text-white tracking-tight">
                El Sillón y el Celular
              </h2>
            </div>

            <div className="space-y-3 text-xs text-zinc-400 leading-relaxed">
              <p>
                Camo reposa en su sillón táctico mientras navega el proceso de compra de su iglú de ensueño. En la pantalla de su celular, oculto entre términos y condiciones, el Patrón Oscuro ha activado el <span className="text-sky-300 font-bold">Drip Pricing</span>: un seguro anti-bombardeo atómico pre-marcado por 19.99€/mes.
              </p>
              <p>
                Camo no lo ha notado aún. Presiona "siguiente" sin leer, confiado de que el proceso es el mismo de siempre.
              </p>
            </div>

            <div className="mt-auto pt-4 border-t border-zinc-900">
              <motion.button
                onClick={() => router.push('/game/playground/scene/scene_16')}
                className="w-full px-4 py-2.5 text-xs font-bold rounded-lg bg-sky-700 hover:bg-sky-600 text-white shadow-lg active:scale-95 transition"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Ver Escena 16 → Zoom del Celular
              </motion.button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
