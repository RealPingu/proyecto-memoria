'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Scene20Batalla from '../illustrations/scene_20_batalla';
import { FearTremble } from './dialogue_effects';

import { getNodeLabel } from './progress_helpers';

interface Battle3Props {
  onCorrect: () => void;
  onIncorrect: () => void;
  onBack: () => void;
  visitedNodes: string[];
  currentNodeId: string;
  jumpToNode: (nodeId: string) => void;
}

interface Plan {
  id: number;
  name: string;
  badge?: string;
  badgeType?: 'recommend' | 'decoy';
  highlightRate: string;
  highlightLabel: string;
  term: string;
  totalCost: string;
  realRate: string;
  isCorrect: boolean;
  themeColor: string;
  borderColor: string;
  bgColor: string;
}

export default function Battle3ReferencePricingRender({ 
  onCorrect, 
  onIncorrect, 
  onBack,
  visitedNodes,
  currentNodeId,
  jumpToNode
}: Battle3Props) {
  const [activeIndex, setActiveIndex] = useState(0); // 0: Premium, 1: Estándar, 2: Básico
  const [direction, setDirection] = useState(0);
  const [showMenu, setShowMenu] = useState(false);

  const plans: Plan[] = [
    {
      id: 0,
      name: 'Plan Premium Glacial',
      badge: '¡MÁS POPULAR / TASA MÁS BAJA!',
      badgeType: 'recommend',
      highlightRate: '3.5% TNA',
      highlightLabel: 'Tasa Nominal de Referencia',
      term: '240 meses (20 años)',
      totalCost: '450,000 $P',
      realRate: '45.2% TEA',
      isCorrect: false,
      themeColor: '#22c55e', // Emerald/Green trap
      borderColor: 'border-emerald-500/80',
      bgColor: 'bg-emerald-950/20'
    },
    {
      id: 1,
      name: 'Plan Estándar Táctico',
      highlightRate: '9.5% TEA',
      highlightLabel: 'Tasa Efectiva Anual Real',
      term: '36 meses (3 años)',
      totalCost: '154,200 $P',
      realRate: '9.5% TEA',
      isCorrect: true,
      themeColor: '#3b82f6', // Neutral Blue
      borderColor: 'border-zinc-800',
      bgColor: 'bg-zinc-950/30'
    },
    {
      id: 2,
      name: 'Plan Básico Rápido',
      badge: 'SEÑUELO DE CONTRASTE',
      badgeType: 'decoy',
      highlightRate: '78.4% TEA',
      highlightLabel: 'Tasa Efectiva Anual Real',
      term: '12 meses (1 año)',
      totalCost: '214,000 $P',
      realRate: '78.4% TEA',
      isCorrect: false,
      themeColor: '#f97316', // Orange Decoy
      borderColor: 'border-zinc-800',
      bgColor: 'bg-zinc-950/30'
    }
  ];

  const handleNext = () => {
    setDirection(1);
    setActiveIndex((prev) => (prev + 1) % plans.length);
  };

  const handlePrev = () => {
    setDirection(-1);
    setActiveIndex((prev) => (prev - 1 + plans.length) % plans.length);
  };

  const handleConfirmPlan = () => {
    const selectedPlan = plans[activeIndex];
    if (selectedPlan.isCorrect) {
      onCorrect();
    } else {
      onIncorrect();
    }
  };

  const slideVariants = {
    enter: (dir: number) => ({
      x: dir > 0 ? 80 : -80,
      opacity: 0
    }),
    center: {
      x: 0,
      opacity: 1
    },
    exit: (dir: number) => ({
      x: dir > 0 ? -80 : 80,
      opacity: 0
    })
  };

  return (
    <div className="flex flex-col h-screen w-full bg-game-bg text-game-text p-4 md:p-6 overflow-hidden items-center justify-center font-sans relative">
      
      {/* Contenedor principal con animación de entrada fluida */}
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{ duration: 0.4 }}
        className="flex flex-col h-full max-w-lg w-full mx-auto justify-between py-2 md:py-4 relative z-10"
      >        {/* 1. HEADER */}
        <header className="grid grid-cols-[1fr_2fr_1fr] items-center shrink-0 pb-3 border-b border-zinc-900/60 w-full gap-1.5 relative z-20">
          {/* Columna izquierda: Atrás */}
          <div className="flex justify-start">
            <button
              onClick={onBack}
              className="text-[9px] border border-zinc-800 text-game-muted hover:border-zinc-500 hover:text-game-accent transition-all px-2 py-1 font-bold uppercase tracking-wider rounded-sm active:scale-95 cursor-pointer whitespace-nowrap max-w-[65px] truncate"
            >
              Atrás
            </button>
          </div>

          {/* Columna central: Financiación Iglú centrado */}
          <div className="flex justify-center items-center w-full">
            <span className="text-[8px] font-mono text-zinc-500 uppercase tracking-widest whitespace-nowrap text-center">
              Financiación Iglú
            </span>
          </div>

          {/* Columna derecha: Selector de progreso (tres barras pequeñas) */}
          <div className="flex justify-end items-center">
            <button
              onClick={() => setShowMenu(true)}
              title="Historial de navegación"
              className="flex flex-col justify-between w-4 h-3 cursor-pointer py-[2px] text-zinc-500 hover:text-game-accent transition-colors active:scale-95"
            >
              <span className="w-full h-[1.5px] bg-current rounded-sm"></span>
              <span className="w-full h-[1.5px] bg-current rounded-sm"></span>
              <span className="w-full h-[1.5px] bg-current rounded-sm"></span>
            </button>
          </div>
        </header>
        {/* MENÚ FLOTANTE DE SELECCIÓN DE PROGRESO */}
        {showMenu && (
          <div className="absolute inset-0 bg-[#0c0d14]/95 border border-[#272a3d]/80 rounded-md z-30 flex flex-col p-4">
            <div className="flex justify-between items-center pb-2 border-b border-[#272a3d]/40 mb-3">
              <span className="text-[10px] uppercase font-bold tracking-wider text-game-accent">Historial de Diálogos</span>
              <button onClick={() => setShowMenu(false)} className="text-zinc-500 hover:text-white font-bold text-xs cursor-pointer">✕</button>
            </div>
            <div className="flex-1 overflow-y-auto custom-scrollbar space-y-1 pr-1">
              {visitedNodes.map((nodeId) => {
                const isCurrent = nodeId === currentNodeId;
                return (
                  <button
                    key={nodeId}
                    onClick={() => {
                      jumpToNode(nodeId);
                      setShowMenu(false);
                    }}
                    className={`w-full text-left py-1.5 px-2 rounded text-[10px] font-medium transition-all ${
                      isCurrent 
                        ? 'bg-game-accent/20 text-game-accent border border-game-accent/30 font-bold' 
                        : 'bg-zinc-950/40 border border-zinc-900/20 text-zinc-400 hover:bg-zinc-900/60 hover:text-white cursor-pointer'
                    }`}
                  >
                    {getNodeLabel(nodeId)}
                  </button>
                );
              })}
            </div>
          </div>
        )}
        {/* 2. MAIN AREA */}
        <main className="flex-1 flex flex-col min-h-0 justify-between py-3 space-y-4 overflow-hidden">
          
          {/* Ilustración Fija (Batalla de Reference Pricing) */}
          <div className="relative w-full aspect-video flex items-center justify-center shrink-0 max-h-[30vh]">
            <div className="w-full h-full border border-game-muted/15 rounded-md overflow-hidden bg-black shadow-2xl relative">
              <Scene20Batalla />
            </div>
          </div>

          {/* Nombre del Hablante consistente (Patrón Oscuro) */}
          <div className="shrink-0 flex items-center justify-start pl-1 text-[9px] md:text-[10px] font-bold uppercase tracking-widest text-[#06b6d4] italic block">
            <FearTremble text="EL PATRÓN OSCURO (PRECIOS DE REFERENCIA)" color="#06b6d4" />
          </div>

          {/* =======================================================
              CAJA DE DIÁLOGO INTERACTIVA CON CARRUSEL ROTABLE
              ======================================================= */}
          <div className="flex-1 w-full bg-[#131520]/80 border border-[#272a3d]/80 rounded-md flex flex-col relative select-none p-4 bg-[radial-gradient(#1e2235_1px,transparent_1px)] [background-size:16px_16px] overflow-y-auto custom-scrollbar gap-4">
            
            {/* SECCIÓN 1: Narrativa del Patrón Oscuro */}
            <div 
              style={{ fontFamily: '"Comic Sans MS", "Comic Sans", cursive' }}
              className="text-zinc-300 text-xs md:text-sm leading-relaxed italic pr-4 border-b border-[#272a3d]/40 pb-3 shrink-0"
            >
              "¡Vaya, vaya! Parece que necesitas financiar tu iglú, Camo. Mira este Plan Premium... ¡Solo 3.5% de interés! Una ganga que ningún pingüino racional podría rechazar. Firma aquí y no te preocupes por el plazo de tiempo..."
            </div>

            {/* SECCIÓN 2: Carrusel Rotable */}
            <div className="flex-1 flex items-center justify-between gap-1 py-1">
              
              {/* Flecha Izquierda */}
              <button 
                onClick={handlePrev}
                className="w-6 h-6 rounded-full border border-zinc-800 hover:border-zinc-500 bg-zinc-950/60 hover:bg-zinc-900 text-zinc-400 hover:text-white flex items-center justify-center shrink-0 active:scale-90 transition-all cursor-pointer shadow-md"
              >
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                  <path d="M15 18l-6-6 6-6" />
                </svg>
              </button>

              {/* Contenedor de la Tarjeta Activa */}
              <div className="flex-1 min-h-[190px] flex items-center justify-center relative overflow-hidden px-1">
                <AnimatePresence mode="wait" custom={direction}>
                  <motion.div
                    key={activeIndex}
                    custom={direction}
                    variants={slideVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{ duration: 0.22 }}
                    className={`w-full max-w-[280px] rounded-lg border p-4 flex flex-col gap-2 ${plans[activeIndex].borderColor} ${plans[activeIndex].bgColor} shadow-lg backdrop-blur-sm relative`}
                  >
                    {/* Badge (Inline) */}
                    {plans[activeIndex].badge && (
                      <div className="flex justify-center -mt-1">
                        <span className={`px-2 py-0.5 text-[6.5px] font-black rounded uppercase tracking-wider text-center block ${
                          plans[activeIndex].badgeType === 'recommend'
                            ? 'bg-emerald-500 text-black animate-pulse'
                            : 'bg-zinc-800 text-zinc-400'
                        }`}>
                          {plans[activeIndex].badge}
                        </span>
                      </div>
                    )}

                    {/* Contenido de la Tarjeta */}
                    <div className="space-y-0.5 text-center">
                      <h4 className="text-zinc-500 text-[8px] font-mono uppercase tracking-widest">
                        Financiación Disponible
                      </h4>
                      <h3 className="text-white text-[11px] font-black uppercase">
                        {plans[activeIndex].name}
                      </h3>
                    </div>

                    {/* Tasa Destacada */}
                    <div className="text-center py-1">
                      <span 
                        style={{ color: plans[activeIndex].themeColor }}
                        className="text-2xl font-black tracking-tight block leading-none"
                      >
                        {plans[activeIndex].highlightRate}
                      </span>
                      <span className="text-[7.5px] text-zinc-500 block uppercase tracking-wider mt-0.5 leading-none">
                        {plans[activeIndex].highlightLabel}
                      </span>
                    </div>

                    {/* Detalles en Letra Diminuta de Bajo Contraste */}
                    <div className="border-t border-zinc-900/60 pt-2 space-y-1 text-left">
                      <div className="flex justify-between text-[8px]">
                        <span className="text-zinc-500">Plazo de Pago:</span>
                        <span className="font-bold text-zinc-300">{plans[activeIndex].term}</span>
                      </div>
                      <div className="flex justify-between text-[8px]">
                        <span className="text-zinc-500">Costo Final Total:</span>
                        <span className="font-bold text-zinc-300">{plans[activeIndex].totalCost}</span>
                      </div>
                      <div className="flex justify-between text-[7.5px] text-[#334155] border-t border-[#272a3d]/20 pt-1 font-mono">
                        <span>Tasa Real (TEA):</span>
                        <span>{plans[activeIndex].realRate}</span>
                      </div>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Flecha Derecha */}
              <button 
                onClick={handleNext}
                className="w-6 h-6 rounded-full border border-zinc-800 hover:border-zinc-500 bg-zinc-950/60 hover:bg-zinc-900 text-zinc-400 hover:text-white flex items-center justify-center shrink-0 active:scale-90 transition-all cursor-pointer shadow-md"
              >
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                  <path d="M9 18l6-6-6-6" />
                </svg>
              </button>

            </div>

            {/* SECCIÓN 3: Botón de Selección del Plan */}
            <div className="shrink-0 pt-2 border-t border-[#272a3d]/20 mt-auto">
              <button
                onClick={handleConfirmPlan}
                className="w-full bg-[#3b82f6] hover:bg-blue-600 text-white font-black py-2.5 rounded text-[10px] uppercase tracking-wider shadow-[2px_2px_0px_rgba(0,0,0,1)] active:translate-x-[0.5px] active:translate-y-[0.5px] active:shadow-none transition-all text-center cursor-pointer"
              >
                Confirmar Selección de Plan
              </button>
            </div>

          </div>
        </main>

      </motion.div>
    </div>
  );
}
