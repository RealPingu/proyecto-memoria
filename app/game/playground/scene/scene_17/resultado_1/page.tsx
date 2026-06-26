'use client';

import { useRouter } from 'next/navigation';
import Scene16CelularCheckout from '../../../components/scene_16_celular_checkout';

export default function Scene17Resultado1Page() {
  const router = useRouter();

  return (
    <div className="min-h-screen w-screen bg-[#050508] text-zinc-200 flex flex-col p-4 md:p-8 font-sans overflow-y-auto custom-scrollbar">
      
      <div className="absolute top-0 left-1/4 w-[400px] h-[400px] bg-emerald-500/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-sky-500/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-6xl w-full mx-auto flex-1 flex flex-col relative z-10">
        
        <header className="flex flex-col md:flex-row justify-between items-start md:items-center border-b border-zinc-900 pb-4 mb-6 shrink-0 gap-4">
          <div className="space-y-1">
            <h1 className="text-xs font-mono uppercase tracking-widest text-emerald-400 font-bold">
              Consecuencias de la Decisión
            </h1>
            <p className="text-xl font-bold tracking-tight text-white">
              Opción 1 — Alerta Militar
            </p>
            <p className="text-xs text-zinc-500">
              Camo leyó atentamente cada paso del proceso de compra.
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
              <div className="absolute top-4 left-4 bg-emerald-950/50 border border-emerald-800/80 px-2 py-1 rounded text-[10px] font-mono text-emerald-400 select-none font-bold">
                ESTADO: PATRÓN EVITADO
              </div>
            </div>
          </div>

          <div className="lg:col-span-7 bg-zinc-950/50 border border-zinc-900 rounded-lg p-6 flex flex-col justify-between backdrop-blur-sm shadow-xl">
            
            <div className="space-y-4 flex-1 flex flex-col justify-center">
              <div className="space-y-2">
                <span className="text-[10px] font-mono uppercase tracking-widest text-emerald-400 font-bold block">
                  Desenlace Narrativo
                </span>
                <div className="p-4 rounded-xl border border-emerald-500/25 bg-emerald-950/10 text-emerald-100 leading-relaxed text-sm">
                  Pasas atentamente por cada paso, te das cuenta de que el seguro de bombas atómicas es totalmente innecesario y que tendrías que pagar una "pingüinada" cada mes. Profundamente, Camo también piensa que podría dispararle a la bomba antes de que cayera... Sin duda Camo confía "excesivamente" en su habilidad... Camo decide optar por salir del seguro y sigue al final de la compra.
                </div>
              </div>

              <div className="p-4 rounded-xl border border-emerald-500/30 bg-emerald-950/10 text-center">
                <p className="text-sm font-bold text-emerald-400">
                  ¡Has evitado el patrón oscuro!
                </p>
              </div>
            </div>

            <div className="border-t border-zinc-900 pt-3 mt-4 flex justify-end">
              <button
                onClick={() => router.push('/game/playground/scene/scene_17/explicacion_1')}
                className="px-5 py-2.5 text-xs font-bold rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white shadow-lg shadow-emerald-950/50 active:scale-95 transition"
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
