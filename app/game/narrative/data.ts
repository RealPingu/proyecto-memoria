// app/game/narrative/data.ts

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
  // ESCENA 1: Inicio / Protagonista dormido
  'scene_1_init': {
    id: 'scene_1_init',
    speaker: 'system',
    text: 'Tu espíritu se encuentra desorientado, hay una "oscuridad" absoluta. Decides #levantarte#.',
    illustration: {
      position: 'center',
      aspectRatio: 'aspect-video',
      color: 'from-zinc-950 via-zinc-900 to-black border-zinc-800/40 text-zinc-500',
      label: 'Escena 1: La pantalla está en negro absoluto. Mediante un efecto desvanecimiento, comienza a delinearse el protagonista acostado durmiendo.'
    },
    next: 'scene_2_start'
  },

  // ESCENA 2: Encuentro con el Subconsciente
  'scene_2_start': {
    id: 'scene_2_start',
    speaker: 'subconscious',
    speakerLabel: 'Subconsciente',
    text: 'Hey pequeño, es raro ver espíritus como tú estos días, la mayoría de ustedes se encuentran apagados por una "oscuridad" absoluta, el hecho de que estés aquí puede ser una señal.',
    illustration: {
      position: 'right',
      aspectRatio: 'aspect-video',
      color: 'from-blue-950/40 via-zinc-900/60 to-black border-blue-900/20 text-blue-400',
      label: 'Escena 2: El pingüino se detiene desorientado. A la derecha de la pantalla, un ojo blanco brillante (el Subconsciente) se materializa de entre las sombras para hablarle.'
    },
    choices: [
      {
        id: 'c1',
        text: '¿Quién eres?',
        nextNodeId: 'scene_3_ans_1_first',
        isCorrect: true,
        explanation: ''
      },
      {
        id: 'c2',
        text: '¿Qué le pasó a este mundo?',
        nextNodeId: 'scene_3_ans_2_first',
        isCorrect: true,
        explanation: ''
      }
    ]
  },
  
  // ESCENA 3: Cuestionamiento (Camino A: ¿Quién eres? primero)
  'scene_3_ans_1_first': {
    id: 'scene_3_ans_1_first',
    speaker: 'subconscious',
    speakerLabel: 'Subconsciente',
    text: 'No poseo un nombre, tampoco recuerdo el momento de mi creación, solo sé que existo en un lugar apartado del mundo, algunos me llaman el "subconsciente".',
    illustration: {
      position: 'right',
      aspectRatio: 'aspect-video',
      color: 'from-blue-950/30 via-zinc-900/50 to-black border-blue-900/10 text-blue-300',
      label: 'Escena 3 - Respuesta 1: El ojo blanco pulsa suavemente de forma rítmica, de pie frente al protagonista.'
    },
    choices: [
      {
        id: 'c2_second',
        text: '¿Qué le pasó a este mundo?',
        nextNodeId: 'scene_3_ans_2_second',
        isCorrect: true,
        explanation: ''
      }
    ]
  },
  'scene_3_ans_2_second': {
    id: 'scene_3_ans_2_second',
    speaker: 'subconscious',
    speakerLabel: 'Subconsciente',
    text: 'Es una larga historia, en este mundo yacen los espíritus de la gente, muchos han perdido su "luz", han sido "persuadidos" y se encuentran "dormidos".',
    illustration: {
      position: 'right',
      aspectRatio: 'aspect-video',
      color: 'from-blue-950/20 via-zinc-900/40 to-black border-blue-900/10 text-blue-400/80',
      label: 'Escena 3 - Respuesta 2: El ojo parpadea suavemente, mostrando melancolía al recordar a las almas caídas.'
    },
    next: 'scene_4_walking_start'
  },

  // ESCENA 3: Cuestionamiento (Camino B: ¿Qué le pasó a este mundo? primero)
  'scene_3_ans_2_first': {
    id: 'scene_3_ans_2_first',
    speaker: 'subconscious',
    speakerLabel: 'Subconsciente',
    text: 'Es una larga historia, en este mundo yacen los espíritus de la gente, muchos han perdido su "luz", han sido "persuadidos" y se encuentran "dormidos".',
    illustration: {
      position: 'right',
      aspectRatio: 'aspect-video',
      color: 'from-blue-950/20 via-zinc-900/40 to-black border-blue-900/10 text-blue-400/80',
      label: 'Escena 3 - Respuesta 2: El ojo parpadea suavemente, mostrando melancolía al recordar a las almas caídas.'
    },
    choices: [
      {
        id: 'c1_second',
        text: '¿Quién eres?',
        nextNodeId: 'scene_3_ans_1_second',
        isCorrect: true,
        explanation: ''
      }
    ]
  },
  'scene_3_ans_1_second': {
    id: 'scene_3_ans_1_second',
    speaker: 'subconscious',
    speakerLabel: 'Subconsciente',
    text: 'No poseo un nombre, tampoco recuerdo el momento de mi creación, solo sé que existo en un lugar apartado del mundo, algunos me llaman el "subconsciente".',
    illustration: {
      position: 'right',
      aspectRatio: 'aspect-video',
      color: 'from-blue-950/30 via-zinc-900/50 to-black border-blue-900/10 text-blue-300',
      label: 'Escena 3 - Respuesta 1: El ojo blanco pulsa suavemente de forma rítmica, de pie frente al protagonista.'
    },
    next: 'scene_4_walking_start'
  },

  // ESCENA 4: Caminando / Transición
  'scene_4_walking_start': {
    id: 'scene_4_walking_start',
    speaker: 'subconscious',
    speakerLabel: 'Subconsciente',
    text: 'Tal como pensaba, el hecho de tu llegada está cambiando algo. Acompáñame, siento un alma #levemente# despierta.',
    illustration: {
      position: 'center',
      aspectRatio: 'aspect-video',
      color: 'from-violet-950/40 via-zinc-900/60 to-black border-violet-900/20 text-violet-400',
      label: 'Escena 4: El subconsciente comienza a moverse y el pingüino protagonista camina a su lado.'
    },
    next: 'scene_4_walking_transition'
  },
  'scene_4_walking_transition': {
    id: 'scene_4_walking_transition',
    speaker: 'system',
    text: 'Ambos caminan a través de la penumbra del subconsciente. Una sutil energía militar y un aura distorsionada se perciben adelante...',
    illustration: {
      position: 'center',
      aspectRatio: 'aspect-video',
      color: 'from-violet-950/20 via-zinc-900/40 to-black border-zinc-900/50 text-zinc-400',
      label: 'Escena 4: La silueta de los personajes avanza a través del limbo en dirección al alma distorsionada.'
    },
    next: 'scene_5_dialogue_1'
  },

  // ESCENA 5: Acercándose al Alma (Camo durmiendo y alma militar flotando)
  'scene_5_dialogue_1': {
    id: 'scene_5_dialogue_1',
    speaker: 'subconscious',
    speakerLabel: 'Subconsciente',
    text: 'Tal como tú antes de levantarte, esta alma se encuentra perdida, "oscurecida" y "persuadida".',
    illustration: {
      position: 'center',
      aspectRatio: 'aspect-video',
      color: 'from-emerald-950/20 via-zinc-900/40 to-black border-emerald-950/10 text-emerald-400',
      label: 'Escena 5: El protagonista observa el alma oscurecida de Camo durmiendo. El ojo también lo examina.'
    },
    next: 'scene_5_dialogue_2'
  },
  'scene_5_dialogue_2': {
    id: 'scene_5_dialogue_2',
    speaker: 'subconscious',
    speakerLabel: 'Subconsciente',
    text: 'Todas las almas de este mundo son iguales, una vez que el "Patrón" las consume sin ellas ser "conscientes" de lo que les pasó.',
    illustration: {
      position: 'center',
      aspectRatio: 'aspect-video',
      color: 'from-emerald-950/20 via-zinc-900/40 to-black border-emerald-950/10 text-emerald-400',
      label: 'Escena 5: El subconsciente explica cómo el Patrón consume a las almas indefensas.'
    },
    next: 'scene_6_dialogue_1'
  },
  'scene_6_dialogue_1': {
    id: 'scene_6_dialogue_1',
    speaker: 'subconscious',
    speakerLabel: 'Subconsciente',
    text: 'Mi poder como "subconsciente" es solo mirar, absorber pero nunca "intervenir", tomo y obtengo todo aquello que el espíritu "ignora".',
    illustration: {
      position: 'center',
      aspectRatio: 'aspect-video',
      color: 'from-cyan-950/30 via-zinc-900/50 to-black border-cyan-900/20 text-cyan-400',
      label: 'Escena 6: El protagonista mira el resplandor en sus manos bajo la mirada del ojo.'
    },
    next: 'scene_6_dialogue_2'
  },
  'scene_6_dialogue_2': {
    id: 'scene_6_dialogue_2',
    speaker: 'subconscious',
    speakerLabel: 'Subconsciente',
    text: 'Pero tú eres diferente, puedo sentirlo, es como si pudieras "decidir" por tu cuenta, quizás..., los dos juntos podamos cambiar la historia de estos espíritus.',
    illustration: {
      position: 'center',
      aspectRatio: 'aspect-video',
      color: 'from-cyan-950/30 via-zinc-900/50 to-black border-cyan-900/20 text-cyan-400',
      label: 'Escena 6: El subconsciente reconoce la singularidad del protagonista.'
    },
    next: 'scene_6_dialogue_3'
  },
  'scene_6_dialogue_3': {
    id: 'scene_6_dialogue_3',
    speaker: 'subconscious',
    speakerLabel: 'Subconsciente',
    text: 'Adentrémonos en la "historia" de este espíritu, vale la pena #intentarlo#.',
    illustration: {
      position: 'center',
      aspectRatio: 'aspect-video',
      color: 'from-cyan-950/30 via-zinc-900/50 to-black border-cyan-900/20 text-cyan-400',
      label: 'Escena 6: El protagonista decide adentrarse en la mente de Camo.'
    },
    next: 'scene_7_init'
  },
  'scene_7_init': {
    id: 'scene_7_init',
    speaker: 'narrator',
    speakerLabel: 'Narrador',
    text: 'Su nombre era "Camo", el pingüino "sigiloso", dentro de la comarca "pingüinal", era conocido como el mejor francotirador.',
    illustration: {
      position: 'center',
      aspectRatio: 'aspect-video',
      color: 'from-emerald-950/20 via-zinc-900/40 to-black border-emerald-950/10 text-emerald-400',
      label: 'Escena 7: Camo en su podio militar con su rifle de francotirador.'
    },
    next: 'scene_7_dialogue_2'
  },
  'scene_7_dialogue_2': {
    id: 'scene_7_dialogue_2',
    speaker: 'narrator',
    speakerLabel: 'Narrador',
    text: 'Camo vestía su camuflaje con orgullo, y todo el mundo lo conocía por su pericia en su rol...',
    illustration: {
      position: 'center',
      aspectRatio: 'aspect-video',
      color: 'from-emerald-950/20 via-zinc-900/40 to-black border-emerald-950/10 text-emerald-400',
      label: 'Escena 7: Camo vistiendo su camuflaje con orgullo.'
    },
    next: 'scene_8_init'
  },
  'scene_8_init': {
    id: 'scene_8_init',
    speaker: 'narrator',
    speakerLabel: 'Narrador',
    text: 'Lamentablemente, como a muchos otros espíritus, este fue cegado por su ego... y fue víctima de los "patrones" los cuales lo llevaron a la "oscuridad"...',
    illustration: {
      position: 'center',
      aspectRatio: 'aspect-video',
      color: 'from-cyan-950/20 via-zinc-900/40 to-black border-cyan-950/10 text-cyan-400',
      label: 'Escena 8: Camo durmiendo plácidamente acechado por el Patrón Oscuro.'
    },
    next: 'scene_9_init'
  },
  'scene_9_init': {
    id: 'scene_9_init',
    speaker: 'narrator',
    speakerLabel: 'Narrador',
    text: 'Con su experiencia y competencia, Camo fue remunerado con grandes cantidades de "Dólares pingüinales$".',
    illustration: {
      position: 'center',
      aspectRatio: 'aspect-video',
      color: 'from-emerald-950/20 via-zinc-900/40 to-black border-emerald-950/10 text-emerald-400',
      label: 'Escena 9: Camo durmiendo plácidamente acechado por el teléfono y rodeado de dinero.'
    },
    next: 'scene_10_init'
  },
  'scene_10_init': {
    id: 'scene_10_init',
    speaker: 'narrator',
    speakerLabel: 'Narrador',
    text: 'Uno de sus mayores pasatiempos era recorrer y revisar páginas "comerciales" de productos en su celular, pero como "Camo" ya no se encontraba en el campo de batalla, este perdía su rigurosidad y al no sentirse amenazado por enemigos, este se dejaba llevar...',
    illustration: {
      position: 'center',
      aspectRatio: 'aspect-video',
      color: 'from-emerald-950/20 via-zinc-900/40 to-black border-emerald-950/10 text-emerald-400',
      label: 'Escena 10: Catálogo del celular en grande para ver detalladamente la interfaz.'
    },
    next: 'scene_12_init_1'
  },
  'scene_12_init_1': {
    id: 'scene_12_init_1',
    speaker: 'narrator',
    speakerLabel: 'Narrador',
    text: 'Como cualquier otro día Camo se encontraba "surfeando" páginas de compra en su celular...',
    illustration: {
      position: 'center',
      aspectRatio: 'aspect-video',
      color: 'from-blue-950/30 via-zinc-900/50 to-black border-blue-900/20 text-blue-400',
      label: 'Escena 12: Camo con un celular gigante que despliega un iglú brillante caricaturesco.'
    },
    next: 'scene_12_init_2'
  },
  'scene_12_init_2': {
    id: 'scene_12_init_2',
    speaker: 'narrator',
    speakerLabel: 'Narrador',
    text: 'Todo iba normal hasta que en la página de bienes raíces "Pinguilario inmobiliario", Camo vio el iglú de sus sueños.',
    illustration: {
      position: 'center',
      aspectRatio: 'aspect-video',
      color: 'from-blue-950/30 via-zinc-900/50 to-black border-blue-900/20 text-blue-400',
      label: 'Escena 12: Camo con un celular gigante que despliega un iglú brillante caricaturesco.'
    },
    next: 'scene_12_init_3'
  },
  'scene_12_init_3': {
    id: 'scene_12_init_3',
    speaker: 'narrator',
    speakerLabel: 'Narrador',
    text: 'Esto ocasionó un sentimiento "impulsivo", y Camo "decidió" obtenerlo a toda costa...',
    illustration: {
      position: 'center',
      aspectRatio: 'aspect-video',
      color: 'from-blue-950/30 via-zinc-900/50 to-black border-blue-900/20 text-blue-400',
      label: 'Escena 12: Camo con un celular gigante que despliega un iglú brillante caricaturesco.'
    },
    next: 'scene_13_init_1'
  },
  'scene_13_init_1': {
    id: 'scene_13_init_1',
    speaker: 'narrator',
    speakerLabel: 'Narrador',
    text: '¡Camo entró rápidamente a la página!',
    illustration: {
      position: 'center',
      aspectRatio: 'aspect-video',
      color: 'from-cyan-950/30 via-zinc-900/50 to-black border-cyan-900/20 text-cyan-400',
      label: 'Escena 13: La pantalla táctica gigante del celular inundada por pop-ups y anuncios persuasivos de compra compulsiva.'
    },
    next: 'scene_13_init_2'
  },
  'scene_13_init_2': {
    id: 'scene_13_init_2',
    speaker: 'narrator',
    speakerLabel: 'Narrador',
    text: '¡Lo primero que encontró fue una pantalla llena de botones y anuncios que decían "comprar ahora"!',
    illustration: {
      position: 'center',
      aspectRatio: 'aspect-video',
      color: 'from-cyan-950/30 via-zinc-900/50 to-black border-cyan-900/20 text-cyan-400',
      label: 'Escena 13: La pantalla táctica gigante del celular inundada por pop-ups y anuncios persuasivos de compra compulsiva.'
    },
    next: 'scene_13_init_3'
  },
  'scene_13_init_3': {
    id: 'scene_13_init_3',
    speaker: 'subconscious',
    speakerLabel: 'Subconsciente',
    text: '¡Es el momento, toma las riendas y usa tu "conciencia" para ayudar a Camo! lucha contra el patron oscuro y toma las riendas de tus desiciones!',
    illustration: {
      position: 'center',
      aspectRatio: 'aspect-video',
      color: 'from-cyan-950/30 via-zinc-900/50 to-black border-cyan-900/20 text-cyan-400',
      label: 'Escena 13: La pantalla táctica gigante del celular inundada por pop-ups y anuncios persuasivos de compra compulsiva.'
    },
    next: 'scene_11_init'
  },
  'scene_11_init': {
    id: 'scene_11_init',
    speaker: 'subconscious',
    speakerLabel: 'Subconsciente',
    text: 'A este paso la historia de Camo tendrá un trágico final, ayúdame "[nombre del jugador]", yo solo puedo narrar y absorber, pero "TÚ" puedes hacer la diferencia, ayuda a Camo a tomar la decisión correcta, tu "conciencia" frente a los "patrones oscuros" puede #ayudarlo#.',
    illustration: {
      position: 'center',
      aspectRatio: 'aspect-video',
      color: 'from-red-950/25 via-zinc-900/50 to-black border-red-900/10 text-red-400',
      label: 'Escena 11: Aleta de pingüino presionando el botón Pagar repetidamente.'
    },
    next: 'scene_11_end'
  },
  'scene_11_end': {
    id: 'scene_11_end',
    speaker: 'system',
    text: 'Has conocido la caída de Camo. En el próximo capítulo, te adentrarás en su mente para liberarlo de las sombras...',
    illustration: {
      position: 'center',
      aspectRatio: 'aspect-video',
      color: 'from-cyan-950/30 via-zinc-900/50 to-black border-cyan-900/20 text-cyan-400',
      label: 'Fin de la Demo de Narrativa.'
    }
  }
};
