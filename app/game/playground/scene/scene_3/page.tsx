'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import Scene2Encounter from '../../components/scene_2_encounter';
import Scene3Questioning from '../../components/scene_3_questioning';
import SleepingPenguinLying from '../../components/sleeping_penguin_lying';
import { NARRATIVE_NODES } from '../../../narrative/data';

const stepsEasing = (t: number) => Math.floor(t * 4) / 4;

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

// Clean static SVG code for clipboard export (no animations, standard SVG tags)
function getVariantStaticSvg(variantId: number, isScene3: boolean): string {
  const transformMatrix = 'matrix(1, 0, 0, 1, 143.042971, 46.495595)';

  const baseStart = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 120" width="200px" height="120px">
  <rect width="200" height="120" fill="#000000" />
  <!-- Pinguino (Mirando a la derecha - rotado 90 grados alrededor de su cuerpo) -->
  <g id="pinguino-contenedor" transform="translate(99.601913, 50.428756) rotate(90, -47.91, 37.303)">
    <path id="pata-superior" d="M -32.417 31.796 L -25.744 26.644 L -25.774 33.746 L -32.417 31.796 Z" fill="#f59e0b"></path>
    <ellipse id="cuerpo" cx="-47.91" cy="37.303" rx="20" ry="14" fill="#18181b"></ellipse>
    <ellipse id="vientre" cx="-49.91" cy="31.303" rx="14" ry="8" fill="#f4f4f5"></ellipse>
    <circle id="cabeza" cx="-67.91" cy="33.303" r="10" fill="#18181b"></circle>
    <g id="bufanda" transform="matrix(1, 0, 0, 1, -51.910336, 17.303471)">
      <path id="bufanda-cuello" d="M -14.315 26.443 C -12.315 20.443 -3.738 18.577 -6.624 13.624" stroke="#ef4444" stroke-width="2.2" fill="none" stroke-linecap="round"></path>
      <path id="bufanda-caida-roja" d="M -7.663 13.49 C -2.663 12.49 3 11 7 9 C 5 7 0.204 10.408 -6.796 12.408 L -7.663 13.49 Z" fill="#ef4444"></path>
      <path id="bufanda-caida-guinda" d="M -6.929 14.898 C -1.929 14.898 2 14 5 13 C 3 11 -0.337 13.357 -7.337 13.357 L -6.929 14.898 Z" fill="#b91c1c"></path>
    </g>
    <g id="ojo">
      <circle id="ojo-borde" cx="-67.91" cy="33.303" r="2.2" fill="#f4f4f5"></circle>
      <circle id="ojo-pupila" cx="-68.454" cy="32.397" r="1.019" fill="#000000"></circle>
    </g>
    <polygon id="pico" points="-70.91 26.303 -67.91 19.303 -64.91 26.303" fill="#f59e0b"></polygon>
    <g id="patas" transform="matrix(1, 0, 0, 1, -51.910336, 17.303471)">
      <path id="pata-inferior" d="M 26.663 20.735 L 26.851 27.446 L 19.486 24.256 L 26.663 20.735 Z" fill="#f59e0b"></path>
    </g>
    <path id="aleta" d="M -56.369 37.201 C -57.631 41.252 -39.926 36.511 -37.926 32.511" stroke-width="2.5" stroke-linecap="round" stroke="rgb(0, 0, 0)" fill="none"></path>
  </g>
  <!-- Ojo Subconsciente (Variante ${variantId}) -->
  <g transform="${transformMatrix}">`;

  const eyeVariant = (id: number) => {
    switch (id) {
      case 2: // Pupila Felina
        return `
    <circle id="ojo-glow" cx="1.961" cy="-10.68" r="18" fill="#ffffff" opacity="0.08" transform="matrix(1.726517, 0, 0, 1.260335, 10.344875, -0.379963)"></circle>
    <circle id="ojo-esclera" cx="3.705" cy="-5.231" r="10.733" fill="#f8fafc" stroke-width="0.5" stroke="#e2e8f0" style="transform-box: fill-box; transform-origin: 50% 50%;" transform="matrix(1.4985, -0.537148, 0.642825, 1.013572, 3.086092, -7.914055)"></circle>
    <path id="ojo-trazo-luz" style="fill: none; stroke: rgb(255, 255, 255);" d="M -17.728 -18.374 C -19.172 -20.359 42.448 -40.704 45.523 -36.475 C 48.876 -32.004 13.029 7.732 11.259 5.372"></path>
    <ellipse id="ojo-pupila-centro" cx="-2.127" cy="-10.461" rx="1.6" ry="6.2" fill="#0f172a"></ellipse>
    <circle id="ojo-pupila-brillo" cx="-4.8" cy="-1.8" r="1.5" fill="#ffffff" transform="matrix(-1.397505, 0, 0, 1.944474, -10.963154, -5.601462)"></circle>`;
      case 3: // Doble Trazo
        return `
    <circle id="ojo-glow" cx="1.961" cy="-10.68" r="18" fill="#ffffff" opacity="0.08" transform="matrix(1.726517, 0, 0, 1.260335, 10.344875, -0.379963)"></circle>
    <circle id="ojo-esclera" cx="3.705" cy="-5.231" r="10.733" fill="#f8fafc" stroke-width="0.5" stroke="#e2e8f0" style="transform-box: fill-box; transform-origin: 50% 50%;" transform="matrix(1.4985, -0.537148, 0.642825, 1.013572, 3.086092, -7.914055)"></circle>
    <path id="ojo-trazo-luz-1" style="fill: none; stroke: rgb(255, 255, 255);" d="M -17.728 -18.374 C -19.172 -20.359 42.448 -40.704 45.523 -36.475 C 48.876 -32.004 13.029 7.732 11.259 5.372"></path>
    <path id="ojo-trazo-luz-2" style="fill: none; stroke: rgba(255, 255, 255, 0.5);" d="M -13.728 -14.374 C -15.172 -16.359 46.448 -36.704 41.523 -32.475 C 44.876 -28.004 9.029 11.732 7.259 9.372"></path>
    <circle id="ojo-pupila-centro" cx="-2.127" cy="-10.461" r="6.2" fill="#0f172a"></circle>
    <circle id="ojo-pupila-brillo" cx="-4.8" cy="-1.8" r="1.5" fill="#ffffff" transform="matrix(-1.397505, 0, 0, 1.944474, -10.963154, -5.601462)"></circle>`;
      case 4: // Órbita Interna
        return `
    <circle id="ojo-glow" cx="1.961" cy="-10.68" r="18" fill="#ffffff" opacity="0.08" transform="matrix(1.726517, 0, 0, 1.260335, 10.344875, -0.379963)"></circle>
    <circle id="ojo-esclera" cx="3.705" cy="-5.231" r="10.733" fill="#f8fafc" stroke-width="0.5" stroke="#e2e8f0" style="transform-box: fill-box; transform-origin: 50% 50%;" transform="matrix(1.4985, -0.537148, 0.642825, 1.013572, 3.086092, -7.914055)"></circle>
    <circle id="ojo-anillo-concentrico" cx="3.705" cy="-5.231" r="8" fill="none" stroke="#e2e8f0" stroke-width="0.5" stroke-dasharray="3 2" transform="matrix(1.4985, -0.537148, 0.642825, 1.013572, 3.086092, -7.914055)"></circle>
    <path id="ojo-trazo-luz" style="fill: none; stroke: rgb(255, 255, 255);" d="M -17.728 -18.374 C -19.172 -20.359 42.448 -40.704 45.523 -36.475 C 48.876 -32.004 13.029 7.732 11.259 5.372"></path>
    <circle id="ojo-pupila-centro" cx="-2.127" cy="-10.461" r="6.2" fill="#0f172a"></circle>
    <circle id="ojo-pupila-brillo" cx="-4.8" cy="-1.8" r="1.5" fill="#ffffff" transform="matrix(-1.397505, 0, 0, 1.944474, -10.963154, -5.601462)"></circle>`;
      case 5: // Destellos
        return `
    <circle id="ojo-glow" cx="1.961" cy="-10.68" r="18" fill="#ffffff" opacity="0.08" transform="matrix(1.726517, 0, 0, 1.260335, 10.344875, -0.379963)"></circle>
    <circle id="ojo-esclera" cx="3.705" cy="-5.231" r="10.733" fill="#f8fafc" stroke-width="0.5" stroke="#e2e8f0" style="transform-box: fill-box; transform-origin: 50% 50%;" transform="matrix(1.4985, -0.537148, 0.642825, 1.013572, 3.086092, -7.914055)"></circle>
    <path id="ojo-trazo-luz" style="fill: none; stroke: rgb(255, 255, 255);" d="M -17.728 -18.374 C -19.172 -20.359 42.448 -40.704 45.523 -36.475 C 48.876 -32.004 13.029 7.732 11.259 5.372"></path>
    <path id="ojo-estrella-1" d="M -15 -25 L -13 -25 M -14 -26 L -14 -24" stroke="#ffffff" stroke-width="0.8"></path>
    <path id="ojo-estrella-2" d="M 32 -33 L 34 -33 M 33 -34 L 33 -32" stroke="#ffffff" stroke-width="0.8"></path>
    <circle id="ojo-pupila-centro" cx="-2.127" cy="-10.461" r="6.2" fill="#0f172a"></circle>
    <circle id="ojo-pupila-brillo" cx="-4.8" cy="-1.8" r="1.5" fill="#ffffff" transform="matrix(-1.397505, 0, 0, 1.944474, -10.963154, -5.601462)"></circle>`;
      case 6: // Párpado Sesgado
        return `
    <circle id="ojo-glow" cx="1.961" cy="-10.68" r="18" fill="#ffffff" opacity="0.08" transform="matrix(1.726517, 0, 0, 1.260335, 10.344875, -0.379963)"></circle>
    <circle id="ojo-esclera" cx="3.705" cy="-5.231" r="10.733" fill="#f8fafc" stroke-width="0.5" stroke="#e2e8f0" style="transform-box: fill-box; transform-origin: 50% 50%;" transform="matrix(1.4985, -0.537148, 0.642825, 1.013572, 3.086092, -7.914055)"></circle>
    <path id="ojo-trazo-luz" style="fill: none; stroke: rgb(255, 255, 255);" d="M -17.728 -18.374 C -19.172 -20.359 42.448 -40.704 45.523 -36.475 C 48.876 -32.004 13.029 7.732 11.259 5.372"></path>
    <path id="ojo-parpado-superior" d="M -15 -14 C 0 -22 25 -22 36 -14" fill="none" stroke="#e2e8f0" stroke-width="1.2" stroke-linecap="round"></path>
    <path id="ojo-parpado-inferior" d="M -15 -14 C 0 -4 25 -4 36 -14" fill="none" stroke="#e2e8f0" stroke-width="1.2" stroke-linecap="round"></path>
    <circle id="ojo-pupila-centro" cx="-2.127" cy="-10.461" r="6.2" fill="#0f172a"></circle>
    <circle id="ojo-pupila-brillo" cx="-4.8" cy="-1.8" r="1.5" fill="#ffffff" transform="matrix(-1.397505, 0, 0, 1.944474, -10.963154, -5.601462)"></circle>`;
      case 7: // Glitch Pixel
        return `
    <circle id="ojo-glow" cx="1.961" cy="-10.68" r="18" fill="#ffffff" opacity="0.08" transform="matrix(1.726517, 0, 0, 1.260335, 10.344875, -0.379963)"></circle>
    <path id="ojo-esclera" d="M -10 -15 L -6 -15 L -6 -17 L 6 -17 L 6 -15 L 10 -15 L 10 -11 L 14 -11 L 14 -5 L 16 -5 L 16 5 L 14 5 L 14 11 L 10 11 L 10 15 L 6 15 L 6 17 L -6 17 L -6 15 L -10 15 L -10 11 L -14 11 L -14 5 L -16 5 L -16 -5 L -14 -5 L -14 -11 L -10 -11 Z" fill="#f8fafc" stroke-width="0.8" stroke="#cbd5e1"></path>
    <path id="ojo-trazo-luz" d="M -16 -18 H -12 V -20 H 12 V -20 H 16" fill="none" stroke="#ffffff" stroke-width="1.5"></path>
    <rect id="ojo-pupila-centro" x="-5" y="-13" width="7" height="7" fill="#0f172a"></rect>
    <rect id="ojo-pupila-brillo" x="-4" y="-12" width="2" height="2" fill="#ffffff"></rect>`;
      case 8: // Celestial Halo
        return `
    <circle id="ojo-glow" cx="1.961" cy="-10.68" r="18" fill="#ffffff" opacity="0.08" transform="matrix(1.726517, 0, 0, 1.260335, 10.344875, -0.379963)"></circle>
    <circle id="ojo-esclera" cx="3.705" cy="-5.231" r="10.733" fill="#f8fafc" stroke-width="0.5" stroke="#e2e8f0" style="transform-box: fill-box; transform-origin: 50% 50%;" transform="matrix(1.4985, -0.537148, 0.642825, 1.013572, 3.086092, -7.914055)"></circle>
    <path id="ojo-trazo-luz" style="fill: none; stroke: rgb(255, 255, 255);" d="M -17.728 -18.374 C -19.172 -20.359 42.448 -40.704 45.523 -36.475 C 48.876 -32.004 13.029 7.732 11.259 5.372"></path>
    <ellipse id="ojo-anillo-celestial-1" cx="3.705" cy="-5.231" rx="20" ry="6" fill="none" stroke="#ffffff" stroke-width="0.6" transform="matrix(1.4985, -0.537148, 0.642825, 1.013572, 3.086092, -7.914055) rotate(35)"></ellipse>
    <ellipse id="ojo-anillo-celestial-2" cx="3.705" cy="-5.231" rx="20" ry="6" fill="none" stroke="#ffffff" stroke-width="0.6" transform="matrix(1.4985, -0.537148, 0.642825, 1.013572, 3.086092, -7.914055) rotate(-35)"></ellipse>
    <circle id="ojo-pupila-centro" cx="-2.127" cy="-10.461" r="6.2" fill="#0f172a"></circle>
    <circle id="ojo-pupila-brillo" cx="-4.8" cy="-1.8" r="1.5" fill="#ffffff" transform="matrix(-1.397505, 0, 0, 1.944474, -10.963154, -5.601462)"></circle>`;
      default: // Ojo Editado (Original)
        return `
    <circle id="ojo-glow" cx="1.961" cy="-10.68" r="18" fill="#ffffff" opacity="0.08" transform="matrix(1.726517, 0, 0, 1.260335, 10.344875, -0.379963)"></circle>
    <circle id="ojo-esclera" cx="3.705" cy="-5.231" r="10.733" fill="#f8fafc" stroke-width="0.5" stroke="#e2e8f0" style="transform-box: fill-box; transform-origin: 50% 50%;" transform="matrix(1.4985, -0.537148, 0.642825, 1.013572, 3.086092, -7.914055)"></circle>
    <path id="ojo-trazo-luz" style="fill: none; stroke: rgb(255, 255, 255);" d="M -17.728 -18.374 C -19.172 -20.359 42.448 -40.704 45.523 -36.475 C 48.876 -32.004 13.029 7.732 11.259 5.372"></path>
    <circle id="ojo-pupila-centro" cx="-2.127" cy="-10.461" r="6.2" fill="#0f172a"></circle>
    <circle id="ojo-pupila-brillo" cx="-4.8" cy="-1.8" r="1.5" fill="#ffffff" transform="matrix(-1.397505, 0, 0, 1.944474, -10.963154, -5.601462)"></circle>`;
    }
  };

  const baseEnd = isScene3 ? `
    <!-- Signos de Pregunta Estáticos -->
    <text x="54" y="58" fill="#cbd5e1" font-size="6" font-weight="bold" font-family="monospace">?</text>
    <text x="58" y="55" fill="#94a3b8" font-size="8" font-weight="bold" font-family="monospace">?</text>
  </g>
</svg>` : `\n  </g>\n</svg>`;

  return `${baseStart}${eyeVariant(variantId)}${baseEnd}`;
}

function renderChoiceText(text: string) {
  return text;
}

export default function Scene3PlaygroundPage() {
  const router = useRouter();
  const [selectedVariant, setSelectedVariant] = useState(1);
  const [activeTab, setActiveTab] = useState<'preview' | 'flow'>('preview');
  
  // Simulator State
  const [currentNodeId, setCurrentNodeId] = useState('scene_1_init');
  const [visibleCharCount, setVisibleCharCount] = useState(0);
  const [isTyping, setIsTyping] = useState(false);
  const [history, setHistory] = useState<string[]>([]);
  
  const typingTimer = useRef<NodeJS.Timeout | null>(null);
  const currentNode = NARRATIVE_NODES[currentNodeId] || NARRATIVE_NODES['scene_1_init'];

  const [status, setStatus] = useState<{ type: 'idle' | 'success' | 'error'; message: string }>({
    type: 'idle',
    message: ''
  });

  const VARIANTS = [
    { id: 1, name: 'v1: Ojo Editado' },
    { id: 2, name: 'v2: Pupila Felina' },
    { id: 3, name: 'v3: Doble Trazo' },
    { id: 4, name: 'v4: Órbita Interna' },
    { id: 5, name: 'v5: Destellos' },
    { id: 6, name: 'v6: Párpado Sesgado' },
    { id: 7, name: 'v7: Glitch Pixel' },
    { id: 8, name: 'v8: Celestial Halo' }
  ];

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
    }, 30);
  }, []);

  useEffect(() => {
    if (activeTab === 'flow') {
      startTyping(currentNode.text);
    }
    return () => {
      if (typingTimer.current) clearInterval(typingTimer.current);
    };
  }, [currentNodeId, activeTab, currentNode.text, startTyping]);

  const advanceNode = (nextId: string) => {
    if (NARRATIVE_NODES[nextId]) {
      setHistory(prev => [...prev, currentNodeId]);
      setCurrentNodeId(nextId);
    }
  };

  const handleBack = () => {
    if (history.length > 0) {
      const prevHistory = [...history];
      const prevNodeId = prevHistory.pop()!;
      setHistory(prevHistory);
      setCurrentNodeId(prevNodeId);
    }
  };

  const handleResetFlow = () => {
    setHistory([]);
    setCurrentNodeId('scene_1_init');
  };

  const handleBoxClick = () => {
    if (isTyping) {
      if (typingTimer.current) clearInterval(typingTimer.current);
      const tokens = parseDialogueText(currentNode.text);
      const totalLength = tokens.reduce((sum, token) => sum + token.content.length, 0);
      setVisibleCharCount(totalLength);
      setIsTyping(false);
    } else {
      const hasActionBtn = currentNode.text.includes('#');
      const hasChoices = currentNode.choices && currentNode.choices.length > 0;
      if (!hasActionBtn && !hasChoices && currentNode.next) {
        advanceNode(currentNode.next);
      }
    }
  };

  const handleActionClick = () => {
    if (currentNode.next) {
      advanceNode(currentNode.next);
    }
  };

  const handleChoiceClick = (choice: { nextNodeId: string; explanation: string }) => {
    if (choice.explanation) {
      alert(`Popup Explicativo:\n\n${choice.explanation}`);
      advanceNode(choice.nextNodeId);
    } else {
      advanceNode(choice.nextNodeId);
    }
  };

  const handleCopyVariant = async (id: number) => {
    const code = getVariantStaticSvg(id, true); // true for Scene 3 (with static ?? overlay)
    try {
      await navigator.clipboard.writeText(code);
      setSelectedVariant(id);
      setStatus({ type: 'success', message: `Copiado v${id} (Escena 3 con ??)` });
      setTimeout(() => setStatus({ type: 'idle', message: '' }), 1500);
    } catch (err) {
      setStatus({ type: 'error', message: 'No se pudo copiar.' });
    }
  };

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
            className="font-bold mx-1 select-none font-mono"
          >
            {chars.map((char, charIdx) => (
              <motion.span 
                key={charIdx} 
                style={{ display: 'inline-block', whiteSpace: 'pre' }}
                animate={{ y: [0, -2, 0] }}
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
              e.stopPropagation();
              handleActionClick();
            }}
            className="inline-block bg-emerald-500 text-zinc-950 font-extrabold px-2 py-0.5 mx-1 uppercase tracking-widest text-[9px] rounded hover:bg-white transition-all cursor-pointer active:scale-95 border border-emerald-500 select-none animate-pulse leading-none align-middle font-mono"
          >
            {visibleContent}
          </button>
        );
      } else {
        return <span key={index}>{visibleContent}</span>;
      }
    });
  };

  const renderSimulatorIllustration = () => {
    if (currentNodeId === 'scene_1_init') {
      return <SleepingPenguinLying />;
    }

    if (currentNodeId === 'scene_2_start') {
      return <Scene2Encounter variantId={selectedVariant} />;
    }

    if (currentNodeId.startsWith('scene_2_ans') || currentNodeId === 'scene_2_join') {
      return <Scene3Questioning variantId={selectedVariant} />;
    }

    if (currentNodeId === 'scene_3_start') {
      return (
        <svg viewBox="0 0 200 120" className="w-full h-full">
          <defs>
            <radialGradient id="portal-light-mock" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#10b981" stopOpacity="0.7" />
              <stop offset="30%" stopColor="#064e3b" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#000000" stopOpacity="0.9" />
            </radialGradient>
          </defs>
          <rect width="200" height="120" fill="#000000" />
          <motion.circle 
            animate={{ 
              r: [25, 35, 25],
              opacity: [0.6, 0.8, 0.6] 
            }}
            transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
            cx="100" 
            cy="50" 
            r="30" 
            fill="url(#portal-light-mock)" 
          />
          <line x1="100" y1="50" x2="20" y2="120" stroke="#065f46" strokeWidth="0.25" opacity="0.3" />
          <line x1="100" y1="50" x2="60" y2="120" stroke="#065f46" strokeWidth="0.25" opacity="0.3" />
          <line x1="100" y1="50" x2="140" y2="120" stroke="#065f46" strokeWidth="0.25" opacity="0.3" />
          <line x1="100" y1="50" x2="180" y2="120" stroke="#065f46" strokeWidth="0.25" opacity="0.3" />
          <line x1="0" y1="95" x2="200" y2="95" stroke="#065f46" strokeWidth="0.5" opacity="0.4" />
          <g transform="translate(88, 70) scale(0.7)">
            <ellipse cx="0" cy="30" rx="9" ry="1.5" fill="black" opacity="0.4" />
            <ellipse cx="0" cy="10" rx="10" ry="17" fill="#18181b" />
            <path d="M-11,8 C-13,11 -12,18 -10,20" stroke="#18181b" strokeWidth="2" strokeLinecap="round" fill="none" />
            <path d="M11,8 C13,11 12,18 10,20" stroke="#18181b" strokeWidth="2" strokeLinecap="round" fill="none" />
            <circle cx="0" cy="-10" r="8" fill="#18181b" />
          </g>
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
    return <svg viewBox="0 0 200 120" className="w-full h-full"><rect width="200" height="120" fill="#18181b" /></svg>;
  };

  const hasChoices = currentNode.choices && currentNode.choices.length > 0;

  return (
    <div className="h-screen w-screen bg-[#050508] text-zinc-200 flex flex-col p-4 md:p-6 font-sans overflow-hidden">
      
      {/* Top Header */}
      <header className="flex justify-between items-center shrink-0 border-b border-zinc-900 pb-3 mb-4">
        <div>
          <h1 className="text-xs font-mono uppercase tracking-wider text-emerald-400 font-bold flex items-center gap-2">
            Playground — Escena 3 (El Diálogo / La Pregunta)
            <span className="text-[9px] bg-emerald-950 border border-emerald-800 text-emerald-300 px-1.5 py-0.25 rounded font-mono font-normal">
              Variante v{selectedVariant} Seleccionada
            </span>
          </h1>
          <p className="text-[9px] text-zinc-500 uppercase tracking-widest">
            Pingüino Parado Estático • Signos ?? animados flotando sobre su cabeza (Asset: 200 x 120)
          </p>
        </div>
        <div className="flex items-center space-x-3">
          {status.message && (
            <span className="text-[9px] font-mono px-2 py-0.5 rounded border bg-emerald-950/20 border-emerald-900/40 text-emerald-400">
              {status.message}
            </span>
          )}
          <button
            onClick={() => router.push('/game/playground')}
            className="text-[9px] font-mono border border-zinc-800 px-2.5 py-1 text-zinc-400 hover:text-emerald-400 hover:border-emerald-500/50 transition rounded cursor-pointer active:scale-95"
          >
            Menú de Escenas
          </button>
          <button
            onClick={() => router.push('/game/narrative')}
            className="text-[9px] font-mono border border-zinc-800 px-2.5 py-1 text-zinc-400 hover:text-emerald-400 hover:border-emerald-500/50 transition rounded cursor-pointer active:scale-95"
          >
            Volver al Juego
          </button>
        </div>
      </header>

      {/* Symmetrical Two-Box Split Layout */}
      <div className="flex-1 flex flex-col md:flex-row gap-6 items-stretch justify-center min-h-0 w-full max-w-7xl mx-auto pb-2">
        
        {/* 1. LEFT BOX: The Scene Canvas or Visual Novel Flow Simulator */}
        <div className="flex-1 md:w-1/2 bg-zinc-950/40 border border-zinc-900 rounded p-4 flex flex-col justify-between min-h-0 shadow-xl">
          <div className="border-b border-zinc-900/60 pb-2 flex justify-between items-center shrink-0">
            {/* View Mode Tabs */}
            <div className="flex border border-zinc-850 bg-zinc-950/80 rounded p-0.5">
              <button
                onClick={() => setActiveTab('preview')}
                className={`px-3 py-1 text-[9px] font-mono uppercase tracking-wider rounded transition cursor-pointer select-none ${
                  activeTab === 'preview' 
                    ? 'bg-emerald-500 text-zinc-950 font-bold' 
                    : 'text-zinc-500 hover:text-zinc-300'
                }`}
              >
                Vista Previa Asset 3
              </button>
              <button
                onClick={() => {
                  setActiveTab('flow');
                  handleResetFlow();
                }}
                className={`px-3 py-1 text-[9px] font-mono uppercase tracking-wider rounded transition cursor-pointer select-none ${
                  activeTab === 'flow' 
                    ? 'bg-emerald-500 text-zinc-950 font-bold' 
                    : 'text-zinc-500 hover:text-zinc-300'
                }`}
              >
                Simulador del Flujo
              </button>
            </div>
            
            {activeTab === 'flow' && (
              <div className="flex items-center space-x-2 shrink-0">
                <button
                  onClick={handleBack}
                  disabled={history.length === 0}
                  className="px-2 py-0.75 text-[8px] font-mono uppercase rounded border border-zinc-800 text-zinc-500 hover:text-zinc-300 disabled:opacity-40 disabled:hover:text-zinc-500 cursor-pointer"
                >
                  Atrás
                </button>
                <button
                  onClick={handleResetFlow}
                  className="px-2 py-0.75 text-[8px] font-mono uppercase rounded border border-zinc-800 text-zinc-400 hover:text-emerald-400 hover:border-emerald-500/30 cursor-pointer"
                >
                  Reiniciar
                </button>
              </div>
            )}
          </div>

          {activeTab === 'preview' ? (
            /* ASSET PREVIEW MODE */
            <>
              <div className="flex-1 flex items-center justify-center py-4 min-h-0 overflow-hidden">
                <div className="relative w-full aspect-video rounded border border-zinc-900/60 overflow-hidden bg-black shadow-2xl">
                  <Scene3Questioning variantId={selectedVariant} />
                </div>
              </div>

              <div className="h-6 flex items-center justify-between border-t border-zinc-900/60 pt-2 shrink-0">
                <span className="text-[8px] font-mono text-zinc-500 uppercase tracking-widest">
                  Canvas: 200 x 120 • Variante v{selectedVariant}
                </span>
                <span className="text-[8px] font-mono text-zinc-600">
                  Negro absoluto • Sin suelo • Signos ?? flotando
                </span>
              </div>
            </>
          ) : (
            /* NARRATIVE FLOW SIMULATOR MODE */
            <div className="flex-1 flex flex-col justify-between min-h-0 pt-4 pb-2 space-y-4">
              <div className="relative w-full aspect-video flex items-center justify-center shrink-0 border border-zinc-900/60 rounded-md overflow-hidden bg-black shadow-2xl">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentNodeId}
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.98 }}
                    transition={{ duration: 0.3 }}
                    className="w-full h-full"
                  >
                    {renderSimulatorIllustration()}
                  </motion.div>
                </AnimatePresence>
              </div>

              <div className="flex-1 min-h-0 flex flex-col justify-end space-y-1">
                {currentNode.speakerLabel && (
                  <span className="text-[9px] font-bold uppercase tracking-widest text-emerald-400 italic pl-1 block shrink-0">
                    {currentNode.speakerLabel} (Nodo: {currentNode.id})
                  </span>
                )}
                
                <div 
                  onClick={handleBoxClick}
                  className="h-[120px] w-full bg-zinc-950/60 border border-zinc-900 p-4 rounded flex flex-col justify-start relative select-none overflow-y-auto custom-scrollbar cursor-pointer hover:border-zinc-800 hover:bg-zinc-950/80"
                >
                  <div className={`${currentNode.speaker === 'subconscious' ? 'text-zinc-200' : 'text-zinc-400'} text-xs leading-relaxed tracking-wide font-medium italic pr-4 font-mono`}>
                    {renderDialogue(parseDialogueText(currentNode.text), visibleCharCount)}

                    {!isTyping && hasChoices && currentNode.choices && (
                      <div className="mt-3 pt-2 border-t border-zinc-900 flex flex-col space-y-1.5">
                        {currentNode.choices.map((choice) => (
                          <button
                            key={choice.id}
                            onClick={(e) => {
                              e.stopPropagation();
                              handleChoiceClick(choice);
                            }}
                            className="w-full text-left py-1.5 px-3 border border-zinc-900 bg-zinc-950/50 hover:border-red-500/40 hover:bg-red-950/10 transition-all text-red-400 hover:text-red-300 font-mono text-[9px] uppercase tracking-widest cursor-pointer rounded flex items-center space-x-2 active:scale-[0.99] select-none group"
                          >
                            <span className="text-white/40 group-hover:text-white/80 transition-colors font-bold select-none">&gt;</span>
                            <span className="leading-tight">{renderChoiceText(choice.text)}</span>
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                  
                  {!isTyping && !hasChoices && !currentNode.text.includes('#') && currentNode.next && (
                    <motion.div 
                      animate={{ x: [0, 4, 0] }}
                      transition={{ repeat: Infinity, duration: 1.5 }}
                      className="absolute bottom-2.5 right-3 text-emerald-400 text-[9px] font-bold pointer-events-none"
                    >
                      ▼
                    </motion.div>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* 2. RIGHT BOX: Grid of 8 variants */}
        <div className="flex-1 md:w-1/2 bg-zinc-950/40 border border-zinc-900 rounded p-4 flex flex-col justify-between min-h-0 shadow-xl">
          <div className="border-b border-zinc-900/60 pb-2 flex justify-between items-center shrink-0">
            <div>
              <h2 className="text-[9px] font-mono uppercase tracking-widest text-zinc-400 font-bold">
                Generaciones del Ojo
              </h2>
            </div>
            <span className="text-[8px] text-zinc-500 uppercase font-mono">
              8 Variantes
            </span>
          </div>

          <div className="flex-1 min-h-0 w-full overflow-y-auto custom-scrollbar py-4">
            <div className="w-full grid grid-cols-2 lg:grid-cols-4 gap-2.5 min-h-0 select-none">
              {VARIANTS.map((v) => {
                const isSelected = selectedVariant === v.id;
                return (
                  <div
                    key={v.id}
                    className={`flex flex-col justify-between bg-[#0b0b0e] border rounded p-2 text-left relative ${
                      isSelected
                        ? 'border-emerald-500/50 bg-emerald-500/5'
                        : 'border-zinc-900'
                    }`}
                  >
                    <div className="flex justify-between items-center w-full mb-1 shrink-0">
                      <span className={`text-[8px] font-mono font-bold px-1.5 py-0.25 rounded ${
                        isSelected ? 'bg-emerald-500/10 text-emerald-400' : 'bg-zinc-900 text-zinc-500'
                      }`}>
                        v{v.id}
                      </span>
                      <span className="text-[7px] font-mono text-zinc-500 text-right truncate max-w-[55px]">
                        {v.name.split(':')[1]?.trim() || v.name}
                      </span>
                    </div>

                    {/* Variant Preview Box */}
                    <div 
                      onClick={() => setSelectedVariant(v.id)}
                      className="aspect-[200/120] w-full bg-black border border-zinc-900/50 rounded flex items-center justify-center p-0.5 overflow-hidden shrink-0 mt-1 cursor-pointer hover:border-zinc-700 transition"
                    >
                      <div className="w-full h-full scale-[0.95]">
                        <Scene3Questioning variantId={v.id} />
                      </div>
                    </div>

                    <button
                      onClick={() => handleCopyVariant(v.id)}
                      className={`w-full text-center py-1 text-[8px] font-mono uppercase font-bold tracking-wider rounded transition mt-2 cursor-pointer shrink-0 active:scale-95 ${
                        isSelected
                          ? 'bg-emerald-500 text-zinc-950 hover:bg-emerald-400'
                          : 'bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-emerald-400 hover:border-emerald-500/30'
                      }`}
                    >
                      Copiar SVG
                    </button>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="h-6 flex items-center border-t border-zinc-900/60 pt-2 shrink-0">
            <p className="text-[8px] font-mono text-zinc-500 uppercase tracking-widest leading-relaxed">
              * Selecciona una variante para usarla en el simulador. Haz clic en "Copiar SVG" para exportarla.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}
