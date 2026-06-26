'use client';

import { motion } from 'framer-motion';

export default function Scene20Batalla() {
  return (
    <svg viewBox="0 0 200 120" className="w-full h-full select-none" xmlns="http://www.w3.org/2000/svg" id="svg-escena-20">
      <defs>
        <pattern id="teselacion-enemigo-20" width="40" height="40" patternUnits="userSpaceOnUse"
          patternTransform="matrix(0.999888, 0.017041, -0.013154, 0.999888, 3.179298, -3.381333)">
          <polygon points="0,0 20,10 20,30 0,20" fill="#111827" stroke="#020408" strokeWidth="0.5" id="poly-enem-1-20"/>
          <polygon points="20,10 40,0 40,20 20,30" fill="#1f2937" stroke="#020408" strokeWidth="0.5" id="poly-enem-2-20"/>
          <polygon points="0,20 20,30 20,40 0,40" fill="#0f172a" stroke="#020408" strokeWidth="0.5" id="poly-enem-3-20"/>
          <polygon points="20,30 40,20 40,40 20,40" fill="#1e1b4b" stroke="#020408" strokeWidth="0.5" id="poly-enem-4-20"/>
        </pattern>

        {/* Fondo de batalla */}
        <radialGradient id="grad-fondo-batalla-20" cx="65%" cy="40%" r="65%">
          <stop offset="0%" stopColor="#0ea5e9" stopOpacity="0.28" id="stop-f-1-20"/>
          <stop offset="50%" stopColor="#1e1b4b" stopOpacity="0.12" id="stop-f-2-20"/>
          <stop offset="100%" stopColor="#05040a" stopOpacity="1" id="stop-f-3-20"/>
        </radialGradient>

        {/* Halo de energía */}
        <radialGradient id="halo-energia-20" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#0ea5e9" stopOpacity="0.45" id="stop-h-1-20"/>
          <stop offset="50%" stopColor="#0284c7" stopOpacity="0.15" id="stop-h-2-20"/>
          <stop offset="100%" stopColor="#0ea5e9" stopOpacity="0" id="stop-h-3-20"/>
        </radialGradient>

        {/* Gradiente de mini pantalla del celular del patrón */}
        <linearGradient id="grad-mini-pantalla-20" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#e2e8f0" id="stop-m-1-20"/>
          <stop offset="100%" stopColor="#cbd5e1" id="stop-m-2-20"/>
        </linearGradient>

        <pattern id="camo-digital-20" width="20" height="20" patternUnits="userSpaceOnUse">
          <rect width="20" height="20" fill="#3f4e3f" id="rect-camo-bg-20"/>
          <rect x="0" y="0" width="8" height="6" fill="#2d3a2d" id="rect-camo-dark-20"/>
          <rect x="10" y="4" width="6" height="8" fill="#546554" id="rect-camo-med-20"/>
          <rect x="2" y="10" width="8" height="6" fill="#7ba077" id="rect-camo-light-20"/>
        </pattern>
      </defs>

      {/* Fondo de batalla */}
      <rect width="200" height="120" fill="url(#grad-fondo-batalla-20)" id="rect-fondo-20"/>

      {/* Partículas de energía flotantes */}
      <g id="particulas-clash-20">
        <motion.circle cx="110" cy="50" r="1.2" fill="#0ea5e9"
          animate={{ y: [-10, 10, -10], x: [-5, 5, -5], opacity: [0.3, 0.9, 0.3] }}
          transition={{ repeat: Infinity, duration: 4.5, ease: "easeInOut" }}
          id="part-1-20"
        />
        <motion.circle cx="135" cy="85" r="1.5" fill="#0284c7"
          animate={{ y: [5, -15, 5], x: [3, -3, 3], opacity: [0.2, 0.8, 0.2] }}
          transition={{ repeat: Infinity, duration: 3.5, ease: "easeInOut", delay: 0.5 }}
          id="part-2-20"
        />
        <motion.circle cx="60" cy="70" r="1.2" fill="#ef4444"
          animate={{ y: [-5, 15, -5], x: [-3, 3, -3], opacity: [0.4, 0.9, 0.4] }}
          transition={{ repeat: Infinity, duration: 4, ease: "easeInOut", delay: 1 }}
          id="part-3-20"
        />
        <motion.circle cx="45" cy="40" r="1" fill="#b91c1c"
          animate={{ y: [12, -8, 12], x: [2, -2, 2], opacity: [0.3, 0.7, 0.3] }}
          transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}
          id="part-4-20"
        />
      </g>

      {/* Halo de poder detrás del Patrón Oscuro */}
      <motion.circle id="halo-patron-detras-20" cx="145" cy="55" r="40"
        fill="url(#halo-energia-20)"
        animate={{ scale: [0.95, 1.15, 0.95], opacity: [0.7, 1, 0.7] }}
        transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
      />

      {/* RAYOS DE CONFLICTO */}
      <g id="rayos-tension-20">
        <motion.path d="M 68 62 L 95 55 L 120 58"
          stroke="#0ea5e9" strokeWidth="0.8" strokeLinecap="round" fill="none"
          animate={{ opacity: [0, 0.8, 0, 0.9, 0, 0.3, 0], strokeWidth: [0.5, 1.2, 0.5, 1.5, 0.5] }}
          transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
          id="rayo-1-20"
        />
        <motion.path d="M 65 72 L 90 78 L 122 70"
          stroke="#f472b6" strokeWidth="0.6" strokeLinecap="round" fill="none"
          animate={{ opacity: [0, 0, 0.7, 0, 0.9, 0.2, 0], strokeWidth: [0.4, 1, 0.4, 1.2, 0.4] }}
          transition={{ repeat: Infinity, duration: 2.1, ease: "linear", delay: 0.4 }}
          id="rayo-2-20"
        />
      </g>

      {/* GRUPO ENEMY: Patrón Oscuro portando el celular de Reference Pricing */}
      <motion.g
        id="grupo-patron-oscuro-20"
        animate={{ y: [0, -3.5, 0], rotate: [0, 1, -1, 0] }}
        transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}
        style={{ originX: '145px', originY: '55px' }}
      >
        {/* Cuerpo rombo del Patrón Oscuro */}
        <g id="patron-oscuro-figura-20" transform="matrix(0.204386, 0, 0, 0.179566, 109.414691, 19.192984)">
          <path id="tentaculo-izq-20" d="M 76.803 196.156 C 71.563 178.814 115.955 225.818 91.894 280.699"
            strokeLinecap="round" stroke="#000000" fill="none"
            style={{ transformBox: 'fill-box', transformOrigin: '50% 50%', strokeWidth: '10.418px' }}
            transform="matrix(0, 1.138222, -0.878563, 0, 0.000028, -0.00001)"/>
          <polygon id="patron-rombo-cuerpo-20" points="128.429 358.794 101.59 118.309 301.567 121.718 268.414 361.179"
            fill="url(#teselacion-enemigo-20)" stroke="#0ea5e9" strokeWidth="2.5"
            style={{ transformOrigin: '200px 240px' }}/>
          {/* Núcleo */}
          <motion.polygon id="patron-rombo-nucleo-20" points="155.035 148.511 180.035 168.511 155.035 188.511 130.035 168.511"
            animate={{ fill: ["#0ea5e9", "#38bdf8", "#0284c7", "#0ea5e9"] }}
            transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}/>
          <line id="patron-nucleo-linea-20"
            x1="148.611" y1="158.732" x2="155.035" y2="182.988"
            stroke="#020408" strokeWidth="3"/>
          <path id="tentaculo-der-20" d="M 116.335 196.849 C 111.095 179.508 166.823 207.174 115.253 292.447"
            strokeLinecap="round" stroke="#000000" fill="none"
            style={{ strokeWidth: '10.418px', transformBox: 'fill-box', transformOrigin: '50% 50%' }}
            transform="matrix(0, 1.138222, -0.878563, 0, -0.000013, 0.000012)"/>
          <path id="brillo-reflejo-20" d="M 386.098 120.481 C 434.242 133.117 400.957 140.502 385.262 152.43"
            strokeLinecap="round"
            style={{ fill: 'none', stroke: '#ffffff', transformOrigin: '273.549px -7.507px', strokeWidth: '5.20898px' }}
            transform="matrix(0, 1.138222, -0.878563, 0, -0.000058, 0.000053)"/>
        </g>

        {/* Mini-celular que el Patrón Oscuro sostiene como arma (Reference Pricing) */}
        <g id="mini-celular-reference-20" transform="translate(131, 18)">
          {/* Marco */}
          <rect id="mini-cel-marco-20" x="0" y="0" width="22" height="36" rx="3" fill="#0f172a"/>
          <rect id="mini-cel-pantalla-bg-20" x="1.2" y="1.2" width="19.6" height="33.6" rx="2" fill="url(#grad-mini-pantalla-20)"/>
          <rect id="mini-cel-isla-20" x="7" y="2" width="8" height="1.5" rx="1" fill="#0f172a"/>

          {/* Pantalla del celular — Tres columnas esquemáticas de planes */}
          <text id="mini-cel-titulo-20" x="11" y="8.5" fontFamily="sans-serif" fontSize="2.5" fontWeight="800"
            fill="#0f172a" textAnchor="middle">PLANES</text>
          <line id="mini-cel-divisor-20" x1="2" y1="10" x2="20" y2="10" stroke="#0ea5e9" strokeWidth="0.5"/>

          {/* Columna 1 (Premium - verde trampa) */}
          <rect id="mini-col1-bg-20" x="3" y="11.5" width="4.5" height="14.5" rx="0.5" fill="#dcfce7" stroke="#22c55e" strokeWidth="0.3"/>
          <rect id="mini-col1-header-20" x="3" y="11.5" width="4.5" height="2" rx="0.2" fill="#22c55e"/>
          <text id="mini-col1-tna-20" x="5.25" y="17.5" fontFamily="sans-serif" fontSize="1.1" fill="#15803d" textAnchor="middle" fontWeight="bold">3.5%</text>
          <text id="mini-col1-tea-20" x="5.25" y="23" fontFamily="sans-serif" fontSize="0.9" fill="#dc2626" textAnchor="middle" fontWeight="bold">45%</text>

          {/* Columna 2 (Estándar - gris neutro) */}
          <rect id="mini-col2-bg-20" x="8.75" y="11.5" width="4.5" height="14.5" rx="0.5" fill="#f1f5f9" stroke="#94a3b8" strokeWidth="0.3"/>
          <text id="mini-col2-tna-20" x="11" y="17.5" fontFamily="sans-serif" fontSize="1.1" fill="#475569" textAnchor="middle" fontWeight="bold">8.9%</text>
          <text id="mini-col2-tea-20" x="11" y="23" fontFamily="sans-serif" fontSize="0.9" fill="#15803d" textAnchor="middle" fontWeight="bold">9.5%</text>

          {/* Columna 3 (Normal - gris claro decoy) */}
          <rect id="mini-col3-bg-20" x="14.5" y="11.5" width="4.5" height="14.5" rx="0.5" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="0.3"/>
          <text id="mini-col3-tna-20" x="16.75" y="17.5" fontFamily="sans-serif" fontSize="1.1" fill="#94a3b8" textAnchor="middle" fontWeight="bold">2.9%</text>
          <text id="mini-col3-tea-20" x="16.75" y="23" fontFamily="sans-serif" fontSize="0.9" fill="#b91c1c" textAnchor="middle" fontWeight="bold">78%</text>

          {/* Botón "LO QUIERO YA!" en miniatura */}
          <motion.rect id="mini-cel-btn-20" x="3.5" y="28.5" width="15" height="4" rx="1"
            fill="#22c55e"
            animate={{ fill: ["#22c55e", "#15803d", "#22c55e"] }}
            transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}/>
          <text id="mini-cel-btn-txt-20" x="11" y="31.7" fontFamily="sans-serif" fontSize="2.0" fontWeight="900"
            fill="#ffffff" textAnchor="middle">¡ELEGIR PLAN!</text>
        </g>
      </motion.g>

      {/* GRUPO PROTAGONISTA: Camo Pingüino */}
      <motion.g
        id="grupo-camo-protagonista-20"
        animate={{ x: [0, 0.5, 0], y: [0, -1, 0] }}
        transition={{ repeat: Infinity, duration: 3.8, ease: "easeInOut" }}
        style={{ originX: '45px', originY: '75px' }}
      >
        <g id="pinguino-contenedor-20" transform="matrix(0, 0.848747, -0.768697, 0, 76.463808, 104.227954)">
          <ellipse id="sombra-pinguino-20" cx="-45" cy="52" rx="16" ry="3.5" fill="#000000" opacity="0.3"/>
          <path id="cola-20" d="M -57.788 25.808 C -59.05 29.859 -48.36 18.879 -54.154 6.059"
            strokeWidth="2.5" strokeLinecap="round" stroke="#000000" fill="none"/>
          <path id="pata-superior-20" d="M -32.417 31.796 L -25.744 26.644 L -25.774 33.746 L -32.417 31.796 Z"
            fill="#f59e0b"/>
          <ellipse id="cuerpo-20" cx="-47.91" cy="37.303" rx="20" ry="14" fill="#18181b"/>
          <ellipse id="vientre-20" cx="-49.91" cy="31.303" rx="14" ry="8" fill="#f4f4f5"/>
          <circle id="cabeza-20" cx="-67.91" cy="33.303" r="10" fill="#18181b"/>
          
          <g id="bufanda-20" transform="matrix(1, 0, 0, 1, -51.910336, 17.303471)">
            <path id="bufanda-cuello-20" d="M -14.315 26.443 C -12.315 20.443 -3.738 18.577 -6.624 13.624"
              stroke="#ef4444" strokeWidth="2.2" fill="none" strokeLinecap="round"/>
            <path id="bufanda-caida-roja-20"
              d="M -7.663 13.49 C -2.663 12.49 3 11 7 9 C 5 7 0.204 10.408 -6.796 12.408 L -7.663 13.49 Z"
              fill="#ef4444"/>
            <path id="bufanda-caida-guinda-20"
              d="M -6.929 14.898 C -1.929 14.898 2 14 5 13 C 3 11 -0.337 13.357 -7.337 13.357 L -6.929 14.898 Z"
              fill="#b91c1c"/>
          </g>
          
          <g id="ojo-20">
            <circle id="ojo-borde-20" cx="-67.91" cy="33.303" r="2.2" fill="#f4f4f5"/>
            <circle id="ojo-pupila-20" cx="-68.196" cy="31.871" r="1.019" fill="#000000"/>
          </g>
          <polygon id="pico-20" points="-70.91 26.303 -67.91 19.303 -64.91 26.303" fill="#f59e0b"/>
          
          <g id="patas-20" transform="matrix(1, 0, 0, 1, -51.910336, 17.303471)">
            <path id="pata-inferior-20" d="M 26.663 20.735 L 26.851 27.446 L 19.486 24.256 L 26.663 20.735 Z"
              fill="#f59e0b"/>
          </g>
          <g id="aleta-grupo-20">
            <path id="aleta-20" d="M -56.369 37.201 C -56 42 -40 37 -56.6 14.8"
              strokeWidth="2.5" strokeLinecap="round" stroke="#000000" fill="none"/>
          </g>
          <path id="reflejo-cabeza-20"
            d="M -73.439 29.591 C -69.243 32.171 -72.144 33.677 -73.512 36.113"
            strokeWidth="0.77" strokeLinecap="round" fill="none" stroke="#ffffff"/>
        </g>
      </motion.g>
    </svg>
  );
}
