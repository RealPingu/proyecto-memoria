import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { playerId, scenarioId, phase, points, selectedPatterns, timeTaken } = await request.json();

    if (!playerId || !scenarioId || !phase) {
      return NextResponse.json({ error: 'Faltan datos obligatorios' }, { status: 400 });
    }

    // Usamos UPSERT para mantener solo el último resultado por fase/escenario
    await sql`
      INSERT INTO marking_results (player_id, scenario_id, phase, points, selected_patterns, time_taken)
      VALUES (
        ${playerId}, 
        ${scenarioId}, 
        ${phase}, 
        ${JSON.stringify(points || [])}, 
        ${JSON.stringify(selectedPatterns || [])}, 
        ${timeTaken}
      )
      ON CONFLICT (player_id, scenario_id, phase) 
      DO UPDATE SET 
        points = ${JSON.stringify(points || [])},
        selected_patterns = ${JSON.stringify(selectedPatterns || [])},
        time_taken = ${timeTaken},
        created_at = CURRENT_TIMESTAMP;
    `;

    return NextResponse.json({ message: 'Resultado del test guardado con éxito' }, { status: 200 });

  } catch (error: any) {
    console.error('Error al guardar resultado del test:', error);
    return NextResponse.json(
      { error: 'Error interno del servidor', details: error.message }, 
      { status: 500 }
    );
  }
}
