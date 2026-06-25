'use client';

import { motion } from 'framer-motion';

interface Scene6GlowProps {
  glowVariantId?: number;     // 1 a 8 para cambiar la temática del color del resplandor
}

const GLOW_CONFIGS: Record<number, {
  colorStart: string;
  colorMiddle: string;
  colorEnd: string;
  glowFilter: string;
}> = {
  1: { colorStart: '#34d399', colorMiddle: '#059669', colorEnd: '#064e3b', glowFilter: 'drop-shadow(0 0 10px #34d399)' },
  2: { colorStart: '#4ade80', colorMiddle: '#16a34a', colorEnd: '#14532d', glowFilter: 'drop-shadow(0 0 10px #4ade80)' },
  3: { colorStart: '#fbbf24', colorMiddle: '#d97706', colorEnd: '#78350f', glowFilter: 'drop-shadow(0 0 10px #fbbf24)' },
  4: { colorStart: '#38bdf8', colorMiddle: '#0284c7', colorEnd: '#0c4a6e', glowFilter: 'drop-shadow(0 0 10px #38bdf8)' },
  5: { colorStart: '#22d3ee', colorMiddle: '#0891b2', colorEnd: '#164e63', glowFilter: 'drop-shadow(0 0 10px #22d3ee)' }, // Cyan/Mágico
  6: { colorStart: '#818cf8', colorMiddle: '#4f46e5', colorEnd: '#312e81', glowFilter: 'drop-shadow(0 0 10px #818cf8)' },
  7: { colorStart: '#cbd5e1', colorMiddle: '#64748b', colorEnd: '#1e293b', glowFilter: 'drop-shadow(0 0 10px #cbd5e1)' },
  8: { colorStart: '#fbbf24', colorMiddle: '#ca8a04', colorEnd: '#854d0e', glowFilter: 'drop-shadow(0 0 10px #fbbf24)' },
};

const GLOW_PARTICLES = [
  { id: 1, dx: -4, dy: 0, duration: 2.2, delay: 0 },
  { id: 2, dx: 4, dy: -2, duration: 2.6, delay: 0.5 },
  { id: 3, dx: -1, dy: -4, duration: 1.8, delay: 1.0 },
  { id: 4, dx: 3, dy: 2, duration: 2.4, delay: 1.5 },
];

export default function Scene6Glow({
  glowVariantId = 5
}: Scene6GlowProps) {
  
  const glowConfig = GLOW_CONFIGS[glowVariantId] || GLOW_CONFIGS[5];

  return (
    <svg viewBox="0 0 200 120" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
      <defs>
        {/* Gradiente Ojo Blanco Metálico/Plata */}
        <radialGradient id="white-eye-grad" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="70%" stopColor="#f8fafc" />
          <stop offset="100%" stopColor="#cbd5e1" />
        </radialGradient>

        {/* Gradiente dinámico de resplandor para las manos */}
        <radialGradient id="hand-glow-grad" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor={glowConfig.colorStart} stopOpacity={1} />
          <stop offset="50%" stopColor={glowConfig.colorMiddle} stopOpacity={0.65} />
          <stop offset="100%" stopColor={glowConfig.colorEnd} stopOpacity={0} />
        </radialGradient>
      </defs>

      {/* Fondo Negro Absoluto */}
      <rect width="200" height="120" fill="#000000" x="0" y="0" id="fondo-escena" />

      {/* 1. Protagonista mirando hacia abajo en el centro */}
      <g id="protagonista-contenedor" transform="matrix(0.796426, 0, 0, 0.829579, 101.277, 8.853)">
        <g id="protagonista-posicion" transform="matrix(0, 0.848747, -0.768697, 0, 35, 115)">
          <motion.g
            id="protagonista-respiracion"
            animate={{ 
              x: [0, 0.2, 0],
              y: [0, -0.4, 0]
            }}
            transition={{ repeat: Infinity, duration: 3.5, ease: "easeInOut" }}
          >
            {/* Patas del Protagonista */}
            <g id="protagonista-patas" transform="matrix(1, 0, 0, 1, -51.910336, 17.303471)">
              <path id="protagonista-pata-inferior" d="M 22.869 24.905 L 23.057 31.616 L 15.692 28.426 L 22.869 24.905 Z" fill="#f59e0b"/>
            </g>
            <g id="protagonista-patas-superior">
              <path id="protagonista-pata-superior" d="M -35.622 35.869 L -29.033 32.462 L -29.063 39.564 L -35.622 35.869 Z" fill="#f59e0b"/>
            </g>
 
            {/* Cuerpo del Protagonista (Gris oscuro con vientre blanco) */}
            <ellipse id="protagonista-cuerpo" cx="-52.831" cy="41.022" rx="20" ry="14" fill="#18181b" />
            <ellipse id="protagonista-vientre" cx="-54.21" cy="39.739" rx="14" ry="7.999" fill="#f4f4f5" style={{ transformBox: "fill-box", transformOrigin: "50% 50%" }} transform="matrix(0.999912, -0.013232, 0.010004, 0.999955, -0.505833, 1.163667)"/>
            
            {/* Cabeza del Protagonista */}
            <circle id="protagonista-cabeza" cx="-80.174" cy="41.967" r="10" fill="#18181b" />

            {/* Bufanda Roja del Protagonista */}
            <g id="protagonista-bufanda" transform="matrix(1, 0, 0, 1, -51.910336, 17.303471)">
              <path id="protagonista-bufanda-cuello" d="M -19.205 29.546 C -17.205 23.546 -17.229 23.62 -19.862 18.279" stroke="#ef4444" strokeWidth="2.2" fill="none" strokeLinecap="round"/>
              <path id="protagonista-bufanda-caida-roja" d="M -16.769 24.06 C -11.769 23.06 -14.875 24.867 -7.755 23.934 C -12.791 23.485 -10.167 20.493 -17.167 22.493 L -16.769 24.06 Z" fill="#ef4444"/>
              <path id="protagonista-bufanda-caida-guinda" d="M -17.131 26.05 C -13.649 23.432 -11.491 26.897 -8.491 25.897 C -10.491 23.897 -12.226 24.897 -16.612 24.024 L -17.131 26.05 Z" fill="#b91c1c"/>
            </g>

            {/* Ojos del Protagonista mirando hacia abajo */}
            <g id="protagonista-ojo-izquierdo" transform="matrix(1, 0, 0, 1, -12.964486, 12.089528)">
              <circle id="protagonista-ojo-izq-borde" cx="-67.91" cy="33.303" r="2.2" fill="#f4f4f5"/>
              <motion.circle 
                id="protagonista-ojo-izq-pupila" 
                cx="-66.903" 
                cy="33.255" 
                r="1.019" 
                fill="#000000"
                animate={{
                  x: [-0.08, 0.08, -0.08],
                  y: [-0.05, 0.05, -0.05]
                }}
                transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
              />
            </g>
            <g id="protagonista-ojo-derecho" transform="matrix(1, 0, 0, 1, -13.406372, 4.79269)">
              <circle id="protagonista-ojo-der-borde" cx="-67.91" cy="33.303" r="2.2" fill="#f4f4f5"/>
              <motion.circle 
                id="protagonista-ojo-der-pupila" 
                cx="-66.692" 
                cy="33.174" 
                r="1.019" 
                fill="#000000"
                animate={{
                  x: [-0.08, 0.08, -0.08],
                  y: [-0.05, 0.05, -0.05]
                }}
                transition={{ repeat: Infinity, duration: 4, ease: "easeInOut", delay: 0.2 }}
              />
            </g>

            {/* Pico del Protagonista apuntando hacia abajo */}
            <polygon id="protagonista-pico" points="-78.432 41.582 -75.432 38.14 -75.384 44.735" fill="#f59e0b" />

            {/* Sus aletas posicionadas al frente, sosteniendo el resplandor */}
            <g id="protagonista-aletas">
              {/* Aleta izquierda */}
              <path id="protagonista-aleta-izq" d="M -65.559 48.643 C -66.821 52.694 -40.685 47.857 -49.73 42.79" strokeWidth="2.5" strokeLinecap="round" stroke="rgb(0, 0, 0)" fill="none" />
              {/* Aleta derecha */}
              <path id="protagonista-aleta-der" d="M -66.114 33.119 C -67.376 29.926 -40.396 32.693 -50.116 38.658" strokeWidth="2.5" strokeLinecap="round" stroke="rgb(0, 0, 0)" fill="none" style={{ strokeWidth: 2.5 }} />
            </g>
          </motion.g>
        </g>
      </g>

      {/* 2. El Resplandor Mágico en sus manos (X=104, Y=58) */}
      <g id="resplandor-magico" style={{ mixBlendMode: 'screen' }}>
        {/* Glow de Fondo Radial Pulsante */}
        <motion.circle
          cx="104"
          cy="58"
          r="16"
          fill="url(#hand-glow-grad)"
          animate={{
            r: [12, 24, 12],
            opacity: [0.65, 0.95, 0.65]
          }}
          transition={{
            repeat: Infinity,
            duration: 2.8,
            ease: "easeInOut"
          }}
          style={{ filter: glowConfig.glowFilter }}
        />

        {/* Punto de luz brillante en el centro */}
        <motion.circle
          cx="104"
          cy="58"
          r="3"
          fill="#ffffff"
          animate={{
            scale: [0.8, 1.3, 0.8],
            opacity: [0.8, 1, 0.8]
          }}
          transition={{
            repeat: Infinity,
            duration: 1.4,
            ease: "easeInOut"
          }}
        />

        {/* Partículas de energía mágica flotando hacia arriba */}
        {GLOW_PARTICLES.map((p) => (
          <motion.circle
            key={p.id}
            id={`particula-magica-${p.id}`}
            cx={104 + p.dx}
            cy={58 + p.dy}
            r="1.4"
            fill={glowConfig.colorStart}
            animate={{
              y: [0, -18],
              x: [0, p.dx > 0 ? 3.5 : -3.5, 0],
              opacity: [0, 0.9, 0],
              scale: [0.8, 1.4, 0.6]
            }}
            transition={{
              repeat: Infinity,
              duration: p.duration,
              delay: p.delay,
              ease: "easeOut"
            }}
            style={{ filter: glowConfig.glowFilter }}
          />
        ))}
      </g>

      {/* 3. El Ojo Subconsciente observando al Protagonista desde arriba */}
      <g 
        id="ojo-subconsciente-grupo" 
        transform="matrix(-0.49031, 0, 0, 0.488349, 101.288, 26.079)"
      >
        <motion.g
          id="ojo-subconsciente-flotacion"
          animate={{
            y: [-2, 2, -2]
          }}
          transition={{
            repeat: Infinity,
            duration: 4.8,
            ease: "easeInOut"
          }}
        >
          {/* Ojo Glow */}
          <circle id="ojo-glow" cx="1.961" cy="-10.68" r="18" fill="#ffffff" opacity="0.08" transform="matrix(1.726518, 0, 0, 1.106832, -9.235068, 0.649597)" />
          {/* Ojo Esclera */}
          <circle id="ojo-esclera" cx="3.705" cy="-5.231" r="10.925" fill="url(#white-eye-grad)" strokeWidth="0.5" stroke="#e2e8f0" style={{ transformOrigin: "3.705px -5.231px" }} transform="matrix(1.29319, -0.463554, 0.663729, 1.046532, -8.874192, -6.849365)" />
          {/* Ojo Trazo Luz */}
          <path id="ojo-trazo-luz" style={{ fill: "none", stroke: "rgb(255, 255, 255)", strokeWidth: 0.489, transformBox: "fill-box", transformOrigin: "50% 50%" }} d="M -36.019 -8.803 C -35.797 -10.37 3.97 -37.752 -3.682 -36.216 C -9.163 -35.116 19.986 -17.875 23.111 -7.302" opacity="0.8" />
          
          {/* Pupila del ojo observándolo fija hacia abajo con micro-jitter */}
          <motion.g 
            id="ojo-pupila-grupo-interno"
            animate={{
              x: [-0.3, 0.3, -0.3],
              y: [-0.15, 0.15, -0.15]
            }}
            transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
          >
            <circle id="ojo-pupila-centro" cx="-4.5" cy="-8.0" r="6.2" fill="#0f172a" />
            <circle id="ojo-pupila-brillo" cx="-4.8" cy="-1.8" r="1.5" fill="#ffffff" transform="matrix(-1.397505, 0, 0, 1.944474, -11.501339, -1.758476)" />
          </motion.g>
        </motion.g>
      </g>
    </svg>
  );
}
