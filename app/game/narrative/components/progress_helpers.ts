import { NARRATIVE_NODES } from '../data';

/**
 * Genera una etiqueta legible para el selector de progreso basándose en el nodo narrativo
 */
export const getNodeLabel = (nodeId: string): string => {
  // Sobrescribir el texto y speaker para las escenas de batalla interactiva del Patrón Oscuro
  if (nodeId === 'scene_14_choice') {
    return '[Patrón Oscuro] "¡Has caído en mi patrón..."';
  }
  if (nodeId === 'scene_15_choice') {
    return '[Patrón Oscuro] "¿Qué esperas, Camo?..."';
  }
  if (nodeId === 'scene_18_choice') {
    return '[Patrón Oscuro] "¡Mi última ayuda, Camo!..."';
  }

  const node = NARRATIVE_NODES[nodeId];
  if (!node) return nodeId;

  // Limpiar etiquetas de formato (<wave>, <highlight>, etc.) para el selector
  const cleanText = node.text.replace(/<[^>]*>/g, '').trim();
  const truncatedText = cleanText.length > 35 ? cleanText.substring(0, 32) + '...' : cleanText;
  
  const speaker = node.speakerLabel ? `[${node.speakerLabel}] ` : '';
  return `${speaker}${truncatedText}`;
};
