'use client';

import { useState, useEffect } from 'react';
import Link from "next/link";
import { motion } from 'framer-motion';
import MarkingVisor from '@/app/components/MarkingVisor';

export default function MarkingIntroPage() {
    const [points, setPoints] = useState<{ x: number, y: number, id: number }[]>([]);

    useEffect(() => {
        if (typeof window !== 'undefined') {
            window.scrollTo(0, 0);
            document.body.scrollTop = 0;
        }
    }, []);

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

                {/* Header */}
                <motion.header 
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-center space-y-1 shrink-0 py-2 mb-6"
                >
                    <h1 className="text-2xl sm:text-4xl md:text-5xl font-bold uppercase italic tracking-tighter text-game-accent">
                        Prueba de Marcado
                    </h1>
                    <p className="text-game-muted text-[10px] md:text-xs uppercase tracking-widest">
                        Tutorial Interactivo
                    </p>
                </motion.header>

                {/* Main Content with Scroll */}
                <motion.main 
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex-1 flex flex-col items-center min-h-0 overflow-y-auto custom-scrollbar"
                >
                    <div className="my-auto w-full max-w-2xl space-y-6 py-4 shrink-0">
                        
                        {/* Cuadro 1: ¿En qué consiste la prueba? */}
                        <div className="bg-game-surface/30 p-5 md:p-8 border border-game-muted/20 rounded-sm shadow-2xl space-y-4">
                            <h2 className="text-xs md:text-sm font-bold font-mono text-game-accent uppercase tracking-wider text-center">
                                ¿En qué consiste la prueba?
                            </h2>
                            <div className="space-y-3 text-zinc-300 text-sm md:text-base leading-relaxed">
                                <p>
                                    La prueba de <span className="text-game-accent font-semibold">marcado</span> consiste en identificar todo aquel elemento que intente subvertir o desviarte del <span className="text-game-accent font-semibold">objetivo</span> del contexto de la vista.
                                </p>
                                <p>
                                    Te daremos el contexto de la vista previo a la etapa de <span className="text-game-accent font-semibold">marcado</span>. Cada vista tendrá un <span className="text-amber-400 font-semibold">tiempo límite variable</span> (entre 25 y 80 segundos) acorde a la cantidad de elementos y texto que contiene.
                                </p>
                            </div>
                        </div>

                        {/* Cuadro 2: ¿Cómo funciona el visor? */}
                        <div className="bg-game-surface/30 p-5 md:p-8 border border-game-muted/20 rounded-sm shadow-2xl space-y-6">
                            <h2 className="text-xs md:text-sm font-bold font-mono text-game-accent uppercase tracking-wider text-center">
                                ¿Cómo funciona el visor?
                            </h2>
                            
                            <ul className="space-y-3 text-zinc-300 text-xs md:text-sm leading-relaxed list-disc list-inside">
                                <li>
                                    <strong>Para <span className="text-game-accent font-semibold">marcar</span>:</strong> Funciona como un celular. Haz clic o presiona una vez para <span className="text-game-accent font-semibold">marcar</span> la posición del elemento sospechoso en la imagen.
                                </li>
                                <li>
                                    <strong>Para mover la imagen:</strong>
                                    <ul className="pl-6 mt-1 list-circle space-y-1">
                                        <li>
                                            <strong>En computadoras:</strong> Haz clic izquierdo y mantén presionado para arrastrar la imagen en cualquier dirección.
                                        </li>
                                        <li>
                                            <strong>En celulares y móviles:</strong> Presiona con un dedo y deslízalo para mover la imagen y explorar con el zoom.
                                        </li>
                                    </ul>
                                </li>
                                <li>
                                    <strong>Para desmarcar:</strong> Si te equivocas o no te convence una marca, haz clic o presiona sobre ella nuevamente para eliminarla.
                                </li>
                            </ul>

                            {/* Práctica Real Interactiva */}
                            <div className="h-[25vh] md:h-[35vh] w-full border border-white/5 bg-black rounded-sm relative">
                                <MarkingVisor 
                                    mockupUrl="/assets/mockups/sneaking_01.svg"
                                    markedPoints={points}
                                    onMark={handleMark}
                                    isActive={true}
                                />
                            </div>
                            
                            <p className="text-[10px] text-zinc-500 italic uppercase tracking-widest text-center">
                                Prueba el zoom, movimiento y marcado en esta imagen de ejemplo
                            </p>
                        </div>
                    </div>
                </motion.main>

                {/* Footer Actions */}
                <footer className="shrink-0 pt-4 pb-2 md:pb-6">
                    <div className="flex flex-col md:flex-row w-full max-w-lg mx-auto gap-3 md:gap-4">
                        <Link href="/marking/test" className="flex-1 h-12 bg-game-accent text-game-bg font-bold uppercase tracking-widest text-xs flex items-center justify-center shadow-lg active:scale-95 transition-all">
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
