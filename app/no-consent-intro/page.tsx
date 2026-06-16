'use client';

import Link from "next/link";
import { motion } from 'framer-motion';

export default function NoConsentIntroPage() {
    return (
        <div className="flex flex-col h-screen w-full bg-game-bg text-game-text p-6 md:p-12 overflow-hidden items-center justify-center font-sans">
            
            {/* Contenedor con Arquitectura de Escena: h-full y max-w-4xl */}
            <div className="flex flex-col h-full max-w-4xl w-full mx-auto justify-between py-8 md:py-20">

                {/* 1. HEADER (shrink-0) */}
                <motion.header 
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8 }}
                  className="text-center space-y-2 shrink-0 py-4"
                >
                    <h1 className="text-3xl md:text-5xl font-bold uppercase italic tracking-tighter text-game-accent">
                        Acceso Limitado
                    </h1>
                </motion.header>

                {/* 2. ÁREA CENTRAL (flex-1): Mensaje de privacidad */}
                <motion.main 
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.2, duration: 0.6 }}
                  className="flex-1 flex flex-col items-center min-h-0 overflow-y-auto custom-scrollbar"
                >
                    <div className="my-auto w-full max-w-2xl bg-game-surface/30 p-8 md:p-12 border border-game-muted/20 rounded-sm shadow-2xl shrink-0 text-center py-12">
                        <div className="space-y-6">
                            <p className="leading-relaxed text-zinc-300 text-sm md:text-lg">
                                Has decidido no otorgar tu consentimiento para la recolección de datos académicos. 
                            </p>
                            <div className="pt-6 border-t border-game-muted/10">
                                <p className="leading-relaxed text-zinc-400 text-xs md:text-sm font-mono italic">
                                    "Respetamos tu privacidad. Sin embargo, para cumplir con el protocolo del estudio, las etapas del cuestionario y evaluación pedagógica serán omitidas."
                                </p>
                            </div>
                        </div>
                    </div>
                </motion.main>

                {/* 3. FOOTER (shrink-0) */}
                <footer className="shrink-0 pt-4 pb-6 md:pb-10">
                    <div className="flex flex-col md:flex-row w-full max-w-lg mx-auto gap-4">
                        <Link 
                            href="/game" 
                            className="flex-1 flex items-center justify-center h-12 bg-game-accent text-game-bg font-bold uppercase tracking-widest text-xs transition-all hover:bg-game-text active:scale-95 text-center shadow-lg"
                        >
                            Continuar al juego
                        </Link>

                        <Link 
                            href="/onboarding" 
                            className="flex-1 flex items-center justify-center h-12 border border-zinc-700 text-game-muted font-bold uppercase tracking-widest text-xs transition-all hover:bg-game-surface hover:text-game-accent active:scale-95 text-center"
                        >
                            Revisar consentimiento
                        </Link>
                    </div>
                </footer>

            </div>
        </div>
    );
}
