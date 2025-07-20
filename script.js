function toggleBox(cardElement) {
  // Tutup semua card dulu
  document.querySelectorAll(".card").forEach((card) => {
    card.classList.remove("active");
  });

  // Toggle hanya untuk card yang diklik
  if (!cardElement.classList.contains("active")) {
    cardElement.classList.add("active");
  }
}

// Klik di luar card: tutup semua extra-box
document.addEventListener("click", function (e) {
  if (!e.target.closest(".card")) {
    document.querySelectorAll(".card").forEach((card) => {
      card.classList.remove("active");
    });
  }
});

// contact card
document.querySelectorAll(".contact-card").forEach((card) => {
  card.addEventListener("click", function () {
    const link = card.querySelector("a");
    if (link) {
      window.open(link.href, "_blank");
    }
  });
});

// scroll
window.addEventListener("scroll", function () {
  const upBtn = document.querySelector(".up_btn");
  const hero2 = document.getElementById("hero2");

  const hero2Top = hero2.offsetTop;
  const hero2Bottom = hero2Top + hero2.offsetHeight;
  const scrollY = window.scrollY;
  const windowHeight = window.innerHeight;

  const isInHero2 = scrollY + windowHeight > hero2Top && scrollY < hero2Bottom;

  if (isInHero2) {
    upBtn.classList.add("show");
  } else {
    upBtn.classList.remove("show");
  }
});
