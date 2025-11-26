import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.SUPABASE_URL || '';
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY || '';
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || '';

const hasCredentials = supabaseUrl.length > 0 && 
                       supabaseAnonKey.length > 0 && 
                       supabaseServiceKey.length > 0;

if (hasCredentials) {
  console.log('✅ Supabase credentials configured');
} else {
  console.warn('⚠️  Supabase credentials missing');
}

export const supabase = hasCredentials
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;

export const supabaseAdmin = hasCredentials
  ? createClient(supabaseUrl, supabaseServiceKey)
  : null;
