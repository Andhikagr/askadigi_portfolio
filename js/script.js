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

// caraousel
const caraousel = document.querySelector(".project__image");
const caraouselChildrens = [...caraousel.children];

fetch("assets/umroh/images.json")
  .then((res) => res.json())
  .then((images) => {
    images.forEach((src) => {
      const li = document.createElement("li");
      li.classList.add("project__card");

      const img = document.createElement("img");
      img.src = `assets/umroh/${src}`;
      img.alt = "umroh";
      img.draggable = false;
      li.appendChild(img);
      caraousel.appendChild(li);
    });
    //
    initCarousel();
  });

function initCarousel() {
  const caraouselChildrens = [...caraousel.children];
  let isDragging = false,
    startX,
    startScrollLeft;

  const getCardWidth = () => {
    const card = caraousel.querySelector(".project__card");
    const style = getComputedStyle(caraousel);
    const gap = parseInt(style.gap) || 0;
    return card.offsetWidth + gap;
  };

  // Hitung card per view untuk infinite scroll
  let cardPerView = Math.round(caraousel.offsetWidth / getCardWidth());

  // Clone card untuk infinite scroll
  caraouselChildrens
    .slice(-cardPerView)
    .reverse()
    .forEach((card) => {
      caraousel.insertAdjacentHTML("afterbegin", card.outerHTML);
    });
  caraouselChildrens.slice(0, cardPerView).forEach((card) => {
    caraousel.insertAdjacentHTML("beforeend", card.outerHTML);
  });

  // Mulai drag
  const dragStart = (e) => {
    isDragging = true;
    caraousel.classList.add("dragging");
    startX = e.pageX;
    startScrollLeft = caraousel.scrollLeft;
  };

  // Dragging
  const dragging = (e) => {
    if (!isDragging) return;
    const walk = (e.pageX - startX) * 2; // faktor drag sensitif
    caraousel.scrollLeft = startScrollLeft - walk;
  };

  // Hentikan drag & snap ke full card
  const dragStop = () => {
    if (!isDragging) return;
    isDragging = false;
    caraousel.classList.remove("dragging");

    const cardWidth = getCardWidth();
    const scroll = caraousel.scrollLeft;
    const remainder = scroll % cardWidth; // sisa scroll
    let snapped = scroll;

    // Threshold: jika sisa lebih dari setengah card → geser ke card berikutnya
    if (remainder > cardWidth / 2) {
      snapped = scroll + (cardWidth - remainder);
    } else {
      snapped = scroll - remainder;
    }

    caraousel.scrollTo({
      left: snapped,
      behavior: "smooth", // smooth snap
    });
  };

  // Infinite scroll
  const infiniteScroll = () => {
    const maxScroll = caraousel.scrollWidth - caraousel.offsetWidth;
    if (caraousel.scrollLeft <= 0) {
      caraousel.classList.add("no-transition");
      caraousel.scrollLeft = maxScroll - caraousel.offsetWidth;
      caraousel.classList.remove("no-transition");
    } else if (Math.ceil(caraousel.scrollLeft) >= maxScroll) {
      caraousel.classList.add("no-transition");
      caraousel.scrollLeft = caraousel.offsetWidth;
      caraousel.classList.remove("no-transition");
    }
  };

  // Event listener
  caraousel.addEventListener("mousedown", dragStart);
  caraousel.addEventListener("mousemove", dragging);
  document.addEventListener("mouseup", dragStop);
  caraousel.addEventListener("mouseleave", dragStop); // agar stop saat mouse keluar
  caraousel.addEventListener("scroll", infiniteScroll);
}
