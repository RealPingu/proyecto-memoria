'use client';

import { useEffect } from 'react';

export default function InitializePlayer() {
  useEffect(() => {
    // Verificamos si ya existe un ID en el almacenamiento local
    let playerId = localStorage.getItem('antipatron_player_id');

    if (!playerId) {
      // Si no existe, creamos uno nuevo con un UUID (con fallback para HTTP en celulares)
      try {
        if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') {
          playerId = crypto.randomUUID();
        } else {
          // Algoritmo estándar RFC4122 para generar UUID v4 manualmente en HTTP
          playerId = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
            const r = Math.random() * 16 | 0;
            const v = c === 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
          });
        }
      } catch (e) {
        // Respaldo de emergencia
        playerId = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
      }
      localStorage.setItem('antipatron_player_id', playerId);
      console.log('Nuevo jugador identificado:', playerId);
    } else {
      console.log('Bienvenido de nuevo, jugador:', playerId);
    }
  }, []);

  return null; // Este componente no renderiza nada visualmente
}
