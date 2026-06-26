import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';

function cleanSvgForReact(svg: string) {
  let cleaned = svg;
  
  // Convert style="..." strings to React style objects
  const styleRegex = /style="([^"]+)"/g;
  cleaned = cleaned.replace(styleRegex, (match, styleStr) => {
    const styleObj = styleStr.split(';').reduce((acc: string[], pair: string) => {
      const [key, val] = pair.split(':').map(s => s.trim());
      if (key && val) {
        const camelKey = key.replace(/-([a-z])/g, (g) => g[1].toUpperCase());
        acc.push(`${camelKey}: "${val}"`);
      }
      return acc;
    }, []);
    return `style={{ ${styleObj.join(', ')} }}`;
  });

  // Convert kebab-case attributes to camelCase React properties
  return cleaned
    .replace(/stroke-width=/g, 'strokeWidth=')
    .replace(/stroke-linecap=/g, 'strokeLinecap=')
    .replace(/fill-opacity=/g, 'fillOpacity=')
    .replace(/stroke-linejoin=/g, 'strokeLinejoin=')
    .replace(/stroke-dasharray=/g, 'strokeDasharray=')
    .replace(/fill-rule=/g, 'fillRule=')
    .replace(/clip-rule=/g, 'clipRule=')
    .replace(/stroke-opacity=/g, 'strokeOpacity=');
}

export async function POST(request: Request) {
  try {
    const { svgCode } = await request.json();

    if (!svgCode) {
      return NextResponse.json({ error: 'svgCode is required' }, { status: 400 });
    }

    // Extract the inner content of <g id="pinguino-contenedor" transform="..."> ... </g>
    const containerMatch = svgCode.match(/<g\s+id="pinguino-contenedor"[^>]*transform="([^"]+)"[^>]*>([\s\S]*?)<\/g>\s*<\/svg>/i);
    
    if (!containerMatch) {
      return NextResponse.json({ 
        error: 'No se encontró el contenedor <g id="pinguino-contenedor"> en tu SVG. Asegúrate de conservar este ID.' 
      }, { status: 400 });
    }

    const transformAttr = containerMatch[1];
    let innerContent = containerMatch[2].trim();

    // Find the bubble coordinates (burbuja-sueno)
    const bubbleMatch = innerContent.match(/<circle\s+id="burbuja-sueno"[^>]*cx="([^"]+)"[^>]*cy="([^"]+)"/i);
    let bubbleCx = "-67.91";
    let bubbleCy = "19.303";

    if (bubbleMatch) {
      bubbleCx = bubbleMatch[1];
      bubbleCy = bubbleMatch[2];
      // Remove static bubble so we can replace it with the animated Framer Motion version
      innerContent = innerContent.replace(/<circle\s+id="burbuja-sueno"[^>]*\/?>/gi, '');
    }

    // Clean up style tags and kebab-case for React
    let reactInner = cleanSvgForReact(innerContent);

    // Create the animated components
    const animatedBubble = `
          <motion.circle
            id="burbuja-sueno"
            cx="${bubbleCx}"
            cy="${bubbleCy}"
            r={1}
            fill="#38bdf8"
            fillOpacity={0.25}
            stroke="#0284c7"
            strokeWidth={0.8}
            animate={{
              r: [1, 7, 1],
              cy: [${bubbleCy}, ${parseFloat(bubbleCy) - 6}, ${bubbleCy}]
            }}
            transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
          />`;

    reactInner += animatedBubble;
    reactInner += `\n          {renderZs(${bubbleCx}, ${bubbleCy}, 0.3, "#ef4444")}`;

    // Construct the full component file
    const componentCode = `'use client';

import { motion } from 'framer-motion';

export default function Scene1Sleeping() {
  const renderZs = (xOffset = -67.91, yOffset = 19.303, delayStep = 0, color = "#ef4444") => (
    <g id="sueno-zs" transform={\`translate(\${xOffset}, \${yOffset})\`}>
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
      <rect id="fondo-oscuro" width="200" height="120" fill="#000000" />
      <g id="pinguino-contenedor" transform="${transformAttr}">
        <motion.g
          id="pinguino-respiracion"
          animate={{ x: [0, 0.4, 0], y: [0, -0.4, 0] }}
          transition={{ repeat: Infinity, duration: 3.2, ease: "easeInOut" }}
        >
          ${reactInner}
        </motion.g>
      </g>
    </svg>
  );
}
`;

    // Ensure components folder exists and save it there
    const dirPath = path.join(process.cwd(), 'app', 'game', 'playground', 'components');
    await fs.mkdir(dirPath, { recursive: true });
    
    const filePath = path.join(dirPath, 'scene_1_sleeping.tsx');
    await fs.writeFile(filePath, componentCode, 'utf-8');

    return NextResponse.json({ success: true, message: 'Asset guardado con éxito.' });
  } catch (error: any) {
    console.error('Error in save-svg API:', error);
    return NextResponse.json({ error: error.message || 'Error en el servidor.' }, { status: 500 });
  }
}
