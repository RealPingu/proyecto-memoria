'use client';

import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';

interface BoundingBox {
  id: number;
  xMin: number;
  xMax: number;
  yMin: number;
  yMax: number;
  label: string;
}

export default function MarkingDesignerPage() {
  const router = useRouter();
  const [selectedMockup, setSelectedMockup] = useState<number>(0);
  const [boxes, setBoxes] = useState<BoundingBox[]>([]);
  const [labelInput, setLabelInput] = useState('');
  
  // Estados para el JSON editable
  const [jsonText, setJsonText] = useState('');
  const [jsonError, setJsonError] = useState<string | null>(null);
  
  // Contenido de los SVGs cargados en memoria
  const [svgContents, setSvgContents] = useState<string[]>(['', '', '', '', '', '', '', '']);
  const [isLoading, setIsLoading] = useState(true);

  // Estados para arrastrar y dibujar
  const svgRef = useRef<SVGSVGElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [startPoint, setStartPoint] = useState<{ x: number; y: number } | null>(null);
  const [currentPoint, setCurrentPoint] = useState<{ x: number; y: number } | null>(null);

  // Listado de Mockups con sus rutas
  const mockupList = [
    { name: '1. Anuncios Disfrazados - Descarga', pattern: 'disguised_ads', url: '/assets/mockups/disguised_ads_1.svg' },
    { name: '2. Anuncios Disfrazados - Siguiente', pattern: 'disguised_ads', url: '/assets/mockups/disguised_ads_2.svg' },
    { name: '3. Costos Ocultos - Ticket', pattern: 'hidden_costs', url: '/assets/mockups/hidden_costs_1.svg' },
    { name: '4. Costos Ocultos - Seguro', pattern: 'hidden_costs', url: '/assets/mockups/hidden_costs_2.svg' },
    { name: '5. Comparación - Unidades', pattern: 'comparison_prevention', url: '/assets/mockups/comparison_prevention_1.svg' },
    { name: '6. Comparación - Cebo', pattern: 'comparison_prevention', url: '/assets/mockups/comparison_prevention_2.svg' },
    { name: '7. Control - Login Limpio', pattern: 'none', url: '/assets/mockups/control_1.svg' },
    { name: '8. Control - Checkout Limpio', pattern: 'none', url: '/assets/mockups/control_2.svg' }
  ];

  // Cargar todos los SVGs desde la carpeta public al inicio
  useEffect(() => {
    const loadSVGs = async () => {
      setIsLoading(true);
      const contents = await Promise.all(
        mockupList.map(async (m) => {
          try {
            const res = await fetch(m.url);
            return await res.text();
          } catch (e) {
            console.error(`Error cargando ${m.url}`, e);
            return '';
          }
        })
      );
      setSvgContents(contents);
      setIsLoading(false);
    };
    loadSVGs();
  }, []);

  // Limpiar cajas al cambiar de mockup
  useEffect(() => {
    setBoxes([]);
  }, [selectedMockup]);

  // Sincronizar boxes con jsonText cuando cambien externamente (Canvas o eliminación)
  useEffect(() => {
    const serialized = JSON.stringify(
      boxes.map(b => ({
        xMin: b.xMin,
        xMax: b.xMax,
        yMin: b.yMin,
        yMax: b.yMax,
        label: b.label
      })),
      null,
      2
    );
    // Evitamos pisar el estado local si el usuario está escribiendo directamente en la caja
    if (document.activeElement?.id !== 'json-textarea') {
      setJsonText(serialized);
      setJsonError(null);
    }
  }, [boxes]);

  const handleJsonTextChange = (val: string) => {
    setJsonText(val);
    if (!val.trim()) {
      setBoxes([]);
      setJsonError(null);
      return;
    }
    try {
      const parsed = JSON.parse(val);
      if (Array.isArray(parsed)) {
        const newBoxes = parsed.map((item: any, idx: number) => {
          if (
            typeof item.xMin !== 'number' ||
            typeof item.xMax !== 'number' ||
            typeof item.yMin !== 'number' ||
            typeof item.yMax !== 'number'
          ) {
            throw new Error('Todas las coordenadas (xMin, xMax, yMin, yMax) deben ser números');
          }
          return {
            id: item.id || Date.now() + idx,
            xMin: Number(item.xMin),
            xMax: Number(item.xMax),
            yMin: Number(item.yMin),
            yMax: Number(item.yMax),
            label: item.label || `Zona ${idx + 1}`
          };
        });
        setBoxes(newBoxes);
        setJsonError(null);
      } else {
        setJsonError('El JSON debe ser un array/lista []');
      }
    } catch (err: any) {
      setJsonError(err.message || 'Error de sintaxis JSON');
    }
  };

  // Manejo de clicks en el Canvas SVG overlay (400x800)
  const getSVGCoords = (e: React.MouseEvent<SVGSVGElement>) => {
    if (!svgRef.current) return null;
    const rect = svgRef.current.getBoundingClientRect();
    // Escalar las coordenadas del click al viewBox (0 0 400 800)
    const x = ((e.clientX - rect.left) / rect.width) * 400;
    const y = ((e.clientY - rect.top) / rect.height) * 800;
    return { x, y };
  };

  const handleMouseDown = (e: React.MouseEvent<SVGSVGElement>) => {
    const coords = getSVGCoords(e);
    if (!coords) return;
    setStartPoint(coords);
    setCurrentPoint(coords);
    setIsDrawing(true);
  };

  const handleMouseMove = (e: React.MouseEvent<SVGSVGElement>) => {
    if (!isDrawing || !startPoint) return;
    const coords = getSVGCoords(e);
    if (!coords) return;
    setCurrentPoint(coords);
  };

  const handleMouseUp = () => {
    if (!isDrawing || !startPoint || !currentPoint) return;
    setIsDrawing(false);

    // Calcular límites en píxeles
    const xMinPx = Math.min(startPoint.x, currentPoint.x);
    const xMaxPx = Math.max(startPoint.x, currentPoint.x);
    const yMinPx = Math.min(startPoint.y, currentPoint.y);
    const yMaxPx = Math.max(startPoint.y, currentPoint.y);

    // Evitar cajas minúsculas (clicks accidentales)
    if (xMaxPx - xMinPx > 5 && yMaxPx - yMinPx > 5) {
      // Convertir a porcentajes (0 a 100) sobre 400x800
      const xMin = parseFloat(((xMinPx / 400) * 100).toFixed(2));
      const xMax = parseFloat(((xMaxPx / 400) * 100).toFixed(2));
      const yMin = parseFloat(((yMinPx / 800) * 100).toFixed(2));
      const yMax = parseFloat(((yMaxPx / 800) * 100).toFixed(2));

      const newBox: BoundingBox = {
        id: Date.now(),
        xMin,
        xMax,
        yMin,
        yMax,
        label: labelInput || `Zona ${boxes.length + 1}`
      };

      setBoxes([...boxes, newBox]);
      setLabelInput('');
    }

    setStartPoint(null);
    setCurrentPoint(null);
  };

  const deleteBox = (id: number) => {
    setBoxes(boxes.filter(b => b.id !== id));
  };

  // Sobrescribir archivo SVG en el servidor
  const handleSaveSVG = async () => {
    const mockup = mockupList[selectedMockup];
    const filename = mockup.url.split('/').pop()!;
    const svgContent = svgContents[selectedMockup];

    try {
      const res = await fetch('/api/playground/save-mockup-file', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ filename, svgContent }),
      });
      const data = await res.json();
      if (data.success) {
        alert(`¡Guardado exitoso! Se ha sobrescrito el archivo "${filename}" en la carpeta public/assets/mockups/.`);
      } else {
        alert(`Error al guardar: ${data.error}`);
      }
    } catch (err: any) {
      console.error(err);
      alert('Error en la llamada de red al guardar el archivo SVG.');
    }
  };

  const handleSVGCodeChange = (val: string) => {
    const nextContents = [...svgContents];
    nextContents[selectedMockup] = val;
    setSvgContents(nextContents);
  };

  // Generar código JSON para scenarios.ts
  const getGeneratedJSON = () => {
    return JSON.stringify(
      boxes.map(b => ({
        xMin: b.xMin,
        xMax: b.xMax,
        yMin: b.yMin,
        yMax: b.yMax,
        label: b.label
      })),
      null,
      2
    );
  };

  return (
    <div className="flex flex-col h-screen w-full bg-zinc-950 text-zinc-100 overflow-hidden font-sans">
      
      {/* HEADER */}
      <header className="p-4 border-b border-zinc-900 bg-zinc-950 flex justify-between items-center shrink-0">
        <div className="flex items-center space-x-3">
          <button 
            onClick={() => router.push('/game/playground')}
            className="px-3 py-1.5 border border-zinc-800 text-xs font-mono uppercase font-bold text-zinc-400 hover:text-white hover:border-zinc-500 rounded transition active:scale-95"
          >
            Volver al Menú
          </button>
          <span className="text-zinc-600 font-mono">|</span>
          <h1 className="text-sm font-bold uppercase tracking-widest text-emerald-400 font-mono">Diseñador de Bounding Boxes de Marcado</h1>
        </div>
        <p className="text-[10px] font-mono text-zinc-500 uppercase tracking-wider">Antipatrón DevTool</p>
      </header>

      {/* CONTENIDO PRINCIPAL */}
      <div className="flex-1 flex min-h-0">
        
        {/* PANEL IZQUIERDO: SELECCIÓN DE VISTA */}
        <aside className="w-64 border-r border-zinc-900 bg-zinc-950/60 p-4 overflow-y-auto shrink-0 flex flex-col justify-between">
          <div className="space-y-4">
            <h2 className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest border-b border-zinc-900 pb-2">Selecciona Mockup</h2>
            <div className="flex flex-col gap-2">
              {mockupList.map((m, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedMockup(idx)}
                  className={`w-full text-left p-3 rounded text-xs border transition-all ${
                    selectedMockup === idx 
                      ? 'border-emerald-500 bg-emerald-950/20 text-emerald-300 font-bold' 
                      : 'border-zinc-900 bg-zinc-950/40 text-zinc-400 hover:border-zinc-800 hover:text-white'
                  }`}
                >
                  <div className="truncate">{m.name}</div>
                  <div className="text-[9px] font-mono opacity-60 uppercase mt-0.5">{m.pattern}</div>
                </button>
              ))}
            </div>
          </div>

          <div className="bg-zinc-900/40 border border-zinc-900 p-3 rounded-md text-[10px] text-zinc-500 leading-relaxed">
            <span className="font-bold text-zinc-400 block mb-1">CÓMO USAR:</span>
            1. Selecciona un mockup.<br />
            2. Haz click y arrastra sobre la pantalla del celular para dibujar una caja de trampa.<br />
            3. Escribe un nombre descriptivo en la derecha.<br />
            4. Copia las coordenadas resultantes para colocarlas en el código de tu escenario.
          </div>
        </aside>

        {/* PANEL CENTRAL: CANVAS DE MAQUETA Y MARCADO */}
        <main className="flex-1 bg-black flex items-center justify-center p-6 relative overflow-hidden select-none">
          <div className="flex flex-col items-center space-y-3">
            
            {/* Marco físico del Teléfono Móvil */}
            <div className="w-[375px] h-[750px] bg-zinc-900 rounded-[2.5rem] border-[6px] border-zinc-800 shadow-2xl overflow-hidden relative flex flex-col">
              
              {/* Altavoz/Notch simulado */}
              <div className="h-4 w-full bg-zinc-800 flex justify-center items-end pb-0.5 shrink-0 z-20">
                <div className="w-14 h-3 bg-black rounded-full" />
              </div>

              {/* Contenedor relativo de imagen y overlay */}
              <div className="flex-1 w-full relative bg-zinc-800">
                {isLoading ? (
                  <div className="absolute inset-0 flex items-center justify-center text-zinc-500 text-xs">
                    Cargando archivos SVG...
                  </div>
                ) : (
                  <div 
                    className="absolute inset-0 w-full h-full object-contain pointer-events-none flex items-center justify-center"
                    dangerouslySetInnerHTML={{ 
                      __html: svgContents[selectedMockup]
                        ? svgContents[selectedMockup].replace('<svg', '<svg style="width:100%;height:100%;object-fit:contain;"')
                        : ''
                    }}
                  />
                )}

                <svg
                  ref={svgRef}
                  viewBox="0 0 400 800"
                  className="absolute inset-0 w-full h-full cursor-crosshair z-10"
                  onMouseDown={handleMouseDown}
                  onMouseMove={handleMouseMove}
                  onMouseUp={handleMouseUp}
                >
                  {/* Dibujo de Caja en progreso */}
                  {isDrawing && startPoint && currentPoint && (
                    <rect
                      x={Math.min(startPoint.x, currentPoint.x)}
                      y={Math.min(startPoint.y, currentPoint.y)}
                      width={Math.abs(startPoint.x - currentPoint.x)}
                      height={Math.abs(startPoint.y - currentPoint.y)}
                      fill="rgba(59, 130, 246, 0.25)"
                      stroke="#3b82f6"
                      strokeWidth={2}
                      strokeDasharray="4 2"
                    />
                  )}

                  {/* Cajas ya guardadas */}
                  {boxes.map((box) => (
                    <g key={box.id}>
                      <rect
                        x={(box.xMin / 100) * 400}
                        y={(box.yMin / 100) * 800}
                        width={((box.xMax - box.xMin) / 100) * 400}
                        height={((box.yMax - box.yMin) / 100) * 800}
                        fill="rgba(239, 68, 68, 0.25)"
                        stroke="#ef4444"
                        strokeWidth={2}
                      />
                      <rect
                        x={(box.xMin / 100) * 400}
                        y={((box.yMin / 100) * 800) - 16}
                        width={120}
                        height={16}
                        fill="#ef4444"
                        rx={2}
                      />
                      <text
                        x={((box.xMin / 100) * 400) + 4}
                        y={((box.yMin / 100) * 800) - 4}
                        fill="#ffffff"
                        fontFamily="monospace"
                        fontSize="9.5"
                        fontWeight="bold"
                      >
                        {box.label.substring(0, 18)}
                      </text>
                    </g>
                  ))}
                </svg>
              </div>
            </div>

            {/* Indicador de relación de aspecto */}
            <span className="text-[10px] font-mono text-zinc-600 uppercase tracking-widest">Dimensiones: 375x750 (400x800 SVG ViewBox)</span>
          </div>
        </main>

        {/* PANEL DERECHO: CAJAS DETECTADAS Y EDICIÓN SVG */}
        <aside className="w-96 border-l border-zinc-900 bg-zinc-950/60 p-4 overflow-y-auto shrink-0 flex flex-col justify-between">
          <div className="space-y-4 flex-1 flex flex-col min-h-0">
            
            {/* Input de Nombre */}
            <div className="space-y-1 shrink-0">
              <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest block">Etiqueta de la Caja</label>
              <input
                type="text"
                placeholder="Ej: Checkbox Seguro Premarcado"
                value={labelInput}
                onChange={(e) => setLabelInput(e.target.value)}
                className="w-full bg-zinc-900 border border-zinc-800 rounded px-3 py-2 text-xs text-zinc-100 placeholder-zinc-600 focus:outline-none focus:border-emerald-500"
              />
            </div>

            {/* Listado de Bounding Boxes */}
            <div className="h-40 flex flex-col min-h-0 space-y-2 pt-2 shrink-0">
              <h3 className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest border-b border-zinc-900 pb-1.5 shrink-0">Zonas Guardadas ({boxes.length})</h3>
              
              {boxes.length === 0 ? (
                <div className="flex-1 flex items-center justify-center border border-dashed border-zinc-900 rounded p-4 text-center text-xs text-zinc-600">
                  Sin áreas marcadas.
                </div>
              ) : (
                <div className="flex-1 overflow-y-auto custom-scrollbar space-y-2 pr-1">
                  {boxes.map((b) => (
                    <div key={b.id} className="p-2 border border-zinc-800 bg-zinc-900/30 rounded flex justify-between items-start text-[10px] font-mono">
                      <div className="space-y-1">
                        <div className="font-bold text-zinc-300 font-sans">{b.label}</div>
                        <div className="text-zinc-500">
                          xMin: {b.xMin}% | xMax: {b.xMax}%<br />
                          yMin: {b.yMin}% | yMax: {b.yMax}%
                        </div>
                      </div>
                      <button
                        onClick={() => deleteBox(b.id)}
                        className="text-zinc-600 hover:text-red-400 font-bold px-1 py-0.5 cursor-pointer text-xs"
                      >
                        ✕
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>



            {/* Código JSON Generado y Editable */}
            <div className="h-40 shrink-0 flex flex-col space-y-1.5">
              <div className="flex justify-between items-center">
                <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">JSON de Bounding Boxes</span>
                {jsonError ? (
                  <span className="text-[9px] font-mono text-red-400 font-bold">✕ {jsonError}</span>
                ) : (
                  <span className="text-[9px] font-mono text-emerald-400 font-bold">✓ Válido ({boxes.length} de 8)</span>
                )}
              </div>
              <textarea
                id="json-textarea"
                value={jsonText}
                onChange={(e) => handleJsonTextChange(e.target.value)}
                placeholder="[]"
                className="flex-1 w-full bg-zinc-900/60 border border-zinc-800 rounded p-2 text-[9px] font-mono text-emerald-400 focus:outline-none focus:border-zinc-700"
              />
              <button
                onClick={() => {
                  navigator.clipboard.writeText(jsonText);
                  alert('¡Copiado al portapapeles!');
                }}
                disabled={boxes.length === 0}
                className="w-full py-1.5 text-[9px] font-mono font-bold uppercase tracking-wider rounded text-center transition bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 hover:bg-emerald-500/30 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Copiar correctAreas JSON
              </button>
            </div>

            {/* EDITOR DE CÓDIGO SVG CON BOTÓN DE SOBREESCRITURA */}
            <div className="flex-1 flex flex-col min-h-0 space-y-1.5 pt-2 border-t border-zinc-900">
              <div className="flex justify-between items-center shrink-0">
                <h3 className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Código Fuente del SVG</h3>
                <span className="text-[9px] font-mono text-emerald-500 font-bold uppercase">{mockupList[selectedMockup].url.split('/').pop()}</span>
              </div>
              <textarea
                value={svgContents[selectedMockup] || ''}
                onChange={(e) => handleSVGCodeChange(e.target.value)}
                className="flex-1 w-full bg-zinc-950 border border-zinc-900 rounded p-2 text-[10px] font-mono text-zinc-300 focus:outline-none focus:border-emerald-500 custom-scrollbar"
                placeholder="Cargando código SVG..."
              />
              <button
                onClick={handleSaveSVG}
                className="w-full py-2 text-[10px] font-mono font-bold uppercase tracking-widest rounded text-center transition bg-emerald-500 text-zinc-950 hover:bg-emerald-400 cursor-pointer active:scale-95"
              >
                Sobrescribir en Carpeta de Mockups
              </button>
            </div>

          </div>
        </aside>

      </div>
    </div>
  );
}
