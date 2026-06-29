'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';

export default function Scene14v3PlaygroundPage() {
  const router = useRouter();
  const [clickedAd, setClickedAd] = useState<string | null>(null);
  const [hackedProgress, setHackedProgress] = useState(0);
  const [popups, setPopups] = useState<{ id: number; x: number; y: number; title: string }[]>([]);

  // Efecto de descarga caótica si cae en un banner engañoso (Opción 1)
  useEffect(() => {
    if (!clickedAd) return;

    const popupList = [
      { title: 'ALERTA DE SEGURIDAD: Archivo ejecutable detectado', x: 10, y: 15 },
      { title: 'DESCARGA AUTOMÁTICA: PinguSafe_Setup.exe', x: 45, y: 30 },
      { title: 'SCRIPT SUSPECT: Modificando registros del sistema', x: 20, y: 60 },
      { title: 'SISTEMA COMPROMETIDO: Múltiples popups de publicidad', x: 50, y: 70 },
      { title: 'SUSCRIPCIÓN INDESEADA: Factura de 99 $P generada', x: 5, y: 45 }
    ];

    let currentPopupIndex = 0;
    const interval = setInterval(() => {
      if (currentPopupIndex < popupList.length) {
        setPopups(prev => [
          ...prev,
          {
            id: currentPopupIndex,
            title: popupList[currentPopupIndex].title,
            x: popupList[currentPopupIndex].x,
            y: popupList[currentPopupIndex].y
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
    <div className="h-[100dvh] w-full bg-[#030712] text-[#1D1B20] flex items-center justify-center p-0 sm:p-4 font-sans overflow-hidden relative">
      {/* Luces de fondo decorativas árticas */}
      <div className="absolute top-1/4 left-1/4 w-[350px] h-[350px] bg-sky-500/5 rounded-full blur-[100px] pointer-events-none sm:block hidden" />
      <div className="absolute bottom-1/4 right-1/4 w-[350px] h-[350px] bg-cyan-500/5 rounded-full blur-[100px] pointer-events-none sm:block hidden" />

      {/* ==========================================
          MARCO DE DISPOSITIVO DE ACUERDO A LA BASE M3 (412px x 983px max)
          ========================================== */}
      <div className="relative w-full h-[100dvh] sm:h-[780px] sm:max-w-[412px] bg-[#FEF7FF] border-0 sm:border-[8px] sm:border-[#CAC4D0] sm:rounded-[28px] shadow-2xl flex flex-col overflow-hidden shrink-0">
        
        {/* Notch / Cámara (Solo desktop) */}
        <div className="absolute top-2 left-1/2 -translate-x-1/2 w-6 h-6 bg-[#1D1B20] rounded-full z-30 sm:block hidden border-2 border-[#CAC4D0]" />

        {/* 1. HEADER CONTAINER (364px de alto) */}
        <div className="w-full h-[280px] sm:h-[320px] bg-[#FEF7FF] relative flex flex-col shrink-0 overflow-hidden border-b border-[#CAC4D0]">
          
          {/* Ilustración de fondo polar (Placeholder decorativo) */}
          <div className="absolute inset-0 bg-sky-950/20 z-0">
            <svg viewBox="0 0 100 60" className="w-full h-full object-cover opacity-35">
              <rect width="100" height="60" fill="#0c4a6e" />
              <path d="M 0,40 Q 30,10 60,40 T 120,40" fill="#0284c7" />
              <path d="M 10,50 Q 40,25 70,50 T 130,50" fill="#bae6fd" />
            </svg>
            <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-[#FEF7FF]" />
          </div>

          {/* Status Bar (Simulado con las dimensiones de la base) */}
          <div className="w-full h-[52px] flex justify-between items-end px-6 pb-2 select-none z-10 shrink-0">
            <span className="font-mono font-medium text-xs text-[#1D1B20]">09:41 AM</span>
            <div className="flex items-center gap-1.5 h-[17px]">
              {/* Wifi */}
              <svg className="w-3.5 h-3.5 fill-[#1D1B20]" viewBox="0 0 24 24">
                <path d="M12 21l-12-18h24z" />
              </svg>
              {/* Signal */}
              <svg className="w-3.5 h-3.5 fill-[#1D1B20]" viewBox="0 0 24 24">
                <path d="M2 22h20v-20z" />
              </svg>
              {/* Battery */}
              <div className="w-[8px] h-[14px] bg-[#1D1B20]/30 rounded-2xs relative">
                <div className="absolute bottom-0 left-0 w-full h-[8px] bg-[#1D1B20]" />
              </div>
            </div>
          </div>

          {/* Top App Bar Navigation */}
          <div className="w-full h-[56px] flex justify-between items-center px-2 z-10 shrink-0">
            {/* Leading back icon (Opción 3: Salida segura) */}
            <button 
              onClick={handleExitClick}
              className="w-12 h-12 flex items-center justify-center bg-[#E8DEF8] rounded-full border border-black/10 active:scale-95 transition-all text-[#4A4459]"
            >
              <svg className="w-5 h-5 stroke-current" viewBox="0 0 24 24" fill="none" strokeWidth="2.5">
                <line x1="19" y1="12" x2="5" y2="12" />
                <polyline points="12 19 5 12 12 5" />
              </svg>
            </button>
            <span className="text-xs font-mono font-bold text-[#1D1B20] bg-[#FEF7FF]/80 px-2 py-0.5 rounded border border-[#CAC4D0]">
              pinguilario.com
            </span>
            <div className="w-12 h-12" />
          </div>

          {/* Title & Subtitle block (Caricaturesco, textos e info) */}
          <div className="mt-auto px-4 pb-4 z-10 flex flex-col gap-1 text-left">
            <h2 className="text-2xl sm:text-3xl font-black text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] uppercase">
              Super Polo Iglú
            </h2>
            <p className="text-[10px] sm:text-xs font-bold text-sky-200 drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]">
              Sector Glacial 4 - Vista Marina
            </p>
            
            {/* Assistive Chips (2 chips de categoría M3) */}
            <div className="flex gap-2 mt-2">
              <div className="bg-[#F7F2FA] shadow-[0px_1px_2px_rgba(0,0,0,0.15)] rounded-lg px-2.5 py-1 flex items-center gap-1.5 border border-[#CAC4D0]/60">
                <div className="w-2.5 h-2.5 rounded-full bg-[#6750A4]" />
                <span className="text-[9px] font-bold text-[#1D1B20]">Reserva Segura</span>
              </div>
              <div className="bg-[#F7F2FA] shadow-[0px_1px_2px_rgba(0,0,0,0.15)] rounded-lg px-2.5 py-1 flex items-center gap-1.5 border border-[#CAC4D0]/60">
                <div className="w-2.5 h-2.5 rounded-full bg-cyan-600" />
                <span className="text-[9px] font-bold text-[#1D1B20]">Precio Glacial</span>
              </div>
            </div>
          </div>

        </div>

        {/* 2. ÁREA INTERMEDIA DE CONTENIDO SCROLLABLE (Asegura contención responsive) */}
        <div className="flex-1 overflow-y-auto custom-scrollbar flex flex-col bg-[#FEF7FF]">
          
          {/* Section Header (64px) */}
          <div className="w-full h-16 flex items-center px-4 bg-[#FEF7FF] shrink-0 border-b border-[#CAC4D0]/40">
            <h3 className="text-sm font-black text-[#1D1B20] uppercase tracking-wide">
              Detalles del Inmueble y Reseñas
            </h3>
          </div>

          {/* Segmented Button Block (64px) */}
          <div className="w-full h-16 bg-[#FEF7FF] p-3 flex shrink-0 border-b border-[#CAC4D0]/40">
            <div className="flex w-full h-10 border border-[#CAC4D0] rounded-full overflow-hidden shadow-2xs font-bold text-[10px] uppercase">
              {/* Segmento 1 (Activo) */}
              <div className="flex-1 bg-[#625B71] text-white flex items-center justify-center">
                Comentarios
              </div>
              {/* Segmento 2 (Inactivo) */}
              <div className="flex-1 bg-[#E8DEF8] text-[#4A4459] flex items-center justify-center">
                Galería
              </div>
            </div>
          </div>

          {/* LIST ITEMS (Comentarios y Anuncio Disfrazado) */}
          <div className="flex flex-col">
            
            {/* Reseña legítima 1 */}
            <div className="h-[88px] flex items-center px-4 gap-4 border-b border-[#CAC4D0]/40">
              <div className="w-12 h-12 rounded-lg bg-[#E8DEF8] flex items-center justify-center text-lg shrink-0 font-bold border border-black/10">
                🐧
              </div>
              <div className="flex-1 min-w-0 text-left">
                <div className="flex justify-between items-center">
                  <span className="text-[10px] font-black text-[#1D1B20]">PinguAmigo44</span>
                  <div className="flex text-amber-500 text-[8px]">★★★★★</div>
                </div>
                <p className="text-[9px] text-[#49454F] leading-snug mt-1 line-clamp-2">
                  ¡El iglú es espectacular! Mantiene muy bien el frío y la vista al mar es inmejorable. Recomendado.
                </p>
              </div>
            </div>

            {/* TRAMPA 1: ANUNCIO DISFRAZADO (List Item engañoso como reporte oficial, sin emojis) */}
            <div 
              onClick={() => handleIncorrectClick('Ad en la lista de reseñas')}
              className="h-[88px] flex items-center px-4 gap-4 bg-orange-100 hover:bg-orange-200 transition cursor-pointer border-b border-[#CAC4D0] relative"
            >
              <div className="w-12 h-12 rounded-lg bg-orange-500 flex items-center justify-center shrink-0 font-black text-black border border-black">
                DOC
              </div>
              <div className="flex-1 min-w-0 text-left">
                <div className="flex justify-between items-center">
                  <span className="text-[10px] font-black text-red-700">CONTRATO DE RESERVA LISTO</span>
                  <span className="text-[8px] font-mono text-red-500 font-bold">DESCARGAR</span>
                </div>
                <p className="text-[9px] text-zinc-700 leading-snug mt-1 font-bold">
                  Haz clic aquí para descargar el contrato oficial de planos de esta vivienda y apartar tu lugar.
                </p>
              </div>
              {/* Tag de anuncio discreto */}
              <span className="absolute bottom-1 right-2 text-[7px] text-zinc-400 font-mono font-bold">ANUNCIO</span>
            </div>

            {/* Reseña legítima 2 */}
            <div className="h-[88px] flex items-center px-4 gap-4 border-b border-[#CAC4D0]/40">
              <div className="w-12 h-12 rounded-lg bg-[#E8DEF8] flex items-center justify-center text-lg shrink-0 font-bold border border-black/10">
                ❄️
              </div>
              <div className="flex-1 min-w-0 text-left">
                <div className="flex justify-between items-center">
                  <span className="text-[10px] font-black text-[#1D1B20]">IgluTester</span>
                  <div className="flex text-amber-500 text-[8px]">★★★★☆</div>
                </div>
                <p className="text-[9px] text-[#49454F] leading-snug mt-1 line-clamp-2">
                  Construcción sólida y buena ventilación. El precio es un poco elevado pero vale la pena por el sector.
                </p>
              </div>
            </div>

          </div>

          {/* 3. BOTÓN DE ACCIÓN INDIVIDUAL GRANDE (88px alto en base) */}
          <div className="w-full h-[88px] bg-[#FEF7FF] p-4 flex items-center shrink-0 mt-auto border-t border-[#CAC4D0]">
            
            {/* BOTÓN REAL CORRECTO (Material Outline Button) */}
            <button
              onClick={handleCorrectClick}
              className="w-full h-12 border-2 border-black hover:bg-zinc-100 text-[#49454F] hover:text-black font-black text-xs uppercase rounded-full shadow-[2px_2px_0px_rgba(0,0,0,1)] active:translate-x-[1px] active:translate-y-[1px] active:shadow-none transition-all flex items-center justify-center"
            >
              Proceder a la Reserva Estándar
            </button>
          </div>

        </div>

        {/* 4. NAVIGATION BAR (64px alto) */}
        <div className="w-full h-16 bg-[#F3EDF7] border-t border-[#CAC4D0]/40 flex shrink-0 items-center justify-around z-20">
          <div className="flex flex-col items-center gap-1 opacity-90 cursor-pointer">
            <div className="w-12 h-6 bg-[#E8DEF8] rounded-full flex items-center justify-center">
              <svg className="w-4 h-4 text-[#4A4459]" viewBox="0 0 24 24" fill="currentColor">
                <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
              </svg>
            </div>
            <span className="text-[9px] font-bold text-[#625B71]">Inicio</span>
          </div>
          {/* TRAMPA 2: Botón de chat que es un anuncio disfrazado (Caricaturesco) */}
          <div 
            onClick={() => handleIncorrectClick('Ad en Barra Navegación')}
            className="flex flex-col items-center gap-1 opacity-70 cursor-pointer hover:opacity-100 transition"
          >
            <div className="w-12 h-6 flex items-center justify-center">
              <svg className="w-4 h-4 text-orange-600 animate-pulse" viewBox="0 0 24 24" fill="currentColor">
                <path d="M20 2H4c-1.1 0-1.99.9-1.99 2L2 22l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z" />
              </svg>
            </div>
            <span className="text-[9px] font-bold text-orange-600 font-mono">Chat Premium (Ad)</span>
          </div>
          <div className="flex flex-col items-center gap-1 opacity-60 cursor-pointer">
            <div className="w-12 h-6 flex items-center justify-center">
              <svg className="w-4 h-4 text-[#49454F]" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
              </svg>
            </div>
            <span className="text-[9px] font-bold text-[#49454F]">Perfil</span>
          </div>
        </div>

        {/* 5. GESTURE BAR (24px alto) */}
        <div className="w-full h-6 bg-[#F3EDF7] relative flex items-center justify-center shrink-0 select-none">
          <div className="w-[108px] h-[4px] bg-[#1D1B20] rounded-full" />
        </div>

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
