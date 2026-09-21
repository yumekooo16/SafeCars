/** Numéro WhatsApp SafeCars (format international sans +) */
export const WHATSAPP_PHONE = '33769803889';

/**
 * Construit l'URL wa.me avec le message de contact prérempli.
 */
export function buildContactWhatsAppUrl({ name, email, phone, subject, message }) {
  const lines = [
    'Nouveau message SafeCars',
    '',
    `Nom : ${name}`,
    `Email : ${email}`,
  ];

  if (phone) {
    lines.push(`Tel : ${phone}`);
  }

  lines.push(`Sujet : ${subject}`, '', message);

  const text = lines.join('\n');
  return `https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(text)}`;
}
