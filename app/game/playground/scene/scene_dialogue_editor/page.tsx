'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { NARRATIVE_NODES, DialogueNode } from '@/app/game/narrative/data';
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
} from '@/app/game/playground/components/dialogue_effects_playground';

// Importación de ilustraciones SVG
import Scene1Sleeping from '@/app/game/narrative/illustrations/scene_1_sleeping';
import Scene2Encounter from '@/app/game/narrative/illustrations/scene_2_encounter';
import Scene3Questioning from '@/app/game/narrative/illustrations/scene_3_questioning';
import Scene4Walking from '@/app/game/narrative/illustrations/scene_4_walking';
import Scene5Approaching from '@/app/game/narrative/illustrations/scene_5_approaching';
import Scene6Glow from '@/app/game/narrative/illustrations/scene_6_glow';
import Scene7Sniper from '@/app/game/narrative/illustrations/scene_7_sniper';
import Scene8DarkPattern from '@/app/game/narrative/illustrations/scene_8_dark_pattern';
import Scene9CelularPagar from '@/app/game/narrative/illustrations/scene_9_celular_pagar';
import Scene10CelularGrande from '@/app/game/narrative/illustrations/scene_10_celular_grande';
import Scene11AletaPagar from '@/app/game/narrative/illustrations/scene_11_aleta_pagar';
import Scene12Iglu from '@/app/game/narrative/illustrations/scene_12_iglu';
import Scene13Anuncios from '@/app/game/narrative/illustrations/scene_13_anuncios';
import Scene14Batalla from '@/app/game/narrative/illustrations/scene_14_batalla';
import Scene14Resultado1 from '@/app/game/narrative/illustrations/scene_14_resultado_1';
import Scene14Resultado2 from '@/app/game/narrative/illustrations/scene_14_resultado_2';
import Scene14Resultado3 from '@/app/game/narrative/illustrations/scene_14_resultado_3';
import ExplicacionPatronAlegre from '@/app/game/narrative/illustrations/explicacion_patron_alegre';
import ExplicacionPatronDerrotado from '@/app/game/narrative/illustrations/explicacion_patron_derrotado';
import Scene15DripPricing from '@/app/game/narrative/illustrations/scene_15_drip_pricing';
import Scene16CelularCheckout from '@/app/game/narrative/illustrations/scene_16_celular_checkout';
import Scene17Batalla from '@/app/game/narrative/illustrations/scene_17_batalla';
import Scene18ReferencePricing from '@/app/game/narrative/illustrations/scene_18_reference_pricing';
import Scene19CelularReference from '@/app/game/narrative/illustrations/scene_19_celular_reference';
import Scene20Batalla from '@/app/game/narrative/illustrations/scene_20_batalla';
import Scene21CamoRevivido from '@/app/game/narrative/illustrations/scene_21_camo_revivido';
import Scene22PatronHostil from '@/app/game/narrative/illustrations/scene_22_patron_hostil';
import Scene23DesenlaceFinal from '@/app/game/narrative/illustrations/scene_23_desenlace_final';

interface TextToken {
  type: 'text' | 'highlight' | 'action' | 'wave' | 'shake' | 'tremble' | 'rainbow' | 'breathe' | 'glitch' | 'neon' | 'sneaky' | 'spooky' | 'heartbeat' | 'link';
  content: string;
  color?: string;
}

function splitTextAndLinks(content: string): TextToken[] {
  const urlRegex = /(https?:\/\/[^\s]+)/gi;
  const parts = content.split(urlRegex);
  const result: TextToken[] = [];
  
  for (const part of parts) {
    if (urlRegex.test(part)) {
      result.push({ type: 'link', content: part });
    } else if (part) {
      result.push({ type: 'text', content: part });
    }
  }
  return result;
}

function parseDialogueText(text: string): TextToken[] {
  const tokens: TextToken[] = [];
  const regex = /<([a-z1-9\-]+)(?:\s+color="([^"]+)")?>([\s\S]*?)<\/\1>|([^<>]+)/gi;
  let match;

  while ((match = regex.exec(text)) !== null) {
    if (match[1]) {
      tokens.push({ 
        type: match[1].toLowerCase() as any, 
        content: match[3],
        color: match[2]
      });
    } else if (match[4]) {
      const subTokens = splitTextAndLinks(match[4]);
      tokens.push(...subTokens);
    }
  }
  return tokens;
}

export default function SceneDialogueEditorPage() {
  const router = useRouter();
  const [nodes, setNodes] = useState<Record<string, DialogueNode>>({});
  const [selectedNodeId, setSelectedNodeId] = useState('scene_1_init');
  const [speakerLabel, setSpeakerLabel] = useState('');
  const [rawText, setRawText] = useState('');
  
  // Controles de Selección
  const [selectedEffect, setSelectedEffect] = useState<'text' | 'highlight' | 'action' | 'wave' | 'shake' | 'tremble' | 'rainbow' | 'breathe' | 'glitch' | 'neon' | 'sneaky' | 'spooky' | 'heartbeat'>('highlight');
  const [customColor, setCustomColor] = useState('#fbbf24');
  const [useColor, setUseColor] = useState(true);
  const [isExporting, setIsExporting] = useState(false);
  const [activeLink, setActiveLink] = useState<string | null>(null);

  // Máquina de Escribir Preview
  const [visibleCharCount, setVisibleCharCount] = useState(9999);
  const [isTyping, setIsTyping] = useState(false);
  const typingTimer = useRef<NodeJS.Timeout | null>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Paleta de Colores
  const colorPresets = [
    { label: 'Cyan', hex: '#22d3ee' },
    { label: 'Lime', hex: '#84cc16' },
    { label: 'Amber', hex: '#fbbf24' },
    { label: 'Rose', hex: '#f43f5e' },
    { label: 'Purple', hex: '#c084fc' },
    { label: 'Red', hex: '#ef4444' },
    { label: 'Camo', hex: '#7ba077' },
    { label: 'Persuadir', hex: '#858799' },
    { label: 'Patrón Borde', hex: '#06b6d4' },
    { label: 'Patrón Cuerpo', hex: '#2a256f' },
    { label: 'P. Inmobiliario', hex: '#80ceff' },
    { label: 'White', hex: '#ffffff' }
  ];

  // Cargar datos
  useEffect(() => {
    const saved = localStorage.getItem('antipatron_playground_dialogues');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setNodes(parsed);
        if (parsed[selectedNodeId]) {
          setSpeakerLabel(parsed[selectedNodeId].speakerLabel || '');
          setRawText(parsed[selectedNodeId].text || '');
        }
      } catch (_) {
        setNodes(NARRATIVE_NODES);
        const node = NARRATIVE_NODES[selectedNodeId];
        if (node) {
          setSpeakerLabel(node.speakerLabel || '');
          setRawText(node.text || '');
        }
      }
    } else {
      setNodes(NARRATIVE_NODES);
      const node = NARRATIVE_NODES[selectedNodeId];
      if (node) {
        setSpeakerLabel(node.speakerLabel || '');
        setRawText(node.text || '');
      }
    }
  }, []);

  // Sincronizar campos cuando se cambia de nodo
  const handleSelectNode = (id: string) => {
    setSelectedNodeId(id);
    const node = nodes[id];
    if (node) {
      setSpeakerLabel(node.speakerLabel || '');
      setRawText(node.text || '');
    }
    // Reiniciar preview
    setVisibleCharCount(9999);
    setIsTyping(false);
    if (typingTimer.current) clearInterval(typingTimer.current);
  };

  // Guardar cambio del nodo actual en memoria
  const handleNodeFieldChange = (textVal: string, speakerVal: string) => {
    setRawText(textVal);
    setSpeakerLabel(speakerVal);

    setNodes(prev => {
      const updated = {
        ...prev,
        [selectedNodeId]: {
          ...prev[selectedNodeId],
          speakerLabel: speakerVal,
          text: textVal
        }
      };

      // Espejos dinámicos para la Escena 3
      if (selectedNodeId === 'scene_3_ans_1_first' || selectedNodeId === 'scene_3_ans_1_second') {
        const mirrorId = selectedNodeId === 'scene_3_ans_1_first' ? 'scene_3_ans_1_second' : 'scene_3_ans_1_first';
        if (updated[mirrorId]) {
          updated[mirrorId] = {
            ...updated[mirrorId],
            speakerLabel: speakerVal,
            text: textVal
          };
        }
      } else if (selectedNodeId === 'scene_3_ans_2_first' || selectedNodeId === 'scene_3_ans_2_second') {
        const mirrorId = selectedNodeId === 'scene_3_ans_2_first' ? 'scene_3_ans_2_second' : 'scene_3_ans_2_first';
        if (updated[mirrorId]) {
          updated[mirrorId] = {
            ...updated[mirrorId],
            speakerLabel: speakerVal,
            text: textVal
          };
        }
      }

      return updated;
    });
  };

  // Guardar permanentemente en LocalStorage
  const handleSaveAll = () => {
    localStorage.setItem('antipatron_playground_dialogues', JSON.stringify(nodes));
    alert("¡Diálogos guardados localmente con éxito!");
  };

  // Exportar a archivo markdown llamando al API
  const handleExportMarkdown = async () => {
    setIsExporting(true);
    try {
      const response = await fetch('/api/playground/save-dialogue-md', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nodes }),
      });
      if (response.ok) {
        alert("¡Éxito! Se ha generado el archivo 'dialogos_editados.md' en la raíz de tu proyecto local con todas tus modificaciones.");
      } else {
        const err = await response.json();
        alert("Error al exportar: " + err.error);
      }
    } catch (e: any) {
      alert("Error de conexión: " + e.message);
    } finally {
      setIsExporting(false);
    }
  };

  // Restablecer valores de fábrica
  const handleResetDefaults = () => {
    if (confirm("¿Estás seguro de que quieres restablecer todos los diálogos a sus valores iniciales del juego? Se perderán tus cambios.")) {
      localStorage.removeItem('antipatron_playground_dialogues');
      setNodes(NARRATIVE_NODES);
      const node = NARRATIVE_NODES[selectedNodeId];
      if (node) {
        setSpeakerLabel(node.speakerLabel || '');
        setRawText(node.text || '');
      }
      alert("Valores restablecidos.");
    }
  };

  // Aplicar formato al texto seleccionado en la caja
  const applyFormatToSelection = () => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = rawText.substring(start, end);

    if (!selectedText) {
      alert("Por favor, selecciona una palabra o frase del diálogo para poder aplicarle el efecto.");
      return;
    }

    let formattedText = '';
    if (selectedEffect === 'text') {
      formattedText = selectedText.replace(/<[^>]+>/g, '');
    } else {
      const colorAttr = useColor ? ` color="${customColor}"` : '';
      formattedText = `<${selectedEffect}${colorAttr}>${selectedText}</${selectedEffect}>`;
    }

    const updatedText = rawText.substring(0, start) + formattedText + rawText.substring(end);
    handleNodeFieldChange(updatedText, speakerLabel);

    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(start, start + formattedText.length);
    }, 50);
  };

  // Iniciar la animación de máquina de escribir para prueba
  const testTypewriter = () => {
    if (typingTimer.current) clearInterval(typingTimer.current);
    setIsTyping(true);
    setVisibleCharCount(0);

    const tokens = parseDialogueText(rawText);
    const totalLength = tokens.reduce((sum, t) => sum + t.content.length, 0);

    let count = 0;
    typingTimer.current = setInterval(() => {
      count++;
      setVisibleCharCount(count);
      if (count >= totalLength) {
        setIsTyping(false);
        clearInterval(typingTimer.current!);
      }
    }, 45);
  };

  // Renderizar la ilustración SVG correspondiente
  const renderIllustrationSVG = (currentNodeId: string) => {
    if (currentNodeId === 'scene_1_init') {
      return <Scene1Sleeping />;
    }
    if (currentNodeId === 'scene_2_start') {
      return <Scene2Encounter variantId={1} />;
    }
    if (currentNodeId.startsWith('scene_3_ans')) {
      return <Scene3Questioning variantId={1} />;
    }
    if (currentNodeId.startsWith('scene_4_walking')) {
      return <Scene4Walking variantId={5} />;
    }
    if (currentNodeId.startsWith('scene_5_dialogue') || currentNodeId === 'scene_5_end') {
      return <Scene5Approaching camoVariantId={5} showHelmet={true} eyeStyle="sleeping" facing="right" />;
    }
    if (currentNodeId.startsWith('scene_6_dialogue')) {
      return <Scene6Glow />;
    }
    if (currentNodeId.startsWith('scene_7')) {
      return <Scene7Sniper />;
    }
    if (currentNodeId.startsWith('scene_8') || currentNodeId === 'scene_8_end') {
      return <Scene8DarkPattern />;
    }
    if (currentNodeId.startsWith('scene_9')) {
      return <Scene9CelularPagar />;
    }
    if (currentNodeId.startsWith('scene_10')) {
      return <Scene10CelularGrande />;
    }
    if (currentNodeId.startsWith('scene_11')) {
      return <Scene11AletaPagar />;
    }
    if (currentNodeId.startsWith('scene_12')) {
      return <Scene12Iglu />;
    }
    if (currentNodeId.startsWith('scene_13')) {
      return <Scene13Anuncios />;
    }
    if (currentNodeId === 'scene_14_init' || currentNodeId === 'scene_14_choice') {
      return <Scene14Batalla />;
    }
    if (currentNodeId === 'scene_14_resultado_1') {
      return <Scene14Resultado1 />;
    }
    if (currentNodeId === 'scene_14_explicacion_1') {
      return <ExplicacionPatronAlegre isCentered={true} />;
    }
    if (currentNodeId === 'scene_14_resultado_2') {
      return <Scene14Resultado2 />;
    }
    if (currentNodeId === 'scene_14_explicacion_2') {
      return <ExplicacionPatronDerrotado isCentered={true} />;
    }
    if (currentNodeId === 'scene_14_resultado_3') {
      return <Scene14Resultado3 />;
    }
    if (currentNodeId === 'scene_14_explicacion_3') {
      return <ExplicacionPatronDerrotado isCentered={true} />;
    }
    if (currentNodeId === 'scene_15_init_1') {
      return <Scene15DripPricing />;
    }
    if (
      currentNodeId === 'scene_15_init_2' ||
      currentNodeId === 'scene_15_init_3' ||
      currentNodeId === 'scene_15_init_4' ||
      currentNodeId === 'scene_15_init_4b'
    ) {
      return <Scene16CelularCheckout />;
    }
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
    if (currentNodeId === 'scene_18_init_1') {
      return <Scene18ReferencePricing />;
    }
    if (
      currentNodeId === 'scene_18_init_2' ||
      currentNodeId === 'scene_18_init_3' ||
      currentNodeId === 'scene_18_init_4' ||
      currentNodeId === 'scene_18_init_4b'
    ) {
      return <Scene19CelularReference />;
    }
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
    if (currentNodeId === 'scene_21_init_1' || currentNodeId === 'scene_21_init_2') {
      return <Scene21CamoRevivido />;
    }
    if (currentNodeId === 'scene_22_init_1' || currentNodeId === 'scene_22_init_2') {
      return <Scene22PatronHostil />;
    }
    if (
      currentNodeId === 'scene_23_init_1' ||
      currentNodeId === 'scene_23_init_2' ||
      currentNodeId === 'scene_23_init_3' ||
      currentNodeId === 'scene_23_end'
    ) {
      return <Scene23DesenlaceFinal />;
    }
    return (
      <svg viewBox="0 0 200 120" className="w-full h-full">
        <rect width="200" height="120" fill="#18181b" />
        <text x="100" y="65" fill="#a1a1aa" fontSize="8" textAnchor="middle" fontFamily="monospace">
          DISEÑO VECTORIAL SVG PENDIENTE
        </text>
      </svg>
    );
  };

  // Renderizar los tokens del preview
  const renderDialogue = (tokens: TextToken[], visibleCount: number) => {
    let charsRemaining = visibleCount;
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
        return <HighlightText key={index} text={token.content} isDarkPatternTheme={false} color={token.color} />;
      } else if (token.type === 'action') {
        if (visibleLength < tokenLength) {
          return <span key={index}>{visibleContent}</span>;
        }
        return (
          <button
            key={index}
            className="inline-block bg-game-accent text-game-bg font-extrabold px-1.5 py-0.5 mx-1 uppercase tracking-widest text-[8px] rounded-sm border border-game-accent select-none animate-pulse align-middle"
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
      } else if (token.type === 'link') {
        if (visibleLength < tokenLength) {
          return <span key={index} className="underline text-cyan-400/90 font-mono text-xs md:text-sm">{visibleContent}</span>;
        }
        return (
          <button
            key={index}
            onClick={(e) => {
              e.stopPropagation(); // Evitamos avanzar el diálogo
              setActiveLink(token.content);
            }}
            className="underline text-cyan-400 hover:text-cyan-300 font-mono cursor-pointer transition-all active:scale-95 inline-block text-left text-xs md:text-sm"
          >
            {token.content}
          </button>
        );
      } else {
        return <span key={index}>{visibleContent}</span>;
      }
    });
  };

  const currentActiveNode = nodes[selectedNodeId];

  return (
    <div className="min-h-screen w-screen bg-[#050508] text-zinc-200 flex flex-col p-4 md:p-8 font-sans overflow-y-auto custom-scrollbar relative">
      
      {/* Glows */}
      <div className="absolute top-0 left-1/4 w-[400px] h-[400px] bg-emerald-500/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-purple-500/5 rounded-full blur-[130px] pointer-events-none" />

      <div className="max-w-6xl w-full mx-auto flex-1 flex flex-col relative z-10">
        
        {/* Header */}
        <header className="flex flex-col md:flex-row justify-between items-start md:items-center border-b border-zinc-900 pb-4 mb-6 gap-4">
          <div className="space-y-1">
            <h1 className="text-xs font-mono uppercase tracking-widest text-emerald-400 font-bold">
              Playground de Texto e Interfaz
            </h1>
            <p className="text-2xl font-bold tracking-tight text-white">
              Editor y Diseñador de Diálogos
            </p>
            <p className="text-xs text-zinc-500">
              Personaliza y formatea los diálogos de toda la Novela Visual aplicando animaciones y colores específicos.
            </p>
          </div>
          
          <button
            onClick={() => router.push('/game/playground')}
            className="px-4 py-2 text-xs font-medium bg-zinc-950 border border-zinc-800 hover:border-zinc-700 text-zinc-400 hover:text-white rounded transition active:scale-95"
          >
            ← Volver al Playground
          </button>
        </header>

        {/* Content Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 flex-1 items-start">
          
          {/* Panel Izquierdo: Editor */}
          <div className="bg-zinc-950/60 border border-zinc-900 p-5 rounded-lg space-y-6">
            <div className="space-y-2">
              <label className="text-[10px] font-mono uppercase tracking-widest text-emerald-400 font-bold">
                1. Selecciona la Escena / Nodo de Diálogo:
              </label>
              <select
                value={selectedNodeId}
                onChange={(e) => handleSelectNode(e.target.value)}
                className="w-full bg-zinc-900 border border-zinc-800 rounded px-3 py-2.5 text-xs text-white focus:outline-none focus:border-emerald-500 font-mono transition"
              >
                {Object.keys(nodes).map((key) => {
                  const n = nodes[key];
                  return (
                    <option key={key} value={key} className="bg-[#0c0c12]">
                      {key} — {n.speakerLabel || n.speaker}
                    </option>
                  );
                })}
              </select>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-mono uppercase tracking-widest text-emerald-400 font-bold">
                2. Nombre del Hablante (Editable):
              </label>
              <input
                type="text"
                value={speakerLabel}
                onChange={(e) => handleNodeFieldChange(rawText, e.target.value)}
                className="w-full bg-zinc-900 border border-zinc-800 rounded px-3 py-2.5 text-xs text-white focus:outline-none focus:border-emerald-500 font-medium transition"
                placeholder="Nombre del personaje..."
              />
            </div>

            <div className="space-y-2 relative">
              <div className="flex justify-between items-center mb-1">
                <label className="text-[10px] font-mono uppercase tracking-widest text-emerald-400 font-bold">
                  3. Texto del Diálogo (Re-escribible):
                </label>
                <span className="text-[8px] font-mono text-zinc-500">
                  Selecciona palabras con el mouse para aplicar efectos
                </span>
              </div>
              <textarea
                ref={textareaRef}
                value={rawText}
                onChange={(e) => handleNodeFieldChange(e.target.value, speakerLabel)}
                rows={5}
                className="w-full bg-zinc-900 border border-zinc-800 rounded p-3 text-xs text-white focus:outline-none focus:border-emerald-500 font-sans leading-relaxed transition resize-y"
                placeholder="Escribe el diálogo de la escena..."
              />
            </div>

            {/* Panel de Formateador de Efectos */}
            <div className="border border-zinc-900 bg-zinc-900/10 p-4 rounded-sm space-y-4">
              <div className="flex justify-between items-center border-b border-zinc-900 pb-2">
                <h3 className="text-[10px] font-mono uppercase tracking-widest text-purple-400 font-bold">
                  Herramientas de Formato
                </h3>
                <label className="flex items-center gap-1.5 text-[10px] text-zinc-400 font-mono cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={useColor}
                    onChange={() => setUseColor(!useColor)}
                    className="rounded border-zinc-800 bg-zinc-900 text-purple-500 focus:ring-0 w-3 h-3 cursor-pointer"
                  />
                  Aplicar Color
                </label>
              </div>

              {/* Selector de Efectos */}
              <div className="space-y-2">
                <label className="text-[9px] font-mono uppercase tracking-widest text-zinc-500">
                  Efecto de Animación:
                </label>
                <div className="grid grid-cols-3 sm:grid-cols-4 gap-1.5">
                  {[
                    { id: 'text', label: 'Sin Efecto' },
                    { id: 'highlight', label: 'Resaltar (Highlight)' },
                    { id: 'action', label: 'Acción (Action)' },
                    { id: 'wave', label: 'Onda (Wave)' },
                    { id: 'shake', label: 'Temblar (Shake)' },
                    { id: 'tremble', label: 'Pánico (Tremble)' },
                    { id: 'rainbow', label: 'Arcoíris (Rainbow)' },
                    { id: 'breathe', label: 'Respirar (Breathe)' },
                    { id: 'glitch', label: 'Glitch (Holo)' },
                    { id: 'neon', label: 'Destello (Sparkle)' },
                    { id: 'sneaky', label: 'Sigilo (Sneaky)' },
                    { id: 'spooky', label: 'Fantasma (Spooky Ghost)' },
                    { id: 'heartbeat', label: 'Latido (Heartbeat)' }
                  ].map((eff) => (
                    <button
                      key={eff.id}
                      onClick={() => setSelectedEffect(eff.id as any)}
                      className={`py-1 px-1.5 text-[9px] font-mono uppercase rounded transition text-center font-bold border ${selectedEffect === eff.id ? 'bg-purple-950/40 border-purple-500/40 text-purple-300' : 'bg-zinc-900 border-zinc-800 text-zinc-500 hover:border-zinc-700 hover:text-zinc-300'}`}
                    >
                      {eff.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Selector de Colores */}
              {useColor && (
                <div className="space-y-2">
                  <label className="text-[9px] font-mono uppercase tracking-widest text-zinc-500 block">
                    Color de Texto:
                  </label>
                  <div className="flex flex-wrap items-center gap-1.5">
                    {colorPresets.map((preset) => (
                      <button
                        key={preset.hex}
                        onClick={() => setCustomColor(preset.hex)}
                        className={`px-2 py-1 text-[9px] font-mono rounded border transition flex items-center gap-1 font-bold ${customColor === preset.hex ? 'bg-zinc-900 border-zinc-700 text-white' : 'bg-zinc-950 border-transparent text-zinc-500 hover:border-zinc-800'}`}
                      >
                        <span className="w-2.5 h-2.5 rounded-full border border-black/30" style={{ backgroundColor: preset.hex }} />
                        {preset.label}
                      </button>
                    ))}
                    <input
                      type="color"
                      value={customColor}
                      onChange={(e) => setCustomColor(e.target.value)}
                      className="w-6 h-6 bg-transparent border-0 cursor-pointer p-0 shrink-0"
                      title="Color Libre"
                    />
                  </div>
                </div>
              )}

              {/* Botón Aplicar */}
              <button
                onClick={applyFormatToSelection}
                className="w-full h-10 bg-purple-600 hover:bg-purple-500 text-white font-bold uppercase tracking-wider text-[10px] rounded transition active:scale-95"
              >
                Aplicar Formato a Selección
              </button>
            </div>

            {/* Acciones del Playground */}
            <div className="flex flex-col sm:flex-row gap-4 border-t border-zinc-900 pt-5">
              <button
                onClick={handleSaveAll}
                className="flex-1 h-12 bg-[#0c0c12] border border-zinc-800 hover:border-zinc-700 text-zinc-300 font-bold uppercase tracking-widest text-xs rounded transition active:scale-95"
              >
                Guardar en LocalStorage
              </button>
              <button
                onClick={handleExportMarkdown}
                disabled={isExporting}
                className="flex-1 h-12 bg-emerald-600 hover:bg-emerald-500 text-game-bg font-bold uppercase tracking-widest text-xs rounded transition active:scale-95 disabled:opacity-50"
              >
                {isExporting ? 'Exportando...' : 'Exportar a Markdown (.md)'}
              </button>
            </div>
            
            <div className="w-full text-center">
              <button
                onClick={handleResetDefaults}
                className="text-[10px] font-mono text-zinc-600 hover:text-red-400 uppercase tracking-widest transition underline"
              >
                Restablecer Todo por Defecto
              </button>
            </div>

          </div>

          {/* Panel Derecho: Live Visual Novel Preview */}
          <div className="space-y-6 lg:sticky lg:top-4">
            <span className="text-[10px] font-mono uppercase tracking-widest text-purple-400 font-bold pl-1 block">
              Vista Previa en Tiempo Real (Estilo Novela Visual):
            </span>

            {/* VN Dialogue Box Simulation */}
            <div className="w-full bg-[#0a0a10] border border-zinc-900 rounded-lg overflow-hidden shadow-2xl relative">
              
              {/* Simulated Illustration screen */}
              <div className="w-full h-[35vh] bg-black relative flex flex-col justify-end select-none overflow-hidden items-center">
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(16,185,129,0.03),transparent_70%)] pointer-events-none" />
                
                {/* SVG RENDERING */}
                <div className="w-full h-full flex items-center justify-center p-2">
                  {renderIllustrationSVG(selectedNodeId)}
                </div>

                <div className="absolute top-4 left-4 font-mono text-[8px] text-zinc-600 uppercase tracking-widest pointer-events-none">
                  Escena: {selectedNodeId}
                </div>
              </div>

              {/* Simulation Dialogue box */}
              <div className="p-5 md:p-6 bg-zinc-950/90 border-t border-zinc-900 flex flex-col min-h-[160px] justify-between relative">
                
                {/* Character Speaker name tab */}
                {speakerLabel && (
                  <div className="absolute -top-3 left-6 px-3 py-0.5 bg-game-bg border border-game-accent text-game-accent text-[9px] font-bold font-mono uppercase tracking-widest shadow-md">
                    {speakerLabel}
                  </div>
                )}

                {/* Dialog Content */}
                <div style={{ whiteSpace: 'pre-wrap' }} className="text-zinc-200 text-sm md:text-base leading-relaxed font-sans mt-2 min-h-[70px] select-none">
                  {renderDialogue(parseDialogueText(rawText), visibleCharCount)}
                </div>

                {/* Controls below box */}
                <div className="flex justify-between items-center border-t border-zinc-900/60 pt-3 mt-4">
                  <span className="text-[9px] font-mono text-zinc-500 uppercase tracking-widest">
                    Modo: {isTyping ? 'Escribiendo...' : 'Texto Completo'}
                  </span>
                  
                  <div className="flex gap-2">
                    <button
                      onClick={testTypewriter}
                      className="px-2.5 py-1 text-[8px] font-mono font-bold bg-purple-950/50 border border-purple-500/30 text-purple-400 hover:text-white hover:border-purple-500 rounded uppercase tracking-wider transition active:scale-95"
                    >
                      Probar Máquina de Escribir
                    </button>
                    <button
                      onClick={() => setVisibleCharCount(9999)}
                      className="px-2.5 py-1 text-[8px] font-mono font-bold bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-white rounded uppercase tracking-wider transition active:scale-95"
                    >
                      Mostrar Todo
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Generated Code Output Box (for copying tags back to data.ts) */}
            <div className="bg-zinc-950/60 border border-zinc-900 p-4 rounded-lg space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-[10px] font-mono uppercase tracking-widest text-emerald-400 font-bold">
                  Código Generado (Copia y Pega en data.ts):
                </span>
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(rawText);
                    alert("¡Código copiado al portapapeles!");
                  }}
                  className="text-[8px] font-mono text-emerald-400 hover:text-white border border-emerald-500/20 hover:border-emerald-500 px-2 py-0.5 rounded transition uppercase font-black"
                >
                  Copiar Código
                </button>
              </div>
              <pre className="p-3 bg-black rounded font-mono text-[10px] leading-normal text-zinc-400 overflow-x-auto whitespace-pre-wrap select-all border border-zinc-900 max-h-[140px] custom-scrollbar">
                {`'${selectedNodeId}': {
  id: '${selectedNodeId}',
  speaker: '${currentActiveNode?.speaker || 'system'}',
  speakerLabel: '${speakerLabel}',
  text: \`${rawText}\`,
  illustration: {
    label: '${currentActiveNode?.illustration?.label || ''}'
  }${currentActiveNode?.choices ? `,\n  choices: ${JSON.stringify(currentActiveNode.choices, null, 2).replace(/\n/g, '\n  ')}` : ''}${currentActiveNode?.next ? `,\n  next: '${currentActiveNode.next}'` : ''}
}`}
              </pre>
            </div>

          </div>

        </div>

      </div>

      {/* POPUP DE CONFIRMACIÓN DE ENLACE SEGURO */}
      {activeLink && (
        <div className="absolute inset-0 z-50 flex items-center justify-center bg-game-bg/95 backdrop-blur-sm p-4 select-none animate-fade-in">
          <div className="bg-game-surface border border-game-muted/30 p-6 md:p-8 w-[95%] max-w-md space-y-5 text-center shadow-2xl overflow-y-auto max-h-[90vh] rounded-md relative flex flex-col justify-between">
            <h2 className="text-sm font-bold text-game-accent uppercase tracking-widest border-b border-game-muted/10 pb-2 font-mono">
              Enlace Externo Seguro
            </h2>
            
            <p className="text-zinc-300 text-xs md:text-sm leading-relaxed font-sans text-center">
              Esta página es un medio educativo libre que explica y contextualiza los patrones oscuros y sus aristas.
            </p>
            
            <div className="p-3 bg-zinc-950/50 border border-zinc-800/40 rounded-sm font-mono text-[9px] text-zinc-400 break-all select-all text-left">
              {activeLink}
            </div>
            
            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <button
                onClick={() => {
                  window.open(activeLink, '_blank', 'noopener,noreferrer');
                  setActiveLink(null);
                }}
                className="flex-1 h-12 bg-game-accent text-game-bg font-bold uppercase tracking-widest text-xs flex items-center justify-center shadow-lg active:scale-95 transition-all cursor-pointer border border-game-accent"
              >
                Visitar Sitio
              </button>
              
              <button
                onClick={() => setActiveLink(null)}
                className="flex-1 h-12 border border-zinc-700 text-game-muted font-bold uppercase tracking-widest text-xs flex items-center justify-center hover:bg-game-surface hover:text-game-accent transition-all active:scale-95 cursor-pointer"
              >
                Volver al Juego
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
