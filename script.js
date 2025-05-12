// Transiciones entre secciones
const intro = document.getElementById("intro");
const gallery = document.getElementById("gallery");
const detail = document.getElementById("detail");
const startButton = document.getElementById("startButton");

startButton.addEventListener("click", () => {
  intro.classList.remove("active");
  setTimeout(() => gallery.classList.add("active"), 1000);
});

// Carrusel funcional con loop
let currentIndex = 0;
const carousel = document.getElementById("carousel");
const totalAlbums = document.querySelectorAll(".album").length;

document.getElementById("next").addEventListener("click", () => {
  currentIndex = (currentIndex + 1) % totalAlbums; // reinicia al llegar al final
  updateCarousel();
});

document.getElementById("prev").addEventListener("click", () => {
  currentIndex = (currentIndex - 1 + totalAlbums) % totalAlbums; // reinicia si baja de cero
  updateCarousel();
});

function updateCarousel() {
  const offset = -currentIndex * 1000;
  carousel.style.transform = `translateX(${offset}px)`;
}

// Detalle de álbumes
const albums = document.querySelectorAll(".album");
const details = {
  chromakopia: document.getElementById("chromakopiaDetail"),
  thinktank: document.getElementById("thinktankDetail"),
  willie: document.getElementById("willieDetail"),
};

albums.forEach(album => {
    album.addEventListener("click", () => {
      const key = album.dataset.album;
      gallery.classList.remove("active");
  
      // Oculta todos los detalles y pausa audios
      Object.values(details).forEach(d => {
        d.style.display = "none";
  
        // Detener audio si se está reproduciendo
        const audio = d.querySelector(".album-audio");
        if (audio) {
          audio.pause();
          audio.currentTime = 0;
        }
  
        const bio = d.querySelector(".bio");
        if (bio) {
          bio.classList.remove("typing-text");
          void bio.offsetWidth;
        }
      });
  
      setTimeout(() => {
        detail.classList.add("active");
        const current = details[key];
        current.style.display = "flex";
  
        // Reproducir audio automáticamente
        const audio = current.querySelector(".album-audio");
        if (audio) {
          audio.play().catch(err => {
            console.log("Autoplay bloqueado por el navegador:", err);
          });
        }
  
        const bio = current.querySelector(".bio");
        if (bio) bio.classList.add("typing-text");
      }, 1000);
    });
  });
  

document.getElementById("backToGallery").addEventListener("click", () => {
  detail.classList.remove("active");
    // Detener todos los audios al salir
    Object.values(details).forEach(d => {
        const audio = d.querySelector(".album-audio");
        if (audio) {
          audio.pause();
          audio.currentTime = 0;
        }
      });
  setTimeout(() => gallery.classList.add("active"), 1000);
});
