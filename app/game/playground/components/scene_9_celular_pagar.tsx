'use client';

import { motion } from 'framer-motion';

export default function Scene9CelularPagar() {
  // Trajectory of money items flying from phone screen (approx x: 138, y: 45) to Camo's area (approx x: 32, y: 95)
  const moneyItems = Array.from({ length: 10 }).map((_, i) => {
    const isCoin = i % 2 === 0;
    const delay = i * 0.45;
    const duration = 2.4 + (i % 3) * 0.4;
    const scale = 0.5 + (i % 3) * 0.15;
    return { id: i, isCoin, delay, duration, scale };
  });


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

        {/* Gradiente brillo del celular */}
        <linearGradient id="brillo-celular" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0" stopColor="#38bdf8" stopOpacity="0.6"/>
          <stop offset="1" stopColor="#bae6fd" stopOpacity="0.1"/>
        </linearGradient>

        {/* Fondo isométrico del patrón oscuro personaje */}
        <pattern id="teselacion" width="40" height="40" patternUnits="userSpaceOnUse">
          <polygon points="0,0 20,10 20,30 0,20" fill="#111827" stroke="#020408" strokeWidth="0.5"/>
          <polygon points="20,10 40,0 40,20 20,30" fill="#1f2937" stroke="#020408" strokeWidth="0.5"/>
          <polygon points="0,20 20,30 20,40 0,40" fill="#0f172a" stroke="#020408" strokeWidth="0.5"/>
          <polygon points="20,30 40,20 40,40 20,40" fill="#1e1b4b" stroke="#020408" strokeWidth="0.5"/>
        </pattern>

        {/* Proyección de brillo de pantalla */}
        <linearGradient id="gradient-1" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0" stopColor="#38bdf8" stopOpacity="0.55"/>
          <stop offset="1" stopColor="#22c55e" stopOpacity="0.05"/>
        </linearGradient>

        {/* Gradiente de fondo con resplandor verde/cian tenue detrás del teléfono */}
        <radialGradient id="colored-bg-grad" cx="80%" cy="30%" r="60%">
          <stop offset="0%" stopColor="#059669" stopOpacity="0.25"/> {/* Verde tenue */}
          <stop offset="100%" stopColor="#050508" stopOpacity="1"/>
        </radialGradient>

        {/* Gradiente oro para monedas */}
        <linearGradient id="oro-grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#fef08a" />
          <stop offset="40%" stopColor="#eab308" />
          <stop offset="100%" stopColor="#ca8a04" />
        </linearGradient>
      </defs>

      {/* Fondo degradado */}
      <rect width="200" height="120" fill="url(#colored-bg-grad)" x="0" y="0" id="fondo-escena" />

      {/* 1. Diamante del Patrón flotando a la izquierda (bajo la cama) */}
      <g id="patron-oscuro-pequeno" transform="matrix(-0.047757, 0, 0.030459, 0.054367, 16.512572, 72.678393)">
        <polygon points="130,360 100,120 300,120 270,360" fill="url(#teselacion)" stroke="#06b6d4" strokeWidth="1.5"/>
        <g transform="matrix(1, 0, 0, 1, -54.158613, 5.563326)">
          <polygon points="200,160 225,180 200,200 175,180" fill="#22d3ee"/>
          <line x1="188.179" y1="174.081" x2="200.433" y2="193.748" stroke="#020408" strokeWidth="3" />
        </g>
      </g>

      {/* 2. Sillón de Camo */}
      <g id="sillon-contenedor" transform="matrix(0.114551, 0, 0, 0.130749, 5.932414, 76.120112)">
        <rect x="60" y="80" width="380" height="130" rx="15" fill="#78350f" stroke="#451a03" strokeWidth="2"/>
        <rect x="50" y="180" width="400" height="70" rx="12" fill="#92400e" stroke="#451a03" stroke-width="2"/>
        <line x1="250" y1="180" x2="250" y2="250" stroke="#451a03" strokeWidth="1.5"/>
        <rect x="20" y="150" width="60" height="100" rx="20" fill="#b45309" stroke="#451a03" stroke-width="2"/>
        <rect x="420" y="150" width="60" height="100" rx="20" fill="#b45309" stroke="#451a03" stroke-width="2"/>
        <rect x="40" y="250" width="25" height="15" fill="#1c1917"/>
        <rect x="435" y="250" width="25" height="15" fill="#1c1917"/>
      </g>

      {/* 3. Celular Táctico tirado en el sillón con un pequeño brillo */}
      <g id="celular-tactico-sofa" transform="matrix(0.089285, 0, 0, 0.112814, 6.306325, 73.610171)">
        <polygon points="160,150 162,175 120,165 122,158" fill="url(#brillo-celular)"/>
        <rect x="158" y="148" width="8" height="26" rx="1.5" fill="#18181b" stroke="#27272a" strokeWidth="0.5" transform="rotate(-15, 160, 160)"/>
        <rect x="159" y="150" width="4" height="22" rx="0.5" fill="#38bdf8" transform="rotate(-15, 160, 160)"/>
      </g>

      {/* 4. Camo durmiendo en el sillón (con respiración animada) */}
      <g transform="matrix(0.114551, 0, 0, 0.130749, 7.077928, 74.533602)">
        <motion.g 
          id="camo-flojo" 
          animate={{
            y: [0, -5, 0],
            scaleY: [1, 1.018, 1]
          }}
          transition={{
            repeat: Infinity,
            duration: 4.2,
            ease: "easeInOut"
          }}
          style={{ transformOrigin: "118px 174px" }}
        >
          {/* Patas traseras */}
          <path id="camo-pata-superior" d="M 130.444 194.395 L 150.444 184.395 L 148.444 199.395 L 130.444 194.395 Z" fill="#f59e0b" stroke="#d97706" strokeWidth="0.5"/>
          
          {/* Cuerpo */}
          <ellipse id="camo-cuerpo" cx="118.065" cy="174.941" rx="32.959" ry="20.195" fill="url(#camo-digital)" stroke="#7ba077" strokeWidth="0.5" transform="matrix(0.964779, 0.26306, 0, 1.036506, -8.433431, -36.30004)"/>
          
          {/* Vientre */}
          <ellipse id="camo-vientre" cx="106.907" cy="174.248" rx="22.886" ry="13.458" fill="#d8d8d0" stroke="#000000" strokeWidth="0.8" transform="matrix(0.961297, 0.275515, 0, 1.040261, 5.282357, -40.190219)"/>
          
          {/* Cabeza */}
          <circle id="camo-cabeza" cx="115" cy="165" r="18" fill="url(#camo-digital)" stroke="#7ba077" strokeWidth="0.5" transform="matrix(1.297488, 0, 0, 1.424591, -78.935854, -98.101832)"/>
          
          {/* Pico */}
          <polygon id="camo-pico" points="84.066 141.103 93.12 145.741 82.255 148.832" fill="#f59e0b" stroke="#d97706" strokeWidth="0.5"/>
          
          {/* Patas delanteras */}
          <g id="camo-patas-contenedor" transform="matrix(1, 0, 0, 1, -71.257288, -14.881023)">
            <path id="camo-pata-inferior" d="M 195 210 L 215 212 L 208 222 Z" fill="#f59e0b" stroke="#d97706" strokeWidth="0.5"/>
          </g>
          
          {/* Ojos cerrados (Camo durmiendo sin percatarse del gasto) */}
          <g id="camo-ojos" transform="matrix(0, 2.369476, -2.141482, 0, 150.247929, 290.859048)">
            <circle id="ojo-borde" cx="-67.91" cy="33.303" r="2.2" fill="#f4f4f5"/>
            <circle id="ojo-pupila" cx="-67.859" cy="32.19" r="1.019" fill="#000000"/>
            <path id="ojo-parpado" d="M -69.893 30.003 C -71.83 29.334 -72.272 34.537 -71.043 36.562" stroke="#18181b" strokeWidth="1.2" strokeLinecap="round" fill="none"/>
          </g>
          
          {/* Aletas */}
          <path id="camo-aleta" d="M 99.09 153.521 C 112.09 148.521 121.804 131.199 126.804 141.199" strokeWidth="3" strokeLinecap="round" stroke="#1c1917" fill="none"/>
          <path id="path-2" d="M 86.361 170.394 C 99.361 165.394 126.789 155.112 125.203 142.63" strokeWidth="3" strokeLinecap="round" stroke="#1c1917" fill="none"/>
        </motion.g>
      </g>

      {/* 5. Casco militar de Camo tirado en el piso al lado de la cama */}
      <g id="casco-grupo" transform="matrix(-0.183405, 0.097468, 0.077837, 0.190814, 120.62791, 69.155581)" style={{ transformOrigin: "-68.388px 28.512px" }}>
        <path id="casco-cuerpo" d="M -58.2 33 C -58.472 18.27 -77.743 18.379 -77.6 33 C -77.585 34.5 -58.172 34.5 -58.2 33 Z" fill="url(#camo-digital)" stroke="#1b2611" strokeWidth="0.5"/>
        <path id="casco-banda" d="M -77.2 27.5 C -72 25 -64 25 -58.6 27.5" stroke="#1c1917" strokeWidth="1.2" fill="none" opacity="0.8"/>
      </g>

      {/* 6. Haz de luz proyectado desde el celular hacia Camo */}
      <g id="brillo-proyeccion-grupo" transform="matrix(2.670315027236939, 0, 0, 1.917878031730652, -184.93488099977006, -238.60230203277754)">
         <motion.polygon 
          id="brillo-proyeccion" 
          points="121.805 131.076 128.666 170.055 78.101 170.895 77.786 169.791" 
          fill="url(#gradient-1)"
          animate={{
            opacity: [0.4, 0.8, 0.4]
          }}
          transition={{
            repeat: Infinity,
            duration: 3,
            ease: "easeInOut"
          }}
        />
      </g>

      {/* 7. El Celular Gigante a la derecha con la interfaz e-commerce (Animado con wrapper estático) */}
      <g transform="matrix(0.163443, 0, 0, 0.151725, 96.941829, 1.920114)">
        <motion.g 
          id="dispositivo-contenedor" 
          animate={{
            y: [0, -6, 0],
            rotate: [0, 0.6, -0.6, 0]
          }}
          transition={{
            repeat: Infinity,
            duration: 5.5,
            ease: "easeInOut"
          }}
          style={{ transformOrigin: "250px 300px" }}
        >
          {/* Carcasa Celular */}
          <g id="dispositivo">
            <rect x="80" y="30" width="340" height="540" rx="40" fill="#0f172a"/>
            <rect x="92" y="42" width="316" height="516" rx="30" fill="#ffffff"/>
            <rect x="185" y="52" width="130" height="20" rx="10" fill="#0f172a"/>
          </g>

          {/* Productos Grid */}
          <g id="productos-grid" transform="translate(110, 100)">
            <text x="0" y="0" fontFamily="sans-serif" fontSize="14" fontWeight="bold" fill="#94a3b8" letterSpacing="1">RECOMENDADOS</text>
            
            {/* Producto 1: Casco */}
            <g transform="translate(0, 20)" id="prod-1">
              <rect width="135" height="135" rx="16" fill="#f8fafc" stroke="#e2e8f0" strokeWidth="1"/>
              <circle cx="67" cy="55" r="25" fill="#e0f2fe"/>
              <path d="M 52,58 C 52,43 82,43 82,58 Z" fill="#3f4e3f" stroke="#1b2611" strokeWidth="0.75" />
              <path d="M 55,58 L 67,65 L 79,58" stroke="#1c1917" strokeWidth="1.2" fill="none" />
              
              <rect x="20" y="95" width="95" height="10" rx="2" fill="#cbd5e1"/>
              <rect x="20" y="110" width="45" height="8" rx="2" fill="#94a3b8"/>
            </g>

            {/* Producto 2: Iglú */}
            <g transform="translate(145, 20)" id="prod-2">
              <rect width="135" height="135" rx="16" fill="#f8fafc" stroke="#e2e8f0" strokeWidth="1"/>
              <circle cx="67" cy="55" r="25" fill="#ffedd5"/>
              <path d="M 49,58 C 49,42 85,42 85,58 Z" fill="#eab308" />
              <path d="M 52,50 C 60,46 74,46 82,50 M 57,58 L 57,50 M 67,58 L 67,46 M 77,58 L 77,50" stroke="#ca8a04" strokeWidth="0.8" fill="none" />
              
              <rect x="20" y="95" width="95" height="10" rx="2" fill="#cbd5e1"/>
              <rect x="20" y="110" width="45" height="8" rx="2" fill="#94a3b8"/>
            </g>

            {/* Producto 3: Sardina */}
            <g transform="translate(0, 175)" id="prod-3">
              <rect width="135" height="135" rx="16" fill="#f8fafc" stroke="#e2e8f0" strokeWidth="1"/>
              <circle cx="67" cy="55" r="25" fill="#dcfce7"/>
              <path d="M 48,55 C 57,49 70,49 76,55 C 70,61 57,61 48,55 Z" fill="#0284c7" />
              <polygon points="76,55 85,50 83,55 85,60" fill="#0284c7" />
              
              <rect x="20" y="95" width="95" height="10" rx="2" fill="#cbd5e1"/>
              <rect x="20" y="110" width="45" height="8" rx="2" fill="#94a3b8"/>
            </g>

            {/* Producto 4: Visor (Seleccionado, total $49.99) */}
            <g transform="translate(145, 175)" id="prod-4">
              <rect width="135" height="135" rx="16" fill="#f8fafc" stroke="#22c55e" strokeWidth="2"/>
              <circle cx="67" cy="55" r="25" fill="#f3e8ff"/>
              <path d="M 46,55 H 88" stroke="#1e293b" strokeWidth="2.5" />
              <rect x="52" y="49" width="30" height="12" rx="3.5" fill="#22c55e" stroke="#16a34a" strokeWidth="1.2" />

              <rect x="20" y="95" width="95" height="10" rx="2" fill="#cbd5e1"/>
              <rect x="20" y="110" width="45" height="8" rx="2" fill="#94a3b8"/>
            </g>
          </g>

          {/* Footer de Checkout */}
          <g id="checkout-footer" transform="translate(92, 430)">
            <rect width="316" height="128" rx="42.157" fill="#ffffff" ry="42.157"/>
            <line x1="20" y1="0" x2="296" y2="0" stroke="#f1f5f9" stroke-width="2"/>
            <rect x="24" y="20" width="80" height="10" rx="2" fill="#94a3b8"/>
            <text x="292" y="30" fontFamily="sans-serif" fontSize="20" fontWeight="bold" fill="#0f172a" text-anchor="end">$49.99</text>
            
            {/* Botón de Compra Flapping */}
            <g id="boton-simple-aletea" transform="translate(20, 50)">
              <rect width="272" height="50" rx="12" fill="#22c55e"/>
              <text x="136" y="31" fontFamily="sans-serif" fontSize="16" fontWeight="900" fill="#ffffff" text-anchor="middle" letterSpacing="1">ALETEA PARA PAGAR !!!</text>
            </g>
          </g>
        </motion.g>
      </g>

      {/* 8. FLUJO DE DINERO FLOTANTE (Dólares pingüinales flotando del celular a Camo) */}
      <g id="dinero-flotante-grupo">
        {moneyItems.map((item) => (
          <motion.g
            key={item.id}
            id={item.isCoin ? `dolar-moneda-${item.id}` : `dolar-billete-${item.id}`}
            initial={{ x: 32, y: 92, opacity: 0, scale: 0 }}
            animate={{
              x: [32, 90, 138],
              y: [92, 62, 45],
              opacity: [0, 0.9, 0.9, 0],
              scale: [0, item.scale, item.scale, 0],
              rotate: [0, 180, 360]
            }}
            transition={{
              repeat: Infinity,
              duration: item.duration,
              delay: item.delay,
              ease: "easeInOut"
            }}
          >
            {item.isCoin ? (
              // Monedita
              <g>
                <circle cx="0" cy="0" r="3.2" fill="url(#oro-grad)" stroke="#d97706" strokeWidth="0.3" />
                <text x="0" y="1" fontFamily="monospace" fontSize="3.5" fontWeight="900" fill="#78350f" text-anchor="middle">$</text>
              </g>
            ) : (
              // Billetito
              <g>
                <rect x="-4.5" y="-2.7" width="9" height="5.4" rx="0.5" fill="#22c55e" stroke="#15803d" strokeWidth="0.35" />
                <text x="0" y="1.2" fontFamily="monospace" fontSize="3.2" fontWeight="900" fill="#ffffff" textAnchor="middle">$</text>
              </g>
            )}
          </motion.g>
        ))}
      </g>
    </svg>
  );
}
