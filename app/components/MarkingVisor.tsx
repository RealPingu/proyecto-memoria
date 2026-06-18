'use client';

import { useState, useRef, useCallback, useEffect } from 'react';
import { motion } from 'framer-motion';
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";

interface MarkingVisorProps {
    mockupUrl: string;
    markedPoints: { x: number, y: number, id: number }[];
    onMark: (x: number, y: number) => void;
    isActive: boolean;
}

export default function MarkingVisor({ mockupUrl, markedPoints, onMark, isActive }: MarkingVisorProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const startPoint = useRef<{ x: number, y: number } | null>(null);

    // Lógica para diferenciar Clic de Arrastre (Pan)
    const handleMouseDown = (e: React.MouseEvent) => {
        startPoint.current = { x: e.clientX, y: e.clientY };
    };

    const handleMouseUp = (e: React.MouseEvent) => {
        if (!isActive || !startPoint.current) return;

        const endX = e.clientX;
        const endY = e.clientY;
        
        // Calculamos la distancia recorrida por el mouse
        const diffX = Math.abs(endX - startPoint.current.x);
        const diffY = Math.abs(endY - startPoint.current.y);
        
        // Si se movió más de 5 píxeles, asumimos que fue un arrastre de zoom/pan y no un marcado
        const movementThreshold = 5;
        if (diffX < movementThreshold && diffY < movementThreshold) {
            const rect = e.currentTarget.getBoundingClientRect();
            // Calculamos coordenadas porcentuales sobre la imagen
            const x = ((e.clientX - rect.left) / rect.width) * 100;
            const y = ((e.clientY - rect.top) / rect.height) * 100;
            onMark(x, y);
        }
        
        startPoint.current = null;
    };

    return (
        <div className="w-full h-full relative overflow-hidden bg-black flex items-center justify-center touch-none">
            <TransformWrapper
                initialScale={1}
                minScale={1}
                maxScale={6}
                centerOnInit={true}
                disabled={!isActive && markedPoints.length === 0}
                doubleClick={{ disabled: true }}
            >
                <TransformComponent
                    wrapperClass="!w-full !h-full"
                    contentClass="flex items-center justify-center min-h-screen w-screen"
                >
                    <div 
                        onMouseDown={handleMouseDown}
                        onMouseUp={handleMouseUp}
                        className={`relative bg-zinc-800 shadow-2xl origin-center 
                        ${isActive ? 'cursor-crosshair' : 'cursor-default'}`}
                        style={{ width: 'auto', height: '85vh', aspectRatio: '9/18' }}
                    >
                        <img 
                            src={mockupUrl} 
                            alt="Mockup Interface" 
                            className="w-full h-full object-contain pointer-events-none rendering-pixelated"
                        />

                        {/* Capa de Marcado Sincronizada */}
                        <div className="absolute inset-0 pointer-events-none">
                            {markedPoints.map((pt) => (
                                <motion.div 
                                    key={pt.id}
                                    initial={{ scale: 0, opacity: 0 }}
                                    animate={{ scale: 1, opacity: 1 }}
                                    style={{ left: `${pt.x}%`, top: `${pt.y}%` }}
                                    className="absolute w-6 h-6 border-2 border-red-500 rounded-full bg-red-500/20 -translate-x-1/2 -translate-y-1/2"
                                >
                                    <div className="absolute inset-0 flex items-center justify-center font-black text-red-500 text-[8px]">!</div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </TransformComponent>
            </TransformWrapper>
        </div>
    );
}
