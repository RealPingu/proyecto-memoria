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
        console.warn(`[Base de datos] Falló intento ${i + 1}/${retries} por pérdida de conexión en experiencia. Reintentando en ${delayMs}ms...`);
        await new Promise(resolve => setTimeout(resolve, delayMs));
        continue;
      }
      throw error;
    }
  }
  throw new Error("No se pudo conectar a la base de datos tras múltiples reintentos");
}

// GET: Recuperar la experiencia personal del jugador
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const playerId = searchParams.get('playerId');

  if (!playerId) {
    return NextResponse.json({ error: 'Falta el ID del jugador' }, { status: 400 });
  }

  try {
    const result = await queryWithRetry(() => sql`
      SELECT personal_experience FROM players 
      WHERE anonymous_id = ${playerId}
      LIMIT 1;
    `);

    if (result.rows.length === 0) {
      return NextResponse.json({ error: 'Jugador no encontrado' }, { status: 404 });
    }

    return NextResponse.json({ 
      personalExperience: result.rows[0].personal_experience 
    }, { status: 200 });
  } catch (error: any) {
    console.error('Error al obtener experiencia personal:', error);
    return NextResponse.json({ error: 'Error interno', details: error.message }, { status: 500 });
  }
}

// POST: Guardar o actualizar la experiencia personal del jugador
export async function POST(request: Request) {
  try {
    const { playerId, personalExperience } = await request.json();

    if (!playerId) {
      return NextResponse.json({ error: 'Faltan datos obligatorios (playerId)' }, { status: 400 });
    }

    // 1. Actualizar el campo en la tabla players
    await queryWithRetry(() => sql`
      UPDATE players 
      SET personal_experience = ${personalExperience !== undefined ? personalExperience : null}
      WHERE anonymous_id = ${playerId};
    `);

    return NextResponse.json({ message: 'Experiencia personal guardada con éxito' }, { status: 200 });

  } catch (error: any) {
    console.error('Error al guardar experiencia personal:', error);
    return NextResponse.json(
      { error: 'Error interno del servidor', details: error.message }, 
      { status: 500 }
    );
  }
}
