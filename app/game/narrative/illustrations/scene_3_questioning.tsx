'use client';

import { motion } from 'framer-motion';

const stepsEasing = (t: number) => Math.floor(t * 4) / 4;

interface Scene3QuestioningProps {
  variantId?: number;
}

export default function Scene3Questioning({ variantId = 1 }: Scene3QuestioningProps) {
  // Determine coordinate positioning based on the variant
  const transformAttr = variantId === 1 
    ? "matrix(1, 0, 0, 1, 143.042971, 46.495595)" 
    : "translate(144.786593, 48.021283)";

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
      </defs>

      {/* Total Black Background */}
      <rect width="200" height="120" fill="#000000" />

      {/* 1. The Penguin (statically stood up, positioned on the left) */}
      <g id="pinguino-contenedor" transform="translate(99.601913, 50.428756)">
        <g transform="translate(-47.91, 37.303)">
          {/* Static rotation of 90 degrees so it mounts already standing */}
          <g transform="rotate(90)">
            <g transform="translate(47.91, -37.303)">
              <motion.g
                id="pinguino-respiracion"
                // In the 90deg rotated space, the X-axis points downwards,
                // so animating negative x moves the standing penguin vertically up and down
                animate={{ x: [0, -0.4, 0] }}
                transition={{ repeat: Infinity, duration: 3.2, ease: "easeInOut" }}
              >
                {/* Pata Superior (capa de fondo) */}
                <path id="pata-superior" d="M -32.417 31.796 L -25.744 26.644 L -25.774 33.746 L -32.417 31.796 Z" fill="#f59e0b" />

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
                
                {/* Surprised Open Eye (looking at the subconscious eye) */}
                <g id="ojo">
                  <circle id="ojo-borde" cx="-67.91" cy="33.303" r="2.2" fill="#f4f4f5" />
                  <circle id="ojo-pupila" cx="-68.454" cy="32.397" r="1.019" fill="#000000" />
                </g>
                
                {/* Pico */}
                <polygon id="pico" points="-70.91 26.303 -67.91 19.303 -64.91 26.303" fill="#f59e0b" />
                
                {/* Pata Inferior */}
                <g id="patas" transform="matrix(1, 0, 0, 1, -51.910336, 17.303471)">
                  <path id="pata-inferior" d="M 26.663 20.735 L 26.851 27.446 L 19.486 24.256 L 26.663 20.735 Z" fill="#f59e0b" />
                </g>
                
                {/* Aleta */}
                <path id="aleta" d="M -56.369 37.201 C -57.631 41.252 -39.926 36.511 -37.926 32.511" strokeWidth="2.5" strokeLinecap="round" stroke="rgb(0, 0, 0)" fill="none" />
              </motion.g>
            </g>
          </g>
        </g>
      </g>

      {/* 2. The Subconscious Eye (on the right, floating statically with no entry animation) */}
      <g transform={transformAttr}>
        <g id="ojo-subconsciente-entrada">
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
        </g>
      </g>

      {/* 3. Question marks "??" floating above head (swaying and rising) */}
      <g id="preguntas-signos" transform="translate(54, 58)">
        <motion.text
          id="signo-pequeno"
          x="0" y="0"
          fill="#cbd5e1"
          fontSize="6"
          fontWeight="bold"
          fontFamily="monospace"
          animate={{ 
            opacity: [0, 0.9, 0], 
            y: [-1, -16], 
            x: [0, 1.5, -1.5, 0],
            scale: [0.7, 1.1]
          }}
          transition={{ repeat: Infinity, duration: 2.8, ease: "easeInOut", delay: 0.2 }}
        >
          ?
        </motion.text>
        <motion.text
          id="signo-grande"
          x="4" y="-3"
          fill="#94a3b8"
          fontSize="8"
          fontWeight="bold"
          fontFamily="monospace"
          animate={{ 
            opacity: [0, 0.8, 0], 
            y: [-3, -24], 
            x: [0, -2, 2, 0],
            scale: [0.8, 1.2]
          }}
          transition={{ repeat: Infinity, duration: 2.8, ease: "easeInOut", delay: 1.2 }}
        >
          ?
        </motion.text>
      </g>
    </svg>
  );
}
