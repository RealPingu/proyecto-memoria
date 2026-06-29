'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

// ==========================================
// COMPONENTES DE EFECTOS DE TEXTO EN LOOP
// ==========================================

// 1. Wave Floating (Onda marina)
export function WaveFloatingText({ text }: { text: string }) {
  const letters = Array.from(text);
  return (
    <span className="leading-relaxed tracking-wide select-none inline-block text-sky-400">
      {letters.map((c, i) => c === ' ' ? <span key={i}>&nbsp;</span> : (
        <motion.span key={i} className="inline-block" animate={{ y: [-1.5, 1.5, -1.5] }} transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut", delay: i * 0.04 }}>
          {c}
        </motion.span>
      ))}
    </span>
  );
}

// 2. Rainbow Shimmer
export function RainbowShimmer({ text }: { text: string }) {
  const words = text.split(' ');
  return (
    <span className="inline-flex flex-wrap gap-x-1 font-medium">
      {words.map((w, i) => {
        const special = w.includes('Oscuro') || w.includes('Trampa') || w.includes('"') || w.startsWith('#');
        return special ? (
          <motion.span key={i} className="font-black bg-gradient-to-r from-red-500 via-purple-500 to-indigo-500 bg-clip-text text-transparent inline-block" style={{ backgroundSize: '200% 200%' }} animate={{ backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'] }} transition={{ repeat: Infinity, duration: 4, ease: "linear" }}>
            {w.replace(/#/g, '')}
          </motion.span>
        ) : <span key={i} className="text-zinc-400">{w.replace(/#/g, '')}</span>;
      })}
    </span>
  );
}

// 3. Action Jitter Shake (Temblor errático)
export function BattleImpactShake({ text }: { text: string }) {
  const words = text.split(' ');
  return (
    <span className="inline-flex flex-wrap gap-x-1 font-bold font-mono">
      {words.map((w, i) => {
        const impact = w.startsWith('¡') || w.endsWith('!') || w.includes('Camo') || w.includes('Pagar');
        return impact ? (
          <motion.span key={i} className="text-red-500 uppercase tracking-wider drop-shadow-[0_0_8px_rgba(239,68,68,0.4)] bg-red-950/20 px-1 border border-red-500/20 rounded-sm inline-block animate-pulse" animate={{ x: [0, -1.2, 1.2, -1.2, 0], y: [0, 1.2, -1.2, 1.2, 0], rotate: [0, 1, -1, 1, 0] }} transition={{ repeat: Infinity, duration: 0.2 }}>
            {w.replace(/#/g, '')}
          </motion.span>
        ) : <span key={i} className="text-zinc-100 uppercase tracking-wide">{w.replace(/#/g, '')}</span>;
      })}
    </span>
  );
}

// 4. Holo Glitch Flicker
export function HoloDigitalGlitch({ text }: { text: string }) {
  const letters = Array.from(text);
  return (
    <span className="leading-relaxed tracking-wider select-none font-mono text-xs text-lime-400 inline-block">
      {letters.map((c, i) => {
        const sp = c === '1' || c === '0' || c === '%' || c === '$' || c === '"';
        return (
          <motion.span key={i} className={`inline-block ${sp ? 'text-amber-400 font-black' : ''}`} animate={sp ? { opacity: [1, 0.2, 1, 0.7, 1], skewX: [0, 18, -18, 0] } : { opacity: [1, 0.9, 1] }} transition={{ repeat: Infinity, duration: 3.5, ease: "linear", delay: i * 0.05 }}>
            {c}
          </motion.span>
        );
      })}
    </span>
  );
}

// 5. Fear Tremble (Pánico / Nervioso)
export function FearTremble({ text }: { text: string }) {
  const letters = Array.from(text);
  return (
    <span className="leading-relaxed select-none font-medium italic text-purple-300 inline-block">
      {letters.map((c, i) => c === ' ' ? <span key={i}>&nbsp;</span> : (
        <motion.span key={i} className="inline-block" animate={{ x: [0, -0.6, 0.6, -0.4, 0], y: [0, 0.4, -0.4, 0.4, 0] }} transition={{ repeat: Infinity, duration: 0.16, ease: "linear", delay: (i % 6) * 0.02 }}>
          {c}
        </motion.span>
      ))}
    </span>
  );
}

// 6. Pulse Breathe (Monólogo introspectivo)
export function PulseBreathe({ text }: { text: string }) {
  const words = text.split(' ');
  return (
    <span className="inline-flex flex-wrap gap-x-1 font-medium text-zinc-300">
      {words.map((w, i) => {
        const spec = w.startsWith('#') || w.includes('"');
        return (
          <motion.span key={i} className={`inline-block ${spec ? 'text-amber-400 font-bold' : ''}`} animate={{ scale: [1, 1.06, 1], opacity: [0.85, 1, 0.85] }} transition={{ repeat: Infinity, duration: 2.6, ease: "easeInOut", delay: i * 0.12 }}>
            {w.replace(/#/g, '')}
          </motion.span>
        );
      })}
    </span>
  );
}

// 7. Sparkling Glow (Destellos neón)
export function SparklingGlow({ text }: { text: string }) {
  const words = text.split(' ');
  return (
    <span className="inline-flex flex-wrap gap-x-1 font-medium text-zinc-200">
      {words.map((w, i) => {
        const spec = w.startsWith('#') || w.includes('"');
        return (
          <motion.span key={i} className={`inline-block px-1 rounded-sm ${spec ? 'text-yellow-300 font-bold bg-yellow-950/20 border border-yellow-500/20' : 'text-zinc-200'}`} animate={spec ? { textShadow: ["0 0 3px rgba(234,179,8,0.2)", "0 0 10px rgba(234,179,8,0.6)", "0 0 3px rgba(234,179,8,0.2)"], opacity: [0.9, 1, 0.9] } : { textShadow: ["0 0 0px rgba(255,255,255,0)", "0 0 4px rgba(255,255,255,0.25)", "0 0 0px rgba(255,255,255,0)"] }} transition={{ repeat: Infinity, duration: 1.6 + (i % 3) * 0.3, ease: "easeInOut" }}>
            {w.replace(/#/g, '')}
          </motion.span>
        );
      })}
    </span>
  );
}

// 8. HighlightText (Legacy quote style wave)
export function HighlightText({ text, isDarkPatternTheme }: { text: string; isDarkPatternTheme: boolean }) {
  const chars = Array.from(text.toUpperCase());
  return (
    <span 
      style={{
        WebkitTextStroke: isDarkPatternTheme ? '0.8px #22d3ee' : '0.8px #ffffff',
        display: 'inline-block'
      }}
      className="font-bold mx-1 select-none"
    >
      {chars.map((char, charIdx) => (
        <motion.span 
          key={charIdx} 
          style={isDarkPatternTheme ? {
            display: 'inline-block',
            whiteSpace: 'pre'
          } : {
            display: 'inline-block',
            whiteSpace: 'pre',
            color: '#000000',
            textShadow: '0 0 3px #ffffff, 0 0 6px #ffffff, 0 0 1px #ffffff'
          }}
          animate={isDarkPatternTheme ? { 
            y: [0, -3.5, 0],
            color: ['#090d16', '#22d3ee', '#0891b2', '#090d16'],
            textShadow: [
              '0 0 3px #06b6d4, 0 0 6px #0891b2, 0 0 1px #000',
              '0 0 8px #22d3ee, 0 0 15px #06b6d4, 0 0 2px #000',
              '0 0 3px #06b6d4, 0 0 6px #0891b2, 0 0 1px #000'
            ]
          } : {
            y: [0, -3.5, 0]
          }}
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

