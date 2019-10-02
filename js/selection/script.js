let canvas;
let canvasWidth;

//Default values
let values = Array.from({ length: 20 }, () => Math.floor(Math.random() * 100));
let frames = [];
let frameId = 0;
let current = [];
let play = false;

// Elements
var slider = document.getElementById("slider__input");
var playToggle = document.getElementById("play__toggle");
var playButton = document.getElementById("play__button__id");

playToggle.innerHTML = play ? "Pause" : "Play";

slider.oninput = function() {
  frameId = this.value;
  loop();
};

playButton.onclick = function() {
  play = !play;
  playToggle.innerHTML = play ? "Pause" : "Play";
  if (frameId == frames.length - 1) {
    frameId = 0;
  }
  loop();
};

//Functions

// Canvas
function setup() {
  frames.push([...values]);
  canvasWidth = windowWidth * 0.9;
  canvas = createCanvas(canvasWidth, 250);
  canvas.parent("canvas__inner");
  background("#525252");
  frameRate(10);
  selectionSortAlgo(values);
  slider.setAttribute("max", frames.length - 1);
}

function draw() {
  background("#525252");
  const rectWidth = canvasWidth / frames[frameId].length;
  if (frameId == 5) {
    console.log("@@@", current[frameId], frames[frameId]);
  }
  for (let i = 0; i < frames[frameId].length; i++) {
    const rectHeight =
      (frames[frameId][i] / Math.max(...frames[frameId])) * height * 0.75;
    stroke(0);
    if (current[frameId].includes(i)) {
      fill("#ca3e47");
    } else if (frameId == frames.length - 1) {
      fill("#228b22");
    } else {
      fill("#f1f1f1");
    }
    rect(i * rectWidth, height - (rectHeight + 30), rectWidth, rectHeight);
    textAlign(CENTER, CENTER);
    text(
      frames[frameId][i],
      i * rectWidth + Math.floor(rectWidth / 2),
      height - 10
    );
  }
  if (play && frameId < frames.length - 1) {
    frameId++;
    slider.value = frameId;
  } else {
    play = false;
    playToggle.innerHTML = "Play";
    noLoop();
  }
}

function windowResized() {
  canvas.size(windowWidth * 0.9, 250);
  canvasWidth = windowWidth * 0.9;
  loop();
}

// User inputs
function randomInput() {
  var numRandom = document.getElementById("selection-sort__data__random").value;
  document.getElementById("selection-sort__data__user").value = null;
  if (numRandom) {
    values = Array.from({ length: numRandom }, () =>
      Math.floor(Math.random() * 100)
    );
    frames = [];
    frames[0] = [...values];
    current = [];
  }
  selectionSortAlgo(values);
  play = false;
  slider.setAttribute("max", frames.length - 1);
  slider.value = 0;
  frameId = 0;
  loop();
}

function userInput() {
  var userValues = document
    .getElementById("selection-sort__data__user")
    .value.split(",")
    .map(Number);
  document.getElementById("selection-sort__data__random").value = null;
  if (userValues[0]) {
    frames = [];
    frames[0] = [...userValues];
    current = [];
    values = userValues;
  }
  selectionSortAlgo(values);
  play = false;
  slider.setAttribute("max", frames.length - 1);
  slider.value = 0;
  frameId = 0;
  loop();
}
