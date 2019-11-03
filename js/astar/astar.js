function astar(grid, start, finish) {
  grid[start].g = 0;
  grid[start].h = 0;
  grid[start].f = 0;
  let open = [grid[start]];
  let closed = [];
  while (open.length != 0) {
    sortNodesByF(open);
    let q = open.shift();
    closed.push(q);
    if (q.row == grid[finish].row && q.col == grid[finish].col) return closed;
    let successors = getSuccessors(grid, q);
    for (let successor of successors) {
      let closedCheck = checkPosition(closed, successor);
      if ((successor.isWall && !successor.isFinish) || closedCheck) continue;
      successor.g = q.g + 1;
      successor.h = manhattan(successor, grid[finish]);
      successor.f = successor.g + successor.h;
      let openCheck = checkPosition(open, successor);
      if (openCheck) {
        if (successor.g >= openCheck.g) continue;
      }
      successor.previousNode = q;
      open.push(successor);
    }
  }
  return closed;
}

function sortNodesByF(nodes) {
  nodes.sort((nodeA, nodeB) => nodeA.f - nodeB.f);
}

function getSuccessors(grid, node) {
  let graphRow, graphCol;
  if (windowWidth > 768) {
    graphCol = 35;
    graphRow = 23;
  } else if (windowWidth > 414) {
    graphCol = 19;
    graphRow = 23;
  } else if (windowWidth > 314) {
    graphCol = 14;
    graphRow = 23;
  }
  const successors = [];
  const { col, row } = node;
  // Top successor
  if (row > 0) successors.push(grid[(row - 1) * graphCol + col]);
  // Bottom successor
  if (row < graphRow - 1) successors.push(grid[(row + 1) * graphCol + col]);
  // Left successor
  if (col > 0) successors.push(grid[row * graphCol + col - 1]);
  // Right successor
  if (col < graphCol - 1) successors.push(grid[row * graphCol + col + 1]);

  return successors;
}

function manhattan(child, end) {
  return Math.abs(child.col - end.col) + Math.abs(child.row - end.row);
}

function checkPosition(list, target) {
  // returns node if target is in list else returns 0
  let found = list.filter(
    node => node.col == target.col && node.row == target.row
  );
  return found[0] || 0;
}

function getNodesInShortestPathOrder(finishNode) {
  // returns array of nodes in shortest path
  const nodesInShortestPathOrder = [];
  let currentNode = finishNode;
  while (currentNode !== null) {
    nodesInShortestPathOrder.unshift(currentNode);
    currentNode = currentNode.previousNode;
  }
  return nodesInShortestPathOrder;
}
