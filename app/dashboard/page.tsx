'use client';

import React, { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';
import { useRouter } from 'next/navigation';
import { User, LogOut, Calendar, Clock, Car, Settings, ShieldCheck, History } from 'lucide-react';

export default function ProfilePage() {
  const router = useRouter();
  
  const [user, setUser] = useState<any>(null);
  const [bookings, setBookings] = useState<any[]>([]);
  const [isLoadingAuth, setIsLoadingAuth] = useState(true);
  const [isLoadingData, setIsLoadingData] = useState(true);

  // 1. Pantau Status Login
  useEffect(() => {
    const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
      const currentUser = session?.user || null;
      setUser(currentUser);
      setIsLoadingAuth(false);
      
      // Kalau user udah dapet, langsung tarik data booking-nya
      if (currentUser) {
        fetchMyBookings(currentUser.id);
      } else {
        setIsLoadingData(false);
      }
    });

    return () => { authListener.subscription.unsubscribe(); };
  }, []);

  // 2. Fungsi Narik Data dari Supabase (Aman karena udah ada RLS Policy)
  const fetchMyBookings = async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from('bookings')
        .select('*')
        .eq('user_id', userId)
        .order('booking_date', { ascending: false }); // Urutin dari yang terbaru

      if (error) throw error;
      setBookings(data || []);
    } catch (error) {
      console.error("Gagal narik data riwayat:", error);
    } finally {
      setIsLoadingData(false);
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push('/');
  };

  const handleLogin = async () => {
    await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: { redirectTo: window.location.origin + '/dashboard' }
    });
  };

  // --- TAMPILAN LOADING ---
  if (isLoadingAuth) {
    return (
      <div className="min-h-screen bg-zinc-950 flex items-center justify-center">
        <div className="w-10 h-10 border-4 border-zinc-800 border-t-red-600 rounded-full animate-spin"></div>
      </div>
    );
  }

  // --- TAMPILAN JIKA BELUM LOGIN ---
  if (!user) {
    return (
      <div className="min-h-screen bg-zinc-950 text-white pt-28 pb-12 flex items-center justify-center">
        <div className="text-center bg-zinc-900 p-10 rounded-3xl border border-zinc-800 max-w-md mx-4">
          <ShieldCheck className="w-16 h-16 text-red-500 mx-auto mb-6" />
          <h1 className="text-2xl font-bold mb-3">Area Terbatas</h1>
          <p className="text-zinc-400 mb-8">Silakan login terlebih dahulu untuk melihat profil dan riwayat booking Anda.</p>
          <button 
            onClick={handleLogin}
            className="w-full bg-white hover:bg-zinc-200 text-black py-4 rounded-xl font-bold flex items-center justify-center gap-2 transition-all shadow-lg"
          >
            Login dengan Google
          </button>
        </div>
      </div>
    );
  }

  // --- TAMPILAN PROFIL & RIWAYAT (NORMAL) ---
  return (
    <div className="min-h-screen bg-zinc-950 text-white pt-28 pb-12">
      <div className="container mx-auto px-6 max-w-5xl">
        
        <div className="flex items-center gap-3 mb-8">
          <User className="w-8 h-8 text-red-500" />
          <h1 className="text-3xl md:text-4xl font-bold">Profil Saya</h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* KOLOM KIRI: KARTU PROFIL IDENTITAS */}
          <div className="lg:col-span-1">
            <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 sticky top-28">
              <div className="flex flex-col items-center text-center border-b border-zinc-800 pb-6 mb-6">
                <img 
                  src={user.user_metadata?.avatar_url || ''} 
                  alt="Avatar" 
                  className="w-24 h-24 rounded-full border-4 border-zinc-800 mb-4"
                />
                <h2 className="text-xl font-bold">{user.user_metadata?.full_name}</h2>
                <p className="text-zinc-400 text-sm">{user.email}</p>
              </div>
              
              <button 
                onClick={handleLogout}
                className="w-full bg-zinc-950 hover:bg-red-600/10 border border-zinc-800 hover:border-red-500 text-zinc-300 hover:text-red-500 py-3 rounded-xl font-bold transition-all flex items-center justify-center gap-2"
              >
                <LogOut className="w-4 h-4" /> Keluar Akun
              </button>
            </div>
          </div>

          {/* KOLOM KANAN: RIWAYAT BOOKING */}
          <div className="lg:col-span-2">
            <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6">
              <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                <History className="text-red-500" /> Riwayat Perawatan
              </h2>

              {isLoadingData ? (
                <div className="flex justify-center py-10">
                  <div className="w-8 h-8 border-4 border-zinc-800 border-t-red-600 rounded-full animate-spin"></div>
                </div>
              ) : bookings.length === 0 ? (
                <div className="text-center py-12 bg-zinc-950 rounded-xl border border-dashed border-zinc-800">
                  <Car className="w-12 h-12 text-zinc-700 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-zinc-300 mb-1">Belum ada riwayat</h3>
                  <p className="text-zinc-500 text-sm mb-6">Anda belum pernah melakukan booking layanan kami.</p>
                  <button 
                    onClick={() => router.push('/booking')}
                    className="bg-red-600 hover:bg-red-700 text-white px-6 py-2.5 rounded-lg text-sm font-bold transition-all shadow-[0_0_15px_rgba(220,38,38,0.3)]"
                  >
                    Booking Sekarang
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  {bookings.map((item, index) => (
                    <div key={index} className="bg-zinc-950 border border-zinc-800 rounded-xl p-5 hover:border-zinc-700 transition-colors">
                      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                        
                        {/* Info Kendaraan & Layanan */}
                        <div className="space-y-2">
                          <div className="flex items-center gap-2">
                            <span className="bg-red-600 text-white text-xs font-bold px-2 py-1 rounded">
                              {item.vehicle_type}
                            </span>
                            <span className="font-bold text-lg">{item.car_brand}</span>
                          </div>
                          <div className="flex items-center gap-4 text-sm text-zinc-400">
                            <span className="flex items-center gap-1.5"><Car className="w-4 h-4"/> {item.plate_number}</span>
                            <span className="flex items-center gap-1.5"><Settings className="w-4 h-4"/> {item.service_type}</span>
                          </div>
                        </div>

                        {/* Info Waktu */}
                        <div className="text-left md:text-right bg-zinc-900 p-3 rounded-lg border border-zinc-800/50">
                          <div className="flex items-center md:justify-end gap-2 text-sm font-medium mb-1">
                            <Calendar className="w-4 h-4 text-zinc-400" /> 
                            {new Date(item.booking_date).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}
                          </div>
                          <div className="flex items-center md:justify-end gap-2 text-sm text-red-400 font-bold">
                            <Clock className="w-4 h-4" /> {item.time_slot} WIB
                          </div>
                        </div>

                      </div>
                    </div>
                  ))}
                </div>
              )}

            </div>
          </div>

        </div>
      </div>
    </div>
  );
}