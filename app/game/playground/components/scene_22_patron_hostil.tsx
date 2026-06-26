'use client';

import { motion } from 'framer-motion';

export default function Scene22PatronHostil() {
  return (
    <svg
      viewBox="0 0 200 120"
      className="w-full h-full select-none"
      xmlns="http://www.w3.org/2000/svg"
      id="svg-escena-22"
    >
      <defs>
        {/* Fondo rojo/índigo de hostilidad */}
        <radialGradient id="grad-fondo-hostil-22" cx="65%" cy="40%" r="65%">
          <stop offset="0%" stopColor="#ef4444" stopOpacity="0.25" id="stop-fh1-22"/>
          <stop offset="50%" stopColor="#1e1b4b" stopOpacity="0.1" id="stop-fh2-22"/>
          <stop offset="100%" stopColor="#05040a" stopOpacity="1" id="stop-fh3-22"/>
        </radialGradient>

        {/* Halo de ira rojo */}
        <radialGradient id="halo-ira-22" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#ef4444" stopOpacity="0.5" id="stop-hi1-22"/>
          <stop offset="60%" stopColor="#991b1b" stopOpacity="0.15" id="stop-hi2-22"/>
          <stop offset="100%" stopColor="#ef4444" stopOpacity="0" id="stop-hi3-22"/>
        </radialGradient>

        <pattern id="teselacion-hostil-22" width="40" height="40" patternUnits="userSpaceOnUse">
          <polygon points="0,0 20,10 20,30 0,20" fill="#111827" stroke="#000000" strokeWidth="0.5" id="poly-h1-22"/>
          <polygon points="20,10 40,0 40,20 20,30" fill="#18181b" stroke="#000000" strokeWidth="0.5" id="poly-h2-22"/>
          <polygon points="0,20 20,30 20,40 0,40" fill="#0c0a0f" stroke="#000000" strokeWidth="0.5" id="poly-h3-22"/>
          <polygon points="20,30 40,20 40,40 20,40" fill="#311010" stroke="#000000" strokeWidth="0.5" id="poly-h4-22"/>
        </pattern>

        <radialGradient id="white-eye-grad-22" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#ffffff" id="stop-eye-w1-22"/>
          <stop offset="70%" stopColor="#f8fafc" id="stop-eye-w2-22"/>
          <stop offset="100%" stopColor="#cbd5e1" id="stop-eye-w3-22"/>
        </radialGradient>
      </defs>

      {/* Fondo hostil */}
      <rect width="200" height="120" fill="url(#grad-fondo-hostil-22)" id="bg-rect-22"/>

      {/* Halo de ira detrás del Patrón */}
      <motion.circle cx="145" cy="55" r="42"
        fill="url(#halo-ira-22)"
        animate={{ scale: [0.95, 1.2, 0.95], opacity: [0.7, 1, 0.7] }}
        transition={{ repeat: Infinity, duration: 2.2, ease: "easeInOut" }}
        id="halo-ira-detras-22"
      />

      {/* Rayos de tensión/ira roja */}
      <g id="rayos-tension-hostil-22">
        <motion.path d="M 120 50 L 90 42 L 75 58"
          stroke="#ef4444" strokeWidth="1.2" strokeLinecap="round" fill="none"
          animate={{ opacity: [0, 0.9, 0, 1, 0, 0.4, 0], scaleY: [1, 1.3, 1] }}
          transition={{ repeat: Infinity, duration: 1.2, ease: "linear" }}
          id="rayo-h1-22"
        />
        <motion.path d="M 125 70 L 100 78 L 70 65"
          stroke="#a855f7" strokeWidth="1" strokeLinecap="round" fill="none"
          animate={{ opacity: [0.2, 0, 0.8, 0, 0.9, 0.1, 0.2], scaleY: [1, 0.8, 1.2] }}
          transition={{ repeat: Infinity, duration: 1.5, ease: "linear", delay: 0.2 }}
          id="rayo-h2-22"
        />
      </g>

      {/* Ojo Blanco (Subconsciente) - Pose defensiva (Movido a la derecha x=60) */}
      <g id="ojo-subconsciente-grupo-22" transform="matrix(-0.4, 0, 0, 0.43, 60, 45)">
        <motion.g
          animate={{ x: [0, 1, 0], y: [-1, 1, -1] }}
          transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut" }}
          id="ojo-movimiento-22"
        >
          <circle cx="1.96" cy="-10.68" r="18" fill="#ffffff" opacity="0.08" transform="matrix(1.72, 0, 0, 1.26, 10.3, -0.3)" id="ojo-glow-22"/>
          <circle cx="3.7" cy="-5.2" r="10.7" fill="url(#white-eye-grad-22)" strokeWidth="0.5" stroke="#e2e8f0" id="ojo-esclera-22" style={{ transformBox: "fill-box", transformOrigin: "50% 50%" }} transform="matrix(1.4985, -0.537148, 0.642825, 1.013572, 3.086092, -7.914055)"/>
          {/* Ojo Trazo Luz - Modelo Original */}
          <motion.path 
            id="ojo-trazo-luz-22"
            style={{ fill: "none", stroke: "rgb(255, 255, 255)" }} 
            d="M -17.728 -18.374 C -19.172 -20.359 42.448 -40.704 45.523 -36.475 C 48.876 -32.004 13.029 7.732 11.259 5.372" 
            animate={{ opacity: [0.7, 1, 0.7] }}
            transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
          />
          {/* Pupila mirando al Patrón Oscuro */}
          <circle cx="-0.5" cy="-4.0" r="6.2" fill="#0f172a" id="ojo-pupila-centro-22"/>
          <circle cx="-1.5" cy="-5.0" r="1.8" fill="#ffffff" id="ojo-brillo-pupila-22"/>
        </motion.g>
      </g>
 
      {/* Protagonista (Pingüino) - Mirando al enemigo (Movido a la derecha x=65) */}
      <g id="protagonista-contenedor-22" transform="matrix(0.75, 0, 0, 0.75, 65, 25)">
        <motion.g
          animate={{ x: [0, 0.5, 0], y: [0, -0.5, 0] }}
          transition={{ repeat: Infinity, duration: 3 }}
          id="protagonista-cuerpo-movimiento-22"
        >
          <ellipse cx="-45" cy="52" rx="16" ry="3.5" fill="#000000" opacity="0.3" id="p-sombra-22"/>
          <g transform="matrix(0, 0.848747, -0.768697, 0, 35, 115)" id="p-rotado-22">
            <ellipse cx="-47.91" cy="37.303" rx="20" ry="14" fill="#18181b" id="p-cuerpo-22"/>
            <ellipse cx="-49.91" cy="31.303" rx="14" ry="8" fill="#f4f4f5" id="p-vientre-22"/>
            <circle cx="-67.91" cy="33.303" r="10" fill="#18181b" id="p-cabeza-22"/>
            <g id="p-bufanda-22" transform="matrix(1, 0, 0, 1, -51.91, 17.3)">
              <path d="M -14.3 26.4 C -12.3 20.4 -3.7 18.5 -6.6 13.6" stroke="#ef4444" strokeWidth="2.2" fill="none" strokeLinecap="round" id="p-buf-c-22"/>
              <path d="M -7.6 13.4 C -2.6 12.4 3 11 7 9 C 5 7 0.2 10.4 -6.7 12.4 Z" fill="#ef4444" id="p-buf-cr-22"/>
            </g>
            <circle cx="-67.91" cy="33.303" r="2.2" fill="#f4f4f5" id="p-ojo-b-22"/>
            <circle cx="-68.1" cy="31.8" r="1" fill="#000000" id="p-ojo-p-22"/>
            <polygon points="-70.9 26.3 -67.9 19.3 -64.9 26.3" fill="#f59e0b" id="p-pico-22"/>
            <path d="M -32.4 31.7 L -25.7 26.6 L -25.7 33.7 Z" fill="#f59e0b" id="p-pata-sup-22"/>
            <path d="M -56.3 37.2 C -56 42 -40 37 -56.6 14.8" strokeWidth="2.5" strokeLinecap="round" stroke="#000000" fill="none" id="p-aleta-22"/>
          </g>
        </motion.g>
      </g>

      {/* PATRÓN OSCURO: Personaje Hostil/Furioso */}
      <motion.g
        id="grupo-patron-oscuro-22"
        animate={{
          x: [0, -2, 2, -1, 0, 1, -1, 0],
          y: [0, 1, -2, 1, 0, -1, 1, 0],
          skewX: [0, 2, -2, 1, 0, -1, 0, 0]
        }}
        transition={{
          repeat: Infinity,
          duration: 0.25,
          ease: "linear"
        }}
        style={{ originX: '145px', originY: '55px' }}
      >
        {/* Cuerpo del Patrón Oscuro */}
        <g id="patron-figura-22" transform="matrix(0.204386, 0, 0, 0.179566, 109.414691, 19.192984)">
          <path id="tentaculo-izq-22" d="M 76.803 196.156 C 71.563 178.814 115.955 225.818 91.894 280.699"
            strokeLinecap="round" stroke="#000000" fill="none"
            style={{ transformBox: 'fill-box', transformOrigin: '50% 50%', strokeWidth: '10.418px' }}
            transform="matrix(0, 1.138222, -0.878563, 0, 0.000028, -0.00001)"/>
          
          <polygon id="cuerpo-rombo-22" points="128.429 358.794 101.59 118.309 301.567 121.718 268.414 361.179"
            fill="url(#teselacion-hostil-22)" stroke="#ef4444" strokeWidth="2.5"
            style={{ transformOrigin: '200px 240px' }}/>

          {/* Núcleo inestable */}
          <motion.polygon id="nucleo-rombo-22" points="155.035 148.511 180.035 168.511 155.035 188.511 130.035 168.511"
            animate={{ fill: ["#ef4444", "#a855f7", "#f97316", "#ef4444"] }}
            transition={{ repeat: Infinity, duration: 1, ease: "easeInOut" }}/>
          <line id="nucleo-linea-22"
            x1="148.611" y1="158.732" x2="155.035" y2="182.988"
            stroke="#020408" strokeWidth="3"/>

          <path id="tentaculo-der-22" d="M 116.335 196.849 C 111.095 179.508 166.823 207.174 115.253 292.447"
            strokeLinecap="round" stroke="#000000" fill="none"
            style={{ strokeWidth: '10.418px', transformBox: 'fill-box', transformOrigin: '50% 50%' }}
            transform="matrix(0, 1.138222, -0.878563, 0, -0.000013, 0.000012)"/>
        </g>
      </motion.g>

      {/* Partículas hostiles */}
      <g id="particulas-hostiles-22">
        <motion.circle cx="160" cy="30" r="1.5" fill="#ef4444"
          animate={{ y: [-15, 10], opacity: [0, 0.8, 0] }}
          transition={{ repeat: Infinity, duration: 1.5, ease: "easeOut" }}
          id="p-h1-22"
        />
        <motion.circle cx="130" cy="80" r="1" fill="#f97316"
          animate={{ y: [-10, 15], opacity: [0, 0.7, 0] }}
          transition={{ repeat: Infinity, duration: 1.2, ease: "easeOut", delay: 0.2 }}
          id="p-h2-22"
        />
      </g>
    </svg>
  );
}
