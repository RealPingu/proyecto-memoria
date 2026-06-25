'use client';

import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import Scene14Resultado2 from '../../../components/scene_14_resultado_2';
import ExplicacionPatronDerrotado from '../../../components/explicacion_patron_derrotado';

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

          {/* Columna Derecha: Panel Narrativo y Feedback Educativo (7/12 de ancho) */}
          <div className="lg:col-span-7 bg-zinc-950/50 border border-zinc-900 rounded-lg p-6 flex flex-col justify-between backdrop-blur-sm shadow-xl">
            
            <div className="space-y-4">
              {/* Sección Narrativa */}
              <div className="space-y-1">
                <span className="text-[10px] font-mono uppercase tracking-widest text-emerald-400 font-bold block">
                  Desenlace Narrativo
                </span>
                <div className="p-3.5 rounded-xl border border-emerald-500/25 bg-emerald-950/10 text-emerald-100 leading-relaxed text-xs">
                  "Avanzas exitosamente al siguiente paso de compra, pero te queda una pequeña desconfianza de la plataforma, la cual tenía un exceso de anuncios."
                </div>
              </div>

              {/* Sección Educativa con el SVG Explicativo del Patrón Derrotado */}
              <div className="space-y-2">
                <span className="text-[10px] font-mono uppercase tracking-widest text-cyan-400 font-bold block">
                  Reporte Técnico de Patrón Oscuro (Patrón Derrotado)
                </span>
                <div className="w-full aspect-[200/120] bg-zinc-950/60 border border-zinc-900 rounded-xl overflow-hidden p-2 flex items-center justify-center">
                  <ExplicacionPatronDerrotado>
                    <div className="border-b border-cyan-500/30 pb-0.5 mb-1">
                      <p className="text-[5.5px] font-bold text-cyan-400 font-mono tracking-wide uppercase">Táctica Superada: Disguised Ads</p>
                    </div>
                    
                    <div>
                      <span className="text-[5px] font-bold text-cyan-300 font-mono block">NIVEL ALTO: SNEAKING (Sigilo)</span>
                      <p className="text-zinc-400 text-[4.5px]">Estrategia que oculta, disfraza o retrasa información importante que, de haber estado disponible, evitaría que el usuario tome una acción involuntaria a la que se opondría.</p>
                    </div>

                    <div>
                      <span className="text-[5px] font-bold text-cyan-300 font-mono block">NIVEL MEDIO: BAIT AND SWITCH (Señuelo y Cambio)</span>
                      <p className="text-zinc-400 text-[4.5px]">Subvierte la expectativa del usuario de que su elección resultará en la acción deseada, llevándolo en su lugar a un resultado inesperado y no deseado.</p>
                    </div>

                    <div>
                      <span className="text-[5px] font-bold text-cyan-300 font-mono block">NIVEL BAJO: DISGUISED ADS (Anuncios Disfrazados)</span>
                      <p className="text-zinc-400 text-[4.5px]">Diseña anuncios con el estilo visual de la interfaz para que parezcan elementos legítimos del sitio. El usuario hace clic asumiendo que es una interacción válida.</p>
                    </div>
                  </ExplicacionPatronDerrotado>
                </div>
              </div>
            </div>

            {/* Acciones */}
            <div className="border-t border-zinc-900 pt-3 mt-4 flex justify-end gap-3">
              <button
                onClick={() => router.push('/game/playground/scene/scene_14')}
                className="px-4 py-2 text-xs font-bold rounded-lg border border-zinc-800 bg-zinc-950 hover:bg-zinc-900 transition active:scale-95"
              >
                Probar otra opción
              </button>
              <button
                onClick={() => alert('Simulación completada con éxito parcial. Transicionando a la Escena 15 en la narrativa real.')}
                className="px-5 py-2.5 text-xs font-bold rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white shadow-lg shadow-emerald-950/50 hover:shadow-emerald-500/20 active:scale-95 transition"
              >
                Continuar Narrativa
              </button>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}
