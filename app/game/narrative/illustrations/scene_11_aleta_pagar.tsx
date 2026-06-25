'use client';

import { motion } from 'framer-motion';

export default function Scene11AletaPagar() {
  // Animaciones cíclicas súper rápidas de 0.25 segundos para simular clicks frenéticos
  const clickDuration = 0.28;

  return (
    <svg viewBox="0 0 200 120" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
      <defs>
        {/* Patrón digital militar de Camo */}
        <pattern id="camo-digital" width="20" height="20" patternUnits="userSpaceOnUse">
          <rect width="20" height="20" fill="#3f4e3f" id="rect-bg-dig"/>
          <rect x="0" y="0" width="8" height="6" fill="#2d3a2d" id="rect-dark-dig"/>
          <rect x="10" y="4" width="6" height="8" fill="#546554" id="rect-medium-dig"/>
          <rect x="2" y="10" width="8" height="6" fill="#7ba077" id="rect-light-dig"/>
          <rect x="12" y="12" width="6" height="6" fill="#202a20" id="rect-black-dig"/>
        </pattern>

        {/* Gradiente de fondo verde/rojo de tensión */}
        <radialGradient id="aleta-bg-grad" cx="50%" cy="50%" r="65%">
          <stop offset="0%" stopColor="#ef4444" stopOpacity="0.25"/> {/* Rojo de urgencia/peligro */}
          <stop offset="60%" stopColor="#1e1b4b" stopOpacity="0.6"/>
          <stop offset="100%" stopColor="#050508" stopOpacity="1"/>
        </radialGradient>

        {/* Gradiente oro para monedas */}
        <linearGradient id="oro-grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#fef08a" />
          <stop offset="40%" stopColor="#eab308" />
          <stop offset="100%" stopColor="#ca8a04" />
        </linearGradient>

        {/* Brillo del botón */}
        <radialGradient id="impact-glow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#22c55e" stopOpacity="0.8"/>
          <stop offset="100%" stopColor="#22c55e" stopOpacity="0"/>
        </radialGradient>
      </defs>

      {/* Fondo degradado */}
      <rect width="200" height="120" fill="url(#aleta-bg-grad)" x="0" y="0" id="fondo-escena" />

      {/* EFECTO DE RESPLANDOR DE IMPACTO (Sincronizado con el click) */}
      <motion.circle
        id="brillo-impacto"
        cx="100" cy="65"
        r="32"
        fill="url(#impact-glow)"
        animate={{
          scale: [0.6, 1.4, 0.6],
          opacity: [0.1, 0.9, 0.1]
        }}
        transition={{
          repeat: Infinity,
          duration: clickDuration,
          ease: "easeInOut"
        }}
      />

      {/* ONDAS REPETIDAS DE RIPPLE (Emanando del botón) */}
      <motion.circle
        id="onda-impacto-1"
        cx="100" cy="65" r="20"
        fill="none" stroke="#22c55e" strokeWidth="1.5"
        animate={{
          r: [20, 55],
          opacity: [0.9, 0]
        }}
        transition={{
          repeat: Infinity,
          duration: clickDuration,
          ease: "easeOut"
        }}
      />
      <motion.circle
        id="onda-impacto-2"
        cx="100" cy="65" r="20"
        fill="none" stroke="#4ade80" strokeWidth="1"
        animate={{
          r: [20, 70],
          opacity: [0.6, 0]
        }}
        transition={{
          repeat: Infinity,
          duration: clickDuration,
          delay: clickDuration * 0.4,
          ease: "easeOut"
        }}
      />

      {/* MONEDAS Y BILLETES VOLANDO POR LOS AIRES (Efecto explosivo caricaturesco) */}
      <g id="dinero-volando">
        {/* Moneda Izquierda */}
        <motion.g
          id="moneda-izq"
          animate={{
            x: [0, -45],
            y: [0, -35],
            rotate: [0, -180],
            scale: [1, 0.4],
            opacity: [1, 0]
          }}
          transition={{ repeat: Infinity, duration: clickDuration, ease: "easeOut" }}
          style={{ originX: "100px", originY: "65px" }}
        >
          <circle cx="100" cy="65" r="4.5" fill="url(#oro-grad)" stroke="#d97706" strokeWidth="0.4" />
        </motion.g>

        {/* Moneda Derecha */}
        <motion.g
          id="moneda-der"
          animate={{
            x: [0, 48],
            y: [0, -25],
            rotate: [0, 240],
            scale: [1, 0.4],
            opacity: [1, 0]
          }}
          transition={{ repeat: Infinity, duration: clickDuration, ease: "easeOut" }}
          style={{ originX: "100px", originY: "65px" }}
        >
          <circle cx="100" cy="65" r="4" fill="url(#oro-grad)" stroke="#d97706" strokeWidth="0.4" />
        </motion.g>

        {/* Billete Central */}
        <motion.g
          id="billete-central"
          animate={{
            x: [0, 15],
            y: [0, -48],
            rotate: [0, 90],
            scale: [1, 0.5],
            opacity: [1, 0]
          }}
          transition={{ repeat: Infinity, duration: clickDuration, ease: "easeOut" }}
          style={{ originX: "100px", originY: "65px" }}
        >
          <rect x="97" y="62" width="8" height="5" rx="0.5" fill="#22c55e" stroke="#15803d" strokeWidth="0.3" />
        </motion.g>

        {/* Billete Izquierda */}
        <motion.g
          id="billete-izq"
          animate={{
            x: [0, -38],
            y: [0, -10],
            rotate: [0, -120],
            scale: [1, 0.5],
            opacity: [1, 0]
          }}
          transition={{ repeat: Infinity, duration: clickDuration, ease: "easeOut" }}
          style={{ originX: "100px", originY: "65px" }}
        >
          <rect x="97" y="62" width="9" height="5.5" rx="0.5" fill="#22c55e" stroke="#15803d" strokeWidth="0.3" />
        </motion.g>
      </g>

      {/* EL BOTÓN GIGANTE "ALETEA PARA PAGAR" (Se deforma y baja con el golpe) */}
      <g id="boton-checkout-seccion">
        <motion.g
          id="boton-presionable"
          animate={{
            y: [0, 3, 0],
            scaleY: [1, 0.88, 1]
          }}
          transition={{
            repeat: Infinity,
            duration: clickDuration,
            ease: "easeInOut"
          }}
          style={{ transformOrigin: "100px 75px" }}
        >
          {/* Sombras y estructura del botón */}
          <rect x="36" y="52" width="128" height="28" rx="8" fill="#15803d" />
          <rect x="36" y="48" width="128" height="28" rx="8" fill="#22c55e" stroke="#4ade80" strokeWidth="0.8" />
          
          <text x="100" y="66" fontFamily="sans-serif" fontSize="8.5" fontWeight="900" fill="#ffffff" textAnchor="middle" letterSpacing="0.8">
            ALETEA PARA PAGAR !!!
          </text>
        </motion.g>
      </g>

      {/* LA ALETA DE PINGÜINO DE CAMO (Slamea repetidamente desde arriba) */}
      <g id="aleta-camo-frenesi-grupo">
        <motion.g
          id="aleta-camo-slam"
          animate={{
            y: [-30, 22, -30],
            rotate: [-25, 5, -25]
          }}
          transition={{
            repeat: Infinity,
            duration: clickDuration,
            ease: "easeIn"
          }}
          style={{ transformOrigin: "60px -10px" }}
        >
          {/* Aleta con camuflaje militar */}
          <path 
            id="aleta"
            d="M 50,-10 C 65,15 82,38 92,54 C 70,58 48,34 32,12 Z" 
            fill="url(#camo-digital)" 
            stroke="#1b2611" 
            strokeWidth="0.8" 
          />
          {/* Borde interior vientre o aleta */}
          <path 
            id="aleta-borde-blanco"
            d="M 50,-10 C 58,5 68,18 74,27" 
            fill="none" 
            stroke="#d8d8d0" 
            strokeWidth="2.5" 
            strokeLinecap="round"
          />
        </motion.g>
      </g>

      {/* Efecto de líneas de velocidad caricaturescas de aleteo */}
      <g id="lineas-velocidad" stroke="#ffffff" strokeWidth="0.8" opacity="0.6" strokeLinecap="round">
        <motion.line 
          x1="62" y1="12" x2="68" y2="28" 
          animate={{ opacity: [0, 0.8, 0] }}
          transition={{ repeat: Infinity, duration: clickDuration, delay: 0.05 }}
        />
        <motion.line 
          x1="86" y1="8" x2="90" y2="24" 
          animate={{ opacity: [0, 0.8, 0] }}
          transition={{ repeat: Infinity, duration: clickDuration, delay: 0.1 }}
        />
        <motion.line 
          x1="45" y1="20" x2="52" y2="34" 
          animate={{ opacity: [0, 0.8, 0] }}
          transition={{ repeat: Infinity, duration: clickDuration, delay: 0.15 }}
        />
      </g>
    </svg>
  );
}
