import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import {
  buildContactWhatsAppUrl,
  sendWhatsAppNotification,
} from '@/lib/whatsapp';

function getSupabaseClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey =
    process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseKey) {
    throw new Error("Variables d'environnement Supabase manquantes");
  }

  return createClient(supabaseUrl, supabaseKey);
}

export async function POST(request) {
  try {
    const body = await request.json();
    const name = String(body.name || '').trim();
    const email = String(body.email || '').trim();
    const phone = String(body.phone || '').trim() || null;
    const subject = String(body.subject || '').trim();
    const message = String(body.message || '').trim();

    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { error: 'Veuillez remplir tous les champs obligatoires' },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Veuillez entrer une adresse email valide' },
        { status: 400 }
      );
    }

    const payload = { name, email, phone, subject, message };
    const supabase = getSupabaseClient();

    // Insert sans RETURNING : le SELECT post-insert est bloqué par le RLS anon
    const { error } = await supabase
      .from('contact_messages')
      .insert([
        {
          ...payload,
          status: 'new',
          priority: 'normal',
        },
      ]);

    if (error) {
      console.error('Erreur insert contact_messages:', error);
      return NextResponse.json(
        { error: "Erreur lors de l'enregistrement du message" },
        { status: 500 }
      );
    }

    // Notification WhatsApp côté serveur (CallMeBot si clé configurée)
    let whatsapp = { sent: false };
    try {
      whatsapp = await sendWhatsAppNotification(payload);
    } catch (err) {
      console.error('Erreur envoi WhatsApp:', err);
      whatsapp = { sent: false, reason: 'exception' };
    }

    const whatsappUrl = buildContactWhatsAppUrl(payload);

    return NextResponse.json({
      success: true,
      whatsappSent: Boolean(whatsapp.sent),
      whatsappUrl,
    });
  } catch (error) {
    console.error('Erreur /api/contact:', error);
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 });
  }
}
