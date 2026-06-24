'use client';

import { motion } from 'framer-motion';

const stepsEasing = (t: number) => Math.floor(t * 4) / 4;

interface Scene4WalkingProps {
  variantId?: number;
}

export default function Scene4Walking({ variantId = 1 }: Scene4WalkingProps) {
  // Eye positioned and scaled using user matrix normalized to (0, 0)
  const transformAttr = "matrix(-0.794842, 0, 0, 0.845185, 50.107243, 37.822482)";

  return (
    <svg viewBox="0 0 200 120" className="w-full h-full">
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

        {/* Patrón de camuflaje de Camo */}
        <pattern id="camo-soul" width="40" height="40" patternUnits="userSpaceOnUse" patternTransform="rotate(25)">
          {/* Base: Green-gray */}
          <rect width="40" height="40" fill="#4f5d4e" />
          
          {/* Café/Marrón stripes */}
          <motion.path 
            d="M -10,5 C 5,12 15,2 25,10 C 35,18 42,6 55,12 L 55,22 C 40,16 35,26 22,18 C 10,10 -2,15 -10,12 Z" 
            fill="#5c4033"
            animate={{
              x: [-2, 2, -2],
              y: [-1, 1, -1]
            }}
            transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
          />
          
          {/* Blanco/Beige stripes */}
          <motion.path 
            d="M -10,25 C 2,28 12,20 24,32 C 34,40 40,28 55,30 L 55,38 C 42,35 34,45 22,38 C 12,30 2,36 -10,32 Z" 
            fill="#d8d8d0"
            animate={{
              x: [2, -2, 2],
              y: [1, -1, 1]
            }}
            transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}
          />

          {/* Verde claro/Gris stripes */}
          <motion.path 
            d="M -10,-8 C 5,-2 15,-10 25,-4 C 35,2 42,-8 55,-4 L 55,4 C 40,-1 35,6 22,0 C 10,-6 -2,2 -10,-2 Z" 
            fill="#7ba077"
            animate={{
              x: [-1.5, 1.5, -1.5],
              y: [-1.5, 1.5, -1.5]
            }}
            transition={{ repeat: Infinity, duration: 7, ease: "easeInOut" }}
          />
        </pattern>
      </defs>

      {/* Total Black Background */}
      <rect width="200" height="120" fill="#000000" />

      {/* 1. The Penguin (standing up on the left, scaled and positioned using user matrix) */}
      <g id="pinguino-contenedor" transform="matrix(0, 0.848747, -0.768697, 0, 63.980534, 122.770161)">
        <motion.g
          id="pinguino-caminar-bamboleo"
          animate={{ 
            x: [0, -0.8, 0], // Bobbing up and down (in rotated local space)
            rotate: [-3.5, 3.5, -3.5] // Waddling sway back and forth
          }}
          transition={{ repeat: Infinity, duration: 0.7, ease: "easeInOut" }}
        >
          {/* Pata Superior (capa de fondo) - Walking swing in opposite phase */}
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
          
          {/* Eye (looking at eye subconscious - modified look coordinates by user) */}
          <g id="ojo">
            <circle id="ojo-borde" cx="-67.91" cy="33.303" r="2.2" fill="#f4f4f5" />
            <circle id="ojo-pupila" cx="-68.196" cy="31.871" r="1.019" fill="#000000" />
          </g>
          
          {/* Pico */}
          <polygon id="pico" points="-70.91 26.303 -67.91 19.303 -64.91 26.303" fill="#f59e0b" />
          
          {/* Pata Inferior - Walking swing */}
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

      {/* 2. The Subconscious Eye (floating, mirrored and scaled using user matrix) */}
      <g transform={transformAttr}>
        <motion.g
          id="ojo-subconsciente-entrada"
          // Slow fade-in and scale entry animation (same as scene 2)
          initial={{ opacity: 0, scale: 0.6, y: -15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 2.8, ease: "easeOut", delay: 0.4 }}
        >
          {variantId === 1 && (
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
          )}

          {variantId === 2 && (
            <motion.g
              id="ojo-subconsciente-flotacion"
              animate={{ 
                y: [-2.5, 2.5, -2.5],
                scale: [0.99, 1.01, 0.99]
              }}
              transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
            >
              <circle id="ojo-glow-outer" cx="0" cy="0" r="24" fill="#ffffff" opacity="0.08" />
              <path id="ojo-esclera" d="M -18 0 C -9 -10 9 -10 18 0 C 9 10 -9 10 -18 0 Z" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="0.6" />
              <motion.g
                id="ojo-pupila-movimiento"
                animate={{ 
                  rx: [1.2, 2.2, 1.2],
                  ry: [7.2, 7.8, 7.2]
                }}
                transition={{ repeat: Infinity, duration: 3.5, ease: "easeInOut" }}
              >
                <ellipse id="ojo-pupila" cx="-2" cy="0" rx="1.8" ry="7.5" fill="#0f172a" />
                <circle id="ojo-brillo" cx="-2.8" cy="-2" r="1" fill="#ffffff" opacity="0.9" />
              </motion.g>
            </motion.g>
          )}

          {variantId === 3 && (
            <motion.g
              id="ojo-subconsciente-flotacion"
              animate={{ 
                y: [-3, 3, -3],
                rotate: [0, 10, -10, 0]
              }}
              transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}
            >
              <circle id="ojo-glow-outer" cx="0" cy="0" r="24" fill="#ffffff" opacity="0.08" />
              <path id="ojo-esclera-anillo" d="M 0 -15 A 15 15 0 1 0 0 15 A 15 15 0 1 0 0 -15 Z M 0 -8 A 8 8 0 1 1 0 8 A 8 8 0 1 1 0 -8 Z" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="0.5" fillRule="evenodd" />
              <motion.g
                id="ojo-pupila-movimiento"
                animate={{ 
                  x: [-1.5, 1.5, -1.5],
                  y: [-1, 1, -1] 
                }}
                transition={{ repeat: Infinity, duration: 4.5, ease: "easeInOut" }}
              >
                <circle id="ojo-pupila" cx="-1.5" cy="0" r="4.5" fill="#0f172a" />
                <circle id="ojo-brillo" cx="-2.5" cy="-1" r="1" fill="#ffffff" />
              </motion.g>
            </motion.g>
          )}

          {variantId === 4 && (
            <motion.g
              id="ojo-subconsciente-flotacion"
              animate={{ 
                y: [-2, 2, -2]
              }}
              transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
            >
              <circle id="ojo-glow-outer" cx="0" cy="0" r="24" fill="#ffffff" opacity="0.08" />
              <circle id="ojo-esclera-centro" cx="0" cy="0" r="8" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="0.5" />
              <motion.g
                id="ojo-pupila-movimiento"
                animate={{ 
                  x: [-0.8, 0.8, -0.8]
                }}
                transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
              >
                <circle id="ojo-pupila" cx="-1.5" cy="0" r="3.5" fill="#0f172a" />
                <circle id="ojo-brillo" cx="-2.5" cy="-0.8" r="0.8" fill="#ffffff" />
              </motion.g>
            </motion.g>
          )}

          {variantId === 5 && (
            <motion.g
              id="ojo-subconsciente-flotacion"
              animate={{ 
                y: [-3, 3, -3],
                scale: [0.98, 1.02, 0.98]
              }}
              transition={{ repeat: Infinity, duration: 4.5, ease: "easeInOut" }}
            >
              <circle id="ojo-glow-outer" cx="0" cy="0" r="24" fill="#ffffff" opacity="0.08" />
              <motion.path 
                id="ojo-esclera-estrella" 
                d="M 0 -16 L 4 -5 L 15 -4 L 7 3 L 10 14 L 0 8 L -10 14 L -7 3 L -15 -4 L -4 -5 Z" 
                fill="#f8fafc" stroke="#cbd5e1" strokeWidth="0.6"
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
              />
              <motion.g
                id="ojo-pupila-movimiento"
                animate={{ 
                  scale: [0.95, 1.05, 0.95]
                }}
                transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
              >
                <circle id="ojo-pupila" cx="-2" cy="0" r="5" fill="#0f172a" />
                <line id="ojo-cruz-h" x1="-3.5" y1="-1.5" x2="-0.5" y2="-1.5" stroke="#ffffff" strokeWidth="0.8" />
                <line id="ojo-cruz-v" x1="-2" y1="-3" x2="-2" y2="0" stroke="#ffffff" strokeWidth="0.8" />
              </motion.g>
            </motion.g>
          )}

          {variantId === 6 && (
            <motion.g
              id="ojo-subconsciente-flotacion"
              animate={{ 
                y: [-2.5, 2.5, -2.5]
              }}
              transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}
            >
              <circle id="ojo-glow-outer" cx="0" cy="0" r="24" fill="#ffffff" opacity="0.08" />
              <motion.g
                id="ojo-parpadeo-movimiento"
                animate={{ scaleY: [1, 1, 1, 0.1, 1, 1, 0.1, 1] }}
                transition={{ repeat: Infinity, duration: 6, times: [0, 0.4, 0.45, 0.47, 0.5, 0.9, 0.93, 0.95] }}
              >
                <path id="ojo-parpado-superior" d="M -16 2 C -8 -11 8 -11 16 2" fill="none" stroke="#ffffff" strokeWidth="3" strokeLinecap="round" />
                <path id="ojo-parpado-inferior" d="M -16 2 C -8 11 8 11 16 2" fill="none" stroke="#ffffff" strokeWidth="3" strokeLinecap="round" />
                <path id="ojo-pupila" d="M -4 -3 C -1 -3 1 -1 1 2 C 1 5 -1 7 -4 7 C -2.5 5 -2 2 -4 -3 Z" fill="#0f172a" />
              </motion.g>
            </motion.g>
          )}

          {variantId === 7 && (
            <motion.g
              id="ojo-subconsciente-flotacion"
              animate={{ 
                y: [0, 3, 0, -3, 0]
              }}
              transition={{ repeat: Infinity, duration: 4, ease: stepsEasing }}
            >
              <circle id="ojo-glow-outer" cx="0" cy="0" r="24" fill="#ffffff" opacity="0.08" />
              <path id="ojo-pixel-esclera" d="M -15 -3 L -12 -3 L -12 -6 L -6 -6 L -6 -9 L 6 -9 L 6 -6 L 12 -6 L 12 -3 L 15 -3 L 15 3 L 12 3 L 12 6 L 6 6 L 6 9 L -6 9 L -6 6 L -12 6 L -12 3 L -15 3 Z" fill="#ffffff" stroke="#cbd5e1" strokeWidth="1.5" />
              <motion.g
                id="ojo-pupila-movimiento"
                animate={{ opacity: [0.85, 0.98, 0.85] }}
                transition={{ repeat: Infinity, duration: 0.25, ease: "linear" }}
              >
                <rect id="ojo-pupila" x="-5" y="-4" width="6" height="8" fill="#0f172a" />
                <rect id="ojo-brillo" x="-4" y="-2" width="2" height="2" fill="#ffffff" />
              </motion.g>
            </motion.g>
          )}

          {variantId === 8 && (
            <motion.g
              id="ojo-subconsciente-flotacion"
              animate={{ 
                y: [-3, 3, -3]
              }}
              transition={{ repeat: Infinity, duration: 4.5, ease: "easeInOut" }}
            >
              <circle id="ojo-glow-outer" cx="0" cy="0" r="26" fill="#ffffff" opacity="0.08" />
              <circle id="ojo-esclera" cx="0" cy="0" r="11" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="0.5" />
              <motion.g
                id="ojo-pupila-movimiento"
                animate={{ 
                  x: [-1, 1, -1],
                  y: [-0.5, 0.5, -0.5]
                }}
                transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}
              >
                <circle id="ojo-pupila" cx="-1.5" cy="0" r="4.2" fill="#0f172a" />
                <circle id="ojo-brillo" cx="-2.5" cy="-1" r="1.2" fill="#ffffff" />
              </motion.g>
              <g id="ojo-anillos">
                <motion.ellipse 
                  id="ojo-anillo-1" cx="0" cy="0" rx="21" ry="5.5" 
                  fill="none" stroke="#ffffff" strokeWidth="0.8" 
                  transform="rotate(30)"
                  animate={{ rotate: 360 }}
                  transition={{ repeat: Infinity, duration: 16, ease: "linear" }}
                />
                <motion.ellipse 
                  id="ojo-anillo-2" cx="0" cy="0" rx="21" ry="5.5" 
                  fill="none" stroke="#ffffff" strokeWidth="0.8" 
                  transform="rotate(-30)"
                  animate={{ rotate: -360 }}
                  transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
                />
                <motion.ellipse 
                  id="ojo-anillo-3" cx="0" cy="0" rx="23" ry="7" 
                  fill="none" stroke="#ffffff" strokeWidth="0.5" 
                  transform="rotate(90)"
                  animate={{ rotate: 360 }}
                  transition={{ repeat: Infinity, duration: 24, ease: "linear" }}
                />
                <motion.g
                  id="ojo-anillos-orbitas-1"
                  animate={{ rotate: -360 }}
                  transition={{ repeat: Infinity, duration: 16, ease: "linear" }}
                >
                  <circle cx="-16.5" cy="-9.5" r="1.2" fill="#ffffff" />
                  <circle cx="16.5" cy="9.5" r="1.2" fill="#ffffff" />
                </motion.g>
                <motion.g
                  id="ojo-anillos-orbitas-2"
                  animate={{ rotate: 360 }}
                  transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
                >
                  <circle cx="-10.5" cy="16.5" r="1.2" fill="#ffffff" />
                  <circle cx="10.5" cy="-16.5" r="1.2" fill="#ffffff" />
                </motion.g>
              </g>
            </motion.g>
          )}
        </motion.g>
      </g>

      {/* 3. The Soul of Camo (pulsing, bottom-right, varying by variantId) */}
      <g id="camo-alma-contenedor" transform="translate(0, 0)">
        {/* Outer Glow */}
        <motion.circle
          cx="165"
          cy="90"
          r="22"
          fill="url(#camo-glow)"
          animate={{ scale: [0.9, 1.15, 0.9], opacity: [0.7, 0.95, 0.7] }}
          transition={{ repeat: Infinity, duration: 3.5, ease: "easeInOut" }}
        />

        {variantId === 1 && (
          // Variant 1: Gota/Flama de Alma Espiritual (Ghost/Flame Soul)
          <motion.path
            id="alma-gota"
            d="M 165 74 C 157 82 153 90 153 96 A 12 12 0 1 0 177 96 C 177 90 173 82 165 74 Z"
            fill="url(#camo-soul)"
            stroke="#7ba077"
            strokeWidth="0.8"
            animate={{ 
              y: [-2, 2, -2],
              scale: [0.97, 1.03, 0.97]
            }}
            transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
          />
        )}

        {variantId === 2 && (
          // Variant 2: Retícula de Francotirador (Sniper Crosshair)
          <motion.g
            id="alma-reticula"
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 25, ease: "linear" }}
            style={{ originX: "165px", originY: "90px" }}
          >
            <circle cx="165" cy="90" r="11" stroke="url(#camo-soul)" strokeWidth="2.2" fill="none" />
            <line x1="150" y1="90" x2="180" y2="90" stroke="#f4f4f5" strokeWidth="0.8" opacity="0.6" />
            <line x1="165" y1="75" x2="165" y2="105" stroke="#f4f4f5" strokeWidth="0.8" opacity="0.6" />
            <circle cx="165" cy="90" r="4.5" fill="url(#camo-soul)" stroke="#d8d8d0" strokeWidth="0.5" />
          </motion.g>
        )}

        {variantId === 3 && (
          // Variant 3: Escudo Militar (Military Shield)
          <motion.path
            id="alma-escudo"
            d="M 155 78 L 175 78 L 175 90 C 175 98 165 104 165 104 C 165 104 155 98 155 90 Z"
            fill="url(#camo-soul)"
            stroke="#5c4033"
            strokeWidth="1"
            animate={{ 
              opacity: [0.75, 1, 0.75],
              scale: [0.98, 1.02, 0.98]
            }}
            transition={{ repeat: Infinity, duration: 3.5, ease: "easeInOut" }}
          />
        )}

        {variantId === 4 && (
          // Variant 4: Radar de Barrido (Radar/Pulse)
          <g id="alma-radar">
            <circle cx="165" cy="90" r="13" stroke="url(#camo-soul)" strokeWidth="1.5" fill="none" opacity="0.8" />
            <circle cx="165" cy="90" r="7" stroke="url(#camo-soul)" strokeWidth="0.8" fill="none" strokeDasharray="2 2" opacity="0.5" />
            <motion.line
              x1="165"
              y1="90"
              x2="165"
              y2="77"
              stroke="#7ba077"
              strokeWidth="1.5"
              strokeLinecap="round"
              style={{ originX: "165px", originY: "90px" }}
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 4, ease: "linear" }}
            />
            <circle cx="165" cy="90" r="2.5" fill="#f4f4f5" />
          </g>
        )}

        {variantId === 5 && (
          // Variant 5: Rombo Pixelado (Pixel Spark)
          <motion.path
            id="alma-rombo"
            d="M 165 76 L 178 89 L 165 102 L 152 89 Z"
            fill="url(#camo-soul)"
            stroke="#d8d8d0"
            strokeWidth="1"
            animate={{ 
              y: [-1, 1, -1],
              opacity: [0.8, 1, 0.8]
            }}
            transition={{ repeat: Infinity, duration: 0.5, ease: stepsEasing }}
          />
        )}

        {variantId === 6 && (
          // Variant 6: Pluma/Espíritu de Ave (Bird Feather / Spirit)
          <motion.path
            id="alma-pluma"
            d="M 165 74 C 160 80 156 88 158 98 C 162 98 165 92 168 95 C 172 88 170 80 165 74 Z"
            fill="url(#camo-soul)"
            stroke="#7ba077"
            strokeWidth="1"
            animate={{ 
              rotate: [-5, 5, -5],
              y: [-2, 2, -2]
            }}
            transition={{ repeat: Infinity, duration: 4.5, ease: "easeInOut" }}
          />
        )}

        {variantId === 7 && (
          // Variant 7: Proyectil/Bala Abstracto (Bullet Shell)
          <motion.g
            id="alma-bala"
            animate={{ 
              y: [-1.5, 1.5, -1.5]
            }}
            transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
          >
            <path d="M 160 98 L 160 84 C 160 80 170 80 170 84 L 170 98 Z" fill="url(#camo-soul)" stroke="#5c4033" strokeWidth="0.8" />
            <rect x="158" y="98" width="14" height="3" fill="#d8d8d0" rx="0.5" />
          </motion.g>
        )}

        {variantId === 8 && (
          // Variant 8: Estrella de 4 Puntas (Compass Star)
          <motion.path
            id="alma-estrella"
            d="M 165 74 L 168 87 L 181 90 L 168 93 L 165 106 L 162 93 L 149 90 L 162 87 Z"
            fill="url(#camo-soul)"
            stroke="#d8d8d0"
            strokeWidth="0.8"
            animate={{ 
              rotate: [0, 90, 180, 270, 360],
              scale: [0.95, 1.05, 0.95]
            }}
            transition={{ repeat: Infinity, duration: 12, ease: "linear" }}
          />
        )}
      </g>
    </svg>
  );
}
