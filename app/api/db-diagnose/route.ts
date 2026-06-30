import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    // 1. Diagnosticar la estructura de la tabla likert_responses
    const columnsResult = await sql`
      SELECT column_name, data_type 
      FROM information_schema.columns 
      WHERE table_name = 'likert_responses';
    `;

    // 2. Diagnosticar si hay restricciones (constraints) en la tabla
    const constraintsResult = await sql`
      SELECT conname, contype 
      FROM pg_constraint 
      WHERE conrelid = 'likert_responses'::regclass;
    `;

    // 3. Probar una inserción simulada (y hacer rollback) para ver el error exacto
    let testInsertError = null;
    try {
      await sql`BEGIN;`;
      await sql`
        INSERT INTO likert_responses (player_id, responses)
        VALUES ('206fdfc5-5e91-4930-9cc9-71c5af6207af', '{"test": true}'::jsonb);
      `;
      await sql`ROLLBACK;`;
    } catch (err: any) {
      testInsertError = {
        message: err.message,
        code: err.code,
        detail: err.detail
      };
      try { await sql`ROLLBACK;`; } catch (_) {}
    }

    return NextResponse.json({
      tableName: 'likert_responses',
      columns: columnsResult.rows,
      constraints: constraintsResult.rows,
      testInsertError
    }, { status: 200 });

  } catch (error: any) {
    console.error('Error en diagnóstico de base de datos:', error);
    return NextResponse.json({ 
      success: false, 
      error: error.message,
      stack: error.stack
    }, { status: 500 });
  }
}
