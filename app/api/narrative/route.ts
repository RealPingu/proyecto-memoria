import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';

// Función auxiliar para reintentar consultas en caso de fallos de red o timeouts
async function queryWithRetry<T>(queryFn: () => Promise<T>, retries = 3, delayMs = 600): Promise<T> {
  for (let i = 0; i < retries; i++) {
    try {
      return await queryFn();
    } catch (error: any) {
      const errorMsg = error.message || '';
      const isNetworkError = errorMsg.includes('fetch failed') || 
                            errorMsg.includes('Timeout') || 
                            errorMsg.includes('timeout') ||
                            errorMsg.includes('ConnectTimeoutError') ||
                            (error.sourceError && error.sourceError.message && error.sourceError.message.includes('Timeout'));
      
      if (isNetworkError && i < retries - 1) {
        console.warn(`[Base de datos] Falló intento ${i + 1}/${retries} por pérdida de conexión en narrativa. Reintentando en ${delayMs}ms...`);
        await new Promise(resolve => setTimeout(resolve, delayMs));
        continue;
      }
      throw error;
    }
  }
  throw new Error("No se pudo conectar a la base de datos tras múltiples reintentos");
}

// GET: Recuperar el estado guardado de la narrativa del jugador
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const playerId = searchParams.get('playerId');

  if (!playerId) {
    return NextResponse.json({ error: 'Falta el ID del jugador' }, { status: 400 });
  }

  try {
    const result = await queryWithRetry(() => sql`
      SELECT metadata FROM narrative_state 
      WHERE player_id = ${playerId}
      LIMIT 1;
    `);

    if (result.rows.length === 0) {
      return NextResponse.json({ metadata: null }, { status: 200 });
    }

    return NextResponse.json(result.rows[0], { status: 200 });
  } catch (error: any) {
    console.error('Error al obtener estado de la narrativa:', error);
    return NextResponse.json(
      { error: 'Error interno del servidor', details: error.message }, 
      { status: 500 }
    );
  }
}

// POST: Guardar o actualizar el estado acumulativo de la narrativa (UPSERT)
export async function POST(request: Request) {
  try {
    const { playerId, metadata } = await request.json();

    if (!playerId || !metadata) {
      return NextResponse.json({ error: 'Faltan datos obligatorios (playerId o metadata)' }, { status: 400 });
    }

    // Insertamos o actualizamos la fila única para este jugador (UPSERT) con reintento
    await queryWithRetry(() => sql`
      INSERT INTO narrative_state (player_id, metadata)
      VALUES (${playerId}, ${JSON.stringify(metadata)})
      ON CONFLICT (player_id) 
      DO UPDATE SET 
        metadata = ${JSON.stringify(metadata)},
        updated_at = CURRENT_TIMESTAMP;
    `);

    return NextResponse.json({ message: 'Progreso de la narrativa guardado correctamente' }, { status: 200 });

  } catch (error: any) {
    console.error('Error al guardar progreso de la narrativa:', error);
    return NextResponse.json(
      { error: 'Error interno del servidor', details: error.message }, 
      { status: 500 }
    );
  }
}
