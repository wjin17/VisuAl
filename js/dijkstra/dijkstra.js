function dijkstra(grid, start, stop) {
  // Main function that iterates through each node in grid
  const visitedNodesInOrder = [];
  let unvisitedNodes = [...grid];
  start.distance = 0;

  while (unvisitedNodes.length != 0) {
    // Sort unvisted nodes from closest to farthest
    sortNodesByDistance(unvisitedNodes);
    // Set first node in unvisited list as closest node
    // and remove it from the list
    const closestNode = unvisitedNodes.shift();
    // Skip this iteration if closest node is a wall
    if (closestNode.isWall && !closestNode.isFinish && !closestNode.isStart)
      continue;
    // If the closest node's distance is infinity,
    // no more nodes are accessible. Return visited list
    if (closestNode.distance === Infinity) return visitedNodesInOrder;
    // If closest node is end, return visited list
    if (closestNode === stop) return visitedNodesInOrder;
    closestNode.isVisited = true;
    visitedNodesInOrder.push(closestNode);
    updateUnvisitedNeighbors(closestNode, grid);
  }
}

function sortNodesByDistance(unvisitedNodes) {
  unvisitedNodes.sort((nodeA, nodeB) => nodeA.distance - nodeB.distance);
}

function updateUnvisitedNeighbors(node, grid) {
  // Gets unvisited neighbors of the closest node
  // Updates distance and sets previous node as closest node
  const unvisitedNeighbors = getUnvisitedNeighbors(node, grid);
  for (const neighbor of unvisitedNeighbors) {
    neighbor.distance = node.distance + 1;
    neighbor.previousNode = node;
  }
}

function getUnvisitedNeighbors(node, grid) {
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
  const neighbors = [];
  const { col, row } = node;
  // Left diagonal
  /* if (row > 0 && col > 0) neighbors.push(grid[(row - 1) * graphCol + col - 1]); */
  // Top neighbor
  if (row > 0) neighbors.push(grid[(row - 1) * graphCol + col]);
  // Right Diagonal
  /* if (row < graphRow - 1 && col < graphCol - 1)
    neighbors.push(grid[(row + 1) * graphCol + col + 1]); */
  // Bottom neighbor
  if (row < graphRow - 1) neighbors.push(grid[(row + 1) * graphCol + col]);
  // Left neighbor
  if (col > 0) neighbors.push(grid[row * graphCol + col - 1]);
  // Right neighbor
  if (col < graphCol - 1) neighbors.push(grid[row * graphCol + col + 1]);
  return neighbors.filter(neighbor => !neighbor.isVisited);
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
