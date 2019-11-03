// Canvas + Grid
let canvas;
let drawn = false;
let graphWidth;
let currentSize = 0;
let grid = [];
let col;
let row;
let nodeWidth;
let nodeHeight;
let mode = "start";
let previousMode;

// Path
let algorithm = "dijkstra";
let previousNode;
let start = null;
let finish = null;
let visitedNode = 0;
let visitedComplete = false;
let shortestPath = null;
let shortestNode = 0;

// Animation Variables
// - visited
let visitedFrames = [];
let visited;
// - shortest
let shortestFrames = [];
// - maze
let maze = [];
let mazeFrameId = 0;
let mazeComplete;

function clearMode() {
  document
    .querySelectorAll(".pathfinder__input__mode")
    .forEach(element => (element.className = "pathfinder__input__mode"));
}

function setAlgorithm(algorithmId) {
  document.getElementById("error__inner").innerText = null;
  clearAlgorithm();
  updateDescription(algorithmId);
  document.getElementById(algorithmId).className =
    "pathfinder__algorithm active";
  algorithm = algorithmId;
}

function updateDescription(algorithm) {
  switch (algorithm) {
    case "dijkstra":
      document.getElementById("description").innerHTML = DIJKSTRA_DESC;
      break;
    case "astar":
      document.getElementById("description").innerHTML = ASTAR_DESC;
      break;
    default:
      document.getElementById("error__inner").innerText = "Select algorithm";
  }
}

function clearAlgorithm() {
  document
    .querySelectorAll(".pathfinder__algorithm")
    .forEach(element => (element.className = "pathfinder__algorithm"));
}

function setGridWidth() {
  if (windowWidth > 768) {
    col = 35;
    row = 23;
    graphWidth = 692;
  } else if (windowWidth > 414) {
    col = 19;
    row = 23;
    graphWidth = 380;
  } else if (windowWidth > 314) {
    col = 14;
    row = 23;
    graphWidth = 280;
  } else {
    graphWidth = windowWidth * 0.9;
  }
  nodeWidth = graphWidth / col;
  nodeHeight = 460 / row;
}

// Canvas
function setup() {
  setGridWidth();
  canvas = createCanvas(graphWidth, 460);
  canvas.parent("canvas__inner");
  background("#525252");
  frameRate(60);
}

function draw() {
  if (!grid.length) {
    createGrid();
  }

  if (grid.length && windowWidth > 314 && graphWidth) {
    grid.forEach(node => {
      if (node.isStart) {
        fill("#036666");
      } else if (node.isFinish) {
        fill("#CA3E47");
      } else if (shortestFrames.includes(node)) {
        fill("#FDFD96");
      } else if (node.isWall) {
        fill("#123456");
      } else if (visitedFrames.includes(node)) {
        fill("#A2A2A2");
      } else {
        fill("#F1F1F1");
      }
      stroke("#E1E1E1");
      rect(
        node.col * nodeWidth + 1,
        node.row * nodeHeight + 1,
        nodeWidth - 2,
        nodeHeight - 2
      );
    });
  } else {
    stroke("#F1F1F1");
    fill("#F1F1F1");
    textSize(24);
    text(
      "The screen is too small. Please resize.",
      graphWidth / 4,
      460 / 3,
      graphWidth / 2,
      460 / 2
    );
  }

  if (maze && mazeComplete) {
    if (mazeFrameId < maze.length) {
      grid[maze[mazeFrameId]].isStart = false;
      grid[maze[mazeFrameId]].isFinish = false;
      grid[maze[mazeFrameId]].isWall = true;
      mazeFrameId++;
    } else {
      if (mode == "disabled") {
        mazeComplete = false;
        mode = previousMode;
      }
      noLoop();
    }
  }

  if (visited && !visitedComplete) {
    if (visitedNode < visited.length) {
      const nodeId = visited[visitedNode].row * col + visited[visitedNode].col;
      if (nodeId != start && nodeId != finish) {
        visitedFrames.push(visited[visitedNode]);
      }
      visitedNode++;
    }
    if (visitedNode == visited.length) visitedComplete = true;
  }

  if (visitedComplete) {
    if (shortestNode < shortestPath.length) {
      const nodeId =
        shortestPath[shortestNode].row * col + shortestPath[shortestNode].col;
      if (nodeId != start && nodeId != finish) {
        shortestFrames.push(shortestPath[shortestNode]);
      }
      shortestNode++;
    }
    if (shortestNode == shortestPath.length) {
      if (mode == "disabled") {
        mode = previousMode;
      }
      noLoop();
    }
  }
}

function createGrid() {
  if (currentSize != graphWidth) {
    currentSize = graphWidth;
    for (let nodeRow = 0; nodeRow < row; nodeRow++) {
      for (let nodeCol = 0; nodeCol < col; nodeCol++) {
        let newNode = new Node(nodeRow, nodeCol);
        let currentNode = nodeRow * col + nodeCol;
        if (currentNode == start) {
          newNode.isStart = true;
        } else if (currentNode == finish) {
          newNode.isFinish = true;
        }
        grid.push(newNode);
      }
    }
  }
}

function windowResized() {
  clearBoard(["wall", "maze"]);
  setGridWidth();
  if (currentSize != graphWidth) {
    clearBoard(["grid"]);
    grid = [];
    canvas.size(graphWidth, 460);
    drawn = false;
    loop();
  }
}

function setNode(currentNode) {
  switch (mode) {
    case "start":
      if (start != null) {
        grid[start].isStart = false;
      }
      grid[currentNode].isStart = !grid[currentNode].isStart;
      start = currentNode;
      if (shortestPath) {
        solveMap("instant");
      }
      break;
    case "finish":
      if (finish != null) {
        grid[finish].isFinish = false;
        grid[finish].shortestPath = false;
      }
      grid[currentNode].isFinish = !grid[currentNode].isFinish;
      finish = currentNode;
      if (shortestPath) {
        solveMap("instant");
      }
      break;
    case "wall":
      if (currentNode == start) start = null;
      if (currentNode == finish) finish = null;
      grid[currentNode].isStart = false;
      grid[currentNode].isFinish = false;
      grid[currentNode].isWall = true;
      break;
    case "erase":
      if (currentNode == start) start = null;
      if (currentNode == finish) finish = null;
      grid[currentNode].isStart = false;
      grid[currentNode].isFinish = false;
      grid[currentNode].isWall = false;
      break;
    default:
      break;
  }
  loop();
}

function mousePressed() {
  let mouseInCanvas =
    mouseX >= 0 && mouseX <= graphWidth && mouseY >= 0 && mouseY <= 460;

  if (mouseInCanvas) {
    let xPos = Math.floor(mouseX / nodeWidth);
    let yPos = Math.floor(mouseY / nodeHeight);
    let currentNode = yPos * col + xPos;
    previousNode = currentNode;
    setNode(currentNode);
  }
}

function mouseDragged() {
  let mouseInCanvas =
    mouseX >= 0 && mouseX <= graphWidth && mouseY >= 0 && mouseY <= 460;

  if (mouseInCanvas) {
    let xPos = Math.floor(mouseX / nodeWidth);
    let yPos = Math.floor(mouseY / nodeHeight);
    let currentNode = yPos * col + xPos;
    if (previousNode != null && previousNode != currentNode) {
      previousNode = currentNode;
      setNode(currentNode);
    }
  }
}

function setMode(modeId) {
  if (mode != "disabled") {
    previousMode = mode;
    clearMode();
    document.getElementById(modeId).className =
      "pathfinder__input__mode active";
    mode = modeId;
  }
}

function clearBoard(level) {
  if (mode != "disabled") {
    grid.forEach(node => {
      node.isVisited = false;
      node.distance = Infinity;
      node.previousNode = null;
      node.shortestPath = false;
      if (level && level.includes("wall")) {
        node.isWall = false;
      }
    });
    visitedComplete = false;
    visitedFrames = [];
    shortestFrames = [];
    visitedNode = 0;
    shortestNode = 0;
    visited = false;
    shortestPath = false;
    if (level) {
      if (level.includes("grid")) {
        visited = null;
        shortestPath = null;
        grid = [];
        drawn = false;
        currentSize = 0;
        start = null;
        finish = null;
        loop();
      }
      if (level.includes("maze")) {
        maze = [];
        mazeFrameId = 0;
        mazeComplete = false;
      }
    }
  }
}

async function generateMap() {
  if (mode != "disabled") {
    clearBoard(["wall", "maze"]);
    previousMode = mode;
    mode = "disabled";

    // Creating border
    for (let i = 0; i < row; i++) {
      for (let j = 0; j < col; j++) {
        if (i == 0 || i == row - 1 || j == 0 || j == col - 1) {
          let toBeWall = i * col + j;
          if (toBeWall != start && toBeWall != finish) {
            maze.push(toBeWall);
          }
        }
      }
    }

    await recursiveDivision(
      grid,
      1,
      1,
      col - 2,
      row - 2,
      choose_orientation(col, row)
    );
    mazeComplete = true;
    loop();
  }
}

function solveMap(display) {
  if (start != null && finish != null) {
    document.getElementById("error__inner").innerText = null;
    if (mode != "disabled") {
      clearBoard();
      switch (algorithm) {
        case "dijkstra":
          visited = dijkstra(grid, grid[start], grid[finish]);
          break;
        case "astar":
          visited = astar(grid, start, finish);
          break;
      }
      shortestPath = getNodesInShortestPathOrder(grid[finish]);
      shortestPath.forEach(node => (node.shortestPath = true));
      previousMode = mode;
      mode = "disabled";

      if (display == "instant") {
        visitedFrames = visited;
        shortestFrames = shortestPath;
        visitedNode = visited.length;
        shortestNode = shortestPath.length;
      }
      loop();
    }
  } else {
    if (!start) {
      document.getElementById("error__inner").innerText = "Start node required";
    } else {
      document.getElementById("error__inner").innerText =
        "Finish node required";
    }
  }
}
