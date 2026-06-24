'use client';

import { motion } from 'framer-motion';
import CamoPenguin from './camo_penguin';
import { SOUL_CONFIGS, PARTICLE_TEMPLATES } from './scene_4_walking';

interface Scene5ApproachingProps {
  camoVariantId?: number;     // 1 a 8 para los patrones de camuflaje de Camo
  showHelmet?: boolean;        // Mostrar/ocultar casco militar
  eyeStyle?: 'determined' | 'sleeping' | 'normal' | 'visor'; // Expresión de los ojos
  facing?: 'left' | 'right';  // Dirección a la que mira
}

export default function Scene5Approaching({
  camoVariantId = 5,
  showHelmet = true,
  eyeStyle = 'sleeping',
  facing = 'right'
}: Scene5ApproachingProps) {
  
  // Configuración del alma
  const config = SOUL_CONFIGS[camoVariantId] || SOUL_CONFIGS[5];

  // Renderizar Zzzs flotantes de color cian (#a5f3fc)
  const renderZs = (xOffset = 81, yOffset = 84, delayStep = 0) => (
    <g id="sueno-zs" transform={`translate(${xOffset}, ${yOffset})`}>
      <motion.text
        id="z-pequena"
        x="0" y="0"
        fill="#a5f3fc"
        fontSize="4"
        fontWeight="bold"
        fontFamily="monospace"
        animate={{ 
          opacity: [0, 0.9, 0], 
          y: [-1, -16], 
          x: [0, 2, -2, 0],
          scale: [0.7, 1.2]
        }}
        transition={{ repeat: Infinity, duration: 3, ease: "easeInOut", delay: delayStep }}
      >
        z
      </motion.text>
      <motion.text
        id="z-mediana"
        x="3" y="-3"
        fill="#a5f3fc"
        fontSize="5"
        fontWeight="bold"
        fontFamily="monospace"
        animate={{ 
          opacity: [0, 0.8, 0], 
          y: [-3, -25], 
          x: [0, -3, 3, 0],
          scale: [0.8, 1.3]
        }}
        transition={{ repeat: Infinity, duration: 3, ease: "easeInOut", delay: delayStep + 1.0 }}
      >
        z
      </motion.text>
      <motion.text
        id="z-grande"
        x="6" y="-6"
        fill="#a5f3fc"
        fontSize="6.5"
        fontWeight="bold"
        fontFamily="monospace"
        animate={{ 
          opacity: [0, 0.7, 0], 
          y: [-5, -34], 
          x: [0, 4, -4, 0],
          scale: [0.9, 1.4]
        }}
        transition={{ repeat: Infinity, duration: 3, ease: "easeInOut", delay: delayStep + 2.0 }}
      >
        Z
      </motion.text>
    </g>
  );

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
        <radialGradient id="camo-glow-s5" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#879f84" stopOpacity="0.4" />
          <stop offset="60%" stopColor="#4f5d4e" stopOpacity="0.15" />
          <stop offset="100%" stopColor="#000000" stopOpacity="0" />
        </radialGradient>

        {/* Patrones de camuflaje duplicados para el renderizado del alma */}
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

        <linearGradient id="gold-grad-s5" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#fef08a" />
          <stop offset="50%" stopColor="#eab308" />
          <stop offset="100%" stopColor="#ca8a04" />
        </linearGradient>
        <pattern id="camo-gold" width="40" height="40" patternUnits="userSpaceOnUse" patternTransform="rotate(25)">
          <rect width="40" height="40" fill="url(#gold-grad-s5)" id="rect-bg-gld" />
          <path id="path-darkgold-gld" d="M -10,5 C 5,12 15,2 25,10 L 55,12 L 55,22 Z" fill="#a16207" opacity="0.6" />
          <path id="path-lightgold-gld" d="M -10,25 C 2,28 12,20 24,32 L 55,30 L 55,38 Z" fill="#fef9c3" opacity="0.8" />
          <path id="path-mediumgold-gld" d="M -10,-8 C 5,-2 15,-10 25,-4 L 55,-4 L 55,4 Z" fill="#854d0e" opacity="0.5" />
        </pattern>
      </defs>

      {/* Fondo Negro Absoluto */}
      <rect width="200" height="120" fill="#000000" id="fondo-escena" />

      {/* 1. El Ojo Subconsciente (Ojo Blanco flotando arriba a la izquierda, mirando a Camo) */}
      <g transform="matrix(-0.498268, 0, 0, 0.532384, 30.760, 49.912)" id="ojo-subconsciente-grupo">
        <motion.g
          id="ojo-subconsciente-entrada"
          initial={{ opacity: 0, scale: 0.6, y: -15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 2.8, ease: "easeOut", delay: 0.2 }}
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
              fill="url(#white-eye-grad)" 
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
            {/* Pupila & Brillo mirando abajo-derecha hacia Camo (cx=-4.5, cy=-8.0) */}
            <motion.g
              id="ojo-pupila-grupo"
              animate={{ 
                x: [-0.6, 0.6, -0.6],
                y: [-0.3, 0.3, -0.3]
              }}
              transition={{ repeat: Infinity, duration: 5.5, ease: "easeInOut" }}
            >
              <circle id="ojo-pupila-centro" cx="-4.5" cy="-8.0" r="6.2" fill="#0f172a" />
              <circle 
                id="ojo-pupila-brillo" 
                cx="-4.8" 
                cy="-1.8" 
                r="1.5" 
                fill="#ffffff" 
                transform="matrix(-1.397505, 0, 0, 1.944474, -13.336, -3.140)" 
              />
            </motion.g>
          </motion.g>
        </motion.g>
      </g>

      {/* Camo durmiendo en el piso con colores muy apagados y respiración lenta */}
      <g id="camo-durmiendo-cuerpo" style={{ filter: "brightness(0.28) saturate(0.35)", opacity: 0.65 }} transform="matrix(0.746926, 0, 0, 0.755891, 68.90875, 16.34582)">
        <CamoPenguin
          camoVariantId={camoVariantId}
          showHelmet={showHelmet}
          eyeStyle={eyeStyle}
          facing={facing}
          animateWaddle={false}
          matrix="matrix(1, 0, 0, 1, 150, 65)"
        />
      </g>

      {/* Burbuja anime de sueño/moco (en la nariz del pingüino durmiendo) */}
      <motion.circle
        id="burbuja-sueno"
        cx="131.714"
        cy="78.034"
        r={1}
        fill="#38bdf8"
        fillOpacity={0.25}
        stroke="#0284c7"
        strokeWidth={0.8}
        animate={{
          r: [1, 6, 1],
          cy: [78.034, 72.034, 78.034]
        }}
        transition={{ repeat: Infinity, duration: 3.5, ease: "easeInOut" }}
      />

      {/* Zzz flotantes sobre la cabeza de Camo */}
      {renderZs(127.8, 81.95, 0.4)}

      {/* El Alma de Camo flotando sobre él en la parte superior centro (cx: 90, cy: 35) */}
      <g id="camo-alma-contenedor" transform="matrix(0.756577, 0, 0, 0.772114, 81.47867, 9.46758)">
        {/* Glow de Fondo para el alma */}
        <motion.circle
          id="alma-fondo-glow"
          cx="90"
          cy="35"
          r="18"
          fill="url(#camo-glow-s5)"
          animate={{ scale: [0.92, 1.12, 0.92], opacity: [0.4, 0.7, 0.4] }}
          transition={{ repeat: Infinity, duration: 3.8, ease: "easeInOut" }}
        />

        {/* Grupo de la gota y ojos que flota suavemente */}
        <motion.g
          id="alma-gota-y-ojos"
          animate={{ 
            y: [-1.5, 1.5, -1.5],
            scale: [0.98, 1.02, 0.98]
          }}
          transition={{ 
            y: { duration: 3.3, ease: "easeInOut", repeat: Infinity },
            scale: { duration: 3.3, ease: "easeInOut", repeat: Infinity }
          }}
          style={{ originX: "90px", originY: "35px" }}
        >
          {/* Gota Invertida principal del Alma con patrón militar dinámico, morphing fluido */}
          <motion.path
            id="alma-gota-invertida"
            d="M 90 51 C 82 43 78 35 78 29 A 12 12 0 0 1 102 29 C 102 35 98 43 90 51 Z"
            fill={config.patternUrl}
            stroke={config.stroke}
            strokeWidth="0.8"
            animate={{ 
              d: [
                "M 84 51 C 78 43 76 35 76 29 A 12 12 0 0 1 100 29 C 100 35 95 43 84 51 Z",
                "M 96 51 C 85 43 80 35 80 29 A 12 12 0 0 1 104 29 C 104 35 102 43 96 51 Z",
                "M 84 51 C 78 43 76 35 76 29 A 12 12 0 0 1 100 29 C 100 35 95 43 84 51 Z"
              ]
            }}
            transition={{ 
              d: { duration: 4.5, ease: "easeInOut", repeat: Infinity }
            }}
            opacity="0.85"
          />

          {/* Ojos del Alma (se mueven lateralmente en sincronía con el balanceo del cuerpo) */}
          <motion.g
            id="alma-ojos-contenedor"
            animate={{ x: [-1.5, 1.5, -1.5] }}
            transition={{ duration: 4.5, ease: "easeInOut", repeat: Infinity }}
            style={{ originX: "90px", originY: "35px" }}
          >
            {(camoVariantId === 1 || camoVariantId === 5) && (
              <g id="alma-ojos-v5">
                <path d="M 85 27 C 85.5 28.5 87.5 28.5 88 27" stroke="#ffffff" fill="none" strokeWidth="0.75" strokeLinecap="round" id="ojo-izq-v5" />
                <path d="M 92 27 C 92.5 28.5 94.5 28.5 95 27" stroke="#ffffff" fill="none" strokeWidth="0.75" strokeLinecap="round" id="ojo-der-v5" />
              </g>
            )}
            {camoVariantId === 2 && (
              <g id="alma-ojos-v2">
                <path d="M 84.5 27.5 H 88" stroke="#e2e8f0" strokeWidth="0.8" strokeLinecap="round" id="ojo-izq-v2" />
                <path d="M 92 27.5 H 95.5" stroke="#e2e8f0" stroke-width="0.8" stroke-linecap="round" id="ojo-der-v2" />
              </g>
            )}
            {camoVariantId === 3 && (
              <g id="alma-ojos-v3">
                <path d="M 85 28.5 L 87.5 26.5" stroke="#e2e8f0" strokeWidth="0.95" strokeLinecap="round" id="ojo-izq-v3" />
                <path d="M 92 26.5 L 94.5 28.5" stroke="#e2e8f0" stroke-width="0.95" stroke-linecap="round" id="ojo-der-v3" />
              </g>
            )}
            {camoVariantId === 4 && (
              <g id="alma-ojos-v4">
                <path d="M 84.5 27.5 H 88" stroke="#ffffff" strokeWidth="0.65" strokeLinecap="round" id="ojo-izq-v4" />
                <path d="M 92 27.5 H 95.5" stroke="#ffffff" stroke-width="0.65" stroke-linecap="round" id="ojo-der-v4" />
              </g>
            )}
            {camoVariantId === 6 && (
              <g id="alma-ojos-v6">
                <circle cx="86" cy="27.5" r="1.2" fill="#22d3ee" style={{ filter: "drop-shadow(0 0 1px #22d3ee)" }} id="ojo-izq-v6" />
                <circle cx="94" cy="27.5" r="1.2" fill="#22d3ee" style={{ filter: "drop-shadow(0 0 1px #22d3ee)" }} id="ojo-der-v6" />
              </g>
            )}
            {camoVariantId === 7 && (
              <g id="alma-ojos-v7">
                <path d="M 85 28 C 85.5 26.5 87.5 26.5 88 28" stroke="#cbd5e1" fill="none" strokeWidth="0.75" strokeLinecap="round" id="ojo-izq-v7" />
                <path d="M 92 28 C 92.5 26.5 94.5 26.5 95 28" stroke="#cbd5e1" fill="none" stroke-width="0.75" stroke-linecap="round" id="ojo-der-v7" />
              </g>
            )}
            {camoVariantId === 8 && (
              <g id="alma-ojos-v8">
                <path d="M 86 25.5 L 87 27.5 L 89 27.5 L 87 28.5 L 86 30.5 L 85 28.5 L 83 27.5 L 85 27.5 Z" fill="#fef08a" stroke="#fbbf24" strokeWidth="0.4" id="ojo-izq-v8" />
                <path d="M 94 25.5 L 95 27.5 L 97 27.5 L 95 28.5 L 94 30.5 L 93 28.5 L 91 27.5 L 93 27.5 Z" fill="#fef08a" stroke="#fbbf24" stroke-width="0.4" id="ojo-der-v8" />
              </g>
            )}
          </motion.g>
        </motion.g>

        {/* Partículas flotantes de la gota */}
        <g id="alma-particulas-flotantes">
          {PARTICLE_TEMPLATES.map((p, idx) => {
            const color = config.particleColors[idx % config.particleColors.length];
            return (
              <motion.circle
                key={p.id}
                id={`alma-particula-${p.id}`}
                cx={90 + p.dx}
                cy={35 + p.dy}
                r={p.r * 0.8}
                fill={color}
                animate={{
                  y: [0, -18],
                  x: [0, p.dx > 0 ? 1.5 : -1.5, 0],
                  opacity: [0, 0.7, 0]
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

      {/* 2. El Pingüino Protagonista (Parado a la izquierda, mirando a la derecha y hacia abajo a Camo) */}
      <g id="protagonista-contenedor" transform="matrix(0.796426, 0, 0, 0.829579, 35.501, 22.127)">
        <g id="protagonista-posicion" transform="matrix(0, 0.848747, -0.768697, 0, 35, 115)">
          <motion.g
            id="protagonista-respiracion"
            animate={{ 
              x: [0, 0.3, 0],
              y: [0, -0.4, 0]
            }}
            transition={{ repeat: Infinity, duration: 3.2, ease: "easeInOut" }}
          >
            {/* Pata Superior */}
            <path 
              id="protagonista-pata-superior" 
              d="M -32.417 31.796 L -25.744 26.644 L -25.774 33.746 L -32.417 31.796 Z" 
              fill="#f59e0b" 
            />

            {/* Cuerpo */}
            <ellipse id="protagonista-cuerpo" cx="-47.91" cy="37.303" rx="20" ry="14" fill="#18181b" />
            
            {/* Vientre */}
            <ellipse id="protagonista-vientre" cx="-49.91" cy="31.303" rx="14" ry="8" fill="#f4f4f5" />
            
            {/* Cabeza */}
            <circle id="protagonista-cabeza" cx="-67.91" cy="33.303" r="10" fill="#18181b" />
            
            {/* Bufanda */}
            <g id="protagonista-bufanda" transform="matrix(1, 0, 0, 1, -51.910336, 17.303471)">
              <path id="protagonista-bufanda-cuello" d="M -14.315 26.443 C -12.315 20.443 -3.738 18.577 -6.624 13.624" stroke="#ef4444" strokeWidth="2.2" fill="none" strokeLinecap="round" />
              <path id="protagonista-bufanda-caida-roja" d="M -7.663 13.49 C -2.663 12.49 3 11 7 9 C 5 7 0.204 10.408 -6.796 12.408 L -7.663 13.49 Z" fill="#ef4444" />
              <path id="protagonista-bufanda-caida-guinda" d="M -6.929 14.898 C -1.929 14.898 2 14 5 13 C 3 11 -0.337 13.357 -7.337 13.357 L -6.929 14.898 Z" fill="#b91c1c" />
            </g>
            
            {/* Ojo del Protagonista buscando abajo-izquierda (cx=-66.2, cy=31.8) y micro-animado */}
            <g id="protagonista-ojo">
              <circle id="protagonista-ojo-borde" cx="-67.91" cy="33.303" r="2.2" fill="#f4f4f5" />
              <motion.circle 
                id="protagonista-ojo-pupila" 
                cx="-66.2" 
                cy="31.8" 
                r="1.019" 
                fill="#000000"
                animate={{
                  x: [-0.15, 0.15, -0.15],
                  y: [-0.1, 0.1, -0.1]
                }}
                transition={{ repeat: Infinity, duration: 4.8, ease: "easeInOut" }}
              />
            </g>
            
            {/* Pico */}
            <polygon id="protagonista-pico" points="-70.91 26.303 -67.91 19.303 -64.91 26.303" fill="#f59e0b" />
            
            {/* Pata Inferior */}
            <g id="protagonista-patas" transform="matrix(1, 0, 0, 1, -51.910336, 17.303471)">
              <path 
                id="protagonista-pata-inferior" 
                d="M 26.663 20.735 L 26.851 27.446 L 19.486 24.256 L 26.663 20.735 Z" 
                fill="#f59e0b"
              />
            </g>
            
            {/* Aleta */}
            <path id="protagonista-aleta" d="M -56.369 37.201 C -57.631 41.252 -39.926 36.511 -37.926 32.511" strokeWidth="2.5" strokeLinecap="round" stroke="rgb(0, 0, 0)" fill="none" />
          </motion.g>
        </g>
      </g>
    </svg>
  );
}
