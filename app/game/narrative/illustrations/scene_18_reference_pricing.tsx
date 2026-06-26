'use client';

import { motion } from 'framer-motion';

export default function Scene18ReferencePricing() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 200 120"
      className="w-full h-full select-none"
      id="svg-escena-18"
    >
      <defs>
        <pattern id="camo-digital-18" width="20" height="20" patternUnits="userSpaceOnUse">
          <rect width="20" height="20" fill="#3f4e3f" id="rect-bg-dig-18"/>
          <rect x="0" y="0" width="8" height="6" fill="#2d3a2d" id="rect-dark-dig-18"/>
          <rect x="10" y="4" width="6" height="8" fill="#546554" id="rect-medium-dig-18"/>
          <rect x="2" y="10" width="8" height="6" fill="#7ba077" id="rect-light-dig-18"/>
          <rect x="12" y="12" width="6" height="6" fill="#202a20" id="rect-black-dig-18"/>
        </pattern>
        <linearGradient id="brillo-celular-18" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0" stopColor="#38bdf8" stopOpacity="0.6" id="stop-brillo-1-18"/>
          <stop offset="1" stopColor="#bae6fd" stopOpacity="0.1" id="stop-brillo-2-18"/>
        </linearGradient>
        <pattern id="teselacion-18" width="40" height="40" patternUnits="userSpaceOnUse">
          <polygon points="0,0 20,10 20,30 0,20" fill="#111827" stroke="#020408" strokeWidth="0.5" id="poly-tes-1-18"/>
          <polygon points="20,10 40,0 40,20 20,30" fill="#1f2937" stroke="#020408" strokeWidth="0.5" id="poly-tes-2-18"/>
          <polygon points="0,20 20,30 20,40 0,40" fill="#0f172a" stroke="#020408" strokeWidth="0.5" id="poly-tes-3-18"/>
          <polygon points="20,30 40,20 40,40 20,40" fill="#1e1b4b" stroke="#020408" strokeWidth="0.5" id="poly-tes-4-18"/>
        </pattern>
        <linearGradient id="gradient-1-18" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0" stopColor="#38bdf8" stopOpacity="0.6" id="stop-grad1-1-18"/>
          <stop offset="1" stopColor="#bae6fd" stopOpacity="0.1" id="stop-grad1-2-18"/>
        </linearGradient>
        <radialGradient
          gradientUnits="userSpaceOnUse"
          cx="159.145" cy="39.462" r="136.148"
          id="gradient-2-18"
          gradientTransform="matrix(-0.021859, 0.323436, -0.856484, -0.078422, 203.95263, -36.684624)"
        >
          <stop offset="0" stopColor="rgb(85, 116, 218)" id="stop-grad2-1-18"/>
          <stop offset="1" stopColor="rgb(2, 68, 162)" id="stop-grad2-2-18"/>
        </radialGradient>
      </defs>

      {/* Fondo oscuro con brillo azul sutil */}
      <rect width="200" height="120" fill="#030308" id="bg-rect-18"/>
      <motion.rect
        width="200" height="120"
        fill="url(#gradient-2-18)"
        opacity={0.18}
        animate={{ opacity: [0.12, 0.22, 0.12] }}
        transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}
        id="bg-brillo-pulsante-18"
      />

      {/* Patrón Oscuro (pequeño, fondo izquierdo) */}
      <g id="grupo-patron-fondo-18" transform="matrix(-0.047757, 0, 0.030459, 0.054367, 16.512572, 72.678393)">
        <motion.g
          animate={{ y: [0, -6, 0] }}
          transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
          id="patron-movimiento-18"
        >
          <polygon id="cuerpo-patron-18" points="130,360 100,120 300,120 270,360" fill="url(#teselacion-18)" stroke="#06b6d4" strokeWidth="1.5"/>
          <g id="nucleo-patron-grupo-18" transform="matrix(1, 0, 0, 1, -54.158613, 5.563326)">
            <motion.polygon
              id="nucleo-patron-18"
              points="200,160 225,180 200,200 175,180"
              fill="#22d3ee"
              animate={{ fill: ["#22d3ee", "#e0f7fa", "#22d3ee"] }}
              transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut" }}
            />
            <line id="ojo-patron-linea-18" x1="188.179" y1="174.081" x2="200.433" y2="193.748" stroke="#020408" strokeWidth="3"/>
          </g>
        </motion.g>
      </g>

      {/* Sillón de Camo */}
      <g id="sillon-contenedor-18" transform="matrix(0.114551, 0, 0, 0.130749, 5.932414, 76.120112)">
        <rect id="respaldo-sillon-18" x="60" y="80" width="380" height="130" rx="15" fill="#78350f" stroke="#451a03" strokeWidth="2"/>
        <rect id="asiento-sillon-18" x="50" y="180" width="400" height="70" rx="12" fill="#92400e" stroke="#451a03" strokeWidth="2"/>
        <line id="division-sillon-18" x1="250" y1="180" x2="250" y2="250" stroke="#451a03" strokeWidth="1.5"/>
        <rect id="brazo-izq-sillon-18" x="20" y="150" width="60" height="100" rx="20" fill="#b45309" stroke="#451a03" strokeWidth="2"/>
        <rect id="brazo-der-sillon-18" x="420" y="150" width="60" height="100" rx="20" fill="#b45309" stroke="#451a03" strokeWidth="2"/>
        <rect id="pata-izq-sillon-18" x="40" y="250" width="25" height="15" fill="#1c1917"/>
        <rect id="pata-der-sillon-18" x="435" y="250" width="25" height="15" fill="#1c1917"/>
      </g>

      {/* Celular táctico en brazo del sillón */}
      <g id="celular-tactico-18" transform="matrix(0.089285, 0, 0, 0.112814, 6.306325, 73.610171)">
        <polygon id="celular-tactico-brillo-18" points="160,150 162,175 120,165 122,158" fill="url(#brillo-celular-18)"/>
        <rect id="celular-tactico-borde-18" x="158" y="148" width="8" height="26" rx="1.5" fill="#18181b" stroke="#27272a" strokeWidth="0.5" transform="rotate(-15, 160, 160)"/>
        <motion.rect
          id="celular-tactico-pantalla-18"
          x="159" y="150" width="4" height="22" rx="0.5" fill="#38bdf8"
          transform="rotate(-15, 160, 160)"
          animate={{ opacity: [0.3, 0.9, 0.3] }}
          transition={{ repeat: Infinity, duration: 2.2, ease: "easeInOut" }}
        />
      </g>

      {/* Camo relajado durmiendo en el sillón */}
      <g id="camo-flojo-18" transform="matrix(0.114551, 0, 0, 0.130749, 7.077928, 74.533602)">
        <motion.g
          animate={{ y: [0, -2, 0], scaleY: [1, 1.015, 1] }}
          transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
          style={{ transformOrigin: "100px 170px" }}
          id="camo-respiracion-18"
        >
          <path id="camo-pata-superior-18" d="M 130.444 194.395 L 150.444 184.395 L 148.444 199.395 L 130.444 194.395 Z" fill="#f59e0b" stroke="#d97706" strokeWidth="0.5"/>
          <ellipse id="camo-cuerpo-18" cx="118.065" cy="174.941" rx="32.959" ry="20.195" fill="url(#camo-digital-18)" stroke="#7ba077" strokeWidth="0.5" transform="matrix(0.964779, 0.26306, 0, 1.036506, -8.433431, -36.30004)"/>
          <ellipse id="camo-vientre-18" cx="106.907" cy="174.248" rx="22.886" ry="13.458" fill="#d8d8d0" stroke="#000000" strokeWidth="0.8" transform="matrix(0.961297, 0.275515, 0, 1.040261, 5.282357, -40.190219)"/>
          <circle id="camo-cabeza-18" cx="115" cy="165" r="18" fill="url(#camo-digital-18)" stroke="#7ba077" strokeWidth="0.5" transform="matrix(1.297488, 0, 0, 1.424591, -78.935854, -98.101832)"/>
          <polygon id="camo-pico-18" points="84.066 141.103 93.12 145.741 82.255 148.832" fill="#f59e0b" stroke="#d97706" strokeWidth="0.5"/>
          <g id="camo-patas-contenedor-18" transform="matrix(1, 0, 0, 1, -71.257288, -14.881023)">
            <path id="camo-pata-inferior-18" d="M 195 210 L 215 212 L 208 222 Z" fill="#f59e0b" stroke="#d97706" strokeWidth="0.5"/>
          </g>
          {/* Ojo adormilado */}
          <g id="camo-ojo-grupo-18" transform="matrix(0, 2.369476, -2.141482, 0, 150.247929, 290.859048)">
            <circle id="camo-ojo-globo-18" cx="-67.91" cy="33.303" r="2.2" fill="#f4f4f5"/>
            <circle id="camo-ojo-pupila-18" cx="-67.859" cy="32.19" r="1.019" fill="#000000"/>
            <path id="camo-ojo-parpado-18" d="M -69.893 30.003 C -71.83 29.334 -72.272 34.537 -71.043 36.562" stroke="#18181b" strokeWidth="1.2" strokeLinecap="round" fill="none"/>
          </g>
          <path id="camo-aleta-18" d="M 99.09 153.521 C 112.09 148.521 121.804 131.199 126.804 141.199" strokeWidth="3" strokeLinecap="round" stroke="#1c1917" fill="none"/>
          <path id="camo-aleta-sombra-18" d="M 86.361 170.394 C 99.361 165.394 126.789 155.112 125.203 142.63" strokeWidth="3" strokeLinecap="round" stroke="#1c1917" fill="none"/>
        </motion.g>
      </g>

      {/* Casco tirado al suelo */}
      <g id="casco-grupo-18" transform="matrix(-0.183405, 0.097468, 0.077837, 0.190814, 120.62791, 69.155581)" style={{ transformOrigin: "-68.388px 28.512px" }}>
        <path id="casco-cuerpo-18" d="M -58.2 33 C -58.472 18.27 -77.743 18.379 -77.6 33 C -77.585 34.5 -58.172 34.5 -58.2 33 Z" fill="url(#camo-digital-18)" stroke="#1b2611" strokeWidth="0.5"/>
        <path id="casco-banda-18" d="M -77.2 27.5 C -72 25 -64 25 -58.6 27.5" stroke="#1c1917" strokeWidth="1.2" fill="none" opacity="0.8"/>
      </g>

      {/* Cuadro de diálogo/zoom del SVG */}
      <g id="conector-dialogo-18" transform="matrix(1.222219, 0, 0, 1.521058, -72.293215, -170.787526)">
        <polygon id="conector-triangulo-18" points="121.805 131.076 128.666 170.055 78.101 170.895 77.786 169.791" fill="url(#gradient-1-18)"/>
      </g>

      {/* Celular grande con pantalla de Selección de Plan (Centro-Derecha) */}
      <g id="celular-grande-grupo-18" transform="matrix(0.252977, 0, 0, 0.192393, 71.371432, 0.911552)">
        {/* Marco del celular */}
        <g id="marco-celular-18">
          <rect id="marco-externo-18" x="20" y="20" width="460" height="560" rx="40" fill="#0f172a"/>
          <rect id="marco-interno-18" x="32" y="32" width="436" height="536" rx="32" fill="#cbd5e1"/>
          <rect id="isla-dinamica-18" x="185" y="42" width="130" height="16" rx="8" fill="#0f172a"/>
        </g>

        {/* Contenido: Interfaz de Planes (Reference Pricing) */}
        <g id="interfaz-planes-18" transform="matrix(1, 0, 0, 1, 32.000001, 70.000002)">
          <text id="titulo-planes-18" x="218" y="25" fontFamily="sans-serif" fontSize="18" fontWeight="900" fill="#0f172a" textAnchor="middle" letterSpacing="0.5">SELECCIONA TU PLAN DE PAGO</text>
          <text id="subtitulo-planes-18" x="218" y="42" fontFamily="sans-serif" fontSize="11" fontWeight="bold" fill="#475569" textAnchor="middle">¡Último paso para obtener tu Iglú Mediterráneo!</text>

          {/* Columna 1: PLAN PREMIUM (Verde trampa) */}
          <g id="columna-verde-trampa-18" transform="translate(15, 65)">
            <rect id="bg-col1-18" width="130" height="340" rx="12" fill="#f0fdf4" stroke="#22c55e" strokeWidth="3"/>
            <path id="cinta-popular-18" d="M 10 0 L 120 0 L 110 18 L 20 18 Z" fill="#22c55e"/>
            <text id="txt-popular-18" x="65" y="12" fontFamily="sans-serif" fontSize="8" fontWeight="900" fill="#ffffff" textAnchor="middle">¡MÁS POPULAR!</text>
            <text id="txt-premium-18" x="65" y="38" fontFamily="sans-serif" fontSize="11" fontWeight="900" fill="#15803d" textAnchor="middle">PLAN PREMIUM</text>
            <line id="divisor-premium-18" x1="15" y1="46" x2="115" y2="46" stroke="#bbf7d0" strokeWidth="1"/>
            
            <text id="txt-premium-tasa-lbl-18" x="65" y="65" fontFamily="sans-serif" fontSize="8" fontWeight="bold" fill="#166534" textAnchor="middle">TASA MÁS BAJA</text>
            <text id="txt-premium-tna-18" x="65" y="88" fontFamily="Impact, sans-serif" fontSize="22" fill="#16a34a" textAnchor="middle">3.5% <tspan fontSize="10" fontFamily="sans-serif" fontWeight="bold">TNA</tspan></text>
            
            <rect id="badge-cuotas-premium-18" x="15" y="100" width="100" height="35" rx="6" fill="#dcfce7"/>
            <text id="txt-cuotas-lbl-18" x="65" y="114" fontFamily="sans-serif" fontSize="9" fontWeight="900" fill="#14532d" textAnchor="middle">CUOTAS CÓMODAS</text>
            <text id="txt-cuotas-premium-18" x="65" y="128" fontFamily="sans-serif" fontSize="11" fontWeight="900" fill="#16a34a" textAnchor="middle">240 Meses</text>
            
            <motion.text
              id="txt-premium-tea-18"
              x="65" y="155" fontFamily="sans-serif" fontSize="7" fill="#dc2626" textAnchor="middle" fontWeight="bold"
              animate={{ opacity: [0.6, 1, 0.6] }}
              transition={{ repeat: Infinity, duration: 2.5 }}
            >
              TEA: 45.2%
            </motion.text>
            
            <text id="txt-premium-det-1-18" x="65" y="193" fontFamily="sans-serif" fontSize="9" fontWeight="bold" fill="#166534" textAnchor="middle">Pista de Hielo Incluida</text>
            <text id="txt-premium-det-2-18" x="65" y="215" fontFamily="sans-serif" fontSize="8" fontWeight="bold" fill="#166534" textAnchor="middle">Foto Autografiada</text>

            <g id="btn-premium-18" transform="translate(12, 285)">
              <rect id="btn-premium-rect-18" width="106" height="36" rx="8" fill="#22c55e" stroke="#15803d" strokeWidth="1"/>
              <text id="btn-premium-txt-18" x="53" y="22" fontFamily="sans-serif" fontSize="10" fontWeight="900" fill="#ffffff" textAnchor="middle">¡LO QUIERO YA!</text>
            </g>
          </g>

          {/* Columna 2: PLAN ESTANDAR (Gris neutro - La correcta) */}
          <g id="columna-gris-estandar-18" transform="translate(153, 65)">
            <rect id="bg-col2-18" width="130" height="340" rx="12" fill="#f1f5f9" stroke="#94a3b8" strokeWidth="1"/>
            <text id="txt-estandar-lbl-18" x="65" y="15" fontFamily="sans-serif" fontSize="8" fontWeight="bold" fill="#64748b" textAnchor="middle">RECOMENDADO</text>
            <text id="txt-estandar-titulo-18" x="65" y="38" fontFamily="sans-serif" fontSize="11" fontWeight="bold" fill="#334155" textAnchor="middle">PLAN ESTANDAR</text>
            <line id="divisor-estandar-18" x1="15" y1="46" x2="115" y2="46" stroke="#cbd5e1" strokeWidth="1"/>
            
            <text id="txt-estandar-tasa-lbl-18" x="65" y="65" fontFamily="sans-serif" fontSize="8" fill="#64748b" textAnchor="middle">Tasa Estándar</text>
            <text id="txt-estandar-tna-18" x="65" y="88" fontFamily="Impact, sans-serif" fontSize="20" fill="#475569" textAnchor="middle">8.9% <tspan fontSize="10" fontFamily="sans-serif" fontWeight="bold">TNA</tspan></text>
            
            <rect id="badge-cuotas-estandar-18" x="15" y="100" width="100" height="35" rx="6" fill="#e2e8f0"/>
            <text id="txt-plazo-lbl-18" x="65" y="114" fontFamily="sans-serif" fontSize="9" fontWeight="bold" fill="#475569" textAnchor="middle">PLAZO CORTO</text>
            <text id="txt-cuotas-estandar-18" x="65" y="128" fontFamily="sans-serif" fontSize="11" fontWeight="bold" fill="#334155" textAnchor="middle">36 Meses</text>
            
            <text id="txt-estandar-tea-18" x="65" y="155" fontFamily="sans-serif" fontSize="8" fill="#15803d" textAnchor="middle" fontWeight="bold">TEA: 9.5%</text>
            <text id="txt-estandar-det-1-18" x="65" y="193" fontFamily="sans-serif" fontSize="9" fontWeight="bold" fill="#475569" textAnchor="middle">Seguro Incluido</text>
            
            <g id="btn-estandar-18" transform="translate(12, 285)">
              <rect id="btn-estandar-rect-18" width="106" height="36" rx="8" fill="#64748b"/>
              <text id="btn-estandar-txt-18" x="53" y="22" fontFamily="sans-serif" fontSize="10" fontWeight="bold" fill="#ffffff" textAnchor="middle">SELECCIONAR</text>
            </g>
          </g>

          {/* Columna 3: PLAN NORMAL (Gris claro - El señuelo) */}
          <g id="columna-gris-normal-18" transform="translate(291, 65)">
            <rect id="bg-col3-18" width="130" height="340" rx="12" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="1"/>
            <text id="txt-normal-lbl-18" x="65" y="15" fontFamily="sans-serif" fontSize="8" fill="#94a3b8" textAnchor="middle">OPCIÓN RÁPIDA</text>
            <text id="txt-normal-titulo-18" x="65" y="38" fontFamily="sans-serif" fontSize="11" fontWeight="bold" fill="#64748b" textAnchor="middle">PLAN NORMAL</text>
            <line id="divisor-normal-18" x1="15" y1="46" x2="115" y2="46" stroke="#e2e8f0" strokeWidth="1"/>
            
            <text id="txt-normal-tasa-lbl-18" x="65" y="65" fontFamily="sans-serif" fontSize="8" fill="#94a3b8" textAnchor="middle">Tasa Especial</text>
            <text id="txt-normal-tna-18" x="65" y="88" fontFamily="Impact, sans-serif" fontSize="20" fill="#94a3b8" textAnchor="middle">2.9% <tspan fontSize="10" fontFamily="sans-serif" fontWeight="bold">TNA</tspan></text>
            
            <rect id="badge-cuotas-normal-18" x="15" y="100" width="100" height="35" rx="6" fill="#f1f5f9"/>
            <text id="txt-financiacion-lbl-18" x="65" y="114" fontFamily="sans-serif" fontSize="8" fill="#94a3b8" textAnchor="middle">FINANCIACIÓN</text>
            <text id="txt-cuotas-normal-18" x="65" y="128" fontFamily="sans-serif" fontSize="11" fontWeight="bold" fill="#64748b" textAnchor="middle">360 Meses</text>
            
            <text id="txt-normal-tea-18" x="65" y="155" fontFamily="sans-serif" fontSize="8" fill="#b91c1c" textAnchor="middle" fontWeight="bold">TEA: 78.4%</text>
            <text id="txt-normal-det-1-18" x="65" y="193" fontFamily="sans-serif" fontSize="9" fill="#cbd5e1" textAnchor="middle">Sin Seguro</text>

            <g id="btn-normal-18" transform="translate(12, 285)">
              <rect id="btn-normal-rect-18" width="106" height="36" rx="8" fill="#cbd5e1"/>
              <text id="btn-normal-txt-18" x="53" y="22" fontFamily="sans-serif" fontSize="10" fontWeight="bold" fill="#94a3b8" textAnchor="middle">SELECCIONAR</text>
            </g>
          </g>
        </g>

        {/* Footer legal del celular */}
        <g id="footer-bloqueado-18" transform="matrix(1, 0, 0, 1, 32.000001, 512.000015)">
          <rect id="footer-bg-18" width="436" height="56" fill="#1e293b" opacity="0.1" rx="0"/>
          <text id="footer-txt-18" x="218" y="32" fontFamily="sans-serif" fontSize="8.5" fontWeight="bold" fill="#475569" textAnchor="middle">* Los precios de referencia mostrados no garantizan la estabilidad térmica del iglú.</text>
        </g>
      </g>
    </svg>
  );
}
