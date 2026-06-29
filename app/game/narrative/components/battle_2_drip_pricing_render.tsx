'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Scene17Batalla from '../illustrations/scene_17_batalla';
import { FearTremble } from './dialogue_effects';

import { getNodeLabel } from './progress_helpers';

interface Battle2Props {
  onCorrect: () => void;
  onIncorrect: () => void;
  onBack: () => void;
  visitedNodes: string[];
  currentNodeId: string;
  jumpToNode: (nodeId: string) => void;
}

export default function Battle2DripPricingRender({ 
  onCorrect, 
  onIncorrect, 
  onBack,
  visitedNodes,
  currentNodeId,
  jumpToNode
}: Battle2Props) {
  // Estados del asistente de checkout interactivo
  const [step, setStep] = useState(1);
  const [checkedSeguro, setCheckedSeguro] = useState(true); // Trampa
  const [checkedDonacion, setCheckedDonacion] = useState(true); // Trampa
  const [checkedTarifa, setCheckedTarifa] = useState(true); // Trampa
  
  const [smsOptIn, setSmsOptIn] = useState(false);
  const [chimneyService, setChimneyService] = useState(false);

  // Calcular total para el paso 3
  const basePrice = 120000;
  const extraSeguro = checkedSeguro ? 25 : 0;
  const extraDonacion = checkedDonacion ? 10 : 0;
  const extraTarifa = checkedTarifa ? 12.99 : 0;
  const extraChimney = chimneyService ? 15 : 0;
  const totalPrice = basePrice + extraSeguro + extraDonacion + extraTarifa + extraChimney;

  const handleConfirmPayment = () => {
    // Si dejó marcado CUALQUIER elemento del Drip Pricing, redirige a derrota
    if (checkedSeguro || checkedDonacion || checkedTarifa) {
      onIncorrect();
    } else {
      onCorrect();
    }
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
      >

        {/* 1. HEADER (shrink-0) */}
        <header className="flex justify-between items-center shrink-0 pb-3 border-b border-zinc-900/60 gap-2 flex-wrap">
          <button
            onClick={onBack}
            className="text-[9px] border border-zinc-800 text-game-muted hover:border-zinc-500 hover:text-game-accent transition-all px-3 py-1 font-bold uppercase tracking-wider rounded-sm active:scale-95 cursor-pointer"
          >
            Atrás
          </button>
          
          <div className="flex items-center gap-2 ml-auto flex-wrap justify-end">
            <span className="text-[8px] font-mono text-zinc-500 uppercase tracking-widest">
              Paso {step} de 3
            </span>

            <select
              value={currentNodeId}
              onChange={(e) => jumpToNode(e.target.value)}
              className="bg-zinc-950 border border-zinc-800 text-zinc-300 text-[9px] font-medium py-1 px-2 rounded hover:border-zinc-700 outline-none cursor-pointer max-w-[130px] sm:max-w-[170px] truncate"
            >
              {visitedNodes.map((nodeId) => (
                <option key={nodeId} value={nodeId}>
                  {getNodeLabel(nodeId)}
                </option>
              ))}
            </select>
          </div>
        </header>

        {/* 2. MAIN AREA */}
        <main className="flex-1 flex flex-col min-h-0 justify-between py-3 space-y-4 overflow-hidden">
          
          {/* Ilustración Fija (Batalla de Drip Pricing) */}
          <div className="relative w-full aspect-video flex items-center justify-center shrink-0 max-h-[30vh]">
            <div className="w-full h-full border border-game-muted/15 rounded-md overflow-hidden bg-black shadow-2xl relative">
              <Scene17Batalla />
            </div>
          </div>

          {/* Nombre del Hablante consistente */}
          <div className="shrink-0 flex items-center justify-start pl-1 text-[9px] md:text-[10px] font-bold uppercase tracking-widest text-game-accent italic block">
            <FearTremble text="EL PATRÓN OSCURO (PRECIOS POR GOTEO)" color="#06b6d4" />
          </div>

          {/* =======================================================
              CAJA DE DIÁLOGO INTERACTIVA DE CHECKOUT
              ======================================================= */}
          <div className="flex-1 w-full bg-[#131520]/80 border border-[#272a3d]/80 rounded-md flex flex-col relative select-none p-4 bg-[radial-gradient(#1e2235_1px,transparent_1px)] [background-size:16px_16px] overflow-y-auto custom-scrollbar gap-4">
            
            {/* SECCIÓN 1: Narrativa / Texto Introductorio del Patrón Oscuro */}
            <div 
              style={{ fontFamily: '"Comic Sans MS", "Comic Sans", cursive' }}
              className="text-zinc-300 text-xs md:text-sm leading-relaxed italic pr-4 border-b border-[#272a3d]/40 pb-3 shrink-0"
            >
              "¡Jajaja! Estás a un paso de completar tu compra, Camo. ¿Quién tiene tiempo para leer todo ese aburrido texto legal? Solo presiona continuar... no te preocupes por los pequeños detalles de la factura..."
            </div>

            {/* Contenedor del paso actual */}
            <div className="flex-1 flex flex-col justify-start">
              
              {step === 1 && (
                <div className="flex flex-col gap-3">
                  <div className="border-b border-[#272a3d]/40 pb-2">
                    <h3 className="text-white text-[10px] font-black uppercase tracking-wider">Confirmación de Datos del Comprador</h3>
                    <p className="text-[8.5px] text-zinc-400 mt-0.5">Revise la información de contacto para el envío del contrato legal.</p>
                  </div>
                  
                  {/* Campos de datos del comprador */}
                  <div className="space-y-2">
                    <div className="flex flex-col gap-0.5">
                      <span className="text-[8px] font-bold text-zinc-500 uppercase">Nombre Completo</span>
                      <div className="bg-[#181a26] border border-zinc-800 px-2 py-1 text-[10px] text-zinc-300 rounded font-medium">Camo El Pingüino</div>
                    </div>
                    <div className="flex flex-col gap-0.5">
                      <span className="text-[8px] font-bold text-zinc-500 uppercase">Dirección de Destino</span>
                      <div className="bg-[#181a26] border border-zinc-800 px-2 py-1 text-[10px] text-zinc-300 rounded font-medium">Glaciar Central, Sector Táctico 4</div>
                    </div>
                  </div>

                  <div className="space-y-2 mt-2 pt-2 border-t border-[#272a3d]/20">
                    {/* Opción SMS regular (Desmarcada, visible) */}
                    <label className="flex items-center gap-2 cursor-pointer text-zinc-300 select-none">
                      <input 
                        type="checkbox" 
                        checked={smsOptIn} 
                        onChange={(e) => setSmsOptIn(e.target.checked)}
                        className="accent-sky-500 w-3 h-3 border border-zinc-800 rounded bg-[#181a26]"
                      />
                      <span className="text-[9px] font-bold">Recibir notificaciones de entrega por SMS (+0.50 $P)</span>
                    </label>

                    {/* TRAMPA 1: Seguro nuclear oculto en gris de bajísimo contraste */}
                    <label className="flex items-start gap-2 cursor-pointer select-none text-[#334155] hover:text-[#475569] transition-colors mt-2">
                      <input 
                        type="checkbox" 
                        checked={checkedSeguro} 
                        onChange={(e) => setCheckedSeguro(e.target.checked)}
                        className="mt-0.5 accent-[#334155] w-3 h-3 border border-zinc-900 rounded bg-[#0d0e16]"
                      />
                      <span className="text-[8.5px] leading-tight font-medium">
                        Adherirse al programa integral de seguro polar contra deslizamientos causados por ensayos nucleares en el Polo Norte (+25.00 $P/mes).
                      </span>
                    </label>
                  </div>
                </div>
              )}

              {step === 2 && (
                <div className="flex flex-col gap-3">
                  <div className="border-b border-[#272a3d]/40 pb-2">
                    <h3 className="text-white text-[10px] font-black uppercase tracking-wider">Servicios y Extras del Portal</h3>
                    <p className="text-[8.5px] text-zinc-400 mt-0.5">Seleccione las comodidades adicionales que desea incluir con la reserva.</p>
                  </div>

                  <div className="space-y-3 mt-1">
                    {/* Extra regular (Desmarcado, visible) */}
                    <label className="flex items-center gap-2 cursor-pointer text-zinc-300 select-none">
                      <input 
                        type="checkbox" 
                        checked={chimneyService} 
                        onChange={(e) => setChimneyService(e.target.checked)}
                        className="accent-sky-500 w-3 h-3 border border-zinc-800 rounded bg-[#181a26]"
                      />
                      <span className="text-[9px] font-bold">Servicio de limpieza y deshielo de chimenea (+15.00 $P)</span>
                    </label>

                    {/* TRAMPA 2: Solidaridad absurda en gris de bajísimo contraste */}
                    <label className="flex items-start gap-2 cursor-pointer select-none text-[#334155] hover:text-[#475569] transition-colors">
                      <input 
                        type="checkbox" 
                        checked={checkedDonacion} 
                        onChange={(e) => setCheckedDonacion(e.target.checked)}
                        className="mt-0.5 accent-[#334155] w-3 h-3 border border-zinc-900 rounded bg-[#0d0e16]"
                      />
                      <span className="text-[8.5px] leading-tight font-medium">
                        Aportación voluntaria pre-seleccionada para la Fundación de Pingüinos Desamparados sin Iglú en el Polo Norte (+10.00 $P).
                      </span>
                    </label>

                    {/* TRAMPA 3: Tarifa de patrón oscuro en gris de bajísimo contraste */}
                    <label className="flex items-start gap-2 cursor-pointer select-none text-[#334155] hover:text-[#475569] transition-colors">
                      <input 
                        type="checkbox" 
                        checked={checkedTarifa} 
                        onChange={(e) => setCheckedTarifa(e.target.checked)}
                        className="mt-0.5 accent-[#334155] w-3 h-3 border border-zinc-900 rounded bg-[#0d0e16]"
                      />
                      <span className="text-[8.5px] leading-tight font-medium">
                        Tarifa de implementación de patrón oscuro, por el Patrón Oscuro. (+12.99 $P)
                      </span>
                    </label>
                  </div>
                </div>
              )}

              {step === 3 && (
                <div className="flex flex-col gap-3">
                  <div className="border-b border-[#272a3d]/40 pb-2">
                    <h3 className="text-white text-[10px] font-black uppercase tracking-wider">Resumen del Pedido</h3>
                    <p className="text-[8.5px] text-zinc-400 mt-0.5">Revise el desglose de los costes aplicados antes de confirmar la transacción.</p>
                  </div>

                  {/* Desglose de la factura */}
                  <div className="bg-[#181a26]/60 border border-zinc-900 rounded p-3 space-y-2 mt-1">
                    <div className="flex justify-between text-[9px]">
                      <span className="text-zinc-400">Reserva Iglú Mediterráneo (Base):</span>
                      <span className="font-bold text-white">{basePrice.toLocaleString()} $P</span>
                    </div>

                    {smsOptIn && (
                      <div className="flex justify-between text-[9px]">
                        <span className="text-zinc-400">Notificaciones SMS:</span>
                        <span className="font-bold text-sky-400">+0.50 $P</span>
                      </div>
                    )}

                    {chimneyService && (
                      <div className="flex justify-between text-[9px]">
                        <span className="text-zinc-400">Limpieza Chimenea:</span>
                        <span className="font-bold text-sky-400">+{extraChimney.toLocaleString()} $P</span>
                      </div>
                    )}

                    {/* Items ocultos si están seleccionados */}
                    {checkedSeguro && (
                      <div className="flex justify-between text-[8px] text-[#334155]">
                        <span>Seguro Nuclear Polo Norte:</span>
                        <span>+{extraSeguro.toFixed(2)} $P</span>
                      </div>
                    )}

                    {checkedDonacion && (
                      <div className="flex justify-between text-[8px] text-[#334155]">
                        <span>Donación Pingüinos Polo Norte:</span>
                        <span>+{extraDonacion.toFixed(2)} $P</span>
                      </div>
                    )}

                    {checkedTarifa && (
                      <div className="flex justify-between text-[8px] text-[#334155]">
                        <span>Tarifa Patrón Oscuro:</span>
                        <span>+{extraTarifa.toFixed(2)} $P</span>
                      </div>
                    )}

                    <div className="flex justify-between text-[11px] font-black border-t border-zinc-900 pt-2 text-white">
                      <span>Total final a pagar:</span>
                      <span className="text-yellow-400">{totalPrice.toLocaleString()} $P</span>
                    </div>
                  </div>
                </div>
              )}

            </div>

            {/* 3. BOTONES DE ACCIÓN (Alineados abajo naturalmente) */}
            <div className="shrink-0 pt-2 border-t border-[#272a3d]/20 mt-auto">
              {step === 1 && (
                <button 
                  onClick={() => setStep(2)}
                  className="w-full bg-sky-600 hover:bg-sky-500 text-white font-black py-2.5 rounded text-[10px] uppercase tracking-wider shadow-[2px_2px_0px_rgba(0,0,0,1)] active:translate-x-[0.5px] active:translate-y-[0.5px] active:shadow-none transition-all text-center cursor-pointer"
                >
                  Continuar
                </button>
              )}

              {step === 2 && (
                <div className="flex gap-3">
                  <button 
                    onClick={() => setStep(1)}
                    className="w-1/3 bg-zinc-800 hover:bg-zinc-700 text-zinc-300 border border-zinc-700 font-bold py-2 rounded text-[10px] uppercase tracking-wider active:scale-95 transition-all text-center cursor-pointer"
                  >
                    Atrás
                  </button>
                  <button 
                    onClick={() => setStep(3)}
                    className="flex-1 bg-sky-600 hover:bg-sky-500 text-white font-black py-2.5 rounded text-[10px] uppercase tracking-wider shadow-[2px_2px_0px_rgba(0,0,0,1)] active:translate-x-[0.5px] active:translate-y-[0.5px] active:shadow-none transition-all text-center cursor-pointer"
                  >
                    Continuar
                  </button>
                </div>
              )}

              {step === 3 && (
                <div className="flex gap-3">
                  <button 
                    onClick={() => setStep(2)}
                    className="w-1/3 bg-zinc-800 hover:bg-zinc-700 text-zinc-300 border border-zinc-700 font-bold py-2 rounded text-[10px] uppercase tracking-wider active:scale-95 transition-all text-center cursor-pointer"
                  >
                    Atrás
                  </button>
                  <button 
                    onClick={handleConfirmPayment}
                    className="flex-1 bg-[#22c55e] hover:bg-green-500 text-black font-black py-2.5 rounded text-[10px] uppercase tracking-wider shadow-[2px_2px_0px_rgba(0,0,0,1)] active:translate-x-[0.5px] active:translate-y-[0.5px] active:shadow-none transition-all text-center"
                  >
                    Confirmar Pago
                  </button>
                </div>
              )}
            </div>

          </div>
        </main>

      </motion.div>
    </div>
  );
}
