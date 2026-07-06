import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { playerId, scenarioId, phase, points, selectedPatterns, timeTaken, tp, fp, fn } = await request.json();

    if (!playerId || !scenarioId || !phase) {
      return NextResponse.json({ error: 'Faltan datos obligatorios' }, { status: 400 });
    }

    // 1. Obtener los resultados actuales del jugador
    const currentResult = await sql`
      SELECT results FROM marking_results 
      WHERE player_id = ${playerId}
      LIMIT 1;
    `;
    
    let resultsObj: any = {};
    if (currentResult.rows.length > 0) {
      resultsObj = currentResult.rows[0].results || {};
    }

    // 2. Inicializar o actualizar la sección correspondiente al escenario y la fase
    if (!resultsObj[phase]) {
      resultsObj[phase] = {};
    }
    resultsObj[phase][scenarioId] = {
      points: points || [],
      selectedPatterns: selectedPatterns || [],
      timeTaken: timeTaken,
      tp: typeof tp === 'number' ? tp : null,
      fp: typeof fp === 'number' ? fp : null,
      fn: typeof fn === 'number' ? fn : null
    };

    // 3. Hacer UPSERT en la base de datos (1 sola fila por jugador)
    await sql`
      INSERT INTO marking_results (player_id, results)
      VALUES (${playerId}, ${JSON.stringify(resultsObj)}::jsonb)
      ON CONFLICT (player_id) 
      DO UPDATE SET 
        results = ${JSON.stringify(resultsObj)}::jsonb,
        updated_at = CURRENT_TIMESTAMP;
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
