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

// Banco de preguntas
const SURVEY_QUESTIONS = [
    // Dimensión I: Hábitos de Consumo e Interacción Digital
    { id: 'd1_q1', text: 'Paso gran parte de mi tiempo diario utilizando redes sociales y aplicaciones de entretenimiento.', dimension: 0 },
    { id: 'd1_q2', text: 'Utilizo sitios web y aplicaciones móviles para realizar tareas importantes (estudios, trabajo, trámites).', dimension: 0 },
    { id: 'd1_q3', text: 'Suelo revisar y ajustar las configuraciones de privacidad al instalar una nueva aplicación.', dimension: 0 },
    { id: 'd1_q4', text: 'Dedico tiempo a leer o escanear los puntos clave de los términos y condiciones antes de aceptar un servicio.', dimension: 0 },
    { id: 'd1_q5', text: 'Abandono sitios web o aplicaciones si las condiciones de uso o permisos solicitados me parecen sospechosos o tediosos.', dimension: 0 },

    // Dimensión II: Competencia Técnica e Informática
    { id: 'd2_q1', text: 'Entiendo claramente qué son conceptos como las "cookies" y cómo afectan mi privacidad al navegar.', dimension: 1 },
    { id: 'd2_q2', text: 'Comprendo que los algoritmos de recomendación filtran y deciden gran parte del contenido que veo en línea.', dimension: 1 },
    { id: 'd2_q3', text: 'Me siento capaz de explicar de forma básica cómo se almacena y procesa mi información en la nube.', dimension: 1 },
    { id: 'd2_q4', text: 'Realizo compras y trámites bancarios en línea con total seguridad y confianza técnica.', dimension: 1 },
    { id: 'd2_q5', text: 'Tengo conocimientos básicos sobre la estructura interna de una web (servidores, bases de datos o código).', dimension: 1 },

    // Dimensión III: Conciencia de Diseño y Patrones Oscuros
    { id: 'd3_q1', text: 'Reconozco cuando una interfaz intenta guiarme hacia una decisión que beneficia a la empresa y no a mí.', dimension: 2 },
    { id: 'd3_q2', text: 'Noto rápidamente cuando un diseño es confuso a propósito para dificultar acciones como cancelar una suscripción.', dimension: 2 },
    { id: 'd3_q3', text: 'Estoy familiarizado con conceptos de diseño de interfaces (UI) y experiencia de usuario (UX).', dimension: 2 },
    { id: 'd3_q4', text: 'Identifico tácticas de presión psicológica como contadores de tiempo falsos o avisos de stock limitado.', dimension: 2 },
    { id: 'd3_q5', text: 'Soy consciente de que la disposición de los elementos y los colores influyen directamente en mis decisiones.', dimension: 2 },

    // Dimensión IV: Marco Legal y Derechos del Consumidor
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
                        if (firstUnanswered !== -1) {
                            setCurrentIndex(firstUnanswered);
                        } else {
                            setCurrentIndex(SURVEY_QUESTIONS.length - 1);
                        }
                    }
                })
                .catch(err => console.error("Error cargando respuestas previas:", err))
                .finally(() => setIsLoading(false));
        } else {
            setIsLoading(false);
        }
    }, []);

    const handleSelect = (score: number) => {
        const currentQuestion = SURVEY_QUESTIONS[currentIndex];
        setAnswers({ ...answers, [currentQuestion.id]: score });

        setTimeout(() => {
            if (currentIndex < SURVEY_QUESTIONS.length - 1) {
                setDirection(1);
                setCurrentIndex(currentIndex + 1);
            }
        }, 250);
    };

    const goToQuestion = (index: number) => {
        setDirection(index > currentIndex ? 1 : -1);
        setCurrentIndex(index);
    };

    const handleFinish = async () => {
        if (isSubmitting || !playerId) return;
        setIsSubmitting(true);

        const formattedResponses = Object.entries(answers).map(([id, score]) => ({
            questionId: id,
            score: score
        }));

        try {
            const response = await fetch('/api/survey', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ playerId, responses: formattedResponses }),
            });

            if (response.ok) {
                router.push('/game');
            } else {
                alert("Error al guardar respuestas.");
            }
        } catch (error) {
            console.error("Error:", error);
        } finally {
            setIsSubmitting(false);
        }
    };

    if (isLoading) {
        return (
            <div className="flex h-screen w-full items-center justify-center bg-game-bg">
                <p className="text-game-muted animate-pulse uppercase tracking-widest text-xs italic">Sincronizando tus respuestas...</p>
            </div>
        );
    }

    const currentQuestion = SURVEY_QUESTIONS[currentIndex];
    const progress = ((currentIndex + 1) / SURVEY_QUESTIONS.length) * 100;
    const isLastQuestion = currentIndex === SURVEY_QUESTIONS.length - 1;
    const hasAnsweredCurrent = answers[currentQuestion.id] !== undefined;

    return (
        <div className="flex flex-col h-screen w-full bg-game-bg text-game-text overflow-hidden relative font-sans">

            <div className="absolute top-0 left-0 w-full h-1 bg-game-surface/30 z-50">
                <motion.div
                    className="h-full bg-game-accent"
                    initial={{ width: 0 }}
                    animate={{ width: `${progress}%` }}
                    transition={{ duration: 0.5 }}
                />
            </div>

            <div className="flex flex-col h-full max-w-4xl w-full mx-auto justify-between py-8 px-6">

                <header className="flex justify-between items-start shrink-0">
                    <div className="space-y-1 max-w-[60%]">
                        <AnimatePresence mode="wait">
                            <motion.p 
                                key={currentQuestion.dimension}
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: 10 }}
                                className="text-[10px] uppercase tracking-widest text-game-accent font-bold italic"
                            >
                                {DIMENSIONS[currentQuestion.dimension]}
                            </motion.p>
                        </AnimatePresence>
                        <h1 className="text-xs font-mono text-game-muted">Pregunta {currentIndex + 1} de {SURVEY_QUESTIONS.length}</h1>
                    </div>

                    <div className="grid grid-cols-10 gap-1 bg-game-surface/20 p-2 border border-game-muted/10 rounded-sm">
                        {SURVEY_QUESTIONS.map((q, idx) => (
                            <button
                                key={q.id}
                                onClick={() => goToQuestion(idx)}
                                className={`w-3 h-3 text-[7px] flex items-center justify-center transition-all
                ${currentIndex === idx ? 'bg-game-accent text-game-bg scale-110' :
                                        answers[q.id] ? 'bg-game-muted/40 text-white' : 'bg-zinc-900 text-zinc-700'}`}
                            >
                                {idx + 1}
                            </button>
                        ))}
                    </div>
                </header>

                <div className="relative flex-1 flex items-center justify-center overflow-hidden py-12">
                    <AnimatePresence mode="wait" custom={direction}>
                        <motion.div
                            key={currentQuestion.id}
                            initial={{ x: direction > 0 ? 100 : -100, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            exit={{ x: direction > 0 ? -100 : 100, opacity: 0 }}
                            transition={{ duration: 0.4, ease: "anticipate" }}
                            className="w-full max-w-2xl text-center px-4"
                        >
                            <h2 className="text-xl md:text-3xl font-medium leading-relaxed text-zinc-100 italic">
                                "{currentQuestion.text}"
                            </h2>
                        </motion.div>
                    </AnimatePresence>
                </div>

                <footer className="space-y-10 shrink-0 w-full max-w-2xl mx-auto pb-6">

                    <div className="grid grid-cols-5 gap-4 md:gap-8 items-start justify-items-center">
                        {[1, 2, 3, 4, 5].map((num) => (
                            <div key={num} className="flex flex-col items-center space-y-4 w-full">
                                <button
                                    onClick={() => handleSelect(num)}
                                    className={`w-14 h-14 md:w-16 md:h-16 rounded-full border-2 flex items-center justify-center text-lg font-mono transition-all duration-300
                  ${answers[currentQuestion.id] === num
                                            ? 'bg-game-accent border-game-accent text-game-bg scale-110 shadow-[0_0_20px_rgba(255,255,255,0.25)]'
                                            : 'border-zinc-800 text-game-muted hover:border-zinc-500 hover:text-zinc-200'}`}
                                >
                                    {num}
                                </button>

                                {(num === 1 || num === 5) && (
                                    <span className="text-[9px] uppercase tracking-tighter text-game-muted/60 text-center leading-tight absolute mt-16 md:mt-20">
                                        {num === 1 ? 'Muy en desacuerdo' : 'Muy de acuerdo'}
                                    </span>
                                )}
                            </div>
                        ))}
                    </div>

                    <div className="flex justify-between items-center pt-8 border-t border-game-muted/10 h-16">
                        <button
                            onClick={() => goToQuestion(currentIndex - 1)}
                            disabled={currentIndex === 0}
                            className={`text-[10px] uppercase tracking-widest transition-all ${currentIndex === 0 ? 'opacity-0' : 'text-game-muted hover:text-game-accent'}`}
                        >
                            ← Anterior
                        </button>

                        <div className="flex-1 flex justify-end">
                            {isLastQuestion ? (
                                hasAnsweredCurrent && (
                                    <motion.button
                                        initial={{ opacity: 0, scale: 0.9 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        onClick={handleFinish}
                                        disabled={isSubmitting}
                                        className="bg-game-accent text-game-bg px-10 py-4 font-bold uppercase text-xs tracking-widest hover:bg-game-text transition-all shadow-lg"
                                    >
                                        {isSubmitting ? 'Guardando...' : 'Finalizar Cuestionario'}
                                    </motion.button>
                                )
                            ) : (
                                hasAnsweredCurrent && (
                                    <button
                                        onClick={() => goToQuestion(currentIndex + 1)}
                                        className="flex items-center text-[10px] uppercase tracking-widest text-game-accent font-bold hover:translate-x-1 transition-transform"
                                    >
                                        Siguiente →
                                    </button>
                                )
                            )}
                        </div>
                    </div>
                </footer>

            </div>
        </div>
    );
}
