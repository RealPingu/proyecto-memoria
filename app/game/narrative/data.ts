// app/game/narrative/intro/data.ts

export interface DialogueNode {
  id: string;
  speaker: 'system' | 'subconscious' | 'camo' | 'narrator';
  speakerLabel?: string;
  text: string;
  illustration?: {
    position: 'center' | 'left' | 'right' | 'full';
    aspectRatio: string; // ej: 'aspect-video', 'aspect-square'
    color: string;      // Clases CSS de Tailwind para el gradiente/color de fondo
    label: string;      // Descripción del placeholder
  };
  choices?: {
    id: string;
    text: string;
    nextNodeId: string;
    isCorrect: boolean;
    explanation: string;
  }[];
  next?: string;
}

export const NARRATIVE_NODES: Record<string, DialogueNode> = {
  'scene_1_init': {
    id: 'scene_1_init',
    speaker: 'system',
    text: 'Tu espíritu se encuentra desorientado, hay una "oscuridad" absoluta. Decides #levantarte#.',
    illustration: {
      position: 'center',
      aspectRatio: 'aspect-video',
      color: 'from-zinc-950 via-zinc-900 to-black border-zinc-800/40 text-zinc-500',
      label: 'Escena 1 Placeholder: La pantalla está en negro absoluto. Mediante un efecto vanish (desvanecimiento), comienza a delinearse el sprite del protagonista (un pingüino genérico).'
    },
    next: 'scene_2_start'
  },
  'scene_2_start': {
    id: 'scene_2_start',
    speaker: 'subconscious',
    speakerLabel: 'Subconsciente',
    text: 'Hey pequeño, es raro ver espíritus como tú estos días, la mayoría de ustedes se encuentran apagados por una "oscuridad" absoluta, el hecho de que estés aquí puede ser una señal.',
    illustration: {
      position: 'right',
      aspectRatio: 'aspect-video',
      color: 'from-blue-950/40 via-zinc-900/60 to-black border-blue-900/20 text-blue-400',
      label: 'Escena 2 Placeholder: El pingüino se detiene desorientado. A la derecha de la pantalla, un ojo blanco brillante (el Subconsciente) se materializa de entre las sombras para hablarle.'
    },
    choices: [
      {
        id: 'c1',
        text: '¿Quién eres?',
        nextNodeId: 'scene_2_ans_1',
        isCorrect: true,
        explanation: 'Interrogas al subconsciente sobre su origen en este espacio liminal.'
      },
      {
        id: 'c2',
        text: '¿Qué le pasó a este mundo?',
        nextNodeId: 'scene_2_ans_2',
        isCorrect: true,
        explanation: 'Indagas sobre la causa de la penumbra y los espíritus apagados.'
      }
    ]
  },
  'scene_2_ans_1': {
    id: 'scene_2_ans_1',
    speaker: 'subconscious',
    speakerLabel: 'Subconsciente',
    text: 'No poseo un nombre, tampoco recuerdo el momento de mi creación, solo sé que existo en un lugar apartado del mundo, algunos me llaman el "subconsciente".',
    illustration: {
      position: 'right',
      aspectRatio: 'aspect-video',
      color: 'from-blue-950/30 via-zinc-900/50 to-black border-blue-900/10 text-blue-300',
      label: 'Escena 2 - Respuesta 1: El ojo blanco pulsa suavemente de forma rítmica, denotando la naturaleza filosófica y atemporal de su propia existencia.'
    },
    next: 'scene_2_join'
  },
  'scene_2_ans_2': {
    id: 'scene_2_ans_2',
    speaker: 'subconscious',
    speakerLabel: 'Subconsciente',
    text: 'Es una larga historia, en este mundo yacen los espíritus de la gente, muchos han perdido su "luz", han sido "persuadidos" y se encuentran "dormidos".',
    illustration: {
      position: 'right',
      aspectRatio: 'aspect-video',
      color: 'from-blue-950/20 via-zinc-900/40 to-black border-blue-900/10 text-blue-400/80',
      label: 'Escena 2 - Respuesta 2: El ojo parpadea suavemente, mostrando resignación y melancolía al recordar a las almas caídas bajo el influjo de las interfaces oscuras.'
    },
    next: 'scene_2_join'
  },
  'scene_2_join': {
    id: 'scene_2_join',
    speaker: 'subconscious',
    speakerLabel: 'Subconsciente',
    text: 'Tal como pensaba, el hecho de tu llegada está cambiando algo. Acompáñame, puedo sentir una leve #luz#.',
    illustration: {
      position: 'center',
      aspectRatio: 'aspect-video',
      color: 'from-violet-950/40 via-zinc-900/60 to-black border-violet-900/20 text-violet-400',
      label: 'Escena 3 Placeholder: El subconsciente comienza a moverse hacia el fondo de la pantalla. El pingüino protagonista se prepara para seguirlo. Se divisa un sutil resplandor en la distancia.'
    },
    next: 'scene_3_start'
  },
  'scene_3_start': {
    id: 'scene_3_start',
    speaker: 'system',
    text: 'Prólogo completado. Has establecido contacto con tu "subconsciente" y estás listo para adentrarte en la mente de Camo.',
    illustration: {
      position: 'center',
      aspectRatio: 'aspect-video',
      color: 'from-emerald-950/30 via-zinc-900/50 to-black border-emerald-900/20 text-emerald-400',
      label: 'Fin de la Demo de Narrativa: Aquí continuará la historia de Camo el Pingüino Francotirador y sus decisiones en la plataforma de compras.'
    }
  }
};
