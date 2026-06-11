'use client';

import { useEffect } from 'react';

export default function InitializePlayer() {
  useEffect(() => {
    // Verificamos si ya existe un ID en el almacenamiento local
    let playerId = localStorage.getItem('antipatron_player_id');

    if (!playerId) {
      // Si no existe, creamos uno nuevo con un UUID
      playerId = crypto.randomUUID();
      localStorage.setItem('antipatron_player_id', playerId);
      console.log('Nuevo jugador identificado:', playerId);
    } else {
      console.log('Bienvenido de nuevo, jugador:', playerId);
    }
  }, []);

  return null; // Este componente no renderiza nada visualmente
}
