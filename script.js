document.addEventListener("DOMContentLoaded", () => {
  // =========================
  // ELEMENTS
  // =========================
  const header = document.querySelector("header");
  const btn = document.querySelector(".btn");
  const hero = document.querySelector(".hero");
  const heroImg = document.querySelector(".hero-img");
  const progressBar = document.createElement("div");

  progressBar.id = "progress-bar";
  document.body.appendChild(progressBar);

  const reveals = document.querySelectorAll(".reveal");

  const music = document.getElementById("bg-music");
  const musicBtn = document.getElementById("music-btn");

  // =========================
  // SMOOTH SCROLL
  // =========================
  document.querySelectorAll("nav a").forEach(anchor => {
    anchor.addEventListener("click", function (e) {
      const target = document.querySelector(this.getAttribute("href"));

      if (target && this.getAttribute("href").startsWith("#")) {
        e.preventDefault();

        target.scrollIntoView({
          behavior: "smooth"
        });
      }
    });
  });

  // =========================
  // REVEAL ON SCROLL
  // =========================
  function revealOnScroll() {
    const windowHeight = window.innerHeight;

    reveals.forEach(el => {
      const elementTop = el.getBoundingClientRect().top;

      if (elementTop < windowHeight - 100) {
        el.classList.add("active");
      }
    });
  }

  // run first load
  revealOnScroll();

  // =========================
  // SCROLL EFFECT (ALL IN ONE)
  // =========================
  window.addEventListener("scroll", () => {
    const scrollY = window.scrollY;

    // NAVBAR SCROLL
    if (header) {
      header.classList.toggle("scrolled", scrollY > 50);
    }

    // PROGRESS BAR
    const scrollTop = document.documentElement.scrollTop;
    const height =
      document.documentElement.scrollHeight -
      document.documentElement.clientHeight;

    const progress = (scrollTop / height) * 100;
    progressBar.style.width = progress + "%";

    // PARALLAX HERO BG
    if (hero) {
      hero.style.backgroundPositionY = scrollY * 0.5 + "px";
    }

    // PARALLAX IMAGE
    if (heroImg) {
      heroImg.style.transform = `translateY(${scrollY * 0.2}px)`;
    }

    // REVEAL ANIMATION
    revealOnScroll();
  });

  // =========================
  // BUTTON EFFECT
  // =========================
  if (btn) {
    btn.addEventListener("mouseover", () => {
      btn.style.transform = "scale(1.1)";
    });

    btn.addEventListener("mouseout", () => {
      btn.style.transform = "scale(1)";
    });
  }

  // =========================
  // MUSIC CONTROL
  // =========================
  if (music && musicBtn) {
    musicBtn.addEventListener("click", () => {
      if (music.paused) {
        music.play();
        musicBtn.innerHTML = "⏸";
      } else {
        music.pause();
        musicBtn.innerHTML = "▶";
      }
    });

    // unlock autoplay (mobile safe)
    document.addEventListener(
      "click",
      () => {
        music.play().then(() => {
          musicBtn.innerHTML = "⏸";
        }).catch(() => {});
      },
      { once: true }
    );
  }
});

document.addEventListener("DOMContentLoaded", () => {
  const images = document.querySelectorAll(".gallery-img");
  const lightbox = document.getElementById("lightbox");
  const lightboxImg = document.querySelector(".lightbox-img");
  const closeBtn = document.querySelector(".close");
  const btnLeft = document.querySelector(".nav.left");
  const btnRight = document.querySelector(".nav.right");

  let currentIndex = 0;
  const imgArray = Array.from(images);

  function openImage(index) {
    if (index < 0) index = imgArray.length - 1;
    if (index >= imgArray.length) index = 0;

    currentIndex = index;
    lightboxImg.src = imgArray[currentIndex].src;
    lightbox.style.display = "flex";
  }

  function closeLightbox() {
    lightbox.style.display = "none";
  }

  // klik image
  images.forEach((img, index) => {
    img.addEventListener("click", () => openImage(index));
  });

  // tombol X
  closeBtn.addEventListener("click", closeLightbox);

  // klik background gelap
  lightbox.addEventListener("click", (e) => {
    if (e.target === lightbox) closeLightbox();
  });

  // tombol kiri
  btnLeft.addEventListener("click", (e) => {
    e.stopPropagation();
    openImage(currentIndex - 1);
  });

  // tombol kanan
  btnRight.addEventListener("click", (e) => {
    e.stopPropagation();
    openImage(currentIndex + 1);
  });

  // keyboard support
  document.addEventListener("keydown", (e) => {
    if (lightbox.style.display === "flex") {
      if (e.key === "ArrowLeft") openImage(currentIndex - 1);
      if (e.key === "ArrowRight") openImage(currentIndex + 1);
      if (e.key === "Escape") closeLightbox();
    }
  });
});