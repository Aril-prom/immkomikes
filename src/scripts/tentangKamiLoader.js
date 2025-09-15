
import { supabase } from "./supabase.js";

async function loadTentangKami() {
  const { data, error } = await supabase
    .from("tentang_kami")
    .select("*")
    .single();

  const container = document.getElementById("tentangKamiContent");
  const imgEl = document.querySelector(".foto-organisasi");

  if (error || !data) {
    console.error(error);
    container.innerHTML = "<p>Konten sedang tidak tersedia.</p>";
    return;
  }
 


  // ====== Deskripsi ======
  const paragraphs = (data.deskripsi || "").split(/\n\s*\n/);
  container.innerHTML = "";
  paragraphs.forEach((p) => {
    const el = document.createElement("p");
    el.textContent = p.trim();
    container.appendChild(el);
  });

  // ====== Foto dari Supabase ======
  if (data.foto_url) {
    imgEl.src = data.foto_url;
    imgEl.alt = "Foto organisasi Minaperkasa";
  }
}

document.addEventListener("DOMContentLoaded", loadTentangKami);
