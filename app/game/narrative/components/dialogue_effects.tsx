'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

// ==========================================
// COMPONENTES DE EFECTOS DE TEXTO EN LOOP
// ==========================================

// 1. Wave Floating (Onda marina)
export function WaveFloatingText({ text, color }: { text: string; color?: string }) {
  const letters = Array.from(text);
  return (
    <span className="leading-relaxed tracking-wide select-none inline-block" style={{ color: color || '#38bdf8' }}>
      {letters.map((c, i) => c === ' ' ? <span key={i}>&nbsp;</span> : (
        <motion.span key={i} className="inline-block" animate={{ y: [-1.5, 1.5, -1.5] }} transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut", delay: i * 0.04 }}>
          {c}
        </motion.span>
      ))}
    </span>
  );
}

// 2. Rainbow Shimmer
export function RainbowShimmer({ text, color }: { text: string; color?: string }) {
  const words = text.split(' ');
  return (
    <span className="inline-flex flex-wrap gap-x-1 font-medium">
      {words.map((w, i) => {
        const special = w.includes('Oscuro') || w.includes('Trampa') || w.includes('"') || w.startsWith('#');
        return special ? (
          <motion.span 
            key={i} 
            className="font-black bg-gradient-to-r inline-block text-transparent bg-clip-text" 
            style={{ 
              backgroundImage: color ? `linear-gradient(to right, ${color}, ${color})` : 'linear-gradient(to right, #ef4444, #a855f7, #6366f1)',
              backgroundSize: '200% 200%' 
            }} 
            animate={{ backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'] }} 
            transition={{ repeat: Infinity, duration: 4, ease: "linear" }}
          >
            {w.replace(/#/g, '')}
          </motion.span>
        ) : <span key={i} className="text-zinc-400" style={{ color }}>{w.replace(/#/g, '')}</span>;
      })}
    </span>
  );
}

// 3. Action Jitter Shake (Temblor errático)
export function BattleImpactShake({ text, color }: { text: string; color?: string }) {
  const words = text.split(' ');
  return (
    <span className="inline-flex flex-wrap gap-x-1 font-bold font-mono">
      {words.map((w, i) => (
        <motion.span 
          key={i} 
          className="tracking-wider px-1 border rounded-sm inline-block animate-pulse" 
          style={{ 
            color: color || '#ef4444', 
            borderColor: color ? `${color}40` : 'rgba(239, 68, 68, 0.2)', 
            backgroundColor: color ? `${color}15` : 'rgba(239, 68, 68, 0.1)',
            textShadow: color ? `0 0 8px ${color}` : '0 0 8px rgba(239, 68, 68, 0.4)'
          }} 
          animate={{ x: [0, -1.2, 1.2, -1.2, 0], y: [0, 1.2, -1.2, 1.2, 0], rotate: [0, 1, -1, 1, 0] }} 
          transition={{ repeat: Infinity, duration: 0.2 }}
        >
          {w.replace(/#/g, '')}
        </motion.span>
      ))}
    </span>
  );
}

// 4. Holo Glitch Flicker
export function HoloDigitalGlitch({ text, color }: { text: string; color?: string }) {
  const letters = Array.from(text);
  return (
    <span className="leading-relaxed tracking-wider select-none font-mono text-xs inline-block" style={{ color: color || '#84cc16' }}>
      {letters.map((c, i) => {
        const sp = c === '1' || c === '0' || c === '%' || c === '$' || c === '"';
        return (
          <motion.span key={i} className={`inline-block ${sp ? 'text-amber-400 font-black' : ''}`} animate={sp ? { opacity: [1, 0.2, 1, 0.7, 1], skewX: [0, 18, -18, 0] } : { opacity: [1, 0.9, 1] }} transition={{ repeat: Infinity, duration: 3.5, ease: "linear", delay: i * 0.05 }} style={sp && color ? { color } : undefined}>
            {c}
          </motion.span>
        );
      })}
    </span>
  );
}

// 5. Fear Tremble (Pánico / Nervioso)
export function FearTremble({ text, color }: { text: string; color?: string }) {
  const letters = Array.from(text);
  return (
    <span className="leading-relaxed select-none font-medium italic inline-block" style={{ color: color || '#d8b4fe' }}>
      {letters.map((c, i) => c === ' ' ? <span key={i}>&nbsp;</span> : (
        <motion.span key={i} className="inline-block" animate={{ x: [0, -0.6, 0.6, -0.4, 0], y: [0, 0.4, -0.4, 0.4, 0] }} transition={{ repeat: Infinity, duration: 0.16, ease: "linear", delay: (i % 6) * 0.02 }}>
          {c}
        </motion.span>
      ))}
    </span>
  );
}

// 6. Pulse Breathe (Monólogo introspectivo)
export function PulseBreathe({ text, color }: { text: string; color?: string }) {
  const words = text.split(' ');
  return (
    <span className="inline-flex flex-wrap gap-x-1 font-medium text-zinc-300">
      {words.map((w, i) => {
        const spec = w.startsWith('#') || w.includes('"');
        return (
          <motion.span key={i} className={`inline-block ${spec ? 'text-amber-400 font-bold' : ''}`} animate={{ scale: [1, 1.06, 1], opacity: [0.85, 1, 0.85] }} transition={{ repeat: Infinity, duration: 2.6, ease: "easeInOut", delay: i * 0.12 }} style={spec && color ? { color } : (color ? { color } : undefined)}>
            {w.replace(/#/g, '')}
          </motion.span>
        );
      })}
    </span>
  );
}

// 7. Sparkling Glow (Destellos neón)
export function SparklingGlow({ text, color }: { text: string; color?: string }) {
  const words = text.split(' ');
  return (
    <span className="inline-flex flex-wrap gap-x-1 font-medium text-zinc-200">
      {words.map((w, i) => {
        const spec = w.startsWith('#') || w.includes('"');
        return (
          <motion.span key={i} className={`inline-block px-1 rounded-sm ${spec ? 'text-yellow-300 font-bold bg-yellow-950/20 border border-yellow-500/20' : 'text-zinc-200'}`} animate={spec ? { textShadow: ["0 0 3px rgba(234,179,8,0.2)", "0 0 10px rgba(234,179,8,0.6)", "0 0 3px rgba(234,179,8,0.2)"], opacity: [0.9, 1, 0.9] } : { textShadow: ["0 0 0px rgba(255,255,255,0)", "0 0 4px rgba(255,255,255,0.25)", "0 0 0px rgba(255,255,255,0)"] }} transition={{ repeat: Infinity, duration: 1.6 + (i % 3) * 0.3, ease: "easeInOut" }} style={spec && color ? { color, borderColor: `${color}40` } : (color ? { color } : undefined)}>
            {w.replace(/#/g, '')}
          </motion.span>
        );
      })}
    </span>
  );
}

// 8. HighlightText (Legacy quote style wave)
export function HighlightText({ text, isDarkPatternTheme, color }: { text: string; isDarkPatternTheme: boolean; color?: string }) {
  const chars = Array.from(text.toUpperCase());
  return (
    <span 
      style={{
        WebkitTextStroke: color ? `0.8px ${color}` : (isDarkPatternTheme ? '0.8px #22d3ee' : '0.8px #ffffff'),
        display: 'inline-block'
      }}
      className="font-bold mx-1 select-none"
    >
      {chars.map((char, charIdx) => (
        <motion.span 
          key={charIdx} 
          style={color ? {
            display: 'inline-block',
            whiteSpace: 'pre',
            color: '#000000',
            textShadow: `0 0 3px ${color}, 0 0 6px ${color}, 0 0 1px ${color}`
          } : (isDarkPatternTheme ? {
            display: 'inline-block',
            whiteSpace: 'pre'
          } : {
            display: 'inline-block',
            whiteSpace: 'pre',
            color: '#000000',
            textShadow: '0 0 3px #ffffff, 0 0 6px #ffffff, 0 0 1px #ffffff'
          })}
          animate={color ? {
            y: [0, -3.5, 0]
          } : (isDarkPatternTheme ? { 
            y: [0, -3.5, 0],
            color: ['#090d16', '#22d3ee', '#0891b2', '#090d16'],
            textShadow: [
              '0 0 3px #06b6d4, 0 0 6px #0891b2, 0 0 1px #000',
              '0 0 8px #22d3ee, 0 0 15px #06b6d4, 0 0 2px #000',
              '0 0 3px #06b6d4, 0 0 6px #0891b2, 0 0 1px #000'
            ]
          } : {
            y: [0, -3.5, 0]
          })}
          transition={{ 
            repeat: Infinity, 
            duration: isDarkPatternTheme ? 2.8 : 2.2, 
            ease: "easeInOut" as const,
            delay: charIdx * (isDarkPatternTheme ? 0.14 : 0.12)
          }}
        >
          {char}
        </motion.span>
      ))}
    </span>
  );
}

// 9. Sneaky Stealth (Puntillas de ladrón)
export function SneakyStealthText({ text, color }: { text: string; color?: string }) {
  const letters = Array.from(text);
  return (
    <span className="leading-relaxed tracking-wide select-none inline-block font-mono text-xs" style={{ color: color || '#7ba077' }}>
      {letters.map((c, i) => {
        if (c === ' ') return <span key={i}>&nbsp;</span>;
        
        // Alternar izquierdo/derecho (pares e impares) como pies reales en marcha
        const isLeftFoot = i % 2 === 0;
        const delay = isLeftFoot ? 0 : 1.4; // Para un ciclo lento de 2.8s
        
        return (
          <motion.span 
            key={i} 
            className="inline-block origin-bottom font-bold" 
            animate={{ 
              y: [0, -3.5, 0, 0, 0, 0],
              scaleY: [1, 1.1, 1, 1, 1, 1],
              scaleX: [1, 0.95, 1, 1, 1, 1],
              rotate: isLeftFoot ? [0, 3, 0, 0, 0, 0] : [0, -3, 0, 0, 0, 0]
            }} 
            transition={{ 
              repeat: Infinity, 
              duration: 2.8, 
              ease: "easeInOut", 
              delay: delay 
            }}
          >
            {c}
          </motion.span>
        );
      })}
    </span>
  );
}

// 10. Spooky Ghost (Flotación fantasmal)
export function SpookyGhostText({ text, color }: { text: string; color?: string }) {
  const letters = Array.from(text);
  return (
    <span className="leading-relaxed select-none font-medium italic inline-block font-mono" style={{ color: color || '#c084fc' }}>
      {letters.map((c, i) => c === ' ' ? <span key={i}>&nbsp;</span> : (
        <motion.span 
          key={i} 
          className="inline-block" 
          animate={{ 
            x: [-2, 2, -2],
            y: [-1, 1, -1],
            filter: ['blur(0px)', 'blur(2.5px)', 'blur(0px)'],
            opacity: [0.9, 0.5, 0.9]
          }} 
          transition={{ 
            repeat: Infinity, 
            duration: 3.5, 
            ease: "easeInOut", 
            delay: i * 0.06 
          }}
        >
          {c}
        </motion.span>
      ))}
    </span>
  );
}

// 11. Frenetic Heartbeat (Pulsaciones rápidas)
export function FreneticHeartbeatText({ text, color }: { text: string; color?: string }) {
  const words = text.split(' ');
  return (
    <span className="inline-flex flex-wrap gap-x-2.5 font-bold">
      {words.map((w, i) => (
        <motion.span 
          key={i} 
          className="inline-block" 
          style={{ color: color || '#f43f5e' }}
          animate={{ 
            scale: [1, 1.08, 0.98, 1.08, 1]
          }} 
          transition={{ 
            repeat: Infinity, 
            duration: 2.2, 
            ease: "easeInOut", 
            delay: i * 0.2 
          }}
        >
          {w}
        </motion.span>
      ))}
    </span>
  );
}

