document.addEventListener("DOMContentLoaded", function () {
  let splashscreen = document.querySelector(".splashscreen");
  let splashscreenVideo = document.querySelector(".splashscreen video");
  
  splashscreenVideo.play();
  
  splashscreenVideo.addEventListener("ended", function () {
    splashscreen.style.display = "none";
  })
})