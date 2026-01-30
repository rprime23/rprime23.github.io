/* ===============================
   GLOBAL EVENT DELEGATION (NAV)
   =============================== */

// Hamburger menu toggle (works even if nav loads later)
document.addEventListener("click", (e) => {
  const burger = e.target.closest("#burger-menu");
  if (!burger) return;

  const ul = document.querySelector("nav ul");
  ul?.classList.toggle("show");
});

// Close menu when a nav link is clicked
document.addEventListener("click", (e) => {
  const link = e.target.closest(".nav-link");
  if (!link) return;

  const ul = document.querySelector("nav ul");
  ul?.classList.remove("show");
});

/* ===============================
   DOM CONTENT LOADED
   =============================== */

document.addEventListener("DOMContentLoaded", () => {
  // Alien image slider (only on pages that need it)
  if (document.getElementById("img-change-alien")) {
    setupAlienImageSlider();
  }

  if (document.getElementById("img-change")) {
    setupHumanImageSlider();
  }
});

/* ===============================
   IMAGE SLIDERS
   =============================== */

function setupAlienImageSlider() {
  const image = document.getElementById("img-change-alien");
  if (!image) return;

  let currentPos = 0;
  const imagesAlien = [
    "../images/3D_Art/Alien_Model/conceptFront.webp",
    "../images/3D_Art/Alien_Model/conceptBack.webp",
    "../images/3D_Art/Alien_Model/conceptSide.webp",
    "../images/3D_Art/Alien_Model/frontLines.webp",
    "../images/3D_Art/Alien_Model/backLines.webp",
    "../images/3D_Art/Alien_Model/sideLines.webp",
    "../images/3D_Art/Alien_Model/side2Lines.webp",
    "../images/3D_Art/Alien_Model/threeFourthsFlat.webp",
    "../images/3D_Art/Alien_Model/frontSmooth.webp",
    "../images/3D_Art/Alien_Model/backSmooth.webp",
    "../images/3D_Art/Alien_Model/sideSmooth.webp"
  ];

  function changeImageSrc() {
    currentPos = (currentPos + 1) % imagesAlien.length;
    image.src = imagesAlien[currentPos];
  }

  setInterval(changeImageSrc, 3000);
}

function setupHumanImageSlider() {
  const image = document.getElementById("img-change");
  if (!image) return;

  let currentPos = 0;
  const images = [
    "../images/3D_Art/Human_Male/fingerSmooth.webp",
    "../images/3D_Art/Human_Male/handSmooth.webp",
    "../images/3D_Art/Human_Male/torsoSmooth.webp",
    "../images/3D_Art/Human_Male/frontTorsoArmSmooth.webp",
    "../images/3D_Art/Human_Male/backTorsoArmSmooth.webp",
    "../images/3D_Art/Human_Male/torsoLegSmooth.webp",
    "../images/3D_Art/Human_Male/noDetailBodySmooth.webp",
    "../images/3D_Art/Human_Male/torsoDetailSmooth.webp",
    "../images/3D_Art/Human_Male/headSmooth.webp"
  ];

  function changeImageSrc() {
    currentPos = (currentPos + 1) % images.length;
    image.src = images[currentPos];
  }

  setInterval(changeImageSrc, 3000);
}

/* ===============================
   PROJECT CARD IMAGE EQUALIZER
   =============================== */

function equalizeImageHeights() {
  const projectSections = document.querySelectorAll(".projects");

  projectSections.forEach(section => {
    const imageContainers = section.querySelectorAll(".project-pic-container");
    const images = section.querySelectorAll(".project-pic");

    imageContainers.forEach(container => {
      container.style.minHeight = "auto";
    });

    Promise.all(
      Array.from(images).map(img => {
        return new Promise(resolve => {
          if (img.complete) {
            resolve();
          } else {
            img.addEventListener("load", resolve);
            img.addEventListener("error", resolve);
          }
        });
      })
    ).then(() => {
      let maxHeight = 0;

      imageContainers.forEach(container => {
        container.style.minHeight = "auto";
        maxHeight = Math.max(maxHeight, container.offsetHeight);
      });

      imageContainers.forEach(container => {
        container.style.minHeight = `${maxHeight}px`;
      });
    });
  });
}

function equalizeByImageDimensions() {
  const projectSections = document.querySelectorAll(".projects");

  projectSections.forEach(section => {
    const images = section.querySelectorAll(".project-pic");
    const containers = section.querySelectorAll(".project-pic-container");

    containers.forEach(container => {
      container.style.minHeight = "auto";
    });

    Promise.all(
      Array.from(images).map(img => {
        return new Promise(resolve => {
          if (img.complete) {
            resolve();
          } else {
            img.addEventListener("load", resolve);
            img.addEventListener("error", resolve);
          }
        });
      })
    ).then(() => {
      let maxImageHeight = 0;

      images.forEach(img => {
        const containerWidth = img.parentElement.offsetWidth;
        const scaledWidth = containerWidth * 0.65;
        const aspectRatio = img.naturalHeight / img.naturalWidth;
        const scaledHeight = scaledWidth * aspectRatio;
        maxImageHeight = Math.max(maxImageHeight, scaledHeight);
      });

      containers.forEach(container => {
        container.style.minHeight = `${maxImageHeight + 20}px`;
      });
    });
  });
}

/* ===============================
   RESPONSIVE HANDLING
   =============================== */

function handleResize() {
  clearTimeout(window.resizeTimeout);
  window.resizeTimeout = setTimeout(equalizeImageHeights, 250);
}

document.addEventListener("DOMContentLoaded", () => {
  const DESKTOP_MQ = window.matchMedia("(min-width: 781px)");
  let observer = null;

  function setupObserver() {
    if (observer) return;

    observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.addEventListener("load", () => {
            setTimeout(equalizeImageHeights, 100);
          });
        }
      });
    });

    document.querySelectorAll(".project-pic").forEach(img => {
      observer.observe(img);
    });
  }

  function teardownObserver() {
    if (!observer) return;
    observer.disconnect();
    observer = null;
  }

  function enableEqualizer() {
    equalizeImageHeights();
    window.addEventListener("resize", handleResize);
    setupObserver();
  }

  function disableEqualizer() {
    window.removeEventListener("resize", handleResize);
    teardownObserver();

    document.querySelectorAll(".projects .project-pic-container").forEach(container => {
      container.style.minHeight = "";
    });
  }

  function handleMQChange(e) {
    e.matches ? enableEqualizer() : disableEqualizer();
  }

  DESKTOP_MQ.matches ? enableEqualizer() : disableEqualizer();

  if (DESKTOP_MQ.addEventListener) {
    DESKTOP_MQ.addEventListener("change", handleMQChange);
  } else {
    DESKTOP_MQ.addListener(handleMQChange);
  }
});

/* ===============================
   EXPORTS (OPTIONAL)
   =============================== */

window.equalizeImageHeights = equalizeImageHeights;
window.equalizeByImageDimensions = equalizeByImageDimensions;
