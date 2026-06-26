'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import CamoPenguin from './camo_penguin';

const almaAnimation = {
  y: [-50, -50, 0, 30],
  opacity: [0, 0.9, 0.9, 0],
  scale: [1, 1, 0.8, 0.2]
};

const almaTransition = {
  duration: 2.2,
  times: [0, 0.2, 0.7, 1],
  ease: "easeInOut" as const
};

const camoFilterAnimation = {
  filter: [
    "brightness(0.3) saturate(0.1)",
    "brightness(0.3) saturate(0.1)",
    "brightness(1) saturate(1)"
  ]
};

const camoFilterTransition = {
  duration: 3,
  times: [0, 0.6, 1],
  ease: "easeInOut" as const
};

const destello1Animation = { scale: [0, 2, 0], opacity: [0, 1, 0], x: [0, 15], y: [0, -15] };
const destello2Animation = { scale: [0, 2.5, 0], opacity: [0, 1, 0], x: [0, -20], y: [0, -10] };
const destello3Animation = { scale: [0, 2, 0], opacity: [0, 1, 0], x: [0, 8], y: [0, 15] };
const destello4Animation = { scale: [0, 2, 0], opacity: [0, 1, 0], x: [0, -10], y: [0, 12] };

export default function Scene21CamoRevivido() {
  const [eyeStyle, setEyeStyle] = useState<'sleeping' | 'determined'>('sleeping');

  useEffect(() => {
    // Cambiar la expresión del ojo de durmiendo a determinado al terminar la animación del alma (2 segundos)
    const timer = setTimeout(() => {
      setEyeStyle('determined');
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <svg
      viewBox="0 0 200 120"
      className="w-full h-full select-none"
      xmlns="http://www.w3.org/2000/svg"
      id="svg-escena-21"
    >
      <defs>
        {/* Gradiente Ojo Blanco Metálico/Plata */}
        <radialGradient id="white-eye-grad-21" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#ffffff" id="stop-eye-w1-21"/>
          <stop offset="70%" stopColor="#f8fafc" id="stop-eye-w2-21"/>
          <stop offset="100%" stopColor="#cbd5e1" id="stop-eye-w3-21"/>
        </radialGradient>
        
        {/* Gradiente ambiente azul */}
        <radialGradient id="limbo-blue-pulsing-21" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#1e3a8a" stopOpacity="0.3" id="stop-b1-21"/>
          <stop offset="60%" stopColor="#0f172a" stopOpacity="0.1" id="stop-b2-21"/>
          <stop offset="100%" stopColor="#09090b" stopOpacity="1" id="stop-b3-21"/>
        </radialGradient>

        {/* Glow Radial para el alma de Camo */}
        <radialGradient id="camo-glow-s5" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#879f84" stopOpacity="0.4" />
          <stop offset="60%" stopColor="#4f5d4e" stopOpacity="0.15" />
          <stop offset="100%" stopColor="#000000" stopOpacity="0" />
        </radialGradient>

        {/* Patrón de camuflaje digital de Camo para el alma (de escena 5) */}
        <pattern id="camo-digital-alma-21" width="20" height="20" patternUnits="userSpaceOnUse">
          <rect width="20" height="20" fill="#3f4e3f" id="rect-cbg-alma-21"/>
          <rect x="0" y="0" width="8" height="6" fill="#2d3a2d" id="rect-cdk-alma-21"/>
          <rect x="10" y="4" width="6" height="8" fill="#546554" id="rect-cmd-alma-21"/>
          <rect x="2" y="10" width="8" height="6" fill="#7ba077" id="rect-clt-alma-21"/>
          <rect x="12" y="12" width="6" height="6" fill="#202a20" id="rect-blk-alma-21"/>
        </pattern>
      </defs>

      {/* Fondo */}
      <rect width="200" height="120" fill="#09090b" id="bg-rect-21"/>
      <motion.circle
        cx="100" cy="60" r="75"
        fill="url(#limbo-blue-pulsing-21)"
        animate={{ scale: [0.95, 1.1, 0.95], opacity: [0.7, 0.95, 0.7] }}
        transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}
        id="bg-glow-21"
      />

      {/* Ojo Blanco (Subconsciente) - Flotando arriba a la izquierda (Movido a la derecha x=60) */}
      <g id="ojo-subconsciente-grupo-21" transform="matrix(-0.4, 0, 0, 0.43, 60, 45)">
        <motion.g
          animate={{ y: [-2, 2, -2] }}
          transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
          id="ojo-flotando-21"
        >
          {/* Ojo Glow */}
          <circle cx="1.96" cy="-10.68" r="18" fill="#ffffff" opacity="0.08" transform="matrix(1.72, 0, 0, 1.26, 10.3, -0.3)" id="ojo-glow-21"/>
          {/* Ojo Esclera */}
          <circle cx="3.7" cy="-5.2" r="10.7" fill="url(#white-eye-grad-21)" strokeWidth="0.5" stroke="#e2e8f0" id="ojo-esclera-21" style={{ transformBox: "fill-box", transformOrigin: "50% 50%" }} transform="matrix(1.4985, -0.537148, 0.642825, 1.013572, 3.086092, -7.914055)"/>
          {/* Ojo Trazo Luz - Modelo Original */}
          <motion.path 
            id="ojo-trazo-luz-21"
            style={{ fill: "none", stroke: "rgb(255, 255, 255)" }} 
            d="M -17.728 -18.374 C -19.172 -20.359 42.448 -40.704 45.523 -36.475 C 48.876 -32.004 13.029 7.732 11.259 5.372" 
            animate={{ opacity: [0.7, 1, 0.7] }}
            transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
          />
          {/* Pupila */}
          <circle cx="-4.5" cy="-8.0" r="6.2" fill="#0f172a" id="ojo-pupila-centro-21"/>
          <circle cx="-4.8" cy="-1.8" r="1.5" fill="#ffffff" transform="matrix(-1.3975, 0, 0, 1.944, -13.3, -3.1)" id="ojo-brillo-pupila-21"/>
        </motion.g>
      </g>

      {/* Protagonista (Pingüino con bufanda) - De pie a la izquierda (Movido a la derecha x=65) */}
      <g id="protagonista-contenedor-21" transform="matrix(0.75, 0, 0, 0.75, 65, 20)">
        <motion.g
          animate={{ y: [0, -1, 0] }}
          transition={{ repeat: Infinity, duration: 3.5, ease: "easeInOut" }}
          id="protagonista-cuerpo-movimiento-21"
        >
          {/* Sombra */}
          <ellipse cx="-45" cy="52" rx="16" ry="3.5" fill="#000000" opacity="0.3" id="protagonista-sombra-21"/>
          {/* Cuerpo erguido (rotado 90 grados) */}
          <g transform="matrix(0, 0.848747, -0.768697, 0, 35, 115)" id="protagonista-rotado-21">
            <ellipse cx="-47.91" cy="37.303" rx="20" ry="14" fill="#18181b" id="p-cuerpo-21"/>
            <ellipse cx="-49.91" cy="31.303" rx="14" ry="8" fill="#f4f4f5" id="p-vientre-21"/>
            <circle cx="-67.91" cy="33.303" r="10" fill="#18181b" id="p-cabeza-21"/>
            <g id="p-bufanda-21" transform="matrix(1, 0, 0, 1, -51.91, 17.3)">
              <path d="M -14.3 26.4 C -12.3 20.4 -3.7 18.5 -6.6 13.6" stroke="#ef4444" strokeWidth="2.2" fill="none" strokeLinecap="round" id="p-buf-c-21"/>
              <path d="M -7.6 13.4 C -2.6 12.4 3 11 7 9 C 5 7 0.2 10.4 -6.7 12.4 Z" fill="#ef4444" id="p-buf-cr-21"/>
            </g>
            <circle cx="-67.91" cy="33.303" r="2.2" fill="#f4f4f5" id="p-ojo-b-21"/>
            <circle cx="-68.1" cy="31.8" r="1" fill="#000000" id="p-ojo-p-21"/>
            <polygon points="-70.9 26.3 -67.9 19.3 -64.9 26.3" fill="#f59e0b" id="p-pico-21"/>
            <path d="M -32.4 31.7 L -25.7 26.6 L -25.7 33.7 Z" fill="#f59e0b" id="p-pata-sup-21"/>
            <path d="M -56.3 37.2 C -56 42 -40 37 -56.6 14.8" strokeWidth="2.5" strokeLinecap="round" stroke="#000000" fill="none" id="p-aleta-21"/>
          </g>
        </motion.g>
      </g>

      {/* Camo Pingüino - De pie a la derecha (Mirando a la izquierda) */}
      <motion.g
        id="camo-contenedor-21"
        transform="matrix(0.75, 0, 0, 0.75, 95, 20)"
        animate={camoFilterAnimation}
        transition={camoFilterTransition}
      >
        <CamoPenguin
          camoVariantId={5}
          showHelmet={true}
          eyeStyle={eyeStyle}
          facing="right"
          animateWaddle={false}
          matrix="matrix(0, 0.848747, 0.768697, 0, 31.33, 75)"
        />
      </motion.g>

      {/* Alma/Espíritu de Camo (Usa el diseño y colores de escena 5) */}
      <motion.g
        id="alma-gota-contenedor-21"
        initial={{ y: -50, x: 50, opacity: 0 }}
        animate={almaAnimation}
        transition={almaTransition}
      >
        {/* Glow de Fondo para el alma */}
        <circle cx="90" cy="35" r="18" fill="url(#camo-glow-s5)" opacity="0.85" id="alma-glow-c-21"/>
        {/* Gota Invertida con Camuflaje Digital */}
        <path
          d="M 90 51 C 82 43 78 35 78 29 A 12 12 0 0 1 102 29 C 102 35 98 43 90 51 Z"
          fill="url(#camo-digital-alma-21)"
          stroke="#7ba077"
          strokeWidth="0.8"
          id="alma-gota-p-21"
          opacity="0.85"
        />
        {/* Ojos del alma (Escena 5) */}
        <path d="M 85 27 C 85.5 28.5 87.5 28.5 88 27" stroke="#ffffff" fill="none" strokeWidth="0.75" strokeLinecap="round" id="alma-ojo-izq-21"/>
        <path d="M 92 27 C 92.5 28.5 94.5 28.5 95 27" stroke="#ffffff" fill="none" strokeWidth="0.75" strokeLinecap="round" id="alma-ojo-der-21"/>
      </motion.g>

      {/* Partículas de destello / liberación (Solo ocurren UNA VEZ: sin repeat) */}
      <g id="destellos-liberacion-21">
        <motion.circle
          cx="140" cy="75" r="1.5" fill="#fef08a"
          initial={{ scale: 0, opacity: 0 }}
          animate={destello1Animation}
          transition={{ delay: 2, duration: 1.2 }}
          id="destello-1-21"
        />
        <motion.circle
          cx="140" cy="75" r="2" fill="#38bdf8"
          initial={{ scale: 0, opacity: 0 }}
          animate={destello2Animation}
          transition={{ delay: 2.1, duration: 1.3 }}
          id="destello-2-21"
        />
        <motion.circle
          cx="140" cy="75" r="1" fill="#ffffff"
          initial={{ scale: 0, opacity: 0 }}
          animate={destello3Animation}
          transition={{ delay: 2.15, duration: 1.1 }}
          id="destello-3-21"
        />
        <motion.circle
          cx="140" cy="75" r="1.8" fill="#22c55e"
          initial={{ scale: 0, opacity: 0 }}
          animate={destello4Animation}
          transition={{ delay: 2.2, duration: 1.2 }}
          id="destello-4-21"
        />
      </g>
    </svg>
  );
}
