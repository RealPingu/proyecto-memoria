'use client';

import { motion } from 'framer-motion';

export default function Scene15DripPricing() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 200 120"
      className="w-full h-full select-none"
    >
      <defs>
        <pattern id="camo-digital-15" width="20" height="20" patternUnits="userSpaceOnUse">
          <rect width="20" height="20" fill="#3f4e3f" id="rect-bg-dig"/>
          <rect x="0" y="0" width="8" height="6" fill="#2d3a2d" id="rect-dark-dig"/>
          <rect x="10" y="4" width="6" height="8" fill="#546554" id="rect-medium-dig"/>
          <rect x="2" y="10" width="8" height="6" fill="#7ba077" id="rect-light-dig"/>
          <rect x="12" y="12" width="6" height="6" fill="#202a20" id="rect-black-dig"/>
        </pattern>
        <linearGradient id="brillo-celular-15" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0" stopColor="#38bdf8" stopOpacity="0.6"/>
          <stop offset="1" stopColor="#bae6fd" stopOpacity="0.1"/>
        </linearGradient>
        <pattern id="teselacion-15" width="40" height="40" patternUnits="userSpaceOnUse">
          <polygon points="0,0 20,10 20,30 0,20" fill="#111827" stroke="#020408" strokeWidth="0.5"/>
          <polygon points="20,10 40,0 40,20 20,30" fill="#1f2937" stroke="#020408" strokeWidth="0.5"/>
          <polygon points="0,20 20,30 20,40 0,40" fill="#0f172a" stroke="#020408" strokeWidth="0.5"/>
          <polygon points="20,30 40,20 40,40 20,40" fill="#1e1b4b" stroke="#020408" strokeWidth="0.5"/>
        </pattern>
        <linearGradient id="gradient-1-15" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0" stopColor="#38bdf8" stopOpacity="0.6"/>
          <stop offset="1" stopColor="#bae6fd" stopOpacity="0.1"/>
        </linearGradient>
        <radialGradient
          gradientUnits="userSpaceOnUse"
          cx="159.145" cy="39.462" r="136.148"
          id="gradient-2-15"
          gradientTransform="matrix(-0.021859, 0.323436, -0.856484, -0.078422, 203.95263, -36.684624)"
        >
          <stop offset="0" stopColor="rgb(85, 116, 218)"/>
          <stop offset="1" stopColor="rgb(2, 68, 162)"/>
        </radialGradient>
      </defs>

      {/* Fondo oscuro con brillo azul sutil */}
      <rect width="200" height="120" fill="#030308"/>
      <motion.rect
        width="200" height="120"
        fill="url(#gradient-2-15)"
        opacity={0.18}
        animate={{ opacity: [0.12, 0.22, 0.12] }}
        transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}
      />

      {/* Patrón Oscuro (pequeño, fondo izquierdo) */}
      <g transform="matrix(-0.047757, 0, 0.030459, 0.054367, 16.512572, 72.678393)">
        <motion.g
          animate={{ y: [0, -6, 0] }}
          transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
        >
          <polygon points="130,360 100,120 300,120 270,360" fill="url(#teselacion-15)" stroke="#06b6d4" strokeWidth="1.5"/>
          <g transform="matrix(1, 0, 0, 1, -54.158613, 5.563326)">
            <motion.polygon
              points="200,160 225,180 200,200 175,180"
              fill="#22d3ee"
              animate={{ fill: ["#22d3ee", "#e0f7fa", "#22d3ee"] }}
              transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut" }}
            />
            <line x1="188.179" y1="174.081" x2="200.433" y2="193.748" stroke="#020408" strokeWidth="3"/>
          </g>
        </motion.g>
      </g>

      {/* Sillón de Camo */}
      <g id="sillon-contenedor" transform="matrix(0.114551, 0, 0, 0.130749, 5.932414, 76.120112)">
        <rect x="60" y="80" width="380" height="130" rx="15" fill="#78350f" stroke="#451a03" strokeWidth="2"/>
        <rect x="50" y="180" width="400" height="70" rx="12" fill="#92400e" stroke="#451a03" strokeWidth="2"/>
        <line x1="250" y1="180" x2="250" y2="250" stroke="#451a03" strokeWidth="1.5"/>
        <rect x="20" y="150" width="60" height="100" rx="20" fill="#b45309" stroke="#451a03" strokeWidth="2"/>
        <rect x="420" y="150" width="60" height="100" rx="20" fill="#b45309" stroke="#451a03" strokeWidth="2"/>
        <rect x="40" y="250" width="25" height="15" fill="#1c1917"/>
        <rect x="435" y="250" width="25" height="15" fill="#1c1917"/>
      </g>

      {/* Celular táctico en brazo del sillón */}
      <g id="celular-tactico-15" transform="matrix(0.089285, 0, 0, 0.112814, 6.306325, 73.610171)">
        <polygon points="160,150 162,175 120,165 122,158" fill="url(#brillo-celular-15)"/>
        <rect x="158" y="148" width="8" height="26" rx="1.5" fill="#18181b" stroke="#27272a" strokeWidth="0.5" transform="rotate(-15, 160, 160)"/>
        <motion.rect
          x="159" y="150" width="4" height="22" rx="0.5" fill="#38bdf8"
          transform="rotate(-15, 160, 160)"
          animate={{ opacity: [0.3, 0.9, 0.3] }}
          transition={{ repeat: Infinity, duration: 2.2, ease: "easeInOut" }}
        />
      </g>

      {/* Camo relajado durmiendo en el sillón */}
      <g id="camo-flojo" transform="matrix(0.114551, 0, 0, 0.130749, 7.077928, 74.533602)">
        <motion.g
          animate={{ y: [0, -2, 0], scaleY: [1, 1.015, 1] }}
          transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
          style={{ transformOrigin: "100px 170px" }}
        >
          <path id="camo-pata-superior" d="M 130.444 194.395 L 150.444 184.395 L 148.444 199.395 L 130.444 194.395 Z" fill="#f59e0b" stroke="#d97706" strokeWidth="0.5"/>
          <ellipse id="camo-cuerpo" cx="118.065" cy="174.941" rx="32.959" ry="20.195" fill="url(#camo-digital-15)" stroke="#7ba077" strokeWidth="0.5" transform="matrix(0.964779, 0.26306, 0, 1.036506, -8.433431, -36.30004)"/>
          <ellipse id="camo-vientre" cx="106.907" cy="174.248" rx="22.886" ry="13.458" fill="#d8d8d0" stroke="#000000" strokeWidth="0.8" transform="matrix(0.961297, 0.275515, 0, 1.040261, 5.282357, -40.190219)"/>
          <circle id="camo-cabeza" cx="115" cy="165" r="18" fill="url(#camo-digital-15)" stroke="#7ba077" strokeWidth="0.5" transform="matrix(1.297488, 0, 0, 1.424591, -78.935854, -98.101832)"/>
          <polygon id="camo-pico" points="84.066 141.103 93.12 145.741 82.255 148.832" fill="#f59e0b" stroke="#d97706" strokeWidth="0.5"/>
          <g id="camo-patas-contenedor" transform="matrix(1, 0, 0, 1, -71.257288, -14.881023)">
            <path id="camo-pata-inferior" d="M 195 210 L 215 212 L 208 222 Z" fill="#f59e0b" stroke="#d97706" strokeWidth="0.5"/>
          </g>
          {/* Ojo adormilado */}
          <g id="group-1" transform="matrix(0, 2.369476, -2.141482, 0, 150.247929, 290.859048)">
            <circle id="circle-1" cx="-67.91" cy="33.303" r="2.2" fill="#f4f4f5"/>
            <circle id="circle-2" cx="-67.859" cy="32.19" r="1.019" fill="#000000"/>
            <path id="path-1" d="M -69.893 30.003 C -71.83 29.334 -72.272 34.537 -71.043 36.562" stroke="#18181b" strokeWidth="1.2" strokeLinecap="round" fill="none"/>
          </g>
          <path id="camo-aleta" d="M 99.09 153.521 C 112.09 148.521 121.804 131.199 126.804 141.199" strokeWidth="3" strokeLinecap="round" stroke="#1c1917" fill="none"/>
          <path id="path-2" d="M 86.361 170.394 C 99.361 165.394 126.789 155.112 125.203 142.63" strokeWidth="3" strokeLinecap="round" stroke="#1c1917" fill="none"/>
        </motion.g>
      </g>

      {/* Casco tirado al suelo */}
      <g id="casco-grupo" transform="matrix(-0.183405, 0.097468, 0.077837, 0.190814, 120.62791, 69.155581)" style={{ transformOrigin: "-68.388px 28.512px" }}>
        <path id="casco-cuerpo" d="M -58.2 33 C -58.472 18.27 -77.743 18.379 -77.6 33 C -77.585 34.5 -58.172 34.5 -58.2 33 Z" fill="url(#camo-digital-15)" stroke="#1b2611" strokeWidth="0.5"/>
        <path id="casco-banda" d="M -77.2 27.5 C -72 25 -64 25 -58.6 27.5" stroke="#1c1917" strokeWidth="1.2" fill="none" opacity="0.8"/>
      </g>

      {/* Cuadro de diálogo del SVG */}
      <g id="group-2" transform="matrix(1.222219, 0, 0, 1.521058, -72.293215, -170.787526)">
        <polygon points="121.805 131.076 128.666 170.055 78.101 170.895 77.786 169.791" fill="url(#gradient-1-15)"/>
      </g>

      {/* Celular grande con pantalla de checkout (Centro-Derecha) */}
      <g transform="matrix(0.241145, 0, 0, 0.200492, 74.159899, -0.278911)">
        {/* Marco del celular */}
        <g id="group-3">
          <rect x="80" y="30" width="340" height="540" rx="40" fill="#0f172a"/>
          <rect x="92" y="42" width="316" height="516" rx="39.824" fill="#cbd5e1"/>
          <rect x="185" y="52" width="130" height="20" rx="10" fill="#0f172a"/>
        </g>

        {/* Pantalla de Checkout con contenido del Drip Pricing */}
        <g id="pantalla-intermedia" transform="matrix(1, 0, 0, 1, 92, 85)">
          <text x="158" y="20" fontFamily="sans-serif" fontSize="18" fontWeight="900" fill="#0f172a" textAnchor="middle">CONFIRMA TUS AÑADIDOS</text>
          <line x1="20" y1="35" x2="296" y2="35" stroke="#f59e0b" strokeWidth="2"/>

          {/* Términos y condiciones (letra chiquita) */}
          <g transform="translate(15, 60)">
            <text x="35.871" y="-1.259" fontFamily="sans-serif" fontSize="12" fontWeight="bold" fill="#a0a0a0">Términos y Condiciones Generales</text>
            <rect x="0" y="10" width="286" height="120" rx="4" stroke="#a0a0a0" strokeWidth="1" fill="rgb(255, 241, 241)"/>
            <text x="10" y="30" fontFamily="sans-serif" fontSize="9" fill="#909090" transform="matrix(1, 0, 0, 1, -7.480055, -16.11084)">
              <tspan x="10" dy="1em">​</tspan>
              <tspan x="10" dy="0">1. Al continuar, usted acepta que el Iglú Mediterráneo es</tspan>
              <tspan x="10" dy="12">una construcción conceptual no sujeta a leyes físicas.</tspan>
              <tspan x="10" dy="12">2. El vendedor no se responsabiliza de daños por derretimiento</tspan>
              <tspan x="10" dy="12">fortuito en climas templados o superiores a 0°C.</tspan>
              <tspan x="10" dy="12">3. Cualquier reclamación sobre arenques inexistentes será</tspan>
              <tspan x="10" dy="12">derivada al Departamento de Ficción Marítima.</tspan>
              <tspan x="10" dy="12">4. Usted cede los derechos de imagen de sus pingüinos imaginarios.</tspan>
              <tspan x="10" dy="1em">​</tspan>
              <tspan x="10" dy="0">5. Si puedes leer esto en un celular, envidio tu vista.</tspan>
            </text>
          </g>

          {/* Servicio adicional: Seguro Anti-Bombas */}
          <g transform="translate(15, 200)">
            <text fontFamily="sans-serif" fontSize="12" fontWeight="bold" fill="#0f172a" x="74.792" y="3.626">Servicios Adicionales</text>
            <rect x="0" y="10" width="286" height="80" rx="4" strokeWidth="3" fill="rgb(160, 160, 160)"/>

            {/* Checkbox pre-marcado */}
            <motion.rect
              x="15" y="40" width="20" height="20" rx="2"
              fill="rgb(223, 218, 232)"
              animate={{ fill: ["rgb(223,218,232)", "rgb(200,200,220)", "rgb(223,218,232)"] }}
              transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
            />
            <path d="M 19 50 L 23 54 L 31 46" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" fill="none" stroke="rgb(143, 141, 127)"/>

            <text fontFamily="sans-serif" fontSize="10" fontWeight="bold" fill="#0f172a" x="55.406" y="28.964">Seguro Anti-Bombardeo Atómico</text>
            <text fontFamily="sans-serif" fontSize="9" fill="#0f172a" y="45.484" x="40.447" transform="matrix(1, 0, 0, 1, 0.650397, -7.040266)">
              <tspan x="40.447" dy="1em">​</tspan>
              <tspan x="40.447" dy="0" style={{ fontSize: "10px" }}>Cobertura total contra artefactos nucleares enviados</tspan>
              <tspan x="40.447" dy="12" style={{ fontSize: "10px" }}>específicamente por pingüinos nativos del Polo Norte.</tspan>
              <tspan x="40.447" dy="1em">​</tspan>
              <tspan x="40.447" dy="0">(La no existencia de pingüinos en el Polo Norte no</tspan>
              <tspan x="40.447" dy="1em">​</tspan>
              <tspan x="40.447" dy="0">invalida este contrato)</tspan>
            </text>
            {/* Precio goteado que pulsa para llamar atención */}
            <motion.text
              fontFamily="sans-serif" fontSize="12" fontWeight="900" fill="rgb(129, 118, 118)"
              x="278.376" y="26.096"
              textAnchor="end"
              animate={{ fill: ["rgb(129,118,118)", "rgb(180,60,60)", "rgb(129,118,118)"] }}
              transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut" }}
            >
              +19.99€
            </motion.text>
          </g>

          {/* Banner de empresa */}
          <g id="group-4" transform="matrix(1, 0, 0, 0.861494, 0.18386, 329.400492)">
            <rect x="22.53" y="-15.768" width="262" height="62" stroke="#000" strokeWidth="2" fill="url(#gradient-2-15)"/>
            <text fill="rgb(255,255,255)" fontWeight="900" textAnchor="middle" transform="matrix(1, 0, 0, 1, 0.895911, -4.679846)">
              <tspan x="154.001" y="18.349">Tu Comodiad es nuestra </tspan>
              <tspan x="154.001" dy="1em">​</tspan>
              <tspan>prioridad!</tspan>
            </text>
          </g>
        </g>

        {/* Botón de Continuar (pulsante) */}
        <g id="group-5" transform="matrix(1, 0, 0, 1, 89.760165, 454.321333)">
          <motion.rect
            x="20" y="19" width="272" height="50" rx="12"
            fill="#111827"
            animate={{ fill: ["#111827", "#1e293b", "#111827"] }}
            transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          />
          <text x="156" y="50" fontFamily="sans-serif" fontSize="13" fontWeight="900" fill="#ef4444" textAnchor="middle">SIGUE CON TU COMPRA</text>
        </g>
      </g>
    </svg>
  );
}
