'use client';

import { motion } from 'framer-motion';

export default function Scene1Sleeping() {
    const renderZs = (xOffset = -67.91, yOffset = 19.303, delayStep = 0, color = "#ef4444") => (
        <g id="sueno-zs" transform={`translate(${xOffset}, ${yOffset})`}>
            <motion.text
                id="z-pequena"
                x="0" y="0"
                fill={color}
                fontSize="4.5"
                fontWeight="bold"
                fontFamily="monospace"
                animate={{
                    opacity: [0, 0.9, 0],
                    y: [-1, -16],
                    x: [0, 2, -2, 0],
                    scale: [0.7, 1.2]
                }}
                transition={{ repeat: Infinity, duration: 3, ease: "easeInOut", delay: delayStep }}
            >
                z
            </motion.text>
            <motion.text
                id="z-mediana"
                x="3" y="-3"
                fill={color}
                fontSize="5.5"
                fontWeight="bold"
                fontFamily="monospace"
                animate={{
                    opacity: [0, 0.8, 0],
                    y: [-3, -25],
                    x: [0, -3, 3, 0],
                    scale: [0.8, 1.3]
                }}
                transition={{ repeat: Infinity, duration: 3, ease: "easeInOut", delay: delayStep + 1.0 }}
            >
                z
            </motion.text>
            <motion.text
                id="z-grande"
                x="6" y="-6"
                fill={color}
                fontSize="7"
                fontWeight="bold"
                fontFamily="monospace"
                animate={{
                    opacity: [0, 0.7, 0],
                    y: [-5, -34],
                    x: [0, 4, -4, 0],
                    scale: [0.9, 1.4]
                }}
                transition={{ repeat: Infinity, duration: 3, ease: "easeInOut", delay: delayStep + 2.0 }}
            >
                Z
            </motion.text>
        </g>
    );

    return (
        <svg viewBox="0 0 200 120" className="w-full h-full">
            <defs>
                {/* Very subtle blue radial gradient for dream atmosphere */}
                <radialGradient id="limbo-blue-pulsing" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stopColor="#1e3a8a" stopOpacity="0.3" />
                    <stop offset="60%" stopColor="#0f172a" stopOpacity="0.1" />
                    <stop offset="100%" stopColor="#09090b" stopOpacity="1" />
                </radialGradient>
            </defs>

            {/* Dark background base */}
            <rect width="200" height="120" fill="#09090b" />

            {/* Pulsing subtle blue glow behind the penguin */}
            <motion.circle
                cx="90"
                cy="70"
                r="75"
                fill="url(#limbo-blue-pulsing)"
                animate={{
                    scale: [0.95, 1.1, 0.95],
                    opacity: [0.7, 0.95, 0.7]
                }}
                transition={{
                    repeat: Infinity,
                    duration: 5,
                    ease: "easeInOut"
                }}
            />

            {/* Penguin group */}
            <g id="pinguino-contenedor" transform="matrix(1, 0, 0, 1, 99.815317, 50.407472)">
                <motion.g
                    id="pinguino-respiracion"
                    animate={{ x: [0, 0.4, 0], y: [0, -0.4, 0] }}
                    transition={{ repeat: Infinity, duration: 3.2, ease: "easeInOut" }}
                >
                    {/* Cuerpo */}
                    <ellipse id="cuerpo" cx="-47.91" cy="37.303" rx="20" ry="14" fill="#18181b" />

                    {/* Vientre */}
                    <ellipse id="vientre" cx="-49.91" cy="31.303" rx="14" ry="8" fill="#f4f4f5" />

                    {/* Cabeza */}
                    <circle id="cabeza" cx="-67.91" cy="33.303" r="10" fill="#18181b" />

                    {/* Bufanda */}
                    <g id="bufanda" transform="matrix(1, 0, 0, 1, -51.910336, 17.303471)">
                        <path id="bufanda-cuello" d="M -14.315 26.443 C -12.315 20.443 -3.738 18.577 -6.624 13.624" stroke="#ef4444" strokeWidth="2.2" fill="none" strokeLinecap="round" />
                        <path id="bufanda-caida-roja" d="M -7.663 13.49 C -2.663 12.49 3 11 7 9 C 5 7 0.204 10.408 -6.796 12.408 L -7.663 13.49 Z" fill="#ef4444" />
                        <path id="bufanda-caida-guinda" d="M -6.929 14.898 C -1.929 14.898 2 14 5 13 C 3 11 -0.337 13.357 -7.337 13.357 L -6.929 14.898 Z" fill="#b91c1c" />
                    </g>

                    {/* Ojo */}
                    <path id="ojo" d="M -70.91 31.303 C -68.91 33.303 -66.91 33.303 -64.91 31.303" stroke="#a1a1aa" strokeWidth="1.2" fill="none" strokeLinecap="round" />

                    {/* Pico */}
                    <polygon id="pico" points="-70.91 26.303 -67.91 19.303 -64.91 26.303" fill="#f59e0b" />

                    {/* Burbuja anime de sueño */}
                    <motion.circle
                        id="burbuja-sueno"
                        cx="-67.91"
                        cy="19.303"
                        r={1}
                        fill="#38bdf8"
                        fillOpacity={0.25}
                        stroke="#0284c7"
                        strokeWidth={0.8}
                        animate={{
                            r: [1, 7, 1],
                            cy: [19.303, 13.303, 19.303]
                        }}
                        transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
                    />

                    {/* Patas */}
                    <g id="patas" transform="matrix(1, 0, 0, 1, -51.910336, 17.303471)">
                        <path id="pata-superior" d="M18,13 L26,11 L25,18 Z" fill="#f59e0b" />
                        <path id="pata-inferior" d="M20,22 L28,24 L25,30 Z" fill="#f59e0b" />
                    </g>

                    {/* Aleta */}
                    <path id="aleta" d="M -56.369 37.201 C -57.631 41.252 -39.926 36.511 -37.926 32.511" strokeWidth="2.5" strokeLinecap="round" stroke="rgb(0, 0, 0)" fill="none" />

                    {/* Zs floating above head */}
                    {renderZs(-67.91, 19.303, 0.3, "#ef4444")}
                </motion.g>
            </g>
        </svg>
    );
}
