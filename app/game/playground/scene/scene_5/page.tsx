'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import Scene5Approaching from '../../components/scene_5_approaching';
import { SOUL_CONFIGS } from '../../components/scene_4_walking';

// Generar código SVG estático limpio para exportar al portapapeles (Camo durmiendo + Alma + Protagonista + Ojo Subconsciente)
function getScene5StaticSvg(
  camoVariantId: number,
  showHelmet: boolean,
  eyeStyle: 'determined' | 'sleeping' | 'normal' | 'visor',
  facing: 'left' | 'right'
): string {
  const config = SOUL_CONFIGS[camoVariantId] || SOUL_CONFIGS[5];

  // Ojo de Camo estático
  let camoEyeSvg = '';
  if (eyeStyle === 'normal') {
    camoEyeSvg = `          <g id="camo-ojo-normal">
            <circle id="camo-ojo-borde" cx="-67.91" cy="33.303" r="2.2" fill="#f4f4f5" />
            <circle id="camo-ojo-pupila" cx="-68.196" cy="31.871" r="1.019" fill="#000000" />
          </g>`;
  } else if (eyeStyle === 'determined') {
    camoEyeSvg = `          <g id="camo-ojo-determinado">
            <circle id="camo-ojo-borde" cx="-67.91" cy="33.303" r="2.2" fill="#f4f4f5" />
            <circle id="camo-ojo-pupila" cx="-68.196" cy="31.871" r="1.019" fill="#000000" />
            <path id="camo-ceja" d="M -70.5 29.5 C -70.144 30.759 -71.345 36.213 -71.701 34.954" stroke="#18181b" stroke-width="1.2" stroke-linecap="round" />
          </g>`;
  } else if (eyeStyle === 'sleeping') {
    camoEyeSvg = `          <g id="camo-ojo-durmiendo">
            <path id="camo-ojo-cerrado" d="M -70.007 29.969 C -67.034 32.23 -70.421 35.983 -69.691 34.432" stroke="#18181b" stroke-width="0.8" fill="none" stroke-linecap="round" />
          </g>`;
  } else if (eyeStyle === 'visor') {
    camoEyeSvg = `          <g id="camo-ojo-visor">
            <circle id="camo-visor-lente" cx="-67.91" cy="33.303" r="3" fill="#22c55e" opacity="0.85" style="filter: drop-shadow(0 0 1px #22c55e);" />
            <circle id="camo-visor-luz-intensa" cx="-68.5" cy="32.5" r="0.8" fill="#ffffff" />
            <path id="camo-visor-correa" d="M -67.91 33.303 L -57.91 32" stroke="#18181b" stroke-width="0.75" />
          </g>`;
  }

  // Casco militar estático
  const camoHelmetSvg = showHelmet ? (eyeStyle === 'sleeping' ? `            <g id="camo-casco-grupo" transform="matrix(-0.56708, 0, 0, 0.811, -87.473, 7.057)">
              <path id="camo-casco-correa" d="M -70.987 28.34 C -83.648 27.967 -66.868 31.439 -70.238 28.195" stroke="#1c1917" stroke-width="0.8" fill="none" style="transform-box: fill-box; transform-origin: 50% 50%;" />
              <path id="camo-casco-cuerpo" d="M -59.904 27.327 C -60.176 12.597 -79.447 12.706 -79.304 27.327 C -79.289 28.827 -59.876 28.827 -59.904 27.327 Z" fill="url(#${config.patternUrl.replace('url(#', '').replace(')', '')})" stroke="#1b2611" stroke-width="0.5" />
              <path id="camo-casco-banda" d="M -78.904 21.827 C -73.704 19.327 -65.704 19.327 -60.304 21.827" stroke="#1c1917" stroke-width="1.2" fill="none" opacity="0.8" />
            </g>` : `            <g id="camo-casco-grupo" transform="matrix(0.608395, 0, 0, -0.948131, -22.660084, 75.479631)">
              <path id="camo-casco-correa" d="M -69.283 34.013 C -81.944 33.64 -65.164 37.112 -68.534 33.868" stroke="#1c1917" stroke-width="0.8" fill="none" style="transform-box: fill-box; transform-origin: 50% 50%;" />
              <path id="camo-casco-cuerpo" d="M -58.2 33 C -58.472 18.27 -77.743 18.379 -77.6 33 C -77.585 34.5 -58.172 34.5 -58.2 33 Z" fill="url(#${config.patternUrl.replace('url(#', '').replace(')', '')})" stroke="#1b2611" stroke-width="0.5" />
              <path id="camo-casco-banda" d="M -77.2 27.5 C -72 25 -64 25 -58.6 27.5" stroke="#1c1917" stroke-width="1.2" fill="none" opacity="0.8" />
            </g>`) : '';

  // Ojos estáticos del Alma
  let soulEyesSvg = '';
  if (camoVariantId === 1 || camoVariantId === 5) {
    soulEyesSvg = `            <path d="M 85 27 C 85.5 28.5 87.5 28.5 88 27" stroke="#ffffff" fill="none" stroke-width="0.75" stroke-linecap="round" id="ojo-izq-v5" />
            <path d="M 92 27 C 92.5 28.5 94.5 28.5 95 27" stroke="#ffffff" fill="none" stroke-width="0.75" stroke-linecap="round" id="ojo-der-v5" />`;
  } else if (camoVariantId === 2) {
    soulEyesSvg = `            <path d="M 84.5 27.5 H 88" stroke="#e2e8f0" stroke-width="0.8" stroke-linecap="round" id="ojo-izq-v2" />
            <path d="M 92 27.5 H 95.5" stroke="#e2e8f0" stroke-width="0.8" stroke-linecap="round" id="ojo-der-v2" />`;
  } else if (camoVariantId === 3) {
    soulEyesSvg = `            <path d="M 85 28.5 L 87.5 26.5" stroke="#e2e8f0" stroke-width="0.95" stroke-linecap="round" id="ojo-izq-v3" />
            <path d="M 92 26.5 L 94.5 28.5" stroke="#e2e8f0" stroke-width="0.95" stroke-linecap="round" id="ojo-der-v3" />`;
  } else if (camoVariantId === 4) {
    soulEyesSvg = `            <path d="M 84.5 27.5 H 88" stroke="#ffffff" stroke-width="0.65" stroke-linecap="round" id="ojo-izq-v4" />
            <path d="M 92 27.5 H 95.5" stroke="#ffffff" stroke-width="0.65" stroke-linecap="round" id="ojo-der-v4" />`;
  } else if (camoVariantId === 6) {
    soulEyesSvg = `            <circle cx="86" cy="27.5" r="1.2" fill="#22d3ee" style="filter: drop-shadow(0 0 1px #22d3ee)" id="ojo-izq-v6" />
            <circle cx="94" cy="27.5" r="1.2" fill="#22d3ee" style="filter: drop-shadow(0 0 1px #22d3ee)" id="ojo-der-v6" />`;
  } else if (camoVariantId === 7) {
    soulEyesSvg = `            <path d="M 85 28 C 85.5 26.5 87.5 26.5 88 28" stroke="#cbd5e1" fill="none" stroke-width="0.75" stroke-linecap="round" id="ojo-izq-v7" />
            <path d="M 92 28 C 92.5 26.5 94.5 26.5 95 28" stroke="#cbd5e1" fill="none" stroke-width="0.75" stroke-linecap="round" id="ojo-der-v7" />`;
  } else if (camoVariantId === 8) {
    soulEyesSvg = `            <path d="M 86 25.5 L 87 27.5 L 89 27.5 L 87 28.5 L 86 30.5 L 85 28.5 L 83 27.5 L 85 27.5 Z" fill="#fef08a" stroke="#fbbf24" stroke-width="0.4" id="ojo-izq-v8" />
            <path d="M 94 25.5 L 95 27.5 L 97 27.5 L 95 28.5 L 94 30.5 L 93 28.5 L 91 27.5 L 93 27.5 Z" fill="#fef08a" stroke="#fbbf24" stroke-width="0.4" id="ojo-der-v8" />`;
  }

  // Partículas estáticas del Alma
  const particlesSvg = [
    { dx: -8, dy: 6, r: 1.2 },
    { dx: 8, dy: 10, r: 1.4 },
    { dx: -6, dy: -6, r: 0.9 },
    { dx: 6, dy: -4, r: 1.1 },
    { dx: 0, dy: 12, r: 1.3 },
    { dx: -11, dy: 0, r: 1.0 }
  ].map((p, idx) => {
    const color = config.particleColors[idx % config.particleColors.length];
    return `      <circle cx="${90 + p.dx}" cy="${35 + p.dy}" r="${p.r * 0.8}" fill="${color}" opacity="0.6" />`;
  }).join('\n');

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 120" width="200px" height="120px">
  <defs>
    <!-- Gradiente Ojo Blanco Metálico/Plata -->
    <radialGradient id="white-eye-grad" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="#ffffff" />
      <stop offset="70%" stop-color="#f8fafc" />
      <stop offset="100%" stop-color="#cbd5e1" />
    </radialGradient>
    <!-- Gradiente Brillo/Halo Blanco -->
    <radialGradient id="white-glow-grad" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="#ffffff" stop-opacity="1" />
      <stop offset="50%" stop-color="#ffffff" stop-opacity="0.2" />
      <stop offset="100%" stop-color="#ffffff" stop-opacity="0" />
    </radialGradient>

    <!-- Glow Radial para el alma de Camo -->
    <radialGradient id="camo-glow-s5" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="#879f84" stop-opacity="0.4" />
      <stop offset="60%" stop-color="#4f5d4e" stop-opacity="0.15" />
      <stop offset="100%" stop-color="#000000" stop-opacity="0" />
    </radialGradient>

    <!-- Patrones de camuflaje -->
    <pattern id="camo-standard" width="40" height="40" patternUnits="userSpaceOnUse" patternTransform="rotate(25)">
      <rect width="40" height="40" fill="#4f5d4e" />
      <path d="M -10,5 C 5,12 15,2 25,10 C 35,18 42,6 55,12 L 55,22 C 40,16 35,26 22,18 C 10,10 -2,15 -10,12 Z" fill="#5c4033" />
      <path d="M -10,25 C 2,28 12,20 24,32 L 55,30 L 55,38 Z" fill="#d8d8d0" />
      <path d="M -10,-8 C 5,-2 15,-10 25,-4 C 35,2 42,-8 55,-4 L 55,4 C 40,-1 35,6 22,0 C 10,-6 -2,2 -10,-2 Z" fill="#7ba077" />
    </pattern>

    <pattern id="camo-forest" width="40" height="40" patternUnits="userSpaceOnUse" patternTransform="rotate(40)">
      <rect width="40" height="40" fill="#2d3a1a" />
      <path d="M -10,5 C 5,12 15,2 25,10 C 35,18 42,6 55,12 L 55,22 Z" fill="#1b2611" />
      <path d="M -10,25 C 2,28 12,20 24,32 L 55,30 L 55,38 Z" fill="#5c4033" />
      <path d="M -10,-8 C 5,-2 15,-10 25,-4 L 55,-4 L 55,4 Z" fill="#556b2f" />
    </pattern>

    <pattern id="camo-desert" width="40" height="40" patternUnits="userSpaceOnUse" patternTransform="rotate(15)">
      <rect width="40" height="40" fill="#d2b48c" />
      <path d="M -10,5 C 5,12 15,2 25,10 C 35,18 42,6 55,12 L 55,22 Z" fill="#8b5a2b" />
      <path d="M -10,25 C 2,28 12,20 24,32 L 55,30 L 55,38 Z" fill="#f4e0c4" />
      <path d="M -10,-8 C 5,-2 15,-10 25,-4 L 55,-4 L 55,4 Z" fill="#cd853f" />
    </pattern>

    <pattern id="camo-arctic" width="40" height="40" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
      <rect width="40" height="40" fill="#e2e8f0" />
      <path d="M -10,5 C 5,12 15,2 25,10 L 55,12 L 55,22 Z" fill="#94a3b8" />
      <path d="M -10,25 C 2,28 12,20 24,32 L 55,30 L 55,38 Z" fill="#ffffff" />
      <path d="M -10,-8 C 5,-2 15,-10 25,-4 L 55,-4 L 55,4 Z" fill="#475569" />
    </pattern>

    <pattern id="camo-digital" width="20" height="20" patternUnits="userSpaceOnUse">
      <rect width="20" height="20" fill="#3f4e3f" />
      <rect x="0" y="0" width="8" height="6" fill="#2d3a2d" />
      <rect x="10" y="4" width="6" height="8" fill="#546554" />
      <rect x="2" y="10" width="8" height="6" fill="#7ba077" />
      <rect x="12" y="12" width="6" height="6" fill="#202a20" />
    </pattern>

    <pattern id="camo-night" width="40" height="40" patternUnits="userSpaceOnUse" patternTransform="rotate(10)">
      <rect width="40" height="40" fill="#0f172a" />
      <path d="M -10,5 C 5,12 15,2 25,10 L 55,12 L 55,22 Z" fill="#1e1b4b" />
      <path d="M -10,25 C 2,28 12,20 24,32 L 55,30 L 55,38 Z" fill="#312e81" />
      <path d="M -10,-8 C 5,-2 15,-10 25,-4 L 55,-4 L 55,4 Z" fill="#1e293b" />
    </pattern>

    <pattern id="camo-urban" width="40" height="40" patternUnits="userSpaceOnUse" patternTransform="rotate(30)">
      <rect width="40" height="40" fill="#475569" />
      <path d="M -10,5 C 5,12 15,2 25,10 L 55,12 L 55,22 Z" fill="#1e293b" />
      <path d="M -10,25 C 2,28 12,20 24,32 L 55,30 L 55,38 Z" fill="#cbd5e1" />
      <path d="M -10,-8 C 5,-2 15,-10 25,-4 L 55,-4 L 55,4 Z" fill="#94a3b8" />
    </pattern>

    <linearGradient id="gold-grad-s5" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#fef08a" />
      <stop offset="50%" stop-color="#eab308" />
      <stop offset="100%" stop-color="#ca8a04" />
    </linearGradient>
    <pattern id="camo-gold" width="40" height="40" patternUnits="userSpaceOnUse" patternTransform="rotate(25)">
      <rect width="40" height="40" fill="url(#gold-grad-s5)" />
      <path d="M -10,5 C 5,12 15,2 25,10 L 55,12 L 55,22 Z" fill="#a16207" opacity="0.6" />
      <path d="M -10,25 C 2,28 12,20 24,32 L 55,30 L 55,38 Z" fill="#fef9c3" opacity="0.8" />
      <path d="M -10,-8 C 5,-2 15,-10 25,-4 L 55,-4 L 55,4 Z" fill="#854d0e" opacity="0.5" />
    </pattern>
  </defs>

  <rect width="200" height="120" fill="#000000" />

  <!-- 1. El Ojo Subconsciente (Ojo Blanco flotando arriba a la izquierda, mirando a Camo) -->
  <g transform="matrix(-0.498268, 0, 0, 0.532384, 30.760, 49.912)" id="ojo-subconsciente-grupo">
    <g id="ojo-subconsciente-flotacion">
      <!-- Ojo Glow -->
      <circle id="ojo-glow" cx="1.961" cy="-10.68" r="18" fill="#ffffff" opacity="0.08" transform="matrix(1.726517, 0, 0, 1.260335, 10.344875, -0.379963)" />
      <!-- Ojo Esclera -->
      <circle id="ojo-esclera" cx="3.705" cy="-5.231" r="10.733" fill="url(#white-eye-grad)" stroke-width="0.5" stroke="#e2e8f0" style="transform-box: fill-box; transform-origin: 50% 50%;" transform="matrix(1.4985, -0.537148, 0.642825, 1.013572, 3.086092, -7.914055)" />
      <!-- Ojo Trazo Luz -->
      <path id="ojo-trazo-luz" style="fill: none; stroke: rgb(255, 255, 255);" d="M -17.728 -18.374 C -19.172 -20.359 42.448 -40.704 45.523 -36.475 C 48.876 -32.004 13.029 7.732 11.259 5.372" opacity="0.8" />
      <!-- Pupila & Brillo mirando abajo-derecha hacia Camo -->
      <g id="ojo-pupila-grupo">
        <circle id="ojo-pupila-centro" cx="-4.5" cy="-8.0" r="6.2" fill="#0f172a" />
        <circle id="ojo-pupila-brillo" cx="-4.8" cy="-1.8" r="1.5" fill="#ffffff" transform="matrix(-1.397505, 0, 0, 1.944474, -13.336, -3.14)" />
      </g>
    </g>
  </g>

  <!-- Camo durmiendo en el piso con colores muy apagados -->
  <g id="camo-durmiendo-cuerpo" style="filter: brightness(0.28) saturate(0.35); opacity: 0.65;" transform="matrix(0.746926, 0, 0, 0.755891, 68.90875, 16.34582)">
    <g id="camo-contenedor" transform="${facing === 'left' ? 'translate(200, 0) scale(-1, 1)' : ''}">
      <g id="camo-desplazamiento" transform="matrix(1, 0, 0, 1, 150, 65)">
        <path id="camo-pata-superior" d="M -32.417 31.796 L -25.744 26.644 L -25.774 33.746 L -32.417 31.796 Z" fill="#f59e0b" />
        <ellipse id="camo-cuerpo" cx="-47.91" cy="37.303" rx="20" ry="9.723" fill="url(#${config.patternUrl.replace('url(#', '').replace(')', '')})" stroke="${config.stroke}" stroke-width="0.5" />
        <ellipse id="camo-vientre" cx="-46.144" cy="32.831" rx="10.495" ry="6.167" fill="#d8d8d0" stroke="#000000" stroke-width="0.8" />
        <circle id="camo-cabeza" cx="-68.842" cy="32.274" r="10" fill="url(#${config.patternUrl.replace('url(#', '').replace(')', '')})" stroke="${config.stroke}" stroke-width="0.5" />
        ${camoEyeSvg}
        <polygon id="camo-pico" points="-70.91 26.303 -65.879 20.483 -64.91 26.303" fill="#f59e0b" />
        <g id="camo-patas-contenedor" transform="matrix(1, 0, 0, 1, -51.910336, 17.303471)">
          <path id="camo-pata-inferior" d="M 26.663 20.735 L 26.851 27.446 L 19.486 24.256 L 26.663 20.735 Z" fill="#f59e0b" />
        </g>
        <path id="camo-aleta" d="${eyeStyle === 'sleeping' ? 'M 128.233 -33.688 C 127.111 -38.136 113.93 -31.1 115.708 -26.708' : 'M -72.827 33.598 C -73.949 29.15 -58.211 34.355 -56.433 38.747'}" stroke-width="2.5" stroke-linecap="round" stroke="rgb(0, 0, 0)" fill="none" style="transform-box: fill-box; transform-origin: ${eyeStyle === 'sleeping' ? '-623.907% 433.118%' : '50% 50%'};" transform="${eyeStyle === 'sleeping' ? 'matrix(-1, 0, 0, -1, -0.00004, 0)' : 'matrix(-1, 0, 0, -1, 0.000009, 0.000004)'}" />
        ${camoHelmetSvg}
      </g>
    </g>
  </g>

  <!-- Burbuja anime de sueño estática -->
  <circle id="burbuja-sueno" cx="131.714" cy="78.034" r="3" fill="#38bdf8" fill-opacity="0.25" stroke="#0284c7" stroke-width="0.8" />

  <!-- Zzz estáticas -->
  <g id="sueno-zs" transform="translate(127.8, 81.95)">
    <text x="0" y="-8" fill="#a5f3fc" font-size="4" font-weight="bold" font-family="monospace" opacity="0.8">z</text>
    <text x="3" y="-16" fill="#a5f3fc" font-size="5" font-weight="bold" font-family="monospace" opacity="0.6">z</text>
    <text x="6" y="-24" fill="#a5f3fc" font-size="6.5" font-weight="bold" font-family="monospace" opacity="0.4">Z</text>
  </g>

  <!-- Alma de Camo flotando (cx: 90, cy: 35) -->
  <g id="camo-alma-contenedor" transform="matrix(0.756577, 0, 0, 0.772114, 81.479, 9.468)">
    <circle id="alma-fondo-glow" cx="90" cy="35" r="18" fill="url(#camo-glow-s5)" opacity="0.5" />
    <path id="alma-gota-invertida" d="M 90 51 C 82 43 78 35 78 29 A 12 12 0 0 1 102 29 C 102 35 98 43 90 51 Z" fill="${config.patternUrl}" stroke="${config.stroke}" stroke-width="0.8" opacity="0.85" />
    <g id="alma-ojos-contenedor">
      ${soulEyesSvg}
    </g>
    <g id="alma-particulas-flotantes">
      ${particlesSvg}
    </g>
  </g>

  <!-- 2. El Pingüino Protagonista (Parado a la izquierda, mirando a la derecha y hacia abajo a Camo) -->
  <g id="protagonista-contenedor" transform="matrix(0.796426, 0, 0, 0.829579, 35.501, 22.127)">
    <g id="protagonista-posicion" transform="matrix(0, 0.848747, -0.768697, 0, 35, 115)">
      <g id="protagonista-respiracion">
        <!-- Pata Superior -->
        <path id="protagonista-pata-superior" d="M -32.417 31.796 L -25.744 26.644 L -25.774 33.746 L -32.417 31.796 Z" fill="#f59e0b" />
        <!-- Cuerpo -->
        <ellipse id="protagonista-cuerpo" cx="-47.91" cy="37.303" rx="20" ry="14" fill="#18181b" />
        <!-- Vientre -->
        <ellipse id="protagonista-vientre" cx="-49.91" cy="31.303" rx="14" ry="8" fill="#f4f4f5" />
        <!-- Cabeza -->
        <circle id="protagonista-cabeza" cx="-67.91" cy="33.303" r="10" fill="#18181b" />
        <!-- Bufanda -->
        <g id="protagonista-bufanda" transform="matrix(1, 0, 0, 1, -51.910336, 17.303471)">
          <path id="protagonista-bufanda-cuello" d="M -14.315 26.443 C -12.315 20.443 -3.738 18.577 -6.624 13.624" stroke="#ef4444" stroke-width="2.2" fill="none" stroke-linecap="round" />
          <path id="protagonista-bufanda-caida-roja" d="M -7.663 13.49 C -2.663 12.49 3 11 7 9 C 5 7 0.204 10.408 -6.796 12.408 L -7.663 13.49 Z" fill="#ef4444" />
          <path id="protagonista-bufanda-caida-guinda" d="M -6.929 14.898 C -1.929 14.898 2 14 5 13 C 3 11 -0.337 13.357 -7.337 13.357 L -6.929 14.898 Z" fill="#b91c1c" />
        </g>
        <!-- Ojo del Protagonista buscando abajo-izquierda -->
        <g id="protagonista-ojo">
          <circle id="protagonista-ojo-borde" cx="-67.91" cy="33.303" r="2.2" fill="#f4f4f5" />
          <circle id="protagonista-ojo-pupila" cx="-66.2" cy="31.8" r="1.019" fill="#000000" />
        </g>
        <!-- Pico -->
        <polygon id="protagonista-pico" points="-70.91 26.303 -67.91 19.303 -64.91 26.303" fill="#f59e0b" />
        <!-- Pata Inferior -->
        <g id="protagonista-patas" transform="matrix(1, 0, 0, 1, -51.910336, 17.303471)">
          <path id="protagonista-pata-inferior" d="M 26.663 20.735 L 26.851 27.446 L 19.486 24.256 L 26.663 20.735 Z" fill="#f59e0b" />
        </g>
        <!-- Aleta -->
        <path id="protagonista-aleta" d="M -56.369 37.201 C -57.631 41.252 -39.926 36.511 -37.926 32.511" stroke-width="2.5" stroke-linecap="round" stroke="rgb(0, 0, 0)" fill="none" />
      </g>
    </g>
  </g>
</svg>`;
}

export default function Scene5PlaygroundPage() {
  const router = useRouter();
  
  // Customizer state
  const [selectedVariant, setSelectedVariant] = useState(5); // Por defecto camuflaje digital
  const [showHelmet, setShowHelmet] = useState(true);
  const [eyeStyle, setEyeStyle] = useState<'determined' | 'sleeping' | 'normal' | 'visor'>('sleeping');
  const [facing, setFacing] = useState<'left' | 'right'>('right');
  
  const [status, setStatus] = useState<{ type: 'idle' | 'success' | 'error'; message: string }>({
    type: 'idle',
    message: ''
  });

  const handleCopyToClipboard = () => {
    try {
      const svgCode = getScene5StaticSvg(selectedVariant, showHelmet, eyeStyle, facing);
      navigator.clipboard.writeText(svgCode);
      setStatus({
        type: 'success',
        message: '¡Código SVG estático copiado al portapapeles!'
      });
      setTimeout(() => setStatus({ type: 'idle', message: '' }), 3000);
    } catch (err) {
      setStatus({
        type: 'error',
        message: 'Error al copiar al portapapeles.'
      });
      setTimeout(() => setStatus({ type: 'idle', message: '' }), 3000);
    }
  };

  const VARIANTS = [
    { id: 1, name: 'Camo Estándar', desc: 'Clásico verde/marrón' },
    { id: 2, name: 'Camo Bosque', desc: 'Verdes oscuros' },
    { id: 3, name: 'Camo Desierto', desc: 'Beige y arena' },
    { id: 4, name: 'Camo Ártico', desc: 'Blanco y grises' },
    { id: 5, name: 'Camo Digital', desc: 'Pixelado digital' },
    { id: 6, name: 'Camo Nocturno', desc: 'Azul e índigo' },
    { id: 7, name: 'Camo Urbano', desc: 'Gris concreto' },
    { id: 8, name: 'Camo Dorado', desc: 'Oro premium' },
  ];

  // Presets para mostrar varias versiones side-by-side (sin bufandas)
  const PRESETS = [
    {
      title: 'Camo Asalto (Bosque)',
      desc: 'Listo para misiones de infantería en el bosque.',
      config: { camoVariantId: 2, showHelmet: true, eyeStyle: 'determined', facing: 'right' }
    },
    {
      title: 'Camo Francotirador Táctico',
      desc: 'Monocle digital para apuntar a largas distancias.',
      config: { camoVariantId: 5, showHelmet: true, eyeStyle: 'visor', facing: 'left' }
    },
    {
      title: 'Camo Operaciones Nocturnas',
      desc: 'Ligero para operaciones encubiertas en la oscuridad.',
      config: { camoVariantId: 6, showHelmet: false, eyeStyle: 'determined', facing: 'right' }
    },
    {
      title: 'Camo Reconocimiento Ártico',
      desc: 'Ojos concentrados en la tundra nevada.',
      config: { camoVariantId: 4, showHelmet: true, eyeStyle: 'sleeping', facing: 'left' }
    }
  ];

  return (
    <div className="min-h-screen w-screen bg-[#050508] text-zinc-200 flex flex-col p-4 md:p-8 font-sans overflow-y-auto custom-scrollbar">
      
      {/* Glows de fondo */}
      <div className="absolute top-0 left-1/4 w-[400px] h-[400px] bg-emerald-500/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-indigo-500/5 rounded-full blur-[100px] pointer-events-none" />
 
      <div className="max-w-6xl w-full mx-auto flex-1 flex flex-col relative z-10">
        
        {/* Header */}
        <header className="flex flex-col md:flex-row justify-between items-start md:items-center border-b border-zinc-900 pb-4 mb-6 shrink-0 gap-4">
          <div className="space-y-1">
            <h1 className="text-xs font-mono uppercase tracking-widest text-emerald-400 font-bold">
              Playground de Animación y Diseño
            </h1>
            <p className="text-xl font-bold tracking-tight text-white flex items-center gap-2">
              El Alma de Camo Dormido
            </p>
            <p className="text-xs text-zinc-500">
              Escena 5 — Camo en coma/dormido en el suelo con su alma flotando.
            </p>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => router.push('/game/playground')}
              className="px-3 py-1.5 text-xs font-medium bg-zinc-950 border border-zinc-800 hover:border-zinc-700 text-zinc-400 hover:text-white rounded transition"
            >
              ← Volver al Menú
            </button>
          </div>
        </header>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 flex-1 items-stretch">
          
          {/* Columna Izquierda: Preview de la Escena (2/3 de ancho en lg) */}
          <div className="lg:col-span-2 flex flex-col gap-6">
            <div className="flex-1 min-h-[300px] lg:min-h-[400px] bg-zinc-950/80 border border-zinc-900 rounded-lg p-6 flex items-center justify-center relative overflow-hidden backdrop-blur-sm shadow-2xl">
              
              {/* Animación SVG renderizada */}
              <div className="w-full max-w-[400px] aspect-video">
                <Scene5Approaching 
                  camoVariantId={selectedVariant}
                  showHelmet={showHelmet}
                  eyeStyle={eyeStyle}
                  facing={facing}
                />
              </div>

              {/* Indicador de Escena */}
              <div className="absolute top-4 left-4 bg-zinc-900/80 border border-zinc-800/80 px-2 py-1 rounded text-[10px] font-mono text-zinc-500 select-none">
                VISTA PREVIA INDIVIDUAL
              </div>

              {/* Botón de exportación rápida */}
              <button 
                onClick={handleCopyToClipboard}
                className="absolute bottom-4 right-4 bg-emerald-500 hover:bg-emerald-400 text-black text-xs font-bold px-3 py-1.5 rounded flex items-center gap-1.5 shadow-lg active:scale-95 transition"
              >
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
                  <rect x="8" y="2" width="8" height="4" rx="1" ry="1" />
                </svg>
                Exportar SVG Estático
              </button>
            </div>

            {/* Consola de estado */}
            <AnimatePresence>
              {status.message && (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className={`p-3 rounded text-xs font-mono border ${
                    status.type === 'success' 
                      ? 'bg-emerald-950/20 border-emerald-500/20 text-emerald-400' 
                      : 'bg-red-950/20 border-red-500/20 text-red-400'
                  }`}
                >
                  {status.message}
                </motion.div>
              )}
            </AnimatePresence>

            {/* Showcase de Versiones de Camo */}
            <div className="space-y-3">
              <h3 className="text-xs font-mono uppercase tracking-wider text-emerald-400 font-bold">
                Versiones de Camo Diseñadas (Haz clic para cargar)
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {PRESETS.map((p, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      setSelectedVariant(p.config.camoVariantId);
                      setShowHelmet(p.config.showHelmet);
                      setEyeStyle(p.config.eyeStyle as any);
                      setFacing(p.config.facing as any);
                    }}
                    className="p-3 bg-zinc-950 border border-zinc-900 rounded-lg text-left hover:border-zinc-800 transition flex flex-col gap-2 group relative overflow-hidden"
                  >
                    <div className="w-full aspect-square bg-black border border-zinc-900 rounded flex items-center justify-center p-2 relative overflow-hidden">
                      <Scene5Approaching 
                        camoVariantId={p.config.camoVariantId}
                        showHelmet={p.config.showHelmet}
                        eyeStyle={p.config.eyeStyle as any}
                        facing={p.config.facing as any}
                      />
                    </div>
                    <div className="space-y-0.5">
                      <h4 className="text-[11px] font-bold text-white group-hover:text-emerald-400 transition leading-tight">
                        {p.title}
                      </h4>
                      <p className="text-[9px] text-zinc-600 line-clamp-2 leading-snug">
                        {p.desc}
                      </p>
                    </div>
                  </button>
                ))}
              </div>
            </div>

          </div>

          {/* Columna Derecha: Panel de Personalización (1/3 de ancho en lg) */}
          <div className="bg-zinc-950/40 border border-zinc-900 rounded-lg p-5 flex flex-col gap-6 backdrop-blur-sm shadow-xl overflow-y-auto max-h-[600px] custom-scrollbar">
            
            <div>
              <h2 className="text-sm font-bold text-white tracking-wide mb-1 uppercase font-mono text-emerald-400">
                Diseñador de Camo
              </h2>
              <p className="text-[11px] text-zinc-500">
                Personaliza los atributos de este personaje.
              </p>
            </div>

            {/* Selector de Patrón de Camuflaje */}
            <div className="space-y-3">
              <label className="text-[11px] font-mono uppercase tracking-wider text-zinc-400 block font-bold">
                1. Patrón de Camuflaje
              </label>
              <div className="grid grid-cols-2 gap-2">
                {VARIANTS.map((v) => (
                  <button
                    key={v.id}
                    onClick={() => setSelectedVariant(v.id)}
                    className={`p-2 rounded text-left border transition flex flex-col gap-0.5 ${
                      selectedVariant === v.id
                        ? 'bg-emerald-500/10 border-emerald-500/50 text-white shadow-md'
                        : 'bg-zinc-950/80 border-zinc-900 text-zinc-400 hover:border-zinc-800'
                    }`}
                  >
                    <span className="text-xs font-bold">{v.name}</span>
                    <span className="text-[9px] text-zinc-600 line-clamp-1">{v.desc}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Dirección de la mirada */}
            <div className="space-y-3 border-t border-zinc-900 pt-4">
              <label className="text-[11px] font-mono uppercase tracking-wider text-zinc-400 block font-bold">
                2. Orientación
              </label>
              <div className="grid grid-cols-2 gap-2">
                {[
                  { key: 'right', label: 'Mirar a la derecha' },
                  { key: 'left', label: 'Mirar a la izquierda (Espejo)' },
                ].map((f) => (
                  <button
                    key={f.key}
                    onClick={() => setFacing(f.key as any)}
                    className={`p-2 rounded border text-xs font-bold transition ${
                      facing === f.key
                        ? 'bg-emerald-500/10 border-emerald-500/50 text-white shadow-md'
                        : 'bg-zinc-950/80 border-zinc-900 text-zinc-400 hover:border-zinc-800'
                    }`}
                  >
                    {f.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Toggle de Accesorios */}
            <div className="space-y-3 border-t border-zinc-900 pt-4">
              <label className="text-[11px] font-mono uppercase tracking-wider text-zinc-400 block font-bold">
                3. Equipamiento Militar
              </label>
              <div className="flex items-center justify-between p-2.5 bg-zinc-950/80 border border-zinc-900 rounded hover:border-zinc-800 transition">
                <div className="flex flex-col">
                  <span className="text-xs font-bold text-zinc-300">Casco Militar Táctico</span>
                  <span className="text-[9px] text-zinc-600">Equipa a Camo con un casco protector</span>
                </div>
                <button
                  onClick={() => setShowHelmet(!showHelmet)}
                  className={`w-9 h-5 rounded-full p-0.5 transition-colors duration-200 focus:outline-none flex items-center ${
                    showHelmet ? 'bg-emerald-500 justify-end' : 'bg-zinc-800 justify-start'
                  }`}
                >
                  <span className="w-4 h-4 rounded-full bg-black shadow" />
                </button>
              </div>
            </div>

            {/* Selector de Expresión de los Ojos */}
            <div className="space-y-3 border-t border-zinc-900 pt-4">
              <label className="text-[11px] font-mono uppercase tracking-wider text-zinc-400 block font-bold">
                4. Expresión del Ojo
              </label>
              <div className="flex flex-col gap-1.5">
                {[
                  { key: 'determined', label: 'Mirada Determinada', desc: 'Pupila enfocada con ceja militar' },
                  { key: 'visor', label: 'Visor de Francotirador', desc: 'Eyepiece táctico verde con mira HUD' },
                  { key: 'normal', label: 'Mirada Común', desc: 'Igual a los ojos abiertos del protagonista' },
                  { key: 'sleeping', label: 'Ojos Cerrados', desc: 'En estado de calma o concentración' },
                ].map((e) => (
                  <button
                    key={e.key}
                    onClick={() => setEyeStyle(e.key as any)}
                    className={`p-2.5 rounded text-left border transition flex flex-col gap-0.5 ${
                      eyeStyle === e.key
                        ? 'bg-emerald-500/10 border-emerald-500/50 text-white shadow-md'
                        : 'bg-zinc-950/80 border-zinc-900 text-zinc-400 hover:border-zinc-800'
                    }`}
                  >
                    <span className="text-xs font-bold">{e.label}</span>
                    <span className="text-[9px] text-zinc-500">{e.desc}</span>
                  </button>
                ))}
              </div>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}
