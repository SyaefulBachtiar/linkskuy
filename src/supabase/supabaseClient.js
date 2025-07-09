// supabaseClient.js
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL; // Pastikan ini ada di .env Anda
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY; // Pastikan ini ada di .env Anda

if (!supabaseUrl || !supabaseAnonKey) {
  console.error(
    "Supabase URL atau Anon Key tidak ditemukan di variabel lingkungan. Pastikan file .env Anda sudah diatur dengan VITE_SUPABASE_URL dan VITE_SUPABASE_ANON_KEY."
  );
  // throw new Error("Supabase credentials are missing."); // Bisa diaktifkan untuk debugging
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
