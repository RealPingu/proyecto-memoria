'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { NARRATIVE_NODES, DialogueNode } from './data';
import SleepingPenguinLying from './illustrations/sleeping_penguin_lying';

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
    
    // Almacenamos la explicación del patrón y el destino
    setSelectedExplanationText(choice.explanation);
    setNextAfterExplanation(choice.nextNodeId);
    setShowExplanation(true);
  };

  const handleCloseExplanation = () => {
    setShowExplanation(false);
    advanceNode(nextAfterExplanation);
  };

  // Parser dinámico para formatear "" y ## en React
  const renderDialogue = (tokens: TextToken[], visibleCount: number) => {
    let charsRemaining = visibleCount;
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
              color: '#000000',
              WebkitTextStroke: '0.8px #ffffff',
              textShadow: '0 0 3px #ffffff, 0 0 6px #ffffff, 0 0 1px #ffffff',
              display: 'inline-block'
            }}
            className="font-bold mx-1 select-none"
          >
            {chars.map((char, charIdx) => (
              <motion.span 
                key={charIdx} 
                style={{ display: 'inline-block', whiteSpace: 'pre' }}
                animate={{ 
                  y: [0, -3.5, 0]
                }}
                transition={{ 
                  repeat: Infinity, 
                  duration: 2.2, 
                  ease: "easeInOut",
                  delay: charIdx * 0.12
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
      // Escena 1: El pingüino acostado durmiendo (SleepingPenguinLying)
      return <SleepingPenguinLying />;
    }

    if (currentNodeId.startsWith('scene_2')) {
      // Escenas de encuentro con el subconsciente (Escena 2, respuestas y escena 3-unión)
      return (
        <svg viewBox="0 0 200 120" className="w-full h-full">
          <defs>
            {/* Filtro de resplandor para el ojo blanco */}
            <filter id="glow-effect" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur in="SourceGraphic" stdDeviation="4" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
            
            <radialGradient id="limbo-blue" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#0f172a" stopOpacity="0.6" />
              <stop offset="100%" stopColor="#09090b" stopOpacity="0.9" />
            </radialGradient>
          </defs>

          {/* Fondo */}
          <rect width="200" height="120" fill="url(#limbo-blue)" />
          <line x1="10" y1="95" x2="190" y2="95" stroke="#1e293b" strokeWidth="0.5" />

          {/* Pingüino (Mirando hacia la derecha) */}
          <g transform="translate(55, 60)">
            <ellipse cx="0" cy="30" rx="9" ry="1.5" fill="black" opacity="0.35" />
            
            {/* Cuerpo inclinado */}
            <ellipse cx="0" cy="10" rx="10" ry="17" fill="#18181b" />
            <ellipse cx="4" cy="11" rx="6" ry="12" fill="#f4f4f5" />
            
            {/* Aleta */}
            <path d="M-8,5 C-11,8 -10,16 -8,18" stroke="#18181b" strokeWidth="2" strokeLinecap="round" fill="none" />
            
            {/* Cabeza */}
            <circle cx="2" cy="-10" r="8" fill="#18181b" />
            {/* Ojo asombrado */}
            <circle cx="5" cy="-11" r="1.5" fill="#f4f4f5" />
            <circle cx="5.5" cy="-11" r="0.75" fill="black" />
            {/* Pico */}
            <polygon points="9,-9 13,-8 9,-7" fill="#f59e0b" />
          </g>

          {/* Ojo Blanco (Subconsciente) - Flotando y Latente */}
          <g transform="translate(145, 48)">
            <motion.g
              animate={{ 
                y: [-3, 3, -3],
                scale: [0.98, 1.02, 0.98]
              }}
              transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
            >
              {/* Sombra de suelo */}
              <ellipse cx="0" cy="42" rx="15" ry="2.5" fill="#000000" opacity="0.4" />

              {/* Halo de luz exterior */}
              <circle cx="0" cy="0" r="22" fill="white" opacity="0.05" filter="url(#glow-effect)" />

              {/* Globo Ocular */}
              <circle cx="0" cy="0" r="16" fill="#f8fafc" stroke="#e2e8f0" strokeWidth="0.5" filter="url(#glow-effect)" />

              {/* Pupila Animada (Simula movimiento de mirada atenta) */}
              <motion.g
                animate={{ 
                  x: [-1.5, 1.5, -1.5],
                  y: [-0.5, 0.5, -0.5]
                }}
                transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
              >
                <circle cx="-3" cy="0" r="6" fill="#0f172a" />
                {/* Reflejo de luz */}
                <circle cx="-4.5" cy="-1.5" r="1.5" fill="white" />
              </motion.g>
            </motion.g>
          </g>
        </svg>
      );
    }

    if (currentNodeId === 'scene_3_start') {
      // Fin de la demo / Escena 3: Avanzando juntos hacia el resplandor
      return (
        <svg viewBox="0 0 200 120" className="w-full h-full">
          <defs>
            <radialGradient id="portal-light" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#10b981" stopOpacity="0.7" />
              <stop offset="30%" stopColor="#064e3b" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#09090b" stopOpacity="0.9" />
            </radialGradient>
          </defs>

          {/* Fondo */}
          <rect width="200" height="120" fill="#09090b" />
          
          {/* Gran resplandor de fondo (Portal) */}
          <motion.circle 
            animate={{ 
              r: [25, 35, 25],
              opacity: [0.6, 0.8, 0.6] 
            }}
            transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
            cx="100" 
            cy="50" 
            r="30" 
            fill="url(#portal-light)" 
          />

          {/* Líneas de perspectiva en el suelo */}
          <line x1="100" y1="50" x2="20" y2="120" stroke="#065f46" strokeWidth="0.25" opacity="0.3" />
          <line x1="100" y1="50" x2="60" y2="120" stroke="#065f46" strokeWidth="0.25" opacity="0.3" />
          <line x1="100" y1="50" x2="140" y2="120" stroke="#065f46" strokeWidth="0.25" opacity="0.3" />
          <line x1="100" y1="50" x2="180" y2="120" stroke="#065f46" strokeWidth="0.25" opacity="0.3" />
          <line x1="0" y1="95" x2="200" y2="95" stroke="#065f46" strokeWidth="0.5" opacity="0.4" />

          {/* Pingüino de espaldas, más lejano */}
          <g transform="translate(88, 70) scale(0.7)">
            <ellipse cx="0" cy="30" rx="9" ry="1.5" fill="black" opacity="0.4" />
            <ellipse cx="0" cy="10" rx="10" ry="17" fill="#18181b" />
            {/* Aletas */}
            <path d="M-11,8 C-13,11 -12,18 -10,20" stroke="#18181b" strokeWidth="2" strokeLinecap="round" fill="none" />
            <path d="M11,8 C13,11 12,18 10,20" stroke="#18181b" strokeWidth="2" strokeLinecap="round" fill="none" />
            <circle cx="0" cy="-10" r="8" fill="#18181b" />
          </g>

          {/* Ojo Blanco de espaldas/flotando al lado */}
          <g transform="translate(114, 62) scale(0.6)">
            <motion.g
              animate={{ y: [-2, 2, -2] }}
              transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
            >
              <ellipse cx="0" cy="42" rx="15" ry="2.5" fill="black" opacity="0.4" />
              <circle cx="0" cy="0" r="16" fill="#f8fafc" opacity="0.9" />
              <circle cx="0" cy="0" r="6" fill="#0f172a" opacity="0.8" />
            </motion.g>
          </g>
        </svg>
      );
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
                        className="w-full text-left py-2 px-3 border border-zinc-800/40 bg-zinc-950/40 hover:border-game-accent/50 hover:bg-game-surface/20 transition-all text-zinc-400 hover:text-game-accent font-mono text-[10px] uppercase tracking-widest cursor-pointer rounded-sm flex items-center space-x-2.5 group active:scale-[0.99] select-none"
                      >
                        <span className="text-game-accent/40 group-hover:text-game-accent transition-colors font-bold select-none">&gt;</span>
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
