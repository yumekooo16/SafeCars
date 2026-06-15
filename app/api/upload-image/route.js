import { put } from '@vercel/blob';
import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const formData = await request.formData();
    // accept different field names for compatibility: image, video, file
    const file = formData.get('image') || formData.get('video') || formData.get('file');

    if (!file) {
      return NextResponse.json({ error: 'Aucun fichier' }, { status: 400 });
    }

    // Générer un nom de fichier unique
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const safeName = file.name ? file.name.replace(/[^a-zA-Z0-9.\-\_]/g, '_') : 'upload'
    const filename = `vehicule-${uniqueSuffix}-${safeName}`;

    // Upload vers Vercel Blob
    const blob = await put(filename, file, {
      access: 'public',
    });

    return NextResponse.json({ 
      success: true, 
      url: blob.url,
      contentType: file.type || null,
    });

  } catch (error) {
    console.error('Erreur upload:', error);
    return NextResponse.json({ 
      error: 'Erreur lors de l\'upload',
      details: error.message 
    }, { status: 500 });
  }
}