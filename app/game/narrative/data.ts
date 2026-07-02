// app/game/narrative/data.ts

export interface DialogueNode {
  id: string;
  speaker: 'system' | 'subconscious' | 'camo' | 'narrator';
  speakerLabel?: string;
  text: string;
  illustration?: {
    label: string;
  };
  choices?: {
    id: string;
    text: string;
    nextNodeId: string;
    isCorrect: boolean;
  }[];
  next?: string;
}

export const NARRATIVE_NODES: Record<string, DialogueNode> = {
  // ESCENA 1: Inicio / Protagonista dormido
  'scene_1_init': {
    id: 'scene_1_init',
    speaker: 'system',
    speakerLabel: 'Narrador',
    text: `Tu espíritu se encuentra <wave color="#22d3ee">desorientado</wave>, hay una <spooky color="#858799">oscuridad absoluta</spooky>. No te queda más opción que <action>levantarte</action>.`,
    illustration: {
      label: 'Escena 1: La pantalla está en negro absoluto. Mediante un efecto desvanecimiento, comienza a delinearse el protagonista acostado durmiendo.'
    },
    next: 'scene_2_start'
  },

  // ESCENA 2: Encuentro con el Subconsciente
  'scene_2_start': {
    id: 'scene_2_start',
    speaker: 'subconscious',
    speakerLabel: 'Subconsciente',
    text: `Hey pequeño pingüino...
Es raro ver espíritus <wave color="#22d3ee">conscientes</wave> como tú estos días...
La mayoría de ustedes se encuentran apagados por una <spooky color="#858799">oscuridad ...</spooky>
El hecho de que estés aquí puede ser una señal.`,
    illustration: {
      label: 'Escena 2: El pingüino se detiene desorientado. A la derecha de la pantalla, un ojo blanco brillante (el Subconsciente) se materializa de entre las sombras para hablarle.'
    },
    choices: [
      {
        id: 'c1',
        text: '¿Quién eres?',
        nextNodeId: 'scene_3_ans_1_first',
        isCorrect: true,
      },
      {
        id: 'c2',
        text: '¿Qué le pasó a este mundo?',
        nextNodeId: 'scene_3_ans_2_first',
        isCorrect: true,
      }
    ]
  },
  
  // ESCENA 3: Cuestionamiento (Camino A: ¿Quién eres? primero)
  'scene_3_ans_1_first': {
    id: 'scene_3_ans_1_first',
    speaker: 'subconscious',
    speakerLabel: 'Subconsciente',
    text: `No poseo un nombre...
Tampoco recuerdo el momento de mi creación...
Solo sé que existo en un lugar <spooky color="#858799">apartado del mundo</spooky>
Apartado de la razón...
Algunos me llaman el <wave>subconsciente</wave>.`,
    illustration: {
      label: 'Escena 3 - Respuesta 1: El ojo blanco pulsa suavemente de forma rítmica, de pie frente al protagonista.'
    },
    choices: [
      {
        id: 'c2_second',
        text: '¿Qué le pasó a este mundo?',
        nextNodeId: 'scene_3_ans_2_second',
        isCorrect: true,
      }
    ]
  },
  'scene_3_ans_2_second': {
    id: 'scene_3_ans_2_second',
    speaker: 'subconscious',
    speakerLabel: 'Subconsciente',
    text: `Es una larga historia, en este mundo yacen los espíritus de la gente...
Muchos han perdido su <wave color="#fbbf24">luz</wave>, han sido <spooky color="#858799">persuadidos</spooky> y se encuentran <spooky color="#858799">dormidos...</spooky>
Curiosamente tú pareces ser la excepción...`,
    illustration: {
      label: 'Escena 3 - Respuesta 2: El ojo parpadea suavemente, mostrando melancolía al recordar a las almas caídas.'
    },
    next: 'scene_4_walking_start'
  },

  // ESCENA 3: Cuestionamiento (Camino B: ¿Qué le pasó a este mundo? primero)
  'scene_3_ans_2_first': {
    id: 'scene_3_ans_2_first',
    speaker: 'subconscious',
    speakerLabel: 'Subconsciente',
    text: `Es una larga historia, en este mundo yacen los espíritus de la gente...
Muchos han perdido su <wave color="#fbbf24">luz</wave>, han sido <spooky color="#858799">persuadidos</spooky> y se encuentran <spooky color="#858799">dormidos...</spooky>
Curiosamente tú pareces ser la excepción...`,
    illustration: {
      label: 'Escena 3 - Respuesta 2: El ojo parpadea suavemente, mostrando melancolía al recordar a las almas caídas.'
    },
    choices: [
      {
        id: 'c1_second',
        text: '¿Quién eres?',
        nextNodeId: 'scene_3_ans_1_second',
        isCorrect: true,
      }
    ]
  },
  'scene_3_ans_1_second': {
    id: 'scene_3_ans_1_second',
    speaker: 'subconscious',
    speakerLabel: 'Subconsciente',
    text: `No poseo un nombre...
Tampoco recuerdo el momento de mi creación...
Solo sé que existo en un lugar <spooky color="#858799">apartado del mundo</spooky>
Apartado de la razón...
Algunos me llaman el <wave>subconsciente</wave>.`,
    illustration: {
      label: 'Escena 3 - Respuesta 1: El ojo blanco pulsa suavemente de forma rítmica, de pie frente al protagonista.'
    },
    next: 'scene_4_walking_start'
  },

  // ESCENA 4: Caminando / Transición
  'scene_4_walking_start': {
    id: 'scene_4_walking_start',
    speaker: 'subconscious',
    speakerLabel: 'Subconsciente',
    text: `Tal como pensaba, el hecho de tu llegada está cambiando algo...
<action>Acompáñame</action>, siento un alma <wave>levemente despierta...</wave>`,
    illustration: {
      label: 'Escena 4: El subconsciente comienza a moverse y el pingüino protagonista camina a su lado.'
    },
    next: 'scene_4_walking_transition'
  },
  'scene_4_walking_transition': {
    id: 'scene_4_walking_transition',
    speaker: 'system',
    speakerLabel: 'Narrador',
    text: `Ambos caminan a través de la <spooky color="#858799">oscuridad</spooky>. Una sutil energía <sneaky color="#7ba077">entusiasta</sneaky> y <sneaky color="#7ba077">militar</sneaky>
Un aura distorsionada se percibe delante...`,
    illustration: {
      label: 'Escena 4: La silueta de los personajes avanza a través del limbo en dirección al alma distorsionada.'
    },
    next: 'scene_5_dialogue_1'
  },

  // ESCENA 5: Acercándose al Alma (Camo durmiendo y alma militar flotando)
  'scene_5_dialogue_1': {
    id: 'scene_5_dialogue_1',
    speaker: 'subconscious',
    speakerLabel: 'Subconsciente',
    text: `Tal como tú antes de levantarte, esta alma se encuentra perdida, <spooky color="#858799">oscurecida y persuadida...</spooky>
A diferencia tuya, no parece querer levantarse sola...`,
    illustration: {
      label: 'Escena 5: El protagonista observa el alma oscurecida de Camo durmiendo. El ojo también lo examina.'
    },
    next: 'scene_5_dialogue_2'
  },
  'scene_5_dialogue_2': {
    id: 'scene_5_dialogue_2',
    speaker: 'subconscious',
    speakerLabel: 'Subconsciente',
    text: `Todas las almas de este mundo son iguales, una vez que el <tremble color="#2a256f">Patrón</tremble> las consume.
Dejan de ser <spooky color="#858799">conscientes de lo que les pasó...</spooky>
Las consecuencias llegan tarde...`,
    illustration: {
      label: 'Escena 5: El subconsciente explica cómo el Patrón consume a las almas indefensas.'
    },
    next: 'scene_6_dialogue_1'
  },
  'scene_6_dialogue_1': {
    id: 'scene_6_dialogue_1',
    speaker: 'subconscious',
    speakerLabel: 'Subconsciente',
    text: `No es la única alma en este estado...
pero yo no puedo hacer nada...
Mi poder como <wave>subconsciente</wave> es solo mirar, absorber pero nunca <wave>intervenir</wave>, tomo y obtengo todo aquello que el espíritu <spooky color="#858799">ignora.</spooky>`,
    illustration: {
      label: 'Escena 6: El protagonista mira el resplandor en sus manos bajo la mirada del ojo.'
    },
    next: 'scene_6_dialogue_2'
  },
  'scene_6_dialogue_2': {
    id: 'scene_6_dialogue_2',
    speaker: 'subconscious',
    speakerLabel: 'Subconsciente',
    text: `Pero tú eres diferente, puedo sentirlo, es como si pudieras <heartbeat color="#ef4444">decidir</heartbeat> por tu cuenta, quizás...
los dos juntos podamos cambiar la historia de estos espíritus...
<heartbeat color="#ef4444">despertarlos...</heartbeat>
alejarlos de los <tremble color="#2a256f">patrones oscuros</tremble> que los acechan.`,
    illustration: {
      label: 'Escena 6: El subconsciente reconoce la singularidad del protagonista.'
    },
    next: 'scene_6_dialogue_3'
  },
  'scene_6_dialogue_3': {
    id: 'scene_6_dialogue_3',
    speaker: 'subconscious',
    speakerLabel: 'Subconsciente',
    text: `Adentrémonos en la <wave>historia</wave> y <wave>alma</wave> de este espíritu...
vale la pena intentar <action>ayudarlo</action>.`,
    illustration: {
      label: 'Escena 6: El protagonista decide adentrarse en la mente de Camo.'
    },
    next: 'scene_7_init'
  },
  'scene_7_init': {
    id: 'scene_7_init',
    speaker: 'narrator',
    speakerLabel: 'Narrador',
    text: `Puedo ver su <wave>pasado</wave>...
Su nombre era <sneaky>Camo</sneaky>, el pingüino <sneaky>sigiloso</sneaky>, dentro de la comarca pingüinal, era conocido como el mejor <sneaky>francotirador</sneaky>.`,
    illustration: {
      label: 'Escena 7: Camo en su podio militar con su rifle de francotirador.'
    },
    next: 'scene_7_dialogue_2'
  },
  'scene_7_dialogue_2': {
    id: 'scene_7_dialogue_2',
    speaker: 'narrator',
    speakerLabel: 'Narrador',
    text: `Camo vestía su camuflaje con orgullo, y todo el mundo lo conocía por su pericia y aptitud frente a su rol de francotirador...
Era especialmente <sneaky>sigiloso</sneaky>...
maestro del <spooky color="#858799">engaño</spooky> y del <spooky color="#858799">escondite...</spooky>
nadie podía ser más <sneaky>sigiloso</sneaky> que él...
O eso él pensaba...`,
    illustration: {
      label: 'Escena 7: Camo vistiendo su camuflaje con orgullo.'
    },
    next: 'scene_8_init'
  },
  'scene_8_init': {
    id: 'scene_8_init',
    speaker: 'narrator',
    speakerLabel: 'Narrador',
    text: `Lamentablemente, como a muchos otros espíritus, este fue <spooky color="#858799">cegado</spooky> por su ego...
y fue víctima de los <tremble color="#2a256f">patrones oscuros</tremble> los cuales lo llevaron a perder la <wave color="#22d3ee">decisión propia...</wave>`,
    illustration: {
      label: 'Escena 8: Camo durmiendo plácidamente acechado por el Patrón Oscuro.'
    },
    next: 'scene_9_init'
  },
  'scene_9_init': {
    id: 'scene_9_init',
    speaker: 'narrator',
    speakerLabel: 'Narrador',
    text: `Con su experiencia y competencia, Camo fue remunerado con grandes cantidades de <highlight color="#84cc16">$Dólares pingüinales$.</highlight>`,
    illustration: {
      label: 'Escena 9: Camo durmiendo plácidamente acechado por el teléfono y rodeado de dinero.'
    },
    next: 'scene_10_init'
  },
  'scene_10_init': {
    id: 'scene_10_init',
    speaker: 'narrator',
    speakerLabel: 'Narrador',
    text: `Uno de sus mayores pasatiempos era recorrer y revisar páginas <highlight color="#84cc16">comerciales</highlight> de productos en su celular...
pero como Camo ya no se encontraba en el campo de batalla, este perdió su <spooky color="#858799">rigurosidad</spooky> y al no sentirse amenazado por enemigos...
se dejó <spooky color="#858799">llevar...</spooky>`,
    illustration: {
      label: 'Escena 10: Catálogo del celular en grande para ver detalladamente la interfaz.'
    },
    next: 'scene_12_init_1'
  },
  'scene_12_init_1': {
    id: 'scene_12_init_1',
    speaker: 'narrator',
    speakerLabel: 'Narrador',
    text: `Como cualquier otro día, Camo se encontraba <wave>surfeando</wave> páginas de compra en su <wave color="#22d3ee">celular...</wave>`,
    illustration: {
      label: 'Escena 12: Camo con un celular gigante que despliega un iglú brillante caricaturesco.'
    },
    next: 'scene_12_init_2'
  },
  'scene_12_init_2': {
    id: 'scene_12_init_2',
    speaker: 'narrator',
    speakerLabel: 'Narrador',
    text: `Todo iba normal hasta que en la página de <highlight color="#84cc16">bienes raíces</highlight> <heartbeat color="#80ceff">Pinguilario inmobiliario</heartbeat>
Camo vio el iglú de sus sueños.`,
    illustration: {
      label: 'Escena 12: Camo con un celular gigante que despliega un iglú brillante caricaturesco.'
    },
    next: 'scene_12_init_3'
  },
  'scene_12_init_3': {
    id: 'scene_12_init_3',
    speaker: 'narrator',
    speakerLabel: 'Narrador',
    text: `Esto ocasionó un <tremble color="#2a256f">sentimiento impulsivo</tremble>
Camo decidió obtenerlo <tremble color="#2a256f">a toda costa...</tremble>`,
    illustration: {
      label: 'Escena 12: Camo con un celular gigante que despliega un iglú brillante caricaturesco.'
    },
    next: 'scene_11_init'
  },
  'scene_13_init_1': {
    id: 'scene_13_init_1',
    speaker: 'narrator',
    speakerLabel: 'Narrador',
    text: `<heartbeat color="#84cc16">¡Camo entró rápidamente a la página!</heartbeat>`,
    illustration: {
      label: 'Escena 13: La pantalla táctica gigante del celular inundada por pop-ups y anuncios persuasivos de compra compulsiva.'
    },
    next: 'scene_13_init_2'
  },
  'scene_13_init_2': {
    id: 'scene_13_init_2',
    speaker: 'narrator',
    speakerLabel: 'Narrador',
    text: `Lo primero que encontró fue una pantalla llena de botones y anuncios que decían <heartbeat color="#84cc16">¡comprar ahora!</heartbeat>`,
    illustration: {
      label: 'Escena 13: La pantalla táctica gigante del celular inundada por pop-ups y anuncios persuasivos de compra compulsiva.'
    },
    next: 'scene_13_init_3'
  },
  'scene_13_init_3': {
    id: 'scene_13_init_3',
    speaker: 'subconscious',
    speakerLabel: 'Subconsciente',
    text: `¡Es el momento, toma las riendas y usa tu <wave>conciencia</wave> para <heartbeat color="#ef4444">ayudar a Camo</heartbeat>! ¡<tremble color="#2a256f">Lucha contra el Patrón Oscuro</tremble> y <wave color="#22d3ee">toma las riendas de tus decisiones</wave>!
Usa el conocimiento de <sneaky>sigilo</sneaky> de <sneaky color="#7ba077">Camo</sneaky>, ponte <sneaky color="#7ba077">atento</sneaky> y no te dejes llevar por <spooky color="#858799">ilusiones</spooky>!
Recuerda: ¡el camino más llamativo y fácil casi nunca es el correcto!`,
    illustration: {
      label: 'Escena 13: La pantalla táctica gigante del celular inundada por pop-ups y anuncios persuasivos de compra compulsiva.'
    },
    next: 'scene_14_init'
  },
  'scene_11_init': {
    id: 'scene_11_init',
    speaker: 'subconscious',
    speakerLabel: 'Subconsciente',
    text: `A este paso la historia de Camo tendrá un trágico final, ayúdame <heartbeat color="#ef4444">[nombre del jugador]</heartbeat>, yo solo puedo narrar y recordar...
pero <heartbeat color="#ef4444">TÚ</heartbeat> puedes <heartbeat color="#ef4444">hacer la diferencia</heartbeat>!
Tu <wave>conciencia</wave> frente a los <spooky color="#858799">patrones oscuros</spooky> puede <action>ayudarlo</action>.`,
    illustration: {
      label: 'Escena 11: Aleta de pingüino presionando el botón Pagar repetidamente.'
    },
    next: 'scene_13_init_1'
  },
  'scene_14_init': {
    id: 'scene_14_init',
    speaker: 'subconscious',
    speakerLabel: 'Subconsciente',
    text: `¡Te enfrentarás al <tremble color="#2a256f">Patrón Oscuro</tremble>!
¡Un ser que solo busca obtener su <tremble color="#2a256f">beneficio</tremble> <tremble color="#2a256f">sin que te des cuenta</tremble>!
Está intentando aplicar <shake color="#06b6d4">Anuncios Disfrazados</shake> para manipular a Camo!
¡Interviene y toma la decisión que ayude a Camo a combatir el <tremble color="#2a256f">Patrón Oscuro</tremble>!`,
    illustration: {
      label: 'Escena 14: Camo peleando con el Patrón Oscuro en un choque de energías.'
    },
    next: 'scene_14_choice'
  },
  'scene_14_choice': {
    id: 'scene_14_choice',
    speaker: 'system',
    speakerLabel: 'Narrador',
    text: `¿Cómo debe actuar Camo ante la avalancha de <highlight>Anuncios Disfrazados</highlight> del Patrón Oscuro?`,
    illustration: {
      label: 'Escena 14: La batalla mental entre Camo y el Patrón Oscuro, esperando tu decisión.'
    },
    choices: [
      {
        id: 'camo_c1',
        text: 'Tomas desesperadamente el celular y presionas todos los botones, pensando solo en ti, en tu iglú y un rico café caliente.',
        nextNodeId: 'scene_14_resultado_1',
        isCorrect: false,
      },
      {
        id: 'camo_c2',
        text: 'Respiras, te calmas, notas la inconsistencia visual de los anuncios y buscas el botón que más se parece a la interfaz de la página.',
        nextNodeId: 'scene_14_resultado_2',
        isCorrect: true,
      },
      {
        id: 'camo_c3',
        text: 'Te calmas, regresas y buscas la vivienda en otros portales estándar de reputación confiable.',
        nextNodeId: 'scene_14_resultado_3',
        isCorrect: true,
      }
    ]
  },
  'scene_14_resultado_1': {
    id: 'scene_14_resultado_1',
    speaker: 'narrator',
    speakerLabel: 'Narrador',
    text: `Luego de presionar un <shake color="#06b6d4">Anuncio escondido</shake>
¡Se abren múltiples ventanas y se descargan múltiples archivos!
Pero en su <tremble color="#2a256f">apuro</tremble>
Camo <tremble color="#2a256f">ignora</tremble> todo esto
Y prosigue por una <tremble color="#2a256f">página externa e insegura...</tremble>

<heartbeat color="#ef4444">¡Has caído en el patrón oscuro!</heartbeat>`,
    illustration: {
      label: 'Resultado 1: Camo asustado frente a un celular lleno de pop-ups y descargas maliciosas.'
    },
    next: 'scene_14_explicacion_1'
  },
  'scene_14_explicacion_1': {
    id: 'scene_14_explicacion_1',
    speaker: 'narrator',
    speakerLabel: 'Explicación del Patrón',
    text: `El <tremble color="#2a256f">Patrón Oscuro</tremble> del enemigo utilizado fue <shake color="#06b6d4">Anuncios Disfrazados.</shake>

Esto consiste en diseñar y <sneaky color="#7ba077">maquillar anuncios</sneaky> de modo que <sneaky color="#7ba077">parezcan elementos legítimos de la interfaz.</sneaky>

Los usuarios pulsan en ellos asumiendo que es una interacción válida del sitio
Cayendo en descargas de <tremble color="#2a256f">software no deseado</tremble> o <tremble color="#2a256f">redirecciones maliciosas.</tremble>

Leer más en:
https://deceptive.design/types/disguised-ads/`,
    illustration: {
      label: 'Explicación 1: Patrón alegre celebrando al haber engañado a Camo.'
    },
    next: 'scene_14_choice'
  },
  'scene_14_resultado_2': {
    id: 'scene_14_resultado_2',
    speaker: 'narrator',
    speakerLabel: 'Narrador',
    text: `Te guías por el botón que más se parece a la <wave color="#80ceff">interfaz de la página</wave> y <heartbeat color="#84cc16">Avanzas exitosamente</heartbeat> al siguiente paso de compra, pero te queda una pequeña <spooky color="#858799">desconfianza</spooky> de la plataforma, la cual tenía un exceso de anuncios.

<heartbeat color="#84cc16">¡Has evitado el patrón oscuro!</heartbeat>`,
    illustration: {
      label: 'Resultado 2: Camo concentrado encontrando el botón de reserva real entre anuncios atenuados.'
    },
    next: 'scene_14_explicacion_2'
  },
  'scene_14_explicacion_2': {
    id: 'scene_14_explicacion_2',
    speaker: 'narrator',
    speakerLabel: 'Explicación del Patrón',
    text: `El <tremble color="#2a256f">Patrón Oscuro</tremble> del enemigo utilizado fue <shake color="#06b6d4">Anuncios Disfrazados.</shake>

Esto consiste en diseñar y <sneaky color="#7ba077">maquillar anuncios</sneaky> de modo que <sneaky color="#7ba077">parezcan elementos legítimos de la interfaz.</sneaky>

Los usuarios pulsan en ellos asumiendo que es una interacción válida del sitio
Cayendo en descargas de <tremble color="#2a256f">software no deseado</tremble> o <tremble color="#2a256f">redirecciones maliciosas.</tremble>

Leer más en:
https://deceptive.design/types/disguised-ads/`,
    illustration: {
      label: 'Explicación 2: Patrón derrotado con el núcleo apagado tras identificar la trampa.'
    },
    next: 'scene_15_init_1'
  },
  'scene_14_resultado_3': {
    id: 'scene_14_resultado_3',
    speaker: 'narrator',
    speakerLabel: 'Narrador',
    text: `Luego de revisar cuidadosamente en <wave color="#80ceff">otras páginas y experiencias de usuarios confiables</wave>, así como <wave color="#80ceff">consultar con pingüinos conocidos</wave>
Te enteras que el estándar es usar páginas con <wave color="#80ceff">mejor reputación</wave>
Vas y buscas el mismo iglú en esta página segura.

<heartbeat color="#84cc16">¡Has evitado el patrón oscuro!</heartbeat>`,
    illustration: {
      label: 'Resultado 3: Camo celebrando con su iglú verificado y seguro.'
    },
    next: 'scene_14_explicacion_3'
  },
  'scene_14_explicacion_3': {
    id: 'scene_14_explicacion_3',
    speaker: 'narrator',
    speakerLabel: 'Explicación del Patrón',
    text: `El <tremble color="#2a256f">Patrón Oscuro</tremble> del enemigo utilizado fue <shake color="#06b6d4">Anuncios Disfrazados.</shake>

Esto consiste en diseñar y <sneaky color="#7ba077">maquillar anuncios</sneaky> de modo que <sneaky color="#7ba077">parezcan elementos legítimos de la interfaz.</sneaky>

Los usuarios pulsan en ellos asumiendo que es una interacción válida del sitio
Cayendo en descargas de <tremble color="#2a256f">software no deseado</tremble> o <tremble color="#2a256f">redirecciones maliciosas.</tremble>

Leer más en:
https://deceptive.design/types/disguised-ads/`,
    illustration: {
      label: 'Explicación 3: Patrón derrotado con el núcleo apagado.'
    },
    next: 'scene_15_init_1'
  },
  // ─── Escena 15: Drip Pricing ────────────────────────────────────────────
  'scene_15_init_1': {
    id: 'scene_15_init_1',
    speaker: 'subconscious',
    speakerLabel: 'Subconsciente',
    text: `Una vez dentro del finalizar la compra, Camo se enfrenta a la <heartbeat color="#ef4444">tediosa tarea</heartbeat> de <heartbeat color="#ef4444">confirmar todos los pasos</heartbeat> para completar la compra...
Sin perder la paciencia.`,
    illustration: {
      label: 'Escena 15: Camo en el sillón revisando el proceso de compra en su celular.'
    },
    next: 'scene_15_init_2'
  },
  'scene_15_init_2': {
    id: 'scene_15_init_2',
    speaker: 'subconscious',
    speakerLabel: 'Subconsciente',
    text: `De otras experiencias, Camo sabe que la mayoría de páginas <heartbeat color="#ef4444">tienen el mismo proceso de compra...</heartbeat>
por lo que se prepara para repetir lo que está <heartbeat color="#ef4444">acostumbrado a hacer...</heartbeat>`,
    illustration: {
      label: 'Escena 15: Camo confiado, listo para presionar siguiente sin leer.'
    },
    next: 'scene_15_init_3'
  },
  'scene_15_init_3': {
    id: 'scene_15_init_3',
    speaker: 'subconscious',
    speakerLabel: 'Subconsciente',
    text: `Así es...
<heartbeat color="#ef4444">Presionar siguiente sin leer ni una aleta de pingüino...</heartbeat>`,
    illustration: {
      label: 'Escena 15: Camo presionando siguiente repetidamente sin mirar la pantalla.'
    },
    next: 'scene_15_init_4'
  },
  'scene_15_init_4': {
    id: 'scene_15_init_4',
    speaker: 'subconscious',
    speakerLabel: 'Subconsciente',
    text: `Sin saberlo
Camo no solo estaba saltando beneficios exclusivos.
Sino también un <tremble color="#2a256f">seguro opcional</tremble> para cubrirlo en caso de que su iglú se viera afectado por <heartbeat color="#2a256f">Bombas atómicas</heartbeat> enviadas por los <heartbeat color="#2a256f">pingüinos del Polo Norte...</heartbeat>`,
    illustration: {
      label: 'Escena 15: Pantalla del celular mostrando el seguro Anti-Bombardeo atómico en letra pequeña.'
    },
    next: 'scene_15_init_4b'
  },
  'scene_15_init_4b': {
    id: 'scene_15_init_4b',
    speaker: 'system',
    speakerLabel: 'Narrador',
    text: `Solo por si no lo sabías...

<heartbeat color="#ef4444">¡NO HAY PINGÜINOS EN EL POLO NORTE!</heartbeat>

Para ser un francotirador renombrado Camo no aplicaba su experiencia al navegar por internet...`,
    illustration: {
      label: 'Escena 15: Revelación dramática - No hay pingüinos en el Polo Norte.'
    },
    next: 'scene_15_choice'
  },
  'scene_15_choice': {
    id: 'scene_15_choice',
    speaker: 'system',
    speakerLabel: 'Narrador',
    text: `¡Camo está por caer en otro <highlight>patrón oscuro</highlight>, extiéndele una mano! ¡Es tu momento de ayudarlo!`,
    illustration: {
      label: 'Escena 15: Camo ante la decisión de leer o presionar siguiente.'
    },
    choices: [
      {
        id: 'drip_c1',
        text: 'Recuerdas tus enseñanzas militares y, al haber ya evadido el primer patrón oscuro, entras en un estado de alerta y lees atentamente cada paso y término antes de proceder al siguiente.',
        nextNodeId: 'scene_15_resultado_1',
        isCorrect: true,
      },
      {
        id: 'drip_c2',
        text: 'Ya confiado de haber superado la barrera de anuncios exitosamente, no piensas y presionas rápidamente el llamativo botón de siguiente.',
        nextNodeId: 'scene_15_resultado_2',
        isCorrect: false,
      }
    ]
  },
  'scene_15_resultado_1': {
    id: 'scene_15_resultado_1',
    speaker: 'narrator',
    speakerLabel: 'Narrador',
    text: `Pasas <wave color="#22d3ee">atentamente</wave> por cada paso.
Te das cuenta de los ridículos cargos adicionales...

Profundamente Camo también piensa que podría <heartbeat color="#ef4444">dispararle a la bomba antes de que cayera... </heartbeat>

Sin duda Camo confía <wave color="#22d3ee">excesivamente</wave> en su habilidad...

<heartbeat color="#84cc16">¡Has evitado el patrón oscuro!</heartbeat>`,
    illustration: {
      label: 'Resultado 15-1: Camo con lupa, desmarcando el seguro innecesario.'
    },
    next: 'scene_15_explicacion_1'
  },
  'scene_15_explicacion_1': {
    id: 'scene_15_explicacion_1',
    speaker: 'narrator',
    speakerLabel: 'Explicación del Patrón',
    text: `El <tremble color="#2a256f">Patrón Oscuro</tremble> que aplicó el enemigo fue <shake color="#06b6d4">hidden costs</shake>

Consiste en agregar un cargo oculto en un paso tardío del proceso de compra de formas sutil.

Este Patrón Oscuro aprovecha eso para aplicar cobros adicionales o extraer información personal.

leer más:
https://deceptive.design/types/hidden-costs/`,
    illustration: {
      label: 'Explicación 15-1: Patrón derrotado con el núcleo apagado.'
    },
    next: 'scene_18_init_1'
  },
  'scene_15_resultado_2': {
    id: 'scene_15_resultado_2',
    speaker: 'narrator',
    speakerLabel: 'Narrador',
    text: `Te <tremble color="#2a256f">apresuras</tremble> y completas la compra <tremble color="#2a256f">sin leer atentamente</tremble> cada término y condición.

Ignoras los beneficios que podrían serte útiles y <tremble color="#2a256f">aceptas cargos ridículos</tremble> en el proceso.

<heartbeat color="#ef4444">¡Has caído en el patrón oscuro!</heartbeat>`,
    illustration: {
      label: 'Resultado 15-2: Camo asustado con el cobro mensual inesperado.'
    },
    next: 'scene_15_explicacion_2'
  },
  'scene_15_explicacion_2': {
    id: 'scene_15_explicacion_2',
    speaker: 'narrator',
    speakerLabel: 'Explicación del Patrón',
    text: `El <tremble color="#2a256f">Patrón Oscuro</tremble> que aplicó el enemigo fue <shake color="#06b6d4">hidden costs</shake>

Consiste en agregar un cargo oculto en un paso tardío del proceso de compra de formas sutil.

Este Patrón Oscuro aprovecha eso para aplicar cobros adicionales o extraer información personal.

leer más:
https://deceptive.design/types/hidden-costs/`,
    illustration: {
      label: 'Explicación 15-2: Patrón alegre celebrando el cobro mensual aceptado.'
    },
    next: 'scene_15_choice'
  },
  // ─── Escena 18: Reference Pricing ───────────────────────────────────────
  'scene_18_init_1': {
    id: 'scene_18_init_1',
    speaker: 'subconscious',
    speakerLabel: 'Subconsciente',
    text: `Camo continúa hacia el siguiente y último paso de la transacción: seleccionar un <highlight color="#84cc16">método de financiación</highlight> para su iglú...`,
    illustration: {
      label: 'Escena 18: Camo en el sillón revisando las opciones de pago en su celular.'
    },
    next: 'scene_18_init_2'
  },
  'scene_18_init_2': {
    id: 'scene_18_init_2',
    speaker: 'subconscious',
    speakerLabel: 'Subconsciente',
    text: `La interfaz presenta <highlight color="#84cc16">tres planes de pago</highlight>. Uno de ellos está resaltado con bordes brillantes y un cartel de <heartbeat color="#84cc16">más popular</heartbeat> en un llamativo color verde
¿Quién lo esperaría?...
Camo <heartbeat color="#ef4444">AMA</heartbeat> el color <heartbeat color="#84cc16">Verde...</heartbeat>`,
    illustration: {
      label: 'Escena 18: Interfaz de selección de plan destacando la opción premium en verde.'
    },
    next: 'scene_18_init_3'
  },
  'scene_18_init_3': {
    id: 'scene_18_init_3',
    speaker: 'subconscious',
    speakerLabel: 'Subconsciente',
    text: `<tremble color="#2a256f">Curiosamente</tremble> los tres planes se encuentran listados uno al lado del otro.

Cada uno con sus detalles

Pero presentados con <sneaky color="#7ba077">colores distintos</sneaky> y <sneaky color="#7ba077">resaltando cosas diferentes...</sneaky>`,
    illustration: {
      label: 'Escena 18: Camo tentado a hacer clic en el botón premium de tasa nominal baja.'
    },
    next: 'scene_18_init_4'
  },
  'scene_18_init_4': {
    id: 'scene_18_init_4',
    speaker: 'subconscious',
    speakerLabel: 'Subconsciente',
    text: `Camo <wave color="#06b6d4">alertado</wave> por esto.
Decide <wave color="#06b6d4">calmar</wave> un poco su pasión por el color <heartbeat color="#84cc16">verde</heartbeat> y recuerda que los <sneaky color="#7ba077">mejores francotiradores</sneaky> siempre se esconden en las partes que <tremble color="#2a256f">menos te los esperas.</tremble>`,
    illustration: {
      label: 'Escena 18: Comparativa de plazos y tasas efectivas reales ocultas en la interfaz.'
    },
    next: 'scene_18_init_4b'
  },
  'scene_18_init_4b': {
    id: 'scene_18_init_4b',
    speaker: 'system',
    speakerLabel: 'Narrador',
    text: `<tremble color="#ef4444">¡Sigue el instinto de Camo y ayúdalo!</tremble>

Lee atentamente cada opción y ayúdalo a financiar su nuevo hogar de la mejor manera!`,
    illustration: {
      label: 'Escena 18: El efecto de precios de referencia manipulando la percepción de conveniencia.'
    },
    next: 'scene_18_choice'
  },
  'scene_18_choice': {
    id: 'scene_18_choice',
    speaker: 'system',
    speakerLabel: 'Narrador',
    text: `¡Camo está a punto de firmar un financiamiento abusivo de 20 años! ¡Ayúdalo a evaluar el costo financiero real y elegir correctamente!`,
    illustration: {
      label: 'Escena 18: La batalla mental entre Camo y el Patrón Oscuro, esperando tu decisión.'
    },
    choices: [
      {
        id: 'ref_c1',
        text: 'Camo no se deja deslumbrar por el color verde. Compara el tiempo y el costo final, y elige el Plan Estándar de 36 meses por ser el más conveniente.',
        nextNodeId: 'scene_18_resultado_1',
        isCorrect: true,
      },
      {
        id: 'ref_c2',
        text: 'Camo se deja llevar por el color verde y la tasa inicial que parece menor. Elige el Plan Premium de 20 años sin notar que terminará pagando un costo final mucho mayor y menos conveniente.',
        nextNodeId: 'scene_18_resultado_2',
        isCorrect: false,
      }
    ]
  },
  'scene_18_resultado_1': {
    id: 'scene_18_resultado_1',
    speaker: 'narrator',
    speakerLabel: 'Narrador',
    text: `Lees <wave color="#22d3ee">atentamente</wave> cada plan y que conlleva cada uno.

Te fijas que el color <heartbeat color="#84cc16">verde</heartbeat> era solo una <tremble color="#2a256f">distracción</tremble> para tomar tu atención y apresurarte a hacer una compra.

Eliges la opción con costo final más bajo!

<heartbeat color="#84cc16">¡Has evitado el patrón oscuro!</heartbeat>`,
    illustration: {
      label: 'Resultado 18-1: Camo seleccionando con éxito el Plan Estándar justo.'
    },
    next: 'scene_18_explicacion_1'
  },
  'scene_18_explicacion_1': {
    id: 'scene_18_explicacion_1',
    speaker: 'narrator',
    speakerLabel: 'Explicación del Patrón',
    text: `El <tremble color="#2a256f">Patrón Oscuro</tremble> que aplicó el enemigo fue <shake color="#06b6d4">Prevención de comparación</shake>

Este patrón consiste en usar colores, formas y texto para desviar la atención hacia un plan de pago en específico, muchas veces incluyendo planes de <sneaky color="#7ba077">"cebo"</sneaky> que buscan <sneaky color="#7ba077">distraer</sneaky> o aumentar la información que debe procesar el usuario.

Esto hace difícil muchas veces la comparación de cada plan, lo que lleva al usuario a elegir planes que no son siempre los <heartbeat color="#ef4444">más adecuados para él.</heartbeat>

leer más:
https://deceptive.design/types/comparison-prevention/`,
    illustration: {
      label: 'Explicación 18-1: Patrón derrotado con el núcleo apagado.'
    },
    next: 'scene_21_init_1'
  },
  'scene_18_resultado_2': {
    id: 'scene_18_resultado_2',
    speaker: 'narrator',
    speakerLabel: 'Narrador',
    text: `Camo elige el <highlight color="#84cc16">Plan Premium</highlight> deslumbrado por sus colores y presentación.

No advierte que tendrá que pagar por los <heartbeat color="#ef4444">¡240 meses siguientes!</heartbeat>

¡Has caído en el patrón oscuro!`,
    illustration: {
      label: 'Resultado 18-2: Camo lamentando el financiamiento a 20 años.'
    },
    next: 'scene_18_explicacion_2'
  },
  'scene_18_explicacion_2': {
    id: 'scene_18_explicacion_2',
    speaker: 'narrator',
    speakerLabel: 'Explicación del Patrón',
    text: `El <tremble color="#2a256f">Patrón Oscuro</tremble> que aplicó el enemigo fue <shake color="#06b6d4">Prevención de comparación</shake>

Este patrón consiste en usar colores, formas y texto para desviar la atención hacia un plan de pago en específico, muchas veces incluyendo planes de <sneaky color="#7ba077">"cebo"</sneaky> que buscan <sneaky color="#7ba077">distraer</sneaky> o aumentar la información que debe procesar el usuario.

Esto hace difícil muchas veces la comparación de cada plan, lo que lleva al usuario a elegir planes que no son siempre los <heartbeat color="#ef4444">más adecuados para él.</heartbeat>

leer más:
https://deceptive.design/types/comparison-prevention/`,
    illustration: {
      label: 'Explicación 18-2: Patrón alegre celebrando la firma del contrato abusivo.'
    },
    next: 'scene_18_choice'
  },
  // ─── Escena 21: Camo Revivido ───────────────────────────────────────────
  'scene_21_init_1': {
    id: 'scene_21_init_1',
    speaker: 'camo',
    speakerLabel: 'Camo',
    text: `<wave color="#7ba077">¡Muchas gracias, camarada!</wave>

He despertado y alejado de las garras del <tremble color="#2a256f">Patrón Oscuro</tremble> y sus <tremble color="#2a256f">engañosos patrones de diseño</tremble>

¡Siempre debo recordar las enseñanzas militares!
¡El enemigo más <sneaky color="#7ba077">sigiloso...</sneaky> es el más <heartbeat color="#ef4444">mortal!</heartbeat>`,
    illustration: {
      label: 'Escena 21: Camo de pie agradeciendo alegremente al protagonista.'
    },
    next: 'scene_21_init_2'
  },
  'scene_21_init_2': {
    id: 'scene_21_init_2',
    speaker: 'camo',
    speakerLabel: 'Camo',
    text: `Me has enseñado a ver más allá de los <highlight color="#84cc16">colores llamativos</highlight> y los elementos <wave color="#80ceff">convenientemente</wave> ubicados.

¡Ahora entiendo cómo operan estas interfaces y sus <tremble color="#2a256f">oscuros planes</tremble>!`,
    illustration: {
      label: 'Escena 21: Camo conversando con entusiasmo con el protagonista.'
    },
    next: 'scene_22_init_1'
  },
  // ─── Escena 22: Furia del Patrón ────────────────────────────────────────
  'scene_22_init_1': {
    id: 'scene_22_init_1',
    speaker: 'system',
    speakerLabel: 'Patrón Oscuro',
    text: `<tremble color="#ef4444">¡Malditos intrusos!</tremble> ¿Cómo se atreven a entrometerse en mi dominio y desbaratar mis planes para <heartbeat color="#2a256f">robar</heartbeat> la <heartbeat color="#2a256f">voluntad</heartbeat>, <heartbeat color="#2a2a6f">dinero</heartbeat> e <heartbeat color="#2a2a6f">información</heartbeat> a todos los pingüinos de este mundo!`,
    illustration: {
      label: 'Escena 22: El Patrón Oscuro retorciéndose con furia inestable en rojo y púrpura.'
    },
    next: 'scene_22_init_2'
  },
  'scene_22_init_2': {
    id: 'scene_22_init_2',
    speaker: 'system',
    speakerLabel: 'Patrón Oscuro',
    text: `¡Y tú, <heartbeat color="#ef4444">[nombre del jugador]</heartbeat>!

Quédate quieto y no <heartbeat color="#ef4444">intervengas</heartbeat> poniéndole ideas en la cabeza a los pingüinos!

¡No me sirve que estos tomen sus <wave color="#22d3ee">propias decisiones</wave>!`,
    illustration: {
      label: 'Escena 22: El Patrón Oscuro lanzando destellos hostiles hacia el Ojo Blanco.'
    },
    next: 'scene_23_init_1'
  },
  // ─── Escena 23: Huida y Reflexión Final ─────────────────────────────────
  'scene_23_init_1': {
    id: 'scene_23_init_1',
    speaker: 'narrator',
    speakerLabel: 'Narrador',
    text: `El Patrón Oscuro, enfurecido de <heartbeat color="#ef4444">tu intervención</heartbeat>, comienza a perder estabilidad y <wave color="#2a256f">huye</wave>, disipándose en las profundidades del <wave color="#22d3ee">subconsciente...</wave>`,
    illustration: {
      label: 'Escena 23: El Patrón Oscuro encogiéndose y huyendo al infinito.'
    },
    next: 'scene_23_init_2'
  },
  'scene_23_init_2': {
    id: 'scene_23_init_2',
    speaker: 'subconscious',
    speakerLabel: 'Subconsciente',
    text: `Hemos logrado salvar al primer espíritu de un pingüino
Liberándolo de las cadenas de la <tremble color="#2a256f">persuasión</tremble> mediante <tremble color="#2a256f">patrones oscuros...</tremble>`,
    illustration: {
      label: 'Escena 23: El protagonista y el Ojo contemplando un cielo estrellado y pacífico.'
    },
    next: 'scene_23_init_3'
  },
  'scene_23_init_3': {
    id: 'scene_23_init_3',
    speaker: 'subconscious',
    speakerLabel: 'Subconsciente',
    text: `Pero esto es solo el comienzo de nuestra travesía en este mundo.

Aún quedan muchas más almas que necesitan ser <wave color="#22d3ee">rescatadas</wave>.

Los <tremble color="#2a256f">patrones oscuros</tremble> tienen <heartbeat color="#ef4444">múltiples formas</heartbeat> y se presentan en <heartbeat color="#ef4444">múltiples lugares.</heartbeat>`,
    illustration: {
      label: 'Escena 23: El protagonista y el Ojo contemplando un cielo estrellado y pacífico.'
    },
    next: 'scene_11_end'
  },
  'scene_11_end': {
    id: 'scene_11_end',
    speaker: 'system',
    speakerLabel: 'Narrador',
    text: `¡Felicitaciones! Has completado con éxito la <heartbeat color="#2a256f">demo</heartbeat> de Antipatrón. ¡<heartbeat color="#ef4444">Muchas gracias</heartbeat> por jugar y aprender a identificar y combatir las trampas del <tremble color="#2a256f">patrón oscuro</tremble>!`,
    illustration: {
      label: 'Fin de la Demo de Narrativa.'
    },
    next: 'post-test-intro'
  }
}
