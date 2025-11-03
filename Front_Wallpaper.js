function scrollCarousel(direction) {
  const carousel = document.getElementById('carousel');
  const scrollAmount = 112; // how many pixels to move per click
  carousel.scrollBy({
    top: scrollAmount * direction,
    behavior: 'smooth'
  });
}

function scrollCarousel(direction) {
  const carousel = document.getElementById("carousel");
  const scrollAmount = carousel.clientHeight / 3; // adjust to scroll one “page”
  const maxScroll = carousel.scrollHeight - carousel.clientHeight;
  const newScroll = carousel.scrollTop + direction * scrollAmount;

  if (newScroll < 0) {
    // Scroll to the bottom if you go past the top
    carousel.scrollTo({
      top: maxScroll,
      behavior: "smooth",
    });
  } else if (newScroll > maxScroll) {
    // Scroll back to top if you go past the bottom
    carousel.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  } else {
    // Normal scroll
    carousel.scrollBy({
      top: direction * scrollAmount,
      behavior: "smooth",
    });
  }
}
