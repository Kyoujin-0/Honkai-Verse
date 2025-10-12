const toggleButton = document.getElementById("toggleButton");
const backgroundVideo = document.getElementById("backgroundVideo");

// List of videos you can toggle through
const videos = ["Graphics/chainsawman(placeholder).mp4", "Graphics/Raiden Shogun.mp4"];
let currentVideo = 0;

toggleButton.addEventListener("click", () => {
  currentVideo = (currentVideo + 1) % videos.length;
  backgroundVideo.src = videos[currentVideo];
  backgroundVideo.play(); // replay after switching
});
