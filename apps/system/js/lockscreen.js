document.addEventListener("DOMContentLoaded", function () {
  setClock();
  setInterval(setClock, 1000)

  let lockscreen = document.querySelector(".lockscreen");
  let lockscreenBlur = document.querySelector(".lockscreen-blur");

  let startY;
  let screenHeight = window.innerHeight;
  document.addEventListener("mousedown", function (e) {
    startY = e.clientY;
    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseup", onMouseUp);
  });

  function onMouseMove(e) {
    let currentY = e.clientY;
    let diffY = currentY - startY;
    let newTranslateY = diffY + lockscreen.getBoundingClientRect().top;
    let percent = -Math.floor(newTranslateY / screenHeight * 100);

    lockscreenBlur.style.backdropFilter = `blur(${percent}px)`;
    lockscreenBlur.style.backgroundColor = `rgba(0, 0, 0, ${percent / 100 / 2})`;
    console.log(percent)
  }

  function onMouseUp() {
    document.removeEventListener("mousemove", onMouseMove);
    document.removeEventListener("mouseup", onMouseUp);

    lockscreenBlur.style.transition = "backdrop-filter 0.3s ease";
    lockscreenBlur.style.backgroundColor = "rgba(0, 0, 0, 0.5)";
    lockscreenBlur.style.backdropFilter = "blur(150px)";
    

    setTimeout(function () {
      unlock();
    }, 300);
  }

  function unlock() {
    lockscreen.style.transition = "transform 0.3s ease";
    lockscreen.style.opacity = "1";

    setTimeout(function () {
      lockscreen.style.display = "none";
    }, 300);
  }

  //let swipe = document.querySelector(".lockscreen-swipe");
  //let lockscreen = document.querySelector(".lockscreen");
  //console.log(swipe)
  //  
  //let startY;
  //let lockscreenHeight = lockscreen.clientHeight;
  //let screenHeight = window.innerHeight;
  //document.addEventListener('mousedown', function (e) {
  //  startY = e.clientY;
  //  document.addEventListener('mousemove', onMouseMove);
  //  document.addEventListener('mouseup', onMouseUp);
  //});
  //
  //function onMouseMove(e) {
  //  let currentY = e.clientY;
  //  let diffY = currentY - startY;
  //
  //  let newTranslateY = diffY + lockscreen.getBoundingClientRect().top;
  //
  //  if (newTranslateY < screenHeight - lockscreenHeight) {
  //    lockscreen.style.transition = 'none';
  //    lockscreen.style.transform = `translateY(${diffY}px)`;
  //  } else if (newTranslateY <= 0) {
  //    lockscreen.style.transform = `translateY(${-lockscreen.getBoundingClientRect().top}px)`;
  //  } else {
  //    lockscreen.style.transform = `translateY(${screenHeight - lockscreenHeight - lockscreen.getBoundingClientRect().top}px)//`;
  //  }
  //}
  //
  //function onMouseUp() {
  //  document.removeEventListener('mousemove', onMouseMove);
  //  document.removeEventListener('mouseup', onMouseUp);
  //
  //  let translateY = parseInt(lockscreen.style.transform.slice(11, -3));
  //  let distanceMoved = Math.abs(translateY);
  //
  //  if (distanceMoved >= lockscreenHeight / 2) {
  //    unlock();
  //  } else {
  //    lockscreen.style.transition = 'transform 0.3s ease';
  //    lockscreen.style.transform = '';
  //  }
  //}
  //
  //function unlock() {
  //  lockscreen.style.transition = 'transform 0.3s ease';
  //  lockscreen.style.transform = `translateY(-${lockscreenHeight}px)`;
  //
  //  setTimeout(function () {
  //    lockscreen.style.display = 'none';
  //  }, 300); 
  //}
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