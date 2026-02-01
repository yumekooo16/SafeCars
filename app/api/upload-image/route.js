import { writeFile, mkdir } from 'fs/promises';
import { NextResponse } from 'next/server';
import path from 'path';

export async function POST(request) {
  try {
    const formData = await request.formData();
    const file = formData.get('image');

    if (!file) {
      return NextResponse.json({ error: 'Aucun fichier' }, { status: 400 });
    }

    // Convertir le fichier en buffer
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Générer un nom de fichier unique
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const filename = `vehicule-${uniqueSuffix}${path.extname(file.name)}`;

    // Créer le dossier si nécessaire
    const uploadDir = path.join(process.cwd(), 'public', 'uploads', 'vehicules');
    await mkdir(uploadDir, { recursive: true });

    // Sauvegarder le fichier
    const filepath = path.join(uploadDir, filename);
    await writeFile(filepath, buffer);

    // Retourner l'URL publique
    const publicUrl = `/uploads/vehicules/${filename}`;

    return NextResponse.json({ 
      success: true, 
      url: publicUrl 
    });

  } catch (error) {
    console.error('Erreur upload:', error);
    return NextResponse.json({ 
      error: 'Erreur lors de l\'upload' 
    }, { status: 500 });
  }
}