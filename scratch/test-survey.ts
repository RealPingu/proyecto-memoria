import { db } from '@vercel/postgres';

async function test() {
  console.log("Iniciando prueba de inserción de encuesta Likert...");
  const playerId = '206fdfc5-5e91-4930-9cc9-71c5af6207af';
  const responsesMock = { d1_q1: 4, d1_q2: 5, d2_q1: 3 };

  let client;
  try {
    client = await db.connect();
    console.log("Conexión con base de datos establecida.");

    const query = `
      INSERT INTO likert_responses (player_id, responses)
      VALUES ($1, $2::jsonb)
      ON CONFLICT (player_id) 
      DO UPDATE SET 
        responses = $2::jsonb, 
        updated_at = CURRENT_TIMESTAMP;
    `;
    
    console.log("Ejecutando consulta SQL...");
    const res = await client.query(query, [playerId, JSON.stringify(responsesMock)]);
    console.log("¡Consulta ejecutada con éxito!", res.rowCount, "filas afectadas");

  } catch (error: any) {
    console.error("ERROR DETECTADO EN LA BASE DE DATOS:");
    console.error("Mensaje:", error.message);
    console.error("Código de error:", error.code);
    console.error("Detalle:", error.detail);
    console.error("Stack trace completo:", error);
  } finally {
    if (client) client.release();
  }
}

test();
