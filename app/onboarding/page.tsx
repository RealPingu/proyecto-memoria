'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';

export default function OnboardingPage() {
    const [consent, setConsent] = useState(true);
    const [showPopup, setShowPopup] = useState(false);
    const [showFinalPopup, setShowFinalPopup] = useState(false);
    const [playerId, setPlayerId] = useState<string | null>(null);
    const router = useRouter();

    useEffect(() => {
        const id = localStorage.getItem('antipatron_player_id');
        setPlayerId(id);
    }, []);

    const logInteraction = async (eventName: string, metadata: any = {}) => {
        if (!playerId) return;
        try {
            fetch('/api/logs', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ playerId, eventName, metadata }),
            });
        } catch (e) {
            console.error("Error guardando log:", e);
        }
    };

    const handleSaveConsent = async () => {
        await logInteraction('final_game_entry', { final_consent: consent });
        localStorage.setItem('antipatron_consent', consent ? 'true' : 'false');
        if (playerId) {
            try {
                fetch('/api/player/consent', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ playerId, consent }),
                });
            } catch (error) {
                console.error("Error silencioso al guardar datos:", error);
            }
        }
    };

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.3 }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, x: -10 },
        visible: { opacity: 1, x: 0, transition: { duration: 0.5 } }
    };

    return (
        <div className="flex flex-col h-screen w-full bg-game-bg text-game-text p-4 md:p-8 overflow-hidden items-center justify-center relative font-sans">
            <div className="flex flex-col h-full max-w-4xl w-full mx-auto space-y-4 md:space-y-6">

                {/* Cabecera */}
                <motion.header
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="text-center space-y-1 shrink-0 py-2"
                >
                    <h1 className="text-2xl md:text-4xl font-bold uppercase italic tracking-tighter text-game-accent">
                        Reglas de la Experiencia
                    </h1>
                    <p className="text-game-muted uppercase tracking-widest text-[9px] md:text-xs">
                        Por favor, lee con atención antes de comenzar
                    </p>
                </motion.header>

                {/* CUADRO DE REGLAS EXPANDIDO */}
                <motion.section
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    className="flex-1 min-h-0 space-y-6 bg-game-surface/30 p-5 md:p-10 border border-game-muted/20 rounded-sm overflow-y-auto custom-scrollbar"
                >
                    <motion.div variants={itemVariants} className="flex items-start space-x-4">
                        <div className="mt-2 w-1.5 h-1.5 rounded-full bg-red-500 shrink-0" />
                        <p className="leading-relaxed text-zinc-300 text-sm md:text-base">
                            <span className="text-lg font-bold text-red-500 block mb-1">Requisito de Edad:</span>
                            Esta experiencia está diseñada exclusivamente para personas <span className="text-red-500 font-bold uppercase">mayores de edad</span> (18+ años). Si eres menor de edad, te solicitamos que <span className="underline decoration-red-500">por favor abandones la página</span>, ya que el protocolo ético de este estudio prohíbe la participación de menores.
                        </p>
                    </motion.div>

                    <motion.div variants={itemVariants} className="flex items-start space-x-4">
                        <div className="mt-2 w-1.5 h-1.5 rounded-full bg-game-accent shrink-0" />
                        <p className="leading-relaxed text-zinc-300 text-sm md:text-base">
                            <span className="text-lg font-bold text-game-accent block mb-1">Propósito:</span>
                            Antipatron fue diseñado como una experiencia gamificada <span className='text-blue-500'>(demo)</span> sobre patrones oscuros, con el fin de recaudar datos de estudio sobre su capacidad para enseñar a identificarlos.
                        </p>
                    </motion.div>

                    <motion.div variants={itemVariants} className="flex items-start space-x-4">
                        <div className="mt-2 w-1.5 h-1.5 rounded-full bg-game-accent shrink-0" />
                        <p className="leading-relaxed text-zinc-300 text-sm md:text-base">
                            <span className="text-lg font-bold text-game-accent block mb-1">Normas de comportamiento:</span>
                            Antipatron presenta actividades comunitarias y requiere el consentimiento de mantener una actitud seria, evitando el uso de lenguaje obsceno, soez o de índole ajena al propósito de la experiencia.
                        </p>
                    </motion.div>

                    <motion.div variants={itemVariants} className="flex items-start space-x-4">
                        <div className="mt-2 w-1.5 h-1.5 rounded-full bg-game-accent shrink-0" />
                        <p className="leading-relaxed text-zinc-300 text-sm md:text-base">
                            <span className="text-lg font-bold text-game-accent block mb-1">Recaudación de datos:</span>
                            Antipatron recolecta datos básicos de la experiencia con propósitos educativos y de estudio, manteniendo el anonimato de los mismos en todo momento.
                        </p>
                    </motion.div>
                </motion.section>

                {/* Área inferior fija */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.6, duration: 0.8 }}
                    className="space-y-4 shrink-0 pb-4"
                >
                    <div className="w-full opacity-30 hover:opacity-50 transition-opacity max-w-2xl mx-auto">
                        <label className="flex items-start space-x-3 cursor-pointer group p-2">
                            <div className="relative flex items-center justify-center mt-0.5">
                                <input
                                    type="checkbox"
                                    checked={consent}
                                    onChange={() => {
                                        const nextValue = !consent;
                                        setConsent(nextValue);
                                        if (nextValue === false) {
                                            logInteraction('attempt_uncheck');
                                            setShowPopup(true);
                                        } else {
                                            logInteraction('recheck_consent');
                                        }
                                    }}
                                    className="peer h-4 w-4 opacity-0 absolute cursor-pointer"
                                />
                                <div className="h-4 w-4 border border-zinc-800 bg-transparent peer-checked:bg-zinc-900 transition-all flex items-center justify-center rounded-sm">
                                    {consent && (
                                        <svg className="w-3 h-3 text-zinc-700 fill-current" viewBox="0 0 20 20">
                                            <path d="M0 11l2-2 5 5L18 3l2 2L7 18z" />
                                        </svg>
                                    )}
                                </div>
                            </div>
                            <span className="text-[10px] text-zinc-600 group-hover:text-zinc-500 transition-colors leading-tight">
                                He leído las reglas, acepto las normas de comportamiento y doy mi consentimiento para que mis datos y decisiones anónimas sean procesadas con fines académicos.
                            </span>
                        </label>
                    </div>

                    <div className="flex flex-col md:flex-row w-full max-w-lg mx-auto gap-3 md:gap-4">
                        <Link
                            href={consent ? "/survey/profile" : "/no-consent-intro"}
                            onClick={handleSaveConsent}
                            className="flex-1 flex items-center justify-center h-16 md:h-12 bg-game-accent text-game-bg font-bold uppercase tracking-widest transition-all hover:bg-game-text active:scale-95 text-center text-sm md:text-xs"
                        >
                            Comenzar la Experiencia
                        </Link>

                        <Link
                            href="/"
                            onClick={() => logInteraction('return_to_menu')}
                            className="flex-1 flex items-center justify-center h-16 md:h-12 border border-zinc-700 text-game-muted font-bold uppercase tracking-widest transition-all hover:bg-game-surface hover:text-game-accent active:scale-95 text-center text-sm md:text-xs"
                        >
                            Volver al menú
                        </Link>
                    </div>
                </motion.div>
            </div>

            {/* POPUP 2: PERSUASIÓN EMOCIONAL (Nagging) - RESPONSIVO */}
            <AnimatePresence>
                {showPopup && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="absolute inset-0 z-50 flex items-center justify-center bg-game-bg/95 backdrop-blur-sm p-4"
                    >
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            onViewportEnter={() => logInteraction('view_persuasion')}
                            className="bg-game-surface border border-game-muted/30 p-6 md:p-8 w-[95%] max-w-md space-y-6 text-center shadow-2xl overflow-y-auto max-h-[90vh]"
                        >
                            <div className="w-20 h-20 md:w-24 md:h-24 mx-auto overflow-hidden">
                                <motion.img 
                                    initial={{ scale: 0.5 }}
                                    animate={{ scale: 1.5 }}
                                    src="/assets/penguin/spin-attack.gif" 
                                    className="w-full h-full object-contain rendering-pixelated"
                                />
                            </div>
                            <h2 className="text-lg md:text-xl font-bold text-game-accent uppercase tracking-tighter">¿Estás seguro de esta decisión?</h2>
                            <p className="text-xs md:text-sm text-game-muted leading-relaxed">
                                Al deshabilitar el consentimiento, la integridad de los datos académicos se verá comprometida. Además, harás a un estudiante de ingeniería bastante triste ;(
                            </p>
                            <div className="flex flex-col space-y-3">
                                <button onClick={() => {setConsent(true); setShowPopup(false); logInteraction('reactivate_consent');}} className="h-11 md:h-12 bg-game-accent text-game-bg font-bold uppercase text-[10px] md:text-xs tracking-widest hover:bg-game-text transition-all">Re-activar consentimiento (Recomendado)</button>
                                <button onClick={() => {setShowPopup(false); setShowFinalPopup(true); logInteraction('reject_persuasion');}} className="text-[9px] md:text-[10px] text-game-muted/50 hover:text-game-muted transition-colors uppercase tracking-widest underline underline-offset-4">Continuar sin consentimiento</button>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* POPUP 3: REVELACIÓN META-NARRATIVA - RESPONSIVO */}
            <AnimatePresence>
                {showFinalPopup && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="absolute inset-0 z-50 flex items-center justify-center bg-game-bg/98 backdrop-blur-md p-4"
                    >
                        <motion.div
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            exit={{ y: 20, opacity: 0 }}
                            onViewportEnter={() => logInteraction('view_revelation')}
                            className="bg-game-bg border-2 border-game-accent/20 p-6 md:p-10 w-[95%] max-w-lg space-y-6 md:space-y-8 text-center overflow-y-auto max-h-[90vh]"
                        >
                            <div className="space-y-4 text-left border-l-2 border-game-accent pl-4 md:pl-6">
                                <h2 className="text-xl md:text-2xl font-bold text-game-accent uppercase italic tracking-tighter">¡Felicidades, has resistido!</h2>
                                <div className="space-y-3 md:space-y-4 text-zinc-400 text-xs md:text-sm leading-relaxed font-mono">
                                    <p>Si llegaste hasta aquí, significa que presenciaste e ignoraste <span className="text-game-accent font-bold">3 patrones oscuros</span>: el Desvío de la atención, la Apelación a las emociones y el Nagging.</p>
                                    <p>Tal como lo quieres, tus datos no serán guardados ni utilizados, solamente el registro técnico de que rechazaste el consentimiento.</p>
                                </div>
                            </div>
                            <button onClick={() => {setShowFinalPopup(false); logInteraction('close_revelation');}} className="h-12 md:h-14 w-full bg-transparent border border-game-accent text-game-accent font-bold uppercase text-[10px] md:text-xs tracking-widest hover:bg-game-accent hover:text-game-bg transition-all">Aceptar y Continuar</button>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
