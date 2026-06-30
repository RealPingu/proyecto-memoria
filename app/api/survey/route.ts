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
        console.warn(`[Base de datos] Falló intento ${i + 1}/${retries} por pérdida de conexión. Reintentando en ${delayMs}ms...`);
        await new Promise(resolve => setTimeout(resolve, delayMs));
        continue;
      }
      throw error;
    }
  }
  throw new Error("No se pudo conectar a la base de datos tras múltiples reintentos");
}

// GET: Recuperar respuestas previas del jugador
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const playerId = searchParams.get('playerId');

  if (!playerId) {
    return NextResponse.json({ error: 'Falta el ID del jugador' }, { status: 400 });
  }

  try {
    const result = await queryWithRetry(() => sql`
      SELECT responses FROM likert_responses 
      WHERE player_id = ${playerId}
      LIMIT 1;
    `);
    
    if (result.rows.length === 0) {
      return NextResponse.json({ responses: {} }, { status: 200 });
    }
    
    return NextResponse.json(result.rows[0], { status: 200 });
  } catch (error: any) {
    console.error('Error al obtener respuestas:', error);
    return NextResponse.json({ error: 'Error interno', details: error.message }, { status: 500 });
  }
}

// POST: Guardar o actualizar respuestas en un objeto JSONB en una sola fila
export async function POST(request: Request) {
  try {
    const { playerId, responses } = await request.json();

    if (!playerId || !responses || typeof responses !== 'object') {
      return NextResponse.json({ error: 'Datos inválidos' }, { status: 400 });
    }

    // Insertamos o actualizamos la única fila (UPSERT) con reintento automático
    await queryWithRetry(() => sql`
      INSERT INTO likert_responses (player_id, responses)
      VALUES (${playerId}, ${JSON.stringify(responses)}::jsonb)
      ON CONFLICT (player_id) 
      DO UPDATE SET 
        responses = ${JSON.stringify(responses)}::jsonb, 
        updated_at = CURRENT_TIMESTAMP;
    `);

    return NextResponse.json({ message: 'Encuesta guardada con éxito' }, { status: 200 });

  } catch (error: any) {
    console.error('Error al guardar encuesta:', error);
    return NextResponse.json(
      { error: 'Error interno del servidor', details: error.message }, 
      { status: 500 }
    );
  }
}
