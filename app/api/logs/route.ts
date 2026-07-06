import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';

// GET: Recuperar un log específico del jugador (extrayéndolo de la columna JSONB logs)
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const playerId = searchParams.get('playerId');
  const eventName = searchParams.get('eventName');

  if (!playerId || !eventName) {
    return NextResponse.json({ error: 'Faltan datos obligatorios (playerId o eventName)' }, { status: 400 });
  }

  try {
    const result = await sql`
      SELECT logs FROM interaction_logs 
      WHERE player_id = ${playerId}
      LIMIT 1;
    `;

    if (result.rows.length === 0) {
      return NextResponse.json({ metadata: null }, { status: 200 });
    }

    const logsObj = result.rows[0].logs || {};
    const eventLog = logsObj[eventName];

    if (!eventLog) {
      return NextResponse.json({ metadata: null }, { status: 200 });
    }

    return NextResponse.json({ metadata: eventLog.metadata }, { status: 200 });
  } catch (error: any) {
    console.error('Error al obtener log:', error);
    return NextResponse.json(
      { error: 'Error interno del servidor', details: error.message }, 
      { status: 500 }
    );
  }
}

// POST: Guardar o actualizar el log del jugador (UPSERT en un solo JSONB por jugador)
export async function POST(request: Request) {
  try {
    const { playerId, eventName, metadata } = await request.json();

    if (!playerId || !eventName) {
      return NextResponse.json({ error: 'Faltan datos obligatorios (playerId o eventName)' }, { status: 400 });
    }

    // 1. Obtener la fila actual del jugador
    const currentLogsResult = await sql`
      SELECT logs FROM interaction_logs 
      WHERE player_id = ${playerId}
      LIMIT 1;
    `;

    let logsObj: any = {};
    if (currentLogsResult.rows.length > 0) {
      logsObj = currentLogsResult.rows[0].logs || {};
    }

    // 2. Agregar o actualizar la clave del evento con su timestamp
    logsObj[eventName] = {
      metadata: metadata || {},
      timestamp: new Date().toISOString()
    };

    // 3. Hacer UPSERT en la base de datos
    await sql`
      INSERT INTO interaction_logs (player_id, logs)
      VALUES (${playerId}, ${JSON.stringify(logsObj)}::jsonb)
      ON CONFLICT (player_id) 
      DO UPDATE SET 
        logs = ${JSON.stringify(logsObj)}::jsonb,
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
