import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';

export async function POST(request: Request) {
  try {
    const { filename, svgContent } = await request.json();

    if (!filename || !svgContent) {
      return NextResponse.json({ error: 'filename and svgContent are required' }, { status: 400 });
    }

    // Limitar escritura estrictamente al directorio de mockups
    const safeFilename = path.basename(filename);
    const mockupsDir = path.join(process.cwd(), 'public', 'assets', 'mockups');
    const filePath = path.join(mockupsDir, safeFilename);

    await fs.mkdir(mockupsDir, { recursive: true });
    await fs.writeFile(filePath, svgContent, 'utf-8');

    return NextResponse.json({ success: true, message: `Mockup ${safeFilename} guardado con éxito.` });
  } catch (error: any) {
    console.error('Error al guardar mockup:', error);
    return NextResponse.json({ error: error.message || 'Error del servidor' }, { status: 500 });
  }
}
