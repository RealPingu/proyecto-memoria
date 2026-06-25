'use client';

import { useRouter } from 'next/navigation';
import Scene14Resultado2 from '../../../components/scene_14_resultado_2';

export default function Scene14Resultado2Page() {
  const router = useRouter();

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
              Consecuencias de la Decisión
            </h1>
            <p className="text-xl font-bold tracking-tight text-white flex items-center gap-2">
              Opción 2 — Reserva con Precaución
            </p>
            <p className="text-xs text-zinc-500">
              Camo identificó la trampa visual y encontró el botón legítimo.
            </p>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => router.push('/game/playground/scene/scene_14')}
              className="px-3 py-1.5 text-xs font-medium bg-zinc-950 border border-zinc-800 hover:border-zinc-700 text-zinc-400 hover:text-white rounded transition"
            >
              ← Volver a Decisión
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
                <Scene14Resultado2 />
              </div>

              {/* Indicador de Escena */}
              <div className="absolute top-4 left-4 bg-emerald-950/50 border border-emerald-800/80 px-2 py-1 rounded text-[10px] font-mono text-emerald-400 select-none font-bold">
                ESTADO: ÉXITO PARCIAL (PRECAUCIÓN)
              </div>
            </div>
          </div>

          {/* Columna Derecha: Panel Narrativo (7/12 de ancho) */}
          <div className="lg:col-span-7 bg-zinc-950/50 border border-zinc-900 rounded-lg p-6 flex flex-col justify-between backdrop-blur-sm shadow-xl">
            
            <div className="space-y-4 flex-1 flex flex-col justify-center">
              <div className="space-y-2">
                <span className="text-[10px] font-mono uppercase tracking-widest text-emerald-400 font-bold block">
                  Desenlace Narrativo
                </span>
                <div className="p-4 rounded-xl border border-emerald-500/25 bg-emerald-950/10 text-emerald-100 leading-relaxed text-sm">
                  Avanzas exitosamente al siguiente paso de compra, pero te queda una pequeña desconfianza de la plataforma, la cual tenía un exceso de anuncios.
                </div>
              </div>

              <div className="p-4 rounded-xl border border-emerald-500/30 bg-emerald-550/10 text-center">
                <p className="text-sm font-bold text-emerald-400">
                  ¡Has evitado el patrón oscuro!
                </p>
              </div>
            </div>

            {/* Acciones */}
            <div className="border-t border-zinc-900 pt-3 mt-4 flex justify-end gap-3">
              <button
                onClick={() => router.push('/game/playground/scene/scene_14/explicacion_2')}
                className="px-5 py-2.5 text-xs font-bold rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white shadow-lg shadow-emerald-950/50 hover:shadow-emerald-500/20 active:scale-95 transition"
              >
                Siguiente
              </button>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}
