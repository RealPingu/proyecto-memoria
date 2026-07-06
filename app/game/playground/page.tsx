'use client';

import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import Scene1Sleeping from './components/scene_1_sleeping';
import Scene2Encounter from './components/scene_2_encounter';
import Scene3Questioning from './components/scene_3_questioning';
import Scene4Walking from './components/scene_4_walking';
import Scene5Approaching from './components/scene_5_approaching';
import Scene6Glow from './components/scene_6_glow';
import Scene7Sniper from './components/scene_7_sniper';
import Scene8DarkPattern from './components/scene_8_dark_pattern';
import Scene9CelularPagar from './components/scene_9_celular_pagar';
import Scene10CelularGrande from './components/scene_10_celular_grande';
import Scene11AletaPagar from './components/scene_11_aleta_pagar';
import Scene12Iglu from './components/scene_12_iglu';
import Scene13Anuncios from './components/scene_13_anuncios';
import Scene14Batalla from './components/scene_14_batalla';
import Scene15DripPricing from './components/scene_15_drip_pricing';
import Scene16CelularCheckout from './components/scene_16_celular_checkout';
import Scene17Batalla from './components/scene_17_batalla';
import Scene18ReferencePricing from './components/scene_18_reference_pricing';
import Scene19CelularReference from './components/scene_19_celular_reference';
import Scene20Batalla from './components/scene_20_batalla';
import Scene21CamoRevivido from './components/scene_21_camo_revivido';
import Scene22PatronHostil from './components/scene_22_patron_hostil';
import Scene23DesenlaceFinal from './components/scene_23_desenlace_final';

interface SceneItem {
  id: string;
  number: number;
  title: string;
  subtitle: string;
  description: string;
  path: string;
  available: boolean;
  preview?: React.ReactNode;
}

export default function SceneMenuPage() {
  const router = useRouter();

  const scenes: SceneItem[] = [
    {
      id: 'scene_1',
      number: 1,
      title: 'El Sueño del Jugador',
      subtitle: 'Escena 1 — Prólogo / Limbo',
      description: 'Edita el diseño del espíritu del jugador acostado durmiendo. Controla las variantes de accesorios y las animaciones de respiración y burbuja de sueño.',
      path: '/game/playground/scene/scene_1',
      available: true,
      preview: (
        <div className="w-full h-full bg-black/60 relative overflow-hidden rounded border border-zinc-800/80">
          <Scene1Sleeping />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />
        </div>
      )
    },
    {
      id: 'scene_2',
      number: 2,
      title: 'El Encuentro Subconsciente',
      subtitle: 'Escena 2 — El Umbral',
      description: 'El pingüino asombrado se encuentra cara a cara con el Ojo Blanco del subconsciente. Edita la animación y accesorios.',
      path: '/game/playground/scene/scene_2',
      available: true,
      preview: (
        <div className="w-full h-full bg-black/60 relative overflow-hidden rounded border border-zinc-800/80">
          <Scene2Encounter />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />
        </div>
      )
    },
    {
      id: 'scene_3',
      number: 3,
      title: 'El Diálogo / La Pregunta',
      subtitle: 'Escena 3 — Diálogo Subconsciente',
      description: 'El pingüino parado estático y el Ojo Blanco del subconsciente. Se configuran y animan los signos de pregunta ?? flotando.',
      path: '/game/playground/scene/scene_3',
      available: true,
      preview: (
        <div className="w-full h-full bg-black/60 relative overflow-hidden rounded border border-zinc-800/80">
          <Scene3Questioning />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />
        </div>
      )
    },
    {
      id: 'scene_4',
      number: 4,
      title: 'Avanzando Juntos',
      subtitle: 'Escena 4 — Portal de Retorno',
      description: 'El pingüino y el Ojo Blanco avanzan juntos hacia la luz. Edita la animación y accesorios del ojo.',
      path: '/game/playground/scene/scene_4',
      available: true,
      preview: (
        <div className="w-full h-full bg-black/60 relative overflow-hidden rounded border border-zinc-800/80">
          <Scene4Walking />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />
        </div>
      )
    },
    {
      id: 'scene_5',
      number: 5,
      title: 'El Alma de Camo',
      subtitle: 'Escena 5 — Diseñador de Camo',
      description: 'El protagonista y Camo se aproximan al alma. Personaliza a Camo con camuflaje militar, casco, arnés y visor táctico.',
      path: '/game/playground/scene/scene_5',
      available: true,
      preview: (
        <div className="w-full h-full bg-black/60 relative overflow-hidden rounded border border-zinc-800/80">
          <Scene5Approaching />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />
        </div>
      )
    },
    {
      id: 'scene_6',
      number: 6,
      title: 'El Despertar de Camo',
      subtitle: 'Escena 6 — Resplandor en las Manos',
      description: 'Camo despierta y mira hacia abajo sus aletas, las cuales emiten un resplandor mágico, mientras el Ojo Blanco lo observa desde arriba.',
      path: '/game/playground/scene/scene_6',
      available: true,
      preview: (
        <div className="w-full h-full bg-black/60 relative overflow-hidden rounded border border-zinc-800/80">
          <Scene6Glow />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />
        </div>
      )
    },
    {
      id: 'scene_7',
      number: 7,
      title: 'Camo el Francotirador',
      subtitle: 'Escena 7 — El Pingüino Sigiloso',
      description: 'Muestra a Camo posando con orgullo en su podio militar con su rifle de francotirador, simbolizando su rol previo a ser oscurecido.',
      path: '/game/playground/scene/scene_7',
      available: true,
      preview: (
        <div className="w-full h-full bg-black/60 relative overflow-hidden rounded border border-zinc-800/80">
          <Scene7Sniper />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />
        </div>
      )
    },
    {
      id: 'scene_8',
      number: 8,
      title: 'Camo y el Patrón Oscuro',
      subtitle: 'Escena 8 — La Persuasión',
      description: 'Camo cae víctima de los patrones oscuros y es consumido por la oscuridad, acechado por la columna flotante del Patrón.',
      path: '/game/playground/scene/scene_8',
      available: true,
      preview: (
        <div className="w-full h-full bg-black/60 relative overflow-hidden rounded border border-zinc-800/80">
          <Scene8DarkPattern />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />
        </div>
      )
    },
    {
      id: 'scene_9',
      number: 9,
      title: 'El Letargo Comercial',
      subtitle: 'Escena 9 — Celular y Pago',
      description: 'Muestra a Camo navegando por páginas comerciales en su celular e hipnotizado por la facilidad de compra, rodeado de Dólares pingüinales.',
      path: '/game/playground/scene/scene_9',
      available: true,
      preview: (
        <div className="w-full h-full bg-black/60 relative overflow-hidden rounded border border-zinc-800/80">
          <Scene9CelularPagar />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />
        </div>
      )
    },
    {
      id: 'scene_10',
      number: 10,
      title: 'Interfaz Ampliada',
      subtitle: 'Escena 10 — Celular en Grande',
      description: 'Muestra la interfaz del celular en grande para detallar las páginas comerciales del catálogo e-commerce.',
      path: '/game/playground/scene/scene_10',
      available: true,
      preview: (
        <div className="w-full h-full bg-black/60 relative overflow-hidden rounded border border-zinc-800/80 flex items-center justify-center p-2">
          <div className="w-[85px] h-[100px]">
            <Scene10CelularGrande />
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />
        </div>
      )
    },
    {
      id: 'scene_11',
      number: 11,
      title: 'Aleteo de Pago',
      subtitle: 'Escena 11 — Aleta Presionando Pagar',
      description: 'Muestra primer plano de la aleta de pingüino slameando el botón de Pagar repetidamente.',
      path: '/game/playground/scene/scene_11',
      available: true,
      preview: (
        <div className="w-full h-full bg-black/60 relative overflow-hidden rounded border border-zinc-800/80">
          <Scene11AletaPagar />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />
        </div>
      )
    },
    {
      id: 'scene_12',
      number: 12,
      title: 'El Iglú de Ensueño',
      subtitle: 'Escena 12 — Camo viendo el Iglú',
      description: 'Muestra a Camo relajado en el sillón visualizando el Iglú Mediterráneo brillante en la pantalla táctica ampliada.',
      path: '/game/playground/scene/scene_12',
      available: true,
      preview: (
        <div className="w-full h-full bg-black/60 relative overflow-hidden rounded border border-zinc-800/80">
          <Scene12Iglu />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />
        </div>
      )
    },
    {
      id: 'scene_13',
      number: 13,
      title: 'Los Anuncios Caóticos',
      subtitle: 'Escena 13 — Camo y los Anuncios',
      description: 'Muestra la pantalla táctica gigante del celular inundada por pop-ups y anuncios persuasivos de compra compulsiva.',
      path: '/game/playground/scene/scene_13',
      available: true,
      preview: (
        <div className="w-full h-full bg-black/60 relative overflow-hidden rounded border border-zinc-800/80">
          <Scene13Anuncios />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />
        </div>
      )
    },
    {
      id: 'scene_14',
      number: 14,
      title: 'La Batalla Mental',
      subtitle: 'Escena 14 — Árbol de Decisión',
      description: 'Interactúa con la confrontación mental entre Camo y el Patrón Oscuro para tomar la decisión correcta.',
      path: '/game/playground/scene/scene_14',
      available: true,
      preview: (
        <div className="w-full h-full bg-black/60 relative overflow-hidden rounded border border-zinc-800/80">
          <Scene14Batalla />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />
        </div>
      )
    },
    {
      id: 'scene_14v2',
      number: 14.2,
      title: 'La Batalla Mental v2 (Mockup)',
      subtitle: 'Escena 14 v2 — Mockup Móvil',
      description: 'Prueba la alternativa de batalla interactiva de Camo con el teléfono móvil simulado y anuncios disguised.',
      path: '/game/playground/scene/scene_14v2',
      available: true,
      preview: (
        <div className="w-full h-full bg-black/60 relative overflow-hidden rounded border border-zinc-800/80 flex items-center justify-center">
          <span className="text-[10px] font-mono text-cyan-400">📲 INTERFAZ MÓVIL v2</span>
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />
        </div>
      )
    },
    {
      id: 'scene_14v3',
      number: 14.3,
      title: 'La Batalla Mental v3 (M3 Spec)',
      subtitle: 'Escena 14 v3 — Spec Material 3',
      description: 'Prueba el mockup de batalla interactiva adaptado según las especificaciones de diseño M3.',
      path: '/game/playground/scene/scene_14v3',
      available: true,
      preview: (
        <div className="w-full h-full bg-black/60 relative overflow-hidden rounded border border-zinc-800/80 flex items-center justify-center">
          <span className="text-[10px] font-mono text-purple-400">📱 INTERFAZ M3 SPEC v3</span>
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />
        </div>
      )
    },
    {
      id: 'scene_14v5',
      number: 14.5,
      title: 'La Batalla Mental v5 (Rediseño)',
      subtitle: 'Escena 14 v5 — Minefield Narrativa',
      description: 'Prueba la caja de diálogo narrativa convertida en un campo minado de anuncios y decisiones camufladas.',
      path: '/game/playground/scene/scene_14v5',
      available: true,
      preview: (
        <div className="w-full h-full bg-black/60 relative overflow-hidden rounded border border-zinc-800/80 flex items-center justify-center">
          <span className="text-[10px] font-mono text-amber-400">👾 MINEFIELD DIÁLOGO v5</span>
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />
        </div>
      )
    },
    {
      id: 'scene_15',
      number: 15,
      title: 'Camo y el Drip Pricing',
      subtitle: 'Escena 15 — Introducción',
      description: 'Camo descansa en su sillón mientras el Patrón Oscuro oculta un cobro mensual en su celular.',
      path: '/game/playground/scene/scene_15',
      available: true,
      preview: (
        <div className="w-full h-full bg-black/60 relative overflow-hidden rounded border border-zinc-800/80">
          <Scene15DripPricing />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />
        </div>
      )
    },
    {
      id: 'scene_15v2',
      number: 15,
      title: 'Camo y el Drip Pricing (Interactiva)',
      subtitle: 'Escena 15 v2 — Checkout por Pasos',
      description: 'Interactúa con el asistente de checkout y descubre las casillas de Drip Pricing camufladas en gris.',
      path: '/game/playground/scene/scene_15v2',
      available: true,
      preview: (
        <div className="w-full h-full bg-black/60 relative overflow-hidden rounded border border-zinc-800/80">
          <Scene15DripPricing />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />
          <div className="absolute top-1 right-1 bg-sky-500/85 text-[7px] text-white px-1 font-bold rounded uppercase">Interactiva</div>
        </div>
      )
    },
    {
      id: 'scene_16',
      number: 16,
      title: 'El Proceso de Compra',
      subtitle: 'Escena 16 — Zoom del Celular',
      description: 'El celular de Camo en primer plano revela el seguro anti-bomba atómica pre-marcado entre los pasos del checkout.',
      path: '/game/playground/scene/scene_16',
      available: true,
      preview: (
        <div className="w-full h-full bg-black/60 relative overflow-hidden rounded border border-zinc-800/80">
          <Scene16CelularCheckout />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />
        </div>
      )
    },
    {
      id: 'scene_17',
      number: 17,
      title: 'La Batalla — Drip Pricing',
      subtitle: 'Escena 17 — Árbol de Decisión',
      description: 'Ayuda a Camo a detectar el cobro mensual oculto. El Patrón Oscuro porta en su mano el celular trampa.',
      path: '/game/playground/scene/scene_17',
      available: true,
      preview: (
        <div className="w-full h-full bg-black/60 relative overflow-hidden rounded border border-zinc-800/80">
          <Scene17Batalla />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />
        </div>
      )
    },
    {
      id: 'scene_18',
      number: 18,
      title: 'Camo y el Reference Pricing',
      subtitle: 'Escena 18 — Introducción',
      description: 'Camo descansa en su sillón mientras el Patrón Oscuro se esconde y presenta precios de referencia anclados en su celular.',
      path: '/game/playground/scene/scene_18',
      available: true,
      preview: (
        <div className="w-full h-full bg-black/60 relative overflow-hidden rounded border border-zinc-800/80">
          <Scene18ReferencePricing />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />
        </div>
      )
    },
    {
      id: 'scene_19',
      number: 19,
      title: 'Selección de Plan',
      subtitle: 'Escena 19 — Celular en Grande',
      description: 'Detalle en pantalla completa de los planes financieros con la tasa de interés nominal y efectiva.',
      path: '/game/playground/scene/scene_19',
      available: true,
      preview: (
        <div className="w-full h-full bg-black/60 relative overflow-hidden rounded border border-zinc-800/80">
          <Scene19CelularReference />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />
        </div>
      )
    },
    {
      id: 'scene_20',
      number: 20,
      title: 'La Batalla — Reference Pricing',
      subtitle: 'Escena 20 — Árbol de Decisión',
      description: 'Ayuda a Camo a elegir el plan correcto evaluando la TEA real. El Patrón Oscuro porta el celular con planes anclados.',
      path: '/game/playground/scene/scene_20',
      available: true,
      preview: (
        <div className="w-full h-full bg-black/60 relative overflow-hidden rounded border border-zinc-800/80">
          <Scene20Batalla />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />
        </div>
      )
    },
    {
      id: 'scene_20v2',
      number: 20,
      title: 'La Batalla — Reference Pricing (Interactiva)',
      subtitle: 'Escena 20 v2 — Carrusel Rotable',
      description: 'Interactúa con el carrusel de planes rotables en la caja de diálogo para evadir la trampa de Reference Pricing.',
      path: '/game/playground/scene/scene_20v2',
      available: true,
      preview: (
        <div className="w-full h-full bg-black/60 relative overflow-hidden rounded border border-zinc-800/80">
          <Scene20Batalla />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />
          <div className="absolute top-1 right-1 bg-sky-500/85 text-[7px] text-white px-1 font-bold rounded uppercase">Interactiva</div>
        </div>
      )
    },
    {
      id: 'scene_21',
      number: 21,
      title: 'El Retorno del Alma',
      subtitle: 'Escena 21 — Fusión y Liberación',
      description: 'Camo es liberado del patrón de Reference Pricing. Su alma entra en él y recupera todo su color.',
      path: '/game/playground/scene/scene_21',
      available: true,
      preview: (
        <div className="w-full h-full bg-black/60 relative overflow-hidden rounded border border-zinc-800/80">
          <Scene21CamoRevivido />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />
        </div>
      )
    },
    {
      id: 'scene_22',
      number: 22,
      title: 'La Furia del Patrón',
      subtitle: 'Escena 22 — Confrontación',
      description: 'El Patrón Oscuro reacciona furioso y amenaza al Subconsciente por arrebatarle el control del pingüino.',
      path: '/game/playground/scene/scene_22',
      available: true,
      preview: (
        <div className="w-full h-full bg-black/60 relative overflow-hidden rounded border border-zinc-800/80">
          <Scene22PatronHostil />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />
        </div>
      )
    },
    {
      id: 'scene_23',
      number: 23,
      title: 'Fuga y Reflexión',
      subtitle: 'Escena 23 — Cierre de Demo',
      description: 'El Patrón Oscuro huye al infinito. El Protagonista y el Ojo contemplan el firmamento estrellado.',
      path: '/game/playground/scene/scene_23',
      available: true,
      preview: (
        <div className="w-full h-full bg-black/60 relative overflow-hidden rounded border border-zinc-800/80">
          <Scene23DesenlaceFinal />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />
        </div>
      )
    },
    {
      id: 'scene_text_effects',
      number: 24,
      title: 'Efectos de Texto',
      subtitle: 'Laboratorio de Animaciones',
      description: 'Diferentes estilos de renderizado y animación secuencial, cromática y de rebote para enriquecer los diálogos de la novela visual.',
      path: '/game/playground/scene/scene_text_effects',
      available: true,
      preview: (
        <div className="w-full h-full bg-black/60 relative overflow-hidden rounded border border-zinc-800/80 flex flex-col items-center justify-center p-4">
          <span className="text-[10px] font-mono text-purple-400 uppercase tracking-widest block mb-1">TEXT EFFECT LAB</span>
          <div className="text-[10px] font-bold text-white px-2 py-0.5 rounded bg-zinc-900 border border-zinc-800 shadow">
            [ A Animación A ]
          </div>
        </div>
      )
    },
    {
      id: 'scene_dialogue_editor',
      number: 25,
      title: 'Editor de Diálogos',
      subtitle: 'Personalizador de Efectos y Colores',
      description: 'Examina, edita y diseña los textos de todas las escenas de la historia. Selecciona fragmentos de texto para aplicarles colores y efectos de animación interactiva.',
      path: '/game/playground/scene/scene_dialogue_editor',
      available: true,
      preview: (
        <div className="w-full h-full bg-black/60 relative overflow-hidden rounded border border-zinc-800/80 flex flex-col items-center justify-center p-4">
          <span className="text-[10px] font-mono text-emerald-400 uppercase tracking-widest block mb-1">TEXT CUSTOMIZER</span>
          <div className="text-[10px] font-bold text-white px-2 py-0.5 rounded bg-zinc-900 border border-zinc-800 shadow">
            [ Editor de Diálogos ]
          </div>
        </div>
      )
    },
    {
      id: 'scene_marking_designer',
      number: 26,
      title: 'Diseñador de Marcado',
      subtitle: 'Bounding Boxes para Evaluación',
      description: 'Dibuja rectángulos sobre las 8 interfaces del pre/post test de marcado. Genera y copia automáticamente las coordenadas porcentuales correctas.',
      path: '/game/playground/scene/marking_designer',
      available: true,
      preview: (
        <div className="w-full h-full bg-black/60 relative overflow-hidden rounded border border-zinc-800/80 flex flex-col items-center justify-center p-4">
          <span className="text-[10px] font-mono text-emerald-400 uppercase tracking-widest block mb-1">BOUNDING BOX DESIGNER</span>
          <div className="text-[10px] font-bold text-white px-2 py-0.5 rounded bg-zinc-900 border border-zinc-800 shadow">
            [ Coordenadas de Marcado ]
          </div>
        </div>
      )
    },
    {
      id: 'scene_marking_simulator',
      number: 27,
      title: 'Simulador de Marcado',
      subtitle: 'Simulación Pre y Post-Test',
      description: 'Prueba la secuencia de evaluación completa (Pre-Test y Post-Test) con las 8 vistas y la lógica de Matriz de Confusión antes de ir a producción.',
      path: '/game/playground/scene/marking_simulator',
      available: true,
      preview: (
        <div className="w-full h-full bg-black/60 relative overflow-hidden rounded border border-zinc-800/80 flex flex-col items-center justify-center p-4">
          <span className="text-[10px] font-mono text-teal-400 uppercase tracking-widest block mb-1">MARKING SIMULATOR</span>
          <div className="text-[10px] font-bold text-white px-2 py-0.5 rounded bg-zinc-900 border border-zinc-800 shadow">
            [ Simulación Pre/Post-Test ]
          </div>
        </div>
      )
    }


  ];

  return (
    <div className="min-h-screen w-screen bg-[#050508] text-zinc-200 flex flex-col p-4 md:p-8 font-sans overflow-y-auto custom-scrollbar">
      
      {/* Background Decorative Glows */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-emerald-500/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-indigo-500/5 rounded-full blur-[140px] pointer-events-none" />

      {/* Main Container */}
      <div className="max-w-5xl w-full mx-auto flex-1 flex flex-col relative z-10">
        
        {/* Header */}
        <header className="flex flex-col md:flex-row justify-between items-start md:items-center border-b border-zinc-900 pb-5 mb-8 shrink-0">
          <div className="space-y-1">
            <h1 className="text-xs font-mono uppercase tracking-widest text-emerald-400 font-bold">
              Playground de Escenas
            </h1>
            <p className="text-lg font-medium text-white tracking-tight">
              Editor Visual de Ilustraciones SVG
            </p>
            <p className="text-[10px] text-zinc-500 uppercase tracking-wider font-mono">
              Entorno local para la personalización y optimización de assets narrativos
            </p>
          </div>
          
          <button
            onClick={() => router.push('/game/narrative')}
            className="mt-4 md:mt-0 text-[10px] font-mono uppercase tracking-wider border border-zinc-800 hover:border-emerald-500/50 hover:text-emerald-400 px-4 py-2 text-zinc-400 bg-zinc-950/20 backdrop-blur-sm transition rounded cursor-pointer active:scale-95 shadow-md"
          >
            Volver al Juego
          </button>
        </header>

        {/* Info Banner */}
        <div className="bg-emerald-950/10 border border-emerald-900/30 rounded p-4 mb-8 flex items-start space-x-3">
          <div className="text-emerald-400 mt-0.5 text-xs">💡</div>
          <div className="space-y-1">
            <h4 className="text-[10px] font-mono font-bold uppercase tracking-wider text-emerald-400">
              Sobre el Guardado Local y Git
            </h4>
            <p className="text-[10px] text-zinc-400 leading-relaxed max-w-3xl">
              El playground corre localmente. Al guardar una escena desde el editor, se compila el código en components locales y se actualiza tu copia de trabajo. Estas ediciones están ignoradas por Git en <code className="bg-black/50 px-1 py-0.5 rounded text-zinc-300">.gitignore</code> para evitar registrar cambios experimentales.
            </p>
          </div>
        </div>

        {/* Scene Menu Grid */}
        <main className="flex-1">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {scenes.map((scene) => (
              <div
                key={scene.id}
                className={`bg-zinc-950/40 border rounded-lg p-5 flex flex-col justify-between transition-all duration-300 group
                  ${scene.available 
                    ? 'border-zinc-900 hover:border-zinc-800 hover:bg-zinc-900/10 shadow-lg' 
                    : 'border-zinc-950/80 opacity-50'}`}
              >
                <div className="space-y-4">
                  {/* Aspect-video Preview Container */}
                  <div className="aspect-[200/120] w-full relative">
                    {scene.preview}
                  </div>

                  <div className="space-y-1">
                    <span className="text-[9px] font-mono text-zinc-500 uppercase tracking-widest block">
                      {scene.subtitle}
                    </span>
                    <h3 className={`text-sm font-semibold tracking-tight transition-colors duration-300
                      ${scene.available ? 'text-white group-hover:text-emerald-400' : 'text-zinc-500'}`}>
                      {scene.title}
                    </h3>
                    <p className="text-[10px] text-zinc-400 leading-relaxed pt-1">
                      {scene.description}
                    </p>
                  </div>
                </div>

                <div className="pt-6">
                  {scene.available ? (
                    <button
                      onClick={() => router.push(scene.path)}
                      className="w-full text-center py-2 text-[10px] font-mono uppercase font-bold tracking-wider rounded bg-zinc-900 border border-zinc-800 text-zinc-200 hover:bg-emerald-500 hover:text-zinc-950 hover:border-emerald-500 transition duration-200 cursor-pointer active:scale-95"
                    >
                      Abrir Editor
                    </button>
                  ) : (
                    <button
                      disabled
                      className="w-full text-center py-2 text-[10px] font-mono uppercase font-bold tracking-wider rounded bg-zinc-950 border border-zinc-900/30 text-zinc-600 cursor-not-allowed"
                    >
                      No Disponible
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </main>

        {/* Footer info */}
        <footer className="mt-12 border-t border-zinc-900/60 pt-4 pb-6 text-center shrink-0">
          <p className="text-[9px] font-mono text-zinc-600 uppercase tracking-widest">
            Antipatrón — Engine Visual v2.0
          </p>
        </footer>

      </div>
    </div>
  );
}
