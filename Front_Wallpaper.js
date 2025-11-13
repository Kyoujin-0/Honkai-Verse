function scrollCarousel(direction) {
  const carousel = document.getElementById('carousel');
  const scrollAmount = 120; // how many pixels to move per click
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


document.addEventListener('DOMContentLoaded', () => {
  // --- THEME DEFINITIONS: update these to your files/colors ---
  const themes = [
    // matching the order of your carousel cards
    { name: 'Cyrene', color: '#6ec6ff', video: 'HSR (02) Cyrene/Cyrene_new.mp4', bgImage: '' },
    { name: 'Acheron', color: '#9fb8c6', video: 'HSR (01) Acheron/Acheron Honkai Star Rail.mp4', bgImage: '' },
    { name: 'Kiana', color: '#f8fdffff', video: 'Hi3 (01) Kiana/herrscher-of-flamescion-honkai-impact-3rd-moewalls-com.mp4', bgImage: '' },
    // fallback/random images for the rest
    { name: 'Icons/Sparkle.png', color: '#f3c971', video: 'HSR (03) Sparkle/Sparkle.mp4' },
    { name: 'Random 5', color: '#b39ddb', video: '', bgImage: 'https://picsum.photos/1920/1080?random=5' },
    { name: 'Random 6', color: '#90caf9', video: '', bgImage: 'https://picsum.photos/1920/1080?random=6' },
    { name: 'Random 7', color: '#ffb4a2', video: '', bgImage: 'https://picsum.photos/1920/1080?random=7' }
  ];

  const cards = document.querySelectorAll('.carousel-card');
  const bgVideo = document.getElementById('background-video');
  const body = document.body;
  const overlay = document.getElementById('bg-overlay');

  // helper: safely apply theme
  function applyTheme(theme) {
    // 1) Accent / text color
    if (theme.color) {
      // set CSS variables
      document.documentElement.style.setProperty('--accent-color', theme.color);

      // auto derive readable text color (simple luminance check)
      const hex = theme.color.replace('#','');
      let r = parseInt(hex.substring(0,2),16);
      let g = parseInt(hex.substring(2,4),16);
      let b = parseInt(hex.substring(4,6),16);
      const luminance = (0.299*r + 0.587*g + 0.114*b)/255;
      const textColor = luminance > 0.6 ? '#111' : '#fff';
      document.documentElement.style.setProperty('--text-color', textColor);
    }

    // 2) Background video OR fallback image
    if (bgVideo && theme.video) {
      // fade out -> change src -> play -> fade in
      bgVideo.classList.add('fading');
      setTimeout(() => {
        // change source(s)
        // remove existing <source> children then create new one
        while (bgVideo.firstChild) bgVideo.removeChild(bgVideo.firstChild);
        const source = document.createElement('source');
        source.src = theme.video;
        source.type = 'video/mp4';
        bgVideo.appendChild(source);
        bgVideo.load();
        const playPromise = bgVideo.play();
        // ignore promise result if not allowed by browser
        bgVideo.classList.remove('fading');
      }, 350); // matches CSS transition time
      // clear any body bg-image in case previously set
      body.style.backgroundImage = '';
    } else {
      // no video provided for this theme: use bgImage or a solid color
      if (bgVideo) {
        // optional: pause/hide video
        try { bgVideo.pause(); } catch(e){}
      }
      if (theme.bgImage) {
        body.style.backgroundImage = `url('${theme.bgImage}')`;
        body.style.backgroundSize = 'cover';
        body.style.backgroundPosition = 'center';
      } else {
        // fallback to a dark background tinted by the accent color
        body.style.backgroundImage = '';
        body.style.background = 'linear-gradient(180deg, rgba(0,0,0,0.6), rgba(0,0,0,0.6))';
      }
    }

    // 3) optional: update a title element if present
    const titleEl = document.querySelector('.main-title');
    if (titleEl && theme.name) titleEl.textContent = theme.name;
  }

  // attach listeners to each card
  cards.forEach((card, idx) => {
    card.style.cursor = 'pointer';
    card.addEventListener('click', () => {
      const theme = themes[idx] || themes[0];
      applyTheme(theme);
    });

    // (optional) add keyboard accessibility
    card.setAttribute('tabindex','0');
    card.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        const theme = themes[idx] || themes[0];
        applyTheme(theme);
      }
    });
  });

  // Optionally apply the first theme on load
  if (themes.length) applyTheme(themes[0]);
});
