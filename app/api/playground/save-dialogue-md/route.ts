import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';

export async function POST(request: Request) {
  try {
    const { nodes } = await request.json();
    if (!nodes) {
      return NextResponse.json({ error: 'No dialogue nodes provided' }, { status: 400 });
    }

    // Format the markdown content
    let mdContent = `# Diálogos Editados de Antipatron\n\n`;
    mdContent += `Este archivo contiene los diálogos exportados desde el editor del Playground. El agente de IA puede leer este archivo e integrarlo directamente en el código de la narrativa del juego.\n\n`;
    
    for (const [id, node] of Object.entries(nodes)) {
      const dialogueNode = node as any;
      mdContent += `## SCENE: ${id}\n`;
      mdContent += `- **Speaker**: ${dialogueNode.speaker || 'system'}\n`;
      mdContent += `- **SpeakerLabel**: ${dialogueNode.speakerLabel || ''}\n`;
      mdContent += `- **Text**: ${dialogueNode.text || ''}\n\n`;
    }

    // Define the output path in the workspace root
    const filePath = path.join(process.cwd(), 'dialogos_editados.md');
    await fs.writeFile(filePath, mdContent, 'utf-8');

    return NextResponse.json({ success: true, path: filePath });
  } catch (error: any) {
    console.error('Error exporting dialogues to markdown:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
