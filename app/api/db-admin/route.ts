import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const action = searchParams.get('action'); // 'inspect' | 'clear' | 'reset' | 'query'
  const queryParam = searchParams.get('q');  // Custom raw SQL query

  try {
    // 1. INSPECT: Ver el estado y los datos de todas las tablas
    if (action === 'inspect') {
      const players = await sql`SELECT * FROM players LIMIT 50;`;
      const logs = await sql`SELECT * FROM interaction_logs LIMIT 50;`;
      const survey = await sql`SELECT * FROM likert_responses LIMIT 50;`;
      const marking = await sql`SELECT * FROM marking_results LIMIT 50;`;
      const narrative = await sql`SELECT * FROM narrative_state LIMIT 50;`;

      return NextResponse.json({
        success: true,
        counts: {
          players: players.rowCount,
          interaction_logs: logs.rowCount,
          likert_responses: survey.rowCount,
          marking_results: marking.rowCount,
          narrative_state: narrative.rowCount,
        },
        data: {
          players: players.rows,
          interaction_logs: logs.rows,
          likert_responses: survey.rows,
          marking_results: marking.rows,
          narrative_state: narrative.rows,
        }
      });
    }

    // 2. CLEAR: Vaciar los registros de todas las tablas sin borrar la estructura
    if (action === 'clear') {
      await sql`TRUNCATE TABLE players, interaction_logs, likert_responses, marking_results, narrative_state CASCADE;`;
      return NextResponse.json({
        success: true,
        message: 'Registros eliminados de todas las tablas (tablas vaciadas).'
      });
    }

    // 3. RESET: Eliminar y volver a crear todas las tablas (recrear esquema completo)
    if (action === 'reset') {
      // Recrear jugadores
      await sql`DROP TABLE IF EXISTS players CASCADE;`;
      await sql`
        CREATE TABLE players (
          id SERIAL PRIMARY KEY,
          anonymous_id UUID NOT NULL UNIQUE,
          consent_given BOOLEAN DEFAULT FALSE,
          nickname TEXT,
          age INTEGER,
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );
      `;

      // Recrear logs
      await sql`DROP TABLE IF EXISTS interaction_logs CASCADE;`; 
      await sql`
        CREATE TABLE interaction_logs (
          id SERIAL PRIMARY KEY,
          player_id UUID NOT NULL UNIQUE,
          logs JSONB DEFAULT '{}',
          updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );
      `;

      // Recrear respuestas Likert
      await sql`DROP TABLE IF EXISTS likert_responses CASCADE;`;
      await sql`
        CREATE TABLE likert_responses (
          id SERIAL PRIMARY KEY,
          player_id UUID NOT NULL UNIQUE,
          responses JSONB DEFAULT '{}',
          updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );
      `;

      // Recrear marcado
      await sql`DROP TABLE IF EXISTS marking_results CASCADE;`;
      await sql`
        CREATE TABLE marking_results (
          id SERIAL PRIMARY KEY,
          player_id UUID NOT NULL UNIQUE,
          results JSONB DEFAULT '{}',
          updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );
      `;

      // Recrear narrativa
      await sql`DROP TABLE IF EXISTS narrative_state CASCADE;`;
      await sql`
        CREATE TABLE narrative_state (
          id SERIAL PRIMARY KEY,
          player_id UUID NOT NULL UNIQUE,
          metadata JSONB DEFAULT '{}',
          updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );
      `;

      return NextResponse.json({
        success: true,
        message: 'Base de datos restablecida. Todas las tablas fueron eliminadas y creadas de nuevo.'
      });
    }

    // 4. QUERY: Ejecutar una consulta SQL personalizada para depuración
    if (action === 'query' && queryParam) {
      // Permitimos ejecutar consultas directas de forma segura en local
      const result = await sql.query(queryParam);
      return NextResponse.json({
        success: true,
        rowCount: result.rowCount,
        rows: result.rows
      });
    }

    return NextResponse.json({
      success: false,
      message: 'Acción no válida o no especificada. Usa ?action=inspect, ?action=clear o ?action=reset.'
    }, { status: 400 });

  } catch (error: any) {
    console.error('Error en administrador de base de datos:', error);
    return NextResponse.json({
      success: false,
      error: error.message,
      stack: error.stack
    }, { status: 500 });
  }
}
