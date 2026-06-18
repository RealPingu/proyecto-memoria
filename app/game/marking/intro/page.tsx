'use client';

import { useState } from 'react';
import Link from "next/link";
import { motion } from 'framer-motion';
import MarkingVisor from '@/app/components/MarkingVisor';

export default function MarkingIntroPage() {
    const [points, setPoints] = useState<{ x: number, y: number, id: number }[]>([]);

    const handleMark = (x: number, y: number) => {
        const threshold = 4;
        const existing = points.findIndex(p => Math.abs(p.x - x) < threshold && Math.abs(p.y - y) < threshold);
        
        if (existing !== -1) {
            setPoints(points.filter((_, i) => i !== existing));
        } else {
            setPoints([...points, { x, y, id: Date.now() }]);
        }
    };

    return (
        <div className="flex flex-col h-screen w-full bg-game-bg text-game-text p-4 md:p-8 overflow-hidden items-center justify-center font-sans">
            <div className="flex flex-col h-full max-w-4xl w-full mx-auto py-4 md:py-12">

                <motion.header 
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-center space-y-1 shrink-0 py-2"
                >
                    <h1 className="text-3xl md:text-5xl font-bold uppercase italic tracking-tighter text-game-accent">
                        Prueba de Marcado
                    </h1>
                    <p className="text-game-muted text-[10px] md:text-xs uppercase tracking-widest">
                        Tutorial Interactivo
                    </p>
                </motion.header>

                <motion.main 
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex-1 flex flex-col items-center min-h-0 overflow-y-auto custom-scrollbar"
                >
                    <div className="my-auto w-full max-w-2xl space-y-8">
                        <div className="bg-game-surface/30 p-6 md:p-10 border border-game-muted/20 rounded-sm shadow-2xl text-center space-y-6">
                            <p className="leading-relaxed text-zinc-300 text-sm md:text-lg">
                                Si algo te parece sospechoso o crees que intenta subvertir el objetivo del contexto de la vista, márcalo.
                            </p>
                            
                            {/* PRÁCTICA REAL CON EL MISMO VISOR */}
                            <div className="h-[40vh] w-full border border-white/5 bg-black rounded-lg relative">
                                <MarkingVisor 
                                    mockupUrl="/assets/mockups/sneaking_01.svg"
                                    markedPoints={points}
                                    onMark={handleMark}
                                    isActive={true}
                                />
                            </div>
                            
                            <p className="text-[10px] text-zinc-500 italic uppercase tracking-widest">
                                Prueba el zoom y el marcado en este ejemplo
                            </p>
                        </div>
                    </div>
                </motion.main>

                <footer className="shrink-0 pt-4 pb-2 md:pb-10">
                    <div className="flex flex-col md:flex-row w-full max-w-lg mx-auto gap-3 md:gap-4">
                        <Link href="/game/marking/test" className="flex-1 h-12 bg-game-accent text-game-bg font-bold uppercase tracking-widest text-xs flex items-center justify-center shadow-lg active:scale-95 transition-all">
                            Comprender y Avanzar
                        </Link>
                        <Link href="/survey" className="flex-1 h-12 border border-zinc-700 text-game-muted font-bold uppercase tracking-widest text-xs flex items-center justify-center hover:bg-game-surface hover:text-game-accent transition-all active:scale-95">
                            Regresar
                        </Link>
                    </div>
                </footer>
            </div>
        </div>
    );
}
