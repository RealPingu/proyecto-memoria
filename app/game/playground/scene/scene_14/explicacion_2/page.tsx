'use client';

import { useRouter } from 'next/navigation';
import ExplicacionPatronDerrotado from '../../../components/explicacion_patron_derrotado';

export default function Scene14Explicacion2Page() {
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
            <h1 className="text-xs font-mono uppercase tracking-widest text-cyan-400 font-bold">
              Reporte de Patrón Oscuro
            </h1>
            <p className="text-xl font-bold tracking-tight text-white flex items-center gap-2">
              Análisis Técnico — Disguised Ads (Superado)
            </p>
            <p className="text-xs text-zinc-500">
              El Patrón Oscuro fue debilitado al identificar su trampa visual.
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
              
              {/* Animación SVG renderizada (Centrada, sin el polygon de texto a la derecha) */}
              <div className="w-full aspect-video">
                <ExplicacionPatronDerrotado isCentered={true} />
              </div>

              {/* Indicador de Escena */}
              <div className="absolute top-4 left-4 bg-emerald-950/50 border border-emerald-800/80 px-2 py-1 rounded text-[10px] font-mono text-emerald-400 select-none font-bold">
                ESTADO: ENMASCARAMIENTO DETECTADO
              </div>
            </div>
          </div>

          {/* Columna Derecha: Panel de Explicación en Texto (7/12 de ancho) */}
          <div className="lg:col-span-7 bg-zinc-950/50 border border-zinc-900 rounded-lg p-6 flex flex-col justify-between backdrop-blur-sm shadow-xl">
            
            <div className="space-y-6">
              <div className="space-y-2">
                <span className="text-[10px] font-mono uppercase tracking-widest text-cyan-400 font-bold block">
                  Explicación del Patrón
                </span>
                
                <div className="space-y-4 p-5 rounded-xl border border-zinc-800 bg-zinc-900/30">
                  <div className="border-b border-zinc-800 pb-2">
                    <h3 className="text-sm font-bold text-white font-mono uppercase tracking-wider text-cyan-400">
                      Táctica Superada: Disguised Ads (Anuncios Disfrazados)
                    </h3>
                  </div>

                  <div className="space-y-1">
                    <span className="text-xs font-bold text-cyan-300 font-mono block">NIVEL ALTO: SNEAKING (Sigilo)</span>
                    <p className="text-xs text-zinc-400 leading-relaxed">
                      Estrategia que oculta, disfraza o retrasa la revelación de información importante que, de haber estado disponible para los usuarios, evitaría que tomen de forma involuntaria una acción a la que probablemente se opondrían.
                    </p>
                  </div>

                  <div className="space-y-1">
                    <span className="text-xs font-bold text-cyan-300 font-mono block">NIVEL MEDIO: BAIT AND SWITCH (Señuelo y Cambio)</span>
                    <p className="text-xs text-zinc-400 leading-relaxed">
                      Subvierte la expectativa del usuario de que su elección resultará en la acción deseada, llevándolo en su lugar a un resultado inesperado y no deseado.
                    </p>
                  </div>

                  <div className="space-y-1">
                    <span className="text-xs font-bold text-cyan-300 font-mono block">NIVEL BAJO: DISGUISED ADS (Anuncios Disfrazados)</span>
                    <p className="text-xs text-zinc-400 leading-relaxed">
                      Diseña y maquilla los elementos de la interfaz para que no estén claramente marcados como anuncios o fuentes patrocinadas. Como resultado, los usuarios son inducidos a hacer clic en ellos asumiendo que es una interacción legítima, lo que los lleva a interactuar involuntariamente con contenido publicitario.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Acciones */}
            <div className="border-t border-zinc-900 pt-4 mt-6 flex justify-end gap-3">
              <button
                onClick={() => router.push('/game/playground/scene/scene_14')}
                className="px-4 py-2 text-xs font-bold rounded-lg border border-zinc-800 bg-zinc-950 hover:bg-zinc-900 transition active:scale-95"
              >
                Probar otra opción
              </button>
              <button
                onClick={() => alert('Simulación completada. En la narrativa esto avanzará al final de la demo.')}
                className="px-5 py-2.5 text-xs font-bold rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white shadow-lg shadow-emerald-950/50 hover:shadow-emerald-500/20 active:scale-95 transition"
              >
                Continuar
              </button>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}
