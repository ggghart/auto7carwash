import React from 'react';
import { CheckCircle2, Droplets, Wind, ShieldCheck, Star, MapPin, Clock, Phone } from 'lucide-react';

// 1. Import komponen Navbar lu di sini
import Navbar from '@/components/navbar';
// (atau sesuaikan jalurnya kalau lu taruh di folder beda, misal: import Navbar from '../components/Navbar')
import BeforeAfter from '@/components/beforeafter';

export default function LandingPage() {
  return (
    <div className="bg-zinc-950 text-zinc-50 min-h-screen font-sans">
      <Navbar />
      
      {/* 1. HERO SECTION */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Background Image Placeholder - Ganti src dengan foto mobil HD lu */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-transparent z-10" />
          <img 
            src="/landing.png" 
            alt="Premium Carwash" 
            className="w-full h-full object-cover opacity-60"
          />
        </div>

        <div className="container mx-auto px-6 relative z-20">
          <div className="max-w-3xl">
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6 leading-tight">
              Kembalikan <span className="text-red-600">Kilau Sempurna</span> Mobil Kesayangan Anda.
            </h1>
            <p className="text-lg md:text-xl text-zinc-300 mb-10 max-w-xl">
              Perawatan premium dengan teknologi terkini dan sentuhan profesional. Bebas antri panjang dengan sistem Priority Booking kami.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button className="bg-red-600 hover:bg-red-700 text-white px-8 py-4 rounded-full font-semibold text-lg transition-all transform hover:scale-105 shadow-[0_0_20px_rgba(220,38,38,0.4)]">
                Booking Sekarang
              </button>
              <button className="bg-transparent border border-zinc-500 hover:border-white hover:bg-zinc-900 text-white px-8 py-4 rounded-full font-semibold text-lg transition-all">
                Lihat Layanan
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 2. SERVICES & PRICING */}
      <section className="py-24 bg-black" id="services">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Layanan <span className="text-red-600">Premium</span></h2>
            <p className="text-zinc-400">Pilih perawatan terbaik yang sesuai dengan kebutuhan kendaraan Anda.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Card 1 */}
            <div className="bg-zinc-900/50 border border-zinc-800 rounded-2xl p-8 hover:border-red-600/50 hover:shadow-[0_0_30px_rgba(220,38,38,0.15)] transition-all group">
              <h3 className="text-2xl font-bold mb-2 group-hover:text-red-500 transition-colors">Cuci Reguler</h3>
              <p className="text-zinc-400 mb-6 text-sm">Pembersihan eksterior mendetail dan vakum interior menyeluruh.</p>
              <div className="text-3xl font-bold mb-6">Mulai Rp 75K</div>
              <ul className="space-y-3 mb-8 text-zinc-300 text-sm">
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-red-600" /> Snow Wash Body</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-red-600" /> Vacuum Interior</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-red-600" /> Semir Ban Premium</li>
              </ul>
            </div>

            {/* Card 2 */}
            <div className="bg-gradient-to-b from-zinc-900 to-black border border-red-900/50 rounded-2xl p-8 shadow-[0_0_20px_rgba(220,38,38,0.1)] relative transform md:-translate-y-4">
              <div className="absolute top-0 right-0 bg-red-600 text-xs font-bold px-3 py-1 rounded-bl-lg rounded-tr-lg">BEST SELLER</div>
              <h3 className="text-2xl font-bold mb-2 text-white">Auto Detailing</h3>
              <p className="text-zinc-400 mb-6 text-sm">Mengembalikan warna asli cat dan membersihkan noda membandel.</p>
              <div className="text-3xl font-bold mb-6">Mulai Rp 350K</div>
              <ul className="space-y-3 mb-8 text-zinc-300 text-sm">
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-red-600" /> Semua fitur Cuci Reguler</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-red-600" /> Penghilang Jamur Kaca & Body</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-red-600" /> Engine Bay Cleaning</li>
              </ul>
            </div>

            {/* Card 3 */}
            <div className="bg-zinc-900/50 border border-zinc-800 rounded-2xl p-8 hover:border-red-600/50 hover:shadow-[0_0_30px_rgba(220,38,38,0.15)] transition-all group">
              <h3 className="text-2xl font-bold mb-2 group-hover:text-red-500 transition-colors">Nano Ceramic</h3>
              <p className="text-zinc-400 mb-6 text-sm">Proteksi cat maksimal dengan efek daun talas tahan lama.</p>
              <div className="text-3xl font-bold mb-6">Mulai Rp 2.5jt</div>
              <ul className="space-y-3 mb-8 text-zinc-300 text-sm">
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-red-600" /> Multi-layer Coating 9H</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-red-600" /> Paint Correction</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-red-600" /> Garansi 2 Tahun</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* 3. VALUE PROPOSITION */}
      <section className="py-20 bg-zinc-950 border-y border-zinc-900" id="benefits">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-10 text-center">
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 bg-red-600/10 rounded-full flex items-center justify-center mb-4 text-red-600">
                <Droplets className="w-8 h-8" />
              </div>
              <h4 className="text-lg font-bold mb-2">Air PDAM Filtered</h4>
              <p className="text-sm text-zinc-400">Bebas mineral keras, meminimalisir risiko baret dan water spot.</p>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 bg-red-600/10 rounded-full flex items-center justify-center mb-4 text-red-600">
                <Wind className="w-8 h-8" />
              </div>
              <h4 className="text-lg font-bold mb-2">Sabun pH Balance</h4>
              <p className="text-sm text-zinc-400">Aman untuk cat original maupun yang sudah di-coating.</p>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 bg-red-600/10 rounded-full flex items-center justify-center mb-4 text-red-600">
                <Clock className="w-8 h-8" />
              </div>
              <h4 className="text-lg font-bold mb-2">Ruang Tunggu VIP</h4>
              <p className="text-sm text-zinc-400">Nikmati kopi, Full AC, dan WiFi kencang sambil menunggu.</p>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 bg-red-600/10 rounded-full flex items-center justify-center mb-4 text-red-600">
                <ShieldCheck className="w-8 h-8" />
              </div>
              <h4 className="text-lg font-bold mb-2">Garansi Cuci Ulang</h4>
              <p className="text-sm text-zinc-400">Hujan dalam 1x24 jam? Bawa kembali, kami cuci eksterior gratis.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 3B. BAHAN & KEUNGGULAN (MATERIAL) */}
      <section className="py-24 bg-black border-b border-zinc-900">
        <div className="container mx-auto px-6">
          
          {/* Tambahan Judul Section Biar Keren */}
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Material <span className="text-red-600">Premium</span></h2>
            <p className="text-zinc-400">Kami hanya menggunakan produk perawatan terbaik untuk menjaga kilau dan keamanan cat mobil Anda.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-10 text-center">
            
            {/* Bahan 1: Sabun */}
            <div className="flex flex-col items-center group">
              <div className="w-40 h-40 mb-6 relative rounded-2xl bg-gradient-to-b from-zinc-900 to-black border border-zinc-800 p-5 shadow-lg group-hover:border-red-600/50 group-hover:shadow-[0_0_25px_rgba(220,38,38,0.15)] transition-all flex items-center justify-center">
                <img src="/image1.jpg" alt="Shampoo pH Balance" className="object-contain max-w-full max-h-full drop-shadow-xl group-hover:scale-110 transition-transform duration-300" />
              </div>
              <h4 className="text-lg font-bold mb-2">Shampoo pH Balance</h4>
              <p className="text-sm text-zinc-400">Busa melimpah yang aman untuk cat original dan tidak mengikis lapisan coating kendaraan.</p>
            </div>

            {/* Bahan 2: Lap Microfiber */}
            <div className="flex flex-col items-center group">
              <div className="w-40 h-40 mb-6 relative rounded-2xl bg-gradient-to-b from-zinc-900 to-black border border-zinc-800 p-5 shadow-lg group-hover:border-red-600/50 group-hover:shadow-[0_0_25px_rgba(220,38,38,0.15)] transition-all flex items-center justify-center">
                <img src="/image2.png" alt="Microfiber Premium" className="object-contain max-w-full max-h-full drop-shadow-xl group-hover:scale-110 transition-transform duration-300" />
              </div>
              <h4 className="text-lg font-bold mb-2">Microfiber 1200GSM</h4>
              <p className="text-sm text-zinc-400">Lap pengering super tebal dan halus, 100% meminimalisir risiko baret halus (swirl mark).</p>
            </div>

            {/* Bahan 3: Obat Jamur */}
            <div className="flex flex-col items-center group">
              <div className="w-40 h-40 mb-6 relative rounded-2xl bg-gradient-to-b from-zinc-900 to-black border border-zinc-800 p-5 shadow-lg group-hover:border-red-600/50 group-hover:shadow-[0_0_25px_rgba(220,38,38,0.15)] transition-all flex items-center justify-center">
                <img src="/image3.png" alt="Water Spot Remover" className="object-contain max-w-full max-h-full drop-shadow-xl group-hover:scale-110 transition-transform duration-300" />
              </div>
              <h4 className="text-lg font-bold mb-2">Glass & Body Scrub</h4>
              <p className="text-sm text-zinc-400">Cairan khusus pengangkat jamur membandel yang aman tanpa merusak pernis atau kaca.</p>
            </div>

            {/* Bahan 4: Coating */}
            <div className="flex flex-col items-center group">
              <div className="w-40 h-40 mb-6 relative rounded-2xl bg-gradient-to-b from-zinc-900 to-black border border-zinc-800 p-5 shadow-lg group-hover:border-red-600/50 group-hover:shadow-[0_0_25px_rgba(220,38,38,0.15)] transition-all flex items-center justify-center">
                <img src="/image4.png" alt="Nano Ceramic Fluid" className="object-contain max-w-full max-h-full drop-shadow-xl group-hover:scale-110 transition-transform duration-300" />
              </div>
              <h4 className="text-lg font-bold mb-2">Nano Ceramic 9H</h4>
              <p className="text-sm text-zinc-400">Cairan coating kristal murni untuk proteksi cat maksimal dan efek daun talas yang awet.</p>
            </div>

          </div>
        </div>
      </section>

      {/* 4. VISUAL PROOF (BEFORE - AFTER) */}
      <section className="py-24 bg-black" id="gallery">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Bukti <span className="text-red-600">Kualitas</span></h2>
            <p className="text-zinc-400">Geser untuk melihat transformasi hasil kerja tim profesional kami.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
             
             <div className="relative h-64 md:h-96 w-full rounded-xl shadow-2xl border border-zinc-800">
                <BeforeAfter beforeImg="/before1.png" afterImg="/after1.png" label="Premium Wash & Detailing"/>
             </div>
             
             
             <div className="relative h-64 md:h-96 w-full rounded-xl shadow-2xl border border-zinc-800">
                <BeforeAfter beforeImg="/before2.png" afterImg="/after2.png" label="Paint Correction & Coating"/>
             </div>
          </div>
        </div>
      </section>

{/* 4B. GALERI AUTO7 */}
      <section className="py-24 bg-zinc-950 border-t border-zinc-900" id="gallery">
        <div className="container mx-auto px-6">
          
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Galeri <span className="text-red-600">Auto7</span></h2>
            <p className="text-zinc-400">Koleksi hasil perawatan kendaraan terbaik dari studio kami.</p>
          </div>

          {/* Grid Layout buat 3 Foto (Berjejer ke samping) */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            
            {[1, 2, 3].map((item) => (
              <div 
                key={item} 
                className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden group border border-zinc-800 shadow-lg hover:border-red-600/50 hover:shadow-[0_0_30px_rgba(220,38,38,0.15)] transition-all"
              >
                {/* Efek overlay merah transparan pas di-hover */}
                <div className="absolute inset-0 bg-red-900/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10 pointer-events-none" />
                
                {/* Gambar Galeri */}
                <img 
                  src={`/gallery${item}.png`} 
                  alt={`Hasil Cucian Auto7 ${item}`} 
                  className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700 ease-in-out"
                />

                {/* Watermark Logo Auto7 di pojok kanan bawah */}
                <div className="absolute bottom-4 right-4 z-20 bg-black/80 backdrop-blur-md p-2 rounded-lg border border-zinc-700/50">
                  <img 
                    src="/auto7.png" 
                    alt="Logo Auto7" 
                    className="h-5 md:h-6 w-auto object-contain opacity-90"
                  />
                </div>
              </div>
            ))}

          </div>
        </div>
      </section>

      {/* 5. TESTIMONIALS */}
      <section className="py-24 bg-zinc-950" id="testimonials">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">Apa Kata <span className="text-red-600">Mereka?</span></h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { name: "Tifa", car: "Hyundai Creta", text: "Cucinya bersih bgt ya, dikerjain beberapa orang. keringin nya juga pake microfiber yg besar jg ga ada bekas2 goresan. wax nya teliti bgt by hand, dan di cek berulang kali. ruang tunggu nya juga nyaman, ada area indoor ac dan outdoor nya yg bikin amazed adalah asbak nya dipakein kopi bubuk. good job❤️" },
              { name: "Muhammad Arief Wisdyan", car: "Toyota Fortuner", text: "Pelayanan bagus, hasil memuaskan, dateng kesini setelah road trip mobil jadi kinclong lagi." },
              { name: "Refael Christian", car: "Hyundai Santa Fe", text: "Selalu bagus hasil coatingnya dan garansi lifetime." }
            ].map((review, i) => (
              <div key={i} className="bg-zinc-900 p-6 rounded-xl border border-zinc-800">
                <div className="flex gap-1 text-red-500 mb-4">
                  <Star fill="currentColor" className="w-4 h-4" />
                  <Star fill="currentColor" className="w-4 h-4" />
                  <Star fill="currentColor" className="w-4 h-4" />
                  <Star fill="currentColor" className="w-4 h-4" />
                  <Star fill="currentColor" className="w-4 h-4" />
                </div>
                <p className="text-zinc-300 mb-6 italic">"{review.text}"</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-zinc-800 rounded-full flex items-center justify-center font-bold text-red-500">
                    {review.name.charAt(0)}
                  </div>
                  <div>
                    <h5 className="font-bold text-sm">{review.name}</h5>
                    <p className="text-xs text-zinc-500">{review.car}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. LOCATION & FOOTER */}
      <footer className="bg-black border-t border-zinc-900 pt-16 pb-8" id="location">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-12">
            
            {/* Kiri: Maps */}
            <div className="rounded-xl overflow-hidden h-64 md:h-full bg-zinc-900 border border-zinc-800">
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3965.8380844299527!2d106.71323497499087!3d-6.285003993703905!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69fb840e56d5e9%3A0x4098b5069af26134!2sAuto7%20Carwash%20and%20The%20drive%20in%20detailing!5e0!3m2!1sen!2sid!4v1778597460864!5m2!1sen!2sid" 
                width="100%" 
                height="100%" 
                style={{ border: 0 }} 
                allowFullScreen={true} 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full h-full grayscale hover:grayscale-0 transition-all duration-500"
              ></iframe>
            </div>

            {/* Kanan: Info */}
            <div className="space-y-8">
              <div>
                <h3 className="text-2xl font-bold mb-4">Kunjungi Kami</h3>
                <div className="flex items-start gap-4 text-zinc-400 mb-4">
                  <MapPin className="w-6 h-6 text-red-600 flex-shrink-0" />
                  <p>Jl. Palem Indah No.1A, Pd. Pucung, Kec. Pd. Aren, Kota Tangerang Selatan, Banten 15229</p>
                </div>
                <div className="flex items-center gap-4 text-zinc-400 mb-4">
                  <Clock className="w-6 h-6 text-red-600 flex-shrink-0" />
                  <p>Buka Setiap Hari: 08.00 - 20.00 WIB</p>
                </div>
              </div>

              <div className="p-6 bg-zinc-900 rounded-xl border border-zinc-800">
                <h4 className="font-bold mb-2">Ada Pertanyaan?</h4>
                <p className="text-sm text-zinc-400 mb-4">Hubungi admin kami untuk konsultasi layanan atau reservasi manual.</p>
                <a 
                  href="https://wa.me/628119681212" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 w-full bg-[#25D366] hover:bg-[#20bd5a] text-white px-6 py-3 rounded-lg font-bold transition-colors"
                >
                  <Phone className="w-5 h-5" /> Chat WhatsApp
                </a>
              </div>
            </div>
          </div>

          <div className="text-center text-zinc-600 text-sm border-t border-zinc-900 pt-8">
            &copy; {new Date().getFullYear()} CV. Berkah Damai Jaya. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}