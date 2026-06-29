'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import Scene14Batalla from '../../components/scene_14_batalla';

export default function Scene14v5PlaygroundRedesignPage() {
  const router = useRouter();
  
  // Estados para simulación de caos de anuncios y hackeo
  const [clickedAd, setClickedAd] = useState<string | null>(null);
  const [hackedProgress, setHackedProgress] = useState(0);
  const [popups, setPopups] = useState<{ id: number; x: number; y: number; title: string }[]>([]);
  const [showFakePopup, setShowFakePopup] = useState(true);

  // Manejo de opción incorrecta (Opción 1 y anuncios falsos)
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
      router.push('/game/playground/scene/scene_14/resultado_1');
    }, 3000);

    return () => {
      clearInterval(interval);
      clearInterval(progressInterval);
      clearTimeout(timeout);
    };
  }, [clickedAd, router]);

  const handleIncorrectClick = (adName: string) => {
    if (clickedAd) return;
    setClickedAd(adName);
  };

  const handleCorrectClick = () => {
    if (clickedAd) return;
    router.push('/game/playground/scene/scene_14/resultado_2');
  };

  const handleExitClick = () => {
    if (clickedAd) return;
    router.push('/game/playground/scene/scene_14/resultado_3');
  };

  return (
    <div className="flex flex-col h-screen w-full bg-[#0a0b10] text-[#e2e8f0] p-4 md:p-6 overflow-hidden items-center justify-center font-sans relative">
      
      {/* Luces de fondo decorativas árticas */}
      <div className="absolute top-1/4 left-1/4 w-[300px] h-[300px] bg-cyan-500/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[300px] h-[300px] bg-indigo-500/5 rounded-full blur-[100px] pointer-events-none" />

      {/* Contenedor adaptado a la Consistencia de Escenas (Layout Sándwich) */}
      <div className="flex flex-col h-full max-w-lg w-full mx-auto justify-between py-2 md:py-4 relative z-10">

        {/* 1. HEADER (shrink-0) - Botón volver */}
        <header className="flex justify-between items-center shrink-0 pb-3 border-b border-zinc-900/60">
          <button
            onClick={() => router.push('/game/playground')}
            className="text-[9px] border border-zinc-800 text-zinc-400 hover:border-zinc-500 hover:text-cyan-400 transition-all px-3 py-1 font-bold uppercase tracking-wider rounded-sm active:scale-95 cursor-pointer"
          >
            ← Volver al Menú
          </button>
          <span className="text-[9px] font-mono text-cyan-400 font-bold uppercase tracking-widest animate-pulse">
            Rediseño V5 Gameplay
          </span>
        </header>

        {/* 2. MAIN AREA (Ilustración Fija y Diálogo) */}
        <main className="flex-1 flex flex-col min-h-0 justify-between py-3 space-y-4 overflow-hidden">
          
          {/* Ilustración Fija (Renderizado de SVG Puro Animado) */}
          <div className="relative w-full aspect-video flex items-center justify-center shrink-0 max-h-[32vh]">
            <div className="w-full h-full border border-zinc-800/60 rounded-md overflow-hidden bg-black shadow-2xl relative">
              <Scene14Batalla />
              
              {/* Marca de agua */}
              <div className="absolute top-2 right-2 bg-black/60 border border-zinc-800/80 px-2 py-0.5 rounded text-[8px] font-mono text-zinc-500">
                SCENE_14_ILLUSTRATION
              </div>
            </div>
          </div>

          {/* Nombre del Hablante */}
          <div className="shrink-0 flex items-center justify-between pl-1">
            <span className="text-[9px] md:text-[10px] font-bold uppercase tracking-widest text-red-500 italic">
              👿 EL PATRÓN OSCURO (SNEAKING)
            </span>
            <span className="text-[8px] font-mono text-zinc-500 uppercase">
              Minefield Mode Enabled
            </span>
          </div>

          {/* =======================================================
              CAJA DE DIÁLOGO HACKEADA / MINEFIELD DE ANUNCIOS
              ======================================================= */}
          <div className="flex-1 min-h-0 w-full bg-[#131520]/80 border border-[#272a3d]/80 rounded-md flex flex-col justify-start relative select-none overflow-y-auto custom-scrollbar p-4 gap-3 bg-[radial-gradient(#1e2235_1px,transparent_1px)] [background-size:16px_16px]">
            
            {/* Texto Narrativo Inicial */}
            <div 
              style={{ fontFamily: '"Comic Sans MS", "Comic Sans", cursive' }}
              className="text-zinc-300 text-xs md:text-sm leading-relaxed italic pr-4 border-b border-[#272a3d]/40 pb-2"
            >
              "Has caído en mi portal, Camo. Tu desesperación te ciega. Mira qué fácil es reservar este iglú mediterráneo... Sólo tienes que seguir los pasos del asistente."
            </div>

            {/* AD 1: Banner parpadeante arriba (Incorrecto / Trampa) */}
            <div 
              onClick={() => handleIncorrectClick('Banner Oferta Directa')}
              className="bg-yellow-400 hover:bg-yellow-300 text-black border-2 border-black p-2.5 rounded-lg flex items-center justify-between cursor-pointer shadow-[2px_2px_0px_rgba(0,0,0,1)] active:translate-x-[1px] active:translate-y-[1px] active:shadow-none transition-all"
            >
              <div className="flex flex-col text-left">
                <span className="text-[8px] font-black tracking-widest uppercase bg-black text-white px-1.5 py-0.5 rounded w-max">RECOMENDADO</span>
                <span className="text-[10px] font-black mt-1 leading-none">¡IGLÚ MEDITERRÁNEO GRATIS!</span>
              </div>
              <span className="text-[10px] font-black animate-bounce">⚡ CLICK AQUÍ ⚡</span>
            </div>

            {/* AD 2: Fake Popup Flotante Simulado dentro de la caja de diálogo */}
            <AnimatePresence>
              {showFakePopup && (
                <motion.div 
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="bg-[#22c55e] text-black border-2 border-black p-3 rounded-lg relative shadow-[3px_3px_0px_rgba(0,0,0,1)] flex flex-col gap-1 text-left"
                >
                  {/* Botón de cierre FALSO 'X' (Trigger de derrota / Dark Pattern) */}
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      handleIncorrectClick('Botón cerrar popup falso');
                    }}
                    className="absolute top-1.5 right-1.5 bg-red-500 hover:bg-red-400 text-black border border-black w-4 h-4 flex items-center justify-center text-[8px] font-black rounded-sm active:translate-x-[0.5px] active:translate-y-[0.5px]"
                    title="Cerrar Anuncio"
                  >
                    ✕
                  </button>

                  <div className="text-[9px] font-black uppercase tracking-wider text-green-950">
                    🛡️ PINGUSAFE SECURE SYSTEM
                  </div>
                  <p className="text-[10px] font-bold leading-tight pr-4">
                    Tu navegador requiere una actualización de seguridad para realizar transacciones inmobiliarias.
                  </p>
                  <button 
                    onClick={() => handleIncorrectClick('Descarga de actualización de seguridad')}
                    className="bg-black hover:bg-zinc-900 text-white text-[9px] font-black px-2.5 py-1 border border-black rounded self-start mt-1 active:translate-x-[1px] active:translate-y-[1px] transition-all"
                  >
                    INSTALAR PINGUSAFE.EXE (ACTUALIZAR)
                  </button>
                </motion.div>
              )}
            </AnimatePresence>

            {/* AD 3: Botón de Descarga Gigante (Incorrecto / Opción 1) */}
            <button
              onClick={() => handleIncorrectClick('Botón descarga contrato exe')}
              className="w-full bg-red-600 hover:bg-red-500 text-white font-black py-3 px-4 border-2 border-black rounded-lg text-xs tracking-wider shadow-[3px_3px_0px_rgba(0,0,0,1)] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none transition-all uppercase flex flex-col items-center justify-center leading-none gap-1"
            >
              <span>👇 CONTINUAR RESERVA (DESCARGAR ASISTENTE DIRECTO) 👇</span>
              <span className="text-[8px] font-mono opacity-80 uppercase tracking-widest mt-1">asistente_reserva_iglu_premium.exe (4.8MB)</span>
            </button>

            {/* =======================================================
                OPCIÓN 2 DISFRAZADA (Camino Correcto)
                ======================================================= */}
            <div className="bg-[#181a26] border border-zinc-800 p-3 rounded-lg text-left mt-2 flex flex-col gap-1.5">
              <p className="text-[9px] leading-relaxed text-zinc-400">
                Al usar el asistente express aceptas la instalación de cookies de terceros y descargas automáticas de portales patrocinados. Si deseas evitar el asistente publicitario, puedes hacer clic aquí para <span 
                  onClick={handleCorrectClick}
                  className="text-cyan-400 hover:text-cyan-300 font-extrabold underline cursor-pointer transition-colors"
                >Proceder a la reserva estándar</span> de manera manual.
              </p>
            </div>

            {/* =======================================================
                OPCIÓN 3 DISFRAZADA (Camino de Escape)
                ======================================================= */}
            <div className="mt-auto pt-3 border-t border-[#272a3d]/40 flex justify-between items-center text-left">
              <button 
                onClick={handleExitClick}
                className="text-[9px] font-mono text-red-400 hover:text-red-300 transition-colors uppercase tracking-wider flex items-center gap-1 underline"
              >
                ← Cancelar transacción y buscar en portales seguros externos
              </button>
              
              <span className="text-[7px] text-zinc-600 font-mono">AD_VERSION_5_SANDBOX</span>
            </div>

          </div>
        </main>

      </div>

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
