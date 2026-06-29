'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Scene14Batalla from '../illustrations/scene_14_batalla';
import { FearTremble } from './dialogue_effects';

interface Battle1Props {
  onCorrect: () => void;
  onIncorrect: () => void;
  onExit: () => void;
  onBack: () => void;
}

export default function Battle1MockupDirectRender({ onCorrect, onIncorrect, onExit, onBack }: Battle1Props) {
  // Estados para simulación de caos de anuncios y hackeo
  const [clickedAd, setClickedAd] = useState<string | null>(null);
  const [hackedProgress, setHackedProgress] = useState(0);
  const [popups, setPopups] = useState<{ id: number; x: number; y: number; title: string }[]>([]);
  const [showFakePopup, setShowFakePopup] = useState(true);

  // Manejo de opción incorrecta (adware / trampa)
  useEffect(() => {
    if (!clickedAd) return;

    const popupList = [
      { title: 'ALERTA DE DESCARGA: CleanPingu.exe iniciado', x: 15, y: 20 },
      { title: 'PROPUESTA COMERCIAL: Crédito inmediato solicitado', x: 45, y: 35 },
      { title: 'DESCARGA COMPLETA: Planos_Iglu_Gratis.exe', x: 20, y: 65 },
      { title: 'ALERTA DE SISTEMA: Ejecutando scripts desconocidos', x: 55, y: 75 },
      { title: 'SUSCRIPCIÓN ACTIVA: Servicio Premium Glacial contratado', x: 10, y: 50 }
    ];

    let currentPopupIndex = 0;
    const interval = setInterval(() => {
      if (currentPopupIndex < popupList.length) {
        const item = popupList[currentPopupIndex];
        const index = currentPopupIndex;
        setPopups(prev => [
          ...prev,
          {
            id: index,
            title: item.title,
            x: item.x,
            y: item.y
          }
        ]);
        currentPopupIndex++;
      }
    }, 300);

    const progressInterval = setInterval(() => {
      setHackedProgress(prev => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        return prev + 10;
      });
    }, 120);

    const timeout = setTimeout(() => {
      clearInterval(interval);
      clearInterval(progressInterval);
      onIncorrect();
    }, 3000);

    return () => {
      clearInterval(interval);
      clearInterval(progressInterval);
      clearTimeout(timeout);
    };
  }, [clickedAd, onIncorrect]);

  const handleIncorrectClick = (adName: string) => {
    if (clickedAd) return;
    setClickedAd(adName);
  };

  return (
    <div className="flex flex-col h-screen w-full bg-game-bg text-game-text p-4 md:p-6 overflow-hidden items-center justify-center font-sans relative">
      
      {/* Contenedor adaptado a la Consistencia de Escenas con animación de entrada fluida */}
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{ duration: 0.4 }}
        className="flex flex-col h-full max-w-lg w-full mx-auto justify-between py-2 md:py-4 relative z-10"
      >

        {/* 1. HEADER (shrink-0) - Botón Atrás y Opción 3 arriba a la derecha */}
        <header className="flex justify-between items-center shrink-0 pb-3 border-b border-zinc-900/60">
          <button
            onClick={onBack}
            className="text-[9px] border border-zinc-800 text-game-muted hover:border-zinc-500 hover:text-game-accent transition-all px-3 py-1 font-bold uppercase tracking-wider rounded-sm active:scale-95 cursor-pointer"
          >
            Atrás
          </button>
          
          <button
            onClick={onExit}
            className="text-[9px] border border-zinc-800 text-game-muted hover:border-zinc-500 hover:text-game-accent transition-all px-3 py-1 font-bold uppercase tracking-wider rounded-sm active:scale-95 cursor-pointer"
          >
            Buscar en otras páginas
          </button>
        </header>

        {/* 2. MAIN AREA (Ilustración Fija y Diálogo) */}
        <main className="flex-1 flex flex-col min-h-0 justify-between py-3 space-y-4 overflow-hidden">
          
          {/* Ilustración Fija (Renderizado de SVG Puro Animado) */}
          <div className="relative w-full aspect-video flex items-center justify-center shrink-0 max-h-[30vh]">
            <div className="w-full h-full border border-game-muted/15 rounded-md overflow-hidden bg-black shadow-2xl relative">
              <Scene14Batalla />
            </div>
          </div>

          {/* Nombre del Hablante consistente en tamaño y efectos con el resto de la narrativa */}
          <div className="shrink-0 flex items-center justify-start pl-1 text-[9px] md:text-[10px] font-bold uppercase tracking-widest text-game-accent italic block">
            <FearTremble text="EL PATRÓN OSCURO (SNEAKING)" color="#06b6d4" />
          </div>

          {/* =======================================================
              CAJA DE DIÁLOGO HACKEADA / SECCIONADA / SCROLL LARGO
              ======================================================= */}
          <div className="flex-1 min-h-0 w-full bg-[#131520]/80 border border-[#272a3d]/80 rounded-md flex flex-col justify-start relative select-none overflow-y-auto custom-scrollbar p-4 gap-4 bg-[radial-gradient(#1e2235_1px,transparent_1px)] [background-size:16px_16px]">
            
            {/* SECCIÓN 1: Narrativa */}
            <div 
              style={{ fontFamily: '"Comic Sans MS", "Comic Sans", cursive' }}
              className="text-zinc-300 text-xs md:text-sm leading-relaxed italic pr-4 border-b border-[#272a3d]/40 pb-3 shrink-0"
            >
              "Has caído en mi portal, Camo. Tu desesperación te ciega. Mira qué fácil es reservar este iglú mediterráneo... Sólo tienes que seguir los pasos del asistente."
            </div>

            {/* SECCIÓN 2: Grid Asimétrico de Anuncios Pequeños (Incorrecto / Trampa) */}
            <div className="grid grid-cols-2 gap-3 shrink-0">
              
              {/* Ad 2.1: Banner parpadeante promocional */}
              <div 
                onClick={() => handleIncorrectClick('Banner Oferta Directa')}
                className="bg-yellow-400 hover:bg-yellow-300 text-black border-2 border-black p-2 rounded-lg flex flex-col text-left cursor-pointer shadow-[2px_2px_0px_rgba(0,0,0,1)] active:translate-x-[1px] active:translate-y-[1px] active:shadow-none transition-all rotate-[-1.5deg] justify-between h-[96px]"
              >
                <div className="flex flex-col">
                  <span className="text-[7px] font-black tracking-widest uppercase bg-black text-white px-1 py-0.2 rounded w-max">PROMO</span>
                  <span className="text-[9px] font-black mt-1 uppercase leading-tight">90% DESCUENTO INMEDIATO</span>
                </div>
                <span className="text-[9px] font-black underline">CLICK AQUÍ</span>
              </div>

              {/* Ad 2.2: Fake Popup de Sistema */}
              <AnimatePresence>
                {showFakePopup && (
                  <motion.div 
                    exit={{ opacity: 0, scale: 0.95 }}
                    onClick={() => handleIncorrectClick('Popup de seguridad click')}
                    className="bg-[#22c55e] text-black border-2 border-black p-2 rounded-lg relative shadow-[2px_2px_0px_rgba(0,0,0,1)] flex flex-col text-left rotate-[1deg] justify-between h-[96px] cursor-pointer"
                  >
                    {/* Botón de cierre FALSO 'X' */}
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        handleIncorrectClick('Botón cerrar popup falso');
                      }}
                      className="absolute top-1 right-1 bg-red-500 hover:bg-red-400 text-black border border-black w-3.5 h-3.5 flex items-center justify-center text-[7px] font-black rounded-sm"
                    >
                      ✕
                    </button>
                    <div className="text-[7px] font-black uppercase text-green-950">SYSTEM ALERT</div>
                    <p className="text-[8px] font-bold leading-tight pr-3 mt-0.5">Actualización de seguridad requerida.</p>
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        handleIncorrectClick('Descarga de actualización de seguridad');
                      }}
                      className="bg-black hover:bg-zinc-900 text-white text-[8px] font-black px-1.5 py-0.5 border border-black rounded self-start active:translate-x-[0.5px] active:translate-y-[0.5px]"
                    >
                      ACTUALIZAR
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>

            </div>

            {/* SECCIÓN 3: Botón de Descarga de Ancho Completo (Incorrecto) */}
            <div className="shrink-0 pt-1">
              <button
                onClick={() => handleIncorrectClick('Botón descarga contrato exe')}
                className="w-full bg-red-600 hover:bg-red-500 text-white font-black py-3 px-4 border-2 border-black rounded-lg text-xs tracking-wider shadow-[3px_3px_0px_rgba(0,0,0,1)] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none transition-all uppercase flex flex-col items-center justify-center leading-none gap-1 rotate-[-0.5deg]"
              >
                <span>DESCARGAR ASISTENTE DE RESERVA DIRECTO</span>
                <span className="text-[7px] font-mono opacity-80 uppercase tracking-widest mt-1">reserva_express_setup.exe (4.8MB)</span>
              </button>
            </div>

            {/* =======================================================
                SECCIÓN 4: CARD OFICIAL DE LA WEB (Correcto) - OCULTO EN EL SCROLL
                ======================================================= */}
            <div className="bg-[#e0f2fe] border-2 border-black p-3 md:p-4 rounded-lg flex flex-col sm:flex-row gap-3 text-black shadow-[3px_3px_0px_rgba(0,0,0,1)] items-center text-center sm:text-left shrink-0">
              
              {/* Dibujo Vectorial del Iglú (IDÉNTICO A LA ESCENA 12) - Centrado en el div */}
              <svg viewBox="15 75 190 155" className="w-20 h-16 sm:w-24 sm:h-20 shrink-0 border border-black/10 bg-sky-900/10 rounded mx-auto sm:mx-0">
                {/* Sombra base */}
                <ellipse cx="110" cy="210" rx="110" ry="20" fill="#cbd5e1" opacity="0.5"/>
                
                {/* Paredes del Iglú */}
                <path d="M 20 190 L 60 110 L 110 80 L 110 220 L 50 220 Z" fill="#38bdf8" stroke="#0284c7" strokeWidth="2"/>
                <path d="M 110 80 L 160 110 L 200 190 L 170 220 L 110 220 Z" fill="#e0f2fe" stroke="#0284c7" strokeWidth="2"/>
                
                {/* Líneas isométricas de los bloques */}
                <line x1="60" y1="110" x2="110" y2="140" stroke="#0284c7" strokeWidth="2"/>
                <line x1="160" y1="110" x2="110" y2="140" stroke="#0284c7" strokeWidth="2"/>
                <line x1="110" y1="140" x2="110" y2="220" stroke="#0284c7" strokeWidth="2"/>
                <line x1="38" y1="145" x2="80" y2="175" stroke="#0284c7" strokeWidth="2"/>
                <line x1="182" y1="145" x2="138" y2="175" stroke="#0284c7" strokeWidth="2"/>
                
                {/* Entrada del Iglú */}
                <path d="M 75 220 L 75 170 L 110 150 L 145 170 L 145 220 Z" fill="#0369a1" stroke="#0284c7" strokeWidth="2"/>
                <path d="M 85 220 L 85 180 L 110 165 L 135 180 L 135 220 Z" fill="#0f172a"/>
              </svg>

              {/* Información y Botón de Reserva (100% Mobile Responsive) */}
              <div className="flex-1 flex flex-col justify-between min-w-0 w-full">
                <div className="leading-tight">
                  <h4 className="text-[8px] font-black uppercase text-sky-800 tracking-wider">Pinguilario S.A.</h4>
                  <span className="text-[10px] font-black text-zinc-950 truncate block">Super polo iglú</span>
                </div>
                
                {/* Botón de Reserva simple y temático */}
                <button
                  onClick={onCorrect}
                  className="w-full bg-sky-800 border-2 border-black hover:bg-sky-700 text-white font-black py-2 px-3 rounded text-[9px] uppercase tracking-wide shadow-[1.5px_1.5px_0px_rgba(0,0,0,1)] active:translate-x-[0.5px] active:translate-y-[0.5px] active:shadow-none transition-all mt-2 text-center"
                >
                  PROCEDER A LA RESERVA
                </button>
              </div>

            </div>

            {/* SECCIÓN 5: Grid de Anuncios Inferiores (Incorrecto / Trampa) */}
            <div className="grid grid-cols-2 gap-3 shrink-0 pt-1">
              
              {/* Ad 5.1: Sorteo de Iglú con dibujo falso */}
              <div 
                onClick={() => handleIncorrectClick('Ad Sorteo Iglú')}
                className="bg-orange-500 hover:bg-orange-400 text-black border-2 border-black p-2 rounded-lg flex flex-col justify-between text-left cursor-pointer shadow-[2px_2px_0px_rgba(0,0,0,1)] active:translate-x-[1px] active:translate-y-[1px] active:shadow-none transition-all rotate-[1.5deg] h-[96px]"
              >
                <div className="flex flex-col leading-tight">
                  <span className="text-[7px] font-black uppercase bg-black text-white px-1 py-0.2 rounded w-max">SORTEO</span>
                  <span className="text-[8.5px] font-black mt-1 uppercase leading-tight">GANAR UN IGLÚ TOTALMENTE GRATIS</span>
                </div>
                <span className="text-[8px] font-black underline">PARTICIPAR</span>
              </div>

              {/* Ad 5.2: Ruleta de premios engañosa */}
              <div 
                onClick={() => handleIncorrectClick('Ruleta de premios engañosa')}
                className="bg-cyan-400 hover:bg-cyan-300 text-black border-2 border-black p-2 rounded-lg flex flex-col justify-between text-left cursor-pointer shadow-[2px_2px_0px_rgba(0,0,0,1)] active:translate-x-[1px] active:translate-y-[1px] active:shadow-none transition-all rotate-[-1deg] h-[96px]"
              >
                <div className="flex flex-col">
                  <span className="text-[7px] font-black tracking-widest uppercase bg-black text-white px-1 py-0.2 rounded w-max">¡FELICIDADES!</span>
                  <span className="text-[9px] font-black mt-0.5 uppercase leading-tight">VISITANTE 1,000,000</span>
                  <p className="text-[7px] font-bold leading-tight mt-0.5">¡Reclama tu iglú gratis ahora mismo!</p>
                </div>
                <span className="text-[8px] font-black underline">GIRAR RULETA</span>
              </div>

            </div>

          </div>
        </main>

      </motion.div>

      {/* ==========================================
          CAPA DE CAOS MALICIOSO (CUANDO CAE EN TRAMPA)
          ========================================== */}
      <AnimatePresence>
        {clickedAd && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/95 z-50 flex flex-col items-center justify-center p-4 font-mono select-none"
          >
            {/* Alertas de malware falsas flotantes */}
            {popups.map(p => (
              <motion.div
                key={p.id}
                initial={{ scale: 0, x: `${p.x}vw`, y: `${p.y}vh` }}
                animate={{ scale: 1 }}
                className="absolute bg-red-600 border-2 border-black text-black rounded-lg p-3 shadow-[3px_3px_0px_rgba(0,0,0,1)] max-w-[280px] pointer-events-none font-bold"
                style={{ top: `${p.y}%`, left: `${p.x}%` }}
              >
                <div className="flex items-center gap-1.5 border-b-2 border-black pb-1 mb-1 text-[10px] font-black uppercase">
                  <span>WARNING</span>
                </div>
                <p className="text-[9px] leading-snug">{p.title}</p>
              </motion.div>
            ))}

            {/* Caja de Estado central */}
            <div className="bg-zinc-950 border-2 border-red-500 rounded-lg p-6 max-w-sm w-full flex flex-col gap-4 text-center relative overflow-hidden shadow-2xl">
              <div className="absolute top-0 left-0 w-full h-1 bg-red-500 animate-pulse" />
              
              <div className="text-red-500 text-2xl font-bold">ALERTA</div>
              
              <div className="space-y-1">
                <h3 className="text-white text-xs font-black uppercase tracking-wider">
                  Descarga Ejecutada en Segundo Plano
                </h3>
                <p className="text-[10px] text-zinc-500 leading-relaxed">
                  Has pulsado en un anuncio publicitario. Se estan abriendo multiples ventanas y descargando archivos no deseados.
                </p>
              </div>

              {/* Barra de carga maliciosa */}
              <div className="space-y-1.5">
                <div className="w-full h-3 bg-zinc-900 rounded-full overflow-hidden border-2 border-zinc-800">
                  <motion.div 
                    className="h-full bg-red-600" 
                    style={{ width: `${hackedProgress}%` }}
                  />
                </div>
                <div className="flex justify-between text-[9px] text-zinc-500 font-bold">
                  <span>Descargando...</span>
                  <span>{hackedProgress}%</span>
                </div>
              </div>

              <div className="text-[9px] text-red-400 font-bold animate-pulse">
                Redirigiendo de vuelta al subconsciente de Camo...
              </div>
            </div>

          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
