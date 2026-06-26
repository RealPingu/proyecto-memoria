'use client';

import { useRouter } from 'next/navigation';
import ExplicacionPatronAlegre from '../../../components/explicacion_patron_alegre';

export default function Scene17Explicacion2Page() {
  const router = useRouter();

  return (
    <div className="min-h-screen w-screen bg-[#050508] text-zinc-200 flex flex-col p-4 md:p-8 font-sans overflow-y-auto custom-scrollbar">
      
      <div className="absolute top-0 left-1/4 w-[400px] h-[400px] bg-red-500/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-indigo-500/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-6xl w-full mx-auto flex-1 flex flex-col relative z-10">
        
        <header className="flex flex-col md:flex-row justify-between items-start md:items-center border-b border-zinc-900 pb-4 mb-6 shrink-0 gap-4">
          <div className="space-y-1">
            <h1 className="text-xs font-mono uppercase tracking-widest text-red-500 font-bold">
              Reporte de Patrón Oscuro
            </h1>
            <p className="text-xl font-bold tracking-tight text-white">
              Análisis Técnico — Drip Pricing (Activado)
            </p>
            <p className="text-xs text-zinc-500">
              El Patrón Oscuro explotó la inercia de Camo para cobrarle sin que lo notara.
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
                <ExplicacionPatronAlegre isCentered={true} />
              </div>
              <div className="absolute top-4 left-4 bg-red-950/50 border border-red-800/80 px-2 py-1 rounded text-[10px] font-mono text-red-400 select-none font-bold">
                ESTADO: COBRO OCULTO ACEPTADO
              </div>
            </div>
          </div>

          <div className="lg:col-span-7 bg-zinc-950/50 border border-zinc-900 rounded-lg p-6 flex flex-col justify-between backdrop-blur-sm shadow-xl">
            
            <div className="space-y-6">
              <div className="space-y-2">
                <span className="text-[10px] font-mono uppercase tracking-widest text-red-400 font-bold block">
                  Explicación del Patrón
                </span>
                
                <div className="space-y-4 p-5 rounded-xl border border-zinc-800 bg-zinc-900/30">
                  <div className="border-b border-zinc-800 pb-2">
                    <h3 className="text-sm font-bold text-red-400 font-mono uppercase tracking-wider">
                      Táctica Activada: Drip Pricing (Precios por Goteo)
                    </h3>
                  </div>

                  <div className="space-y-1">
                    <span className="text-xs font-bold text-red-300 font-mono block">NIVEL ALTO: SNEAKING (Sigilo)</span>
                    <p className="text-xs text-zinc-400 leading-relaxed">
                      Estrategia que oculta, disfraza o retrasa la revelación de información importante que, de haber estado disponible para los usuarios, evitaría que tomen de forma involuntaria una acción a la que probablemente se opondrían.
                    </p>
                  </div>

                  <div className="space-y-1">
                    <span className="text-xs font-bold text-red-300 font-mono block">NIVEL MEDIO: HIDING INFORMATION (Información Oculta)</span>
                    <p className="text-xs text-zinc-400 leading-relaxed">
                      Oculta o retrasa la revelación de información que el usuario necesita para tomar una decisión informada, presentándola solo cuando el costo de retroceder ya es alto.
                    </p>
                  </div>

                  <div className="space-y-1">
                    <span className="text-xs font-bold text-red-300 font-mono block">NIVEL BAJO: DRIP PRICING (Precios por Goteo)</span>
                    <p className="text-xs text-zinc-400 leading-relaxed">
                      El precio real del producto se revela progresivamente: al final del proceso de compra aparecen cargos adicionales —seguros, tarifas, suscripciones— que no estaban visibles al inicio. El patrón explota la inercia: cuando ya dedicaste tiempo a algo, tu mente tiende a no querer perder ese esfuerzo y acepta condiciones que de otro modo rechazaría.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="border-t border-zinc-900 pt-4 mt-6 flex justify-end gap-3">
              <button
                onClick={() => router.push('/game/playground/scene/scene_17')}
                className="px-4 py-2 text-xs font-bold rounded-lg border border-zinc-800 bg-zinc-950 hover:bg-zinc-900 transition active:scale-95"
              >
                Intentar de nuevo
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
