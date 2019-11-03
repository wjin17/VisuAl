function choose_orientation(width, height) {
  if (width < height) {
    return "HORIZONTAL";
  } else if (height < width) return "VERTICAL";
  else {
    Math.floor(Math.random() * 2) == 0 ? "HORIZONTAL" : "VERTICAL";
  }
}

async function recursiveDivision(grid, x, y, width, height, orientation) {
  if (width < 2 || height < 2) {
    return;
  }
  let wx, wy, px, py, dx, dy, wallLength;
  let horizontal = orientation == "HORIZONTAL";
  if (horizontal) {
    wy = y + Math.floor(Math.random() * height); //(height - 2)) + 1;
    while (wy % 2 != 0) {
      wy = y + Math.floor(Math.random() * height); //(height - 2)) + 1;
    }
    wx = x;
    px = wx + Math.floor(Math.random() * width);
    while (px % 2 == 0) {
      px = wx + Math.floor(Math.random() * width);
    }
    py = wy;
    dx = 1;
    dy = 0;
    wallLength = width;
  } else {
    wx = x + Math.floor(Math.random() * width); //(width - 2)) + 1;
    while (wx % 2 != 0) {
      wx = x + Math.floor(Math.random() * width); //(width - 2)) + 1;
    }
    wy = y;
    px = wx;
    py = wy + Math.floor(Math.random() * height);
    while (py % 2 == 0) {
      py = wy + Math.floor(Math.random() * height);
    }
    dx = 0;
    dy = 1;
    wallLength = height;
  }

  for (let i = 0; i < wallLength; i++) {
    let toBeWall = wy * col + wx;
    if (wx != px || wy != py) {
      if (toBeWall != start && toBeWall != finish) {
        maze.push(toBeWall);
      }
    }
    wx += dx;
    wy += dy;
  }

  let nx = x,
    ny = y,
    w,
    h;
  if (horizontal) {
    w = width;
    h = wy - y;
  } else {
    w = wx - x;
    h = height;
  }
  await recursiveDivision(grid, nx, ny, w, h, choose_orientation(w, h));

  if (horizontal) {
    ny = wy + 1;
    h = y + height - wy - 1;
  } else {
    nx = wx + 1;
    w = x + width - wx - 1;
  }
  await recursiveDivision(grid, nx, ny, w, h, choose_orientation(w, h));
}
