'use client';

import Link from "next/link";
import { motion } from 'framer-motion';

export default function CreditsPage() {
    return (
        <div className="flex flex-col h-screen w-full items-center justify-center bg-game-bg text-game-text p-4 md:p-6 overflow-hidden relative font-sans">
            
            {/* Background glowing/pulsing light circles for premium feel */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <motion.div 
                    animate={{
                        scale: [1, 1.2, 1],
                        opacity: [0.15, 0.25, 0.15]
                    }}
                    transition={{
                        repeat: Infinity,
                        duration: 8,
                        ease: "easeInOut"
                    }}
                    className="absolute -top-[20%] -left-[10%] w-[60%] aspect-square rounded-full bg-game-accent/20 blur-[120px]"
                />
                <motion.div 
                    animate={{
                        scale: [1.2, 1, 1.2],
                        opacity: [0.1, 0.2, 0.1]
                    }}
                    transition={{
                        repeat: Infinity,
                        duration: 10,
                        ease: "easeInOut"
                    }}
                    className="absolute -bottom-[20%] -right-[10%] w-[50%] aspect-square rounded-full bg-blue-500/10 blur-[100px]"
                />
            </div>

            <div className="flex flex-col h-full max-w-xl w-full mx-auto justify-between py-8 md:py-16 relative z-10">
                
                {/* 1. Header with custom icon and main title */}
                <motion.header
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="text-center space-y-4 shrink-0"
                >
                    <div className="w-14 h-14 mx-auto rounded-full bg-game-accent/15 border border-game-accent/30 flex items-center justify-center shadow-lg shadow-game-accent/5">
                        <span className="text-game-accent text-2xl font-bold">🎓</span>
                    </div>
                    <div className="space-y-1">
                        <h1 className="text-3xl md:text-5xl font-black uppercase italic tracking-tighter text-game-accent">
                            ¡Gracias por jugar!
                        </h1>
                        <p className="text-game-muted uppercase tracking-widest text-[9px] md:text-xs">
                            Demo de Experiencia Finalizada
                        </p>
                    </div>
                </motion.header>

                {/* 2. Central Content Card with glassmorphism */}
                <motion.main
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.3, duration: 0.6 }}
                    className="flex-1 flex flex-col items-center justify-center my-6"
                >
                    <div className="bg-game-surface/20 p-6 md:p-10 border border-game-muted/10 rounded-sm shadow-2xl space-y-6 w-full text-center backdrop-blur-md">
                        <p className="text-zinc-300 text-xs md:text-sm leading-relaxed max-w-md mx-auto">
                            Has completado con éxito todas las etapas del prototipo interactivo de <strong>Antipatrón</strong>.
                        </p>
                        <p className="text-zinc-400 text-xs md:text-sm leading-relaxed max-w-md mx-auto">
                            A través de esta demo, has aprendido a identificar y clasificar trampas cognitivas como 
                            <span className="text-game-accent font-semibold"> Sneaking</span>, 
                            <span className="text-game-accent font-semibold"> Hiding Information</span>, 
                            <span className="text-game-accent font-semibold"> Reference Pricing</span>, 
                            <span className="text-game-accent font-semibold"> Confirmshaming</span> y 
                            <span className="text-game-accent font-semibold"> Drip Pricing</span>.
                        </p>
                        <p className="text-zinc-300 text-xs md:text-sm leading-relaxed max-w-md mx-auto italic font-serif">
                            ¡Tu habilidad para proteger tu autonomía y libertad de elección en la red ha mejorado!
                        </p>
                    </div>
                </motion.main>

                {/* 3. Footer / Credits & Back Button */}
                <motion.footer
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.6 }}
                    className="space-y-8 shrink-0 text-center"
                >
                    <div className="space-y-1">
                        <p className="text-game-muted uppercase tracking-wider text-[9px] font-bold">Proyecto de Título</p>
                        <p className="text-lg md:text-xl font-bold text-zinc-300">
                            Desarrollado por <span className="text-game-accent italic font-semibold">Inti Vidal</span>
                        </p>
                        <p className="text-[10px] text-game-muted/50 font-mono">Universidad Técnica Federico Santa María</p>
                    </div>

                    <Link
                        href="/"
                        className="inline-block text-xs uppercase tracking-widest text-game-muted hover:text-game-accent hover:scale-105 active:scale-95 transition-all underline underline-offset-4 font-bold"
                    >
                        Volver al inicio
                    </Link>
                </motion.footer>
            </div>
        </div>
    );
}
