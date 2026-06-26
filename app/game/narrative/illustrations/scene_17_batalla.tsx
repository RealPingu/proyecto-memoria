'use client';

import { motion } from 'framer-motion';

export default function Scene17Batalla() {
  return (
    <svg viewBox="0 0 200 120" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
      <defs>
        {/* Patrón de teselación para el cuerpo del Patrón Oscuro */}
        <pattern id="teselacion-enemigo" width="40" height="40" patternUnits="userSpaceOnUse" patternTransform="matrix(0.999888, 0.017041, -0.013154, 0.999888, 3.179298, -3.381333)">
          <polygon points="0,0 20,10 20,30 0,20" fill="#111827" stroke="#020408" strokeWidth="0.5"/>
          <polygon points="20,10 40,0 40,20 20,30" fill="#1f2937" stroke="#020408" strokeWidth="0.5"/>
          <polygon points="0,20 20,30 20,40 0,40" fill="#0f172a" stroke="#020408" strokeWidth="0.5"/>
          <polygon points="20,30 40,20 40,40 20,40" fill="#1e1b4b" stroke="#020408" strokeWidth="0.5"/>
        </pattern>

        {/* Gradiente radial de fondo con colores del Patrón Oscuro */}
        <radialGradient id="grad-fondo-batalla" cx="65%" cy="40%" r="65%">
          <stop offset="0%" stopColor="#06b6d4" stopOpacity="0.28"/> {/* Brillo cian del enemigo */}
          <stop offset="50%" stopColor="#1e1b4b" stopOpacity="0.12"/> {/* Azul/indigo del cuerpo */}
          <stop offset="100%" stopColor="#05040a" stopOpacity="1"/>
        </radialGradient>

        {/* Halo de energía cian para el enemigo */}
        <radialGradient id="halo-energia" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#22d3ee" stopOpacity="0.4"/>
          <stop offset="50%" stopColor="#06b6d4" stopOpacity="0.15"/>
          <stop offset="100%" stopColor="#06b6d4" stopOpacity="0"/>
        </radialGradient>
      </defs>

      {/* Fondo de batalla */}
      <rect width="200" height="120" fill="url(#grad-fondo-batalla)" id="rect-fondo"/>

      {/* Partículas de energía flotantes en el aire (Tensión de la batalla) */}
      <g id="particulas-clash">
        {/* Partícula Cian 1 */}
        <motion.circle
          cx="110" cy="50" r="1.2" fill="#22d3ee"
          animate={{
            y: [-10, 10, -10],
            x: [-5, 5, -5],
            opacity: [0.3, 0.9, 0.3]
          }}
          transition={{ repeat: Infinity, duration: 4.5, ease: "easeInOut" }}
        />
        {/* Partícula Cian 2 */}
        <motion.circle
          cx="135" cy="85" r="1.5" fill="#06b6d4"
          animate={{
            y: [5, -15, 5],
            x: [3, -3, 3],
            opacity: [0.2, 0.8, 0.2]
          }}
          transition={{ repeat: Infinity, duration: 3.5, ease: "easeInOut", delay: 0.5 }}
        />
        {/* Partícula Roja 1 (Fuerza del jugador/Camo) */}
        <motion.circle
          cx="60" cy="70" r="1.2" fill="#ef4444"
          animate={{
            y: [-5, 15, -5],
            x: [-3, 3, -3],
            opacity: [0.4, 0.9, 0.4]
          }}
          transition={{ repeat: Infinity, duration: 4, ease: "easeInOut", delay: 1 }}
        />
        {/* Partícula Roja 2 */}
        <motion.circle
          cx="45" cy="40" r="1" fill="#b91c1c"
          animate={{
            y: [12, -8, 12],
            x: [2, -2, 2],
            opacity: [0.3, 0.7, 0.3]
          }}
          transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}
        />
      </g>

      {/* Halo de poder detrás del Patrón Oscuro */}
      <motion.circle
        id="halo-patron-detras"
        cx="145"
        cy="55"
        r="40"
        fill="url(#halo-energia)"
        animate={{
          scale: [0.95, 1.15, 0.95],
          opacity: [0.7, 1, 0.7]
        }}
        transition={{
          repeat: Infinity,
          duration: 3,
          ease: "easeInOut"
        }}
      />

      {/* RAYOS DE CONFLICTO (Efecto de choque eléctrico/voluntad) */}
      <g id="rayos-tension">
        <motion.path
          d="M 68 62 L 95 55 L 120 58"
          stroke="#22d3ee"
          strokeWidth="0.8"
          strokeLinecap="round"
          fill="none"
          animate={{
            opacity: [0, 0.8, 0, 0.9, 0, 0.3, 0],
            strokeWidth: [0.5, 1.2, 0.5, 1.5, 0.5]
          }}
          transition={{
            repeat: Infinity,
            duration: 1.5,
            ease: "linear"
          }}
        />
        <motion.path
          d="M 65 72 L 90 78 L 122 70"
          stroke="#f472b6"
          strokeWidth="0.6"
          strokeLinecap="round"
          fill="none"
          animate={{
            opacity: [0, 0, 0.7, 0, 0.9, 0.2, 0],
            strokeWidth: [0.4, 1, 0.4, 1.2, 0.4]
          }}
          transition={{
            repeat: Infinity,
            duration: 2.1,
            ease: "linear",
            delay: 0.4
          }}
        />
      </g>

      {/* GRUPO ENEMY: Patrón Oscuro (Alineado a la derecha, flotando) */}
      <motion.g
        id="grupo-patron-oscuro-enemigo"
        animate={{
          y: [0, -3.5, 0],
          rotate: [0, 1, -1, 0]
        }}
        transition={{
          repeat: Infinity,
          duration: 5,
          ease: "easeInOut"
        }}
        style={{ originX: '145px', originY: '55px' }}
      >
        <g id="patron-oscuro-figura" transform="matrix(0.204386, 0, 0, 0.179566, 109.414691, 19.192984)">
          {/* Brazo izquierdo / tentáculo */}
          <path id="tentaculo-izq" d="M 76.803 196.156 C 71.563 178.814 115.955 225.818 91.894 280.699" strokeLinecap="round" stroke="#000000" fill="none" style={{ transformBox: 'fill-box', transformOrigin: '50% 50%', strokeWidth: '10.418px' }} transform="matrix(0, 1.138222, -0.878563, 0, 0.000028, -0.00001)"/>
          
          {/* Cuerpo rombo isométrico */}
          <polygon id="patron-rombo-cuerpo" points="128.429 358.794 101.59 118.309 301.567 121.718 268.414 361.179" fill="url(#teselacion-enemigo)" stroke="#06b6d4" strokeWidth="2.5" style={{ transformOrigin: '200px 240px' }}/>
          
          {/* Núcleo cian brillante central */}
          <polygon id="patron-rombo-nucleo" points="155.035 148.511 180.035 168.511 155.035 188.511 130.035 168.511" fill="#22d3ee"/>
          <line id="patron-nucleo-linea" x1="148.611" y1="158.732" x2="155.035" y2="182.988" stroke="#020408" strokeWidth="3" />
          
          {/* Brazo derecho / tentáculo */}
          <path id="tentaculo-der" d="M 116.335 196.849 C 111.095 179.508 166.823 207.174 115.253 292.447" strokeLinecap="round" stroke="#000000" fill="none" style={{ strokeWidth: '10.418px', transformBox: 'fill-box', transformOrigin: '50% 50%' }} transform="matrix(0, 1.138222, -0.878563, 0, -0.000013, 0.000012)"/>
          
          {/* Brillo reflectivo en el borde */}
          <path id="brillo-reflejo" d="M 386.098 120.481 C 434.242 133.117 400.957 140.502 385.262 152.43" strokeLinecap="round" style={{ fill: 'none', stroke: '#ffffff', transformOrigin: '273.549px -7.507px', strokeWidth: '5.20898px' }} transform="matrix(0, 1.138222, -0.878563, 0, -0.000058, 0.000053)"/>
        </g>
      </motion.g>

      {/* GRUPO PROTAGONISTA: Camo Pingüino (Alineado a la izquierda, firme de pie y animado) */}
      <motion.g
        id="grupo-camo-protagonista"
        animate={{
          x: [0, 0.5, 0],
          y: [0, -1, 0]
        }}
        transition={{
          repeat: Infinity,
          duration: 3.8,
          ease: "easeInOut"
        }}
        style={{ originX: '45px', originY: '75px' }}
      >
        {/* Restauramos la matriz original de rotación y traslación del protagonista erguido */}
        <g id="pinguino-contenedor" transform="matrix(0, 0.848747, -0.768697, 0, 76.463808, 104.227954)">
          
          {/* Sombra proyectada */}
          <ellipse id="sombra-pinguino" cx="-45" cy="52" rx="16" ry="3.5" fill="#000000" opacity="0.3" />

          {/* Cola */}
          <path id="cola" d="M -57.788 25.808 C -59.05 29.859 -48.36 18.879 -54.154 6.059" strokeWidth="2.5" strokeLinecap="round" stroke="#000000" fill="none"/>
          
          {/* Pata Superior (Detrás) */}
          <path id="pata-superior" d="M -32.417 31.796 L -25.744 26.644 L -25.774 33.746 L -32.417 31.796 Z" fill="#f59e0b"/>
          
          {/* Cuerpo */}
          <ellipse id="cuerpo" cx="-47.91" cy="37.303" rx="20" ry="14" fill="#18181b"/>
          
          {/* Vientre */}
          <ellipse id="vientre" cx="-49.91" cy="31.303" rx="14" ry="8" fill="#f4f4f5"/>
          
          {/* Cabeza */}
          <circle id="cabeza" cx="-67.91" cy="33.303" r="10" fill="#18181b"/>
          
          {/* Bufanda Roja */}
          <g id="bufanda" transform="matrix(1, 0, 0, 1, -51.910336, 17.303471)">
            <path id="bufanda-cuello" d="M -14.315 26.443 C -12.315 20.443 -3.738 18.577 -6.624 13.624" stroke="#ef4444" strokeWidth="2.2" fill="none" strokeLinecap="round"/>
            <path id="bufanda-caida-roja" d="M -7.663 13.49 C -2.663 12.49 3 11 7 9 C 5 7 0.204 10.408 -6.796 12.408 L -7.663 13.49 Z" fill="#ef4444"/>
            <path id="bufanda-caida-guinda" d="M -6.929 14.898 C -1.929 14.898 2 14 5 13 C 3 11 -0.337 13.357 -7.337 13.357 L -6.929 14.898 Z" fill="#b91c1c"/>
          </g>
          
          {/* Ojo enfocado de batalla (cerrando parpado para mostrar concentración) */}
          <g id="ojo">
            <circle id="ojo-borde" cx="-67.91" cy="33.303" r="2.2" fill="#f4f4f5"/>
            <circle id="ojo-pupila" cx="-68.196" cy="31.871" r="1.019" fill="#000000"/>
          </g>
          
          {/* Pico */}
          <polygon id="pico" points="-70.91 26.303 -67.91 19.303 -64.91 26.303" fill="#f59e0b"/>
          
          {/* Pata Inferior (Delante) */}
          <g id="patas" transform="matrix(1, 0, 0, 1, -51.910336, 17.303471)">
            <path id="pata-inferior" d="M 26.663 20.735 L 26.851 27.446 L 19.486 24.256 L 26.663 20.735 Z" fill="#f59e0b"/>
          </g>
          
          {/* Aleta erguida en pose de combate */}
          <g id="aleta-grupo">
            <path id="aleta" d="M -56.369 37.201 C -56 42 -40 37 -56.6 14.8" strokeWidth="2.5" strokeLinecap="round" stroke="#000000" fill="none"/>
          </g>

          {/* Reflejos de luz en cabeza/casco */}
          <path id="reflejo-cabeza" d="M -73.439 29.591 C -69.243 32.171 -72.144 33.677 -73.512 36.113" strokeWidth="0.77" strokeLinecap="round" fill="none" stroke="#ffffff" />
        </g>
      </motion.g>
    </svg>
  );
}
