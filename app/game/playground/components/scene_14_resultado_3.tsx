'use client';

import { motion } from 'framer-motion';

export default function Scene14Resultado3() {
  return (
    <div className="w-full h-full flex items-center justify-center">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 200 120"
        className="w-full h-full select-none"
      >
        <defs>
          <radialGradient id="grad-fondo-success-std-3" cx="50%" cy="50%" r="70%">
            <stop offset="0%" stopColor="#10b981" stopOpacity="0.2"/>
            <stop offset="60%" stopColor="#1e1b4b" stopOpacity="0.08"/>
            <stop offset="100%" stopColor="#05040a" stopOpacity="1"/>
          </radialGradient>
        </defs>

        {/* Fondo de Éxito Estándar */}
        <rect id="rect-fondo" width="200" height="120" fill="url(#grad-fondo-success-std-3)"/>

        {/* Grupo Pingüino Centrado */}
        <g id="pinguino-contenedor" transform="matrix(0.9, 0, 0, 0.9, 101.8641, 69.9772)">
          <ellipse cx="-5" cy="22" rx="15" ry="3" fill="#000000" opacity="0.4"/>
          <path id="pata-superior" d="M -14.785 20.722 L -8.785 23.722 L -9.785 17.722 L -14.785 20.722 Z" fill="#d97706" stroke="#b45309" strokeWidth="0.5"/>
          <ellipse id="cuerpo" cx="-5" cy="0" rx="16" ry="21" fill="#18181b"/>
          <ellipse id="vientre" cx="-3" cy="2" rx="11" ry="15" fill="#f4f4f5"/>
          <circle id="cabeza" cx="-5.309" cy="-25.229" r="11" fill="#18181b"/>
          <g id="bufanda" transform="translate(-5, -11)"/>
          
          {/* Ojos felices/contentos */}
          <g id="ojo" transform="matrix(1, 0, 0, 1, 1.0314, -4.3321)">
            <path id="ojo-izq-contento" d="M -1 -22 C -2 -24 -4 -24 -5 -22" stroke="#f4f4f5" strokeWidth="1.2" fill="none" strokeLinecap="round"/>
            <path id="ojo-der-contento" d="M -7 -22 C -8 -24 -10 -24 -11 -22" stroke="#f4f4f5" strokeWidth="1.2" fill="none" strokeLinecap="round"/>
          </g>
          
          {/* Pico */}
          <polygon id="pico" points="-4.919 -21.624 0.081 -23.624 0.081 -19.624" fill="#f59e0b" stroke="#d97706" strokeWidth="0.5" style={{ transformBox: 'fill-box', transformOrigin: '50% 50%' }} transform="matrix(-0.996153, -0.087628, 0.087628, -0.996153, 0.000001, -0.000002)"/>
          
          {/* Patas */}
          <g id="patas" transform="matrix(1, 0, 0, 1, -1.8566, -0.4125)">
            <path id="pata-inferior" d="M 3 20 L 9 23 L 8 17 Z" fill="#f59e0b" stroke="#d97706" strokeWidth="0.5"/>
          </g>
          
          {/* Aletas - Animadas Waving (aleteando feliz) */}
          <motion.g 
            id="aleta-grupo"
            animate={{ y: [0, -1.5, 0] }}
            transition={{ repeat: Infinity, duration: 1.2, ease: "easeInOut" }}
          >
            <path id="aleta" d="M -16 -4 C -22 -8 -18 -15 -14 -12" strokeWidth="2.5" strokeLinecap="round" stroke="#000000" fill="none"/>
            <path id="aleta-der" d="M 6 -4 C 12 -8 8 -15 4 -12" strokeWidth="2.5" strokeLinecap="round" stroke="#000000" fill="none"/>
          </motion.g>
          
          {/* Bufanda Roja */}
          <path id="path-1" d="M -12.602 -16.558 C -7.602 -14.058 -1.519 -15.06 3.481 -17.56" stroke="#ef4444" strokeWidth="3" fill="none" strokeLinecap="round" style={{ strokeWidth: 2.7 }}/>
          <path id="path-2" d="M -5.16 -14.008 C -3.16 -9.008 -2.435 -3.097 -1.435 0.903 C -4.435 0.903 -2.332 0.545 -4.332 -4.455 L -5.16 -14.008 Z" fill="#ef4444" style={{ strokeWidth: 0.9 }}/>
          <path id="path-3" d="M -5.697 -14.281 C -3.697 -8.281 -6.432 -3.099 -5.432 1.901 C -8.432 1.901 -5.878 -2.826 -7.878 -7.826 L -5.697 -14.281 Z" fill="#b91c1c" style={{ strokeWidth: 0.9 }}/>
        </g>
      </svg>
    </div>
  );
}
