'use client';

import { motion } from 'framer-motion';

export default function Scene13Anuncios() {
  return (
    <svg viewBox="0 0 200 120" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
      <defs>
        {/* Gradiente para el botón de Sigue con tu compra */}
        <radialGradient gradientUnits="userSpaceOnUse" cx="159.145" cy="39.462" r="136.148" id="gradient-3" gradientTransform="matrix(-0.021859, 0.323436, -0.856484, -0.078422, 196.422295, -8.916606)">
          <stop offset="0" stopColor="#5574da"/>
          <stop offset="1" stopColor="#0244a2"/>
        </radialGradient>

        {/* Gradiente de fondo caótico cian/índigo (Temática del Patrón Oscuro) */}
        <radialGradient id="colored-bg-grad-chaotic" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#06b6d4" stopOpacity="0.25"/>
          <stop offset="60%" stopColor="#1e1b4b" stopOpacity="0.15"/>
          <stop offset="100%" stopColor="#080711" stopOpacity="1"/>
        </radialGradient>
      </defs>

      {/* Fondo degradado caótico */}
      <rect width="200" height="120" fill="url(#colored-bg-grad-chaotic)" x="0" y="0" id="fondo-escena" />

      {/* Latido fucsia de fondo */}
      <motion.circle
        cx="100"
        cy="60"
        r="80"
        fill="url(#colored-bg-grad-chaotic)"
        animate={{
          scale: [0.9, 1.1, 0.9],
          opacity: [0.6, 1, 0.6]
        }}
        transition={{
          repeat: Infinity,
          duration: 4,
          ease: "easeInOut"
        }}
      />

      {/* Celular Gigante que cubre casi toda la altura, centrado horizontalmente */}
      <g id="dispositivo-zoom-contenedor" transform="matrix(0.22, 0, 0, 0.22, 45, -6)">
        
        {/* Carcasa Celular */}
        <g id="dispositivo">
          <rect x="80" y="30" width="340" height="540" rx="40" fill="#0f172a"/>
          <rect x="92" y="42" width="316" height="516" rx="30" fill="#cbd5e1"/>
          <rect x="185" y="52" width="130" height="20" rx="10" fill="#0f172a"/>
        </g>

        {/* Contenido de la Pantalla - Caos de Ventanas y Anuncios */}
        <g id="caos-ventanas" transform="translate(92, 72)">
          
          {/* Anuncio 1: ¡CÓDIGO ÚNICO! ¡PULSA AQUÍ! */}
          <g id="popup-codigo-unico-wrapper" transform="translate(15, 15)">
            <motion.g
              id="popup-codigo-unico"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ 
                scale: 1, 
                opacity: 0.85,
                x: [0, -1, 1, -1, 0]
              }}
              transition={{
                scale: { delay: 0.1, type: 'spring', stiffness: 120 },
                opacity: { delay: 0.1 },
                x: { repeat: Infinity, duration: 2, ease: "easeInOut", repeatDelay: 0.5 }
              }}
              style={{ transformOrigin: '143px 30px' }}
            >
              <g transform="matrix(0.993573, -0.131775, 0.097235, 0.993573, 0, 0)">
                <rect width="286" height="60" rx="10" fill="#5b21b6" stroke="#f59e0b" strokeWidth="2"/>
                <text x="143" y="35" fontFamily="sans-serif" fontSize="15" fontWeight="900" fill="#ffffff" textAnchor="middle" letterSpacing="0.5">¡CÓDIGO ÚNICO! ¡PULSA AQUÍ!</text>
              </g>
            </motion.g>
          </g>

          {/* Anuncio 2: ¡COMPRA YA! */}
          <g id="popup-compra-ya-wrapper" transform="translate(22.017, 102.155)">
            <motion.g
              id="popup-compra-ya"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ 
                scale: 1, 
                opacity: 0.85,
                y: [0, -1.5, 0, 1.5, 0]
              }}
              transition={{
                scale: { delay: 0.3, type: 'spring', stiffness: 100 },
                opacity: { delay: 0.3 },
                y: { repeat: Infinity, duration: 1.8, ease: "easeInOut" }
              }}
              style={{ transformOrigin: '65px 35px' }}
            >
              <g transform="matrix(0.975167, 0.257822, -0.190244, 0.975167, 0, 0)">
                <rect width="130" height="70" fill="#b91c1c" rx="15.8" ry="15.8"/>
                <text x="65" y="42" fontFamily="sans-serif" fontSize="15" fontWeight="900" fill="#fde047" textAnchor="middle">¡COMPRA YA!</text>
              </g>
            </motion.g>
          </g>

          {/* Anuncio 3: SOLO HOY APRESÚRATE */}
          <g id="popup-solo-hoy-wrapper" transform="translate(244.216, 131.578)">
            <motion.g
              id="popup-solo-hoy"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ 
                scale: 1, 
                opacity: 0.85,
                rotate: [0, 2, -2, 0]
              }}
              transition={{
                scale: { delay: 0.5, type: 'spring', stiffness: 110 },
                opacity: { delay: 0.5 },
                rotate: { repeat: Infinity, duration: 2.2, ease: "easeInOut" }
              }}
              style={{ transformOrigin: '0px 0px' }}
            >
              <g transform="matrix(0.986488, 0.470699, -0.400603, 1.137813, 0, 0)">
                <circle cx="0" cy="0" r="40" fill="#f97316" stroke="#c2410c" strokeWidth="2"/>
                <text x="0" y="-8" fontFamily="sans-serif" fontSize="13" fontWeight="900" fill="#ffffff" textAnchor="middle">SOLO HOY</text>
                <text x="0" y="10" fontFamily="sans-serif" fontSize="12" fontWeight="900" fill="#ffffff" textAnchor="middle">APRESÚRATE</text>
              </g>
            </motion.g>
          </g>

          {/* Anuncio 4: Botón Central Disfrazado (SIGUE CON TU COMPRA) */}
          <g id="popup-sigue-compra-wrapper" transform="translate(7, 185)">
            <motion.g
              id="popup-sigue-compra"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.7, type: 'spring', stiffness: 80 }}
            >
              <rect x="20" y="17" width="262" height="62" rx="4" fill="#0f172a" opacity="0.3"/>
              <rect x="15" y="12" width="262" height="62" stroke="#000000" strokeWidth="2" fill="url(#gradient-3)"/>
              <text x="146" y="48" fill="#2ca8f9" fontFamily="sans-serif" fontSize="18" fontWeight="900" letterSpacing="0.5" textAnchor="middle">SIGUE CON TU COMPRA</text>
            </motion.g>
          </g>

          {/* Anuncio 5: SUSCRÍBITE AQUÍ! */}
          <g id="popup-suscribete-wrapper" transform="translate(94.296, 330.225)">
            <motion.g
              id="popup-suscribete"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ 
                scale: 1, 
                opacity: 0.85,
                y: [0, 2, -2, 0]
              }}
              transition={{
                scale: { delay: 0.9, type: 'spring', stiffness: 100 },
                opacity: { delay: 0.9 },
                y: { repeat: Infinity, duration: 2.5, ease: "easeInOut" }
              }}
              style={{ transformOrigin: '0px 0px' }}
            >
              <circle cx="0" cy="0" r="45" fill="#a3e635" stroke="#4d7c0f" strokeWidth="2"/>
              <text x="0" y="-8" fontFamily="sans-serif" fontSize="13" fontWeight="900" fill="#0f172a" textAnchor="middle">SUSCRÍBITE</text>
              <text x="0" y="10" fontFamily="sans-serif" fontSize="13" fontWeight="900" fill="#0f172a" textAnchor="middle">AQUÍ!</text>
            </motion.g>
          </g>

          {/* Anuncio 6: ¡RELAJATE! */}
          <g id="popup-relajate-wrapper" transform="translate(221.755, 329.605)">
            <motion.g
              id="popup-relajate"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ 
                scale: 1, 
                opacity: 0.85,
                rotate: [0, -3, 3, 0]
              }}
              transition={{
                scale: { delay: 1.1, type: 'spring', stiffness: 120 },
                opacity: { delay: 1.1 },
                rotate: { repeat: Infinity, duration: 2, ease: "easeInOut", delay: 0.5 }
              }}
              style={{ transformOrigin: '0px 0px' }}
            >
              <path d="M 0 -40 L 12 -15 L 35 -25 L 20 -3 L 42 8 L 12 12 L 20 40 L -4 15 L -28 30 L -16 4 L -40 -12 L -12 -12 Z" fill="#f472b6" stroke="#db2777" strokeWidth="2"/>
              <text x="0" y="4" fontFamily="sans-serif" fontSize="12" fontWeight="900" fill="#000000" textAnchor="middle">¡RELAJATE!</text>
            </motion.g>
          </g>

        </g>

        {/* Footer Falso: Descargar ERROR_FIX.EXE */}
        <g id="footer-falso-wrapper" transform="translate(92, 470)">
          <motion.g
            id="footer-falso"
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 0.9 }}
            transition={{ delay: 1.3, type: 'spring', stiffness: 90 }}
          >
            <rect width="316" height="88" fill="#f87171" opacity="0.6" rx="37.893" ry="37.893"/>
            <rect x="20" y="19" width="272" height="50" rx="12" fill="#111827"/>
            <text x="156" y="50" fontFamily="sans-serif" fontSize="15" fontWeight="900" fill="#ef4444" textAnchor="middle">DESCARGAR ERROR_FIX.EXE</text>
          </motion.g>
        </g>

      </g>
    </svg>
  );
}
