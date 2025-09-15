import { createClient } from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm";

// Konfigurasi Supabase
const supabaseUrl = "https://sxeveitjubrsntjhgakf.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InN4ZXZlaXRqdWJyc250amhnYWtmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTcwNTE2MjUsImV4cCI6MjA3MjYyNzYyNX0.lValEMgTOSSJ2JJ5jg3hRYIgwb1EVLRR_Idz0waZ0es";
const supabase = createClient(supabaseUrl, supabaseKey);

// Nomor WhatsApp tetap
const nomorWA = "6281477023649";

async function loadProduk() {
  try {
    const { data, error } = await supabase
      .from("produk")
      .select("*")
      .order("id", { ascending: true });

    if (error) throw error;
    if (!data || data.length === 0) {
      console.warn("Data produk kosong, fallback ke statis.");
      return;
    }

    // Ambil semua card statis
    const cards = document.querySelectorAll(".produk-card");

    data.forEach((item, index) => {
      if (cards[index]) {
        // Update gambar
        const img = cards[index].querySelector(".product-image img");
        if (img) {
          img.src = item.gambar;
          img.alt = item.judul;
        }

        // Update judul
        const title = cards[index].querySelector(".product-title");
        if (title) title.textContent = item.judul;

        // Update deskripsi
        const desc = cards[index].querySelector(".product-description");
        if (desc) desc.textContent = item.deskripsi;

        // Update harga & satuan
        const priceCurrent = cards[index].querySelector(".price-current");
        const priceUnit = cards[index].querySelector(".price-unit");
        if (priceCurrent) priceCurrent.textContent = item.harga;
        if (priceUnit) priceUnit.textContent = item.satuan || "/kg";

        // Update tombol WhatsApp
        const link = cards[index].querySelector(".product-cta");
        if (link) {
          const encodedMsg = encodeURIComponent(item.pesan_wa);
          link.href = `https://wa.me/${nomorWA}?text=${encodedMsg}`;
        }
      }
    });
  } catch (err) {
    console.error("Error load produk:", err.message);
  }
}

loadProduk();
