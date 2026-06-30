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
import Scene12Iglu from './illustrations/scene_12_iglu';
import Scene13Anuncios from './illustrations/scene_13_anuncios';
import Scene14Batalla from './illustrations/scene_14_batalla';
import Scene14Resultado1 from './illustrations/scene_14_resultado_1';
import Scene14Resultado2 from './illustrations/scene_14_resultado_2';
import Scene14Resultado3 from './illustrations/scene_14_resultado_3';
import ExplicacionPatronAlegre from './illustrations/explicacion_patron_alegre';
import ExplicacionPatronDerrotado from './illustrations/explicacion_patron_derrotado';
import Scene15DripPricing from './illustrations/scene_15_drip_pricing';
import Scene16CelularCheckout from './illustrations/scene_16_celular_checkout';
import Scene17Batalla from './illustrations/scene_17_batalla';
import Scene18ReferencePricing from './illustrations/scene_18_reference_pricing';
import Scene19CelularReference from './illustrations/scene_19_celular_reference';
import Scene20Batalla from './illustrations/scene_20_batalla';
import Scene21CamoRevivido from './illustrations/scene_21_camo_revivido';
import Battle1MockupDirectRender from './components/battle_1_mockup_render';
import Battle2DripPricingRender from './components/battle_2_drip_pricing_render';
import Battle3ReferencePricingRender from './components/battle_3_reference_pricing_render';
import Scene22PatronHostil from './illustrations/scene_22_patron_hostil';
import Scene23DesenlaceFinal from './illustrations/scene_23_desenlace_final';
import { getNodeLabel } from './components/progress_helpers';

// Tokenizador para dar formato especial a etiquetas y marcadores
interface TextToken {
  type: 'text' | 'highlight' | 'action' | 'wave' | 'shake' | 'tremble' | 'rainbow' | 'breathe' | 'glitch' | 'neon' | 'sneaky' | 'spooky' | 'heartbeat';
  content: string;
  color?: string;
}

import {
  WaveFloatingText,
  RainbowShimmer,
  BattleImpactShake,
  HoloDigitalGlitch,
  FearTremble,
  PulseBreathe,
  SparklingGlow,
  HighlightText,
  SneakyStealthText,
  SpookyGhostText,
  FreneticHeartbeatText
} from './components/dialogue_effects';

function parseDialogueText(text: string): TextToken[] {
  const tokens: TextToken[] = [];
  // Regex robusto que soporta etiquetas con atributos opcionales como color="..."
  const regex = /<([a-z1-9\-]+)(?:\s+color="([^"]+)")?>([\s\S]*?)<\/\1>|([^<>]+)/gi;
  let match;

  while ((match = regex.exec(text)) !== null) {
    if (match[1]) {
      // Es una etiqueta (ej: <wave color="#ff0000">...</wave>)
      tokens.push({ 
        type: match[1].toLowerCase() as any, 
        content: match[3],
        color: match[2]
      });
    } else if (match[4]) {
      // Texto normal fuera de etiquetas
      tokens.push({ type: 'text', content: match[4] });
    }
  }
  return tokens;
}


export default function NarrativeIntroPage() {
  const [currentNodeId, setCurrentNodeId] = useState('scene_1_init');
  const [visibleCharCount, setVisibleCharCount] = useState(0);
  const [isTyping, setIsTyping] = useState(false);
  const [nickname, setNickname] = useState('Jugador');
  
  // Historial interno para el botón Atrás en la narrativa
  const [history, setHistory] = useState<string[]>([]);
  
  // Nodos de diálogo ya visitados por el usuario
  const [visitedNodes, setVisitedNodes] = useState<string[]>(['scene_1_init']);
  const [showMenu, setShowMenu] = useState(false);

  // Estados de telemetría y métricas (JSONB)
  const [transitions, setTransitions] = useState<any[]>([]);
  const [decisions, setDecisions] = useState<any[]>([]);
  
  const typingTimer = useRef<NodeJS.Timeout | null>(null);
  const router = useRouter();

  // Cronómetro de lectura para nodos
  const startTimeRef = useRef<number>(typeof window !== 'undefined' ? performance.now() : 0);

  // Helper para guardar/sincronizar telemetría de forma centralizada
  const syncTelemetry = async (
    nextNodeId: string, 
    updatedVisited: string[], 
    updatedTransitions: any[], 
    updatedDecisions: any[]
  ) => {
    const playerId = localStorage.getItem('antipatron_player_id');
    if (!playerId) return;

    const payload = {
      currentNodeId: nextNodeId,
      visitedNodes: updatedVisited,
      transitions: updatedTransitions,
      decisions: updatedDecisions
    };

    // Guardar en localstorage
    localStorage.setItem('antipatron_narrative_state', JSON.stringify(payload));
    localStorage.setItem('antipatron_last_node', nextNodeId);

    // Guardar en la base de datos dedicada (narrative_state)
    try {
      fetch('/api/narrative', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          playerId,
          metadata: payload
        })
      });
    } catch (e) {
      console.error("Error sincronizando telemetría en base de datos:", e);
    }
  };

  // Función genérica para cambiar de nodo y registrar la transición
  const changeNode = (
    nextNodeId: string, 
    transitionType: 'forward' | 'backtrack' | 'jump_forward',
    updatedDecisionsOverride?: any[]
  ) => {
    const now = performance.now();
    const timeSpent = (now - startTimeRef.current) / 1000;
    startTimeRef.current = now; // Reiniciamos el cronómetro para el nuevo nodo

    const newTransition = {
      from: currentNodeId,
      to: nextNodeId,
      durationSeconds: parseFloat(timeSpent.toFixed(2)),
      timestamp: new Date().toISOString(),
      type: transitionType
    };

    const updatedTransitions = [...transitions, newTransition];
    const updatedVisited = visitedNodes.includes(nextNodeId) 
      ? visitedNodes 
      : [...visitedNodes, nextNodeId];

    setTransitions(updatedTransitions);
    setVisitedNodes(updatedVisited);
    setCurrentNodeId(nextNodeId);

    // Guardamos en localstorage local
    localStorage.setItem('antipatron_visited_nodes', JSON.stringify(updatedVisited));

    // Determinar las decisiones finales (manejo de batching en React)
    const finalDecisions = [...(updatedDecisionsOverride || decisions)];

    // Si salimos de una escena interactiva/batalla, registramos la decisión correspondiente de forma automática
    if (currentNodeId === 'scene_14_choice') {
      const isCorrect = nextNodeId === 'scene_14_resultado_2' || nextNodeId === 'scene_14_resultado_3';
      const outcome = nextNodeId === 'scene_14_resultado_2' 
        ? 'correct_reservation' 
        : nextNodeId === 'scene_14_resultado_3' 
        ? 'avoided_by_seeking_other_pages' 
        : 'fell_for_adware';
      
      finalDecisions.push({
        nodeId: currentNodeId,
        choiceId: outcome,
        isCorrect,
        errorsCount: isCorrect ? 0 : 1,
        durationSeconds: parseFloat(timeSpent.toFixed(2)),
        timestamp: new Date().toISOString(),
        details: { outcome }
      });
      setDecisions(finalDecisions);
    } else if (currentNodeId === 'scene_15_choice') {
      const isCorrect = nextNodeId === 'scene_15_resultado_1';
      const outcome = isCorrect ? 'correct_checkout' : 'fell_for_drip_pricing';
      
      finalDecisions.push({
        nodeId: currentNodeId,
        choiceId: outcome,
        isCorrect,
        errorsCount: isCorrect ? 0 : 1,
        durationSeconds: parseFloat(timeSpent.toFixed(2)),
        timestamp: new Date().toISOString(),
        details: { outcome }
      });
      setDecisions(finalDecisions);
    } else if (currentNodeId === 'scene_18_choice') {
      const isCorrect = nextNodeId === 'scene_18_resultado_1';
      const outcome = isCorrect ? 'correct_reference_price_selection' : 'fell_for_reference_pricing';
      
      finalDecisions.push({
        nodeId: currentNodeId,
        choiceId: outcome,
        isCorrect,
        errorsCount: isCorrect ? 0 : 1,
        durationSeconds: parseFloat(timeSpent.toFixed(2)),
        timestamp: new Date().toISOString(),
        details: { outcome }
      });
      setDecisions(finalDecisions);
    }

    // Sincronizar
    syncTelemetry(nextNodeId, updatedVisited, updatedTransitions, finalDecisions);
  };

  // Helper para saltar a un nodo desbloqueado
  const jumpToNode = (nodeId: string) => {
    if (!NARRATIVE_NODES[nodeId]) return;
    const idx = visitedNodes.indexOf(nodeId);
    if (idx !== -1) {
      const newHistory = visitedNodes.slice(0, idx);
      setHistory(newHistory);
      localStorage.setItem('antipatron_narrative_history', JSON.stringify(newHistory));

      // Determinar si es backtrack o jump_forward
      const currentIdx = visitedNodes.indexOf(currentNodeId);
      const transitionType = idx < currentIdx ? 'backtrack' : 'jump_forward';

      changeNode(nodeId, transitionType);
    }
  };

  // Cargar nodos visitados, último nodo e historial al montar (evita SSR mismatch y sincroniza con el servidor)
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const id = localStorage.getItem('antipatron_player_id');

      // 1. Cargar estado local rápido
      const localStateStr = localStorage.getItem('antipatron_narrative_state');
      if (localStateStr) {
        try {
          const parsed = JSON.parse(localStateStr);
          if (parsed.currentNodeId && NARRATIVE_NODES[parsed.currentNodeId]) {
            setCurrentNodeId(parsed.currentNodeId);
          }
          if (Array.isArray(parsed.visitedNodes)) {
            setVisitedNodes(parsed.visitedNodes);
          }
          if (Array.isArray(parsed.transitions)) {
            setTransitions(parsed.transitions);
          }
          if (Array.isArray(parsed.decisions)) {
            setDecisions(parsed.decisions);
          }
          const savedHistory = localStorage.getItem('antipatron_narrative_history');
          if (savedHistory) {
            const parsedHist = JSON.parse(savedHistory);
            if (Array.isArray(parsedHist)) {
              setHistory(parsedHist);
            }
          }
        } catch (e) {
          console.error("Error cargando estado local:", e);
        }
      } else {
        // Compatibilidad con guardados antiguos
        const savedVisited = localStorage.getItem('antipatron_visited_nodes');
        if (savedVisited) {
          try {
            const parsed = JSON.parse(savedVisited);
            if (Array.isArray(parsed) && parsed.length > 0) {
              setVisitedNodes(parsed);
            }
          } catch (e) {}
        }
        const savedNode = localStorage.getItem('antipatron_last_node');
        const savedHistory = localStorage.getItem('antipatron_narrative_history');
        if (savedNode && NARRATIVE_NODES[savedNode]) {
          setCurrentNodeId(savedNode);
        }
        if (savedHistory) {
          try {
            const parsedHist = JSON.parse(savedHistory);
            if (Array.isArray(parsedHist)) setHistory(parsedHist);
          } catch (e) {}
        }
      }

      // 2. Cargar estado del servidor para sincronización remota
      if (id) {
        fetch(`/api/narrative?playerId=${id}`)
          .then(res => res.ok ? res.json() : null)
          .then(data => {
            if (data && data.metadata) {
              const remote = data.metadata;
              if (remote.currentNodeId && NARRATIVE_NODES[remote.currentNodeId]) {
                setCurrentNodeId(remote.currentNodeId);
              }
              if (Array.isArray(remote.visitedNodes)) {
                setVisitedNodes(remote.visitedNodes);
              }
              if (Array.isArray(remote.transitions)) {
                setTransitions(remote.transitions);
              }
              if (Array.isArray(remote.decisions)) {
                setDecisions(remote.decisions);
              }
              
              // Sincronizar el localstorage local
              localStorage.setItem('antipatron_narrative_state', JSON.stringify(remote));
              localStorage.setItem('antipatron_last_node', remote.currentNodeId);
              localStorage.setItem('antipatron_visited_nodes', JSON.stringify(remote.visitedNodes));
            }
          })
          .catch(err => console.error("Error sincronizando estado remoto de la narrativa:", err));
      }
    }
  }, []);

  // Persistir el último nodo visitado, historial y desbloquear nuevos nodos
  useEffect(() => {
    if (typeof window !== 'undefined') {
      if (currentNodeId === 'scene_11_end') {
        // Al terminar, limpiamos el guardado para comenzar de nuevo en la siguiente sesión
        localStorage.removeItem('antipatron_last_node');
        localStorage.removeItem('antipatron_narrative_history');
      } else {
        localStorage.setItem('antipatron_last_node', currentNodeId);
        localStorage.setItem('antipatron_narrative_history', JSON.stringify(history));
      }

      // Registrar nuevo nodo visitado
      if (!visitedNodes.includes(currentNodeId)) {
        const updated = [...visitedNodes, currentNodeId];
        setVisitedNodes(updated);
        localStorage.setItem('antipatron_visited_nodes', JSON.stringify(updated));
      }
    }
  }, [currentNodeId, history, visitedNodes]);
  const currentNode = NARRATIVE_NODES[currentNodeId] || NARRATIVE_NODES['scene_1_init'];

  // Leer nodo desde los parámetros de búsqueda de la URL (para retornar desde el minijuego de anuncios disfrazados)
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const searchParams = new URLSearchParams(window.location.search);
      const nodeParam = searchParams.get('node');
      if (nodeParam && NARRATIVE_NODES[nodeParam]) {
        setCurrentNodeId(nodeParam);

        // Inicializar historial según el nodo cargado para conservar el flujo al retroceder
        if (nodeParam.startsWith('scene_14_resultado_') || nodeParam === 'scene_14_choice') {
          setHistory(['scene_1_init', 'scene_14_init']);
        } else if (nodeParam === 'scene_14_explicacion_1') {
          setHistory(['scene_1_init', 'scene_14_init', 'scene_14_choice', 'scene_14_resultado_1']);
        } else if (nodeParam === 'scene_14_explicacion_2') {
          setHistory(['scene_1_init', 'scene_14_init', 'scene_14_choice', 'scene_14_resultado_2']);
        } else if (nodeParam === 'scene_14_explicacion_3') {
          setHistory(['scene_1_init', 'scene_14_init', 'scene_14_choice', 'scene_14_resultado_3']);
        } else if (nodeParam.startsWith('scene_15_resultado_') || nodeParam === 'scene_15_choice') {
          setHistory(['scene_1_init', 'scene_15_init_1', 'scene_15_init_2', 'scene_15_init_3', 'scene_15_init_4', 'scene_15_init_4b']);
        } else if (nodeParam === 'scene_15_explicacion_1') {
          setHistory(['scene_1_init', 'scene_15_init_1', 'scene_15_init_2', 'scene_15_init_3', 'scene_15_init_4', 'scene_15_init_4b', 'scene_15_choice', 'scene_15_resultado_1']);
        } else if (nodeParam === 'scene_15_explicacion_2') {
          setHistory(['scene_1_init', 'scene_15_init_1', 'scene_15_init_2', 'scene_15_init_3', 'scene_15_init_4', 'scene_15_init_4b', 'scene_15_choice', 'scene_15_resultado_2']);
        } else if (nodeParam.startsWith('scene_18_resultado_') || nodeParam === 'scene_18_choice') {
          setHistory(['scene_1_init', 'scene_18_init_1', 'scene_18_init_2', 'scene_18_init_3', 'scene_18_init_4', 'scene_18_init_4b']);
        } else if (nodeParam === 'scene_18_explicacion_1') {
          setHistory(['scene_1_init', 'scene_18_init_1', 'scene_18_init_2', 'scene_18_init_3', 'scene_18_init_4', 'scene_18_init_4b', 'scene_18_choice', 'scene_18_resultado_1']);
        } else if (nodeParam === 'scene_18_explicacion_2') {
          setHistory(['scene_1_init', 'scene_18_init_1', 'scene_18_init_2', 'scene_18_init_3', 'scene_18_init_4', 'scene_18_init_4b', 'scene_18_choice', 'scene_18_resultado_2']);
        }

        // Limpiar los parámetros de búsqueda en la URL para evitar recargas accidentales
        window.history.replaceState({}, '', window.location.pathname);
      }
    }
  }, [router]);

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
  const advanceNode = (nextId: string, updatedDecisionsOverride?: any[]) => {
    if (nextId === 'post-test-intro') {
      router.push('/marking/post-intro');
      return;
    }
    if (NARRATIVE_NODES[nextId]) {
      setHistory(prev => {
        const nextHist = [...prev, currentNodeId];
        localStorage.setItem('antipatron_narrative_history', JSON.stringify(nextHist));
        return nextHist;
      });
      // Avance estándar
      changeNode(nextId, 'forward', updatedDecisionsOverride);
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
      localStorage.setItem('antipatron_narrative_history', JSON.stringify(prevHistory));
      
      // Retroceso estándar
      changeNode(prevNodeId, 'backtrack');
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
  const handleChoiceClick = (choice: { text: string; nextNodeId: string; isCorrect: boolean; id: string }) => {
    // Registramos la decisión
    const now = performance.now();
    const timeSpent = (now - startTimeRef.current) / 1000;
    
    const newDecision = {
      nodeId: currentNodeId,
      choiceId: choice.id,
      isCorrect: choice.isCorrect,
      errorsCount: choice.isCorrect ? 0 : 1,
      durationSeconds: parseFloat(timeSpent.toFixed(2)),
      timestamp: new Date().toISOString(),
      details: { text: choice.text }
    };
    
    const updatedDecisions = [...decisions, newDecision];
    setDecisions(updatedDecisions);
    
    
    // Avanzamos al nodo
    advanceNode(choice.nextNodeId, updatedDecisions);
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
        if (visibleLength < tokenLength) {
          return <span key={index} className="font-bold mx-1 select-none text-zinc-300">{visibleContent.toUpperCase()}</span>;
        }
        return <HighlightText key={index} text={token.content} isDarkPatternTheme={isDarkPatternTheme} color={token.color} />;
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
      } else if (token.type === 'wave') {
        if (visibleLength < tokenLength) {
          return <span key={index} className="italic" style={{ color: token.color || '#38bdf8' }}>{visibleContent}</span>;
        }
        return <WaveFloatingText key={index} text={token.content} color={token.color} />;
      } else if (token.type === 'shake') {
        if (visibleLength < tokenLength) {
          return <span key={index} className="font-bold font-mono" style={{ color: token.color || '#ef4444' }}>{visibleContent}</span>;
        }
        return <BattleImpactShake key={index} text={token.content} color={token.color} />;
      } else if (token.type === 'tremble') {
        if (visibleLength < tokenLength) {
          return <span key={index} className="italic" style={{ color: token.color || '#d8b4fe' }}>{visibleContent}</span>;
        }
        return <FearTremble key={index} text={token.content} color={token.color} />;
      } else if (token.type === 'rainbow') {
        if (visibleLength < tokenLength) {
          return <span key={index} className="font-medium" style={{ color: token.color || '#a1a1aa' }}>{visibleContent}</span>;
        }
        return <RainbowShimmer key={index} text={token.content} color={token.color} />;
      } else if (token.type === 'breathe') {
        if (visibleLength < tokenLength) {
          return <span key={index} className="italic" style={{ color: token.color || '#d4d4d8' }}>{visibleContent}</span>;
        }
        return <PulseBreathe key={index} text={token.content} color={token.color} />;
      } else if (token.type === 'glitch') {
        if (visibleLength < tokenLength) {
          return <span key={index} className="font-mono" style={{ color: token.color || '#84cc16' }}>{visibleContent}</span>;
        }
        return <HoloDigitalGlitch key={index} text={token.content} color={token.color} />;
      } else if (token.type === 'neon') {
        if (visibleLength < tokenLength) {
          return <span key={index} style={{ color: token.color || '#e4e4e7' }}>{visibleContent}</span>;
        }
        return <SparklingGlow key={index} text={token.content} color={token.color} />;
      } else if (token.type === 'sneaky') {
        if (visibleLength < tokenLength) {
          return <span key={index} className="font-mono" style={{ color: token.color || '#7ba077' }}>{visibleContent}</span>;
        }
        return <SneakyStealthText key={index} text={token.content} color={token.color} />;
      } else if (token.type === 'spooky') {
        if (visibleLength < tokenLength) {
          return <span key={index} className="font-mono italic" style={{ color: token.color || '#c084fc' }}>{visibleContent}</span>;
        }
        return <SpookyGhostText key={index} text={token.content} color={token.color} />;
      } else if (token.type === 'heartbeat') {
        if (visibleLength < tokenLength) {
          return <span key={index} className="font-bold animate-pulse" style={{ color: token.color || '#f43f5e' }}>{visibleContent}</span>;
        }
        return <FreneticHeartbeatText key={index} text={token.content} color={token.color} />;
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

    if (currentNodeId.startsWith('scene_12')) {
      // Escena 12: Camo viendo el iglú brillante en el celular
      return <Scene12Iglu />;
    }

    if (currentNodeId.startsWith('scene_13')) {
      // Escena 13: Celular gigante con múltiples anuncios y popups
      return <Scene13Anuncios />;
    }

    if (currentNodeId === 'scene_14_init' || currentNodeId === 'scene_14_choice') {
      // Escena 14: La Batalla Mental
      return <Scene14Batalla />;
    }

    if (currentNodeId === 'scene_14_resultado_1') {
      // Resultado 1: Solo Camo impactado por los popups
      return <Scene14Resultado1 />;
    }

    if (currentNodeId === 'scene_14_explicacion_1') {
      // Explicación 1: Patrón Oscuro alegre centrado
      return <ExplicacionPatronAlegre isCentered={true} />;
    }

    if (currentNodeId === 'scene_14_resultado_2') {
      // Resultado 2: Solo Camo zen buscando el botón real
      return <Scene14Resultado2 />;
    }

    if (currentNodeId === 'scene_14_explicacion_2') {
      // Explicación 2: Patrón Oscuro derrotado centrado
      return <ExplicacionPatronDerrotado isCentered={true} />;
    }

    if (currentNodeId === 'scene_14_resultado_3') {
      // Resultado 3: Solo Camo feliz con su compra en Polo Iglús
      return <Scene14Resultado3 />;
    }

    if (currentNodeId === 'scene_14_explicacion_3') {
      // Explicación 3: Patrón Oscuro derrotado centrado
      return <ExplicacionPatronDerrotado isCentered={true} />;
    }

    // Escena 15: Camo en sillón — sólo el primer nodo de introducción
    if (currentNodeId === 'scene_15_init_1') {
      return <Scene15DripPricing />;
    }

    // Escena 16: Celular grande (zoom del checkout) — nodos 2 a 4b
    if (
      currentNodeId === 'scene_15_init_2' ||
      currentNodeId === 'scene_15_init_3' ||
      currentNodeId === 'scene_15_init_4' ||
      currentNodeId === 'scene_15_init_4b'
    ) {
      return <Scene16CelularCheckout />;
    }

    // Escena 17: Batalla con opciones
    if (currentNodeId === 'scene_15_choice') {
      return <Scene17Batalla />;
    }

    if (currentNodeId === 'scene_15_resultado_1') {
      return <Scene14Resultado2 />;
    }

    if (currentNodeId === 'scene_15_explicacion_1') {
      return <ExplicacionPatronDerrotado isCentered={true} />;
    }

    if (currentNodeId === 'scene_15_resultado_2') {
      return <Scene14Resultado1 />;
    }

    if (currentNodeId === 'scene_15_explicacion_2') {
      return <ExplicacionPatronAlegre isCentered={true} />;
    }

    // Escena 18: Camo en sillón — sólo el primer nodo de introducción (Reference Pricing)
    if (currentNodeId === 'scene_18_init_1') {
      return <Scene18ReferencePricing />;
    }

    // Escena 19: Celular grande (zoom de planes) — nodos 2 a 4b
    if (
      currentNodeId === 'scene_18_init_2' ||
      currentNodeId === 'scene_18_init_3' ||
      currentNodeId === 'scene_18_init_4' ||
      currentNodeId === 'scene_18_init_4b'
    ) {
      return <Scene19CelularReference />;
    }

    // Escena 20: Batalla con opciones
    if (currentNodeId === 'scene_18_choice') {
      return <Scene20Batalla />;
    }

    if (currentNodeId === 'scene_18_resultado_1') {
      return <Scene14Resultado2 />;
    }

    if (currentNodeId === 'scene_18_explicacion_1') {
      return <ExplicacionPatronDerrotado isCentered={true} />;
    }

    if (currentNodeId === 'scene_18_resultado_2') {
      return <Scene14Resultado1 />;
    }

    if (currentNodeId === 'scene_18_explicacion_2') {
      return <ExplicacionPatronAlegre isCentered={true} />;
    }

    // Escena 21: Fusión de alma y Camo revivido
    if (currentNodeId === 'scene_21_init_1' || currentNodeId === 'scene_21_init_2') {
      return <Scene21CamoRevivido />;
    }

    // Escena 22: Confrontación con el Patrón Oscuro furioso
    if (currentNodeId === 'scene_22_init_1' || currentNodeId === 'scene_22_init_2') {
      return <Scene22PatronHostil />;
    }

    // Escena 23: Huida y Reflexión final
    if (
      currentNodeId === 'scene_23_init_1' ||
      currentNodeId === 'scene_23_init_2' ||
      currentNodeId === 'scene_23_init_3' ||
      currentNodeId === 'scene_11_end'
    ) {
      return <Scene23DesenlaceFinal />;
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

  // Integración directa del minijuego de anuncios disfrazados en el flujo de la misma ruta
  if (currentNodeId === 'scene_14_choice') {
    return (
      <Battle1MockupDirectRender
        onCorrect={() => {
          setHistory(prev => [...prev, 'scene_14_choice']);
          setCurrentNodeId('scene_14_resultado_2');
        }}
        onIncorrect={() => {
          setHistory(prev => [...prev, 'scene_14_choice']);
          setCurrentNodeId('scene_14_resultado_1');
        }}
        onExit={() => {
          setHistory(prev => [...prev, 'scene_14_choice']);
          setCurrentNodeId('scene_14_resultado_3');
        }}
        onBack={handleBack}
        visitedNodes={visitedNodes}
        currentNodeId={currentNodeId}
        jumpToNode={jumpToNode}
      />
    );
  }

  // Integración directa del minijuego de precios por goteo en el flujo de la misma ruta
  if (currentNodeId === 'scene_15_choice') {
    return (
      <Battle2DripPricingRender
        onCorrect={() => {
          setHistory(prev => [...prev, 'scene_15_choice']);
          setCurrentNodeId('scene_15_resultado_1');
        }}
        onIncorrect={() => {
          setHistory(prev => [...prev, 'scene_15_choice']);
          setCurrentNodeId('scene_15_resultado_2');
        }}
        onBack={handleBack}
        visitedNodes={visitedNodes}
        currentNodeId={currentNodeId}
        jumpToNode={jumpToNode}
      />
    );
  }

  // Integración directa del minijuego de precios de referencia en el flujo de la misma ruta
  if (currentNodeId === 'scene_18_choice') {
    return (
      <Battle3ReferencePricingRender
        onCorrect={() => {
          setHistory(prev => [...prev, 'scene_18_choice']);
          setCurrentNodeId('scene_18_resultado_1');
        }}
        onIncorrect={() => {
          setHistory(prev => [...prev, 'scene_18_choice']);
          setCurrentNodeId('scene_18_resultado_2');
        }}
        onBack={handleBack}
        visitedNodes={visitedNodes}
        currentNodeId={currentNodeId}
        jumpToNode={jumpToNode}
      />
    );
  }

  return (
    <div className="flex flex-col h-screen w-full bg-game-bg text-game-text p-4 md:p-6 overflow-hidden items-center justify-center font-sans">
      
      {/* Contenedor adaptado a la Consistencia de Escenas (Layout Sándwich sin footer) */}
      <div className="flex flex-col h-full max-w-lg w-full mx-auto justify-between py-2 md:py-4 relative">

        {/* 1. HEADER (shrink-0) - Botón Atrás y Selector de Escenas */}
        <header className="grid grid-cols-[1fr_2fr_1fr] items-center shrink-0 pb-3 border-b border-zinc-900/60 w-full gap-1.5 relative z-20">
          {/* Columna izquierda: Atrás */}
          <div className="flex justify-start">
            <button
              onClick={handleBack}
              className="text-[9px] border border-zinc-800 text-game-muted hover:border-zinc-500 hover:text-game-accent transition-all px-2 py-1 font-bold uppercase tracking-wider rounded-sm active:scale-95 cursor-pointer whitespace-nowrap max-w-[65px] truncate"
            >
              Atrás
            </button>
          </div>

          {/* Columna central: Espacio vacío */}
          <div className="flex justify-center w-full"></div>

          {/* Columna derecha: Selector de progreso (tres barras pequeñas) */}
          <div className="flex justify-end items-center">
            <button
              onClick={() => setShowMenu(true)}
              title="Historial de navegación"
              className="flex flex-col justify-between w-4 h-3 cursor-pointer py-[2px] text-zinc-500 hover:text-game-accent transition-colors active:scale-95"
            >
              <span className="w-full h-[1.5px] bg-current rounded-sm"></span>
              <span className="w-full h-[1.5px] bg-current rounded-sm"></span>
              <span className="w-full h-[1.5px] bg-current rounded-sm"></span>
            </button>
          </div>
        </header>
        {/* MENÚ FLOTANTE DE SELECCIÓN DE PROGRESO */}
        {showMenu && (
          <div className="absolute inset-0 bg-[#0c0d14]/95 border border-[#272a3d]/80 rounded-md z-30 flex flex-col p-4">
            <div className="flex justify-between items-center pb-2 border-b border-[#272a3d]/40 mb-3">
              <span className="text-[10px] uppercase font-bold tracking-wider text-game-accent">Historial de Diálogos</span>
              <button onClick={() => setShowMenu(false)} className="text-zinc-500 hover:text-white font-bold text-xs cursor-pointer">✕</button>
            </div>
            <div className="flex-1 overflow-y-auto custom-scrollbar space-y-1 pr-1">
              {visitedNodes.map((nodeId) => {
                const isCurrent = nodeId === currentNodeId;
                return (
                  <button
                    key={nodeId}
                    onClick={() => {
                      jumpToNode(nodeId);
                      setShowMenu(false);
                    }}
                    className={`w-full text-left py-1.5 px-2 rounded text-[10px] font-medium transition-all ${
                      isCurrent 
                        ? 'bg-game-accent/20 text-game-accent border border-game-accent/30 font-bold' 
                        : 'bg-zinc-950/40 border border-zinc-900/20 text-zinc-400 hover:bg-zinc-900/60 hover:text-white cursor-pointer'
                    }`}
                  >
                    {getNodeLabel(nodeId)}
                  </button>
                );
              })}
            </div>
          </div>
        )}
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
                style={{ 
                  fontFamily: '"Comic Sans MS", "Comic Sans", cursive',
                  whiteSpace: 'pre-wrap'
                }}
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

      {/* El POPUP DE EXPLICACIÓN META-NARRATIVA ha sido removido y deprecado */}

    </div>
  );
}
