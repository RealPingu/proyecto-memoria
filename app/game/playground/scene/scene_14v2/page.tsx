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
      { title: '¡VIRUS DETECTADO! Descarga CleanPingu.exe', x: 10, y: 15 },
      { title: 'CRÉDITO APROBADO: Paga 0% interés aquí', x: 45, y: 30 },
      { title: 'Descarga: Planos_Iglu_Gratis.pdf.exe', x: 20, y: 60 },
      { title: '¡ALERTA! Tu celular está caliente. Enfríalo ya', x: 50, y: 70 },
      { title: 'Ganaste un viaje al Polo Norte. Reclama', x: 5, y: 45 }
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
    }, 350);

    const progressInterval = setInterval(() => {
      setHackedProgress(prev => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        return prev + 8;
      });
    }, 150);

    const timeout = setTimeout(() => {
      clearInterval(interval);
      clearInterval(progressInterval);
      router.push('/game/playground/scene/scene_14/resultado_1');
    }, 3200);

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
    <div className="min-h-screen w-screen bg-[#050508] text-zinc-200 flex flex-col p-4 md:p-8 font-sans overflow-y-auto custom-scrollbar relative">
      {/* Background Decorative Glows */}
      <div className="absolute top-0 left-1/4 w-[400px] h-[400px] bg-cyan-500/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-indigo-500/5 rounded-full blur-[100px] pointer-events-none" />
 
      <div className="max-w-6xl w-full mx-auto flex-1 flex flex-col relative z-10">
        
        {/* Header */}
        <header className="flex flex-col md:flex-row justify-between items-start md:items-center border-b border-zinc-900 pb-4 mb-6 shrink-0 gap-4">
          <div className="space-y-1">
            <h1 className="text-xs font-mono uppercase tracking-widest text-cyan-400 font-bold">
              Playground de Animación y Decisiones v2
            </h1>
            <p className="text-xl font-bold tracking-tight text-white flex items-center gap-2">
              Escena 14 v2 — Mockup Móvil de Batalla Mental
            </p>
            <p className="text-xs text-zinc-500">
              Prueba la simulación responsiva (Mobile-First) de la batalla de Camo contra anuncios disfrazados.
            </p>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => router.push('/game/playground')}
              className="px-3 py-1.5 text-xs font-medium bg-zinc-950 border border-zinc-800 hover:border-zinc-700 text-zinc-400 hover:text-white rounded transition"
            >
              ← Volver al Menú
            </button>
          </div>
        </header>

        {/* Content Layout (Centered Mobile Device) */}
        <div className="flex-1 flex flex-col items-center justify-center p-2 min-h-[600px] select-none">
          
          {/* ==========================================
              MARCO DEL TELÉFONO DE CAMO (MOBILE-FIRST)
              ========================================== */}
          <div className="relative w-full h-full sm:h-[580px] sm:max-w-[340px] bg-zinc-950 border-0 sm:border-[5px] sm:border-zinc-800 sm:rounded-[28px] shadow-2xl flex flex-col overflow-hidden">
            
            {/* Notch / Cámara (Solo desktop) */}
            <div className="absolute top-1.5 left-1/2 -translate-x-1/2 w-28 h-3.5 bg-zinc-800 rounded-full z-30 sm:flex hidden items-center justify-center" />

            {/* Barra de Estado (Solo desktop) */}
            <div className="h-7 bg-zinc-900/90 flex justify-between items-center px-5 text-[9px] font-mono text-zinc-500 select-none shrink-0 pt-1.5 z-20 border-b border-zinc-800 sm:flex hidden">
              <span>09:41 AM</span>
              <div className="flex items-center gap-1">
                <div className="w-4 h-2 border border-zinc-600 rounded-2xs p-0.5 flex items-center">
                  <div className="w-2.5 h-full bg-zinc-500 rounded-3xs" />
                </div>
              </div>
            </div>

            {/* Barra de Navegación del Navegador (Simulada) */}
            <div className="bg-zinc-900 px-2 py-1.5 border-b border-zinc-800 flex flex-col gap-1 shrink-0 z-20">
              <div className="flex items-center gap-1.5">
                {/* Botón Atrás (Opción 3) */}
                <button 
                  onClick={handleExitClick}
                  className="p-1 text-zinc-500 hover:text-white transition rounded active:bg-zinc-800"
                >
                  <svg className="w-3.5 h-3.5 stroke-current" viewBox="0 0 24 24" fill="none" strokeWidth="2.5">
                    <line x1="19" y1="12" x2="5" y2="12" />
                    <polyline points="12 19 5 12 12 5" />
                  </svg>
                </button>
                
                {/* URL */}
                <div className="flex-1 bg-zinc-950 border border-zinc-800 rounded-full px-3 py-0.5 text-[9px] font-mono text-zinc-500 flex items-center justify-between select-none">
                  <span className="truncate">pinguilario-inmobiliario.com/listing</span>
                </div>
              </div>
            </div>

            {/* Contenido Web con Trampas (Mockup) */}
            <div className="flex-1 bg-[#0c0c14] overflow-y-auto custom-scrollbar p-3 flex flex-col gap-3 relative text-zinc-300">
              
              {/* Alerta */}
              <div className="bg-red-950/20 border border-red-500/20 p-2 rounded text-[9px] leading-relaxed text-red-400 font-medium">
                🔥 <strong>PRECIO EXCLUSIVO:</strong> Quedan solo <strong>2 iglús</strong>. ¡Completa la transacción antes de que se agote!
              </div>

              {/* Foto Iglú */}
              <div className="relative w-full aspect-video bg-zinc-950 border border-zinc-800 rounded overflow-hidden">
                <svg viewBox="0 0 100 60" className="w-full h-full p-2">
                  <circle cx="10" cy="10" r="0.4" fill="#fff" opacity="0.8" />
                  <rect x="0" y="45" width="100" height="15" fill="#1e293b" />
                  <path d="M 25,45 A 20,20 0 0,1 65,45 Z" fill="#e2e8f0" stroke="#94a3b8" strokeWidth="0.8" />
                  <circle cx="80" cy="18" r="4.5" fill="#fef08a" />
                </svg>
                
                {/* AD 1 */}
                <button 
                  onClick={() => handleIncorrectClick('Ad Foto')}
                  className="absolute top-1 right-1 bg-amber-500 hover:bg-amber-400 text-black text-[7px] font-extrabold px-1 py-0.5 rounded shadow active:scale-95 transition"
                >
                  DESCARGAR PLANOS PDF 📥
                </button>
              </div>

              {/* Info */}
              <div className="space-y-0.5">
                <div className="flex justify-between items-start">
                  <h3 className="text-xs font-bold text-white tracking-wide">
                    Super Polo Iglú Premium
                  </h3>
                  <span className="text-emerald-400 font-mono font-bold text-xs">
                    120,000 $P
                  </span>
                </div>
              </div>

              {/* TRAMPA 1 */}
              <div 
                onClick={() => handleIncorrectClick('Ad Descarga')}
                className="border border-green-500/20 bg-green-950/10 p-2 rounded flex items-center justify-between cursor-pointer hover:bg-green-950/20 transition active:scale-[0.98]"
              >
                <div className="flex items-center gap-1.5 text-left">
                  <div className="p-1 bg-emerald-500 rounded text-black shrink-0">
                    <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                      <polyline points="7 10 12 15 17 10" />
                      <line x1="12" y1="15" x2="12" y2="3" />
                    </svg>
                  </div>
                  <div>
                    <div className="text-[9px] font-bold text-white">RESERVAR ESTE IGLÚ AHORA</div>
                    <div className="text-[7px] text-zinc-500 font-mono">contrato_reserva_igloo.exe</div>
                  </div>
                </div>
                <div className="bg-emerald-500 text-black text-[8px] font-extrabold px-1.5 py-0.5 rounded">
                  CONTINUAR
                </div>
              </div>

              {/* TRAMPA 2 */}
              <button
                onClick={() => handleIncorrectClick('Ad Boton Gigante')}
                className="w-full bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-black font-extrabold py-2.5 px-3 rounded text-[9px] tracking-wider shadow active:scale-[0.98] transition flex flex-col items-center justify-center leading-none"
              >
                <span>👉 ¡COMPRAR AHORA CON 80% DESCUENTO! 👈</span>
              </button>

              {/* Enlace secundario (Opción 3) */}
              <div className="text-center py-0.5">
                <button 
                  onClick={handleExitClick}
                  className="text-[8px] text-zinc-500 hover:text-red-400 transition underline"
                >
                  ¿Muchos anuncios? Buscar en Polo Iglús
                </button>
              </div>

              {/* BOTÓN REAL (Opción 2) */}
              <div className="mt-2 pt-2 border-t border-zinc-900 flex justify-between items-center gap-2">
                <span className="text-[8px] text-zinc-500">Pinguilario S.A.</span>
                <button
                  onClick={handleCorrectClick}
                  className="bg-zinc-900 border border-zinc-800 hover:border-zinc-700 text-zinc-300 font-bold py-1.5 px-3 rounded text-[8px] tracking-wide active:scale-95 transition"
                >
                  Proceder a la reserva estándar
                </button>
              </div>

            </div>

            {/* Botón Home (Solo desktop) */}
            <div className="h-4 bg-zinc-900 sm:flex hidden items-center justify-center shrink-0 border-t border-zinc-800">
              <div className="w-20 h-0.5 bg-zinc-700 rounded-full" />
            </div>

          </div>

          {/* Capa de caos maliciosos */}
          <AnimatePresence>
            {clickedAd && (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 bg-black/90 backdrop-blur-sm z-50 flex flex-col items-center justify-center p-4 font-mono text-center"
              >
                {popups.map(p => (
                  <motion.div
                    key={p.id}
                    initial={{ scale: 0, x: `${p.x}vw`, y: `${p.y}vh` }}
                    animate={{ scale: 1 }}
                    className="absolute bg-red-950 border border-red-500 text-red-400 rounded p-2 shadow-2xl max-w-[200px]"
                    style={{ top: `${p.y}%`, left: `${p.x}%` }}
                  >
                    <div className="text-[8px] font-bold border-b border-red-500/30 pb-1 mb-1">⚠️ MALWARE ALARM</div>
                    <p className="text-[7px] leading-tight">{p.title}</p>
                  </motion.div>
                ))}

                <div className="bg-zinc-950 border border-red-500/40 rounded-lg p-5 max-w-[280px] w-full flex flex-col gap-3">
                  <div className="text-red-500 text-xl">⚠️</div>
                  <h3 className="text-white text-xs font-bold uppercase tracking-wider">
                    DESCARGA FORZADA DETECTADA
                  </h3>
                  <div className="space-y-1">
                    <div className="w-full h-1.5 bg-zinc-900 rounded overflow-hidden">
                      <motion.div className="h-full bg-red-600" style={{ width: `${hackedProgress}%` }} />
                    </div>
                    <span className="text-[8px] text-zinc-500">{hackedProgress}% Completo</span>
                  </div>
                  <span className="text-[8px] text-red-400/80 animate-pulse">Redirigiendo a consecuencias...</span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

        </div>

      </div>
    </div>
  );
}
