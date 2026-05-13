import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Auto7 Carwash & Detailing | Perawatan Mobil Premium",
  description: "Perawatan otomotif premium. Melayani cuci mobil detailing, interior cleaning, paint correction, hingga nano ceramic coating dengan SOP ketat dan tim profesional.",
  icons: {
    icon: '/auto7.png', // Ini otomatis bikin logo Auto7 lu jadi favicon di tab browser!
  },
  openGraph: {
    title: "Auto7 Carwash & Detailing",
    description: "Your Car's Cleanest Secret. Melayani cuci mobil detailing, interior cleaning, paint correction, hingga nano ceramic coating dengan SOP ketat dan tim profesional.",
    url: "https://auto7carwash.vercel.app", // Nanti ganti sama domain asli lu bro
    siteName: "Auto7 Carwash",
    images: [
      {
        url: "/ogimage.jpeg", // Gambar yang muncul pas web lu di-share di WA / IG
        width: 1200,
        height: 630,
        alt: "Auto7 Carwash & Detailing",
      },
    ],
    locale: "id_ID",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
