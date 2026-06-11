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
    } catch (error) {
        console.error("Error creando las tablas:", error);
    } finally {
        client.release();
    }
}

setup();

