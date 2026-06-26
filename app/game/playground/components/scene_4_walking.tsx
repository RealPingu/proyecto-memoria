'use client';

import { motion } from 'framer-motion';

interface Scene4WalkingProps {
  variantId?: number;
}

// Configuración de los Conceptos del Alma (v1 a v8)
export const SOUL_CONFIGS: Record<number, {
  name: string;
  patternUrl: string;
  stroke: string;
  particleColors: string[];
}> = {
  1: {
    name: 'Camo Estándar',
    patternUrl: 'url(#camo-standard)',
    stroke: '#7ba077',
    particleColors: ['#7ba077', '#d8d8d0', '#5c4033']
  },
  2: {
    name: 'Camo Bosque',
    patternUrl: 'url(#camo-forest)',
    stroke: '#556b2f',
    particleColors: ['#556b2f', '#8b4513', '#2d3a1a']
  },
  3: {
    name: 'Camo Desierto',
    patternUrl: 'url(#camo-desert)',
    stroke: '#cd853f',
    particleColors: ['#c2b280', '#cd853f', '#8b5a2b']
  },
  4: {
    name: 'Camo Ártico',
    patternUrl: 'url(#camo-arctic)',
    stroke: '#94a3b8',
    particleColors: ['#ffffff', '#cbd5e1', '#64748b']
  },
  5: {
    name: 'Camo Digital',
    patternUrl: 'url(#camo-digital)',
    stroke: '#7ba077',
    particleColors: ['#7ba077', '#546554', '#2d3a2d']
  },
  6: {
    name: 'Camo Nocturno',
    patternUrl: 'url(#camo-night)',
    stroke: '#312e81',
    particleColors: ['#38bdf8', '#818cf8', '#1e293b']
  },
  7: {
    name: 'Camo Urbano',
    patternUrl: 'url(#camo-urban)',
    stroke: '#94a3b8',
    particleColors: ['#cbd5e1', '#94a3b8', '#1e293b']
  },
  8: {
    name: 'Camo Dorado',
    patternUrl: 'url(#camo-gold)',
    stroke: '#eab308',
    particleColors: ['#fef08a', '#fbbf24', '#ffffff']
  }
};

// Coordenadas relativas y duraciones de las partículas alrededor del alma (cx: 165, cy: 90)
export const PARTICLE_TEMPLATES = [
  { id: 1, dx: -8, dy: 6, r: 1.2, duration: 3.2, delay: 0 },
  { id: 2, dx: 8, dy: 10, r: 1.4, duration: 3.8, delay: 0.7 },
  { id: 3, dx: -6, dy: -6, r: 0.9, duration: 2.6, delay: 1.4 },
  { id: 4, dx: 6, dy: -4, r: 1.1, duration: 3.4, delay: 2.1 },
  { id: 5, dx: 0, dy: 12, r: 1.3, duration: 4.2, delay: 0.4 },
  { id: 6, dx: -11, dy: 0, r: 1.0, duration: 2.9, delay: 1.1 },
];

export default function Scene4Walking({ variantId = 1 }: Scene4WalkingProps) {
  // Matriz de transformación para el Ojo Subconsciente (fijo en parte izquierda superior)
  const transformAttr = "matrix(-0.794842, 0, 0, 0.845185, 50.107243, 37.822482)";
  
  // Obtener la configuración según la variante elegida
  const config = SOUL_CONFIGS[variantId] || SOUL_CONFIGS[1];

  return (
    <svg viewBox="0 0 200 120" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
      <defs>
        {/* Gradiente Ojo Blanco Metálico/Plata */}
        <radialGradient id="white-eye-grad" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="70%" stopColor="#f8fafc" />
          <stop offset="100%" stopColor="#cbd5e1" />
        </radialGradient>
        {/* Gradiente Brillo/Halo Blanco */}
        <radialGradient id="white-glow-grad" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#ffffff" stopOpacity={1} />
          <stop offset="50%" stopColor="#ffffff" stopOpacity={0.2} />
          <stop offset="100%" stopColor="#ffffff" stopOpacity={0} />
        </radialGradient>

        {/* Glow Radial para el alma de Camo */}
        <radialGradient id="camo-glow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#879f84" stopOpacity="0.4" />
          <stop offset="60%" stopColor="#4f5d4e" stopOpacity="0.15" />
          <stop offset="100%" stopColor="#000000" stopOpacity="0" />
        </radialGradient>

        {/* 1. Camuflaje Estándar */}
        <pattern id="camo-standard" width="40" height="40" patternUnits="userSpaceOnUse" patternTransform="rotate(25)">
          <rect width="40" height="40" fill="#4f5d4e" id="rect-bg-std" />
          <path id="path-brown-std" d="M -10,5 C 5,12 15,2 25,10 C 35,18 42,6 55,12 L 55,22 C 40,16 35,26 22,18 C 10,10 -2,15 -10,12 Z" fill="#5c4033" />
          <path id="path-cream-std" d="M -10,25 C 2,28 12,20 24,32 C 34,40 40,28 55,30 L 55,38 C 42,35 34,45 22,38 C 12,30 2,36 -10,32 Z" fill="#d8d8d0" />
          <path id="path-green-std" d="M -10,-8 C 5,-2 15,-10 25,-4 C 35,2 42,-8 55,-4 L 55,4 C 40,-1 35,6 22,0 C 10,-6 -2,2 -10,-2 Z" fill="#7ba077" />
        </pattern>

        {/* 2. Camuflaje Bosque */}
        <pattern id="camo-forest" width="40" height="40" patternUnits="userSpaceOnUse" patternTransform="rotate(40)">
          <rect width="40" height="40" fill="#2d3a1a" id="rect-bg-for" />
          <path id="path-darkgreen-for" d="M -10,5 C 5,12 15,2 25,10 C 35,18 42,6 55,12 L 55,22 Z" fill="#1b2611" />
          <path id="path-brown-for" d="M -10,25 C 2,28 12,20 24,32 L 55,30 L 55,38 Z" fill="#5c4033" />
          <path id="path-green-for" d="M -10,-8 C 5,-2 15,-10 25,-4 L 55,-4 L 55,4 Z" fill="#556b2f" />
        </pattern>

        {/* 3. Camuflaje Desierto */}
        <pattern id="camo-desert" width="40" height="40" patternUnits="userSpaceOnUse" patternTransform="rotate(15)">
          <rect width="40" height="40" fill="#d2b48c" id="rect-bg-des" />
          <path id="path-darkbrown-des" d="M -10,5 C 5,12 15,2 25,10 C 35,18 42,6 55,12 L 55,22 Z" fill="#8b5a2b" />
          <path id="path-cream-des" d="M -10,25 C 2,28 12,20 24,32 L 55,30 L 55,38 Z" fill="#f4e0c4" />
          <path id="path-tan-des" d="M -10,-8 C 5,-2 15,-10 25,-4 L 55,-4 L 55,4 Z" fill="#cd853f" />
        </pattern>

        {/* 4. Camuflaje Ártico */}
        <pattern id="camo-arctic" width="40" height="40" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
          <rect width="40" height="40" fill="#e2e8f0" id="rect-bg-arc" />
          <path id="path-gray-arc" d="M -10,5 C 5,12 15,2 25,10 L 55,12 L 55,22 Z" fill="#94a3b8" />
          <path id="path-white-arc" d="M -10,25 C 2,28 12,20 24,32 L 55,30 L 55,38 Z" fill="#ffffff" />
          <path id="path-slate-arc" d="M -10,-8 C 5,-2 15,-10 25,-4 L 55,-4 L 55,4 Z" fill="#475569" />
        </pattern>

        {/* 5. Camuflaje Digital */}
        <pattern id="camo-digital" width="20" height="20" patternUnits="userSpaceOnUse">
          <rect width="20" height="20" fill="#3f4e3f" id="rect-bg-dig" />
          <rect x="0" y="0" width="8" height="6" fill="#2d3a2d" id="rect-dark-dig" />
          <rect x="10" y="4" width="6" height="8" fill="#546554" id="rect-medium-dig" />
          <rect x="2" y="10" width="8" height="6" fill="#7ba077" id="rect-light-dig" />
          <rect x="12" y="12" width="6" height="6" fill="#202a20" id="rect-black-dig" />
        </pattern>

        {/* 6. Camuflaje Nocturno */}
        <pattern id="camo-night" width="40" height="40" patternUnits="userSpaceOnUse" patternTransform="rotate(10)">
          <rect width="40" height="40" fill="#0f172a" id="rect-bg-ngt" />
          <path id="path-indigo-ngt" d="M -10,5 C 5,12 15,2 25,10 L 55,12 L 55,22 Z" fill="#1e1b4b" />
          <path id="path-blue-ngt" d="M -10,25 C 2,28 12,20 24,32 L 55,30 L 55,38 Z" fill="#312e81" />
          <path id="path-charcoal-ngt" d="M -10,-8 C 5,-2 15,-10 25,-4 L 55,-4 L 55,4 Z" fill="#1e293b" />
        </pattern>

        {/* 7. Camuflaje Urbano */}
        <pattern id="camo-urban" width="40" height="40" patternUnits="userSpaceOnUse" patternTransform="rotate(30)">
          <rect width="40" height="40" fill="#475569" id="rect-bg-urb" />
          <path id="path-darkgray-urb" d="M -10,5 C 5,12 15,2 25,10 L 55,12 L 55,22 Z" fill="#1e293b" />
          <path id="path-lightgray-urb" d="M -10,25 C 2,28 12,20 24,32 L 55,30 L 55,38 Z" fill="#cbd5e1" />
          <path id="path-slate-urb" d="M -10,-8 C 5,-2 15,-10 25,-4 L 55,-4 L 55,4 Z" fill="#94a3b8" />
        </pattern>

        {/* 8. Camuflaje Dorado */}
        <linearGradient id="gold-grad-1" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#fef08a" />
          <stop offset="50%" stopColor="#eab308" />
          <stop offset="100%" stopColor="#ca8a04" />
        </linearGradient>
        <pattern id="camo-gold" width="40" height="40" patternUnits="userSpaceOnUse" patternTransform="rotate(25)">
          <rect width="40" height="40" fill="url(#gold-grad-1)" id="rect-bg-gld" />
          <path id="path-darkgold-gld" d="M -10,5 C 5,12 15,2 25,10 L 55,12 L 55,22 Z" fill="#a16207" opacity="0.6" />
          <path id="path-lightgold-gld" d="M -10,25 C 2,28 12,20 24,32 L 55,30 L 55,38 Z" fill="#fef9c3" opacity="0.8" />
          <path id="path-mediumgold-gld" d="M -10,-8 C 5,-2 15,-10 25,-4 L 55,-4 L 55,4 Z" fill="#854d0e" opacity="0.5" />
        </pattern>
        {/* Very subtle blue radial gradient for dream atmosphere */}
        <radialGradient id="limbo-blue-pulsing" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#1e3a8a" stopOpacity="0.3" />
          <stop offset="60%" stopColor="#0f172a" stopOpacity="0.1" />
          <stop offset="100%" stopColor="#09090b" stopOpacity="1" />
        </radialGradient>
      </defs>

      {/* Dark background base */}
      <rect width="200" height="120" fill="#09090b" id="fondo-escena" />

      {/* Pulsing subtle blue glow behind the characters */}
      <motion.circle
        cx="100"
        cy="60"
        r="75"
        fill="url(#limbo-blue-pulsing)"
        animate={{
          scale: [0.95, 1.1, 0.95],
          opacity: [0.7, 0.95, 0.7]
        }}
        transition={{
          repeat: Infinity,
          duration: 5,
          ease: "easeInOut"
        }}
      />

      {/* 1. El Pingüino Protagonista (de pie a la izquierda) */}
      <g id="pinguino-contenedor" transform="matrix(0, 0.848747, -0.768697, 0, 63.980534, 122.770161)">
        <motion.g
          id="pinguino-caminar-bamboleo"
          animate={{ 
            x: [0, -0.8, 0],
            rotate: [-3.5, 3.5, -3.5]
          }}
          transition={{ repeat: Infinity, duration: 0.7, ease: "easeInOut" }}
        >
          {/* Pata Superior */}
          <motion.path 
            id="pata-superior" 
            d="M -32.417 31.796 L -25.744 26.644 L -25.774 33.746 L -32.417 31.796 Z" 
            fill="#f59e0b" 
            animate={{ 
              x: [-1.2, 1.2, -1.2], 
              y: [0.6, -0.6, 0.6] 
            }}
            transition={{ repeat: Infinity, duration: 0.7, ease: "easeInOut" }}
          />

          {/* Cuerpo */}
          <ellipse id="cuerpo" cx="-47.91" cy="37.303" rx="20" ry="14" fill="#18181b" />
          
          {/* Vientre */}
          <ellipse id="vientre" cx="-49.91" cy="31.303" rx="14" ry="8" fill="#f4f4f5" />
          
          {/* Cabeza */}
          <circle id="cabeza" cx="-67.91" cy="33.303" r="10" fill="#18181b" />
          
          {/* Bufanda */}
          <g id="bufanda" transform="matrix(1, 0, 0, 1, -51.910336, 17.303471)">
            <path id="bufanda-cuello" d="M -14.315 26.443 C -12.315 20.443 -3.738 18.577 -6.624 13.624" stroke="#ef4444" strokeWidth="2.2" fill="none" strokeLinecap="round" />
            <path id="bufanda-caida-roja" d="M -7.663 13.49 C -2.663 12.49 3 11 7 9 C 5 7 0.204 10.408 -6.796 12.408 L -7.663 13.49 Z" fill="#ef4444" />
            <path id="bufanda-caida-guinda" d="M -6.929 14.898 C -1.929 14.898 2 14 5 13 C 3 11 -0.337 13.357 -7.337 13.357 L -6.929 14.898 Z" fill="#b91c1c" />
          </g>
          
          {/* Ojo del Pingüino */}
          <g id="ojo">
            <circle id="ojo-borde" cx="-67.91" cy="33.303" r="2.2" fill="#f4f4f5" />
            <circle id="ojo-pupila" cx="-68.196" cy="31.871" r="1.019" fill="#000000" />
          </g>
          
          {/* Pico */}
          <polygon id="pico" points="-70.91 26.303 -67.91 19.303 -64.91 26.303" fill="#f59e0b" />
          
          {/* Pata Inferior */}
          <g id="patas" transform="matrix(1, 0, 0, 1, -51.910336, 17.303471)">
            <motion.path 
              id="pata-inferior" 
              d="M 26.663 20.735 L 26.851 27.446 L 19.486 24.256 L 26.663 20.735 Z" 
              fill="#f59e0b"
              animate={{ 
                x: [1.2, -1.2, 1.2], 
                y: [-0.6, 0.6, -0.6] 
              }}
              transition={{ repeat: Infinity, duration: 0.7, ease: "easeInOut" }}
            />
          </g>
          
          {/* Aleta */}
          <path id="aleta" d="M -56.369 37.201 C -57.631 41.252 -39.926 36.511 -37.926 32.511" strokeWidth="2.5" strokeLinecap="round" stroke="rgb(0, 0, 0)" fill="none" />
        </motion.g>
      </g>

      {/* 2. El Ojo Subconsciente (Flotando fijo arriba a la izquierda. No varía con la selección) */}
      <g transform={transformAttr} id="ojo-subconsciente-grupo">
        <motion.g
          id="ojo-subconsciente-entrada"
          initial={{ opacity: 0, scale: 0.6, y: -15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 2.8, ease: "easeOut", delay: 0.4 }}
        >
          <motion.g
            id="ojo-subconsciente-flotacion"
            animate={{ 
              y: [-3, 3, -3],
              scale: [0.98, 1.02, 0.98]
            }}
            transition={{ repeat: Infinity, duration: 4.5, ease: "easeInOut" }}
          >
            {/* Ojo Glow */}
            <circle 
              id="ojo-glow" 
              cx="1.961" 
              cy="-10.68" 
              r="18" 
              fill="#ffffff" 
              opacity="0.08" 
              transform="matrix(1.726517, 0, 0, 1.260335, 10.344875, -0.379963)" 
            />
            {/* Ojo Esclera */}
            <circle 
              id="ojo-esclera" 
              cx="3.705" 
              cy="-5.231" 
              r="10.733" 
              fill="#f8fafc" 
              strokeWidth="0.5" 
              stroke="#e2e8f0" 
              style={{ transformBox: "fill-box", transformOrigin: "50% 50%" }} 
              transform="matrix(1.4985, -0.537148, 0.642825, 1.013572, 3.086092, -7.914055)" 
            />
            {/* Ojo Trazo Luz */}
            <motion.path 
              id="ojo-trazo-luz"
              style={{ fill: "none", stroke: "rgb(255, 255, 255)" }} 
              d="M -17.728 -18.374 C -19.172 -20.359 42.448 -40.704 45.523 -36.475 C 48.876 -32.004 13.029 7.732 11.259 5.372" 
              animate={{ opacity: [0.7, 1, 0.7] }}
              transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
            />
            {/* Pupila & Brillo agrupados para movimiento ocular */}
            <motion.g
              id="ojo-pupila-grupo"
              animate={{ 
                x: [-1.2, 1.2, -1.2],
                y: [-0.6, 0.6, -0.6]
              }}
              transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
            >
              <circle id="ojo-pupila-centro" cx="-2.127" cy="-10.461" r="6.2" fill="#0f172a" />
              <circle 
                id="ojo-pupila-brillo" 
                cx="-4.8" 
                cy="-1.8" 
                r="1.5" 
                fill="#ffffff" 
                transform="matrix(-1.397505, 0, 0, 1.944474, -10.963154, -5.601462)" 
              />
            </motion.g>
          </motion.g>
        </motion.g>
      </g>

      {/* 3. El Alma de Camo (Gota Invertida con Partículas Flotantes y Ojos - en la derecha centro) */}
      <g id="camo-alma-contenedor" opacity="0.6">
        {/* Glow de Fondo para el alma */}
        <motion.circle
          id="alma-fondo-glow"
          cx="165"
          cy="60"
          r="22"
          fill="url(#camo-glow)"
          animate={{ scale: [0.9, 1.15, 0.9], opacity: [0.5, 0.8, 0.5] }}
          transition={{ repeat: Infinity, duration: 3.5, ease: "easeInOut" }}
        />

        {/* Grupo que se mueve arriba y abajo (bobbing) y escala */}
        <motion.g
          id="alma-gota-y-ojos"
          animate={{ 
            y: [-1.2, 1.2, -1.2],
            scale: [0.98, 1.02, 0.98]
          }}
          transition={{ 
            y: { duration: 3.1, ease: "easeInOut", repeat: Infinity },
            scale: { duration: 3.1, ease: "easeInOut", repeat: Infinity }
          }}
          style={{ originX: "165px", originY: "60px" }}
        >
          {/* Gota Invertida principal del Alma con patrón militar dinámico, morphing fluido de balanceo (cuerpo y punta) */}
          <motion.path
            id="alma-gota-invertida"
            d="M 165 76 C 157 68 153 60 153 54 A 12 12 0 0 1 177 54 C 177 60 173 68 165 76 Z"
            fill={config.patternUrl}
            stroke={config.stroke}
            strokeWidth="0.8"
            animate={{ 
              d: [
                "M 159 76 C 153 68 151 60 151 54 A 12 12 0 0 1 175 54 C 175 60 170 68 159 76 Z",
                "M 171 76 C 160 68 155 60 155 54 A 12 12 0 0 1 179 54 C 179 60 177 68 171 76 Z",
                "M 159 76 C 153 68 151 60 151 54 A 12 12 0 0 1 175 54 C 175 60 170 68 159 76 Z"
              ]
            }}
            transition={{ 
              d: { duration: 4.0, ease: "easeInOut", repeat: Infinity }
            }}
            opacity="0.65"
          />

          {/* Ojos del Alma (se mueven lateralmente en sincronía con el balanceo del cuerpo) */}
          <motion.g
            id="alma-ojos-contenedor"
            animate={{ x: [-2, 2, -2] }}
            transition={{ duration: 4.0, ease: "easeInOut", repeat: Infinity }}
            style={{ originX: "165px", originY: "60px" }}
          >
            {variantId === 1 && (
              <g id="alma-ojos-v1">
                <path d="M 160 52 C 160.5 53.5 162.5 53.5 163 52" stroke="#ffffff" fill="none" strokeWidth="0.75" strokeLinecap="round" id="ojo-izq-v1" />
                <path d="M 167 52 C 167.5 53.5 169.5 53.5 170 52" stroke="#ffffff" fill="none" strokeWidth="0.75" strokeLinecap="round" id="ojo-der-v1" />
              </g>
            )}
            {variantId === 2 && (
              <g id="alma-ojos-v2">
                <path d="M 159.5 52.5 H 163" stroke="#e2e8f0" strokeWidth="0.8" strokeLinecap="round" id="ojo-izq-v2" />
                <path d="M 167 52.5 H 170.5" stroke="#e2e8f0" strokeWidth="0.8" strokeLinecap="round" id="ojo-der-v2" />
              </g>
            )}
            {variantId === 3 && (
              <g id="alma-ojos-v3">
                <path d="M 160 53.5 L 162.5 51.5" stroke="#e2e8f0" strokeWidth="0.95" strokeLinecap="round" id="ojo-izq-v3" />
                <path d="M 167 51.5 L 169.5 53.5" stroke="#e2e8f0" strokeWidth="0.95" strokeLinecap="round" id="ojo-der-v3" />
              </g>
            )}
            {variantId === 4 && (
              <g id="alma-ojos-v4">
                <path d="M 159.5 52.5 H 163" stroke="#ffffff" strokeWidth="0.65" strokeLinecap="round" id="ojo-izq-v4" />
                <path d="M 167 52.5 H 170.5" stroke="#ffffff" strokeWidth="0.65" strokeLinecap="round" id="ojo-der-v4" />
              </g>
            )}
            {variantId === 5 && (
              <g id="alma-ojos-v5">
                <path d="M 160 52 C 160.5 53.5 162.5 53.5 163 52" stroke="#ffffff" fill="none" strokeWidth="0.75" strokeLinecap="round" id="ojo-izq-v5" />
                <path d="M 167 52 C 167.5 53.5 169.5 53.5 170 52" stroke="#ffffff" fill="none" strokeWidth="0.75" strokeLinecap="round" id="ojo-der-v5" />
              </g>
            )}
            {variantId === 6 && (
              <g id="alma-ojos-v6">
                <circle cx="161" cy="52.5" r="1.2" fill="#22d3ee" style={{ filter: "drop-shadow(0 0 1px #22d3ee)" }} id="ojo-izq-v6" />
                <circle cx="169" cy="52.5" r="1.2" fill="#22d3ee" style={{ filter: "drop-shadow(0 0 1px #22d3ee)" }} id="ojo-der-v6" />
              </g>
            )}
            {variantId === 7 && (
              <g id="alma-ojos-v7">
                <path d="M 160 53 C 160.5 51.5 162.5 51.5 163 53" stroke="#cbd5e1" fill="none" strokeWidth="0.75" strokeLinecap="round" id="ojo-izq-v7" />
                <path d="M 167 53 C 167.5 51.5 169.5 51.5 170 53" stroke="#cbd5e1" fill="none" strokeWidth="0.75" strokeLinecap="round" id="ojo-der-v7" />
              </g>
            )}
            {variantId === 8 && (
              <g id="alma-ojos-v8">
                <path d="M 161 50.5 L 162 52.5 L 164 52.5 L 162 53.5 L 161 55.5 L 160 53.5 L 158 52.5 L 160 52.5 Z" fill="#fef08a" stroke="#fbbf24" strokeWidth="0.4" id="ojo-izq-v8" />
                <path d="M 169 50.5 L 170 52.5 L 172 52.5 L 170 53.5 L 169 55.5 L 168 53.5 L 166 52.5 L 168 52.5 Z" fill="#fef08a" stroke="#fbbf24" strokeWidth="0.4" id="ojo-der-v8" />
              </g>
            )}
          </motion.g>
        </motion.g>

        {/* Partículas que flotan tenuemente alrededor de la gota */}
        <g id="alma-particulas-flotantes">
          {PARTICLE_TEMPLATES.map((p, idx) => {
            const color = config.particleColors[idx % config.particleColors.length];
            return (
              <motion.circle
                key={p.id}
                id={`alma-particula-${p.id}`}
                cx={165 + p.dx}
                cy={60 + p.dy}
                r={p.r * 0.8}
                fill={color}
                animate={{
                  y: [0, -20],
                  x: [0, p.dx > 0 ? 2 : -2, 0],
                  opacity: [0, 0.6, 0]
                }}
                transition={{
                  repeat: Infinity,
                  duration: p.duration,
                  delay: p.delay,
                  ease: "easeInOut"
                }}
              />
            );
          })}
        </g>
      </g>
    </svg>
  );
}
