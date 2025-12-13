// // Nav hamburgerburger selections
// const burger = document.querySelector("#burger-menu");
// const ul = document.querySelector("nav ul");
// const nav = document.querySelector("nav");

// // Scroll to top selection
// const scrollUp = document.querySelector("#scroll-up");

// // Select nav links
// const navLink = document.querySelectorAll(".nav-link");

// // Hamburger menu function
// burger.addEventListener("click", () => {
//   ul.classList.toggle("show");
// });

// // Close hamburger menu when a link is clicked
// navLink.forEach((link) =>
//   link.addEventListener("click", () => {
//     ul.classList.remove("show");
//   })
// );

// // scroll to top functionality
// // scrollUp.addEventListener("click", () => {
// //   window.scrollTo({
// //     top: 0,
// //     left: 0,
// //     behavior: "smooth",
// //   });
// // });

document.addEventListener("DOMContentLoaded", () => {
  // Hamburger menu setup
  const burger = document.querySelector("#burger-menu");
  const ul = document.querySelector("nav ul");
  const navLink = document.querySelectorAll(".nav-link");

  burger?.addEventListener("click", () => {
    ul?.classList.toggle("show");
  });

  navLink.forEach((link) =>
    link.addEventListener("click", () => {
      ul?.classList.remove("show");
    })
  );

  // Scroll to top (commented out)
  // const scrollUp = document.querySelector("#scroll-up");
  // scrollUp?.addEventListener("click", () => {
  //   window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  // });

  // 👉 Alien image slider (only on pages that need it)
  if (document.getElementById("img-change-alien")) {
    setupAlienImageSlider();
  }

  if (document.getElementById("img-change")) {
    setupHumanImageSlider();
  }
});

// 🧠 Define the slider function outside of DOMContentLoaded for reuse
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

function setupHumanImageSlider()
{
  
  var image = document.getElementById("img-change");
  var currentPos = 0;
  var images = ["..\\images\\3D_Art\\Human_Male\\fingerSmooth.webp", "..\\images\\3D_Art\\Human_Male\\handSmooth.webp", "..\\images\\3D_Art\\Human_Male\\torsoSmooth.webp",
                  "..\\images\\3D_Art\\Human_Male\\frontTorsoArmSmooth.webp", "..\\images\\3D_Art\\Human_Male\\backTorsoArmSmooth.webp", "..\\images\\3D_Art\\Human_Male\\torsoLegSmooth.webp",
                  "..\\images\\3D_Art\\Human_Male\\noDetailBodySmooth.webp", "..\\images\\3D_Art\\Human_Male\\torsoDetailSmooth.webp", "..\\images\\3D_Art\\Human_Male\\headSmooth.webp"];

  function changeImageSrc() {
      if (++currentPos >= images.length)
          currentPos = 0;

      image.src = images[currentPos];
  }

  setInterval(changeImageSrc, 3000);
}

/* Projects cards */
// Function to equalize image container heights within each project section
function equalizeImageHeights() {
  // Get all project sections
  const projectSections = document.querySelectorAll('.projects');
  
  projectSections.forEach(section => {
    const imageContainers = section.querySelectorAll('.project-pic-container');
    const images = section.querySelectorAll('.project-pic');
    
    // Reset any previously set min-heights
    imageContainers.forEach(container => {
      container.style.minHeight = 'auto';
    });
    
    // Wait for images to load, then calculate max height
    Promise.all(
      Array.from(images).map(img => {
        return new Promise(resolve => {
          if (img.complete) {
            resolve();
          } else {
            img.addEventListener('load', resolve);
            img.addEventListener('error', resolve); // Handle broken images
          }
        });
      })
    ).then(() => {
      // Find the tallest image container in this section
      let maxHeight = 0;
      
      imageContainers.forEach(container => {
        // Temporarily remove min-height to get natural height
        container.style.minHeight = 'auto';
        const height = container.offsetHeight;
        maxHeight = Math.max(maxHeight, height);
      });
      
      // Set all containers in this section to the max height
      imageContainers.forEach(container => {
        container.style.minHeight = `${maxHeight}px`;
      });
    });
  });
}

// Alternative approach: Set min-height based on actual image dimensions
function equalizeByImageDimensions() {
  const projectSections = document.querySelectorAll('.projects');
  
  projectSections.forEach(section => {
    const images = section.querySelectorAll('.project-pic');
    const containers = section.querySelectorAll('.project-pic-container');
    
    // Reset min-heights
    containers.forEach(container => {
      container.style.minHeight = 'auto';
    });
    
    // Wait for all images to load
    Promise.all(
      Array.from(images).map(img => {
        return new Promise(resolve => {
          if (img.complete) {
            resolve();
          } else {
            img.addEventListener('load', resolve);
            img.addEventListener('error', resolve);
          }
        });
      })
    ).then(() => {
      let maxImageHeight = 0;
      
      // Find the tallest image (accounting for the 65% width scaling)
      images.forEach(img => {
        const containerWidth = img.parentElement.offsetWidth;
        const scaledWidth = containerWidth * 0.65; // 65% as per CSS
        const aspectRatio = img.naturalHeight / img.naturalWidth;
        const scaledHeight = scaledWidth * aspectRatio;
        
        maxImageHeight = Math.max(maxImageHeight, scaledHeight);
      });
      
      // Set all containers to accommodate the tallest scaled image
      containers.forEach(container => {
        container.style.minHeight = `${maxImageHeight + 20}px`; // +20px for some padding
      });
    });
  });
}

// Function to handle window resize
function handleResize() {
  // Debounce resize events
  clearTimeout(window.resizeTimeout);
  window.resizeTimeout = setTimeout(() => {
    equalizeImageHeights();
  }, 250);
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  equalizeImageHeights();
});

// Re-equalize on window resize
window.addEventListener('resize', handleResize);

// Optional: Re-equalize when images are lazy-loaded
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const img = entry.target;
      img.addEventListener('load', () => {
        setTimeout(equalizeImageHeights, 100);
      });
    }
  });
});

// Observe all project images for lazy loading
document.querySelectorAll('.project-pic').forEach(img => {
  observer.observe(img);
});

// Export functions for manual triggering if needed
window.equalizeImageHeights = equalizeImageHeights;
window.equalizeByImageDimensions = equalizeByImageDimensions;

window.addEventListener("load", () => {
  const bio = document.getElementById("bio");
  if (!bio) return;
  bio.classList.add("animate__animated", "animate__shakeX");
});

