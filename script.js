function toggleBox(cardElement) {
  const clickedBox = cardElement.querySelector(".extra-box");

  // Tutup semua box kecuali yang diklik
  document.querySelectorAll(".extra-box").forEach((box) => {
    if (box !== clickedBox) {
      box.style.display = "none";
    }
  });

  // Toggle box yang diklik
  clickedBox.style.display =
    clickedBox.style.display === "block" ? "none" : "block";
}

// Deteksi klik di luar kartu
document.addEventListener("click", function (e) {
  // Cek apakah klik terjadi di dalam elemen .card
  if (!e.target.closest(".card")) {
    document.querySelectorAll(".extra-box").forEach((box) => {
      box.style.display = "none";
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
