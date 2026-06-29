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
    text: 'Tu espíritu se encuentra desorientado, hay una "oscuridad" absoluta. No te queda más opción que #levantarte#.',
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
    text: 'Hey pequeño pingüino...\nes raro ver espíritus "conscientes" como tú estos días...\nla mayoría de ustedes se encuentran apagados por una "oscuridad" absoluta...\nel hecho de que estés aquí puede ser una señal.',
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
    text: 'No poseo un nombre...\ntampoco recuerdo el momento de mi creación...\nsolo sé que existo en un lugar apartado del mundo...\napartado de la razón...\nalgunos me llaman el "subconsciente".',
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
    text: 'Es una larga historia, en este mundo yacen los espíritus de la gente...\nmuchos han perdido su "luz", han sido "persuadidos" y se encuentran "dormidos"...\ncuriosamente tú pareces ser la excepción...',
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
    text: 'Es una larga historia, en este mundo yacen los espíritus de la gente...\nmuchos han perdido su "luz", han sido "persuadidos" y se encuentran "dormidos"...\ncuriosamente tú pareces ser la excepción...',
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
    text: 'No poseo un nombre...\ntampoco recuerdo el momento de mi creación...\nsolo sé que existo en un lugar apartado del mundo...\napartado de la razón...\nalgunos me llaman el "subconsciente".',
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
    text: 'Tal como pensaba, el hecho de tu llegada está cambiando algo...\n#Acompáñame#, siento un alma "levemente" despierta...',
    illustration: {
      label: 'Escena 4: El subconsciente comienza a moverse y el pingüino protagonista camina a su lado.'
    },
    next: 'scene_4_walking_transition'
  },
  'scene_4_walking_transition': {
    id: 'scene_4_walking_transition',
    speaker: 'system',
    speakerLabel: 'Narrador',
    text: 'Ambos caminan a través de la oscuridad. Una sutil energía entusiasta y militar y un aura distorsionada se perciben adelante...',
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
    text: 'Tal como tú antes de levantarte, esta alma se encuentra perdida, "oscurecida" y "persuadida"...\nA diferencia tuya, no parece querer levantarse solo...',
    illustration: {
      label: 'Escena 5: El protagonista observa el alma oscurecida de Camo durmiendo. El ojo también lo examina.'
    },
    next: 'scene_5_dialogue_2'
  },
  'scene_5_dialogue_2': {
    id: 'scene_5_dialogue_2',
    speaker: 'subconscious',
    speakerLabel: 'Subconsciente',
    text: 'Todas las almas de este mundo son iguales, una vez que el "Patrón" las consume.\nDejan de ser "conscientes" de lo que les pasó...\nlas consecuencias llegan tarde...',
    illustration: {
      label: 'Escena 5: El subconsciente explica cómo el Patrón consume a las almas indefensas.'
    },
    next: 'scene_6_dialogue_1'
  },
  'scene_6_dialogue_1': {
    id: 'scene_6_dialogue_1',
    speaker: 'subconscious',
    speakerLabel: 'Subconsciente',
    text: 'No es la única alma en este estado...\npero yo no puedo hacer nada...\nMi poder como "subconsciente" es solo mirar, absorber pero nunca "intervenir", tomo y obtengo todo aquello que el espíritu "ignora".',
    illustration: {
      label: 'Escena 6: El protagonista mira el resplandor en sus manos bajo la mirada del ojo.'
    },
    next: 'scene_6_dialogue_2'
  },
  'scene_6_dialogue_2': {
    id: 'scene_6_dialogue_2',
    speaker: 'subconscious',
    speakerLabel: 'Subconsciente',
    text: 'Pero tú eres diferente, puedo sentirlo, es como si pudieras "decidir" por tu cuenta, quizás...\nlos dos juntos podamos cambiar la historia de estos espíritus...\ndespertarlos...\nalejarlos de los "patrones oscuros" que los acechan.',
    illustration: {
      label: 'Escena 6: El subconsciente reconoce la singularidad del protagonista.'
    },
    next: 'scene_6_dialogue_3'
  },
  'scene_6_dialogue_3': {
    id: 'scene_6_dialogue_3',
    speaker: 'subconscious',
    speakerLabel: 'Subconsciente',
    text: 'Adentrémonos en la "historia" de este espíritu...\nvale la pena intentar #ayudarlo#.',
    illustration: {
      label: 'Escena 6: El protagonista decide adentrarse en la mente de Camo.'
    },
    next: 'scene_7_init'
  },
  'scene_7_init': {
    id: 'scene_7_init',
    speaker: 'narrator',
    speakerLabel: 'Narrador',
    text: 'Puedo ver su pasado...\nSu nombre era "Camo", el pingüino "sigiloso", dentro de la comarca "pingüinal", era conocido como el mejor francotirador.',
    illustration: {
      label: 'Escena 7: Camo en su podio militar con su rifle de francotirador.'
    },
    next: 'scene_7_dialogue_2'
  },
  'scene_7_dialogue_2': {
    id: 'scene_7_dialogue_2',
    speaker: 'narrator',
    speakerLabel: 'Narrador',
    text: 'Camo vestía su camuflaje con orgullo, y todo el mundo lo conocía por su pericia y aptitud frente a su rol de francotirador...\nEra especialmente "sigiloso"...\nmaestro del engaño y del escondite...\nnadie podía ser más "sigiloso" que él...\no eso él pensaba...',
    illustration: {
      label: 'Escena 7: Camo vistiendo su camuflaje con orgullo.'
    },
    next: 'scene_8_init'
  },
  'scene_8_init': {
    id: 'scene_8_init',
    speaker: 'narrator',
    speakerLabel: 'Narrador',
    text: 'Lamentablemente, como a muchos otros espíritus, este fue cegado por su ego...\ny fue víctima de los "patrones oscuros" los cuales lo llevaron a no tener "decisión propia"...',
    illustration: {
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
      label: 'Escena 9: Camo durmiendo plácidamente acechado por el teléfono y rodeado de dinero.'
    },
    next: 'scene_10_init'
  },
  'scene_10_init': {
    id: 'scene_10_init',
    speaker: 'narrator',
    speakerLabel: 'Narrador',
    text: 'Uno de sus mayores pasatiempos era recorrer y revisar páginas "comerciales" de productos en su celular...\npero como "Camo" ya no se encontraba en el campo de batalla, este perdió su rigurosidad y al no sentirse amenazado por enemigos...\nse dejó "llevar"...',
    illustration: {
      label: 'Escena 10: Catálogo del celular en grande para ver detalladamente la interfaz.'
    },
    next: 'scene_12_init_1'
  },
  'scene_12_init_1': {
    id: 'scene_12_init_1',
    speaker: 'narrator',
    speakerLabel: 'Narrador',
    text: 'Como cualquier otro día, Camo se encontraba "surfeando" páginas de compra en su celular...',
    illustration: {
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
      label: 'Escena 12: Camo con un celular gigante que despliega un iglú brillante caricaturesco.'
    },
    next: 'scene_11_init'
  },
  'scene_13_init_1': {
    id: 'scene_13_init_1',
    speaker: 'narrator',
    speakerLabel: 'Narrador',
    text: '¡Camo entró rápidamente a la página!',
    illustration: {
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
      label: 'Escena 13: La pantalla táctica gigante del celular inundada por pop-ups y anuncios persuasivos de compra compulsiva.'
    },
    next: 'scene_13_init_3'
  },
  'scene_13_init_3': {
    id: 'scene_13_init_3',
    speaker: 'subconscious',
    speakerLabel: 'Subconsciente',
    text: '¡Es el momento, toma las riendas y usa tu "conciencia" para ayudar a Camo! ¡Lucha contra el Patrón Oscuro y toma las riendas de tus decisiones!\nUsa el "conocimiento" de "sigilo" de Camo, ponte atento y no te dejes llevar por ilusiones!\nRecuerda: ¡el camino más llamativo y fácil casi nunca es el correcto!',
    illustration: {
      label: 'Escena 13: La pantalla táctica gigante del celular inundada por pop-ups y anuncios persuasivos de compra compulsiva.'
    },
    next: 'scene_14_init'
  },
  'scene_11_init': {
    id: 'scene_11_init',
    speaker: 'subconscious',
    speakerLabel: 'Subconsciente',
    text: 'A este paso la historia de Camo tendrá un trágico final, ayúdame "[nombre del jugador]", yo solo puedo narrar y absorber...\npero "TÚ" puedes hacer la diferencia!\nayuda a Camo a tomar la decisión correcta, tu "conciencia" frente a los "patrones oscuros" puede #ayudarlo#.',
    illustration: {
      label: 'Escena 11: Aleta de pingüino presionando el botón Pagar repetidamente.'
    },
    next: 'scene_13_init_1'
  },
  'scene_14_init': {
    id: 'scene_14_init',
    speaker: 'subconscious',
    speakerLabel: 'Subconsciente',
    text: '¡Te enfrentarás al Patrón Oscuro!\n¡Un ser que solo busca obtener su beneficio sin que te des cuenta!\nestá intentando aplicar "Anuncios Disfrazados" para manipular a Camo!\n¡Interviene y toma la decisión que ayude a Camo a combatir el Patrón Oscuro!',
    illustration: {
      label: 'Escena 14: Camo peleando con el Patrón Oscuro en un choque de energías.'
    },
    next: 'scene_14_choice'
  },
  'scene_14_choice': {
    id: 'scene_14_choice',
    speaker: 'system',
    speakerLabel: 'Narrador',
    text: '¿Cómo debe actuar Camo ante la avalancha de "Anuncios Disfrazados" del Patrón Oscuro?',
    illustration: {
      label: 'Escena 14: La batalla mental entre Camo y el Patrón Oscuro, esperando tu decisión.'
    },
    choices: [
      {
        id: 'camo_c1',
        text: 'Tomas desesperadamente el celular y presionas "todos los botones", pensando solo en ti, en tu iglú y un rico café caliente.',
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
    text: 'Luego de presionar todos los anuncios de las páginas, ¡se abren múltiples ventanas y se descargan múltiples archivos!, pero en su apuro, Camo ignora todo esto y prosigue por una página externa...\n\n¡Has caído en el patrón oscuro!',
    illustration: {
      label: 'Resultado 1: Camo asustado frente a un celular lleno de pop-ups y descargas maliciosas.'
    },
    next: 'scene_14_explicacion_1'
  },
  'scene_14_explicacion_1': {
    id: 'scene_14_explicacion_1',
    speaker: 'narrator',
    speakerLabel: 'Explicación del Patrón',
    text: 'El "Patrón Oscuro" del enemigo utilizado fue Sneaking (Sigilo) en combinación con Bait and Switch (Señuelo y Cambio) para ejecutar la técnica de "Disguised Ads" (Anuncios Disfrazados).\n\nEsto consiste en diseñar y maquillar anuncios de modo que parezcan elementos legítimos de la interfaz (botones de descarga, flechas de continuar, etc.). Los usuarios pulsan en ellos asumiendo que es una interacción válida del sitio, cayendo en descargas de software no deseado o redirecciones maliciosas.',
    illustration: {
      label: 'Explicación 1: Patrón alegre celebrando al haber engañado a Camo.'
    },
    next: 'scene_14_choice'
  },
  'scene_14_resultado_2': {
    id: 'scene_14_resultado_2',
    speaker: 'narrator',
    speakerLabel: 'Narrador',
    text: 'Avanzas exitosamente al siguiente paso de compra, pero te queda una pequeña desconfianza de la plataforma, la cual tenía un exceso de anuncios.\n\n¡Has evitado el patrón oscuro!',
    illustration: {
      label: 'Resultado 2: Camo concentrado encontrando el botón de reserva real entre anuncios atenuados.'
    },
    next: 'scene_14_explicacion_2'
  },
  'scene_14_explicacion_2': {
    id: 'scene_14_explicacion_2',
    speaker: 'narrator',
    speakerLabel: 'Explicación del Patrón',
    text: '¡Muy bien! Lograste superar el patrón de Disguised Ads (Anuncios Disfrazados).\nEl "Patrón Oscuro" del enemigo utilizado fue Sneaking (Sigilo) en combinación con Bait and Switch (Señuelo y Cambio) para ejecutar la técnica de "Disguised Ads" (Anuncios Disfrazados).\n\nEsto consiste en diseñar y maquillar anuncios de modo que parezcan elementos legítimos de la interfaz (botones de descarga, flechas de continuar, etc.). Los usuarios pulsan en ellos asumiendo que es una interacción válida del sitio, cayendo en descargas de software no deseado o redirecciones maliciosas.\n\nAl fijarte con atención, notaste la inconsistencia visual de los anuncios encubiertos. En la web, un diseño fuera de tema o inconsistente suele delatar fuentes patrocinadas o anuncios disfrazados. Detenerse y examinar la coherencia del diseño es una defensa fundamental.',
    illustration: {
      label: 'Explicación 2: Patrón derrotado con el núcleo apagado tras identificar la trampa.'
    },
    next: 'scene_15_init_1'
  },
  'scene_14_resultado_3': {
    id: 'scene_14_resultado_3',
    speaker: 'narrator',
    speakerLabel: 'Narrador',
    text: 'Luego de revisar cuidadosamente otras páginas y experiencias de usuarios confiables, te enteras que el estándar es usar "Polo Iglús", vas y buscas el mismo iglú en esta página segura.\n\n¡Has evitado el patrón oscuro!',
    illustration: {
      label: 'Resultado 3: Camo celebrando con su iglú verificado y seguro.'
    },
    next: 'scene_14_explicacion_3'
  },
  'scene_14_explicacion_3': {
    id: 'scene_14_explicacion_3',
    speaker: 'narrator',
    speakerLabel: 'Explicación del Patrón',
    text: '¡Muy bien! Lograste superar el patrón de Disguised Ads (Anuncios Disfrazados).\nEl "Patrón Oscuro" del enemigo utilizado fue Sneaking (Sigilo) en combinación con Bait and Switch (Señuelo y Cambio) para ejecutar la técnica de "Disguised Ads" (Anuncios Disfrazados).\n\nEsto consiste en diseñar y maquillar anuncios de modo que parezcan elementos legítimos de la interfaz (botones de descarga, flechas de continuar, etc.). Los usuarios pulsan en ellos asumiendo que es una interacción válida del sitio, cayendo en descargas de software no deseado o redirecciones maliciosas.',
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
    text: 'Una vez dentro del proceso de compra, Camo se enfrenta a la tediosa tarea de "confirmar todos los pasos para completar la compra"... sin perder la "paciencia".',
    illustration: {
      label: 'Escena 15: Camo en el sillón revisando el proceso de compra en su celular.'
    },
    next: 'scene_15_init_2'
  },
  'scene_15_init_2': {
    id: 'scene_15_init_2',
    speaker: 'subconscious',
    speakerLabel: 'Subconsciente',
    text: 'De otras experiencias, Camo sabe que la mayoría de páginas tienen el mismo proceso de compra...\npor lo que se prepara para repetir lo que está acostumbrado a hacer...',
    illustration: {
      label: 'Escena 15: Camo confiado, listo para presionar siguiente sin leer.'
    },
    next: 'scene_15_init_3'
  },
  'scene_15_init_3': {
    id: 'scene_15_init_3',
    speaker: 'subconscious',
    speakerLabel: 'Subconsciente',
    text: 'Así es, presionar siguiente "sin leer" ni una "aleta de pingüino"...',
    illustration: {
      label: 'Escena 15: Camo presionando siguiente repetidamente sin mirar la pantalla.'
    },
    next: 'scene_15_init_4'
  },
  'scene_15_init_4': {
    id: 'scene_15_init_4',
    speaker: 'subconscious',
    speakerLabel: 'Subconsciente',
    text: 'Sin saberlo, dentro de estos numerosos pasos, Camo no solo estaba pagando la totalidad de su iglú de ensueño, sino también un seguro opcional para cubrirlo en caso de que su iglú se viera afectado por "Bombas atómicas" enviadas por los pingüinos del "Polo Norte"...',
    illustration: {
      label: 'Escena 15: Pantalla del celular mostrando el seguro Anti-Bombardeo atómico en letra pequeña.'
    },
    next: 'scene_15_init_4b'
  },
  'scene_15_init_4b': {
    id: 'scene_15_init_4b',
    speaker: 'system',
    speakerLabel: 'Narrador',
    text: '¡NO HAY PINGÜINOS EN EL POLO NORTE! \nAsí es... un cobro mensual... Para ser un francotirador renombrado, Camo no esperaba mucho al navegar por internet...',
    illustration: {
      label: 'Escena 15: Revelación dramática - No hay pingüinos en el Polo Norte.'
    },
    next: 'scene_15_choice'
  },
  'scene_15_choice': {
    id: 'scene_15_choice',
    speaker: 'system',
    speakerLabel: 'Narrador',
    text: '¡Camo está por caer en otro "patrón oscuro", extiéndele una mano! ¡Es tu momento de ayudarlo!',
    illustration: {
      label: 'Escena 15: Camo ante la decisión de leer o presionar siguiente.'
    },
    choices: [
      {
        id: 'drip_c1',
        text: 'Recuerdas tus enseñanzas militares y, al haber ya evadido el primer "patrón oscuro", entras en un estado de alerta y "lees atentamente" cada paso y término antes de proceder al siguiente.',
        nextNodeId: 'scene_15_resultado_1',
        isCorrect: true,
      },
      {
        id: 'drip_c2',
        text: 'Ya confiado de haber superado la barrera de anuncios exitosamente, no piensas y presionas rápidamente el "llamativo" botón de siguiente.',
        nextNodeId: 'scene_15_resultado_2',
        isCorrect: false,
      }
    ]
  },
  'scene_15_resultado_1': {
    id: 'scene_15_resultado_1',
    speaker: 'narrator',
    speakerLabel: 'Narrador',
    text: 'Pasas atentamente por cada paso, te das cuenta de que el seguro de bombas atómicas es totalmente innecesario y que tendrías que pagar una "pingüinada" cada mes. Profundamente, Camo también piensa que podría dispararle a la bomba antes de que cayera... Sin duda Camo confía "excesivamente" en su habilidad... Camo decide optar por salir del seguro y sigue al final de la compra.\n\n¡Has evitado el patrón oscuro!',
    illustration: {
      label: 'Resultado 15-1: Camo con lupa, desmarcando el seguro innecesario.'
    },
    next: 'scene_15_explicacion_1'
  },
  'scene_15_explicacion_1': {
    id: 'scene_15_explicacion_1',
    speaker: 'narrator',
    speakerLabel: 'Explicación del Patrón',
    text: '¡Bien hecho! Lograste detectar el patrón de Drip Pricing (Precios por Goteo).\n\nEl Patrón Oscuro que aplicó el enemigo en este caso pertenece a la categoría general de Sneaking (Sigilo). A través de la técnica intermedia de Hiding Information (Ocultación de Información), ejecutó el patrón específico de Drip Pricing (Precios por Goteo) con éxito.\n\nConsiste en agregar un cargo oculto en un paso tardío del proceso de compra, contando con que el apuro y el esfuerzo ya invertido te llevarán a ignorarlo para no perder el tiempo dedicado.\n\nEste Patrón Oscuro aprovecha eso para aplicar cobros adicionales o extraer información personal.',
    illustration: {
      label: 'Explicación 15-1: Patrón derrotado con el núcleo apagado.'
    },
    next: 'scene_18_init_1'
  },
  'scene_15_resultado_2': {
    id: 'scene_15_resultado_2',
    speaker: 'narrator',
    speakerLabel: 'Narrador',
    text: 'Te apresuras y completas la compra con todos los "seguros" intermediarios. No te ves afectado por la decisión inmediatamente y en el fondo pagar una mensualidad sin ser "consciente" de ello no es relevante para Camo económicamente... pero no puedes dejar de sentir que están usando tu apuro y sentimiento para quitarte tu autonomía... tu alma se apaga nuevamente.\n\n¡Has caído en el patrón oscuro!',
    illustration: {
      label: 'Resultado 15-2: Camo asustado con el cobro mensual inesperado.'
    },
    next: 'scene_15_explicacion_2'
  },
  'scene_15_explicacion_2': {
    id: 'scene_15_explicacion_2',
    speaker: 'narrator',
    speakerLabel: 'Explicación del Patrón',
    text: 'El Patrón Oscuro que aplicó el enemigo en este caso pertenece a la categoría general de Sneaking (Sigilo). A través de la técnica intermedia de Hiding Information (Ocultación de Información), ejecutó el patrón específico de Drip Pricing (Precios por Goteo) con éxito.\n\nConsiste en agregar un cargo oculto en un paso tardío del proceso de compra, contando con que el apuro y el esfuerzo ya invertido te llevarán a ignorarlo para no perder el tiempo dedicado.\n\nEste Patrón Oscuro aprovecha eso para aplicar cobros adicionales o extraer información personal.',
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
    text: 'Al evadir el cobro de seguros ocultos, Camo continúa hacia el siguiente y último paso de la transacción: seleccionar un método de financiación para su iglú...',
    illustration: {
      label: 'Escena 18: Camo en el sillón revisando las opciones de pago en su celular.'
    },
    next: 'scene_18_init_2'
  },
  'scene_18_init_2': {
    id: 'scene_18_init_2',
    speaker: 'subconscious',
    speakerLabel: 'Subconsciente',
    text: 'La interfaz presenta tres planes de pago. Uno de ellos está resaltado con bordes brillantes y un cartel de "más popular" en un llamativo color verde...\n¿Quién lo esperaría?...\nCamo "AMA" el color "Verde"...',
    illustration: {
      label: 'Escena 18: Interfaz de selección de plan destacando la opción premium en verde.'
    },
    next: 'scene_18_init_3'
  },
  'scene_18_init_3': {
    id: 'scene_18_init_3',
    speaker: 'subconscious',
    speakerLabel: 'Subconsciente',
    text: 'Este Plan Premium promete una tasa de interés del "3.5% TNA" (Tasa Nominal Anual, que es el interés base anual sin incluir cargos adicionales), que a simple vista parece menor y más conveniente que la del Plan Estándar del "8.9% TNA". \nCamo siente la inercia de seleccionar el botón verde inmediatamente, con mayor fuerza...',
    illustration: {
      label: 'Escena 18: Camo tentado a hacer clic en el botón premium de tasa nominal baja.'
    },
    next: 'scene_18_init_4'
  },
  'scene_18_init_4': {
    id: 'scene_18_init_4',
    speaker: 'subconscious',
    speakerLabel: 'Subconsciente',
    text: 'Sin embargo, Camo no advierte la trampa oculta: el llamativo Plan Premium lo obligará a pagar durante "240 meses" (¡20 largos años!) a un interés real del "45.2% TEA" (Tasa Efectiva Anual, que es el interés real que terminas pagando al año incluyendo todos los cargos adicionales y comisiones), resultando en un costo total mucho mayor y menos conveniente que el Plan Estándar, el cual se liquida en solo "36 meses" con un "9.5% TEA" total, siendo este el plan más conveniente.',
    illustration: {
      label: 'Escena 18: Comparativa de plazos y tasas efectivas reales ocultas en la interfaz.'
    },
    next: 'scene_18_init_4b'
  },
  'scene_18_init_4b': {
    id: 'scene_18_init_4b',
    speaker: 'system',
    speakerLabel: 'Narrador',
    text: 'El sistema destaca una tasa de interés menor como "ancla de referencia" visual para atraer su atención, y coloca opciones peores al lado para empujarlo a elegir el plan más costoso pensando que es una gran oferta.',
    illustration: {
      label: 'Escena 18: El efecto de precios de referencia manipulando la percepción de conveniencia.'
    },
    next: 'scene_18_choice'
  },
  'scene_18_choice': {
    id: 'scene_18_choice',
    speaker: 'system',
    speakerLabel: 'Narrador',
    text: '¡Camo está a punto de firmar un financiamiento abusivo de 20 años! ¡Ayúdalo a evaluar el costo financiero real y elegir correctamente!',
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
    text: 'Camo detecta que el "Plan Premium" tiene un plazo de 20 años y un costo final mucho mayor que lo atará de por vida. Identifica que esa opción no es la más conveniente y decide seleccionar el Plan Estándar de 36 meses, pagando mucho menos en total.\n\n¡Has evitado el patrón oscuro!',
    illustration: {
      label: 'Resultado 18-1: Camo seleccionando con éxito el Plan Estándar justo.'
    },
    next: 'scene_18_explicacion_1'
  },
  'scene_18_explicacion_1': {
    id: 'scene_18_explicacion_1',
    speaker: 'narrator',
    speakerLabel: 'Explicación del Patrón',
    text: '¡Bien hecho! Lograste detectar el patrón de Reference Pricing (Precios de Referencia).\n\nEl Patrón Oscuro que aplicó el enemigo en este caso pertenece a la categoría general de Sneaking (Sigilo). A través de la técnica intermedia de Hiding Information (Ocultación de Información), ejecutó el patrón específico de Reference Pricing (Precios de Referencia) con éxito.\n\nConsiste en destacar visualmente un interés mensual menor como referencia engañosa para empujar al usuario a elegir un plan con un plazo y costo total mucho mayores y menos convenientes.\n\nEste Patrón Oscuro aprovecha eso para guiar las decisiones del usuario hacia la alternativa que genera mayor ganancia para la plataforma y menos conveniencia para ti.',
    illustration: {
      label: 'Explicación 18-1: Patrón derrotado con el núcleo apagado.'
    },
    next: 'scene_21_init_1'
  },
  'scene_18_resultado_2': {
    id: 'scene_18_resultado_2',
    speaker: 'narrator',
    speakerLabel: 'Narrador',
    text: 'Camo elige el Plan Premium deslumbrado por una tasa de interés que parecía menor. No advierte que el plazo de 240 meses implica un costo final mucho mayor y menos conveniente para su bolsillo. Ha aceptado un plan abusivo por una ilusión de descuento promovida por un plan verde e imponente.\n\n¡Has caído en el patrón oscuro!',
    illustration: {
      label: 'Resultado 18-2: Camo lamentando el financiamiento a 20 años.'
    },
    next: 'scene_18_explicacion_2'
  },
  'scene_18_explicacion_2': {
    id: 'scene_18_explicacion_2',
    speaker: 'narrator',
    speakerLabel: 'Explicación del Patrón',
    text: 'El Patrón Oscuro que aplicó el enemigo en este caso pertenece a la categoría general de Sneaking (Sigilo). A través de la técnica intermedia de Hiding Information (Ocultación de Información), ejecutó el patrón específico de Reference Pricing (Precios de Referencia) con éxito.\n\nConsiste en destacar visualmente un interés mensual menor como referencia engañosa para empujar al usuario a elegir un plan con un plazo y costo total mucho mayores y menos convenientes.\n\nEste Patrón Oscuro aprovecha eso para guiar las decisiones del usuario hacia la alternativa que genera mayor ganancia para la plataforma y menos conveniencia para ti.',
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
    text: '¡Muchas gracias, camarada!\nAl ayudarme a evadir las garras del Patrón Oscuro y sus engañosos patrones de diseño, salvaste mi subconsciente y evitaste que "tomara decisiones sin darme cuenta"...\n¡Siempre debo recordar las enseñanzas militares!\n¡El enemigo más sigiloso... es el más mortal!',
    illustration: {
      label: 'Escena 21: Camo de pie agradeciendo alegremente al protagonista.'
    },
    next: 'scene_21_init_2'
  },
  'scene_21_init_2': {
    id: 'scene_21_init_2',
    speaker: 'camo',
    speakerLabel: 'Camo',
    text: 'Me has enseñado a ver más allá de los colores llamativos y los elementos convenientemente ubicados. ¡Ahora entiendo cómo operan estas interfaces oscuras y sus oscuros planes!\n¡Usan el "sigilo" para "adentrarse en nuestras decisiones"!',
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
    text: '¡Malditos intrusos! ¿Cómo se atreven a entrometerse en mi dominio y desbaratar mis planes de "robo de voluntad"?',
    illustration: {
      label: 'Escena 22: El Patrón Oscuro retorciéndose con furia inestable en rojo y púrpura.'
    },
    next: 'scene_22_init_2'
  },
  'scene_22_init_2': {
    id: 'scene_22_init_2',
    speaker: 'system',
    speakerLabel: 'Patrón Oscuro',
    text: '¡Y tú, "subconsciente", quédate quieto y no intervengas poniéndole ideas en la cabeza a los pingüinos!\n¡No me sirve que estos tomen sus propias decisiones!\nNo permitiré que arruines mi sagrada misión de engañarlos y arrebatarles su "poder de decisión y voluntad"...',
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
    text: 'El Patrón Oscuro, incapaz de resistir la fuerza de la verdad revelada, comienza a perder estabilidad y huye, disipándose en las profundidades del subconsciente...',
    illustration: {
      label: 'Escena 23: El Patrón Oscuro encogiéndose y huyendo al infinito.'
    },
    next: 'scene_23_init_2'
  },
  'scene_23_init_2': {
    id: 'scene_23_init_2',
    speaker: 'subconscious',
    speakerLabel: 'Subconsciente',
    text: 'Hemos logrado salvar al primer espíritu de un pingüino, liberándolo de las cadenas de la "manipulación" mediante "patrones oscuros"...',
    illustration: {
      label: 'Escena 23: El protagonista y el Ojo contemplando un cielo estrellado y pacífico.'
    },
    next: 'scene_23_init_3'
  },
  'scene_23_init_3': {
    id: 'scene_23_init_3',
    speaker: 'subconscious',
    speakerLabel: 'Subconsciente',
    text: 'Pero esto es solo el comienzo de nuestra travesía en este mundo. Aún quedan muchas más almas que necesitan ser rescatadas y aprender a defender su "autonomía"...',
    illustration: {
      label: 'Escena 23: El protagonista y el Ojo contemplando un cielo estrellado y pacífico.'
    },
    next: 'scene_11_end'
  },
  'scene_11_end': {
    id: 'scene_11_end',
    speaker: 'system',
    speakerLabel: 'Narrador',
    text: '¡Felicitaciones! Has completado con éxito la demo de Antipatrón. Muchas gracias por jugar y aprender a identificar y combatir las trampas del diseño de interfaces.',
    illustration: {
      label: 'Fin de la Demo de Narrativa.'
    },
    next: 'post-test-intro'
  }
}
