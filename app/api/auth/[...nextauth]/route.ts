import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { createClient } from "@supabase/supabase-js";

// Kita pake SERVICE_ROLE_KEY di server-side biar bisa nembus RLS dan masukin data user baru
const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  callbacks: {
    // Fungsi ini jalan pas user berhasil milih email Google
    async signIn({ user }) {
      if (!user.email) return false;

      try {
        // Cek apakah user udah ada di tabel users Supabase
        const { data: existingUser } = await supabaseAdmin
          .from('users')
          .select('id')
          .eq('email', user.email)
          .single();

        // Kalau belum ada, daftarin sebagai customer baru
        if (!existingUser) {
          await supabaseAdmin.from('users').insert({
            name: user.name,
            email: user.email,
            image: user.image,
            role: 'customer' // Default role
          });
        }
        return true;
      } catch (error) {
        console.error("Error saving user to Supabase:", error);
        return false;
      }
    },
    // Fungsi ini jalan buat ngasih "KTP Digital" ke aplikasi kita
    async session({ session }) {
      if (session.user?.email) {
        const { data: dbUser } = await supabaseAdmin
          .from('users')
          .select('id, role')
          .eq('email', session.user.email)
          .single();

        if (dbUser) {
          // Suntik ID dan Role dari database ke dalam session Next.js
          (session.user as any).id = dbUser.id;
          (session.user as any).role = dbUser.role;
        }
      }
      return session;
    }
  }
});

export { handler as GET, handler as POST };