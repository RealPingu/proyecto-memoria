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
          <radialGradient id="grad-fondo-fail" cx="50%" cy="50%" r="70%">
            <stop offset="0%" stopColor="#ef4444" stopOpacity="0.2"/>
            <stop offset="60%" stopColor="#1e1b4b" stopOpacity="0.08"/>
            <stop offset="100%" stopColor="#05040a" stopOpacity="1"/>
          </radialGradient>
          <linearGradient id="grad-popup-header" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#dc2626"/>
            <stop offset="100%" stopColor="#991b1b"/>
          </linearGradient>
          <linearGradient id="grad-popup-body" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#1e1e24"/>
            <stop offset="100%" stopColor="#0f0f13"/>
          </linearGradient>
        </defs>

        {/* Fondo de la Escena */}
        <rect id="rect-fondo" width="200" height="120" fill="url(#grad-fondo-fail)"/>

        {/* Partículas de error flotantes */}
        <g id="particulas-error">
          <motion.circle
            id="particula-e1"
            cx="25"
            cy="25"
            r="1.5"
            fill="#ef4444"
            opacity="0.6"
            animate={{ y: [0, -5, 0], opacity: [0.4, 0.8, 0.4] }}
            transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
          />
          <motion.circle
            id="particula-e2"
            cx="170"
            cy="35"
            r="1"
            fill="#fca5a5"
            opacity="0.5"
            animate={{ y: [0, 4, 0], opacity: [0.3, 0.7, 0.3] }}
            transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut", delay: 0.5 }}
          />
          <motion.circle
            id="particula-e3"
            cx="80"
            cy="15"
            r="1.2"
            fill="#b91c1c"
            opacity="0.4"
            animate={{ y: [0, -3, 0] }}
            transition={{ repeat: Infinity, duration: 4, ease: "easeInOut", delay: 1 }}
          />
        </g>

        {/* Celular/Pantalla con Popups Caóticos (Derecha) */}
        <g id="celular-caotico" transform="translate(105, 12)">
          {/* Sombra del celular */}
          <rect x="2" y="2" width="80" height="96" rx="6" fill="#000000" opacity="0.4"/>
          {/* Marco del celular */}
          <rect id="celular-marco" x="0" y="0" width="80" height="96" rx="6" fill="#1f2937" stroke="#4b5563" strokeWidth="1.5"/>
          <rect id="celular-pantalla" x="3" y="3" width="74" height="90" rx="4" fill="#09090b"/>

          {/* Líneas de escaneo del celular */}
          <line x1="3" y1="20" x2="77" y2="20" stroke="#1f2937" strokeWidth="0.5"/>
          <line x1="3" y1="40" x2="77" y2="40" stroke="#1f2937" strokeWidth="0.5"/>
          <line x1="3" y1="60" x2="77" y2="60" stroke="#1f2937" strokeWidth="0.5"/>
          <line x1="3" y1="80" x2="77" y2="80" stroke="#1f2937" strokeWidth="0.5"/>

          {/* Popups encabalgados con Framer Motion para darles sensación de intrusión descontrolada */}
          
          {/* Popup 1: Alerta de Descarga de Malware */}
          <motion.g
            id="popup-alerta"
            transform="translate(6, 10)"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 100 }}
          >
            <rect id="popup-alerta-bg" x="0" y="0" width="62" height="26" rx="2" fill="url(#grad-popup-body)" stroke="#dc2626" strokeWidth="0.8"/>
            <rect id="popup-alerta-header" x="0" y="0" width="62" height="7" rx="1" fill="url(#grad-popup-header)"/>
            <text id="popup-alerta-titulo" x="4" y="5.2" fill="#ffffff" fontFamily="monospace" fontSize="4" fontWeight="bold">⚠️ DESCARGA INICIADA</text>
            <circle id="popup-alerta-close" cx="58" cy="3.5" r="1.5" fill="#f87171"/>
            <text id="popup-alerta-body" x="4" y="13.5" fill="#fca5a5" fontFamily="sans-serif" fontSize="3">descargando_malware.exe</text>
            {/* Barra de progreso */}
            <rect id="progreso-bg" x="4" y="17" width="54" height="3" fill="#27272a" rx="1"/>
            <motion.rect
              id="progreso-fill"
              x="4"
              y="17"
              height="3"
              fill="#ef4444"
              rx="1"
              animate={{ width: [10, 54] }}
              transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
            />
          </motion.g>

          {/* Popup 2: Falso botón de cerrar / Bait & Switch */}
          <motion.g
            id="popup-bait"
            transform="translate(10, 42)"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.5, type: "spring", stiffness: 120 }}
          >
            <rect id="popup-bait-bg" x="0" y="0" width="58" height="24" rx="2" fill="#18181b" stroke="#22d3ee" strokeWidth="0.6"/>
            <text id="popup-bait-body" x="4" y="7" fill="#a5f3fc" fontFamily="sans-serif" fontSize="3" fontWeight="bold">¡TU IGLÚ ESTÁ LISTO!</text>
            <rect id="boton-falso" x="5" y="11" width="48" height="8" rx="1.5" fill="#22c55e"/>
            <text id="boton-falso-texto" x="8" y="16.5" fill="#ffffff" fontFamily="sans-serif" fontSize="3.5" fontWeight="bold">👉 CONTINUAR COMPRA</text>
          </motion.g>

          {/* Popup 3: Ad invasivo flotante */}
          <motion.g
            id="popup-ad"
            transform="translate(4, 70)"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.8, type: "spring", stiffness: 90 }}
          >
            <rect id="popup-ad-bg" x="0" y="0" width="50" height="16" rx="1.5" fill="#27272a" stroke="#fbbf24" strokeWidth="0.5"/>
            <text id="popup-ad-texto" x="4" y="6.5" fill="#fbbf24" fontFamily="sans-serif" fontSize="3" fontWeight="bold">¡Iglús a $1 Dólar!</text>
            <text id="popup-ad-sub" x="4" y="11.5" fill="#a1a1aa" fontFamily="sans-serif" fontSize="2.5">Haz click aquí para ganar</text>
          </motion.g>
        </g>

        {/* Camo Pingüino Impactado (Izquierda) */}
        <g id="pinguino-contenedor" transform="matrix(0.9, 0, 0, 0.9, 48, 72)">
          {/* Sombra en el suelo */}
          <ellipse cx="-5" cy="22" rx="15" ry="3" fill="#000000" opacity="0.5"/>
          
          {/* Cola */}
          <path id="cola" d="M -21 10 C -25 15 -18 22 -20 5" strokeWidth="2" strokeLinecap="round" stroke="#000000" fill="none"/>
          
          {/* Pata izquierda */}
          <path id="pata-superior" d="M -12 20 L -6 23 L -7 17 Z" fill="#d97706" stroke="#b45309" strokeWidth="0.5"/>
          
          {/* Cuerpo */}
          <ellipse id="cuerpo" cx="-5" cy="0" rx="16" ry="21" fill="#18181b"/>
          
          {/* Vientre */}
          <ellipse id="vientre" cx="-3" cy="2" rx="11" ry="15" fill="#f4f4f5"/>
          
          {/* Cabeza */}
          <circle id="cabeza" cx="-5" cy="-21" r="11" fill="#18181b"/>
          
          {/* Bufanda roja de Camo */}
          <g id="bufanda" transform="translate(-5, -11)">
            <path id="bufanda-cuello" d="M -10 0 C -5 2.5 5 2.5 10 0" stroke="#ef4444" strokeWidth="3" fill="none" strokeLinecap="round"/>
            <path id="bufanda-caida-roja" d="M 4 0 C 6 5 8 10 9 14 C 6 14 2 10 0 5 Z" fill="#ef4444"/>
            <path id="bufanda-caida-guinda" d="M -1 0 C 1 6 3 11 4 16 C 1 16 -2 11 -4 6 Z" fill="#b91c1c"/>
          </g>

          {/* Ojo de Pánico (muy abiertos de asombro) */}
          <g id="ojo">
            {/* Ojo izquierdo grande */}
            <circle id="ojo-borde-izq" cx="-1" cy="-23" r="4.5" fill="#f4f4f5" stroke="#000000" strokeWidth="0.5"/>
            <circle id="ojo-pupila-izq" cx="-1" cy="-23" r="1.3" fill="#000000"/>
            {/* Ojo derecho grande */}
            <circle id="ojo-borde-der" cx="-8" cy="-23" r="4.5" fill="#f4f4f5" stroke="#000000" strokeWidth="0.5"/>
            <circle id="ojo-pupila-der" cx="-8" cy="-23" r="1.3" fill="#000000"/>
          </g>

          {/* Pico abierto de pánico y asombro */}
          <polygon id="pico" points="-17 -22 -12 -25 -12 -19" fill="#f59e0b" stroke="#d97706" strokeWidth="0.5"/>

          {/* Pata derecha */}
          <g id="patas">
            <path id="pata-inferior" d="M 3 20 L 9 23 L 8 17 Z" fill="#f59e0b" stroke="#d97706" strokeWidth="0.5"/>
          </g>

          {/* Aletas levantadas a los lados en pánico */}
          <g id="aleta-grupo">
            {/* Aleta izquierda tocándose la cabeza */}
            <motion.path
              id="aleta"
              d="M -17 -2 C -23 -9 -14 -17 -8 -19"
              strokeWidth="2.5"
              strokeLinecap="round"
              stroke="#000000"
              fill="none"
              animate={{ y: [0, -1, 0] }}
              transition={{ repeat: Infinity, duration: 0.5, ease: "linear" }}
            />
            {/* Aleta derecha temblando */}
            <motion.path
              id="aleta-der"
              d="M 10 -2 C 16 -6 14 -12 11 -15"
              strokeWidth="2.5"
              strokeLinecap="round"
              stroke="#000000"
              fill="none"
              animate={{ x: [0, 1, -1, 0], y: [0, -1, 1, 0] }}
              transition={{ repeat: Infinity, duration: 0.3 }}
            />
          </g>

          {/* Gotas de sudor flotando con efecto de vibración */}
          <g id="gotas-sudor">
            <motion.path
              id="sudor-1"
              d="M 12 -28 C 12 -28 14 -24 13 -22 C 11 -22 10 -24 12 -28"
              fill="#38bdf8"
              animate={{ y: [0, 2, 0], opacity: [0.8, 1, 0.8] }}
              transition={{ repeat: Infinity, duration: 0.8 }}
            />
            <motion.path
              id="sudor-2"
              d="M -18 -30 C -18 -30 -20 -26 -19 -24 C -17 -24 -16 -26 -18 -30"
              fill="#38bdf8"
              animate={{ y: [0, 1.5, 0], opacity: [0.7, 1, 0.7] }}
              transition={{ repeat: Infinity, duration: 1, delay: 0.2 }}
            />
          </g>
        </g>
      </svg>
    </div>
  );
}
