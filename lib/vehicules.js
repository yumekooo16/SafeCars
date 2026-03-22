import { createClient } from '@supabase/supabase-js'

function getClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  if (!url || !key) return null
  return createClient(url, key)
}

export async function fetchVehiculeById(id) {
  if (!id || typeof id !== 'string') return null
  const supabase = getClient()
  if (!supabase) return null

  const { data, error } = await supabase.from('vehicules').select('*').eq('id', id).maybeSingle()

  if (error || !data) return null
  return data
}

export async function fetchVehiculeIdsForSitemap() {
  const supabase = getClient()
  if (!supabase) return []

  const { data, error } = await supabase
    .from('vehicules')
    .select('id, updated_at, created_at')

  if (error || !data) return []
  return data
}
