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
