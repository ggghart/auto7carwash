import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

// Kita bikin "Brankas Kustom" pake sessionStorage.
// Harus dibungkus pengecekan 'typeof window' biar nggak error pas Next.js ngerender di Server.
const sessionOnlyStorage = {
  getItem: (key: string) => {
    if (typeof window !== 'undefined') {
      return window.sessionStorage.getItem(key);
    }
    return null;
  },
  setItem: (key: string, value: string) => {
    if (typeof window !== 'undefined') {
      window.sessionStorage.setItem(key, value);
    }
  },
  removeItem: (key: string) => {
    if (typeof window !== 'undefined') {
      window.sessionStorage.removeItem(key);
    }
  },
};

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: sessionOnlyStorage, // <--- Kita paksa Supabase pake brankas yang umurnya pendek
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true,
  },
});