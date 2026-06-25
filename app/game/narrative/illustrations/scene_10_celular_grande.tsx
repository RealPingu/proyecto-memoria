'use client';

import { motion } from 'framer-motion';

export default function Scene10CelularGrande() {
  // Rain of money items inside/outside the screen
  const moneyItems = Array.from({ length: 18 }).map((_, i) => {
    const isCoin = i % 2 === 0;
    const startX = (i * 25) % 460 + 20;
    const duration = 3.5 + (i % 4) * 0.9;
    const delay = -(i * 0.35);
    const scale = 0.5 + (i % 4) * 0.08;
    const rotation = (i * 60) % 360;
    return { id: i, isCoin, startX, duration, delay, scale, rotation };
  });

  return (
    <svg viewBox="-10.3677 20 430.3677 590.9726" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
      <defs>
        {/* Patrón digital militar de Camo */}
        <pattern id="camo-digital" width="20" height="20" patternUnits="userSpaceOnUse">
          <rect width="20" height="20" fill="#3f4e3f" id="rect-bg-dig"/>
          <rect x="0" y="0" width="8" height="6" fill="#2d3a2d" id="rect-dark-dig"/>
          <rect x="10" y="4" width="6" height="8" fill="#546554" id="rect-medium-dig"/>
          <rect x="2" y="10" width="8" height="6" fill="#7ba077" id="rect-light-dig"/>
          <rect x="12" y="12" width="6" height="6" fill="#202a20" id="rect-black-dig"/>
        </pattern>

        {/* Gradiente para brillo de pantalla */}
        <linearGradient id="brillo-pantalla" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0" stopColor="#38bdf8" stopOpacity="0.4"/>
          <stop offset="0.5" stopColor="#bae6fd" stopOpacity="0.1"/>
          <stop offset="1" stopColor="#22c55e" stopOpacity="0.15"/>
        </linearGradient>

        {/* Gradiente oro para monedas */}
        <linearGradient id="oro-grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#fef08a" />
          <stop offset="40%" stopColor="#eab308" />
          <stop offset="100%" stopColor="#ca8a04" />
        </linearGradient>

        {/* Resplandor radial detrás del botón de pagar */}
        <radialGradient id="boton-glow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#22c55e" stopOpacity="0.5" />
          <stop offset="100%" stopColor="#22c55e" stopOpacity="0" />
        </radialGradient>

        {/* Máscara de brillo metálico para el botón de pago */}
        <linearGradient id="sweep-grad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0" />
          <stop offset="30%" stopColor="#ffffff" stopOpacity="0" />
          <stop offset="50%" stopColor="#ffffff" stopOpacity="0.6" />
          <stop offset="70%" stopColor="#ffffff" stopOpacity="0" />
          <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
        </linearGradient>
      </defs>

      {/* Fondo de la escena */}
      <rect width="100%" height="100%" fill="#090d16" id="fondo-escena"/>

      {/* Outer transform group as in user's SVG */}
      <g transform="matrix(0.9999999999999999, 0, 0, 0.9999999999999999, 0, -5.684341886080802e-14)">
        {/* Lluvia de Dólares pingüinales cayendo */}
        <g id="lluvia-dinero-container">
          {moneyItems.map((item) => (
            <motion.g
              key={item.id}
              id={item.isCoin ? `moneda-${item.id}` : `billete-${item.id}`}
              initial={{ x: item.startX, y: -40, rotate: item.rotation, scale: item.scale, opacity: 0 }}
              animate={{
                y: [-40, 640],
                x: [item.startX, item.startX + ((item.id % 2 === 0) ? 20 : -20), item.startX],
                rotate: [item.rotation, item.rotation + 360],
                opacity: [0, 0.85, 0.85, 0]
              }}
              transition={{
                repeat: Infinity,
                duration: item.duration,
                delay: item.delay,
                ease: "linear"
              }}
            >
              {item.isCoin ? (
                <g>
                  <circle cx="0" cy="0" r="14" fill="url(#oro-grad)" stroke="#ca8a04" strokeWidth="1" />
                  <circle cx="0" cy="0" r="10.5" fill="none" stroke="#fef08a" strokeWidth="0.75" />
                  <text x="0" y="4.5" fontFamily="monospace" fontSize="13" fontWeight="900" fill="#854d0e" textAnchor="middle">$</text>
                </g>
              ) : (
                <g>
                  <rect x="-20" y="-12" width="40" height="24" rx="3" fill="#22c55e" stroke="#15803d" strokeWidth="1" />
                  <rect x="-16" y="-9" width="32" height="18" rx="2" fill="none" stroke="#4ade80" strokeWidth="0.75" opacity="0.6" />
                  <circle cx="0" cy="0" r="6" fill="#16a34a" />
                  <text x="0" y="4" fontFamily="monospace" fontSize="11" fontWeight="900" fill="#ffffff" textAnchor="middle">$</text>
                </g>
              )}
            </motion.g>
          ))}
        </g>

        {/* EL CELULAR EN GRANDE (Flotando suavemente en el centro) */}
        <motion.g 
          id="dispositivo-completo"
          animate={{
            y: [-6, 6, -6]
          }}
          transition={{
            repeat: Infinity,
            duration: 5,
            ease: "easeInOut"
          }}
        >
          {/* Carcasa del Celular */}
          <g id="dispositivo">
            <rect x="80" y="20" width="340" height="560" rx="40" fill="#0f172a"/>
            <rect x="92" y="32" width="316" height="536" rx="30" fill="#ffffff"/>
            {/* Notch superior */}
            <rect x="185" y="42" width="130" height="20" rx="10" fill="#0f172a"/>
            {/* Brillo de pantalla */}
            <rect x="92" y="32" width="316" height="536" rx="30" fill="url(#brillo-pantalla)" pointerEvents="none" opacity="0.65"/>
          </g>

          {/* INTERFAZ DE PRODUCTOS */}
          <g id="productos-grid" transform="translate(110, 90)">
            <text x="70.756" y="-1.947" fontFamily="sans-serif" fontSize="13" fontWeight="900" fill="#64748b" letterSpacing="1.5" style={{ whiteSpace: 'pre', fontSize: '13px' }}>RECOMENDADOS</text>

            {/* Producto 1: Casco Militar */}
            <g id="producto-1" transform="translate(0, 20)">
              <rect width="135" height="135" rx="16" fill="#f8fafc" stroke="#e2e8f0" strokeWidth="1"/>
              <circle cx="67" cy="55" r="25" fill="#dcfce7"/>
              <path d="M 52,58 C 52,43 82,43 82,58 Z" fill="#3f4e3f" stroke="#1b2611" strokeWidth="0.75"/>
              <path d="M 55,58 L 67,65 L 79,58" stroke="#1c1917" strokeWidth="1.2" fill="none"/>
              <rect x="15" y="95" width="105" height="8" rx="2" fill="#cbd5e1"/>
              <text x="15" y="120" fontFamily="sans-serif" fontSize="12" fontWeight="bold" fill="#0f172a" style={{ whiteSpace: 'pre' }}>$19.99</text>
            </g>

            {/* Producto 2: Iglú Dorado */}
            <g id="producto-2" transform="translate(145, 20)">
              <rect width="135" height="135" rx="16" fill="#f8fafc" stroke="#e2e8f0" strokeWidth="1"/>
              <circle cx="67" cy="55" r="25" fill="#fef9c3"/>
              <path d="M 49,58 C 49,42 85,42 85,58 Z" fill="#eab308"/>
              <path d="M 52,50 C 60,46 74,46 82,50 M 57,58 L 57,50 M 67,58 L 67,46 M 77,58 L 77,50" stroke="#ca8a04" strokeWidth="0.8" fill="none"/>
              <path d="M 62,58 L 62,52 C 62,50 72,50 72,52 L 72,58 Z" fill="#78350f"/>
              <rect x="15" y="95" width="105" height="8" rx="2" fill="#cbd5e1"/>
              <text x="15" y="120" fontFamily="sans-serif" fontSize="12" fontWeight="bold" fill="#0f172a" style={{ whiteSpace: 'pre' }}>$299.99</text>
            </g>

            {/* Producto 3: Sardina */}
            <g id="producto-3" transform="translate(0, 175)">
              <rect width="135" height="135" rx="16" fill="#f8fafc" stroke="#e2e8f0" strokeWidth="1"/>
              <circle cx="67" cy="55" r="25" fill="#e0f2fe"/>
              <path d="M 48,55 C 57,49 70,49 76,55 C 70,61 57,61 48,55 Z" fill="#0284c7"/>
              <polygon points="76,55 85,50 83,55 85,60" fill="#0284c7"/>
              <circle cx="53" cy="54" r="1.2" fill="#ffffff"/>
              <rect x="15" y="95" width="105" height="8" rx="2" fill="#cbd5e1"/>
              <text x="15" y="120" fontFamily="sans-serif" fontSize="12" fontWeight="bold" fill="#0f172a" style={{ whiteSpace: 'pre' }}>$4.99</text>
            </g>

            {/* Producto 4: Visor Seleccionado */}
            <g id="producto-4" transform="translate(145, 175)">
              <rect width="135" height="135" rx="16" fill="#f8fafc" stroke="#22c55e" strokeWidth="2.5"/>
              <circle cx="67" cy="55" r="25" fill="#f3e8ff"/>
              <path d="M 46,55 H 88" stroke="#1e293b" strokeWidth="2.5"/>
              <rect x="52" y="49" width="30" height="12" rx="3.5" fill="#22c55e" stroke="#16a34a" strokeWidth="1.2"/>
              <line x1="56" y1="52" x2="61" y2="57" stroke="#ffffff" strokeWidth="1.2"/>
              <rect x="15" y="95" width="105" height="8" rx="2" fill="#cbd5e1"/>
              <g transform="translate(112, 10)">
                <circle r="9.5" fill="#22c55e"/>
                <path d="M -4.5,0 L -1.5,3 L 4.5,-3" fill="none" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </g>
              <text x="15" y="120" fontFamily="sans-serif" fontSize="12" fontWeight="bold" fill="#22c55e" style={{ whiteSpace: 'pre' }}>$49.99</text>
            </g>
          </g>

          {/* Footer Checkout */}
          <g id="checkout-footer" transform="translate(92, 420)">
            <rect width="316" height="128" fill="#ffffff"/>
            <line x1="20" y1="0" x2="296" y2="0" stroke="#f1f5f9" strokeWidth="2"/>
            <text x="24" y="27" fontFamily="sans-serif" fontSize="12" fontWeight="bold" fill="#64748b" style={{ whiteSpace: 'pre' }}>TOTAL PINGÜICARRO</text>
            <text x="292" y="30" fontFamily="sans-serif" fontSize="22" fontWeight="900" fill="#0f172a" text-anchor="end" style={{ whiteSpace: 'pre' }}>$49.99</text>

            {/* Botón Aletea Para Pagar */}
            <g id="boton-compra-grupo" transform="translate(20, 50)">
              <motion.rect
                width="272" height="50" rx="12" fill="url(#boton-glow)"
                style={{ originX: "136px", originY: "25px" }}
                animate={{
                  scale: [1, 1.25, 1],
                  opacity: [0.3, 0.7, 0.3]
                }}
                transition={{ repeat: Infinity, duration: 2.2, ease: "easeInOut" }}
              />
              <motion.g
                id="boton-simple-aletea"
                style={{ originX: "136px", originY: "25px" }}
                animate={{ scale: [1, 1.04, 1] }}
                transition={{ repeat: Infinity, duration: 2.2, ease: "easeInOut" }}
              >
                <rect width="272" height="50" rx="12" fill="#22c55e"/>
                <g style={{ clipPath: "inset(0px 0px 0px 0px round 12px)" }}>
                  <motion.rect
                    width="180" height="120" fill="url(#sweep-grad)" y="-35"
                    animate={{ x: [-200, 350] }}
                    transition={{ repeat: Infinity, repeatDelay: 2.5, duration: 1.5, ease: "easeInOut" }}
                  />
                </g>
                <text x="136" y="31" fontFamily="sans-serif" fontSize="15" fontWeight="900" fill="#ffffff" textAnchor="middle" letterSpacing="1.2" style={{ whiteSpace: 'pre' }}>
                  ALETEA PARA PAGAR
                </text>
              </motion.g>
            </g>
          </g>
        </motion.g>

        {/* CAMO PINGÜINO PEAKING (Pequeño y asomándose en el frente inferior izquierdo, hipnotizado por el celular) */}
        <g id="camo-peaking" transform="matrix(1, 0, 0, 1, -10, 430.000013)">
          <ellipse id="cuerpo" cx="30" cy="120" rx="31.521" ry="53.016" fill="url(#camo-digital)" stroke="#4f5d4e" strokeWidth="0.8" transform="matrix(0.965926, -0.258819, 0.258819, 0.965926, -16.235235, 13.458265)" style={{}}/>
          <ellipse id="vientre" cx="48" cy="120" rx="22.406" ry="34.493" fill="#d8d8d0" stroke="#1e293b" strokeWidth="1" transform="matrix(0.965926, -0.258819, 0.258819, 0.965926, -22.361808, 18.437919)" style={{}}/>
          <circle id="cabeza" cx="62" cy="55" r="34" fill="url(#camo-digital)" stroke="#4f5d4e" strokeWidth="0.8"/>
          <g id="ojo-grupo">
            <circle id="ojo" cx="74" cy="48" r="9" fill="#ffffff" stroke="#0f172a" strokeWidth="1.2"/>
            <motion.circle 
              id="pupila" 
              cx="76" cy="48" r="5" fill="#000000"
              animate={{
                cx: [76, 78, 76, 74, 76],
                cy: [48, 46, 48, 50, 48]
              }}
              transition={{ repeat: Infinity, duration: 4.8, ease: "easeInOut" }}
            />
            <circle id="ojo-brillo" cx="73.5" cy="44.5" r="2" fill="#ffffff"/>
          </g>
          <path id="ceja" d="M 60 33 C 59.957 38.572 85.633 27.624 84.624 40.358" stroke="#1c1917" strokeWidth="2.2" fill="none" strokeLinecap="round"/>
          <polygon id="pico" points="91,48 114,53 93,62" fill="#f59e0b" stroke="#d97706" strokeWidth="0.8"/>
          <motion.path 
            id="aleta" 
            d="M 55,90 C 82,90 108,80 118,68" 
            strokeWidth="6.5" strokeLinecap="round" stroke="#1c1917" fill="none"
            animate={{
              rotate: [0, 6, -3, 0],
              x: [0, 4, -2, 0]
            }}
            transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
            style={{ transformOrigin: "55px 90px" }}
          />
        </g>
      </g>
    </svg>
  );
}
