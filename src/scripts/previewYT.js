import { supabase } from "./supabase.js";

// 🖼️ URL GAMBAR DEFAULT (gunakan dari Supabase Storage)
const DEFAULT_THUMBNAIL_URL =
  "https://sxeveitjubrsntjhgakf.supabase.co/storage/v1/object/public/vidio/default-thumbnail.png";

// Fungsi load video
async function loadVideoPreview() {
  const container = document.getElementById("videoPreview");
  container.innerHTML = `<div class="loader">Memuat video...</div>`;

  const { data, error } = await supabase.from("video").select("*");

  if (error) {
    console.error("Error Supabase:", error);
    container.innerHTML = "<p style='color:red;'>❌ Gagal memuat data.</p>";
    return;
  }

  if (!data || data.length === 0) {
    container.innerHTML = "<p style='color:#666;'>Belum ada video tersedia.</p>";
    return;
  }

  container.innerHTML = "";

  data.forEach((video) => {
    const videoUrl = video.link_video?.trim() || "";

    // ✅ Thumbnail prioritas:
    // 1. Jika ada kolom `thumbnail_url` di database, pakai itu
    // 2. Jika tidak, fallback ke DEFAULT_THUMBNAIL_URL
    const thumbnailUrl = video.thumbnail_url || DEFAULT_THUMBNAIL_URL;

    const card = document.createElement("a");
    card.href = videoUrl;
    card.target = "_blank";
    card.rel = "noopener noreferrer";
    card.className = "video-card";

    card.innerHTML = `
      <img 
        class="video-thumb" 
        src="${thumbnailUrl}" 
        alt="Thumbnail ${video.judul || "Video"}"
        loading="lazy"
        onerror="this.src='${DEFAULT_THUMBNAIL_URL}'; this.onerror=null;"
      />
      <div class="video-info">
        <h3 class="video-title">${video.judul || "Judul Tidak Diketahui"}</h3>
        <p class="video-meta">Klik untuk melihat di Instagram</p>
      </div>
    `;

    container.appendChild(card);
  });
}

document.addEventListener("DOMContentLoaded", loadVideoPreview);
