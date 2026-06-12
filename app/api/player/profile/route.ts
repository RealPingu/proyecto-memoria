import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';

// GET: Recuperar datos del perfil
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const playerId = searchParams.get('playerId');

  if (!playerId) {
    return NextResponse.json({ error: 'Falta el ID del jugador' }, { status: 400 });
  }

  try {
    const result = await sql`
      SELECT nickname, age FROM players 
      WHERE anonymous_id = ${playerId}
      LIMIT 1;
    `;

    if (result.rows.length === 0) {
      return NextResponse.json({ error: 'Jugador no encontrado' }, { status: 404 });
    }

    return NextResponse.json(result.rows[0], { status: 200 });
  } catch (error: any) {
    console.error('Error al obtener perfil:', error);
    return NextResponse.json({ error: 'Error interno' }, { status: 500 });
  }
}

// POST: Actualizar datos del perfil
export async function POST(request: Request) {
  try {
    const { playerId, nickname, age } = await request.json();

    if (!playerId || !nickname) {
      return NextResponse.json({ error: 'Faltan datos obligatorios' }, { status: 400 });
    }

    // 1. Validar formato del nickname (Solo letras, números y guiones bajos)
    const nicknameRegex = /^[a-zA-Z0-9_]+$/;
    if (!nicknameRegex.test(nickname)) {
      return NextResponse.json({ 
        error: 'INVALID_FORMAT', 
        message: 'El nombre solo puede contener letras, números y guiones bajos' 
      }, { status: 400 });
    }

    // 2. Verificar si el nickname ya existe para OTRO jugador
    const existingPlayer = await sql`
      SELECT id FROM players 
      WHERE nickname = ${nickname} AND anonymous_id != ${playerId}
      LIMIT 1;
    `;

    if (existingPlayer.rows.length > 0) {
      return NextResponse.json({ error: 'NICKNAME_TAKEN', message: 'Este nombre ya está en uso' }, { status: 409 });
    }

    // 3. Actualizamos el perfil del jugador
    await sql`
      UPDATE players 
      SET nickname = ${nickname}, age = ${age}
      WHERE anonymous_id = ${playerId};
    `;

    return NextResponse.json({ message: 'Datos del jugador actualizados correctamente' }, { status: 200 });

  } catch (error: any) {
    console.error('Error al actualizar perfil:', error);
    return NextResponse.json(
      { error: 'Error interno del servidor', details: error.message }, 
      { status: 500 }
    );
  }
}
