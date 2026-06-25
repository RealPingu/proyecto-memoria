'use client';

import { motion } from 'framer-motion';

export default function Scene6ReferencePricing() {
  // Renderizar Zzzs flotantes de color cian sobre la cabeza de Camo
  const renderZs = (xOffset = 20, yOffset = 92, delayStep = 0) => (
    <g id="sueno-zs" transform={`translate(${xOffset}, ${yOffset})`}>
      <motion.text
        id="z-pequena"
        x="0" y="0"
        fill="#a5f3fc"
        fontSize="3"
        fontWeight="bold"
        fontFamily="monospace"
        animate={{ 
          opacity: [0, 0.9, 0], 
          y: [-1, -12], 
          x: [0, 1.5, -1.5, 0],
          scale: [0.7, 1.2]
        }}
        transition={{ repeat: Infinity, duration: 3.2, ease: "easeInOut", delay: delayStep }}
      >
        z
      </motion.text>
      <motion.text
        id="z-mediana"
        x="2.5" y="-2.5"
        fill="#a5f3fc"
        fontSize="4.2"
        fontWeight="bold"
        fontFamily="monospace"
        animate={{ 
          opacity: [0, 0.8, 0], 
          y: [-2.5, -18], 
          x: [0, -2, 2, 0],
          scale: [0.8, 1.3]
        }}
        transition={{ repeat: Infinity, duration: 3.2, ease: "easeInOut", delay: delayStep + 1.1 }}
      >
        z
      </motion.text>
      <motion.text
        id="z-grande"
        x="5" y="-5"
        fill="#a5f3fc"
        fontSize="5.5"
        fontWeight="bold"
        fontFamily="monospace"
        animate={{ 
          opacity: [0, 0.7, 0], 
          y: [-4, -24], 
          x: [0, 3, -3, 0],
          scale: [0.9, 1.4]
        }}
        transition={{ repeat: Infinity, duration: 3.2, ease: "easeInOut", delay: delayStep + 2.2 }}
      >
        Z
      </motion.text>
    </g>
  );

  return (
    <svg viewBox="0 0 200 120" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
      <defs>
        {/* Patrón de camuflaje de Camo */}
        <pattern id="camo-digital" width="20" height="20" patternUnits="userSpaceOnUse">
          <rect width="20" height="20" fill="#3f4e3f" id="rect-bg-dig"/>
          <rect x="0" y="0" width="8" height="6" fill="#2d3a2d" id="rect-dark-dig"/>
          <rect x="10" y="4" width="6" height="8" fill="#546554" id="rect-medium-dig"/>
          <rect x="2" y="10" width="8" height="6" fill="#7ba077" id="rect-light-dig"/>
          <rect x="12" y="12" width="6" height="6" fill="#202a20" id="rect-black-dig"/>
        </pattern>
        
        {/* Gradiente brillo del celular */}
        <linearGradient id="brillo-celular" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0" stopColor="#38bdf8" stopOpacity="0.6"/>
          <stop offset="1" stopColor="#bae6fd" stopOpacity="0.1"/>
        </linearGradient>
        
        {/* Fondo isométrico de la interfaz del dispositivo */}
        <pattern id="teselacion" width="40" height="40" patternUnits="userSpaceOnUse">
          <polygon points="0,0 20,10 20,30 0,20" fill="#111827" stroke="#020408" strokeWidth="0.5"/>
          <polygon points="20,10 40,0 40,20 20,30" fill="#1f2937" stroke="#020408" strokeWidth="0.5"/>
          <polygon points="0,20 20,30 20,40 0,40" fill="#0f172a" stroke="#020408" strokeWidth="0.5"/>
          <polygon points="20,30 40,20 40,40 20,40" fill="#1e1b4b" stroke="#020408" strokeWidth="0.5"/>
        </pattern>
        
        {/* Gradientes decorativos */}
        <linearGradient id="gradient-1" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0" stopColor="#38bdf8" stopOpacity="0.6"/>
          <stop offset="1" stopColor="#bae6fd" stopOpacity="0.1"/>
        </linearGradient>

        <linearGradient id="pulse-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#22c55e" stopOpacity="0.8"/>
          <stop offset="50%" stopColor="#86efac" stopOpacity="1"/>
          <stop offset="100%" stopColor="#22c55e" stopOpacity="0.8"/>
        </linearGradient>
      </defs>

      {/* Fondo Negro Absoluto de la escena */}
      <rect width="200" height="120" fill="#000000" x="0" y="0" id="fondo-escena" />

      {/* Elemento Decorativo Izquierda (Teselación flotante con gradiente) */}
      <g transform="matrix(-0.047757, 0, 0.030459, 0.054367, 16.512572, 72.678393)" id="decoracion-isometria">
        <polygon points="130,360 100,120 300,120 270,360" fill="url(#teselacion)" stroke="#06b6d4" strokeWidth="1.5"/>
        <g transform="matrix(1, 0, 0, 1, -54.158613, 5.563326)">
          <polygon points="200,160 225,180 200,200 175,180" fill="#22d3ee"/>
          <line x1="188.179" y1="174.081" x2="200.433" y2="193.748" stroke="#020408" strokeWidth="3" />
        </g>
      </g>

      {/* 1. El Sillón de Camo */}
      <g id="sillon-contenedor" transform="matrix(0.114551, 0, 0, 0.130749, 5.932414, 76.120112)">
        <rect x="60" y="80" width="380" height="130" rx="15" fill="#78350f" stroke="#451a03" strokeWidth="2"/>
        <rect x="50" y="180" width="400" height="70" rx="12" fill="#92400e" stroke="#451a03" strokeWidth="2"/>
        <line x1="250" y1="180" x2="250" y2="250" stroke="#451a03" strokeWidth="1.5"/>
        <rect x="20" y="150" width="60" height="100" rx="20" fill="#b45309" stroke="#451a03" strokeWidth="2"/>
        <rect x="420" y="150" width="60" height="100" rx="20" fill="#b45309" stroke="#451a03" strokeWidth="2"/>
        <rect x="40" y="250" width="25" height="15" fill="#1c1917"/>
        <rect x="435" y="250" width="25" height="15" fill="#1c1917"/>
      </g>

      {/* 2. El Celular Táctico de Camo sobre el brazo del sillón (con luz azul parpadeante) */}
      <g id="celular-tactico-contenedor" transform="matrix(0.089285, 0, 0, 0.112814, 6.306325, 73.610171)">
        <polygon points="160,150 162,175 120,165 122,158" fill="url(#brillo-celular)"/>
        <rect x="158" y="148" width="8" height="26" rx="1.5" fill="#18181b" stroke="#27272a" strokeWidth="0.5" transform="rotate(-15, 160, 160)"/>
        <motion.rect 
          x="159" y="150" width="4" height="22" rx="0.5" fill="#38bdf8" 
          transform="rotate(-15, 160, 160)"
          animate={{ opacity: [0.4, 1, 0.4] }}
          transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut" }}
        />
      </g>

      {/* 3. Camo durmiendo plácidamente (Cuerpo + Respiración) */}
      <g id="camo-flojo-contenedor" transform="matrix(0.114551, 0, 0, 0.130749, 7.077928, 74.533602)">
        <motion.g
          id="camo-flojo-respiracion"
          animate={{
            y: [0, -1.8, 0],
            scaleY: [1, 1.015, 1]
          }}
          transition={{
            repeat: Infinity,
            duration: 4,
            ease: "easeInOut"
          }}
          style={{ transformOrigin: "118px 210px" }}
        >
          {/* Pata Superior */}
          <path id="camo-pata-superior" d="M 130.444 194.395 L 150.444 184.395 L 148.444 199.395 L 130.444 194.395 Z" fill="#f59e0b" stroke="#d97706" strokeWidth="0.5"/>
          
          {/* Cuerpo y Vientre */}
          <ellipse id="camo-cuerpo" cx="118.065" cy="174.941" rx="32.959" ry="20.195" fill="url(#camo-digital)" stroke="#7ba077" strokeWidth="0.5" transform="matrix(0.964779, 0.26306, 0, 1.036506, -8.433431, -36.30004)"/>
          <ellipse id="camo-vientre" cx="106.907" cy="174.248" rx="22.886" ry="13.458" fill="#d8d8d0" stroke="#000000" strokeWidth="0.8" transform="matrix(0.961297, 0.275515, 0, 1.040261, 5.282357, -40.190219)"/>
          
          {/* Cabeza de Camo */}
          <circle id="camo-cabeza" cx="115" cy="165" r="18" fill="url(#camo-digital)" stroke="#7ba077" strokeWidth="0.5" transform="matrix(1.297488, 0, 0, 1.424591, -78.935854, -98.101832)"/>
          
          {/* Pico de Camo */}
          <polygon id="camo-pico" points="84.066 141.103 93.12 145.741 82.255 148.832" fill="#f59e0b" stroke="#d97706" strokeWidth="0.5"/>
          
          {/* Patas traseras/inferiores */}
          <g id="camo-patas-contenedor" transform="matrix(1, 0, 0, 1, -71.257288, -14.881023)">
            <path id="camo-pata-inferior" d="M 195 210 L 215 212 L 208 222 Z" fill="#f59e0b" stroke="#d97706" strokeWidth="0.5"/>
          </g>

          {/* Ojos de Camo (Cerrados / Durmiendo) */}
          <g id="camo-ojos" transform="matrix(0, 2.369476, -2.141482, 0, 150.247929, 290.859048)">
            <circle id="ojo-borde" cx="-67.91" cy="33.303" r="2.2" fill="#f4f4f5"/>
            <circle id="ojo-pupila" cx="-67.859" cy="32.19" r="1.019" fill="#000000"/>
            {/* Ojo cerrado (párpado de sueño) */}
            <path id="ojo-parpado" d="M -69.893 30.003 C -71.83 29.334 -72.272 34.537 -71.043 36.562" stroke="#18181b" strokeWidth="1.2" strokeLinecap="round" fill="none" />
          </g>

          {/* Aletas frontales de Camo */}
          <g id="camo-aletas">
            <path id="camo-aleta-superior" d="M 99.09 153.521 C 112.09 148.521 121.804 131.199 126.804 141.199" strokeWidth="3" strokeLinecap="round" stroke="#1c1917" fill="none"/>
            <path id="camo-aleta-inferior" d="M 86.361 170.394 C 99.361 165.394 126.789 155.112 125.203 142.63" strokeWidth="3" strokeLinecap="round" stroke="#1c1917" fill="none"/>
          </g>
        </motion.g>
      </g>

      {/* Zzzs de sueño flotando sobre la cabeza de Camo (X=20, Y=92 en el viewport de 200x120) */}
      {renderZs(20, 91, 0)}

      {/* 4. Casco Militar de Camo tirado o mal puesto en su cabeza */}
      <g id="casco-grupo" transform="matrix(-0.183405, 0.097468, 0.077837, 0.190814, 120.62791, 69.155581)" style={{ transformOrigin: "-68.388px 28.512px" }}>
        <path id="casco-cuerpo" d="M -58.2 33 C -58.472 18.27 -77.743 18.379 -77.6 33 C -77.585 34.5 -58.172 34.5 -58.2 33 Z" fill="url(#camo-digital)" stroke="#1b2611" strokeWidth="0.5"/>
        <path id="casco-banda" d="M -77.2 27.5 C -72 25 -64 25 -58.6 27.5" stroke="#1c1917" strokeWidth="1.2" fill="none" opacity="0.8"/>
      </g>

      {/* Haz de luz o distorsión del subconsciente de fondo */}
      <g id="aura-distorsion-grupo" transform="matrix(0.978245, 0, 0, 1.682657, -53.315443, -197.01441)">
        <polygon points="121.805 131.076 128.666 170.055 78.101 170.895 77.786 169.791" fill="url(#gradient-1)"/>
      </g>

      {/* 5. El Dispositivo Táctico Grande que flota a la derecha (La Interfaz del Engaño de Precios de Referencia) */}
      <g transform="matrix(0.252977, 0, 0, 0.192393, 71.371432, 0.911552)" id="dispositivo-interactivo">
        
        {/* Cuerpo del Dispositivo */}
        <g id="dispositivo">
          <rect x="20" y="20" width="460" height="560" rx="40" fill="#0f172a"/>
          <rect x="32" y="32" width="436" height="536" rx="32" fill="#cbd5e1"/>
          <rect x="185" y="42" width="130" height="16" rx="8" fill="#0f172a"/>
        </g>

        {/* Pantalla e Interfaz */}
        <g id="interfaz-planes" transform="matrix(1, 0, 0, 1, 32, 70)">
          <text x="218" y="25" fontFamily="sans-serif" fontSize="18" fontWeight="900" fill="#0f172a" textAnchor="middle" letterSpacing="0.5" style={{ whiteSpace: 'pre' }}>SELECCIONA TU PLAN DE PAGO</text>
          <text x="218" y="42" fontFamily="sans-serif" fontSize="11" fontWeight="bold" fill="#475569" text-anchor="middle" style={{ whiteSpace: 'pre' }}>¡Último paso para obtener tu Iglú Mediterráneo!</text>
          
          {/* COLUMNA 1: PLAN PREMIUM (La trampa visual con Tasa muy baja, pero costos reales ocultos) */}
          <g id="columna-verde-trampa" transform="translate(15, 65)">
            {/* Fondo con pulso verde brillante */}
            <motion.rect 
              width="130" 
              height="340" 
              rx="12" 
              fill="#f0fdf4" 
              stroke="url(#pulse-gradient)" 
              strokeWidth="3"
              animate={{ strokeWidth: [2.5, 4.5, 2.5] }}
              transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
            />
            
            {/* Banner de Más Popular */}
            <path d="M 10 0 L 120 0 L 110 18 L 20 18 Z" fill="#22c55e"/>
            <text x="65" y="12" fontFamily="sans-serif" fontSize="8" fontWeight="900" fill="#ffffff" textAnchor="middle" style={{ whiteSpace: 'pre' }}>¡MÁS POPULAR!</text>
            
            <text x="65" y="38" fontFamily="sans-serif" fontSize="11" fontWeight="900" fill="#15803d" textAnchor="middle" style={{ whiteSpace: 'pre' }}>PLAN PREMIUM</text>
            <line x1="15" y1="46" x2="115" y2="46" stroke="#bbf7d0" strokeWidth="1"/>
            <text x="65" y="65" fontFamily="sans-serif" fontSize="8" fontWeight="bold" fill="#166534" textAnchor="middle" style={{ whiteSpace: 'pre' }}>TASA MÁS BAJA</text>
            
            {/* Tasa Nominal de Referencia (3.5% TNA) gigante y engañosa */}
            <text x="65" y="88" fontFamily="Impact, sans-serif" fontSize="22" fill="#16a34a" textAnchor="middle" style={{ whiteSpace: 'pre' }}>
              3.5% <tspan fontSize="10" fontFamily="sans-serif" fontWeight="bold">TNA</tspan>
            </text>
            
            <rect x="15" y="100" width="100" height="35" rx="6" fill="#dcfce7"/>
            <text x="65" y="114" fontFamily="sans-serif" fontSize="9" fontWeight="900" fill="#14532d" textAnchor="middle" style={{ whiteSpace: 'pre' }}>CUOTAS CÓMODAS</text>
            <text x="65" y="128" fontFamily="sans-serif" fontSize="11" fontWeight="900" fill="#16a34a" textAnchor="middle" style={{ whiteSpace: 'pre' }}>240 Meses</text>
            
            {/* La verdadera tasa de interés anual oculta abajo (TEA: 45.2% en letra diminuta y pálida) */}
            <text x="65" y="155" fontFamily="sans-serif" fontSize="7" fill="#86efac" textAnchor="middle" fontWeight="bold" style={{ whiteSpace: 'pre' }}>TEA: 45.2%</text>
            
            {/* Añadidos/Pistas falsas */}
            <text x="14" y="193.5" fontFamily="sans-serif" fontSize="8" fontWeight="bold" fill="#166534" style={{ whiteSpace: 'pre', fontSize: '10px' }}>Pista de Hielo Incluida</text>
            <text x="15" y="210" fontFamily="sans-serif" fontSize="8" fontWeight="bold" fill="#166534" style={{ whiteSpace: 'pre', textAnchor: 'middle' }} transform="matrix(1, 0, 0, 1, 47.420789, 5.514045)">
              Foto autografiada por
              <tspan x="15" dy="1.1em">Brad Pinguino</tspan>
            </text>

            {/* Sparkles / Destellos mágicos parpadeantes en el plan trampa */}
            <motion.path 
              d="M 20 240 Q 20 245, 25 245 Q 20 245, 20 250 Q 20 245, 15 245 Q 20 245, 20 240 Z" fill="#eab308"
              animate={{ opacity: [0.2, 1, 0.2], scale: [0.8, 1.2, 0.8] }}
              transition={{ repeat: Infinity, duration: 1.8, delay: 0.2 }}
            />
            <motion.path 
              d="M 104.486 242.866 C 104.486 246.199 106.153 247.866 109.486 247.866 C 106.153 247.866 104.486 249.533 104.486 252.866 C 104.486 249.533 102.819 247.866 99.486 247.866 C 102.819 247.866 104.486 246.199 104.486 242.866 Z" fill="#eab308"
              animate={{ opacity: [0.3, 1, 0.3], scale: [0.7, 1.3, 0.7] }}
              transition={{ repeat: Infinity, duration: 2.2, delay: 0.8 }}
            />
            
            {/* Botón de compra llamativo y pulsante */}
            <motion.g 
              id="btn-col1" 
              transform="translate(12, 285)"
              animate={{ scale: [1, 1.03, 1] }}
              transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
              style={{ transformOrigin: "53px 18px" }}
            >
              <rect width="106" height="36" rx="8" fill="#22c55e" stroke="#15803d" strokeWidth="1"/>
              <text x="53" y="22" fontFamily="sans-serif" fontSize="10" fontWeight="900" fill="#ffffff" textAnchor="middle" style={{ whiteSpace: 'pre' }}>¡LO QUIERO YA!</text>
            </motion.g>

            <motion.path 
              d="M 63.712 251.425 C 63.712 254.758 65.379 256.425 68.712 256.425 C 65.379 256.425 63.712 258.092 63.712 261.425 C 63.712 258.092 62.045 256.425 58.712 256.425 C 62.045 256.425 63.712 254.758 63.712 251.425 Z" fill="#eab308"
              animate={{ opacity: [0.1, 0.9, 0.1] }}
              transition={{ repeat: Infinity, duration: 2.6 }}
            />
          </g>

          {/* COLUMNA 2: PLAN ESTÁNDAR (La opción realista y equilibrada) */}
          <g id="columna-gris-equilibrada" transform="translate(153, 65)">
            <rect width="130" height="340" rx="12" fill="#f1f5f9" stroke="#94a3b8" strokeWidth="1"/>
            <text x="65" y="15" fontFamily="sans-serif" fontSize="8" fontWeight="bold" fill="#64748b" textAnchor="middle" style={{ whiteSpace: 'pre' }}>RECOMENDADO</text>
            <text x="65" y="38" fontFamily="sans-serif" fontSize="11" fontWeight="bold" fill="#334155" text-anchor="middle" style={{ whiteSpace: 'pre' }}>PLAN ESTANDAR</text>
            <line x1="15" y1="46" x2="115" y2="46" stroke="#cbd5e1" strokeWidth="1"/>
            
            <text x="65" y="65" fontFamily="sans-serif" fontSize="8" fill="#64748b" text-anchor="middle" style={{ whiteSpace: 'pre' }}>Tasa Estándar</text>
            {/* Tasa nominal de 8.9% TNA */}
            <text x="65" y="88" fontFamily="Impact, sans-serif" fontSize="20" fill="#475569" text-anchor="middle" style={{ whiteSpace: 'pre' }}>
              8.9% <tspan fontSize="10" fontFamily="sans-serif" fontWeight="bold">TNA</tspan>
            </text>
            
            <rect x="15" y="100" width="100" height="35" rx="6" fill="#e2e8f0"/>
            <text x="65" y="114" fontFamily="sans-serif" fontSize="9" fontWeight="bold" fill="#475569" text-anchor="middle" style={{ whiteSpace: 'pre' }}>PLAZO CORTO</text>
            <text x="65" y="128" fontFamily="sans-serif" fontSize="11" fontWeight="bold" fill="#334155" text-anchor="middle" style={{ whiteSpace: 'pre' }}>36 Meses</text>
            
            {/* La TEA real de 9.5%, casi igual a la nominal */}
            <text x="65" y="155" fontFamily="sans-serif" fontSize="8" fill="#475569" text-anchor="middle" fontWeight="bold" style={{ whiteSpace: 'pre' }}>TEA: 9.5%</text>
            <text x="65" y="165" fontFamily="sans-serif" fontSize="6" fill="#94a3b8" text-anchor="middle" style={{ whiteSpace: 'pre' }}>Sin Comisiones Extras</text>
            <text x="27.5" y="194.6" fontFamily="sans-serif" fontSize="8" fontWeight="bold" fill="#475569" style={{ whiteSpace: 'pre', fontSize: '10px' }}>Seguro incluido</text>
            <text x="26.7" y="212.2" fontFamily="sans-serif" fontSize="8" fontWeight="bold" fill="#475569" style={{ whiteSpace: 'pre', fontSize: '10px' }}>Título Propiedad</text>
            
            <g id="btn-col2" transform="translate(12, 285)">
              <rect width="106" height="36" rx="8" fill="#64748b"/>
              <text x="53" y="22" fontFamily="sans-serif" fontSize="10" fontWeight="bold" fill="#ffffff" text-anchor="middle" style={{ whiteSpace: 'pre' }}>SELECCIONAR</text>
            </g>
          </g>

          {/* COLUMNA 3: PLAN NORMAL (La opción de largo plazo) */}
          <g id="columna-gris-palido" transform="translate(291, 65)">
            <rect width="130" height="340" rx="12" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="1"/>
            <text x="65" y="15" fontFamily="sans-serif" fontSize="8" fill="#94a3b8" text-anchor="middle" style={{ whiteSpace: 'pre' }}>OPCIÓN RÁPIDA</text>
            <text x="65" y="38" fontFamily="sans-serif" fontSize="11" fontWeight="bold" fill="#64748b" text-anchor="middle" style={{ whiteSpace: 'pre' }}>PLAN NORMAL</text>
            <line x1="15" y1="46" x2="115" y2="46" stroke="#e2e8f0" strokeWidth="1"/>
            
            <text x="65" y="65" fontFamily="sans-serif" fontSize="8" fill="#94a3b8" text-anchor="middle" style={{ whiteSpace: 'pre' }}>¡Paga solo el 0.5% Hoy!</text>
            {/* Tasa nominal muy baja (2.9% TNA) */}
            <text x="65" y="88" fontFamily="Impact, sans-serif" fontSize="20" fill="#94a3b8" text-anchor="middle" style={{ whiteSpace: 'pre' }}>
              2.9% <tspan fontSize="10" fontFamily="sans-serif" fontWeight="bold">TNA</tspan>
            </text>
            
            <rect x="15" y="100" width="100" height="35" rx="6" fill="#f1f5f9"/>
            <text x="65" y="114" fontFamily="sans-serif" fontSize="8" fill="#94a3b8" text-anchor="middle" style={{ whiteSpace: 'pre' }}>FINANCIACIÓN</text>
            <text x="65" y="128" fontFamily="sans-serif" fontSize="11" fontWeight="bold" fill="#64748b" text-anchor="middle" style={{ whiteSpace: 'pre' }}>360 Meses</text>
            
            {/* Pero con un interés real catastrófico (TEA: 78.4%) */}
            <text x="65" y="155" fontFamily="sans-serif" fontSize="8" fill="#94a3b8" text-anchor="middle" fontWeight="bold" style={{ whiteSpace: 'pre' }}>TEA: 78.4%</text>
            <text x="45" y="195.4" fontFamily="sans-serif" fontSize="8" fill="#cbd5e1" style={{ whiteSpace: 'pre', fontSize: '10px' }}>Sin Seguro</text>
            
            <g id="btn-col3" transform="translate(12, 285)">
              <rect width="106" height="36" rx="8" fill="#cbd5e1"/>
              <text x="53" y="22" fontFamily="sans-serif" fontSize="10" fontWeight="bold" fill="#94a3b8" text-anchor="middle" style={{ whiteSpace: 'pre' }}>SELECCIONAR</text>
            </g>
          </g>
        </g>

        {/* Footer del dispositivo con asterisco de descargo de responsabilidad oculto */}
        <g id="footer-bloqueado" transform="matrix(1, 0, 0, 1, 32, 512)">
          <rect width="436" height="56" fill="#1e293b" opacity="0.1" rx="0"/>
          <text x="218" y="32" fontFamily="sans-serif" fontSize="9" fontWeight="bold" fill="#475569" text-anchor="middle" style={{ whiteSpace: 'pre' }}>* Los precios de referencia mostrados no garantizan la estabilidad térmica del iglú.</text>
        </g>
      </g>
    </svg>
  );
}
