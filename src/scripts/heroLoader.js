const { createClient } = supabase;

const SUPABASE_URL = "https://foneddybfnwzngdqravs.supabase.co";
const SUPABASE_ANON_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZvbmVkZHliZm53em5nZHFyYXZzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTg1OTYxNzgsImV4cCI6MjA3NDE3MjE3OH0.mxMz7ahuQp1F2CEQoQc--vXVwXAmThfKDLVsjseiXWs";

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

  const heroSection = document.querySelector(".hero_section");
  const heroTitle = document.querySelector(".hero_title");
  const heroSubtitle = document.querySelector(".hero_subtitle");

  // Update background image
  if (heroSection && heroData.image_url) {
    heroSection.style.backgroundImage = `url('${heroData.image_url}')`;
  }

  if (heroTitle && heroData.title) heroTitle.textContent = heroData.title;
  if (heroSubtitle && heroData.subtitle)
    heroSubtitle.textContent = heroData.subtitle;
}

async function loadHeroSection() {
  const heroData = await fetchHeroData();
  updateHeroSection(heroData);
}

document.addEventListener("DOMContentLoaded", loadHeroSection);
