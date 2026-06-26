'use client';

import { useRouter } from 'next/navigation';
import Scene16CelularCheckout from '../../../components/scene_16_celular_checkout';

export default function Scene17Resultado2Page() {
  const router = useRouter();

  return (
    <div className="min-h-screen w-screen bg-[#050508] text-zinc-200 flex flex-col p-4 md:p-8 font-sans overflow-y-auto custom-scrollbar">
      
      <div className="absolute top-0 left-1/4 w-[400px] h-[400px] bg-red-500/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-indigo-500/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-6xl w-full mx-auto flex-1 flex flex-col relative z-10">
        
        <header className="flex flex-col md:flex-row justify-between items-start md:items-center border-b border-zinc-900 pb-4 mb-6 shrink-0 gap-4">
          <div className="space-y-1">
            <h1 className="text-xs font-mono uppercase tracking-widest text-red-500 font-bold">
              Consecuencias de la Decisión
            </h1>
            <p className="text-xl font-bold tracking-tight text-white">
              Opción 2 — La Inercia Traiciona
            </p>
            <p className="text-xs text-zinc-500">
              Camo presionó siguiente sin leer, aceptando el seguro sin saberlo.
            </p>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => router.push('/game/playground/scene/scene_17')}
              className="px-3 py-1.5 text-xs font-medium bg-zinc-950 border border-zinc-800 hover:border-zinc-700 text-zinc-400 hover:text-white rounded transition"
            >
              ← Volver a Decisión
            </button>
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 flex-1 items-stretch mb-6">
          
          <div className="lg:col-span-5 flex flex-col gap-4">
            <div className="flex-1 min-h-[250px] bg-zinc-950/80 border border-zinc-900 rounded-lg p-6 flex items-center justify-center relative overflow-hidden backdrop-blur-sm shadow-2xl">
              <div className="w-full aspect-video">
                <Scene16CelularCheckout />
              </div>
              <div className="absolute top-4 left-4 bg-red-950/50 border border-red-800/80 px-2 py-1 rounded text-[10px] font-mono text-red-400 select-none font-bold">
                ESTADO: ERROR DE DECISIÓN
              </div>
            </div>
          </div>

          <div className="lg:col-span-7 bg-zinc-950/50 border border-zinc-900 rounded-lg p-6 flex flex-col justify-between backdrop-blur-sm shadow-xl">
            
            <div className="space-y-4 flex-1 flex flex-col justify-center">
              <div className="space-y-2">
                <span className="text-[10px] font-mono uppercase tracking-widest text-red-400 font-bold block">
                  Desenlace Narrativo
                </span>
                <div className="p-4 rounded-xl border border-red-500/25 bg-red-950/10 text-red-100 leading-relaxed text-sm">
                  Te apresuras y completas la compra con todos los "seguros" intermediarios. No te ves afectado por la decisión inmediatamente y en el fondo pagar una mensualidad sin ser "consciente" de ello no es relevante para Camo económicamente... pero no puedes dejar de sentir que están usando tu apuro y sentimiento para quitarte tu autonomía... tu alma se apaga nuevamente.
                </div>
              </div>

              <div className="p-4 rounded-xl border border-red-500/30 bg-red-950/10 text-center">
                <p className="text-sm font-bold text-red-400">
                  ¡Has caído en el patrón oscuro!
                </p>
              </div>
            </div>

            <div className="border-t border-zinc-900 pt-3 mt-4 flex justify-end">
              <button
                onClick={() => router.push('/game/playground/scene/scene_17/explicacion_2')}
                className="px-5 py-2.5 text-xs font-bold rounded-lg bg-red-600 hover:bg-red-500 text-white shadow-lg shadow-red-950/50 active:scale-95 transition"
              >
                Ver explicación →
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
