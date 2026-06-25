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
          <radialGradient id="grad-fondo-success-3" cx="50%" cy="50%" r="70%">
            <stop offset="0%" stopColor="#047857" stopOpacity="0.25"/>
            <stop offset="60%" stopColor="#1e1b4b" stopOpacity="0.08"/>
            <stop offset="100%" stopColor="#05040a" stopOpacity="1"/>
          </radialGradient>
        </defs>

        {/* Fondo */}
        <rect id="rect-fondo" width="200" height="120" fill="url(#grad-fondo-success-3)"/>

        {/* Destellos de éxito flotantes */}
        <g id="destellos-exito">
          <motion.path
            d="M 20 20 L 22 22 L 20 24 L 18 22 Z"
            fill="#34d399"
            animate={{ scale: [0.8, 1.2, 0.8], opacity: [0.5, 1, 0.5] }}
            transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          />
          <motion.path
            d="M 85 15 L 86.5 16.5 L 85 18 L 83.5 16.5 Z"
            fill="#f59e0b"
            animate={{ scale: [1, 1.4, 1], opacity: [0.4, 0.9, 0.4] }}
            transition={{ repeat: Infinity, duration: 2.5, delay: 0.5 }}
          />
        </g>

        {/* Portal "Polo Iglús" Seguro (Derecha) */}
        <g id="polo-iglus-portal" transform="translate(105, 12)">
          {/* Sombra */}
          <rect x="2" y="2" width="80" height="96" rx="6" fill="#000000" opacity="0.4"/>
          {/* Marco */}
          <rect id="portal-marco" x="0" y="0" width="80" height="96" rx="6" fill="#1e293b" stroke="#334155" strokeWidth="1.5"/>
          <rect id="portal-pantalla" x="3" y="3" width="74" height="90" rx="4" fill="#0f172a"/>

          {/* Cabecera del Portal Seguro */}
          <rect id="portal-header" x="3" y="3" width="74" height="14" fill="#1e293b" rx="2"/>
          <text id="portal-logo" x="8" y="11" fill="#34d399" fontFamily="sans-serif" fontSize="3.5" fontWeight="bold">❄️ POLO IGLÚS</text>
          
          {/* Candado de seguridad SSL verificado */}
          <g id="candado-seguridad" transform="translate(62, 6.5)">
            <rect x="0" y="2.2" width="6.5" height="4.5" rx="1.2" fill="#10b981"/>
            <path d="M 1.5 2.2 C 1.5 0.8 2.5 0.5 3.2 0.5 C 4 0.5 4.8 0.8 4.8 2.2" stroke="#10b981" strokeWidth="0.8" fill="none"/>
          </g>

          {/* Ficha del Iglú (Limpio y ordenado) */}
          <g id="ficha-iglu" transform="translate(8, 22)">
            <rect id="ficha-bg" x="0" y="0" width="64" height="50" rx="3" fill="#1e293b" stroke="#475569" strokeWidth="0.5"/>
            
            {/* Foto/Preview del iglú */}
            <rect id="foto-bg" x="4" y="4" width="56" height="22" rx="2" fill="#0f172a"/>
            {/* Iglú vectorial simplificado */}
            <path id="foto-iglu" d="M 21 21 A 9 9 0 0 1 41 21 Z" fill="#38bdf8" opacity="0.9"/>
            <path id="foto-puerta" d="M 29 21 A 2.5 2.5 0 0 1 33 21 Z" fill="#0f172a"/>
            
            {/* Detalles del inmueble */}
            <text id="foto-titulo" x="4" y="32.5" fill="#ffffff" fontFamily="sans-serif" fontSize="3" fontWeight="bold">Iglú Mediterráneo</text>
            <text id="foto-precio" x="4" y="38" fill="#10b981" fontFamily="monospace" fontSize="3" fontWeight="bold">150,000 $P</text>
            <text id="ficha-rating" x="4" y="44" fill="#fbbf24" fontFamily="sans-serif" fontSize="2.8">⭐⭐⭐⭐⭐ (5.0)</text>
          </g>

          {/* Botón de compra verificado */}
          <g id="boton-compra" transform="translate(8, 77)">
            <rect x="0" y="0" width="64" height="11" rx="2" fill="#10b981"/>
            <text x="12" y="7" fill="#ffffff" fontFamily="sans-serif" fontSize="3.2" fontWeight="bold">🔑 RESERVA SEGURA</text>
          </g>
        </g>

        {/* Camo Pingüino Contento (Izquierda) */}
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

          {/* Ojos de felicidad en forma de arco (^^) */}
          <g id="ojo">
            {/* Ojo izquierdo feliz */}
            <path id="ojo-izq-contento" d="M -1 -22 C -2 -24 -4 -24 -5 -22" stroke="#f4f4f5" strokeWidth="1.2" fill="none" strokeLinecap="round"/>
            {/* Ojo derecho feliz */}
            <path id="ojo-der-contento" d="M -7 -22 C -8 -24 -10 -24 -11 -22" stroke="#f4f4f5" strokeWidth="1.2" fill="none" strokeLinecap="round"/>
          </g>

          <polygon id="pico" points="-17 -20 -12 -22 -12 -18" fill="#f59e0b" stroke="#d97706" strokeWidth="0.5"/>

          <g id="patas">
            <path id="pata-inferior" d="M 3 20 L 9 23 L 8 17 Z" fill="#f59e0b" stroke="#d97706" strokeWidth="0.5"/>
          </g>

          {/* Aletas celebrando y moviéndose hacia arriba */}
          <g id="aleta-grupo">
            <motion.path
              id="aleta"
              d="M -16 -4 C -22 -8 -18 -15 -14 -12"
              strokeWidth="2.5"
              strokeLinecap="round"
              stroke="#000000"
              fill="none"
              animate={{ rotate: [-5, 5, -5] }}
              transition={{ repeat: Infinity, duration: 0.8, ease: "easeInOut" }}
            />
            <motion.path
              id="aleta-der"
              d="M 6 -4 C 12 -8 8 -15 4 -12"
              strokeWidth="2.5"
              strokeLinecap="round"
              stroke="#000000"
              fill="none"
              animate={{ rotate: [5, -5, 5] }}
              transition={{ repeat: Infinity, duration: 0.8, ease: "easeInOut" }}
            />
          </g>
        </g>
      </svg>
    </div>
  );
}
