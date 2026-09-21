/** Numéro WhatsApp SafeCars (format international sans +) */
export const WHATSAPP_PHONE = '33769803889';

/**
 * Construit le texte du message WhatsApp à partir du formulaire contact.
 */
export function buildContactWhatsAppText({ name, email, phone, subject, message }) {
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
  return lines.join('\n');
}

/**
 * Construit l'URL wa.me avec le message de contact prérempli.
 */
export function buildContactWhatsAppUrl(payload) {
  const text = buildContactWhatsAppText(payload);
  return `https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(text)}`;
}

/**
 * Envoi serveur vers WhatsApp via CallMeBot (si WHATSAPP_CALLMEBOT_APIKEY est défini).
 * Doc: https://www.callmebot.com/blog/free-api-whatsapp-messages/
 */
export async function sendWhatsAppNotification(payload) {
  const apiKey = process.env.WHATSAPP_CALLMEBOT_APIKEY;
  if (!apiKey) {
    return { sent: false, reason: 'missing_api_key' };
  }

  const phone = process.env.WHATSAPP_PHONE || WHATSAPP_PHONE;
  const text = buildContactWhatsAppText(payload);
  const url =
    `https://api.callmebot.com/whatsapp.php` +
    `?phone=${encodeURIComponent(phone)}` +
    `&text=${encodeURIComponent(text)}` +
    `&apikey=${encodeURIComponent(apiKey)}`;

  const res = await fetch(url, { method: 'GET' });
  const body = await res.text();

  if (!res.ok) {
    return { sent: false, reason: 'http_error', status: res.status, body };
  }

  return { sent: true, body };
}
