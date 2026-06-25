'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { NARRATIVE_NODES, DialogueNode } from './data';
import Scene1Sleeping from './illustrations/scene_1_sleeping';
import Scene2Encounter from './illustrations/scene_2_encounter';
import Scene3Questioning from './illustrations/scene_3_questioning';
import Scene4Walking from './illustrations/scene_4_walking';
import Scene5Approaching from './illustrations/scene_5_approaching';
import Scene6Glow from './illustrations/scene_6_glow';
import Scene7Sniper from './illustrations/scene_7_sniper';
import Scene8DarkPattern from './illustrations/scene_8_dark_pattern';
import Scene9CelularPagar from './illustrations/scene_9_celular_pagar';
import Scene10CelularGrande from './illustrations/scene_10_celular_grande';
import Scene11AletaPagar from './illustrations/scene_11_aleta_pagar';

// Tokenizador para dar formato especial a "" y #
interface TextToken {
  type: 'text' | 'highlight' | 'action';
  content: string;
}

function parseDialogueText(text: string): TextToken[] {
  const tokens: TextToken[] = [];
  let currentIndex = 0;

  while (currentIndex < text.length) {
    const nextQuote = text.indexOf('"', currentIndex);
    const nextHash = text.indexOf('#', currentIndex);

    if (nextQuote === -1 && nextHash === -1) {
      tokens.push({ type: 'text', content: text.substring(currentIndex) });
      break;
    }

    if (nextQuote !== -1 && (nextHash === -1 || nextQuote < nextHash)) {
      if (nextQuote > currentIndex) {
        tokens.push({ type: 'text', content: text.substring(currentIndex, nextQuote) });
      }
      const closeQuote = text.indexOf('"', nextQuote + 1);
      if (closeQuote !== -1) {
        tokens.push({ type: 'highlight', content: text.substring(nextQuote + 1, closeQuote) });
        currentIndex = closeQuote + 1;
      } else {
        tokens.push({ type: 'text', content: text.substring(nextQuote) });
        break;
      }
    } else {
      if (nextHash > currentIndex) {
        tokens.push({ type: 'text', content: text.substring(currentIndex, nextHash) });
      }
      const closeHash = text.indexOf('#', nextHash + 1);
      if (closeHash !== -1) {
        tokens.push({ type: 'action', content: text.substring(nextHash + 1, closeHash) });
        currentIndex = closeHash + 1;
      } else {
        tokens.push({ type: 'text', content: text.substring(nextHash) });
        break;
      }
    }
  }

  return tokens;
}


export default function NarrativeIntroPage() {
  const [currentNodeId, setCurrentNodeId] = useState('scene_1_init');
  const [visibleCharCount, setVisibleCharCount] = useState(0);
  const [isTyping, setIsTyping] = useState(false);
  const [nickname, setNickname] = useState('Jugador');
  const [showExplanation, setShowExplanation] = useState(false);
  const [selectedExplanationText, setSelectedExplanationText] = useState('');
  const [nextAfterExplanation, setNextAfterExplanation] = useState('');
  
  // Historial interno para el botón Atrás en la narrativa
  const [history, setHistory] = useState<string[]>([]);
  
  const typingTimer = useRef<NodeJS.Timeout | null>(null);
  const router = useRouter();
  const currentNode = NARRATIVE_NODES[currentNodeId] || NARRATIVE_NODES['scene_1_init'];

  // Obtener nickname desde localstorage/API
  useEffect(() => {
    const id = localStorage.getItem('antipatron_player_id');
    if (id) {
      fetch(`/api/player/profile?playerId=${id}`)
        .then(res => res.ok ? res.json() : null)
        .then(data => {
          if (data && data.nickname) {
            setNickname(data.nickname);
          }
        })
        .catch(err => console.error("Error cargando nombre del jugador:", err));
    }
  }, []);

  // Procesar reemplazo dinámico de [nombre del jugador]
  const getProcessedText = useCallback((rawText: string) => {
    return rawText.replace('[nombre del jugador]', nickname);
  }, [nickname]);

  // Manejador del efecto máquina de escribir
  const startTyping = useCallback((textToType: string) => {
    if (typingTimer.current) clearInterval(typingTimer.current);
    setIsTyping(true);
    setVisibleCharCount(0);
    
    const tokens = parseDialogueText(textToType);
    const totalLength = tokens.reduce((sum, token) => sum + token.content.length, 0);
    
    let currentCount = 0;
    typingTimer.current = setInterval(() => {
      currentCount++;
      setVisibleCharCount(currentCount);
      if (currentCount >= totalLength) {
        setIsTyping(false);
        if (typingTimer.current) clearInterval(typingTimer.current);
      }
    }, 55); // 55ms por carácter (velocidad de lectura calmada y cómoda)
  }, []);

  // Reiniciar tipeo al cambiar de nodo
  useEffect(() => {
    const processedText = getProcessedText(currentNode.text);
    startTyping(processedText);
    return () => {
      if (typingTimer.current) clearInterval(typingTimer.current);
    };
  }, [currentNodeId, startTyping, getProcessedText, currentNode.text]);

  const logInteraction = async (choiceId: string, isCorrect: boolean, metadata: any = {}) => {
    const playerId = localStorage.getItem('antipatron_player_id');
    if (!playerId) return;
    try {
      fetch('/api/logs', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          playerId,
          eventName: 'narrative_decision',
          metadata: {
            currentNodeId,
            choiceId,
            isCorrect,
            ...metadata
          }
        })
      });
    } catch (e) {
      console.error("Error guardando log de decisión:", e);
    }
  };

  // Forzar completado inmediato del texto al hacer clic (skip) o avanzar
  const handleBoxClick = () => {
    if (isTyping) {
      if (typingTimer.current) clearInterval(typingTimer.current);
      
      const processedText = getProcessedText(currentNode.text);
      const tokens = parseDialogueText(processedText);
      const totalLength = tokens.reduce((sum, token) => sum + token.content.length, 0);
      
      setVisibleCharCount(totalLength);
      setIsTyping(false);
    } else {
      // Solo avanzar por clic en la caja si no hay decisiones ni botones de acción bloqueando la vista
      const hasActionBtn = currentNode.text.includes('#');
      const hasChoices = currentNode.choices && currentNode.choices.length > 0;
      
      if (!hasActionBtn && !hasChoices && currentNode.next) {
        advanceNode(currentNode.next);
      }
    }
  };

  // Función para avanzar de nodo (actualizando el historial interno)
  const advanceNode = (nextId: string) => {
    if (NARRATIVE_NODES[nextId]) {
      setHistory(prev => [...prev, currentNodeId]);
      setCurrentNodeId(nextId);
    } else {
      // Si no existe, finalizamos la demo de la narrativa o enviamos a créditos
      router.push('/credits');
    }
  };

  // Función para el botón Atrás (historial interno de la historia)
  const handleBack = () => {
    if (history.length > 0) {
      const prevHistory = [...history];
      const prevNodeId = prevHistory.pop()!;
      setHistory(prevHistory);
      setCurrentNodeId(prevNodeId);
    } else {
      // Regresa a la pantalla explicativa posterior al pre-test
      router.push('/game/narrative/instructions');
    }
  };

  // Manejo de clicks en botones interactivos dentro del texto
  const handleActionClick = () => {
    if (currentNode.next) {
      advanceNode(currentNode.next);
    }
  };

  // Manejo de decisiones (Fase de elección de la Novela Visual)
  const handleChoiceClick = (choice: { text: string; nextNodeId: string; isCorrect: boolean; explanation: string; id: string }) => {
    logInteraction(choice.id, choice.isCorrect, { text: choice.text });
    
    if (choice.explanation && choice.explanation.trim() !== '') {
      // Almacenamos la explicación del patrón y el destino
      setSelectedExplanationText(choice.explanation);
      setNextAfterExplanation(choice.nextNodeId);
      setShowExplanation(true);
    } else {
      // Avanzar directamente sin popup explicativo
      advanceNode(choice.nextNodeId);
    }
  };

  const handleCloseExplanation = () => {
    setShowExplanation(false);
    advanceNode(nextAfterExplanation);
  };

  // Parser dinámico para formatear "" y ## en React
  const renderDialogue = (tokens: TextToken[], visibleCount: number) => {
    let charsRemaining = visibleCount;
    const isDarkPatternTheme = currentNodeId.startsWith('scene_8');

    return tokens.map((token, index) => {
      if (charsRemaining <= 0) return null;
      
      const tokenLength = token.content.length;
      const visibleLength = Math.min(tokenLength, charsRemaining);
      charsRemaining -= tokenLength;
      
      const visibleContent = token.content.substring(0, visibleLength);

      if (token.type === 'highlight') {
        const chars = Array.from(visibleContent.toUpperCase());
        return (
          <span 
            key={index} 
            style={{
              WebkitTextStroke: isDarkPatternTheme ? '0.8px #22d3ee' : '0.8px #ffffff',
              display: 'inline-block'
            }}
            className="font-bold mx-1 select-none"
          >
            {chars.map((char, charIdx) => (
              <motion.span 
                key={charIdx} 
                style={isDarkPatternTheme ? {
                  display: 'inline-block',
                  whiteSpace: 'pre'
                } : {
                  display: 'inline-block',
                  whiteSpace: 'pre',
                  color: '#000000',
                  textShadow: '0 0 3px #ffffff, 0 0 6px #ffffff, 0 0 1px #ffffff'
                }}
                animate={isDarkPatternTheme ? { 
                  y: [0, -3.5, 0],
                  color: ['#090d16', '#22d3ee', '#0891b2', '#090d16'],
                  textShadow: [
                    '0 0 3px #06b6d4, 0 0 6px #0891b2, 0 0 1px #000',
                    '0 0 8px #22d3ee, 0 0 15px #06b6d4, 0 0 2px #000',
                    '0 0 3px #06b6d4, 0 0 6px #0891b2, 0 0 1px #000'
                  ]
                } : {
                  y: [0, -3.5, 0]
                }}
                transition={{ 
                  repeat: Infinity, 
                  duration: isDarkPatternTheme ? 2.8 : 2.2, 
                  ease: "easeInOut",
                  delay: charIdx * (isDarkPatternTheme ? 0.14 : 0.12)
                }}
              >
                {char}
              </motion.span>
            ))}
          </span>
        );
      } else if (token.type === 'action') {
        if (visibleLength < tokenLength) {
          return <span key={index}>{visibleContent}</span>;
        }
        return (
          <button
            key={index}
            onClick={(e) => {
              e.stopPropagation(); // Evitamos que se propague el clic a la caja de diálogo general
              handleActionClick();
            }}
            className="inline-block bg-game-accent text-game-bg font-extrabold px-1.5 py-0.5 mx-1 uppercase tracking-widest text-[8px] rounded-sm hover:bg-game-text hover:text-game-bg transition-all cursor-pointer active:scale-95 border border-game-accent select-none animate-pulse leading-none align-middle"
          >
            {visibleContent}
          </button>
        );
      } else {
        return <span key={index}>{visibleContent}</span>;
      }
    });
  };

  const hasChoices = currentNode.choices && currentNode.choices.length > 0;

  // Determinar qué ilustración SVG renderizar
  const renderIllustrationSVG = () => {
    if (currentNodeId === 'scene_1_init') {
      // Escena 1: El pingüino acostado durmiendo (Scene1Sleeping)
      return <Scene1Sleeping />;
    }

    if (currentNodeId === 'scene_2_start') {
      // Escena 2: Encuentro con el subconsciente
      return <Scene2Encounter variantId={1} />;
    }

    if (currentNodeId.startsWith('scene_3_ans')) {
      // Escena 3: Diálogo interactivo
      return <Scene3Questioning variantId={1} />;
    }

    if (currentNodeId.startsWith('scene_4_walking')) {
      // Escena 4: Caminando (ojo deescalado arriba a la izquierda)
      return <Scene4Walking variantId={5} />;
    }

    if (currentNodeId.startsWith('scene_5_dialogue') || currentNodeId === 'scene_5_end') {
      // Escena 5: Acercándose al alma oscurecida de Camo
      return <Scene5Approaching camoVariantId={5} showHelmet={true} eyeStyle="sleeping" facing="right" />;
    }

    if (currentNodeId.startsWith('scene_6_dialogue')) {
      // Escena 6: El protagonista mira el resplandor en sus manos bajo la mirada del ojo
      return <Scene6Glow />;
    }

    if (currentNodeId.startsWith('scene_7')) {
      // Escena 7: Camo el Francotirador en su podio militar
      return <Scene7Sniper />;
    }

    if (currentNodeId.startsWith('scene_8') || currentNodeId === 'scene_8_end') {
      // Escena 8: Camo durmiendo plácidamente y el Patrón Oscuro
      return <Scene8DarkPattern />;
    }

    if (currentNodeId.startsWith('scene_9')) {
      // Escena 9: Camo durmiendo plácidamente acechado por el teléfono y rodeado de dinero
      return <Scene9CelularPagar />;
    }

    if (currentNodeId.startsWith('scene_10')) {
      // Escena 10: Catálogo del celular en grande
      return <Scene10CelularGrande />;
    }

    if (currentNodeId.startsWith('scene_11')) {
      // Escena 11: Aleta de pingüino slameando el botón Pagar repetidamente
      return <Scene11AletaPagar />;
    }

    // SVG genérico por defecto
    return (
      <svg viewBox="0 0 200 120" className="w-full h-full">
        <rect width="200" height="120" fill="#18181b" />
        <text x="100" y="65" fill="#a1a1aa" fontSize="8" textAnchor="middle" fontFamily="monospace">
          DISEÑO VECTORIAL SVG PENDIENTE
        </text>
      </svg>
    );
  };

  return (
    <div className="flex flex-col h-screen w-full bg-game-bg text-game-text p-4 md:p-6 overflow-hidden items-center justify-center font-sans">
      
      {/* Contenedor adaptado a la Consistencia de Escenas (Layout Sándwich sin footer) */}
      <div className="flex flex-col h-full max-w-lg w-full mx-auto justify-between py-2 md:py-4 relative">

        {/* 1. HEADER (shrink-0) - Solo el botón Atrás */}
        <header className="flex justify-start items-center shrink-0 pb-3">
          <button
            onClick={handleBack}
            className="text-[9px] border border-zinc-800 text-game-muted hover:border-zinc-500 hover:text-game-accent transition-all px-3 py-1 font-bold uppercase tracking-wider rounded-sm active:scale-95 cursor-pointer"
          >
            Atrás
          </button>
        </header>

        {/* 2. MAIN AREA (Ilustración Fija y Diálogo con scroll interno independiente) */}
        <main className="flex-1 flex flex-col min-h-0 justify-between py-3 space-y-4 overflow-hidden">
          
          {/* Ilustración Fija (Renderizado de SVG Puro Animado) */}
          <div className="relative w-full aspect-video flex items-center justify-center shrink-0 max-h-[35vh]">
            <AnimatePresence mode="wait">
              {currentNode.illustration && (
                <motion.div
                  key={currentNode.id}
                  initial={{ opacity: 0, scale: 0.96, y: 10 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.96, y: -10 }}
                  transition={{ duration: 0.4 }}
                  className="w-full h-full border border-game-muted/15 rounded-md overflow-hidden bg-black shadow-2xl relative"
                >
                  {renderIllustrationSVG()}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Caja de Diálogo y Nombre del Hablante (SÍ scrollea internamente si crece) */}
          <div className="flex-1 min-h-0 flex flex-col space-y-1.5">
            {currentNode.speakerLabel && (
              <span className="text-[9px] md:text-[10px] font-bold uppercase tracking-widest text-game-accent italic pl-1 block shrink-0">
                {currentNode.speakerLabel}
              </span>
            )}
            
            <div 
              onClick={handleBoxClick}
              className="flex-1 min-h-0 w-full bg-game-surface/30 border border-game-muted/10 p-5 rounded-md flex flex-col justify-start relative transition-all duration-300 select-none overflow-y-auto custom-scrollbar cursor-pointer hover:border-game-muted/20 hover:bg-game-surface/40"
            >
              <div 
                style={{ fontFamily: '"Comic Sans MS", "Comic Sans", cursive' }}
                className={`${currentNode.speaker === 'subconscious' ? 'text-white' : 'text-zinc-400'} text-xs md:text-sm leading-relaxed tracking-wide w-full font-medium italic pr-4`}
              >
                {renderDialogue(parseDialogueText(getProcessedText(currentNode.text)), visibleCharCount)}

                {/* OPCIONES DE DIÁLOGO INCRUSTADAS AL FINAL DEL TEXTO */}
                {!isTyping && hasChoices && currentNode.choices && (
                  <div className="mt-4 pt-3 border-t border-game-muted/10 flex flex-col space-y-2">
                    {currentNode.choices.map((choice) => (
                      <button
                        key={choice.id}
                        onClick={(e) => {
                          e.stopPropagation(); // Evitar que el clic en la opción active handleBoxClick
                          handleChoiceClick(choice);
                        }}
                        className="w-full text-left py-2 px-3 border border-zinc-800/40 bg-zinc-950/40 hover:border-red-500/40 hover:bg-red-950/10 transition-all text-red-400 hover:text-red-300 font-mono text-[10px] uppercase tracking-widest cursor-pointer rounded-sm flex items-center space-x-2.5 group active:scale-[0.99] select-none"
                      >
                        <span className="text-white/40 group-hover:text-white/80 transition-colors font-bold select-none">&gt;</span>
                        <span className="leading-tight">{choice.text}</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>
              
              {/* Indicador de flecha de avance */}
              {!isTyping && !hasChoices && !currentNode.text.includes('#') && currentNode.next && (
                <motion.div 
                  animate={{ x: [0, 4, 0] }}
                  transition={{ repeat: Infinity, duration: 1.5 }}
                  className="absolute bottom-3 right-3 text-game-accent text-[9px] font-bold pointer-events-none"
                >
                  ▼
                </motion.div>
              )}
            </div>
          </div>
        </main>

      </div>

      {/* POPUP DE EXPLICACIÓN META-NARRATIVA */}
      <AnimatePresence>
        {showExplanation && (
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
              className="bg-game-surface border border-game-muted/20 p-5 md:p-6 w-[95%] max-w-sm space-y-5 text-center shadow-2xl rounded-sm"
            >
              <div className="w-10 h-10 mx-auto rounded-full bg-game-accent/10 border border-game-accent/20 flex items-center justify-center">
                <span className="text-game-accent text-sm font-bold">ℹ</span>
              </div>
              
              <h2 className="text-xs md:text-sm font-bold text-game-accent uppercase tracking-wider">
                Explicación del Proceso
              </h2>
              
              <p className="text-[10px] md:text-xs text-game-muted leading-relaxed font-mono text-left max-h-[40vh] overflow-y-auto custom-scrollbar">
                {selectedExplanationText}
              </p>
              
              <button 
                onClick={handleCloseExplanation} 
                className="h-10 md:h-11 w-full bg-game-accent text-game-bg font-bold uppercase text-[10px] tracking-widest hover:bg-game-text transition-all active:scale-95 cursor-pointer"
              >
                Continuar Historia
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
