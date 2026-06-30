import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';

// GET: Recuperar un log específico del jugador
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const playerId = searchParams.get('playerId');
  const eventName = searchParams.get('eventName');

  if (!playerId || !eventName) {
    return NextResponse.json({ error: 'Faltan datos obligatorios (playerId o eventName)' }, { status: 400 });
  }

  try {
    const result = await sql`
      SELECT metadata FROM interaction_logs 
      WHERE player_id = ${playerId} AND event_name = ${eventName}
      LIMIT 1;
    `;

    if (result.rows.length === 0) {
      return NextResponse.json({ metadata: null }, { status: 200 });
    }

    return NextResponse.json(result.rows[0], { status: 200 });
  } catch (error: any) {
    console.error('Error al obtener log:', error);
    return NextResponse.json(
      { error: 'Error interno del servidor', details: error.message }, 
      { status: 500 }
    );
  }
}

// POST: Guardar o actualizar el log del jugador (UPSERT)
export async function POST(request: Request) {
  try {
    const { playerId, eventName, metadata } = await request.json();

    if (!playerId || !eventName) {
      return NextResponse.json({ error: 'Faltan datos obligatorios (playerId o eventName)' }, { status: 400 });
    }

    // Insertamos o actualizamos el log de interacción (UPSERT)
    await sql`
      INSERT INTO interaction_logs (player_id, event_name, metadata)
      VALUES (${playerId}, ${eventName}, ${JSON.stringify(metadata || {})})
      ON CONFLICT (player_id, event_name) 
      DO UPDATE SET 
        metadata = ${JSON.stringify(metadata || {})},
        updated_at = CURRENT_TIMESTAMP;
    `;

    return NextResponse.json({ message: 'Log guardado correctamente' }, { status: 200 });

  } catch (error: any) {
    console.error('Error al guardar log:', error);
    return NextResponse.json(
      { error: 'Error interno del servidor', details: error.message }, 
      { status: 500 }
    );
  }
}
