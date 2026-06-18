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
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
          );
        `;
        console.log("Tabla 'players' recreada exitosamente");

        // 2. Crear la tabla de logs de interacción (Optimizado: 1 fila por evento por jugador)
        await client.sql`DROP TABLE IF EXISTS interaction_logs;`; 
        await client.sql`
          CREATE TABLE IF NOT EXISTS interaction_logs (
            id SERIAL PRIMARY KEY,
            player_id UUID NOT NULL,
            event_name VARCHAR(100) NOT NULL,
            metadata JSONB DEFAULT '{}',
            updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            UNIQUE(player_id, event_name)
          );
        `;
        console.log("Tabla 'interaction_logs' creada exitosamente con restricción UNIQUE");

        // 3. Crear la tabla de respuestas de la encuesta Likert
        await client.sql`DROP TABLE IF EXISTS likert_responses;`;
        await client.sql`
          CREATE TABLE IF NOT EXISTS likert_responses (
            id SERIAL PRIMARY KEY,
            player_id UUID NOT NULL,
            question_id VARCHAR(50) NOT NULL,
            score INTEGER NOT NULL CHECK (score >= 1 AND score <= 5),
            updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            UNIQUE(player_id, question_id)
          );
        `;
        console.log("Tabla 'likert_responses' creada exitosamente");

        // 4. Crear la tabla de resultados de las pruebas de marcado
        await client.sql`DROP TABLE IF EXISTS marking_results;`;
        await client.sql`
          CREATE TABLE IF NOT EXISTS marking_results (
            id SERIAL PRIMARY KEY,
            player_id UUID NOT NULL,
            scenario_id VARCHAR(50) NOT NULL,
            phase VARCHAR(10) NOT NULL, -- 'pre' o 'post'
            points JSONB DEFAULT '[]',
            selected_patterns JSONB DEFAULT '[]',
            time_taken DECIMAL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            UNIQUE(player_id, scenario_id, phase)
          );
        `;
        console.log("Tabla 'marking_results' creada exitosamente");
    } catch (error) {
        console.error("Error creando las tablas:", error);
    } finally {
        client.release();
    }
}

setup();

