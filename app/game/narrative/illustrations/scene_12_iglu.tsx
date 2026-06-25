'use client';

import { motion } from 'framer-motion';

export default function Scene12Iglu() {
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
        
        {/* Brillo para pantalla de celular sostenido */}
        <linearGradient id="brillo-celular" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0" stopColor="#38bdf8" stopOpacity="0.6"/>
          <stop offset="1" stopColor="#bae6fd" stopOpacity="0.1"/>
        </linearGradient>
        
        {/* Fondo del celular en perspectiva */}
        <pattern id="teselacion" width="40" height="40" patternUnits="userSpaceOnUse">
          <polygon points="0,0 20,10 20,30 0,20" fill="#111827" stroke="#020408" strokeWidth="0.5"/>
          <polygon points="20,10 40,0 40,20 20,30" fill="#1f2937" stroke="#020408" strokeWidth="0.5"/>
          <polygon points="0,20 20,30 20,40 0,40" fill="#0f172a" stroke="#020408" strokeWidth="0.5"/>
          <polygon points="20,30 40,20 40,40 20,40" fill="#1e1b4b" stroke="#020408" strokeWidth="0.5"/>
        </pattern>
        
        {/* Gradiente para la luz del celular gigante proyectándose */}
        <linearGradient id="gradient-1" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0" stopColor="#38bdf8" stopOpacity="0.6"/>
          <stop offset="1" stopColor="#bae6fd" stopOpacity="0.1"/>
        </linearGradient>

        {/* Gradiente de fondo con resplandor verde/cian tenue detrás del teléfono */}
        <radialGradient id="colored-bg-grad" cx="80%" cy="30%" r="60%">
          <stop offset="0%" stopColor="#059669" stopOpacity="0.25"/> {/* Verde tenue */}
          <stop offset="100%" stopColor="#050508" stopOpacity="1"/>
        </radialGradient>
      </defs>

      {/* Fondo degradado verde */}
      <rect width="200" height="120" fill="url(#colored-bg-grad)" x="0" y="0" id="fondo-escena" />

      {/* Contenedor completo alineado con el SVG */}
      <g transform="matrix(0.9999999999999999, 0, 0, 0.9999999999999999, 0, -5.684341886080802e-14)">
        
        {/* Luz que sale de la pantalla */}
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
        
        {/* Pantalla en perspectiva */}
        <g transform="matrix(-0.047757, 0, 0.030459, 0.054367, 16.512572, 72.678393)">
          <polygon points="130,360 100,120 300,120 270,360" fill="url(#teselacion)" stroke="#06b6d4" strokeWidth="1.5"/>
          <g transform="matrix(1, 0, 0, 1, -54.158613, 5.563326)">
            <polygon points="200,160 225,180 200,200 175,180" fill="#22d3ee"/>
            <line x1="188.179" y1="174.081" x2="200.433" y2="193.748" stroke="#020408" strokeWidth="3"/>
          </g>
        </g>
        
        {/* Sillón donde descansa Camo */}
        <g id="sillon-contenedor" transform="matrix(0.114551, 0, 0, 0.130749, 5.932414, 76.120112)">
          <rect x="60" y="80" width="380" height="130" rx="15" fill="#78350f" stroke="#451a03" strokeWidth="2"/>
          <rect x="50" y="180" width="400" height="70" rx="12" fill="#92400e" stroke="#451a03" strokeWidth="2"/>
          <line x1="250" y1="180" x2="250" y2="250" stroke="#451a03" strokeWidth="1.5"/>
          <rect x="20" y="150" width="60" height="100" rx="20" fill="#b45309" stroke="#451a03" strokeWidth="2"/>
          <rect x="420" y="150" width="60" height="100" rx="20" fill="#b45309" stroke="#451a03" strokeWidth="2"/>
          <rect x="40" y="250" width="25" height="15" fill="#1c1917"/>
          <rect x="435" y="250" width="25" height="15" fill="#1c1917"/>
        </g>
        
        {/* Celular sostenido por Camo */}
        <g id="celular-táctico" transform="matrix(0.089285, 0, 0, 0.112814, 6.306325, 73.610171)">
          <polygon points="160,150 162,175 120,165 122,158" fill="url(#brillo-celular)"/>
          <rect x="158" y="148" width="8" height="26" rx="1.5" fill="#18181b" stroke="#27272a" strokeWidth="0.5" transform="rotate(-15, 160, 160)"/>
          <rect x="159" y="150" width="4" height="22" rx="0.5" fill="#38bdf8" transform="rotate(-15, 160, 160)"/>
        </g>
        
        {/* Camo acostado y relajado (Animado con motion.g padre) */}
        <motion.g
          animate={{
            y: [0, -0.6, 0]
          }}
          transition={{
            repeat: Infinity,
            duration: 4,
            ease: "easeInOut"
          }}
        >
          <g id="camo-flojo" transform="matrix(0.114551, 0, 0, 0.130749, 7.077928, 74.533602)">
          {/* Pata Superior */}
          <path id="camo-pata-superior" d="M 130.444 194.395 L 150.444 184.395 L 148.444 199.395 L 130.444 194.395 Z" fill="#f59e0b" stroke="#d97706" strokeWidth="0.5"/>
          
          {/* Cuerpo */}
          <ellipse id="camo-cuerpo" cx="118.065" cy="174.941" rx="32.959" ry="20.195" fill="url(#camo-digital)" stroke="#7ba077" strokeWidth="0.5" transform="matrix(0.964779, 0.26306, 0, 1.036506, -8.433431, -36.30004)"/>
          
          {/* Vientre */}
          <ellipse id="camo-vientre" cx="106.907" cy="174.248" rx="22.886" ry="13.458" fill="#d8d8d0" stroke="#000000" strokeWidth="0.8" transform="matrix(0.961297, 0.275515, 0, 1.040261, 5.282357, -40.190219)"/>
          
          {/* Cabeza */}
          <circle id="camo-cabeza" cx="115" cy="165" r="18" fill="url(#camo-digital)" stroke="#7ba077" strokeWidth="0.5" transform="matrix(1.297488, 0, 0, 1.424591, -78.935854, -98.101832)"/>
          
          {/* Pico */}
          <polygon id="camo-pico" points="84.066 141.103 93.12 145.741 82.255 148.832" fill="#f59e0b" stroke="#d97706" strokeWidth="0.5"/>
          
          {/* Pata Inferior */}
          <g id="camo-patas-contenedor" transform="matrix(1, 0, 0, 1, -71.257288, -14.881023)">
            <path id="camo-pata-inferior" d="M 195 210 L 215 212 L 208 222 Z" fill="#f59e0b" stroke="#d97706" strokeWidth="0.5"/>
          </g>
          
          {/* Ojos hipnotizados cerrados / relajados */}
          <g id="group-1" transform="matrix(0, 2.369476, -2.141482, 0, 150.247929, 290.859048)">
            <circle id="circle-1" cx="-67.91" cy="33.303" r="2.2" fill="#f4f4f5"/>
            <circle id="circle-2" cx="-67.859" cy="32.19" r="1.019" fill="#000000"/>
            <path id="path-1" d="M -69.893 30.003 C -71.83 29.334 -72.272 34.537 -71.043 36.562" stroke="#18181b" strokeWidth="1.2" strokeLinecap="round" fill="none"/>
          </g>
          
          {/* Aletas */}
          <path id="camo-aleta" d="M 99.09 153.521 C 112.09 148.521 121.804 131.199 126.804 141.199" strokeWidth="3" strokeLinecap="round" stroke="#1c1917" fill="none"/>
          <path id="path-2" d="M 86.361 170.394 C 99.361 165.394 126.789 155.112 125.203 142.63" strokeWidth="3" strokeLinecap="round" stroke="#1c1917" fill="none"/>
          </g>
        </motion.g>
        
        {/* Casco militar al lado / en su cabeza */}
        <g id="casco-grupo" transform="matrix(-0.183405, 0.097468, 0.077837, 0.190814, 120.62791, 69.155581)" style={{ transformOrigin: "-68.388px 28.512px" }}>
          <path id="casco-cuerpo" d="M -58.2 33 C -58.472 18.27 -77.743 18.379 -77.6 33 C -77.585 34.5 -58.172 34.5 -58.2 33 Z" fill="url(#camo-digital)" stroke="#1b2611" strokeWidth="0.5"/>
          <path id="casco-banda" d="M -77.2 27.5 C -72 25 -64 25 -58.6 27.5" stroke="#1c1917" strokeWidth="1.2" fill="none" opacity="0.8"/>
        </g>
        
        {/* Celular Gigante a la Derecha */}
        <g transform="matrix(0.19929, 0, 0, 0.171216, 99.643321, 5.81167)">
          {/* Cuerpo del Dispositivo */}
          <g id="group-3">
            <rect x="80" y="30" width="340" height="540" rx="40" fill="#0f172a"/>
            <rect x="92" y="42" width="316" height="516" rx="30" fill="#ffffff"/>
            <rect x="185" y="52" width="130" height="20" rx="10" fill="#0f172a"/>
          </g>
          
          {/* Contenido de la Pantalla */}
          <g id="contenido-pantalla" transform="matrix(1, 0, 0, 1, 92.000003, 72.000002)">
            
            {/* Título de la página */}
            <text x="158" y="40" fontFamily="sans-serif" fontSize="20" fontWeight="900" fill="#0f172a" textAnchor="middle" letterSpacing="0.5" transform="matrix(1, 0, 0, 1, 1.469486, 25.656913)">IGLÚ MEDITERRÁNEO</text>
            
            {/* Dibujo del Iglú Isométrico */}
            <g id="iglu-isometrico-brillos" transform="translate(48, 90)">
              {/* Sombra base */}
              <ellipse cx="110" cy="210" rx="110" ry="20" fill="#cbd5e1" opacity="0.5"/>
              
              {/* Paredes del Iglú */}
              <path d="M 20 190 L 60 110 L 110 80 L 110 220 L 50 220 Z" fill="#38bdf8" stroke="#0284c7" strokeWidth="2"/>
              <path d="M 110 80 L 160 110 L 200 190 L 170 220 L 110 220 Z" fill="#e0f2fe" stroke="#0284c7" strokeWidth="2"/>
              
              {/* Líneas isométricas de los bloques */}
              <line x1="60" y1="110" x2="110" y2="140" stroke="#0284c7" strokeWidth="2"/>
              <line x1="160" y1="110" x2="110" y2="140" stroke="#0284c7" strokeWidth="2"/>
              <line x1="110" y1="140" x2="110" y2="220" stroke="#0284c7" strokeWidth="2"/>
              <line x1="38" y1="145" x2="80" y2="175" stroke="#0284c7" strokeWidth="2"/>
              <line x1="182" y1="145" x2="138" y2="175" stroke="#0284c7" strokeWidth="2"/>
              
              {/* Entrada del Iglú */}
              <path d="M 75 220 L 75 170 L 110 150 L 145 170 L 145 220 Z" fill="#0369a1" stroke="#0284c7" strokeWidth="2"/>
              <path d="M 85 220 L 85 180 L 110 165 L 135 180 L 135 220 Z" fill="#0f172a"/>
              
              {/* Brillos metálicos */}
              <line x1="110" y1="80" x2="160" y2="110" stroke="#ffffff" strokeWidth="3" strokeLinecap="round"/>
              <line x1="160" y1="110" x2="200" y2="190" stroke="#ffffff" strokeWidth="3" strokeLinecap="round"/>
              <line x1="110" y1="140" x2="138" y2="175" stroke="#ffffff" strokeWidth="2" opacity="0.8"/>
              
              {/* Destellos animados (Estrellas caricaturescas de iglú de ensueño) */}
              <motion.path 
                d="M 160 60 Q 160 75, 175 75 Q 160 75, 160 90 Q 160 75, 145 75 Q 160 75, 160 60 Z" 
                fill="#fde047"
                style={{ originX: '160px', originY: '75px' }}
                animate={{
                  scale: [0.9, 1.25, 0.9],
                  opacity: [0.65, 1, 0.65]
                }}
                transition={{
                  repeat: Infinity,
                  duration: 2.2,
                  ease: "easeInOut"
                }}
              />
              <motion.circle 
                cx="160" cy="75" r="3" fill="#ffffff"
                animate={{ opacity: [0.4, 1, 0.4] }}
                transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
              />
              
              <motion.path 
                d="M 40 100 Q 40 110, 50 110 Q 40 110, 40 120 Q 40 110, 30 110 Q 40 110, 40 100 Z" 
                fill="#ffffff"
                style={{ originX: '40px', originY: '110px' }}
                animate={{
                  scale: [0.85, 1.2, 0.85],
                  opacity: [0.5, 0.9, 0.5]
                }}
                transition={{
                  repeat: Infinity,
                  duration: 2.8,
                  ease: "easeInOut",
                  delay: 0.5
                }}
              />
              
              <motion.path 
                d="M 190 130 Q 190 140, 200 140 Q 190 140, 190 150 Q 190 140, 180 140 Q 190 140, 190 130 Z" 
                fill="#fde047"
                style={{ originX: '190px', originY: '140px' }}
                animate={{
                  scale: [0.8, 1.3, 0.8],
                  opacity: [0.6, 1, 0.6]
                }}
                transition={{
                  repeat: Infinity,
                  duration: 1.9,
                  ease: "easeInOut",
                  delay: 0.2
                }}
              />
              
              <circle cx="70" cy="70" r="2" fill="#bae6fd"/>
              <circle cx="130" cy="50" r="3" fill="#ffffff" opacity="0.7"/>
              <circle cx="180" cy="90" r="2.5" fill="#fde047"/>
            </g>
            
            {/* Texto de la web inmobiliaria */}
            <text x="158" y="40" fontFamily="sans-serif" fontSize="14" fontWeight="900" fill="#2ca8f9" textAnchor="middle" letterSpacing="0.5" transform="matrix(1, 0, 0, 1, -0.080821, -15.408638)">Pingüilario Inmobiliario</text>
          </g>
          
          {/* Footer con el botón de Compra Impulsiva */}
          <g id="group-4" transform="matrix(1, 0, 0, 1, 92.000003, 430.000013)">
            <rect width="316" height="128" rx="30" fill="#ffffff"/>
            {/* Botón animado envuelto en contenedor con transformación estática */}
            <g id="group-5-wrapper" transform="translate(20, 42)">
              <motion.g 
                id="group-5"
                style={{ originX: '136px', originY: '25px' }}
                animate={{
                  scale: [1, 1.05, 1]
                }}
                transition={{
                  repeat: Infinity,
                  duration: 2,
                  ease: "easeInOut"
                }}
              >
                <rect width="272" height="50" rx="12" fill="#f8cb02" />
                <text x="136" y="31" fontFamily="sans-serif" fontSize="14" fontWeight="900" fill="#ffffff" textAnchor="middle" letterSpacing="1">OBTENLO YA!!!!</text>
              </motion.g>
            </g>
          </g>
        </g>
      </g>
    </svg>
  );
}
