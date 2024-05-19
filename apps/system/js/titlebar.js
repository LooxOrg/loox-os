const screenWidth = window.screen.width;
const screenHeight = window.screen.height;

function isFullscreen() {
  if (screenWidth == window.innerWidth && screenHeight == window.innerHeight) {
    return true;
  } else {
    return false;
  }
}

function hideTitlebar() {
  document.querySelector(".titlebar").style.display = "none";
}

function showTitlebar() {
  document.querySelector(".titlebar").style.display = "";
}

function toggleTitlebar() {
  if (!isFullscreen()) {
    showTitlebar();
  } else {
    hideTitlebar();
  }
}

window.addEventListener("resize", function () {
  toggleTitlebar();
});

window.addEventListener("load", function () {
  toggleTitlebar();
}) 