'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';

// Componente para el Efecto 1: Bouncy Typewriter (Máquina de escribir con rebote suave)
function BouncyTypewriter({ text, trigger }: { text: string; trigger: number }) {
  const words = text.split(' ');
  
  // Contenedor principal con stagger
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.1
      }
    }
  };

  const wordVariants = {
    hidden: { y: 12, opacity: 0, scale: 0.8 },
    visible: { 
      y: 0, 
      opacity: 1, 
      scale: 1,
      transition: { 
        type: "spring" as const, 
        damping: 12, 
        stiffness: 100 
      } 
    }
  };

  return (
    <motion.div 
      key={trigger}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="flex flex-wrap gap-x-1.5 gap-y-1 animate-fade-in"
    >
      {words.map((word, wIdx) => {
        // Resaltar palabras que comiencen o terminen con # o comillas dobles
        const isHighlighted = word.startsWith('#') || word.endsWith('#') || word.includes('"');
        const cleanWord = word.replace(/#/g, '');

        if (isHighlighted) {
          return (
            <motion.span 
              key={wIdx} 
              variants={wordVariants}
              className="text-emerald-400 font-bold drop-shadow-[0_0_8px_rgba(16,185,129,0.3)] inline-block select-none"
              animate={{ 
                scale: [1, 1.08, 1],
                rotate: [0, 1, -1, 0]
              }}
              transition={{ repeat: Infinity, duration: 2, ease: "easeInOut", delay: wIdx * 0.1 }}
            >
              {cleanWord}
            </motion.span>
          );
        }

        return (
          <motion.span 
            key={wIdx} 
            variants={wordVariants}
            className="text-zinc-300 inline-block select-none"
          >
            {cleanWord}
          </motion.span>
        );
      })}
    </motion.div>
  );
}

// Componente para el Efecto 2: Wave Floating Text (Onda flotante interactiva letra a letra)
function WaveFloatingText({ text, trigger }: { text: string; trigger: number }) {
  const letters = Array.from(text);

  const containerVariants = {
    hidden: {},
    visible: {
      transition: { staggerChildren: 0.02 }
    }
  };

  const letterVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { type: "spring" as const, stiffness: 120, damping: 10 }
    }
  };

  return (
    <motion.div
      key={trigger}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="leading-relaxed tracking-wide select-none inline-block w-full font-medium"
    >
      {letters.map((char, index) => {
        if (char === ' ') {
          return <span key={index}>&nbsp;</span>;
        }

        // Animación de onda infinita
        return (
          <motion.span
            key={index}
            variants={letterVariants}
            className="inline-block text-sky-400"
            animate={{
              y: [-1.5, 1.5, -1.5],
            }}
            transition={{
              repeat: Infinity,
              duration: 3,
              ease: "easeInOut",
              delay: index * 0.05
            }}
          >
            {char}
          </motion.span>
        );
      })}
    </motion.div>
  );
}

// Componente para el Efecto 3: Rainbow Shimmer (Desvanecimiento elegante y brillo cromático)
function RainbowShimmer({ text, trigger }: { text: string; trigger: number }) {
  const words = text.split(' ');

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.08 }
    }
  };

  const wordVariants = {
    hidden: { opacity: 0, filter: 'blur(4px)', y: 5 },
    visible: { 
      opacity: 1, 
      filter: 'blur(0px)', 
      y: 0,
      transition: { duration: 0.4 }
    }
  };

  return (
    <motion.div
      key={trigger}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="flex flex-wrap gap-x-1.5 gap-y-1 font-medium"
    >
      {words.map((word, wIdx) => {
        const isDarkPattern = word.includes('Oscuro') || word.includes('Trampa') || word.includes('"');
        const cleanWord = word.replace(/#/g, '');

        if (isDarkPattern) {
          return (
            <motion.span
              key={wIdx}
              variants={wordVariants}
              className="font-black bg-gradient-to-r from-red-500 via-purple-500 to-indigo-500 bg-clip-text text-transparent animate-pulse inline-block"
              style={{ backgroundSize: '200% 200%' }}
              animate={{
                backgroundPosition: ['0% 50%', '100% 50%', '0% 50%']
              }}
              transition={{ repeat: Infinity, duration: 4, ease: "linear" }}
            >
              {cleanWord}
            </motion.span>
          );
        }

        return (
          <motion.span
            key={wIdx}
            variants={wordVariants}
            className="text-zinc-400 inline-block"
          >
            {cleanWord}
          </motion.span>
        );
      })}
    </motion.div>
  );
}

// Componente para el Efecto 4: Battle Impact Shake (Aparición por impacto y temblor de acción)
function BattleImpactShake({ text, trigger }: { text: string; trigger: number }) {
  const words = text.split(' ');

  const containerVariants = {
    hidden: {},
    visible: {
      transition: { staggerChildren: 0.15 }
    }
  };

  const wordVariants = {
    hidden: { scale: 3, opacity: 0 },
    visible: { 
      scale: 1, 
      opacity: 1,
      transition: { type: "spring" as const, damping: 15, stiffness: 200 }
    }
  };

  return (
    <motion.div
      key={trigger}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="flex flex-wrap gap-x-2 gap-y-1.5 font-bold font-mono"
    >
      {words.map((word, wIdx) => {
        const isImpactWord = word.startsWith('¡') || word.endsWith('!') || word.includes('Camo') || word.includes('Pagar');
        const cleanWord = word.replace(/#/g, '');

        if (isImpactWord) {
          return (
            <motion.span
              key={wIdx}
              variants={wordVariants}
              className="text-red-500 uppercase tracking-wider drop-shadow-[0_0_10px_rgba(239,68,68,0.5)] bg-red-950/20 px-1 border border-red-500/20 rounded-sm inline-block"
              animate={{
                x: [0, -1, 1, -1.5, 1.5, 0],
                y: [0, 1.5, -1, 1, -1.5, 0],
                rotate: [0, 1, -1, 1.5, -1.5, 0]
              }}
              transition={{
                repeat: Infinity,
                duration: 0.25,
                repeatType: "mirror"
              }}
            >
              {cleanWord}
            </motion.span>
          );
        }

        return (
          <motion.span
            key={wIdx}
            variants={wordVariants}
            className="text-zinc-100 uppercase tracking-wide inline-block"
          >
            {cleanWord}
          </motion.span>
        );
      })}
    </motion.div>
  );
}

// Componente para el Efecto 5: Holo Digital Glitch (Aparición cibernética pixelada)
function HoloDigitalGlitch({ text, trigger }: { text: string; trigger: number }) {
  const letters = Array.from(text);

  const containerVariants = {
    hidden: {},
    visible: {
      transition: { staggerChildren: 0.03 }
    }
  };

  const letterVariants = {
    hidden: { opacity: 0, scaleY: 0.2, filter: 'hue-rotate(90deg)' },
    visible: { 
      opacity: [0, 1, 0.4, 1], 
      scaleY: 1, 
      filter: 'hue-rotate(0deg)',
      transition: { duration: 0.3 }
    }
  };

  return (
    <motion.div
      key={trigger}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="leading-relaxed tracking-wider select-none font-mono text-xs w-full text-lime-400 block"
    >
      {letters.map((char, index) => {
        if (char === ' ') {
          return <span key={index}>&nbsp;</span>;
        }

        // El texto titila ocasionalmente con un microglitch
        const isHighlighted = char === '1' || char === '0' || char === '%' || char === '$';
        
        return (
          <motion.span
            key={index}
            variants={letterVariants}
            className={`inline-block ${isHighlighted ? 'text-amber-400 font-black' : ''}`}
            animate={isHighlighted ? {
              opacity: [1, 0.2, 1, 0.8, 1],
              skewX: [0, 15, -15, 0]
            } : {}}
            transition={{
              repeat: Infinity,
              duration: 3.5,
              ease: "linear",
              delay: index * 0.1
            }}
          >
            {char}
          </motion.span>
        );
      })}
    </motion.div>
  );
}

export default function SceneTextEffectsPlaygroundPage() {
  const router = useRouter();
  const [trigger, setTrigger] = useState(0);
  const [customText, setCustomText] = useState('Hey pequeño pingüino... el "Patrón Oscuro" está acechándote... ¡No hagas click en "Pagar" sin pensar!');

  const handleRestart = () => {
    setTrigger(prev => prev + 1);
  };

  return (
    <div className="min-h-screen w-screen bg-[#050508] text-zinc-200 flex flex-col p-4 md:p-8 font-sans overflow-y-auto custom-scrollbar">
      
      {/* Background glows */}
      <div className="absolute top-0 left-1/4 w-[400px] h-[400px] bg-purple-500/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-indigo-500/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-6xl w-full mx-auto flex-1 flex flex-col relative z-10">
        
        {/* Header */}
        <header className="flex flex-col md:flex-row justify-between items-start md:items-center border-b border-zinc-900 pb-4 mb-6 shrink-0 gap-4">
          <div className="space-y-1">
            <h1 className="text-xs font-mono uppercase tracking-widest text-purple-400 font-bold">
              Playground de Texto e Interfaz
            </h1>
            <p className="text-xl font-bold tracking-tight text-white flex items-center gap-2">
              Laboratorio de Efectos de Texto
            </p>
            <p className="text-xs text-zinc-500">
              Pruebas de animación tipográfica para enriquecer la entrega de diálogos y decisiones en la narrativa.
            </p>
          </div>
          <div className="flex gap-2">
            <button
              onClick={handleRestart}
              className="px-3.5 py-1.5 text-xs font-bold bg-purple-600 hover:bg-purple-500 text-white rounded transition shadow-lg flex items-center gap-1.5 active:scale-95 animate-fade-in"
            >
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21.5 2v6h-6M21.34 15.57a10 10 0 1 1-.57-8.38l5.67-5.67" />
              </svg>
              Reiniciar Animaciones
            </button>
            <button
              onClick={() => router.push('/game/playground')}
              className="px-3 py-1.5 text-xs font-medium bg-zinc-950 border border-zinc-800 hover:border-zinc-700 text-zinc-400 hover:text-white rounded transition"
            >
              ← Volver al Menú
            </button>
          </div>
        </header>

        {/* Custom text editor row */}
        <div className="bg-zinc-950/60 border border-zinc-900 rounded-lg p-4 mb-6 flex flex-col gap-3">
          <label className="text-[10px] font-mono uppercase tracking-widest text-purple-400 font-bold">
            Texto de prueba personalizado (escribe para actualizar todos los cuadros):
          </label>
          <input
            type="text"
            value={customText}
            onChange={(e) => setCustomText(e.target.value)}
            className="w-full bg-zinc-900 border border-zinc-800 rounded px-3 py-2 text-xs text-white focus:outline-none focus:border-purple-500 font-medium transition"
            placeholder="Escribe algo aquí..."
          />
        </div>

        {/* Grid de cajas de diálogo animadas */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 flex-1 mb-8">
          
          {/* Efecto 1 */}
          <div className="flex flex-col space-y-2">
            <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest pl-1">
              1. Bouncy Typewriter (Palabras con Rebote Suave)
            </span>
            <div className="flex-1 bg-zinc-900/10 border border-zinc-900 p-5 rounded-md flex flex-col justify-start relative transition-all min-h-[140px] hover:border-purple-500/20 hover:bg-zinc-900/20">
              <span className="text-[9px] font-bold uppercase tracking-widest text-purple-400 italic mb-2 block">
                Subconsciente
              </span>
              <div 
                style={{ fontFamily: '"Comic Sans MS", "Comic Sans", cursive' }}
                className="text-xs md:text-sm leading-relaxed tracking-wide w-full font-medium italic"
              >
                <BouncyTypewriter text={customText} trigger={trigger} />
              </div>
            </div>
          </div>

          {/* Efecto 2 */}
          <div className="flex flex-col space-y-2">
            <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest pl-1">
              2. Wave Floating Text (Letras en Onda Acuática)
            </span>
            <div className="flex-1 bg-zinc-900/10 border border-zinc-900 p-5 rounded-md flex flex-col justify-start relative transition-all min-h-[140px] hover:border-purple-500/20 hover:bg-zinc-900/20">
              <span className="text-[9px] font-bold uppercase tracking-widest text-sky-400 italic mb-2 block">
                Subconsciente
              </span>
              <div 
                style={{ fontFamily: '"Comic Sans MS", "Comic Sans", cursive' }}
                className="text-xs md:text-sm leading-relaxed tracking-wide w-full font-medium italic text-sky-400"
              >
                <WaveFloatingText text={customText} trigger={trigger} />
              </div>
            </div>
          </div>

          {/* Efecto 3 */}
          <div className="flex flex-col space-y-2">
            <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest pl-1">
              3. Rainbow Shimmer (Efecto Gradiente Cromático)
            </span>
            <div className="flex-1 bg-zinc-900/10 border border-zinc-900 p-5 rounded-md flex flex-col justify-start relative transition-all min-h-[140px] hover:border-purple-500/20 hover:bg-zinc-900/20">
              <span className="text-[9px] font-bold uppercase tracking-widest text-zinc-500 italic mb-2 block">
                Narrador
              </span>
              <div 
                style={{ fontFamily: '"Comic Sans MS", "Comic Sans", cursive' }}
                className="text-xs md:text-sm leading-relaxed tracking-wide w-full font-medium italic"
              >
                <RainbowShimmer text={customText} trigger={trigger} />
              </div>
            </div>
          </div>

          {/* Efecto 4 */}
          <div className="flex flex-col space-y-2">
            <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest pl-1">
              4. Battle Impact Shake (Golpes Rápidos y Temblor)
            </span>
            <div className="flex-1 bg-red-950/5 border border-zinc-900 p-5 rounded-md flex flex-col justify-start relative transition-all min-h-[140px] hover:border-red-500/20 hover:bg-red-950/10">
              <span className="text-[9px] font-bold uppercase tracking-widest text-red-500 italic mb-2 block">
                Alerta del Sistema
              </span>
              <div 
                style={{ fontFamily: '"Comic Sans MS", "Comic Sans", cursive' }}
                className="text-xs md:text-sm leading-relaxed tracking-wide w-full font-medium italic text-zinc-300"
              >
                <BattleImpactShake text={customText} trigger={trigger} />
              </div>
            </div>
          </div>

          {/* Efecto 5 */}
          <div className="flex flex-col space-y-2 md:col-span-2">
            <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest pl-1">
              5. Holo Digital Glitch (Flicker Cibernético Verde Neón)
            </span>
            <div className="flex-1 bg-lime-950/5 border border-zinc-900 p-5 rounded-md flex flex-col justify-start relative transition-all min-h-[140px] hover:border-lime-500/20 hover:bg-lime-950/10">
              <span className="text-[9px] font-bold uppercase tracking-widest text-lime-400 italic mb-2 block">
                Explicación del Patrón
              </span>
              <div 
                className="text-xs md:text-sm leading-relaxed tracking-wide w-full font-medium"
              >
                <HoloDigitalGlitch text={customText} trigger={trigger} />
              </div>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
