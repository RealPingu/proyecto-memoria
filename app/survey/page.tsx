'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';

// Banco de temas basado en documentacion/SURVEY_QUESTIONS.md
const DIMENSIONS = [
    'Hábitos de Consumo e Interacción Digital',
    'Competencia Técnica e Informática',
    'Conciencia de Diseño y Patrones Oscuros',
    'Marco Legal y Derechos del Consumidor'
];

const SURVEY_QUESTIONS = [
    { id: 'd1_q1', text: 'Paso gran parte de mi tiempo diario utilizando redes sociales y aplicaciones de entretenimiento.', dimension: 0 },
    { id: 'd1_q2', text: 'Utilizo sitios web y aplicaciones móviles para realizar tareas importantes (estudios, trabajo, trámites).', dimension: 0 },
    { id: 'd1_q3', text: 'Suelo revisar y ajustar las configuraciones de privacidad al instalar una nueva aplicación.', dimension: 0 },
    { id: 'd1_q4', text: 'Dedico tiempo a leer o escanear los puntos clave de los términos y condiciones antes de aceptar un servicio.', dimension: 0 },
    { id: 'd1_q5', text: 'Abandono sitios web o aplicaciones si las condiciones de uso o permisos solicitados me parecen sospechosos o tediosos.', dimension: 0 },
    { id: 'd2_q1', text: 'Entiendo claramente qué son conceptos como las "cookies" y cómo afectan mi privacidad al navegar.', dimension: 1 },
    { id: 'd2_q2', text: 'Comprendo que los algoritmos de recomendación filtran y deciden gran parte del contenido que veo en línea.', dimension: 1 },
    { id: 'd2_q3', text: 'Me siento capaz de explicar de forma básica cómo se almacena y procesa mi información en la nube.', dimension: 1 },
    { id: 'd2_q4', text: 'Realizo compras y trámites bancarios en línea con total seguridad y confianza técnica.', dimension: 1 },
    { id: 'd2_q5', text: 'Tengo conocimientos básicos sobre la estructura interna de una web (servidores, bases de datos o código).', dimension: 1 },
    { id: 'd3_q1', text: 'Reconozco cuando una interfaz intenta guiarme hacia una decisión que beneficia a la empresa y no a mí.', dimension: 2 },
    { id: 'd3_q2', text: 'Noto rápidamente cuando un diseño es confuso a propósito para dificultar acciones como cancelar una suscripción.', dimension: 2 },
    { id: 'd3_q3', text: 'Estoy familiarizado con conceptos de diseño de interfaces (UI) y experiencia de usuario (UX).', dimension: 2 },
    { id: 'd3_q4', text: 'Identifico tácticas de presión psicológica como contadores de tiempo falsos o avisos de stock limitado.', dimension: 2 },
    { id: 'd3_q5', text: 'Soy consciente de que la disposición de los elementos y los colores influyen directamente en mis decisiones.', dimension: 2 },
    { id: 'd4_q1', text: 'Conozco mis derechos fundamentales bajo la Ley de Protección al Consumidor en el ámbito digital.', dimension: 3 },
    { id: 'd4_q2', text: 'Sé a qué organismos o instituciones acudir en caso de sentirme engañado por una plataforma web.', dimension: 3 },
    { id: 'd4_q3', text: 'Entiendo las implicancias legales de otorgar mis datos a plataformas digitales de empresas extranjeras.', dimension: 3 },
    { id: 'd4_q4', text: 'Soy consciente de las regulaciones existentes sobre publicidad engañosa y prácticas abusivas en internet.', dimension: 3 },
    { id: 'd4_q5', text: 'Considero que la legislación actual es suficiente para protegerme contra las tácticas de manipulación en la web.', dimension: 3 }
];

export default function SurveyPage() {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [answers, setAnswers] = useState<Record<string, number>>({});
    const [direction, setDirection] = useState(0);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [playerId, setPlayerId] = useState<string | null>(null);
    const router = useRouter();

    useEffect(() => {
        const id = localStorage.getItem('antipatron_player_id');
        setPlayerId(id);

        if (id) {
            fetch(`/api/survey?playerId=${id}`)
                .then(res => res.ok ? res.json() : [])
                .then(data => {
                    if (data && Array.isArray(data)) {
                        const existingAnswers: Record<string, number> = {};
                        data.forEach((item: { question_id: string; score: number }) => {
                            existingAnswers[item.question_id] = item.score;
                        });
                        setAnswers(existingAnswers);
                        const firstUnanswered = SURVEY_QUESTIONS.findIndex(q => !existingAnswers[q.id]);
                        if (firstUnanswered !== -1) setCurrentIndex(firstUnanswered);
                        else setCurrentIndex(SURVEY_QUESTIONS.length - 1);
                    }
                })
                .catch(err => console.error("Error cargando datos:", err))
                .finally(() => setIsLoading(false));
        } else {
            setIsLoading(false);
        }
    }, []);

    const handleSelect = (score: number) => {
        const currentId = SURVEY_QUESTIONS[currentIndex].id;
        setAnswers({ ...answers, [currentId]: score });
        setTimeout(() => {
            if (currentIndex < SURVEY_QUESTIONS.length - 1) {
                setDirection(1);
                setCurrentIndex(currentIndex + 1);
            }
        }, 250);
    };

    const goToQuestion = (index: number) => {
        const firstUnansweredIndex = SURVEY_QUESTIONS.findIndex(q => answers[q.id] === undefined);
        const isAccessible = index <= firstUnansweredIndex || (firstUnansweredIndex === -1);
        if (isAccessible && index >= 0 && index < SURVEY_QUESTIONS.length) {
            setDirection(index > currentIndex ? 1 : -1);
            setCurrentIndex(index);
        }
    };

    const handleFinish = async () => {
        if (isSubmitting || !playerId) return;
        if (Object.keys(answers).length < SURVEY_QUESTIONS.length) {
            alert("Responde todas las preguntas antes de continuar.");
            return;
        }
        setIsSubmitting(true);
        try {
            await fetch('/api/survey', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ playerId, responses: Object.entries(answers).map(([id, score]) => ({ questionId: id, score })) }),
            });
            router.push('/game');
        } catch (error) {
            console.error("Error:", error);
        } finally {
            setIsSubmitting(false);
        }
    };

    if (isLoading) {
        return (
            <div className="flex h-screen w-full items-center justify-center bg-game-bg">
                <p className="text-game-muted animate-pulse uppercase tracking-widest text-[10px] italic">Sincronizando datos...</p>
            </div>
        );
    }

    const currentQuestion = SURVEY_QUESTIONS[currentIndex];
    const progress = ((currentIndex + 1) / SURVEY_QUESTIONS.length) * 100;
    const allAnswered = Object.keys(answers).length === SURVEY_QUESTIONS.length;
    const hasAnsweredCurrent = answers[currentQuestion.id] !== undefined;

    return (
        <div className="flex flex-col h-screen w-full bg-game-bg text-game-text overflow-hidden relative font-sans">
            
            {/* Barra de progreso superior */}
            <div className="absolute top-0 left-0 w-full h-1 bg-game-surface/30 z-50">
                <motion.div className="h-full bg-game-accent" animate={{ width: `${progress}%` }} transition={{ duration: 0.5 }} />
            </div>

            <div className="flex flex-col h-full max-w-4xl w-full mx-auto justify-between py-6 md:py-8 px-6">
                
                <header className="flex justify-between items-start shrink-0">
                    <div className="space-y-1 text-left">
                        <AnimatePresence mode="wait">
                            <motion.p 
                                key={currentQuestion.dimension} 
                                initial={{ opacity: 0, y: -5 }} 
                                animate={{ opacity: 1, y: 0 }} 
                                exit={{ opacity: 0, y: 5 }} 
                                className="hidden md:block text-[10px] uppercase tracking-[0.15em] text-game-accent font-bold italic leading-tight"
                            >
                                {DIMENSIONS[currentQuestion.dimension]}
                            </motion.p>
                        </AnimatePresence>
                        <h1 className="text-[10px] md:text-xs font-mono text-game-muted uppercase">Paso {currentIndex + 1} de 20</h1>
                    </div>

                    {/* NAVEGADOR DESKTOP */}
                    <div className="hidden md:grid grid-cols-10 gap-1 bg-game-surface/20 p-2 border border-game-muted/10 rounded-sm shrink-0">
                        {SURVEY_QUESTIONS.map((q, idx) => {
                            const isAnswered = answers[q.id] !== undefined;
                            const firstUnanswered = SURVEY_QUESTIONS.findIndex(sq => answers[sq.id] === undefined);
                            const isAccessible = idx <= firstUnanswered || (firstUnanswered === -1);
                            const isCurrent = currentIndex === idx;
                            return (
                                <button key={q.id} onClick={() => isAccessible && goToQuestion(idx)} disabled={!isAccessible} className={`w-3 h-3 text-[7px] flex items-center justify-center transition-all border ${isCurrent ? 'bg-game-accent border-game-accent text-game-bg scale-110 shadow-[0_0_8px_rgba(255,255,255,0.4)] z-10' : isAnswered ? 'bg-game-muted/40 border-transparent text-white hover:bg-game-muted/60 cursor-pointer' : isAccessible ? 'bg-zinc-900 border-zinc-700/30 text-zinc-500 cursor-pointer hover:bg-zinc-800' : 'bg-zinc-950 border-transparent text-zinc-800 cursor-not-allowed'}`}>
                                    {idx + 1}
                                </button>
                            );
                        })}
                    </div>

                    {/* NAVEGADOR MÓVIL (Selector Dropdown) */}
                    <div className="md:hidden flex flex-col items-end space-y-2 shrink-0">
                        <select 
                            value={currentIndex} 
                            onChange={(e) => goToQuestion(parseInt(e.target.value))}
                            className="bg-game-surface border border-game-muted/20 text-game-text text-[9px] px-2 py-1 rounded-sm outline-none font-mono uppercase"
                        >
                            {SURVEY_QUESTIONS.map((q, idx) => {
                                const isAnswered = answers[q.id] !== undefined;
                                const firstUnanswered = SURVEY_QUESTIONS.findIndex(sq => answers[sq.id] === undefined);
                                const isAccessible = idx <= firstUnanswered || (firstUnanswered === -1);
                                return (
                                    <option key={q.id} value={idx} disabled={!isAccessible}>
                                        Pág {idx + 1} {isAnswered ? '✓' : ''}
                                    </option>
                                );
                            })}
                        </select>
                    </div>
                </header>

                <div className="relative flex-1 flex flex-col items-center min-h-0 overflow-y-auto custom-scrollbar py-4 md:py-12">
                    <AnimatePresence mode="wait" custom={direction}>
                        <motion.div 
                            key={currentQuestion.id} 
                            initial={{ x: direction > 0 ? 50 : -50, opacity: 0 }} 
                            animate={{ x: 0, opacity: 1 }} 
                            exit={{ x: direction > 0 ? -50 : 50, opacity: 0 }} 
                            transition={{ duration: 0.3 }} 
                            className="w-full max-w-2xl text-center px-2 my-auto shrink-0"
                        >
                            <h2 className="text-lg md:text-3xl font-medium leading-relaxed text-zinc-200 italic">"{currentQuestion.text}"</h2>
                        </motion.div>
                    </AnimatePresence>
                </div>

                <footer className="space-y-8 md:space-y-12 shrink-0 w-full max-w-2xl mx-auto pb-4">
                    
                    {/* ESCALA LIKERT RESPONSIVA */}
                    <div className="grid grid-cols-5 gap-2 md:gap-8 items-start justify-items-center relative">
                        {[1, 2, 3, 4, 5].map((num) => (
                            <div key={num} className="flex flex-col items-center space-y-3 w-full">
                                <button onClick={() => handleSelect(num)} className={`w-11 h-11 md:w-16 md:h-16 rounded-full border-2 flex items-center justify-center text-sm md:text-lg font-mono transition-all duration-300 ${answers[currentQuestion.id] === num ? 'bg-game-accent border-game-accent text-game-bg scale-110 shadow-[0_0_15px_rgba(255,255,255,0.25)]' : 'border-zinc-800 text-game-muted hover:border-zinc-500 hover:text-zinc-200'}`}>
                                    {num}
                                </button>
                                {(num === 1 || num === 5) && (
                                    <span className="text-[8px] md:text-[9px] uppercase tracking-tighter text-game-muted/60 text-center leading-tight absolute mt-14 md:mt-20 max-w-[60px]">
                                        {num === 1 ? 'Muy en desacuerdo' : 'Muy de acuerdo'}
                                    </span>
                                )}
                            </div>
                        ))}
                    </div>

                    <div className="flex justify-between items-center pt-10 md:pt-8 border-t border-game-muted/10">
                        <button onClick={() => goToQuestion(currentIndex - 1)} disabled={currentIndex === 0} className={`text-[10px] uppercase tracking-widest transition-all ${currentIndex === 0 ? 'opacity-0' : 'text-game-muted hover:text-game-accent'}`}>← Ant.</button>

                        <div className="flex space-x-4 items-center">
                            {currentIndex < SURVEY_QUESTIONS.length - 1 && hasAnsweredCurrent && (
                                <button onClick={() => goToQuestion(currentIndex + 1)} className="text-[10px] uppercase tracking-widest text-game-accent font-bold hover:translate-x-1 transition-transform">Sig. →</button>
                            )}
                            {allAnswered && (
                                <button onClick={handleFinish} disabled={isSubmitting} className="h-10 md:h-12 bg-game-accent text-game-bg px-6 md:px-10 font-bold uppercase text-[10px] tracking-widest hover:bg-game-text transition-all active:scale-95 shadow-lg">
                                    {isSubmitting ? '...' : 'Finalizar'}
                                </button>
                            )}
                        </div>
                    </div>
                </footer>
            </div>
        </div>
    );
}
