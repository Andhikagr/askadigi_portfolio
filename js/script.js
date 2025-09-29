const sections = document.querySelectorAll("main, section");
const navLink = document.querySelectorAll(".nav__link a");

window.addEventListener("scroll", () => {
  let current = "";
  sections.forEach((section) => {
    const sectionStop = section.offsetTop;
    const sectionHeight = section.clientHeight;
    if (window.scrollY >= sectionStop - sectionHeight / 3) {
      current = section.getAttribute("id");
    }
  });

  navLink.forEach((link) => {
    link.classList.remove("active");
    if (link.getAttribute("href") === `#${current}`) {
      link.classList.add("active");
    }
  });
});

window.addEventListener("load", () => {
  navLink.forEach((link) => link.classList.remove("active"));
  document.querySelector('.nav__link a[href="#home"]').classList.add("active");
});
