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
    <div className="min-h-screen w-screen bg-[#06060c] text-zinc-200 flex items-center justify-center p-0 sm:p-4 font-sans overflow-y-auto sm:overflow-hidden relative">
      {/* Luces de fondo decorativas */}
      <div className="absolute top-1/4 left-1/4 w-[400px] h-[400px] bg-red-500/5 rounded-full blur-[120px] pointer-events-none sm:block hidden" />
      <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-emerald-500/5 rounded-full blur-[120px] pointer-events-none sm:block hidden" />

      {/* ==========================================
          MARCO DEL TELÉFONO DE CAMO (MOBILE-FIRST)
          ========================================== */}
      <div className="relative w-full h-screen sm:h-[640px] sm:max-w-[360px] bg-zinc-950 border-0 sm:border-[6px] sm:border-zinc-800 sm:rounded-[32px] shadow-2xl flex flex-col overflow-hidden">
        
        {/* Notch / Cámara del teléfono (Solo desktop) */}
        <div className="absolute top-2 left-1/2 -translate-x-1/2 w-32 h-4.5 bg-zinc-800 rounded-full z-30 sm:flex hidden items-center justify-center">
          <div className="w-2.5 h-2.5 bg-black rounded-full ml-12 border border-zinc-900" />
        </div>

        {/* Barra de Estado del Sistema (Solo desktop) */}
        <div className="h-9 bg-zinc-900/90 flex justify-between items-center px-6 text-[10px] font-mono text-zinc-400 select-none shrink-0 pt-2 z-20 border-b border-zinc-800 sm:flex hidden">
          <span>09:41 AM</span>
          <div className="flex items-center gap-1.5">
            {/* Red */}
            <svg className="w-3.5 h-3.5 fill-current text-zinc-400" viewBox="0 0 24 24">
              <path d="M12 3c-4.97 0-9 4.03-9 9 0 2.12.74 4.07 1.97 5.61L17.61 4.97C16.07 3.74 14.12 3 12 3zm7.61 5.39L6.39 19.61C7.93 20.84 9.88 21.6 12 21.6c4.97 0 9-4.03 9-9 0-2.12-.74-4.07-1.97-5.61z" />
            </svg>
            {/* Batería */}
            <div className="w-5 h-2.5 border border-zinc-500 rounded-sm p-0.5 flex items-center">
              <div className="w-3.5 h-full bg-zinc-400 rounded-2xs" />
            </div>
          </div>
        </div>

        {/* Barra de Navegación del Navegador (Simulada) */}
        <div className="bg-zinc-900 px-3 py-2 border-b border-zinc-800 flex flex-col gap-1.5 shrink-0 z-20 pt-3 sm:pt-2">
          <div className="flex items-center gap-2">
            {/* Botón Atrás (Opción 3: Salir a Polo Iglús) */}
            <button 
              onClick={handleExitClick}
              className="p-1 text-zinc-500 hover:text-white transition rounded active:bg-zinc-800"
              title="Volver y buscar en otra página de confianza"
            >
              <svg className="w-4 h-4 stroke-current" viewBox="0 0 24 24" fill="none" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="19" y1="12" x2="5" y2="12" />
                <polyline points="12 19 5 12 12 5" />
              </svg>
            </button>
            
            {/* Input URL */}
            <div className="flex-1 bg-zinc-950 border border-zinc-800 rounded-full px-3.5 py-1 text-[10px] font-mono text-zinc-400 flex items-center justify-between select-none">
              <span className="truncate">pinguilario-inmobiliario.com/listing/super-igloo</span>
              <svg className="w-3.5 h-3.5 text-zinc-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                <path d="M7 11V7a5 5 0 0 1 10 0v4" />
              </svg>
            </div>
          </div>
        </div>

        {/* ==========================================
            ÁREA DE CONTENIDO WEB CON TRAMPAS (MOCKUP)
            ========================================== */}
        <div className="flex-1 bg-[#0c0c14] overflow-y-auto custom-scrollbar p-4 flex flex-col gap-4 relative select-none">
          
          {/* Alerta de urgencia falsa en la parte superior */}
          <div className="bg-red-950/20 border border-red-500/20 p-2.5 rounded text-[10px] leading-relaxed text-red-400 font-medium">
            🔥 <strong>¡PRECIO EXCLUSIVO POR TIEMPO LIMITADO!</strong> Quedan solo <strong>2 iglús disponibles</strong> en este sector. ¡Completa la transacción antes de que se agote!
          </div>

          {/* Galería de Fotos del Iglú */}
          <div className="relative w-full aspect-video bg-zinc-950 border border-zinc-800 rounded overflow-hidden group">
            {/* Ilustración Vectorial del Iglú en Venta */}
            <svg viewBox="0 0 100 60" className="w-full h-full p-2">
              {/* Cielo estrellado */}
              <circle cx="10" cy="10" r="0.4" fill="#fff" opacity="0.8" />
              <circle cx="85" cy="15" r="0.5" fill="#fff" opacity="0.6" />
              <circle cx="45" cy="8" r="0.3" fill="#fff" />
              {/* Aurora boreal sutil */}
              <path d="M 10,25 Q 40,5 90,25" stroke="rgba(16,185,129,0.15)" strokeWidth="4" fill="none" />
              {/* Suelo de hielo */}
              <rect x="0" y="45" width="100" height="15" fill="#1e293b" />
              {/* Iglú */}
              <path d="M 25,45 A 20,20 0 0,1 65,45 Z" fill="#e2e8f0" stroke="#94a3b8" strokeWidth="0.8" />
              {/* Bloques de hielo */}
              <path d="M 30,35 Q 45,38 60,35 M 35,27 Q 45,30 55,27" stroke="#cbd5e1" strokeWidth="0.5" fill="none" />
              {/* Entrada del iglú */}
              <path d="M 40,45 A 8,8 0 0,1 50,45 Z" fill="#0f172a" stroke="#94a3b8" strokeWidth="0.8" />
              {/* Luna */}
              <circle cx="80" cy="18" r="6" fill="#fef08a" opacity="0.1" />
              <circle cx="80" cy="18" r="4.5" fill="#fef08a" />
            </svg>

            {/* Banner publicitario DISFRAZADO sobre la foto (Trampa) */}
            <button 
              onClick={() => handleIncorrectClick('Banner Foto')}
              className="absolute top-1 right-1 bg-amber-500 hover:bg-amber-400 text-black text-[8px] font-extrabold px-1.5 py-0.5 rounded shadow flex items-center gap-1 active:scale-95 transition"
            >
              <span>AD</span>
              <span>DESCARGAR PLANOS PDF 📥</span>
            </button>
          </div>

          {/* Información del Listado */}
          <div className="space-y-1">
            <div className="flex justify-between items-start">
              <h2 className="text-sm font-bold text-white tracking-wide">
                Super Polo Iglú Premium
              </h2>
              <span className="text-emerald-400 font-mono font-bold text-xs">
                120,000 $P
              </span>
            </div>
            <p className="text-[10px] text-zinc-500">
              Sector Glacial 4 - Frente Mar de Ross
            </p>
          </div>

          {/* TRAMPA 1: Banner de descarga estilo botón de Siguiente (Anuncio Disfrazado) */}
          <div 
            onClick={() => handleIncorrectClick('Banner Descargar')}
            className="border border-green-500/20 bg-green-950/10 p-2.5 rounded-lg flex items-center justify-between cursor-pointer hover:bg-green-950/20 transition active:scale-[0.98]"
          >
            <div className="flex items-center gap-2">
              {/* Icono descarga */}
              <div className="p-1.5 bg-emerald-500 rounded text-black shrink-0 animate-bounce">
                <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                  <polyline points="7 10 12 15 17 10" />
                  <line x1="12" y1="15" x2="12" y2="3" />
                </svg>
              </div>
              <div className="text-left">
                <div className="text-[10px] font-bold text-white">RESERVAR ESTE IGLÚ AHORA</div>
                <div className="text-[8px] text-zinc-500 font-mono">Descargar contrato_reserva_igloo.exe</div>
              </div>
            </div>
            <div className="bg-emerald-500 text-black text-[9px] font-extrabold px-2 py-1 rounded">
              CONTINUAR
            </div>
          </div>

          {/* Detalles Técnicos */}
          <div className="bg-zinc-950/50 border border-zinc-900 rounded p-3 text-[10px] space-y-2 leading-relaxed text-zinc-400">
            <div className="grid grid-cols-2 gap-2 border-b border-zinc-900 pb-2">
              <div>📐 Área: <strong>85 m²</strong></div>
              <div>❄️ Aislamiento: <strong>Glacial A+</strong></div>
            </div>
            <p>
              Iglú premium construido enteramente con bloques de hielo compactado mediante presión térmica. Incluye chimenea de ventilación central y área integrada para almacenamiento de pescado.
            </p>
          </div>

          {/* TRAMPA 2: Botón de Compra Invasivo Gigante (Anuncio Disfrazado) */}
          <button
            onClick={() => handleIncorrectClick('Botón Gigante Compra')}
            className="w-full bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-black font-extrabold py-3 px-4 rounded text-xs tracking-wider shadow-lg active:scale-[0.98] transition flex flex-col items-center justify-center leading-none"
          >
            <span>👉 ¡COMPRAR AHORA CON UN 80% DE DESCUENTO! 👈</span>
            <span className="text-[8px] font-normal opacity-70 mt-1">Oferta exclusiva de la red de anunciantes asociados</span>
          </button>

          {/* Enlace secundario (Opción 3: Salir a Polo Iglús) */}
          <div className="text-center py-1">
            <button 
              onClick={handleExitClick}
              className="text-[9px] text-zinc-500 hover:text-red-400 transition underline underline-offset-2"
            >
              ¿Este portal tiene muchos anuncios? Buscar listados en Polo Iglús
            </button>
          </div>

          {/* ==========================================
              BOTÓN LEGÍTIMO ESCONDIDO (Opción 2)
              ========================================== */}
          <div className="mt-4 pt-4 border-t border-zinc-900 flex justify-between items-center gap-3">
            <div className="flex flex-col">
              <span className="text-[8px] uppercase tracking-wider text-zinc-500">Reserva Oficial</span>
              <span className="text-[10px] text-zinc-300 font-mono">Pinguilario S.A.</span>
            </div>
            {/* Botón correcto: simple, sobrio, sin llamadas a la acción agresivas */}
            <button
              onClick={handleCorrectClick}
              className="bg-zinc-900 border border-zinc-800 hover:border-zinc-700 text-zinc-300 font-bold py-2 px-4 rounded text-[10px] tracking-wide active:scale-95 transition"
            >
              Proceder a la reserva estándar
            </button>
          </div>

        </div>

        {/* Botón Home físico del teléfono (Solo desktop) */}
        <div className="h-5 bg-zinc-900 sm:flex hidden items-center justify-center shrink-0 border-t border-zinc-800">
          <div className="w-24 h-1 bg-zinc-700 rounded-full" />
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
            className="absolute inset-0 bg-black/90 backdrop-blur-md z-50 flex flex-col items-center justify-center p-4 font-mono select-none"
          >
            {/* Alertas de malware falsas flotantes */}
            {popups.map(p => (
              <motion.div
                key={p.id}
                initial={{ scale: 0, x: `${p.x}vw`, y: `${p.y}vh` }}
                animate={{ scale: 1 }}
                className="absolute bg-red-950 border border-red-500 text-red-400 rounded-md p-3.5 shadow-2xl max-w-[280px] pointer-events-none"
                style={{ top: `${p.y}%`, left: `${p.x}%` }}
              >
                <div className="flex items-center gap-2 border-b border-red-500/30 pb-1.5 mb-1.5 text-[10px] font-bold">
                  <span className="text-xs">⚠️</span>
                  <span>SECURITY WARN</span>
                </div>
                <p className="text-[9px] leading-snug">{p.title}</p>
              </motion.div>
            ))}

            {/* Caja de Estado central */}
            <div className="bg-zinc-950 border border-red-500/40 rounded-lg p-6 max-w-sm w-full flex flex-col gap-4 text-center relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-1 bg-red-500 animate-pulse" />
              
              <div className="text-red-500 text-2xl animate-bounce">⚠️</div>
              
              <div className="space-y-1">
                <h3 className="text-white text-xs font-bold uppercase tracking-wider">
                  Descarga Ejecutada en Segundo Plano
                </h3>
                <p className="text-[10px] text-zinc-500 leading-relaxed">
                  Has pulsado en un anuncio publicitario. Se están abriendo múltiples ventanas y descargando archivos no deseados.
                </p>
              </div>

              {/* Barra de carga maliciosa */}
              <div className="space-y-1.5">
                <div className="w-full h-2 bg-zinc-900 rounded overflow-hidden border border-zinc-800">
                  <motion.div 
                    className="h-full bg-red-600" 
                    style={{ width: `${hackedProgress}%` }}
                  />
                </div>
                <div className="flex justify-between text-[8px] text-zinc-500">
                  <span>Descargando...</span>
                  <span>{hackedProgress}%</span>
                </div>
              </div>

              <div className="text-[9px] text-red-400/80 animate-pulse">
                Redirigiendo de vuelta al subconsciente de Camo...
              </div>
            </div>

          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
