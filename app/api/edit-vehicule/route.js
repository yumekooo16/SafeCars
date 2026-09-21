import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { cookies } from 'next/headers';

export async function PUT(request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json(
        { error: 'ID du véhicule manquant' },
        { status: 400 }
      );
    }

    const body = await request.json();

    // Validation des champs obligatoires
    const requiredFields = ['marque', 'modele', 'annee', 'prix', 'kilometrage', 'carburant', 'transmission'];
    const missingFields = requiredFields.filter(field => !body[field]);
    
    if (missingFields.length > 0) {
      return NextResponse.json(
        { error: `Champs manquants: ${missingFields.join(', ')}` },
        { status: 400 }
      );
    }

    // Vérifier l'authentification (AVEC AWAIT)
    const cookieStore = await cookies();
    const sessionToken = cookieStore.get('admin_session')?.value;

    if (!sessionToken) {
      return NextResponse.json(
        { error: 'Non authentifié' },
        { status: 401 }
      );
    }

    // Créer le client Supabase AVEC SERVICE ROLE KEY (comme dans add-vehicule)
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL,
      process.env.SUPABASE_SERVICE_ROLE_KEY
    );

    // Convertir et valider l'année
    const annee = Number(body.annee);
    if (isNaN(annee) || annee < 1990 || annee > new Date().getFullYear() + 1 || !Number.isInteger(annee)) {
      return NextResponse.json(
        { error: `Année invalide. Doit être entre 1990 et ${new Date().getFullYear() + 1}` },
        { status: 400 }
      );
    }

    // Convertir et valider le prix (max 999,999,999 pour éviter l'overflow)
    const prix = Number(body.prix);
    if (isNaN(prix) || prix <= 0 || prix > 999999999 || !Number.isFinite(prix)) {
      return NextResponse.json(
        { error: 'Prix invalide. Doit être entre 1 et 999,999,999 €' },
        { status: 400 }
      );
    }

    // Convertir et valider le kilométrage (max 9,999,999 pour éviter l'overflow)
    const kilometrage = Number(body.kilometrage);
    if (isNaN(kilometrage) || kilometrage < 0 || kilometrage > 9999999 || !Number.isInteger(kilometrage)) {
      return NextResponse.json(
        { error: 'Kilométrage invalide. Doit être entre 0 et 9,999,999 km' },
        { status: 400 }
      );
    }

    // Validation du statut
    const validStatuses = ['disponible', 'vendu', 'reserve'];
    const statut = body.statut && validStatuses.includes(body.statut) ? body.statut : 'disponible';

    // Préparer les données EXACTEMENT comme dans add-vehicule
    const vehicleData = {
      marque: body.marque.trim(),
      modele: body.modele.trim(),
      annee: annee,
      prix: prix,
      kilometrage: kilometrage,
      carburant: body.carburant.trim(),
      transmission: body.transmission.trim(),
      couleur: body.couleur?.trim() || null,
      description: body.description?.trim() || null,
      images: Array.isArray(body.images) ? body.images : [],
      videos: Array.isArray(body.videos) ? body.videos : [],
      statut: statut,
      is_featured: body.is_featured || false
    };

    // Mettre à jour
    const { data, error } = await supabase
      .from('vehicules')
      .update(vehicleData)
      .eq('id', id)
      .select();

    if (error) {
      console.error('❌ Erreur Supabase:', error);
      const errMsg = (error && (error.message || error.detail || JSON.stringify(error))) || 'Erreur Supabase';
      return NextResponse.json(
        { error: `Erreur Supabase: ${errMsg}` },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { success: true, message: 'Véhicule modifié', data: data[0] },
      { status: 200 }
    );

  } catch (error) {
    console.error('❌ Erreur serveur:', error);
    const errMsg = (error && (error.message || String(error))) || 'Erreur serveur';
    return NextResponse.json(
      { error: 'Erreur serveur', details: errMsg },
      { status: 500 }
    );
  }
}