import { createClient } from '@supabase/supabase-js';

// Pakai anon key aja karena RLS udah ngurusin keamanannya
export const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);