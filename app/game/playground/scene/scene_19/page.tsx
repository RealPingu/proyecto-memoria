'use client';

import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import Scene19CelularReference from '../../components/scene_19_celular_reference';

export default function Scene19PlaygroundPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen w-screen bg-[#050508] text-zinc-200 flex flex-col p-4 md:p-8 font-sans overflow-y-auto custom-scrollbar">
      
      <div className="absolute top-0 left-1/4 w-[400px] h-[400px] bg-blue-500/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-indigo-500/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-6xl w-full mx-auto flex-1 flex flex-col relative z-10">
        
        <header className="flex flex-col md:flex-row justify-between items-start md:items-center border-b border-zinc-900 pb-4 mb-6 shrink-0 gap-4">
          <div className="space-y-1">
            <h1 className="text-xs font-mono uppercase tracking-widest text-blue-400 font-bold">
              Playground de Animación
            </h1>
            <p className="text-xl font-bold tracking-tight text-white">
              Escena 19 — Selección de Plan (Celular en Grande)
            </p>
            <p className="text-xs text-zinc-500">
              Detalle en pantalla completa: comparación desbalanceada de tasas nominales vs efectivas.
            </p>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => router.push('/game/playground/scene/scene_18')}
              className="px-3 py-1.5 text-xs font-medium bg-zinc-950 border border-zinc-800 hover:border-zinc-700 text-zinc-400 hover:text-white rounded transition"
            >
              ← Escena 18
            </button>
            <button
              onClick={() => router.push('/game/playground')}
              className="px-3 py-1.5 text-xs font-medium bg-zinc-950 border border-zinc-800 hover:border-zinc-700 text-zinc-400 hover:text-white rounded transition"
            >
              Menú
            </button>
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 flex-1 items-start mb-6">

          {/* Ilustración principal — celular grande */}
          <div className="lg:col-span-7">
            <div className="min-h-[320px] bg-zinc-950/80 border border-zinc-900 rounded-lg p-6 flex items-center justify-center relative overflow-hidden backdrop-blur-sm shadow-2xl">
              <div className="w-full aspect-video">
                <Scene19CelularReference />
              </div>
              <div className="absolute top-4 left-4 bg-zinc-900/80 border border-zinc-800/80 px-2 py-1 rounded text-[10px] font-mono text-zinc-500 select-none">
                BOCETO VECTORIAL — ESCENA 19
              </div>
            </div>
          </div>

          {/* Panel de información */}
          <div className="lg:col-span-5 bg-zinc-950/50 border border-zinc-900 rounded-lg p-6 flex flex-col gap-4 backdrop-blur-sm shadow-xl">
            <div>
              <span className="text-[10px] font-mono uppercase tracking-widest text-blue-400 font-bold block mb-1">
                Descripción de la Escena
              </span>
              <h2 className="text-base font-bold text-white tracking-tight">
                La Ilusión del Descuento Nominal
              </h2>
            </div>

            <div className="space-y-3 text-xs text-zinc-400 leading-relaxed">
              <p>
                Al ampliar el celular de Camo, observamos las columnas de planes de financiamiento. El <span className="text-blue-300 font-bold">Plan Premium</span> está resaltado en color verde vivo con la etiqueta &quot;¡LO QUIERO YA!&quot;. Ofrece un aparente y atractivo &quot;3.5% TNA&quot;, mientras relega en letra pequeña el dato real: <span className="text-red-400 font-bold">TEA: 45.2%</span> a 240 meses.
              </p>
              <p>
                El <span className="text-blue-300 font-bold">Plan Normal</span>, que sirve de señuelo, ofrece &quot;2.9% TNA&quot; pero con un astronómico <span className="text-red-400 font-bold">TEA de 78.4%</span> a 360 meses, haciendo que el Plan Premium parezca la mejor opción disponible.
              </p>
              <p>
                El <span className="text-blue-300 font-bold">Plan Estándar</span> (gris neutro, sin destacar) es el único justo: 8.9% TNA a solo 36 meses con una TEA real de 9.5%.
              </p>
            </div>

            <div className="mt-auto pt-4 border-t border-zinc-900">
              <motion.button
                onClick={() => router.push('/game/playground/scene/scene_20')}
                className="w-full px-4 py-2.5 text-xs font-bold rounded-lg bg-blue-700 hover:bg-blue-600 text-white shadow-lg active:scale-95 transition"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Ver Escena 20 → La Batalla
              </motion.button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
