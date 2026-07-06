'use client';

import { useState, useEffect, Suspense, useRef } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import MarkingVisor from '@/app/components/MarkingVisor';
import { SCENARIOS, Scenario } from './scenarios';

function MarkingTestContent() {
    const [scenariosList, setScenariosList] = useState<Scenario[]>([]);
    const [completedScenarios, setCompletedScenarios] = useState<string[]>([]);
    const [currentStep, setCurrentStep] = useState(0);
    const [mode, setMode] = useState<'context' | 'marking' | 'selection'>('context');
    const [markedPoints, setMarkedPoints] = useState<{ x: number, y: number, id: number }[]>([]);
    const [selectedPatterns, setSelectedPatterns] = useState<string[]>([]);
    const [timeLeft, setTimeLeft] = useState(0);
    const [isActive, setIsActive] = useState(false);
    const [startTime, setStartTime] = useState(0);
    const [isSubmitting, setIsSubmitting] = useState(false);
    
    const [playerId, setPlayerId] = useState<string | null>(null);
    const router = useRouter();
    const searchParams = useSearchParams();
    
    const isPostTest = searchParams.get('phase') === 'post';
    const scenario = scenariosList[currentStep];

    // Ref para mantener la versión más reciente de markedPoints en callbacks asíncronos (evita refrescos de intervalo)
    const markedPointsRef = useRef(markedPoints);
    useEffect(() => {
        markedPointsRef.current = markedPoints;
    }, [markedPoints]);

    // Cargar o inicializar la asignación split-half de escenarios en localStorage
    useEffect(() => {
        setPlayerId(localStorage.getItem('antipatron_player_id'));

        let preIdsJson = localStorage.getItem('antipatron_pre_scenarios_ids');
        let postIdsJson = localStorage.getItem('antipatron_post_scenarios_ids');

        if (!preIdsJson || !postIdsJson) {
            // Asignación balanceada aleatoria
            const pairs = [
                ['sn_01', 'sn_02'], // Anuncios Disfrazados
                ['sn_03', 'sn_04'], // Costos Ocultos
                ['sn_05', 'sn_06'], // Comparación
                ['sn_07', 'sn_08']  // Control
            ];

            const preIds: string[] = [];
            const postIds: string[] = [];

            pairs.forEach(([p1, p2]) => {
                if (Math.random() < 0.5) {
                    preIds.push(p1);
                    postIds.push(p2);
                } else {
                    preIds.push(p2);
                    postIds.push(p1);
                }
            });

            const shuffle = <T,>(arr: T[]): T[] => [...arr].sort(() => Math.random() - 0.5);

            const shuffledPre = shuffle(preIds);
            const shuffledPost = shuffle(postIds);

            localStorage.setItem('antipatron_pre_scenarios_ids', JSON.stringify(shuffledPre));
            localStorage.setItem('antipatron_post_scenarios_ids', JSON.stringify(shuffledPost));

            preIdsJson = JSON.stringify(shuffledPre);
            postIdsJson = JSON.stringify(shuffledPost);
        }

        const activeIds: string[] = JSON.parse(isPostTest ? postIdsJson : preIdsJson);
        const activeScenarios = activeIds.map(id => SCENARIOS.find(s => s.id === id)!).filter(Boolean);
        setScenariosList(activeScenarios);

        // Cargar progreso completado
        const completedKey = isPostTest ? 'antipatron_completed_post_ids' : 'antipatron_completed_pre_ids';
        const completedIds: string[] = JSON.parse(localStorage.getItem(completedKey) || '[]');
        setCompletedScenarios(completedIds);

        // Iniciar siempre desde el paso 0
        setCurrentStep(0);
    }, [isPostTest, router]);

    // Lógica para inicializar y cargar el estado correcto de un escenario al cambiar currentStep
    useEffect(() => {
        if (scenariosList.length === 0 || !scenario) return;

        const completedKey = isPostTest ? 'antipatron_completed_post_ids' : 'antipatron_completed_pre_ids';
        const completedIds: string[] = JSON.parse(localStorage.getItem(completedKey) || '[]');

        if (completedIds.includes(scenario.id)) {
            // Si ya está completado: mostrar directamente visor bloqueado y recuperar marcas
            setMode('marking');
            setIsActive(false);
            setTimeLeft(0);
            const savedPoints = JSON.parse(localStorage.getItem(`antipatron_marked_points_${scenario.id}`) || '[]');
            setMarkedPoints(savedPoints);
        } else {
            // Si está incompleto: mostrar pantalla de misión y restablecer marcas/tiempo
            setMode('context');
            setIsActive(false);
            setTimeLeft(scenario.time);
            setMarkedPoints([]);
        }
    }, [currentStep, scenariosList, isPostTest, scenario]);

    // Lógica del Temporizador
    useEffect(() => {
        if (!isActive || timeLeft <= 0) {
            if (timeLeft <= 0 && isActive) {
                setIsActive(false); // Detener interacción de marcas
                saveAndMarkCompleted(); // Registrar como completado automáticamente
            }
            return;
        }
        const timer = setInterval(() => setTimeLeft(prev => prev - 1), 1000);
        return () => clearInterval(timer);
    }, [timeLeft, isActive]);

    const startMarking = () => {
        setMarkedPoints([]);
        setSelectedPatterns([]);
        setTimeLeft(scenario.time);
        setStartTime(Date.now());
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

    const handleConfirmMarking = async () => {
        setIsActive(false);
        
        const completedKey = isPostTest ? 'antipatron_completed_post_ids' : 'antipatron_completed_pre_ids';
        const completedIds: string[] = JSON.parse(localStorage.getItem(completedKey) || '[]');
        const wasAlreadyCompleted = completedIds.includes(scenario.id);

        if (wasAlreadyCompleted) {
            // Si ya estaba completada previamente, solo avanzamos secuencialmente
            nextScenario();
            return;
        }

        if (!isPostTest) {
            await saveAndMarkCompleted();
            nextScenario();
        } else {
            // En Post-Test va a la pantalla del quiz de selección técnica
            setMode('selection');
        }
    };

    const handleConfirmSelection = async () => {
        await saveAndMarkCompleted();
        nextScenario();
    };

    const saveAndMarkCompleted = async () => {
        const completedKey = isPostTest ? 'antipatron_completed_post_ids' : 'antipatron_completed_pre_ids';
        const completedIds: string[] = JSON.parse(localStorage.getItem(completedKey) || '[]');
        if (!completedIds.includes(scenario.id)) {
            completedIds.push(scenario.id);
            localStorage.setItem(completedKey, JSON.stringify(completedIds));
            setCompletedScenarios(completedIds);
        }

        // Persistir marcas para permitir navegación atrás y adelante
        localStorage.setItem(`antipatron_marked_points_${scenario.id}`, JSON.stringify(markedPointsRef.current));

        await saveResults();
    };

    const saveResults = async () => {
        if (!playerId || isSubmitting) return;
        setIsSubmitting(true);

        const timeTaken = (Date.now() - startTime) / 1000;

        // Calcular métricas de colisión (aciertos, fallos, omisiones) en el cliente
        const areas = scenario.correctAreas || [];
        const points = markedPointsRef.current;
        let aciertos = 0;
        let fallos = 0;
        const matchedIndices = new Set<number>();

        points.forEach(p => {
            let hit = false;
            for (let i = 0; i < areas.length; i++) {
                const area = areas[i];
                if (p.x >= area.xMin && p.x <= area.xMax && p.y >= area.yMin && p.y <= area.yMax) {
                    hit = true;
                    matchedIndices.add(i);
                    break;
                }
            }
            if (!hit) {
                fallos++;
            }
        });

        aciertos = matchedIndices.size;
        const omisiones = areas.length - aciertos;

        // Evaluar si la categorización del quiz es correcta
        const correctPatternIds = scenario.patternOptions
            ? scenario.patternOptions.filter(o => o.isCorrect).map(o => o.id)
            : [];
        const quizCorrecto = isPostTest
            ? (selectedPatterns.length === correctPatternIds.length &&
               selectedPatterns.every(id => correctPatternIds.includes(id)))
            : null;

        try {
            await fetch('/api/marking/save', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    playerId,
                    scenarioId: scenario.id,
                    phase: isPostTest ? 'post' : 'pre',
                    points: points.map(p => ({ x: p.x, y: p.y })),
                    selectedPatterns,
                    timeTaken,
                    aciertos,
                    fallos,
                    omisiones,
                    quizCorrecto
                }),
            });
        } catch (e) {
            console.error("Error guardando resultados:", e);
        } finally {
            setIsSubmitting(false);
        }
    };

    const nextScenario = () => {
        if (currentStep < scenariosList.length - 1) {
            setCurrentStep(prev => prev + 1);
            setMode('context');
        } else {
            router.push(isPostTest ? '/credits' : '/game/narrative/instructions');
        }
    };

    const handleRegresar = () => {
        if (currentStep > 0) {
            setCurrentStep(prev => prev - 1);
        } else {
            router.push(isPostTest ? "/marking/post-intro" : "/marking/intro");
        }
    };

    if (scenariosList.length === 0 || !scenario) {
        return (
            <div className="flex h-screen w-full items-center justify-center bg-game-bg">
                <p className="text-game-muted animate-pulse uppercase tracking-widest text-[10px] italic">Iniciando motor de test...</p>
            </div>
        );
    }

    const isCompleted = completedScenarios.includes(scenario.id);
    const showRegresar = isCompleted || timeLeft === 0;

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
                        className="flex flex-col h-full w-full items-center justify-center p-6 text-center overflow-y-auto custom-scrollbar"
                    >
                        <div className="my-auto space-y-12 py-8 w-full max-w-xl shrink-0">
                            <header className="space-y-2 shrink-0">
                                <h2 className="text-game-accent uppercase tracking-[0.3em] text-[10px] font-bold italic">Escenario {currentStep + 1} de {scenariosList.length}</h2>
                                <h1 className="text-3xl md:text-5xl font-bold uppercase italic tracking-tighter">Misión</h1>
                            </header>

                            <div className="bg-game-surface/30 p-8 md:p-12 border border-game-muted/20 rounded-sm max-w-xl mx-auto shadow-2xl shrink-0 space-y-4">
                                <p className="text-zinc-300 leading-relaxed text-sm md:text-xl italic">
                                    "{scenario.context}"
                                </p>
                                <div className="pt-4 border-t border-zinc-800 text-[10px] md:text-xs text-game-accent uppercase tracking-widest font-mono">
                                    Tiempo límite: {scenario.time} segundos.
                                </div>
                            </div>

                            <div className="flex flex-col w-full max-w-xs mx-auto space-y-3 shrink-0">
                                <button 
                                    onClick={startMarking}
                                    className="h-14 w-full bg-game-accent text-game-bg font-bold uppercase tracking-widest text-xs active:scale-95 transition-all shadow-2xl"
                                >
                                    Iniciar Evaluación
                                </button>
                                <button 
                                    onClick={handleRegresar}
                                    className="h-12 w-full border border-zinc-700 text-game-muted font-bold uppercase tracking-widest text-[10px] flex items-center justify-center hover:bg-game-surface hover:text-game-accent transition-all active:scale-95"
                                >
                                    Regresar
                                </button>
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
                        <header className="p-4 border-b border-game-muted/10 flex justify-between items-center shrink-0 bg-game-bg z-20">
                            <div className="text-[10px] md:text-xs uppercase font-bold tracking-widest text-game-muted">
                                Marcas: {markedPoints.length}
                            </div>
                            <div className={`px-5 py-2 border ${timeLeft < 10 ? 'border-red-500 text-red-500 shadow-[0_0_10px_rgba(239,68,68,0.2)]' : 'border-game-accent/20 text-game-accent'} font-mono font-bold text-sm md:text-base transition-all duration-500`}>
                                00:{timeLeft.toString().padStart(2, '0')}
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

                        <footer className="p-4 bg-game-bg border-t border-game-muted/10 shrink-0 z-20 flex flex-col items-center space-y-4">
                            {timeLeft === 0 && (
                                <p className="text-[10px] text-amber-400 font-mono uppercase tracking-widest text-center">
                                    Tiempo agotado. Puedes seguir viendo la vista pero no marcar.
                                </p>
                            )}

                            <div className="flex flex-col w-full max-w-xs mx-auto space-y-3">
                                <button 
                                    onClick={handleConfirmMarking}
                                    className="h-14 w-full bg-game-accent text-game-bg font-bold uppercase tracking-widest text-xs active:scale-95 transition-all shadow-2xl hover:bg-game-text"
                                >
                                    Confirmar Marcado
                                </button>

                                {showRegresar && (
                                    <button 
                                        onClick={handleRegresar}
                                        className="h-12 w-full border border-zinc-700 text-game-muted font-bold uppercase tracking-widest text-[10px] flex items-center justify-center hover:bg-game-surface hover:text-game-accent transition-all active:scale-95"
                                    >
                                        Regresar
                                    </button>
                                )}
                            </div>
                        </footer>
                    </motion.div>
                )}

                {/* 3. MODO SELECCIÓN TÉCNICA */}
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
                                    onClick={handleConfirmSelection}
                                    disabled={selectedPatterns.length === 0}
                                    className={`h-14 w-full font-bold uppercase tracking-widest text-xs transition-all active:scale-95 shadow-xl
                                    ${selectedPatterns.length > 0 ? 'bg-game-accent text-game-bg hover:bg-game-text' : 'bg-game-surface text-game-muted opacity-50 cursor-not-allowed'}`}
                                >
                                    {isSubmitting ? 'Guardando...' : 'Siguiente Escenario'}
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
