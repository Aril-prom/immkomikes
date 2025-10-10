const { createClient } = supabase;

const SUPABASE_URL = "https://foneddybfnwzngdqravs.supabase.co";
const SUPABASE_ANON_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZvbmVkZHliZm53em5nZHFyYXZzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTg1OTYxNzgsImV4cCI6MjA3NDE3MjE3OH0.mxMz7ahuQp1F2CEQoQc--vXVwXAmThfKDLVsjseiXWs";

const supabaseClient = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

async function loadPromo() {
  try {
    const { data, error } = await supabaseClient
      .from("promo_section")
      .select("timeline, jenis_promo, is_promo")
      .eq("is_promo", true);

    if (error) {
      console.error("❌ Error fetch promo:", error);
      return;
    }

    console.log("✅ Promo data:", data);

    const promoSection = document.getElementById("promo_section");
    const promoWrapper = document.querySelector(".promo_wrapper");

    if (data && data.length > 0) {
      promoSection.classList.add("show");

      let promoHTML = data
        .map(
          (promo) => `
          <div class="promo_item">
            <span class="promo_timeline">${promo.timeline}</span>
            <span class="promo_jenis">${promo.jenis_promo}</span>
          </div>
        `
        )
        .join("");

      promoWrapper.innerHTML = `
        <div class="promo_content">${promoHTML}</div>
        <div class="promo_content">${promoHTML}</div>
        <div class="promo_content">${promoHTML}</div>
      `;
    } else {
      promoSection.classList.remove("show");
    }
  } catch (err) {
    console.error("❌ Unexpected error in loadPromo:", err);
  }
}

document.addEventListener("DOMContentLoaded", loadPromo);
