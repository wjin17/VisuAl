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
  canvas.size(windowWidth * 0.9, 250);
  canvasWidth = windowWidth * 0.9;
  loop();
}
