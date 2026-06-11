// scripts/seed.ts
import { db } from '@vercel/postgres';

async function setup() {
    const client = await db.connect();

    console.log("Iniciando creación de tablas...");

    try {
        // 1. Crear la tabla de jugadores
        await client.sql`
          CREATE TABLE IF NOT EXISTS players (
            id SERIAL PRIMARY KEY,
            anonymous_id UUID NOT NULL UNIQUE,
            consent_given BOOLEAN DEFAULT FALSE,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
          );
        `;
        console.log("Tabla 'players' creada exitosamente");
    } catch (error) {
        console.error("Error creando las tablas:", error);
    } finally {
        client.release();
    }
}

setup();

