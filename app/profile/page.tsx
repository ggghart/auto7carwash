import React from 'react';
import Image from 'next/image';
import { Shield, Target, Award, CheckCircle2 } from 'lucide-react';
import Navbar from '../../components/navbar'; 

export default function ProfilePage() {
  return (
    <div className="bg-zinc-950 text-zinc-50 min-h-screen font-sans">
      
      {/* Panggil Navbar */}
      <Navbar />

      {/* 1. HERO SECTION */}
      <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 flex items-center justify-center overflow-hidden border-b border-zinc-900">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-b from-black/90 via-zinc-950/90 to-zinc-950 z-10" />
          {/* Opsional: Kalau punya foto bengkel, ganti src-nya */}
          <img 
            src="/gallery1.jpg" 
            alt="Auto7 Studio" 
            className="w-full h-full object-cover opacity-30 grayscale"
          />
        </div>

        <div className="container mx-auto px-6 relative z-20 text-center">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">
            Mendefinisikan Ulang <br/> <span className="text-red-600">Standar Perawatan</span> Kendaraan.
          </h1>
          <p className="text-lg text-zinc-400 max-w-2xl mx-auto">
            Auto7 bukan sekedar tempat cuci mobil. Kami adalah studio perawatan otomotif yang berdedikasi untuk menjaga dan mengembalikan kilau kendaraan Anda.
          </p>
        </div>
      </section>

      {/* 2. OUR STORY */}
      <section className="py-24 bg-zinc-950">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <div className="relative aspect-square md:aspect-[4/5] rounded-2xl overflow-hidden border border-zinc-800 shadow-[0_0_30px_rgba(220,38,38,0.1)]">
              <Image 
                src="/gallery2.jpg" 
                alt="Proses Detailing Auto7" 
                fill 
                className="object-cover"
              />
              <div className="absolute inset-0 border-[4px] border-zinc-950 rounded-2xl z-10 pointer-events-none"></div>
            </div>
            
            <div>
              <div className="inline-block bg-red-600/10 text-red-500 px-4 py-1.5 rounded-full text-sm font-bold tracking-wider mb-6">
                CERITA KAMI
              </div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6 leading-tight">Lahir dari <span className="text-red-600">Passion</span> Terhadap Kesempurnaan.</h2>
              <p className="text-zinc-400 mb-6 leading-relaxed">
                Berawal dari keresahan terhadap praktik cuci mobil konvensional yang sering kali meninggalkan baret halus (swirl marks) dan menggunakan bahan kimia keras, Auto7 didirikan dengan satu tujuan pasti: memberikan perawatan paling aman dan detail untuk setiap kendaraan.
              </p>
              <p className="text-zinc-400 mb-8 leading-relaxed">
                Kami mengkombinasikan air murni terfilterisasi, bahan-bahan premium bersertifikat, dan Standard Operating Procedure (SOP) yang ketat. Bagi kami, setiap mobil yang masuk ke studio Auto7 adalah kanvas yang harus diperlakukan dengan penuh ketelitian.
              </p>
              
              <div className="grid grid-cols-2 gap-6 border-t border-zinc-900 pt-8">
                <div>
                  <h4 className="text-3xl font-bold text-white mb-2">100%</h4>
                  <p className="text-sm text-zinc-500">Air Terfilterisasi</p>
                </div>
                <div>
                  <h4 className="text-3xl font-bold text-white mb-2">5+</h4>
                  <p className="text-sm text-zinc-500">Tahun Pengalaman Tim</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. CORE VALUES */}
      <section className="py-24 bg-black border-y border-zinc-900">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Visi Misi <span className="text-red-600">Auto7</span></h2>
            <p className="text-zinc-400">Pilar utama yang membuat layanan kami berbeda.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            <div className="bg-zinc-900/50 p-8 rounded-2xl border border-zinc-800 hover:border-red-600/50 transition-colors">
              <Target className="w-12 h-12 text-red-600 mb-6" />
              <h3 className="text-xl font-bold mb-3">Detail-Oriented</h3>
              <p className="text-zinc-400 text-sm leading-relaxed">Kami tidak mentolerir kotoran sekecil apapun. Setiap sudut, sela-sela, dan lekukan kendaraan Anda akan dibersihkan dengan ketelitian tingkat tinggi.</p>
            </div>
            <div className="bg-zinc-900/50 p-8 rounded-2xl border border-zinc-800 hover:border-red-600/50 transition-colors">
              <Shield className="w-12 h-12 text-red-600 mb-6" />
              <h3 className="text-xl font-bold mb-3">Zero Damage Policy</h3>
              <p className="text-zinc-400 text-sm leading-relaxed">Keamanan cat adalah prioritas. Kami menggunakan teknik 2-bucket method dan microfiber khusus untuk memastikan tidak ada baret baru yang muncul.</p>
            </div>
            <div className="bg-zinc-900/50 p-8 rounded-2xl border border-zinc-800 hover:border-red-600/50 transition-colors">
              <Award className="w-12 h-12 text-red-600 mb-6" />
              <h3 className="text-xl font-bold mb-3">Premium Quality</h3>
              <p className="text-zinc-400 text-sm leading-relaxed">Mulai dari shampoo hingga nano ceramic, kami hanya mengaplikasikan produk-produk dari *brand* otomotif kelas dunia.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. MILESTONES & STATS */}
      <section className="py-20 bg-gradient-to-r from-zinc-950 via-zinc-900 to-zinc-950 border-y border-zinc-800">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <h4 className="text-4xl md:text-5xl font-bold text-red-600 mb-2">1,000+</h4>
              <p className="text-zinc-400 font-medium">Mobil Terawat</p>
            </div>
            <div>
              <h4 className="text-4xl md:text-5xl font-bold text-red-600 mb-2">150+</h4>
              <p className="text-zinc-400 font-medium">Nano Coating</p>
            </div>
            <div>
              <h4 className="text-4xl md:text-5xl font-bold text-red-600 mb-2">4.9/5</h4>
              <p className="text-zinc-400 font-medium">Rating Kepuasan</p>
            </div>
            <div>
              <h4 className="text-4xl md:text-5xl font-bold text-red-600 mb-2">3</h4>
              <p className="text-zinc-400 font-medium">Certified Detailers</p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. MEET THE EXPERTS (TIM KAMI) */}
      <section className="py-24 bg-zinc-950">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Di Balik <span className="text-red-600">Kilau Auto7</span></h2>
            <p className="text-zinc-400 max-w-2xl mx-auto">Kendaraan Anda ditangani langsung oleh para profesional tersertifikasi yang berdedikasi tinggi terhadap seni perawatan otomotif.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            
            {/* Anggota Tim 1 */}
            <div className="group">
              <div className="relative aspect-[3/4] rounded-2xl overflow-hidden mb-6 border border-zinc-800 shadow-lg group-hover:border-red-600/50 transition-colors">
                <Image 
                  src="/team1.jpg" 
                  alt="Budi - Head Detailer" 
                  fill 
                  className="object-cover group-hover:scale-105 transition-transform duration-500 ease-out" 
                />
                {/* Efek gradasi hitam di bawah biar teks kebaca */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent pointer-events-none"></div>
                <div className="absolute bottom-4 left-4 z-10">
                  <div className="bg-red-600 text-white text-xs font-bold px-3 py-1 rounded-md mb-2 inline-block">
                    Head Detailer
                  </div>
                </div>
              </div>
              <h3 className="text-2xl font-bold mb-2">Budi Santoso</h3>
              <p className="text-zinc-400 text-sm leading-relaxed">Certified Auto Detailer dengan pengalaman lebih dari 5 tahun. Spesialis dalam *paint correction* dan aplikasi *nano ceramic* presisi tinggi.</p>
            </div>

            {/* Anggota Tim 2 */}
            <div className="group">
              <div className="relative aspect-[3/4] rounded-2xl overflow-hidden mb-6 border border-zinc-800 shadow-lg group-hover:border-red-600/50 transition-colors">
                <Image 
                  src="/team2.jpg" 
                  alt="Andi - Quality Control" 
                  fill 
                  className="object-cover group-hover:scale-105 transition-transform duration-500 ease-out" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent pointer-events-none"></div>
                <div className="absolute bottom-4 left-4 z-10">
                  <div className="bg-zinc-800 text-white border border-zinc-600 text-xs font-bold px-3 py-1 rounded-md mb-2 inline-block">
                    Quality Control
                  </div>
                </div>
              </div>
              <h3 className="text-2xl font-bold mb-2">Andi Pratama</h3>
              <p className="text-zinc-400 text-sm leading-relaxed">Mata elang di Auto7. Memastikan tidak ada satu titik noda atau debu pun yang terlewat sebelum mobil diserahkan kembali ke tangan Anda.</p>
            </div>

            {/* Anggota Tim 3 */}
            <div className="group">
              <div className="relative aspect-[3/4] rounded-2xl overflow-hidden mb-6 border border-zinc-800 shadow-lg group-hover:border-red-600/50 transition-colors">
                <Image 
                  src="/team3.jpg" 
                  alt="Reza - Interior Specialist" 
                  fill 
                  className="object-cover group-hover:scale-105 transition-transform duration-500 ease-out" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent pointer-events-none"></div>
                <div className="absolute bottom-4 left-4 z-10">
                  <div className="bg-zinc-800 text-white border border-zinc-600 text-xs font-bold px-3 py-1 rounded-md mb-2 inline-block">
                    Interior Specialist
                  </div>
                </div>
              </div>
              <h3 className="text-2xl font-bold mb-2">Reza Rahadian</h3>
              <p className="text-zinc-400 text-sm leading-relaxed">Ahli restorasi material kulit dan fabric. Membuat kabin mobil Anda kembali wangi, bersih, dan nyaman layaknya mobil baru.</p>
            </div>

          </div>
        </div>
      </section>

      {/* FOOTER SIMPLE */}
      <footer className="bg-zinc-950 py-8 border-t border-zinc-900 text-center text-zinc-600 text-sm">
        &copy; {new Date().getFullYear()} Auto7 Carwash & Detailing. All rights reserved.
      </footer>
    </div>
  );
}