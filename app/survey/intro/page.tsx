'use client';

import Link from "next/link";
import { motion } from 'framer-motion';

export default function LikertIntroPage() {
    return (
        <div className="flex flex-col h-screen w-full bg-game-bg text-game-text p-4 md:p-8 overflow-hidden items-center justify-center font-sans">
            
            <div className="flex flex-col h-full max-w-4xl w-full mx-auto justify-between py-4 md:py-12">

                {/* 1. HEADER */}
                <motion.header
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="text-center space-y-2 shrink-0 py-2"
                >
                    <h1 className="text-3xl md:text-5xl font-bold uppercase italic tracking-tighter text-game-accent">
                        Contexto del Jugador
                    </h1>
                    <p className="text-game-muted uppercase tracking-widest text-[9px] md:text-sm max-w-md mx-auto leading-relaxed">
                        Cuestionario general de comportamiento y conocimiento digital.
                    </p>
                </motion.header>

                {/* 2. ÁREA CENTRAL: Eliminamos justify-center para evitar el clipping */}
                <motion.main
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.3, duration: 0.6 }}
                    className="flex-1 flex flex-col items-center min-h-0 overflow-y-auto custom-scrollbar"
                >
                    {/* El contenedor con my-auto centra el contenido solo si hay espacio */}
                    <div className="my-auto py-8 flex flex-col items-center space-y-8 md:space-y-16 w-full shrink-0">
                        <div className="bg-game-surface/30 p-8 md:p-12 border border-game-muted/20 rounded-sm shadow-2xl w-full max-w-3xl shrink-0">
                            <p className="leading-relaxed text-zinc-300 italic text-sm md:text-lg max-w-xl mx-auto text-center">
                                "A continuación se presentarán <span className="text-yellow-200 font-bold">20</span> afirmaciones sobre tus hábitos y conocimientos digitales.
                                Responde en una escala del <span className="text-red-500 font-bold">1</span> al <span className="text-blue-500 font-bold">5</span>, donde 1 es muy en desacuerdo y 5 es muy de acuerdo."
                            </p>
                        </div>

                        <div className="flex justify-center space-x-8 md:space-x-20 text-[9px] md:text-[10px] uppercase tracking-widest text-game-muted font-bold shrink-0">
                            <div className="flex flex-col items-center space-y-2">
                                <span className="text-game-accent text-2xl md:text-3xl">1</span>
                                <span className="opacity-50">Muy en desacuerdo</span>
                            </div>
                            <div className="flex flex-col items-center space-y-2 translate-y-3 text-game-accent/20">
                                <span className="text-2xl md:text-3xl italic">...</span>
                            </div>
                            <div className="flex flex-col items-center space-y-2">
                                <span className="text-game-accent text-2xl md:text-3xl">5</span>
                                <span className="opacity-50">Muy de acuerdo</span>
                            </div>
                        </div>
                    </div>
                </motion.main>

                {/* 3. FOOTER */}
                <footer className="shrink-0 pt-4 pb-2 md:pb-6">
                    <div className="flex flex-col md:flex-row w-full max-w-lg mx-auto gap-3 md:gap-4">
                        <Link
                            href="/survey"
                            className="flex-1 flex items-center justify-center h-12 bg-game-accent text-game-bg font-bold uppercase tracking-widest text-xs transition-all hover:bg-game-text active:scale-95 text-center shadow-lg"
                        >
                            Iniciar Cuestionario
                        </Link>

                        <Link
                            href="/survey/profile"
                            className="flex-1 flex items-center justify-center h-12 border border-zinc-700 text-game-muted font-bold uppercase tracking-widest text-xs transition-all hover:bg-game-surface hover:text-game-accent active:scale-95 text-center"
                        >
                            Corregir datos
                        </Link>
                    </div>
                </footer>

            </div>
        </div>
    );
}
