'use client';

import React, { useState, useEffect } from 'react';
import { Car, Settings, Calendar, Clock, CreditCard, ShieldCheck, CheckCircle2, ArrowLeft } from 'lucide-react';
import { supabase } from '../../lib/supabase';
import { useRouter } from 'next/navigation';

// --- DATA MASTER ---
const PRICING = {
  'Premium Wash': { Small: 100000, Medium: 150000, Large: 200000, Luxury: 250000 },
  'Interior Detailing': { Small: 500000, Medium: 650000, Large: 800000, Luxury: 1000000 },
  'Coating': { Small: 2500000, Medium: 3000000, Large: 3500000, Luxury: 4500000 }
};

const TIME_SLOTS = ['09:00', '11:00', '13:00', '15:00'];
const CAR_SIZES = ['Small', 'Medium', 'Large', 'Luxury'];

export default function BookingPage() {
  const router = useRouter();

  // --- STATE SUPABASE AUTH ---
  const [user, setUser] = useState<any>(null);
  const [isLoadingSafe, setIsLoadingSafe] = useState(true);

  // --- STATE MANAGEMENT FORM ---
  const [carSize, setCarSize] = useState<string>('Medium');
  const [carBrand, setCarBrand] = useState('');
  const [plateNumber, setPlateNumber] = useState('');
  const [service, setService] = useState<string>('Premium Wash');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  
  // State Loading & Sukses
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false); // <-- State baru buat nampilin struk

  // @ts-ignore
  const totalPrice = PRICING[service][carSize] || 0;

  // --- GENERATE 3 PILIHAN TANGGAL OTOMATIS ---
  // Bikin array [0, 1, 2] buat mewakili Hari Ini (0), Besok (1), Lusa (2)
  const dateOptions = [0, 1, 2].map((offset) => {
    const d = new Date();
    d.setDate(d.getDate() + offset);
    
    // Format YYYY-MM-DD buat disimpen ke database
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    const value = `${year}-${month}-${day}`;
    
    const labelDay = offset === 0 ? 'Hari Ini' : offset === 1 ? 'Besok' : 'Lusa';
    const labelDate = d.toLocaleDateString('id-ID', { day: 'numeric', month: 'short' });
    
    return { value, labelDay, labelDate };
  });

  // --- PANTAU STATUS LOGIN ---
  useEffect(() => {
    const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
      setUser(session?.user || null);
      setIsLoadingSafe(false);
    });
    return () => { authListener.subscription.unsubscribe(); };
  }, []);

  const handleLogin = async () => {
    setIsLoadingSafe(true);
    await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: { redirectTo: window.location.origin }
    });
  };

  const handleBookingSubmit = async () => {
    setIsSubmitting(true);
    try {
      const userId = user?.id;

      if (!userId) {
        alert("Sesi tidak valid. Silakan login ulang.");
        return;
      }

      const bookingData = {
        user_id: userId,
        vehicle_type: carSize,
        car_brand: carBrand,
        plate_number: plateNumber, 
        service_type: service,
        booking_date: date,
        time_slot: time
      };

      const response = await fetch('/api/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(bookingData),
      });

      const result = await response.json();
      if (!response.ok) throw new Error(result.error || 'Terjadi kesalahan di server');

      // Kalau sukses, jangan dipindah halaman, tapi ubah status isSuccess jadi true
      setIsSuccess(true);
      window.scrollTo(0, 0); // Scroll ke atas biar struknya keliatan jelas
      
    } catch (error) {
      console.error("Gagal insert ke database:", error);
      alert("Gagal memproses booking. Coba cek console.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // --- TAMPILAN JIKA BOOKING SUKSES (STRUK / E-RECEIPT) ---
  if (isSuccess) {
    return (
      <div className="min-h-screen bg-zinc-950 text-white pt-28 pb-12 flex items-center justify-center">
        <div className="container mx-auto px-6 max-w-2xl">
          <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-8 md:p-12 text-center shadow-2xl relative overflow-hidden">
            {/* Dekorasi Background */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-64 bg-red-600/20 blur-[100px] rounded-full pointer-events-none"></div>

            <CheckCircle2 className="w-20 h-20 text-red-500 mx-auto mb-6 relative z-10" />
            <h1 className="text-3xl font-bold mb-2 relative z-10">Booking Berhasil!</h1>
            <p className="text-zinc-400 mb-8 relative z-10">Terima kasih, antrean Anda telah tercatat di sistem kami.</p>

            {/* Kotak Rincian Ala Struk */}
            <div className="bg-zinc-950/50 border border-zinc-800 rounded-2xl p-6 text-left space-y-4 mb-8 relative z-10">
              <div className="flex justify-between border-b border-zinc-800/50 pb-4">
                <span className="text-zinc-500 text-sm">Nama Pemesan</span>
                <span className="font-medium text-sm">{user?.user_metadata?.full_name || 'Pelanggan'}</span>
              </div>
              <div className="flex justify-between border-b border-zinc-800/50 pb-4">
                <span className="text-zinc-500 text-sm">Kendaraan</span>
                <span className="font-medium text-sm text-right uppercase">
                  {carBrand} <br/>
                  <span className="text-xs text-zinc-400 bg-zinc-800 px-2 py-0.5 rounded-md mt-1 inline-block">{plateNumber}</span>
                </span>
              </div>
              <div className="flex justify-between border-b border-zinc-800/50 pb-4">
                <span className="text-zinc-500 text-sm">Layanan</span>
                <span className="font-medium text-sm">{service}</span>
              </div>
              <div className="flex justify-between border-b border-zinc-800/50 pb-4">
                <span className="text-zinc-500 text-sm">Jadwal</span>
                <span className="font-medium text-sm text-right">
                  {dateOptions.find(d => d.value === date)?.labelDate || date} <br/>
                  <span className="text-red-400">{time} WIB</span>
                </span>
              </div>
              <div className="flex justify-between pt-2">
                <span className="text-zinc-400">Total Pembayaran</span>
                <span className="text-2xl font-bold text-red-500">Rp {totalPrice.toLocaleString('id-ID')}</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 relative z-10">
              <button 
                onClick={() => router.push('/')}
                className="flex-1 bg-zinc-800 hover:bg-zinc-700 text-white py-4 rounded-xl font-bold transition-all flex items-center justify-center gap-2"
              >
                <ArrowLeft className="w-5 h-5" /> Kembali ke Beranda
              </button>
              {/* Nanti tombol ini bisa diarahkan ke halaman /profile kalau udah dibikin */}
              <button 
                onClick={() => router.push('/dashboard')} // <-- Ganti jadi push ke /dashboard
                className="flex-1 bg-red-600 hover:bg-red-700 text-white py-4 rounded-xl font-bold transition-all shadow-[0_0_15px_rgba(220,38,38,0.3)]"
              >
                Lihat Histori
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // --- TAMPILAN FORM BOOKING NORMAL ---
  return (
    <div className="min-h-screen bg-zinc-950 text-white pt-28 pb-12">
      <div className="container mx-auto px-6 max-w-6xl">
        
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-2">Reservasi Jadwal</h1>
          <p className="text-zinc-400">Atur jadwal perawatan kendaraan Anda tanpa perlu antre panjang.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          <div className="lg:col-span-2 space-y-8">
            
            <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6">
              <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                <Car className="text-red-500" /> Data Kendaraan
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-sm text-zinc-400 mb-1">Merek & Tipe Mobil</label>
                  <input type="text" placeholder="Contoh: Honda HR-V" className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-red-500 transition-colors" value={carBrand} onChange={(e) => setCarBrand(e.target.value)} />
                </div>
                <div>
                  <label className="block text-sm text-zinc-400 mb-1">Plat Nomor</label>
                  <input type="text" placeholder="Contoh: B 1234 ABC" className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-red-500 transition-colors uppercase" value={plateNumber} onChange={(e) => setPlateNumber(e.target.value)} />
                </div>
              </div>
              <div>
                <label className="block text-sm text-zinc-400 mb-2">Ukuran Kendaraan</label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {CAR_SIZES.map((size) => (
                    <button key={size} onClick={() => setCarSize(size)} className={`py-2 px-4 rounded-lg text-sm font-medium border transition-all ${carSize === size ? 'bg-red-600/10 border-red-500 text-red-500' : 'bg-zinc-950 border-zinc-800 text-zinc-400 hover:border-zinc-600'}`}>
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6">
              <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                <Settings className="text-red-500" /> Pilih Layanan
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {Object.keys(PRICING).map((srv) => (
                  <button key={srv} onClick={() => setService(srv)} className={`p-4 rounded-xl border text-left transition-all flex flex-col justify-center ${service === srv ? 'bg-red-600/10 border-red-500' : 'bg-zinc-950 border-zinc-800 hover:border-zinc-600'}`}>
                    <h3 className={`font-bold mb-1 ${service === srv ? 'text-white' : 'text-zinc-300'}`}>{srv}</h3>
                    {/* @ts-ignore */}
                    <p className="text-sm text-red-500 font-medium">Mulai Rp {PRICING[srv]['Small'].toLocaleString('id-ID')}</p>
                  </button>
                ))}
              </div>
            </div>

            {/* JADWAL (UPDATE: 3 TOMBOL TANGGAL + WAKTU) */}
            <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6">
              <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                <Calendar className="text-red-500" /> Jadwal Kedatangan
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                {/* 3 Tombol Pilih Tanggal */}
                <div>
                  <label className="block text-sm text-zinc-400 mb-3">Pilih Tanggal</label>
                  <div className="grid grid-cols-3 gap-2">
                    {dateOptions.map((d) => (
                      <button
                        key={d.value}
                        onClick={() => setDate(d.value)}
                        className={`p-3 rounded-xl border text-center transition-all flex flex-col items-center justify-center ${
                          date === d.value
                            ? 'bg-red-600 border-red-500'
                            : 'bg-zinc-950 border-zinc-800 hover:border-zinc-600'
                        }`}
                      >
                        <span className={`font-bold text-sm ${date === d.value ? 'text-white' : 'text-zinc-300'}`}>{d.labelDay}</span>
                        <span className={`text-xs mt-1 ${date === d.value ? 'text-zinc-200' : 'text-zinc-500'}`}>{d.labelDate}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Jam Kedatangan */}
                <div>
                  <label className="block text-sm text-zinc-400 mb-3">Pilih Waktu (Jam)</label>
                  <div className="grid grid-cols-2 gap-2">
                    {TIME_SLOTS.map((slot) => (
                      <button key={slot} onClick={() => setTime(slot)} className={`py-3 px-4 rounded-xl text-sm font-medium border flex items-center justify-center gap-2 transition-all ${time === slot ? 'bg-red-600 border-red-500 text-white' : 'bg-zinc-950 border-zinc-800 text-zinc-400 hover:border-zinc-600'}`}>
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
                    {date ? dateOptions.find(d => d.value === date)?.labelDate || date : '-'}
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

              {/* SMART BUTTON */}
              {isLoadingSafe ? (
                <button disabled className="w-full bg-zinc-800 text-zinc-400 py-4 rounded-xl font-bold flex items-center justify-center cursor-not-allowed">
                  Memeriksa status...
                </button>
              ) : !user ? (
                <button onClick={handleLogin} className="w-full bg-white hover:bg-zinc-200 text-black py-4 rounded-xl font-bold flex items-center justify-center gap-2 transition-all shadow-lg">
                  <ShieldCheck className="w-5 h-5" /> Booking Sekarang
                </button>
              ) : (
                <button 
                  onClick={handleBookingSubmit}
                  disabled={!carBrand || !plateNumber || !date || !time || isSubmitting}
                  className="w-full bg-red-600 hover:bg-red-700 disabled:bg-zinc-800 disabled:text-zinc-500 disabled:cursor-not-allowed text-white py-4 rounded-xl font-bold transition-all shadow-[0_0_15px_rgba(220,38,38,0.3)] disabled:shadow-none flex justify-center items-center gap-2"
                >
                  {isSubmitting ? (
                    <><div className="w-5 h-5 rounded-full border-2 border-zinc-400 border-t-white animate-spin"></div> Memproses...</>
                  ) : "Konfirmasi Booking"}
                </button>
              )}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}