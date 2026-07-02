'use client';

import Link from "next/link";
import { motion } from 'framer-motion';

export default function CreditsPage() {
    return (
        <div className="flex flex-col h-screen w-full bg-game-bg text-game-text p-4 md:p-8 overflow-hidden items-center justify-center font-sans">
            <div className="flex flex-col h-full max-w-xl w-full mx-auto justify-between py-4 md:py-12">
                
                {/* 1. HEADER */}
                <motion.header
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="text-center space-y-1 shrink-0 py-2"
                >
                    <h1 className="text-2xl md:text-4xl font-bold uppercase italic tracking-tighter text-game-accent">
                        ¡Gracias por jugar!
                    </h1>
                </motion.header>

                {/* 2. MAIN AREA */}
                <motion.main
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.2, duration: 0.6 }}
                    className="flex-1 flex flex-col items-center justify-center my-6 shrink-0"
                >
                    <div className="bg-game-surface/30 p-8 border border-game-muted/20 rounded-sm shadow-2xl w-full text-center">
                        <p className="leading-relaxed text-zinc-300 text-sm md:text-base">
                            Muchas gracias por jugar Antipatrón. El desarrollo completo de la experiencia fue desarrollado por Inti Vidal.
                        </p>
                    </div>
                </motion.main>

                {/* 3. FOOTER */}
                <motion.footer
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4 }}
                    className="shrink-0 pt-4 pb-2 flex justify-center"
                >
                    <Link
                        href="/"
                        className="w-full max-w-xs h-12 bg-game-accent text-game-bg font-bold uppercase tracking-widest text-xs flex items-center justify-center shadow-lg active:scale-95 transition-all"
                    >
                        Volver al inicio
                    </Link>
                </motion.footer>

            </div>
        </div>
    );
}
