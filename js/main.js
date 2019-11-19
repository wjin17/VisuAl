// Dropdown
function toggleDropdown() {
  document.getElementById("dropdown__links").classList.toggle("show");
}

window.onclick = function(e) {
  if (!e.target.matches(".dropdown__button")) {
    var dropdownNav = document.getElementById("dropdown__links");
    if (dropdownNav.classList.contains("show")) {
      dropdownNav.classList.remove("show");
    }
  }
};

// Window
function windowResized() {
  canvasWidth = windowWidth * 0.9 < 1152 ? windowWidth * 0.9 : 1152;
  canvas.size(canvasWidth, 250);
  loop();
}

// Error handling
function clearError() {
  var elements = document.querySelectorAll(".input__error");
  elements.forEach(el => (el.innerText = null));
}
