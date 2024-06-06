function criticalError(title, message) {
  let errorPopup = document.querySelector(".error-popup");
  errorPopup.style.display = "none";
  errorPopup.querySelector("#error-title").innerHTML = title;
  errorPopup.querySelector("#error-message").innerHTML = message;
  throw new Error(message);
}