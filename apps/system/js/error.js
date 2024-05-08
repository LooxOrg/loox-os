function criticalError(title, message) {
  let errorPopup = document.querySelector(".error-popup");
  errorPopup.style.display = "block";
  errorPopup.querySelector("#error-title").innerHTML = title;
  errorPopup.querySelector("#error-message").innerHTML = message;
}