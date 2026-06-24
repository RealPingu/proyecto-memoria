'use client';

import { motion } from 'framer-motion';
import { SOUL_CONFIGS } from './scene_4_walking';

interface CamoPenguinProps {
  camoVariantId?: number;     // 1 a 8 para los patrones de camuflaje de Camo
  showHelmet?: boolean;        // Mostrar/ocultar casco militar
  eyeStyle?: 'determined' | 'sleeping' | 'normal' | 'visor'; // Expresión de los ojos
  facing?: 'left' | 'right';  // Dirección a la que mira
  animateWaddle?: boolean;    // Activar/desactivar la animación de caminata (si es false, hace respiración)
  matrix?: string;            // Reemplazar la matriz de transformación (por defecto centra al personaje)
}

export default function CamoPenguin({
  camoVariantId = 5,
  showHelmet = true,
  eyeStyle = 'determined',
  facing = 'right',
  animateWaddle = true,
  matrix = "matrix(0, 0.848747, -0.768697, 0, 125, 101)"
}: CamoPenguinProps) {
  
  // Configuración del camuflaje de Camo
  const config = SOUL_CONFIGS[camoVariantId] || SOUL_CONFIGS[5];
  
  const isSleeping = eyeStyle === 'sleeping';

  // Definición de las animaciones del waddle o respiración en cama
  const bodyAnimation = animateWaddle ? {
    x: [0, -0.8, 0],
    rotate: [-3.5, 3.5, -3.5]
  } : {
    x: [0, 0.3, 0],
    y: [0, -0.4, 0]
  };

  const pataSuperiorAnimation = animateWaddle ? {
    x: [-1.2, 1.2, -1.2], 
    y: [0.6, -0.6, 0.6]
  } : {};

  const pataInferiorAnimation = animateWaddle ? {
    x: [1.2, -1.2, 1.2], 
    y: [-0.6, 0.6, -0.6]
  } : {};

  return (
    <g id="camo-personaje-asset">
      <defs>
        {/* Patrones de camuflaje militar auto-contenidos */}
        <pattern id="camo-standard" width="40" height="40" patternUnits="userSpaceOnUse" patternTransform="rotate(25)">
          <rect width="40" height="40" fill="#4f5d4e" id="rect-bg-std" />
          <path id="path-brown-std" d="M -10,5 C 5,12 15,2 25,10 C 35,18 42,6 55,12 L 55,22 C 40,16 35,26 22,18 C 10,10 -2,15 -10,12 Z" fill="#5c4033" />
          <path id="path-cream-std" d="M -10,25 C 2,28 12,20 24,32 C 34,40 40,28 55,30 L 55,38 C 42,35 34,45 22,38 C 12,30 2,36 -10,32 Z" fill="#d8d8d0" />
          <path id="path-green-std" d="M -10,-8 C 5,-2 15,-10 25,-4 C 35,2 42,-8 55,-4 L 55,4 C 40,-1 35,6 22,0 C 10,-6 -2,2 -10,-2 Z" fill="#7ba077" />
        </pattern>

        <pattern id="camo-forest" width="40" height="40" patternUnits="userSpaceOnUse" patternTransform="rotate(40)">
          <rect width="40" height="40" fill="#2d3a1a" id="rect-bg-for" />
          <path id="path-darkgreen-for" d="M -10,5 C 5,12 15,2 25,10 C 35,18 42,6 55,12 L 55,22 Z" fill="#1b2611" />
          <path id="path-brown-for" d="M -10,25 C 2,28 12,20 24,32 L 55,30 L 55,38 Z" fill="#5c4033" />
          <path id="path-green-for" d="M -10,-8 C 5,-2 15,-10 25,-4 L 55,-4 L 55,4 Z" fill="#556b2f" />
        </pattern>

        <pattern id="camo-desert" width="40" height="40" patternUnits="userSpaceOnUse" patternTransform="rotate(15)">
          <rect width="40" height="40" fill="#d2b48c" id="rect-bg-des" />
          <path id="path-darkbrown-des" d="M -10,5 C 5,12 15,2 25,10 C 35,18 42,6 55,12 L 55,22 Z" fill="#8b5a2b" />
          <path id="path-cream-des" d="M -10,25 C 2,28 12,20 24,32 L 55,30 L 55,38 Z" fill="#f4e0c4" />
          <path id="path-tan-des" d="M -10,-8 C 5,-2 15,-10 25,-4 L 55,-4 L 55,4 Z" fill="#cd853f" />
        </pattern>

        <pattern id="camo-arctic" width="40" height="40" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
          <rect width="40" height="40" fill="#e2e8f0" id="rect-bg-arc" />
          <path id="path-gray-arc" d="M -10,5 C 5,12 15,2 25,10 L 55,12 L 55,22 Z" fill="#94a3b8" />
          <path id="path-white-arc" d="M -10,25 C 2,28 12,20 24,32 L 55,30 L 55,38 Z" fill="#ffffff" />
          <path id="path-slate-arc" d="M -10,-8 C 5,-2 15,-10 25,-4 L 55,-4 L 55,4 Z" fill="#475569" />
        </pattern>

        <pattern id="camo-digital" width="20" height="20" patternUnits="userSpaceOnUse">
          <rect width="20" height="20" fill="#3f4e3f" id="rect-bg-dig" />
          <rect x="0" y="0" width="8" height="6" fill="#2d3a2d" id="rect-dark-dig" />
          <rect x="10" y="4" width="6" height="8" fill="#546554" id="rect-medium-dig" />
          <rect x="2" y="10" width="8" height="6" fill="#7ba077" id="rect-light-dig" />
          <rect x="12" y="12" width="6" height="6" fill="#202a20" id="rect-black-dig" />
        </pattern>

        <pattern id="camo-night" width="40" height="40" patternUnits="userSpaceOnUse" patternTransform="rotate(10)">
          <rect width="40" height="40" fill="#0f172a" id="rect-bg-ngt" />
          <path id="path-indigo-ngt" d="M -10,5 C 5,12 15,2 25,10 L 55,12 L 55,22 Z" fill="#1e1b4b" />
          <path id="path-blue-ngt" d="M -10,25 C 2,28 12,20 24,32 L 55,30 L 55,38 Z" fill="#312e81" />
          <path id="path-charcoal-ngt" d="M -10,-8 C 5,-2 15,-10 25,-4 L 55,-4 L 55,4 Z" fill="#1e293b" />
        </pattern>

        <pattern id="camo-urban" width="40" height="40" patternUnits="userSpaceOnUse" patternTransform="rotate(30)">
          <rect width="40" height="40" fill="#475569" id="rect-bg-urb" />
          <path id="path-darkgray-urb" d="M -10,5 C 5,12 15,2 25,10 L 55,12 L 55,22 Z" fill="#1e293b" />
          <path id="path-lightgray-urb" d="M -10,25 C 2,28 12,20 24,32 L 55,30 L 55,38 Z" fill="#cbd5e1" />
          <path id="path-slate-urb" d="M -10,-8 C 5,-2 15,-10 25,-4 L 55,-4 L 55,4 Z" fill="#94a3b8" />
        </pattern>

        <linearGradient id="gold-grad-5" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#fef08a" />
          <stop offset="50%" stopColor="#eab308" />
          <stop offset="100%" stopColor="#ca8a04" />
        </linearGradient>
        <pattern id="camo-gold" width="40" height="40" patternUnits="userSpaceOnUse" patternTransform="rotate(25)">
          <rect width="40" height="40" fill="url(#gold-grad-5)" id="rect-bg-gld" />
          <path id="path-darkgold-gld" d="M -10,5 C 5,12 15,2 25,10 L 55,12 L 55,22 Z" fill="#a16207" opacity="0.6" />
          <path id="path-lightgold-gld" d="M -10,25 C 2,28 12,20 24,32 L 55,30 L 55,38 Z" fill="#fef9c3" opacity="0.8" />
          <path id="path-mediumgold-gld" d="M -10,-8 C 5,-2 15,-10 25,-4 L 55,-4 L 55,4 Z" fill="#854d0e" opacity="0.5" />
        </pattern>
      </defs>

      <g id="camo-contenedor" transform={facing === 'left' ? "translate(200, 0) scale(-1, 1)" : ""}>
        <g id="camo-desplazamiento" transform={matrix}>
          <motion.g
            id="camo-caminar-bamboleo"
            animate={bodyAnimation}
            transition={{ repeat: Infinity, duration: animateWaddle ? 0.7 : 3.5, ease: "easeInOut" }}
          >
            {/* Pata Superior */}
            <motion.path 
              id="camo-pata-superior" 
              d="M -32.417 31.796 L -25.744 26.644 L -25.774 33.746 L -32.417 31.796 Z" 
              fill="#f59e0b" 
              animate={pataSuperiorAnimation}
              transition={{ repeat: Infinity, duration: 0.7, ease: "easeInOut" }}
            />

            {/* Cuerpo (ry="9.723") */}
            <ellipse id="camo-cuerpo" cx="-47.91" cy="37.303" rx="20" ry="9.723" fill={`url(#${config.patternUrl.replace('url(#', '').replace(')', '')})`} stroke={config.stroke} strokeWidth="0.5" />
            
            {/* Vientre */}
            <ellipse id="camo-vientre" cx="-46.144" cy="32.831" rx="10.495" ry="6.167" fill="#d8d8d0" stroke="#000000" strokeWidth="0.8" />
            
            {/* Cabeza */}
            <circle id="camo-cabeza" cx="-68.842" cy="32.274" r="10" fill={`url(#${config.patternUrl.replace('url(#', '').replace(')', '')})`} stroke={config.stroke} strokeWidth="0.5" />
            
            {/* Expresión del Ojo */}
            {eyeStyle === 'normal' && (
              <g id="camo-ojo-normal">
                <circle id="camo-ojo-borde" cx="-67.91" cy="33.303" r="2.2" fill="#f4f4f5" />
                <circle id="camo-ojo-pupila" cx="-68.196" cy="31.871" r="1.019" fill="#000000" />
              </g>
            )}
            {eyeStyle === 'determined' && (
              <g id="camo-ojo-determinado">
                <circle id="camo-ojo-borde" cx="-67.91" cy="33.303" r="2.2" fill="#f4f4f5" />
                <circle id="camo-ojo-pupila" cx="-68.196" cy="31.871" r="1.019" fill="#000000" />
                <path id="camo-ceja" d="M -70.5 29.5 C -70.144 30.759 -71.345 36.213 -71.701 34.954" stroke="#18181b" strokeWidth="1.2" strokeLinecap="round" />
              </g>
            )}
            {eyeStyle === 'sleeping' && (
              <g id="camo-ojo-durmiendo">
                <path id="camo-ojo-cerrado" d="M -70.007 29.969 C -67.034 32.23 -70.421 35.983 -69.691 34.432" stroke="#18181b" strokeWidth="0.8" fill="none" strokeLinecap="round" />
              </g>
            )}
            {eyeStyle === 'visor' && (
              <g id="camo-ojo-visor">
                <circle id="camo-visor-lente" cx="-67.91" cy="33.303" r="3" fill="#22c55e" opacity="0.85" style={{ filter: "drop-shadow(0 0 1px #22c55e)" }} />
                <circle id="camo-visor-luz-intensa" cx="-68.5" cy="32.5" r="0.8" fill="#ffffff" />
                <path id="camo-visor-correa" d="M -67.91 33.303 L -57.91 32" stroke="#18181b" strokeWidth="0.75" />
              </g>
            )}
            
            {/* Pico */}
            <polygon id="camo-pico" points="-70.91 26.303 -65.879 20.483 -64.91 26.303" fill="#f59e0b" />
            
            {/* Pata Inferior */}
            <g id="camo-patas-contenedor" transform="matrix(1, 0, 0, 1, -51.910336, 17.303471)">
              <motion.path 
                id="camo-pata-inferior" 
                d="M 26.663 20.735 L 26.851 27.446 L 19.486 24.256 L 26.663 20.735 Z" 
                fill="#f59e0b"
                animate={pataInferiorAnimation}
                transition={{ repeat: Infinity, duration: 0.7, ease: "easeInOut" }}
              />
            </g>
            
            {/* Aleta */}
            <path 
              id="camo-aleta" 
              d={isSleeping ? "M 128.233 -33.688 C 127.111 -38.136 113.93 -31.1 115.708 -26.708" : "M -72.827 33.598 C -73.949 29.15 -58.211 34.355 -56.433 38.747"} 
              strokeWidth="2.5" 
              strokeLinecap="round" 
              stroke="rgb(0, 0, 0)" 
              fill="none" 
              style={{ transformBox: "fill-box", transformOrigin: isSleeping ? "-623.907% 433.118%" : "50% 50%" }} 
              transform={isSleeping ? "matrix(-1, 0, 0, -1, -0.00004, 0)" : "matrix(-1, 0, 0, -1, 0.000009, 0.000004)"} 
            />

            {/* CASCO MILITAR */}
            {showHelmet && (
              <g 
                id="camo-casco-grupo" 
                transform={isSleeping ? "matrix(-0.56708, 0, 0, 0.811, -87.473, 7.057)" : "matrix(0.608395, 0, 0, -0.948131, -22.660084, 75.479631)"}
              >
                <path 
                  id="camo-casco-correa" 
                  d={isSleeping ? "M -70.987 28.34 C -83.648 27.967 -66.868 31.439 -70.238 28.195" : "M -69.283 34.013 C -81.944 33.64 -65.164 37.112 -68.534 33.868"} 
                  stroke="#1c1917" 
                  strokeWidth="0.8" 
                  fill="none" 
                  style={{ transformBox: "fill-box", transformOrigin: "50% 50%" }} 
                />
                <path 
                  id="camo-casco-cuerpo" 
                  d={isSleeping ? "M -59.904 27.327 C -60.176 12.597 -79.447 12.706 -79.304 27.327 C -79.289 28.827 -59.876 28.827 -59.904 27.327 Z" : "M -58.2 33 C -58.472 18.27 -77.743 18.379 -77.6 33 C -77.585 34.5 -58.172 34.5 -58.2 33 Z"} 
                  fill={`url(#${config.patternUrl.replace('url(#', '').replace(')', '')})`} 
                  stroke="#1b2611" 
                  strokeWidth="0.5" 
                />
                <path 
                  id="camo-casco-banda" 
                  d={isSleeping ? "M -78.904 21.827 C -73.704 19.327 -65.704 19.327 -60.304 21.827" : "M -77.2 27.5 C -72 25 -64 25 -58.6 27.5"} 
                  stroke="#1c1917" 
                  strokeWidth="1.2" 
                  fill="none" 
                  opacity="0.8" 
                />
              </g>
            )}
          </motion.g>
        </g>
      </g>
    </g>
  );
}
