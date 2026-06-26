'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import Scene20Batalla from '../../components/scene_20_batalla';

interface DecisionOption {
  id: number;
  text: string;
}

export default function Scene20PlaygroundPage() {
  const router = useRouter();
  const [chosenId, setChosenId] = useState<number | null>(null);
  const [isNavigating, setIsNavigating] = useState(false);

  const options: DecisionOption[] = [
    {
      id: 1,
      text: 'Camo no se deja deslumbrar por el color verde ni las etiquetas llamativas. Analiza las tasas TEA (Tasa Efectiva Anual) y los plazos, y selecciona el Plan Estándar con 9.5% TEA a 36 meses.'
    },
    {
      id: 2,
      text: 'Camo se deja llevar por el sesgo de anclaje de precios de referencia. Se apresura a elegir el Plan Premium atraído por el gancho del 3.5% TNA, sin leer que pagará durante 240 meses a una TEA del 45.2%.'
    }
  ];

  const handleSelect = (id: number) => {
    setIsNavigating(true);
    setChosenId(id);
    setTimeout(() => {
      router.push(`/game/playground/scene/scene_20/resultado_${id}`);
    }, 1200);
  };

  return (
    <div className="min-h-screen w-screen bg-[#050508] text-zinc-200 flex flex-col p-4 md:p-8 font-sans overflow-y-auto custom-scrollbar">
      
      <div className="absolute top-0 left-1/4 w-[400px] h-[400px] bg-sky-500/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-indigo-500/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-6xl w-full mx-auto flex-1 flex flex-col relative z-10">
        
        <header className="flex flex-col md:flex-row justify-between items-start md:items-center border-b border-zinc-900 pb-4 mb-6 shrink-0 gap-4">
          <div className="space-y-1">
            <h1 className="text-xs font-mono uppercase tracking-widest text-sky-400 font-bold">
              Playground de Animación y Decisiones
            </h1>
            <p className="text-xl font-bold tracking-tight text-white">
              Escena 20 — La Batalla Mental (Reference Pricing)
            </p>
            <p className="text-xs text-zinc-500">
              Camo se enfrenta al Patrón Oscuro. ¿Elegirá el plan financiero justo o caerá en la trampa del anclaje?
            </p>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => router.push('/game/playground/scene/scene_19')}
              className="px-3 py-1.5 text-xs font-medium bg-zinc-950 border border-zinc-800 hover:border-zinc-700 text-zinc-400 hover:text-white rounded transition"
            >
              ← Escena 19
            </button>
            <button
              onClick={() => router.push('/game/playground')}
              className="px-3 py-1.5 text-xs font-medium bg-zinc-950 border border-zinc-800 hover:border-zinc-700 text-zinc-400 hover:text-white rounded transition"
            >
              Menú
            </button>
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 flex-1 items-stretch mb-6">
          
          <div className="lg:col-span-5 flex flex-col gap-4">
            <div className="flex-1 min-h-[250px] bg-zinc-950/80 border border-zinc-900 rounded-lg p-6 flex items-center justify-center relative overflow-hidden backdrop-blur-sm shadow-2xl">
              <div className="w-full aspect-video">
                <Scene20Batalla />
              </div>
              <div className="absolute top-4 left-4 bg-zinc-900/80 border border-zinc-800/80 px-2 py-1 rounded text-[10px] font-mono text-zinc-500 select-none">
                BOCETO VECTORIAL DE BATALLA
              </div>
            </div>
          </div>

          <div className="lg:col-span-7 bg-zinc-950/50 border border-zinc-900 rounded-lg p-6 flex flex-col gap-6 backdrop-blur-sm shadow-xl relative overflow-hidden">
            <div>
              <span className="text-[10px] font-mono uppercase tracking-widest text-sky-400 font-bold block mb-1">
                Batalla en Progreso
              </span>
              <h2 className="text-lg font-bold text-white tracking-tight">
                Elige la acción de Camo
              </h2>
              <p className="text-xs text-zinc-400 mt-1">
                El Patrón Oscuro está aplicando{' '}
                <strong className="text-sky-300">Sneaking → Hiding Information → Reference Pricing</strong>
                : el anclaje de precios con tasas nominales engañosas frente al costo efectivo total.
              </p>
            </div>

            <div className="flex-1 flex flex-col gap-4 justify-center relative">
              <AnimatePresence mode="wait">
                {!isNavigating ? (
                  <motion.div
                    key="options-selector"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="flex flex-col gap-3"
                  >
                    {options.map((opt) => (
                      <button
                        key={opt.id}
                        disabled={isNavigating}
                        onClick={() => handleSelect(opt.id)}
                        className="p-4 rounded-xl border border-zinc-900 bg-zinc-950/60 hover:bg-zinc-900/60 hover:border-zinc-800 text-left transition-all active:scale-[0.99] group flex gap-3 items-start disabled:opacity-50"
                      >
                        <span className="w-5 h-5 rounded-full bg-zinc-900 border border-zinc-800 text-[10px] font-bold font-mono text-zinc-500 flex items-center justify-center shrink-0 group-hover:border-sky-500 group-hover:text-sky-400 transition-colors">
                          {opt.id}
                        </span>
                        <span className="text-xs text-zinc-300 group-hover:text-white leading-relaxed transition-colors">
                          {opt.text}
                        </span>
                      </button>
                    ))}
                  </motion.div>
                ) : (
                  <motion.div
                    key="navigation-loader"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex flex-col items-center justify-center py-12 text-center space-y-4"
                  >
                    <div className="w-8 h-8 rounded-full border-2 border-sky-500 border-t-transparent animate-spin" />
                    <div className="space-y-1">
                      <p className="text-sm font-bold text-white">Cargando consecuencias...</p>
                      <p className="text-xs text-zinc-500">Transicionando al desenlace de la opción {chosenId}</p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
