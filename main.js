const menu = document.querySelector(".menu");
const navlist = document.querySelector(".navlist");

menu.addEventListener("click", () => {
  navlist.classList.toggle("active");
});
