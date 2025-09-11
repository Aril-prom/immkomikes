import { getAllBerita } from "./loaderBerita.js";

async function renderBeritaList() {
  const berita = await getAllBerita();
  const container = document.getElementById("beritaList");

  if (!berita.length) {
    container.innerHTML = "<p>Tidak ada berita tersedia.</p>";
    return;
  }

  container.innerHTML = berita
    .map(
      (item) => `
    <div class="berita-card">
      <a href="berita-detail.html?slug=${item.slug}"><img src="${
        item.hero_url || "../images/default-thumb.jpg"
      }" alt="${item.title}"></a>
      
      <div class="berita-card-content">
        <a href="berita-detail.html?slug=${
          item.slug
        }" class="berita-card-title">${item.title}</a>
        <span class="berita-card-date">${new Date(
          item.created_at
        ).toLocaleDateString("id-ID")}</span>
        <p class="berita-card-excerpt">${
          item.excerpt || item.content.substring(0, 100) + "..."
        }</p>
      </div>
    </div>
  `
    )
    .join("");
}

renderBeritaList();
