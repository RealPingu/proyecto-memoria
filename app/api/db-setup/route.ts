import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    console.log("Iniciando creación de tablas vía HTTP...");

    // 1. Crear la tabla de jugadores
    await sql`DROP TABLE IF EXISTS players CASCADE;`;
    await sql`
      CREATE TABLE IF NOT EXISTS players (
        id SERIAL PRIMARY KEY,
        anonymous_id UUID NOT NULL UNIQUE,
        consent_given BOOLEAN DEFAULT FALSE,
        nickname TEXT,
        age INTEGER,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `;
    console.log("Tabla 'players' recreada exitosamente");

    // 2. Crear la tabla de logs de interacción
    await sql`DROP TABLE IF EXISTS interaction_logs CASCADE;`; 
    await sql`
      CREATE TABLE IF NOT EXISTS interaction_logs (
        id SERIAL PRIMARY KEY,
        player_id UUID NOT NULL UNIQUE,
        logs JSONB DEFAULT '{}',
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `;
    console.log("Tabla 'interaction_logs' recreada");

    // 3. Crear la tabla de respuestas de la encuesta Likert (JSONB)
    await sql`DROP TABLE IF EXISTS likert_responses CASCADE;`;
    await sql`
      CREATE TABLE IF NOT EXISTS likert_responses (
        id SERIAL PRIMARY KEY,
        player_id UUID NOT NULL UNIQUE,
        responses JSONB DEFAULT '{}',
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `;
    console.log("Tabla 'likert_responses' recreada");

    // 4. Crear la tabla de resultados de las pruebas de marcado
    await sql`DROP TABLE IF EXISTS marking_results CASCADE;`;
    await sql`
      CREATE TABLE IF NOT EXISTS marking_results (
        id SERIAL PRIMARY KEY,
        player_id UUID NOT NULL UNIQUE,
        results JSONB DEFAULT '{}',
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `;
    console.log("Tabla 'marking_results' recreada");

    // 5. Crear la tabla de estado de la narrativa (1 fila por jugador)
    await sql`DROP TABLE IF EXISTS narrative_state CASCADE;`;
    await sql`
      CREATE TABLE IF NOT EXISTS narrative_state (
        id SERIAL PRIMARY KEY,
        player_id UUID NOT NULL UNIQUE,
        metadata JSONB DEFAULT '{}',
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `;
    console.log("Tabla 'narrative_state' recreada");

    return NextResponse.json({ 
      success: true, 
      message: 'Tablas de la base de datos creadas/reiniciadas con éxito.' 
    }, { status: 200 });
  } catch (error: any) {
    console.error('Error al configurar base de datos:', error);
    return NextResponse.json({ 
      success: false, 
      error: error.message,
      details: error.stack
    }, { status: 500 });
  }
}
