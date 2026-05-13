import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

// Kita pake Kunci Master (Service Role) di Server biar bisa nembus gembok RLS Supabase
const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY! // <-- Kunci master lu di .env.local
);

export async function POST(req: Request) {
  try {
    // 1. Tangkap data yang dilempar dari form booking lu
    const body = await req.json();

    // 2. Tembak ke Supabase pake Kunci Master
    const { error } = await supabaseAdmin.from('bookings').insert([body]);

    if (error) {
      console.error("Supabase Error:", error);
      throw error;
    }

    // 3. Kasih tau frontend kalau sukses
    return NextResponse.json({ success: true, message: 'Booking berhasil disimpan' });

  } catch (error: any) {
    console.error("API Error:", error.message);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}