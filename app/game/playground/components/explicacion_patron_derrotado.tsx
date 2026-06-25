'use client';

import React from 'react';

interface ExplicacionPatronProps {
  children?: React.ReactNode;
}

export default function ExplicacionPatronDerrotado({ children }: ExplicacionPatronProps) {
  return (
    <div className="w-full h-full flex items-center justify-center">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 200 120"
        className="w-full h-full select-none"
      >
        <defs>
          <pattern
            id="teselacion-derrotado"
            width="40"
            height="40"
            patternUnits="userSpaceOnUse"
            patternTransform="matrix(0.999888, 0.017041, -0.013154, 0.999888, 3.179298, -3.381333)"
          >
            <polygon points="0,0 20,10 20,30 0,20" fill="#111827" stroke="#020408" strokeWidth="0.5" />
            <polygon points="20,10 40,0 40,20 20,30" fill="#1f2937" stroke="#020408" strokeWidth="0.5" />
            <polygon points="0,20 20,30 20,40 0,40" fill="#0f172a" stroke="#020408" strokeWidth="0.5" />
            <polygon points="20,30 40,20 40,40 20,40" fill="#1e1b4b" stroke="#020408" strokeWidth="0.5" />
          </pattern>
          <linearGradient id="gradient-derrotado" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0" stopColor="#38bdf8" stopOpacity="0.35" />
            <stop offset="1" stopColor="#bae6fd" stopOpacity="0.05" />
          </linearGradient>
        </defs>

        {/* Patrón Oscuro Derrotado Visual Area */}
        <g transform="matrix(0.204386, 0, 0, 0.179566, -4.666832, 27.007884)">
          <polygon
            points="128.429 358.794 101.59 118.309 301.567 121.718 268.414 361.179"
            fill="url(#teselacion-derrotado)"
            stroke="#06b6d4"
            strokeWidth="1.5"
            style={{ transformOrigin: '200px 240px' }}
          />
          {/* Núcleo normal / debilitado */}
          <polygon points="199.355 143.494 224.355 163.494 199.355 183.494 174.355 163.494" fill="#22d3ee" style={{ strokeWidth: 1 }} />
          <line x1="199.2" y1="156.308" x2="199.233" y2="178.139" stroke="#020408" strokeWidth="3" />
          <path
            id="path-4"
            d="M 236.683 190.788 C 236.768 160.719 30.49 143.249 5.792 200.497"
            strokeLinecap="round"
            stroke="rgb(0, 0, 0)"
            fill="none"
            style={{ strokeWidth: '10.418px', transformBox: 'fill-box', transformOrigin: '50% 50%' }}
            transform="matrix(0, 1.138222, -0.878563, 0, 173.238709, -88.266157)"
          />
          <path
            id="path-2"
            d="M 75.738 201.005 C 116.294 216.393 -94.074 296.062 -118.69 217.352"
            strokeLinecap="round"
            stroke="rgb(0, 0, 0)"
            fill="none"
            style={{ strokeWidth: '10.418px', transformBox: 'fill-box', transformOrigin: '50% 50%' }}
            transform="matrix(0, 1.138222, -0.878563, 0, 107.697706, -100.735253)"
          />
          <path
            id="path-5"
            d="M 290.789 104.643 C 303.944 95.555 312.963 142.37 302.915 142.733"
            strokeLinecap="round"
            style={{ fill: 'none', stroke: 'rgb(255, 255, 255)', strokeWidth: '5.20898px', transformOrigin: '229.064px 64.631px' }}
            transform="matrix(0, 1.138222, -0.878563, 0, 0.000009, -0.000024)"
          />
          <path
            id="path-1"
            d="M 343.594 97.477 C 357.667 88.262 344.376 130.034 333.627 130.402"
            strokeLinecap="round"
            style={{ fill: 'none', stroke: 'rgb(255, 255, 255)', strokeWidth: '5.253', transformOrigin: '266.454px 59.937px' }}
            transform="matrix(0, 1.138222, -0.878563, 0, -0.000011, 0.000017)"
          />
        </g>

        {/* Cuadro de Explicación (Polygon) */}
        <g id="group-2" transform="matrix(1.606447, 0, 0, 1.647757, -71.486162, -198.872565)">
          <polygon
            points="162.468 127.998 161.752 183.598 79.743 182.96 83.595 128.424"
            fill="url(#gradient-derrotado)"
            stroke="#22d3ee"
            strokeWidth="0.3"
          />
        </g>

        {/* Zona del Texto usando foreignObject */}
        <foreignObject x="61" y="16" width="122" height="86">
          <div className="w-full h-full text-cyan-100 font-sans p-1.5 overflow-y-auto custom-scrollbar select-text text-[5px] md:text-[5.5px] leading-[7px] md:leading-[8px] flex flex-col justify-start space-y-1">
            {children}
          </div>
        </foreignObject>
      </svg>
    </div>
  );
}
