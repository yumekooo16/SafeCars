import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

// Fonction pour créer le client Supabase
function getSupabaseClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  
  if (!supabaseUrl || !supabaseKey) {
    throw new Error('Variables d\'environnement Supabase manquantes');
  }
  
  return createClient(supabaseUrl, supabaseKey);
}

export async function POST(request) {
  try {
    const sessionToken = request.cookies.get('admin_session')?.value;

    if (sessionToken) {
      const supabase = getSupabaseClient();
      // Récupérer l'admin avant d'invalider
      const { data: admin } = await supabase
        .from('admin_users')
        .select('id, email')
        .eq('session_token', sessionToken)
        .single();

      // Invalider la session dans la base de données
      await supabase
        .from('admin_users')
        .update({
          session_token: null,
          session_expires_at: null,
        })
        .eq('session_token', sessionToken);

      // Logger l'action
      if (admin) {
        await supabase
          .from('admin_logs')
          .insert({
            admin_id: admin.id,
            admin_email: admin.email,
            action: 'logout',
          });
      }
    }

    // Créer la réponse et supprimer le cookie
    const response = NextResponse.json({ success: true });
    
    response.cookies.set('admin_session', '', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 0, // Expire immédiatement
      path: '/',
    });

    return response;

  } catch (error) {
    console.error('Logout error:', error);
    return NextResponse.json(
      { error: 'Erreur serveur' },
      { status: 500 }
    );
  }
}