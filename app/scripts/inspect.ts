// scripts/inspect.ts
import { db } from '@vercel/postgres';

async function inspectDatabase() {
    const client = await db.connect();

    console.log("=========================================");
    console.log("INSPECCIONANDO TABLAS EN LA BASE DE DATOS");
    console.log("=========================================");

    try {
        // 1. Players
        const players = await client.sql`SELECT * FROM players LIMIT 50;`;
        console.log(`\n[players] Filas: ${players.rowCount ?? 0}`);
        if ((players.rowCount ?? 0) > 0) console.table(players.rows);

        // 2. Interaction Logs
        const logs = await client.sql`SELECT * FROM interaction_logs LIMIT 50;`;
        console.log(`\n[interaction_logs] Filas: ${logs.rowCount ?? 0}`);
        if ((logs.rowCount ?? 0) > 0) console.table(logs.rows);

        // 3. Likert Responses
        const survey = await client.sql`SELECT * FROM likert_responses LIMIT 50;`;
        console.log(`\n[likert_responses] Filas: ${survey.rowCount ?? 0}`);
        if ((survey.rowCount ?? 0) > 0) console.table(survey.rows);

        // 4. Marking Results
        const marking = await client.sql`SELECT * FROM marking_results LIMIT 50;`;
        console.log(`\n[marking_results] Filas: ${marking.rowCount ?? 0}`);
        if ((marking.rowCount ?? 0) > 0) console.table(marking.rows);

        // 5. Narrative State
        const narrative = await client.sql`SELECT * FROM narrative_state LIMIT 50;`;
        console.log(`\n[narrative_state] Filas: ${narrative.rowCount ?? 0}`);
        if ((narrative.rowCount ?? 0) > 0) console.table(narrative.rows);

        console.log("\n=========================================");
        console.log("INSPECCIÓN COMPLETADA CON ÉXITO");
        console.log("=========================================");

    } catch (error) {
        console.error("Error al consultar tablas:", error);
    } finally {
        client.release();
    }
}

inspectDatabase();
