import { NARRATIVE_NODES } from '../data';

/**
 * Genera una etiqueta legible para el selector de progreso basándose en el nodo narrativo
 */
export const getNodeLabel = (nodeId: string): string => {
  const node = NARRATIVE_NODES[nodeId];
  if (!node) return nodeId;

  // Limpiar etiquetas de formato (<wave>, <highlight>, etc.) para el selector
  const cleanText = node.text.replace(/<[^>]*>/g, '').trim();
  const truncatedText = cleanText.length > 35 ? cleanText.substring(0, 32) + '...' : cleanText;
  
  const speaker = node.speakerLabel ? `[${node.speakerLabel}] ` : '';
  return `${speaker}${truncatedText}`;
};
