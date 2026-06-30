'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function PlayerProfilePage() {
    const [nickname, setNickname] = useState('');
    const [age, setAge] = useState('');
    const [playerId, setPlayerId] = useState<string | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [isConsentGiven, setIsConsentGiven] = useState(true);
    const router = useRouter();

    useEffect(() => {
        const id = localStorage.getItem('antipatron_player_id');
        setPlayerId(id);
        const consent = localStorage.getItem('antipatron_consent') !== 'false';
        setIsConsentGiven(consent);

        if (id) {
            fetch(`/api/player/profile?playerId=${id}`)
                .then(res => res.ok ? res.json() : null)
                .then(data => {
                    if (data) {
                        if (data.nickname) setNickname(data.nickname);
                        if (data.age) setAge(data.age.toString());
                    }
                })
                .catch(err => console.error("Error cargando datos del jugador:", err))
                .finally(() => setIsLoading(false));
        } else {
            setIsLoading(false);
        }
    }, []);

    const handleSubmit = async (e?: React.FormEvent) => {
        if (e) e.preventDefault();
        setErrorMessage(null);

        const nicknameRegex = /^[a-zA-Z0-9_]+$/;
        if (!nicknameRegex.test(nickname)) {
            setErrorMessage("Formato inválido: Solo se permiten letras, números y guiones bajos.");
            return;
        }

        if (!nickname || !age || isSubmitting) return;

        setIsSubmitting(true);
        try {
            const response = await fetch('/api/player/profile', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    playerId,
                    nickname,
                    age: parseInt(age)
                }),
            });

            const data = await response.json();

            if (response.ok) {
                if (isConsentGiven) {
                    router.push('/survey/intro');
                } else {
                    router.push('/game/narrative/instructions');
                }
            } else if (response.status === 409) {
                setErrorMessage("Este nickname ya está en uso.");
            } else if (data.error === 'INVALID_FORMAT') {
                setErrorMessage(data.message);
            } else {
                setErrorMessage("Error al guardar datos.");
            }
        } catch (error) {
            console.error("Error:", error);
            setErrorMessage("Error de conexión.");
        } finally {
            setIsSubmitting(false);
        }
    };

    const parsedAge = parseInt(age);

    if (isLoading) {
        return (
            <div className="flex h-screen w-full items-center justify-center bg-game-bg">
                <p className="text-game-muted animate-pulse uppercase tracking-widest text-[10px] italic">Sincronizando datos...</p>
            </div>
        );
    }

    return (
        <div className="flex flex-col h-screen w-full bg-game-bg text-game-text p-4 md:p-8 overflow-hidden items-center justify-center font-sans">

            <div className="flex flex-col h-full max-w-4xl w-full mx-auto justify-between py-4 md:py-12">

                {/* 1. HEADER (shrink-0) */}
                <motion.header
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="text-center space-y-1 shrink-0 py-2"
                >
                    <h1 className="text-3xl md:text-5xl font-bold uppercase italic tracking-tighter text-game-accent">
                        Datos del Jugador
                    </h1>
                    <p className="text-game-muted text-[10px] md:text-xs uppercase tracking-widest">
                        {isConsentGiven ? "Identificación para fines estadísticos" : "Identificación básica para el juego"}
                    </p>
                </motion.header>

                {/* 2. ÁREA CENTRAL (flex-1): Con scroll interno si es necesario */}
                <motion.main
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.2, duration: 0.6 }}
                    className="flex-1 flex flex-col items-center min-h-0 overflow-y-auto custom-scrollbar"
                >
                    {/* Contenedor que agrupa el cuadro de datos y la explicación */}
                    <div className="my-auto w-full max-w-md space-y-4 py-4 shrink-0">
                        {/* Cuadro de insertar nick y edad */}
                        <div className="bg-game-surface/30 p-8 border border-game-muted/10 rounded-sm shadow-2xl py-10">
                            <form onSubmit={handleSubmit} className="space-y-8">
                                <div className="space-y-3">
                                    <label className="text-[10px] uppercase tracking-widest text-game-muted italic ml-1 font-bold text-game-accent/70">Nombre o Nickname</label>
                                    <input
                                        type="text"
                                        required
                                        minLength={3}
                                        maxLength={20}
                                        pattern="^[a-zA-Z0-9_]+$"
                                        value={nickname}
                                        onChange={(e) => {
                                            setNickname(e.target.value);
                                            setErrorMessage(null);
                                        }}
                                        className={`w-full h-12 bg-game-bg border ${errorMessage && (errorMessage.includes("nickname") || errorMessage.includes("Formato")) ? 'border-red-500' : 'border-game-muted/30'} px-4 text-game-text focus:border-game-accent outline-none transition-colors font-mono text-sm`}
                                        placeholder="..."
                                    />
                                    <div className="flex justify-between text-[8px] uppercase text-game-muted/40 font-mono px-1">
                                        <span>3-20 caracteres</span>
                                        <span>{nickname.length}/20</span>
                                    </div>
                                </div>

                                <div className="space-y-3">
                                    <label className="text-[10px] uppercase tracking-widest text-game-muted italic ml-1 font-bold text-game-accent/70">Edad</label>
                                    <input
                                        type="number"
                                        required
                                        min="18"
                                        max="120"
                                        value={age}
                                        onChange={(e) => setAge(e.target.value)}
                                        className="w-full h-12 bg-game-bg border border-game-muted/30 px-4 text-game-text focus:border-game-accent outline-none transition-colors font-mono text-sm"
                                        placeholder="18"
                                    />
                                    {parsedAge >= 118 ? (
                                        <p className="text-[9px] text-red-500 font-bold uppercase mt-1 px-1 leading-tight italic">
                                            La persona más longeva al día de hoy tiene 117 años. ¡Felicitaciones por el logro de todas formas!
                                        </p>
                                    ) : (
                                        <p className="text-[9px] text-red-500 font-medium uppercase italic px-1">
                                            * Mínimo 18 años requerido.
                                        </p>
                                    )}
                                </div>

                                {errorMessage && (
                                    <p className="text-[10px] text-red-500 bg-red-500/10 p-3 border border-red-500/20 text-center uppercase tracking-tight font-bold">
                                        {errorMessage}
                                    </p>
                                )}
                            </form>
                        </div>

                        {/* Explicación en caso de que NO haya dado consentimiento */}
                        {!isConsentGiven && (
                            <div className="p-4 bg-game-surface/50 border border-game-muted/20 text-zinc-300 text-[10px] md:text-xs text-left font-mono rounded-sm leading-relaxed">
                                Tu perfil se creará únicamente para fines de reconocimiento básico dentro de la narrativa (por ejemplo, para que los diálogos del juego se refieran a ti por tu nombre/nick). Como decidiste no dar tu consentimiento, todo el testeo, encuestas y recopilación de información para el estudio del juego han sido omitidos y no se registrarán en la base de datos; solo se tomarán los datos pertinentes a tus decisiones de la historia.
                            </div>
                        )}
                    </div>
                </motion.main>

                {/* 3. FOOTER (shrink-0) */}
                <footer className="shrink-0 pt-4 pb-2 md:pb-6">
                    <div className="flex flex-col md:flex-row w-full max-w-lg mx-auto gap-3 md:gap-4">
                        <button
                            onClick={handleSubmit}
                            disabled={isSubmitting || nickname.length < 3 || !age || parsedAge < 18}
                            className={`flex-1 h-12 font-bold uppercase tracking-widest text-xs transition-all active:scale-95 shadow-lg ${nickname.length < 3 || !age || isSubmitting || parsedAge < 18
                                    ? 'bg-game-surface text-game-muted opacity-50 cursor-not-allowed'
                                    : 'bg-game-accent text-game-bg hover:bg-game-text'
                                }`}
                        >
                            {isSubmitting ? 'Guardando...' : 'Confirmar Datos'}
                        </button>

                        <Link
                            href="/onboarding"
                            className="flex-1 flex items-center justify-center h-12 border border-zinc-700 text-game-muted font-bold uppercase tracking-widest text-xs transition-all hover:bg-game-surface hover:text-game-accent active:scale-95 text-center"
                        >
                            Regresar
                        </Link>
                    </div>
                </footer>

            </div>
        </div>
    );
}
