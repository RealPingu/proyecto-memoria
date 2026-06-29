'use client';

import { motion } from 'framer-motion';

export default function Scene23DesenlaceFinal() {
  return (
    <svg
      viewBox="0 0 200 120"
      className="w-full h-full select-none"
      xmlns="http://www.w3.org/2000/svg"
      id="svg-escena-23"
    >
      <defs>
        {/* Fondo estrellado pacífico azul oscuro */}
        <radialGradient id="grad-fondo-final-23" cx="30%" cy="80%" r="80%">
          <stop offset="0%" stopColor="#1e3a8a" stopOpacity="0.25" id="stop-ff1-23"/>
          <stop offset="50%" stopColor="#0f172a" stopOpacity="0.15" id="stop-ff2-23"/>
          <stop offset="100%" stopColor="#020617" stopOpacity="1" id="stop-ff3-23"/>
        </radialGradient>

        <radialGradient id="white-eye-grad-23" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#ffffff" id="stop-eye-w1-23"/>
          <stop offset="70%" stopColor="#f8fafc" id="stop-eye-w2-23"/>
          <stop offset="100%" stopColor="#cbd5e1" id="stop-eye-w3-23"/>
        </radialGradient>

        <pattern id="teselacion-fuga-23" width="40" height="40" patternUnits="userSpaceOnUse">
          <polygon points="0,0 20,10 20,30 0,20" fill="#1e293b" stroke="#000000" strokeWidth="0.5" id="poly-f1-23"/>
          <polygon points="20,10 40,0 40,20 20,30" fill="#0f172a" stroke="#000000" strokeWidth="0.5" id="poly-f2-23"/>
        </pattern>
      </defs>

      {/* Fondo */}
      <rect width="200" height="120" fill="url(#grad-fondo-final-23)" id="bg-rect-23"/>

      {/* Estrellas parpadeantes pacíficas */}
      <g id="estrellas-cielo-23">
        <motion.circle cx="100" cy="20" r="0.8" fill="#ffffff" animate={{ opacity: [0.2, 1, 0.2] }} transition={{ repeat: Infinity, duration: 3 }} id="star-1-23"/>
        <motion.circle cx="150" cy="35" r="1.1" fill="#fef08a" animate={{ opacity: [1, 0.3, 1] }} transition={{ repeat: Infinity, duration: 2.5 }} id="star-2-23"/>
        <motion.circle cx="70" cy="15" r="0.6" fill="#38bdf8" animate={{ opacity: [0.1, 0.8, 0.1] }} transition={{ repeat: Infinity, duration: 4 }} id="star-3-23"/>
        <motion.circle cx="120" cy="45" r="0.7" fill="#ffffff" animate={{ opacity: [0.3, 0.9, 0.3] }} transition={{ repeat: Infinity, duration: 3.5 }} id="star-4-23"/>
      </g>

      {/* PATRÓN OSCURO: Huyendo/Disipándose hacia el extremo superior derecho */}
      <motion.g
        id="grupo-patron-fuga-23"
        initial={{ x: 0, y: 0, scale: 0.9, opacity: 0.8 }}
        animate={{
          x: [0, 30, 85],
          y: [0, -25, -85],
          scale: [0.9, 0.5, 0],
          opacity: [0.8, 0.4, 0]
        }}
        transition={{
          duration: 3.5,
          ease: "easeInOut",
          delay: 0.5
        }}
        style={{ originX: '145px', originY: '55px' }}
      >
        <g id="patron-figura-23" transform="matrix(0.204386, 0, 0, 0.179566, 109.414691, 19.192984)">
          {/* Brazo izquierdo / tentáculo */}
          <path id="tentaculo-izq-23" d="M 76.803 196.156 C 71.563 178.814 115.955 225.818 91.894 280.699" strokeLinecap="round" stroke="#000000" fill="none" style={{ transformBox: 'fill-box', transformOrigin: '50% 50%', strokeWidth: '10.418px' }} transform="matrix(0, 1.138222, -0.878563, 0, 0.000028, -0.00001)"/>
          
          {/* Cuerpo rombo isométrico */}
          <polygon id="cuerpo-rombo-23" points="128.429 358.794 101.59 118.309 301.567 121.718 268.414 361.179" fill="url(#teselacion-fuga-23)" stroke="#0ea5e9" strokeWidth="2.5" style={{ transformOrigin: '200px 240px' }}/>
          
          {/* Núcleo cian central */}
          <polygon id="nucleo-rombo-23" points="155.035 148.511 180.035 168.511 155.035 188.511 130.035 168.511" fill="#0284c7"/>
          <line id="nucleo-linea-23" x1="148.611" y1="158.732" x2="155.035" y2="182.988" stroke="#020408" strokeWidth="3" />
          
          {/* Brazo derecho / tentáculo */}
          <path id="tentaculo-der-23" d="M 116.335 196.849 C 111.095 179.508 166.823 207.174 115.253 292.447" strokeLinecap="round" stroke="#000000" fill="none" style={{ strokeWidth: '10.418px', transformBox: 'fill-box', transformOrigin: '50% 50%' }} transform="matrix(0, 1.138222, -0.878563, 0, -0.000013, 0.000012)"/>
          
          {/* Brillo reflectivo en el borde */}
          <path id="brillo-reflejo-23" d="M 386.098 120.481 C 434.242 133.117 400.957 140.502 385.262 152.43" strokeLinecap="round" style={{ fill: 'none', stroke: '#ffffff', transformOrigin: '273.549px -7.507px', strokeWidth: '5.20898px' }} transform="matrix(0, 1.138222, -0.878563, 0, -0.000058, 0.000053)"/>
        </g>
      </motion.g>

      {/* Partículas de disipación del Patrón */}
      <g id="particulas-disipacion-23">
        <motion.circle cx="170" cy="40" r="1.5" fill="#0ea5e9"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: [0, 2, 0], opacity: [0, 0.8, 0], x: [0, 20], y: [0, -20] }}
          transition={{ duration: 2.5, delay: 1 }}
          id="part-dis-1-23"
        />
        <motion.circle cx="180" cy="30" r="1" fill="#ef4444"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: [0, 1.8, 0], opacity: [0, 0.6, 0], x: [0, 15], y: [0, -15] }}
          transition={{ duration: 2, delay: 1.5 }}
          id="part-dis-2-23"
        />
      </g>

      {/* Ojo Blanco (Subconsciente) - Contemplativo al frente-horizonte (Movido a la derecha x=60) */}
      <g id="ojo-subconsciente-grupo-23" transform="matrix(-0.4, 0, 0, 0.43, 60, 45)">
        <motion.g
          animate={{ y: [-1.5, 1.5, -1.5] }}
          transition={{ repeat: Infinity, duration: 4.5, ease: "easeInOut" }}
          id="ojo-movimiento-23"
        >
          <circle cx="1.96" cy="-10.68" r="18" fill="#ffffff" opacity="0.08" transform="matrix(1.72, 0, 0, 1.26, 10.3, -0.3)" id="ojo-glow-23"/>
          <circle cx="3.7" cy="-5.2" r="10.7" fill="url(#white-eye-grad-23)" strokeWidth="0.5" stroke="#e2e8f0" id="ojo-esclera-23" style={{ transformBox: "fill-box", transformOrigin: "50% 50%" }} transform="matrix(1.4985, -0.537148, 0.642825, 1.013572, 3.086092, -7.914055)"/>
          {/* Ojo Trazo Luz - Modelo Original */}
          <motion.path 
            id="ojo-trazo-luz-23"
            style={{ fill: "none", stroke: "rgb(255, 255, 255)" }} 
            d="M -17.728 -18.374 C -19.172 -20.359 42.448 -40.704 45.523 -36.475 C 48.876 -32.004 13.029 7.732 11.259 5.372" 
            animate={{ opacity: [0.7, 1, 0.7] }}
            transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
          />
          {/* Pupila mirando al frente-derecha hacia la fuga */}
          <circle cx="-1.5" cy="-6.5" r="6.2" fill="#0f172a" id="ojo-pupila-centro-23"/>
          <circle cx="-2.5" cy="-7.5" r="1.8" fill="#ffffff" id="ojo-brillo-pupila-23"/>
        </motion.g>
      </g>
 
      {/* Protagonista (Pingüino) - Mirando al frente */}
      <motion.g
        id="protagonista-animacion-contenedor-23"
        animate={{ y: [0, -0.8, 0] }}
        transition={{ repeat: Infinity, duration: 3.2, ease: "easeInOut" }}
      >
        <g
          id="pinguino-contenedor"
          transform="matrix(0, 0.68277, -0.715834, 0, 88.300479, 104.089099)"
        >
          <path id="pata-superior" d="M -32.417 31.796 L -25.744 26.644 L -25.774 33.746 L -32.417 31.796 Z" fill="#f59e0b"/>
          <ellipse id="cuerpo" cx="-47.91" cy="37.303" rx="20" ry="14" fill="#18181b"/>
          <ellipse id="vientre" cx="-49.91" cy="31.303" rx="14" ry="8" fill="#f4f4f5"/>
          <circle id="cabeza" cx="-67.91" cy="33.303" r="10" fill="#18181b"/>
          <g id="bufanda" transform="matrix(1, 0, 0, 1, -51.910336, 17.303471)">
            <path id="bufanda-cuello" d="M -14.315 26.443 C -12.315 20.443 -3.738 18.577 -6.624 13.624" stroke="#ef4444" strokeWidth="2.2" fill="none" strokeLinecap="round"/>
            <path id="bufanda-caida-roja" d="M -7.663 13.49 C -2.663 12.49 3 11 7 9 C 5 7 0.204 10.408 -6.796 12.408 L -7.663 13.49 Z" fill="#ef4444"/>
            <path id="bufanda-caida-guinda" d="M -6.929 14.898 C -1.929 14.898 2 14 5 13 C 3 11 -0.337 13.357 -7.337 13.357 L -6.929 14.898 Z" fill="#b91c1c"/>
          </g>
          <g id="ojo">
            <circle id="ojo-borde" cx="-67.91" cy="33.303" r="2.2" fill="#f4f4f5"/>
            <circle id="ojo-pupila" cx="-68.454" cy="32.397" r="1.019" fill="#000000"/>
          </g>
          <polygon id="pico" points="-70.91 26.303 -67.91 19.303 -64.91 26.303" fill="#f59e0b"/>
          <g id="patas" transform="matrix(1, 0, 0, 1, -51.910336, 17.303471)">
            <path id="pata-inferior" d="M 26.663 20.735 L 26.851 27.446 L 19.486 24.256 L 26.663 20.735 Z" fill="#f59e0b"/>
          </g>
          <path id="aleta" d="M -56.369 37.201 C -57.631 41.252 -39.926 36.511 -37.926 32.511" strokeWidth="2.5" strokeLinecap="round" stroke="rgb(0, 0, 0)" fill="none"/>
        </g>
      </motion.g>
    </svg>
  );
}
