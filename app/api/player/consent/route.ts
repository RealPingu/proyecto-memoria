import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { playerId, consent } = await request.json();

    // Validación básica de seguridad
    if (!playerId) {
      return NextResponse.json({ error: 'Falta el ID del jugador' }, { status: 400 });
    }

    // Usamos ON CONFLICT para asegurar que si el jugador ya existe, 
    // solo se actualice su estado de consentimiento sin crear duplicados.
    await sql`
      INSERT INTO players (anonymous_id, consent_given)
      VALUES (${playerId}, ${consent})
      ON CONFLICT (anonymous_id) 
      DO UPDATE SET consent_given = ${consent};
    `;

    return NextResponse.json({ 
      message: 'Consentimiento procesado correctamente',
      playerId: playerId 
    }, { status: 200 });

  } catch (error: any) {
    console.error('Database Error:', error);
    return NextResponse.json(
      { error: 'Error al procesar el consentimiento en la base de datos', details: error.message }, 
      { status: 500 }
    );
  }
}
