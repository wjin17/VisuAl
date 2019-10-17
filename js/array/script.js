let canvas;
let canvasWidth;
let drawn = false;

let array = []; //[1, 2, 3, 5, 6, 4, 3, 6, 8];
let arrayFrame = 0;

// Canvas
function setup() {
  canvasWidth = windowWidth * 0.9;
  canvas = createCanvas(canvasWidth, 100);
  canvas.parent("canvas__inner");
  background("#525252");
}

function draw() {
  if (!drawn) {
    let xtShift = canvasWidth * 0.02 < 14 ? 14 : canvasWidth * 0.02;
    let xblShift = canvasWidth * 0.09 < 50 ? 50 : canvasWidth * 0.09;
    let xbrShift = canvasWidth * 0.98 < 45 ? 45 : canvasWidth * 0.98;
    fill("#f1f1f1");
    text("Value", xtShift, 33);
    text("Index", xtShift, 68);
    stroke("#f1f1f1");
    line(xblShift, 10, xblShift, 90);
    line(xblShift, 10, xblShift + 10, 10);
    line(xblShift, 90, xblShift + 10, 90);
    line(xbrShift, 10, xbrShift, 90);
    line(xbrShift, 10, xbrShift - 10, 10);
    line(xbrShift, 90, xbrShift - 10, 90);
    drawn = true;
  }
  let arrayX = (canvasWidth * 0.83) / array.length;
  let xShift = canvasWidth * 0.12 < 54 ? 54 : canvasWidth * 0.12;
  stroke("#525252");
  if (arrayFrame != array.length) {
    while (arrayFrame < array.length) {
      fill("#f1f1f1");
      rect(arrayFrame * arrayX + xShift, 15, arrayX, 50);
      fill("#525252");
      rect(arrayFrame * arrayX + xShift, 50, arrayX, 35);
      fill("#525252");
      textAlign(CENTER, CENTER);
      text(
        array[arrayFrame] ? array[arrayFrame] : "Undefined",
        arrayFrame * arrayX + Math.floor(arrayX / 2) + xShift,
        33
      );
      fill("#f1f1f1");
      text(
        arrayFrame,
        arrayFrame * arrayX + Math.floor(arrayX / 2) + xShift,
        68
      );
      arrayFrame++;
    }
  } else {
    noLoop();
  }
}

function windowResized() {
  arrayFrame = 0;
  canvas.size(windowWidth * 0.9, 100);
  canvasWidth = windowWidth * 0.9;
  drawn = false;
  loop();
}

function indexOfArray() {
  var userIndex = document.getElementById("array__data__index").value;
  var userValues = document.getElementById("array__data__value").value;
  array[userIndex] = userValues;
  arrayFrame = 0;
  loop();
}

function pushArray() {
  var userValues = document.getElementById("array__data__push").value;
  array.push(userValues);
  arrayFrame = 0;
  loop();
}

function popArray() {
  array.pop();
  arrayFrame = 0;
  loop();
}

function unshiftArray() {
  var userValues = document.getElementById("array__data__unshift").value;
  array.unshift(userValues);
  arrayFrame = 0;
  loop();
}

function shiftArray() {
  array.shift();
  arrayFrame = 0;
  loop();
}

function spliceArray() {
  var spliceStart = document.getElementById("array__data__splice__start").value;
  var spliceEnd = document.getElementById("array__data__splice__end").value;
  var spliceAdd = document
    .getElementById("array__data__splice__add")
    .value.split(",");
  console.log(spliceAdd);
  if (spliceStart && spliceEnd && spliceAdd) {
    array.splice(spliceStart, spliceEnd, spliceAdd);
  }
  arrayFrame = 0;
  loop();
}

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
