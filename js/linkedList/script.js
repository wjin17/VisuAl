let canvas;
let canvasWidth;
let canvasHeight;
let index = 0;

let linkedlist = false;

function calcCanvas() {
  index = 0;
  canvasHeight =
    canvasWidth < 768 * 0.9
      ? Math.ceil(linkedlist.getLength() / 3) * 83
      : Math.ceil(linkedlist.getLength() / 8) * 83;
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
  if (!linkedlist) {
    linkedlist = new SLinkedList();
  }
  let boxWidth, colOffset, rowOffset, rectOffset;
  if (canvasWidth < 768 * 0.9) {
    boxWidth = canvasWidth / 3;
  } else {
    boxWidth = canvasWidth / 8;
  }

  while (index < linkedlist.getLength()) {
    if (canvasWidth < 768 * 0.9) {
      colOffset = index % 3;
      rowOffset = Math.floor(index / 3);
      rectOffset = canvasWidth * 0.85;
    } else {
      colOffset = index % 8;
      rowOffset = Math.floor(index / 8);
      rectOffset = canvasWidth * 0.95;
    }
    let node = linkedlist.searchNodeAt(index);

    stroke(0);

    // Node
    fill("#FFFFFF");
    rect(
      colOffset * boxWidth + boxWidth / 10,
      rowOffset * 88 + 15,
      boxWidth * 0.8,
      43
    );

    // Node.data
    fill("#525252");
    textAlign(CENTER);
    text(
      node.data,
      colOffset * boxWidth + boxWidth * 0.27,
      rowOffset * 88 + 41
    );

    // Line separating data and pointer
    stroke("#525252");
    line(
      colOffset * boxWidth + boxWidth / 2,
      rowOffset * 88 + 15,
      colOffset * boxWidth + boxWidth / 2,
      rowOffset * 88 + 58
    );
    if (colOffset) {
      noStroke();
      // Rectangle of arrow
      fill("#CA3E47");
      rect(
        colOffset * boxWidth + boxWidth / 10 - 5,
        rowOffset * 88 + 30,
        -boxWidth * 0.35,
        15
      );

      // Triangle of arrow
      triangle(
        colOffset * boxWidth + boxWidth / 10 - 10,
        rowOffset * 88 + 23,
        colOffset * boxWidth + boxWidth / 10,
        rowOffset * 88 + 38,
        colOffset * boxWidth + boxWidth / 10 - 10,
        rowOffset * 88 + 52
      );
    } else if (index != 0 && colOffset == 0) {
      noStroke();
      fill("#CA3E47");
      //Rect above node
      rect(
        colOffset * boxWidth + boxWidth * 0.27 - 7.5,
        rowOffset * 88 - 10,
        15,
        15
      );
      //Rect across canvas
      rect(
        colOffset * boxWidth + boxWidth * 0.27 - 7.5,
        rowOffset * 88 - 20,
        rectOffset,
        15
      );
      //Rect below node
      rect(
        boxWidth * (colOffset + 0.27) + rectOffset - 22.5,
        rowOffset * 88 - 30,
        15,
        20
      );
      triangle(
        //Left vertex
        colOffset * boxWidth + boxWidth * 0.27 - 15,
        rowOffset * 88 + 3,
        //Right vertex
        colOffset * boxWidth + boxWidth * 0.27 + 15,
        rowOffset * 88 + 3,
        //Bottom vertex
        colOffset * boxWidth + boxWidth * 0.27,
        rowOffset * 88 + 15
      );
    }
    index++;
  }

  if (index == linkedlist.getLength()) {
    noLoop();
  }
}

function windowResized() {
  calcCanvas();
}

function addValue() {
  clearError();
  var userValues = document.getElementById("linked-list__data__add").value;
  linkedlist.add(userValues);
  document.getElementById("linked-list__data__add").value = null;
  calcCanvas();
}

function removeNode() {
  clearError();
  var userValues = document.getElementById("linked-list__data__remove__node")
    .value;
  try {
    linkedlist.removeNode(userValues);
    document.getElementById("linked-list__remove__node").innerText = null;
  } catch (err) {
    document.getElementById("linked-list__remove__node").innerText = err;
  }
  document.getElementById("linked-list__data__remove__node").value = null;
  calcCanvas();
}

function removeValue() {
  clearError();
  var userValues = document.getElementById("linked-list__data__remove__value")
    .value;
  try {
    linkedlist.removeValue(userValues);
  } catch (err) {
    document.getElementById("linked-list__remove__value").innerText = err;
  }
  document.getElementById("linked-list__data__remove__value").value = null;
  calcCanvas();
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
