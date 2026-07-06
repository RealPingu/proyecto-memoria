// scripts/seed.ts
import { db } from '@vercel/postgres';

async function setup() {
    const client = await db.connect();

    console.log("Iniciando creación de tablas...");

    try {
        // 1. Crear la tabla de jugadores (Recreamos para añadir nickname y age)
        await client.sql`DROP TABLE IF EXISTS players;`;
        await client.sql`
          CREATE TABLE IF NOT EXISTS players (
            id SERIAL PRIMARY KEY,
            anonymous_id UUID NOT NULL UNIQUE,
            consent_given BOOLEAN DEFAULT FALSE,
            nickname TEXT,
            age INTEGER,
            personal_experience TEXT DEFAULT NULL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
          );
        `;
        console.log("Tabla 'players' recreada exitosamente");

        // 2. Crear la tabla de logs de interacción
        await client.sql`DROP TABLE IF EXISTS interaction_logs CASCADE;`; 
        await client.sql`
          CREATE TABLE IF NOT EXISTS interaction_logs (
            id SERIAL PRIMARY KEY,
            player_id UUID NOT NULL UNIQUE,
            logs JSONB DEFAULT '{}',
            updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
          );
        `;
        console.log("Tabla 'interaction_logs' creada exitosamente");

        // 3. Crear la tabla de respuestas de la encuesta Likert
        await client.sql`DROP TABLE IF EXISTS likert_responses CASCADE;`;
        await client.sql`
          CREATE TABLE IF NOT EXISTS likert_responses (
            id SERIAL PRIMARY KEY,
            player_id UUID NOT NULL UNIQUE,
            responses JSONB DEFAULT '{}',
            updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
          );
        `;
        console.log("Tabla 'likert_responses' creada exitosamente");

        // 4. Crear la tabla de resultados de las pruebas de marcado
        await client.sql`DROP TABLE IF EXISTS marking_results CASCADE;`;
        await client.sql`
          CREATE TABLE IF NOT EXISTS marking_results (
            id SERIAL PRIMARY KEY,
            player_id UUID NOT NULL UNIQUE,
            results JSONB DEFAULT '{}',
            updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
          );
        `;
        console.log("Tabla 'marking_results' creada exitosamente");

        // 5. Crear la tabla de estado de la narrativa (1 fila por jugador)
        await client.sql`DROP TABLE IF EXISTS narrative_state CASCADE;`;
        await client.sql`
          CREATE TABLE IF NOT EXISTS narrative_state (
            id SERIAL PRIMARY KEY,
            player_id UUID NOT NULL UNIQUE,
            metadata JSONB DEFAULT '{}',
            updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
          );
        `;
        console.log("Tabla 'narrative_state' creada exitosamente");

    } catch (error) {
        console.error("Error creando las tablas:", error);
    } finally {
        client.release();
    }
}

setup();

