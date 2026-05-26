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

// animasi konten About
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
      }
    });
  },
  { threshold: 0.15 },
);

// Observe left side about
const aboutLeft = document.querySelector(".about-leftside");
if (aboutLeft) observer.observe(aboutLeft);

// Observe tiap box satu-satu
const boxes = document.querySelectorAll(".about-rightside .box");
boxes.forEach((box) => observer.observe(box));

// animasi card project
const cards = document.querySelectorAll(".card-projects");
cards.forEach((card) => observer.observe(card));

// animasi card skills
const skillItems = document.querySelectorAll(".skills-tools");
skillItems.forEach((item) => observer.observe(item));

// animasi contact konten
const contactLeft = document.querySelector(".contact-leftside");
const contactRight = document.querySelector(".contact-rightside");

if (contactLeft) observer.observe(contactLeft);
if (contactRight) observer.observe(contactRight);
