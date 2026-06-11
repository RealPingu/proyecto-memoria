import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';

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
