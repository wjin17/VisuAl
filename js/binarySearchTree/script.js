let canvas;
let canvasWidth;
let canvasHeight;
let index = 0;

let bst = false;

if (!bst) {
  bst = new BinarySearchTree();
  for (let i = 0; i <= 2; i++) {
    console.log("adding value");
    bst.add(Math.floor(Math.random() * 10));
  }
  console.log(bst.root());
}

function calcCanvas() {
  index = 0;
  canvasHeight = canvasWidth < 768 * 0.9 ? 83 : 83;
  if (canvasHeight == 0) canvasHeight = 83;
  canvas.size(windowWidth * 0.9, canvasHeight);
  canvasWidth = windowWidth * 0.9;
  loop();
}

function clearError() {
  var elements = document.querySelectorAll(".input__error");
  elements.forEach(el => (el.innerText = null));
}

// Canvas
function setup() {
  canvasWidth = windowWidth * 0.9;
  canvas = createCanvas(canvasWidth, 83);
  canvas.parent("canvas__inner");
}

function draw() {
  background("#525252");
}

function windowResized() {
  calcCanvas();
}

window.onclick = function(e) {
  if (!e.target.matches(".dropdown__button")) {
    var dropdownNav = document.getElementById("dropdown__links");
    if (dropdownNav.classList.contains("show")) {
      dropdownNav.classList.remove("show");
    }
  }
};
