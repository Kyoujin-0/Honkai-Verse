
let currentIndex = 0;
const carousel = document.getElementById("carousel");
const images = carousel.querySelectorAll("card");

function scrollUp() {
  if (currentIndex > 0) {
    currentIndex--;
    carousel.scrollTo({
      top: images[currentIndex].offsetTop,
      behavior: "smooth"
    });
  }
}

function scrollDown() {
  if (currentIndex < images.length - 1) {
    currentIndex++;
    carousel.scrollTo({
      top: images[currentIndex].offsetTop,
      behavior: "smooth"
    });
  }
}
