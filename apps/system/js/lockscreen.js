document.addEventListener("DOMContentLoaded", function () {
setClock();
setInterval(setClock, 1000)


let content = document.querySelector(".content");

let webview = document.createElement("webview");
webview.src = "http://homescreen.localhost:8081/index.html"
webview.classList.add("webview");
webview.style.width = "100vw";
webview.style.height = "calc(100vh - 40px)";
webview.style.border = "none";
content.appendChild(webview);

webview.addEventListener('did-start-loading', console.log("loading..."))
webview.addEventListener('did-finish-load', console.log("loaded"))

let swipe = document.querySelector(".lockscreen-swipe");
let lockscreen = document.querySelector(".lockscreen");
console.log(swipe)

// Make the cursor goes up with the cursor

let startY;
let lockscreenHeight = lockscreen.clientHeight;
let screenHeight = window.innerHeight;
document.addEventListener('mousedown', function (e) {
  startY = e.clientY;
  document.addEventListener('mousemove', onMouseMove);
  document.addEventListener('mouseup', onMouseUp);
});

function onMouseMove(e) {
  let currentY = e.clientY;
  let diffY = currentY - startY;

  // Calculate the potential new position of the lockscreen
  let newTranslateY = diffY + lockscreen.getBoundingClientRect().top;

  // Check if the new position is within the visible screen area
  if (newTranslateY < screenHeight - lockscreenHeight) {
    // Move the lockscreen element upward with smooth transition
    lockscreen.style.transition = 'none'; // Disable transition
    lockscreen.style.transform = `translateY(${diffY}px)`;
  } else if (newTranslateY <= 0) {
    // If new position is above the screen, limit it to top of the screen
    lockscreen.style.transform = `translateY(${-lockscreen.getBoundingClientRect().top}px)`;
  } else {
    // If new position is below the screen, limit it to bottom of the screen
    lockscreen.style.transform = `translateY(${screenHeight - lockscreenHeight - lockscreen.getBoundingClientRect().top}px)`;
  }
}

function onMouseUp() {
  // Unbind mousemove and mouseup events
  document.removeEventListener('mousemove', onMouseMove);
  document.removeEventListener('mouseup', onMouseUp);

  // Calculate the distance moved
  let translateY = parseInt(lockscreen.style.transform.slice(11, -3)); // Extract translateY value
  let distanceMoved = Math.abs(translateY);

  // Check if the lockscreen was moved halfway
  if (distanceMoved >= lockscreenHeight / 2) {
    unlock();
  } else {
    // Smoothly transition the lockscreen back to its original position
    lockscreen.style.transition = 'transform 0.3s ease';
    lockscreen.style.transform = '';
  }
}

function unlock() {
  // Animate hiding the lockscreen div upward
  lockscreen.style.transition = 'transform 0.3s ease';
  lockscreen.style.transform = `translateY(-${lockscreenHeight}px)`;

  // Optionally, you can also remove the lockscreen from the DOM after animation completes
  setTimeout(function () {
    lockscreen.style.display = 'none';
  }, 300); // Adjust this time to match the transition duration
}
});



function setClock() {
  let date = new Date();
  let hour = date.getHours();
  let minute = date.getMinutes();
  let day = date.getDay();
  let curDate = date.toDateString();

  document.querySelector(".lockscreen-hour").innerHTML = hour;
  document.querySelector(".lockscreen-minute").innerHTML = minute;
  document.querySelector(".lockscreen-date").innerHTML = curDate;

  if (minute < 10) {
    document.querySelector(".lockscreen-minute").innerHTML = "0" + minute;
  }

  if (hour < 10) {
    document.querySelector(".lockscreen-hour").innerHTML = "0" + hour;
  }
}