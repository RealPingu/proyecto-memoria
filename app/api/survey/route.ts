import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';

// GET: Recuperar respuestas previas del jugador
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const playerId = searchParams.get('playerId');

  if (!playerId) {
    return NextResponse.json({ error: 'Falta el ID del jugador' }, { status: 400 });
  }

  try {
    const result = await sql`
      SELECT responses FROM likert_responses 
      WHERE player_id = ${playerId}
      LIMIT 1;
    `;
    
    if (result.rows.length === 0) {
      return NextResponse.json({ responses: {} }, { status: 200 });
    }
    
    return NextResponse.json(result.rows[0], { status: 200 });
  } catch (error: any) {
    console.error('Error al obtener respuestas:', error);
    return NextResponse.json({ error: 'Error interno' }, { status: 500 });
  }
}

// POST: Guardar o actualizar respuestas en un objeto JSONB en una sola fila
export async function POST(request: Request) {
  try {
    const { playerId, responses } = await request.json();

    if (!playerId || !responses || typeof responses !== 'object') {
      return NextResponse.json({ error: 'Datos inválidos' }, { status: 400 });
    }

    // Insertamos o actualizamos la única fila (UPSERT)
    await sql`
      INSERT INTO likert_responses (player_id, responses)
      VALUES (${playerId}, ${JSON.stringify(responses)}::jsonb)
      ON CONFLICT (player_id) 
      DO UPDATE SET 
        responses = ${JSON.stringify(responses)}::jsonb, 
        updated_at = CURRENT_TIMESTAMP;
    `;

    return NextResponse.json({ message: 'Encuesta guardada con éxito' }, { status: 200 });

  } catch (error: any) {
    console.error('Error al guardar encuesta:', error);
    return NextResponse.json(
      { error: 'Error interno del servidor', details: error.message }, 
      { status: 500 }
    );
  }
}
