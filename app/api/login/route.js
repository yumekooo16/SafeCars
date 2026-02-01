import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import bcrypt from 'bcrypt';
import crypto from 'crypto';

// Créer le client Supabase avec la Service Role Key pour contourner les RLS
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

// GET - Vérifier si l'utilisateur est connecté
export async function GET(request) {
  try {
    const sessionToken = request.cookies.get('admin_session')?.value;

    if (!sessionToken) {
      return NextResponse.json({ error: 'Non authentifié' }, { status: 401 });
    }

    // Vérifier le token dans la base de données
    const { data: admin, error } = await supabase
      .from('admin_users')
      .select('id, email, name, role, is_active')
      .eq('session_token', sessionToken)
      .eq('is_active', true)
      .gt('session_expires_at', new Date().toISOString())
      .single();

    if (error || !admin) {
      return NextResponse.json({ error: 'Session invalide' }, { status: 401 });
    }

    return NextResponse.json({ 
      authenticated: true,
      admin: {
        id: admin.id,
        email: admin.email,
        name: admin.name,
        role: admin.role
      }
    });

  } catch (error) {
    console.error('Auth check error:', error);
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 });
  }
}

// POST - Login
export async function POST(request) {
  try {
    const body = await request.json();
    const { email, password } = body;

    console.log('🔐 LOGIN ATTEMPT:', { email, password });

    // Validation
    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email et mot de passe requis' },
        { status: 400 }
      );
    }

    // Récupérer l'admin depuis Supabase
    const { data: admin, error } = await supabase
      .from('admin_users')
      .select('*')
      .eq('email', email.toLowerCase())
      .single();

    console.log('📊 ADMIN LOOKUP:', { admin, error });

    if (error || !admin) {
      console.log('❌ Admin not found');
      return NextResponse.json(
        { error: 'Email ou mot de passe incorrect' },
        { status: 401 }
      );
    }

    // Vérifier si le compte est actif
    if (!admin.is_active) {
      console.log('❌ Account inactive');
      return NextResponse.json(
        { error: 'Compte désactivé' },
        { status: 403 }
      );
    }

    // Vérifier si le compte est verrouillé
    if (admin.locked_until && new Date(admin.locked_until) > new Date()) {
      console.log('❌ Account locked');
      return NextResponse.json(
        { error: 'Compte temporairement verrouillé. Réessayez plus tard.' },
        { status: 403 }
      );
    }

    console.log('🔑 Stored hash:', admin.password_hash);
    console.log('🔑 Input password:', password);

    // Vérifier le mot de passe
    const passwordMatch = await bcrypt.compare(password, admin.password_hash);

    console.log('✔️ Password match result:', passwordMatch);

    if (!passwordMatch) {
      console.log('❌ Password mismatch');
      // Incrémenter les tentatives de connexion
      const newAttempts = (admin.login_attempts || 0) + 1;
      const updates = {
        login_attempts: newAttempts,
      };

      // Verrouiller après 5 tentatives
      if (newAttempts >= 5) {
        updates.locked_until = new Date(Date.now() + 30 * 60 * 1000).toISOString(); // 30 minutes
      }

      await supabase
        .from('admin_users')
        .update(updates)
        .eq('id', admin.id);

      return NextResponse.json(
        { error: 'Email ou mot de passe incorrect' },
        { status: 401 }
      );
    }

    // Générer un token de session
    const sessionToken = generateSessionToken();
    const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24 heures

    // Mettre à jour la session dans la base de données
    await supabase
      .from('admin_users')
      .update({
        session_token: sessionToken,
        session_expires_at: expiresAt.toISOString(),
        last_login_at: new Date().toISOString(),
        login_attempts: 0,
        locked_until: null,
      })
      .eq('id', admin.id);

    // Logger l'action
    await supabase
      .from('admin_logs')
      .insert({
        admin_id: admin.id,
        admin_email: admin.email,
        action: 'login',
        details: { success: true },
      });

    // Créer la réponse avec le cookie de session
    const response = NextResponse.json({
      success: true,
      admin: {
        id: admin.id,
        email: admin.email,
        name: admin.name,
        role: admin.role,
      },
    });

    response.cookies.set('admin_session', sessionToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 24 * 60 * 60, // 24 heures en secondes
      path: '/',
    });

    return response;

  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json(
      { error: 'Erreur serveur' },
      { status: 500 }
    );
  }
}

// Fonction pour générer un token de session sécurisé
function generateSessionToken() {
  return crypto.randomBytes(32).toString('hex');
}