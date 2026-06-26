'use client';

import { motion } from 'framer-motion';

export default function Scene19CelularReference() {
  return (
    <svg
      viewBox="0 0 200 120"
      className="w-full h-full select-none"
      xmlns="http://www.w3.org/2000/svg"
      id="svg-escena-19"
    >
      <defs>
        {/* Gradiente de fondo caótico cian/índigo (Temática del Patrón Oscuro) */}
        <radialGradient id="colored-bg-grad-chaotic" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#06b6d4" stopOpacity="0.25"/>
          <stop offset="60%" stopColor="#1e1b4b" stopOpacity="0.15"/>
          <stop offset="100%" stopColor="#080711" stopOpacity="1"/>
        </radialGradient>

        <linearGradient id="grad-btn-premium-19" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#22c55e" id="stop-btn-p1-19"/>
          <stop offset="100%" stopColor="#15803d" id="stop-btn-p2-19"/>
        </linearGradient>

        <linearGradient id="grad-pantalla-19" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#e2e8f0" id="stop-pan-1-19"/>
          <stop offset="100%" stopColor="#cbd5e1" id="stop-pan-2-19"/>
        </linearGradient>
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

      {/* Celular gigante centrado */}
      <g id="dispositivo-checkout-19" transform="matrix(0.19, 0, 0, 0.19, 56.3, 6.8)">
        
        {/* Carcasa */}
        <g id="carcasa-celular-19">
          <rect id="marco-externo-19" x="20" y="20" width="460" height="560" rx="40" fill="#0f172a"/>
          <rect id="marco-interno-19" x="32" y="32" width="436" height="536" rx="32" fill="url(#grad-pantalla-19)"/>
          <rect id="isla-dinamica-19" x="185" y="42" width="130" height="16" rx="8" fill="#0f172a"/>
        </g>

        {/* Pantalla del celular - Interfaz de Selección de Plan */}
        <g id="interfaz-planes-19" transform="translate(32, 70)">
          <text id="titulo-planes-19" x="218" y="25" fontFamily="sans-serif" fontSize="18" fontWeight="900" fill="#0f172a" textAnchor="middle" letterSpacing="0.5">SELECCIONA TU PLAN DE PAGO</text>
          <text id="subtitulo-planes-19" x="218" y="42" fontFamily="sans-serif" fontSize="11" fontWeight="bold" fill="#475569" textAnchor="middle">¡Último paso para obtener tu Iglú Mediterráneo!</text>

          {/* Columna 1: PLAN PREMIUM (Verde trampa - Destacada) */}
          <g id="columna-verde-trampa-19" transform="translate(15, 65)">
            {/* El borde pulsa para llamar la atención del usuario */}
            <motion.rect
              id="bg-col1-19"
              width="130" height="340" rx="12"
              fill="#f0fdf4" stroke="#22c55e" strokeWidth="3"
              animate={{ strokeWidth: [3, 4.5, 3] }}
              transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
            />
            <path id="cinta-popular-19" d="M 10 0 L 120 0 L 110 18 L 20 18 Z" fill="#22c55e"/>
            <text id="txt-popular-19" x="65" y="12" fontFamily="sans-serif" fontSize="8" fontWeight="900" fill="#ffffff" textAnchor="middle">¡MÁS POPULAR!</text>
            
            <text id="txt-premium-19" x="65" y="38" fontFamily="sans-serif" fontSize="11" fontWeight="900" fill="#15803d" textAnchor="middle">PLAN PREMIUM</text>
            <line id="divisor-premium-19" x1="15" y1="46" x2="115" y2="46" stroke="#bbf7d0" strokeWidth="1"/>
            
            <text id="txt-premium-tasa-lbl-19" x="65" y="65" fontFamily="sans-serif" fontSize="8" fontWeight="bold" fill="#166534" textAnchor="middle">TASA MÁS BAJA</text>
            
            {/* El porcentaje grande pulsa en tamaño sutilmente */}
            <motion.text
              id="txt-premium-tna-19"
              x="65" y="88" fontFamily="Impact, sans-serif" fontSize="22" fill="#16a34a" textAnchor="middle"
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut" }}
              style={{ transformOrigin: "65px 80px" }}
            >
              3.5% <tspan fontSize="10" fontFamily="sans-serif" fontWeight="bold">TNA</tspan>
            </motion.text>
            
            <rect id="badge-cuotas-premium-19" x="15" y="100" width="100" height="35" rx="6" fill="#dcfce7"/>
            <text id="txt-cuotas-lbl-19" x="65" y="114" fontFamily="sans-serif" fontSize="9" fontWeight="900" fill="#14532d" textAnchor="middle">CUOTAS CÓMODAS</text>
            <text id="txt-cuotas-premium-19" x="65" y="128" fontFamily="sans-serif" fontSize="11" fontWeight="900" fill="#16a34a" textAnchor="middle">240 Meses</text>
            
            {/* Tasa real TEA alarmante en rojo */}
            <motion.text
              id="txt-premium-tea-19"
              x="65" y="155" fontFamily="sans-serif" fontSize="8" fill="#dc2626" textAnchor="middle" fontWeight="bold"
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
            >
              TEA: 45.2% (Real)
            </motion.text>
            
            <text id="txt-premium-det-1-19" x="65" y="193" fontFamily="sans-serif" fontSize="9" fontWeight="bold" fill="#166534" textAnchor="middle">Pista de Hielo Incluida</text>
            <text id="txt-premium-det-2-19" x="65" y="215" fontFamily="sans-serif" fontSize="8" fontWeight="bold" fill="#166534" textAnchor="middle">Foto Autografiada</text>

            <g id="btn-premium-19" transform="translate(12, 285)">
              <motion.rect
                id="btn-premium-rect-19"
                width="106" height="36" rx="8"
                fill="url(#grad-btn-premium-19)" stroke="#15803d" strokeWidth="1"
                animate={{ scale: [1, 1.03, 1] }}
                transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                style={{ transformOrigin: "53px 18px" }}
              />
              <text id="btn-premium-txt-19" x="53" y="22" fontFamily="sans-serif" fontSize="10" fontWeight="900" fill="#ffffff" textAnchor="middle">¡LO QUIERO YA!</text>
            </g>
          </g>

          {/* Columna 2: PLAN ESTANDAR (Gris neutro - La correcta pero no destacada) */}
          <g id="columna-gris-estandar-19" transform="translate(153, 65)">
            <rect id="bg-col2-19" width="130" height="340" rx="12" fill="#f1f5f9" stroke="#94a3b8" strokeWidth="1"/>
            <text id="txt-estandar-lbl-19" x="65" y="15" fontFamily="sans-serif" fontSize="8" fontWeight="bold" fill="#64748b" textAnchor="middle">RECOMENDADO</text>
            <text id="txt-estandar-titulo-19" x="65" y="38" fontFamily="sans-serif" fontSize="11" fontWeight="bold" fill="#334155" textAnchor="middle">PLAN ESTANDAR</text>
            <line id="divisor-estandar-19" x1="15" y1="46" x2="115" y2="46" stroke="#cbd5e1" strokeWidth="1"/>
            
            <text id="txt-estandar-tasa-lbl-19" x="65" y="65" fontFamily="sans-serif" fontSize="8" fill="#64748b" textAnchor="middle">Tasa Estándar</text>
            <text id="txt-estandar-tna-19" x="65" y="88" fontFamily="Impact, sans-serif" fontSize="20" fill="#475569" textAnchor="middle">8.9% <tspan fontSize="10" fontFamily="sans-serif" fontWeight="bold">TNA</tspan></text>
            
            <rect id="badge-cuotas-estandar-19" x="15" y="100" width="100" height="35" rx="6" fill="#e2e8f0"/>
            <text id="txt-plazo-lbl-19" x="65" y="114" fontFamily="sans-serif" fontSize="9" fontWeight="bold" fill="#475569" textAnchor="middle">PLAZO CORTO</text>
            <text id="txt-cuotas-estandar-19" x="65" y="128" fontFamily="sans-serif" fontSize="11" fontWeight="bold" fill="#334155" textAnchor="middle">36 Meses</text>
            
            <text id="txt-estandar-tea-19" x="65" y="155" fontFamily="sans-serif" fontSize="8" fill="#15803d" textAnchor="middle" fontWeight="bold">TEA: 9.5% (Real)</text>
            <text id="txt-estandar-det-1-19" x="65" y="193" fontFamily="sans-serif" fontSize="9" fontWeight="bold" fill="#475569" textAnchor="middle">Seguro Incluido</text>
            <text id="txt-estandar-det-2-19" x="65" y="215" fontFamily="sans-serif" fontSize="8.5" fill="#475569" textAnchor="middle">Sin Gastos Extras</text>

            <g id="btn-estandar-19" transform="translate(12, 285)">
              <rect id="btn-estandar-rect-19" width="106" height="36" rx="8" fill="#64748b"/>
              <text id="btn-estandar-txt-19" x="53" y="22" fontFamily="sans-serif" fontSize="10" fontWeight="bold" fill="#ffffff" textAnchor="middle">SELECCIONAR</text>
            </g>
          </g>

          {/* Columna 3: PLAN NORMAL (Gris claro - El señuelo) */}
          <g id="columna-gris-normal-19" transform="translate(291, 65)">
            <rect id="bg-col3-19" width="130" height="340" rx="12" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="1"/>
            <text id="txt-normal-lbl-19" x="65" y="15" fontFamily="sans-serif" fontSize="8" fill="#94a3b8" textAnchor="middle">OPCIÓN RÁPIDA</text>
            <text id="txt-normal-titulo-19" x="65" y="38" fontFamily="sans-serif" fontSize="11" fontWeight="bold" fill="#64748b" textAnchor="middle">PLAN NORMAL</text>
            <line id="divisor-normal-19" x1="15" y1="46" x2="115" y2="46" stroke="#e2e8f0" strokeWidth="1"/>
            
            <text id="txt-normal-tasa-lbl-19" x="65" y="65" fontFamily="sans-serif" fontSize="8" fill="#94a3b8" textAnchor="middle">Tasa Especial</text>
            <text id="txt-normal-tna-19" x="65" y="88" fontFamily="Impact, sans-serif" fontSize="20" fill="#94a3b8" textAnchor="middle">2.9% <tspan fontSize="10" fontFamily="sans-serif" fontWeight="bold">TNA</tspan></text>
            
            <rect id="badge-cuotas-normal-19" x="15" y="100" width="100" height="35" rx="6" fill="#f1f5f9"/>
            <text id="txt-financiacion-lbl-19" x="65" y="114" fontFamily="sans-serif" fontSize="8" fill="#94a3b8" textAnchor="middle">FINANCIACIÓN</text>
            <text id="txt-cuotas-normal-19" x="65" y="128" fontFamily="sans-serif" fontSize="11" fontWeight="bold" fill="#64748b" textAnchor="middle">360 Meses</text>
            
            <text id="txt-normal-tea-19" x="65" y="155" fontFamily="sans-serif" fontSize="8" fill="#b91c1c" textAnchor="middle" fontWeight="bold">TEA: 78.4% (Real)</text>
            <text id="txt-normal-det-1-19" x="65" y="193" fontFamily="sans-serif" fontSize="9" fill="#cbd5e1" textAnchor="middle">Sin Seguro</text>

            <g id="btn-normal-19" transform="translate(12, 285)">
              <rect id="btn-normal-rect-19" width="106" height="36" rx="8" fill="#cbd5e1"/>
              <text id="btn-normal-txt-19" x="53" y="22" fontFamily="sans-serif" fontSize="10" fontWeight="bold" fill="#94a3b8" textAnchor="middle">SELECCIONAR</text>
            </g>
          </g>
        </g>

        {/* Footer legal */}
        <g id="footer-bloqueado-19" transform="translate(32, 512)">
          <rect id="footer-bg-19" width="436" height="56" fill="#1e293b" opacity="0.1" rx="0"/>
          <text id="footer-txt-19" x="218" y="32" fontFamily="sans-serif" fontSize="8.5" fontWeight="bold" fill="#475569" textAnchor="middle">* Los precios de referencia mostrados no garantizan la estabilidad térmica del iglú.</text>
        </g>
      </g>
    </svg>
  );
}
