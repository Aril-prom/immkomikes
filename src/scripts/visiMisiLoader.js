

const supabaseUrl = "https://sxeveitjubrsntjhgakf.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InN4ZXZlaXRqdWJyc250amhnYWtmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTcwNTE2MjUsImV4cCI6MjA3MjYyNzYyNX0.lValEMgTOSSJ2JJ5jg3hRYIgwb1EVLRR_Idz0waZ0es";
const supabase = createClient(supabaseUrl, supabaseKey);

async function loadVisiMisi() {
  try {
    const { data, error } = await supabase
      .from("visi_misi")
      .select("*")
      .limit(1);

    if (error) throw error;

    if (!data || data.length === 0) {
      document.querySelector("#visi-text").textContent = "Data visi belum tersedia";
      document.querySelector("#misi-list").innerHTML = "<li>Data misi belum tersedia</li>";
      return;
    }

    const visiMisi = data[0];

    document.querySelector("#visi-text").textContent = visiMisi.visi;

    const misiList = document.querySelector("#misi-list");
    misiList.innerHTML = "";

    for (let i = 1; i <= 5; i++) {
      const misi = visiMisi[`misi_${i}`];
      if (misi) {
        const li = document.createElement("li");
        li.textContent = misi;
        misiList.appendChild(li);
      }
    }
  } catch (err) {
    console.error("Error load visi misi:", err.message);
  }
}

// Jalankan setelah DOM siap
document.addEventListener("DOMContentLoaded", loadVisiMisi);