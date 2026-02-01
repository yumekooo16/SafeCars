import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { cookies } from 'next/headers';

export async function POST(request) {
  try {
    const body = await request.json();
    
    console.log('Données reçues:', body);

    // Validation des champs obligatoires
    if (!body.marque || !body.modele || !body.annee || !body.prix || !body.kilometrage || !body.carburant || !body.transmission) {
      return NextResponse.json(
        { error: 'Champs manquants' },
        { status: 400 }
      );
    }

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

    // Vérifier l'authentification
    const cookieStore = await cookies();
    const sessionToken = cookieStore.get('admin_session')?.value;

    if (!sessionToken) {
      return NextResponse.json(
        { error: 'Non authentifié' },
        { status: 401 }
      );
    }

    // Créer le client Supabase
      const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL,
      process.env.SUPABASE_SERVICE_ROLE_KEY
    );

    // Validation du statut
    const validStatuses = ['disponible', 'vendu', 'reserve'];
    const statut = body.statut && validStatuses.includes(body.statut) ? body.statut : 'disponible';

    // Préparer les données
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
  statut: statut,
  is_featured: body.is_featured || false  // <--- ajouté
};

    console.log('Données à insérer:', vehicleData);

    // Insérer
    const { data, error } = await supabase
      .from('vehicules')
      .insert([vehicleData])
      .select();

    if (error) {
      console.error('Erreur Supabase:', error);
      return NextResponse.json(
        { error: error.message },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { success: true, data: data[0] },
      { status: 201 }
    );

  } catch (error) {
    console.error('Erreur serveur:', error);
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
}