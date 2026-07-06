'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import MarkingVisor from '@/app/components/MarkingVisor';
import { SCENARIOS, Scenario, CorrectArea } from '@/app/marking/test/scenarios';

// Tipo para el estado general del simulador
type FlowStep = 'instructions_pre' | 'pre_test' | 'transition_post' | 'post_test' | 'results';

interface ScenarioResult {
    scenarioId: string;
    title: string;
    phase: 'pre' | 'post';
    markedPointsCount: number;
    tp: number; // True Positives (Aciertos únicos)
    fp: number; // False Positives (Clics fallados)
    fn: number; // False Negatives (Omisiones)
    selectedPatterns: string[];
    isCorrectCategorized?: boolean;
    timeTaken: number;
    markedPoints: { x: number, y: number, id: number }[];
}

export default function MarkingSimulatorPage() {
    const router = useRouter();

    // Listas de escenarios asignados
    const [preScenarios, setPreScenarios] = useState<Scenario[]>([]);
    const [postScenarios, setPostScenarios] = useState<Scenario[]>([]);
    const [isInitialized, setIsInitialized] = useState(false);

    // Estado del flujo general
    const [flowStep, setFlowStep] = useState<FlowStep>('instructions_pre');
    
    // Indices de escenario activo dentro de cada fase (0 a 3)
    const [currentScenarioIdx, setCurrentScenarioIdx] = useState(0);
    const [subMode, setSubMode] = useState<'context' | 'marking' | 'selection'>('context');

    // Estado de interacción de la vista activa
    const [markedPoints, setMarkedPoints] = useState<{ x: number, y: number, id: number }[]>([]);
    const [selectedPatterns, setSelectedPatterns] = useState<string[]>([]);
    const [timeLeft, setTimeLeft] = useState(30);
    const [timerActive, setTimerActive] = useState(false);
    const [startTime, setStartTime] = useState(0);

    // Historial acumulado para el resumen final
    const [results, setResults] = useState<ScenarioResult[]>([]);

    // Ref para evitar closures
    const markedPointsRef = useRef(markedPoints);
    useEffect(() => {
        markedPointsRef.current = markedPoints;
    }, [markedPoints]);

    // Inicializar y barajar el split-half balanceado
    useEffect(() => {
        const pairs = [
            ['sn_01', 'sn_02'], // Anuncios Disfrazados
            ['sn_03', 'sn_04'], // Costos Ocultos
            ['sn_05', 'sn_06'], // Comparación Prevention
            ['sn_07', 'sn_08']  // Control (Ninguno)
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

        setPreScenarios(shuffle(preIds).map(id => SCENARIOS.find(s => s.id === id)!));
        setPostScenarios(shuffle(postIds).map(id => SCENARIOS.find(s => s.id === id)!));
        setIsInitialized(true);
    }, []);

    // Escenario actual de acuerdo al flujo
    const currentScenario = flowStep === 'pre_test' ? preScenarios[currentScenarioIdx] : postScenarios[currentScenarioIdx];

    // Lógica para inicializar y cargar el estado correcto de un escenario al cambiar de índice
    useEffect(() => {
        if (!isInitialized || !currentScenario) return;

        const hasBeenCompleted = results.some(r => r.scenarioId === currentScenario.id);

        if (hasBeenCompleted) {
            const previousResult = results.find(r => r.scenarioId === currentScenario.id)!;
            setModeToCompleted(previousResult);
        } else {
            setModeToContext();
        }
    }, [currentScenarioIdx, flowStep, isInitialized]);

    const setModeToCompleted = (res: ScenarioResult) => {
        setSubMode('marking');
        setTimerActive(false);
        setTimeLeft(0);
        setMarkedPoints(res.markedPoints || []);
    };

    const setModeToContext = () => {
        setSubMode('context');
        setTimerActive(false);
        setTimeLeft(currentScenario.time);
        setMarkedPoints([]);
        setSelectedPatterns([]);
    };

    // Lógica del Temporizador
    useEffect(() => {
        if (!timerActive || timeLeft <= 0) {
            if (timeLeft <= 0 && timerActive) {
                setTimerActive(false); // Detener y bloquear marcas al expirar
                saveScenarioProgress(); // Auto-completar en memoria
            }
            return;
        }
        const timer = setInterval(() => {
            setTimeLeft(prev => prev - 1);
        }, 1000);
        return () => clearInterval(timer);
    }, [timeLeft, timerActive]);

    const startPhase = (step: 'pre_test' | 'post_test') => {
        setFlowStep(step);
        setCurrentScenarioIdx(0);
    };

    const startMarking = () => {
        setStartTime(Date.now());
        setSubMode('marking');
        setTimerActive(true);
    };

    const handleMark = (x: number, y: number) => {
        if (!timerActive || timeLeft <= 0) return;
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

    // Evaluar Bounding Boxes bajo lógica de Matriz de Confusión
    const evaluateMarkingCollision = (points: {x: number, y: number}[], areas: CorrectArea[]) => {
        let tp = 0; // True Positives
        let fp = 0; // False Positives
        const matchedIndices = new Set<number>();

        points.forEach(p => {
            let hit = false;
            for (let i = 0; i < areas.length; i++) {
                const area = areas[i];
                if (p.x >= area.xMin && p.x <= area.xMax && p.y >= area.yMin && p.y <= area.yMax) {
                    hit = true;
                    matchedIndices.add(i); // Asignación priorizada al primero (solapamientos)
                    break;
                }
            }
            if (!hit) {
                fp++;
            }
        });

        tp = matchedIndices.size;
        const fn = areas.length - tp; // False Negatives (omisiones)

        return { tp, fp, fn };
    };

    const saveScenarioProgress = () => {
        const timeTaken = (Date.now() - startTime) / 1000;
        const { tp, fp, fn } = evaluateMarkingCollision(markedPointsRef.current, currentScenario.correctAreas);

        const result: ScenarioResult = {
            scenarioId: currentScenario.id,
            title: currentScenario.title,
            phase: flowStep === 'pre_test' ? 'pre' : 'post',
            markedPointsCount: markedPointsRef.current.length,
            tp,
            fp,
            fn,
            selectedPatterns: [],
            timeTaken,
            markedPoints: markedPointsRef.current
        };

        // Reemplazar o añadir resultado
        setResults(prev => {
            const index = prev.findIndex(r => r.scenarioId === currentScenario.id);
            if (index !== -1) {
                const copy = [...prev];
                copy[index] = result;
                return copy;
            }
            return [...prev, result];
        });
    };

    const handleConfirmMarking = () => {
        setTimerActive(false);

        const hasBeenCompleted = results.some(r => r.scenarioId === currentScenario.id);
        if (hasBeenCompleted) {
            nextScenario();
            return;
        }

        saveScenarioProgress();

        if (flowStep === 'pre_test') {
            nextScenario();
        } else {
            // En Post-Test pasamos al quiz de selección de patrones
            setSubMode('selection');
        }
    };

    const handleConfirmSelection = () => {
        const timeTaken = (Date.now() - startTime) / 1000;
        const { tp, fp, fn } = evaluateMarkingCollision(markedPoints, currentScenario.correctAreas);

        // Validar si la selección de patrones fue 100% correcta
        const correctPatternIds = currentScenario.patternOptions
            .filter(o => o.isCorrect)
            .map(o => o.id);
        
        const isCorrectCategorized = 
            correctPatternIds.length === selectedPatterns.length && 
            correctPatternIds.every(id => selectedPatterns.includes(id));

        const result: ScenarioResult = {
            scenarioId: currentScenario.id,
            title: currentScenario.title,
            phase: 'post',
            markedPointsCount: markedPoints.length,
            tp,
            fp,
            fn,
            selectedPatterns,
            isCorrectCategorized,
            timeTaken,
            markedPoints
        };

        setResults(prev => {
            const index = prev.findIndex(r => r.scenarioId === currentScenario.id);
            if (index !== -1) {
                const copy = [...prev];
                copy[index] = result;
                return copy;
            }
            return [...prev, result];
        });
        
        nextScenario();
    };

    const nextScenario = () => {
        if (currentScenarioIdx < 3) {
            setCurrentScenarioIdx(prev => prev + 1);
        } else {
            // Fin de la fase activa
            if (flowStep === 'pre_test') {
                setFlowStep('transition_post');
            } else {
                setFlowStep('results');
            }
        }
    };

    const handleRegresar = () => {
        if (currentScenarioIdx > 0) {
            setCurrentScenarioIdx(prev => prev - 1);
        } else {
            setFlowStep(flowStep === 'pre_test' ? 'instructions_pre' : 'transition_post');
        }
    };

    const resetSimulation = () => {
        setResults([]);
        setFlowStep('instructions_pre');
        setCurrentScenarioIdx(0);
        setSubMode('context');
        
        // Regenerar orden aleatorio
        const pairs = [
            ['sn_01', 'sn_02'],
            ['sn_03', 'sn_04'],
            ['sn_05', 'sn_06'],
            ['sn_07', 'sn_08']
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
        setPreScenarios(shuffle(preIds).map(id => SCENARIOS.find(s => s.id === id)!));
        setPostScenarios(shuffle(postIds).map(id => SCENARIOS.find(s => s.id === id)!));
    };

    if (!isInitialized) {
        return (
            <div className="flex h-screen w-full items-center justify-center bg-zinc-950 text-zinc-400">
                <span className="animate-pulse font-mono text-xs uppercase tracking-widest">Iniciando simulador...</span>
            </div>
        );
    }

    const isCompleted = results.some(r => r.scenarioId === currentScenario?.id);
    const showRegresar = isCompleted || timeLeft === 0;

    return (
        <div className="flex flex-col h-screen w-full bg-zinc-950 text-zinc-100 overflow-hidden font-sans select-none">
            
            {/* HEADER SIMULADOR */}
            <header className="p-4 border-b border-zinc-900 bg-zinc-950/60 flex justify-between items-center shrink-0">
                <div className="flex items-center space-x-3">
                    <button 
                        onClick={() => router.push('/game/playground')}
                        className="px-3 py-1.5 border border-zinc-800 text-xs font-mono uppercase font-bold text-zinc-400 hover:text-white hover:border-zinc-500 rounded transition active:scale-95"
                    >
                        Volver al Menú
                    </button>
                    <span className="text-zinc-800 font-mono">|</span>
                    <h1 className="text-xs font-bold uppercase tracking-widest text-teal-400 font-mono">
                        Sandbox: Simulador Pre/Post-Test de Marcado
                    </h1>
                </div>
                <div className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest">
                    {flowStep === 'instructions_pre' && 'Instrucciones Pre-Test'}
                    {flowStep === 'pre_test' && `Pre-Test: Vista ${currentScenarioIdx + 1} de 4`}
                    {flowStep === 'transition_post' && 'Transición'}
                    {flowStep === 'post_test' && `Post-Test: Vista ${currentScenarioIdx + 1} de 4`}
                    {flowStep === 'results' && 'Resultados de Simulación'}
                </div>
            </header>

            {/* AREA PRINCIPAL DE FLUJO */}
            <div className="flex-1 min-h-0 overflow-y-auto">
                <AnimatePresence mode="wait">
                    
                    {/* A. INSTRUCCIONES INICIALES PRE-TEST */}
                    {flowStep === 'instructions_pre' && (
                        <motion.div 
                            key="inst_pre"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            className="flex flex-col min-h-full items-center justify-center p-6 text-center max-w-2xl mx-auto space-y-8"
                        >
                            <div className="space-y-3">
                                <span className="text-[10px] font-bold text-teal-400 tracking-[0.25em] uppercase font-mono">Fase Inicial</span>
                                <h2 className="text-3xl font-extrabold uppercase italic tracking-tighter text-zinc-100">Prueba de Marcado: Pre-Test</h2>
                            </div>
                            <div className="bg-zinc-900/40 border border-zinc-800 p-6 rounded-lg text-left text-zinc-300 text-sm leading-relaxed space-y-4 shadow-xl">
                                <p>
                                    La prueba inicial consiste en analizar <strong>4 pantallas diferentes</strong> del mundo digital.
                                </p>
                                <p>
                                    En cada pantalla, tu misión es identificar y <strong>marcar con un clic</strong> todo elemento interactivo o de texto que consideres sospechoso, engañoso, o que intente apartarte del objetivo original.
                                </p>
                                <p>
                                    <strong>Nota importante:</strong> En esta primera etapa, simplemente marcarás las zonas y confirmarás. No se te harán preguntas teóricas sobre qué patrón es. Tendrás un tiempo límite variable acorde a la cantidad de elementos o texto de la pantalla.
                                </p>
                            </div>
                            <button
                                onClick={() => startPhase('pre_test')}
                                className="w-full max-w-xs h-14 bg-teal-500 text-zinc-950 font-bold uppercase tracking-widest text-xs transition-all active:scale-95 shadow-lg shadow-teal-500/10 hover:bg-teal-400"
                            >
                                Entendido, Iniciar Pre-Test
                            </button>
                        </motion.div>
                    )}

                    {/* B. VISTAS DEL PRE-TEST / POST-TEST */}
                    {(flowStep === 'pre_test' || flowStep === 'post_test') && (
                        <div className="h-full w-full flex flex-col justify-between">
                            
                            {/* B1. PANTALLA PREVIA DE MISIÓN / CONTEXTO */}
                            {subMode === 'context' && (
                                <motion.div
                                    key={`context-${currentScenario.id}`}
                                    initial={{ opacity: 0, scale: 0.98 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 1.02 }}
                                    className="flex flex-col h-full w-full items-center justify-center p-6 text-center overflow-y-auto custom-scrollbar"
                                >
                                    <div className="my-auto space-y-12 py-8 w-full max-w-xl shrink-0">
                                        <div className="space-y-3 shrink-0">
                                            <span className="text-teal-400 uppercase tracking-[0.25em] text-[10px] font-bold font-mono">
                                                Misión {currentScenarioIdx + 1} de 4 ({flowStep === 'pre_test' ? 'Pre-Test' : 'Post-Test'})
                                            </span>
                                            <h3 className="text-4xl font-extrabold uppercase italic tracking-tighter text-zinc-100">
                                                {currentScenario.title}
                                            </h3>
                                        </div>
                                        <div className="bg-zinc-900/60 p-8 border border-zinc-800 rounded-lg shadow-2xl space-y-4 shrink-0">
                                            <p className="text-zinc-300 leading-relaxed text-base md:text-lg italic">
                                                "{currentScenario.context}"
                                            </p>
                                            <div className="pt-4 border-t border-zinc-800 text-[10px] md:text-xs text-teal-400 uppercase tracking-widest font-mono">
                                                Tiempo límite: {currentScenario.time} segundos.
                                            </div>
                                        </div>
                                        <div className="flex flex-col w-full max-w-xs mx-auto space-y-3 shrink-0">
                                            <button 
                                                onClick={startMarking}
                                                className="h-14 w-full bg-teal-500 text-zinc-950 font-bold uppercase tracking-widest text-xs active:scale-95 transition-all shadow-lg hover:bg-teal-400"
                                            >
                                                Comenzar Escenario
                                            </button>
                                            <button 
                                                onClick={handleRegresar}
                                                className="h-12 w-full border border-zinc-700 text-zinc-400 font-bold uppercase tracking-widest text-[10px] flex items-center justify-center hover:bg-zinc-800 hover:text-white transition-all active:scale-95"
                                            >
                                                Regresar
                                            </button>
                                        </div>
                                    </div>
                                </motion.div>
                            )}

                            {/* B2. VISOR DE MARCADO ACTIVO */}
                            {subMode === 'marking' && (
                                <motion.div
                                    key={`marking-${currentScenario.id}`}
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    className="flex flex-col h-full w-full"
                                >
                                    {/* Sub-Header de Escenario */}
                                    <div className="px-4 py-2 border-b border-zinc-900 bg-zinc-950/80 flex justify-between items-center shrink-0 z-20">
                                        <div className="flex flex-col">
                                            <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider">Objetivo Activo:</span>
                                            <span className="text-xs text-zinc-300 font-medium">{currentScenario.context}</span>
                                        </div>
                                        <div className="flex items-center space-x-4">
                                            <div className="text-[10px] uppercase font-bold font-mono text-zinc-500">
                                                Marcas colocadas: <span className="text-teal-400">{markedPoints.length}</span>
                                            </div>
                                            <div className={`px-4 py-1.5 border font-mono font-bold text-xs ${
                                                timeLeft < 10 ? 'border-red-500/30 text-red-400 bg-red-950/20' : 'border-zinc-800 text-teal-400 bg-zinc-900/60'
                                            }`}>
                                                00:{timeLeft.toString().padStart(2, '0')}
                                            </div>
                                        </div>
                                    </div>

                                    {/* Canvas del visor */}
                                    <div className="flex-1 min-h-0 relative bg-black/60">
                                        <MarkingVisor 
                                            mockupUrl={currentScenario.mockupUrl}
                                            markedPoints={markedPoints}
                                            onMark={handleMark}
                                            isActive={timerActive && timeLeft > 0}
                                        />
                                    </div>

                                    {/* Footer para confirmar */}
                                    <div className="p-4 bg-zinc-950 border-t border-zinc-900 shrink-0 text-center flex flex-col items-center space-y-4">
                                        {timeLeft === 0 && (
                                            <p className="text-[10px] text-amber-400 font-mono uppercase tracking-widest text-center">
                                                Tiempo agotado. Puedes seguir viendo la vista pero no marcar.
                                            </p>
                                        )}

                                        <div className="flex flex-col w-full max-w-xs mx-auto space-y-3">
                                            <button
                                                onClick={handleConfirmMarking}
                                                className="h-14 w-full bg-teal-500 text-zinc-950 font-bold uppercase tracking-widest text-xs transition-all active:scale-95 shadow-md hover:bg-teal-400"
                                            >
                                                Confirmar Marcado
                                            </button>

                                            {showRegresar && (
                                                <button
                                                    onClick={handleRegresar}
                                                    className="h-12 w-full border border-zinc-700 text-zinc-400 font-bold uppercase tracking-widest text-[10px] flex items-center justify-center hover:bg-zinc-800 hover:text-white transition-all active:scale-95"
                                                >
                                                    Regresar
                                                </button>
                                            )}
                                        </div>
                                    </div>
                                </motion.div>
                            )}

                            {/* B3. PREGUNTA DE CATEGORIZACIÓN (SÓLO POST-TEST) */}
                            {subMode === 'selection' && (
                                <motion.div
                                    key={`selection-${currentScenario.id}`}
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    className="flex flex-col h-full max-w-2xl w-full mx-auto justify-center p-6 space-y-8"
                                >
                                    <div className="text-center space-y-2">
                                        <span className="text-teal-400 uppercase tracking-[0.25em] text-[10px] font-bold font-mono">Pregunta Teórica</span>
                                        <h3 className="text-3xl font-extrabold uppercase italic tracking-tighter text-zinc-100">Categorización</h3>
                                        <p className="text-zinc-500 text-[10px] md:text-xs uppercase tracking-widest max-w-md mx-auto leading-relaxed">
                                            Identifica qué patrón o patrones oscuros de la historia observaste en la pantalla anterior.
                                        </p>
                                    </div>

                                    <div className="space-y-2.5 max-h-[45vh] overflow-y-auto pr-2 custom-scrollbar">
                                        {currentScenario.patternOptions.map((opt) => (
                                            <button
                                                key={opt.id}
                                                onClick={() => togglePattern(opt.id)}
                                                className={`w-full p-4 border text-left rounded transition-all duration-200 flex items-center justify-between ${
                                                    selectedPatterns.includes(opt.id) 
                                                        ? 'border-teal-500 bg-teal-950/20 text-teal-300' 
                                                        : 'border-zinc-800 bg-zinc-900/30 text-zinc-400 hover:border-zinc-700 hover:text-zinc-200'
                                                }`}
                                            >
                                                <span className="text-xs md:text-sm font-semibold">{opt.label}</span>
                                                <div className={`w-5 h-5 border rounded transition-all flex items-center justify-center shrink-0 ${
                                                    selectedPatterns.includes(opt.id) ? 'border-teal-500 bg-teal-500' : 'border-zinc-700'
                                                }`}>
                                                    {selectedPatterns.includes(opt.id) && (
                                                        <svg className="w-3 h-3 text-zinc-950 fill-current" viewBox="0 0 20 20">
                                                            <path d="M0 11l2-2 5 5L18 3l2 2L7 18z"/>
                                                        </svg>
                                                    )}
                                                </div>
                                            </button>
                                        ))}
                                    </div>

                                    <button 
                                        onClick={handleConfirmSelection}
                                        disabled={selectedPatterns.length === 0}
                                        className={`h-12 w-full font-bold uppercase tracking-widest text-xs transition-all active:scale-95 rounded ${
                                            selectedPatterns.length > 0 
                                                ? 'bg-teal-500 text-zinc-950 hover:bg-teal-400' 
                                                : 'bg-zinc-900 text-zinc-600 cursor-not-allowed opacity-50'
                                        }`}
                                    >
                                        Siguiente Escenario
                                    </button>
                                </motion.div>
                            )}

                        </div>
                    )}

                    {/* C. TRANSICIÓN A POST-TEST */}
                    {flowStep === 'transition_post' && (
                        <motion.div 
                            key="inst_post"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            className="flex flex-col min-h-full items-center justify-center p-6 text-center max-w-2xl mx-auto space-y-8"
                        >
                            <div className="space-y-3">
                                <span className="text-[10px] font-bold text-teal-400 tracking-[0.25em] uppercase font-mono">Fase Avanzada</span>
                                <h2 className="text-3xl font-extrabold uppercase italic tracking-tighter text-zinc-100">Prueba de Marcado: Post-Test</h2>
                            </div>
                            <div className="bg-zinc-900/40 border border-zinc-800 p-6 rounded-lg text-left text-zinc-300 text-sm leading-relaxed space-y-4 shadow-xl">
                                <p>
                                    ¡Completaste la fase del Pre-Test con éxito! Ahora comenzará la etapa del <strong>Post-Test</strong>.
                                </p>
                                <p>
                                    Analizarás las <strong>4 pantallas restantes</strong> (las contrapartes de cada categoría).
                                </p>
                                <p>
                                    La mecánica de marcado es exactamente la misma. Sin embargo, en esta fase, **luego de confirmar tus marcas, deberás clasificar qué patrón detectaste** seleccionando la opción correcta a nivel bajo (con los nombres usados en la historia).
                                </p>
                            </div>
                            <button
                                onClick={() => startPhase('post_test')}
                                className="w-full max-w-xs h-14 bg-teal-500 text-zinc-950 font-bold uppercase tracking-widest text-xs transition-all active:scale-95 shadow-lg hover:bg-teal-400"
                            >
                                Iniciar Post-Test y Categorización
                            </button>
                        </motion.div>
                    )}

                    {/* D. RESUMEN DE RESULTADOS FINAL */}
                    {flowStep === 'results' && (
                        <motion.div 
                            key="results_screen"
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="p-6 max-w-4xl mx-auto space-y-8"
                        >
                            <div className="text-center space-y-2 py-4">
                                <span className="text-teal-400 uppercase tracking-[0.25em] text-[10px] font-bold font-mono">Resultados Completos</span>
                                <h2 className="text-4xl font-black uppercase italic tracking-tighter text-zinc-100">Métricas de la Simulación</h2>
                                <p className="text-zinc-500 text-xs max-w-md mx-auto leading-relaxed">
                                    Aquí tienes la auditoría detallada de aciertos y fallos bajo el algoritmo de colisión silenciosa y matriz de confusión.
                                </p>
                            </div>

                            {/* Resumen General */}
                            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                                <div className="bg-zinc-900/30 border border-zinc-800 p-4 rounded-lg text-center space-y-1">
                                    <span className="text-[10px] font-mono text-zinc-500 uppercase">Aciertos (TP)</span>
                                    <p className="text-2xl font-bold text-teal-400">
                                        {results.reduce((acc, r) => acc + r.tp, 0)}
                                    </p>
                                </div>
                                <div className="bg-zinc-900/30 border border-zinc-800 p-4 rounded-lg text-center space-y-1">
                                    <span className="text-[10px] font-mono text-zinc-500 uppercase">Fallos (FP)</span>
                                    <p className="text-2xl font-bold text-red-400">
                                        {results.reduce((acc, r) => acc + r.fp, 0)}
                                    </p>
                                </div>
                                <div className="bg-zinc-900/30 border border-zinc-800 p-4 rounded-lg text-center space-y-1">
                                    <span className="text-[10px] font-mono text-zinc-500 uppercase">Omisiones (FN)</span>
                                    <p className="text-2xl font-bold text-zinc-500">
                                        {results.reduce((acc, r) => acc + r.fn, 0)}
                                    </p>
                                </div>
                                <div className="bg-zinc-900/30 border border-zinc-800 p-4 rounded-lg text-center space-y-1">
                                    <span className="text-[10px] font-mono text-zinc-500 uppercase">Quiz Correctos</span>
                                    <p className="text-2xl font-bold text-amber-400">
                                        {results.filter(r => r.phase === 'post' && r.isCorrectCategorized).length} / 4
                                    </p>
                                </div>
                            </div>

                            {/* Detalle por Escenario */}
                            <div className="space-y-4">
                                <h3 className="text-xs font-bold text-zinc-400 uppercase tracking-wider border-b border-zinc-800 pb-2">Auditoría por Escenario</h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {results.map((r, idx) => (
                                        <div key={idx} className="bg-zinc-900/20 border border-zinc-800 p-4 rounded-lg flex flex-col justify-between space-y-3">
                                            <div className="flex justify-between items-start">
                                                <div>
                                                    <span className={`text-[8px] font-mono font-bold uppercase px-1.5 py-0.5 rounded ${
                                                        r.phase === 'pre' ? 'bg-teal-950/40 text-teal-400 border border-teal-800/30' : 'bg-amber-950/40 text-amber-400 border border-amber-800/30'
                                                    }`}>
                                                        {r.phase === 'pre' ? 'Pre-Test' : 'Post-Test'}
                                                    </span>
                                                    <h4 className="text-sm font-bold text-zinc-200 mt-1">{r.title}</h4>
                                                </div>
                                                <span className="text-[10px] font-mono text-zinc-500">{r.timeTaken.toFixed(1)}s</span>
                                            </div>

                                            <div className="grid grid-cols-3 gap-2 text-center bg-zinc-950/60 p-2 rounded border border-zinc-900">
                                                <div>
                                                    <div className="text-[8px] font-mono text-zinc-600 uppercase">Aciertos (TP)</div>
                                                    <div className="text-xs font-bold text-teal-400">{r.tp}</div>
                                                </div>
                                                <div>
                                                    <div className="text-[8px] font-mono text-zinc-600 uppercase">Fallos (FP)</div>
                                                    <div className="text-xs font-bold text-red-400">{r.fp}</div>
                                                </div>
                                                <div>
                                                    <div className="text-[8px] font-mono text-zinc-600 uppercase">Omisiones (FN)</div>
                                                    <div className="text-xs font-bold text-zinc-500">{r.fn}</div>
                                                </div>
                                            </div>

                                            {r.phase === 'post' && (
                                                <div className="flex items-center justify-between text-[10px] border-t border-zinc-900 pt-2">
                                                    <span className="text-zinc-500 uppercase tracking-wider">Quiz Categoría:</span>
                                                    <span className={`font-mono font-bold uppercase ${
                                                        r.isCorrectCategorized ? 'text-teal-400' : 'text-red-400'
                                                    }`}>
                                                        {r.isCorrectCategorized ? '✓ Correcto' : '✕ Incorrecto'}
                                                    </span>
                                                </div>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Botones de acción */}
                            <div className="flex flex-col sm:flex-row gap-4 pt-4 justify-center">
                                <button
                                    onClick={resetSimulation}
                                    className="w-full sm:w-60 h-12 bg-teal-500 text-zinc-950 font-bold uppercase tracking-widest text-xs rounded transition active:scale-95 hover:bg-teal-400"
                                >
                                    Reiniciar Simulación
                                </button>
                                <button
                                    onClick={() => router.push('/game/playground')}
                                    className="w-full sm:w-60 h-12 border border-zinc-800 text-zinc-400 font-bold uppercase tracking-widest text-xs rounded transition active:scale-95 hover:border-zinc-700 hover:text-zinc-200"
                                >
                                    Volver al Playground
                                </button>
                            </div>
                        </motion.div>
                    )}

                </AnimatePresence>
            </div>
        </div>
    );
}
