'use client';

import React, { useState } from 'react';
import { useSession, signIn } from 'next-auth/react';
import { Car, Settings, Calendar, Clock, CreditCard, ShieldCheck } from 'lucide-react';
import { supabase } from '../../lib/supabase'; // <-- Import modul Supabase
import { useRouter } from 'next/navigation'; // <-- Buat pindah halaman abis sukses

// --- DATA MASTER HARGA ---
const PRICING = {
  'Premium Wash': { Small: 100000, Medium: 150000, Large: 200000, Luxury: 250000 },
  'Interior Detailing': { Small: 500000, Medium: 650000, Large: 800000, Luxury: 1000000 },
  'Coating': { Small: 2500000, Medium: 3000000, Large: 3500000, Luxury: 4500000 }
};

const TIME_SLOTS = ['09:00', '11:00', '13:00', '15:00'];
const CAR_SIZES = ['Small', 'Medium', 'Large', 'Luxury'];

export default function BookingPage() {
  const { data: session, status } = useSession();
  const router = useRouter(); // <-- Inisialisasi router buat redirect

  // --- STATE MANAGEMENT ---
  const [carSize, setCarSize] = useState<string>('Medium');
  const [carBrand, setCarBrand] = useState('');
  const [plateNumber, setPlateNumber] = useState('');
  const [service, setService] = useState<string>('Premium Wash');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false); // <-- State buat loading submit

  // --- LOGIKA PERHITUNGAN ---
  // @ts-ignore (Biar ga rewel soal tipe data key objek)
  const totalPrice = PRICING[service][carSize] || 0;

  // --- FUNGSI SUBMIT KE SUPABASE ---
  const handleBookingSubmit = async () => {
    setIsSubmitting(true);
    try {
      // Ambil ID user dari "KTP Digital" NextAuth
      const userId = (session?.user as any)?.id;

      if (!userId) {
        alert("Sesi tidak valid. Silakan login ulang.");
        return;
      }

      // Lempar data ke tabel bookings
      const { error } = await supabase.from('bookings').insert({
        user_id: userId,
        vehicle_type: carSize,
        car_brand: carBrand,
        plate_number: plateNumber, 
        service_type: service,
        booking_date: date,
        time_slot: time
      });

      if (error) throw error;

      // Kalau sukses
      alert("Booking berhasil masuk antrean! Mantap bro!");
      router.push('/'); // Lempar balik ke home dulu
      
    } catch (error) {
      console.error("Wah, gagal insert ke database nih:", error);
      alert("Gagal memproses booking. Coba cek console inspect element deh.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-white pt-28 pb-12">
      <div className="container mx-auto px-6 max-w-6xl">
        
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-2">Reservasi Jadwal</h1>
          <p className="text-zinc-400">Atur jadwal perawatan kendaraan Anda tanpa perlu antre panjang.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* BAGIAN KIRI: FORM PENGISIAN */}
          <div className="lg:col-span-2 space-y-8">
            
            {/* 1. DATA KENDARAAN */}
            <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6">
              <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                <Car className="text-red-500" /> Data Kendaraan
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-sm text-zinc-400 mb-1">Merek & Tipe Mobil</label>
                  <input 
                    type="text" 
                    placeholder="Contoh: Honda HR-V" 
                    className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-red-500 transition-colors"
                    value={carBrand}
                    onChange={(e) => setCarBrand(e.target.value)}
                  />
                </div>
                <div>
                  <label className="block text-sm text-zinc-400 mb-1">Plat Nomor</label>
                  <input 
                    type="text" 
                    placeholder="Contoh: B 1234 ABC" 
                    className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-red-500 transition-colors uppercase"
                    value={plateNumber}
                    onChange={(e) => setPlateNumber(e.target.value)}
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm text-zinc-400 mb-2">Ukuran Kendaraan</label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {CAR_SIZES.map((size) => (
                    <button
                      key={size}
                      onClick={() => setCarSize(size)}
                      className={`py-2 px-4 rounded-lg text-sm font-medium border transition-all ${
                        carSize === size 
                        ? 'bg-red-600/10 border-red-500 text-red-500' 
                        : 'bg-zinc-950 border-zinc-800 text-zinc-400 hover:border-zinc-600'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* 2. PILIH LAYANAN */}
            <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6">
              <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                <Settings className="text-red-500" /> Pilih Layanan
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {Object.keys(PRICING).map((srv) => (
                  <button
                    key={srv}
                    onClick={() => setService(srv)}
                    className={`p-4 rounded-xl border text-left transition-all ${
                      service === srv
                      ? 'bg-red-600/10 border-red-500'
                      : 'bg-zinc-950 border-zinc-800 hover:border-zinc-600'
                    }`}
                  >
                    <h3 className={`font-bold mb-1 ${service === srv ? 'text-white' : 'text-zinc-300'}`}>{srv}</h3>
                    {/* @ts-ignore */}
                    <p className="text-sm text-red-500 font-medium">Mulai Rp {PRICING[srv]['Small'].toLocaleString('id-ID')}</p>
                  </button>
                ))}
              </div>
            </div>

            {/* 3. JADWAL (TANGGAL & WAKTU) */}
            <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6">
              <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                <Calendar className="text-red-500" /> Jadwal Kedatangan
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm text-zinc-400 mb-2">Pilih Tanggal</label>
                  <input 
                    type="date" 
                    min={new Date().toISOString().split('T')[0]} 
                    className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-red-500 transition-colors color-scheme-dark"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                  />
                </div>
                <div>
                  <label className="block text-sm text-zinc-400 mb-2">Pilih Waktu (Jam)</label>
                  <div className="grid grid-cols-2 gap-2">
                    {TIME_SLOTS.map((slot) => (
                      <button
                        key={slot}
                        onClick={() => setTime(slot)}
                        className={`py-3 px-4 rounded-lg text-sm font-medium border flex items-center justify-center gap-2 transition-all ${
                          time === slot
                          ? 'bg-red-600 border-red-500 text-white'
                          : 'bg-zinc-950 border-zinc-800 text-zinc-400 hover:border-zinc-600'
                        }`}
                      >
                        <Clock className="w-4 h-4" /> {slot}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

          </div>

          {/* BAGIAN KANAN: RINGKASAN & SMART BUTTON */}
          <div className="lg:col-span-1">
            <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 sticky top-28">
              <h2 className="text-xl font-bold mb-6 flex items-center gap-2 border-b border-zinc-800 pb-4">
                <CreditCard className="text-red-500" /> Ringkasan Order
              </h2>
              
              <div className="space-y-4 mb-6">
                <div className="flex justify-between text-sm">
                  <span className="text-zinc-400">Kendaraan</span>
                  <span className="font-medium text-right">{carBrand || '-'} <br/><span className="text-xs text-zinc-500">({carSize})</span></span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-zinc-400">Layanan</span>
                  <span className="font-medium">{service}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-zinc-400">Jadwal</span>
                  <span className="font-medium text-right">
                    {date ? new Date(date).toLocaleDateString('id-ID', { weekday: 'short', day: 'numeric', month: 'short' }) : '-'}
                    {time ? ` Pukul ${time}` : ''}
                  </span>
                </div>
              </div>

              <div className="border-t border-zinc-800 pt-4 mb-8">
                <div className="flex justify-between items-end">
                  <span className="text-zinc-400">Total Biaya</span>
                  <span className="text-2xl font-bold text-red-500">
                    Rp {totalPrice.toLocaleString('id-ID')}
                  </span>
                </div>
              </div>

              {/* SMART BUTTON LOGIC */}
              {status === 'loading' ? (
                <button disabled className="w-full bg-zinc-800 text-zinc-400 py-4 rounded-xl font-bold flex items-center justify-center cursor-not-allowed">
                  Memeriksa status...
                </button>
              ) : !session ? (
                <button 
                  onClick={() => signIn('google')}
                  className="w-full bg-white hover:bg-zinc-200 text-black py-4 rounded-xl font-bold flex items-center justify-center gap-2 transition-all shadow-lg"
                >
                  <ShieldCheck className="w-5 h-5" /> Login Google untuk Konfirmasi
                </button>
              ) : (
                <button 
                  onClick={handleBookingSubmit}
                  disabled={!carBrand || !plateNumber || !date || !time || isSubmitting}
                  className="w-full bg-red-600 hover:bg-red-700 disabled:bg-zinc-800 disabled:text-zinc-500 disabled:cursor-not-allowed text-white py-4 rounded-xl font-bold transition-all shadow-[0_0_15px_rgba(220,38,38,0.3)] disabled:shadow-none flex justify-center items-center gap-2"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-5 h-5 rounded-full border-2 border-zinc-400 border-t-white animate-spin"></div>
                      Menyimpan Data...
                    </>
                  ) : (
                    "Konfirmasi Booking"
                  )}
                </button>
              )}

            </div>
          </div>

        </div>
      </div>
    </div>
  );
}