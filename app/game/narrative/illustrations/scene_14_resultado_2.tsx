'use client';

import { motion } from 'framer-motion';

export default function Scene14Resultado2() {
  return (
    <div className="w-full h-full flex items-center justify-center">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 200 120"
        className="w-full h-full select-none"
      >
        <defs>
          <radialGradient id="grad-fondo-success-2" cx="50%" cy="50%" r="70%">
            <stop offset="0%" stopColor="#059669" stopOpacity="0.25"/>
            <stop offset="60%" stopColor="#1e1b4b" stopOpacity="0.08"/>
            <stop offset="100%" stopColor="#05040a" stopOpacity="1"/>
          </radialGradient>
        </defs>

        {/* Fondo */}
        <rect id="rect-fondo" width="200" height="120" fill="url(#grad-fondo-success-2)"/>

        {/* Círculos concéntricos de serenidad/aura zen de Camo */}
        <g id="aura-serenidad">
          <motion.circle
            id="aura-1"
            cx="48"
            cy="72"
            r="28"
            fill="none"
            stroke="#10b981"
            strokeWidth="0.5"
            opacity="0.2"
            animate={{ scale: [0.95, 1.05, 0.95], opacity: [0.15, 0.3, 0.15] }}
            transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
          />
          <motion.circle
            id="aura-2"
            cx="48"
            cy="72"
            r="38"
            fill="none"
            stroke="#059669"
            strokeWidth="0.5"
            opacity="0.1"
            animate={{ scale: [1.05, 0.95, 1.05], opacity: [0.08, 0.2, 0.08] }}
            transition={{ repeat: Infinity, duration: 4, ease: "easeInOut", delay: 0.5 }}
          />
        </g>

        {/* Celular/Pantalla con Botón Real Resaltado (Derecha) */}
        <g id="celular-analizado" transform="translate(105, 12)">
          {/* Sombra */}
          <rect x="2" y="2" width="80" height="96" rx="6" fill="#000000" opacity="0.4"/>
          {/* Marco */}
          <rect id="celular-marco" x="0" y="0" width="80" height="96" rx="6" fill="#1f2937" stroke="#4b5563" strokeWidth="1.5"/>
          <rect id="celular-pantalla" x="3" y="3" width="74" height="90" rx="4" fill="#09090b"/>

          {/* Anuncios desvanecidos / ignorados (opacidad muy baja para simular detección) */}
          <g id="anuncios-desvanecidos" opacity="0.15">
            <rect x="6" y="8" width="62" height="16" rx="1.5" fill="#27272a" stroke="#ef4444" strokeWidth="0.5"/>
            <text x="10" y="14" fill="#fca5a5" fontFamily="sans-serif" fontSize="3" fontWeight="bold">⚠️ ¡DESCARGAR AHORA!</text>
            <rect x="6" y="60" width="62" height="16" rx="1.5" fill="#27272a" stroke="#fbbf24" strokeWidth="0.5"/>
            <text x="10" y="66" fill="#fde68a" fontFamily="sans-serif" fontSize="3" fontWeight="bold">⚠️ GANASTE UN PREMIO</text>
          </g>

          {/* Botón real resaltado con brillo verde */}
          <g id="boton-real-resaltado">
            {/* Brillo palpitante */}
            <motion.rect
              id="glow-efect"
              x="4"
              y="28"
              width="66"
              height="24"
              rx="3"
              fill="#10b981"
              animate={{ opacity: [0.15, 0.35, 0.15] }}
              transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
            />
            <rect id="boton-real-bg" x="6" y="30" width="62" height="20" rx="2" fill="#064e3b" stroke="#10b981" strokeWidth="1"/>
            <text id="boton-real-titulo" x="12" y="38" fill="#34d399" fontFamily="monospace" fontSize="2.5" fontWeight="bold">SITIO SEGURO</text>
            <text id="boton-real-texto" x="12" y="45" fill="#ffffff" fontFamily="sans-serif" fontSize="4.2" fontWeight="bold">Reservar Iglú</text>
            
            {/* Icono de Check */}
            <motion.circle
              id="check-ok"
              cx="58"
              cy="40"
              r="3.5"
              fill="#10b981"
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
            />
            <path id="check-path" d="M 56 40 L 57.5 41.5 L 60 38.5" stroke="#ffffff" strokeWidth="0.9" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
          </g>
        </g>

        {/* Camo Pingüino Concentrado / Calmado (Izquierda) */}
        <g id="pinguino-contenedor" transform="matrix(0.9, 0, 0, 0.9, 48, 72)">
          <ellipse cx="-5" cy="22" rx="15" ry="3" fill="#000000" opacity="0.4"/>
          <path id="cola" d="M -21 10 C -25 15 -18 22 -20 5" strokeWidth="2" strokeLinecap="round" stroke="#000000" fill="none"/>
          <path id="pata-superior" d="M -12 20 L -6 23 L -7 17 Z" fill="#d97706" stroke="#b45309" strokeWidth="0.5"/>
          <ellipse id="cuerpo" cx="-5" cy="0" rx="16" ry="21" fill="#18181b"/>
          <ellipse id="vientre" cx="-3" cy="2" rx="11" ry="15" fill="#f4f4f5"/>
          <circle id="cabeza" cx="-5" cy="-21" r="11" fill="#18181b"/>
          
          <g id="bufanda" transform="translate(-5, -11)">
            <path id="bufanda-cuello" d="M -10 0 C -5 2.5 5 2.5 10 0" stroke="#ef4444" strokeWidth="3" fill="none" strokeLinecap="round"/>
            <path id="bufanda-caida-roja" d="M 4 0 C 6 5 8 10 9 14 C 6 14 2 10 0 5 Z" fill="#ef4444"/>
            <path id="bufanda-caida-guinda" d="M -1 0 C 1 6 3 11 4 16 C 1 16 -2 11 -4 6 Z" fill="#b91c1c"/>
          </g>

          {/* Ojos cerrados de serenidad y concentración */}
          <g id="ojo">
            {/* Ojo izquierdo cerrado (arco hacia abajo) */}
            <path id="ojo-izq-cerrado" d="M -1 -23 C -2 -21 -4 -21 -5 -23" stroke="#f4f4f5" strokeWidth="1.2" fill="none" strokeLinecap="round"/>
            {/* Ojo derecho cerrado (arco hacia abajo) */}
            <path id="ojo-der-cerrado" d="M -7 -23 C -8 -21 -10 -21 -11 -23" stroke="#f4f4f5" strokeWidth="1.2" fill="none" strokeLinecap="round"/>
          </g>

          <polygon id="pico" points="-17 -21 -12 -23 -12 -19" fill="#f59e0b" stroke="#d97706" strokeWidth="0.5"/>

          <g id="patas">
            <path id="pata-inferior" d="M 3 20 L 9 23 L 8 17 Z" fill="#f59e0b" stroke="#d97706" strokeWidth="0.5"/>
          </g>

          <g id="aleta-grupo">
            {/* Aleta apuntando con calma y precisión hacia el botón real */}
            <path id="aleta" d="M -10 -3 C -3 -5 5 -6 11 -4" strokeWidth="2.5" strokeLinecap="round" stroke="#000000" fill="none"/>
          </g>
        </g>
      </svg>
    </div>
  );
}
