import { createClient } from '@supabase/supabase-js';
import bcrypt from 'bcrypt';
import fs from 'fs';
import path from 'path';

// Charger les variables d'environnement du fichier .env.local
const envFilePath = path.resolve('.env.local');
const envContent = fs.readFileSync(envFilePath, 'utf-8');
const envVars = {};

envContent.split('\n').forEach(line => {
  if (line.trim() && !line.startsWith('#')) {
    const [key, value] = line.split('=');
    if (key && value) {
      envVars[key.trim()] = value.trim();
    }
  }
});

// Récupérer les arguments
const email = process.argv[2];
const password = process.argv[3];
const name = process.argv[4] || 'Admin';

if (!email || !password) {
  console.error('Usage: node create-first-admin.js <email> <password> [name]');
  process.exit(1);
}

// Créer le client Supabase
const supabase = createClient(
  envVars.NEXT_PUBLIC_SUPABASE_URL,
  envVars.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

async function createAdmin() {
  try {
    // Hasher le mot de passe
    const passwordHash = await bcrypt.hash(password, 10);

    // Insérer l'admin dans la base de données
    const { data, error } = await supabase
      .from('admin_users')
      .insert([
        {
          email: email.toLowerCase(),
          name: name,
          password_hash: passwordHash,
          role: 'admin',
          is_active: true,
          created_at: new Date().toISOString(),
        },
      ])
      .select();

    if (error) {
      console.error('Erreur lors de la création de l\'admin:', error);
      process.exit(1);
    }

    console.log('✅ Admin créé avec succès!');
    console.log(`Email: ${email}`);
    console.log(`Nom: ${name}`);
    console.log(`ID: ${data[0].id}`);
    process.exit(0);
  } catch (err) {
    console.error('Erreur:', err);
    process.exit(1);
  }
}

createAdmin();
