'use client';

import { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import MarkingVisor from '@/app/components/MarkingVisor';
import { SCENARIOS, PatternOption } from './scenarios';

function MarkingTestContent() {
    const [currentStep, setCurrentStep] = useState(0);
    const [mode, setMode] = useState<'context' | 'marking' | 'selection'>('context');
    const [markedPoints, setMarkedPoints] = useState<{ x: number, y: number, id: number }[]>([]);
    const [selectedPatterns, setSelectedPatterns] = useState<string[]>([]);
    const [timeLeft, setTimeLeft] = useState(0);
    const [isActive, setIsActive] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    
    const router = useRouter();
    const searchParams = useSearchParams();
    
    // Detectamos si es la fase previa o posterior a la narrativa
    const isPostTest = searchParams.get('phase') === 'post';

    const scenario = SCENARIOS[currentStep];

    // Lógica del Temporizador
    useEffect(() => {
        if (!isActive || timeLeft <= 0) {
            if (timeLeft <= 0 && isActive) setIsActive(false);
            return;
        }
        const timer = setInterval(() => setTimeLeft(prev => prev - 1), 1000);
        return () => clearInterval(timer);
    }, [timeLeft, isActive]);

    const startMarking = () => {
        setMarkedPoints([]);
        setSelectedPatterns([]);
        setTimeLeft(scenario.time);
        setMode('marking');
        setIsActive(true);
    };

    const handleMark = (x: number, y: number) => {
        if (!isActive) return;

        const threshold = 4;
        const existingIndex = markedPoints.findIndex(pt => 
            Math.abs(pt.x - x) < threshold && Math.abs(pt.y - y) < threshold
        );

        if (existingIndex !== -1) {
            setMarkedPoints(markedPoints.filter((_, i) => i !== existingIndex));
        } else {
            setMarkedPoints([...markedPoints, { x, y, id: Date.now() }]);
        }
    };

    const togglePattern = (id: string) => {
        setSelectedPatterns(prev => 
            prev.includes(id) ? prev.filter(p => p !== id) : [...prev, id]
        );
    };

    const handleConfirmMarking = () => {
        setIsActive(false);
        if (isPostTest) {
            setMode('selection');
        } else {
            nextScenario();
        }
    };

    const nextScenario = () => {
        if (currentStep < SCENARIOS.length - 1) {
            setCurrentStep(prev => prev + 1);
            setMode('context');
        } else {
            // Fin de la prueba de marcado
            router.push(isPostTest ? '/game/results' : '/game/narrative-intro');
        }
    };

    return (
        <div className="flex flex-col h-screen w-full bg-game-bg text-game-text overflow-hidden relative font-sans">
            
            <AnimatePresence mode="wait">
                {/* 1. MODO CONTEXTO / MISIÓN */}
                {mode === 'context' && (
                    <motion.div 
                        key="context"
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 1.05 }}
                        className="flex flex-col h-full items-center justify-center p-6 text-center"
                    >
                        <div className="my-auto space-y-12">
                            <header className="space-y-2 shrink-0">
                                <h2 className="text-game-accent uppercase tracking-[0.3em] text-[10px] font-bold">Escenario {currentStep + 1} de {SCENARIOS.length}</h2>
                                <h1 className="text-3xl md:text-5xl font-bold uppercase italic tracking-tighter">Misión</h1>
                            </header>

                            <div className="bg-game-surface/30 p-8 md:p-12 border border-game-muted/20 rounded-sm max-w-xl mx-auto shadow-2xl shrink-0 text-center">
                                <p className="text-zinc-300 leading-relaxed text-sm md:text-xl italic">
                                    "{scenario.context}"
                                </p>
                            </div>

                            <div className="flex flex-col w-full max-w-xs mx-auto space-y-4 shrink-0">
                                <button 
                                    onClick={startMarking}
                                    className="h-14 w-full bg-game-accent text-game-bg font-bold uppercase tracking-widest text-xs active:scale-95 transition-all shadow-2xl mx-auto"
                                >
                                    Iniciar Evaluación
                                </button>
                                <Link 
                                    href="/game/marking/intro"
                                    className="h-12 w-full border border-zinc-700 text-game-muted font-bold uppercase tracking-widest text-[10px] flex items-center justify-center hover:bg-game-surface hover:text-game-accent transition-all active:scale-95"
                                >
                                    Regresar
                                </Link>
                            </div>
                        </div>
                    </motion.div>
                )}

                {/* 2. MODO MARCADO INTERACTIVO */}
                {mode === 'marking' && (
                    <motion.div 
                        key="marking"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="flex flex-col h-full w-full"
                    >
                        <header className="p-4 border-b border-game-muted/10 grid grid-cols-3 items-center shrink-0 bg-game-bg z-20">
                            <div className="text-[10px] uppercase font-bold tracking-widest text-game-muted">
                                Marcas: {markedPoints.length}
                            </div>
                            <div className="flex justify-center">
                                <div className={`px-5 py-2 border ${timeLeft < 10 ? 'border-red-500 text-red-500 shadow-[0_0_10px_rgba(239,68,68,0.2)]' : 'border-game-accent/20 text-game-accent'} font-mono font-bold text-xl transition-all duration-500`}>
                                    00:{timeLeft.toString().padStart(2, '0')}
                                </div>
                            </div>
                            <div className="flex justify-end">
                                <button onClick={() => setMarkedPoints([])} className="text-[9px] uppercase font-black text-game-accent underline tracking-tighter hover:text-white transition-colors">Limpiar</button>
                            </div>
                        </header>

                        <main className="flex-1 relative overflow-hidden bg-black/40">
                            <MarkingVisor 
                                mockupUrl={scenario.mockupUrl}
                                markedPoints={markedPoints}
                                onMark={handleMark}
                                isActive={isActive}
                            />
                        </main>

                        <footer className="p-4 bg-game-bg border-t border-game-muted/10 shrink-0 z-20">
                            <button 
                                onClick={handleConfirmMarking}
                                className="h-12 w-full max-w-lg mx-auto block bg-game-accent text-game-bg font-bold uppercase tracking-widest text-xs transition-all active:scale-95 shadow-2xl hover:bg-game-text"
                            >
                                Confirmar Marcado
                            </button>
                        </footer>
                    </motion.div>
                )}

                {/* 3. MODO SELECCIÓN TÉCNICA (Fase 3 únicamente) */}
                {mode === 'selection' && (
                    <motion.div 
                        key="selection"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        className="flex flex-col h-full w-full p-6 md:p-12 overflow-hidden items-center justify-center"
                    >
                        <div className="flex flex-col h-full max-w-2xl w-full mx-auto justify-between py-4">
                            <header className="text-center space-y-2 shrink-0">
                                <h1 className="text-3xl font-bold uppercase italic tracking-tighter text-game-accent">Categorización</h1>
                                <p className="text-game-muted text-[10px] uppercase tracking-widest leading-relaxed">
                                    Identifica qué patrones estaban presentes en la vista anterior
                                </p>
                            </header>

                            <main className="flex-1 min-h-0 overflow-y-auto custom-scrollbar my-8 py-4">
                                <div className="grid grid-cols-1 gap-3 shrink-0">
                                    {scenario.patternOptions.map((opt) => (
                                        <button
                                            key={opt.id}
                                            onClick={() => togglePattern(opt.id)}
                                            className={`p-5 border text-left transition-all duration-200 group relative overflow-hidden
                                            ${selectedPatterns.includes(opt.id) 
                                                ? 'border-game-accent bg-game-accent/10' 
                                                : 'border-game-muted/20 bg-game-surface/20 hover:border-game-muted/50'}`}
                                        >
                                            <div className="flex items-center justify-between relative z-10">
                                                <p className={`text-xs md:text-sm font-medium transition-colors leading-relaxed pr-4 ${selectedPatterns.includes(opt.id) ? 'text-game-accent' : 'text-zinc-400'}`}>
                                                    {opt.label}
                                                </p>
                                                <div className={`w-5 h-5 border-2 transition-all flex items-center justify-center shrink-0
                                                    ${selectedPatterns.includes(opt.id) ? 'border-game-accent bg-game-accent' : 'border-game-muted/30'}`}>
                                                    {selectedPatterns.includes(opt.id) && (
                                                        <svg className="w-3 h-3 text-game-bg fill-current" viewBox="0 0 20 20"><path d="M0 11l2-2 5 5L18 3l2 2L7 18z"/></svg>
                                                    )}
                                                </div>
                                            </div>
                                        </button>
                                    ))}
                                </div>
                            </main>

                            <footer className="shrink-0 pt-4">
                                <button 
                                    onClick={nextScenario}
                                    disabled={selectedPatterns.length === 0}
                                    className={`h-14 w-full font-bold uppercase tracking-widest text-xs transition-all active:scale-95 shadow-xl
                                    ${selectedPatterns.length > 0 ? 'bg-game-accent text-game-bg hover:bg-game-text' : 'bg-game-surface text-game-muted opacity-50 cursor-not-allowed'}`}
                                >
                                    Siguiente Escenario
                                </button>
                            </footer>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

export default function MarkingTestPage() {
    return (
        <Suspense fallback={
            <div className="flex h-screen w-full items-center justify-center bg-game-bg">
                <p className="text-game-muted animate-pulse uppercase tracking-widest text-[10px] italic">Iniciando motor de test...</p>
            </div>
        }>
            <MarkingTestContent />
        </Suspense>
    );
}
