// tentangKamiLoader.js
import { supabase } from "./supabase.js";

async function loadTentangKami() {
  const { data, error } = await supabase
    .from("tentang_kami")
    .select("*")
    .maybeSingle();

  const container = document.getElementById("tentangKamiContent");
  const imgEl = document.querySelector(".foto-organisasi");

  if (!container) {
    console.error("Element #tentangKamiContent tidak ditemukan di HTML");
    return;
  }

  if (error || !data) {
    console.error(error);
    container.innerHTML = "<p>Konten sedang tidak tersedia.</p>";
    return;
  }

  // ====== Deskripsi (paragraf baru jika ada enter 1x atau 2x) ======
const paragraphs = (data.deskripsi || "").split(/\r?\n+/);
container.innerHTML = "";
paragraphs.forEach((p) => {
  if (p.trim()) {
    const el = document.createElement("p");
    el.textContent = p.trim();
    el.style.textAlign = "justify";   // 👈 rata kiri-kanan
    el.style.marginBottom = "1em";    // jarak antar paragraf
    el.style.lineHeight = "1.6";      // biar lebih enak dibaca
    container.appendChild(el);
  }
});



  // ====== Foto ======
  if (imgEl && data.foto_url) {
    imgEl.src = data.foto_url;
    imgEl.alt = data.judul || "Foto organisasi";
  }
}

document.addEventListener("DOMContentLoaded", loadTentangKami);
