"use client";

import { SessionProvider } from "next-auth/react";
import { useEffect } from "react";

export default function AuthProvider({ children }: { children: React.ReactNode }) {
  
  // FIX: Mengatasi stuck 'loading' kalau user pencet tombol 'Back' batal login
  useEffect(() => {
    const handlePageShow = (event: PageTransitionEvent) => {
      // event.persisted nilainya 'true' kalau halaman ditarik dari memori beku browser (Bfcache)
      if (event.persisted) {
        window.location.reload(); // Paksa refresh biar status NextAuth keriset
      }
    };

    window.addEventListener('pageshow', handlePageShow);
    return () => window.removeEventListener('pageshow', handlePageShow);
  }, []);

  return <SessionProvider>{children}</SessionProvider>;
}