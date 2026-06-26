'use client';

import { motion } from 'framer-motion';

const CONFETTI_ITEMS = [
  { id: 1, x: 20, y: -10, size: 2.5, color: '#ec4899', delay: 0, duration: 4.5 },
  { id: 2, x: 50, y: -10, size: 2, color: '#38bdf8', delay: 0.8, duration: 5.2 },
  { id: 3, x: 80, y: -10, size: 3, color: '#facc15', delay: 1.5, duration: 4.8 },
  { id: 4, x: 110, y: -10, size: 1.8, color: '#10b981', delay: 2.2, duration: 5.5 },
  { id: 5, x: 140, y: -10, size: 2.2, color: '#a855f7', delay: 0.4, duration: 4.2 },
  { id: 6, x: 170, y: -10, size: 2.8, color: '#ec4899', delay: 1.9, duration: 5.0 },
  { id: 7, x: 35, y: -10, size: 1.5, color: '#facc15', delay: 2.5, duration: 4.6 },
  { id: 8, x: 95, y: -10, size: 2.4, color: '#38bdf8', delay: 3.1, duration: 5.8 },
  { id: 9, x: 155, y: -10, size: 2.0, color: '#10b981', delay: 1.2, duration: 4.9 },
  { id: 10, x: 70, y: -10, size: 2.6, color: '#a855f7', delay: 3.5, duration: 5.1 },
];

export default function Scene7Sniper() {
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

        {/* Gradiente sutil para el brillo de la copa/podio */}
        <radialGradient id="gold-glow-grad" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#fef08a" stopOpacity="0.6"/>
          <stop offset="60%" stopColor="#facc15" stopOpacity="0.2"/>
          <stop offset="100%" stopColor="#eab308" stopOpacity="0"/>
        </radialGradient>

        {/* Gradiente de fondo con un solo resplandor verde militar muy tenue detrás del podio */}
        <radialGradient id="colored-bg-grad" cx="50%" cy="85%" r="65%">
          <stop offset="0%" stopColor="#14532d" stopOpacity="0.35"/>
          <stop offset="60%" stopColor="#052e16" stopOpacity="0.1"/>
          <stop offset="100%" stopColor="#000000" stopOpacity="1"/>
        </radialGradient>
      </defs>

      {/* Fondo Colorido Degradado */}
      <rect width="200" height="120" fill="url(#colored-bg-grad)" x="0" y="0" id="fondo-escena" />

      {/* Partículas de viento/polvo militar sutiles de fondo */}
      <g id="particulas-polvo">
        {[
          { id: 1, cx: 30, cy: 40, r: 0.6, duration: 4.5, delay: 0 },
          { id: 2, cx: 120, cy: 20, r: 0.8, duration: 5.2, delay: 1 },
          { id: 3, cx: 170, cy: 50, r: 0.5, duration: 4.8, delay: 2 },
          { id: 4, cx: 80, cy: 80, r: 0.7, duration: 5.0, delay: 0.5 },
        ].map((p) => (
          <motion.circle
            key={p.id}
            cx={p.cx}
            cy={p.cy}
            r={p.r}
            fill="#a1a1aa"
            opacity="0.3"
            animate={{
              x: [0, 20, 0],
              y: [0, -10, 0],
              opacity: [0.1, 0.4, 0.1]
            }}
            transition={{
              repeat: Infinity,
              duration: p.duration,
              delay: p.delay,
              ease: "easeInOut"
            }}
          />
        ))}
      </g>

      {/* Confeti de celebración cayendo por el fondo */}
      <g id="confeti-celebracion">
        {CONFETTI_ITEMS.map((item) => (
          <motion.rect
            key={item.id}
            x={item.x}
            y={item.y}
            width={item.size}
            height={item.size * 1.5}
            rx={0.3}
            fill={item.color}
            animate={{
              y: [0, 130],
              x: [item.x, item.x + 12, item.x - 12, item.x],
              rotate: [0, 360],
              opacity: [0, 0.9, 0.9, 0]
            }}
            transition={{
              repeat: Infinity,
              duration: item.duration,
              delay: item.delay,
              ease: "linear"
            }}
          />
        ))}
      </g>

      {/* 1. Rifle Fijo (Boxy SVG original) */}
      <g id="rifle-fijo-boxy" transform="matrix(0, -0.114165, -0.106794, 0, -145.633992, -65.345682)" style={{ transformOrigin: "265.5px 119.5px" }}>
        <g id="canon">
          <rect x="250" y="100" width="230" height="8" fill="#1c1917" stroke="#100e0d" strokeWidth="1"/>
          <rect x="480" y="96" width="16" height="16" rx="2" fill="#141210"/>
        </g>
        <g id="chasis-principal">
          <rect x="90" y="90" width="160" height="30" fill="#3f4e3f" stroke="#2d3a2d" strokeWidth="1"/>
          <rect x="50" y="90" width="40" height="45" fill="#3f4e3f" stroke="#2d3a2d" strokeWidth="1"/>
          <rect x="90" y="120" width="30" height="15" fill="#3f4e3f"/>
          <rect x="170" y="120" width="40" height="10" fill="#3f4e3f"/>
          <circle cx="70" cy="115" r="10" fill="#f4f4f5" stroke="#2d3a2d" strokeWidth="1"/>
          <rect x="55" y="95" width="15" height="10" fill="#2d3a2d"/>
          <rect x="95" y="105" width="20" height="12" fill="#7ba077"/>
          <rect x="110" y="92" width="25" height="10" fill="#202a20"/>
          <rect x="140" y="100" width="15" height="15" fill="#2d3a2d"/>
          <rect x="170" y="92" width="30" height="12" fill="#546554"/>
          <rect x="210" y="102" width="25" height="14" fill="#7ba077"/>
          <rect x="230" y="92" width="15" height="15" fill="#202a20"/>
          <rect x="180" y="122" width="15" height="6" fill="#2d3a2d"/>
          <rect x="185" y="95" width="12" height="4" rx="1" fill="#141210"/>
          <rect x="225" y="95" width="12" height="4" rx="1" fill="#141210"/>
        </g>
        <g id="culata">
          <rect x="35" y="85" width="15" height="55" rx="3" fill="#141210"/>
          <circle cx="58" cy="130" r="3" fill="#141210"/>
          <circle cx="82" cy="130" r="3" fill="#141210"/>
        </g>
        <g id="accion-cerrojo" transform="matrix(1, 0, 0, 1, 3.932346, -0.265837)">
          <rect x="110" y="80" width="80" height="10" fill="#1c1917" stroke="#100e0d" strokeWidth="0.5"/>
          <circle cx="125" cy="87" r="4" fill="#1c1917"/>
          <rect x="135" y="120" width="30" height="22" rx="1" fill="#141210"/>
          <rect x="141" y="123" width="2" height="15" fill="#2e2a24"/>
          <rect x="149" y="123" width="2" height="15" fill="#2e2a24"/>
          <rect x="157" y="123" width="2" height="15" fill="#2e2a24"/>
          <rect x="128" y="120" width="3" height="12" fill="#141210"/>
          <rect x="110" y="130" width="20" height="3" fill="#141210"/>
          <rect x="118" y="123" width="3" height="7" fill="#141210"/>
        </g>
        <g id="mira-telescopica">
          <rect x="120" y="76" width="60" height="4" fill="#2a2624"/>
          <rect x="128" y="66" width="8" height="10" fill="#141210"/>
          <rect x="164" y="66" width="8" height="10" fill="#141210"/>
          <rect x="122" y="58" width="56" height="8" fill="#1c1917"/>
          <rect x="178" y="54" width="10" height="16" fill="#1c1917"/>
          <rect x="188" y="50" width="16" height="24" fill="#1c1917"/>
          <rect x="204" y="52" width="3" height="20" fill="#f59e0b" rx="0.5"/>
          <rect x="106" y="52" width="16" height="20" fill="#1c1917"/>
        </g>
        <g id="bipode">
          <rect x="225" y="120" width="14" height="8" rx="1" fill="#1c1917"/>
          <circle cx="232" cy="124" r="2" fill="#7ba077"/>
          <rect x="228" y="128" width="5" height="55" fill="#141210"/>
          <rect x="222" y="183" width="16" height="6" rx="1" fill="#0a0908"/>
        </g>
      </g>

      {/* 2. El Podio Militar de Camo con Brillo en la Copa/Taza y número 1 */}
      <g id="podio-militar-contenedor" transform="matrix(0.390857, 0, 0, 0.336447, 62.472357, 69.360377)">
        {/* Glow dorado rítmico alrededor del trofeo número 1 */}
        <motion.circle 
          cx="100" 
          cy="80" 
          r="45" 
          fill="url(#gold-glow-grad)"
          animate={{ opacity: [0.4, 0.8, 0.4], scale: [0.95, 1.15, 0.95] }}
          transition={{ repeat: Infinity, duration: 3.5, ease: "easeInOut" }}
        />

        {/* Estructura del Podio */}
        <ellipse cx="100" cy="125" rx="95" ry="12" fill="#e4e4e7"/>
        <polygon points="20 120 180 120 168.036 24.482 36.417 41.176" fill="#374151" stroke="#1f2937" strokeWidth="2"/>
        <polygon points="45,110 155,110 145,55 55,55" fill="#4b5563" stroke="#1f2937" strokeWidth="1"/>
        <polygon points="34.921 42.012 163.065 42.448 169.226 23.472 53.228 22.4" fill="#1f2937" style={{ transformOrigin: "99.595px 24.06px" }}/>
        <circle cx="40" cy="46" r="2.5" fill="#9ca3af"/>
        <circle cx="160" cy="46" r="2.5" fill="#9ca3af"/>
        <circle cx="26" cy="114" r="2.5" fill="#9ca3af"/>
        <circle cx="174" cy="114" r="2.5" fill="#9ca3af"/>
        
        {/* El número uno táctico */}
        <g id="numero-uno-tactico" transform="translate(82, 60)">
          <polygon points="14.26 9.595 5.753 12.328 1 12 1.188 3.921 12.731 -1.188" fill="#713f12"/>
          <polygon points="12 -1.073 25 -1.073 25 39.241 32 39.241 32 45 5 45 5 39.241 12 39.241" fill="#713f12"/>
          <polygon points="13.404 8.707 5.83 10.781 2 11 2 4.908 13.797 -0.607" fill="#facc15"/>
          <polygon points="13 -0.217 24 -0.217 24 38.473 31 38.473 31 44 6 44 6 38.473 13 38.473" fill="#facc15"/>
          <polygon points="13 -0.386 24 -0.386 24 39 13 39" fill="#fef08a" opacity="0.45"/>
        </g>
      </g>

      {/* 3. Camo - Pingüino Táctico en el podio (Cuerpo + Respiración/Sway y mirada firme) */}
      <g id="pingüino-táctico-estático-contenedor" transform="matrix(0, 0.602053, -0.681764, 0, 152.878331, 27.135072)" style={{ transformOrigin: "-51.9507px 37.555px" }}>
        <motion.g
          id="camo-respiracion-organica"
          animate={{
            scaleY: [1, 1.06, 1],
            skewX: [0, 1.8, -1.8, 0],
            y: [0, -1.5, 0]
          }}
          transition={{ 
            repeat: Infinity, 
            duration: 2.8, 
            ease: "easeInOut" 
          }}
          style={{ transformOrigin: "-51.9507px 37.555px" }}
        >
          {/* Patas del rifle (cruce) */}
          <path id="path-2" d="M -54.269 -9.059 C -55.047 -8.397 -70.361 -6.589 -76.425 -7.311" strokeWidth="2.5" strokeLinecap="round" stroke="rgb(0, 0, 0)" fill="none" style={{ strokeWidth: 2.5, transformOrigin: "-58.488px 10.36px" }} transform="matrix(-1, 0, 0, -1, -0.000003, -0.000009)"/>
          
          {/* Pata Superior */}
          <path id="pata-superior" d="M -32.417 31.796 L -25.744 26.644 L -25.774 33.746 L -32.417 31.796 Z" fill="#f59e0b"/>
          
          {/* Cuerpo de Camo */}
          <ellipse id="cuerpo" cx="-47.91" cy="37.303" rx="20" ry="9.723" fill="url(#camo-digital)" stroke="#7ba077" strokeWidth="0.5"/>
          <ellipse id="vientre" cx="-46.644" cy="36.663" rx="11.496" ry="6.609" fill="#d8d8d0" stroke="#000000" strokeWidth="0.8"/>
          
          {/* Cabeza */}
          <circle id="cabeza" cx="-73.89" cy="37.137" r="10" fill="url(#camo-digital)" stroke="#7ba077" strokeWidth="0.5"/>
          
          {/* Ojos con mirada determinada de francotirador */}
          <g id="ojo-determinado" transform="matrix(1, 0, 0, 1, -6.119227, -1.486034)">
            <circle id="ojo-borde" cx="-68.31" cy="33.013" r="2.2" fill="#f4f4f5"/>
            <motion.circle 
              id="ojo-pupila" 
              cx="-67.358" 
              cy="32.964" 
              r="1.019" 
              fill="#000000"
              animate={{ x: [-0.12, 0.12, -0.12] }}
              transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
            />
            <path id="ceja" d="M -70.916 30.357 C -71.41 30.893 -71.824 35.05 -70.221 36.338" stroke="#18181b" strokeWidth="1.2" strokeLinecap="round"/>
          </g>
          
          {/* Pico */}
          <polygon id="pico" points="-70.546 36.372 -66.826 32.353 -66.586 39.331" fill="#f59e0b"/>
          
          {/* Patas traseras */}
          <g id="patas-contenedor" transform="matrix(1, 0, 0, 1, -51.910336, 17.303471)">
            <path id="pata-inferior" d="M 26.663 20.735 L 26.851 27.446 L 19.486 24.256 L 26.663 20.735 Z" fill="#f59e0b"/>
          </g>
          
          {/* Aletas */}
          <path id="aleta" d="M -67.153 26.966 C -68.275 22.518 -50.218 27.663 -48.44 32.055" strokeWidth="2.5" strokeLinecap="round" stroke="rgb(0, 0, 0)" fill="none" style={{ transformBox: "fill-box", transformOrigin: "50% 50%" }} transform="matrix(-1, 0, 0, -1, -13.674032, 13.334826)"/>
          
          {/* Casco Militar digital */}
          <g id="casco-grupo" transform="matrix(0, 1.038801, 0.967817, 0, -17.114298, 8.442147)" style={{ transformOrigin: "-67.9004px 28.6293px" }}>
            <path id="casco-cuerpo" d="M -58.2 33 C -58.472 18.27 -77.743 18.379 -77.6 33 C -77.585 34.5 -58.172 34.5 -58.2 33 Z" fill="url(#camo-digital)" stroke="#1b2611" strokeWidth="0.5"/>
            <path id="casco-banda" d="M -77.2 27.5 C -72 25 -64 25 -58.6 27.5" stroke="#1c1917" strokeWidth="1.2" fill="none" opacity="0.8"/>
          </g>
          
          {/* Segundo ojo determinado */}
          <g id="group-1" transform="matrix(1, 0, 0, 1, -6.463005, 7.373969)">
            <circle id="circle-1" cx="-67.91" cy="33.303" r="2.2" fill="#f4f4f5"/>
            <motion.circle 
              id="circle-2" 
              cx="-67.03" 
              cy="33.319" 
              r="1.019" 
              fill="#000000"
              animate={{ x: [-0.12, 0.12, -0.12] }}
              transition={{ repeat: Infinity, duration: 6, ease: "easeInOut", delay: 0.2 }}
            />
            <path id="path-1" d="M -70.406 30.003 C -70.426 30.764 -71.314 35.178 -70.731 36.241" stroke="#18181b" strokeWidth="1.2" strokeLinecap="round"/>
          </g>
        </motion.g>
      </g>
    </svg>
  );
}
