import sharp from 'sharp';

const MAX_WIDTH = 1200;
const WEBP_QUALITY = 62;

/**
 * Compresse et convertit une image uploadée en WebP (max 1600px de large).
 * Les vidéos et fichiers non-image sont renvoyés tels quels.
 */
export async function optimizeImageUpload(file) {
  const type = file.type || '';
  if (!type.startsWith('image/') || type === 'image/svg+xml' || type === 'image/gif') {
    return {
      buffer: Buffer.from(await file.arrayBuffer()),
      contentType: type || 'application/octet-stream',
      extension: extensionFromName(file.name, type),
    };
  }

  const input = Buffer.from(await file.arrayBuffer());
  const buffer = await sharp(input)
    .rotate()
    .resize({ width: MAX_WIDTH, withoutEnlargement: true })
    .webp({ quality: WEBP_QUALITY })
    .toBuffer();

  return {
    buffer,
    contentType: 'image/webp',
    extension: 'webp',
  };
}

function extensionFromName(name, contentType) {
  const fromName = name?.split('.').pop()?.toLowerCase();
  if (fromName && fromName.length <= 5) return fromName;
  if (contentType?.includes('png')) return 'png';
  if (contentType?.includes('webp')) return 'webp';
  if (contentType?.includes('jpeg') || contentType?.includes('jpg')) return 'jpg';
  return 'bin';
}
