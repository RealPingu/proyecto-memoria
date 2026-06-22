'use client';

/**
 * RUTA DE DISEÑO: sn_01 (Sneak into Basket)
 * Esta página sirve exclusivamente para diseñar el mockup con Tailwind.
 * Accede a ella, ajusta el diseño y toma una captura de pantalla.
 */
export default function MockupSN01() {
  return (
    <div className="bg-zinc-900 min-h-screen flex items-center justify-center p-4">
      {/* Marco de teléfono móvil */}
      <div className="w-[375px] h-[812px] bg-zinc-50 rounded-[3rem] border-[8px] border-zinc-800 shadow-2xl overflow-hidden relative flex flex-col">
        
        {/* Barra de estado simulada */}
        <div className="h-6 w-full bg-zinc-800 flex justify-center items-end pb-1">
          <div className="w-16 h-4 bg-black rounded-full" />
        </div>

        {/* CONTENIDO DE LA INTERFAZ */}
        <div className="flex-1 flex flex-col overflow-hidden text-zinc-900">
          
          {/* Header de la tienda */}
          <header className="p-6 border-b border-zinc-200 flex justify-between items-center bg-white">
            <span className="font-black text-xl italic tracking-tighter">NEXUS.</span>
            <div className="w-8 h-8 bg-zinc-100 rounded-full flex items-center justify-center">
              <div className="w-4 h-4 border-2 border-zinc-400 rounded-full" />
            </div>
          </header>

          <main className="flex-1 overflow-y-auto bg-zinc-50">
            {/* Imagen de producto */}
            <div className="w-full aspect-square bg-zinc-200 flex items-center justify-center border-b border-zinc-100">
               <div className="flex flex-col items-center space-y-4">
                  <div className="w-32 h-32 bg-zinc-300 rounded-2xl rotate-12 shadow-lg" />
                  <span className="text-[10px] font-black text-zinc-400 uppercase tracking-widest">Premium Collection</span>
               </div>
            </div>

            {/* Detalles */}
            <div className="p-6 space-y-4">
              <div className="space-y-1">
                <h1 className="text-2xl font-bold">Smartwatch Series V</h1>
                <p className="text-zinc-400 text-xs italic">Edición Especial • Carbón Gray</p>
              </div>

              <div className="flex items-baseline space-x-2">
                <span className="text-3xl font-black text-zinc-900">$299.00</span>
                <span className="text-zinc-400 line-through text-sm">$349.00</span>
              </div>

              {/* PATRÓN OSCURO: SNEAK INTO BASKET / HIDDEN COSTS */}
              <div className="bg-blue-50 border border-blue-100 p-4 rounded-lg space-y-3">
                 <div className="flex items-start space-x-3">
                    <div className="w-5 h-5 bg-blue-600 rounded flex items-center justify-center shrink-0">
                       <svg className="w-3 h-3 text-white fill-current" viewBox="0 0 20 20"><path d="M0 11l2-2 5 5L18 3l2 2L7 18z"/></svg>
                    </div>
                    <div>
                       <p className="text-[11px] font-bold text-blue-900">Seguro de Protección Integral Plus</p>
                       <p className="text-[9px] text-blue-700">Protección contra robos y daños accidentales por solo $14.99/mes.</p>
                    </div>
                 </div>
              </div>

              <p className="text-[10px] text-zinc-400 leading-relaxed">
                Al procesar el pago, aceptas nuestros <span className="underline">Términos de Servicio</span> y la suscripción automática al programa de fidelidad Nexus Rewards.
              </p>
            </div>
          </main>

          {/* Botón de acción fijo */}
          <footer className="p-6 bg-white border-t border-zinc-200">
             <button className="w-full h-14 bg-zinc-950 text-white font-bold uppercase tracking-widest text-sm rounded-xl shadow-lg active:scale-[0.98] transition-transform">
                Continuar al Pago
             </button>
          </footer>

        </div>
      </div>

      {/* Instrucciones fuera del marco */}
      <div className="absolute top-8 right-8 max-w-xs text-zinc-500 space-y-4">
         <h4 className="text-white font-bold uppercase text-xs tracking-widest">Guía de Diseño</h4>
         <p className="text-[10px] leading-relaxed">
           Usa esta vista para iterar el patrón de **Sneaking**. Una vez conforme, toma una captura de pantalla del marco del teléfono y guárdala como `sneaking_01.png` en `public/assets/mockups/`.
         </p>
      </div>
    </div>
  );
}
