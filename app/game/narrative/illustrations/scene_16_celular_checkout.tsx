'use client';

import { motion } from 'framer-motion';

export default function Scene16CelularCheckout() {
  return (
    <svg viewBox="0 0 200 120" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
      <defs>
        {/* Gradiente de fondo: azul/índigo frío — sensación burocrática */}
        <radialGradient id="bg-checkout-15" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#0ea5e9" stopOpacity="0.18"/>
          <stop offset="60%" stopColor="#1e1b4b" stopOpacity="0.12"/>
          <stop offset="100%" stopColor="#030712" stopOpacity="1"/>
        </radialGradient>

        {/* Gradiente botón "Siguiente" */}
        <radialGradient id="grad-btn-siguiente" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#5574da"/>
          <stop offset="100%" stopColor="#0244a2"/>
        </radialGradient>

        {/* Gradiente suave de la pantalla */}
        <linearGradient id="grad-pantalla-15" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#e2e8f0"/>
          <stop offset="100%" stopColor="#cbd5e1"/>
        </linearGradient>
      </defs>

      {/* Fondo */}
      <rect width="200" height="120" fill="url(#bg-checkout-15)"/>
      <motion.rect
        width="200" height="120"
        fill="url(#bg-checkout-15)"
        animate={{ opacity: [0.6, 1, 0.6] }}
        transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}
      />

      {/* Celular gigante centrado — misma estructura que Escena 13 */}
      <g id="dispositivo-checkout" transform="matrix(0.22, 0, 0, 0.22, 45, -6)">

        {/* Carcasa */}
        <g id="carcasa-celular-15">
          <rect x="80" y="30" width="340" height="540" rx="40" fill="#0f172a"/>
          <rect x="92" y="42" width="316" height="516" rx="30" fill="url(#grad-pantalla-15)"/>
          <rect x="185" y="52" width="130" height="20" rx="10" fill="#0f172a"/>
        </g>

        {/* PANTALLA: Contenido checkout */}
        <g id="pantalla-checkout-15" transform="translate(100, 80)">

          {/* Título */}
          <text x="150" y="20" fontFamily="sans-serif" fontSize="17" fontWeight="900"
            fill="#0f172a" textAnchor="middle">CONFIRMA TUS AÑADIDOS</text>
          <line x1="10" y1="32" x2="290" y2="32" stroke="#f59e0b" strokeWidth="2.5"/>

          {/* Paso 1 de N */}
          <text x="150" y="55" fontFamily="sans-serif" fontSize="10" fill="#64748b" textAnchor="middle">
            Paso 4 de 6 — No canceles o perderás tu lugar
          </text>

          {/* Sección: Términos y condiciones (letra chiquita) */}
          <g id="seccion-terminos" transform="translate(10, 70)">
            <text x="0" y="0" fontFamily="sans-serif" fontSize="10" fontWeight="700" fill="#94a3b8">
              Términos y Condiciones
            </text>
            <rect x="0" y="8" width="280" height="100" rx="4" fill="rgb(255,241,241)" stroke="#d1d5db" strokeWidth="1"/>
            <text fontFamily="sans-serif" fontSize="7.5" fill="#9ca3af">
              <tspan x="8" dy="20">1. El Iglú Mediterráneo es una construcción conceptual no sujeta</tspan>
              <tspan x="8" dy="11">   a leyes físicas ni térmicas conocidas.</tspan>
              <tspan x="8" dy="11">2. El vendedor no se responsabiliza de daños por derretimiento</tspan>
              <tspan x="8" dy="11">   fortuito en climas templados o superiores a 0°C.</tspan>
              <tspan x="8" dy="11">3. Usted cede los derechos de imagen de sus pingüinos imaginarios.</tspan>
              <tspan x="8" dy="11">4. Cualquier reclamación sobre arenques inexistentes será derivada</tspan>
              <tspan x="8" dy="11">   al Departamento de Ficción Marítima.</tspan>
            </text>
          </g>

          {/* ─── SECCIÓN CRÍTICA: Seguro Anti-Bombardeo (PRE-MARCADO) ─── */}
          <g id="seccion-seguro-drip" transform="translate(10, 190)">
            <text x="0" y="0" fontFamily="sans-serif" fontSize="10" fontWeight="700" fill="#0f172a">
              Servicios Adicionales
            </text>

            {/* Caja del seguro — borde sutil para no destacar */}
            <rect x="0" y="8" width="280" height="90" rx="4"
              fill="#9ca3af" stroke="#6b7280" strokeWidth="0.8"/>

            {/* Checkbox PRE-MARCADO — pulsa para llamar atención al jugador */}
            <motion.rect
              x="10" y="28" width="18" height="18" rx="3"
              fill="#ddd6fe"
              animate={{ fill: ["#ddd6fe", "#a5b4fc", "#ddd6fe"] }}
              transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut" }}
            />
            {/* Tilde del checkbox */}
            <path d="M 13 37 L 17 41 L 25 33" stroke="#6d28d9" strokeWidth="2.5"
              strokeLinecap="round" strokeLinejoin="round" fill="none"/>

            {/* Nombre del servicio */}
            <text x="36" y="38" fontFamily="sans-serif" fontSize="9" fontWeight="800" fill="#0f172a">
              Seguro Anti-Bombardeo Atómico
            </text>

            {/* Descripción en letra pequeña */}
            <text fontFamily="sans-serif" fontSize="7.5" fill="#374151">
              <tspan x="36" dy="52">Cobertura total contra artefactos nucleares enviados</tspan>
              <tspan x="36" dy="10">por pingüinos nativos del Polo Norte.</tspan>
              <tspan x="36" dy="10" fill="#6b7280">(La no existencia de pingüinos en el Polo Norte</tspan>
              <tspan x="36" dy="10" fill="#6b7280"> no invalida este contrato)</tspan>
            </text>

            {/* Precio — pulsa en rojo para alertar */}
            <motion.text
              x="272" y="38" fontFamily="sans-serif" fontSize="11" fontWeight="900"
              textAnchor="end"
              animate={{ fill: ["#9b9b9b", "#dc2626", "#9b9b9b"] }}
              transition={{ repeat: Infinity, duration: 2.2, ease: "easeInOut" }}
            >
              +19.99€/mes
            </motion.text>
          </g>

          {/* Botón SIGUIENTE — llamativo, amplio */}
          <g id="btn-siguiente-checkout" transform="translate(10, 298)">
            <motion.rect
              x="0" y="0" width="280" height="55" rx="12"
              fill="url(#grad-btn-siguiente)"
              animate={{ opacity: [0.85, 1, 0.85] }}
              transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
            />
            <text x="140" y="34" fontFamily="sans-serif" fontSize="16" fontWeight="900"
              fill="#ffffff" textAnchor="middle" letterSpacing="0.5">
              SIGUIENTE →
            </text>
          </g>

          {/* Botón cancelar — diminuto y gris, difícil de ver */}
          <text x="150" y="380" fontFamily="sans-serif" fontSize="7" fill="#c4c4c4"
            textAnchor="middle">
            cancelar compra
          </text>

        </g>
      </g>

      {/* Dedo de Camo deslizándose (aleta) — entra desde abajo y pasa el seguro */}
      <motion.g
        id="dedo-camo-15"
        initial={{ x: 160, y: 100 }}
        animate={{
          y: [100, 60, 50, 40, 80, 100],
          x: [160, 158, 157, 157, 158, 160]
        }}
        transition={{ repeat: Infinity, duration: 5, ease: "easeInOut", delay: 1 }}
      >
        {/* Aleta/pata de pingüino */}
        <ellipse cx="0" cy="0" rx="5" ry="3.5" fill="#f59e0b" opacity="0.85"/>
        <ellipse cx="0" cy="-1" rx="3.5" ry="2" fill="#fbbf24"/>
      </motion.g>

    </svg>
  );
}
