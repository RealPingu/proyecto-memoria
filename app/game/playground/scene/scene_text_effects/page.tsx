'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';

// ==========================================
// SECCIÓN 1: EFECTOS DE ENTRADA (15 ENTRADAS)
// ==========================================

// 1. Bouncy Typewriter
function BouncyTypewriter({ text, trigger }: { text: string; trigger: number }) {
  const words = text.split(' ');
  const container = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.08 } }
  };
  const item = {
    hidden: { y: 15, opacity: 0, scale: 0.8 },
    visible: { y: 0, opacity: 1, scale: 1, transition: { type: "spring" as const, damping: 11, stiffness: 100 } }
  };
  return (
    <motion.div key={trigger} variants={container} initial="hidden" animate="visible" className="flex flex-wrap gap-x-1.5 gap-y-1">
      {words.map((w, i) => (
        <motion.span key={i} variants={item} className={w.includes('"') || w.startsWith('#') ? "text-emerald-400 font-bold" : "text-zinc-300"}>
          {w.replace(/#/g, '')}
        </motion.span>
      ))}
    </motion.div>
  );
}

// 2. Diagonal Split Reveal
function DiagonalSplitReveal({ text, trigger }: { text: string; trigger: number }) {
  const words = text.split(' ');
  const container = { visible: { transition: { staggerChildren: 0.06 } } };
  const item = {
    hidden: { y: "120%", rotate: 4, opacity: 0 },
    visible: { y: 0, rotate: 0, opacity: 1, transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] as const } }
  };
  return (
    <motion.div key={trigger} variants={container} initial="hidden" animate="visible" className="flex flex-wrap gap-x-1.5 gap-y-1">
      {words.map((w, i) => (
        <div key={i} className="overflow-hidden py-0.5 inline-block">
          <motion.span variants={item} className={`inline-block ${w.includes('"') || w.startsWith('#') ? "text-pink-400 font-bold" : "text-zinc-200"}`}>
            {w.replace(/#/g, '')}
          </motion.span>
        </div>
      ))}
    </motion.div>
  );
}

// Helper para Matrix Code Rain
function MatrixChar({ char, delay }: { char: string; delay: number }) {
  const [resolved, setResolved] = useState(false);
  const [displayChar, setDisplayChar] = useState('');
  const chars = '0123456789@#$%&*§±+=<>?/\\';

  useEffect(() => {
    setResolved(false);
    setDisplayChar('');
    const startCycle = setTimeout(() => {
      let count = 0;
      const symbolTimer = setInterval(() => {
        if (count >= 5) {
          setDisplayChar(char);
          setResolved(true);
          clearInterval(symbolTimer);
        } else {
          setDisplayChar(chars[Math.floor(Math.random() * chars.length)]);
          count++;
        }
      }, 55);
    }, delay * 1000);
    return () => clearTimeout(startCycle);
  }, [char, delay]);

  return (
    <span className={resolved ? "text-emerald-400 font-bold" : "text-emerald-500/40 font-mono"}>
      {displayChar || '\u00A0'}
    </span>
  );
}

// 3. Matrix Code Rain
function MatrixDigitalRain({ text, trigger }: { text: string; trigger: number }) {
  const letters = Array.from(text);
  return (
    <div key={trigger} className="font-mono text-xs text-emerald-400 leading-relaxed select-none">
      {letters.map((char, index) => (
        <MatrixChar key={index} char={char} delay={index * 0.018} />
      ))}
    </div>
  );
}

// 4. Foggy Vaporize
function FoggyVaporize({ text, trigger }: { text: string; trigger: number }) {
  const letters = Array.from(text);
  const container = { visible: { transition: { staggerChildren: 0.025 } } };
  const item = {
    hidden: { opacity: 0, scale: 1.4, filter: 'blur(7px)', x: -2 },
    visible: { opacity: 1, scale: 1, filter: 'blur(0px)', x: 0, transition: { duration: 0.4, ease: "easeOut" as const } }
  };
  return (
    <motion.div key={trigger} variants={container} initial="hidden" animate="visible" className="leading-relaxed tracking-wide select-none italic text-zinc-300">
      {letters.map((c, i) => c === ' ' ? <span key={i}>&nbsp;</span> : <motion.span key={i} variants={item} className="inline-block">{c}</motion.span>)}
    </motion.div>
  );
}

// 5. Elastic 3D Pop
function Elastic3DPop({ text, trigger }: { text: string; trigger: number }) {
  const words = text.split(' ');
  const container = { visible: { transition: { staggerChildren: 0.08 } } };
  const item = {
    hidden: { opacity: 0, scale: 0.3, rotateX: 85, y: 15 },
    visible: { opacity: 1, scale: 1, rotateX: 0, y: 0, transition: { type: "spring" as const, damping: 10, stiffness: 140 } }
  };
  return (
    <motion.div key={trigger} variants={container} initial="hidden" animate="visible" className="flex flex-wrap gap-x-1.5 gap-y-1.5 font-bold [perspective:400px]">
      {words.map((w, i) => (
        <motion.span key={i} variants={item} className={`inline-block origin-bottom ${w.includes('"') || w.startsWith('#') ? 'text-yellow-400 drop-shadow-[0_2px_4px_rgba(234,179,8,0.3)]' : 'text-zinc-200'}`}>
          {w.replace(/#/g, '')}
        </motion.span>
      ))}
    </motion.div>
  );
}

// 6. Pixel Glitch In (Neon Cyber)
function PixelGlitchIn({ text, trigger }: { text: string; trigger: number }) {
  const words = text.split(' ');
  const container = { visible: { transition: { staggerChildren: 0.09 } } };
  const item = {
    hidden: { opacity: 0, x: -10, skewX: -20 },
    visible: { opacity: [0, 0.8, 0.3, 1], x: 0, skewX: 0, transition: { duration: 0.3, ease: "easeOut" as const } }
  };
  return (
    <motion.div key={trigger} variants={container} initial="hidden" animate="visible" className="flex flex-wrap gap-x-1.5 gap-y-1 font-mono text-xs text-lime-400">
      {words.map((w, i) => (
        <motion.span key={i} variants={item} className={w.includes('"') || w.startsWith('#') ? "text-amber-300 font-bold" : ""}>
          {w.replace(/#/g, '')}
        </motion.span>
      ))}
    </motion.div>
  );
}

// 7. Slide Stagger Left
function SlideStaggerLeft({ text, trigger }: { text: string; trigger: number }) {
  const letters = Array.from(text);
  const container = { visible: { transition: { staggerChildren: 0.015 } } };
  const item = {
    hidden: { x: 100, opacity: 0 },
    visible: { x: 0, opacity: 1, transition: { type: "spring" as const, damping: 13, stiffness: 120 } }
  };
  return (
    <motion.div key={trigger} variants={container} initial="hidden" animate="visible" className="leading-relaxed text-indigo-300">
      {letters.map((c, i) => c === ' ' ? <span key={i}>&nbsp;</span> : <motion.span key={i} variants={item} className="inline-block">{c}</motion.span>)}
    </motion.div>
  );
}

// 8. Drop Bounce Top
function DropBounceTop({ text, trigger }: { text: string; trigger: number }) {
  const words = text.split(' ');
  const container = { visible: { transition: { staggerChildren: 0.1 } } };
  const item = {
    hidden: { y: -60, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { type: "spring" as const, damping: 9, stiffness: 110 } }
  };
  return (
    <motion.div key={trigger} variants={container} initial="hidden" animate="visible" className="flex flex-wrap gap-x-1.5 gap-y-1">
      {words.map((w, i) => (
        <motion.span key={i} variants={item} className={`inline-block ${w.includes('"') || w.startsWith('#') ? "text-red-400 font-black" : "text-zinc-200"}`}>
          {w.replace(/#/g, '')}
        </motion.span>
      ))}
    </motion.div>
  );
}

// 9. Color Fill Ink
function ColorFillInk({ text, trigger }: { text: string; trigger: number }) {
  const words = text.split(' ');
  const container = { visible: { transition: { staggerChildren: 0.12 } } };
  const item = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.45, ease: "easeInOut" as const } }
  };
  return (
    <motion.div key={trigger} variants={container} initial="hidden" animate="visible" className="flex flex-wrap gap-x-1.5 gap-y-1">
      {words.map((w, i) => {
        const special = w.includes('"') || w.startsWith('#');
        return (
          <motion.span key={i} variants={item} className={`inline-block px-1 rounded transition-colors ${special ? "bg-purple-900/30 text-purple-300 font-bold" : "text-zinc-300"}`}>
            {w.replace(/#/g, '')}
          </motion.span>
        );
      })}
    </motion.div>
  );
}

// 10. Scale Flare Zoom
function ScaleFlareZoom({ text, trigger }: { text: string; trigger: number }) {
  const words = text.split(' ');
  const container = { visible: { transition: { staggerChildren: 0.08 } } };
  const item = {
    hidden: { scale: 2.5, opacity: 0, filter: 'brightness(2)' },
    visible: { scale: 1, opacity: 1, filter: 'brightness(1)', transition: { duration: 0.35, ease: "easeOut" as const } }
  };
  return (
    <motion.div key={trigger} variants={container} initial="hidden" animate="visible" className="flex flex-wrap gap-x-1.5 gap-y-1">
      {words.map((w, i) => (
        <motion.span key={i} variants={item} className={`inline-block ${w.includes('"') || w.startsWith('#') ? "text-yellow-400 font-bold drop-shadow-[0_0_8px_rgba(234,179,8,0.5)]" : "text-zinc-300"}`}>
          {w.replace(/#/g, '')}
        </motion.span>
      ))}
    </motion.div>
  );
}

// 11. Wave Rise
function WaveRiseIn({ text, trigger }: { text: string; trigger: number }) {
  const letters = Array.from(text);
  const container = { visible: { transition: { staggerChildren: 0.015 } } };
  const item = {
    hidden: { y: 25, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { type: "spring" as const, damping: 10, stiffness: 80 } }
  };
  return (
    <motion.div key={trigger} variants={container} initial="hidden" animate="visible" className="leading-relaxed text-zinc-300">
      {letters.map((c, i) => c === ' ' ? <span key={i}>&nbsp;</span> : <motion.span key={i} variants={item} className="inline-block">{c}</motion.span>)}
    </motion.div>
  );
}

// 12. Flip Horizontal (Y-axis Rotate)
function FlipHorizontal({ text, trigger }: { text: string; trigger: number }) {
  const words = text.split(' ');
  const container = { visible: { transition: { staggerChildren: 0.1 } } };
  const item = {
    hidden: { rotateY: 90, opacity: 0 },
    visible: { rotateY: 0, opacity: 1, transition: { duration: 0.4, ease: "easeOut" as const } }
  };
  return (
    <motion.div key={trigger} variants={container} initial="hidden" animate="visible" className="flex flex-wrap gap-x-1.5 gap-y-1 [perspective:400px]">
      {words.map((w, i) => (
        <motion.span key={i} variants={item} className={`inline-block origin-left ${w.includes('"') || w.startsWith('#') ? "text-orange-400 font-bold" : "text-zinc-300"}`}>
          {w.replace(/#/g, '')}
        </motion.span>
      ))}
    </motion.div>
  );
}

// 13. Spiral Vortex
function SpiralVortex({ text, trigger }: { text: string; trigger: number }) {
  const letters = Array.from(text);
  const container = { visible: { transition: { staggerChildren: 0.02 } } };
  const item = {
    hidden: { opacity: 0, scale: 0, rotate: -180 },
    visible: { opacity: 1, scale: 1, rotate: 0, transition: { type: "spring" as const, stiffness: 100, damping: 12 } }
  };
  return (
    <motion.div key={trigger} variants={container} initial="hidden" animate="visible" className="leading-relaxed text-pink-300">
      {letters.map((c, i) => c === ' ' ? <span key={i}>&nbsp;</span> : <motion.span key={i} variants={item} className="inline-block">{c}</motion.span>)}
    </motion.div>
  );
}

// 14. Blur Bloom Zoom
function BlurBloomZoom({ text, trigger }: { text: string; trigger: number }) {
  const words = text.split(' ');
  const container = { visible: { transition: { staggerChildren: 0.07 } } };
  const item = {
    hidden: { opacity: 0, scale: 0.6, filter: 'blur(10px)' },
    visible: { opacity: 1, scale: 1, filter: 'blur(0px)', transition: { duration: 0.4, ease: "easeOut" as const } }
  };
  return (
    <motion.div key={trigger} variants={container} initial="hidden" animate="visible" className="flex flex-wrap gap-x-1.5 gap-y-1">
      {words.map((w, i) => (
        <motion.span key={i} variants={item} className="text-zinc-200">
          {w.replace(/#/g, '')}
        </motion.span>
      ))}
    </motion.div>
  );
}

// 15. Simple Slide Up
function SimpleSlideUp({ text, trigger }: { text: string; trigger: number }) {
  const words = text.split(' ');
  const container = { visible: { transition: { staggerChildren: 0.08 } } };
  const item = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.35, ease: "easeOut" as const } }
  };
  return (
    <motion.div key={trigger} variants={container} initial="hidden" animate="visible" className="flex flex-wrap gap-x-1.5 gap-y-1 text-zinc-300 font-medium">
      {words.map((w, i) => (
        <motion.span key={i} variants={item} className="inline-block">
          {w.replace(/#/g, '')}
        </motion.span>
      ))}
    </motion.div>
  );
}

// ==========================================
// SECCIÓN 2: EFECTOS CONTINUOS (15 EN BUCLE)
// ==========================================

// 16. Wave Floating (Onda marina)
function WaveFloating({ text }: { text: string }) {
  const letters = Array.from(text);
  return (
    <div className="leading-relaxed tracking-wide select-none text-sky-400">
      {letters.map((c, i) => c === ' ' ? <span key={i}>&nbsp;</span> : (
        <motion.span key={i} className="inline-block" animate={{ y: [-1.5, 1.5, -1.5] }} transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut", delay: i * 0.04 }}>
          {c}
        </motion.span>
      ))}
    </div>
  );
}

// 17. Rainbow Shimmer
function RainbowShimmer({ text }: { text: string }) {
  const words = text.split(' ');
  return (
    <div className="flex flex-wrap gap-x-1.5 gap-y-1 font-medium">
      {words.map((w, i) => {
        const special = w.includes('Oscuro') || w.includes('Trampa') || w.includes('"') || w.startsWith('#');
        return special ? (
          <motion.span key={i} className="font-black bg-gradient-to-r from-red-500 via-purple-500 to-indigo-500 bg-clip-text text-transparent inline-block" style={{ backgroundSize: '200% 200%' }} animate={{ backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'] }} transition={{ repeat: Infinity, duration: 4, ease: "linear" }}>
            {w.replace(/#/g, '')}
          </motion.span>
        ) : <span key={i} className="text-zinc-400">{w.replace(/#/g, '')}</span>;
      })}
    </div>
  );
}

// 18. Action Jitter Shake (Temblor errático)
function BattleImpactShake({ text }: { text: string }) {
  const words = text.split(' ');
  return (
    <div className="flex flex-wrap gap-x-2 gap-y-1.5 font-bold font-mono">
      {words.map((w, i) => {
        const impact = w.startsWith('¡') || w.endsWith('!') || w.includes('Camo') || w.includes('Pagar');
        return impact ? (
          <motion.span key={i} className="text-red-500 uppercase tracking-wider drop-shadow-[0_0_8px_rgba(239,68,68,0.4)] bg-red-950/20 px-1 border border-red-500/20 rounded-sm inline-block" animate={{ x: [0, -1.2, 1.2, -1.2, 0], y: [0, 1.2, -1.2, 1.2, 0], rotate: [0, 1, -1, 1, 0] }} transition={{ repeat: Infinity, duration: 0.2 }}>
            {w.replace(/#/g, '')}
          </motion.span>
        ) : <span key={i} className="text-zinc-100 uppercase tracking-wide">{w.replace(/#/g, '')}</span>;
      })}
    </div>
  );
}

// 19. Holo Glitch Flicker
function HoloDigitalGlitch({ text }: { text: string }) {
  const letters = Array.from(text);
  return (
    <div className="leading-relaxed tracking-wider select-none font-mono text-xs w-full text-lime-400 block">
      {letters.map((c, i) => {
        const sp = c === '1' || c === '0' || c === '%' || c === '$' || c === '"';
        return (
          <motion.span key={i} className={`inline-block ${sp ? 'text-amber-400 font-black' : ''}`} animate={sp ? { opacity: [1, 0.2, 1, 0.7, 1], skewX: [0, 18, -18, 0] } : { opacity: [1, 0.9, 1] }} transition={{ repeat: Infinity, duration: 3.5, ease: "linear", delay: i * 0.05 }}>
            {c}
          </motion.span>
        );
      })}
    </div>
  );
}

// 20. Fear Tremble (Pánico / Nervioso)
function FearTremble({ text }: { text: string }) {
  const letters = Array.from(text);
  return (
    <div className="leading-relaxed select-none font-medium italic text-purple-300 inline-block w-full">
      {letters.map((c, i) => c === ' ' ? <span key={i}>&nbsp;</span> : (
        <motion.span key={i} className="inline-block" animate={{ x: [0, -0.6, 0.6, -0.4, 0], y: [0, 0.4, -0.4, 0.4, 0] }} transition={{ repeat: Infinity, duration: 0.16, ease: "linear", delay: (i % 6) * 0.02 }}>
          {c}
        </motion.span>
      ))}
    </div>
  );
}

// 21. Pulse Breathe (Monólogo introspectivo)
function PulseBreathe({ text }: { text: string }) {
  const words = text.split(' ');
  return (
    <div className="flex flex-wrap gap-x-1.5 gap-y-1 font-medium text-zinc-300">
      {words.map((w, i) => {
        const spec = w.startsWith('#') || w.includes('"');
        return (
          <motion.span key={i} className={`inline-block ${spec ? 'text-amber-400 font-bold' : ''}`} animate={{ scale: [1, 1.06, 1], opacity: [0.85, 1, 0.85] }} transition={{ repeat: Infinity, duration: 2.6, ease: "easeInOut", delay: i * 0.12 }}>
            {w.replace(/#/g, '')}
          </motion.span>
        );
      })}
    </div>
  );
}

// 22. Sparkling Glow (Destellos neón)
function SparklingGlow({ text }: { text: string }) {
  const words = text.split(' ');
  return (
    <div className="flex flex-wrap gap-x-1.5 gap-y-1 font-medium text-zinc-200">
      {words.map((w, i) => {
        const spec = w.startsWith('#') || w.includes('"');
        return (
          <motion.span key={i} className={`inline-block px-1 rounded-sm ${spec ? 'text-yellow-300 font-bold bg-yellow-950/20 border border-yellow-500/20' : 'text-zinc-200'}`} animate={spec ? { textShadow: ["0 0 3px rgba(234,179,8,0.2)", "0 0 10px rgba(234,179,8,0.6)", "0 0 3px rgba(234,179,8,0.2)"], opacity: [0.9, 1, 0.9] } : { textShadow: ["0 0 0px rgba(255,255,255,0)", "0 0 4px rgba(255,255,255,0.25)", "0 0 0px rgba(255,255,255,0)"] }} transition={{ repeat: Infinity, duration: 1.6 + (i % 3) * 0.3, ease: "easeInOut" }}>
            {w.replace(/#/g, '')}
          </motion.span>
        );
      })}
    </div>
  );
}

// 23. Liquify Flow (Flujo de agua / Sueño)
function LiquifyFlow({ text }: { text: string }) {
  const letters = Array.from(text);
  return (
    <div className="leading-relaxed tracking-wide select-none text-teal-300">
      {letters.map((c, i) => c === ' ' ? <span key={i}>&nbsp;</span> : (
        <motion.span key={i} className="inline-block" animate={{ x: [-1.2, 1.2, -1.2], rotate: [-2, 2, -2] }} transition={{ repeat: Infinity, duration: 3.2, ease: "easeInOut", delay: i * 0.08 }}>
          {c}
        </motion.span>
      ))}
    </div>
  );
}

// 24. Frenetic Heartbeat (Peligro / Adrenalina)
function FreneticHeartbeat({ text }: { text: string }) {
  const words = text.split(' ');
  return (
    <div className="flex flex-wrap gap-x-1.5 gap-y-1 font-bold text-rose-400">
      {words.map((w, i) => (
        <motion.span key={i} className="inline-block" animate={{ scale: [1, 1.15, 1, 1.25, 1], opacity: [0.9, 1, 0.9, 1, 0.9] }} transition={{ repeat: Infinity, duration: 1.1, ease: "easeInOut", delay: (i % 4) * 0.05 }}>
          {w.replace(/#/g, '')}
        </motion.span>
      ))}
    </div>
  );
}

// 25. Radioactive Pulse (Onda verde tóxica)
function RadioactivePulse({ text }: { text: string }) {
  const letters = Array.from(text);
  return (
    <div className="leading-relaxed tracking-wide font-mono text-xs">
      {letters.map((c, i) => c === ' ' ? <span key={i}>&nbsp;</span> : (
        <motion.span key={i} className="inline-block text-emerald-400" animate={{ textShadow: ["0 0 0px rgba(16,185,129,0)", "0 0 10px rgba(16,185,129,0.8)", "0 0 0px rgba(16,185,129,0)"], color: ["#a7f3d0", "#10b981", "#a7f3d0"] }} transition={{ repeat: Infinity, duration: 2, ease: "easeInOut", delay: i * 0.04 }}>
          {c}
        </motion.span>
      ))}
    </div>
  );
}

// 26. Matrix Rain Stream (Casca de opacidad vertical)
function MatrixStream({ text }: { text: string }) {
  const letters = Array.from(text);
  return (
    <div className="font-mono text-xs text-green-400">
      {letters.map((c, i) => (
        <motion.span key={i} className="inline-block" animate={{ opacity: [0.2, 1, 0.2] }} transition={{ repeat: Infinity, duration: 1.8, ease: "linear", delay: i * 0.05 }}>
          {c}
        </motion.span>
      ))}
    </div>
  );
}

// 27. Spooky Ghost (Espíritu flotante)
function SpookyGhost({ text }: { text: string }) {
  const letters = Array.from(text);
  return (
    <div className="leading-relaxed text-zinc-400/90 font-medium">
      {letters.map((c, i) => c === ' ' ? <span key={i}>&nbsp;</span> : (
        <motion.span key={i} className="inline-block" animate={{ x: [-2, 2, -2], y: [-1, 1, -1], filter: ['blur(0px)', 'blur(2px)', 'blur(0px)'], opacity: [0.9, 0.5, 0.9] }} transition={{ repeat: Infinity, duration: 3.5, ease: "easeInOut", delay: i * 0.06 }}>
          {c}
        </motion.span>
      ))}
    </div>
  );
}

// 28. Cyber Scanner (Láser rojo horizontal)
function CyberScanner({ text }: { text: string }) {
  const words = text.split(' ');
  return (
    <div className="flex flex-wrap gap-x-1.5 gap-y-1">
      {words.map((w, i) => (
        <motion.span key={i} className="inline-block text-zinc-300" animate={{ color: ["#d4d4d8", "#ef4444", "#d4d4d8"], textShadow: ["0 0 0px rgba(239,68,68,0)", "0 0 8px rgba(239,68,68,0.7)", "0 0 0px rgba(239,68,68,0)"] }} transition={{ repeat: Infinity, duration: 2.2, ease: "easeInOut", delay: i * 0.15 }}>
          {w.replace(/#/g, '')}
        </motion.span>
      ))}
    </div>
  );
}

// 29. Neon Spark Flicker (Tubo averiado)
function NeonFlicker({ text }: { text: string }) {
  const words = text.split(' ');
  return (
    <div className="flex flex-wrap gap-x-1.5 gap-y-1 font-semibold text-yellow-200">
      {words.map((w, i) => (
        <motion.span key={i} className="inline-block" animate={{ opacity: [1, 0, 1, 1, 0.2, 1, 1, 0, 1], scale: [1, 0.98, 1] }} transition={{ repeat: Infinity, duration: 3.8, ease: "easeInOut", delay: (i % 3) * 0.4 }}>
          {w.replace(/#/g, '')}
        </motion.span>
      ))}
    </div>
  );
}

// 30. Bounce Jiggle (Rebote alegre y lúdico)
function PlayfulJiggle({ text }: { text: string }) {
  const words = text.split(' ');
  return (
    <div className="flex flex-wrap gap-x-1.5 gap-y-1">
      {words.map((w, i) => (
        <motion.span key={i} className="inline-block font-medium text-pink-300" animate={{ y: [0, -4, 0] }} transition={{ repeat: Infinity, duration: 1.2, ease: "easeInOut", delay: i * 0.08 }}>
          {w.replace(/#/g, '')}
        </motion.span>
      ))}
    </div>
  );
}

// 31. Sneaky Opción 1: Reposo Largo (Recomendado)
function SneakyOption1Pause({ text }: { text: string }) {
  const letters = Array.from(text);
  return (
    <div className="leading-relaxed tracking-wide select-none inline-block font-mono text-xs text-[#7ba077]">
      {letters.map((c, i) => c === ' ' ? <span key={i}>&nbsp;</span> : (
        <motion.span 
          key={i} 
          className="inline-block origin-bottom font-bold" 
          animate={{ 
            y: [0, -12, -12, 0, 0, 0, 0],
            scaleY: [1, 0.74, 1.16, 1.16, 0.75, 1, 1, 1, 1],
            skewX: [0, 15, -15, 15, 0, 0, 0, 0],
            rotate: [0, -6, 6, -6, 0, 0, 0, 0]
          }} 
          transition={{ 
            repeat: Infinity, 
            duration: 3.6, 
            ease: "easeInOut", 
            delay: i * 0.45 
          }}
        >
          {c}
        </motion.span>
      ))}
    </div>
  );
}

// 32. Sneaky Opción 2: Sin Solapamiento
function SneakyOption2NoOverlap({ text }: { text: string }) {
  const letters = Array.from(text);
  const stepDuration = 0.35;
  const totalDuration = Math.max(5, letters.length) * stepDuration;
  return (
    <div className="leading-relaxed tracking-wide select-none inline-block font-mono text-xs text-[#7ba077]">
      {letters.map((c, i) => c === ' ' ? <span key={i}>&nbsp;</span> : (
        <motion.span 
          key={i} 
          className="inline-block origin-bottom font-bold" 
          animate={{ 
            y: [0, -12, -12, 0, 0],
            scaleY: [1, 0.74, 1.16, 1.16, 0.75, 1, 1],
            skewX: [0, 15, -15, 15, 0, 0],
            rotate: [0, -6, 6, -6, 0, 0]
          }} 
          transition={{ 
            repeat: Infinity, 
            duration: totalDuration, 
            ease: "easeInOut", 
            delay: i * stepDuration 
          }}
        >
          {c}
        </motion.span>
      ))}
    </div>
  );
}

// 33. Sneaky Opción 3: Deformación Baja
function SneakyOption3LowDeform({ text }: { text: string }) {
  const letters = Array.from(text);
  return (
    <div className="leading-relaxed tracking-wide select-none inline-block font-mono text-xs text-[#7ba077]">
      {letters.map((c, i) => c === ' ' ? <span key={i}>&nbsp;</span> : (
        <motion.span 
          key={i} 
          className="inline-block origin-bottom font-bold" 
          animate={{ 
            y: [0, -4, -4, 0],
            scaleY: [1, 0.92, 1.05, 1.05, 1],
            skewX: [0, 3, -3, 0],
            rotate: [0, -1, 1, 0]
          }} 
          transition={{ 
            repeat: Infinity, 
            duration: 2.5, 
            ease: "easeInOut", 
            delay: i * 0.35 
          }}
        >
          {c}
        </motion.span>
      ))}
    </div>
  );
}

// 34. Sneaky Opción 4: Tippy Toe (Alternado - Bucle de Pasos)
function SneakyOption4TippyToe({ text }: { text: string }) {
  const letters = Array.from(text);
  return (
    <div className="leading-relaxed tracking-wide select-none inline-block font-mono text-xs text-[#7ba077]">
      {letters.map((c, i) => {
        if (c === ' ') return <span key={i}>&nbsp;</span>;
        
        // Alternar izquierdo/derecho (pares e impares) como pies reales en marcha
        const isLeftFoot = i % 2 === 0;
        const delay = isLeftFoot ? 0 : 0.8; // Para un ciclo de 1.6s
        
        return (
          <motion.span 
            key={i} 
            className="inline-block origin-bottom font-bold" 
            animate={{ 
              y: [0, -8, 0, 0, 0, 0],
              scaleY: [1, 1.25, 1, 1, 1, 1],
              scaleX: [1, 0.8, 1, 1, 1, 1],
              rotate: isLeftFoot ? [0, 8, 0, 0, 0, 0] : [0, -8, 0, 0, 0, 0]
            }} 
            transition={{ 
              repeat: Infinity, 
              duration: 1.6, 
              ease: "easeInOut", 
              delay: delay 
            }}
          >
            {c}
          </motion.span>
        );
      })}
    </div>
  );
}

// ==========================================
// COMPONENTE PRINCIPAL DE LA PÁGINA
// ==========================================

export default function SceneTextEffectsPlaygroundPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<'entrance' | 'continuous'>('entrance');
  const [trigger, setTrigger] = useState(0);
  const [autoLoop, setAutoLoop] = useState(true);
  const [progress, setProgress] = useState(0);
  const [customText, setCustomText] = useState('Hey pequeño pingüino... el "Patrón Oscuro" está acechándote... ¡No hagas click en "Pagar" sin pensar!');

  const handleRestart = () => {
    setTrigger(prev => prev + 1);
  };

  // Barra de progreso y trigger para bucle de efectos de entrada
  useEffect(() => {
    if (!autoLoop || activeTab !== 'entrance') {
      setProgress(0);
      return;
    }
    const duration = 7500;
    const startTime = Date.now();
    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const pct = Math.min(100, (elapsed / duration) * 100);
      setProgress(pct);
      if (elapsed >= duration) {
        setTrigger(prev => prev + 1);
        clearInterval(interval);
      }
    }, 45);
    return () => clearInterval(interval);
  }, [autoLoop, trigger, activeTab]);

  return (
    <div className="min-h-screen w-screen bg-[#050508] text-zinc-200 flex flex-col p-4 md:p-8 font-sans overflow-y-auto custom-scrollbar">
      
      {/* Background decoration glows */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-purple-500/5 rounded-full blur-[130px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-indigo-500/5 rounded-full blur-[130px] pointer-events-none" />

      <div className="max-w-6xl w-full mx-auto flex-1 flex flex-col relative z-10">
        
        {/* Header */}
        <header className="flex flex-col md:flex-row justify-between items-start md:items-center border-b border-zinc-900 pb-4 mb-4 shrink-0 gap-4">
          <div className="space-y-1">
            <h1 className="text-xs font-mono uppercase tracking-widest text-purple-400 font-bold">
              Playground de Texto e Interfaz
            </h1>
            <p className="text-xl font-bold tracking-tight text-white flex items-center gap-2">
              Laboratorio de Efectos de Texto
            </p>
            <p className="text-xs text-zinc-500">
              Colección completa de 30 estilos avanzados de animación para diálogos y novelas visuales.
            </p>
          </div>
          <div className="flex flex-wrap gap-2 items-center">
            
            {activeTab === 'entrance' && (
              <>
                <button
                  onClick={() => setAutoLoop(!autoLoop)}
                  className={`px-3 py-1.5 text-xs font-bold rounded border transition-all flex items-center gap-1.5 active:scale-95 ${autoLoop ? 'bg-purple-950/40 border-purple-500/40 text-purple-300' : 'bg-zinc-950 border-zinc-800 text-zinc-500'}`}
                >
                  <span className={`w-2 h-2 rounded-full ${autoLoop ? 'bg-purple-400 animate-ping' : 'bg-zinc-600'}`} />
                  Auto-Bucle: {autoLoop ? 'ACTIVO' : 'PAUSADO'}
                </button>
                <button
                  onClick={handleRestart}
                  className="px-3.5 py-1.5 text-xs font-bold bg-purple-600 hover:bg-purple-500 text-white rounded transition shadow-lg flex items-center gap-1.5 active:scale-95"
                >
                  Reiniciar Entradas
                </button>
              </>
            )}

            <button
              onClick={() => router.push('/game/playground')}
              className="px-3 py-1.5 text-xs font-medium bg-zinc-950 border border-zinc-800 hover:border-zinc-700 text-zinc-400 hover:text-white rounded transition"
            >
              ← Volver
            </button>
          </div>
        </header>

        {/* Tab Selection */}
        <div className="flex border-b border-zinc-900 mb-4 gap-2 shrink-0">
          <button
            onClick={() => setActiveTab('entrance')}
            className={`px-4 py-2.5 text-xs font-mono uppercase tracking-wider font-bold transition-all border-b-2 ${activeTab === 'entrance' ? 'border-purple-500 text-white' : 'border-transparent text-zinc-500 hover:text-zinc-300'}`}
          >
            A. Efectos de Entrada (15)
          </button>
          <button
            onClick={() => setActiveTab('continuous')}
            className={`px-4 py-2.5 text-xs font-mono uppercase tracking-wider font-bold transition-all border-b-2 ${activeTab === 'continuous' ? 'border-sky-500 text-white' : 'border-transparent text-zinc-500 hover:text-zinc-300'}`}
          >
            B. Efectos Continuos en Loop (15)
          </button>
        </div>

        {/* Visual Progress Bar for Auto-Loop */}
        {autoLoop && activeTab === 'entrance' && (
          <div className="w-full h-1 bg-zinc-950 rounded-full overflow-hidden mb-6 shrink-0">
            <div style={{ width: `${progress}%` }} className="h-full bg-gradient-to-r from-purple-500 to-indigo-500 transition-all duration-75" />
          </div>
        )}

        {/* Custom text editor row */}
        <div className="bg-zinc-950/60 border border-zinc-900 rounded-lg p-4 mb-6 flex flex-col gap-3 shrink-0">
          <label className="text-[10px] font-mono uppercase tracking-widest text-purple-400 font-bold">
            Texto de prueba en vivo (escribe aquí para actualizar todos los cuadros):
          </label>
          <input
            type="text"
            value={customText}
            onChange={(e) => setCustomText(e.target.value)}
            className="w-full bg-zinc-900 border border-zinc-800 rounded px-3 py-2 text-xs text-white focus:outline-none focus:border-purple-500 font-medium transition"
            placeholder="Escribe el diálogo de prueba..."
          />
        </div>

        {/* Grid de Animaciones según pestaña activa */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 flex-1 mb-12">
          
          {activeTab === 'entrance' ? (
            <>
              {/* 1. Bouncy Typewriter */}
              <div className="flex flex-col space-y-2">
                <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest pl-1">1. Bouncy Typewriter</span>
                <div className="bg-zinc-900/10 border border-zinc-900 p-5 rounded-md flex-1 flex flex-col min-h-[140px]">
                  <span className="text-[9px] font-bold uppercase tracking-widest text-purple-400 italic mb-2 block">Subconsciente</span>
                  <div style={{ fontFamily: '"Comic Sans MS", "Comic Sans", cursive' }} className="text-xs md:text-sm leading-relaxed tracking-wide italic">
                    <BouncyTypewriter text={customText} trigger={trigger} />
                  </div>
                </div>
              </div>

              {/* 2. Diagonal Split */}
              <div className="flex flex-col space-y-2">
                <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest pl-1">2. Diagonal Split</span>
                <div className="bg-zinc-900/10 border border-zinc-900 p-5 rounded-md flex-1 flex flex-col min-h-[140px]">
                  <span className="text-[9px] font-bold uppercase tracking-widest text-pink-400 italic mb-2 block">Narrador</span>
                  <div style={{ fontFamily: '"Comic Sans MS", "Comic Sans", cursive' }} className="text-xs md:text-sm leading-relaxed tracking-wide italic">
                    <DiagonalSplitReveal text={customText} trigger={trigger} />
                  </div>
                </div>
              </div>

              {/* 3. Matrix Rain */}
              <div className="flex flex-col space-y-2">
                <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest pl-1">3. Matrix Code Rain</span>
                <div className="bg-zinc-900/10 border border-zinc-900 p-5 rounded-md flex-1 flex flex-col min-h-[140px]">
                  <span className="text-[9px] font-bold uppercase tracking-widest text-emerald-400 italic mb-2 block">Terminal</span>
                  <div className="text-xs md:text-sm leading-relaxed tracking-wide">
                    <MatrixDigitalRain text={customText} trigger={trigger} />
                  </div>
                </div>
              </div>

              {/* 4. Foggy Focus */}
              <div className="flex flex-col space-y-2">
                <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest pl-1">4. Foggy Vaporize</span>
                <div className="bg-zinc-900/10 border border-zinc-900 p-5 rounded-md flex-1 flex flex-col min-h-[140px]">
                  <span className="text-[9px] font-bold uppercase tracking-widest text-zinc-400 italic mb-2 block">Subconsciente</span>
                  <div style={{ fontFamily: '"Comic Sans MS", "Comic Sans", cursive' }} className="text-xs md:text-sm leading-relaxed tracking-wide italic">
                    <FoggyVaporize text={customText} trigger={trigger} />
                  </div>
                </div>
              </div>

              {/* 5. Elastic 3D Pop */}
              <div className="flex flex-col space-y-2">
                <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest pl-1">5. Elastic 3D Pop</span>
                <div className="bg-zinc-900/10 border border-zinc-900 p-5 rounded-md flex-1 flex flex-col min-h-[140px]">
                  <span className="text-[9px] font-bold uppercase tracking-widest text-yellow-400 italic mb-2 block">Camo</span>
                  <div style={{ fontFamily: '"Comic Sans MS", "Comic Sans", cursive' }} className="text-xs md:text-sm leading-relaxed tracking-wide italic">
                    <Elastic3DPop text={customText} trigger={trigger} />
                  </div>
                </div>
              </div>

              {/* 6. Pixel Glitch In */}
              <div className="flex flex-col space-y-2">
                <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest pl-1">6. Pixel Glitch In</span>
                <div className="bg-zinc-900/10 border border-zinc-900 p-5 rounded-md flex-1 flex flex-col min-h-[140px]">
                  <span className="text-[9px] font-bold uppercase tracking-widest text-lime-400 italic mb-2 block">Terminal Hacker</span>
                  <div className="text-xs md:text-sm leading-relaxed tracking-wide">
                    <PixelGlitchIn text={customText} trigger={trigger} />
                  </div>
                </div>
              </div>

              {/* 7. Slide Stagger Left */}
              <div className="flex flex-col space-y-2">
                <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest pl-1">7. Slide Stagger Left</span>
                <div className="bg-zinc-900/10 border border-zinc-900 p-5 rounded-md flex-1 flex flex-col min-h-[140px]">
                  <span className="text-[9px] font-bold uppercase tracking-widest text-indigo-400 italic mb-2 block">Pensamiento</span>
                  <div style={{ fontFamily: '"Comic Sans MS", "Comic Sans", cursive' }} className="text-xs md:text-sm leading-relaxed tracking-wide italic">
                    <SlideStaggerLeft text={customText} trigger={trigger} />
                  </div>
                </div>
              </div>

              {/* 8. Drop Bounce Top */}
              <div className="flex flex-col space-y-2">
                <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest pl-1">8. Drop Bounce Top</span>
                <div className="bg-zinc-900/10 border border-zinc-900 p-5 rounded-md flex-1 flex flex-col min-h-[140px]">
                  <span className="text-[9px] font-bold uppercase tracking-widest text-red-500 italic mb-2 block">Impacto</span>
                  <div style={{ fontFamily: '"Comic Sans MS", "Comic Sans", cursive' }} className="text-xs md:text-sm leading-relaxed tracking-wide italic">
                    <DropBounceTop text={customText} trigger={trigger} />
                  </div>
                </div>
              </div>

              {/* 9. Color Fill Ink */}
              <div className="flex flex-col space-y-2">
                <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest pl-1">9. Color Fill Ink</span>
                <div className="bg-zinc-900/10 border border-zinc-900 p-5 rounded-md flex-1 flex flex-col min-h-[140px]">
                  <span className="text-[9px] font-bold uppercase tracking-widest text-purple-400 italic mb-2 block">Narrador</span>
                  <div style={{ fontFamily: '"Comic Sans MS", "Comic Sans", cursive' }} className="text-xs md:text-sm leading-relaxed tracking-wide italic">
                    <ColorFillInk text={customText} trigger={trigger} />
                  </div>
                </div>
              </div>

              {/* 10. Scale Flare Zoom */}
              <div className="flex flex-col space-y-2">
                <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest pl-1">10. Scale Flare Zoom</span>
                <div className="bg-zinc-900/10 border border-zinc-900 p-5 rounded-md flex-1 flex flex-col min-h-[140px]">
                  <span className="text-[9px] font-bold uppercase tracking-widest text-yellow-300 italic mb-2 block">Brillo Explosivo</span>
                  <div style={{ fontFamily: '"Comic Sans MS", "Comic Sans", cursive' }} className="text-xs md:text-sm leading-relaxed tracking-wide italic">
                    <ScaleFlareZoom text={customText} trigger={trigger} />
                  </div>
                </div>
              </div>

              {/* 11. Wave Rise */}
              <div className="flex flex-col space-y-2">
                <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest pl-1">11. Wave Rise Reveal</span>
                <div className="bg-zinc-900/10 border border-zinc-900 p-5 rounded-md flex-1 flex flex-col min-h-[140px]">
                  <span className="text-[9px] font-bold uppercase tracking-widest text-zinc-400 italic mb-2 block">Subconsciente</span>
                  <div style={{ fontFamily: '"Comic Sans MS", "Comic Sans", cursive' }} className="text-xs md:text-sm leading-relaxed tracking-wide italic">
                    <WaveRiseIn text={customText} trigger={trigger} />
                  </div>
                </div>
              </div>

              {/* 12. Flip Horizontal */}
              <div className="flex flex-col space-y-2">
                <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest pl-1">12. Flip Horizontal</span>
                <div className="bg-zinc-900/10 border border-zinc-900 p-5 rounded-md flex-1 flex flex-col min-h-[140px]">
                  <span className="text-[9px] font-bold uppercase tracking-widest text-orange-400 italic mb-2 block">Camo</span>
                  <div style={{ fontFamily: '"Comic Sans MS", "Comic Sans", cursive' }} className="text-xs md:text-sm leading-relaxed tracking-wide italic">
                    <FlipHorizontal text={customText} trigger={trigger} />
                  </div>
                </div>
              </div>

              {/* 13. Spiral Vortex */}
              <div className="flex flex-col space-y-2">
                <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest pl-1">13. Spiral Vortex</span>
                <div className="bg-zinc-900/10 border border-zinc-900 p-5 rounded-md flex-1 flex flex-col min-h-[140px]">
                  <span className="text-[9px] font-bold uppercase tracking-widest text-pink-400 italic mb-2 block">Sueño Mágico</span>
                  <div style={{ fontFamily: '"Comic Sans MS", "Comic Sans", cursive' }} className="text-xs md:text-sm leading-relaxed tracking-wide italic">
                    <SpiralVortex text={customText} trigger={trigger} />
                  </div>
                </div>
              </div>

              {/* 14. Blur Bloom Zoom */}
              <div className="flex flex-col space-y-2">
                <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest pl-1">14. Blur Bloom Zoom</span>
                <div className="bg-zinc-900/10 border border-zinc-900 p-5 rounded-md flex-1 flex flex-col min-h-[140px]">
                  <span className="text-[9px] font-bold uppercase tracking-widest text-zinc-300 italic mb-2 block">Narrador</span>
                  <div style={{ fontFamily: '"Comic Sans MS", "Comic Sans", cursive' }} className="text-xs md:text-sm leading-relaxed tracking-wide italic">
                    <BlurBloomZoom text={customText} trigger={trigger} />
                  </div>
                </div>
              </div>

              {/* 15. Simple Slide Up */}
              <div className="flex flex-col space-y-2">
                <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest pl-1">15. Simple Slide Up</span>
                <div className="bg-zinc-900/10 border border-zinc-900 p-5 rounded-md flex-1 flex flex-col min-h-[140px]">
                  <span className="text-[9px] font-bold uppercase tracking-widest text-zinc-400 italic mb-2 block">Narrador</span>
                  <div style={{ fontFamily: '"Comic Sans MS", "Comic Sans", cursive' }} className="text-xs md:text-sm leading-relaxed tracking-wide italic">
                    <SimpleSlideUp text={customText} trigger={trigger} />
                  </div>
                </div>
              </div>
            </>
          ) : (
            <>
              {/* 16. Wave Floating */}
              <div className="flex flex-col space-y-2">
                <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest pl-1">16. Wave Floating (Místico)</span>
                <div className="bg-zinc-900/10 border border-zinc-900 p-5 rounded-md flex-1 flex flex-col min-h-[140px]">
                  <span className="text-[9px] font-bold uppercase tracking-widest text-sky-400 italic mb-2 block">Subconsciente</span>
                  <div style={{ fontFamily: '"Comic Sans MS", "Comic Sans", cursive' }} className="text-xs md:text-sm leading-relaxed tracking-wide italic">
                    <WaveFloating text={customText} />
                  </div>
                </div>
              </div>

              {/* 17. Rainbow Shimmer */}
              <div className="flex flex-col space-y-2">
                <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest pl-1">17. Rainbow Shimmer</span>
                <div className="bg-zinc-900/10 border border-zinc-900 p-5 rounded-md flex-1 flex flex-col min-h-[140px]">
                  <span className="text-[9px] font-bold uppercase tracking-widest text-zinc-500 italic mb-2 block">Narrador</span>
                  <div style={{ fontFamily: '"Comic Sans MS", "Comic Sans", cursive' }} className="text-xs md:text-sm leading-relaxed tracking-wide italic">
                    <RainbowShimmer text={customText} />
                  </div>
                </div>
              </div>

              {/* 18. Action Jitter */}
              <div className="flex flex-col space-y-2">
                <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest pl-1">18. Action Jitter (Peligro)</span>
                <div className="bg-red-950/5 border border-zinc-900 p-5 rounded-md flex-1 flex flex-col min-h-[140px]">
                  <span className="text-[9px] font-bold uppercase tracking-widest text-red-500 italic mb-2 block">Alerta</span>
                  <div style={{ fontFamily: '"Comic Sans MS", "Comic Sans", cursive' }} className="text-xs md:text-sm leading-relaxed tracking-wide italic">
                    <BattleImpactShake text={customText} />
                  </div>
                </div>
              </div>

              {/* 19. Holo Glitch */}
              <div className="flex flex-col space-y-2">
                <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest pl-1">19. Holo Glitch (Patrón)</span>
                <div className="bg-lime-950/5 border border-zinc-900 p-5 rounded-md flex-1 flex flex-col min-h-[140px]">
                  <span className="text-[9px] font-bold uppercase tracking-widest text-lime-400 italic mb-2 block">Patrón Oscuro</span>
                  <div className="text-xs md:text-sm leading-relaxed tracking-wide">
                    <HoloDigitalGlitch text={customText} />
                  </div>
                </div>
              </div>

              {/* 20. Fear Tremble */}
              <div className="flex flex-col space-y-2">
                <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest pl-1">20. Fear Tremble (Pánico)</span>
                <div className="bg-zinc-900/10 border border-zinc-900 p-5 rounded-md flex-1 flex flex-col min-h-[140px]">
                  <span className="text-[9px] font-bold uppercase tracking-widest text-purple-300 italic mb-2 block">Camo</span>
                  <div style={{ fontFamily: '"Comic Sans MS", "Comic Sans", cursive' }} className="text-xs md:text-sm leading-relaxed tracking-wide italic">
                    <FearTremble text={customText} />
                  </div>
                </div>
              </div>

              {/* 21. Pulse Breathe */}
              <div className="flex flex-col space-y-2">
                <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest pl-1">21. Pulse Breathe (Calma)</span>
                <div className="bg-zinc-900/10 border border-zinc-900 p-5 rounded-md flex-1 flex flex-col min-h-[140px]">
                  <span className="text-[9px] font-bold uppercase tracking-widest text-amber-400 italic mb-2 block">Pensamiento</span>
                  <div style={{ fontFamily: '"Comic Sans MS", "Comic Sans", cursive' }} className="text-xs md:text-sm leading-relaxed tracking-wide italic">
                    <PulseBreathe text={customText} />
                  </div>
                </div>
              </div>

              {/* 22. Sparkling Glow */}
              <div className="flex flex-col space-y-2">
                <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest pl-1">22. Sparkling Glow (Neón)</span>
                <div className="bg-zinc-900/10 border border-zinc-900 p-5 rounded-md flex-1 flex flex-col min-h-[140px]">
                  <span className="text-[9px] font-bold uppercase tracking-widest text-yellow-300 italic mb-2 block">Energía</span>
                  <div style={{ fontFamily: '"Comic Sans MS", "Comic Sans", cursive' }} className="text-xs md:text-sm leading-relaxed tracking-wide italic">
                    <SparklingGlow text={customText} />
                  </div>
                </div>
              </div>

              {/* 23. Liquify Flow */}
              <div className="flex flex-col space-y-2">
                <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest pl-1">23. Liquify Flow (Líquido)</span>
                <div className="bg-zinc-900/10 border border-zinc-900 p-5 rounded-md flex-1 flex flex-col min-h-[140px]">
                  <span className="text-[9px] font-bold uppercase tracking-widest text-teal-400 italic mb-2 block">Sueño / Limbo</span>
                  <div style={{ fontFamily: '"Comic Sans MS", "Comic Sans", cursive' }} className="text-xs md:text-sm leading-relaxed tracking-wide italic">
                    <LiquifyFlow text={customText} />
                  </div>
                </div>
              </div>

              {/* 24. Frenetic Heartbeat */}
              <div className="flex flex-col space-y-2">
                <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest pl-1">24. Frenetic Heartbeat</span>
                <div className="bg-zinc-900/10 border border-zinc-900 p-5 rounded-md flex-1 flex flex-col min-h-[140px]">
                  <span className="text-[9px] font-bold uppercase tracking-widest text-rose-500 italic mb-2 block">Adrenalina</span>
                  <div style={{ fontFamily: '"Comic Sans MS", "Comic Sans", cursive' }} className="text-xs md:text-sm leading-relaxed tracking-wide italic">
                    <FreneticHeartbeat text={customText} />
                  </div>
                </div>
              </div>

              {/* 25. Radioactive Pulse */}
              <div className="flex flex-col space-y-2">
                <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest pl-1">25. Radioactive Pulse</span>
                <div className="bg-zinc-900/10 border border-zinc-900 p-5 rounded-md flex-1 flex flex-col min-h-[140px]">
                  <span className="text-[9px] font-bold uppercase tracking-widest text-emerald-400 italic mb-2 block">Toxicidad</span>
                  <div className="text-xs md:text-sm leading-relaxed tracking-wide">
                    <RadioactivePulse text={customText} />
                  </div>
                </div>
              </div>

              {/* 26. Matrix Stream */}
              <div className="flex flex-col space-y-2">
                <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest pl-1">26. Matrix Rain Stream</span>
                <div className="bg-zinc-900/10 border border-zinc-900 p-5 rounded-md flex-1 flex flex-col min-h-[140px]">
                  <span className="text-[9px] font-bold uppercase tracking-widest text-green-400 italic mb-2 block">Servidor</span>
                  <div className="text-xs md:text-sm leading-relaxed tracking-wide">
                    <MatrixStream text={customText} />
                  </div>
                </div>
              </div>

              {/* 27. Spooky Ghost */}
              <div className="flex flex-col space-y-2">
                <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest pl-1">27. Spooky Ghost (Fantasmal)</span>
                <div className="bg-zinc-900/10 border border-zinc-900 p-5 rounded-md flex-1 flex flex-col min-h-[140px]">
                  <span className="text-[9px] font-bold uppercase tracking-widest text-zinc-400 italic mb-2 block">Espíritu</span>
                  <div style={{ fontFamily: '"Comic Sans MS", "Comic Sans", cursive' }} className="text-xs md:text-sm leading-relaxed tracking-wide italic">
                    <SpookyGhost text={customText} />
                  </div>
                </div>
              </div>

              {/* 28. Cyber Scanner */}
              <div className="flex flex-col space-y-2">
                <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest pl-1">28. Cyber Scanner (Láser)</span>
                <div className="bg-zinc-900/10 border border-zinc-900 p-5 rounded-md flex-1 flex flex-col min-h-[140px]">
                  <span className="text-[9px] font-bold uppercase tracking-widest text-red-400 italic mb-2 block">Escaneo</span>
                  <div style={{ fontFamily: '"Comic Sans MS", "Comic Sans", cursive' }} className="text-xs md:text-sm leading-relaxed tracking-wide italic">
                    <CyberScanner text={customText} />
                  </div>
                </div>
              </div>

              {/* 29. Neon Flicker */}
              <div className="flex flex-col space-y-2">
                <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest pl-1">29. Neon Spark Flicker</span>
                <div className="bg-zinc-900/10 border border-zinc-900 p-5 rounded-md flex-1 flex flex-col min-h-[140px]">
                  <span className="text-[9px] font-bold uppercase tracking-widest text-yellow-300 italic mb-2 block">Interferencia</span>
                  <div style={{ fontFamily: '"Comic Sans MS", "Comic Sans", cursive' }} className="text-xs md:text-sm leading-relaxed tracking-wide italic">
                    <NeonFlicker text={customText} />
                  </div>
                </div>
              </div>

              {/* 30. Playful Jiggle */}
              <div className="flex flex-col space-y-2">
                <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest pl-1">30. Playful Jiggle (Juguetón)</span>
                <div className="bg-zinc-900/10 border border-zinc-900 p-5 rounded-md flex-1 flex flex-col min-h-[140px]">
                  <span className="text-[9px] font-bold uppercase tracking-widest text-pink-300 italic mb-2 block">Camo (Feliz)</span>
                  <div style={{ fontFamily: '"Comic Sans MS", "Comic Sans", cursive' }} className="text-xs md:text-sm leading-relaxed tracking-wide italic">
                    <PlayfulJiggle text={customText} />
                  </div>
                </div>
              </div>

              {/* 31. Sneaky Opción 1: Reposo Largo */}
              <div className="flex flex-col space-y-2 border border-emerald-500/20 bg-emerald-950/5 rounded-md">
                <span className="text-[10px] font-mono text-emerald-400 uppercase tracking-widest pl-1 pt-1 block font-bold">31. Sneaky Opción 1: Reposo Largo (Recomendado)</span>
                <div className="p-5 flex-1 flex flex-col min-h-[140px]">
                  <span className="text-[9px] font-bold uppercase tracking-widest text-[#7ba077] italic mb-2 block">Camo (Sigilo)</span>
                  <div style={{ fontFamily: '"Comic Sans MS", "Comic Sans", cursive' }} className="text-xs md:text-sm leading-relaxed tracking-wide italic">
                    <SneakyOption1Pause text={customText} />
                  </div>
                  <span className="text-[9px] text-zinc-500 mt-auto pt-2 block leading-snug">Cada letra da un paso sigiloso y luego reposa estática en el suelo. Muy legible.</span>
                </div>
              </div>

              {/* 32. Sneaky Opción 2: Sin Solapamiento */}
              <div className="flex flex-col space-y-2">
                <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest pl-1 pt-1 block">32. Sneaky Opción 2: Sin Solapamiento</span>
                <div className="bg-zinc-900/10 border border-zinc-900 p-5 rounded-md flex-1 flex flex-col min-h-[140px]">
                  <span className="text-[9px] font-bold uppercase tracking-widest text-[#7ba077] italic mb-2 block">Camo (Sigilo)</span>
                  <div style={{ fontFamily: '"Comic Sans MS", "Comic Sans", cursive' }} className="text-xs md:text-sm leading-relaxed tracking-wide italic">
                    <SneakyOption2NoOverlap text={customText} />
                  </div>
                  <span className="text-[9px] text-zinc-500 mt-auto pt-2 block leading-snug">Solo una letra se mueve a la vez secuencialmente. Cero distorsión simultánea.</span>
                </div>
              </div>

              {/* 33. Sneaky Opción 3: Deformación Baja */}
              <div className="flex flex-col space-y-2">
                <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest pl-1 pt-1 block">33. Sneaky Opción 3: Deformación Baja</span>
                <div className="bg-zinc-900/10 border border-zinc-900 p-5 rounded-md flex-1 flex flex-col min-h-[140px]">
                  <span className="text-[9px] font-bold uppercase tracking-widest text-[#7ba077] italic mb-2 block">Camo (Sigilo)</span>
                  <div style={{ fontFamily: '"Comic Sans MS", "Comic Sans", cursive' }} className="text-xs md:text-sm leading-relaxed tracking-wide italic">
                    <SneakyOption3LowDeform text={customText} />
                  </div>
                  <span className="text-[9px] text-zinc-500 mt-auto pt-2 block leading-snug">Se reduce la altura del paso a 4px y las torsiones laterales para mayor claridad.</span>
                </div>
              </div>

              {/* 34. Sneaky Opción 4: Tippy Toe (Alternado) */}
              <div className="flex flex-col space-y-2 border border-sky-500/20 bg-sky-950/5 rounded-md animate-pulse">
                <span className="text-[10px] font-mono text-sky-400 uppercase tracking-widest pl-1 pt-1 block font-bold">34. Sneaky Opción 4: Tippy Toe (Alternado)</span>
                <div className="p-5 flex-1 flex flex-col min-h-[140px]">
                  <span className="text-[9px] font-bold uppercase tracking-widest text-[#7ba077] italic mb-2 block">Camo (Sigilo)</span>
                  <div style={{ fontFamily: '"Comic Sans MS", "Comic Sans", cursive' }} className="text-xs md:text-sm leading-relaxed tracking-wide italic">
                    <SneakyOption4TippyToe text={customText} />
                  </div>
                  <span className="text-[9px] text-zinc-500 mt-auto pt-2 block leading-snug">Letras pares e impares alternan sus pasos como pie izquierdo y derecho. Con pausa de reposo.</span>
                </div>
              </div>
            </>
          )}

        </div>

      </div>
    </div>
  );
}
