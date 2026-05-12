'use client';

import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react'; // Hapus 'Car' dari sini karena udah ga dipake
import Image from 'next/image'; // Tambahin baris ini

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Efek buat ganti background navbar pas di-scroll
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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
          <a href="/profile" className="hover:text-red-500 transition-colors">Profile</a> {/* <-- Tambahin Ini */}
          <a href="/#services" className="hover:text-red-500 transition-colors">Layanan</a>
          <a href="/#benefits" className="hover:text-red-500 transition-colors">Keunggulan</a>
          <a href="/#gallery" className="hover:text-red-500 transition-colors">Galeri</a>
          <a href="/#testimonials" className="hover:text-red-500 transition-colors">Testimoni</a>
          <a href="/#location" className="hover:text-red-500 transition-colors">Lokasi</a>
        </div>

        {/* 3. ACTION BUTTONS (DESKTOP) */}
        <div className="hidden md:flex items-center gap-4">
          <button className="text-sm font-medium text-zinc-300 hover:text-white transition-colors">
            Cek Antrean
          </button>
          <button className="bg-red-600 hover:bg-red-700 text-white px-5 py-2 rounded-full text-sm font-bold transition-all shadow-[0_0_15px_rgba(220,38,38,0.3)]">
            Booking
          </button>
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
          <a href="#services" className="text-zinc-300 hover:text-red-500">Layanan</a>
          <a href="#benefits" className="text-zinc-300 hover:text-red-500">Keunggulan</a>
          <a href="#gallery" className="text-zinc-300 hover:text-red-500">Galeri</a>
          <a href="#testimonials" className="text-zinc-300 hover:text-red-500">Testimoni</a>
          <a href="/profile" className="text-zinc-300 hover:text-red-500">Profile</a>
          <hr className="border-zinc-800" />
          <button className="text-left text-zinc-300">Cek Antrean</button>
          <button className="bg-red-600 text-white w-full py-3 rounded-lg font-bold">Booking Sekarang</button>
        </div>
      )}
    </nav>
  );
}