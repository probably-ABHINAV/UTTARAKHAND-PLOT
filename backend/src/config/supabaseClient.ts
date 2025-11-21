import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

// Validate Supabase credentials are real URLs/keys, not placeholders
const isValidUrl = (url: string | undefined): boolean => {
  if (!url) return false;
  if (url.startsWith('YOUR_') || url.includes('PLACEHOLDER')) return false;
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
};

const isValidKey = (key: string | undefined): boolean => {
  if (!key) return false;
  return !key.startsWith('YOUR_') && !key.includes('PLACEHOLDER') && key.length > 10;
};

const hasValidCredentials = isValidUrl(supabaseUrl) && 
                           isValidKey(supabaseAnonKey) && 
                           isValidKey(supabaseServiceKey);

// Check if Supabase credentials are provided
if (!hasValidCredentials) {
  console.warn('⚠️  Supabase credentials not found or invalid. Please configure the following environment variables:');
  console.warn('   - SUPABASE_URL (must be a valid HTTPS URL)');
  console.warn('   - SUPABASE_ANON_KEY');
  console.warn('   - SUPABASE_SERVICE_ROLE_KEY');
  console.warn('   The API will start but database operations will fail until configured.');
}

// Client for public access (obeys RLS) - only create if credentials exist
export const supabase = hasValidCredentials && supabaseUrl && supabaseAnonKey
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;

// Admin client that can bypass RLS (use with caution) - only create if credentials exist
export const supabaseAdmin = hasValidCredentials && supabaseUrl && supabaseServiceKey
  ? createClient(supabaseUrl, supabaseServiceKey)
  : null;
