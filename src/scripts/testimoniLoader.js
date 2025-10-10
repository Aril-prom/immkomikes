import { createClient } from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm";

// === KONFIGURASI SUPABASE ===
const supabaseUrl = "https://foneddybfnwzngdqravs.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZvbmVkZHliZm53em5nZHFyYXZzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTg1OTYxNzgsImV4cCI6MjA3NDE3MjE3OH0.mxMz7ahuQp1F2CEQoQc--vXVwXAmThfKDLVsjseiXWs"; // anon key
const supabase = createClient(supabaseUrl, supabaseKey);

// === TESTIMONI LOADER ===
async function testimoniLoader() {
  try {
    const { data, error } = await supabase
      .from("testimoni")
      .select("*")
      .order("id", { ascending: true });

    if (error) throw error;
    if (!data || data.length === 0) {
      console.warn("Data testimoni kosong.");
      return;
    }

    const container = document.querySelector(".testimoni-container");
    container.innerHTML = "";

    data.forEach((item) => {
      const card = document.createElement("div");
      card.classList.add("testimoni-card");
      card.innerHTML = `
        <p class="testimoni-quote">“${item.komentar}”</p>
        <div class="testimoni-user">
          <img src="${item.foto || "images/default-user.png"}" alt="${
        item.nama
      }">
          <div class="testimoni-info">
            <h4>${item.nama}</h4>
            <span>${item.pekerjaan || "Pelanggan"}</span>
          </div>
        </div>
      `;
      container.appendChild(card);
    });
  } catch (err) {
    console.error("Error load testimoni:", err.message);
  }
}

testimoniLoader();
