const { createClient } = supabase;

const supabaseUrl = "https://sxeveitjubrsntjhgakf.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InN4ZXZlaXRqdWJyc250amhnYWtmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTcwNTE2MjUsImV4cCI6MjA3MjYyNzYyNX0.lValEMgTOSSJ2JJ5jg3hRYIgwb1EVLRR_Idz0waZ0es"; // jangan pakai service_role
const supabaseClient = createClient(supabaseUrl, supabaseKey);

async function loadVisiMisi() {
  const visiEl = document.querySelector("#visi-text");
  const misiList = document.querySelector("#misi-list");
  const visiMisiSection = document.querySelector(".visi-misi_section");

  try {
    const { data, error } = await supabaseClient
      .from("visi_misi")
      .select("*")
      .single();

    console.log("Supabase data:", data);
    console.log("Supabase error:", error);

    if (error) throw error;

    // Jika is_active false, sembunyikan seluruh section
    if (!data.is_active) {
      visiMisiSection.style.display = "none";
      console.log("Visi & Misi section dinonaktifkan via Supabase.");
      return;
    }

    // Jika aktif, isi konten
    visiEl.textContent = data.visi || "Data visi belum tersedia";

    misiList.innerHTML = "";
    for (let i = 1; i <= 5; i++) {
      const misi = data[`misi_${i}`];
      if (misi) {
        const li = document.createElement("li");
        li.textContent = misi;
        misiList.appendChild(li);
      }
    }

    // Pastikan section tetap terlihat (jika sebelumnya disembunyikan oleh CSS)
    visiMisiSection.style.display = "block";

  } catch (err) {
    console.error("Error load visi misi:", err.message);
    visiEl.textContent = "Gagal memuat data visi.";
    misiList.innerHTML = "<li>Gagal memuat data misi.</li>";

    // Tetap tampilkan section meskipun error (opsional: bisa juga disembunyikan)
    visiMisiSection.style.display = "block";
  }
}

document.addEventListener("DOMContentLoaded", loadVisiMisi);