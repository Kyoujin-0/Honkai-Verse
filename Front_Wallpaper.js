function scrollCarousel(direction) {
  const carousel = document.getElementById('carousel');
  const scrollAmount = 112; // how many pixels to move per click
  carousel.scrollBy({
    top: scrollAmount * direction,
    behavior: 'smooth'
  });
}