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


const CHECKPOINTS = [
  { id: 'scene_1_init', label: 'E1', name: 'El Despertar' },
  { id: 'scene_2_init_1', label: 'E2', name: 'El Encuentro' },
  { id: 'scene_3_init_1', label: 'E3', name: 'Cuestionamiento' },
  { id: 'scene_4_init_1', label: 'E4', name: 'Sendero Glacial' },
  { id: 'scene_5_init_1', label: 'E5', name: 'Aproximación' },
  { id: 'scene_6_init_1', label: 'E6', name: 'El Resplandor' },
  { id: 'scene_7_init_1', label: 'E7', name: 'En la Mira' },
  { id: 'scene_8_init_1', label: 'E8', name: 'El Asalto' },
  { id: 'scene_9_init_1', label: 'E9', name: 'Zoom Celular' },
  { id: 'scene_10_init_1', label: 'E10', name: 'Gran Celular' },
  { id: 'scene_11_init_1', label: 'E11', name: 'Aleta y Celular' },
  { id: 'scene_12_init_1', label: 'E12', name: 'El Iglú' },
  { id: 'scene_13_init_1', label: 'E13', name: 'Portal Anuncios' },
  { id: 'scene_14_init', label: 'E14', name: 'Batalla: Anuncios' },
  { id: 'scene_15_init_1', label: 'E15', name: 'Batalla: Goteo' },
  { id: 'scene_18_init_1', label: 'E18', name: 'Batalla: Referencia' },
  { id: 'scene_21_init_1', label: 'E21', name: 'Camo Revivido' },
  { id: 'scene_22_init_1', label: 'E22', name: 'Furia del Patrón' },
  { id: 'scene_23_init_1', label: 'E23', name: 'Desenlace Final' }
];

export default function NarrativeIntroPage() {
  const [currentNodeId, setCurrentNodeId] = useState('scene_1_init');
  const [visibleCharCount, setVisibleCharCount] = useState(0);
  const [isTyping, setIsTyping] = useState(false);
  const [nickname, setNickname] = useState('Jugador');
  
  // Historial interno para el botón Atrás en la narrativa
  const [history, setHistory] = useState<string[]>([]);
  
  // Checkpoints ya desbloqueados por el usuario
  const [visitedCheckpoints, setVisitedCheckpoints] = useState<string[]>(['scene_1_init']);
  
  const typingTimer = useRef<NodeJS.Timeout | null>(null);
  const router = useRouter();

  // Helper para saltar a un checkpoint desbloqueado
  const jumpToCheckpoint = (checkpointId: string, idx: number) => {
    const newHistory = CHECKPOINTS.slice(0, idx).map(c => c.id);
    setHistory(newHistory);
    setCurrentNodeId(checkpointId);
  };

  // Cargar checkpoints visitados, último nodo e historial al montar (evita SSR mismatch)
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedCheckpoints = localStorage.getItem('antipatron_visited_checkpoints');
      if (savedCheckpoints) {
        try {
          const parsed = JSON.parse(savedCheckpoints);
          if (Array.isArray(parsed) && parsed.length > 0) {
            setVisitedCheckpoints(parsed);
          }
        } catch (e) {
          console.error("Error al parsear checkpoints guardados:", e);
        }
      }

      const searchParams = new URLSearchParams(window.location.search);
      const nodeParam = searchParams.get('node');
      if (!nodeParam) {
        const savedNode = localStorage.getItem('antipatron_last_node');
        const savedHistory = localStorage.getItem('antipatron_narrative_history');
        if (savedNode && NARRATIVE_NODES[savedNode]) {
          setCurrentNodeId(savedNode);
        }
        if (savedHistory) {
          try {
            const parsedHist = JSON.parse(savedHistory);
            if (Array.isArray(parsedHist)) {
              setHistory(parsedHist);
            }
          } catch (e) {
            console.error("Error al parsear historial guardado:", e);
          }
        }
      }
    }
  }, []);

  // Persistir el último nodo visitado, historial y desbloquear nuevos checkpoints
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

      // Desbloquear si el nuevo nodo es un checkpoint
      const isCheckpoint = CHECKPOINTS.some(c => c.id === currentNodeId);
      if (isCheckpoint && !visitedCheckpoints.includes(currentNodeId)) {
        const updated = [...visitedCheckpoints, currentNodeId];
        setVisitedCheckpoints(updated);
        localStorage.setItem('antipatron_visited_checkpoints', JSON.stringify(updated));
      }
    }
  }, [currentNodeId, history, visitedCheckpoints]);
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
    if (nextId === 'post-test-intro') {
      router.push('/marking/post-intro');
      return;
    }
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
  const handleChoiceClick = (choice: { text: string; nextNodeId: string; isCorrect: boolean; id: string }) => {
    logInteraction(choice.id, choice.isCorrect, { text: choice.text });
    advanceNode(choice.nextNodeId);
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
      />
    );
  }

  return (
    <div className="flex flex-col h-screen w-full bg-game-bg text-game-text p-4 md:p-6 overflow-hidden items-center justify-center font-sans">
      
      {/* Contenedor adaptado a la Consistencia de Escenas (Layout Sándwich sin footer) */}
      <div className="flex flex-col h-full max-w-lg w-full mx-auto justify-between py-2 md:py-4 relative">

        {/* 1. HEADER (shrink-0) - Botón Atrás y Selector de Escenas */}
        <header className="flex justify-between items-center shrink-0 pb-3 border-b border-zinc-900/60 gap-4 flex-wrap">
          <button
            onClick={handleBack}
            className="text-[9px] border border-zinc-800 text-game-muted hover:border-zinc-500 hover:text-game-accent transition-all px-3 py-1 font-bold uppercase tracking-wider rounded-sm active:scale-95 cursor-pointer"
          >
            Atrás
          </button>

          {/* Selector de Escenas (similar al Likert) */}
          <div className="flex flex-wrap gap-1 items-center justify-end">
            <span className="text-[7.5px] text-zinc-500 uppercase tracking-widest font-mono mr-1 hidden sm:inline">
              Escenas:
            </span>
            {CHECKPOINTS.map((checkpoint, idx) => {
              // Especial caso de coincidencia para hacer que el botón se vea activo si estamos en un subnodo
              const isActuallyCurrent = currentNodeId.startsWith(checkpoint.id.replace('_init', '').replace('_1', '')) || currentNodeId === checkpoint.id;
              const isVisited = visitedCheckpoints.includes(checkpoint.id);
              
              return (
                <button
                  key={checkpoint.id}
                  disabled={!isVisited}
                  onClick={() => isVisited && jumpToCheckpoint(checkpoint.id, idx)}
                  title={checkpoint.name + (isVisited ? ' (Desbloqueado)' : ' (Bloqueado)')}
                  className={`w-4 h-4 text-[7px] font-black flex items-center justify-center transition-all border rounded-sm select-none ${
                    isActuallyCurrent 
                      ? 'bg-game-accent border-game-accent text-game-bg scale-105 shadow-[0_0_8px_rgba(6,182,212,0.4)] z-10 font-bold' 
                      : isVisited 
                        ? 'bg-game-muted/20 border-zinc-800 text-zinc-300 hover:bg-game-accent/25 hover:border-game-accent/50 hover:text-game-accent cursor-pointer' 
                        : 'bg-zinc-950/80 border-zinc-900/40 text-zinc-800 cursor-not-allowed'
                  }`}
                >
                  {checkpoint.label.replace('E', '')}
                </button>
              );
            })}
          </div>
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
