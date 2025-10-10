// Jangan pakai "import", karena kita pakai CDN

const supabaseUrl = "https://foneddybfnwzngdqravs.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZvbmVkZHliZm53em5nZHFyYXZzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTg1OTYxNzgsImV4cCI6MjA3NDE3MjE3OH0.mxMz7ahuQp1F2CEQoQc--vXVwXAmThfKDLVsjseiXWs";


const supabaseClient = supabase.createClient(supabaseUrl, supabaseKey);

// Lalu di seluruh kode, ganti "supabase" → "supabaseClient"

async function loadStrukturOrganisasi() {
  const container = document.getElementById("struktur-container");

  try {
    const { data, error } = await supabaseClient  // ← GUNAKAN supabaseClient
      .from("struktur_organisasi")
      .select("*")
      .order("urutan", { ascending: true });

    if (error) throw error;

    if (!data || data.length === 0) {
      container.innerHTML = `<div class="text-center">Belum ada data struktur organisasi.</div>`;
      return;
    }

    container.innerHTML = "";

    data.forEach((person) => {
      const card = document.createElement("div");
      card.className = "struktur-card";

      const fotoUrl = person.foto_url || "https://via.placeholder.com/150?text=No+Image";

      card.innerHTML = `
        <img src="${fotoUrl}" alt="${person.jabatan} - ${person.nama}" class="struktur-foto" onerror="this.src='https://via.placeholder.com/150?text=No+Image'">
        <h3 class="struktur-nama">${person.nama}</h3>
        <p class="struktur-jabatan">${person.jabatan}</p>
      `;

      container.appendChild(card);
    });

  } catch (err) {
    console.error("Error load struktur organisasi:", err.message);
    container.innerHTML = `<div class="text-center text-danger">Gagal memuat data struktur organisasi.</div>`;
  }
}

document.addEventListener("DOMContentLoaded", loadStrukturOrganisasi);