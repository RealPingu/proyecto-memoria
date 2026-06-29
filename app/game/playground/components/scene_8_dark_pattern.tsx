'use client';

import { motion } from 'framer-motion';

export default function Scene8DarkPattern() {

  return (
    <svg viewBox="0 0 500 350" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
      <defs>
        {/* Patrón digital militar de Camo */}
        <pattern id="camo-digital" width="20" height="20" patternUnits="userSpaceOnUse">
          <rect width="20" height="20" fill="#3f4e3f" id="rect-bg-dig"/>
          <rect x="0" y="0" width="8" height="6" fill="#2d3a2d" id="rect-dark-dig"/>
          <rect x="10" y="4" width="6" height="8" fill="#546554" id="rect-medium-dig"/>
          <rect x="2" y="10" width="8" height="6" fill="#7ba077" id="rect-light-dig"/>
          <rect x="12" y="12" width="6" height="6" fill="#202a20" id="rect-black-dig"/>
        </pattern>

        {/* Gradiente brillo del celular */}
        <linearGradient id="brillo-celular" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0" stopColor="#38bdf8" stopOpacity="0.6"/>
          <stop offset="1" stopColor="#bae6fd" stopOpacity="0.1"/>
        </linearGradient>

        {/* Fondo isométrico del patrón oscuro personaje */}
        <pattern id="teselacion" width="40" height="40" patternUnits="userSpaceOnUse">
          <polygon points="0,0 20,10 20,30 0,20" fill="#111827" stroke="#020408" strokeWidth="0.5"/>
          <polygon points="20,10 40,0 40,20 20,30" fill="#1f2937" stroke="#020408" strokeWidth="0.5"/>
          <polygon points="0,20 20,30 20,40 0,40" fill="#0f172a" stroke="#020408" strokeWidth="0.5"/>
          <polygon points="20,30 40,20 40,40 20,40" fill="#1e1b4b" stroke="#020408" strokeWidth="0.5"/>
        </pattern>

        {/* Gradiente de fondo con un solo resplandor verde militar muy tenue detrás del patrón oscuro personaje */}
        <radialGradient id="colored-bg-grad" cx="50%" cy="50%" r="65%">
          <stop offset="0%" stopColor="#14532d" stopOpacity="0.35"/>
          <stop offset="60%" stopColor="#052e16" stopOpacity="0.1"/>
          <stop offset="100%" stopColor="#000000" stopOpacity="1"/>
        </radialGradient>

        {/* Gradiente para el brillo del diamante cyan */}
        <radialGradient id="diamond-glow-grad" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#22d3ee" stopOpacity="0.8"/>
          <stop offset="50%" stopColor="#06b6d4" stopOpacity="0.3"/>
          <stop offset="100%" stopColor="#0891b2" stopOpacity="0"/>
        </radialGradient>
      </defs>

      {/* Fondo degradado con resplandor cyan a la derecha */}
      <rect width="500" height="350" fill="url(#colored-bg-grad)" x="0" y="0" id="fondo-escena" />

      {/* 1. El Patrón Oscuro Personaje flotante y amenazador a la derecha */}
      <g id="patron-oscuro-contenedor" transform="matrix(0.416908, 0, -0.265896, 0.415816, 393.614086, -17.966342)">
        <motion.g
          id="patron-oscuro-flotacion"
          animate={{
            y: [0, -12, 0]
          }}
          transition={{
            repeat: Infinity,
            duration: 4.8,
            ease: "easeInOut"
          }}
        >
          {/* Brillo detrás del diamante del patrón oscuro */}
          <circle cx="200" cy="180" r="80" fill="url(#diamond-glow-grad)" opacity="0.6"/>

          {/* Columna isométrica */}
          <polygon points="130,360 100,120 300,120 270,360" fill="url(#teselacion)" stroke="#06b6d4" strokeWidth="1.5"/>
          
          {/* Diamante y línea interior */}
          <g transform="matrix(1, 0, 0, 1, -54.158613, 5.563326)">
            <motion.polygon 
              points="200,160 225,180 200,200 175,180" 
              fill="#22d3ee"
              animate={{
                fill: ["#22d3ee", "#e0f7fa", "#22d3ee"]
              }}
              transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut" }}
            />
            <line x1="188.179" y1="174.081" x2="200.433" y2="193.748" stroke="#020408" strokeWidth="3" />
          </g>
        </motion.g>
      </g>

      {/* 2. El Sillón de Camo en el centro-izquierda */}
      <g id="sillon-contenedor" transform="matrix(1, 0, 0, 1, 0, 2.133994)">
        <rect x="60" y="80" width="380" height="130" rx="15" fill="#78350f" stroke="#451a03" strokeWidth="2"/>
        <rect x="50" y="180" width="400" height="70" rx="12" fill="#92400e" stroke="#451a03" strokeWidth="2"/>
        <line x1="250" y1="180" x2="250" y2="250" stroke="#451a03" strokeWidth="1.5"/>
        <rect x="20" y="150" width="60" height="100" rx="20" fill="#b45309" stroke="#451a03" strokeWidth="2"/>
        <rect x="420" y="150" width="60" height="100" rx="20" fill="#b45309" stroke="#451a03" strokeWidth="2"/>
        <rect x="40" y="250" width="25" height="15" fill="#1c1917"/>
        <rect x="435" y="250" width="25" height="15" fill="#1c1917"/>
      </g>

      {/* 3. El Celular Táctico con parpadeo suave sobre el brazo del sillón */}
      <g id="celular-tactico" transform="matrix(0.77943, 0, 0, 0.862829, 3.264157, -17.062647)">
        <polygon points="160,150 162,175 120,165 122,158" fill="url(#brillo-celular)"/>
        <rect x="158" y="148" width="8" height="26" rx="1.5" fill="#18181b" stroke="#27272a" strokeWidth="0.5" transform="rotate(-15, 160, 160)"/>
        <motion.rect 
          x="159" y="150" width="4" height="22" rx="0.5" fill="#38bdf8" 
          transform="rotate(-15, 160, 160)"
          animate={{ opacity: [0.3, 0.9, 0.3] }}
          transition={{ repeat: Infinity, duration: 2.2, ease: "easeInOut" }}
        />
      </g>

      {/* 4. Camo durmiendo plácidamente (Cuerpo + Respiración) */}
      <g id="camo-flojo-contenedor" transform="translate(10, -10)">
        <motion.g
          id="camo-respiracion"
          animate={{
            y: [0, -2.5, 0],
            scaleY: [1, 1.018, 1]
          }}
          transition={{
            repeat: Infinity,
            duration: 4,
            ease: "easeInOut"
          }}
          style={{ transformOrigin: "118px 210px" }}
        >
          {/* Pata Superior */}
          <path id="camo-pata-superior" d="M 130.444 194.395 L 150.444 184.395 L 148.444 199.395 L 130.444 194.395 Z" fill="#f59e0b" stroke="#d97706" strokeWidth="0.5"/>
          
          {/* Cuerpo y Vientre */}
          <ellipse id="camo-cuerpo" cx="118.065" cy="174.941" rx="32.959" ry="20.195" fill="url(#camo-digital)" stroke="#7ba077" strokeWidth="0.5" transform="matrix(0.964779, 0.26306, 0, 1.036506, -8.433431, -36.30004)"/>
          <ellipse id="camo-vientre" cx="106.907" cy="174.248" rx="22.886" ry="13.458" fill="#d8d8d0" stroke="#000000" strokeWidth="0.8" transform="matrix(0.961297, 0.275515, 0, 1.040261, 5.282357, -40.190219)"/>
          
          {/* Cabeza */}
          <circle id="camo-cabeza" cx="115" cy="165" r="18" fill="url(#camo-digital)" stroke="#7ba077" strokeWidth="0.5" transform="matrix(1.297488, 0, 0, 1.424591, -78.935854, -98.101832)"/>
          
          {/* Pico */}
          <polygon id="camo-pico" points="84.066 141.103 93.12 145.741 82.255 148.832" fill="#f59e0b" stroke="#d97706" strokeWidth="0.5"/>
          
          {/* Patas Inferiores */}
          <g id="camo-patas-contenedor" transform="matrix(1, 0, 0, 1, -71.257288, -14.881023)">
            <path id="camo-pata-inferior" d="M 195 210 L 215 212 L 208 222 Z" fill="#f59e0b" stroke="#d97706" strokeWidth="0.5"/>
          </g>

          {/* Ojos cerrados / durmiendo */}
          <g id="camo-ojos" transform="matrix(0, 2.369476, -2.141482, 0, 150.247929, 290.859048)">
            <circle id="ojo-borde" cx="-67.91" cy="33.303" r="2.2" fill="#f4f4f5"/>
            <circle id="ojo-pupila" cx="-67.859" cy="32.19" r="1.019" fill="#000000"/>
            <path id="ojo-parpado" d="M -69.893 30.003 C -71.83 29.334 -72.272 34.537 -71.043 36.562" stroke="#18181b" strokeWidth="1.2" strokeLinecap="round" fill="none" />
          </g>

          {/* Aletas */}
          <path id="camo-aleta-izq" d="M 99.09 153.521 C 112.09 148.521 121.804 131.199 126.804 141.199" strokeWidth="3" strokeLinecap="round" stroke="#1c1917" fill="none"/>
          <path id="camo-aleta-der" d="M 86.361 170.394 C 99.361 165.394 126.789 155.112 125.203 142.63" strokeWidth="3" strokeLinecap="round" stroke="#1c1917" fill="none"/>
        </motion.g>
      </g>

      {/* 5. Casco Militar de Camo tirado descuidadamente a un lado en el suelo */}
      <g id="casco-grupo" transform="matrix(-1.601074, 0.745463, 0.679496, 1.459393, 472.639357, 138.422505)" style={{ transformOrigin: "-68.388px 28.512px" }}>
        <path id="casco-cuerpo" d="M -58.2 33 C -58.472 18.27 -77.743 18.379 -77.6 33 C -77.585 34.5 -58.172 34.5 -58.2 33 Z" fill="url(#camo-digital)" stroke="#1b2611" strokeWidth="0.5"/>
        <path id="casco-banda" d="M -77.2 27.5 C -72 25 -64 25 -58.6 27.5" stroke="#1c1917" strokeWidth="1.2" fill="none" opacity="0.8"/>
      </g>
    </svg>
  );
}
