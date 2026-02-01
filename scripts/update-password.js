import { createClient } from '@supabase/supabase-js';
import fs from 'fs';
import path from 'path';

// Charger les variables d'environnement
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

const supabase = createClient(
  envVars.NEXT_PUBLIC_SUPABASE_URL,
  envVars.SUPABASE_SERVICE_ROLE_KEY || envVars.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

const email = 'admin@safecars.fr';
const newHash = '$2b$10$0kkzS/R3sf3tVb3c3.HwcOICgAE1Wlu1KzUx0BqzSeg1TqV3t16.m';

async function updatePassword() {
  try {
    const { data, error } = await supabase
      .from('admin_users')
      .update({ password_hash: newHash })
      .eq('email', email)
      .select();

    if (error) {
      console.error('Error:', error);
      process.exit(1);
    }

    console.log('✅ Password updated successfully!');
    console.log('Email:', email);
    console.log('New hash:', newHash);
    console.log('Updated record:', data);
    process.exit(0);
  } catch (err) {
    console.error('Error:', err);
    process.exit(1);
  }
}

updatePassword();
