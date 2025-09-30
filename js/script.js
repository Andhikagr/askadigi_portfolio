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

// menu mobile

const navbarLink = document.querySelector(".navbar__drawer");
const hamburgerMenu = document.querySelector("#menu");
const overlay = document.querySelector("#overlay");
const navClose = document.querySelector("#nav-close");

hamburgerMenu.addEventListener("click", () => {
  navbarLink.classList.toggle("active");
  overlay.classList.toggle("active");
  hamburgerMenu.classList.toggle("hidden");
});
overlay.addEventListener("click", () => {
  navbarLink.classList.remove("active");
  overlay.classList.remove("active");
  hamburgerMenu.classList.remove("hidden");
});

if (navClose) {
  navClose.addEventListener("click", () => {
    navbarLink.classList.remove("active");
    overlay.classList.remove("active");
    hamburgerMenu.classList.remove("hidden");
  });
}

// caraousel
const caraousels = document.querySelectorAll(".project__image");
// const caraouselChildrens = [...caraousel.children];
const folders = ["umroh", "kasir", "car-rentals"];

caraousels.forEach((caraousel, index) => {
  const folder = folders[index];
  fetch(`assets/${folder}/images.json`)
    .then((res) => res.json())
    .then((images) => {
      images.forEach((src) => {
        const li = document.createElement("li");
        li.classList.add("project__card");

        const img = document.createElement("img");
        img.src = `assets/${folder}/${src}`;
        img.alt = "folder";
        img.draggable = false;

        addModalClick(img);

        img.addEventListener("click", () => {
          modalImg.src = img.src;
          modal.classList.add("show");
        });

        li.appendChild(img);
        caraousel.appendChild(li);
      });
      //
      if (window.innerWidth > 1024) {
        initCarousel(caraousel);
      }
    });
});

function initCarousel(caraousel) {
  const caraouselChildrens = [...caraousel.children];
  let isDragging = false,
    startX,
    startScrollLeft;

  // const imgs = document.querySelectorAll(".project__card img");
  const imgs = caraousel.querySelectorAll("img");
  imgs.forEach((img) => addModalClick(img));

  imgs.forEach((img) => {
    img.addEventListener("click", () => {
      modalImg.src = img.src;
      modal.classList.add("show");
    });
  });

  const getCardWidth = () => {
    const card = caraousel.querySelector(".project__card");
    const style = getComputedStyle(caraousel);
    const gap = parseInt(style.gap) || 0;
    return card.offsetWidth + gap;
  };

  // Hitung card per view untuk infinite scroll
  const cardPerView = Math.round(caraousel.offsetWidth / getCardWidth());

  // Clone card untuk infinite scroll
  caraouselChildrens
    .slice(-cardPerView)
    .reverse()
    .forEach((card) => {
      const clone = card.cloneNode(true);
      addModalClick(clone.querySelector("img"));
      caraousel.insertBefore(clone, caraousel.firstChild);
    });
  caraouselChildrens.slice(0, cardPerView).forEach((card) => {
    const clone = card.cloneNode(true);
    addModalClick(clone.querySelector("img"));
    caraousel.appendChild(clone);
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

const modal = document.getElementById("modal");
const modalImg = document.getElementById("modal-img");
const modalClose = document.getElementById("modal-close");

function addModalClick(img) {
  img.addEventListener("click", (e) => {
    e.stopPropagation();
    modalImg.src = img.src;
    modal.classList.add("show");
  });
}

// modal.addEventListener("click", () => {
//   modal.classList.remove("show");
// });

modalClose.addEventListener("click", () => {
  modal.classList.remove("show");
});

//wa intergrated
const noWa = "6281553023775";
const text =
  "Halo, saya ingin konsultasi mengenai pembuatan website/aplikasi mobile";
const WaUrl = "https://wa.me/" + noWa + "?text=" + encodeURIComponent(text);

document.querySelectorAll(".wa-link").forEach((link) => {
  link.href = WaUrl;
});

//navlink-mobile

navLink.forEach((link) => {
  link.addEventListener("click", (e) => {
    if (window.innerWidth <= 768) {
      e.preventDefault();
      window.open(link.href, "_blank");
    }
  });
});
