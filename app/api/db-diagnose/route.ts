import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';

export async function GET() {
  const playerId = '206fdfc5-5e91-4930-9cc9-71c5af6207af';
  const responsesMock = { d1_q1: 4, d1_q2: 5 };

  let errorWithoutCast = null;
  let errorWithCast = null;

  // 1. Probar consulta SIN cast (como estaba en la encuesta)
  try {
    await sql`BEGIN;`;
    await sql`
      INSERT INTO likert_responses (player_id, responses)
      VALUES (${playerId}, ${JSON.stringify(responsesMock)})
      ON CONFLICT (player_id) 
      DO UPDATE SET 
        responses = ${JSON.stringify(responsesMock)}, 
        updated_at = CURRENT_TIMESTAMP;
    `;
    await sql`ROLLBACK;`;
  } catch (err: any) {
    errorWithoutCast = {
      message: err.message,
      code: err.code,
      detail: err.detail
    };
    try { await sql`ROLLBACK;`; } catch (_) {}
  }

  // 2. Probar consulta CON cast (::jsonb)
  try {
    await sql`BEGIN;`;
    await sql`
      INSERT INTO likert_responses (player_id, responses)
      VALUES (${playerId}, ${JSON.stringify(responsesMock)}::jsonb)
      ON CONFLICT (player_id) 
      DO UPDATE SET 
        responses = ${JSON.stringify(responsesMock)}::jsonb, 
        updated_at = CURRENT_TIMESTAMP;
    `;
    await sql`ROLLBACK;`;
  } catch (err: any) {
    errorWithCast = {
      message: err.message,
      code: err.code,
      detail: err.detail
    };
    try { await sql`ROLLBACK;`; } catch (_) {}
  }

  return NextResponse.json({
    description: "Comparación de inserción en likert_responses con y sin casteo jsonb",
    errorWithoutCast,
    errorWithCast
  }, { status: 200 });
}
