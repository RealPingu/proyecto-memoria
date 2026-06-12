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
      SELECT question_id, score FROM likert_responses 
      WHERE player_id = ${playerId};
    `;
    
    return NextResponse.json(result.rows, { status: 200 });
  } catch (error: any) {
    console.error('Error al obtener respuestas:', error);
    return NextResponse.json({ error: 'Error interno' }, { status: 500 });
  }
}

// POST: Guardar o actualizar respuestas masivamente
export async function POST(request: Request) {
  try {
    const { playerId, responses } = await request.json();

    if (!playerId || !Array.isArray(responses)) {
      return NextResponse.json({ error: 'Datos inválidos' }, { status: 400 });
    }

    // Procesamos todas las respuestas de forma masiva (UPSERT)
    await Promise.all(
      responses.map((resp: { questionId: string; score: number }) => {
        return sql`
          INSERT INTO likert_responses (player_id, question_id, score)
          VALUES (${playerId}, ${resp.questionId}, ${resp.score})
          ON CONFLICT (player_id, question_id) 
          DO UPDATE SET score = ${resp.score}, updated_at = CURRENT_TIMESTAMP;
        `;
      })
    );

    return NextResponse.json({ message: 'Encuesta guardada con éxito' }, { status: 200 });

  } catch (error: any) {
    console.error('Error al guardar encuesta:', error);
    return NextResponse.json(
      { error: 'Error interno del servidor', details: error.message }, 
      { status: 500 }
    );
  }
}
