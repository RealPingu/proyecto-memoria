'use client';

import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import SleepingPenguinLying from './components/sleeping_penguin_lying';
import Scene2Encounter from './components/scene_2_encounter';
import Scene3Questioning from './components/scene_3_questioning';
import Scene4Walking from './components/scene_4_walking';
import Scene5Approaching from './components/scene_5_approaching';
import Scene6Glow from './components/scene_6_glow';
import Scene7Sniper from './components/scene_7_sniper';
import Scene8DarkPattern from './components/scene_8_dark_pattern';

interface SceneItem {
  id: string;
  number: number;
  title: string;
  subtitle: string;
  description: string;
  path: string;
  available: boolean;
  preview?: React.ReactNode;
}

export default function SceneMenuPage() {
  const router = useRouter();

  const scenes: SceneItem[] = [
    {
      id: 'scene_1',
      number: 1,
      title: 'El Sueño del Jugador',
      subtitle: 'Escena 1 — Prólogo / Limbo',
      description: 'Edita el diseño del espíritu del jugador acostado durmiendo. Controla las variantes de accesorios y las animaciones de respiración y burbuja de sueño.',
      path: '/game/playground/scene/scene_1',
      available: true,
      preview: (
        <div className="w-full h-full bg-black/60 relative overflow-hidden rounded border border-zinc-800/80">
          <SleepingPenguinLying />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />
        </div>
      )
    },
    {
      id: 'scene_2',
      number: 2,
      title: 'El Encuentro Subconsciente',
      subtitle: 'Escena 2 — El Umbral',
      description: 'El pingüino asombrado se encuentra cara a cara con el Ojo Blanco del subconsciente. Edita la animación y accesorios.',
      path: '/game/playground/scene/scene_2',
      available: true,
      preview: (
        <div className="w-full h-full bg-black/60 relative overflow-hidden rounded border border-zinc-800/80">
          <Scene2Encounter />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />
        </div>
      )
    },
    {
      id: 'scene_3',
      number: 3,
      title: 'El Diálogo / La Pregunta',
      subtitle: 'Escena 3 — Diálogo Subconsciente',
      description: 'El pingüino parado estático y el Ojo Blanco del subconsciente. Se configuran y animan los signos de pregunta ?? flotando.',
      path: '/game/playground/scene/scene_3',
      available: true,
      preview: (
        <div className="w-full h-full bg-black/60 relative overflow-hidden rounded border border-zinc-800/80">
          <Scene3Questioning />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />
        </div>
      )
    },
    {
      id: 'scene_4',
      number: 4,
      title: 'Avanzando Juntos',
      subtitle: 'Escena 4 — Portal de Retorno',
      description: 'El pingüino y el Ojo Blanco avanzan juntos hacia la luz. Edita la animación y accesorios del ojo.',
      path: '/game/playground/scene/scene_4',
      available: true,
      preview: (
        <div className="w-full h-full bg-black/60 relative overflow-hidden rounded border border-zinc-800/80">
          <Scene4Walking />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />
        </div>
      )
    },
    {
      id: 'scene_5',
      number: 5,
      title: 'El Alma de Camo',
      subtitle: 'Escena 5 — Diseñador de Camo',
      description: 'El protagonista y Camo se aproximan al alma. Personaliza a Camo con camuflaje militar, casco, arnés y visor táctico.',
      path: '/game/playground/scene/scene_5',
      available: true,
      preview: (
        <div className="w-full h-full bg-black/60 relative overflow-hidden rounded border border-zinc-800/80">
          <Scene5Approaching />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />
        </div>
      )
    },
    {
      id: 'scene_6',
      number: 6,
      title: 'El Despertar de Camo',
      subtitle: 'Escena 6 — Resplandor en las Manos',
      description: 'Camo despierta y mira hacia abajo sus aletas, las cuales emiten un resplandor mágico, mientras el Ojo Blanco lo observa desde arriba.',
      path: '/game/playground/scene/scene_6',
      available: true,
      preview: (
        <div className="w-full h-full bg-black/60 relative overflow-hidden rounded border border-zinc-800/80">
          <Scene6Glow />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />
        </div>
      )
    },
    {
      id: 'scene_7',
      number: 7,
      title: 'Camo el Francotirador',
      subtitle: 'Escena 7 — El Pingüino Sigiloso',
      description: 'Muestra a Camo posando con orgullo en su podio militar con su rifle de francotirador, simbolizando su rol previo a ser oscurecido.',
      path: '/game/playground/scene/scene_7',
      available: true,
      preview: (
        <div className="w-full h-full bg-black/60 relative overflow-hidden rounded border border-zinc-800/80">
          <Scene7Sniper />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />
        </div>
      )
    },
    {
      id: 'scene_8',
      number: 8,
      title: 'Camo y el Patrón Oscuro',
      subtitle: 'Escena 8 — La Persuasión',
      description: 'Camo cae víctima de los patrones oscuros y es consumido por la oscuridad, acechado por la columna flotante del Patrón.',
      path: '/game/playground/scene/scene_8',
      available: true,
      preview: (
        <div className="w-full h-full bg-black/60 relative overflow-hidden rounded border border-zinc-800/80">
          <Scene8DarkPattern />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />
        </div>
      )
    }
  ];

  return (
    <div className="min-h-screen w-screen bg-[#050508] text-zinc-200 flex flex-col p-4 md:p-8 font-sans overflow-y-auto custom-scrollbar">
      
      {/* Background Decorative Glows */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-emerald-500/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-indigo-500/5 rounded-full blur-[140px] pointer-events-none" />

      {/* Main Container */}
      <div className="max-w-5xl w-full mx-auto flex-1 flex flex-col relative z-10">
        
        {/* Header */}
        <header className="flex flex-col md:flex-row justify-between items-start md:items-center border-b border-zinc-900 pb-5 mb-8 shrink-0">
          <div className="space-y-1">
            <h1 className="text-xs font-mono uppercase tracking-widest text-emerald-400 font-bold">
              Playground de Escenas
            </h1>
            <p className="text-lg font-medium text-white tracking-tight">
              Editor Visual de Ilustraciones SVG
            </p>
            <p className="text-[10px] text-zinc-500 uppercase tracking-wider font-mono">
              Entorno local para la personalización y optimización de assets narrativos
            </p>
          </div>
          
          <button
            onClick={() => router.push('/game/narrative')}
            className="mt-4 md:mt-0 text-[10px] font-mono uppercase tracking-wider border border-zinc-800 hover:border-emerald-500/50 hover:text-emerald-400 px-4 py-2 text-zinc-400 bg-zinc-950/20 backdrop-blur-sm transition rounded cursor-pointer active:scale-95 shadow-md"
          >
            Volver al Juego
          </button>
        </header>

        {/* Info Banner */}
        <div className="bg-emerald-950/10 border border-emerald-900/30 rounded p-4 mb-8 flex items-start space-x-3">
          <div className="text-emerald-400 mt-0.5 text-xs">💡</div>
          <div className="space-y-1">
            <h4 className="text-[10px] font-mono font-bold uppercase tracking-wider text-emerald-400">
              Sobre el Guardado Local y Git
            </h4>
            <p className="text-[10px] text-zinc-400 leading-relaxed max-w-3xl">
              El playground corre localmente. Al guardar una escena desde el editor, se compila el código en components locales y se actualiza tu copia de trabajo. Estas ediciones están ignoradas por Git en <code className="bg-black/50 px-1 py-0.5 rounded text-zinc-300">.gitignore</code> para evitar registrar cambios experimentales.
            </p>
          </div>
        </div>

        {/* Scene Menu Grid */}
        <main className="flex-1">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {scenes.map((scene) => (
              <div
                key={scene.id}
                className={`bg-zinc-950/40 border rounded-lg p-5 flex flex-col justify-between transition-all duration-300 group
                  ${scene.available 
                    ? 'border-zinc-900 hover:border-zinc-800 hover:bg-zinc-900/10 shadow-lg' 
                    : 'border-zinc-950/80 opacity-50'}`}
              >
                <div className="space-y-4">
                  {/* Aspect-video Preview Container */}
                  <div className="aspect-[200/120] w-full relative">
                    {scene.preview}
                  </div>

                  <div className="space-y-1">
                    <span className="text-[9px] font-mono text-zinc-500 uppercase tracking-widest block">
                      {scene.subtitle}
                    </span>
                    <h3 className={`text-sm font-semibold tracking-tight transition-colors duration-300
                      ${scene.available ? 'text-white group-hover:text-emerald-400' : 'text-zinc-500'}`}>
                      {scene.title}
                    </h3>
                    <p className="text-[10px] text-zinc-400 leading-relaxed pt-1">
                      {scene.description}
                    </p>
                  </div>
                </div>

                <div className="pt-6">
                  {scene.available ? (
                    <button
                      onClick={() => router.push(scene.path)}
                      className="w-full text-center py-2 text-[10px] font-mono uppercase font-bold tracking-wider rounded bg-zinc-900 border border-zinc-800 text-zinc-200 hover:bg-emerald-500 hover:text-zinc-950 hover:border-emerald-500 transition duration-200 cursor-pointer active:scale-95"
                    >
                      Abrir Editor
                    </button>
                  ) : (
                    <button
                      disabled
                      className="w-full text-center py-2 text-[10px] font-mono uppercase font-bold tracking-wider rounded bg-zinc-950 border border-zinc-900/30 text-zinc-600 cursor-not-allowed"
                    >
                      No Disponible
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </main>

        {/* Footer info */}
        <footer className="mt-12 border-t border-zinc-900/60 pt-4 pb-6 text-center shrink-0">
          <p className="text-[9px] font-mono text-zinc-600 uppercase tracking-widest">
            Antipatrón — Engine Visual v2.0
          </p>
        </footer>

      </div>
    </div>
  );
}
