// previewYT.js — Versi Final dengan Fallback Gambar Default dari Supabase

import { supabase } from "./supabase.js";

// 🖼️ URL GAMBAR DEFAULT — GANTI DENGAN URL YANG SUDAH DIUPLOAD KE SUPABASE STORAGE
const DEFAULT_THUMBNAIL_URL = "https://sxeveitjubrsntjhgakf.supabase.co/storage/v1/object/sign/vidio/Screenshot%202025-09-14%20084106.png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV9iYzAyYThhYi0yYmZlLTRhMmEtOWZiOS02Yzc5YjI1MDVjYmMiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJ2aWRpby9TY3JlZW5zaG90IDIwMjUtMDktMTQgMDg0MTA2LnBuZyIsImlhdCI6MTc1NzgxNTYzMiwiZXhwIjoxNzg5MzUxNjMyfQ.2dYwkVujOgwZF5kIdwRlzqbyTQjKD66cHloA0UjK1ZU";

// Fungsi ekstrak video ID dari berbagai format YouTube
function extractYouTubeId(url) {
  const regExp = /^.*(youtu\.be\/|v\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
  const match = url.match(regExp);
  return (match && match[2].length === 11) ? match[2] : null;
}

async function loadVideoPreview() {
  const container = document.getElementById("videoPreview");
  container.innerHTML = `<div class="loader">Memuat video...</div>`; // Tampilkan loader

  const { data, error } = await supabase.from("video").select("*");

  if (error) {
    console.error("Error dari Supabase:", error);
    container.innerHTML = "<p style='color: red;'>❌ Gagal memuat data.</p>";
    return;
  }

  if (!data || data.length === 0) {
    container.innerHTML = "<p style='color: #666;'>Belum ada video yang tersedia.</p>";
    return;
  }


  container.innerHTML = ""; // Kosongkan sebelum render

  data.forEach((video) => {
    const videoUrl = video.link_video?.trim() || "";
    const videoId = extractYouTubeId(videoUrl);

    let thumbnailUrl = "";

    // ✅ Prioritas 1: Jika link valid, ambil thumbnail YouTube
    if (videoId) {
      thumbnailUrl = `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
    }
    // ✅ Prioritas 2: Jika tidak ada link atau ID tidak valid, gunakan gambar default
    else {
      thumbnailUrl = DEFAULT_THUMBNAIL_URL;
    }

    const card = document.createElement("a");
    card.href = videoUrl;
    card.target = "_blank";
    card.rel = "noopener noreferrer";
    card.className = "video-card";

    card.innerHTML = `
      <img 
        class="video-thumb" 
        src="${thumbnailUrl}" 
        alt="Thumbnail ${video.judul || 'Video Tanpa Judul'}" 
        loading="lazy"
        onerror="this.src='${DEFAULT_THUMBNAIL_URL}'; this.onerror=null;"
      />
      <div class="video-info">
        <h3 class="video-title">${video.judul || 'Judul Tidak Diketahui'}</h3>
        <p class="video-meta">Klik untuk menonton di YouTube</p>
      </div>
    `;

    container.appendChild(card);
  });
}

document.addEventListener("DOMContentLoaded", loadVideoPreview);