'use client';

import Link from "next/link";
import { motion } from 'framer-motion';

export default function LikertIntroPage() {
    return (
        <div className="flex flex-col h-screen w-full bg-game-bg text-game-text p-6 md:p-12 overflow-hidden items-center justify-center font-sans">
            <div className="flex flex-col h-full max-w-2xl w-full mx-auto space-y-12 items-center justify-center">

                <motion.header
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="text-center space-y-4 shrink-0"
                >
                    <h1 className="text-3xl md:text-5xl font-bold uppercase italic tracking-tighter text-game-accent">
                        Contexto del Jugador
                    </h1>
                    <p className="text-game-muted uppercase tracking-widest text-xs md:text-sm max-w-md mx-auto">
                        Cuestionario general de comportamiento y conocimiento digital.
                    </p>
                </motion.header>

                <motion.main
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.3, duration: 0.6 }}
                    className="space-y-6 text-center shrink-0 w-full"
                >
                    <div className="bg-game-surface/30 p-8 border border-game-muted/20 rounded-sm">
                        <p className="leading-relaxed text-zinc-300 italic text-sm md:text-base">
                            "A continuación se presentarán <span className="text-yellow-200">20</span> afirmaciones sobre tus hábitos y conocimientos digitales.
                            Responde en una escala del <span className="text-red-500">1</span> al <span className="text-blue-500">5</span>, donde 1 es muy en desacuerdo y 5 es muy de acuerdo."
                        </p>
                    </div>

                    <div className="flex justify-center space-x-8 text-[10px] uppercase tracking-widest text-game-muted">
                        <div className="flex flex-col items-center space-y-2">
                            <span className="text-game-accent font-bold text-lg">1</span>
                            <span>Muy en desacuerdo</span>
                        </div>
                        <div className="flex flex-col items-center space-y-2 text-game-accent/50">
                            <span className="text-lg font-bold">...</span>
                            <span>Escala Likert</span>
                        </div>
                        <div className="flex flex-col items-center space-y-2">
                            <span className="text-game-accent font-bold text-lg">5</span>
                            <span>Muy de acuerdo</span>
                        </div>
                    </div>
                </motion.main>

                <motion.nav
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.8 }}
                    className="flex flex-col w-full max-w-xs space-y-4 shrink-0"
                >
                    <Link
                        href="/survey"
                        className="flex items-center justify-center h-14 w-full bg-game-accent text-game-bg font-bold uppercase tracking-widest transition-all hover:bg-game-text active:scale-95 text-center"
                    >
                        Iniciar el Cuestionario
                    </Link>

                    <Link
                        href="/survey/profile"
                        className="text-center text-[10px] uppercase tracking-widest text-game-muted hover:text-game-accent transition-colors underline underline-offset-8 decoration-zinc-800"
                    >
                        Corregir tus datos de jugador
                    </Link>
                </motion.nav>

            </div>
        </div>
    );
}
