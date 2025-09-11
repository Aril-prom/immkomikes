import { getBeritaBySlug } from "./loaderBerita.js";

const urlParams = new URLSearchParams(window.location.search);
const slug = urlParams.get("slug");

async function renderBerita() {
  const post = await getBeritaBySlug(slug);

  if (!post) {
    document.getElementById("postContent").innerHTML =
      "<p>Artikel tidak ditemukan.</p>";
    return;
  }

  // Hero
  document.getElementById("heroImage").src =
    post.hero_url || "../images/default-hero.jpg";
  document.getElementById("postTitle").textContent = post.title;
  document.getElementById("postDate").textContent = new Date(
    post.created_at
  ).toLocaleDateString("id-ID");

  // Content (Markdown → HTML)
  document.getElementById("postContent").innerHTML = marked.parse(post.content);
}

renderBerita();
