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
    "../images/3D_Art/Alien_Model/conceptFront.png",
    "../images/3D_Art/Alien_Model/conceptBack.png",
    "../images/3D_Art/Alien_Model/conceptSide.png",
    "../images/3D_Art/Alien_Model/frontLines.png",
    "../images/3D_Art/Alien_Model/backLines.png",
    "../images/3D_Art/Alien_Model/sideLines.png",
    "../images/3D_Art/Alien_Model/side2Lines.png",
    "../images/3D_Art/Alien_Model/threeFourthsFlat.png",
    "../images/3D_Art/Alien_Model/frontSmooth.png",
    "../images/3D_Art/Alien_Model/backSmooth.png",
    "../images/3D_Art/Alien_Model/sideSmooth.png"
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
  var images = ["..\\images\\3D_Art\\Human_Male\\fingerSmooth.jpg", "..\\images\\3D_Art\\Human_Male\\handSmooth.png", "..\\images\\3D_Art\\Human_Male\\torsoSmooth.png",
                  "..\\images\\3D_Art\\Human_Male\\frontTorsoArmSmooth.png", "..\\images\\3D_Art\\Human_Male\\backTorsoArmSmooth.png", "..\\images\\3D_Art\\Human_Male\\torsoLegSmooth.png",
                  "..\\images\\3D_Art\\Human_Male\\noDetailBodySmooth.png", "..\\images\\3D_Art\\Human_Male\\torsoDetailSmooth.png", "..\\images\\3D_Art\\Human_Male\\headSmooth.png"];

  function changeImageSrc() {
      if (++currentPos >= images.length)
          currentPos = 0;

      image.src = images[currentPos];
  }

  setInterval(changeImageSrc, 3000);
}
