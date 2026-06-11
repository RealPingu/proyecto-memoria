import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';

export async function GET() {
    try {
        // Intentamos una consulta simple a la tabla mencionada
        const result = await sql`SELECT * FROM playing_with_neon LIMIT 10;`;

        return NextResponse.json({
            status: 'Connected',
            rows: result.rows,
            message: 'La conexión con Vercel Postgres funciona correctamente.'
        });
    } catch (error: any) {
        console.error('Database connection error:', error);
        return NextResponse.json({
            status: 'Error',
            error: error.message,
            message: 'No se pudo conectar a la base de datos.'
        }, { status: 500 });
    }
}
