'use client';

import { motion } from 'framer-motion';

export default function Scene14Resultado1() {
  return (
    <div className="w-full h-full flex items-center justify-center">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 200 120"
        className="w-full h-full select-none"
      >
        <defs>
          <radialGradient id="grad-fondo-fail-std" cx="50%" cy="50%" r="70%">
            <stop offset="0%" stopColor="#ef4444" stopOpacity="0.2"/>
            <stop offset="60%" stopColor="#1e1b4b" stopOpacity="0.08"/>
            <stop offset="100%" stopColor="#05040a" stopOpacity="1"/>
          </radialGradient>
        </defs>

        {/* Fondo de Fallo Estándar */}
        <rect id="rect-fondo" width="200" height="120" fill="url(#grad-fondo-fail-std)"/>

        {/* Grupo Pingüino Centrado */}
        <g id="pinguino-contenedor" transform="matrix(0.9, 0, 0, 0.9, 104.7705, 66.9008)">
          <ellipse cx="-5" cy="22" rx="15" ry="3" fill="#000000" opacity="0.5"/>
          <path id="pata-superior" d="M -14.304 21.365 L -8.304 24.365 L -9.304 18.365 L -14.304 21.365 Z" fill="#d97706" stroke="#b45309" strokeWidth="0.5"/>
          <ellipse id="cuerpo" cx="-5" cy="0" rx="16" ry="21" fill="#18181b"/>
          <ellipse id="vientre" cx="-3" cy="2" rx="11" ry="15" fill="#f4f4f5"/>
          <circle id="cabeza" cx="-5.219" cy="-24.576" r="11" fill="#18181b"/>
          
          {/* Bufanda */}
          <g id="bufanda" transform="translate(-5, -11)">
            <path id="bufanda-cuello" d="M -7.177 -5.009 C -2.177 -2.509 3.907 -3.511 8.907 -6.011" stroke="#ef4444" strokeWidth="3" fill="none" strokeLinecap="round"/>
            <path id="bufanda-caida-roja" d="M 0.266 -2.459 C 2.266 2.541 2.991 8.452 3.991 12.452 C 0.991 12.452 3.093 12.095 1.093 7.095 L 0.266 -2.459 Z" fill="#ef4444"/>
            <path id="bufanda-caida-guinda" d="M -0.271 -2.732 C 1.729 3.268 -1.007 8.45 -0.007 13.45 C -3.007 13.45 -0.452 8.723 -2.452 3.723 L -0.271 -2.732 Z" fill="#b91c1c"/>
          </g>
          
          {/* Ojo asustado */}
          <g id="ojo" transform="matrix(1, 0, 0, 1, -0.218958, -4.452138)">
            <circle id="ojo-borde-izq" cx="-1" cy="-23" r="4.5" fill="#f4f4f5" stroke="#000000" strokeWidth="0.5"/>
            <circle id="ojo-pupila-izq" cx="-1" cy="-23" r="1.3" fill="#000000"/>
            <circle id="ojo-borde-der" cx="-8" cy="-23" r="4.5" fill="#f4f4f5" stroke="#000000" strokeWidth="0.5"/>
            <circle id="ojo-pupila-der" cx="-8" cy="-23" r="1.3" fill="#000000"/>
          </g>
          
          {/* Pico */}
          <polygon id="pico" points="-4.663 -19.589 0.337 -22.589 0.337 -16.589" fill="#f59e0b" stroke="#d97706" strokeWidth="0.5" style={{ transformBox: 'fill-box', transformOrigin: '50% 50%' }} transform="matrix(-0.997039, -0.076897, 0.076897, -0.997039, 0.000001, 0.000001)"/>
          
          {/* Patas */}
          <g id="patas">
            <path id="pata-inferior" d="M 0.27 18.72 L 6.27 21.72 L 5.27 15.72 L 0.27 18.72 Z" fill="#f59e0b" stroke="#d97706" strokeWidth="0.5"/>
          </g>
          
          {/* Aletas - Animadas Shaking (moviendo las manos en señal de equivocación) */}
          <motion.g 
            id="aleta-grupo"
            animate={{ rotate: [-2, 2, -2] }}
            transition={{ repeat: Infinity, duration: 0.15, ease: "linear" }}
            style={{ transformOrigin: "-5px 0px" }}
          >
            <path id="aleta" d="M -17 -2 C -23 -9 -14 -17 -8 -19" strokeWidth="2.5" strokeLinecap="round" stroke="#000000" fill="none"/>
            <path id="aleta-der" d="M 10 -2 C 16 -6 14 -12 11 -15" strokeWidth="2.5" strokeLinecap="round" stroke="#000000" fill="none"/>
          </motion.g>
          
          {/* Gotas de sudor animadas */}
          <g id="gotas-sudor">
            <motion.path 
              id="sudor-1" 
              d="M 12 -28 C 12 -28 14 -24 13 -22 C 11 -22 10 -24 12 -28" 
              fill="#38bdf8"
              animate={{ y: [0, 1.5, 0], opacity: [0.6, 1, 0.6] }}
              transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
            />
            <motion.path 
              id="sudor-2" 
              d="M -18 -30 C -18 -30 -20 -26 -19 -24 C -17 -24 -16 -26 -18 -30" 
              fill="#38bdf8"
              animate={{ y: [0, 2, 0], opacity: [0.6, 1, 0.6] }}
              transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut", delay: 0.3 }}
            />
          </g>
        </g>
      </svg>
    </div>
  );
}
