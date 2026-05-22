// toggle menu navbar
const menu = document.querySelector(".menu");
const navlist = document.querySelector(".navlist");

menu.addEventListener("click", () => {
  navlist.classList.toggle("active");
});

document.addEventListener("click", (event) => {
  if (!menu.contains(event.target) && !navlist.contains(event.target)) {
    navlist.classList.remove("active");
  }
});

// translate button
let currentLang = "id";
async function loadingTranslations(lang) {
  const response = await fetch(`/locales/${lang}.json`);
  const data = await response.json();
  console.log("loaded:", lang, data);
  return data;
}

function applyTranslations(data, prefix = "", obj = data) {
  for (const key in obj) {
    if (typeof obj[key] === "object") {
      applyTranslations(data, `${prefix}${key}.`, obj[key]);
    } else {
      const selector = `[data-i18n="${prefix}${key}"]`;
      const elements = document.querySelectorAll(selector);
      elements.forEach((el) => {
        el.textContent = obj[key];
      });
    }
  }
}

async function setLanguage(lang) {
  currentLang = lang;

  const data = await loadingTranslations(lang);
  applyTranslations(data);

  // update button aktif
  document.querySelectorAll(".lang-btn").forEach((btn) => {
    btn.classList.toggle("active", btn.dataset.lang === lang);
  });

  // simpan bahasa pilihan user
  localStorage.setItem("lang", lang);
}

// load bahasa tersimpan
document.addEventListener("DOMContentLoaded", () => {
  const savedLang = localStorage.getItem("lang") || "id";
  setLanguage(savedLang);
});
