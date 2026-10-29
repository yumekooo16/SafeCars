import { put } from '@vercel/blob';
import { NextResponse } from 'next/server';
import { optimizeImageUpload } from '@/lib/optimizeImage';

export async function POST(request) {
  try {
    const formData = await request.formData();
    // accept different field names for compatibility: image, video, file
    const file = formData.get('image') || formData.get('video') || formData.get('file');

    if (!file) {
      return NextResponse.json({ error: 'Aucun fichier' }, { status: 400 });
    }

    const optimized = await optimizeImageUpload(file);

    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const filename = `vehicule-${uniqueSuffix}.${optimized.extension}`;

    const blob = await put(filename, optimized.buffer, {
      access: 'public',
      contentType: optimized.contentType,
    });

    return NextResponse.json({ 
      success: true, 
      url: blob.url,
      contentType: optimized.contentType,
    });

  } catch (error) {
    console.error('Erreur upload:', error);
    return NextResponse.json({ 
      error: 'Erreur lors de l\'upload',
      details: error.message 
    }, { status: 500 });
  }
}
