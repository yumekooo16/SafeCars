import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

// Créer le client Supabase
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

// Fonction pour vérifier l'authentification admin
async function checkAuth(request) {
  const sessionToken = request.cookies.get('admin_session')?.value;

  if (!sessionToken) {
    return null;
  }

  const { data: admin, error } = await supabase
    .from('admin_users')
    .select('id, email, name, role, is_active')
    .eq('session_token', sessionToken)
    .eq('is_active', true)
    .gt('session_expires_at', new Date().toISOString())
    .single();

  if (error || !admin) {
    return null;
  }

  return admin;
}

// GET - Récupérer tous les messages
export async function GET(request) {
  try {
    // Vérifier l'authentification
    const admin = await checkAuth(request);
    
    if (!admin) {
      return NextResponse.json(
        { error: 'Non authentifié' },
        { status: 401 }
      );
    }

    // Récupérer les paramètres optionnels
    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status'); // new, read, replied, archived
    const limit = searchParams.get('limit') ? parseInt(searchParams.get('limit')) : 100;

    // Construire la requête
    let query = supabase
      .from('contact_messages')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(limit);

    // Filtrer par status si spécifié
    if (status) {
      query = query.eq('status', status);
    }

    const { data: messages, error } = await query;

    if (error) {
      console.error('Erreur Supabase:', error);
      return NextResponse.json(
        { error: 'Erreur lors de la récupération des messages' },
        { status: 500 }
      );
    }

    // Logger l'action
    await supabase
      .from('admin_logs')
      .insert({
        admin_id: admin.id,
        admin_email: admin.email,
        action: 'view_messages',
        entity_type: 'contact_message',
        details: { 
          count: messages?.length || 0,
          status: status || 'all'
        },
      });

    return NextResponse.json({
      success: true,
      messages: messages || [],
      count: messages?.length || 0,
    });

  } catch (error) {
    console.error('Erreur lors de la récupération:', error);
    return NextResponse.json(
      { error: 'Erreur serveur' },
      { status: 500 }
    );
  }
}

// PUT - Mettre à jour un message (marquer comme lu, répondu, etc.)
export async function PUT(request) {
  try {
    // Vérifier l'authentification
    const admin = await checkAuth(request);
    
    if (!admin) {
      return NextResponse.json(
        { error: 'Non authentifié' },
        { status: 401 }
      );
    }

    const { id, status, internal_notes } = await request.json();

    if (!id) {
      return NextResponse.json(
        { error: 'ID du message requis' },
        { status: 400 }
      );
    }

    // Préparer les données à mettre à jour
    const updateData = {};
    if (status) updateData.status = status;
    if (internal_notes !== undefined) updateData.internal_notes = internal_notes;
    if (status === 'replied') updateData.replied_at = new Date().toISOString();

    // Mettre à jour le message
    const { data, error } = await supabase
      .from('contact_messages')
      .update(updateData)
      .eq('id', id)
      .select()
      .single();

    if (error) {
      console.error('Erreur Supabase:', error);
      return NextResponse.json(
        { error: 'Erreur lors de la mise à jour' },
        { status: 500 }
      );
    }

    // Logger l'action
    await supabase
      .from('admin_logs')
      .insert({
        admin_id: admin.id,
        admin_email: admin.email,
        action: 'update_message',
        entity_type: 'contact_message',
        entity_id: id,
        details: { 
          new_status: status,
          has_notes: !!internal_notes
        },
      });

    return NextResponse.json({
      success: true,
      message: data,
    });

  } catch (error) {
    console.error('Erreur lors de la mise à jour:', error);
    return NextResponse.json(
      { error: 'Erreur serveur' },
      { status: 500 }
    );
  }
}