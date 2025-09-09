const { createClient } = supabase;

const SUPABASE_URL = "https://eemqhrqehdxvixnqspwf.supabase.co";
const SUPABASE_ANON_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVlbXFocnFlaGR4dml4bnFzcHdmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTcyOTI5MzQsImV4cCI6MjA3Mjg2ODkzNH0.0L7skHqVKnip9qFRSpQLIEYGKkQZRp3c7WPM0jB3fvM";

const supabaseClient = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

async function fetchHeroData() {
  try {
    const { data, error } = await supabaseClient
      .from("hero_section")
      .select("*")
      .eq("is_active", true) // hanya ambil row aktif
      .limit(1) // ambil 1 row saja (kalau ada banyak true)
      .single(); // ambil random kalo gk ada yg active

    if (error) {
      console.error("❌ Error fetch hero data:", error);
      return null;
    }

    return data;
  } catch (err) {
    console.error("❌ Unexpected error:", err);
    return null;
  }
}

// Update DOM hero section
function updateHeroSection(heroData) {
  if (!heroData) return;

  const heroTitle = document.querySelector(".hero_title");
  const heroSubtitle = document.querySelector(".hero_subtitle");
  const heroImage = document.querySelector(".hero-image");
  const ctaButton = document.querySelector(".cta-button span");

  if (heroTitle && heroData.title) heroTitle.textContent = heroData.title;
  if (heroSubtitle && heroData.subtitle)
    heroSubtitle.textContent = heroData.subtitle;
  if (heroImage && heroData.image_url) {
    heroImage.src = heroData.image_url;
    heroImage.alt = heroData.image_alt || "minaperkasa";
  }
  if (ctaButton && heroData.cta_text) ctaButton.textContent = heroData.cta_text;
}

async function loadHeroSection() {
  const heroData = await fetchHeroData();
  updateHeroSection(heroData);
}

document.addEventListener("DOMContentLoaded", loadHeroSection);
