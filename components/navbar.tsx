'use client';

import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react'; 
import Image from 'next/image'; 
import { supabase } from '../lib/supabase';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  // State khusus buat Supabase Auth
  const [user, setUser] = useState<any>(null);
  const [isLoadingSafe, setIsLoadingSafe] = useState(true);

  useEffect(() => {
    // 1. Efek buat ganti background navbar pas di-scroll
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);

    // 2. Pantau status login dari Supabase
    const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
      setUser(session?.user || null);
      setIsLoadingSafe(false);
    });

    // 3. Fix loading stuck kalau user klik back di browser
    const handlePageShow = (event: PageTransitionEvent) => {
      if (event.persisted) {
        setIsLoadingSafe(false);
      }
    };
    window.addEventListener('pageshow', handlePageShow);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('pageshow', handlePageShow);
      authListener.subscription.unsubscribe();
    };
  }, []);

  // Fungsi Login Supabase
  const handleLogin = async () => {
    try {
      setIsLoadingSafe(true);
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: { redirectTo: window.location.origin }
      });
      
      if (error) {
        console.error("Login error:", error);
        setIsLoadingSafe(false);
      }
    } catch (error) {
      console.error("Login exception:", error);
      setIsLoadingSafe(false);
    }
  };

  // Fungsi handleLogout udah dihapus dari sini karena kita pindahin penuh ke halaman Dashboard

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${
      isScrolled ? 'bg-zinc-950/80 backdrop-blur-md border-b border-zinc-800 py-3' : 'bg-transparent py-5'
    }`}>
      <div className="container mx-auto px-6 flex justify-between items-center">
        
        {/* 1. BRAND LOGO */}
        <a href="/" className="flex items-center cursor-pointer">
          <Image 
            src="/auto7.png" 
            alt="Auto7 Carwash Logo" 
            width={120} 
            height={40} 
            className="object-contain"
            priority 
          />
        </a>

       {/* 2. DESKTOP MENU */}
        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-zinc-300">
          <a href="/#services" className="hover:text-red-500 transition-colors">Layanan</a>
          <a href="/#benefits" className="hover:text-red-500 transition-colors">Keunggulan</a>
          <a href="/#gallery" className="hover:text-red-500 transition-colors">Galeri</a>
          <a href="/#testimonials" className="hover:text-red-500 transition-colors">Testimoni</a>
          <a href="/#location" className="hover:text-red-500 transition-colors">Lokasi</a>
          <a href="/profile" className="hover:text-red-500 transition-colors">Profile</a>
        </div>

        {/* 3. ACTION BUTTONS (DESKTOP) */}
        <div className="hidden md:flex items-center gap-4">
          
          <a href="/booking" className="bg-red-600 hover:bg-red-700 text-white px-5 py-2 rounded-full text-sm font-bold transition-all shadow-[0_0_15px_rgba(220,38,38,0.3)]">
            Booking
          </a>

          {/* LOGIKA OTENTIKASI SUPABASE */}
          {isLoadingSafe ? (
            <div className="w-9 h-9 rounded-full border-2 border-zinc-800 border-t-red-600 animate-spin"></div>
          ) : user ? (
            // --- DESKTOP: TOMBOL PROFIL PILL (FOTO + NAMA DEPAN) ---
            <a 
              href="/dashboard" 
              title="Masuk ke Dashboard"
              className="flex items-center gap-3 bg-zinc-900 border border-zinc-800 hover:border-red-500 rounded-full pl-1.5 pr-4 py-1.5 transition-all group"
            >
              <img 
                src={user.user_metadata?.avatar_url || ''} 
                alt="Profile" 
                className="w-7 h-7 rounded-full"
              />
              <span className="text-sm font-medium text-zinc-300 group-hover:text-red-500 transition-colors">
                {/* Kita split namanya buat ngambil nama depan aja biar navbar nggak kepanjangan */}
                {user.user_metadata?.full_name?.split(' ')[0] || 'User'}
              </span>
            </a>
          ) : (
            <button 
              onClick={handleLogin} 
              className="text-sm font-bold bg-white text-black hover:bg-zinc-200 px-5 py-2 rounded-full transition-all"
            >
              Login
            </button>
          )}

        </div>

        {/* MOBILE MENU TOGGLE */}
        <button 
          className="md:hidden text-white"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>

      </div>

      {/* MOBILE DROPDOWN MENU */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-zinc-950 border-b border-zinc-800 py-4 px-6 flex flex-col gap-4 shadow-xl">
          <a href="/#services" className="text-zinc-300 hover:text-red-500">Layanan</a>
          <a href="/#benefits" className="text-zinc-300 hover:text-red-500">Keunggulan</a>
          <a href="/#gallery" className="text-zinc-300 hover:text-red-500">Galeri</a>
          <a href="/#testimonials" className="text-zinc-300 hover:text-red-500">Testimoni</a>
          <a href="/#location" className="text-zinc-300 hover:text-red-500">Lokasi</a>
          <a href="/profile" className="text-zinc-300 hover:text-red-500">Profile</a>
          
          <hr className="border-zinc-800" />
          
          <a href="/booking" className="bg-red-600 text-center text-white w-full py-3 rounded-lg font-bold">Booking Sekarang</a>

          {/* MOBILE AUTH SECTION */}
          <div className="pt-2">
            {isLoadingSafe ? (
               <div className="text-zinc-500 text-sm text-center">Memuat profil...</div>
            ) : user ? (
              // --- MOBILE: TOMBOL LEBAR FOTO + NAMA DEPAN ---
              <a 
                href="/dashboard" 
                className="flex items-center justify-center gap-3 bg-zinc-900 border border-zinc-800 hover:border-red-500 p-3 rounded-xl transition-all group"
              >
                <img 
                  src={user.user_metadata?.avatar_url || ''} 
                  alt="Profile" 
                  className="w-8 h-8 rounded-full" 
                />
                <span className="text-sm font-medium text-zinc-300 group-hover:text-red-500 transition-colors">
                  Dashboard {user.user_metadata?.full_name?.split(' ')[0]}
                </span>
              </a>
            ) : (
              <button onClick={handleLogin} className="w-full border border-zinc-700 hover:bg-zinc-800 text-white px-4 py-3 rounded-lg text-sm font-bold transition-all">
                Login dengan Google
              </button>
            )}
          </div>

        </div>
      )}
    </nav>
  );
}