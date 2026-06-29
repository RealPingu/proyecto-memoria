'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';

export default function Scene14v2PlaygroundPage() {
  const router = useRouter();
  const [clickedAd, setClickedAd] = useState<string | null>(null);
  const [hackedProgress, setHackedProgress] = useState(0);
  const [popups, setPopups] = useState<{ id: number; x: number; y: number; title: string }[]>([]);

  // Efecto de descarga caótica si cae en un banner engañoso (Opción 1)
  useEffect(() => {
    if (!clickedAd) return;

    const popupList = [
      { title: 'ALERTA DE DESCARGA: CleanPingu.exe iniciado', x: 10, y: 15 },
      { title: 'PROPUESTA COMERCIAL: Crédito inmediato solicitado', x: 45, y: 30 },
      { title: 'DESCARGA COMPLETA: Planos_Iglu_Gratis.exe', x: 20, y: 60 },
      { title: 'ALERTA DE SISTEMA: Ejecutando scripts desconocidos', x: 50, y: 70 },
      { title: 'SUSCRIPCIÓN ACTIVA: Servicio Premium Glacial contratado', x: 5, y: 45 }
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
    <div className="h-[100dvh] w-full bg-[#030712] text-zinc-100 flex items-center justify-center p-0 sm:p-4 font-sans overflow-hidden relative">
      {/* Luces de fondo decorativas de tono ártico */}
      <div className="absolute top-1/4 left-1/4 w-[350px] h-[350px] bg-sky-500/5 rounded-full blur-[100px] pointer-events-none sm:block hidden" />
      <div className="absolute bottom-1/4 right-1/4 w-[350px] h-[350px] bg-cyan-500/5 rounded-full blur-[100px] pointer-events-none sm:block hidden" />

      {/* ==========================================
          MARCO DEL TELÉFONO DE CAMO (MOBILE-FIRST)
          ========================================== */}
      <div className="relative w-full h-[100dvh] sm:h-[640px] sm:max-w-[360px] bg-sky-950 border-0 sm:border-[6px] sm:border-sky-900 sm:rounded-[36px] shadow-2xl flex flex-col overflow-hidden shrink-0">
        
        {/* Notch / Cámara del teléfono (Solo desktop) */}
        <div className="absolute top-2 left-1/2 -translate-x-1/2 w-32 h-4.5 bg-sky-900 rounded-full z-30 sm:flex hidden items-center justify-center">
          <div className="w-2.5 h-2.5 bg-black rounded-full ml-12 border border-sky-950" />
        </div>

        {/* Barra de Estado del Sistema (Solo desktop) */}
        <div className="h-9 bg-sky-950 flex justify-between items-center px-6 text-[10px] font-mono text-sky-200 select-none shrink-0 pt-2 z-20 border-b border-sky-900/60 sm:flex hidden">
          <span>09:41 AM</span>
          <div className="flex items-center gap-1.5">
            <svg className="w-3.5 h-3.5 fill-current text-sky-300" viewBox="0 0 24 24">
              <path d="M12 3c-4.97 0-9 4.03-9 9 0 2.12.74 4.07 1.97 5.61L17.61 4.97C16.07 3.74 14.12 3 12 3zm7.61 5.39L6.39 19.61C7.93 20.84 9.88 21.6 12 21.6c4.97 0 9-4.03 9-9 0-2.12-.74-4.07-1.97-5.61z" />
            </svg>
            <div className="w-5 h-2.5 border border-sky-500 rounded-sm p-0.5 flex items-center">
              <div className="w-3.5 h-full bg-sky-400 rounded-2xs" />
            </div>
          </div>
        </div>

        {/* Barra de Navegación del Navegador */}
        <div className="bg-sky-900 px-3 py-2 border-b border-sky-800 flex flex-col gap-1.5 shrink-0 z-20 pt-3 sm:pt-2">
          <div className="flex items-center gap-2 min-w-0 w-full">
            {/* Botón Atrás (Opción 3) */}
            <button 
              onClick={handleExitClick}
              className="p-1.5 text-sky-200 hover:text-white transition rounded active:bg-sky-800 shrink-0"
              title="Volver y buscar en otra página de confianza"
            >
              <svg className="w-4 h-4 stroke-current" viewBox="0 0 24 24" fill="none" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="19" y1="12" x2="5" y2="12" />
                <polyline points="12 19 5 12 12 5" />
              </svg>
            </button>
            
            {/* Input URL */}
            <div className="flex-1 min-w-0 bg-sky-950 border border-sky-800 rounded-full px-3.5 py-1 text-[10px] font-mono text-sky-300 flex items-center justify-between select-none">
              <span className="truncate text-sky-300 block w-full">pinguilario-inmobiliario.com/listing/super-igloo</span>
            </div>
          </div>
        </div>

        {/* ==========================================
            ÁREA DE CONTENIDO WEB - PALETA POLAR CELESTE/AZUL
            ========================================== */}
        <div className="flex-1 bg-[#e0f2fe] overflow-y-auto custom-scrollbar p-4 flex flex-col gap-4 relative select-none">
          
          {/* Alerta de urgencia falsa */}
          <div className="bg-red-500 text-white border-2 border-black p-3 rounded-lg text-[10px] leading-relaxed font-bold shadow-[2px_2px_0px_rgba(0,0,0,1)]">
            ALERTA: PRECIO EXCLUSIVO POR TIEMPO LIMITADO. Quedan solo 2 iglus disponibles en este sector.
          </div>

          {/* Galería de Fotos del Iglú */}
          <div className="relative w-full aspect-video bg-sky-900 border-2 border-black rounded-lg overflow-hidden group shadow-[2px_2px_0px_rgba(0,0,0,1)]">
            <svg viewBox="0 0 100 60" className="w-full h-full p-2">
              <circle cx="10" cy="10" r="0.4" fill="#fff" opacity="0.8" />
              <circle cx="85" cy="15" r="0.5" fill="#fff" opacity="0.6" />
              <rect x="0" y="45" width="100" height="15" fill="#0c4a6e" />
              <path d="M 25,45 A 20,20 0 0,1 65,45 Z" fill="#f0f9ff" stroke="#000" strokeWidth="1.2" />
              <path d="M 30,35 Q 45,38 60,35 M 35,27 Q 45,30 55,27" stroke="#0284c7" strokeWidth="0.8" fill="none" />
              <path d="M 40,45 A 8,8 0 0,1 50,45 Z" fill="#0f172a" stroke="#000" strokeWidth="1.2" />
              <circle cx="80" cy="18" r="4.5" fill="#fef08a" stroke="#000" strokeWidth="1" />
            </svg>

            {/* Banner publicitario DISFRAZADO */}
            <button 
              onClick={() => handleIncorrectClick('Planos de descarga')}
              className="absolute top-2 right-2 bg-yellow-400 hover:bg-yellow-300 text-black text-[9px] font-black px-2 py-1 border-2 border-black rounded shadow-[2px_2px_0px_rgba(0,0,0,1)] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none transition-all"
            >
              DESCARGAR PLANOS EN PDF
            </button>
          </div>

          {/* Información del Listado */}
          <div className="space-y-1">
            <div className="flex justify-between items-start">
              <h2 className="text-sm font-black text-sky-950 tracking-wide uppercase">
                Super Polo Iglu Premium
              </h2>
              <span className="text-sky-700 font-mono font-black text-sm">
                120.000 $P
              </span>
            </div>
            <p className="text-[10px] text-sky-600 font-bold uppercase tracking-wider">
              Sector Glacial 4 - Frente Mar de Ross
            </p>
          </div>

          {/* TRAMPA 1: Banner estilo paso siguiente */}
          <div 
            onClick={() => handleIncorrectClick('Contrato ejecutable')}
            className="border-2 border-black bg-cyan-400 text-black p-3 rounded-lg flex items-center justify-between cursor-pointer hover:bg-cyan-300 transition shadow-[3px_3px_0px_rgba(0,0,0,1)] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none"
          >
            <div className="text-left space-y-0.5">
              <div className="text-[10px] font-black uppercase">RESERVAR ESTE IGLU AHORA</div>
              <div className="text-[8px] font-mono font-bold opacity-80">descargar_contrato_iglu_gratis.exe</div>
            </div>
            <div className="bg-black text-white text-[9px] font-black px-3 py-1 border border-black rounded uppercase">
              ENTRAR
            </div>
          </div>

          {/* Detalles Técnicos */}
          <div className="bg-sky-100 border-2 border-black rounded-lg p-3 text-[10px] space-y-2 leading-relaxed text-sky-950 shadow-[2px_2px_0px_rgba(0,0,0,1)]">
            <div className="grid grid-cols-2 gap-2 border-b border-sky-200 pb-2 font-bold uppercase text-[9px]">
              <div className="text-sky-700">Area: 85 metros</div>
              <div className="text-sky-800">Aislamiento: Glacial A+</div>
            </div>
            <p className="text-sky-900">
              Iglú premium construido enteramente con bloques de hielo compactado mediante presión térmica. Incluye chimenea de ventilación central y área integrada para almacenamiento de pescado.
            </p>
          </div>

          {/* TRAMPA 2: Botón de Compra Directo Engañoso */}
          <button
            onClick={() => handleIncorrectClick('Compra directa descuento')}
            className="w-full bg-orange-500 hover:bg-orange-400 text-black font-black py-3.5 px-4 border-2 border-black rounded-lg text-xs tracking-wider shadow-[3px_3px_0px_rgba(0,0,0,1)] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none transition-all uppercase text-center"
          >
            COMPRAR AHORA CON 80% DE DESCUENTO
          </button>

          {/* Enlace de escape */}
          <div className="text-center py-1">
            <button 
              onClick={handleExitClick}
              className="text-[10px] text-sky-700 hover:text-sky-900 font-bold transition underline decoration-2"
            >
              Buscar este listado en portales seguros y confiables
            </button>
          </div>

          {/* ==========================================
              BOTÓN LEGÍTIMO ESCONDIDO (Opción 2)
              ========================================== */}
          <div className="mt-auto pt-4 border-t-2 border-sky-300 flex justify-between items-center gap-3">
            <div className="flex flex-col">
              <span className="text-[8px] uppercase tracking-wider text-sky-600 font-bold">Reserva Oficial</span>
              <span className="text-[10px] text-sky-900 font-mono font-bold">Pinguilario S.A.</span>
            </div>
            <button
              onClick={handleCorrectClick}
              className="bg-sky-800 border-2 border-black hover:bg-sky-700 text-zinc-100 font-black py-2.5 px-4 rounded-lg text-[10px] tracking-wide shadow-[2px_2px_0px_rgba(0,0,0,1)] active:translate-x-[1px] active:translate-y-[1px] active:shadow-none transition-all uppercase"
            >
              Proceder a la reserva estandar
            </button>
          </div>

        </div>

        {/* Botón Home físico del teléfono (Solo desktop) */}
        <div className="h-5 bg-sky-950 sm:flex hidden items-center justify-center shrink-0 border-t border-sky-900">
          <div className="w-24 h-1 bg-sky-800 rounded-full" />
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
