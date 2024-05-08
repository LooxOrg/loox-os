document.addEventListener("DOMContentLoaded", function () {
  setClock();
  setInterval(setClock, 1000)

  let swipe = document.querySelector(".lockscreen-swipe");
  let lockscreen = document.querySelector(".lockscreen");
  console.log(swipe)
    
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

    let newTranslateY = diffY + lockscreen.getBoundingClientRect().top;

    if (newTranslateY < screenHeight - lockscreenHeight) {
      lockscreen.style.transition = 'none';
      lockscreen.style.transform = `translateY(${diffY}px)`;
    } else if (newTranslateY <= 0) {
      lockscreen.style.transform = `translateY(${-lockscreen.getBoundingClientRect().top}px)`;
    } else {
      lockscreen.style.transform = `translateY(${screenHeight - lockscreenHeight - lockscreen.getBoundingClientRect().top}px)`;
    }
  }

  function onMouseUp() {
    document.removeEventListener('mousemove', onMouseMove);
    document.removeEventListener('mouseup', onMouseUp);

    let translateY = parseInt(lockscreen.style.transform.slice(11, -3));
    let distanceMoved = Math.abs(translateY);

    if (distanceMoved >= lockscreenHeight / 2) {
      unlock();
    } else {
      lockscreen.style.transition = 'transform 0.3s ease';
      lockscreen.style.transform = '';
    }
  }

  function unlock() {
    lockscreen.style.transition = 'transform 0.3s ease';
    lockscreen.style.transform = `translateY(-${lockscreenHeight}px)`;

    setTimeout(function () {
      lockscreen.style.display = 'none';
    }, 300); 
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