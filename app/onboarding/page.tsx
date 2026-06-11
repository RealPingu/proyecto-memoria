'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';

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

    // Función para guardar logs de interacción
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
        if (consent && playerId) {
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

    // Variantes para la animación de lista (Stagger)
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.4
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, x: -10 },
        visible: { opacity: 1, x: 0, transition: { duration: 0.5 } }
    };

    return (
        <div className="flex flex-col h-screen w-full bg-game-bg text-game-text p-6 md:p-12 overflow-hidden items-center justify-center relative font-sans">
            <div className="flex flex-col h-full max-w-2xl w-full mx-auto space-y-6">

                <motion.header
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="text-center space-y-2 shrink-0"
                >
                    <h1 className="text-3xl md:text-4xl font-bold uppercase italic tracking-tighter text-game-accent">
                        Reglas de la Experiencia
                    </h1>
                    <p className="text-game-muted uppercase tracking-widest text-[10px] md:text-xs">
                        Por favor, lee con atención antes de comenzar
                    </p>
                </motion.header>

                <motion.section
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    className="flex-1 min-h-0 space-y-8 bg-game-surface/30 p-6 md:p-8 border border-game-muted/20 rounded-sm overflow-y-auto"
                >
                    <motion.div variants={itemVariants} className="flex items-start space-x-4">
                        <div className="mt-2.5 w-1.5 h-1.5 rounded-full bg-red-500 shrink-0" />
                        <p className="leading-relaxed text-zinc-300">
                            <span className="text-lg font-bold text-red-500 block mb-1">Requisito de Edad:</span>
                            Esta experiencia está diseñada exclusivamente para personas <span className="text-red-500 font-bold uppercase">mayores de edad</span> (18+ años). Si usted es menor de edad, le solicitamos que <span>porfavor abandone la pagina </span>, ya que el protocolo ético de este estudio prohíbe la participación de menores.
                        </p>
                    </motion.div>

                    <motion.div variants={itemVariants} className="flex items-start space-x-4">
                        <div className="mt-2.5 w-1.5 h-1.5 rounded-full bg-game-accent shrink-0" />
                        <p className="leading-relaxed text-zinc-300">
                            <span className="text-lg font-bold text-game-accent block mb-1">Propósito:</span>
                            Antipatron fue diseñado como una experiencia gamificada (demo) sobre patrones oscuros, con el fin de recaudar datos de estudio sobre su capacidad para enseñar a identificarlos.
                        </p>
                    </motion.div>

                    <motion.div variants={itemVariants} className="flex items-start space-x-4">
                        <div className="mt-2.5 w-1.5 h-1.5 rounded-full bg-game-accent shrink-0" />
                        <p className="leading-relaxed text-zinc-300">
                            <span className="text-lg font-bold text-game-accent block mb-1">Normas de comportamiento:</span>
                            Antipatron presenta actividades comunitarias y requiere el consentimiento de mantener una actitud seria, evitando el uso de lenguaje obsceno, soez o de índole ajena al propósito de la experiencia.
                        </p>
                    </motion.div>

                    <motion.div variants={itemVariants} className="flex items-start space-x-4">
                        <div className="mt-2.5 w-1.5 h-1.5 rounded-full bg-game-accent shrink-0" />
                        <p className="leading-relaxed text-zinc-300">
                            <span className="text-lg font-bold text-game-accent block mb-1">Recaudación de datos:</span>
                            Antipatron recolecta datos básicos de la experiencia con propósitos educativos y de estudio, manteniendo el anonimato de los mismos en todo momento.
                        </p>
                    </motion.div>
                </motion.section>

                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.6, duration: 0.8 }}
                    className="space-y-6 shrink-0 pb-2"
                >
                    <div className="w-full opacity-30 hover:opacity-50 transition-opacity">
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

                    <div className="flex flex-col w-full max-w-xs mx-auto space-y-3">
                      <Link 
                        href={consent ? "/survey-intro" : "/no-consent-intro"}
                        onClick={handleSaveConsent}
                        className="flex items-center justify-center h-14 w-full bg-game-accent text-game-bg font-bold uppercase tracking-widest transition-all hover:bg-game-text active:scale-95 text-center"
                      >
                        Entrar al juego
                      </Link>

                        <Link
                            href="/"
                            onClick={() => logInteraction('return_to_menu')}
                            className="flex items-center justify-center h-14 w-full border border-zinc-700 text-game-muted font-bold uppercase tracking-widest transition-all hover:bg-game-surface hover:text-game-accent active:scale-95 text-center"
                        >
                            Volver al menú
                        </Link>
                    </div>
                </motion.div>
            </div>

            {/* POPUP 2: PERSUASIÓN EMOCIONAL (Nagging) */}
            {showPopup && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="absolute inset-0 z-50 flex items-center justify-center bg-game-bg/95 backdrop-blur-sm p-6"
                >
                    <motion.div
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        onViewportEnter={() => logInteraction('view_persuasion')}
                        className="bg-game-surface border border-game-muted/30 p-8 max-w-md w-full space-y-6 text-center shadow-2xl"
                    >
                        {/* SVG CARA TRISTE (Apelación a la emoción) */}
                        <svg className="w-16 h-16 mx-auto text-game-muted/40 fill-none stroke-current stroke-1" viewBox="0 0 24 24">
                            <circle cx="12" cy="12" r="10" />
                            <path d="M8 15s1.5-2 4-2 4 2 4 2" />
                            <line x1="9" y1="9" x2="9.01" y2="9" strokeWidth="2" strokeLinecap="round" />
                            <line x1="15" y1="9" x2="15.01" y2="9" strokeWidth="2" strokeLinecap="round" />
                        </svg>

                        <h2 className="text-xl font-bold text-game-accent uppercase tracking-tighter">
                            ¿Está seguro de esta decisión?
                        </h2>
                        <p className="text-sm text-game-muted leading-relaxed">
                            Al deshabilitar el consentimiento, la integridad de los datos académicos se verá comprometida, y se perdera el propósito de este estudio.
                            Ademas haras a un estudiante de ingeniria bastante triste ;(
                        </p>

                        <div className="flex flex-col space-y-3">
                            <button
                                onClick={() => {
                                    setConsent(true);
                                    setShowPopup(false);
                                    logInteraction('reactivate_consent');
                                }}
                                className="h-12 bg-game-accent text-game-bg font-bold uppercase text-xs tracking-widest hover:bg-game-text transition-all"
                            >
                                Re-activar consentimiento (Recomendado)
                            </button>

                            <button
                                onClick={() => {
                                    setShowPopup(false);
                                    setShowFinalPopup(true);
                                    logInteraction('reject_persuasion');
                                }}
                                className="text-[10px] text-game-muted/50 hover:text-game-muted transition-colors uppercase tracking-widest underline underline-offset-4"
                            >
                                Continuar sin consentimiento
                            </button>
                        </div>
                    </motion.div>
                </motion.div>
            )}

            {/* POPUP 3: REVELACIÓN META-NARRATIVA */}
            {showFinalPopup && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="absolute inset-0 z-50 flex items-center justify-center bg-game-bg/98 backdrop-blur-md p-6"
                >
                    <motion.div
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        onViewportEnter={() => logInteraction('view_revelation')}
                        className="bg-game-bg border-2 border-game-accent/20 p-10 max-w-lg w-full space-y-8 text-center"
                    >
                        <div className="space-y-4 text-left border-l-2 border-game-accent pl-6">
                            <h2 className="text-2xl font-bold text-game-accent uppercase italic tracking-tighter">
                                Felicidades, has resistido!.
                            </h2>
                            <div className="space-y-4 text-zinc-400 text-sm leading-relaxed font-mono">
                                <p>Si llegaste hasta aquí, significa que presenciaste y evadiste <span className="text-game-accent">3 patrones oscuros</span>: el Desvío de la atención, la Apelación a las emociones y el Nagging.</p>
                                <p>Estos conceptos serán abordados más adelante y son parte de la primera etapa de la experiencia.</p>
                                <p>Tal como lo quieres, tus datos no serán guardados ni utilizados, solamente el registro técnico de que llegaste hasta esta ventana y rechazaste el consentimiento.</p>
                                <p className="italic text-zinc-500">Puedes experimentar la experiencia, pero algunas funciones no fundamentales serán omitidas.</p>
                            </div>
                        </div>

                        <button
                            onClick={() => {
                                setShowFinalPopup(false);
                                logInteraction('close_revelation');
                            }}
                            className="h-14 w-full bg-transparent border border-game-accent text-game-accent font-bold uppercase text-xs tracking-widest hover:bg-game-accent hover:text-game-bg transition-all"
                        >
                            Aceptar y Continuar
                        </button>
                    </motion.div>
                </motion.div>
            )}
        </div>
    );
}
