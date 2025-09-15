document.addEventListener("DOMContentLoaded", () => {
  const config = window.siteConfig.footer;

  // Brand & Deskripsi
  document.getElementById("footer-brand-name").textContent =
    window.siteConfig.brand.name;
  document.getElementById("footer-description").textContent =
    config.description;

  // Socials
  const socialsContainer = document.getElementById("footer-socials");
  config.socials.forEach((s) => {
    const a = document.createElement("a");
    a.href = s.href;
    a.target = "_blank";
    a.innerHTML = `<i class="${s.icon}"></i>`;
    socialsContainer.appendChild(a);
  });

  // Navigation
  document.getElementById("footer-nav-title").textContent =
    config.navigationTitle;
  const navUl = document.getElementById("footer-navigation");
  window.siteConfig.navigation.forEach((item) => {
    const li = document.createElement("li");
    li.innerHTML = `<a href="${item.href}">${item.label}</a>`;
    navUl.appendChild(li);
  });

  // Copyright
  document.getElementById("footer-copyright").textContent = config.copyright;
});
