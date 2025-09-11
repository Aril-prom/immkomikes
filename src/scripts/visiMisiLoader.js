const { createClient } = supabase;

const supabaseUrl = "https://sxeveitjubrsntjhgakf.supabase.co";
const supabaseKey =
  " eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InN4ZXZlaXRqdWJyc250amhnYWtmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTcwNTE2MjUsImV4cCI6MjA3MjYyNzYyNX0.lValEMgTOSSJ2JJ5jg3hRYIgwb1EVLRR_Idz0waZ0es"; // jangan pakai service_role
const supabaseClient = createClient(supabaseUrl, supabaseKey);

async function loadVisiMisi() {
  const visiEl = document.querySelector("#visi-text");
  const misiList = document.querySelector("#misi-list");

  try {
    const { data, error } = await supabaseClient
      .from("visi_misi")
      .select("*")
      .single();

    console.log("Supabase data:", data);
    console.log("Supabase error:", error);

    if (error) throw error;

    // isi visi
    visiEl.textContent = data.visi || "Data visi belum tersedia";

    // isi misi
    misiList.innerHTML = "";
    for (let i = 1; i <= 5; i++) {
      const misi = data[`misi_${i}`];
      if (misi) {
        const li = document.createElement("li");
        li.textContent = misi;
        misiList.appendChild(li);
      }
    }
  } catch (err) {
    console.error("Error load visi misi:", err.message);
    visiEl.textContent = "Gagal memuat data visi.";
    misiList.innerHTML = "<li>Gagal memuat data misi.</li>";
  }
}

document.addEventListener("DOMContentLoaded", loadVisiMisi);
